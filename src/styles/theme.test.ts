import { describe, it, expect } from 'vitest'
import {
  darkTheme,
  getDefaultThemeModeForLanguage,
  lightTheme,
} from './theme'

describe('theme', () => {
  it('maps Russian to light and English to dark', () => {
    expect(getDefaultThemeModeForLanguage('ru')).toBe('light')
    expect(getDefaultThemeModeForLanguage('en')).toBe('dark')
    expect(getDefaultThemeModeForLanguage('en-US')).toBe('dark')
  })

  it('provides consistent structure for light and dark themes', () => {
    const keys = [
      'background',
      'text',
      'textMuted',
      'accent',
      'card',
      'cardShadow',
      'border',
      'decorative',
    ] as const
    for (const key of keys) {
      expect(lightTheme.colors[key]).toBeTruthy()
      expect(darkTheme.colors[key]).toBeTruthy()
    }
    expect(lightTheme.fontFamily).toContain('Urbanist')
    expect(darkTheme.fontFamily).toContain('Urbanist')
    expect(lightTheme.mode).toBe('light')
    expect(darkTheme.mode).toBe('dark')
  })
})
