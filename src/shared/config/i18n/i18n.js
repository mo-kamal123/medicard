import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import { resources } from '../../locale'

export const supportedLanguages = ['en', 'ar']
export const defaultLanguage = 'en'

export function getLanguageDirection(language = i18n.language) {
  return language?.startsWith('ar') ? 'rtl' : 'ltr'
}

i18n.use(initReactI18next).init({
  resources,
  lng: localStorage.getItem('medicard-language') ?? defaultLanguage,
  fallbackLng: defaultLanguage,
  supportedLngs: supportedLanguages,
  interpolation: {
    escapeValue: false,
  },
})

i18n.on('languageChanged', (language) => {
  localStorage.setItem('medicard-language', language)
  document.documentElement.lang = language
  document.documentElement.dir = getLanguageDirection(language)
})

document.documentElement.lang = i18n.language
document.documentElement.dir = getLanguageDirection(i18n.language)

export default i18n
