import styled from 'styled-components'

export const ERROR_COLOR = '#C62828'

export const Root = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
  width: 100%;
`

export const Label = styled.label`
  font-family: ${({ theme }) => theme.fontFamily};
  font-weight: 500;
  font-size: 13px;
  letter-spacing: 0.02em;
  color: ${({ theme }) => theme.colors.text};
`

export const Field = styled.input<{ $hasError: boolean }>`
  font-family: ${({ theme }) => theme.fontFamily};
  font-size: 15px;
  line-height: 1.4;
  width: 100%;
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  border-radius: ${({ theme }) => theme.radii.md};
  border: 1px solid
    ${({ theme, $hasError }) => ($hasError ? ERROR_COLOR : theme.colors.border)};
  background: ${({ theme }) => theme.colors.card};
  color: ${({ theme }) => theme.colors.text};
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;

  &::placeholder {
    color: ${({ theme }) => theme.colors.textMuted};
  }

  &:focus {
    outline: none;
    border-color: ${({ theme, $hasError }) =>
      $hasError ? ERROR_COLOR : theme.colors.accent};
    box-shadow: 0 0 0 2px
      ${({ theme, $hasError }) =>
        $hasError ? `${ERROR_COLOR}33` : `${theme.colors.accent}33`};
  }
`

export const TextAreaField = styled.textarea<{ $hasError: boolean }>`
  font-family: ${({ theme }) => theme.fontFamily};
  font-size: 15px;
  line-height: 1.5;
  width: 100%;
  min-height: 120px;
  resize: vertical;
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  border-radius: ${({ theme }) => theme.radii.md};
  border: 1px solid
    ${({ theme, $hasError }) => ($hasError ? ERROR_COLOR : theme.colors.border)};
  background: ${({ theme }) => theme.colors.card};
  color: ${({ theme }) => theme.colors.text};
  transition:
    border-color 0.2s ease,
    box-shadow 0.2s ease;

  &::placeholder {
    color: ${({ theme }) => theme.colors.textMuted};
  }

  &:focus {
    outline: none;
    border-color: ${({ theme, $hasError }) =>
      $hasError ? ERROR_COLOR : theme.colors.accent};
    box-shadow: 0 0 0 2px
      ${({ theme, $hasError }) =>
        $hasError ? `${ERROR_COLOR}33` : `${theme.colors.accent}33`};
  }
`

export const ErrorText = styled.span`
  font-family: ${({ theme }) => theme.fontFamily};
  font-size: 12px;
  color: ${ERROR_COLOR};
`
