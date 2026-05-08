import { forwardRef, type ButtonHTMLAttributes } from 'react'
import { motion } from 'framer-motion'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { getMotionConfig } from '@/lib/motion'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        solid: 'bg-primary text-primary-foreground hover:bg-primary/90',
        soft: 'bg-primary/10 text-primary hover:bg-primary/20',
        outline: 'border border-border bg-transparent hover:bg-accent hover:text-accent-foreground',
        ghost: 'bg-transparent hover:bg-accent hover:text-accent-foreground',
        gradient: 'bg-gradient-to-r from-primary to-primary/80 text-primary-foreground hover:from-primary/90 hover:to-primary/70',
        glass: 'bg-primary/10 backdrop-blur-sm border border-primary/20 text-primary hover:bg-primary/20',
        neon: 'bg-transparent border border-primary text-primary shadow-[0_0_8px_hsl(var(--primary)/0.3)] hover:shadow-[0_0_16px_hsl(var(--primary)/0.5)] hover:bg-primary/10',
        classic: 'bg-primary text-primary-foreground border border-primary/30 rounded-sm hover:bg-primary/90 shadow-sm',
        fluent: 'bg-primary/90 text-primary-foreground rounded-md border border-primary/20 backdrop-blur-sm hover:bg-primary/80',
        adwaita: 'bg-secondary text-secondary-foreground border border-border rounded-md hover:bg-muted/80 hover:border-primary/30',
        ubuntu: 'bg-primary text-primary-foreground rounded-lg border border-primary/20 hover:bg-primary/90',
        aqua: 'bg-gradient-to-b from-primary/90 to-primary text-primary-foreground rounded-xl border border-white/20 shadow-sm hover:from-primary hover:to-primary/90',
        material: 'bg-primary text-primary-foreground rounded-lg shadow-md hover:shadow-lg active:shadow-sm border border-transparent',
        terminal: 'bg-card text-foreground border border-border rounded-sm font-mono text-xs hover:border-primary/50 hover:bg-muted/50',
        server: 'bg-secondary text-secondary-foreground border-2 border-border rounded-md hover:border-primary/60 hover:bg-muted/70',
      },
      size: {
        sm: 'h-8 px-3 text-sm rounded-sm',
        md: 'h-10 px-4 text-sm rounded-md',
        lg: 'h-12 px-6 text-base rounded-lg',
        icon: 'h-10 w-10 rounded-md',
      },
    },
    defaultVariants: {
      variant: 'solid',
      size: 'md',
    },
  }
)

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  motionLevel?: string
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, motionLevel = 'normal', ...props }, ref) => {
    const motionConfig = getMotionConfig(motionLevel as any)
    const buttonMotion = motionConfig.buttonTransition as any

    return (
      <motion.button
        ref={ref as any}
        className={cn(buttonVariants({ variant, size, className }))}
        whileHover={buttonMotion.whileHover}
        whileTap={buttonMotion.whileTap}
        transition={buttonMotion.transition}
        {...props as any}
      />
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants, type ButtonProps }
