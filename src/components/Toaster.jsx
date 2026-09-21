import { useToast } from '../context/ToastContext.jsx'

export default function Toaster() {
  const { toasts, dismiss } = useToast()

  if (toasts.length === 0) {
    return null
  }

  return (
    <div className="toast-container" aria-live="polite">
      {toasts.map((toast) => (
        <div key={toast.id} className={`toast toast--${toast.type}`} role="status">
          <i
            className={`bi ${
              toast.type === 'danger'
                ? 'bi-exclamation-triangle-fill'
                : toast.type === 'info'
                  ? 'bi-info-circle-fill'
                  : 'bi-check-circle-fill'
            }`}
          ></i>
          <span className="toast-message">{toast.message}</span>
          <button type="button" className="toast-close" onClick={() => dismiss(toast.id)} aria-label="Dismiss">
            <i className="bi bi-x-lg"></i>
          </button>
        </div>
      ))}
    </div>
  )
}