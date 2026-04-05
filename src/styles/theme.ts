export type ThemeMode = 'light' | 'dark'

export const breakpoints = {
  mobile: '480px',
  tablet: '768px',
  desktop: '1024px',
  wide: '1280px',
} as const

export const spacing = {
  xs: '4px',
  sm: '8px',
  md: '16px',
  lg: '24px',
  xl: '32px',
  xxl: '48px',
} as const

export const radii = {
  sm: '4px',
  md: '8px',
  lg: '12px',
  xl: '16px',
} as const

export interface Theme {
  colors: {
    background: string
    text: string
    textMuted: string
    accent: string
    card: string
    cardShadow: string
    border: string
    decorative: string
  }
  fontFamily: string
  breakpoints: typeof breakpoints
  spacing: typeof spacing
  radii: typeof radii
}

export const lightTheme: Theme = {
  colors: {
    background: 'linear-gradient(180deg, #F5F0E8 0%, #FAF7F2 100%)',
    text: '#0B1026',
    textMuted: 'rgba(11, 16, 38, 0.65)',
    accent: '#0B1026',
    card: '#FFFFFF',
    cardShadow: '0 8px 24px rgba(11, 16, 38, 0.08)',
    border: 'rgba(11, 16, 38, 0.12)',
    decorative: 'rgba(11, 16, 38, 0.2)',
  },
  fontFamily: "'Urbanist', sans-serif",
  breakpoints,
  spacing,
  radii,
}

export const darkTheme: Theme = {
  colors: {
    background: 'linear-gradient(180deg, #0B1026 0%, #0F1A3E 100%)',
    text: '#FFFFFF',
    textMuted: '#B8C4D8',
    accent: '#FFFFFF',
    card: 'rgba(255, 255, 255, 0.06)',
    cardShadow: '0 8px 32px rgba(0, 0, 0, 0.35)',
    border: 'rgba(255, 255, 255, 0.2)',
    decorative: 'rgba(255, 255, 255, 0.3)',
  },
  fontFamily: "'Urbanist', sans-serif",
  breakpoints,
  spacing,
  radii,
}

export function getDefaultThemeModeForLanguage(lang: string): ThemeMode {
  const normalized = lang.toLowerCase().split('-')[0] ?? 'ru'
  return normalized === 'ru' ? 'light' : 'dark'
}
