import type { HTMLAttributes, ReactNode } from 'react'
import { StyledCard } from './Card.styled'

export type CardProps = {
  children: ReactNode
  padding?: 'none' | 'sm' | 'md' | 'lg'
} & Omit<HTMLAttributes<HTMLElement>, 'children'>

export function Card({
  children,
  padding = 'md',
  ...rest
}: CardProps) {
  return (
    <StyledCard $padding={padding} {...rest}>
      {children}
    </StyledCard>
  )
}
