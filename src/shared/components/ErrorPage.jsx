import { isRouteErrorResponse, Link, useRouteError } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export function ErrorPage() {
  const { t } = useTranslation()
  const error = useRouteError()
  const message = isRouteErrorResponse(error)
    ? `${error.status} ${error.statusText}`
    : (error?.message ?? t('errors.unexpected'))

  return (
    <main className="centered-page">
      <section className="panel">
        <p className="eyebrow">{t('errors.routing')}</p>
        <h1>{message}</h1>
        <Link className="button" to="/">
          {t('common.backHome')}
        </Link>
      </section>
    </main>
  )
}
