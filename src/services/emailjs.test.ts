import { beforeEach, describe, expect, it, vi } from 'vitest'
import emailjs from '@emailjs/browser'
import { initEmailJS, sendEmail } from './emailjs'

vi.mock('@emailjs/browser', () => ({
  default: {
    init: vi.fn(),
    send: vi.fn(() => Promise.resolve({ status: 200, text: 'OK' })),
  },
}))

const mocked = vi.mocked(emailjs)

describe('emailjs service', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    mocked.send.mockResolvedValue({ status: 200, text: 'OK' })
  })

  it('initEmailJS calls emailjs.init once with public key and is idempotent', () => {
    initEmailJS()
    expect(mocked.init).toHaveBeenCalledWith('test_public_key')
    expect(mocked.init).toHaveBeenCalledTimes(1)
    initEmailJS()
    expect(mocked.init).toHaveBeenCalledTimes(1)
  })

  it('sendEmail calls emailjs.send with service, template, params, and options', async () => {
    await sendEmail({
      organization_name: 'Org',
      contact_name: 'Jane',
      email: 'j@example.com',
    })
    expect(mocked.send).toHaveBeenCalledWith(
      'test_service',
      'test_template',
      {
        organization_name: 'Org',
        contact_name: 'Jane',
        email: 'j@example.com',
      },
      { publicKey: 'test_public_key' },
    )
  })

  it('uses per-form template id when form_type is set', async () => {
    await sendEmail({
      form_type: 'order_request',
      organization_name: 'Org',
      contact_name: 'Jane',
      email: 'j@example.com',
    })
    expect(mocked.send).toHaveBeenCalledWith(
      'test_service',
      'test_template_order',
      expect.objectContaining({ form_type: 'order_request' }),
      { publicKey: 'test_public_key' },
    )
  })

  it('sendEmail throws when EmailJS returns non-2xx status', async () => {
    mocked.send.mockResolvedValueOnce({ status: 500, text: 'err' })
    await expect(
      sendEmail({ organization_name: 'X', contact_name: 'Y', email: 'z@z.com' }),
    ).rejects.toThrow(/failed with status 500/)
  })

  it('sendEmail succeeds on 201 Created', async () => {
    mocked.send.mockResolvedValueOnce({ status: 201, text: 'Created' })
    await expect(
      sendEmail({ organization_name: 'X', contact_name: 'Y', email: 'z@z.com' }),
    ).resolves.toBeUndefined()
  })

  it('sendEmail throws when EmailJS returns non-finite status', async () => {
    mocked.send.mockResolvedValueOnce({ status: Number.NaN, text: 'ok' })
    await expect(
      sendEmail({ organization_name: 'X', contact_name: 'Y', email: 'z@z.com' }),
    ).rejects.toThrow(/EmailJS send failed/)
  })
})
