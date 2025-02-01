import { useSessionContext } from './contexts/session'
import Auth from './pages/auth'
import { useHealthcheck } from './hooks/use-healthcheck'
import { supabase } from './utils/supabaseClient'

function App() {
  const { session } = useSessionContext()
  const { data, loading } = useHealthcheck(session?.access_token)
  const handleLogout = () =>
    supabase.auth.signOut().then(() => window.location.reload())

  if (session) {
    return (
      <>
        <h1>Welcome, {session.user.email}</h1>
        <p>
          Response from healthcheck:{' '}
          {loading ? 'loading...' : JSON.stringify(data)}
        </p>
        <button onClick={handleLogout}>Logout</button>
      </>
    )
  }

  return <Auth />
}

export default App
