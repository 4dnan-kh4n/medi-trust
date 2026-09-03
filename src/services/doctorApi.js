import axios from 'axios'

const api = axios.create({ baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api' })
export const getLocations = () => api.get('/locations').then((response) => response.data.data)
export const getSpecialities = () => api.get('/specialities').then((response) => response.data.data)
export const getDoctors = (params) => api.get('/doctors', { params }).then((response) => response.data)
export const getDoctor = (slug) => api.get(`/doctors/${slug}`).then((response) => response.data.data)
export const trackInteraction = (slug, action) => api.post(`/doctors/${slug}/interactions`, { action })
export const submitCorrection = (slug, report) => api.post(`/doctors/${slug}/corrections`, report)
export const submitReview = (review) => api.post('/reviews', review).then((response) => response.data.data)
export const getReviews = () => api.get('/reviews').then((response) => response.data.data)
export const getSpecialityGuidance = (concern) => api.post('/ai/speciality-guidance', { concern }).then((response) => response.data.data)
