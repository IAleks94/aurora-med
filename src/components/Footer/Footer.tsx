import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useThemeContext } from '@/context'
import {
  BrandBlock,
  CopyrightLine,
  EmailLink,
  FooterBar,
  FooterNav,
  FooterNavItem,
  Inner,
  LogoLink,
  LogoPlus,
  LogoWord,
} from './Footer.styled'

const SUPPORTED = new Set(['ru', 'en'])

const NAV_KEYS = [
  { key: 'home' as const, path: '' },
  { key: 'about' as const, path: '/about' },
  { key: 'suppliers' as const, path: '/suppliers' },
  { key: 'contacts' as const, path: '/contacts' },
  { key: 'faq' as const, path: '/faq' },
]

function LogoMark() {
  return (
    <LogoPlus aria-hidden>
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 2L13.9 8.1L20 10L13.9 11.9L12 18L10.1 11.9L4 10L10.1 8.1L12 2Z"
          fill="currentColor"
          opacity="0.95"
        />
      </svg>
    </LogoPlus>
  )
}

export function Footer() {
  const { lang: langParam } = useParams<{ lang: string }>()
  const lang = langParam && SUPPORTED.has(langParam) ? langParam : 'ru'
  const { t } = useTranslation()
  const { themeMode } = useThemeContext()
  const isDark = themeMode === 'dark'
  const email = t('footer.email')

  return (
    <FooterBar id="site-footer" $dark={isDark}>
      <Inner>
        <BrandBlock>
          <LogoLink to={`/${lang}`} aria-label="Aurora Med home">
            <LogoWord>AURORA</LogoWord>
            <LogoMark />
          </LogoLink>
          <CopyrightLine>
            {t('footer.copyright')} · {t('footer.rights')}
          </CopyrightLine>
        </BrandBlock>

        <FooterNav>
          {NAV_KEYS.map(({ key, path }) => (
            <FooterNavItem
              key={key}
              to={path ? `/${lang}${path}` : `/${lang}`}
              end={path === ''}
            >
              {t(`nav.${key}`)}
            </FooterNavItem>
          ))}
        </FooterNav>

        <EmailLink href={`mailto:${email}`}>{email}</EmailLink>
      </Inner>
    </FooterBar>
  )
}
