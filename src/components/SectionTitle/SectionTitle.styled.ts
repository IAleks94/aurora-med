import styled from 'styled-components'

export const Wrapper = styled.h2`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.md};
  text-align: center;
  margin: 0;
  padding: 0 ${({ theme }) => theme.spacing.md};
`

export const Decor = styled.span`
  font-family: ${({ theme }) => theme.fontFamily};
  font-weight: 300;
  font-size: clamp(18px, 3vw, 22px);
  color: ${({ theme }) => theme.colors.decorative};
  line-height: 1;
  user-select: none;
`

export const Title = styled.span`
  font-family: ${({ theme }) => theme.fontFamily};
  font-weight: 600;
  font-size: clamp(20px, 3.5vw, 28px);
  letter-spacing: 2px;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.text};
`
