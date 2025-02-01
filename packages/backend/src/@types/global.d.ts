import { Context } from '../types'

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DB_USER: string
      DB_HOST: string
      DB_PASSWORD: string
      DB_PORT: string
      DB_DATABASE: string
      NODE_ENV: string
      BACKEND_SECRET: string
      SUPABASE_URL: string
      SUPABASE_JWT_SECRET: string
      SUPABASE_PRIVATE_KEY: string
      LOG_LEVEL: 'debug' | 'error' | 'info' | 'warn'
    }
  }

  interface ImportMetaEnv {
    readonly DB_USER: string
    readonly DB_HOST: string
    readonly DB_PASSWORD: string
    readonly DB_PORT: string
    readonly DB_DATABASE: string
    readonly NODE_ENV: string
    readonly BACKEND_SECRET: string
    readonly SUPABASE_URL: string
    readonly SUPABASE_JWT_SECRET: string
    readonly SUPABASE_PRIVATE_KEY: string
    readonly LOG_LEVEL: 'debug' | 'error' | 'info' | 'warn'
    readonly DEPLOY_ENV: 'local' | 'dev' | 'prod'
  }

  interface ImportMeta {
    readonly env: ImportMetaEnv
  }

  namespace ImportMeta {
    interface Env {
      DB_USER: string
      DB_HOST: string
      DB_PASSWORD: string
      DB_PORT: string
      DB_DATABASE: string
      NODE_ENV: string
      BACKEND_SECRET: string
      SUPABASE_URL: string
      SUPABASE_JWT_SECRET: string
      SUPABASE_PRIVATE_KEY: string
      LOG_LEVEL: 'debug' | 'error' | 'info' | 'warn'
      DEPLOY_ENV: 'local' | 'dev' | 'prod'
    }
  }

  namespace Express {
    interface Request {
      ctx: Context
      auth: {
        id: string
        aud: string
        exp: number
        iat: number
        iss: string
        sub: string
        email: string
        phone: string
        app_metadata: {
          provider: string
          providers: string[]
        }
        user_metadata: Record<string, unknown>
        role: string
        aal: string
        amr: { method: string; timestamp: number }[]
        session_id: string
      }
    }
  }
}

export {}
