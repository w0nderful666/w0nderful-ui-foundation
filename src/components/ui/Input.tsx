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
        'classic-box': 'bg-card border border-zinc-400/50 rounded-sm focus:border-primary/70',
        'fluent-search': 'bg-primary/5 border border-transparent rounded-md focus:bg-background/80 focus:border-primary/40 backdrop-blur-sm',
        'adwaita-entry': 'bg-secondary/50 border border-border rounded-md focus:border-primary/40 focus:bg-muted/50',
        'ubuntu-entry': 'bg-card border border-primary/20 rounded-lg focus:border-primary/60',
        'aqua-search': 'bg-gradient-to-b from-white/50 to-white/20 border border-white/30 rounded-xl focus:border-primary/40 backdrop-blur-sm',
        'material-filled': 'bg-primary/10 border border-transparent rounded-lg focus:bg-primary/15 focus:border-primary/30',
        'terminal-prompt': 'bg-[#0c0c0c] text-green-400 border border-zinc-700 rounded-sm font-mono focus:border-primary/50',
        'server-field': 'bg-muted border-2 border-border rounded-md focus:border-primary/60 focus:bg-background/50',
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
