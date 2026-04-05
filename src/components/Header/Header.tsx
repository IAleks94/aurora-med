import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useThemeContext } from '@/context'
import { breakpoints } from '@/styles/theme'
import {
  Controls,
  DesktopNav,
  DesktopOnlyLang,
  DesktopOnlyTheme,
  HeaderBar,
  IconButton,
  Inner,
  LangButton,
  LangGroup,
  LangSep,
  LogoLink,
  LogoPlus,
  LogoWord,
  MenuToggle,
  MobileControls,
  MobileNav,
  MobileNavItem,
  MobilePanel,
  NavItem,
} from './Header.styled'

const SUPPORTED = new Set(['ru', 'en'])

const NAV_KEYS = [
  { key: 'home' as const, path: '' },
  { key: 'about' as const, path: '/about' },
  { key: 'order' as const, path: '/order' },
  { key: 'suppliers' as const, path: '/suppliers' },
  { key: 'contacts' as const, path: '/contacts' },
  { key: 'faq' as const, path: '/faq' },
]

function LogoMark() {
  return (
    <LogoPlus aria-hidden>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 2L13.9 8.1L20 10L13.9 11.9L12 18L10.1 11.9L4 10L10.1 8.1L12 2Z"
          fill="currentColor"
          opacity="0.95"
        />
      </svg>
    </LogoPlus>
  )
}

function SunIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  )
}

function HamburgerIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M18 6L6 18M6 6l12 12" />
    </svg>
  )
}

export function Header() {
  const { lang: langParam } = useParams<{ lang: string }>()
  const lang = langParam && SUPPORTED.has(langParam) ? langParam : 'ru'
  const { t } = useTranslation()
  const location = useLocation()
  const navigate = useNavigate()
  const { themeMode, toggleTheme } = useThemeContext()
  const isDark = themeMode === 'dark'

  const [menuOpen, setMenuOpen] = useState(false)
  const menuToggleRef = useRef<HTMLButtonElement>(null)
  const mobilePanelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoints.tablet})`)
    const closeIfDesktop = () => {
      if (!mq.matches) setMenuOpen(false)
    }
    closeIfDesktop()
    mq.addEventListener('change', closeIfDesktop)
    return () => mq.removeEventListener('change', closeIfDesktop)
  }, [])

  useEffect(() => {
    const main = document.getElementById('site-main')
    const footer = document.getElementById('site-footer')
    if (!main || !footer) return
    if (menuOpen) {
      main.setAttribute('inert', '')
      footer.setAttribute('inert', '')
    } else {
      main.removeAttribute('inert')
      footer.removeAttribute('inert')
    }
    return () => {
      main.removeAttribute('inert')
      footer.removeAttribute('inert')
    }
  }, [menuOpen])

  useLayoutEffect(() => {
    if (!menuOpen) return
    const panel = mobilePanelRef.current
    if (!panel) return
    const firstLink = panel.querySelector<HTMLElement>('a[href]')
    firstLink?.focus()
  }, [menuOpen])

  useEffect(() => {
    if (!menuOpen) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        setMenuOpen(false)
        queueMicrotask(() => menuToggleRef.current?.focus())
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [menuOpen])

  const pathWithoutLang =
    location.pathname.replace(/^\/(en|ru)(?=\/|$)/, '') || ''

  const switchLanguage = (target: 'ru' | 'en') => {
    if (target === lang) return
    const next =
      !pathWithoutLang || pathWithoutLang === '/'
        ? `/${target}`
        : `/${target}${pathWithoutLang.startsWith('/') ? pathWithoutLang : `/${pathWithoutLang}`}`
    navigate({ pathname: next, search: location.search, hash: location.hash })
  }

  return (
    <>
      <HeaderBar $dark={isDark}>
        <Inner>
          <LogoLink to={`/${lang}`} aria-label="Aurora Med home">
            <LogoWord>AURORA</LogoWord>
            <LogoMark />
          </LogoLink>

          <DesktopNav aria-label={t('nav.primary')}>
            {NAV_KEYS.map(({ key, path }) => (
              <NavItem
                key={key}
                to={path ? `/${lang}${path}` : `/${lang}`}
                end={path === ''}
              >
                {t(`nav.${key}`)}
              </NavItem>
            ))}
          </DesktopNav>

          <Controls>
            <DesktopOnlyLang>
              <LangGroup role="group" aria-label={t('language.switch')}>
                <LangButton
                  type="button"
                  $active={lang === 'ru'}
                  onClick={() => switchLanguage('ru')}
                  aria-pressed={lang === 'ru'}
                >
                  {t('language.ru')}
                </LangButton>
                <LangSep aria-hidden>/</LangSep>
                <LangButton
                  type="button"
                  $active={lang === 'en'}
                  onClick={() => switchLanguage('en')}
                  aria-pressed={lang === 'en'}
                >
                  {t('language.en')}
                </LangButton>
              </LangGroup>
            </DesktopOnlyLang>

            <DesktopOnlyTheme>
              <IconButton
                type="button"
                onClick={toggleTheme}
                aria-label={t('theme.toggle')}
                title={t('theme.toggle')}
              >
                {isDark ? <SunIcon /> : <MoonIcon />}
              </IconButton>
            </DesktopOnlyTheme>

            <MenuToggle
              ref={menuToggleRef}
              type="button"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              onClick={() => setMenuOpen((o) => !o)}
              aria-label={
                menuOpen ? t('nav.closeMenu') : t('nav.openMenu')
              }
            >
              {menuOpen ? <CloseIcon /> : <HamburgerIcon />}
            </MenuToggle>
          </Controls>
        </Inner>
      </HeaderBar>

      <MobilePanel
        ref={mobilePanelRef}
        id="mobile-menu"
        $open={menuOpen}
        $dark={isDark}
      >
        <MobileNav>
          {NAV_KEYS.map(({ key, path }) => (
            <MobileNavItem
              key={key}
              to={path ? `/${lang}${path}` : `/${lang}`}
              end={path === ''}
              onClick={() => setMenuOpen(false)}
            >
              {t(`nav.${key}`)}
            </MobileNavItem>
          ))}
        </MobileNav>
        <MobileControls>
          <LangGroup role="group" aria-label={t('language.switch')}>
            <LangButton
              type="button"
              $active={lang === 'ru'}
              onClick={() => switchLanguage('ru')}
              aria-pressed={lang === 'ru'}
            >
              {t('language.ru')}
            </LangButton>
            <LangSep aria-hidden>/</LangSep>
            <LangButton
              type="button"
              $active={lang === 'en'}
              onClick={() => switchLanguage('en')}
              aria-pressed={lang === 'en'}
            >
              {t('language.en')}
            </LangButton>
          </LangGroup>
          <IconButton
            type="button"
            onClick={toggleTheme}
            aria-label={t('theme.toggle')}
            title={t('theme.toggle')}
          >
            {isDark ? <SunIcon /> : <MoonIcon />}
          </IconButton>
        </MobileControls>
      </MobilePanel>
    </>
  )
}
