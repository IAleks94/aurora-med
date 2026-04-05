import styled from 'styled-components'

export const ContactInfoSection = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.xxl};
`

export const ContactInfoGrid = styled.div`
  display: grid;
  gap: ${({ theme }) => theme.spacing.lg};
  grid-template-columns: 1fr;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    grid-template-columns: repeat(3, 1fr);
  }
`

export const ContactCard = styled.div`
  padding: ${({ theme }) => `${theme.spacing.lg} ${theme.spacing.xl}`};
  border-radius: ${({ theme }) => theme.radii.md};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ theme }) => theme.colors.card};
  box-shadow: ${({ theme }) => theme.colors.cardShadow};
`

export const ContactMetaLabel = styled.p`
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textMuted};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`

export const ContactMetaValue = styled.div`
  font-size: 1rem;
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.text};
  word-break: break-word;
`

export const ContactLink = styled.a`
  color: ${({ theme }) => theme.colors.text};
  text-decoration: underline;
  text-underline-offset: 3px;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.85;
  }
`
