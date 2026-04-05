import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { StyledButton } from './Button.styled'

export type ButtonVariant = 'primary' | 'secondary' | 'outline'
export type ButtonSize = 'sm' | 'md' | 'lg'

export type ButtonProps = {
  variant?: ButtonVariant
  size?: ButtonSize
  fullWidth?: boolean
  children: ReactNode
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'>

export function Button({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  children,
  type = 'button',
  ...rest
}: ButtonProps) {
  return (
    <StyledButton
      $variant={variant}
      $size={size}
      $fullWidth={fullWidth}
      type={type}
      {...rest}
    >
      {children}
    </StyledButton>
  )
}
