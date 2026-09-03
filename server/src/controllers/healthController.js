import { getDatabaseStatus } from '../config/database.js'
import { env } from '../config/env.js'

export function getHealth(request, response) {
  response.status(200).json({
    status: 'online',
    service: 'meditrust-api',
    database: getDatabaseStatus(),
    provider: 'OpenAI',
    models: [env.OPENAI_GUIDANCE_MODEL],
    aiConfigured: Boolean(env.OPENAI_API_KEY),
    timestamp: new Date().toISOString(),
  })
}
