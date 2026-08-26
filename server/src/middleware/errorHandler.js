import { env } from '../config/env.js'

function errorHandler(error, request, response, _next) {
  const statusCode = error.statusCode || (error.type === 'entity.parse.failed' || error.name === 'CastError' || error.code === 'LIMIT_FILE_SIZE' ? 400 : error.code === 11000 ? 409 : 500)
  const isProduction = env.NODE_ENV === 'production'

  if (statusCode >= 500) console.error(error)

  response.status(statusCode).json({
    error: {
      message: statusCode === 500 && isProduction ? 'An unexpected error occurred.' : (error.type === 'entity.parse.failed' ? 'Invalid JSON request body.' : error.name === 'CastError' ? 'Invalid record identifier.' : error.code === 'LIMIT_FILE_SIZE' ? 'Image must be 5 MB or smaller.' : error.code === 11000 ? 'A record with that unique value already exists.' : error.message),
      ...(error.details && !isProduction ? { details: error.details } : {}),
    },
  })
}

export default errorHandler
