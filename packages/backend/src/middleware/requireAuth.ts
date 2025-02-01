import type express from 'express'
import assert from 'http-assert'
import jwt from 'jsonwebtoken'
import { Context, Route } from '../types.js'
import type { Request } from 'express'

const requireAuthMiddleware: Route = (ctx: Context): express.Handler => {
  const { jwtSecret } = ctx.config
  const requireAuth = async (req: express.Request) => {
    const token = req.headers.authorization?.split(' ')[1]

    assert(token, 401, 'Unauthorized')

    const user = jwt.verify(token, jwtSecret, {
      algorithms: ['HS256']
    }) as Request['auth']

    assert(user, 401, 'Unauthorized')

    req.auth = { ...user, id: user.sub }
    await Promise.resolve()
  }

  return (
    req: express.Request,
    _res: express.Response,
    next: express.NextFunction
  ) => {
    requireAuth(req)
      .then(() => next())
      .catch((err) => next(err))
  }
}

export default requireAuthMiddleware
