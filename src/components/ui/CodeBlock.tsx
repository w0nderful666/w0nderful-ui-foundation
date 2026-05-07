import { forwardRef, type HTMLAttributes, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import { copyText } from '@/lib/utils'
import { Check, Copy } from 'lucide-react'

interface CodeBlockProps extends HTMLAttributes<HTMLPreElement> {
  language?: string
  copyable?: boolean
}

const CodeBlock = forwardRef<HTMLPreElement, CodeBlockProps>(
  ({ className, language, copyable = true, children, ...props }, ref) => {
    const [copied, setCopied] = useState(false)

    const handleCopy = useCallback(async () => {
      const text = typeof children === 'string' ? children : ''
      const success = await copyText(text)
      if (success) {
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      }
    }, [children])

    return (
      <div className="relative group">
        {language && (
          <div className="absolute top-2 left-4 text-xs text-muted-foreground font-mono">
            {language}
          </div>
        )}
        {copyable && (
          <button
            onClick={handleCopy}
            className={cn(
              'absolute top-2 right-2 p-1.5 rounded-md bg-muted/80 hover:bg-muted transition-colors opacity-0 group-hover:opacity-100',
              language && 'top-8'
            )}
          >
            <AnimatePresence mode="wait">
              {copied ? (
                <motion.div
                  key="check"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                >
                  <Check className="h-4 w-4 text-success" />
                </motion.div>
              ) : (
                <motion.div
                  key="copy"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                >
                  <Copy className="h-4 w-4 text-muted-foreground" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        )}
        <pre
          ref={ref}
          className={cn(
            'overflow-x-auto rounded-lg border border-border bg-card p-4 font-mono text-sm',
            language && 'pt-8',
            className
          )}
          {...props}
        >
          <code>{children}</code>
        </pre>
      </div>
    )
  }
)
CodeBlock.displayName = 'CodeBlock'

export { CodeBlock, type CodeBlockProps }
