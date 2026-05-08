import { type BackgroundStyle, BACKGROUND_STYLES } from '@/lib/builder'
import { PREVIEW_BACKGROUND_CLASSES } from '@/lib/previewStyles'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import { Check } from 'lucide-react'

interface BackgroundPickerProps {
  value: BackgroundStyle
  onChange: (value: BackgroundStyle) => void
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
              PREVIEW_BACKGROUND_CLASSES[bg.value]
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
