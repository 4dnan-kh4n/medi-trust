import { z } from 'zod'
import Review from '../models/Review.js'
import AppError from '../utils/AppError.js'

const reviewInput = z.object({
  type: z.enum(['platform', 'doctor']),
  doctorName: z.string().trim().max(140).optional().or(z.literal('')),
  name: z.string().trim().max(80).optional().or(z.literal('')),
  rating: z.number().int().min(1).max(5),
  message: z.string().trim().min(10).max(700),
}).superRefine((value, context) => {
  if (value.type === 'doctor' && !value.doctorName) context.addIssue({ code: z.ZodIssueCode.custom, path: ['doctorName'], message: 'Name the doctor profile for a doctor review.' })
})

const publicReview = (review) => ({
  id: review.id || review._id.toString(),
  type: review.type,
  doctorName: review.doctorName,
  name: review.name || 'Anonymous',
  rating: review.rating,
  message: review.message,
  createdAt: review.createdAt,
})

export async function createReview(request, response) {
  const parsed = reviewInput.safeParse(request.body)
  if (!parsed.success) throw new AppError('Provide a rating and feedback of at least 10 characters.', 400, parsed.error.flatten().fieldErrors)
  const review = await Review.create({
    type: parsed.data.type === 'doctor' ? 'DOCTOR' : 'PLATFORM',
    doctorName: parsed.data.doctorName || undefined,
    name: parsed.data.name || 'Anonymous',
    rating: parsed.data.rating,
    message: parsed.data.message,
  })
  response.status(201).json({ data: publicReview(review) })
}

export async function listPublicReviews(request, response) {
  const reviews = await Review.find().sort({ createdAt: -1 }).limit(12).lean()
  response.json({ data: reviews.map(publicReview) })
}

export async function listAdminReviews(request, response) {
  const reviews = await Review.find().sort({ createdAt: -1 }).lean()
  response.json({ data: reviews.map(publicReview) })
}

export async function deleteReview(request, response) {
  const review = await Review.findByIdAndDelete(request.params.id)
  if (!review) throw new AppError('Review not found.', 404)
  response.status(204).send()
}
