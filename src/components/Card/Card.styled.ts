import styled from 'styled-components'

export const StyledCard = styled.article<{
  $padding: 'none' | 'sm' | 'md' | 'lg'
}>`
  background: ${({ theme }) => theme.colors.card};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.lg};
  box-shadow: ${({ theme }) => theme.colors.cardShadow};
  transition:
    box-shadow 0.25s ease,
    border-color 0.25s ease,
    transform 0.2s ease;

  ${({ theme, $padding }) =>
    $padding === 'none'
      ? ''
      : $padding === 'sm'
        ? `padding: ${theme.spacing.md};`
        : $padding === 'md'
          ? `padding: ${theme.spacing.lg};`
          : `padding: ${theme.spacing.xl};`}

  &:hover {
    box-shadow: ${({ theme }) => theme.colors.cardShadow},
      0 12px 40px rgba(11, 16, 38, 0.08);
    border-color: ${({ theme }) => theme.colors.decorative};
  }
`
