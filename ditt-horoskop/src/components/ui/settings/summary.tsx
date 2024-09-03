import Link from 'next/link'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../card'
import { TypewriterEffectSmooth } from '../typewriter-effect'
import { cn } from '@/lib/utils'

export default function Summary({ className, formData, isStepCompleted }: any) {
  const nameIsCompleted = isStepCompleted('name')
  const descriptionIsCompleted = isStepCompleted('description')
  const signIsCompleted = isStepCompleted('sign')
  const isCompleted = nameIsCompleted && descriptionIsCompleted && signIsCompleted

  return (
    <Card className={cn('w-full flex flex-col justify-center items-center', className)}>
      <CardHeader>
        <CardTitle>
          {isCompleted ? (
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
          ) : (
            <span>Please complete all the steps</span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isCompleted ? (
          <Link href="daily">Click here to read today's Horoscope</Link>
        ) : (
          <ul>
            <li>
              {nameIsCompleted ? (
                <span className="text-success">Name</span>
              ) : (
                <span className="text-destructive">Fill in your name</span>
              )}
            </li>
            <li>
              {descriptionIsCompleted ? (
                <span className="text-success">Description is completed</span>
              ) : (
                <span className="text-destructive">Fill in your description</span>
              )}
            </li>
            <li>
              {signIsCompleted ? (
                <span className="text-success">Sign is chosen</span>
              ) : (
                <span className="text-destructive">Choose your sign</span>
              )}
            </li>
          </ul>
        )}
      </CardContent>
      <CardFooter className="flex justify-between"></CardFooter>
    </Card>
  )
}
