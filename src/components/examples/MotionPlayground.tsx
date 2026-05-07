import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import {
  fadeIn, fadeInFast, fadeInSlow,
  slideUp, slideDown, slideLeft, slideRight,
  scaleIn, scaleInCenter, springIn,
  staggerContainer, staggerItem
} from '@/lib/motion'

const animations = {
  fadeIn,
  fadeInFast,
  fadeInSlow,
  slideUp,
  slideDown,
  slideLeft,
  slideRight,
  scaleIn,
  scaleInCenter,
  springIn,
}

const items = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5']

type AnimationKey = keyof typeof animations

export function MotionPlayground() {
  const [activeAnim, setActiveAnim] = React.useState<AnimationKey>('fadeIn')
  const [isVisible, setIsVisible] = React.useState(true)
  const [showStagger, setShowStagger] = React.useState(true)

  const currentAnim = animations[activeAnim] || fadeIn

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold mb-4">Motion Playground</h2>
        <p className="text-muted-foreground mb-6">Test animations and transitions</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Select Animation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {(Object.keys(animations) as AnimationKey[]).map(name => (
              <Button
                key={name}
                variant={activeAnim === name ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveAnim(name)}
              >
                {name}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Preview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <Button onClick={() => setIsVisible(!isVisible)}>
              {isVisible ? 'Hide' : 'Show'}
            </Button>
            <span className="text-sm text-muted-foreground">
              Current: {activeAnim}
            </span>
          </div>

          <div className="mt-6 flex justify-center">
            <AnimatePresence mode="wait">
              {isVisible && (
                <motion.div
                  key={activeAnim}
                  initial={currentAnim.initial}
                  animate={currentAnim.animate}
                  exit={currentAnim.exit}
                  transition={currentAnim.transition}
                  className="h-20 w-20 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-medium"
                >
                  Box
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Stagger Animation</CardTitle>
        </CardHeader>
        <CardContent>
          <Button onClick={() => setShowStagger(!showStagger)} className="mb-4">
            {showStagger ? 'Hide' : 'Show'}
          </Button>

          <AnimatePresence>
            {showStagger && (
              <motion.div
                variants={staggerContainer}
                initial="initial"
                animate="animate"
                className="grid grid-cols-5 gap-2"
              >
                {items.map(item => (
                  <motion.div
                    key={item}
                    variants={staggerItem}
                    className="h-12 rounded bg-primary/20 flex items-center justify-center text-xs"
                  >
                    {item}
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Interactive Animations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-8">
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="h-16 w-16 rounded-lg bg-primary"
            />
            <motion.div
              initial={{ rotate: 0 }}
              whileHover={{ rotate: 45 }}
              className="h-16 w-16 rounded-lg bg-secondary"
            />
            <motion.div
              whileHover={{ x: 10 }}
              className="h-16 w-16 rounded-lg bg-accent"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}