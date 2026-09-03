import { Activity, Bone, Brain, Eye, HeartPulse, Stethoscope } from 'lucide-react'

export const specialities = [
  { name: 'General Physician', detail: 'First point of care', icon: Stethoscope },
  { name: 'Cardiologist', detail: 'Heart & circulation', icon: HeartPulse },
  { name: 'Dermatologist', detail: 'Skin, hair & nails', icon: Activity },
  { name: 'Pediatrician', detail: 'Care for children', icon: Brain },
  { name: 'Orthopedic', detail: 'Bones & movement', icon: Bone },
  { name: 'Ophthalmologist', detail: 'Eye care', icon: Eye },
]

export const featuredProfiles = [
  { initials: 'AS', speciality: 'Dermatology', place: 'Bhopal, Madhya Pradesh' },
  { initials: 'RK', speciality: 'Cardiology', place: 'Indore, Madhya Pradesh' },
  { initials: 'NM', speciality: 'General Medicine', place: 'Pune, Maharashtra' },
]

export const faqs = [
  { question: 'How is doctor information verified?', answer: 'Profiles will show the verification status and the date important details were last checked. Verification workflows are introduced in later phases.' },
  { question: 'Does mediTrust provide medical advice?', answer: 'No. mediTrust helps you discover doctor categories and professional information. It does not diagnose conditions or provide treatment advice.' },
  { question: 'Can I book an appointment through mediTrust?', answer: 'Not in the initial release. Profiles will clearly show available ways to contact a clinic or hospital when that information is available.' },
  { question: 'What does “Popular” mean?', answer: 'It reflects meaningful engagement with a profile, not medical quality or a recommendation that one doctor is better than another.' },
]
