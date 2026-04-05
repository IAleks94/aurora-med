import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Card } from '@/components/Card'
import { SectionTitle } from '@/components/SectionTitle'
import alexandraKireeva from '@/assets/images/team/alexandra-kireeva.png'
import irinaKorotkova from '@/assets/images/team/irina-korotkova.png'
import sofiaFleishman from '@/assets/images/team/sofia-fleishman.png'
import {
  ContentInner,
  ContentSection,
  PageHero,
  PageHeroBackdrop,
  PageHeroInner,
  PageHeroIntro,
  PageHeroTitle,
  PageRoot,
  Prose,
  SectionHeading,
  TeamCardBody,
  TeamGrid,
  TeamMemberBio,
  TeamMemberName,
  TeamMemberRole,
  TeamPortraitImg,
  TeamPortraitWrap,
  ValueCardBody,
  ValueCardTitle,
  ValuesGrid,
} from './About.styled'

const TEAM_MEMBER_KEYS = ['alexandra', 'irina', 'sofia'] as const
type TeamMemberKey = (typeof TEAM_MEMBER_KEYS)[number]

const TEAM_IMAGES: Record<TeamMemberKey, string> = {
  alexandra: alexandraKireeva,
  irina: irinaKorotkova,
  sofia: sofiaFleishman,
}

export function About() {
  const { t } = useTranslation()

  const teamMembers = useMemo(
    () =>
      TEAM_MEMBER_KEYS.map((key) => ({
        key,
        imageSrc: TEAM_IMAGES[key],
        name: t(`team.${key}.name`),
        role: t(`team.${key}.role`),
        longDescription: t(`about.team.${key}.longDescription`),
      })),
    [t],
  )

  const values = useMemo(
    () =>
      [
        { titleKey: 'about.value1Title', bodyKey: 'about.value1Body' },
        { titleKey: 'about.value2Title', bodyKey: 'about.value2Body' },
        { titleKey: 'about.value3Title', bodyKey: 'about.value3Body' },
      ] as const,
    [],
  )

  return (
    <PageRoot data-testid="about-page">
      <PageHero
        role="region"
        aria-labelledby="about-hero-title"
        data-testid="about-hero"
      >
        <PageHeroBackdrop aria-hidden />
        <PageHeroInner>
          <PageHeroTitle id="about-hero-title">{t('about.pageTitle')}</PageHeroTitle>
          <PageHeroIntro>{t('about.intro')}</PageHeroIntro>
        </PageHeroInner>
      </PageHero>

      <ContentSection
        role="region"
        aria-labelledby="about-story-heading"
        data-testid="about-story"
      >
        <ContentInner>
          <SectionHeading id="about-story-heading">{t('about.storyTitle')}</SectionHeading>
          <Prose>
            <p>{t('founder.story')}</p>
            <p>{t('about.storyBody')}</p>
          </Prose>
        </ContentInner>
      </ContentSection>

      <ContentSection
        role="region"
        aria-labelledby="about-mission-heading"
        data-testid="about-mission"
      >
        <ContentInner>
          <SectionHeading id="about-mission-heading">{t('about.missionTitle')}</SectionHeading>
          <Prose>
            <p>{t('about.missionBody')}</p>
          </Prose>
        </ContentInner>
      </ContentSection>

      <ContentSection
        role="region"
        aria-labelledby="about-values-heading"
        data-testid="about-values"
      >
        <ContentInner>
          <SectionHeading id="about-values-heading">{t('about.valuesTitle')}</SectionHeading>
          <ValuesGrid>
            {values.map(({ titleKey, bodyKey }) => (
              <Card key={titleKey} padding="lg">
                <ValueCardTitle>{t(titleKey)}</ValueCardTitle>
                <ValueCardBody>{t(bodyKey)}</ValueCardBody>
              </Card>
            ))}
          </ValuesGrid>
        </ContentInner>
      </ContentSection>

      <ContentSection
        role="region"
        aria-labelledby="about-team-heading"
        data-testid="about-team"
      >
        <ContentInner>
          <SectionTitle>
            <span id="about-team-heading">{t('about.teamSectionTitle')}</span>
          </SectionTitle>
          <TeamGrid>
            {teamMembers.map(({ key, imageSrc, name, role, longDescription }) => (
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
                  <TeamMemberBio>{longDescription}</TeamMemberBio>
                </TeamCardBody>
              </Card>
            ))}
          </TeamGrid>
        </ContentInner>
      </ContentSection>
    </PageRoot>
  )
}
