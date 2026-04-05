import { useTranslation } from 'react-i18next'
import { Accordion, type AccordionItemData } from '@/components/Accordion'
import {
  ContentInner,
  ContentSection,
  PageHero,
  PageHeroBackdrop,
  PageHeroInner,
  PageHeroIntro,
  PageHeroTitle,
  PageRoot,
} from '@/pages/About/About.styled'
import { CategoryBlock, CategoryHeading, FaqBlocks } from './FAQ.styled'

const FUNDS_KEYS = ['q1', 'q2', 'q3'] as const
const SUPPLIERS_KEYS = ['q1', 'q2'] as const
const GENERAL_KEYS = ['q1', 'q2', 'q3'] as const

function itemsForKeys(
  t: (key: string) => string,
  prefix: 'faq.funds' | 'faq.suppliers' | 'faq.general',
  keys: readonly string[],
): AccordionItemData[] {
  return keys.map((key) => ({
    question: t(`${prefix}.${key}.question`),
    answer: t(`${prefix}.${key}.answer`),
  }))
}

export function FAQ() {
  const { t } = useTranslation()

  const fundsItems = itemsForKeys(t, 'faq.funds', FUNDS_KEYS)
  const suppliersItems = itemsForKeys(t, 'faq.suppliers', SUPPLIERS_KEYS)
  const generalItems = itemsForKeys(t, 'faq.general', GENERAL_KEYS)

  return (
    <PageRoot data-testid="faq-page">
      <PageHero
        role="region"
        aria-labelledby="faq-hero-title"
        data-testid="faq-hero"
      >
        <PageHeroBackdrop aria-hidden />
        <PageHeroInner>
          <PageHeroTitle id="faq-hero-title">{t('faq.pageTitle')}</PageHeroTitle>
          <PageHeroIntro>{t('faq.intro')}</PageHeroIntro>
        </PageHeroInner>
      </PageHero>

      <ContentSection
        role="region"
        aria-label={t('faq.pageTitle')}
        data-testid="faq-content"
      >
        <ContentInner>
          <FaqBlocks>
            <CategoryBlock data-testid="faq-category-funds">
              <CategoryHeading>{t('faq.categories.funds')}</CategoryHeading>
              <Accordion items={fundsItems} />
            </CategoryBlock>

            <CategoryBlock data-testid="faq-category-suppliers">
              <CategoryHeading>{t('faq.categories.suppliers')}</CategoryHeading>
              <Accordion items={suppliersItems} />
            </CategoryBlock>

            <CategoryBlock data-testid="faq-category-general">
              <CategoryHeading>{t('faq.categories.general')}</CategoryHeading>
              <Accordion items={generalItems} />
            </CategoryBlock>
          </FaqBlocks>
        </ContentInner>
      </ContentSection>
    </PageRoot>
  )
}
