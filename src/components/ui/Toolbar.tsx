import * as React from 'react'
import { cn } from '@/lib/cn'
import { motion } from 'framer-motion'

interface ToolbarItem {
  id: string
  icon: React.ReactNode
  label?: string
  isActive?: boolean
  onClick?: () => void
}

interface ToolbarProps {
  items: ToolbarItem[]
  className?: string
}

export function Toolbar({ items, className }: ToolbarProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        'flex items-center gap-1 rounded-lg border bg-background p-1 shadow-sm',
        className
      )}
    >
      {items.map((item) => (
        <button
          key={item.id}
          onClick={item.onClick}
          className={cn(
            'relative flex h-8 w-8 items-center justify-center rounded-md transition-colors hover:bg-muted',
            item.isActive && 'bg-muted text-primary',
          )}
          title={item.label}
        >
          {item.icon}
          {item.isActive && (
            <motion.div
              layoutId="toolbar-indicator"
              className="absolute bottom-0.5 h-0.5 w-4 rounded-full bg-primary"
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            />
          )}
        </button>
      ))}
    </motion.div>
  )
}