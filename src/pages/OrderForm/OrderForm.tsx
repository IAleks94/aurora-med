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
} from './OrderForm.styled'

export type OrderFormValues = {
  organization: string
  contactName: string
  email: string
  phone: string
  description: string
  medications: string
  /** Honeypot — must stay empty; obscure name avoids browser autofill on "website". */
  hpField: string
}

export function OrderForm() {
  const { t } = useTranslation()
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<OrderFormValues>({
    defaultValues: {
      organization: '',
      contactName: '',
      email: '',
      phone: '',
      description: '',
      medications: '',
      hpField: '',
    },
  })

  const onSubmit = async (data: OrderFormValues) => {
    setSubmitError(null)
    setSuccess(false)
    if (data.hpField?.trim()) {
      return
    }
    try {
      await sendEmail({
        form_type: 'order_request',
        organization_name: data.organization.trim(),
        contact_name: data.contactName.trim(),
        email: data.email.trim(),
        phone: data.phone.trim(),
        order_description: data.description.trim(),
        medications: data.medications.trim() || '—',
      })
      setSuccess(true)
      reset()
    } catch (e) {
      setSubmitError(
        e instanceof Error && e.message === EMAILJS_RATE_LIMIT_ERROR
          ? t('order.formRateLimit')
          : t('order.error'),
      )
    }
  }

  return (
    <PageRoot data-testid="order-form-page">
      <PageHero
        role="region"
        aria-labelledby="order-hero-title"
        data-testid="order-hero"
      >
        <PageHeroBackdrop aria-hidden />
        <PageHeroInner>
          <PageHeroTitle id="order-hero-title">{t('order.pageTitle')}</PageHeroTitle>
          <PageHeroIntro>{t('order.intro')}</PageHeroIntro>
        </PageHeroInner>
      </PageHero>

      <ContentSection
        role="region"
        aria-label={t('order.pageTitle')}
        data-testid="order-form-section"
      >
        <RevealOnScroll>
          <ContentInner>
          {success ? (
            <MessageBanner $variant="success" role="status" data-testid="order-success">
              {t('order.success')}
            </MessageBanner>
          ) : null}
          {submitError ? (
            <MessageBanner $variant="error" role="alert" data-testid="order-error">
              {submitError}
            </MessageBanner>
          ) : null}

          <Form onSubmit={handleSubmit(onSubmit)} noValidate data-testid="order-form">
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
                label={t('order.organization')}
                error={errors.organization?.message}
                register={register('organization', {
                  validate: requiredTrimmed(t('order.validationRequired')),
                  maxLength: {
                    value: 200,
                    message: t('order.validationMaxLength'),
                  },
                })}
              />
              <Input
                label={t('order.contactName')}
                error={errors.contactName?.message}
                register={register('contactName', {
                  validate: requiredTrimmed(t('order.validationRequired')),
                  maxLength: {
                    value: 120,
                    message: t('order.validationMaxLength'),
                  },
                })}
              />
              <Input
                label={t('order.email')}
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
                label={t('order.phone')}
                type="tel"
                autoComplete="tel"
                error={errors.phone?.message}
                register={register('phone', {
                  validate: requiredTrimmed(t('order.validationRequired')),
                  maxLength: {
                    value: 40,
                    message: t('order.validationMaxLength'),
                  },
                })}
              />
              <Input
                label={t('order.description')}
                multiline
                rows={5}
                error={errors.description?.message}
                register={register('description', {
                  validate: requiredTrimmed(t('order.validationRequired')),
                  maxLength: {
                    value: 5000,
                    message: t('order.validationMaxLength'),
                  },
                })}
              />
              <Input
                label={t('order.medications')}
                multiline
                rows={4}
                error={errors.medications?.message}
                register={register('medications', {
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
                  {isSubmitting ? t('order.sending') : t('order.submit')}
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
