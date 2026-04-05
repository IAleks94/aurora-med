import { Link, NavLink } from 'react-router-dom'
import styled from 'styled-components'

export const FooterBar = styled.footer<{ $dark: boolean }>`
  margin-top: auto;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  background: ${({ $dark }) =>
    $dark ? 'rgba(11, 16, 38, 0.92)' : 'rgba(250, 247, 242, 0.95)'};
  transition: background 0.3s ease, border-color 0.3s ease;
`

export const Inner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.lg};
  max-width: ${({ theme }) => theme.breakpoints.wide};
  margin: 0 auto;
  padding: ${({ theme }) =>
    `${theme.spacing.xl} clamp(${theme.spacing.md}, 4vw, ${theme.spacing.lg})`};
  padding-bottom: calc(
    ${({ theme }) => theme.spacing.xl} + env(safe-area-inset-bottom, 0px)
  );

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: flex-start;
  }
`

export const BrandBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  text-align: center;

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    align-items: flex-start;
    text-align: left;
  }
`

export const LogoLink = styled(Link)`
  display: inline-flex;
  align-items: baseline;
  gap: 2px;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.text};
`

export const LogoWord = styled.span`
  font-family: ${({ theme }) => theme.fontFamily};
  font-weight: 400;
  font-size: 16px;
  letter-spacing: 3.5px;
  text-transform: uppercase;
`

export const LogoPlus = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.accent};
  line-height: 0;
`

export const CopyrightLine = styled.p`
  font-family: ${({ theme }) => theme.fontFamily};
  font-size: 13px;
  color: ${({ theme }) => theme.colors.textMuted};
  line-height: 1.5;
`

export const FooterNav = styled.nav`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.lg}`};

  @media (min-width: ${({ theme }) => theme.breakpoints.tablet}) {
    flex: 1;
    justify-content: center;
  }
`

export const FooterNavItem = styled(NavLink)`
  font-family: ${({ theme }) => theme.fontFamily};
  font-weight: 500;
  font-size: 12px;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.textMuted};
  transition: color 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.text};
  }

  &.active {
    color: ${({ theme }) => theme.colors.text};
    font-weight: 600;
  }
`

export const EmailLink = styled.a`
  font-family: ${({ theme }) => theme.fontFamily};
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  padding-bottom: 2px;
  transition:
    color 0.2s ease,
    border-color 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.accent};
    border-bottom-color: ${({ theme }) => theme.colors.accent};
  }
`
