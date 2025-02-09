import App from './app'
import Register from './components/auth/register'
import Reset from './components/auth/reset'
import CreateOrganization from './pages/organizations/create-organization'
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
      },
      {
        path: '/organizations',
        children: [
          {
            path: 'create',
            element: <CreateOrganization />
          }
        ]
      }
    ]
  }
]
