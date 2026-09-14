import { forwardRef, type TextareaHTMLAttributes } from 'react'
import { FieldError } from './FieldError'

interface TextareaFieldProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string
  error?: string
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaFieldProps>(
  ({ label, error, id, className = '', ...props }, ref) => {
    const textareaId = id ?? props.name
    return (
      <div className="flex flex-col gap-1.5">
        <label htmlFor={textareaId} className="text-[11px] font-bold tracking-[.1em] text-ink uppercase">
          {label}
        </label>
        <textarea
          id={textareaId}
          ref={ref}
          rows={3}
          className={`resize-y rounded-[9px] border px-3 py-2.75 text-sm leading-relaxed text-ink outline-none focus:border-ink focus:ring-3 focus:ring-rose/45 ${
            error ? 'border-rose' : 'border-sage/60'
          } ${className}`}
          {...props}
        />
        {error && <FieldError message={error} />}
      </div>
    )
  },
)
Textarea.displayName = 'Textarea'
