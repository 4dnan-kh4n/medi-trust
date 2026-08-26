import { ArrowRight, LocateFixed, MapPin, Search } from 'lucide-react'

function SelectField({ label, value, onChange, options, placeholder, disabled = false }) {
  return (
    <label className="grid gap-2 text-sm font-bold text-ink">
      {label}
      <select value={value} disabled={disabled} onChange={(event) => onChange(event.target.value)} className="h-12 w-full rounded-xl border border-line bg-white px-3 text-sm font-medium text-ink outline-none transition focus:border-forest focus:ring-2 focus:ring-forest/15 disabled:cursor-not-allowed disabled:bg-sand/50">
        <option value="">{placeholder}</option>
        {options.map((option) => <option key={option.value || option} value={option.value || option}>{option.label || option}</option>)}
      </select>
    </label>
  )
}

function DiscoveryForm({ values, onChange, onSubmit, locations, specialities, submitLabel = 'Show matching doctors', onLocate, locating, locationError }) {
  const cities = locations.filter((location) => location.state === values.state).map((location) => location.city)
  const canSubmit = Boolean(values.query || (values.state && values.city && values.speciality))

  return (
    <form onSubmit={onSubmit} className="border-y border-line py-6">
      <label className="grid gap-2 text-sm font-bold text-ink">Search directly <span className="font-normal text-muted">(doctor name or care need)</span><input value={values.query} onChange={(event) => onChange({ query: event.target.value })} maxLength="80" placeholder="e.g. Dr. Khan, skin doctor, heart specialist" className="h-12 w-full rounded-xl border border-line bg-white px-3 text-sm font-medium text-ink outline-none transition placeholder:text-muted/70 focus:border-forest focus:ring-2 focus:ring-forest/15" /></label>
      <p className="mt-4 text-xs font-bold uppercase tracking-[0.12em] text-muted">or refine by location and speciality</p>
      <div className="grid gap-4 md:grid-cols-3">
        <SelectField label="State" value={values.state} onChange={(value) => onChange({ state: value, city: '' })} options={[...new Set(locations.map((location) => location.state))]} placeholder="Select state" />
        <SelectField label="City" value={values.city} onChange={(value) => onChange({ city: value })} options={cities} placeholder="Select city" disabled={!values.state} />
        <SelectField label="Doctor speciality" value={values.speciality} onChange={(value) => onChange({ speciality: value })} options={specialities.map((item) => ({ value: item.slug, label: item.name }))} placeholder="Select speciality" disabled={!values.city} />
      </div>
      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div><p className="flex items-center gap-2 text-xs leading-5 text-muted"><MapPin size={15} className="text-forest" aria-hidden="true" /> Your location stays in this browser and is only used to select a nearby city.</p>{onLocate && <button type="button" onClick={onLocate} disabled={locating} className="mt-2 inline-flex items-center gap-1.5 text-xs font-bold text-forest hover:text-ink disabled:opacity-60"><LocateFixed size={14} aria-hidden="true" /> {locating ? 'Finding nearby city…' : 'Use my current location'}</button>}{locationError && <p role="status" className="mt-2 text-xs text-coral">{locationError}</p>}</div>
        <button type="submit" disabled={!canSubmit} className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-forest px-5 py-3 text-sm font-bold text-white transition hover:bg-ink focus:outline-none focus:ring-2 focus:ring-forest focus:ring-offset-2 disabled:cursor-not-allowed disabled:bg-line"><Search size={16} aria-hidden="true" /> {submitLabel} <ArrowRight size={16} aria-hidden="true" /></button>
      </div>
    </form>
  )
}

export default DiscoveryForm
