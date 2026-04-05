import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
import { RevealOnScroll } from '@/components/RevealOnScroll'
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
} from '@/pages/About/About.styled'
import { EMAILJS_RATE_LIMIT_ERROR, sendEmail } from '@/services'
import { requiredTrimmed } from '@/utils/formValidation'
import {
  ButtonInner,
  Form,
  FormFields,
  HoneypotWrap,
  MessageBanner,
  Spinner,
  SubmitRow,
} from '@/pages/OrderForm/OrderForm.styled'
import { PartnershipBlock } from './Suppliers.styled'

export type SuppliersFormValues = {
  company: string
  country: string
  contactPerson: string
  email: string
  message: string
  hpField: string
}

export function Suppliers() {
  const { t } = useTranslation()
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SuppliersFormValues>({
    defaultValues: {
      company: '',
      country: '',
      contactPerson: '',
      email: '',
      message: '',
      hpField: '',
    },
  })

  const onSubmit = async (data: SuppliersFormValues) => {
    setSubmitError(null)
    setSuccess(false)
    if (data.hpField?.trim()) {
      return
    }
    try {
      await sendEmail({
        form_type: 'supplier_inquiry',
        company_name: data.company.trim(),
        country: data.country.trim(),
        contact_person: data.contactPerson.trim(),
        email: data.email.trim(),
        message: data.message.trim(),
      })
      setSuccess(true)
      reset()
    } catch (e) {
      setSubmitError(
        e instanceof Error && e.message === EMAILJS_RATE_LIMIT_ERROR
          ? t('order.formRateLimit')
          : t('suppliers.error'),
      )
    }
  }

  return (
    <PageRoot data-testid="suppliers-page">
      <PageHero
        role="region"
        aria-labelledby="suppliers-hero-title"
        data-testid="suppliers-hero"
      >
        <PageHeroBackdrop aria-hidden />
        <PageHeroInner>
          <PageHeroTitle id="suppliers-hero-title">{t('suppliers.pageTitle')}</PageHeroTitle>
          <PageHeroIntro>{t('suppliers.intro')}</PageHeroIntro>
        </PageHeroInner>
      </PageHero>

      <ContentSection
        role="region"
        aria-label={t('suppliers.pageTitle')}
        data-testid="suppliers-content"
      >
        <RevealOnScroll>
          <ContentInner>
          <PartnershipBlock>
            <SectionHeading>{t('suppliers.partnershipTitle')}</SectionHeading>
            <Prose>
              <p>{t('suppliers.partnership1')}</p>
              <p>{t('suppliers.partnership2')}</p>
            </Prose>
          </PartnershipBlock>

          <SectionHeading>{t('suppliers.formTitle')}</SectionHeading>

          {success ? (
            <MessageBanner $variant="success" role="status" data-testid="suppliers-success">
              {t('suppliers.success')}
            </MessageBanner>
          ) : null}
          {submitError ? (
            <MessageBanner $variant="error" role="alert" data-testid="suppliers-error">
              {submitError}
            </MessageBanner>
          ) : null}

          <Form onSubmit={handleSubmit(onSubmit)} noValidate data-testid="suppliers-form">
            <HoneypotWrap>
              <input
                type="text"
                tabIndex={-1}
                autoComplete="off"
                aria-label={t('order.honeypotLabel')}
                {...register('hpField')}
              />
            </HoneypotWrap>
            <FormFields>
              <Input
                label={t('suppliers.company')}
                error={errors.company?.message}
                register={register('company', {
                  validate: requiredTrimmed(t('order.validationRequired')),
                  maxLength: {
                    value: 200,
                    message: t('order.validationMaxLength'),
                  },
                })}
              />
              <Input
                label={t('suppliers.country')}
                error={errors.country?.message}
                register={register('country', {
                  validate: requiredTrimmed(t('order.validationRequired')),
                  maxLength: {
                    value: 100,
                    message: t('order.validationMaxLength'),
                  },
                })}
              />
              <Input
                label={t('suppliers.contactPerson')}
                error={errors.contactPerson?.message}
                register={register('contactPerson', {
                  validate: requiredTrimmed(t('order.validationRequired')),
                  maxLength: {
                    value: 120,
                    message: t('order.validationMaxLength'),
                  },
                })}
              />
              <Input
                label={t('suppliers.email')}
                type="email"
                autoComplete="email"
                error={errors.email?.message}
                register={register('email', {
                  validate: requiredTrimmed(t('order.validationRequired')),
                  maxLength: {
                    value: 254,
                    message: t('order.validationMaxLength'),
                  },
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: t('order.validationEmail'),
                  },
                })}
              />
              <Input
                label={t('suppliers.message')}
                multiline
                rows={6}
                error={errors.message?.message}
                register={register('message', {
                  validate: requiredTrimmed(t('order.validationRequired')),
                  maxLength: {
                    value: 5000,
                    message: t('order.validationMaxLength'),
                  },
                })}
              />
            </FormFields>

            <SubmitRow>
              <Button type="submit" variant="primary" disabled={isSubmitting} fullWidth>
                <ButtonInner>
                  {isSubmitting ? <Spinner aria-hidden /> : null}
                  {isSubmitting ? t('suppliers.sending') : t('suppliers.submit')}
                </ButtonInner>
              </Button>
            </SubmitRow>
          </Form>
          </ContentInner>
        </RevealOnScroll>
      </ContentSection>
    </PageRoot>
  )
}
