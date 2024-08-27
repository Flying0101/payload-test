import { cn } from '@/lib/utils'
import React from 'react'

type CircleProps = {
  children: React.ReactNode
  radius?: number
  className?: string
}

const Circle: React.FC<CircleProps> = ({ children, className, radius = 100 }) => {
  const childrenArray = React.Children.toArray(children)
  const childrenCount = childrenArray.length
  const angle = (2 * Math.PI) / childrenCount

  const childrenWithStyles = childrenArray.map((child, index) => {
    const theta = angle * index
    const x = radius * Math.cos(theta)
    const y = radius * Math.sin(theta)

    return (
      <div
        key={index}
        className="absolute"
        style={{
          left: `calc(50% + ${x}px)`,
          top: `calc(50% + ${y}px)`,
          transform: 'translate(-50%, -50%)',
        }}
      >
        {child}
      </div>
    )
  })

  return (
    <div
      className={cn('relative', className)}
      style={{ width: 2.5 * radius, height: 2.5 * radius }}
    >
      {childrenWithStyles}
    </div>
  )
}

export default Circle
