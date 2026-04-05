import { useCallback } from 'react'
import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import {
  Hero,
  HeroBackdrop,
  HeroConstellation,
  HeroCtas,
  HeroInner,
  HeroPrimaryLink,
  HeroSecondaryButton,
  HeroSubtitle,
  HeroTitle,
} from './Home.styled'

function ConstellationLines() {
  return (
    <>
      <path d="M 80 420 L 220 280 L 380 340 L 520 220 L 640 300" />
      <path d="M 520 220 L 680 160 L 820 260 L 960 200" />
      <path d="M 200 520 L 340 480 L 480 560 L 620 500" />
      <path d="M 720 420 L 860 380 L 1000 440" />
      <path d="M 420 120 L 560 180 L 700 100" />
      <path d="M 640 300 L 720 420" />
    </>
  )
}

export function Home() {
  const { lang } = useParams<{ lang: string }>()
  const { t } = useTranslation()
  const safeLang = lang === 'en' ? 'en' : 'ru'

  const scrollToProcess = useCallback(() => {
    document.getElementById('process')?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  return (
    <>
      <Hero
        role="region"
        aria-labelledby="hero-title"
        data-testid="home-hero"
      >
        <HeroBackdrop aria-hidden />
        <HeroConstellation
          aria-hidden
          viewBox="0 0 1200 800"
          preserveAspectRatio="xMidYMid slice"
        >
          <ConstellationLines />
        </HeroConstellation>
        <HeroInner>
          <HeroTitle id="hero-title">{t('hero.title')}</HeroTitle>
          <HeroSubtitle>{t('hero.subtitle')}</HeroSubtitle>
          <HeroCtas>
            <HeroPrimaryLink to={`/${safeLang}/order`}>
              {t('hero.cta')}
            </HeroPrimaryLink>
            <HeroSecondaryButton type="button" onClick={scrollToProcess}>
              {t('hero.ctaSecondary')}
            </HeroSecondaryButton>
          </HeroCtas>
        </HeroInner>
      </Hero>
      <section id="process" tabIndex={-1} />
    </>
  )
}
