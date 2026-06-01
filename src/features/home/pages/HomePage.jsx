import { useTranslation } from 'react-i18next'
import Hero from '../components/Hero'

export function HomePage() {
  const { t } = useTranslation()

  return (
    <section className="">
        <Hero/>
    </section>
  )
}
