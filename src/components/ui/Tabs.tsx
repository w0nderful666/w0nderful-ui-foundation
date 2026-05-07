import { forwardRef, type HTMLAttributes, useState, useCallback } from 'react'
import { cn } from '@/lib/utils'
import { getMotionConfig } from '@/lib/motion'

interface TabsContextValue {
  activeTab: string
  setActiveTab: (value: string) => void
  motionLevel: string
}

interface TabsProps extends HTMLAttributes<HTMLDivElement> {
  defaultValue?: string
  value?: string
  onValueChange?: (value: string) => void
  motionLevel?: string
}

const Tabs = forwardRef<HTMLDivElement, TabsProps>(
  ({ className, defaultValue, value, onValueChange, motionLevel = 'normal', children, ...props }, ref) => {
    const [internalValue, setInternalValue] = useState(defaultValue || '')
    const activeTab = value ?? internalValue

    const handleTabChange = useCallback((newValue: string) => {
      setInternalValue(newValue)
      onValueChange?.(newValue)
    }, [onValueChange])

    return (
      <div ref={ref} className={cn('w-full', className)} data-active-tab={activeTab} data-motion-level={motionLevel} {...props}>
        {children}
      </div>
    )
  }
)
Tabs.displayName = 'Tabs'

interface TabsListProps extends HTMLAttributes<HTMLDivElement> {}

const TabsList = forwardRef<HTMLDivElement, TabsListProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground',
        className
      )}
      role="tablist"
      {...props}
    />
  )
)
TabsList.displayName = 'TabsList'

interface TabsTriggerProps extends HTMLAttributes<HTMLButtonElement> {
  value: string
}

const TabsTrigger = forwardRef<HTMLButtonElement, TabsTriggerProps>(
  ({ className, value, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        role="tab"
        className={cn(
          'inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm',
          className
        )}
        {...props}
      >
        {children}
      </button>
    )
  }
)
TabsTrigger.displayName = 'TabsTrigger'

interface TabsContentProps extends HTMLAttributes<HTMLDivElement> {
  value: string
}

const TabsContent = forwardRef<HTMLDivElement, TabsContentProps>(
  ({ className, value, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        role="tabpanel"
        className={cn('mt-2 ring-offset-background focus-visible:outline-none', className)}
        data-tab-value={value}
        {...props}
      >
        {children}
      </div>
    )
  }
)
TabsContent.displayName = 'TabsContent'

export { Tabs, TabsList, TabsTrigger, TabsContent, type TabsProps }
