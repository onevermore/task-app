import { forwardRef, type SelectHTMLAttributes } from 'react'
import { FieldError } from './FieldError'

interface SelectOption {
  value: string
  label: string
}

interface SelectFieldProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string
  options: SelectOption[]
  error?: string
}

export const Select = forwardRef<HTMLSelectElement, SelectFieldProps>(
  ({ label, options, error, id, className = '', ...props }, ref) => {
    const selectId = id ?? props.name
    return (
      <div className="flex flex-col gap-1.5">
        <label htmlFor={selectId} className="text-[11px] font-bold tracking-[.1em] text-ink uppercase">
          {label}
        </label>
        <div className="relative flex">
          <select
            id={selectId}
            ref={ref}
            className={`w-full appearance-none rounded-[9px] border bg-white px-3 py-2.75 pr-8.5 text-sm text-ink outline-none focus:border-ink focus:ring-3 focus:ring-rose/45 ${
              error ? 'border-rose' : 'border-sage/60'
            } ${className}`}
            {...props}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <span className="pointer-events-none absolute top-1/2 right-3.5 -translate-y-1/2 text-[11px] text-sage">
            ▼
          </span>
        </div>
        {error && <FieldError message={error} />}
      </div>
    )
  },
)
Select.displayName = 'Select'
