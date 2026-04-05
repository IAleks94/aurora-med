import { describe, it, expect } from 'vitest'
import { detectLanguageFromPath } from './index'

describe('detectLanguageFromPath', () => {
  it('returns ru for root and paths without lang prefix', () => {
    expect(detectLanguageFromPath('/')).toBe('ru')
    expect(detectLanguageFromPath('/about')).toBe('ru')
  })

  it('returns en when path starts with /en', () => {
    expect(detectLanguageFromPath('/en')).toBe('en')
    expect(detectLanguageFromPath('/en/')).toBe('en')
    expect(detectLanguageFromPath('/en/order')).toBe('en')
  })

  it('returns ru when path starts with /ru', () => {
    expect(detectLanguageFromPath('/ru')).toBe('ru')
    expect(detectLanguageFromPath('/ru/contacts')).toBe('ru')
  })
})

describe('i18n resources', () => {
  it('exposes hero title in Russian and English', async () => {
    const { default: i18n } = await import('./index')
    await i18n.changeLanguage('ru')
    expect(i18n.t('hero.title')).toContain('Помогаем')
    await i18n.changeLanguage('en')
    expect(i18n.t('hero.title')).toContain('Access to rare disease')
  })
})
