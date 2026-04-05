import styled, { css } from 'styled-components'
import type { ButtonSize, ButtonVariant } from './Button'

const sizeStyles: Record<
  ButtonSize,
  ReturnType<typeof css>
> = {
  sm: css`
    padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
    font-size: 12px;
    letter-spacing: 1.5px;
  `,
  md: css`
    padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.lg}`};
    font-size: 13px;
    letter-spacing: 2px;
  `,
  lg: css`
    padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.xl}`};
    font-size: 14px;
    letter-spacing: 2px;
  `,
}

export const StyledButton = styled.button<{
  $variant: ButtonVariant
  $size: ButtonSize
  $fullWidth: boolean
}>`
  font-family: ${({ theme }) => theme.fontFamily};
  font-weight: 600;
  text-transform: uppercase;
  border-radius: ${({ theme }) => theme.radii.md};
  cursor: pointer;
  border: 1px solid transparent;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.sm};
  width: ${({ $fullWidth }) => ($fullWidth ? '100%' : 'auto')};
  transition:
    background 0.2s ease,
    color 0.2s ease,
    border-color 0.2s ease,
    box-shadow 0.2s ease,
    transform 0.15s ease;

  &:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }

  &:not(:disabled):active {
    transform: translateY(1px);
  }

  ${({ $size }) => sizeStyles[$size]}

  ${({ theme, $variant }) =>
    $variant === 'primary' &&
    css`
      background: ${theme.colors.accent};
      color: ${theme.colors.accent === '#FFFFFF' ? '#0B1026' : '#FAF7F2'};
      border-color: ${theme.colors.accent};

      &:not(:disabled):hover {
        box-shadow: ${theme.colors.accent === '#FFFFFF'
          ? '0 4px 20px rgba(255, 255, 255, 0.25)'
          : '0 4px 20px rgba(11, 16, 38, 0.25)'};
      }
    `}

  ${({ theme, $variant }) =>
    $variant === 'secondary' &&
    css`
      background: transparent;
      color: ${theme.colors.text};
      border-color: ${theme.colors.border};

      &:not(:disabled):hover {
        background: ${theme.colors.card};
        border-color: ${theme.colors.accent};
      }
    `}

  ${({ theme, $variant }) =>
    $variant === 'outline' &&
    css`
      background: transparent;
      color: ${theme.colors.accent};
      border-color: ${theme.colors.accent};

      &:not(:disabled):hover {
        background: ${theme.colors.card};
        box-shadow: 0 0 0 1px ${theme.colors.accent};
      }
    `}
`
