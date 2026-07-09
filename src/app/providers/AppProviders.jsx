import { useEffect } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { QueryProvider } from '../../shared/providers/QueryProvider'
import i18n from '../../shared/config/i18n/i18n'

function LanguageWatcher() {
  const queryClient = useQueryClient()

  useEffect(() => {
    const handler = () => {
      queryClient.invalidateQueries()
    }
    i18n.on('languageChanged', handler)
    return () => i18n.off('languageChanged', handler)
  }, [queryClient])

  return null
}

export function AppProviders({ children }) {
  return (
    <QueryProvider>
      <LanguageWatcher />
      {children}
    </QueryProvider>
  )
}
