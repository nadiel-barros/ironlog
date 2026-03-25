import { useEffect, useId, useRef } from 'react'
import type { ReactNode } from 'react'
import './Modal.css'

type ModalProps = {
  title: string
  onClose: () => void
  children: ReactNode
  footer?: ReactNode
}

export function Modal({ title, onClose, children, footer }: ModalProps) {
  const modalTitleId = useId()
  const modalCardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const card = modalCardRef.current
    if (!card) {
      return
    }

    const getFocusableElements = (): HTMLElement[] =>
      Array.from(
        card.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((element) => !element.hasAttribute('disabled'))

    const focusables = getFocusableElements()
    ;(focusables[0] ?? card).focus()

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        onClose()
        return
      }

      if (event.key !== 'Tab') {
        return
      }

      const nextFocusables = getFocusableElements()
      if (nextFocusables.length === 0) {
        event.preventDefault()
        card.focus()
        return
      }

      const first = nextFocusables[0]
      const last = nextFocusables[nextFocusables.length - 1]
      const active = document.activeElement

      if (event.shiftKey && active === first) {
        event.preventDefault()
        last.focus()
        return
      }

      if (!event.shiftKey && active === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        ref={modalCardRef}
        className="modal-card"
        role="dialog"
        aria-modal="true"
        aria-labelledby={modalTitleId}
        tabIndex={-1}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="modal-header">
          <div id={modalTitleId} className="modal-title">
            {title}
          </div>
          <button
            type="button"
            className="modal-close"
            onClick={onClose}
            aria-label="Fechar modal"
          >
            X
          </button>
        </div>

        <div className="modal-body">{children}</div>

        {footer ? <div className="modal-footer">{footer}</div> : null}
      </div>
    </div>
  )
}
