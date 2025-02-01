import type { Request, RequestHandler } from 'express'
import type { SupabaseClient } from '@supabase/supabase-js'
import type { Database } from 'healthcheck-shared'
import { consola } from 'consola'

export type DeployEnvironments = 'local' | 'dev' | 'prod' | 'test'

export interface Context {
  db: SupabaseClient<Database, 'public'>
  auth: SupabaseClient['auth']
  logger: typeof consola
  config: {
    environment: string
    deployEnvironment: DeployEnvironments
    jwtSecret: string
  }
}

export interface RequestWithContext extends Request {
  ctx: Context
}

export type Route = (context: Context) => RequestHandler

export type AsyncRouteFactory = (
  context: Context
) => (req: Request, res: Response) => Promise<void>

export type HttpError = Error & { status?: number }
