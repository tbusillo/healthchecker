import { FormEvent, useEffect, useState } from 'react'
import { supabase } from '../../utils/supabaseClient'
import { Link } from 'react-router-dom'
import { AtSymbolIcon } from '@heroicons/react/16/solid'
import { Button } from '../catalyst/button'
import { useNavigate } from 'react-router-dom'
import { useSession } from '../../contexts/session'

export default function Login() {
  const session = useSession()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (session) {
      navigate('/', { replace: true })
    }
  }, [session, navigate])

  const handleLogin = async (event: FormEvent) => {
    event.preventDefault()

    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (error) {
      setError(error.message)
      setPassword('')
    }

    setLoading(false)
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-full sm:mx-auto sm:w-full sm:max-w-sm">
        <h1 className="mt-4 text-center text-xl font-semibold leading-9 tracking-tight text-zinc-400">
          Sign in to your account
        </h1>
      </div>
      <div className="mt-6 w-full sm:mx-auto sm:w-full sm:max-w-sm">
        {error && !password && <p className="text-red-500">{error}</p>}
        <form className="space-y-6" onSubmit={handleLogin}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-white"
            >
              Email address
            </label>
            <div className="group relative mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="block w-full rounded-md border-0 bg-white/5 py-1.5 pl-9 text-zinc-300 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-zinc-500 sm:text-sm sm:leading-6"
                onChange={(e) => setEmail(e.target.value)}
              />
              <AtSymbolIcon className="absolute left-3 top-2.5 h-4 w-4 text-zinc-500 group-focus-within:text-zinc-300" />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-white"
              >
                Password
              </label>
              <div className="text-sm">
                <Link
                  to="/reset"
                  className="font-semibold text-zinc-400 hover:text-zinc-500"
                >
                  Forgot password?
                </Link>
              </div>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                className="block w-full rounded-md border-0 bg-white/5 py-1.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-zinc-500 sm:text-sm sm:leading-6"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <Button
              className="mt-2 w-full"
              type="submit"
              color="light"
              disabled={loading}
            >
              Sign In
            </Button>
          </div>
          <p className="mt-10 text-center text-sm text-zinc-400">
            Don't have an account?{' '}
            <Link
              to="/register"
              className="font-semibold leading-6 text-zinc-400 hover:text-zinc-300"
            >
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}
