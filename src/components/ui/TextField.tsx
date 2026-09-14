import { forwardRef, type InputHTMLAttributes } from 'react'
import { FieldError } from './FieldError'

interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
  required?: boolean
}

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ label, error, required, id, className = '', ...props }, ref) => {
    const inputId = id ?? props.name
    return (
      <div className="flex flex-col gap-1.5">
        <label htmlFor={inputId} className="text-[11px] font-bold tracking-[.1em] text-ink uppercase">
          {label} {required && <span className="text-rose">*</span>}
        </label>
        <input
          id={inputId}
          ref={ref}
          className={`rounded-[9px] border px-3 py-2.75 text-sm text-ink outline-none focus:border-ink focus:ring-3 focus:ring-rose/45 ${
            error ? 'border-rose' : 'border-sage/60'
          } ${className}`}
          {...props}
        />
        {error && <FieldError message={error} />}
      </div>
    )
  },
)
TextField.displayName = 'TextField'
