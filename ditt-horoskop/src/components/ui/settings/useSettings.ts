import { useState, useEffect } from 'react'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { rest } from '@/lib/rest'
import { getPayload } from '@/lib/payload'
import { useAuth } from '@/providers/auth'

export function useSettingsForm(initialTab: string) {
  const auth = useAuth()
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const tabs = ['name', 'description', 'sign', 'summary']
  const [step, setStep] = useState(1)
  const [activeTab, setActiveTab] = useState(initialTab || 'name')
  const [formData, setFormData] = useState<Record<string, string>>({})
  const [completedSteps, setCompletedSteps] = useState<Record<keyof tabs, boolean>>({})

  useEffect(() => {
    if (auth.user) {
      const { name, description, sign } = auth.user
      setFormData({ name, description, sign })
      setCompletedSteps({
        name: !!name,
        description: !!(description && description.length),
        sign: !!sign,
      })
    }
  }, [auth.user])

  useEffect(() => {
    const tab = searchParams.get('t')
    if (tab && tabs.includes(tab)) {
      const index = tabs.indexOf(tab)
      setStep(index + 1)
      setActiveTab(tab)
    }
  }, [searchParams, tabs])

  const handleTabChange = (value: string) => {
    setActiveTab(value)
    const newParams = new URLSearchParams(searchParams)
    newParams.set('t', value)
    router.push(`${pathname}?${newParams.toString()}`)
  }

  const nextStep = () => {
    const newStep = Math.min(tabs.length, step + 1)
    setStep(newStep)
    handleTabChange(tabs[newStep - 1])
  }

  const updateFormData = async (key: string, value: string) => {
    setFormData((prev) => ({ ...prev, [key]: value }))

    // const payload = await getPayload()
    // payload.update({ collection: 'users',where:  })
    console.log(formData[key])

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
  }

  const isStepCompleted = (step: number) => !!completedSteps[step]

  const setStepCompleted = (step: number, completed = true) => {
    setCompletedSteps((prev) => ({ ...prev, [step]: completed }))
  }

  return {
    activeTab,
    handleTabChange,
    nextStep,
    formData,
    updateFormData,
    isStepCompleted,
    setStepCompleted,
  }
}
