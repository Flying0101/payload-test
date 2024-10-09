'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'

interface HoverContextType {
  hoveredValue: string | null
  setHoveredValue: (value: string | null) => void
}

const HoverContext = createContext<HoverContextType | undefined>(undefined)

export function Hover({ children }: { children: ReactNode }) {
  const [hoveredValue, setHoveredValue] = useState<string | null>(null)

  return (
    <HoverContext.Provider value={{ hoveredValue, setHoveredValue }}>
      {children}
    </HoverContext.Provider>
  )
}

export function HoverTrigger({ value, children }: { value: string; children: ReactNode }) {
  const context = useContext(HoverContext)
  if (!context) throw new Error('HoverTrigger must be used within a Hover')

  return (
    <div
      onMouseEnter={() => context.setHoveredValue(value)}
      onMouseLeave={() => context.setHoveredValue(null)}
    >
      {children}
    </div>
  )
}

export function HoverContent({ value, children }: { value: string; children: ReactNode }) {
  const context = useContext(HoverContext)
  if (!context) throw new Error('HoverContent must be used within a Hover')

  if (context.hoveredValue !== value) return null

  return <>{children}</>
}

export function HoverList({ children }: { children: ReactNode }) {
  return <>{children}</>
}
