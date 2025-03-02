import assert from 'http-assert'
import type { Context, Route } from '../types.js'
import type { Response, Request, NextFunction } from 'express'

export const getHealthchecksFactory: Route = (ctx: Context) => {
  const handleGetHealthchecks = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const { logger, db } = ctx

    logger.info('organizations request received')
    const { data, error } = await db
      .from('organization_users')
      .select('is_admin, organizations (id, name)')
      .eq('user_id', req.auth.id)
      .limit(1)

    assert(!error, 500, 'error fetching organizations')

    const organization = data[0].organizations.id

    const { data: healthchecks, error: healthchecksError } = await db
      .from('organization_healthchecks')
      .select('*, healthchecks (*)')
      .eq('organization_id', organization)

    assert(!healthchecksError, 500, 'error fetching healthchecks')

    const returnedHealthchecks = healthchecks.map(
      (healthcheck) => healthcheck.healthchecks
    )

    res.json(returnedHealthchecks)
  }

  return (req: Request, res: Response, next: NextFunction) => {
    handleGetHealthchecks(req, res).catch((err) => next(err))
  }
}

export const createHealthchecksFactory: Route = (ctx: Context) => {
  const handleCreateHealthchecks = async (
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
    handleCreateHealthchecks(req, res).catch((err) => next(err))
  }
}
