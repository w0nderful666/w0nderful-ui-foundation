import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Switch } from '@/components/ui/Switch'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/Tabs'
import { useTheme } from '@/lib/theme'
import {
  Home, Palette, Code, Sun, Moon,
  Github, Download, BookOpen, Box, Zap
} from 'lucide-react'

const navItems = [
  { id: 'home', icon: Home, label: 'Home' },
  { id: 'docs', icon: BookOpen, label: 'Docs' },
  { id: 'components', icon: Box, label: 'Components' },
  { id: 'motion', icon: Zap, label: 'Motion' },
  { id: 'theme', icon: Palette, label: 'Theme' },
]

const featureCards = [
  { title: '12+ Components', desc: 'Button, Card, Badge, Switch, Tabs, Dialog, Toast and more' },
  { title: 'Theme System', desc: 'Light/Dark mode with CSS variables' },
  { title: 'Motion Presets', desc: 'Framer Motion animations ready to use' },
  { title: 'TypeScript', desc: 'Full type safety included' },
]

const componentList = [
  { name: 'Button', desc: 'cva + forwardRef', status: 'ready' },
  { name: 'Badge', desc: '7 variants', status: 'ready' },
  { name: 'Card', desc: '5 sub-components', status: 'ready' },
  { name: 'Switch', desc: 'Radix UI', status: 'ready' },
  { name: 'Tabs', desc: 'Radix UI', status: 'ready' },
  { name: 'Dialog', desc: 'Radix UI', status: 'ready' },
  { name: 'Toast', desc: 'Radix UI', status: 'ready' },
  { name: 'Toolbar', desc: 'custom', status: 'ready' },
  { name: 'Dock', desc: 'macOS style', status: 'ready' },
  { name: 'Window', desc: 'OS window', status: 'ready' },
  { name: 'useToast', desc: 'hook', status: 'ready' },
  { name: 'Toaster', desc: 'provider', status: 'ready' },
]

const motionPresets = [
  { name: 'fadeIn', duration: '300ms', desc: 'opacity transition' },
  { name: 'fadeInFast', duration: '150ms', desc: 'quick fade' },
  { name: 'fadeInSlow', duration: '500ms', desc: 'slow fade' },
  { name: 'slideUp', duration: '300ms', desc: 'slide + fade' },
  { name: 'slideDown', duration: '300ms', desc: 'slide + fade' },
  { name: 'scaleIn', duration: '150ms', desc: 'scale + fade' },
  { name: 'scaleInCenter', duration: '300ms', desc: 'center scale' },
  { name: 'springIn', duration: 'spring', desc: 'spring physics' },
]

const tokenColors = [
  { name: 'primary', light: '#6366f1', dark: '#6366f1' },
  { name: 'background', light: '#fafafa', dark: '#18181b' },
  { name: 'foreground', light: '#18181b', dark: '#fafafa' },
  { name: 'secondary', light: '#f4f4f5', dark: '#27272a' },
  { name: 'muted', light: '#f4f4f5', dark: '#27272a' },
  { name: 'destructive', light: '#ef4444', dark: '#ef4444' },
  { name: 'border', light: '#e4e4e7', dark: '##3f3f46' },
  { name: 'ring', light: '#6366f1', dark: '#6366f1' },
]

