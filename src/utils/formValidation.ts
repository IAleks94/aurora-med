/** Rejects empty or whitespace-only strings (HTML `required` alone does not). */
export function requiredTrimmed(message: string) {
  return (value: unknown): true | string => {
    if (typeof value === 'string' && value.trim() !== '') return true
    return message
  }
}
