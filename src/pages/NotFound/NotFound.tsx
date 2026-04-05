import { useTranslation } from 'react-i18next'
import { useParams } from 'react-router-dom'
import {
  ContentInner,
  ContentSection,
  PageHeroTitle,
  PageRoot,
  Prose,
} from '@/pages/About/About.styled'
import { BackLink } from './NotFound.styled'

export function NotFound() {
  const { t } = useTranslation()
  const { lang } = useParams<{ lang: string }>()
  const home = `/${lang ?? 'ru'}`

  return (
    <PageRoot data-testid="not-found-page">
      <ContentSection role="region" aria-labelledby="not-found-title">
        <ContentInner>
          <PageHeroTitle id="not-found-title">{t('notFound.title')}</PageHeroTitle>
          <Prose>
            <p>{t('notFound.description')}</p>
          </Prose>
          <BackLink to={home}>{t('notFound.backHome')}</BackLink>
        </ContentInner>
      </ContentSection>
    </PageRoot>
  )
}
