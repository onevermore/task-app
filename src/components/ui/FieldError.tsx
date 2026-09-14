interface FieldErrorProps {
  message: string
}

export function FieldError({ message }: FieldErrorProps) {
  return (
    <span className="w-fit rounded-md bg-rose/40 px-2.5 py-1 text-xs font-medium text-ink">{message}</span>
  )
}
