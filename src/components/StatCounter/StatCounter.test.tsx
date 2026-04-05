import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import { lightTheme } from '@/styles'
import { StatCounter } from './StatCounter'

describe('StatCounter', () => {
  it('renders value and label', () => {
    render(
      <ThemeProvider theme={lightTheme}>
        <StatCounter value="48" label="cases" />
      </ThemeProvider>,
    )
    expect(screen.getByText('48')).toBeInTheDocument()
    expect(screen.getByText('cases')).toBeInTheDocument()
  })
})
