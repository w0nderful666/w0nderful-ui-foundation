import { useState, useEffect, useCallback } from 'react'
import { type BuilderConfig, DEFAULT_CONFIG } from '@/lib/builder'
import { loadBuilderConfig, saveBuilderConfig, resetBuilderConfig } from '@/lib/storage'
import { applyBuilderTheme } from '@/lib/applyTheme'
import { BuilderLayout } from '@/components/builder'
import { ToastProvider } from '@/components/ui/Toast'

export default function App() {
  const [config, setConfig] = useState<BuilderConfig>(() => loadBuilderConfig())

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

  return (
    <ToastProvider motionLevel={config.motionLevel}>
      <BuilderLayout
        config={config}
        onConfigChange={handleConfigChange}
        onReset={handleReset}
      />
    </ToastProvider>
  )
}
