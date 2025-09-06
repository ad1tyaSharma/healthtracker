import React, { createContext, useCallback, useContext, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MdCheckCircle, MdError, MdInfo, MdWarning, MdClose } from 'react-icons/md'

type ToastType = 'success' | 'error' | 'info' | 'warning'

type Toast = {
  id: string
  message: string
  type: ToastType
}

type ToastContextType = {
  showToast: (message: string, type?: ToastType, duration?: number) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toasts, setToasts] = useState<Toast[]>([])

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id))
  }, [])

  const showToast = useCallback((message: string, type: ToastType = 'info', duration = 5000) => {
    const id = Date.now().toString(36) + Math.random().toString(36).slice(2, 8)
    const t: Toast = { id, message, type }
    setToasts(prev => [...prev, t])
    window.setTimeout(() => removeToast(id), duration)
  }, [removeToast])

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div aria-live="polite" className="fixed inset-0 z-50 pointer-events-none">
        <div className="flex flex-col items-end p-4 sm:p-6 gap-3 h-full">
          <div className="mt-auto w-full max-w-sm">
            <AnimatePresence initial={false}>
              {toasts.map(t => (
                <motion.div
                  key={t.id}
                  initial={{ opacity: 0, y: 12, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 12, scale: 0.98 }}
                  transition={{ duration: 0.18 }}
                  className="pointer-events-auto mb-3"
                >
                  <ToastItem toast={t} onClose={() => removeToast(t.id)} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </ToastContext.Provider>
  )
}

function ToastItem({ toast, onClose }: { toast: Toast; onClose: () => void }) {
  const icon = (
    {
      success: <MdCheckCircle size={20} className="text-green-600 dark:text-green-400" />,
      error: <MdError size={20} className="text-red-600 dark:text-red-400" />,
      info: <MdInfo size={20} className="text-blue-600 dark:text-blue-400" />,
      warning: <MdWarning size={20} className="text-yellow-600 dark:text-yellow-400" />,
    } as Record<ToastType, React.ReactElement>
  )[toast.type]

  return (
    <div className="w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-100 rounded-lg shadow-lg p-3 flex items-start gap-3">
      <div className="flex-shrink-0 mt-0.5">{icon}</div>
      <div className="flex-1 text-sm leading-tight">{toast.message}</div>
      <button
        onClick={onClose}
        className="ml-3 text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-100 focus:outline-none"
        aria-label="Close notification"
      >
        <MdClose size={18} />
      </button>
    </div>
  )
}

export const useToast = () => {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within a ToastProvider')
  return ctx.showToast
}

export default ToastContext
