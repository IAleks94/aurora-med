import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import { lightTheme } from '@/styles'
import { Card } from './Card'

describe('Card', () => {
  it('renders children', () => {
    render(
      <ThemeProvider theme={lightTheme}>
        <Card>Inner content</Card>
      </ThemeProvider>,
    )
    expect(screen.getByText(/inner content/i)).toBeInTheDocument()
  })
})
