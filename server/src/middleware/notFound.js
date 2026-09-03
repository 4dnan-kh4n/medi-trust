import AppError from '../utils/AppError.js'

function notFound(request, response, next) {
  next(new AppError(`Route not found: ${request.method} ${request.originalUrl}`, 404))
}

export default notFound
