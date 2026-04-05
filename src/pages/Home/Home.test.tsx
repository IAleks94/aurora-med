import { describe, it, expect, beforeEach, vi } from 'vitest'
import { fireEvent, render, screen, within } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { ThemeProvider } from '@/context'
import i18n from '@/i18n'
import { Home } from './Home'

async function renderHome(initialPath: string) {
  const lang = initialPath.startsWith('/en') ? 'en' : 'ru'
  await i18n.changeLanguage(lang)
  return render(
    <MemoryRouter initialEntries={[initialPath]}>
      <ThemeProvider>
        <Routes>
          <Route path="/:lang" element={<Home />} />
        </Routes>
      </ThemeProvider>
    </MemoryRouter>,
  )
}

describe('Home hero', () => {
  beforeEach(() => {
    Element.prototype.scrollIntoView = vi.fn()
  })

  it('renders hero copy in Russian at /ru', async () => {
    await renderHome('/ru')
    const region = screen.getByRole('region', {
      name: /Помогаем получить доступ к терапии при орфанных заболеваниях/i,
    })
    expect(region).toBeInTheDocument()
    expect(
      screen.getByText(
        'Координируем сложные случаи между пациентами, фондами и международными поставщиками.',
      ),
    ).toBeInTheDocument()
  })

  it('renders hero copy in English at /en', async () => {
    await renderHome('/en')
    expect(
      screen.getByRole('region', {
        name: /Access to rare disease therapies when local availability is limited/i,
      }),
    ).toBeInTheDocument()
  })

  it('links primary CTA to order route for current language', async () => {
    await renderHome('/en')
    expect(screen.getByRole('link', { name: /submit request/i })).toHaveAttribute(
      'href',
      '/en/order',
    )
  })

  it('scrolls to #process when secondary CTA is clicked', async () => {
    await renderHome('/ru')
    fireEvent.click(screen.getByRole('button', { name: /как это работает/i }))
    expect(Element.prototype.scrollIntoView).toHaveBeenCalled()
  })

  it('exposes process anchor for next section', async () => {
    const { container } = await renderHome('/ru')
    expect(container.querySelector('#process')).toBeTruthy()
  })
})

describe('Home process section', () => {
  it('renders process title and four steps in Russian', async () => {
    await renderHome('/ru')
    const region = screen.getByTestId('home-process')
    expect(region).toBeInTheDocument()
    expect(
      within(region).getByRole('heading', { name: /как это работает/i }),
    ).toBeInTheDocument()
    expect(
      within(region).getByText('Вы отправляете запрос'),
    ).toBeInTheDocument()
    expect(within(region).getByText('Мы уточняем детали')).toBeInTheDocument()
    expect(within(region).getByText('Мы координируем процесс')).toBeInTheDocument()
    expect(within(region).getByText('Организуем поставку')).toBeInTheDocument()
  })

  it('renders process title and four steps in English', async () => {
    await renderHome('/en')
    const region = screen.getByTestId('home-process')
    expect(
      within(region).getByRole('heading', { name: /how it works/i }),
    ).toBeInTheDocument()
    expect(within(region).getByText('Submit a request')).toBeInTheDocument()
    expect(within(region).getByText('Clarify the details')).toBeInTheDocument()
    expect(within(region).getByText('Coordinate the process')).toBeInTheDocument()
    expect(within(region).getByText('Organize delivery')).toBeInTheDocument()
  })
})

describe('Home team section', () => {
  it('renders team title and three members in Russian', async () => {
    await renderHome('/ru')
    const region = screen.getByTestId('home-team')
    expect(region).toBeInTheDocument()
    expect(
      within(region).getByRole('heading', { name: /наши специалисты/i }),
    ).toBeInTheDocument()
    expect(
      within(region).getByRole('heading', { name: /александра киреева/i }),
    ).toBeInTheDocument()
    expect(
      within(region).getByRole('heading', { name: /ирина короткова/i }),
    ).toBeInTheDocument()
    expect(
      within(region).getByRole('heading', { name: /sofia fleishman/i }),
    ).toBeInTheDocument()
    expect(within(region).getByText(/основатель/i)).toBeInTheDocument()
    const imgs = within(region).getAllByRole('img')
    expect(imgs).toHaveLength(3)
  })

  it('renders team title and three members in English', async () => {
    await renderHome('/en')
    const region = screen.getByTestId('home-team')
    expect(
      within(region).getByRole('heading', { name: /operational network/i }),
    ).toBeInTheDocument()
    expect(
      within(region).getByRole('heading', { name: /alexandra kireeva/i }),
    ).toBeInTheDocument()
    expect(
      within(region).getByRole('heading', { name: /irina korotkova/i }),
    ).toBeInTheDocument()
    expect(
      within(region).getByRole('heading', { name: /sofia fleishman/i }),
    ).toBeInTheDocument()
  })
})
