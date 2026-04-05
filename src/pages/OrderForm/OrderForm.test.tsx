import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, within, fireEvent, waitFor } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { ThemeProvider } from '@/context'
import i18n from '@/i18n'
import { OrderForm } from './OrderForm'

const { sendEmailMock } = vi.hoisted(() => ({
  sendEmailMock: vi.fn(() => Promise.resolve()),
}))

vi.mock('@/services', () => ({
  initEmailJS: vi.fn(),
  sendEmail: sendEmailMock,
}))

async function renderOrderForm(initialPath: string) {
  const lang = initialPath.startsWith('/en') ? 'en' : 'ru'
  await i18n.changeLanguage(lang)
  return render(
    <MemoryRouter initialEntries={[initialPath]}>
      <ThemeProvider>
        <Routes>
          <Route path="/:lang/order" element={<OrderForm />} />
        </Routes>
      </ThemeProvider>
    </MemoryRouter>,
  )
}

describe('OrderForm page', () => {
  beforeEach(() => {
    sendEmailMock.mockClear()
    sendEmailMock.mockImplementation(() => Promise.resolve())
  })

  it('renders hero title and intro in Russian', async () => {
    await renderOrderForm('/ru/order')
    const hero = screen.getByTestId('order-hero')
    expect(
      within(hero).getByRole('heading', { name: /оставить запрос/i }),
    ).toBeInTheDocument()
    expect(
      within(hero).getByText(/заполните форму/i),
    ).toBeInTheDocument()
  })

  it('renders hero title and intro in English', async () => {
    await renderOrderForm('/en/order')
    const hero = screen.getByTestId('order-hero')
    expect(
      within(hero).getByRole('heading', { name: /submit a request/i }),
    ).toBeInTheDocument()
  })

  it('shows validation errors when submitting an empty form', async () => {
    await renderOrderForm('/ru/order')
    const form = screen.getByTestId('order-form')
    fireEvent.submit(form)
    const alerts = await screen.findAllByRole('alert')
    expect(alerts.length).toBeGreaterThan(0)
    expect(screen.getAllByText(/это поле обязательно/i).length).toBeGreaterThan(0)
  })

  it('shows email validation error for invalid email', async () => {
    await renderOrderForm('/en/order')
    fireEvent.change(screen.getByLabelText(/organization name/i), {
      target: { value: 'Acme' },
    })
    fireEvent.change(screen.getByLabelText(/^contact person$/i), {
      target: { value: 'Jane' },
    })
    fireEvent.change(screen.getByLabelText(/^email$/i), {
      target: { value: 'not-an-email' },
    })
    fireEvent.change(screen.getByLabelText(/^phone$/i), {
      target: { value: '+1000000' },
    })
    fireEvent.change(screen.getByLabelText(/request details/i), {
      target: { value: 'Need supply' },
    })
    fireEvent.submit(screen.getByTestId('order-form'))
    expect(await screen.findByText(/valid email/i)).toBeInTheDocument()
    expect(sendEmailMock).not.toHaveBeenCalled()
  })

  it('submits via EmailJS and shows success message', async () => {
    await renderOrderForm('/en/order')
    fireEvent.change(screen.getByLabelText(/organization name/i), {
      target: { value: 'Fund A' },
    })
    fireEvent.change(screen.getByLabelText(/^contact person$/i), {
      target: { value: 'Jane Doe' },
    })
    fireEvent.change(screen.getByLabelText(/^email$/i), {
      target: { value: 'jane@example.com' },
    })
    fireEvent.change(screen.getByLabelText(/^phone$/i), {
      target: { value: '+1 234 567 8900' },
    })
    fireEvent.change(screen.getByLabelText(/request details/i), {
      target: { value: 'Medication request details' },
    })
    fireEvent.change(screen.getByLabelText(/list of medicines/i), {
      target: { value: 'Drug X' },
    })
    fireEvent.submit(screen.getByTestId('order-form'))

    await waitFor(() => {
      expect(sendEmailMock).toHaveBeenCalledTimes(1)
    })
    expect(sendEmailMock).toHaveBeenCalledWith({
      organization_name: 'Fund A',
      contact_name: 'Jane Doe',
      email: 'jane@example.com',
      phone: '+1 234 567 8900',
      order_description: 'Medication request details',
      medications: 'Drug X',
    })

    await waitFor(() => {
      expect(screen.getByTestId('order-success')).toBeInTheDocument()
    })
  })

  it('shows error message when sendEmail rejects', async () => {
    sendEmailMock.mockRejectedValueOnce(new Error('network'))
    await renderOrderForm('/en/order')
    fireEvent.change(screen.getByLabelText(/organization name/i), {
      target: { value: 'Fund A' },
    })
    fireEvent.change(screen.getByLabelText(/^contact person$/i), {
      target: { value: 'Jane Doe' },
    })
    fireEvent.change(screen.getByLabelText(/^email$/i), {
      target: { value: 'jane@example.com' },
    })
    fireEvent.change(screen.getByLabelText(/^phone$/i), {
      target: { value: '+1' },
    })
    fireEvent.change(screen.getByLabelText(/request details/i), {
      target: { value: 'Details' },
    })
    fireEvent.submit(screen.getByTestId('order-form'))

    await waitFor(() => {
      expect(screen.getByTestId('order-error')).toBeInTheDocument()
    })
  })
})
