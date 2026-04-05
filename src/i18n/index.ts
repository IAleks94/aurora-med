import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from './locales/en.json'
import ru from './locales/ru.json'

export type SupportedLanguage = 'ru' | 'en'

export function detectLanguageFromPath(pathname: string): SupportedLanguage {
  const match = pathname.match(/^\/(en|ru)(\/|$)/)
  if (match?.[1] === 'en') return 'en'
  return 'ru'
}

const initialLng =
  typeof window !== 'undefined'
    ? detectLanguageFromPath(window.location.pathname)
    : 'ru'

void i18n.use(initReactI18next).init({
  resources: {
    ru: { translation: ru },
    en: { translation: en },
  },
  lng: initialLng,
  fallbackLng: 'ru',
  supportedLngs: ['ru', 'en'],
  interpolation: { escapeValue: true },
  react: { useSuspense: false },
})

export default i18n
