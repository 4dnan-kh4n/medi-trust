import { useEffect } from 'react'

function upsertMeta(attribute, key, content) {
  let element = document.head.querySelector(`meta[${attribute}="${key}"]`)
  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attribute, key)
    document.head.appendChild(element)
  }
  element.setAttribute('content', content)
}

export default function Seo({ title, description, structuredData }) {
  useEffect(() => {
    document.title = title
    upsertMeta('name', 'description', description)
    upsertMeta('property', 'og:title', title)
    upsertMeta('property', 'og:description', description)
    upsertMeta('property', 'og:type', 'website')
    let canonical = document.head.querySelector('link[rel="canonical"]')
    if (!canonical) { canonical = document.createElement('link'); canonical.setAttribute('rel', 'canonical'); document.head.appendChild(canonical) }
    canonical.setAttribute('href', window.location.href.split('?')[0])
    let script = document.head.querySelector('script[data-medi-trust-structured-data]')
    if (!structuredData) { script?.remove(); return undefined }
    if (!script) { script = document.createElement('script'); script.type = 'application/ld+json'; script.dataset.mediTrustStructuredData = 'true'; document.head.appendChild(script) }
    script.textContent = JSON.stringify(structuredData)
    return () => { script?.remove() }
  }, [description, structuredData, title])
  return null
}
