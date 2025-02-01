import { Response, NextFunction } from 'express'
import { Context, RequestWithContext } from '../types.js'

export default function attachContext(ctx: Context) {
  return (
    req: RequestWithContext,
    _res: Response,
    next: NextFunction
  ): void => {
    req.ctx = ctx
    next()
  }
}
