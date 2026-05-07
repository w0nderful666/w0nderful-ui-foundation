import * as React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/cn'
import { X } from 'lucide-react'

interface WindowProps {
  title: string
  children: React.ReactNode
  className?: string
  onClose?: () => void
  isOpen?: boolean
}

export function Window({ title, children, className, onClose, isOpen = true }: WindowProps) {
  if (!isOpen) return null

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 10 }}
      transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        'overflow-hidden rounded-lg border bg-card shadow-xl',
        className
      )}
    >
      <div className="flex items-center justify-between border-b bg-muted/50 px-4 py-2">
        <div className="flex items-center gap-2">
          <button
            onClick={onClose}
            className="flex h-3 w-3 items-center justify-center rounded-full bg-red-500 hover:bg-red-600"
          >
            <X className="h-2 w-2 text-red-950 opacity-0 hover:opacity-100" />
          </button>
          <div className="h-3 w-3 rounded-full bg-amber-500" />
          <div className="h-3 w-3 rounded-full bg-green-500" />
        </div>
        <span className="text-xs font-medium text-muted-foreground">{title}</span>
        <div className="w-12" />
      </div>
      <div className="p-4">
        {children}
      </div>
    </motion.div>
  )
}