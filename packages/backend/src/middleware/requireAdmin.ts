import type { Context, Route } from '../types.js'
import express from 'express'
import assert from 'http-assert'

export const requireAdminMiddleware: Route = (ctx: Context) => {
  const handleRequireAdmin = async (req: express.Request) => {
    const { db } = ctx

    assert(req.auth && req.auth.id, 401, 'Unauthorized')

    const { data, error } = await db
      .from('organization_users')
      .select('*')
      .eq('user_id', req.auth.id)
      .limit(1)
    console.log(error)
    assert(!error, 500, 'error fetching organizations')
    assert(data[0].is_admin, 401, 'Unauthorized')

    console.log('Is the user an admin?', data[0].is_admin)
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
