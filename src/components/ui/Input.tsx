import { forwardRef, type InputHTMLAttributes } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const inputVariants = cva(
  'flex w-full px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 transition-colors',
  {
    variants: {
      variant: {
        filled: 'bg-muted border border-transparent rounded-md hover:bg-muted/80 focus-visible:bg-background',
        outline: 'bg-transparent border border-border rounded-md hover:border-primary/50 focus-visible:border-primary',
        minimal: 'bg-transparent border-b border-border rounded-none px-0 hover:border-primary/50 focus-visible:border-primary',
        glass: 'bg-card/50 backdrop-blur-sm border border-border/50 rounded-md hover:border-primary/50 focus-visible:border-primary',
        terminal: 'bg-card border border-border rounded-md font-mono hover:border-primary/50 focus-visible:border-primary',
      },
      inputSize: {
        sm: 'h-8 text-xs',
        md: 'h-10',
        lg: 'h-12 text-base',
      },
    },
    defaultVariants: {
      variant: 'outline',
      inputSize: 'md',
    },
  }
)

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'>, VariantProps<typeof inputVariants> {}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, inputSize, type = 'text', ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(inputVariants({ variant, inputSize, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = 'Input'

export { Input, inputVariants, type InputProps }
