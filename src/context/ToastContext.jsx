/* eslint-disable react-refresh/only-export-components */
import { createContext, useCallback, useContext, useMemo, useState } from 'react'

const ToastContext = createContext(null)

let toastCounter = 0

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const dismiss = useCallback((id) => {
    setToasts((list) => list.filter((toast) => toast.id !== id))
  }, [])

  const push = useCallback((message, type = 'success', duration = 4500) => {
    toastCounter += 1
    const id = `toast-${Date.now()}-${toastCounter}`
    setToasts((list) => {
      const withoutDuplicates = list.filter((toast) => !(toast.type === type && toast.message === message))
      return [...withoutDuplicates, { id, message, type }]
    })
    if (duration > 0) {
      setTimeout(() => {
        setToasts((list) => list.filter((toast) => toast.id !== id))
      }, duration)
    }
    return id
  }, [])

  const success = useCallback((message, duration) => push(message, 'success', duration), [push])
  const error = useCallback((message, duration) => push(message, 'danger', duration), [push])
  const info = useCallback((message, duration) => push(message, 'info', duration), [push])

  const value = useMemo(
    () => ({
      toasts,
      dismiss,
      push,
      success,
      error,
      info,
    }),
    [toasts, dismiss, push, success, error, info],
  )

  return <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
}

export function useToast() {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context
}