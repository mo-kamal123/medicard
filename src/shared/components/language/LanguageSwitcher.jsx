import { useTranslation } from 'react-i18next'
import { supportedLanguages } from '../../config/i18n'

export function LanguageSwitcher() {
  const { i18n, t } = useTranslation()

  return (
    <label className="language-switcher">
      <span>{t('language.label')}</span>
      <select
        value={i18n.resolvedLanguage}
        onChange={(event) => i18n.changeLanguage(event.target.value)}
      >
        {supportedLanguages.map((language) => (
          <option key={language} value={language}>
            {t(`language.${language === 'ar' ? 'arabic' : 'english'}`)}
          </option>
        ))}
      </select>
    </label>
  )
}
