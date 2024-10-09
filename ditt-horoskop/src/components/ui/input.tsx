import * as React from 'react'

import { cn } from '@/lib/utils'

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  before?: React.ReactNode
  after?: React.ReactNode
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, before, after, ...props }, ref) => {
    return (
      <div className="flex relative items-center">
        {before && <div className="absolute left-3 flex items-center">{before}</div>}
        <input
          type={type}
          className={cn(
            'flex h-10 w-full rounded-full border-slate-800 border-2 bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
            before && 'pl-8',
            after && 'pr-8',
            className,
          )}
          ref={ref}
          {...props}
        />
        {after && <div className="absolute right-3 flex items-center">{after}</div>}
      </div>
    )
  },
)
Input.displayName = 'Input'

export { Input }
