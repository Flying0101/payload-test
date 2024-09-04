import { useState, useEffect } from 'react'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { rest } from '@/lib/rest'
import { useAuth } from '@/providers/auth'

const tabs = ['name', 'description', 'sign', 'summary'] as const
export type TabKey = 'name' | 'description' | 'sign'

export function useSettingsForm(initialTab: string) {
  const auth = useAuth()
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [step, setStep] = useState(1)
  const [activeTab, setActiveTab] = useState(initialTab || 'name')
  const [formData, setFormData] = useState<Partial<Record<TabKey, any>>>({})
  const [completedSteps, setCompletedSteps] = useState<Record<TabKey, boolean>>(
    () => Object.fromEntries(tabs.map((name) => [name, false])) as Record<TabKey, boolean>,
  )

  useEffect(() => {
    if (auth.user) {
      const { name, description, sign } = auth.user
      setFormData({ name, description, sign })

      setCompletedSteps({
        name: !!name,
        description: !!(description && description.length),
        sign: !!sign,
      })

      setStep(!!sign ? 4 : !!description?.length ? 3 : !!name ? 2 : 1)
    }
  }, [auth.user])

  useEffect(() => {
    const tab = searchParams.get('t')

    if (tab && tabs.includes(tab as (typeof tabs)[number])) {
      // const index = tabs.indexOf(tab as typeof tabs[number]);
      setActiveTab(tab as (typeof tabs)[number])
    }
  }, [searchParams])

  const handleTabChange = (value: string) => {
    setActiveTab(value)
    const newParams = new URLSearchParams(searchParams)
    newParams.set('t', value)
    router.push(`${pathname}?${newParams.toString()}`)
  }

  const nextStep = () => {
    const newStep = Math.min(tabs.length, step + 1)
    setStep(Math.min(newStep, step))
    handleTabChange(tabs[newStep - 1])
  }

  const updateFormData = async (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }))

    // const payload = await getPayload()
    // payload.update({ collection: 'users',where:  })

    const res = await rest(
      `${process.env.NEXT_PUBLIC_CMS_URL || 'http://localhost:3000'}/api/users/${auth.user?.id || ''}`,
      { [key]: value },
      {
        method: 'PATCH',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    )

    auth.update({ [key]: value })
  }

  const isStepCompleted = (step: TabKey) => !!completedSteps[step]

  const setStepCompleted = (step: TabKey, completed = true) => {
    setCompletedSteps((prev) => ({ ...prev, [step]: completed }))
  }

  return {
    activeTab,
    handleTabChange,
    nextStep,
    formData,
    step,
    updateFormData,
    isStepCompleted,
    setStepCompleted,
  }
}
