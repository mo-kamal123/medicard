import { useTranslation } from 'react-i18next'

export function HomePage() {
  const { t } = useTranslation()

  return (
    <section className="page-grid">
        <p className="eyebrow">{t('home.eyebrow')}</p>
    </section>
  )
}
