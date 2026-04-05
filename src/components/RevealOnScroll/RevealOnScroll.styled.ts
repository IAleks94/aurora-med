import styled from 'styled-components'

export const Wrapper = styled.div<{ $visible: boolean }>`
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  visibility: ${({ $visible }) => ($visible ? 'visible' : 'hidden')};
  pointer-events: ${({ $visible }) => ($visible ? 'auto' : 'none')};
  transform: ${({ $visible }) =>
    $visible ? 'translateY(0)' : 'translateY(18px)'};
  transition:
    opacity 0.55s ease,
    transform 0.55s ease,
    visibility 0s linear ${({ $visible }) => ($visible ? '0s' : '0.55s')};

  @media (prefers-reduced-motion: reduce) {
    opacity: 1;
    visibility: visible;
    pointer-events: auto;
    transform: none;
    transition: none;
  }
`
