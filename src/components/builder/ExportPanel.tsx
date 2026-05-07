import { useState, useCallback } from 'react'
import { type BuilderConfig } from '@/lib/builder'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { copyText, downloadTextFile } from '@/lib/utils'
import { generateCSSVariables, generateThemeCSS, generateTailwindConfig, generateUIKitJSON, generateReactTokenObject } from '@/lib/export'
import { Check, Copy, Download } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface ExportPanelProps {
  config: BuilderConfig
}

export function ExportPanel({ config }: ExportPanelProps) {
  const [copiedId, setCopiedId] = useState<string | null>(null)

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
        <CardTitle className="text-sm font-medium">Export</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
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
      </CardContent>
    </Card>
  )
}
