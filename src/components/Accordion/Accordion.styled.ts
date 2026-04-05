import styled from 'styled-components'

export const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
  width: 100%;
`

export const Item = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.card};
  overflow: hidden;
`

export const HeaderButton = styled.button<{ $open: boolean }>`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing.md};
  padding: ${({ theme }) => `${theme.spacing.md} ${theme.spacing.lg}`};
  font-family: ${({ theme }) => theme.fontFamily};
  font-size: 15px;
  font-weight: 500;
  text-align: left;
  color: ${({ theme }) => theme.colors.text};
  background: transparent;
  border: none;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.card};
    filter: brightness(0.98);
  }
`

export const Question = styled.span`
  flex: 1;
`

export const IconWrap = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  flex-shrink: 0;
  color: ${({ theme }) => theme.colors.accent};
  transition: transform 0.25s ease;

  svg {
    width: 18px;
    height: 18px;
  }
`

export const PanelOuter = styled.div<{ $open: boolean }>`
  display: grid;
  grid-template-rows: ${({ $open }) => ($open ? '1fr' : '0fr')};
  transition: grid-template-rows 0.35s ease;
`

export const PanelInner = styled.div`
  overflow: hidden;
  min-height: 0;
`

export const Answer = styled.div`
  padding: ${({ theme }) => `0 ${theme.spacing.lg} ${theme.spacing.md}`};
  font-family: ${({ theme }) => theme.fontFamily};
  font-size: 14px;
  line-height: 1.6;
  color: ${({ theme }) => theme.colors.textMuted};
`
