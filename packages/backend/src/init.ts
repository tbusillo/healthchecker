import { consola as logger } from 'consola'
import startApp from './app.js'
import { Context, DeployEnvironments } from './types.js'
import assert from 'node:assert'
import redactSecret from './utils/redactSecret.js'
import { createClient } from '@supabase/supabase-js'

const {
  NODE_ENV = 'development',
  DEPLOY_ENV = 'local',
  SUPABASE_URL,
  SUPABASE_PRIVATE_KEY: SUPABASE_KEY,
  SUPABASE_JWT_SECRET,
  BACKEND_PORT = '3001'
} = process.env

assert(
  ['local', 'dev', 'prod'].includes(DEPLOY_ENV),
  'invalid deploy environment'
)

const requiredEnvVars = [
  'SUPABASE_URL',
  'SUPABASE_PRIVATE_KEY',
  'SUPABASE_JWT_SECRET'
]

for (const envVar of requiredEnvVars) {
  assert(envVar, `missing env var ${envVar}`)
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

const ctx: Context = {
  db: supabase,
  auth: supabase.auth,
  logger,
  config: {
    environment: NODE_ENV,
    deployEnvironment: DEPLOY_ENV as DeployEnvironments,
    jwtSecret: SUPABASE_JWT_SECRET
  }
}

logger.info('context created; config: ', {
  ...ctx.config,
  jwtSecret: redactSecret()
})

async function initApp(): Promise<void> {
  const app = startApp(ctx)

  process.on('SIGINT', () => {
    console.log()
    console.log('SIGINT received, shutting down...')
  })

  return new Promise((resolve, reject) => {
    app.listen(BACKEND_PORT, (error?: Error) => {
      if (error) {
        reject(error)
      }
      logger.info(`server listening on port ${BACKEND_PORT}`)
      resolve()
    })
  })
}

try {
  logger.start('initializing backend')
  await initApp()
} catch (err) {
  logger.error('failed to initialize backend', err)
  process.nextTick(() => process.exit(1))
}
