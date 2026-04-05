import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import { lightTheme } from '@/styles'
import { SectionTitle } from './SectionTitle'

describe('SectionTitle', () => {
  it('renders title with decorative plus signs', () => {
    render(
      <ThemeProvider theme={lightTheme}>
        <SectionTitle>How it works</SectionTitle>
      </ThemeProvider>,
    )
    expect(screen.getByText('How it works')).toBeInTheDocument()
    const pluses = screen.getAllByText('+')
    expect(pluses.length).toBeGreaterThanOrEqual(2)
  })
})
