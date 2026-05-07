import { type BackgroundStyle, BACKGROUND_STYLES } from '@/lib/builder'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import { Check } from 'lucide-react'

interface BackgroundPickerProps {
  value: BackgroundStyle
  onChange: (value: BackgroundStyle) => void
}

const BACKGROUND_PREVIEWS: Record<BackgroundStyle, string> = {
  'solid': 'bg-background',
  'soft-gradient': 'bg-gradient-to-br from-background to-muted',
  'radial-glow': 'bg-background [background-image:radial-gradient(circle_at_center,hsl(var(--primary)/0.1)_0%,transparent_70%)]',
  'grid-surface': 'bg-background [background-image:linear-gradient(hsl(var(--border)/0.5)_1px,transparent_1px),linear-gradient(90deg,hsl(var(--border)/0.5)_1px,transparent_1px)] [background-size:20px_20px]',
  'noise-glass': 'bg-background/80 backdrop-blur-sm',
  'aurora': 'bg-gradient-to-br from-primary/10 via-background to-secondary/10',
  'terminal-matrix': 'bg-[#0a0a0f] [background-image:linear-gradient(rgba(0,255,0,0.03)_1px,transparent_1px)] [background-size:10px_10px]',
  'mesh-gradient': 'bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5',
  'frosted-panel': 'bg-background/60 backdrop-blur-xl',
  'starfield': 'bg-[#0a0a0f] [background-image:radial-gradient(white_1px,transparent_1px)] [background-size:50px_50px]',
  'blueprint-grid': 'bg-[#1a1f2e] [background-image:linear-gradient(rgba(100,150,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(100,150,255,0.1)_1px,transparent_1px)] [background-size:24px_24px]',
  'minimal-paper': 'bg-[#fafaf9]',
}

export function BackgroundPicker({ value, onChange }: BackgroundPickerProps) {
  return (
    <div className="grid grid-cols-3 gap-2">
      {BACKGROUND_STYLES.map((bg) => {
        const isSelected = value === bg.value

        return (
          <motion.button
            key={bg.value}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onChange(bg.value)}
            className={cn(
              'relative flex flex-col items-center gap-1 rounded-lg border p-2 transition-colors',
              isSelected
                ? 'border-primary bg-primary/5'
                : 'border-border hover:border-primary/50'
            )}
          >
            <div className={cn(
              'h-8 w-full rounded-md',
              BACKGROUND_PREVIEWS[bg.value]
            )} />
            <span className="text-xs truncate w-full text-center">{bg.label}</span>
            {isSelected && (
              <div className="absolute top-1 right-1">
                <Check className="h-3 w-3 text-primary" />
              </div>
            )}
          </motion.button>
        )
      })}
    </div>
  )
}
