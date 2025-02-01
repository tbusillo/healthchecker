import type { Context, Route } from '../types.js'
import express from 'express'
import assert from 'http-assert'

export const requireAdminMiddleware: Route = (ctx: Context) => {
  const handleRequireAdmin = async (req: express.Request) => {
    const { db } = ctx

    assert(req.auth && req.auth.id, 401, 'Unauthorized')

    const { data: user } = await db
      .from('user_settings')
      .select('is_admin')
      .eq('user_id', req.auth.id)
      .single()

    console.log('Is the user an admin?', user?.is_admin)
    assert(user && user?.is_admin, 401, 'Unauthorized')
  }

  return (
    req: express.Request,
    _res: express.Response,
    next: express.NextFunction
  ) => {
    handleRequireAdmin(req)
      .then(() => next())
      .catch((err) => next(err))
  }
}

export default requireAdminMiddleware
