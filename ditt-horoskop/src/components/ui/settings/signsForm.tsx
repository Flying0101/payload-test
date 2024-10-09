'use client'

import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../card'
import { Media, Sign } from '@/payload-types'
import SignIcon from '../signIcon'
import { Circle, CircleMiddle } from '../circle'
import Image from 'next/image'
import { TextGenerateEffect } from '../text-generate-effect'
import { Hover, HoverContent, HoverList, HoverTrigger } from '../hover'

export function SignsForm({
  formData,
  updateFormData,
  signs,
  nextStep,
  setStepCompleted,
}: {
  signs: Pick<Sign, 'id' | 'Title' | 'Description' | 'Small Icon'>[]
  nextStep: () => void
  formData: any
  updateFormData: any
  setStepCompleted: any
}) {
  const [selectedSign, setSelectedSign] = useState<number | null>(null)
  const [hoveredSign, setHoveredSign] = useState<Media | false>(false)
  const [confirmedSign, setConfirmedSign] = useState<number | null>(null)

  useEffect(() => {
    if (!formData.sign) return

    setSelectedSign(formData.sign.id)
    setConfirmedSign(formData.sign.id)
  }, [formData.sign])

  const handleSignClick = (id: number) => {
    if (confirmedSign === id) return

    if (selectedSign === id) {
      setConfirmedSign(id)
      updateFormData('sign', id)
      setStepCompleted('sign', true)
      nextStep()
    } else {
      setStepCompleted('sign', false)
      setSelectedSign(id)
      setConfirmedSign(null)
    }
  }

  const getSignState = (id: number) => {
    if (confirmedSign === id) return 'confirmed'
    if (selectedSign === id) return 'chosen'
    return 'no'
  }

  const getSelectedSign = (): { words: string; highlightWords: string[] } => {
    if (confirmedSign) {
      const confirmed = signs.find((sign) => sign.id === confirmedSign)
      if (confirmed) {
        return { words: `You have picked ${confirmed.Title}`, highlightWords: [confirmed.Title] }
      }
    }

    if (selectedSign) {
      const selected = signs.find((sign) => sign.id === selectedSign)
      if (selected) {
        return {
          words: `Click on ${selected.Title} again to confirm your choice`,
          highlightWords: [selected.Title],
        }
      }
    }

    return { words: 'Pick your Sign', highlightWords: ['Sign'] }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex justify-center h-20">
          <TextGenerateEffect {...getSelectedSign()} />
        </CardTitle>
      </CardHeader>
      <CardContent className="flex justify-center">
        <Hover>
          <Circle radius={{ sm: 150, md: 220 }}>
            {!!hoveredSign && (
              <CircleMiddle>
                {signs.map(({ id, Title, 'Small Icon': icon, Description }) => (
                  <HoverContent value={Title} key={id}>
                    <div className="space-y-1 flex flex-col items-center">
                      <Image
                        className="text-white"
                        src={(icon as any).url || ''}
                        style={{ color: 'currentcolor', fill: 'currentColor' }}
                        alt="chosen sign icon"
                        width={100}
                        height={100}
                      />
                      <p className="text-sm">{Description}</p>
                      <div className="flex items-center pt-2">
                        <span className="text-xs text-muted-foreground">Dec 21 to Jan 53</span>
                      </div>
                    </div>
                  </HoverContent>
                ))}
              </CircleMiddle>
            )}
            {signs.map(({ id, Title, 'Small Icon': icon, Description }) => (
              <HoverTrigger value={Title} key={`${id}hover`}>
                <SignIcon
                  icon={icon}
                  key={id}
                  state={getSignState(id)}
                  setHoverImage={(v: false | Media) => {
                    setHoveredSign(v)
                  }}
                  onClick={() => handleSignClick(id)}
                />
              </HoverTrigger>
            ))}
          </Circle>
        </Hover>
      </CardContent>
    </Card>
  )
}
