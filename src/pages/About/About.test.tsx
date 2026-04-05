import { describe, it, expect } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { ThemeProvider } from '@/context'
import i18n from '@/i18n'
import { About } from './About'

async function renderAbout(initialPath: string) {
  const lang = initialPath.startsWith('/en') ? 'en' : 'ru'
  await i18n.changeLanguage(lang)
  return render(
    <MemoryRouter initialEntries={[initialPath]}>
      <ThemeProvider>
        <Routes>
          <Route path="/:lang/about" element={<About />} />
        </Routes>
      </ThemeProvider>
    </MemoryRouter>,
  )
}

describe('About page', () => {
  it('renders hero title and intro in Russian', async () => {
    await renderAbout('/ru/about')
    const hero = screen.getByTestId('about-hero')
    expect(
      within(hero).getByRole('heading', { name: /о компании/i }),
    ).toBeInTheDocument()
    expect(
      within(hero).getByText(
        /Aurora Med объединяет фонды, организации и европейских поставщиков/i,
      ),
    ).toBeInTheDocument()
  })

  it('renders hero title and intro in English', async () => {
    await renderAbout('/en/about')
    const hero = screen.getByTestId('about-hero')
    expect(
      within(hero).getByRole('heading', { name: /about us/i }),
    ).toBeInTheDocument()
    expect(
      within(hero).getByText(
        /Aurora Med connects funds, organizations, and European suppliers/i,
      ),
    ).toBeInTheDocument()
  })

  it('renders story section with founder narrative and company story', async () => {
    await renderAbout('/ru/about')
    const story = screen.getByTestId('about-story')
    expect(
      within(story).getByRole('heading', { name: /наша история/i }),
    ).toBeInTheDocument()
    expect(
      within(story).getByText(
        /Компания возникла из личного опыта жизни с редким заболеванием/i,
      ),
    ).toBeInTheDocument()
    expect(
      within(story).getByText(
        /Мы выросли из личного опыта и многолетней работы/i,
      ),
    ).toBeInTheDocument()
  })

  it('renders mission and values sections', async () => {
    await renderAbout('/en/about')
    expect(
      within(screen.getByTestId('about-mission')).getByRole('heading', {
        name: /mission/i,
      }),
    ).toBeInTheDocument()
    const values = screen.getByTestId('about-values')
    expect(within(values).getByText(/transparency/i)).toBeInTheDocument()
    expect(within(values).getByText(/coordination/i)).toBeInTheDocument()
    expect(within(values).getByText(/reliability/i)).toBeInTheDocument()
  })

  it('renders team section with long bios and portraits', async () => {
    await renderAbout('/ru/about')
    const team = screen.getByTestId('about-team')
    expect(
      within(team).getByRole('heading', { name: /команда/i }),
    ).toBeInTheDocument()
    expect(
      within(team).getByText(
        /Александра более десяти лет занимается логистикой сложных кейсов/i,
      ),
    ).toBeInTheDocument()
    expect(within(team).getAllByRole('img')).toHaveLength(3)
  })
})
