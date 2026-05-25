import { createBrowserRouter, Navigate } from 'react-router-dom'
import { AppLayout } from '../../shared/components/AppLayout'
import { ErrorPage } from '../../shared/components/ErrorPage'
import { HomePage } from '../../features/home/pages/HomePage'

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
        path: '*',
        element: <Navigate to="/" replace />,
      },
    ],
  },
])
