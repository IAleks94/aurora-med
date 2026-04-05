import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { ThemeProvider as StyledThemeProvider } from 'styled-components'
import {
  GlobalStyles,
  darkTheme,
  getDefaultThemeModeForLanguage,
  lightTheme,
  type ThemeMode,
} from '@/styles'

const STORAGE_THEME = 'aurora-theme'
const STORAGE_OVERRIDE = 'aurora-theme-user-override'

function readStoredLanguage(): string {
  if (typeof window === 'undefined') return 'ru'
  const match = window.location.pathname.match(/^\/(en|ru)(\/|$)/)
  if (match?.[1]) return match[1]
  const lng = window.localStorage.getItem('i18nextLng')
  if (lng) return lng.split('-')[0] ?? 'ru'
  return 'ru'
}

function getInitialThemeMode(): ThemeMode {
  if (typeof window === 'undefined') return 'light'
  if (window.localStorage.getItem(STORAGE_OVERRIDE) === 'true') {
    const stored = window.localStorage.getItem(STORAGE_THEME)
    if (stored === 'dark' || stored === 'light') return stored
    try {
      window.localStorage.removeItem(STORAGE_OVERRIDE)
    } catch {
      // ignore
    }
  }
  return getDefaultThemeModeForLanguage(readStoredLanguage())
}

export type ThemeContextValue = {
  themeMode: ThemeMode
  toggleTheme: () => void
  setThemeMode: (mode: ThemeMode) => void
  syncThemeFromLanguage: (lang: string) => void
  userHasOverriddenTheme: boolean
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [themeMode, setThemeModeState] = useState<ThemeMode>(getInitialThemeMode)
  const [userHasOverriddenTheme, setUserHasOverriddenTheme] = useState(() => {
    if (typeof window === 'undefined') return false
    if (window.localStorage.getItem(STORAGE_OVERRIDE) !== 'true') return false
    const stored = window.localStorage.getItem(STORAGE_THEME)
    return stored === 'dark' || stored === 'light'
  })

  const styledTheme = themeMode === 'light' ? lightTheme : darkTheme

  const persistUserMode = useCallback((mode: ThemeMode) => {
    try {
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(STORAGE_OVERRIDE, 'true')
        window.localStorage.setItem(STORAGE_THEME, mode)
      }
    } catch {
      // Quota, private mode, or disabled storage — still update UI
    }
    setUserHasOverriddenTheme(true)
    setThemeModeState(mode)
  }, [])

  const toggleTheme = useCallback(() => {
    const next: ThemeMode = themeMode === 'light' ? 'dark' : 'light'
    persistUserMode(next)
  }, [persistUserMode, themeMode])

  const setThemeMode = useCallback(
    (mode: ThemeMode) => {
      persistUserMode(mode)
    },
    [persistUserMode],
  )

  const syncThemeFromLanguage = useCallback((lang: string) => {
    if (typeof window === 'undefined') return
    if (userHasOverriddenTheme) return
    if (window.localStorage.getItem(STORAGE_OVERRIDE) === 'true') return
    const mode = getDefaultThemeModeForLanguage(lang)
    try {
      window.localStorage.setItem(STORAGE_THEME, mode)
    } catch {
      // ignore storage failures
    }
    setThemeModeState(mode)
  }, [userHasOverriddenTheme])

  const value = useMemo(
    (): ThemeContextValue => ({
      themeMode,
      toggleTheme,
      setThemeMode,
      syncThemeFromLanguage,
      userHasOverriddenTheme,
    }),
    [
      themeMode,
      toggleTheme,
      setThemeMode,
      syncThemeFromLanguage,
      userHasOverriddenTheme,
    ],
  )

  return (
    <ThemeContext.Provider value={value}>
      <StyledThemeProvider theme={styledTheme}>
        <GlobalStyles />
        {children}
      </StyledThemeProvider>
    </ThemeContext.Provider>
  )
}

export function useThemeContext(): ThemeContextValue {
  const ctx = useContext(ThemeContext)
  if (!ctx) {
    throw new Error('useThemeContext must be used within ThemeProvider')
  }
  return ctx
}
