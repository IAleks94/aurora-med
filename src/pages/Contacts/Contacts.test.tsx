import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, within, fireEvent, waitFor } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { ThemeProvider } from '@/context'
import i18n from '@/i18n'
import { Contacts } from './Contacts'

const { sendEmailMock } = vi.hoisted(() => ({
  sendEmailMock: vi.fn(() => Promise.resolve()),
}))

vi.mock('@/services', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/services')>()
  return {
    ...actual,
    sendEmail: sendEmailMock,
  }
})

async function renderContacts(initialPath: string) {
  const lang = initialPath.startsWith('/en') ? 'en' : 'ru'
  await i18n.changeLanguage(lang)
  return render(
    <MemoryRouter initialEntries={[initialPath]}>
      <ThemeProvider>
        <Routes>
          <Route path="/:lang/contacts" element={<Contacts />} />
        </Routes>
      </ThemeProvider>
    </MemoryRouter>,
  )
}

describe('Contacts page', () => {
  beforeEach(() => {
    sendEmailMock.mockClear()
    sendEmailMock.mockImplementation(() => Promise.resolve())
  })

  it('renders hero and contact info in Russian', async () => {
    await renderContacts('/ru/contacts')
    const hero = screen.getByTestId('contacts-hero')
    expect(within(hero).getByRole('heading', { name: /контакты/i })).toBeInTheDocument()
    expect(screen.getByTestId('contacts-info')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /info@aurora-med\.example/i })).toBeInTheDocument()
  })

  it('renders hero in English', async () => {
    await renderContacts('/en/contacts')
    const hero = screen.getByTestId('contacts-hero')
    expect(within(hero).getByRole('heading', { name: /^contacts$/i })).toBeInTheDocument()
  })

  it('shows validation errors when submitting an empty form', async () => {
    await renderContacts('/ru/contacts')
    fireEvent.submit(screen.getByTestId('contacts-form'))
    const alerts = await screen.findAllByRole('alert')
    expect(alerts.length).toBeGreaterThan(0)
    expect(screen.getAllByText(/это поле обязательно/i).length).toBeGreaterThan(0)
  })

  it('shows email validation error for invalid email', async () => {
    await renderContacts('/en/contacts')
    fireEvent.change(screen.getByLabelText(/^name$/i), {
      target: { value: 'Jane' },
    })
    fireEvent.change(screen.getByLabelText(/^email$/i), {
      target: { value: 'bad' },
    })
    fireEvent.change(screen.getByLabelText(/^message$/i), {
      target: { value: 'Hello' },
    })
    fireEvent.submit(screen.getByTestId('contacts-form'))
    expect(await screen.findByText(/valid email/i)).toBeInTheDocument()
    expect(sendEmailMock).not.toHaveBeenCalled()
  })

  it('submits via EmailJS and shows success message', async () => {
    await renderContacts('/en/contacts')
    fireEvent.change(screen.getByLabelText(/^name$/i), {
      target: { value: 'Jane Doe' },
    })
    fireEvent.change(screen.getByLabelText(/^email$/i), {
      target: { value: 'jane@example.com' },
    })
    fireEvent.change(screen.getByLabelText(/^message$/i), {
      target: { value: 'Question about coordination.' },
    })
    fireEvent.submit(screen.getByTestId('contacts-form'))

    await waitFor(() => {
      expect(sendEmailMock).toHaveBeenCalledTimes(1)
    })
    expect(sendEmailMock).toHaveBeenCalledWith({
      form_type: 'contact_feedback',
      contact_name: 'Jane Doe',
      email: 'jane@example.com',
      message: 'Question about coordination.',
    })

    await waitFor(() => {
      expect(screen.getByTestId('contacts-success')).toBeInTheDocument()
    })
  })

  it('shows error message when sendEmail rejects', async () => {
    sendEmailMock.mockRejectedValueOnce(new Error('network'))
    await renderContacts('/en/contacts')
    fireEvent.change(screen.getByLabelText(/^name$/i), {
      target: { value: 'Jane Doe' },
    })
    fireEvent.change(screen.getByLabelText(/^email$/i), {
      target: { value: 'jane@example.com' },
    })
    fireEvent.change(screen.getByLabelText(/^message$/i), {
      target: { value: 'Hello' },
    })
    fireEvent.submit(screen.getByTestId('contacts-form'))

    await waitFor(() => {
      expect(screen.getByTestId('contacts-error')).toBeInTheDocument()
    })
  })
})
