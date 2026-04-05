import { useId, type HTMLInputTypeAttribute } from 'react'
import type { UseFormRegisterReturn } from 'react-hook-form'
import { Field, ErrorText, Label, Root, TextAreaField } from './Input.styled'

export type InputProps = {
  label: string
  error?: string
  type?: HTMLInputTypeAttribute
  placeholder?: string
  multiline?: boolean
  rows?: number
  register?: UseFormRegisterReturn
  id?: string
}

export function Input({
  label,
  error,
  type = 'text',
  placeholder,
  multiline = false,
  rows = 4,
  register,
  id: idProp,
}: InputProps) {
  const uid = useId()
  const id = idProp ?? uid
  const hasError = Boolean(error)

  return (
    <Root>
      <Label htmlFor={id}>{label}</Label>
      {multiline ? (
        <TextAreaField
          id={id}
          $hasError={hasError}
          rows={rows}
          placeholder={placeholder}
          aria-invalid={hasError}
          aria-describedby={hasError ? `${id}-error` : undefined}
          {...register}
        />
      ) : (
        <Field
          id={id}
          type={type}
          $hasError={hasError}
          placeholder={placeholder}
          aria-invalid={hasError}
          aria-describedby={hasError ? `${id}-error` : undefined}
          {...register}
        />
      )}
      {error ? (
        <ErrorText id={`${id}-error`} role="alert">
          {error}
        </ErrorText>
      ) : null}
    </Root>
  )
}
