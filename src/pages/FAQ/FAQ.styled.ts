import styled from 'styled-components'

export const FaqBlocks = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xxl};
`

export const CategoryBlock = styled.section`
  scroll-margin-top: ${({ theme }) => theme.spacing.lg};
`

export const CategoryHeading = styled.h2`
  font-size: clamp(1.125rem, 2.2vw, 1.35rem);
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.text};
`
