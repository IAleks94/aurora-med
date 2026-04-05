import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { Button } from '@/components/Button'
import { Input } from '@/components/Input'
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
import { sendEmail } from '@/services'
import {
  ButtonInner,
  Form,
  FormFields,
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
    },
  })

  const onSubmit = async (data: SuppliersFormValues) => {
    setSubmitError(null)
    setSuccess(false)
    try {
      await sendEmail({
        form_type: 'supplier_inquiry',
        company_name: data.company,
        country: data.country,
        contact_person: data.contactPerson,
        email: data.email,
        message: data.message,
      })
      setSuccess(true)
      reset()
    } catch {
      setSubmitError(t('suppliers.error'))
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
            <FormFields>
              <Input
                label={t('suppliers.company')}
                error={errors.company?.message}
                register={register('company', {
                  required: t('order.validationRequired'),
                })}
              />
              <Input
                label={t('suppliers.country')}
                error={errors.country?.message}
                register={register('country', {
                  required: t('order.validationRequired'),
                })}
              />
              <Input
                label={t('suppliers.contactPerson')}
                error={errors.contactPerson?.message}
                register={register('contactPerson', {
                  required: t('order.validationRequired'),
                })}
              />
              <Input
                label={t('suppliers.email')}
                type="email"
                autoComplete="email"
                error={errors.email?.message}
                register={register('email', {
                  required: t('order.validationRequired'),
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
                  required: t('order.validationRequired'),
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
      </ContentSection>
    </PageRoot>
  )
}
