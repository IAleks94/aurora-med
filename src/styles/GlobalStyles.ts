import { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    overflow-x: hidden;
  }

  body {
    font-family: ${({ theme }) => theme.fontFamily};
    background: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    min-height: 100vh;
    overflow-x: hidden;
    transition: background 0.3s ease, color 0.3s ease;
  }

  #root {
    min-height: 100vh;
  }
`
