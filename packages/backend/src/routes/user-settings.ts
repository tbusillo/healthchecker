import assert from 'http-assert'
import type { Context, Route } from '../types.js'
import type { Response, Request, NextFunction } from 'express'

export const getUserSettingsFactory: Route = (ctx: Context) => {
  const handleGetUserSettings = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const { logger, db } = ctx

    logger.info('user settings request received')
    const { data, error } = await db
      .from('user_settings')
      .select('*')
      .eq('id', req.auth.id)
      .single()

    assert(!error || !data, 500, 'error fetching user settings')

    res.json(data)
  }

  return (req: Request, res: Response, next: NextFunction) => {
    handleGetUserSettings(req, res).catch((err) => next(err))
  }
}

export const updateUserSettingsFactory: Route = (ctx: Context) => {
  const handleUpdateUserSettings = async (
    req: Request,
    res: Response
  ): Promise<void> => {
    const { logger, db } = ctx

    const { first_name, last_name, email, phone_number, color_mode } = req.body

    assert(first_name, 400, 'first_name is required')
    assert(last_name, 400, 'last_name is required')
    assert(email, 400, 'email is required')
    assert(phone_number, 400, 'phone_number is required')
    assert(color_mode, 400, 'color_mode is required')

    logger.info('user settings request received')
    const { data, error } = await db
      .from('user_settings')
      .update({ first_name, last_name, email, phone_number, color_mode })
      .eq('id', req.auth.id)
      .single()

    assert(!error || !data, 500, 'error fetching user settings')

    res.json(data)
  }

  return (req: Request, res: Response, next: NextFunction) => {
    handleUpdateUserSettings(req, res).catch((err) => next(err))
  }
}
