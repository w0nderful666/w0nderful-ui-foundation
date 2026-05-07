import { type ThemePreset, THEME_PRESETS } from '@/lib/builder'
import { getThemePreviewColor } from '@/lib/themes'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import { Check } from 'lucide-react'

interface ThemePickerProps {
  value: ThemePreset
  onChange: (value: ThemePreset) => void
}

export function ThemePicker({ value, onChange }: ThemePickerProps) {
  return (
    <div className="grid grid-cols-2 gap-2">
      {THEME_PRESETS.map((theme) => {
        const previewColor = getThemePreviewColor(theme.value)
        const isSelected = value === theme.value

        return (
          <motion.button
            key={theme.value}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onChange(theme.value)}
            className={cn(
              'relative flex items-center gap-2 rounded-lg border px-3 py-2 text-left text-sm transition-colors',
              isSelected
                ? 'border-primary bg-primary/5'
                : 'border-border hover:border-primary/50 hover:bg-muted/50'
            )}
          >
            <div
              className="h-4 w-4 rounded-full shrink-0"
              style={{ backgroundColor: `hsl(${previewColor})` }}
            />
            <span className="truncate">{theme.label}</span>
            {isSelected && (
              <Check className="h-3 w-3 ml-auto text-primary shrink-0" />
            )}
          </motion.button>
        )
      })}
    </div>
  )
}
