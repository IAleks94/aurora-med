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
import {
  ContactCard,
  ContactInfoGrid,
  ContactInfoSection,
  ContactLink,
  ContactMetaLabel,
  ContactMetaValue,
} from './Contacts.styled'

export type ContactsFormValues = {
  name: string
  email: string
  message: string
}

function phoneHref(phone: string): string {
  return `tel:${phone.replace(/[^\d+]/g, '')}`
}

export function Contacts() {
  const { t } = useTranslation()
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactsFormValues>({
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  })

  const onSubmit = async (data: ContactsFormValues) => {
    setSubmitError(null)
    setSuccess(false)
    try {
      await sendEmail({
        form_type: 'contact_feedback',
        contact_name: data.name,
        email: data.email,
        message: data.message,
      })
      setSuccess(true)
      reset()
    } catch {
      setSubmitError(t('contacts.error'))
    }
  }

  const emailValue = t('contacts.emailValue')
  const phoneValue = t('contacts.phoneValue')

  return (
    <PageRoot data-testid="contacts-page">
      <PageHero
        role="region"
        aria-labelledby="contacts-hero-title"
        data-testid="contacts-hero"
      >
        <PageHeroBackdrop aria-hidden />
        <PageHeroInner>
          <PageHeroTitle id="contacts-hero-title">{t('contacts.pageTitle')}</PageHeroTitle>
          <PageHeroIntro>{t('contacts.intro')}</PageHeroIntro>
        </PageHeroInner>
      </PageHero>

      <ContentSection
        role="region"
        aria-label={t('contacts.pageTitle')}
        data-testid="contacts-content"
      >
        <ContentInner>
          <ContactInfoSection data-testid="contacts-info">
            <ContactInfoGrid>
              <ContactCard>
                <ContactMetaLabel>{t('contacts.emailLabel')}</ContactMetaLabel>
                <ContactMetaValue>
                  <ContactLink href={`mailto:${emailValue}`}>{emailValue}</ContactLink>
                </ContactMetaValue>
              </ContactCard>
              <ContactCard>
                <ContactMetaLabel>{t('contacts.phoneLabel')}</ContactMetaLabel>
                <ContactMetaValue>
                  <ContactLink href={phoneHref(phoneValue)}>{phoneValue}</ContactLink>
                </ContactMetaValue>
              </ContactCard>
              <ContactCard>
                <ContactMetaLabel>{t('contacts.addressLabel')}</ContactMetaLabel>
                <ContactMetaValue>{t('contacts.addressValue')}</ContactMetaValue>
              </ContactCard>
            </ContactInfoGrid>
          </ContactInfoSection>

          <SectionHeading>{t('contacts.formTitle')}</SectionHeading>

          {success ? (
            <MessageBanner $variant="success" role="status" data-testid="contacts-success">
              {t('contacts.success')}
            </MessageBanner>
          ) : null}
          {submitError ? (
            <MessageBanner $variant="error" role="alert" data-testid="contacts-error">
              {submitError}
            </MessageBanner>
          ) : null}

          <Form onSubmit={handleSubmit(onSubmit)} noValidate data-testid="contacts-form">
            <FormFields>
              <Input
                label={t('contacts.name')}
                autoComplete="name"
                error={errors.name?.message}
                register={register('name', {
                  required: t('order.validationRequired'),
                })}
              />
              <Input
                label={t('contacts.email')}
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
                label={t('contacts.message')}
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
                  {isSubmitting ? t('contacts.sending') : t('contacts.submit')}
                </ButtonInner>
              </Button>
            </SubmitRow>
          </Form>
        </ContentInner>
      </ContentSection>
    </PageRoot>
  )
}
