import { Route, Sparkles } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import Seo from '../../components/common/Seo'
import DiscoveryForm from '../../components/discovery/DiscoveryForm'
import DoctorCard from '../../components/discovery/DoctorCard'
import ResultControls from '../../components/discovery/ResultControls'
import SpecialityGuide from '../../components/discovery/SpecialityGuide'
import Footer from '../../components/layout/Footer'
import Header from '../../components/layout/Header'
import { getDoctors, getLocations, getSpecialities } from '../../services/doctorApi'

const initialFilters = { sort: 'popular', appointment: '', verifiedOnly: false }
const cityCoordinates = { 'Madhya Pradesh:Bhopal': [23.2599, 77.4126], 'Madhya Pradesh:Indore': [22.7196, 75.8577], 'Maharashtra:Pune': [18.5204, 73.8567] }
const slugify = (value) => value.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
const kilometresBetween = (latitudeA, longitudeA, latitudeB, longitudeB) => { const radians = (value) => value * Math.PI / 180; const a = Math.sin(radians(latitudeB - latitudeA) / 2) ** 2 + Math.cos(radians(latitudeA)) * Math.cos(radians(latitudeB)) * Math.sin(radians(longitudeB - longitudeA) / 2) ** 2; return 6371 * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)) }

function restoredSelections(searchParams) { return { state: searchParams.get('state') || '', city: searchParams.get('city') || '', speciality: searchParams.get('speciality') || '', query: searchParams.get('q') || '' } }
function restoredFilters(searchParams) { return { sort: searchParams.get('sort') || 'popular', appointment: searchParams.get('appointment') || '', verifiedOnly: searchParams.get('verified') === '1' } }

