import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { getMotionConfig } from '@/lib/motion'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card'
import { Input } from '@/components/ui/Input'
import { Switch } from '@/components/ui/Switch'
import { Progress } from '@/components/ui/Progress'
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/Alert'
import { CodeBlock } from '@/components/ui/CodeBlock'
import {
  Zap,
  Palette,
  Layers,
  Sparkles,
  Monitor,
  Moon,
  Sun,
  ChevronRight,
  Github,
  ExternalLink,
  Box,
  Paintbrush,
  Wand2,
  Command,
  Terminal,
  Globe,
  Shield,
  Database,
  Wifi,
  Battery,
  Clock,
  Home,
  FileText,
  BarChart3,
  MessageSquare,
  Settings,
  Users,
  Bell,
  Search,
} from 'lucide-react'

interface HomePageProps {
  onEnterBuilder: () => void
  motionLevel?: string
}

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
}

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

export function HomePage({ onEnterBuilder, motionLevel = 'normal' }: HomePageProps) {
  const motionConfig = getMotionConfig(motionLevel as any)
  const [activeNavItem, setActiveNavItem] = useState('home')

  const scrollToSection = useCallback((id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }, [])

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <motion.header
        className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md"
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: motionConfig.duration.normal }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <Zap className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="font-bold text-lg">w0nderful</span>
              <Badge variant="secondary" className="text-xs">Foundation</Badge>
            </div>
            <nav className="hidden md:flex items-center gap-1">
              {[
                { label: 'Home', id: 'hero' },
                { label: 'Features', id: 'features' },
                { label: 'Components', id: 'components' },
                { label: 'Themes', id: 'themes' },
                { label: 'Motion', id: 'motion' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={cn(
                    'px-3 py-2 text-sm rounded-md transition-colors',
                    activeNavItem === item.id
                      ? 'bg-primary/10 text-primary font-medium'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  )}
                >
                  {item.label}
                </button>
              ))}
            </nav>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={onEnterBuilder}>
                <Paintbrush className="h-4 w-4 mr-1" />
                Open Builder
              </Button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Hero + OS Preview */}
      <section id="hero" className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Content */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: motionConfig.duration.slow }}
            >
              <Badge variant="outline" className="mb-4">
                <Globe className="h-3 w-3 mr-1" />
                Local First · GitHub Pages Ready
              </Badge>
              <h1 className="text-4xl lg:text-5xl font-bold tracking-tight mb-6">
                Web OS UI Foundation
              </h1>
              <p className="text-lg text-muted-foreground mb-8 max-w-lg">
                为 Local First / GitHub Pages / Web OS 风格小工具提供可复用的 UI 基础设施。
                包含主题系统、动画系统、组件库和实时预览。
              </p>
              <div className="flex flex-wrap gap-3 mb-8">
                <Badge variant="secondary">20+ Themes</Badge>
                <Badge variant="secondary">12 Backgrounds</Badge>
                <Badge variant="secondary">5 Motion Levels</Badge>
                <Badge variant="secondary">7 Button Styles</Badge>
              </div>
              <div className="flex gap-3">
                <Button onClick={onEnterBuilder} motionLevel={motionLevel as any}>
                  <Wand2 className="h-4 w-4 mr-2" />
                  Get Started
                </Button>
                <Button variant="outline" onClick={() => scrollToSection('components')} motionLevel={motionLevel as any}>
                  <Layers className="h-4 w-4 mr-2" />
                  View Components
                </Button>
              </div>
            </motion.div>

            {/* Right: OS Preview */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: motionConfig.duration.slow, delay: motionConfig.listStagger }}
              className="relative"
            >
              <div className="rounded-xl border border-border bg-card shadow-2xl overflow-hidden">
                {/* Window Controls */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-muted/50">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1.5">
                      <div className="h-3 w-3 rounded-full bg-destructive/80" />
                      <div className="h-3 w-3 rounded-full bg-warning/80" />
                      <div className="h-3 w-3 rounded-full bg-success/80" />
                    </div>
                    <span className="text-xs text-muted-foreground ml-2">w0nderful-ui-foundation</span>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Command className="h-3 w-3" />
                    <span className="text-xs">⌘K</span>
                  </div>
                </div>

                {/* Preview Content */}
                <div className="p-4 space-y-4">
                  {/* Mini Nav */}
                  <div className="flex items-center gap-3 pb-3 border-b border-border">
                    <div className="h-6 w-6 rounded bg-primary flex items-center justify-center">
                      <Zap className="h-3 w-3 text-primary-foreground" />
                    </div>
                    <div className="flex-1 flex items-center gap-2">
                      <Input variant="outline" placeholder="Search..." className="h-7 text-xs flex-1" />
                    </div>
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="icon" className="h-7 w-7">
                        <Bell className="h-3 w-3" />
                      </Button>
                      <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center text-xs text-primary font-medium">
                        U
                      </div>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { label: 'Users', value: '12.3k', icon: Users },
                      { label: 'Revenue', value: '$45k', icon: BarChart3 },
                      { label: 'Active', value: '1.2k', icon: Zap },
                    ].map((stat) => (
                      <div key={stat.label} className="p-3 rounded-lg border border-border bg-background">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-muted-foreground">{stat.label}</span>
                          <stat.icon className="h-3 w-3 text-muted-foreground" />
                        </div>
                        <div className="text-lg font-bold">{stat.value}</div>
                      </div>
                    ))}
                  </div>

                  {/* Components Preview */}
                  <div className="flex flex-wrap gap-2">
                    <Button variant="solid" size="sm" motionLevel="subtle">Solid</Button>
                    <Button variant="outline" size="sm" motionLevel="subtle">Outline</Button>
                    <Button variant="ghost" size="sm" motionLevel="subtle">Ghost</Button>
                    <Badge>Default</Badge>
                    <Badge variant="success">Success</Badge>
                    <Badge variant="warning">Warning</Badge>
                  </div>

                  {/* Progress */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span>Build Progress</span>
                      <span className="text-muted-foreground">85%</span>
                    </div>
                    <Progress value={85} />
                  </div>
                </div>

                {/* Dock */}
                <div className="flex items-center justify-center gap-2 px-4 py-3 border-t border-border bg-muted/30">
                  {[
                    { icon: Home, label: 'Home' },
                    { icon: FileText, label: 'Docs' },
                    { icon: BarChart3, label: 'Stats' },
                    { icon: MessageSquare, label: 'Chat' },
                    { icon: Settings, label: 'Settings' },
                  ].map((item) => (
                    <button
                      key={item.label}
                      className="h-8 w-8 rounded-lg hover:bg-muted flex items-center justify-center transition-colors"
                      title={item.label}
                    >
                      <item.icon className="h-4 w-4 text-muted-foreground" />
                    </button>
                  ))}
                </div>
              </div>

              {/* Floating Token Inspector */}
              <motion.div
                className="absolute -right-4 top-1/4 w-48 rounded-lg border border-border bg-card shadow-lg p-3 hidden xl:block"
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: motionConfig.listStagger * 3, duration: motionConfig.duration.normal }}
              >
                <div className="text-xs font-medium mb-2">Token Inspector</div>
                <div className="space-y-1.5">
                  {[
                    { name: '--primary', color: 'rgb(99 102 241)' },
                    { name: '--secondary', color: 'rgb(244 244 245)' },
                    { name: '--accent', color: 'rgb(244 244 245)' },
                    { name: '--destructive', color: 'rgb(239 68 68)' },
                  ].map((token) => (
                    <div key={token.name} className="flex items-center gap-2">
                      <div className="h-4 w-4 rounded border border-border" style={{ backgroundColor: token.color }} />
                      <span className="text-xs font-mono text-muted-foreground">{token.name}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Floating Motion Inspector */}
              <motion.div
                className="absolute -left-4 bottom-1/4 w-44 rounded-lg border border-border bg-card shadow-lg p-3 hidden xl:block"
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: motionConfig.listStagger * 4, duration: motionConfig.duration.normal }}
              >
                <div className="text-xs font-medium mb-2">Motion Level</div>
                <div className="flex gap-1">
                  {['off', 'subtle', 'normal', 'expressive', 'cinematic'].map((level) => (
                    <div
                      key={level}
                      className={cn(
                        'h-2 flex-1 rounded-full',
                        level === motionLevel ? 'bg-primary' : 'bg-muted'
                      )}
                    />
                  ))}
                </div>
                <div className="text-xs text-muted-foreground mt-1 capitalize">{motionLevel}</div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            {...fadeUp}
            transition={{ duration: motionConfig.duration.normal }}
          >
            <h2 className="text-3xl font-bold mb-4">Core Features</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              为 Web OS 风格应用设计的完整 UI 基础设施
            </p>
          </motion.div>
          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={stagger}
            initial="initial"
            animate="animate"
          >
            {[
              { icon: Palette, title: '20+ Themes', desc: 'Tokyo Night、Catppuccin、Dracula 等开发者最爱的主题' },
              { icon: Layers, title: '12 Backgrounds', desc: '从极简到炫酷的背景风格，实时切换' },
              { icon: Sparkles, title: 'Motion System', desc: '5 级动画强度，统一管理所有动效' },
              { icon: Monitor, title: 'Live Preview', desc: '左侧实时预览，右侧配置，所见即所得' },
              { icon: Box, title: 'Component Library', desc: 'Button、Card、Input 等基础组件，支持多种变体' },
              { icon: Shield, title: 'Local First', desc: '无后端、无登录、离线可用、GitHub Pages 部署' },
            ].map((feature, i) => (
              <motion.div key={feature.title} variants={fadeUp}>
                <Card variant="bordered" motionLevel={motionLevel as any} className="h-full">
                  <CardHeader>
                    <feature.icon className="h-8 w-8 text-primary mb-2" />
                    <CardTitle>{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{feature.desc}</CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Components Preview */}
      <section id="components" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            {...fadeUp}
            transition={{ duration: motionConfig.duration.normal }}
          >
            <h2 className="text-3xl font-bold mb-4">Components</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              所有组件都支持多种变体，可通过 Builder 实时配置
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-6">
            <Card variant="elevated" motionLevel={motionLevel as any}>
              <CardHeader>
                <CardTitle>Button Variants</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                <Button variant="solid" motionLevel={motionLevel as any}>Solid</Button>
                <Button variant="soft" motionLevel={motionLevel as any}>Soft</Button>
                <Button variant="outline" motionLevel={motionLevel as any}>Outline</Button>
                <Button variant="ghost" motionLevel={motionLevel as any}>Ghost</Button>
                <Button variant="gradient" motionLevel={motionLevel as any}>Gradient</Button>
                <Button variant="glass" motionLevel={motionLevel as any}>Glass</Button>
                <Button variant="neon" motionLevel={motionLevel as any}>Neon</Button>
              </CardContent>
            </Card>
            <Card variant="elevated" motionLevel={motionLevel as any}>
              <CardHeader>
                <CardTitle>Badge Variants</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                <Badge>Default</Badge>
                <Badge variant="secondary">Secondary</Badge>
                <Badge variant="success">Success</Badge>
                <Badge variant="warning">Warning</Badge>
                <Badge variant="info">Info</Badge>
                <Badge variant="destructive">Destructive</Badge>
              </CardContent>
            </Card>
            <Card variant="elevated" motionLevel={motionLevel as any}>
              <CardHeader>
                <CardTitle>Alerts</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Alert variant="default">
                  <AlertTitle>Info</AlertTitle>
                  <AlertDescription>System update available.</AlertDescription>
                </Alert>
                <Alert variant="success">
                  <AlertTitle>Success</AlertTitle>
                  <AlertDescription>Operation completed.</AlertDescription>
                </Alert>
              </CardContent>
            </Card>
            <Card variant="elevated" motionLevel={motionLevel as any}>
              <CardHeader>
                <CardTitle>Code Block</CardTitle>
              </CardHeader>
              <CardContent>
                <CodeBlock language="css" copyable>
{`:root {
  --primary: 99 102 241;
  --background: 255 255 255;
  --radius: 0.5rem;
}`}
                </CodeBlock>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Themes */}
      <section id="themes" className="py-16 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            {...fadeUp}
            transition={{ duration: motionConfig.duration.normal }}
          >
            <h2 className="text-3xl font-bold mb-4">Theme System</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              20 个精心设计的开发者主题，每个都支持 Light / Dark 模式
            </p>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {[
              { name: 'Tokyo Night', color: '#7aa2f7' },
              { name: 'Catppuccin', color: '#cba6f7' },
              { name: 'Dracula', color: '#bd93f9' },
              { name: 'Nord', color: '#88c0d0' },
              { name: 'Gruvbox', color: '#d65d0e' },
              { name: 'Rosé Pine', color: '#eb6f92' },
              { name: 'One Dark', color: '#61afef' },
              { name: 'Solarized', color: '#268bd2' },
              { name: 'Monokai', color: '#f92672' },
              { name: 'GitHub Light', color: '#0969da' },
            ].map((theme) => (
              <motion.div
                key={theme.name}
                className="p-4 rounded-lg border border-border bg-card hover:border-primary/50 transition-colors cursor-pointer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded-full" style={{ backgroundColor: theme.color }} />
                  <span className="text-sm font-medium">{theme.name}</span>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="text-center mt-6">
            <Button variant="outline" onClick={onEnterBuilder} motionLevel={motionLevel as any}>
              <Palette className="h-4 w-4 mr-2" />
              View All Themes
            </Button>
          </div>
        </div>
      </section>

      {/* Motion */}
      <section id="motion" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            {...fadeUp}
            transition={{ duration: motionConfig.duration.normal }}
          >
            <h2 className="text-3xl font-bold mb-4">Motion System</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              5 级动画强度，从 Off 到 Cinematic，统一管理所有动效
            </p>
          </motion.div>
          <div className="grid md:grid-cols-5 gap-4">
            {['off', 'subtle', 'normal', 'expressive', 'cinematic'].map((level, i) => {
              const config = getMotionConfig(level as any)
              return (
                <motion.div
                  key={level}
                  className="p-4 rounded-lg border border-border bg-card text-center"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * config.listStagger, duration: config.duration.normal }}
                >
                  <motion.div
                    className="h-12 w-12 mx-auto mb-3 rounded-lg bg-primary"
                    animate={{ scale: [0.9, 1] }}
                    transition={{ duration: config.duration.slower, repeat: Infinity, repeatType: 'reverse' }}
                  />
                  <span className="text-sm font-medium capitalize">{level}</span>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                  <Zap className="h-5 w-5 text-primary-foreground" />
                </div>
                <span className="font-bold">w0nderful</span>
              </div>
              <p className="text-sm text-muted-foreground">
                为 Web OS 风格小工具提供的 UI 基础设施
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Resources</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <button onClick={() => scrollToSection('features')} className="hover:text-foreground transition-colors">
                    Features
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('components')} className="hover:text-foreground transition-colors">
                    Components
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('themes')} className="hover:text-foreground transition-colors">
                    Themes
                  </button>
                </li>
                <li>
                  <button onClick={() => scrollToSection('motion')} className="hover:text-foreground transition-colors">
                    Motion
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Project</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="https://github.com/w0nderful666/w0nderful-ui-foundation" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors inline-flex items-center gap-1">
                    <Github className="h-3 w-3" />
                    GitHub
                  </a>
                </li>
                <li>
                  <button onClick={onEnterBuilder} className="hover:text-foreground transition-colors">
                    Open Builder
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-3">Constraints</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-1"><Monitor className="h-3 w-3" /> Pure Frontend</li>
                <li className="flex items-center gap-1"><Database className="h-3 w-3" /> No Backend</li>
                <li className="flex items-center gap-1"><Shield className="h-3 w-3" /> Local First</li>
                <li className="flex items-center gap-1"><Globe className="h-3 w-3" /> GitHub Pages</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
            MIT License · Built with React + TypeScript + Tailwind CSS
          </div>
        </div>
      </footer>
    </div>
  )
}
