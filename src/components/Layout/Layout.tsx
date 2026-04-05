import { useEffect } from 'react'
import { Navigate, Outlet, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useThemeContext } from '@/context'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { LayoutRoot, Main } from './Layout.styled'

const SUPPORTED_LANGS = new Set(['ru', 'en'])

export function Layout() {
  const { lang } = useParams<{ lang: string }>()
  const { i18n } = useTranslation()
  const { syncThemeFromLanguage } = useThemeContext()

  useEffect(() => {
    if (lang && SUPPORTED_LANGS.has(lang)) {
      void i18n.changeLanguage(lang)
      syncThemeFromLanguage(lang)
      document.documentElement.lang = lang
    }
  }, [lang, i18n, syncThemeFromLanguage])

  if (!lang || !SUPPORTED_LANGS.has(lang)) {
    return <Navigate to="/ru" replace />
  }

  return (
    <LayoutRoot>
      <Header />
      <Main id="site-main">
        <Outlet />
      </Main>
      <Footer />
    </LayoutRoot>
  )
}
