import { describe, it, expect } from 'vitest'

describe('path alias', () => {
  it('resolves @ to src', async () => {
    const mod = await import('@/App')
    expect(mod.default).toBeTypeOf('function')
  })
})
