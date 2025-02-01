import { Outlet, useLocation } from 'react-router-dom'
import Login from '../components/auth/login'
import { useSessionContext } from '../contexts/session'

export default function Auth() {
  const { session } = useSessionContext()
  const location = useLocation()

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-6 lg:-mt-20 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        {session ||
        location.pathname === '/reset' ||
        location.pathname === '/register' ? (
          <Outlet />
        ) : (
          <Login />
        )}
      </div>
    </div>
  )
}
