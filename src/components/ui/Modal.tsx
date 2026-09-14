import { useEffect, type ReactNode } from 'react'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: ReactNode
}

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
  useEffect(() => {
    if (!isOpen) return
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-40 flex items-start justify-center overflow-auto bg-[rgba(66,75,84,.5)] p-5 py-12 backdrop-blur-[2px]"
      onClick={onClose}
    >
      <div
        className="w-full max-w-[460px] rounded-[18px] bg-white p-6.5 shadow-[0_24px_60px_rgba(66,75,84,.35)]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mb-4.5 flex items-center justify-between gap-3 border-b border-sage/30 pb-3.5">
          <h2 id="modal-title" className="text-[19px] font-medium tracking-[.01em] text-ink">
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-sage transition-colors hover:bg-sage/20 hover:text-ink"
            aria-label="Close"
          >
            ✕
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}
