import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { SessionProvider } from './contexts/session'
import { ThemeProvider } from './contexts/theme'
import './index.css'
import routes from './routes'
import { supabase } from './utils/supabaseClient'
import { toast, Toaster } from 'sonner'
import { SWRConfig } from 'swr'
import fetcher from './utils/fetcher'
import cx from 'clsx'

const baseClasses = cx(
  'flex items-center space-x-4 text-[14px] fill-current ease-out hover:ease-in w-fit rounded ring-1 ring-inset relative p-3 ring-1 ring-inset border-none hover:transition-all hover:duration-150 '
)

const darkToastOptions = {
  unstyled: true,
  classNames: {
    error:
      'bg-zinc-800 rounded border border-zinc-700 p-3 w-full flex items-center space-x-4 text-rose-500 fill-cyan-500',
    success: cx(
      baseClasses,
      'bg-emerald-50 text-emerald-700 ring-emerald-600 border-emerald-600 dark:bg-emerald-500/5 dark:text-emerald-200 dark:ring-emerald-600',
      'dark:ring-emerald-600/85 dark:border-emerald-600/85 hover:bg-emerald-100 hover:border-emerald-700',
      'hover:text-emerald-800 hover:ring-emerald-700 dark:hover:bg-emerald-500/30 dark:hover:ring-emerald-600/30 dark:hover:text-emerald-50 dark:hover:border-emerald-400'
    ),
    warning: 'bg-yellow-500 text-zinc-200',
    info: cx(
      baseClasses,
      'bg-indigo-50 text-indigo-600 ring-indigo-600 border-indigo-600 dark:bg-cyan-500/5 dark:text-cyan-100 dark:ring-cyan-600/85 dark:border-cyan-600/85',
      'hover:bg-cyan-100 hover:border-cyan-700 hover:text-cyan-800 hover:ring-cyan-700 dark:hover:bg-cyan-500/30 dark:hover:ring-cyan-300',
      'dark:hover:text-cyan-50 dark:hover:border-cyan-400'
    )
  }
}

export default function Providers() {
  const router = createBrowserRouter(routes)

  return (
    <SWRConfig
      value={{
        fetcher,
        refreshInterval: 0,
        revalidateOnFocus: true,
        onError: (error) => {
          if (error) {
            toast.error(JSON.stringify(error))
          }
        }
      }}
    >
      <ThemeProvider>
        <SessionProvider supabaseClient={supabase}>
          <Toaster className="dark:hidden" />
          <Toaster
            theme="dark"
            className="hidden dark:block"
            toastOptions={darkToastOptions}
          />
          <RouterProvider router={router} />
        </SessionProvider>
      </ThemeProvider>
    </SWRConfig>
  )
}
