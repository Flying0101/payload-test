'use client'

import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Form, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { Input } from '../input'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../card'
import { TypewriterEffectSmooth } from '../typewriter-effect'
import { Sign } from '@/payload-types'
import SignIcon from '../signIcon'
import Circle from '../circle'

export function SignsForm({
  formData,
  updateFormData,
  className,
  signs,
  nextStep,
  setStepCompleted,
}: {
  signs: Pick<Sign, 'id' | 'Title' | 'Description' | 'Small Icon'>[]
  nextStep: () => void
  formData: any
  updateFormData: any
  setStepCompleted: any
  className: string
}) {
  const [selectedSign, setSelectedSign] = useState<number | null>(null)
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

  const getSelectedSign = () => {
    if (confirmedSign) {
      const confirmed = signs.find((sign) => sign.id === confirmedSign)
      return confirmed
        ? `You have picked`
            .split(' ')
            .map((w) => ({ text: w, className: '' }))
            .toSpliced(4, 0, { text: confirmed.Title, className: 'text-primary' })
        : 'Pick your Sign'
            .split(' ')
            .map((w) => ({ text: w, className: '' }))
            .toSpliced(2, 0, { text: 'Sign', className: 'text-primary' })
    }

    if (selectedSign) {
      const selected = signs.find((sign) => sign.id === selectedSign)
      return selected
        ? `Click on again to confirm your choice`
            .split(' ')
            .map((w) => ({ text: w, className: '' }))
            .toSpliced(2, 0, { text: selected.Title, className: 'text-primary' })
        : 'Pick your'
            .split(' ')
            .map((w) => ({ text: w, className: '' }))
            .toSpliced(2, 0, { text: 'Sign', className: 'text-primary' })
    }

    return 'Pick your'
      .split(' ')
      .map((w) => ({ text: w, className: '' }))
      .toSpliced(2, 0, { text: 'Sign', className: 'text-primary' })
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex justify-center">
          <TypewriterEffectSmooth words={getSelectedSign()} />
        </CardTitle>
      </CardHeader>
      <CardContent className="flex justify-center">
        <Circle radius={250}>
          {signs.map(({ id, Title, 'Small Icon': icon, Description }) => (
            <SignIcon
              icon={icon}
              name={Title}
              key={id}
              description={Description}
              state={getSignState(id)}
              onClick={() => handleSignClick(id)}
            />
          ))}
        </Circle>
      </CardContent>
    </Card>
  )
}
