'use client'

import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../tabs'
import { CheckIcon } from 'lucide-react'
import { TabKey, useSettingsForm } from './useSettings'
import { NameForm } from './nameForm'
import { DescriptionForm } from './descriptionForm'
import { SignsForm } from './signsForm'
import Summary from './summary'

type SettingsProps = {
  initialTab?: string
  className?: string
  signs?: any
  [key: string]: any
}

export function Settings({ initialTab, className, signs, ...props }: SettingsProps) {
  const {
    activeTab,
    handleTabChange,
    nextStep,
    formData,
    step,
    updateFormData,
    isStepCompleted,
    setStepCompleted,
  } = useSettingsForm(initialTab || 'name')

  const forms = [
    { value: 'name', component: NameForm },
    { value: 'description', component: DescriptionForm },
    { value: 'sign', component: SignsForm },
  ]

  return (
    <Tabs
      defaultValue="name"
      className="w-[800px]"
      value={activeTab}
      onValueChange={handleTabChange}
    >
      <VisibleTabs forms={forms} isStepCompleted={isStepCompleted} step={step} />
      {forms.map(({ value, component: FormComponent }) => (
        <TabsContent key={value} value={value}>
          <FormComponent
            formData={formData}
            updateFormData={updateFormData}
            nextStep={nextStep}
            setStepCompleted={setStepCompleted}
            signs={signs}
            {...props}
          />
        </TabsContent>
      ))}
      <TabsContent value="summary">
        <Summary
          formData={formData}
          updateFormData={updateFormData}
          nextStep={nextStep}
          setStepCompleted={setStepCompleted}
          isStepCompleted={isStepCompleted}
          signs={signs}
          {...props}
        />
      </TabsContent>
    </Tabs>
  )
}

type TabProps = {
  forms: { value: string }[]
  step: number
  isStepCompleted: (step: TabKey) => boolean
}

export function VisibleTabs({ forms, step, isStepCompleted }: TabProps) {
  if (step < 2) return null

  const tabs = forms.slice(0, step).map(({ value }, index) => (
    <TabsTrigger
      key={`tab${index + 1}`}
      value={value}
      className={
        isStepCompleted(value as TabKey)
          ? 'bg-success text-success-foreground'
          : 'border-destructive'
      }
    >
      {isStepCompleted(value as TabKey) && <CheckIcon className="h-6 w-6 pr-2" />}
      {value.charAt(0).toUpperCase() + value.slice(1)}
    </TabsTrigger>
  ))

  return (
    <TabsList className="grid w-full grid-cols-4 space-x-2">
      {tabs}
      {step === 4 && <TabsTrigger value="summary">Summary</TabsTrigger>}
    </TabsList>
  )
}
