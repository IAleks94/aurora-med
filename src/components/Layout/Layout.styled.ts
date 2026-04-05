import styled from 'styled-components'

export const LayoutRoot = styled.div`
  display: flex;
  min-height: 100vh;
  flex-direction: column;
`

export const Main = styled.main`
  flex: 1;
  width: 100%;
  min-width: 0;
  padding-left: env(safe-area-inset-left);
  padding-right: env(safe-area-inset-right);
`
