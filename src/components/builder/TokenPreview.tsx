import { type BuilderConfig } from '@/lib/builder'
import { getThemeTokens } from '@/lib/themes'
import { CodeBlock } from '@/components/ui/CodeBlock'

interface TokenPreviewProps {
  config: BuilderConfig
}

export function TokenPreview({ config }: TokenPreviewProps) {
  const tokens = getThemeTokens(config.themePreset, config.mode)

  const cssVars = Object.entries(tokens)
    .map(([key, value]) => {
      const cssKey = key.replace(/([A-Z])/g, '-$1').toLowerCase()
      return `  --${cssKey}: ${value};`
    })
    .join('\n')

  return (
    <CodeBlock language="css" copyable className="max-h-48 overflow-y-auto">
      {`:root {\n${cssVars}\n}`}
    </CodeBlock>
  )
}
