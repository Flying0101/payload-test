import { cn } from '@/lib/utils'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../card'
import { TypewriterEffectSmooth } from '../typewriter-effect'
import Link from 'next/link'
import { TabsContent } from '../tabs'

export default function ({ className, ...props }: any) {
  return (
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
  )
}
