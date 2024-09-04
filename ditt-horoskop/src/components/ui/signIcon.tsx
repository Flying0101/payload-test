import { Media } from '@/payload-types'
import React from 'react'
import { HoverCard, HoverCardTrigger } from './hover-card'
import { HoverCardContent, HoverCardPortal } from '@radix-ui/react-hover-card'
import { Avatar, AvatarImage } from './avatar'
import { cn } from '@/lib/utils'

interface SignIconProps {
  icon: Media | undefined | null | number
  name: string
  description: string
  state: 'no' | 'chosen' | 'confirmed'
  onClick: () => void
  setHoverImage: (state: false | Media) => void
}

const SignIcon: React.FC<SignIconProps> = ({
  icon,
  name,
  description,
  state,
  onClick,
  setHoverImage,
}) => {
  if (typeof icon === 'number') return null
  if (!icon) return null

  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Avatar
          onClick={onClick}
          onMouseEnter={() => setHoverImage(icon)}
          onMouseLeave={() => setHoverImage(false)}
          className={cn(
            state === 'chosen'
              ? 'bg-green-300'
              : state === 'confirmed'
                ? 'bg-green-500'
                : 'bg-popover',
            'p-4 w-24 h-24 z-10 rounded-full shadow-lg transition-transform transform hover:scale-110 hover:shadow-xl',
          )}
        >
          <AvatarImage src={icon?.url || 'logo.png'} />
        </Avatar>
      </HoverCardTrigger>
      <HoverCardPortal container={document.body}>
        <HoverCardContent className="flex z-50 w-60 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2">
          <div className="flex justify-between space-x-4">
            <Avatar>
              <AvatarImage src={icon?.url || 'logo.png'} />
            </Avatar>
            <div className="space-y-1">
              <h4 className="text-sm font-semibold">{name}</h4>
              <p className="text-sm">{description}</p>
              <div className="flex items-center pt-2">
                <span className="text-xs text-muted-foreground">Dec 21 to Jan 53</span>
              </div>
            </div>
          </div>
        </HoverCardContent>
      </HoverCardPortal>
    </HoverCard>
  )
}

export default SignIcon
