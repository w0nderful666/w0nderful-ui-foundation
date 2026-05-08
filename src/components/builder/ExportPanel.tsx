import { useState, useCallback } from 'react'
import { type BuilderConfig } from '@/lib/builder'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { copyText, downloadTextFile } from '@/lib/utils'
import { generateCSSVariables, generateThemeCSS, generateTailwindConfig, generateUIKitJSON, generateReactTokenObject } from '@/lib/export'
import { normalizeBuilderConfig, getConfigHealth, type ConfigHealth } from '@/lib/storage'
import { Check, Copy, Download, Upload, AlertTriangle, FileJson } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface ExportPanelProps {
  config: BuilderConfig
  onConfigReplace: (config: BuilderConfig) => void
}

export function ExportPanel({ config, onConfigReplace }: ExportPanelProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null)
  const [showImport, setShowImport] = useState(false)
  const [importJson, setImportJson] = useState('')
  const [importError, setImportError] = useState<string | null>(null)
  const [importHealth, setImportHealth] = useState<ConfigHealth | null>(null)

  const handleCopy = useCallback(async (id: string, content: string) => {
    const success = await copyText(content)
    if (success) {
      setCopiedId(id)
      setTimeout(() => setCopiedId(null), 2000)
    }
  }, [])

  const handleDownload = useCallback((filename: string, content: string) => {
    downloadTextFile(filename, content)
  }, [])

  const handleFileUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      try {
        const content = event.target?.result as string
        setImportJson(content)
        parseAndPreviewImport(content)
      } catch {
        setImportError('Failed to read file')
      }
    }
    reader.readAsText(file)
  }, [])

  const parseAndPreviewImport = useCallback((jsonStr: string) => {
    setImportError(null)
    setImportHealth(null)

    try {
      const parsed = JSON.parse(jsonStr)
      const health = getConfigHealth(parsed)
      setImportHealth(health)
    } catch (e) {
      setImportError(`Invalid JSON: ${e instanceof Error ? e.message : 'Unknown error'}`)
    }
  }, [])

  const handlePasteImport = useCallback(() => {
    if (!importJson) {
      setImportError('Please paste or upload JSON first')
      return
    }
    parseAndPreviewImport(importJson)
  }, [importJson, parseAndPreviewImport])

  const handleApplyImport = useCallback(() => {
    if (!importHealth) return

    try {
      onConfigReplace(importHealth.normalized)
      setShowImport(false)
      setImportJson('')
      setImportHealth(null)
      setImportError(null)
    } catch (e) {
      setImportError(`Failed to apply: ${e instanceof Error ? e.message : 'Unknown error'}`)
    }
  }, [importHealth, onConfigReplace])

  const handleCancelImport = useCallback(() => {
    setShowImport(false)
    setImportJson('')
    setImportError(null)
    setImportHealth(null)
  }, [])

  const exports = [
    {
      id: 'css-vars',
      label: 'Copy CSS Variables',
      content: generateCSSVariables(config),
      copyOnly: true,
    },
    {
      id: 'theme-css',
      label: 'Download theme.css',
      content: generateThemeCSS(config),
      filename: `${config.themePreset}-theme.css`,
    },
    {
      id: 'tailwind',
      label: 'Copy Tailwind Config',
      content: generateTailwindConfig(config),
      copyOnly: true,
    },
    {
      id: 'json',
      label: 'Download ui-kit.json',
      content: generateUIKitJSON(config),
      filename: 'ui-kit.json',
    },
    {
      id: 'react-token',
      label: 'Copy React Token',
      content: generateReactTokenObject(config),
      copyOnly: true,
    },
  ]

  return (
    <Card variant="glass" padding="sm">
      <CardHeader>
        <CardTitle className="text-sm font-medium">Export / Import</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {exports.map((exp) => {
          const isCopied = copiedId === exp.id

          return (
            <div key={exp.id} className="flex items-center gap-2">
              {exp.copyOnly ? (
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => handleCopy(exp.id, exp.content)}
                >
                  <AnimatePresence mode="wait">
                    {isCopied ? (
                      <motion.span
                        key="check"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="flex items-center gap-2"
                      >
                        <Check className="h-3 w-3 text-success" />
                        Copied
                      </motion.span>
                    ) : (
                      <motion.span
                        key="copy"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="flex items-center gap-2"
                      >
                        <Copy className="h-3 w-3" />
                        {exp.label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </Button>
              ) : (
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => handleDownload(exp.filename!, exp.content)}
                >
                  <Download className="h-3 w-3 mr-2" />
                  {exp.label}
                </Button>
              )}
            </div>
          )
        })}

        <div className="border-t border-border pt-3">
          {!showImport ? (
            <Button
              variant="ghost"
              size="sm"
              className="w-full"
              onClick={() => setShowImport(true)}
            >
              <Upload className="h-3 w-3 mr-2" />
              Import JSON Config
            </Button>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <label className="flex-1 cursor-pointer">
                  <input
                    type="file"
                    accept=".json"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <Button variant="outline" size="sm" className="w-full">
                    <FileJson className="h-3 w-3 mr-2" />
                    Upload .json
                  </Button>
                </label>
              </div>

              <div className="text-xs text-muted-foreground text-center">or</div>

              <textarea
                value={importJson}
                onChange={(e) => setImportJson(e.target.value)}
                placeholder="Paste JSON config here..."
                className="w-full h-24 px-2 py-1.5 text-xs border border-border rounded-md bg-background resize-none focus:outline-none focus:ring-1 focus:ring-primary"
              />

              <Button
                variant="outline"
                size="sm"
                className="w-full"
                onClick={handlePasteImport}
              >
                Preview Import
              </Button>

              {importError && (
                <div className="flex items-center gap-1 text-xs text-red-500">
                  <AlertTriangle className="h-3 w-3" />
                  {importError}
                </div>
              )}

              {importHealth && (
                <div className="text-xs space-y-1 p-2 bg-muted/50 rounded">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Fields:</span>
                    <span className={importHealth.isComplete ? 'text-green-500' : 'text-yellow-500'}>
                      {importHealth.fieldsValid}/{importHealth.fieldsTotal} valid
                    </span>
                  </div>
                  {importHealth.missingFields.length > 0 && (
                    <div className="text-yellow-500">
                      Missing: {importHealth.missingFields.slice(0, 3).join(', ')}
                      {importHealth.missingFields.length > 3 && '...'}
                    </div>
                  )}
                  {importHealth.invalidFields.length > 0 && (
                    <div className="text-yellow-500">
                      Invalid: {importHealth.invalidFields.slice(0, 3).join(', ')}
                      {importHealth.invalidFields.length > 3 && '...'}
                    </div>
                  )}
                </div>
              )}

              <div className="flex gap-2">
                <Button
                  variant="solid"
                  size="sm"
                  className="flex-1"
                  onClick={handleApplyImport}
                  disabled={!importHealth}
                >
                  Apply Import
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleCancelImport}
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}