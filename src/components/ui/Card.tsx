import { forwardRef, type HTMLAttributes } from 'react'
import { motion } from 'framer-motion'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { getMotionConfig } from '@/lib/motion'

const cardVariants = cva(
  'text-card-foreground transition-colors',
  {
    variants: {
      variant: {
        solid: 'bg-card border border-border rounded-lg',
        glass: 'bg-card/50 backdrop-blur-md border border-border/50 rounded-lg',
        bordered: 'bg-transparent border-2 border-border rounded-lg',
        elevated: 'bg-card border border-border rounded-lg shadow-md',
        floating: 'bg-card border border-border rounded-lg shadow-lg',
        terminal: 'bg-card border border-border rounded-lg font-mono',
        'classic-panel': 'bg-card border border-zinc-400/50 rounded-sm shadow-sm',
        'fluent-card': 'bg-card/80 backdrop-blur-md border border-white/20 rounded-lg shadow-sm',
        'adwaita-surface': 'bg-secondary/50 border border-border rounded-md',
        'ubuntu-panel': 'bg-card border border-primary/20 rounded-lg shadow-sm',
        'aqua-glass': 'bg-gradient-to-b from-white/60 to-white/30 backdrop-blur-md border border-white/30 rounded-xl',
        'material-elevated': 'bg-card border border-transparent rounded-lg shadow-lg',
        'terminal-panel': 'bg-[#1a1a1a] border border-zinc-700 rounded-sm font-mono text-zinc-300',
        'server-panel': 'bg-card border-2 border-border rounded-md',
        'mist-card': 'bg-card/60 backdrop-blur-sm border border-border/30 rounded-lg',
      },
      padding: {
        none: 'p-0',
        sm: 'p-3',
        md: 'p-4',
        lg: 'p-6',
      },
    },
    defaultVariants: {
      variant: 'solid',
      padding: 'md',
    },
  }
)

interface CardProps extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof cardVariants> {
  motionLevel?: string
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant, padding, motionLevel = 'normal', ...props }, ref) => {
    const motionConfig = getMotionConfig(motionLevel as any)
    const cardMotion = motionConfig.cardTransition as any

    return (
      <motion.div
        ref={ref as any}
        className={cn(cardVariants({ variant, padding, className }))}
        whileHover={cardMotion.whileHover}
        transition={cardMotion.transition}
        {...props as any}
      />
    )
  }
)
Card.displayName = 'Card'

const CardHeader = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex flex-col space-y-1.5', className)} {...props} />
  )
)
CardHeader.displayName = 'CardHeader'

const CardTitle = forwardRef<HTMLHeadingElement, HTMLAttributes<HTMLHeadingElement>>(
  ({ className, ...props }, ref) => (
    <h3 ref={ref} className={cn('font-semibold leading-none tracking-tight', className)} {...props} />
  )
)
CardTitle.displayName = 'CardTitle'

const CardDescription = forwardRef<HTMLParagraphElement, HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => (
    <p ref={ref} className={cn('text-sm text-muted-foreground', className)} {...props} />
  )
)
CardDescription.displayName = 'CardDescription'

const CardContent = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('pt-0', className)} {...props} />
  )
)
CardContent.displayName = 'CardContent'

const CardFooter = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex items-center pt-0', className)} {...props} />
  )
)
CardFooter.displayName = 'CardFooter'

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, cardVariants, type CardProps }
