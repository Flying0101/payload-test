'use client'
import { useEffect, useMemo } from 'react'
import { motion, stagger, useAnimate } from 'framer-motion'
import { cn } from '@/lib/utils'

export const TextGenerateEffect = ({
  words,
  className,
  filter = true,
  duration = 0.5,
  highlightWords = [],
  highlightClass = 'text-primary',
}: {
  words: string
  className?: string
  filter?: boolean
  duration?: number
  highlightWords?: string[]
  highlightClass?: string
}) => {
  const [scope, animate] = useAnimate()

  const wordsArray = useMemo(() => words.split(' '), [words])

  useEffect(() => {
    scope.current.style.opacity = '1'
    const animation = async () => {
      await animate(
        'span',
        {
          opacity: 0,
          filter: filter ? 'blur(10px)' : 'none',
        },
        { duration: 0 },
      )
      await animate(
        'span',
        {
          opacity: 1,
          filter: filter ? 'blur(0px)' : 'none',
        },
        {
          duration: duration,
          delay: stagger(0.2),
        },
      )
    }
    animation()
  }, [scope, animate, duration, filter, words])

  const renderWords = () => {
    return (
      <motion.div ref={scope} style={{ opacity: 0 }}>
        {wordsArray.map((word, idx) => {
          const shouldHighlight = highlightWords.includes(word)
          return (
            <motion.span
              key={`${word}-${highlightWords[0]}`}
              className={cn('dark:text-white text-black', shouldHighlight && highlightClass)}
              {...({} as any)}
            >
              {word}{' '}
            </motion.span>
          )
        })}
      </motion.div>
    )
  }

  return (
    <div className={cn('font-bold', className)}>
      <div className="mt-4">
        <div className="dark:text-white text-black text-2xl leading-snug tracking-wide">
          {renderWords()}
        </div>
      </div>
    </div>
  )
}
