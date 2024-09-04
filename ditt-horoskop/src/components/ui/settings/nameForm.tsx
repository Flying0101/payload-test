'use client'

import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '../input'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../card'
import { TypewriterEffectSmooth } from '../typewriter-effect'

const NameSchema = z.object({
  name: z.string().min(1).max(160),
})

type NameFormProps = any //{
// formData, updateFormData, nextStep, setStepCompleted
// }

export function NameForm({ formData, updateFormData, nextStep, setStepCompleted }: NameFormProps) {
  const form = useForm({
    resolver: zodResolver(NameSchema),
    defaultValues: { name: '' },
  })

  useEffect(() => {
    if (!formData.name?.length) return
    form.setValue('name', formData.name)
  }, [formData.name, form])

  React.useEffect(() => {
    form.setFocus('name')
  }, [form])

  const watchName = form.watch('name')

  useEffect(() => {
    if (formData.name === watchName && formData.name?.length > 0) {
      setStepCompleted('name')
    } else {
      console.log('name changed')
      setStepCompleted('name', false)
    }
  }, [watchName, formData.name, setStepCompleted])

  function onSubmit(data: any) {
    updateFormData('name', data.name)
    setStepCompleted('name')
    nextStep()
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>
          <TypewriterEffectSmooth
            words={[
              { text: 'Hello,' },
              { text: 'what' },
              { text: 'is' },
              { text: 'your' },
              { text: 'Name?', className: 'text-primary' },
            ]}
          />
        </CardTitle>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
          <CardContent>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Name</FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button type="submit">Submit</Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  )
}
