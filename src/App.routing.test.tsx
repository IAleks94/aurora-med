import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
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
    expect(screen.getByText('Suppliers')).toBeInTheDocument()
  })

  it('renders Contacts at /en/contacts', () => {
    renderApp('/en/contacts')
    expect(screen.getByText('Contacts')).toBeInTheDocument()
  })

  it('renders FAQ at /ru/faq', () => {
    renderApp('/ru/faq')
    expect(screen.getByText('FAQ')).toBeInTheDocument()
  })

  it('redirects unsupported language segment to /ru', async () => {
    const { findByText } = renderApp('/xx')
    expect(await findByText('Home')).toBeInTheDocument()
  })
})
