'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { set, useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './card'
import { cn } from '@/lib/utils'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './tabs'
import { Fragment, useEffect, useState } from 'react'
import { Input } from './input'
import { TypewriterEffect, TypewriterEffectSmooth } from './typewriter-effect'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Sign } from '@/payload-types'
import Circle from './circle'
import SignIcon from './signIcon'
import { CheckIcon } from 'lucide-react'
import Link from 'next/link'

const NameSchema = z.object({
  name: z
    .string()
    .min(1, {
      message: 'Name must be at least 1 character.',
    })
    .max(160, {
      message: 'Name must not be longer than 160 characters.',
    }),
})

const SignSchema = z.object({
  sign: z
    .string()
    .min(1, {
      message: 'Name must be at least 1 character.',
    })
    .max(160, {
      message: 'Name must not be longer than 160 characters.',
    }),
})

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

export function SettingsForm({ initialTab, className, signs, ...props }: any) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const tabs = ['name', 'description', 'sign', 'summary']
  const [step, setStep] = useState<number>(1)
  const [activeTab, setActiveTab] = useState<string>(initialTab || 'name')
  const [userName, setUserName] = useState<string>('')
  const [nameCompleted, setNameCompleted] = useState(false)
  const [descriptionCompleted, setDescriptionCompleted] = useState(false)
  const [signCompleted, setSignCompleted] = useState(false)

  useEffect(() => {
    const tab = searchParams.get('t')
    if (tab && tabs.includes(tab)) {
      const index = tabs.indexOf(tab)
      console.log('to', tab)
      setStep(index + 1)
      setActiveTab(tab)
    }
  }, [searchParams, tabs])

  const handleTabChange = (value: string) => {
    console.log('tab change', value, step)
    setActiveTab(value)
    const newParams = new URLSearchParams(searchParams)
    newParams.set('t', value)
    router.push(`${pathname}?${newParams.toString()}`)
  }

  const nextStep = () => {
    const newStep = Math.min(4, step + 1)
    setStep(newStep)
    handleTabChange(tabs[newStep - 1])
  }

  return (
    <Tabs
      defaultValue="name"
      className="w-[800px]"
      value={activeTab}
      onValueChange={handleTabChange}
    >
      <VisibleTabs
        step={step}
        nameCompleted={nameCompleted}
        descriptionCompleted={descriptionCompleted}
        signCompleted={signCompleted}
      />
      <TabsContent value="name">
        <Card className={cn('w-full', className)} {...props}>
          <NameForm nextStep={nextStep} setName={setUserName} setNameCompleted={setNameCompleted} />
        </Card>
      </TabsContent>
      <TabsContent value="description">
        <Card className={cn('w-full', className)} {...props}>
          <DescriptionForm
            name={userName}
            nextStep={nextStep}
            setDescriptionCompleted={setDescriptionCompleted}
          />
        </Card>
      </TabsContent>
      <TabsContent value="sign">
        <Card
          className={cn('w-full flex flex-col justify-center items-center', className)}
          {...props}
        >
          <SignsForm signs={signs} setSignCompleted={setSignCompleted} nextStep={nextStep} />
        </Card>
      </TabsContent>
      <TabsContent value="summary">
        <Card
          className={cn('w-full flex flex-col justify-center items-center', className)}
          {...props}
        >
          <CardHeader>
            <CardTitle>
              <TypewriterEffectSmooth
                words={[
                  { text: 'You,' },
                  { text: 'are' },
                  { text: 'now' },
                  { text: 'ready' },
                  { text: 'to' },
                  { text: 'start' },
                  { text: 'your' },
                  { text: 'Adventure', className: 'text-primary' },
                ]}
              />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Link href="daily">Click here to read today's Horoscope</Link>
          </CardContent>
          <CardFooter className="flex justify-between"></CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  )
}

