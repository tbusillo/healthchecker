import { FormEvent, useState } from 'react'
import { supabase } from '../../utils/supabaseClient'
import { Link } from 'react-router-dom'
import { Button } from '../catalyst/button'

export default function Register() {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState<string | number | null>(null)

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      setPassword('')
      setConfirmPassword('')
      return
    }

    setLoading(true)
    const { error } = await supabase.auth.signUp({
      email,
      password
    })

    if (error) {
      setError(error.message)
      setPassword('')
      setConfirmPassword('')
    }

    setLoading(false)
  }

  return (
    <div className="flex-center flex flex-col">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h1 className="mt-4 text-center text-2xl font-bold leading-9 tracking-tight text-zinc-400">
          Create an account
        </h1>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        {error && <p className="text-red-500">{error}</p>}
        <form className="space-y-6" onSubmit={handleRegister}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-white"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="block w-full rounded-md border-0 bg-white/5 py-1.5 pl-2.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-zinc-500 sm:text-sm sm:leading-6"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium leading-6 text-white"
            >
              Password
            </label>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="block w-full rounded-md border-0 bg-white/5 py-1.5 pl-2.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-zinc-500 sm:text-sm sm:leading-6"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="password-confirmation"
              className="block text-sm font-medium leading-6 text-white"
            >
              Password confirmation
            </label>
            <div className="mt-2">
              <input
                id="password-confirmation"
                name="password-confirmation"
                type="password"
                autoComplete="confirm-password"
                required
                className="block w-full rounded-md border-0 bg-white/5 py-1.5 pl-2.5 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-zinc-500 sm:text-sm sm:leading-6"
                onChange={(e) => setConfirmPassword(e.target.value)}
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
              Register
            </Button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-zinc-400">
          Already have an account?{' '}
          <Link
            to="/"
            className="font-semibold leading-6 text-zinc-400 hover:text-zinc-300"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  )
}
