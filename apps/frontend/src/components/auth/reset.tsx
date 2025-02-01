import { FormEvent, useState } from 'react'
import { supabase } from '../../utils/supabaseClient'
import { Link } from 'react-router-dom'
import { Button } from '../catalyst/button'
import { AtSymbolIcon } from '@heroicons/react/20/solid'

export default function Reset() {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')

  const handleReset = async (event: FormEvent) => {
    event.preventDefault()

    setLoading(true)
    const { error } = await supabase.auth.resetPasswordForEmail(email)

    if (error) {
      alert(error.status || error.message)
    } else {
      alert('Check your email for the login link!')
    }
    setLoading(false)
  }

  return (
    <div className="flex-center flex flex-col">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h1 className="mt-4 text-center text-2xl font-bold leading-9 tracking-tight text-zinc-400">
          Reset your password
        </h1>
      </div>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleReset}>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-zinc-300"
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
            <Button
              className="mt-2 w-full"
              type="submit"
              color="light"
              disabled={loading}
            >
              Reset Password
            </Button>
          </div>
        </form>

        <p className="mt-10 text-center text-sm text-zinc-400">
          <Link
            to="/"
            className="font-semibold leading-6 text-zinc-400 hover:text-zinc-300"
          >
            Return to Login
          </Link>
        </p>
      </div>
    </div>
  )
}
