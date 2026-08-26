import { z } from 'zod'
import { env } from '../config/env.js'
import AiGuidanceMetric from '../models/AiGuidanceMetric.js'
import Speciality from '../models/Speciality.js'
import AppError from '../utils/AppError.js'

const inputSchema = z.object({ concern: z.string().trim().min(10).max(600) }).strict()
const modelSchema = z.object({ specialitySlugs: z.array(z.string()).min(1).max(3), summary: z.string().trim().min(20).max(420), uncertainty: z.enum(['LOW', 'MEDIUM', 'HIGH']) })
const urgentPattern = /chest pain|trouble breathing|difficulty breathing|cannot breathe|severe bleeding|passed out|unconscious|stroke|one.side weakness|seizure|suicid|self.harm/i
const today = () => new Date().toISOString().slice(0, 10)

async function recordMetric(fields) {
  await AiGuidanceMetric.findOneAndUpdate({ date: today() }, { $inc: { requests: 1, ...fields } }, { upsert: true, new: true }).catch(() => {})
}

function urgentResponse() {
  return { status: 'URGENT', title: 'Please seek urgent care now', message: 'Some concerns can need immediate assessment. Call your local emergency number (112 in India), go to the nearest emergency department, or contact a qualified medical professional now. This guide cannot assess emergencies.', specialities: [], source: 'safety', canRetry: false }
}

function fallbackResponse(specialities) {
  const general = specialities.find((item) => item.slug === 'general-physician') || specialities[0]
  return { status: 'GUIDANCE', title: 'A broad starting point', message: 'The speciality guide is temporarily unavailable. A general physician can help assess non-urgent concerns and direct you to the appropriate speciality when needed.', specialities: general ? [{ slug: general.slug, name: general.name }] : [], source: 'fallback', canRetry: true, uncertainty: 'HIGH' }
}

function responseSchema(allowedSlugs) {
  return { type: 'object', additionalProperties: false, required: ['specialitySlugs', 'summary', 'uncertainty'], properties: { specialitySlugs: { type: 'array', minItems: 1, maxItems: 3, items: { type: 'string', enum: allowedSlugs } }, summary: { type: 'string', minLength: 20, maxLength: 420 }, uncertainty: { type: 'string', enum: ['LOW', 'MEDIUM', 'HIGH'] } } }
}

export async function specialityGuidance(request, response) {
  const parsed = inputSchema.safeParse(request.body)
  if (!parsed.success) throw new AppError('Describe your concern in 10 to 600 characters.', 400, parsed.error.flatten().fieldErrors)
  const concern = parsed.data.concern
  if (urgentPattern.test(concern)) { await recordMetric({ urgentRoutes: 1 }); return response.json({ data: urgentResponse() }) }

  const specialities = await Speciality.find({ isActive: true }).select('name slug').sort({ name: 1 }).lean()
  if (!specialities.length) throw new AppError('Speciality guidance is unavailable because no active specialities are configured.', 503)
  if (!env.OPENAI_API_KEY) { await recordMetric({ fallbackResponses: 1 }); return response.json({ data: fallbackResponse(specialities) }) }

  try {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 12000)
    const providerResponse = await fetch('https://api.openai.com/v1/responses', {
      method: 'POST', signal: controller.signal,
      headers: { Authorization: `Bearer ${env.OPENAI_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ model: env.OPENAI_GUIDANCE_MODEL, store: false, max_output_tokens: 350, instructions: `You provide non-diagnostic doctor-speciality guidance for mediTrust. Never diagnose, recommend treatment, give dosing, or claim certainty. Choose one to three specialities only from the provided whitelist. If the concern may need emergency care, choose General Physician only and make the summary say to seek urgent in-person care. Keep the summary brief, neutral, and explain uncertainty. Whitelist: ${specialities.map((item) => `${item.slug} (${item.name})`).join(', ')}.`, input: concern, text: { format: { type: 'json_schema', name: 'speciality_guidance', strict: true, schema: responseSchema(specialities.map((item) => item.slug)) } } }),
    })
    clearTimeout(timeout)
    if (!providerResponse.ok) throw new Error(`Provider status ${providerResponse.status}`)
    const providerData = await providerResponse.json()
    const outputText = providerData.output_text || providerData.output?.flatMap((item) => item.content || []).find((item) => item.type === 'output_text')?.text
    if (!outputText) throw new Error('Provider returned no text output')
    const output = modelSchema.parse(JSON.parse(outputText))
    const specialityBySlug = new Map(specialities.map((item) => [item.slug, item]))
    const suggested = [...new Set(output.specialitySlugs)].map((slug) => specialityBySlug.get(slug)).filter(Boolean).map((item) => ({ slug: item.slug, name: item.name }))
    if (!suggested.length) throw new Error('Provider returned no valid speciality')
    await recordMetric({ providerResponses: 1 })
    response.json({ data: { status: 'GUIDANCE', title: 'Suggested care categories', message: output.summary, specialities: suggested, source: 'ai', canRetry: false, uncertainty: output.uncertainty } })
  } catch (error) {
    console.error('Speciality guidance provider unavailable:', error.name || 'unknown_error')
    await recordMetric({ fallbackResponses: 1 })
    response.json({ data: fallbackResponse(specialities) })
  }
}
