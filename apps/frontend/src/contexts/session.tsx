import { AuthError, Session, SupabaseClient } from '@supabase/supabase-js'
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react'

export type SessionContext =
  | {
      loading: true
      session: null
      error: null
      supabaseClient: SupabaseClient
    }
  | {
      loading: false
      session: Session | null
      error: null
      supabaseClient: SupabaseClient
    }
  | {
      loading: false
      session: null
      error: AuthError
      supabaseClient: SupabaseClient
    }
  | {
      loading: false
      session: null
      error: null
      supabaseClient: SupabaseClient
    }

const SessionContext = createContext<SessionContext>({
  loading: true,
  session: null,
  error: null,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  supabaseClient: {} as any
})

export interface SessionContextProviderProps {
  supabaseClient: SupabaseClient
  initialSession?: Session | null
}

export const SessionContextProvider = ({
  supabaseClient,
  initialSession = null,
  children
}: PropsWithChildren<SessionContextProviderProps>) => {
  const [session, setSession] = useState<Session | null>(initialSession)
  const [loading, setLoading] = useState<boolean>(!initialSession)
  const [error, setError] = useState<AuthError>()

  useEffect(() => {
    if (initialSession) {
      setSession(initialSession)
    }
  }, [session, initialSession, supabaseClient])

  useEffect(() => {
    let mounted = true

    if (initialSession) {
      return
    }

    async function getSession() {
      if (!supabaseClient) {
        setLoading(false)
        return
      }

      const {
        data: { session },
        error
      } = await supabaseClient.auth.getSession()

      // only update the react state if the component is still mounted
      if (mounted) {
        if (error) {
          setError(error)
          setLoading(false)
          return
        }

        setSession(session)
        setLoading(false)
      }
    }

    getSession().catch((error: AuthError) => {
      setError(error)
      setLoading(false)
    })

    return () => {
      mounted = false
    }
  }, [
    supabaseClient?.auth,
    setSession,
    setLoading,
    initialSession,
    supabaseClient
  ])

  useEffect(() => {
    if (initialSession) {
      return
    }

    const {
      data: { subscription }
    } = supabaseClient.auth.onAuthStateChange((event, session) => {
      if (
        session &&
        (event === 'SIGNED_IN' ||
          event === 'TOKEN_REFRESHED' ||
          event === 'USER_UPDATED')
      ) {
        setSession(session)
      }

      if (event === 'SIGNED_OUT') {
        setSession(null)
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [supabaseClient, initialSession])

  const value: SessionContext = useMemo(() => {
    if (initialSession) {
      return {
        loading: false,
        session: initialSession,
        error: null,
        supabaseClient: supabaseClient
      }
    }

    if (loading) {
      return {
        loading: true,
        session: null,
        error: null,
        supabaseClient
      }
    }

    if (error) {
      return {
        loading: false,
        session: null,
        error,
        supabaseClient
      }
    }

    return {
      loading: false,
      session,
      error: null,
      supabaseClient
    }
  }, [loading, error, session, supabaseClient, initialSession])

  return (
    <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
  )
}

export const useSessionContext = () => {
  const context = useContext(SessionContext)
  if (context === undefined) {
    throw new Error(
      `useSessionContext must be used within a SessionContextProvider.`
    )
  }

  return context
}

export function useSupabaseClient<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Database = any,
  SchemaName extends string & keyof Database = 'public' extends keyof Database
    ? 'public'
    : string & keyof Database
>() {
  const context = useContext(SessionContext)
  if (context === undefined) {
    throw new Error(
      `useSupabaseClient must be used within a SessionContextProvider.`
    )
  }

  return context.supabaseClient as SupabaseClient<Database, SchemaName>
}

export const useSession = () => {
  const context = useContext(SessionContext)
  if (context === undefined) {
    throw new Error(`useSession must be used within a SessionContextProvider.`)
  }

  return context.session
}

export const useUser = () => {
  const context = useContext(SessionContext)
  if (context === undefined || !context.session || !context.session.user) {
    throw new Error(`useUser must be used within a SessionContextProvider.`)
  }

  return { ...context.session.user }
}

export function SessionProvider(
  props: PropsWithChildren<SessionContextProviderProps>
) {
  return <SessionContextProvider {...props} />
}
