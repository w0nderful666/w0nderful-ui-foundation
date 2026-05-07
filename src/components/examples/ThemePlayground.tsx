import * as React from 'react'
import { useTheme } from '@/lib/theme'
import { Button } from '@/components/ui/Button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Switch } from '@/components/ui/Switch'

export function ThemePlayground() {
  const { theme, toggleTheme } = useTheme()

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-4">Theme Playground</h2>
        <p className="text-muted-foreground mb-6">Test light and dark themes</p>
      </div>

      <div className="flex items-center gap-4">
        <span className="text-sm">Current theme:</span>
        <Badge variant={theme === 'dark' ? 'success' : 'info'}>
          {theme}
        </Badge>
        <Button onClick={toggleTheme} variant="outline" size="sm">
          Toggle Theme
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Light Theme Colors</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <ColorSwatch name="Primary" value="#6366f1" />
              <ColorSwatch name="Accent" value="#8b5cf6" />
              <ColorSwatch name="Background" value="#fafafa" />
              <ColorSwatch name="Card" value="#ffffff" />
              <ColorSwatch name="Border" value="#e4e4e7" />
              <ColorSwatch name="Muted" value="#71717a" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Dark Theme Colors</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <ColorSwatch name="Primary" value="#6366f1" darkValue="#6366f1" />
              <ColorSwatch name="Accent" value="#8b5cf6" darkValue="#8b5cf6" />
              <ColorSwatch name="Background" value="#18181b" />
              <ColorSwatch name="Card" value="#27272a" />
              <ColorSwatch name="Border" value="#3f3f46" />
              <ColorSwatch name="Muted" value="#a1a1aa" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Components in Theme</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <Button>Primary Button</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
            </div>
            <div className="flex items-center gap-4">
              <Switch /> <span className="text-sm">Switch</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

function ColorSwatch({ name, value, darkValue }: { name: string; value: string; darkValue?: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm">{name}</span>
      <div className="flex items-center gap-2">
        <div
          className="h-6 w-6 rounded border"
          style={{ backgroundColor: value }}
        />
        {darkValue && (
          <div
            className="h-6 w-6 rounded border dark:block hidden"
            style={{ backgroundColor: darkValue }}
          />
        )}
      </div>
    </div>
  )
}

function Badge({ variant, children }: { variant: string; children: React.ReactNode }) {
  const colors = {
    success: 'bg-green-500/10 text-green-600 dark:text-green-400',
    info: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
    default: 'bg-primary/10 text-primary',
  }
  return (
    <span className={`inline-flex items-center rounded px-2.5 py-0.5 text-xs font-semibold ${colors[variant as keyof typeof colors] || colors.default}`}>
      {children}
    </span>
  )
}