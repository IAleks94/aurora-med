import { describe, it, expect } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { ThemeProvider } from '@/context'
import i18n from '@/i18n'
import { FAQ } from './FAQ'

async function renderFaq(initialPath: string) {
  const lang = initialPath.startsWith('/en') ? 'en' : 'ru'
  await i18n.changeLanguage(lang)
  return render(
    <MemoryRouter initialEntries={[initialPath]}>
      <ThemeProvider>
        <Routes>
          <Route path="/:lang/faq" element={<FAQ />} />
        </Routes>
      </ThemeProvider>
    </MemoryRouter>,
  )
}

describe('FAQ page', () => {
  it('renders hero and category sections in Russian', async () => {
    await renderFaq('/ru/faq')
    const hero = screen.getByTestId('faq-hero')
    expect(
      within(hero).getByRole('heading', { name: /частые вопросы/i }),
    ).toBeInTheDocument()
    expect(
      within(hero).getByText(
        /Ответы на частые вопросы фондов, поставщиков и общие темы/i,
      ),
    ).toBeInTheDocument()

    expect(
      within(screen.getByTestId('faq-category-funds')).getByRole('heading', {
        name: /для фондов/i,
      }),
    ).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /какие лекарства можно заказать/i })).toBeInTheDocument()

    expect(
      within(screen.getByTestId('faq-category-suppliers')).getByRole('heading', {
        name: /для поставщиков/i,
      }),
    ).toBeInTheDocument()

    expect(
      within(screen.getByTestId('faq-category-general')).getByRole('heading', {
        name: /общие/i,
      }),
    ).toBeInTheDocument()
  })

  it('renders hero and first English question', async () => {
    await renderFaq('/en/faq')
    const hero = screen.getByTestId('faq-hero')
    expect(
      within(hero).getByRole('heading', { name: /frequently asked questions/i }),
    ).toBeInTheDocument()
    expect(
      screen.getByRole('button', { name: /which medicines can be ordered/i }),
    ).toBeInTheDocument()
  })
})
