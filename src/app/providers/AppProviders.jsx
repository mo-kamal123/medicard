import { QueryProvider } from '../../shared/providers/QueryProvider'

export function AppProviders({ children }) {
  return <QueryProvider>{children}</QueryProvider>
}