export function HomeShowcase() {
  const { theme, toggleTheme } = useTheme()

  return (
    <div className="min-h-screen bg-background">
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md"
      >
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">W</span>
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight">w0nderful-ui</h1>
              <p className="text-xs text-muted-foreground hidden sm:block">UI Foundation</p>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                className="px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground rounded-md hover:bg-muted transition-colors"
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={toggleTheme}>
              {theme === 'light' ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
            </Button>
            <a href="https://github.com/w0nderful666/w0nderful-ui-foundation" target="_blank">
              <Button variant="ghost" size="icon">
                <Github className="h-4 w-4" />
              </Button>
            </a>
          </div>
        </div>
      </motion.header>

      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="relative py-16 md:py-24 overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="max-w-6xl mx-auto px-4 md:px-6 relative">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-4">
              <Badge variant="secondary">v0.1.0</Badge>
              <Badge variant="outline">Local First</Badge>
              <Badge variant="outline">No Backend</Badge>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              UI Foundation for
              <span className="text-primary"> Local-First</span> Tools
            </h2>
            <p className="text-lg text-muted-foreground mb-6 max-w-xl">
              A minimal, modern UI component library for Web OS / GitHub Pages style tools.
              Built with React, TypeScript, Tailwind & Framer Motion.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button size="lg" className="gap-2">
                <Download className="h-4 w-4" />
                Get Started
              </Button>
              <Button size="lg" variant="outline" className="gap-2">
                <BookOpen className="h-4 w-4" />
                Documentation
              </Button>
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="py-12 border-t border-border bg-muted/30"
      >
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {featureCards.map((card, i) => (
              <Card key={i} className="bg-card/50">
                <CardContent className="pt-4">
                  <h3 className="font-semibold mb-1">{card.title}</h3>
                  <p className="text-sm text-muted-foreground">{card.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="py-12"
      >
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-2xl font-bold">Component Preview</h3>
              <p className="text-muted-foreground">Interactive component showcase</p>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            <Card className="p-4">
              <Tabs defaultValue="button">
                <TabsList className="mb-4">
                  <TabsTrigger value="button">Button</TabsTrigger>
                  <TabsTrigger value="card">Card</TabsTrigger>
                  <TabsTrigger value="form">Form</TabsTrigger>
                  <TabsTrigger value="badges">Badges</TabsTrigger>
                </TabsList>

                <TabsContent value="button">
                  <Card className="p-6">
                    <CardTitle className="mb-4">Button Variants</CardTitle>
                    <div className="space-y-4">
                      <div className="flex flex-wrap gap-2">
                        <Button>Default</Button>
                        <Button variant="outline">Outline</Button>
                        <Button variant="secondary">Secondary</Button>
                        <Button variant="ghost">Ghost</Button>
                        <Button variant="destructive">Delete</Button>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <Button size="sm">Small</Button>
                        <Button size="default">Default</Button>
                        <Button size="lg">Large</Button>
                        <Button size="icon"><Code className="h-4 w-4" /></Button>
                      </div>
                    </div>
                  </Card>
                </TabsContent>

                <TabsContent value="card">
                  <Card className="p-0 overflow-hidden">
                    <CardHeader className="border-b border-border">
                      <CardTitle>Card Title</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-4">
                      <p className="text-sm">Card content goes here.</p>
                    </CardContent>
                    <CardFooter className="border-t border-border">
                      <Button size="sm" variant="ghost">Cancel</Button>
                      <Button size="sm">Confirm</Button>
                    </CardFooter>
                  </Card>
                </TabsContent>

                <TabsContent value="form">
                  <Card className="p-6">
                    <CardTitle className="mb-4">Form Elements</CardTitle>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <label className="text-sm">Email</label>
                        <input
                          type="email"
                          placeholder="you@example.com"
                          className="w-full h-8 px-3 rounded-sm border border-input bg-background text-sm focus-visible:ring-2 focus-visible:ring-ring"
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Dark Mode</span>
                        <Switch />
                      </div>
                      <div className="flex items-center gap-2">
                        <Button>Submit</Button>
                        <Button variant="ghost">Cancel</Button>
                      </div>
                    </div>
                  </Card>
                </TabsContent>

                <TabsContent value="badges">
                  <Card className="p-6">
                    <CardTitle className="mb-4">Badge Variants</CardTitle>
                    <div className="flex flex-wrap gap-2">
                      <Badge>Default</Badge>
                      <Badge variant="secondary">Secondary</Badge>
                      <Badge variant="destructive">Destructive</Badge>
                      <Badge variant="outline">Outline</Badge>
                      <Badge variant="success">Success</Badge>
                      <Badge variant="warning">Warning</Badge>
                      <Badge variant="info">Info</Badge>
                    </div>
                  </Card>
                </TabsContent>
              </Tabs>
            </Card>

            <Card className="p-4">
              <h4 className="font-semibold mb-4">Live Preview</h4>
              <div className="space-y-6">
                <div className="p-4 rounded-lg border border-border bg-card">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2 h-2 rounded-full bg-red-400" />
                    <div className="w-2 h-2 rounded-full bg-yellow-400" />
                    <div className="w-2 h-2 rounded-full bg-green-400" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Window component with title bar and controls.
                  </p>
                  <div className="mt-3 flex gap-2">
                    <Button size="sm" variant="outline">Cancel</Button>
                    <Button size="sm">Confirm</Button>
                  </div>
                </div>

                <div className="relative h-32 rounded-lg border border-border bg-card overflow-hidden">
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                    {navItems.slice(0, 4).map((item) => (
                      <button
                        key={item.id}
                        className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center hover:bg-primary/20 transition-colors"
                      >
                        <item.icon className="h-4 w-4 text-muted-foreground" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="py-12 border-t border-border bg-muted/30"
      >
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <h3 className="text-2xl font-bold mb-2">Components</h3>
          <p className="text-muted-foreground mb-6">Available UI components</p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            {componentList.map((comp) => (
              <Card key={comp.name} className="bg-card/50 hover:bg-card transition-colors">
                <CardContent className="pt-3 flex items-center justify-between">
                  <div>
                    <span className="font-medium text-sm">{comp.name}</span>
                    <p className="text-xs text-muted-foreground">{comp.desc}</p>
                  </div>
                  <Badge variant="secondary" className="text-xs">{comp.status}</Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="py-12"
      >
        <div className="max-w-6xl mx-auto px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-2">Theme Tokens</h3>
              <p className="text-muted-foreground mb-6">Color palette</p>

              <div className="grid grid-cols-2 gap-3">
                {tokenColors.map((token) => (
                  <div key={token.name} className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-md border border-border shadow-sm"
                      style={{ backgroundColor: token.light }}
                    />
                    <div>
                      <p className="text-sm font-medium">{token.name}</p>
                      <p className="text-xs text-muted-foreground">{token.light}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-2">Motion</h3>
              <p className="text-muted-foreground mb-6">Animation presets</p>

              <div className="grid sm:grid-cols-2 gap-3">
                {motionPresets.map((motion) => (
                  <Card key={motion.name} className="bg-card/50">
                    <CardContent className="pt-3">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium text-sm">{motion.name}</span>
                        <Badge variant="outline" className="text-xs">{motion.duration}</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">{motion.desc}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      <footer className="py-8 border-t border-border bg-muted/30">
        <div className="max-w-6xl mx-auto px-4 md:px-6 text-center">
          <p className="text-sm text-muted-foreground">
            w0nderful-ui-foundation v0.1.0 — Local First / No Backend / GitHub Pages Ready
          </p>
          <div className="flex items-center justify-center gap-4 mt-2">
            <a href="#" className="text-xs text-muted-foreground hover:text-foreground">Documentation</a>
            <span className="text-muted-foreground">•</span>
            <a href="https://github.com/w0nderful666/w0nderful-ui-foundation" className="text-xs text-muted-foreground hover:text-foreground">GitHub</a>
            <span className="text-muted-foreground">•</span>
            <a href="#" className="text-xs text-muted-foreground hover:text-foreground">License</a>
          </div>
        </div>
      </footer>
    </div>
  )
}