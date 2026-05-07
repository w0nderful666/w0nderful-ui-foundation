import { useState, useEffect } from 'react'

export type Theme = 'light' | 'dark'

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('theme') as Theme
      if (stored) return stored
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    }
    return 'light'
  })

  useEffect(() => {
    const root = document.documentElement
    if (theme === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light')
  }

  return { theme, setTheme, toggleTheme }
}

export const themeTokens = {
  light: {
    background: '#fafafa',
    foreground: '#18181b',
    card: '#ffffff',
    cardForeground: '#18181b',
    popover: '#ffffff',
    popoverForeground: '#18181b',
    primary: '#6366f1',
    primaryForeground: '#ffffff',
    secondary: '#f4f4f5',
    secondaryForeground: '#18181b',
    muted: '#f4f4f5',
    mutedForeground: '#71717a',
    accent: '#f4f4f5',
    accentForeground: '#18181b',
    destructive: '#ef4444',
    destructiveForeground: '#ffffff',
    border: '#e4e4e7',
    input: '#e4e4e7',
    ring: '#6366f1',
  },
  dark: {
    background: '#18181b',
    foreground: '#fafafa',
    card: '#27272a',
    cardForeground: '#fafafa',
    popover: '#27272a',
    popoverForeground: '#fafafa',
    primary: '#6366f1',
    primaryForeground: '#ffffff',
    secondary: '#27272a',
    secondaryForeground: '#fafafa',
    muted: '#27272a',
    mutedForeground: '#a1a1aa',
    accent: '#27272a',
    accentForeground: '#fafafa',
    destructive: '#ef4444',
    destructiveForeground: '#ffffff',
    border: '#3f3f46',
    input: '#3f3f46',
    ring: '#6366f1',
  }
}

export const motionConfig = {
  fast: 150,
  normal: 300,
  slow: 500,
} as const

export const easeOut = [0.22, 1, 0.36, 1]
export const easeIn = [0, 0, 0.58, 1]
export const easeInOut = [0.42, 0, 0.58, 1]