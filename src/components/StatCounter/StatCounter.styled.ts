import styled from 'styled-components'

export const Root = styled.div<{ $showDivider: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  min-width: 0;
  flex: 1;
  padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};

  ${({ theme, $showDivider }) =>
    $showDivider
      ? `
    border-left: 1px solid ${theme.colors.border};
  `
      : ''}

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    border-left: none;
  }
`

export const Value = styled.span`
  font-family: ${({ theme }) => theme.fontFamily};
  font-weight: 700;
  font-size: clamp(32px, 5vw, 48px);
  line-height: 1.1;
  letter-spacing: 0.02em;
  color: ${({ theme }) => theme.colors.text};
`

export const Label = styled.span`
  margin-top: ${({ theme }) => theme.spacing.xs};
  font-family: ${({ theme }) => theme.fontFamily};
  font-size: 13px;
  font-weight: 500;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textMuted};
`
