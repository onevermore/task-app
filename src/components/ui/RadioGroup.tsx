import type { UseFormRegisterReturn } from 'react-hook-form'
import { FieldError } from './FieldError'

interface RadioOption {
  value: string
  label: string
}

interface RadioGroupProps {
  label: string
  options: RadioOption[]
  registration: UseFormRegisterReturn
  selectedValue: string
  error?: string
}

export function RadioGroup({ label, options, registration, selectedValue, error }: RadioGroupProps) {
  return (
    <fieldset className="flex flex-col gap-2">
      <legend className="text-[11px] font-bold tracking-[.1em] text-ink uppercase">{label}</legend>
      <div className="flex gap-2">
        {options.map((option) => {
          const active = option.value === selectedValue
          return (
            <label
              key={option.value}
              className={`flex flex-1 cursor-pointer items-center gap-1.75 rounded-[9px] border px-2.5 py-2.25 text-[13px] ${
                active ? 'border-mauve bg-rose/45 font-bold text-ink' : 'border-sage/60 bg-white font-normal text-ink'
              }`}
            >
              <input type="radio" value={option.value} className="m-0 h-3.5 w-3.5 accent-ink" {...registration} />
              <span>{option.label}</span>
            </label>
          )
        })}
      </div>
      {error && <FieldError message={error} />}
    </fieldset>
  )
}
