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
