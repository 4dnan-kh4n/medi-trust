import { getDatabaseStatus } from '../config/database.js'

export function getHealth(request, response) {
  response.status(200).json({
    status: 'ok',
    service: 'meditrust-api',
    database: getDatabaseStatus(),
    timestamp: new Date().toISOString(),
  })
}
