import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { type BuilderConfig } from '@/lib/builder'
import { getPreviewPanelClass, getPreviewCardClass, getPreviewSurfaceClass, getPreviewContainerClass } from '@/lib/previewSurfaces'
import { cn } from '@/lib/utils'
import {
  LayoutGrid,
  LayoutDashboard,
  Settings,
  FileText,
  Rocket,
  AppWindow,
  FileInput,
  Home,
  BarChart3,
  Users,
  Bell,
  Search,
  Plus,
  ChevronRight,
  Moon,
  Sun,
  Shield,
  Zap,
  Check,
  X,
  Save,
} from 'lucide-react'

export type ShowcaseScene = 'overview' | 'dashboard' | 'settings' | 'article' | 'landing' | 'window' | 'form'

export const SHOWCASE_SCENES: { id: ShowcaseScene; label: string; icon: React.ElementType }[] = [
  { id: 'overview', label: 'Overview', icon: LayoutGrid },
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'settings', label: 'Settings', icon: Settings },
  { id: 'article', label: 'Article', icon: FileText },
  { id: 'landing', label: 'Landing', icon: Rocket },
  { id: 'window', label: 'Window', icon: AppWindow },
  { id: 'form', label: 'Form', icon: FileInput },
]

interface ShowcaseSceneSwitcherProps {
  config: BuilderConfig
}

