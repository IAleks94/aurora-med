import emailjs from '@emailjs/browser'

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID as string | undefined
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string | undefined
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string | undefined

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
  if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
    throw new Error(
      'EmailJS is not configured: set VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, and VITE_EMAILJS_PUBLIC_KEY',
    )
  }
  const result = await emailjs.send(
    SERVICE_ID,
    TEMPLATE_ID,
    templateParams,
    { publicKey: PUBLIC_KEY },
  )
  if (result.status < 200 || result.status >= 300) {
    throw new Error(`EmailJS send failed with status ${result.status}`)
  }
}
