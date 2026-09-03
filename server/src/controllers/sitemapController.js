import Doctor from '../models/Doctor.js'
import '../models/Location.js'
import '../models/Speciality.js'
import { env } from '../config/env.js'

const xmlEscape = (value) => value.replace(/[<>&'"]/g, (character) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;' })[character])
const slugify = (value) => value.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
const url = (path) => `${env.CLIENT_URL.replace(/\/$/, '')}${path}`

export async function sitemap(_request, response) {
  const doctors = await Doctor.find({ isActive: true }).select('primaryLocation primarySpeciality updatedAt').populate('primaryLocation primarySpeciality').lean()
  const discoveryPages = new Map()
  for (const doctor of doctors) {
    if (!doctor.primaryLocation?.city || !doctor.primarySpeciality?.slug) continue
    const path = `/doctors/${slugify(doctor.primaryLocation.city)}/${doctor.primarySpeciality.slug}`
    discoveryPages.set(path, doctor.updatedAt?.toISOString().slice(0, 10))
  }
  const entries = [['/', undefined], ['/explore', undefined], ['/speciality-guide', undefined], ['/privacy', undefined], ['/terms', undefined], ['/disclaimer', undefined], ...discoveryPages.entries()]
    .map(([path, lastmod]) => `<url><loc>${xmlEscape(url(path))}</loc>${lastmod ? `<lastmod>${lastmod}</lastmod>` : ''}</url>`)
    .join('')
  response.type('application/xml').send(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${entries}</urlset>`)
}

export function robots(request, response) {
  const protocol = request.get('x-forwarded-proto') || request.protocol
  response.type('text/plain').send(`User-agent: *\nAllow: /\nSitemap: ${protocol}://${request.get('host')}/sitemap.xml\n`)
}
