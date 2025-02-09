import assert from 'http-assert'
import type { Context, Route } from '../types.js'
import type { Response, Request, NextFunction } from 'express'

export const getOrganizationsFactory: Route = (ctx: Context) => {
  const handleGetOrganizations = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const { logger, db } = ctx

    logger.info('organizations request received')
    const { data, error } = await db
      .from('organization_users')
      .select('organizations (id, name)')
      .eq('user_id', req.auth.id)
      .limit(1)

    assert(!error, 500, 'error fetching organizations')

    res.json(data)
  }

  return (req: Request, res: Response, next: NextFunction) => {
    handleGetOrganizations(req, res).catch((err) => next(err))
  }
}

export const createOrganizationFactory: Route = (ctx: Context) => {
  const handleCreateOrganization = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const { logger, db } = ctx

    const { name } = req.body

    assert(name, 400, 'name is required')

    logger.info('organizations request received')

    const { data, error } = await db
      .from('organizations')
      .insert({ name })
      .select()

    assert(!error, 500, 'error creating organization')
    assert(data, 500, 'error creating organization')

    const { error: orgUserError } = await db.from('organization_users').insert({
      organization_id: data[0].id,
      user_id: req.auth.id,
      is_admin: true
    })

    assert(!orgUserError, 500, 'error creating organization user')

    res.json(data)
  }

  return (req: Request, res: Response, next: NextFunction) => {
    handleCreateOrganization(req, res).catch((err) => next(err))
  }
}
