import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { RevealOnScroll } from './RevealOnScroll'

describe('RevealOnScroll', () => {
  it('renders children', () => {
    render(
      <RevealOnScroll>
        <p>Reveal content</p>
      </RevealOnScroll>,
    )
    expect(screen.getByText('Reveal content')).toBeInTheDocument()
  })
})
