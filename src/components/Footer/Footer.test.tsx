import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'
import i18n from '@/i18n'
import { ThemeProvider } from '@/context'
import { Footer } from './Footer'

function renderFooter(initialPath: string) {
  const router = createMemoryRouter(
    [
      {
        path: '/:lang/*',
        element: (
          <ThemeProvider>
            <Footer />
          </ThemeProvider>
        ),
      },
    ],
    { initialEntries: [initialPath] },
  )
  return render(<RouterProvider router={router} />)
}

describe('Footer', () => {
  beforeEach(() => {
    void i18n.changeLanguage('ru')
  })

  it('renders logo, copyright, nav links, and email', () => {
    renderFooter('/ru')
    expect(screen.getByLabelText(/Aurora Med home/i)).toBeInTheDocument()
    expect(screen.getByText(/© Aurora Med/i)).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /Главная/i })).toHaveAttribute(
      'href',
      '/ru',
    )
    expect(screen.getByRole('link', { name: /info@aurora-med/i })).toHaveAttribute(
      'href',
      'mailto:info@aurora-med.example',
    )
  })

  it('uses language-prefixed routes', async () => {
    await i18n.changeLanguage('en')
    renderFooter('/en')
    expect(screen.getByRole('link', { name: /About/i })).toHaveAttribute(
      'href',
      '/en/about',
    )
  })
})
