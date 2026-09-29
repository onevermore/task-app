import type { ButtonHTMLAttributes } from 'react'

type ButtonVariant = 'primary' | 'submit' | 'secondary' | 'pill'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'rounded-[10px] bg-mauve px-5 py-3 text-white hover:bg-plum',
  submit: 'flex-1 rounded-[9px] bg-mauve px-4 py-3 text-white hover:bg-sage',
  secondary: 'rounded-[9px] border border-sage/70 bg-white px-4.5 py-3 text-ink hover:bg-rose/30',
  pill: 'rounded-full border border-sage/60 bg-white px-2.5 py-1.5 text-ink hover:border-rose hover:bg-rose/40',
}

export function Button({ variant = 'primary', className = '', ...props }: ButtonProps) {
  return (
    <button
      className={`text-lg font-medium tracking-[.02em] transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${variantClasses[variant]} ${className}`}
      {...props}
    />
  )
}
