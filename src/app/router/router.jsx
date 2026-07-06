import { createBrowserRouter, Navigate } from 'react-router-dom'
import { AppLayout } from '../../shared/components/AppLayout'
import { ErrorPage } from '../../shared/components/ErrorPage'
import { HomePage } from '../../features/home/pages/HomePage'
import Providers from '../../features/providers/pages/Providers'
import ProviderPage from '../../features/providerPage/pages/ProviderPage'
import BecomeProvider from '../../features/becomeProvider/pages/BecomeProvider'
import MedicardActivation from '../../features/medicardActivation/pages/MedicardActivation'
import BuyCard from '../../features/buyCard/pages/BuyCard'

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
      {
        path: 'medicard-activation',
        element: <MedicardActivation />,
      },
      {
        path: 'buy-card',
        element: <BuyCard />,
      },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/" replace />,
  },
])
