import { forwardRef, type HTMLAttributes, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { getMotionConfig } from '@/lib/motion'
import { X } from 'lucide-react'

interface DialogProps extends HTMLAttributes<HTMLDivElement> {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  motionLevel?: string
}

const Dialog = forwardRef<HTMLDivElement, DialogProps>(
  ({ className, open, onOpenChange, motionLevel = 'normal', children, ...props }, ref) => {
    const motionConfig = getMotionConfig(motionLevel as any)
    const dialogMotion = motionConfig.dialogTransition as any

    useEffect(() => {
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape' && open) {
          onOpenChange?.(false)
        }
      }
      document.addEventListener('keydown', handleEscape)
      return () => document.removeEventListener('keydown', handleEscape)
    }, [open, onOpenChange])

    return (
      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-50">
            <motion.div
              className="fixed inset-0 bg-background/80 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => onOpenChange?.(false)}
            />
            <div className="fixed inset-0 flex items-center justify-center p-4">
              <motion.div
                ref={ref as any}
                className={cn(
                  'relative bg-card border border-border rounded-lg shadow-lg max-w-lg w-full max-h-[85vh] overflow-auto',
                  className
                )}
                initial={dialogMotion.initial}
                animate={dialogMotion.animate}
                exit={dialogMotion.exit}
                transition={dialogMotion.transition}
                {...props as any}
              >
                {children}
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>
    )
  }
)
Dialog.displayName = 'Dialog'

interface DialogContentProps extends HTMLAttributes<HTMLDivElement> {
  onClose?: () => void
  showClose?: boolean
}

const DialogContent = forwardRef<HTMLDivElement, DialogContentProps>(
  ({ className, onClose, showClose = true, children, ...props }, ref) => (
    <div ref={ref} className={cn('p-6', className)} {...props}>
      {children}
      {showClose && onClose && (
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>
      )}
    </div>
  )
)
DialogContent.displayName = 'DialogContent'

const DialogHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex flex-col space-y-1.5 text-center sm:text-left', className)} {...props} />
  )
)
DialogHeader.displayName = 'DialogHeader'

const DialogTitle = forwardRef<HTMLHeadingElement, HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h2 ref={ref} className={cn('text-lg font-semibold leading-none tracking-tight', className)} {...props} />
  )
)
DialogTitle.displayName = 'DialogTitle'

const DialogDescription = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn('text-sm text-muted-foreground', className)} {...props} />
  )
)
DialogDescription.displayName = 'DialogDescription'

const DialogFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2', className)} {...props} />
  )
)
DialogFooter.displayName = 'DialogFooter'

export { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, type DialogProps }