export default function ExploreDoctors({ initialPath = 'search', citySlug = '', specialitySlug = '' }) {
  const [searchParams, setSearchParams] = useSearchParams()
  const [path, setPath] = useState(initialPath)
  const [selections, setSelections] = useState(() => restoredSelections(searchParams))
  const [filters, setFilters] = useState(() => restoredFilters(searchParams))
  const [catalog, setCatalog] = useState({ locations: [], specialities: [] })
  const [catalogError, setCatalogError] = useState('')
  const [results, setResults] = useState([])
  const [showResults, setShowResults] = useState(() => searchParams.get('results') === '1' || Boolean(citySlug && specialitySlug))
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [locating, setLocating] = useState(false)
  const [locationError, setLocationError] = useState('')

  useEffect(() => {
    let cancelled = false
    Promise.all([getLocations(), getSpecialities()]).then(([locations, specialities]) => { if (!cancelled) setCatalog({ locations, specialities }) }).catch(() => { if (!cancelled) setCatalogError('Doctor discovery is temporarily unavailable. Please check that the API is running.') })
    return () => { cancelled = true }
  }, [])

  useEffect(() => {
    if (!citySlug || !specialitySlug || !catalog.locations.length || !catalog.specialities.length) return
    const location = catalog.locations.find((item) => slugify(item.city) === citySlug)
    const speciality = catalog.specialities.find((item) => item.slug === specialitySlug)
    if (!location || !speciality) { setError('This city and speciality page is not available.'); return }
    setSelections({ state: location.state, city: location.city, speciality: speciality.slug, query: '' })
    setShowResults(true)
  }, [catalog, citySlug, specialitySlug])

  useEffect(() => {
    const next = { sort: filters.sort }
    if (selections.state) next.state = selections.state
    if (selections.city) next.city = selections.city
    if (selections.speciality) next.speciality = selections.speciality
    if (selections.query) next.q = selections.query
    if (filters.appointment) next.appointment = filters.appointment
    if (filters.verifiedOnly) next.verified = '1'
    if (showResults) next.results = '1'
    setSearchParams(next, { replace: true })
  }, [filters, selections, setSearchParams, showResults])

  useEffect(() => {
    if (!showResults || (citySlug && specialitySlug && !catalog.locations.length)) return
    setIsLoading(true)
    getDoctors({ state: selections.state || undefined, city: selections.city || undefined, speciality: selections.speciality || undefined, q: selections.query || undefined, sort: filters.sort, verified: filters.verifiedOnly || undefined, appointment: filters.appointment || undefined }).then(({ data }) => { setResults(data); setError('') }).catch(() => setError('We could not load doctors right now. Please try again.')).finally(() => setIsLoading(false))
  }, [catalog.locations.length, citySlug, filters, selections, showResults, specialitySlug])

  const changeSelections = (next) => { setSelections((current) => ({ ...current, ...next })); setShowResults(false); setLocationError('') }
  const chooseGuidance = (name) => { const speciality = catalog.specialities.find((item) => item.name === name); if (speciality) changeSelections({ speciality: speciality.slug, query: '' }); setPath('search') }
  const locate = () => {
    setLocationError('')
    if (!navigator.geolocation) { setLocationError('This browser does not support location access. Choose your city instead.'); return }
    setLocating(true)
    navigator.geolocation.getCurrentPosition(({ coords }) => {
      const candidates = catalog.locations.map((location) => ({ location, coordinates: cityCoordinates[`${location.state}:${location.city}`] })).filter((item) => item.coordinates)
      const nearest = candidates.map((item) => ({ ...item, distance: kilometresBetween(coords.latitude, coords.longitude, item.coordinates[0], item.coordinates[1]) })).sort((a, b) => a.distance - b.distance)[0]
      if (!nearest || nearest.distance > 100) setLocationError('We could not match your position to a supported city. Please choose your city manually.')
      else changeSelections({ state: nearest.location.state, city: nearest.location.city })
      setLocating(false)
    }, () => { setLocationError('Location access was not granted. Choose your city manually instead.'); setLocating(false) }, { enableHighAccuracy: false, timeout: 8000, maximumAge: 300000 })
  }
  const specialityName = catalog.specialities.find((item) => item.slug === selections.speciality)?.name || 'Doctor'
  const routeLoading = Boolean(citySlug && specialitySlug && !catalog.locations.length)
  const resultTitle = routeLoading ? 'Finding matching doctors' : selections.query ? `Search results for “${selections.query}”` : selections.city && selections.speciality ? `${specialityName} doctors in ${selections.city}` : 'Doctor search results'
  const seoDescription = selections.city && selections.speciality ? `Find ${specialityName.toLowerCase()} profiles in ${selections.city}, with clear practice, appointment, and verification information.` : 'Search doctor profiles by name, care need, city, and speciality.'
  const structuredData = useMemo(() => showResults ? { '@context': 'https://schema.org', '@type': 'CollectionPage', name: resultTitle, description: seoDescription, mainEntity: { '@type': 'ItemList', itemListElement: results.map((doctor, index) => ({ '@type': 'ListItem', position: index + 1, item: { '@type': 'Physician', name: doctor.fullName, url: `${window.location.origin}/doctors/${doctor.slug}`, medicalSpecialty: doctor.primarySpeciality?.name } })) } } : undefined, [resultTitle, results, seoDescription, showResults])

  return <><Seo title={`${resultTitle} | mediTrust`} description={seoDescription} structuredData={structuredData} /><Header /><main className="bg-canvas"><section className="mx-auto max-w-7xl px-5 py-10 lg:px-8 lg:py-14"><div className="grid gap-10 lg:grid-cols-[0.78fr_1.22fr]"><aside className="lg:pt-1"><p className="text-xs font-bold uppercase tracking-[0.14em] text-forest">Two paths</p><h1 className="mt-3 font-display text-4xl font-semibold leading-[0.98] tracking-[-0.055em] text-ink">A clearer way to begin.</h1><ol className="mt-7 grid gap-4 text-sm"><li className="flex gap-3"><span className="grid size-7 shrink-0 place-items-center rounded-full bg-ink text-xs font-bold text-white">1</span><span><strong className="text-ink">Search or select location</strong><br /><span className="text-muted">Use a name, care need, or nearby city.</span></span></li><li className="flex gap-3"><span className="grid size-7 shrink-0 place-items-center rounded-full bg-ink text-xs font-bold text-white">2</span><span><strong className="text-ink">Choose a speciality</strong><br /><span className="text-muted">Or let the guidance preview help you start.</span></span></li><li className="flex gap-3"><span className="grid size-7 shrink-0 place-items-center rounded-full bg-ink text-xs font-bold text-white">3</span><span><strong className="text-ink">Compare information</strong><br /><span className="text-muted">Review structured practice and verification details.</span></span></li></ol></aside><div><div className="flex gap-2 border-b border-line" role="tablist"><button type="button" onClick={() => setPath('search')} className={`inline-flex items-center gap-2 border-b-2 px-1 py-3 text-sm font-bold ${path === 'search' ? 'border-forest text-forest' : 'border-transparent text-muted'}`}><Route size={16} /> I know the speciality</button><button type="button" onClick={() => setPath('guide')} className={`inline-flex items-center gap-2 border-b-2 px-1 py-3 text-sm font-bold ${path === 'guide' ? 'border-forest text-forest' : 'border-transparent text-muted'}`}><Sparkles size={16} /> I’m not sure</button></div>{catalogError ? <p className="border-y border-coral/30 py-6 text-sm text-coral">{catalogError}</p> : path === 'search' ? <DiscoveryForm values={selections} onChange={changeSelections} onSubmit={(event) => { event.preventDefault(); setError(''); setShowResults(true) }} locations={catalog.locations} specialities={catalog.specialities} onLocate={locate} locating={locating} locationError={locationError} /> : <SpecialityGuide onChoose={chooseGuidance} />}</div></div>{showResults && <section className="mt-14"><div className="border-b border-line pb-6"><p className="text-xs font-bold uppercase tracking-[0.14em] text-forest">Results</p><h2 className="mt-2 font-display text-4xl font-semibold tracking-[-0.055em] text-ink">{resultTitle}</h2></div><ResultControls filters={filters} onChange={(next) => { setError(''); setFilters((current) => ({ ...current, ...next })) }} onClear={() => { setError(''); setFilters(initialFilters) }} />{isLoading || routeLoading ? <div className="grid gap-4 py-7"><div className="h-35 animate-pulse rounded-2xl bg-sand" /><div className="h-35 animate-pulse rounded-2xl bg-sand" /></div> : error ? <p className="py-10 text-center text-coral">{error}</p> : results.length ? <div>{results.map((doctor) => <DoctorCard key={doctor.id} doctor={doctor} />)}</div> : <div className="border-y border-line py-12 text-center"><h3 className="font-display text-3xl text-ink">No profiles match this search.</h3><p className="mt-3 text-sm text-muted">Try a different name, care need, location, or speciality.</p></div>}</section>}</section></main><Footer /></>
}
