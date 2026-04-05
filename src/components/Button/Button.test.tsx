import { describe, it, expect, vi } from 'vitest'
import type { ReactNode } from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import { lightTheme } from '@/styles'
import { Button } from './Button'

function wrap(ui: ReactNode) {
  return render(<ThemeProvider theme={lightTheme}>{ui}</ThemeProvider>)
}

describe('Button', () => {
  it('renders children and handles click', () => {
    const onClick = vi.fn()
    wrap(<Button onClick={onClick}>Submit</Button>)
    fireEvent.click(screen.getByRole('button', { name: /submit/i }))
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('respects fullWidth', () => {
    wrap(
      <Button fullWidth data-testid="btn">
        Wide
      </Button>,
    )
    expect(screen.getByTestId('btn')).toHaveStyle({ width: '100%' })
  })

  it('defaults to type button', () => {
    wrap(<Button>Act</Button>)
    expect(screen.getByRole('button')).toHaveAttribute('type', 'button')
  })
})
