import styled from 'styled-components'

export const Wrapper = styled.div<{ $visible: boolean }>`
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transform: ${({ $visible }) =>
    $visible ? 'translateY(0)' : 'translateY(18px)'};
  transition:
    opacity 0.55s ease,
    transform 0.55s ease;

  @media (prefers-reduced-motion: reduce) {
    opacity: 1;
    transform: none;
    transition: none;
  }
`
