import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import { lightTheme } from '@/styles'
import { Accordion } from './Accordion'

const items = [
  { question: 'First?', answer: 'First answer.' },
  { question: 'Second?', answer: 'Second answer.' },
]

describe('Accordion', () => {
  it('toggles panel to show answer', () => {
    render(
      <ThemeProvider theme={lightTheme}>
        <Accordion items={items} />
      </ThemeProvider>,
    )
    const btn = screen.getByRole('button', { name: /first/i })
    expect(btn).toHaveAttribute('aria-expanded', 'false')
    fireEvent.click(btn)
    expect(btn).toHaveAttribute('aria-expanded', 'true')
    expect(screen.getByText('First answer.')).toBeInTheDocument()
  })
})
