import { Link, NavLink } from 'react-router-dom'
import styled from 'styled-components'

export const HeaderBar = styled.header<{ $dark: boolean }>`
  position: sticky;
  top: 0;
  z-index: 100;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  background: ${({ $dark }) =>
    $dark ? 'rgba(11, 16, 38, 0.75)' : 'rgba(250, 247, 242, 0.85)'};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  transition: background 0.3s ease, border-color 0.3s ease;
`

export const Inner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.md};
  max-width: ${({ theme }) => theme.breakpoints.wide};
  margin: 0 auto;
  padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.lg}`};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    padding: ${({ theme }) => `${theme.spacing.sm} ${theme.spacing.md}`};
  }
`

export const LogoLink = styled(Link)`
  display: inline-flex;
  align-items: baseline;
  gap: 2px;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.text};
  flex-shrink: 0;
`

export const LogoWord = styled.span`
  font-family: ${({ theme }) => theme.fontFamily};
  font-weight: 400;
  font-size: 18px;
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

export const DesktopNav = styled.nav`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.lg};

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: none;
  }
`

export const NavItem = styled(NavLink)`
  font-family: ${({ theme }) => theme.fontFamily};
  font-weight: 500;
  font-size: 14px;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.textMuted};
  padding: ${({ theme }) => `${theme.spacing.sm} 0`};
  border-bottom: 2px solid transparent;
  transition:
    color 0.2s ease,
    border-color 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.text};
  }

  &.active {
    color: ${({ theme }) => theme.colors.text};
    font-weight: 600;
    border-bottom-color: ${({ theme }) => theme.colors.accent};
  }
`

export const Controls = styled.div`
  display: flex;
  flex-shrink: 0;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
`

export const LangGroup = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  font-family: ${({ theme }) => theme.fontFamily};
  font-size: 14px;
`

export const LangSep = styled.span`
  color: ${({ theme }) => theme.colors.textMuted};
  user-select: none;
`

export const LangButton = styled.button<{ $active: boolean }>`
  font: inherit;
  font-weight: ${({ $active }) => ($active ? 700 : 500)};
  color: ${({ theme, $active }) =>
    $active ? theme.colors.text : theme.colors.textMuted};
  background: none;
  border: none;
  cursor: pointer;
  padding: ${({ theme }) => `${theme.spacing.xs} ${theme.spacing.xs}`};
  transition: color 0.2s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.text};
  }
`

export const IconButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  padding: 0;
  color: ${({ theme }) => theme.colors.text};
  background: transparent;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  cursor: pointer;
  transition:
    background 0.2s ease,
    border-color 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.card};
    border-color: ${({ theme }) => theme.colors.accent};
  }

  svg {
    width: 20px;
    height: 20px;
  }
`

export const MenuToggle = styled.button`
  display: none;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  padding: 0;
  color: ${({ theme }) => theme.colors.text};
  background: transparent;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  cursor: pointer;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: inline-flex;
  }

  svg {
    width: 22px;
    height: 22px;
  }
`

export const MobilePanel = styled.div<{ $open: boolean; $dark: boolean }>`
  display: none;

  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: ${({ $open }) => ($open ? 'block' : 'none')};
    position: fixed;
    top: 57px;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 99;
    padding: ${({ theme }) => theme.spacing.lg};
    background: ${({ $dark }) =>
      $dark ? 'rgba(11, 16, 38, 0.97)' : 'rgba(250, 247, 242, 0.98)'};
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
    box-shadow: 0 12px 32px rgba(0, 0, 0, 0.12);
    animation: slideIn 0.2s ease;

    @keyframes slideIn {
      from {
        opacity: 0;
        transform: translateY(-8px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  }
`

export const MobileNav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`

export const MobileNavItem = styled(NavLink)`
  font-family: ${({ theme }) => theme.fontFamily};
  font-weight: 500;
  font-size: 15px;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  text-decoration: none;
  color: ${({ theme }) => theme.colors.textMuted};
  padding: ${({ theme }) => theme.spacing.sm} 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  &:hover,
  &.active {
    color: ${({ theme }) => theme.colors.text};
    font-weight: 600;
  }
`

export const MobileControls = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  padding-top: ${({ theme }) => theme.spacing.md};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
`

export const DesktopOnlyTheme = styled.div`
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: none;
  }
`

export const DesktopOnlyLang = styled.div`
  @media (max-width: ${({ theme }) => theme.breakpoints.tablet}) {
    display: none;
  }
`
