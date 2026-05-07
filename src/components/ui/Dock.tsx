import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/cn'

interface DockItem {
  id: string
  icon: React.ReactNode
  label?: string
  onClick?: () => void
}

interface DockProps {
  items: DockItem[]
  className?: string
  iconSize?: number
}

export function Dock({ items, className, iconSize = 40 }: DockProps) {
  const [activeId, setActiveId] = React.useState<string | null>(null)
  const [hoveredId, setHoveredId] = React.useState<string | null>(null)

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className={cn(
        'flex items-end gap-1 rounded-2xl border bg-background/80 px-3 py-2 shadow-lg backdrop-blur-md',
        className
      )}
    >
      {items.map((item) => {
        const isActive = activeId === item.id
        const isHovered = hoveredId === item.id

        return (
          <motion.div
            key={item.id}
            onMouseEnter={() => setHoveredId(item.id)}
            onMouseLeave={() => setHoveredId(null)}
            onClick={() => {
              setActiveId(item.id)
              item.onClick?.()
            }}
            animate={{
              y: isHovered ? -8 : 0,
              scale: isHovered ? 1.2 : 1,
            }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 20,
            }}
            className="relative cursor-pointer"
            style={{ width: iconSize, height: iconSize }}
          >
            <motion.div
              animate={{
                opacity: isHovered ? 1 : 0.7,
                scale: isActive ? 0.9 : 1,
              }}
              className="flex h-full w-full items-center justify-center rounded-xl bg-secondary"
            >
              {item.icon}
            </motion.div>
            <AnimatePresence>
              {item.label && isHovered && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-foreground px-2 py-1 text-xs text-background"
                >
                  {item.label}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )
      })}
    </motion.div>
  )
}