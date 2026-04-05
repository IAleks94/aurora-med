import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, within, fireEvent, waitFor } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { ThemeProvider } from '@/context'
import i18n from '@/i18n'
import { Suppliers } from './Suppliers'

const { sendEmailMock } = vi.hoisted(() => ({
  sendEmailMock: vi.fn(() => Promise.resolve()),
}))

vi.mock('@/services', () => ({
  initEmailJS: vi.fn(),
  sendEmail: sendEmailMock,
}))

async function renderSuppliers(initialPath: string) {
  const lang = initialPath.startsWith('/en') ? 'en' : 'ru'
  await i18n.changeLanguage(lang)
  return render(
    <MemoryRouter initialEntries={[initialPath]}>
      <ThemeProvider>
        <Routes>
          <Route path="/:lang/suppliers" element={<Suppliers />} />
        </Routes>
      </ThemeProvider>
    </MemoryRouter>,
  )
}

describe('Suppliers page', () => {
  beforeEach(() => {
    sendEmailMock.mockClear()
    sendEmailMock.mockImplementation(() => Promise.resolve())
  })

  it('renders hero and partnership copy in Russian', async () => {
    await renderSuppliers('/ru/suppliers')
    const hero = screen.getByTestId('suppliers-hero')
    expect(within(hero).getByRole('heading', { name: /поставщикам/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /условия сотрудничества/i })).toBeInTheDocument()
    expect(screen.getByText(/координируем поставки орфанных/i)).toBeInTheDocument()
  })

  it('renders hero in English', async () => {
    await renderSuppliers('/en/suppliers')
    const hero = screen.getByTestId('suppliers-hero')
    expect(within(hero).getByRole('heading', { name: /for suppliers/i })).toBeInTheDocument()
  })

  it('shows validation errors when submitting an empty form', async () => {
    await renderSuppliers('/ru/suppliers')
    fireEvent.submit(screen.getByTestId('suppliers-form'))
    const alerts = await screen.findAllByRole('alert')
    expect(alerts.length).toBeGreaterThan(0)
    expect(screen.getAllByText(/это поле обязательно/i).length).toBeGreaterThan(0)
  })

  it('shows email validation error for invalid email', async () => {
    await renderSuppliers('/en/suppliers')
    fireEvent.change(screen.getByLabelText(/^company name$/i), {
      target: { value: 'Pharma EU' },
    })
    fireEvent.change(screen.getByLabelText(/^country$/i), {
      target: { value: 'Germany' },
    })
    fireEvent.change(screen.getByLabelText(/^contact person$/i), {
      target: { value: 'Alex' },
    })
    fireEvent.change(screen.getByLabelText(/^email$/i), {
      target: { value: 'bad' },
    })
    fireEvent.change(screen.getByLabelText(/^message$/i), {
      target: { value: 'Hello' },
    })
    fireEvent.submit(screen.getByTestId('suppliers-form'))
    expect(await screen.findByText(/valid email/i)).toBeInTheDocument()
    expect(sendEmailMock).not.toHaveBeenCalled()
  })

  it('submits via EmailJS and shows success message', async () => {
    await renderSuppliers('/en/suppliers')
    fireEvent.change(screen.getByLabelText(/^company name$/i), {
      target: { value: 'EuroPharma' },
    })
    fireEvent.change(screen.getByLabelText(/^country$/i), {
      target: { value: 'France' },
    })
    fireEvent.change(screen.getByLabelText(/^contact person$/i), {
      target: { value: 'Jean Dupont' },
    })
    fireEvent.change(screen.getByLabelText(/^email$/i), {
      target: { value: 'jean@example.com' },
    })
    fireEvent.change(screen.getByLabelText(/^message$/i), {
      target: { value: 'We supply rare therapies.' },
    })
    fireEvent.submit(screen.getByTestId('suppliers-form'))

    await waitFor(() => {
      expect(sendEmailMock).toHaveBeenCalledTimes(1)
    })
    expect(sendEmailMock).toHaveBeenCalledWith({
      form_type: 'supplier_inquiry',
      company_name: 'EuroPharma',
      country: 'France',
      contact_person: 'Jean Dupont',
      email: 'jean@example.com',
      message: 'We supply rare therapies.',
    })

    await waitFor(() => {
      expect(screen.getByTestId('suppliers-success')).toBeInTheDocument()
    })
  })

  it('shows error message when sendEmail rejects', async () => {
    sendEmailMock.mockRejectedValueOnce(new Error('network'))
    await renderSuppliers('/en/suppliers')
    fireEvent.change(screen.getByLabelText(/^company name$/i), {
      target: { value: 'EuroPharma' },
    })
    fireEvent.change(screen.getByLabelText(/^country$/i), {
      target: { value: 'France' },
    })
    fireEvent.change(screen.getByLabelText(/^contact person$/i), {
      target: { value: 'Jean Dupont' },
    })
    fireEvent.change(screen.getByLabelText(/^email$/i), {
      target: { value: 'jean@example.com' },
    })
    fireEvent.change(screen.getByLabelText(/^message$/i), {
      target: { value: 'Hello' },
    })
    fireEvent.submit(screen.getByTestId('suppliers-form'))

    await waitFor(() => {
      expect(screen.getByTestId('suppliers-error')).toBeInTheDocument()
    })
  })
})
