import { SupabaseClientOptions, createClient } from '@supabase/supabase-js'
import { Database } from 'healthcheck-shared'

const defaultOpts: SupabaseClientOptions<'public'> = {
  auth: {
    autoRefreshToken: false,
    persistSession: false,
    detectSessionInUrl: false,
    debug: process.env.LOG_LEVEL === 'debug'
  },
  global: { fetch: fetch.bind(globalThis) }
}

const supabaseClient = (
  supabaseUrl: string,
  supabaseKey: string,
  opts: SupabaseClientOptions<'public'> = defaultOpts
) => {
  return createClient<Database, 'public'>(supabaseUrl, supabaseKey, opts)
}

export { supabaseClient, defaultOpts }
