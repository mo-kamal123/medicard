import { useTranslation } from 'react-i18next'

export function HomePage() {
  const { t } = useTranslation()

  return (
    <section className="">
        <p className="eyebrow">{t('home.eyebrow')}</p>
    </section>
  )
}
