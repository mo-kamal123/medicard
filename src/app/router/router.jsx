import { createBrowserRouter, Navigate } from 'react-router-dom'
import { AppLayout } from '../../shared/components/AppLayout'
import { ErrorPage } from '../../shared/components/ErrorPage'
import { HomePage } from '../../features/home/pages/HomePage'
import Providers from '../../features/providers/pages/Providers'
import ProviderPage from '../../features/providerPage/pages/ProviderPage'

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
    ],
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
])
