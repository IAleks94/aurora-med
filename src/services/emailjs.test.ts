import { beforeEach, describe, expect, it, vi } from 'vitest'
import emailjs from '@emailjs/browser'
import {
  EMAILJS_RATE_LIMIT_ERROR,
  initEmailJS,
  resolveTemplateId,
  sendEmail,
} from './emailjs'

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

  it('resolveTemplateId falls back to default when per-form templates are partially configured', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
    expect(
      resolveTemplateId(
        { form_type: 'order_request', email: 'z@z.com' },
        {
          defaultTemplateId: 'main',
          byFormType: {
            order_request: undefined,
            contact_feedback: 'contact_tpl',
          },
        },
      ),
    ).toBe('main')
    warn.mockRestore()
  })

  it('resolveTemplateId uses default template when no per-form ids are set', () => {
    expect(
      resolveTemplateId(
        { form_type: 'order_request', email: 'z@z.com' },
        {
          defaultTemplateId: 'only_template',
          byFormType: {},
        },
      ),
    ).toBe('only_template')
  })

  it('resolveTemplateId ignores prototype property names mistaken for form_type', () => {
    expect(
      resolveTemplateId(
        { form_type: 'toString', email: 'z@z.com' },
        {
          defaultTemplateId: 'only_template',
          byFormType: {
            order_request: 'order_tpl',
          },
        },
      ),
    ).toBe('only_template')
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

  it('sendEmail blocks a second send within the client cooldown window for the same form_type', async () => {
    await sendEmail({
      form_type: 'order_request',
      organization_name: 'Org',
      contact_name: 'Jane',
      email: 'j@example.com',
    })
    await expect(
      sendEmail({
        form_type: 'order_request',
        organization_name: 'Org',
        contact_name: 'Jane',
        email: 'j@example.com',
      }),
    ).rejects.toThrow(EMAILJS_RATE_LIMIT_ERROR)
    expect(mocked.send).toHaveBeenCalledTimes(1)
  })

  it('sendEmail allows different form_types within the same cooldown window', async () => {
    await sendEmail({
      form_type: 'order_request',
      organization_name: 'Org',
      contact_name: 'Jane',
      email: 'j@example.com',
    })
    await sendEmail({
      form_type: 'contact_feedback',
      contact_name: 'Jane',
      email: 'j@example.com',
      message: 'Hi',
    })
    expect(mocked.send).toHaveBeenCalledTimes(2)
  })

  it('sendEmail serializes concurrent calls so only one request runs per cooldown window', async () => {
    const params = {
      form_type: 'order_request' as const,
      organization_name: 'Org',
      contact_name: 'Jane',
      email: 'j@example.com',
    }
    const first = sendEmail(params)
    const second = sendEmail(params)
    await expect(first).resolves.toBeUndefined()
    await expect(second).rejects.toThrow(EMAILJS_RATE_LIMIT_ERROR)
    expect(mocked.send).toHaveBeenCalledTimes(1)
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
