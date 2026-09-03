import { Link } from 'react-router-dom'
import Seo from '../components/common/Seo'
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'

const supportEmail = 'support.meditrust@gmail.com'
const contact = { name: 'mediTrust', phone: '7225922802', address: 'Government Forest Hostel, Near 74 Bungalows, Bhopal, M.P., 462003' }

const documents = {
  privacy: {
    title: 'Privacy policy',
    description: 'How mediTrust collects, uses, stores, and protects personal information.',
    summary: 'This policy explains how mediTrust handles information when you use the website, submit feedback, use speciality guidance, or access the admin area.',
    sections: [
      { heading: 'Who we are', paragraphs: [`mediTrust operates the doctor-discovery website and related administrative tools. For questions or privacy requests, contact us at ${supportEmail}, call ${contact.phone}, or write to ${contact.address}.`] },
      { heading: 'Information we collect', paragraphs: ['We collect the information you choose to provide, such as a review name, rating, feedback message, and doctor name. Administrators provide login credentials and may add or update professional directory information. We also process limited technical information needed to operate and secure the site, such as request logs and a short-lived admin-session cookie.'] },
      { heading: 'How we use information', paragraphs: ['We use information to provide doctor discovery, display submitted feedback, maintain and secure the directory, respond to requests, prevent misuse, and improve site reliability. We do not use visitor feedback to make medical-quality claims about a doctor.'] },
      { heading: 'Reviews and public feedback', paragraphs: ['Feedback submitted through the site is stored in our database and may be displayed publicly with the name you provide, your rating, the review type, and the feedback message. If you do not provide a name, it is displayed as Anonymous. Do not include medical records, phone numbers, addresses, or other sensitive personal information in a review.'] },
      { heading: 'Speciality guidance', paragraphs: ['When you use the speciality guidance feature, the text you enter is sent to generate a category suggestion. mediTrust does not store the text of your concern. The feature may use a service provider to generate the response, and it is not designed for emergencies, diagnosis, treatment, or storing health records.'] },
      { heading: 'Cookies and similar technology', paragraphs: ['The public site does not require an account. The admin area uses an essential, HTTP-only session cookie after sign-in so that authorised administrators can access protected tools. We do not use that cookie for advertising.'] },
      { heading: 'Sharing and service providers', paragraphs: ['We share information only when needed to operate the service, such as with hosting, database, security, and speciality-guidance providers, or when required by law. We do not sell personal information.'] },
      { heading: 'Retention and deletion', paragraphs: ['We retain information only for as long as needed for the purposes described here, security, legal obligations, or dispute resolution. You may request correction or deletion of feedback you submitted by contacting us with enough information to identify it. Administrators may remove public feedback that is inappropriate or inaccurate.'] },
      { heading: 'Security', paragraphs: ['We use reasonable technical and organisational safeguards designed to protect information. No internet-based system can guarantee absolute security, so please avoid sending sensitive health or financial information through this website.'] },
      { heading: 'Your choices and updates', paragraphs: ['You can contact us to ask about, correct, or request deletion of personal information associated with your submission. We may update this policy when the service or applicable requirements change; the last-updated date will be revised when we do.'] },
    ],
  },
  terms: {
    title: 'Terms & conditions',
    description: 'The terms governing use of mediTrust.',
    summary: 'These terms set the rules for using mediTrust. By using the website, you agree to them.',
    sections: [
      { heading: 'About mediTrust', paragraphs: ['mediTrust is a doctor-discovery platform. It helps visitors explore listed professional and practice information, but it does not provide medical care, diagnosis, treatment, prescriptions, or emergency services.'] },
      { heading: 'Using the service', paragraphs: ['You may use the public website for lawful, personal, and informational purposes. You must not interfere with the service, attempt unauthorised access, scrape or misuse data, introduce malicious code, or use the platform in a way that harms people, providers, or the service.'] },
      { heading: 'Directory information', paragraphs: ['Professional, practice, schedule, and appointment information can change. We work to present clear information, but do not guarantee that every listing is complete, current, or suitable for your circumstances. Confirm important details directly with the relevant clinic, hospital, or professional before relying on them.'] },
      { heading: 'No medical advice or emergencies', paragraphs: ['The website and speciality guidance feature are not a substitute for a licensed healthcare professional. Do not use mediTrust for urgent or emergency situations. If you believe there is an emergency, call 112 in India, contact local emergency services, or go to the nearest emergency department.'] },
      { heading: 'Feedback and content you submit', paragraphs: ['You are responsible for ensuring that feedback you submit is accurate, lawful, respectful, and does not disclose another person’s private information. By submitting feedback, you allow mediTrust to store, display, moderate, and remove it in connection with operating the service. We may remove content that is abusive, deceptive, unlawful, off-topic, or unsafe.'] },
      { heading: 'Intellectual property', paragraphs: ['The mediTrust name, branding, site design, and original content are protected by applicable intellectual-property laws. You may not reproduce, modify, or commercially exploit them without permission, except where law permits.'] },
      { heading: 'Third-party links and actions', paragraphs: ['The service may link to map, telephone, email, clinic, hospital, or other third-party services. Those services operate independently, and mediTrust is not responsible for their content, availability, privacy practices, or outcomes.'] },
      { heading: 'Availability and changes', paragraphs: ['We may change, suspend, or discontinue features, listings, or access to the site at any time. We do not promise uninterrupted or error-free operation.'] },
      { heading: 'Liability', paragraphs: ['To the extent permitted by applicable law, mediTrust is not liable for decisions, appointments, treatment outcomes, losses, or damages arising from reliance on the site or third-party services. Nothing in these terms limits liability where it cannot lawfully be limited.'] },
      { heading: 'Governing law and contact', paragraphs: [`These terms are governed by applicable laws of India. For questions, contact ${supportEmail}, call ${contact.phone}, or write to ${contact.address}.`] },
    ],
  },
  disclaimer: {
    title: 'Medical disclaimer',
    description: 'Important limitations of mediTrust medical and directory information.',
    summary: 'Please read this before using doctor listings or speciality guidance on mediTrust.',
    sections: [
      { heading: 'Not medical advice', paragraphs: ['Information on mediTrust is provided for general discovery and informational purposes only. It is not medical advice, diagnosis, treatment, a prescription, or a substitute for an in-person evaluation by a qualified healthcare professional.'] },
      { heading: 'Not for emergencies', paragraphs: ['Do not use mediTrust in an emergency. If you have severe symptoms, chest pain, trouble breathing, severe bleeding, signs of stroke, loss of consciousness, thoughts of self-harm, or another urgent concern, call 112 in India, contact local emergency services, or go to the nearest emergency department.'] },
      { heading: 'Speciality guidance limitations', paragraphs: ['The speciality guidance feature only suggests broad care categories based on the text you provide. It cannot assess your condition, determine urgency with certainty, recommend treatment, or replace professional judgement. A suggested category is not a recommendation of a particular doctor or a statement about quality.'] },
      { heading: 'Doctor, clinic, and hospital information', paragraphs: ['Directory listings, qualifications, schedules, appointment methods, and contact details may change. mediTrust does not guarantee that any profile is complete, verified, available, or appropriate for your needs. Confirm all important information directly with the provider before booking or seeking care.'] },
      { heading: 'No endorsement or ranking of clinical quality', paragraphs: ['Profiles, interaction information, and visitor feedback are not clinical endorsements, medical rankings, or guarantees of outcomes. A listing, review, or visibility on mediTrust must not be understood as an assertion that any person is the best or most suitable provider.'] },
      { heading: 'Your responsibility', paragraphs: ['You are responsible for your healthcare decisions. Seek advice from a qualified professional who can consider your individual history, symptoms, examination, and test results.'] },
      { heading: 'Contact', paragraphs: [`For questions about this disclaimer, contact mediTrust at ${supportEmail}, call ${contact.phone}, or write to ${contact.address}.`] },
    ],
  },
}

function LegalPage({ documentKey }) {
  const document = documents[documentKey]
  return <><Seo title={`${document.title} | mediTrust`} description={document.description} /><Header /><main className="bg-canvas"><article className="mx-auto max-w-4xl px-5 py-12 lg:px-8 lg:py-18"><Link to="/" className="text-sm font-bold text-forest transition hover:text-ink">← Return home</Link><p className="mt-10 text-xs font-bold uppercase tracking-[0.14em] text-forest">Legal information</p><h1 className="mt-3 font-display text-5xl font-semibold tracking-[-0.055em] text-ink sm:text-6xl">{document.title}</h1><p className="mt-5 max-w-3xl text-lg leading-8 text-muted">{document.summary}</p><p className="mt-5 text-sm text-muted">Last updated: 26 August 2026</p><div className="mt-12 space-y-10">{document.sections.map((section) => <section key={section.heading} className="border-t border-line pt-8"><h2 className="text-2xl font-bold tracking-[-0.04em] text-ink">{section.heading}</h2>{section.paragraphs.map((paragraph) => <p key={paragraph} className="mt-4 text-sm leading-7 text-muted">{paragraph}</p>)}</section>)}</div></article></main><Footer /></>
}

export default LegalPage
