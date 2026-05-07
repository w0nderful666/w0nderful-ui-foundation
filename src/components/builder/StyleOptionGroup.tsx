import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import { Check } from 'lucide-react'

interface Option {
  value: string
  label: string
}

interface StyleOptionGroupProps {
  options: Option[]
  value: string
  onChange: (value: string) => void
}

export function StyleOptionGroup({ options, value, onChange }: StyleOptionGroupProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => {
        const isSelected = value === option.value

        return (
          <motion.button
            key={option.value}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onChange(option.value)}
            className={cn(
              'inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-sm transition-colors',
              isSelected
                ? 'border-primary bg-primary/10 text-primary font-medium'
                : 'border-border hover:border-primary/50 hover:bg-muted/50'
            )}
          >
            {isSelected && <Check className="h-3 w-3" />}
            {option.label}
          </motion.button>
        )
      })}
    </div>
  )
}
