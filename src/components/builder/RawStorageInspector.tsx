import { useState, useCallback } from 'react'
import { getConfigHealth, normalizeBuilderConfig, saveBuilderConfig, resetBuilderConfig, BUILDER_CONFIG_VERSION } from '@/lib/storage'
import { Button } from '@/components/ui/Button'
import { AlertTriangle, CheckCircle2, RefreshCw, Trash2, Copy } from 'lucide-react'
import { copyText } from '@/lib/utils'

const STORAGE_KEY = 'ui-kit-builder-config'

export function RawStorageInspector() {
  const [status, setStatus] = useState<'checking' | 'exists' | 'missing'>('checking')
  const [rawData, setRawData] = useState<string | null>(null)
  const [version, setVersion] = useState<number | null>(null)
  const [health, setHealth] = useState<ReturnType<typeof getConfigHealth> | null>(null)
  const [copied, setCopied] = useState(false)
  const [actionStatus, setActionStatus] = useState<string | null>(null)

  const loadRawStorage = useCallback(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (!stored) {
        setStatus('missing')
        setRawData(null)
        setVersion(null)
        setHealth(null)
        return
      }

      setStatus('exists')
      setRawData(stored)

      const parsed = JSON.parse(stored)
      if (parsed.version !== undefined) {
        setVersion(parsed.version)
        setHealth(getConfigHealth(parsed.config))
      } else {
        setVersion(null)
        setHealth(getConfigHealth(parsed))
      }
    } catch {
      setStatus('missing')
      setRawData(null)
      setVersion(null)
      setHealth(null)
    }
  }, [])

  const handleNormalize = useCallback(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (!stored) {
        setActionStatus('No storage to normalize')
        return
      }

      const parsed = JSON.parse(stored)
      const config = parsed.version !== undefined ? parsed.config : parsed
      const normalized = normalizeBuilderConfig(config)
      saveBuilderConfig(normalized)
      
      setActionStatus('Storage normalized successfully')
      loadRawStorage()
      
      setTimeout(() => setActionStatus(null), 3000)
    } catch (e) {
      setActionStatus(`Error: ${e instanceof Error ? e.message : 'Unknown error'}`)
    }
  }, [loadRawStorage])

  const handleClear = useCallback(() => {
    try {
      resetBuilderConfig()
      setActionStatus('Storage cleared and reset')
      loadRawStorage()
      
      setTimeout(() => setActionStatus(null), 3000)
    } catch (e) {
      setActionStatus(`Error: ${e instanceof Error ? e.message : 'Unknown error'}`)
    }
  }, [loadRawStorage])

  const handleCopy = useCallback(async () => {
    if (!rawData) return
    const success = await copyText(rawData)
    if (success) {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }, [rawData])

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Button variant="outline" size="sm" onClick={loadRawStorage}>
          <RefreshCw className="h-3 w-3 mr-1" />
          Refresh
        </Button>
        {status === 'exists' && (
          <Button variant="outline" size="sm" onClick={handleCopy}>
            <Copy className="h-3 w-3 mr-1" />
            {copied ? 'Copied' : 'Copy Raw'}
          </Button>
        )}
      </div>

      {status === 'checking' && (
        <div className="text-xs text-muted-foreground">Checking storage...</div>
      )}

      {status === 'missing' && (
        <div className="text-xs text-yellow-500 flex items-center gap-1">
          <AlertTriangle className="h-3 w-3" />
          No config stored in localStorage
        </div>
      )}

      {status === 'exists' && (
        <>
          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1">
              <span className="text-muted-foreground">Storage:</span>
              <span className="text-green-500 flex items-center gap-1">
                <CheckCircle2 className="h-3 w-3" />
                Exists
              </span>
            </div>
            {version !== null && (
              <div className="flex items-center gap-1">
                <span className="text-muted-foreground">Schema:</span>
                <span className="font-mono">v{version}</span>
              </div>
            )}
            {version !== BUILDER_CONFIG_VERSION && (
              <div className="text-yellow-500 flex items-center gap-1">
                <AlertTriangle className="h-3 w-3" />
                Outdated
              </div>
            )}
          </div>

          {health && (
            <div className="text-xs space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Fields:</span>
                <span className={health.isComplete ? 'text-green-500' : 'text-yellow-500'}>
                  {health.fieldsValid}/{health.fieldsTotal} valid
                </span>
              </div>
              {health.missingFields.length > 0 && (
                <div className="text-yellow-500">
                  Missing: {health.missingFields.join(', ')}
                </div>
              )}
              {health.invalidFields.length > 0 && (
                <div className="text-yellow-500">
                  Invalid: {health.invalidFields.join(', ')}
                </div>
              )}
              {health.unknownFields.length > 0 && (
                <div className="text-yellow-500">
                  Unknown: {health.unknownFields.join(', ')}
                </div>
              )}
            </div>
          )}

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleNormalize} className="flex-1">
              <RefreshCw className="h-3 w-3 mr-1" />
              Normalize Storage
            </Button>
            <Button variant="neon" size="sm" onClick={handleClear} className="flex-1">
              <Trash2 className="h-3 w-3 mr-1" />
              Clear & Reset
            </Button>
          </div>

          {actionStatus && (
            <div className={`text-xs ${actionStatus.includes('Error') ? 'text-red-500' : 'text-green-500'}`}>
              {actionStatus}
            </div>
          )}
        </>
      )}
    </div>
  )
}