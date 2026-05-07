import { forwardRef, type HTMLAttributes, useState, useCallback, createContext, useContext } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { getMotionConfig } from '@/lib/motion'
import { X } from 'lucide-react'

interface Toast {
  id: string
  title?: string
  description?: string
  variant?: 'default' | 'success' | 'destructive' | 'warning' | 'info'
  duration?: number
}

interface ToastContextValue {
  toasts: Toast[]
  addToast: (toast: Omit<Toast, 'id'>) => void
  removeToast: (id: string) => void
}

const ToastContext = createContext<ToastContextValue | null>(null)

export function useToast() {
  const context = useContext(ToastContext)
  if (!context) throw new Error('useToast must be used within ToastProvider')
  return context
}

interface ToastProviderProps {
  children: React.ReactNode
  motionLevel?: string
}

export function ToastProvider({ children, motionLevel = 'normal' }: ToastProviderProps) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const addToast = useCallback((toast: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).slice(2)
    const newToast = { ...toast, id }
    setToasts(prev => [...prev, newToast])

    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id))
    }, toast.duration || 3000)
  }, [])

  const removeToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id))
  }, [])

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
      <ToastViewport toasts={toasts} removeToast={removeToast} motionLevel={motionLevel} />
    </ToastContext.Provider>
  )
}

interface ToastViewportProps {
  toasts: Toast[]
  removeToast: (id: string) => void
  motionLevel: string
}

const VARIANT_STYLES = {
  default: 'bg-background text-foreground border-border',
  success: 'bg-success/10 text-success border-success/30',
  destructive: 'bg-destructive/10 text-destructive border-destructive/30',
  warning: 'bg-warning/10 text-warning border-warning/30',
  info: 'bg-info/10 text-info border-info/30',
}

function ToastViewport({ toasts, removeToast, motionLevel }: ToastViewportProps) {
  const motionConfig = getMotionConfig(motionLevel as any)

  return (
    <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2 w-full max-w-sm">
      <AnimatePresence mode="popLayout">
        {toasts.map(toast => (
          <motion.div
            key={toast.id}
            layout
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{
              type: 'spring',
              stiffness: motionConfig.spring.medium.stiffness,
              damping: motionConfig.spring.medium.damping,
            }}
            className={cn(
              'pointer-events-auto relative flex w-full items-center justify-between gap-2 overflow-hidden rounded-lg border p-4 shadow-lg',
              VARIANT_STYLES[toast.variant || 'default']
            )}
          >
            <div className="flex-1">
              {toast.title && <p className="font-medium text-sm">{toast.title}</p>}
              {toast.description && <p className="text-sm opacity-90">{toast.description}</p>}
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="shrink-0 rounded-md p-1 opacity-70 hover:opacity-100 transition-opacity"
            >
              <X className="h-4 w-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

export { type Toast, type ToastProviderProps }
