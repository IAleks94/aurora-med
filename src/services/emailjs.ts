import emailjs from '@emailjs/browser'

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
 * throws (avoids silently using the default template with the wrong field layout).
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

  throw new Error(
    `EmailJS: set VITE_EMAILJS_TEMPLATE_ID_${FORM_ENV_SUFFIX[key]} for form_type "${formType}" when other per-form template IDs are configured, or use only VITE_EMAILJS_TEMPLATE_ID without per-form variables.`,
  )
}

let initialized = false

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
}
