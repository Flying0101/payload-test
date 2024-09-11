import React, { useState } from 'react'
import { FormControl, FormItem, FormLabel, FormMessage } from './form'
import { Input } from './input'
import { Eye, EyeOff } from 'lucide-react'

interface PasswordProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  name: string
  placeholder: string
  autoComplete: string
  control: any
  errors: any
}

const PasswordInput = React.forwardRef<HTMLInputElement, PasswordProps>(
  ({ className, type, label, name, placeholder, autoComplete, control, errors, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false)
    const togglePasswordVisibility = () => {
      setShowPassword(!showPassword)
    }

    return (
      <FormItem>
        <FormLabel>{label}</FormLabel>
        <FormControl>
          <Input
            type={showPassword ? 'text' : 'password'}
            placeholder={placeholder}
            {...control.register(name)}
            autoComplete={autoComplete}
            after={
              <button
                type="button"
                onClick={togglePasswordVisibility}
                tabIndex={-1}
                className="focus:outline-none"
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4 text-gray-500" />
                ) : (
                  <Eye className="h-4 w-4 text-gray-500" />
                )}
              </button>
            }
          />
        </FormControl>
        {errors[name] && <FormMessage>{errors[name].message}</FormMessage>}
      </FormItem>
    )
  },
)

PasswordInput.displayName = 'PasswordInput'

export { PasswordInput }
