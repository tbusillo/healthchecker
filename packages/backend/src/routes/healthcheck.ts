import type { Context, Route } from '../types.js'
import type { Response, Request, NextFunction } from 'express'
import pkg from '../../package.json' with { type: 'json' }

export const getHealthcheckFactory: Route = (ctx: Context) => {
  const handleHealthcheck = async (
    _req: Request,
    res: Response
  ): Promise<void> => {
    const { logger } = ctx

    logger.info('healthcheck request received')
    res.json(pkg.version)
  }

  return (req: Request, res: Response, next: NextFunction) => {
    handleHealthcheck(req, res).catch((err) => next(err))
  }
}
