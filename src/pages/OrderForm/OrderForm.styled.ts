import styled, { keyframes } from 'styled-components'

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`

export const Form = styled.form`
  max-width: 36rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`

export const FormFields = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`

export const MessageBanner = styled.div<{ $variant: 'success' | 'error' }>`
  padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.lg}`};
  border-radius: ${({ theme }) => theme.radii.md};
  font-size: 0.9375rem;
  line-height: 1.5;
  border: 1px solid
    ${({ $variant }) => ($variant === 'success' ? 'rgba(46, 125, 50, 0.45)' : 'rgba(198, 40, 40, 0.45)')};
  background: ${({ $variant }) =>
    $variant === 'success' ? 'rgba(46, 125, 50, 0.08)' : 'rgba(198, 40, 40, 0.08)'};
  color: ${({ $variant }) => ($variant === 'success' ? '#2e7d32' : '#c62828')};
`

export const SubmitRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  flex-wrap: wrap;
`

export const Spinner = styled.span`
  width: 1rem;
  height: 1rem;
  flex-shrink: 0;
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-top-color: ${({ theme }) => theme.colors.accent};
  border-radius: 50%;
  animation: ${spin} 0.65s linear infinite;
  display: inline-block;
  vertical-align: middle;
`

export const ButtonInner = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.sm};
`
