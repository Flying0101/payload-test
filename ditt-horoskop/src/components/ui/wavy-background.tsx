'use client'
import { cn } from '@/lib/utils'
import { useTheme } from 'next-themes'
import React, { useEffect, useRef, useState } from 'react'
import { createNoise3D } from 'simplex-noise'

export const WavyBackground = ({
  children,
  className,
  containerClassName,
  waveWidth,
  backgroundFill,
  blur = 10,
  speed = 'fast',
  waveOpacity = 0.5,
  ...props
}: {
  children?: any
  className?: string
  containerClassName?: string
  waveWidth?: number
  backgroundFill?: string
  blur?: number
  speed?: 'slow' | 'fast'
  waveOpacity?: number
  [key: string]: any
}) => {
  const { theme, systemTheme } = useTheme()
  const noise = createNoise3D()
  let w: number, h: number, nt: number, i: number, x: number, ctx: any, canvas: any
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const getSpeed = () => {
    switch (speed) {
      case 'slow':
        return 0.0005
      case 'fast':
        return 0.001
      default:
        return 0.0005
    }
  }

  const init = () => {
    canvas = canvasRef.current
    ctx = canvas.getContext('2d')
    w = ctx.canvas.width = window.innerWidth
    h = ctx.canvas.height = window.innerHeight
    ctx.filter = `blur(${blur}px)`
    nt = 0
    window.onresize = function () {
      w = ctx.canvas.width = window.innerWidth
      h = ctx.canvas.height = window.innerHeight
      ctx.filter = `blur(${blur}px)`
    }
    render()
  }

  const getColor = (variableName: string) => {
    return `hsl(${getComputedStyle(document.documentElement).getPropertyValue(variableName).trim()})`
  }

  const [waveColors, setWaveColors] = useState<string[]>([])
  const [backgroundColor, setBackgroundColor] = useState('')

  useEffect(() => {
    const updateColors = () => {
      // Use RAF to ensure the DOM has been updated with the new theme
      requestAnimationFrame(() => {
        setBackgroundColor(getColor('--background'))
        setWaveColors([
          getColor('--wave-1'),
          getColor('--wave-2'),
          getColor('--wave-3'),
          getColor('--wave-4'),
          getColor('--wave-5'),
        ])
      })
    }

    // Update colors when the theme changes
    updateColors()

    // Create a MutationObserver to watch for changes in the <html> element's class
    const observer = new MutationObserver(updateColors)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })

    return () => observer.disconnect()
  }, [theme, systemTheme])

  const drawWave = (n: number, yOffset: number, direction: 1 | -1) => {
    const angle = 15 * (Math.PI / 180) // 15 degrees in radians
    const stretch = 1.5 // Stretch factor to cover the whole screen
    for (i = 0; i < n; i++) {
      ctx.beginPath()
      ctx.lineWidth = waveWidth || 200
      ctx.strokeStyle = waveColors[i % waveColors.length]
      for (x = -w * 0.5; x < w * 1.5; x += 5) {
        const noiseVal = noise(x / 800, 0.3 * i, nt)
        const y = noiseVal * 100 * direction * stretch
        const xAngled = x + y * Math.tan(angle)
        ctx.lineTo(xAngled, y + yOffset)
      }
      ctx.stroke()
      ctx.closePath()
    }
  }

  let animationId = 0
  const render = () => {
    ctx.fillStyle = backgroundFill || backgroundColor
    ctx.globalAlpha = waveOpacity || 0.5
    ctx.fillRect(0, 0, w, h)
    // Draw top waves
    drawWave(3, 0, 1)
    // Draw bottom waves
    drawWave(3, h, -1)
    nt += getSpeed()
    animationId = requestAnimationFrame(render)
  }

  useEffect(() => {
    if (waveColors.length > 0 && backgroundColor) {
      init()
    }
    return () => {
      cancelAnimationFrame(animationId)
    }
  }, [waveColors, backgroundColor, animationId])

  const [isSafari, setIsSafari] = useState(false)
  useEffect(() => {
    setIsSafari(
      typeof window !== 'undefined' &&
        navigator.userAgent.includes('Safari') &&
        !navigator.userAgent.includes('Chrome'),
    )
  }, [])

  return (
    <div className={cn('flex flex-col items-center justify-center', containerClassName)}>
      <canvas
        className="absolute inset-0 -z-10"
        ref={canvasRef}
        id="canvas"
        style={{
          ...(isSafari ? { filter: `blur(${blur}px)` } : {}),
        }}
      ></canvas>
      <div className={cn('relative z-10', className)} {...props}>
        {children}
      </div>
    </div>
  )
}
