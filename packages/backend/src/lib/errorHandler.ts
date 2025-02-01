import type express from 'express'
import type { HttpError } from '../types.js'

const errorHandler = (
  err: HttpError,
  _req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  console.error(err)
  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  if (res.headersSent) {
    return next(err)
  }

  if (import.meta?.env?.NODE_ENV === 'production') {
    res.status(err.status || 500).json({ error: err.message })
  }

  res.status(err.status || 500).json({ error: err.message, stack: err.stack })
}

export default errorHandler
