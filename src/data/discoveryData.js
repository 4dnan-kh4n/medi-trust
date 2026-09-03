export const discoveryLocations = {
  'Madhya Pradesh': ['Bhopal', 'Indore'],
  Maharashtra: ['Pune'],
}

export const discoverySpecialities = [
  'General Physician',
  'Cardiologist',
  'Dermatologist',
  'Pediatrician',
  'Orthopedic',
  'Ophthalmologist',
  'Neurologist',
]

export const mockDoctors = [
  { id: 'anika-mehra', name: 'Dr. Anika Mehra', initials: 'AM', speciality: 'Dermatologist', qualifications: 'MBBS, MD (Dermatology)', experience: 12, locality: 'Arera Colony', city: 'Bhopal', state: 'Madhya Pradesh', facility: 'Lakeview Skin Clinic', appointment: 'Call clinic before visiting', languages: ['English', 'Hindi'], verified: true, verifiedOn: '12 Aug 2026', peopleChoice: true },
  { id: 'rohan-iyer', name: 'Dr. Rohan Iyer', initials: 'RI', speciality: 'Cardiologist', qualifications: 'MBBS, MD (Medicine)', experience: 15, locality: 'Shahpura', city: 'Bhopal', state: 'Madhya Pradesh', facility: 'Central Heart Care', appointment: 'Clinic desk booking', languages: ['English', 'Hindi'], verified: true, verifiedOn: '04 Aug 2026' },
  { id: 'kavya-shah', name: 'Dr. Kavya Shah', initials: 'KS', speciality: 'General Physician', qualifications: 'MBBS, DNB (Family Medicine)', experience: 9, locality: 'MP Nagar', city: 'Bhopal', state: 'Madhya Pradesh', facility: 'First Point Clinic', appointment: 'Walk-ins accepted', languages: ['English', 'Hindi'], verified: true, verifiedOn: '18 Aug 2026' },
  { id: 'zoya-khan', name: 'Dr. Zoya Khan', initials: 'ZK', speciality: 'Pediatrician', qualifications: 'MBBS, MD (Pediatrics)', experience: 11, locality: 'Vijay Nagar', city: 'Indore', state: 'Madhya Pradesh', facility: 'Little Steps Clinic', appointment: 'Phone booking', languages: ['English', 'Hindi'], verified: true, verifiedOn: '09 Aug 2026' },
  { id: 'arjun-bansal', name: 'Dr. Arjun Bansal', initials: 'AB', speciality: 'Orthopedic', qualifications: 'MBBS, MS (Orthopedics)', experience: 14, locality: 'Palasia', city: 'Indore', state: 'Madhya Pradesh', facility: 'Movement Orthopedic Centre', appointment: 'Call clinic before visiting', languages: ['English', 'Hindi'], verified: false, verifiedOn: '22 Jul 2026' },
  { id: 'nilesh-jain', name: 'Dr. Nilesh Jain', initials: 'NJ', speciality: 'Dermatologist', qualifications: 'MBBS, DDVL', experience: 8, locality: 'Kothrud', city: 'Pune', state: 'Maharashtra', facility: 'Clear Skin Studio', appointment: 'Online booking', languages: ['English', 'Marathi', 'Hindi'], verified: true, verifiedOn: '16 Aug 2026' },
  { id: 'minal-desai', name: 'Dr. Minal Desai', initials: 'MD', speciality: 'General Physician', qualifications: 'MBBS, DNB (General Medicine)', experience: 10, locality: 'Aundh', city: 'Pune', state: 'Maharashtra', facility: 'Northside Family Practice', appointment: 'Phone booking', languages: ['English', 'Marathi', 'Hindi'], verified: true, verifiedOn: '11 Aug 2026' },
]

export const mockDoctorDetails = {
  'anika-mehra': {
    bio: 'This fictional development profile demonstrates how a doctor’s professional information, practice locations, and verification history can be presented in one place.',
    additionalSpecialities: ['Hair and nail concerns'],
    consultationNote: 'Call the clinic before visiting',
    clinics: [{ name: 'Arera Practice — fictional', address: '12 Example Avenue, Arera Colony, Bhopal, Madhya Pradesh', fee: 'Fee shared by clinic on request', appointment: 'Phone booking', schedule: [{ day: 'Monday', slots: ['10:00–13:00', '17:00–19:00'] }, { day: 'Tuesday', slots: ['10:00–13:00'] }, { day: 'Wednesday', slots: ['10:00–13:00', '17:00–19:00'] }, { day: 'Thursday', slots: ['10:00–13:00'] }, { day: 'Friday', slots: ['10:00–13:00', '17:00–19:00'] }, { day: 'Saturday', slots: ['10:00–12:00'] }, { day: 'Sunday', slots: [] }] }],
    hospitals: [{ name: 'Bhopal Care Hospital — fictional', department: 'Dermatology', address: '45 Sample Road, Shahpura, Bhopal, Madhya Pradesh', appointment: 'Hospital booking desk', schedule: [{ day: 'Tuesday', slots: ['15:00–17:00'] }, { day: 'Thursday', slots: ['15:00–17:00'] }, { day: 'Saturday', slots: [] }] }],
  },
  'rohan-iyer': {
    bio: 'This fictional development profile is used to preview structured profile information before mediTrust connects to verified data sources.',
    additionalSpecialities: ['Preventive heart care'],
    consultationNote: 'Clinic desk booking',
    clinics: [{ name: 'Central Heart Care — fictional', address: '8 Preview Lane, Shahpura, Bhopal, Madhya Pradesh', fee: 'Fee shared by clinic on request', appointment: 'Clinic desk booking', schedule: [{ day: 'Monday', slots: ['11:00–14:00'] }, { day: 'Wednesday', slots: ['11:00–14:00'] }, { day: 'Friday', slots: ['11:00–14:00'] }, { day: 'Saturday', slots: [] }] }],
    hospitals: [{ name: 'Bhopal Care Hospital — fictional', department: 'Cardiology', address: '45 Sample Road, Shahpura, Bhopal, Madhya Pradesh', appointment: 'Hospital booking desk', schedule: [{ day: 'Tuesday', slots: ['09:00–11:00'] }, { day: 'Thursday', slots: ['09:00–11:00'] }, { day: 'Sunday', slots: [] }] }],
  },
}

export function getMockGuidance(concern) {
  const normalizedConcern = concern.toLowerCase()

  if (/chest|trouble breathing|breathless|faint|unconscious|severe bleeding/.test(normalizedConcern)) {
    return { type: 'urgent', title: 'This concern may need urgent attention', message: 'For severe, sudden, or worsening symptoms, seek emergency care or contact local emergency services now. mediTrust cannot assess urgency or provide medical advice.' }
  }

  if (/skin|rash|itch|acne|hair/.test(normalizedConcern)) {
    return { type: 'suggestion', title: 'A category you could consider', message: 'Based on the words you shared, Dermatology may be a useful starting point for finding a professional.', suggestions: ['Dermatologist'] }
  }

  if (/headache|migraine|dizz|numb/.test(normalizedConcern)) {
    return { type: 'ambiguous', title: 'A couple of categories could be relevant', message: 'The information is not specific enough to choose one category. A General Physician can help guide next steps, and Neurology may be another category to consider.', suggestions: ['General Physician', 'Neurologist'] }
  }

  return { type: 'suggestion', title: 'A useful first category to consider', message: 'For a new or broad health concern, a General Physician can be a practical starting point for professional care navigation.', suggestions: ['General Physician'] }
}
