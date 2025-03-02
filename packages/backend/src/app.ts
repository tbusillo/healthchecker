import express, { type Application, type Request, type Response } from 'express'
import cors from 'cors'
import { Context } from './types.js'
import attachContext from './middleware/attachContext.js'
import pkg from '../package.json' with { type: 'json' }
import errorHandler from './lib/errorHandler.js'
import requireAdminMiddleware from './middleware/requireAdmin.js'
import requireAuthMiddleware from './middleware/requireAuth.js'
import {
  createOrganizationFactory,
  getOrganizationsFactory
} from 'routes/organizations.js'
import {
  getUserSettingsFactory,
  updateUserSettingsFactory
} from 'routes/user-settings.js'
import { getHealthchecksFactory } from 'routes/healthchecks.js'

const startApp = (ctx: Context): Application => {
  const {
    logger,
    config: { environment }
  } = ctx

  const app = express()

  app.use(express.json())
  app.use(cors())
  app.use(attachContext(ctx))
  app.set('json spaces', 2)

  const requireAdmin = requireAdminMiddleware(ctx)
  const requireAuth = requireAuthMiddleware(ctx)

  app.get(
    '/api/healthcheck',
    (_req: express.Request, res: express.Response) => {
      logger.info('healthcheck request received')

      res.json({
        version: pkg.version
      })
      res.status(200)
    }
  )

  app.get(
    '/api/protected',
    requireAuth,
    requireAdmin,
    async (_req: express.Request, res: express.Response) => {
      res.json({ message: 'You are an admin!' })
    }
  )

  /* Organizations */
  app.get(
    '/api/organizations',
    requireAuth,
    requireAdmin,
    getOrganizationsFactory(ctx)
  )
  app.post(
    '/api/organizations',
    requireAuth,
    requireAdmin,
    createOrganizationFactory(ctx)
  )

  /* User Settings */
  app.get('/api/user', requireAuth, getUserSettingsFactory(ctx))
  app.put('/api/user', requireAuth, updateUserSettingsFactory(ctx))

  /* Healthchecks */
  app.get(
    '/api/healthchecks',
    requireAuth,
    requireAdmin,
    getHealthchecksFactory(ctx)
  )

  if (environment === 'production') {
    app.get('*', (_req, res) => {
      res.redirect('http://localhost:3001')
    })
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    app.use((_req, _res, _next) => {
      app.get('*', (_req: Request, res: Response) => {
        res.redirect('http://localhost:3001')
      })
    })
  }

  app.use(errorHandler)

  return app
}

export default startApp
