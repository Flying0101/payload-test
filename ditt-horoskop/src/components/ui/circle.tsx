import { cn } from '@/lib/utils'
import React from 'react'

type CircleProps = {
  children: React.ReactNode
  radius?: number
  className?: string
}

const Circle: React.FC<CircleProps> = ({ children, className, radius = 100 }) => {
  const childrenArray = React.Children.toArray(children)
  const circleMiddleIndex = childrenArray.findIndex(
    (child) => React.isValidElement(child) && child.type === CircleMiddle,
  )

  const circleMiddle = circleMiddleIndex !== -1 ? childrenArray[circleMiddleIndex] : null
  const otherChildren = childrenArray.filter((_, index) => index !== circleMiddleIndex)

  const childrenCount = otherChildren.length
  const angle = (2 * Math.PI) / childrenCount

  const childrenWithStyles = otherChildren.map((child, index) => {
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
      {circleMiddle && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          {circleMiddle}
        </div>
      )}
    </div>
  )
}

const CircleMiddle: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <>{children}</>
}

export { Circle, CircleMiddle }
