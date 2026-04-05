import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'
import { ThemeProvider } from '@/context'
import { Header } from './Header'

function renderHeader(initialPath: string) {
  const router = createMemoryRouter(
    [
      {
        path: '/:lang/*',
        element: (
          <ThemeProvider>
            <Header />
          </ThemeProvider>
        ),
      },
    ],
    { initialEntries: [initialPath] },
  )
  const result = render(<RouterProvider router={router} />)
  return { router, ...result }
}

describe('Header', () => {
  it('renders logo and main navigation labels', () => {
    renderHeader('/ru')
    expect(screen.getByLabelText(/Aurora Med home/i)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Главная/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /О компании/i })).toHaveAttribute(
      'href',
      '/ru/about',
    )
  })

  it('marks active language', () => {
    renderHeader('/en')
    const ruBtn = screen.getAllByRole('button', { name: /^RU$/i })[0]
    const enBtn = screen.getAllByRole('button', { name: /^EN$/i })[0]
    expect(enBtn).toHaveAttribute('aria-pressed', 'true')
    expect(ruBtn).toHaveAttribute('aria-pressed', 'false')
  })

  it('navigates to the other language for the same page', async () => {
    const { router } = renderHeader('/ru/about')
    const enBtn = screen.getAllByRole('button', { name: /^EN$/i })[0]
    fireEvent.click(enBtn)
    await waitFor(() => {
      expect(router.state.location.pathname).toBe('/en/about')
    })
  })

  it('toggles theme and persists override in localStorage', () => {
    localStorage.clear()
    renderHeader('/ru')
    const toggle = screen.getAllByRole('button', {
      name: /переключить тему|toggle theme/i,
    })[0]
    fireEvent.click(toggle)
    expect(localStorage.getItem('aurora-theme-user-override')).toBe('true')
  })

  it('includes a mobile menu panel for small screens (DOM id)', () => {
    renderHeader('/ru')
    expect(document.getElementById('mobile-menu')).toBeTruthy()
  })
})
