import type { ReactNode } from 'react'
import { Decor, Title, Wrapper } from './SectionTitle.styled'

export type SectionTitleProps = {
  children: ReactNode
}

export function SectionTitle({ children }: SectionTitleProps) {
  return (
    <Wrapper>
      <Decor aria-hidden>+</Decor>
      <Title>{children}</Title>
      <Decor aria-hidden>+</Decor>
    </Wrapper>
  )
}
