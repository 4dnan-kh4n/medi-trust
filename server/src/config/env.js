import dotenv from 'dotenv'
import { z } from 'zod'

dotenv.config()

const environmentSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  PORT: z.coerce.number().int().min(1).max(65535).default(5000),
  CLIENT_URL: z.string().url().default('http://localhost:5173'),
  MONGODB_URI: z.string().min(1).optional(),
  JWT_SECRET: z.string().min(32).optional(),
  INITIAL_ADMIN_EMAIL: z.string().email().optional(),
  INITIAL_ADMIN_PASSWORD: z.string().min(8).optional(),
  OPENAI_API_KEY: z.string().min(20).optional(),
  OPENAI_GUIDANCE_MODEL: z.string().min(3).default('gpt-5.4-mini'),
  UPLOAD_DIR: z.string().min(1).optional(),
}).superRefine((value, context) => {
  if (value.NODE_ENV !== 'production') return
  for (const key of ['MONGODB_URI', 'JWT_SECRET']) if (!value[key]) context.addIssue({ code: z.ZodIssueCode.custom, path: [key], message: `${key} is required in production.` })
})

const result = environmentSchema.safeParse(process.env)

if (!result.success) {
  console.error('Invalid environment configuration:', result.error.flatten().fieldErrors)
  process.exit(1)
}

export const env = result.data
