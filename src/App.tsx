import { useState, useEffect, useCallback } from 'react'
import { type BuilderConfig, DEFAULT_CONFIG } from '@/lib/builder'
import { loadBuilderConfig, saveBuilderConfig, resetBuilderConfig } from '@/lib/storage'
import { applyBuilderTheme } from '@/lib/applyTheme'
import { BuilderLayout } from '@/components/builder'
import { HomePage } from '@/components/builder/HomePage'
import { ToastProvider } from '@/components/ui/Toast'

export default function App() {
  const [config, setConfig] = useState<BuilderConfig>(() => loadBuilderConfig())
  const [view, setView] = useState<'home' | 'builder'>('home')

  useEffect(() => {
    applyBuilderTheme(config)
    saveBuilderConfig(config)
  }, [config])

  const handleConfigChange = useCallback(<K extends keyof BuilderConfig>(key: K, value: BuilderConfig[K]) => {
    setConfig((prev) => ({ ...prev, [key]: value }))
  }, [])

  const handleReset = useCallback(() => {
    const newConfig = resetBuilderConfig()
    setConfig(newConfig)
  }, [])

  const handleEnterBuilder = useCallback(() => {
    setView('builder')
  }, [])

  const handleBackToHome = useCallback(() => {
    setView('home')
  }, [])

  return (
    <ToastProvider motionLevel={config.motionLevel}>
      {view === 'home' ? (
        <HomePage
          onEnterBuilder={handleEnterBuilder}
          motionLevel={config.motionLevel}
        />
      ) : (
        <div className="h-screen flex flex-col">
          <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-card/50">
            <button
              onClick={handleBackToHome}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              ← Back to Home
            </button>
            <span className="text-sm font-medium">Builder Mode</span>
            <div className="w-20" />
          </div>
          <div className="flex-1 overflow-hidden">
            <BuilderLayout
              config={config}
              onConfigChange={handleConfigChange}
              onReset={handleReset}
            />
          </div>
        </div>
      )}
    </ToastProvider>
  )
}
