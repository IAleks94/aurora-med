import { useEffect } from 'react'
import { Navigate, Outlet, useLocation, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useThemeContext } from '@/context'
import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { LayoutRoot, Main } from './Layout.styled'

const SUPPORTED_LANGS = new Set(['ru', 'en'])

/** First path segment matches page slug but not locale — redirect to default locale (e.g. /about → /ru/about). */
const KNOWN_PAGE_SLUGS = new Set(['about', 'order', 'suppliers', 'contacts', 'faq'])

export function Layout() {
  const { lang } = useParams<{ lang: string }>()
  const location = useLocation()
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
    if (lang && KNOWN_PAGE_SLUGS.has(lang)) {
      return (
        <Navigate
          to={{
            pathname: `/ru/${lang}`,
            search: location.search,
            hash: location.hash,
          }}
          replace
        />
      )
    }
    const rest = location.pathname.replace(/^\/[^/]+/, '') || '/'
    const pathname = `/ru${rest === '/' ? '' : rest}`
    return (
      <Navigate
        to={{ pathname, search: location.search, hash: location.hash }}
        replace
      />
    )
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