function VisibleTabs({
  step,
  nameCompleted = false,
  descriptionCompleted = false,
  signCompleted = false,
}: {
  step: number
  nameCompleted: boolean
  descriptionCompleted: boolean
  signCompleted: boolean
}) {
  const tabs = [
    <TabsTrigger
      key="tab1"
      value="name"
      className={nameCompleted ? 'bg-success text-success-foreground' : ''}
    >
      {nameCompleted && <CheckIcon className="h-6 w-6 pr-2" />}Name
    </TabsTrigger>,
    <TabsTrigger
      key="tab2"
      value="description"
      className={cn('', descriptionCompleted ? 'bg-success text-success-foreground' : '')}
    >
      {descriptionCompleted && <CheckIcon className="h-6 w-6 pr-2" />}Description
    </TabsTrigger>,
    <TabsTrigger
      key="tab3"
      value="sign"
      className={signCompleted ? 'bg-success text-success-foreground' : ''}
    >
      {signCompleted && <CheckIcon className="h-6 w-6 pr-2" />}Sign
    </TabsTrigger>,
    <TabsTrigger key="tab4" value="summary">
      Summary
    </TabsTrigger>,
  ]

  if (step < 2) return null

  return (
    <TabsList className="grid w-full grid-cols-4 space-x-2">
      {Array.from({ length: step }, (_, i) => tabs[i])}
    </TabsList>
  )
}

function NameForm({
  nextStep,
  setName,
  setNameCompleted,
}: {
  nextStep: () => void
  setName: (name: string) => void
  setNameCompleted: (v: boolean) => void
}) {
  const form = useForm<z.infer<typeof NameSchema>>({
    resolver: zodResolver(NameSchema),
    defaultValues: { name: '' },
  })

  function onSubmit(data: z.infer<typeof NameSchema>) {
    setName(data.name)
    setNameCompleted(true)
    nextStep()
  }

  return (
    <Fragment>
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
    </Fragment>
  )
}

function DescriptionForm({
  nextStep,
  name,
  setDescriptionCompleted,
}: {
  name: string
  setDescriptionCompleted: (v: boolean) => void
  nextStep: () => void
}) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data)
    setDescriptionCompleted(true)
    nextStep()
  }

  return (
    <Fragment>
      <CardHeader>
        <CardTitle>
          <TypewriterEffectSmooth
            words={[
              { text: 'Hello' },
              { text: name?.length ? name : '', className: 'text-primary' },
              { text: ', please' },
              { text: 'tell' },
              { text: 'us' },
              { text: 'a' },
              { text: 'little' },
              { text: 'about' },
              { text: 'yourself' },
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
    </Fragment>
  )
}

function SignsForm({
  signs,
  nextStep,
  setSignCompleted,
}: {
  signs: Pick<Sign, 'id' | 'Title' | 'Description' | 'Small Icon'>[]
  nextStep: () => void
  setSignCompleted: (v: boolean) => void
}) {
  const [selectedSign, setSelectedSign] = useState<number | null>(null)
  const [confirmedSign, setConfirmedSign] = useState<number | null>(null)

  const handleSignClick = (id: number) => {
    if (confirmedSign === id) return

    if (selectedSign === id) {
      setConfirmedSign(id)
      setSignCompleted(true)
      nextStep()
    } else {
      setSignCompleted(true)
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
            .map((w) => ({ text: w }))
            .toSpliced(4, 0, { text: confirmed.Title, className: 'text-primary' })
        : 'Pick your Sign'
            .split(' ')
            .map((w) => ({ text: w }))
            .toSpliced(2, 0, { text: 'Sign', className: 'text-primary' })
    }

    if (selectedSign) {
      const selected = signs.find((sign) => sign.id === selectedSign)
      return selected
        ? `Click on again to confirm your choice`
            .split(' ')
            .map((w) => ({ text: w }))
            .toSpliced(2, 0, { text: selected.Title, className: 'text-primary' })
        : 'Pick your'
            .split(' ')
            .map((w) => ({ text: w }))
            .toSpliced(2, 0, { text: 'Sign', className: 'text-primary' })
    }

    return 'Pick your'
      .split(' ')
      .map((w) => ({ text: w }))
      .toSpliced(2, 0, { text: 'Sign', className: 'text-primary' })
  }

  return (
    <Fragment>
      <CardHeader>
        <CardTitle>
          <TypewriterEffectSmooth words={getSelectedSign()} />
        </CardTitle>
      </CardHeader>
      <CardContent>
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
    </Fragment>
  )
}
