import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { cn } from '@/lib/utils'

interface ThreeAmbientLayerProps {
  className?: string
  intensity?: 'off' | 'ambient' | 'interactive'
}

export function ThreeAmbientLayer({ className, intensity = 'ambient' }: ThreeAmbientLayerProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
  const particlesRef = useRef<THREE.Points | null>(null)
  const animationIdRef = useRef<number>(0)
  const mouseRef = useRef({ x: 0, y: 0 })
  const isMountedRef = useRef(true)

  useEffect(() => {
    if (intensity === 'off') return
    
    const container = containerRef.current
    if (!container) return

    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isMobile = window.innerWidth < 768
    
    if (isReducedMotion || isMobile) return

    const scene = new THREE.Scene()
    sceneRef.current = scene

    const camera = new THREE.PerspectiveCamera(60, container.clientWidth / container.clientHeight, 0.1, 1000)
    camera.position.z = 8
    cameraRef.current = camera

    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true,
      powerPreference: 'high-performance'
    })
    renderer.setSize(container.clientWidth, container.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)
    container.appendChild(renderer.domElement)
    rendererRef.current = renderer

    const particleCount = isMobile ? 80 : 150
    const geometry = new THREE.BufferGeometry()
    const positions = new Float32Array(particleCount * 3)
    const colors = new Float32Array(particleCount * 3)

    const colorPalette = [
      new THREE.Color(0x4285F4),
      new THREE.Color(0x34A853),
      new THREE.Color(0xFBBC05),
      new THREE.Color(0xEA4335),
      new THREE.Color(0x9ca3af),
    ]

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 12
      positions[i * 3 + 1] = (Math.random() - 0.5) * 8
      positions[i * 3 + 2] = (Math.random() - 0.5) * 4

      const color = colorPalette[Math.floor(Math.random() * colorPalette.length)]
      colors[i * 3] = color.r
      colors[i * 3 + 1] = color.g
      colors[i * 3 + 2] = color.b
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

    const material = new THREE.PointsMaterial({
      size: 0.08,
      vertexColors: true,
      transparent: true,
      opacity: 0.35,
      sizeAttenuation: true,
    })

    const particles = new THREE.Points(geometry, material)
    scene.add(particles)
    particlesRef.current = particles

    const handleResize = () => {
      if (!container || !camera || !renderer) return
      camera.aspect = container.clientWidth / container.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(container.clientWidth, container.clientHeight)
    }

    const handleMouseMove = (event: MouseEvent) => {
      mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1
      mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1
    }

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        if (animationIdRef.current) {
          cancelAnimationFrame(animationIdRef.current)
          animationIdRef.current = 0
        }
      } else if (document.visibilityState === 'visible' && isMountedRef.current) {
        animate()
      }
    }

    window.addEventListener('resize', handleResize)
    window.addEventListener('pointermove', handleMouseMove)
    document.addEventListener('visibilitychange', handleVisibilityChange)

    let time = 0
    const animate = () => {
      if (!isMountedRef.current) return
      
      if (document.visibilityState === 'hidden') return

      time += 0.002

      if (particles) {
        particles.rotation.y = time * 0.3
        particles.rotation.x = Math.sin(time * 0.2) * 0.1

        if (intensity === 'interactive') {
          particles.position.x = mouseRef.current.x * 0.3
          particles.position.y = mouseRef.current.y * 0.2
        }
      }

      renderer.render(scene, camera)
      animationIdRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      isMountedRef.current = false
      
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current)
        animationIdRef.current = 0
      }

      window.removeEventListener('resize', handleResize)
      window.removeEventListener('pointermove', handleMouseMove)
      document.removeEventListener('visibilitychange', handleVisibilityChange)

      if (particles) {
        particles.geometry.dispose()
        particles.material.dispose()
        scene.remove(particles)
      }

      if (renderer) {
        renderer.dispose()
        if (renderer.domElement && container) {
          container.removeChild(renderer.domElement)
        }
      }
    }
  }, [intensity])

  return (
    <div
      ref={containerRef}
      className={cn(
        'absolute inset-0 pointer-events-none overflow-hidden',
        className
      )}
      style={{ zIndex: -1 }}
    />
  )
}