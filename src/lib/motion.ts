import { type MotionLevel } from './builder'

export interface MotionConfig {
  duration: {
    instant: number
    fast: number
    normal: number
    slow: number
    slower: number
  }
  easing: {
    default: string
    in: string
    out: string
    inOut: string
    spring: string
  }
  spring: {
    gentle: { stiffness: number; damping: number }
    medium: { stiffness: number; damping: number }
    strong: { stiffness: number; damping: number }
  }
  pageTransition: object
  panelTransition: object
  cardTransition: object
  buttonTransition: object
  dialogTransition: object
  dockTransition: object
  listStagger: number
  hoverMotion: object
  tapMotion: object
}

const LEVEL_CONFIGS: Record<MotionLevel, MotionConfig> = {
  off: {
    duration: {
      instant: 0,
      fast: 0,
      normal: 0,
      slow: 0,
      slower: 0,
    },
    easing: {
      default: 'ease-out',
      in: 'ease-in',
      out: 'ease-out',
      inOut: 'ease-in-out',
      spring: 'ease-out',
    },
    spring: {
      gentle: { stiffness: 100, damping: 10 },
      medium: { stiffness: 120, damping: 14 },
      strong: { stiffness: 150, damping: 18 },
    },
    pageTransition: { duration: 0 },
    panelTransition: { duration: 0 },
    cardTransition: { duration: 0 },
    buttonTransition: { duration: 0 },
    dialogTransition: { duration: 0 },
    dockTransition: { duration: 0 },
    listStagger: 0,
    hoverMotion: { scale: 1 },
    tapMotion: { scale: 1 },
  },
  subtle: {
    duration: {
      instant: 0.05,
      fast: 0.1,
      normal: 0.15,
      slow: 0.2,
      slower: 0.3,
    },
    easing: {
      default: 'ease-out',
      in: 'ease-in',
      out: 'ease-out',
      inOut: 'ease-in-out',
      spring: 'ease-out',
    },
    spring: {
      gentle: { stiffness: 120, damping: 14 },
      medium: { stiffness: 150, damping: 18 },
      strong: { stiffness: 200, damping: 22 },
    },
    pageTransition: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      transition: { duration: 0.15 },
    },
    panelTransition: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      transition: { duration: 0.15 },
    },
    cardTransition: {
      whileHover: { y: -1 },
      transition: { duration: 0.15 },
    },
    buttonTransition: {
      whileHover: { opacity: 0.9 },
      whileTap: { scale: 0.98 },
      transition: { duration: 0.1 },
    },
    dialogTransition: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      transition: { duration: 0.15 },
    },
    dockTransition: {
      whileHover: { y: -1 },
      transition: { duration: 0.15 },
    },
    listStagger: 0.03,
    hoverMotion: { y: -1 },
    tapMotion: { scale: 0.98 },
  },
  normal: {
    duration: {
      instant: 0.08,
      fast: 0.15,
      normal: 0.2,
      slow: 0.3,
      slower: 0.4,
    },
    easing: {
      default: 'cubic-bezier(0.4, 0, 0.2, 1)',
      in: 'cubic-bezier(0.4, 0, 1, 1)',
      out: 'cubic-bezier(0, 0, 0.2, 1)',
      inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      spring: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    },
    spring: {
      gentle: { stiffness: 150, damping: 18 },
      medium: { stiffness: 200, damping: 22 },
      strong: { stiffness: 300, damping: 28 },
    },
    pageTransition: {
      initial: { opacity: 0, y: 8 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -8 },
      transition: { duration: 0.2, ease: [0.4, 0, 0.2, 1] },
    },
    panelTransition: {
      initial: { opacity: 0, x: 16 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: 16 },
      transition: { duration: 0.2, ease: [0.4, 0, 0.2, 1] },
    },
    cardTransition: {
      whileHover: { y: -2, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' },
      transition: { duration: 0.2 },
    },
    buttonTransition: {
      whileHover: { scale: 1.02 },
      whileTap: { scale: 0.97 },
      transition: { duration: 0.15 },
    },
    dialogTransition: {
      initial: { opacity: 0, scale: 0.95 },
      animate: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 0.95 },
      transition: { duration: 0.2, ease: [0.4, 0, 0.2, 1] },
    },
    dockTransition: {
      whileHover: { y: -2 },
      transition: { duration: 0.2 },
    },
    listStagger: 0.05,
    hoverMotion: { y: -2 },
    tapMotion: { scale: 0.97 },
  },
  expressive: {
    duration: {
      instant: 0.1,
      fast: 0.2,
      normal: 0.3,
      slow: 0.45,
      slower: 0.6,
    },
    easing: {
      default: 'cubic-bezier(0.4, 0, 0.2, 1)',
      in: 'cubic-bezier(0.4, 0, 1, 1)',
      out: 'cubic-bezier(0, 0, 0.2, 1)',
      inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      spring: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    },
    spring: {
      gentle: { stiffness: 120, damping: 14 },
      medium: { stiffness: 180, damping: 18 },
      strong: { stiffness: 250, damping: 22 },
    },
    pageTransition: {
      initial: { opacity: 0, y: 16 },
      animate: { opacity: 1, y: 0 },
      exit: { opacity: 0, y: -16 },
      transition: { type: 'spring', stiffness: 150, damping: 20 },
    },
    panelTransition: {
      initial: { opacity: 0, x: 24 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: 24 },
      transition: { type: 'spring', stiffness: 150, damping: 20 },
    },
    cardTransition: {
      whileHover: { y: -4, boxShadow: '0 8px 24px rgba(0,0,0,0.12)' },
      transition: { type: 'spring', stiffness: 200, damping: 20 },
    },
    buttonTransition: {
      whileHover: { scale: 1.04 },
      whileTap: { scale: 0.95 },
      transition: { type: 'spring', stiffness: 300, damping: 20 },
    },
    dialogTransition: {
      initial: { opacity: 0, scale: 0.9 },
      animate: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 0.9 },
      transition: { type: 'spring', stiffness: 200, damping: 22 },
    },
    dockTransition: {
      whileHover: { y: -4 },
      transition: { type: 'spring', stiffness: 200, damping: 20 },
    },
    listStagger: 0.08,
    hoverMotion: { y: -4 },
    tapMotion: { scale: 0.95 },
  },
  cinematic: {
    duration: {
      instant: 0.15,
      fast: 0.25,
      normal: 0.4,
      slow: 0.6,
      slower: 0.8,
    },
    easing: {
      default: 'cubic-bezier(0.4, 0, 0.2, 1)',
      in: 'cubic-bezier(0.4, 0, 1, 1)',
      out: 'cubic-bezier(0, 0, 0.2, 1)',
      inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
      spring: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    },
    spring: {
      gentle: { stiffness: 100, damping: 12 },
      medium: { stiffness: 150, damping: 16 },
      strong: { stiffness: 200, damping: 20 },
    },
    pageTransition: {
      initial: { opacity: 0, y: 24, filter: 'blur(4px)' },
      animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
      exit: { opacity: 0, y: -24, filter: 'blur(4px)' },
      transition: { type: 'spring', stiffness: 120, damping: 18 },
    },
    panelTransition: {
      initial: { opacity: 0, x: 32, filter: 'blur(4px)' },
      animate: { opacity: 1, x: 0, filter: 'blur(0px)' },
      exit: { opacity: 0, x: 32, filter: 'blur(4px)' },
      transition: { type: 'spring', stiffness: 120, damping: 18 },
    },
    cardTransition: {
      whileHover: { y: -6, boxShadow: '0 12px 32px rgba(0,0,0,0.15)', filter: 'blur(0px)' },
      transition: { type: 'spring', stiffness: 150, damping: 18 },
    },
    buttonTransition: {
      whileHover: { scale: 1.06, boxShadow: '0 4px 16px rgba(0,0,0,0.15)' },
      whileTap: { scale: 0.92 },
      transition: { type: 'spring', stiffness: 250, damping: 18 },
    },
    dialogTransition: {
      initial: { opacity: 0, scale: 0.85, filter: 'blur(8px)' },
      animate: { opacity: 1, scale: 1, filter: 'blur(0px)' },
      exit: { opacity: 0, scale: 0.85, filter: 'blur(8px)' },
      transition: { type: 'spring', stiffness: 150, damping: 20 },
    },
    dockTransition: {
      whileHover: { y: -6, boxShadow: '0 8px 24px rgba(0,0,0,0.12)' },
      transition: { type: 'spring', stiffness: 150, damping: 18 },
    },
    listStagger: 0.12,
    hoverMotion: { y: -6 },
    tapMotion: { scale: 0.92 },
  },
  elastic: {
    duration: {
      instant: 0,
      fast: 0.1,
      normal: 0.3,
      slow: 0.5,
      slower: 0.8,
    },
    easing: {
      default: 'ease-out',
      in: 'ease-in',
      out: 'ease-out',
      inOut: 'ease-in-out',
      spring: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    },
    spring: {
      gentle: { stiffness: 100, damping: 10 },
      medium: { stiffness: 180, damping: 12 },
      strong: { stiffness: 250, damping: 15 },
    },
    pageTransition: {
      initial: { opacity: 0, scale: 0.95 },
      animate: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 0.95 },
      transition: { duration: 0.4, ease: [0.68, -0.55, 0.265, 1.55] },
    },
    panelTransition: {
      initial: { opacity: 0, x: 20, scale: 0.95 },
      animate: { opacity: 1, x: 0, scale: 1 },
      exit: { opacity: 0, x: 20, scale: 0.95 },
      transition: { duration: 0.4, ease: [0.68, -0.55, 0.265, 1.55] },
    },
    cardTransition: {
      whileHover: { scale: 1.05, y: -4 },
      transition: { duration: 0.3, ease: [0.68, -0.55, 0.265, 1.55] },
    },
    buttonTransition: {
      whileHover: { scale: 1.08 },
      whileTap: { scale: 0.95 },
      transition: { duration: 0.2 },
    },
    dialogTransition: {
      initial: { opacity: 0, scale: 0.8 },
      animate: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 0.8 },
      transition: { duration: 0.5, ease: [0.68, -0.55, 0.265, 1.55] },
    },
    dockTransition: {
      whileHover: { scale: 1.1, y: -4 },
      transition: { duration: 0.3 },
    },
    listStagger: 0.08,
    hoverMotion: { scale: 1.05 },
    tapMotion: { scale: 0.95 },
  },
  snappy: {
    duration: {
      instant: 0,
      fast: 0.05,
      normal: 0.1,
      slow: 0.15,
      slower: 0.2,
    },
    easing: {
      default: 'ease-out',
      in: 'ease-in',
      out: 'ease-out',
      inOut: 'ease-in-out',
      spring: 'ease-out',
    },
    spring: {
      gentle: { stiffness: 200, damping: 20 },
      medium: { stiffness: 300, damping: 25 },
      strong: { stiffness: 400, damping: 30 },
    },
    pageTransition: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      transition: { duration: 0.1 },
    },
    panelTransition: {
      initial: { opacity: 0, x: 8 },
      animate: { opacity: 1, x: 0 },
      exit: { opacity: 0, x: -8 },
      transition: { duration: 0.1 },
    },
    cardTransition: {
      whileHover: { y: -2 },
      transition: { duration: 0.1 },
    },
    buttonTransition: {
      whileHover: { scale: 1.02 },
      whileTap: { scale: 0.98 },
      transition: { duration: 0.05 },
    },
    dialogTransition: {
      initial: { opacity: 0, scale: 0.98 },
      animate: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 0.98 },
      transition: { duration: 0.1 },
    },
    dockTransition: {
      whileHover: { y: -2 },
      transition: { duration: 0.1 },
    },
    listStagger: 0.02,
    hoverMotion: { y: -2 },
    tapMotion: { scale: 0.98 },
  },
}

export function getMotionConfig(level: MotionLevel): MotionConfig {
  return LEVEL_CONFIGS[level]
}

export function getMotionCSSVariables(level: MotionLevel): Record<string, string> {
  const config = LEVEL_CONFIGS[level]
  return {
    '--motion-duration-instant': `${config.duration.instant}s`,
    '--motion-duration-fast': `${config.duration.fast}s`,
    '--motion-duration-normal': `${config.duration.normal}s`,
    '--motion-duration-slow': `${config.duration.slow}s`,
    '--motion-duration-slower': `${config.duration.slower}s`,
    '--motion-easing-default': config.easing.default,
    '--motion-easing-in': config.easing.in,
    '--motion-easing-out': config.easing.out,
    '--motion-easing-in-out': config.easing.inOut,
    '--motion-easing-spring': config.easing.spring,
    '--motion-list-stagger': `${config.listStagger}s`,
  }
}
