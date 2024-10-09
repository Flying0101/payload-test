import Link from 'next/link'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../card'
import { cn } from '@/lib/utils'
import { TextGenerateEffect } from '../text-generate-effect'

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
            <TextGenerateEffect
              words="You, are now ready to begin your Adventure"
              highlightWords={['Adventure']}
            />
          ) : (
            <span>Please complete all the steps</span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isCompleted ? (
          <Link
            href="."
            className="group relative inline-flex items-center justify-center px-8 py-3 text-lg font-bold text-white transition-all duration-300 ease-in-out bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full overflow-hidden"
          >
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300 ease-in-out"></span>
            <span className="relative">Read Today&apos;s Horoscope</span>
          </Link>
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
