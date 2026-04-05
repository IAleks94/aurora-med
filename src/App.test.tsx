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

describe('App', () => {
  it('renders Home at /ru', () => {
    renderApp('/ru')
    expect(
      screen.getByRole('region', {
        name: /Помогаем получить доступ к терапии при орфанных заболеваниях/i,
      }),
    ).toBeInTheDocument()
  })

  it('renders About at /en/about', () => {
    renderApp('/en/about')
    expect(
      within(screen.getByRole('main')).getByRole('heading', { name: /about us/i }),
    ).toBeInTheDocument()
  })

  it('renders OrderForm at /ru/order', () => {
    renderApp('/ru/order')
    expect(
      within(screen.getByTestId('order-form-page')).getByRole('heading', {
        name: /оставить запрос/i,
      }),
    ).toBeInTheDocument()
  })
})
