import { describe, it, expect } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { ThemeProvider } from '@/context'
import App from './App'

function renderApp(initialPath: string) {
  return render(
    <MemoryRouter initialEntries={[initialPath]}>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </MemoryRouter>,
  )
}

describe('App routing', () => {
  it('renders Suppliers at /ru/suppliers', () => {
    renderApp('/ru/suppliers')
    expect(within(screen.getByRole('main')).getByTestId('suppliers-page')).toBeInTheDocument()
    expect(
      within(screen.getByRole('main')).getByRole('heading', { name: /поставщикам/i }),
    ).toBeInTheDocument()
  })

  it('renders Contacts at /en/contacts', () => {
    renderApp('/en/contacts')
    expect(within(screen.getByRole('main')).getByText('Contacts')).toBeInTheDocument()
  })

  it('renders FAQ at /ru/faq', () => {
    renderApp('/ru/faq')
    const main = screen.getByRole('main')
    expect(within(main).getByTestId('faq-page')).toBeInTheDocument()
    expect(
      within(main).getByRole('heading', { name: /частые вопросы/i }),
    ).toBeInTheDocument()
  })

  it('redirects unsupported language segment to /ru', async () => {
    const { findByRole } = renderApp('/xx')
    const main = await findByRole('main')
    expect(
      within(main).getByRole('region', {
        name: /Помогаем получить доступ к терапии при орфанных заболеваниях/i,
      }),
    ).toBeInTheDocument()
  })
})
