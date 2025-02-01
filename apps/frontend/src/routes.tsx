import App from './app'
import Register from './components/auth/register'
import Reset from './components/auth/reset'
// import ErrorPage from './pages/ErrorPage'

export default [
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/reset',
        element: <Reset />
      },
      {
        path: '/register',
        element: <Register />
      }
    ]
  }
]
