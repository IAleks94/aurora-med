import emailjs from '@emailjs/browser'

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID as string | undefined
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string | undefined
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string | undefined

const TEMPLATE_BY_FORM_TYPE: Record<string, string | undefined> = {
  order_request: import.meta.env.VITE_EMAILJS_TEMPLATE_ID_ORDER as string | undefined,
  contact_feedback: import.meta.env.VITE_EMAILJS_TEMPLATE_ID_CONTACT as string | undefined,
  supplier_inquiry: import.meta.env.VITE_EMAILJS_TEMPLATE_ID_SUPPLIER as string | undefined,
}

function resolveTemplateId(templateParams: Record<string, string>): string | undefined {
  const formType = templateParams.form_type
  if (formType && TEMPLATE_BY_FORM_TYPE[formType]) {
    return TEMPLATE_BY_FORM_TYPE[formType]
  }
  return TEMPLATE_ID
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
  if (result.status < 200 || result.status >= 300) {
    throw new Error(`EmailJS send failed with status ${result.status}`)
  }
}