export function ShowcaseSceneSwitcher({ config }: ShowcaseSceneSwitcherProps) {
  const [activeScene, setActiveScene] = useState<ShowcaseScene>('overview')
  const containerClass = getPreviewContainerClass(config)
  const panelClass = getPreviewPanelClass(config)
  const cardClass = getPreviewCardClass(config)
  const surfaceClass = getPreviewSurfaceClass(config)

  return (
    <div className={cn("flex-1 overflow-hidden flex flex-col", containerClass)}>
      <div className="flex items-center gap-1 px-4 py-2 border-b border-border bg-card/50">
        {SHOWCASE_SCENES.map((scene) => {
          const Icon = scene.icon
          const isActive = activeScene === scene.id
          return (
            <button
              key={scene.id}
              onClick={() => setActiveScene(scene.id)}
              className={cn(
                'flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all',
                isActive
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
              )}
            >
              <Icon className="h-3.5 w-3.5" />
              {scene.label}
            </button>
          )
        })}
      </div>
      <div className="flex-1 overflow-auto p-4 min-h-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeScene}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="min-h-full"
          >
            {activeScene === 'overview' && <OverviewScene config={config} />}
            {activeScene === 'dashboard' && <DashboardScene config={config} />}
            {activeScene === 'settings' && <SettingsScene config={config} />}
            {activeScene === 'article' && <ArticleScene config={config} />}
            {activeScene === 'landing' && <LandingScene config={config} />}
            {activeScene === 'window' && <WindowScene config={config} />}
            {activeScene === 'form' && <FormScene config={config} />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

function OverviewScene({ config }: { config: BuilderConfig }) {
  const cardClass = getPreviewCardClass(config)
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div className={cn(cardClass, "rounded-lg p-4")}>
        <h3 className="text-sm font-semibold text-card-foreground mb-2">Colors</h3>
        <div className="flex gap-2 flex-wrap">
          <div className="w-8 h-8 rounded bg-primary" title="Primary" />
          <div className="w-8 h-8 rounded bg-secondary" title="Secondary" />
          <div className="w-8 h-8 rounded bg-accent" title="Accent" />
          <div className="w-8 h-8 rounded bg-muted" title="Muted" />
          <div className="w-8 h-8 rounded bg-destructive" title="Destructive" />
        </div>
      </div>
      <div className={cn(cardClass, "rounded-lg p-4")}>
        <h3 className="text-sm font-semibold text-card-foreground mb-2">Buttons</h3>
        <div className="flex gap-2 flex-wrap">
          <button className="px-3 py-1.5 rounded bg-primary text-primary-foreground text-xs font-medium">Primary</button>
          <button className="px-3 py-1.5 rounded bg-secondary text-secondary-foreground text-xs font-medium">Secondary</button>
          <button className="px-3 py-1.5 rounded border border-border text-foreground text-xs font-medium">Outline</button>
          <button className="px-3 py-1.5 rounded text-foreground text-xs font-medium hover:bg-muted">Ghost</button>
        </div>
      </div>
      <div className={cn(cardClass, "rounded-lg p-4")}>
        <h3 className="text-sm font-semibold text-card-foreground mb-2">Badges</h3>
        <div className="flex gap-2 flex-wrap">
          <span className="px-2 py-0.5 rounded-full bg-accent text-accent-foreground text-xs">Default</span>
          <span className="px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground text-xs">Secondary</span>
          <span className="px-2 py-0.5 rounded-full bg-green-500/20 text-green-500 text-xs">Success</span>
          <span className="px-2 py-0.5 rounded-full bg-yellow-500/20 text-yellow-500 text-xs">Warning</span>
          <span className="px-2 py-0.5 rounded-full bg-red-500/20 text-red-500 text-xs">Error</span>
        </div>
      </div>
      <div className={cn(cardClass, "rounded-lg p-4 col-span-1 md:col-span-2")}>
        <h3 className="text-sm font-semibold text-card-foreground mb-2">Card</h3>
        <div className={cn(cardClass, "rounded-lg p-4 max-w-sm")}>
          <h4 className="text-base font-semibold text-card-foreground">Card Title</h4>
          <p className="text-sm text-muted-foreground mt-1">This is a sample card component with your theme tokens.</p>
          <button className="mt-3 px-3 py-1.5 rounded bg-primary text-primary-foreground text-xs font-medium">Action</button>
        </div>
      </div>
      <div className={cn(cardClass, "rounded-lg p-4")}>
        <h3 className="text-sm font-semibold text-card-foreground mb-2">Input</h3>
        <input
          type="text"
          placeholder="Enter text..."
          className="w-full px-3 py-2 rounded border border-border bg-background/50 text-foreground text-sm"
        />
      </div>
      <div className={cn(cardClass, "rounded-lg p-4")}>
        <h3 className="text-sm font-semibold text-card-foreground mb-2">Switch</h3>
        <div className="flex items-center gap-2">
          <div className="w-10 h-5 rounded-full bg-primary/20 p-0.5 cursor-pointer">
            <div className="w-4 h-4 rounded-full bg-primary shadow-sm" />
          </div>
          <span className="text-sm text-foreground">Enabled</span>
        </div>
      </div>
      <div className={cn(cardClass, "rounded-lg p-4 col-span-1 md:col-span-2 lg:col-span-3")}>
        <h3 className="text-sm font-semibold text-card-foreground mb-2">Code Block</h3>
        <pre className="bg-zinc-900/80 text-zinc-100 p-3 rounded text-xs overflow-x-auto">
{`function greet(name: string): string {
  return \`Hello, \${name}!\`
}`}
        </pre>
      </div>
    </div>
  )
}

function DashboardScene({ config }: { config: BuilderConfig }) {
  const cardClass = getPreviewCardClass(config)
  const panelClass = getPreviewPanelClass(config)
  return (
    <div className="h-full flex">
      <div className="w-56 border-r border-border bg-card/30 backdrop-blur-sm p-3 flex flex-col gap-1">
        <div className="h-8 flex items-center gap-2 px-2 mb-2">
          <div className="w-6 h-6 rounded bg-primary flex items-center justify-center">
            <span className="text-primary-foreground text-xs font-bold">D</span>
          </div>
          <span className="font-semibold text-foreground text-sm">Dashboard</span>
        </div>
        <button className="flex items-center gap-2 px-3 py-2 rounded bg-primary/10 text-primary text-xs">
          <Home className="h-4 w-4" /> Home
        </button>
        <button className="flex items-center gap-2 px-3 py-2 rounded text-muted-foreground hover:bg-muted/50 text-xs">
          <BarChart3 className="h-4 w-4" /> Analytics
        </button>
        <button className="flex items-center gap-2 px-3 py-2 rounded text-muted-foreground hover:bg-muted/50 text-xs">
          <Users className="h-4 w-4" /> Users
        </button>
        <button className="flex items-center gap-2 px-3 py-2 rounded text-muted-foreground hover:bg-muted/50 text-xs">
          <Bell className="h-4 w-4" /> Notifications
        </button>
      </div>
      <div className="flex-1 p-4 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-foreground">Welcome back</h2>
          <div className="flex items-center gap-2">
            <button className="p-2 rounded hover:bg-muted/50 text-muted-foreground">
              <Search className="h-4 w-4" />
            </button>
            <button className="p-2 rounded hover:bg-muted/50 text-muted-foreground">
              <Bell className="h-4 w-4" />
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className={cn(cardClass, "rounded-lg p-4")}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Total Users</p>
                <p className="text-2xl font-bold text-foreground">12,345</p>
              </div>
              <Users className="h-8 w-8 text-primary/50" />
            </div>
            <p className="text-xs text-green-500 mt-2">+12% from last month</p>
          </div>
          <div className={cn(cardClass, "rounded-lg p-4")}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Revenue</p>
                <p className="text-2xl font-bold text-foreground">$45,678</p>
              </div>
              <Zap className="h-8 w-8 text-secondary/50" />
            </div>
            <p className="text-xs text-green-500 mt-2">+8% from last month</p>
          </div>
          <div className={cn(cardClass, "rounded-lg p-4")}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Active Sessions</p>
                <p className="text-2xl font-bold text-foreground">892</p>
              </div>
              <Shield className="h-8 w-8 text-accent/50" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">Real-time</p>
          </div>
        </div>
        <div className={cn(cardClass, "rounded-lg p-4")}>
          <h3 className="text-sm font-semibold text-card-foreground mb-3">Recent Activity</h3>
          <div className="space-y-2">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-border/50 last:border-0">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-xs text-primary">U{i}</span>
                  </div>
                  <div>
                    <p className="text-sm text-foreground">User {i} performed action</p>
                    <p className="text-xs text-muted-foreground">2 minutes ago</p>
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function SettingsScene({ config }: { config: BuilderConfig }) {
  const cardClass = getPreviewCardClass(config)
  return (
    <div className="max-w-2xl mx-auto space-y-4">
      <h2 className="text-lg font-semibold text-foreground">Settings</h2>
      <div className={cn(cardClass, "rounded-lg overflow-hidden")}>
        <div className="p-3 border-b border-border bg-muted/20">
          <span className="text-xs font-medium text-muted-foreground">General</span>
        </div>
        <div className="divide-y divide-border">
          <div className="flex items-center justify-between p-4">
            <div>
              <p className="text-sm font-medium text-foreground">Dark Mode</p>
              <p className="text-xs text-muted-foreground">Enable dark theme</p>
            </div>
            <div className="w-10 h-5 rounded-full bg-primary p-0.5 cursor-pointer">
              <div className="w-4 h-4 rounded-full bg-primary-foreground shadow-sm" />
            </div>
          </div>
          <div className="flex items-center justify-between p-4">
            <div>
              <p className="text-sm font-medium text-foreground">Email Notifications</p>
              <p className="text-xs text-muted-foreground">Receive email updates</p>
            </div>
            <div className="w-10 h-5 rounded-full bg-muted p-0.5 cursor-pointer">
              <div className="w-4 h-4 rounded-full bg-muted-foreground shadow-sm ml-auto" />
            </div>
          </div>
          <div className="flex items-center justify-between p-4">
            <div>
              <p className="text-sm font-medium text-foreground">Analytics</p>
              <p className="text-xs text-muted-foreground">Help improve the product</p>
            </div>
            <div className="w-10 h-5 rounded-full bg-primary p-0.5 cursor-pointer">
              <div className="w-4 h-4 rounded-full bg-primary-foreground shadow-sm" />
            </div>
          </div>
        </div>
      </div>
      <div className={cn(cardClass, "rounded-lg overflow-hidden")}>
        <div className="p-3 border-b border-border bg-muted/20">
          <span className="text-xs font-medium text-muted-foreground">Privacy</span>
        </div>
        <div className="divide-y divide-border">
          <div className="flex items-center justify-between p-4">
            <div>
              <p className="text-sm font-medium text-foreground">Profile Visibility</p>
              <p className="text-xs text-muted-foreground">Who can see your profile</p>
            </div>
            <button className="px-3 py-1.5 rounded bg-muted/50 text-muted-foreground text-xs">Public</button>
          </div>
          <div className="flex items-center justify-between p-4">
            <div>
              <p className="text-sm font-medium text-foreground">Data Collection</p>
              <p className="text-xs text-muted-foreground">Manage data sharing preferences</p>
            </div>
            <button className="px-3 py-1.5 rounded bg-muted/50 text-muted-foreground text-xs">Limited</button>
          </div>
        </div>
      </div>
      <div className="flex justify-end gap-2">
        <button className="px-4 py-2 rounded border border-border/50 text-foreground text-sm">Cancel</button>
        <button className="px-4 py-2 rounded bg-primary text-primary-foreground text-sm">Save Changes</button>
      </div>
    </div>
  )
}

function ArticleScene({ config }: { config: BuilderConfig }) {
  const cardClass = getPreviewCardClass(config)
  return (
    <div className="max-w-3xl mx-auto">
      <article className={cn(cardClass, "rounded-lg p-6")}>
        <div className="flex gap-2 mb-4">
          <span className="px-2 py-0.5 rounded-full bg-accent text-accent-foreground text-xs">Tutorial</span>
          <span className="px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground text-xs">React</span>
        </div>
        <h1 className="text-2xl font-bold text-card-foreground mb-2">Building Beautiful User Interfaces</h1>
        <p className="text-sm text-muted-foreground mb-4">By John Doe · 5 min read · May 8, 2026</p>
        <p className="text-foreground leading-relaxed mb-4">
          Creating modern user interfaces requires a careful balance between aesthetics and functionality. 
          In this article, we'll explore key principles that make interfaces stand out.
        </p>
        <blockquote className="border-l-4 border-primary pl-4 my-4 italic text-muted-foreground">
          "Design is not just what it looks like and feels like. Design is how it works."
        </blockquote>
        <h2 className="text-lg font-semibold text-card-foreground mt-6 mb-2">Getting Started</h2>
        <p className="text-foreground leading-relaxed mb-4">
          First, you'll need to set up your development environment. Follow these steps to get started.
        </p>
        <pre className="bg-zinc-900/80 text-zinc-100 p-4 rounded text-sm overflow-x-auto mb-4">
{`npm create vite@latest my-app -- --template react-ts
cd my-app
npm install`}
        </pre>
        <div className="bg-muted/30 rounded p-4 flex items-start gap-3">
          <Zap className="h-5 w-5 text-primary mt-0.5" />
          <div>
            <p className="text-sm font-medium text-foreground">Pro Tip</p>
            <p className="text-xs text-muted-foreground mt-1">
              Use TypeScript from the start to catch errors early and improve code quality.
            </p>
          </div>
        </div>
      </article>
    </div>
  )
}

function LandingScene({ config }: { config: BuilderConfig }) {
  const cardClass = getPreviewCardClass(config)
  return (
    <div className="min-h-full">
      <header className="border-b border-border bg-card/30 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold">L</span>
            </div>
            <span className="font-semibold text-foreground">Launch</span>
          </div>
          <nav className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">Features</span>
            <span className="text-sm text-muted-foreground">Pricing</span>
            <span className="text-sm text-muted-foreground">About</span>
            <button className="px-3 py-1.5 rounded bg-primary text-primary-foreground text-xs font-medium">Get Started</button>
          </nav>
        </div>
      </header>
      <main>
        <section className="max-w-6xl mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">Build something amazing</h1>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            The modern platform for teams who want to ship faster and build better products.
          </p>
          <div className="flex items-center justify-center gap-4">
            <button className="px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium">Start Free</button>
            <button className="px-6 py-3 rounded-lg border border-border/50 text-foreground font-medium">View Demo</button>
          </div>
          <div className="flex items-center justify-center gap-8 mt-12">
            <span className="text-sm text-muted-foreground">Trusted by</span>
            <div className="flex gap-4">
              <div className="w-20 h-8 bg-muted/50 rounded flex items-center justify-center text-xs text-muted-foreground">Acme</div>
              <div className="w-20 h-8 bg-muted/50 rounded flex items-center justify-center text-xs text-muted-foreground">Globex</div>
              <div className="w-20 h-8 bg-muted/50 rounded flex items-center justify-center text-xs text-muted-foreground">Soylent</div>
            </div>
          </div>
        </section>
        <section className="max-w-6xl mx-auto px-4 py-12">
          <h2 className="text-2xl font-bold text-foreground text-center mb-8">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className={cn(cardClass, "rounded-lg p-6")}>
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <Zap className="h-5 w-5 text-primary" />
              </div>
              <h3 className="font-semibold text-card-foreground mb-2">Lightning Fast</h3>
              <p className="text-sm text-muted-foreground">Built for speed with optimized performance.</p>
            </div>
            <div className={cn(cardClass, "rounded-lg p-6")}>
              <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center mb-4">
                <Shield className="h-5 w-5 text-secondary" />
              </div>
              <h3 className="font-semibold text-card-foreground mb-2">Secure by Default</h3>
              <p className="text-sm text-muted-foreground">Enterprise-grade security built in.</p>
            </div>
            <div className={cn(cardClass, "rounded-lg p-6")}>
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                <Check className="h-5 w-5 text-accent" />
              </div>
              <h3 className="font-semibold text-card-foreground mb-2">Easy to Use</h3>
              <p className="text-sm text-muted-foreground">Intuitive design that just works.</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

function WindowScene({ config }: { config: BuilderConfig }) {
  const cardClass = getPreviewCardClass(config)
  return (
    <div className="h-full flex items-center justify-center p-8">
      <div className={cn(cardClass, "rounded-lg shadow-xl w-full max-w-2xl overflow-hidden")}>
        <div className="flex items-center gap-2 px-4 py-2 border-b border-border bg-muted/20">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          <div className="flex-1 text-center">
            <span className="text-xs text-muted-foreground">Terminal — zsh</span>
          </div>
        </div>
        <div className="p-4 font-mono text-sm">
          <div className="text-muted-foreground mb-2">
            <span className="text-green-500">➜</span> <span className="text-primary">~</span> npm run dev
          </div>
          <div className="text-foreground mb-1">VITE v5.1.0 ready in 234 ms</div>
          <div className="text-foreground mb-1">➜ Local: http://localhost:5173/</div>
          <div className="text-foreground mb-1">➜ Network: http://192.168.1.5:5173/</div>
          <div className="text-muted-foreground mt-4 mb-2">
            <span className="text-green-500">➜</span> <span className="text-primary">~</span> <span className="animate-pulse">▋</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function FormScene({ config }: { config: BuilderConfig }) {
  const cardClass = getPreviewCardClass(config)
  return (
    <div className="max-w-lg mx-auto">
      <div className={cn(cardClass, "rounded-lg p-6")}>
        <h2 className="text-lg font-semibold text-card-foreground mb-4">Contact Us</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Full Name</label>
            <input
              type="text"
              placeholder="John Doe"
              className="w-full px-3 py-2 rounded border border-border bg-background/50 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Email</label>
            <input
              type="email"
              placeholder="john@example.com"
              className="w-full px-3 py-2 rounded border border-border bg-background/50 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Subject</label>
            <select className="w-full px-3 py-2 rounded border border-border bg-background/50 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50">
              <option>General Inquiry</option>
              <option>Bug Report</option>
              <option>Feature Request</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-1">Message</label>
            <textarea
              rows={4}
              placeholder="Your message..."
              className="w-full px-3 py-2 rounded border border-border bg-background/50 text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
            />
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" id="newsletter" className="rounded border-border" />
            <label htmlFor="newsletter" className="text-sm text-muted-foreground">Subscribe to newsletter</label>
          </div>
          <div>
            <label className="flex items-center gap-2 cursor-pointer">
              <div className="w-10 h-5 rounded-full bg-muted p-0.5 cursor-pointer">
                <div className="w-4 h-4 rounded-full bg-muted-foreground shadow-sm ml-auto" />
              </div>
              <span className="text-sm text-foreground">Enable notifications</span>
            </label>
          </div>
          <div className="pt-2">
            <button type="submit" className="w-full px-4 py-2 rounded bg-primary text-primary-foreground font-medium">Send Message</button>
          </div>
        </form>
      </div>
    </div>
  )
}