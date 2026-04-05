import { useCallback, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Card } from '@/components/Card'
import { SectionTitle } from '@/components/SectionTitle'
import alexandraKireeva from '@/assets/images/team/alexandra-kireeva.png'
import irinaKorotkova from '@/assets/images/team/irina-korotkova.png'
import sofiaFleishman from '@/assets/images/team/sofia-fleishman.png'
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
  ProcessConnector,
  ProcessIllustration,
  ProcessInner,
  ProcessSection,
  ProcessStep,
  ProcessStepLabel,
  ProcessSteps,
  TeamCardBody,
  TeamGrid,
  TeamInner,
  TeamMemberBio,
  TeamMemberName,
  TeamMemberRole,
  TeamPortraitImg,
  TeamPortraitWrap,
  TeamSection,
} from './Home.styled'

const TEAM_MEMBER_KEYS = ['alexandra', 'irina', 'sofia'] as const
type TeamMemberKey = (typeof TEAM_MEMBER_KEYS)[number]

const TEAM_IMAGES: Record<TeamMemberKey, string> = {
  alexandra: alexandraKireeva,
  irina: irinaKorotkova,
  sofia: sofiaFleishman,
}

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

  const processSteps = [
    t('process.step1'),
    t('process.step2'),
    t('process.step3'),
    t('process.step4'),
  ] as const

  const teamMembers = useMemo(
    () =>
      TEAM_MEMBER_KEYS.map((key) => ({
        key,
        imageSrc: TEAM_IMAGES[key],
        name: t(`team.${key}.name`),
        role: t(`team.${key}.role`),
        description: t(`team.${key}.description`),
      })),
    [t],
  )

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
      <ProcessSection
        id="process"
        tabIndex={-1}
        role="region"
        aria-labelledby="process-heading"
        data-testid="home-process"
      >
        <ProcessInner>
          <SectionTitle>
            <span id="process-heading">{t('process.title')}</span>
          </SectionTitle>
          <ProcessSteps>
            {processSteps.flatMap((label, index) => {
              const nodes = [
                <ProcessStep key={`step-${index}`}>
                  <ProcessIllustration aria-hidden>{index + 1}</ProcessIllustration>
                  <ProcessStepLabel>{label}</ProcessStepLabel>
                </ProcessStep>,
              ]
              if (index < processSteps.length - 1) {
                nodes.push(<ProcessConnector key={`conn-${index}`} aria-hidden />)
              }
              return nodes
            })}
          </ProcessSteps>
        </ProcessInner>
      </ProcessSection>
      <TeamSection
        id="team"
        tabIndex={-1}
        role="region"
        aria-labelledby="team-heading"
        data-testid="home-team"
      >
        <TeamInner>
          <SectionTitle>
            <span id="team-heading">{t('team.title')}</span>
          </SectionTitle>
          <TeamGrid>
            {teamMembers.map(({ key, imageSrc, name, role, description }) => (
              <Card key={key} padding="lg">
                <TeamCardBody>
                  <TeamPortraitWrap>
                    <TeamPortraitImg
                      src={imageSrc}
                      alt={name}
                      loading="lazy"
                      decoding="async"
                    />
                  </TeamPortraitWrap>
                  <TeamMemberName>{name}</TeamMemberName>
                  <TeamMemberRole>{role}</TeamMemberRole>
                  <TeamMemberBio>{description}</TeamMemberBio>
                </TeamCardBody>
              </Card>
            ))}
          </TeamGrid>
        </TeamInner>
      </TeamSection>
    </>
  )
}
