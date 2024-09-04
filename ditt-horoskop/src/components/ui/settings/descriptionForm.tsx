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
  FormDescription,
} from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../card'
import { TypewriterEffectSmooth } from '../typewriter-effect'
import { Textarea } from '../textarea'

const FormSchema = z.object({
  description: z
    .string()
    .min(10, {
      message: 'Description must be at least 10 characters.',
    })
    .max(160, {
      message: 'Description must not be longer than 160 characters.',
    }),
})

export function DescriptionForm({ formData, updateFormData, nextStep, setStepCompleted }: any) {
  const { name } = formData

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: { description: '' },
  })

  useEffect(() => {
    if (!formData.description?.length) return
    form.setValue('description', formData.description)
  }, [formData.description, form])

  React.useEffect(() => {
    form.setFocus('description')
  }, [form])

  function onSubmit(data: any) {
    updateFormData('description', data.description)
    setStepCompleted('description')
    nextStep()
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>
          {name?.length && (
            <div className="text-xs sm:text-base md:text-xl lg:text:3xl xl:text-3xl font-bold">
              Hello, {name}!
            </div>
          )}
          <TypewriterEffectSmooth
            words={[
              { text: 'Please' },
              { text: 'tell' },
              { text: 'us' },
              { text: 'a' },
              { text: 'little' },
              { text: 'about' },
              { text: 'yourself', className: 'text-primary' },
            ]}
          />
        </CardTitle>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
          <CardContent>
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description (10 to 160 words)</FormLabel>
                  <FormControl>
                    <Textarea placeholder="" className="resize-none" {...field} />
                  </FormControl>
                  <FormDescription>
                    Your description will be used when writing your custom horoscope.
                  </FormDescription>
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
