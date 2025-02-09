import { useSessionContext } from './contexts/session'
import Auth from './pages/auth'
import DashboardLayout from './layouts/dashboard-layout'

function App() {
  const { session } = useSessionContext()

  if (session) {
    return <DashboardLayout />
  }

  return <Auth />
}

export default App
