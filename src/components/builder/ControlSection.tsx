import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, ChevronRight, Info } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ControlSectionProps {
  title: string
  description?: string
  defaultOpen?: boolean
  persistKey?: string
  children: React.ReactNode
}

const SECTION_STORAGE_PREFIX = 'ui-kit-section-'

export function ControlSection({ 
  title, 
  description, 
  defaultOpen = false, 
  persistKey, 
  children 
}: ControlSectionProps) {
  const [isOpen, setIsOpen] = useState(() => {
    if (persistKey) {
      const stored = localStorage.getItem(`${SECTION_STORAGE_PREFIX}${persistKey}`)
      if (stored !== null) {
        return stored === 'true'
      }
    }
    return defaultOpen
  })

  useEffect(() => {
    if (persistKey) {
      localStorage.setItem(`${SECTION_STORAGE_PREFIX}${persistKey}`, String(isOpen))
    }
  }, [isOpen, persistKey])

  return (
    <div className="border border-border rounded-lg overflow-hidden">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'w-full flex items-center justify-between px-4 py-3 text-left',
          'bg-muted/30 hover:bg-muted/50 transition-colors',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50'
        )}
      >
        <div className="flex items-center gap-2">
          {isOpen ? (
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          ) : (
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          )}
          <span className="text-sm font-medium">{title}</span>
        </div>
        {description && (
          <div className="flex items-center gap-1 text-xs text-muted-foreground" title={description}>
            <Info className="h-3 w-3" />
          </div>
        )}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="p-4 border-t border-border">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}