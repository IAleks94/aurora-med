import emailjs from '@emailjs/browser'

/** Thrown when client-side cooldown blocks another send (forms should show a friendly message). */
export const EMAILJS_RATE_LIMIT_ERROR = 'AURORA_EMAIL_RATE_LIMIT'

const SESSION_LAST_SEND_PREFIX = 'aurora-email-last-send:'
/** Minimum time between successful sends per tab per logical form (mitigates rapid scripted abuse; not a substitute for EmailJS dashboard limits or a server relay). */
const MIN_SEND_INTERVAL_MS = 45_000

function sessionStorageKeyForSend(templateParams: Record<string, string>): string {
  const ft = templateParams.form_type?.trim()
  return `${SESSION_LAST_SEND_PREFIX}${ft || '_default'}`
}

function enforceClientSendCooldown(templateParams: Record<string, string>): void {
  if (typeof window === 'undefined') return
  try {
    const now = Date.now()
    const key = sessionStorageKeyForSend(templateParams)
    const raw = sessionStorage.getItem(key)
    const last = raw ? Number(raw) : 0
    if (Number.isFinite(last) && now - last < MIN_SEND_INTERVAL_MS) {
      throw new Error(EMAILJS_RATE_LIMIT_ERROR)
    }
  } catch (e) {
    if (e instanceof Error && e.message === EMAILJS_RATE_LIMIT_ERROR) throw e
    // Storage unavailable — do not block submission; rely on EmailJS account settings.
  }
}

function recordSuccessfulSend(templateParams: Record<string, string>): void {
  if (typeof window === 'undefined') return
  try {
    sessionStorage.setItem(
      sessionStorageKeyForSend(templateParams),
      String(Date.now()),
    )
  } catch {
    // ignore
  }
}

/**
 * Sends fields to EmailJS; dashboard templates must use matching variable names.
 *
 * Common keys: `form_type` (`order_request` | `contact_feedback` | `supplier_inquiry`).
 * - order_request: organization_name, contact_name, email, phone, order_description, medications
 * - contact_feedback: contact_name, email, message
 * - supplier_inquiry: company_name, country, contact_person, email, message
 */
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID as string | undefined
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string | undefined
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string | undefined

const FORM_TYPE_KEYS = ['order_request', 'contact_feedback', 'supplier_inquiry'] as const
type FormTypeKey = (typeof FORM_TYPE_KEYS)[number]

const FORM_ENV_SUFFIX: Record<FormTypeKey, string> = {
  order_request: 'ORDER',
  contact_feedback: 'CONTACT',
  supplier_inquiry: 'SUPPLIER',
}

function isFormTypeKey(value: string): value is FormTypeKey {
  return (FORM_TYPE_KEYS as readonly string[]).includes(value)
}

export type EmailTemplateEnv = {
  defaultTemplateId: string | undefined
  byFormType: Partial<Record<FormTypeKey, string | undefined>>
}

const defaultTemplateEnv: EmailTemplateEnv = {
  defaultTemplateId: TEMPLATE_ID,
  byFormType: {
    order_request: import.meta.env.VITE_EMAILJS_TEMPLATE_ID_ORDER as string | undefined,
    contact_feedback: import.meta.env.VITE_EMAILJS_TEMPLATE_ID_CONTACT as string | undefined,
    supplier_inquiry: import.meta.env.VITE_EMAILJS_TEMPLATE_ID_SUPPLIER as string | undefined,
  },
}

/**
 * Resolves which EmailJS template id to use. Overridable in tests via `env`.
 * If any per-form template id is set but the id for the current `form_type` is missing,
 * falls back to `defaultTemplateId` when set (with a dev warning); otherwise throws.
 */
export function resolveTemplateId(
  templateParams: Record<string, string>,
  env: EmailTemplateEnv = defaultTemplateEnv,
): string | undefined {
  const formType = templateParams.form_type
  if (!formType) {
    return env.defaultTemplateId
  }

  if (!isFormTypeKey(formType)) {
    return env.defaultTemplateId
  }

  const key = formType
  const specific = env.byFormType[key]
  if (specific) {
    return specific
  }

  const anyPerFormConfigured = FORM_TYPE_KEYS.some((k) => Boolean(env.byFormType[k]))
  if (!anyPerFormConfigured) {
    return env.defaultTemplateId
  }

  if (env.defaultTemplateId) {
    if (import.meta.env.DEV) {
      console.warn(
        `[EmailJS] Per-form template IDs are set but not for "${formType}". Using VITE_EMAILJS_TEMPLATE_ID. Set VITE_EMAILJS_TEMPLATE_ID_${FORM_ENV_SUFFIX[key]} for a dedicated template.`,
      )
    }
    return env.defaultTemplateId
  }

  throw new Error(
    `EmailJS: set VITE_EMAILJS_TEMPLATE_ID_${FORM_ENV_SUFFIX[key]} for form_type "${formType}" when other per-form template IDs are configured, or set VITE_EMAILJS_TEMPLATE_ID as fallback.`,
  )
}

let initialized = false

/** Serializes sends so cooldown cannot be bypassed by parallel submissions in one tab. */
let sendQueueTail: Promise<void> = Promise.resolve()

export function initEmailJS(): void {
  if (initialized) return
  if (!PUBLIC_KEY) {
    return
  }
  emailjs.init(PUBLIC_KEY)
  initialized = true
}

export async function sendEmail(
  templateParams: Record<string, string>,
): Promise<void> {
  const previous = sendQueueTail
  let releaseNext!: () => void
  sendQueueTail = new Promise<void>((resolve) => {
    releaseNext = resolve
  })
  await previous
  try {
    enforceClientSendCooldown(templateParams)
    const templateId = resolveTemplateId(templateParams)
    if (!SERVICE_ID || !templateId || !PUBLIC_KEY) {
      throw new Error(
        'EmailJS is not configured: set VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID (or per-form template vars), and VITE_EMAILJS_PUBLIC_KEY',
      )
    }
    const result = await emailjs.send(
      SERVICE_ID,
      templateId,
      templateParams,
      { publicKey: PUBLIC_KEY },
    )
    const status = result.status
    if (!Number.isFinite(status) || status < 200 || status >= 300) {
      throw new Error(`EmailJS send failed with status ${String(status)}`)
    }
    recordSuccessfulSend(templateParams)
  } finally {
    releaseNext()
  }
}
