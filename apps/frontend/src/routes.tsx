import App from './app'
import Register from './components/auth/register'
import Reset from './components/auth/reset'
import ListHealthchecks from './pages/healthchecks/list-healthchecks'
import CreateOrganization from './pages/organizations/create-organization'
import ListOrganizations from './pages/organizations/list-organizations'
import ListSettings from './pages/settings/list-settings'
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
        path: '/settings',
        element: <ListSettings />
      },
      {
        path: '/organizations',
        children: [
          {
            path: 'create',
            element: <CreateOrganization />
          },
          {
            path: '',
            element: <ListOrganizations />
          }
        ]
      },
      {
        path: '/healthchecks',
        element: <ListHealthchecks />
      }
    ]
  }
]
