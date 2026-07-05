import { createBrowserRouter, Navigate } from 'react-router-dom'
import { AppLayout } from '../../shared/components/AppLayout'
import { ErrorPage } from '../../shared/components/ErrorPage'
import { HomePage } from '../../features/home/pages/HomePage'
import Providers from '../../features/providers/pages/Providers'
import ProviderPage from '../../features/providerPage/pages/ProviderPage'
import BecomeProvider from '../../features/becomeProvider/pages/BecomeProvider'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'providers',
        element: <Providers />,
      },
      {
        path: 'provider/:id',
        element: <ProviderPage />,
      },
      {
        path: 'become-provider',
        element: <BecomeProvider />,
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
])
