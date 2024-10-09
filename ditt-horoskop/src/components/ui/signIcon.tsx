import { Media } from '@/payload-types'
import React from 'react'
import { Avatar, AvatarImage } from './avatar'
import { cn } from '@/lib/utils'

interface SignIconProps {
  icon: Media | undefined | null | number
  state: 'no' | 'chosen' | 'confirmed'
  onClick: () => void
  setHoverImage: (state: false | Media) => void
}

const SignIcon: React.FC<SignIconProps> = ({ icon, state, onClick, setHoverImage }) => {
  if (typeof icon === 'number') return null
  if (!icon) return null

  return (
    <Avatar
      onClick={onClick}
      onMouseEnter={() => setHoverImage(icon)}
      onMouseLeave={() => setHoverImage(false)}
      className={cn(
        state === 'chosen'
          ? 'bg-gradient-to-r from-green-300 to-green-400'
          : state === 'confirmed'
            ? 'bg-gradient-to-r from-green-500 to-green-600'
            : 'bg-gradient-to-r from-purple-300 to-pink-300',
        'p-2 md:p-4 w-16 h-16 md:w-20 md:h-20 z-10 rounded-full shadow-lg transition-transform transform hover:scale-110 hover:shadow-xl',
      )}
    >
      <AvatarImage src={icon?.url || 'logo.png'} />
    </Avatar>
  )
}

export default SignIcon
