'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function Loader({ text }: { text: string }) {
  const [gradientAngle, setGradientAngle] = useState(0)

  useEffect(() => {
    const intervalId = setInterval(() => {
      setGradientAngle((prevAngle) => (prevAngle + 1) % 360)
    }, 50)
    return () => clearInterval(intervalId)
  }, [])

  return (
    <div className="relative w-[400px] h-[400px]">
      <motion.svg
        width="400"
        height="400"
        viewBox="0 0 400 400"
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
      >
        <defs>
          <linearGradient id="shifting-gradient" gradientTransform={`rotate(${gradientAngle})`}>
            <stop offset="0%" stopColor="#8B5CF6" />
            <stop offset="50%" stopColor="#EC4899" />
            <stop offset="100%" stopColor="#3B82F6" />
          </linearGradient>
        </defs>

        {/* Outer circle */}
        <circle
          cx="200"
          cy="200"
          r="195"
          fill="none"
          stroke="url(#shifting-gradient)"
          strokeWidth="2"
        />

        {/* Inner circles */}
        <circle
          cx="200"
          cy="200"
          r="160"
          fill="none"
          stroke="url(#shifting-gradient)"
          strokeWidth="1"
        />
        <circle
          cx="200"
          cy="200"
          r="120"
          fill="none"
          stroke="url(#shifting-gradient)"
          strokeWidth="1"
        />

        {/* Zodiac divisions */}
        {[...Array(12)].map((_, i) => (
          <line
            key={i}
            x1="200"
            y1="40"
            x2="200"
            y2="5"
            stroke="url(#shifting-gradient)"
            strokeWidth="1"
            transform={`rotate(${i * 30} 200 200)`}
          />
        ))}

        {/* Astrological symbols (simplified) */}
        {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle, i) => (
          <text
            key={i}
            x="200"
            y="30"
            fill="url(#shifting-gradient)"
            fontSize="12"
            textAnchor="middle"
            transform={`rotate(${angle} 200 200)`}
          >
            {['♈', '♉', '♊', '♋', '♌', '♍', '♎', '♏', '♐', '♑', '♒', '♓'][i]}
          </text>
        ))}

        {/* Astrological lines */}
        <line
          x1="120"
          y1="120"
          x2="280"
          y2="280"
          stroke="url(#shifting-gradient)"
          strokeWidth="1"
        />
        <line
          x1="120"
          y1="280"
          x2="280"
          y2="120"
          stroke="url(#shifting-gradient)"
          strokeWidth="1"
        />
        <line x1="200" y1="40" x2="200" y2="360" stroke="url(#shifting-gradient)" strokeWidth="1" />
        <line x1="40" y1="200" x2="360" y2="200" stroke="url(#shifting-gradient)" strokeWidth="1" />
      </motion.svg>

      {/* Text */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        {...({} as any)}
      >
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
        >
          <svg width="500" height="500" viewBox="0 0 500 500">
            <defs>
              <path
                id="circle"
                d="M 250,250 m -220,0 a 220,220 0 1,1 440,0 a 220,220 0 1,1 -440,0"
              />
              <linearGradient id="shifting-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: '#f00', stopOpacity: 1 }} />
                <stop offset="100%" style={{ stopColor: '#00f', stopOpacity: 1 }} />
              </linearGradient>
            </defs>
            <text fill="url(#shifting-gradient)" fontSize="24" letterSpacing="2">
              <textPath href="#circle" startOffset="0%">
                {text}•••••••••• {text} •••••••••• {text} ••••••••••{' '}
              </textPath>
            </text>
          </svg>
        </motion.div>
      </motion.div>
    </div>
  )
}
