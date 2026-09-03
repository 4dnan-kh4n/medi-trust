import { Building2, CalendarDays, Copy, MapPin } from 'lucide-react'
import { useState } from 'react'

function PracticeSchedule({ practice, type }) {
  const [copied, setCopied] = useState(false)
  const isHospital = type === 'hospital'

  async function copyAddress() {
    try {
      await navigator.clipboard.writeText(practice.address)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopied(false)
    }
  }

  return (
    <article className="border-t border-line py-6 first:border-t-0 first:pt-0">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div><p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-forest">{isHospital ? <Building2 size={15} aria-hidden="true" /> : <MapPin size={15} aria-hidden="true" />}{isHospital ? 'Hospital affiliation' : 'Clinic'}</p><h3 className="mt-2 text-lg font-extrabold text-ink">{practice.name}</h3>{isHospital && <p className="mt-1 text-sm font-semibold text-muted">Department: {practice.department}</p>}<p className="mt-2 max-w-xl text-sm leading-6 text-muted">{practice.address}</p><p className="mt-2 text-sm text-muted"><strong className="text-ink">Appointment:</strong> {practice.appointment}{practice.fee && <> · <strong className="text-ink">Consultation:</strong> {practice.fee}</>}</p></div>
        <button type="button" onClick={copyAddress} className="inline-flex w-fit items-center gap-2 rounded-full border border-line px-3 py-2 text-xs font-bold text-ink transition hover:border-forest hover:text-forest"><Copy size={14} aria-hidden="true" /> {copied ? 'Address copied' : 'Copy address'}</button>
      </div>
      <div className="mt-5 overflow-hidden rounded-xl border border-line"><div className="flex items-center gap-2 border-b border-line bg-sand/45 px-4 py-3 text-sm font-bold text-ink"><CalendarDays size={16} className="text-forest" aria-hidden="true" /> Consultation schedule</div><dl className="divide-y divide-line">{practice.schedule.map(({ day, slots }) => <div key={day} className="grid grid-cols-[6.5rem_1fr] gap-3 px-4 py-3 text-sm"><dt className="font-semibold text-ink">{day}</dt><dd className="text-muted">{slots.length ? slots.join(' · ') : 'Not listed / closed'}</dd></div>)}</dl></div>
    </article>
  )
}

export default PracticeSchedule
