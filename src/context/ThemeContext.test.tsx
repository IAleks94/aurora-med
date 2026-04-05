import { describe, it, expect, beforeEach, vi } from 'vitest'
import { render, screen, act, fireEvent } from '@testing-library/react'
import { ThemeProvider, useThemeContext } from './ThemeContext'

function ThemeProbe() {
  const { themeMode, toggleTheme } = useThemeContext()
  return (
    <div>
      <span data-testid="mode">{themeMode}</span>
      <button type="button" onClick={toggleTheme}>
        toggle
      </button>
    </div>
  )
}

function SyncProbe({ lang }: { lang: string }) {
  const { themeMode, syncThemeFromLanguage } = useThemeContext()
  return (
    <div>
      <span data-testid="mode">{themeMode}</span>
      <button type="button" onClick={() => syncThemeFromLanguage(lang)}>
        sync
      </button>
    </div>
  )
}

describe('ThemeProvider', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.stubGlobal('location', {
      ...window.location,
      pathname: '/ru/',
    })
  })

  it('defaults to light for Russian path when no override', () => {
    render(
      <ThemeProvider>
        <ThemeProbe />
      </ThemeProvider>,
    )
    expect(screen.getByTestId('mode')).toHaveTextContent('light')
  })

  it('clears invalid override flag and follows language default', () => {
    localStorage.setItem('aurora-theme-user-override', 'true')
    localStorage.setItem('aurora-theme', 'not-a-mode')
    render(
      <ThemeProvider>
        <ThemeProbe />
      </ThemeProvider>,
    )
    expect(localStorage.getItem('aurora-theme-user-override')).toBeNull()
    expect(screen.getByTestId('mode')).toHaveTextContent('light')
  })

  it('syncThemeFromLanguage clears invalid same-tab override and applies language default', () => {
    render(
      <ThemeProvider>
        <SyncProbe lang="en" />
      </ThemeProvider>,
    )
    localStorage.setItem('aurora-theme-user-override', 'true')
    localStorage.setItem('aurora-theme', 'not-a-mode')
    act(() => {
      fireEvent.click(screen.getByRole('button', { name: /sync/i }))
    })
    expect(localStorage.getItem('aurora-theme-user-override')).toBeNull()
    expect(screen.getByTestId('mode')).toHaveTextContent('dark')
  })

  it('toggles theme and persists user override', () => {
    render(
      <ThemeProvider>
        <ThemeProbe />
      </ThemeProvider>,
    )
    act(() => {
      fireEvent.click(screen.getByRole('button', { name: /toggle/i }))
    })
    expect(screen.getByTestId('mode')).toHaveTextContent('dark')
    expect(localStorage.getItem('aurora-theme-user-override')).toBe('true')
    expect(localStorage.getItem('aurora-theme')).toBe('dark')
  })
})
