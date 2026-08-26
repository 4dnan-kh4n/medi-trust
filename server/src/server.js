import app from './app.js'
import { connectDatabase } from './config/database.js'
import { env } from './config/env.js'

async function startServer() {
  await connectDatabase()
  app.listen(env.PORT, () => {
    console.info(`mediTrust API listening on port ${env.PORT}`)
  })
}

startServer().catch((error) => {
  console.error('Unable to start mediTrust API:', error)
  process.exit(1)
})
