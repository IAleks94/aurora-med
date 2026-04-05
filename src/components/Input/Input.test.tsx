import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { useForm } from 'react-hook-form'
import { ThemeProvider } from 'styled-components'
import { lightTheme } from '@/styles'
import { Input } from './Input'

function FormWithInput() {
  const { register } = useForm<{ email: string }>({
    defaultValues: { email: '' },
  })
  return (
    <ThemeProvider theme={lightTheme}>
      <Input label="Email" register={register('email')} />
    </ThemeProvider>
  )
}

describe('Input', () => {
  it('renders label and associates id', () => {
    render(
      <ThemeProvider theme={lightTheme}>
        <Input label="Name" id="nm" />
      </ThemeProvider>,
    )
    const input = screen.getByLabelText(/name/i)
    expect(input).toHaveAttribute('id', 'nm')
  })

  it('shows error message', () => {
    render(
      <ThemeProvider theme={lightTheme}>
        <Input label="Field" error="Required" />
      </ThemeProvider>,
    )
    expect(screen.getByRole('alert')).toHaveTextContent('Required')
  })

  it('renders textarea when multiline', () => {
    render(
      <ThemeProvider theme={lightTheme}>
        <Input label="Notes" multiline />
      </ThemeProvider>,
    )
    expect(screen.getByLabelText(/notes/i).tagName).toBe('TEXTAREA')
  })

  it('works with react-hook-form register', () => {
    render(<FormWithInput />)
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
  })
})
