import { forwardRef, type ButtonHTMLAttributes, useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { getMotionConfig } from '@/lib/motion'

interface SwitchProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onChange'> {
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
  motionLevel?: 'off' | 'subtle' | 'normal' | 'expressive' | 'cinematic'
}

const Switch = forwardRef<HTMLButtonElement, SwitchProps>(
  ({ className, checked, onCheckedChange, motionLevel = 'normal', ...props }, ref) => {
    const [internalChecked, setInternalChecked] = useState(false)
    const isChecked = checked ?? internalChecked
    const motionConfig = getMotionConfig(motionLevel as any)

    const handleClick = useCallback(() => {
      const newValue = !isChecked
      setInternalChecked(newValue)
      onCheckedChange?.(newValue)
    }, [isChecked, onCheckedChange])

    return (
      <button
        ref={ref}
        role="switch"
        aria-checked={isChecked}
        className={cn(
          'peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50',
          isChecked ? 'bg-primary' : 'bg-input',
          className
        )}
        onClick={handleClick}
        {...props}
      >
        <motion.div
          className={cn(
            'pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0'
          )}
          animate={{
            x: isChecked ? 20 : 0,
          }}
          transition={{
            type: 'spring',
            stiffness: motionConfig.spring.strong.stiffness,
            damping: motionConfig.spring.strong.damping,
          }}
        />
      </button>
    )
  }
)
Switch.displayName = 'Switch'

export { Switch, type SwitchProps }
