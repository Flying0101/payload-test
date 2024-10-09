'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from './form'
import { Input } from './input'
import { Button } from './button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './card'
import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Alert, AlertDescription, AlertTitle } from './alert'
import Link from 'next/link'
import { Eye, EyeOff } from 'lucide-react'
import { rest } from '@/lib/rest'
import { useAuth } from '@/providers/auth'
import { PasswordInput } from './password-input'

const formSchema = z
  .object({
    email: z.string().email({
      message: 'Must be a valid email address.',
    }),
    password: z.string().min(3, {
      message: 'Password must be at least 3 characters.',
    }),
    confirmPassword: z.string().min(3, {
      message: 'Password must be at least 3 characters.',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  })

function SignupForm({ setShowAlert }: { setShowAlert: (value: boolean) => void }) {
  const router = useRouter()
  const { create, login } = useAuth()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setShowAlert(false)

    try {
      const res = await create(values)

      if (res?.id) {
        const loginRes = await login({ email: values.email, password: values.password })

        if (loginRes?.id) {
          router.push(`/user/${loginRes.id}/profile`)
        } else {
          setShowAlert(true)
        }
      }

      // console.log('Account created:', res)
      // if (res?.id) {
      //   router.push(`/user/${res.id}/profile`)
      // }

      // If signup is successful, you might want to automatically log the user in
      // and redirect them to their profile or dashboard
    } catch (error) {
      setShowAlert(true)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Enter your email"
                  {...field}
                  autoComplete="email"
                  before={
                    <svg
                      className="w-4 h-4"
                      width="15"
                      height="15"
                      viewBox="0 0 15 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1 2C0.447715 2 0 2.44772 0 3V12C0 12.5523 0.447715 13 1 13H14C14.5523 13 15 12.5523 15 12V3C15 2.44772 14.5523 2 14 2H1ZM1 3L14 3V3.92494C13.9174 3.92486 13.8338 3.94751 13.7589 3.99505L7.5 7.96703L1.24112 3.99505C1.16621 3.94751 1.0826 3.92486 1 3.92494V3ZM1 4.90797V12H14V4.90797L7.74112 8.87995C7.59394 8.97335 7.40606 8.97335 7.25888 8.87995L1 4.90797Z"
                        fill="currentColor"
                        fillRule="evenodd"
                        clipRule="evenodd"
                      ></path>
                    </svg>
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <PasswordInput
          label="Password *"
          name="password"
          placeholder="Enter your password"
          autoComplete="new-password"
          control={form.control}
          errors={form.formState.errors}
        />
        <PasswordInput
          label="Confirm Password *"
          name="confirmPassword"
          placeholder="Confirm your password"
          autoComplete="new-password"
          control={form.control}
          errors={form.formState.errors}
        />
        <Button type="submit" variant="default" size="full">
          Sign Up
        </Button>
        <p className="text-center">Or sign up with</p>
        <Button variant="outline" size="full">
          <svg
            className="mr-2 h-4 w-4"
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.49998 1L6.92321 2.00307L1.17498 12L0.599976 13H1.7535H13.2464H14.4L13.825 12L8.07674 2.00307L7.49998 1ZM7.49998 3.00613L2.3285 12H12.6714L7.49998 3.00613Z"
              fill="currentColor"
              fillRule="evenodd"
              clipRule="evenodd"
            ></path>
          </svg>
          Vercel
        </Button>
        <Button variant="outline" size="full">
          {' '}
          <svg
            className="mr-2 h-4 w-4"
            width="15"
            height="15"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.49933 0.25C3.49635 0.25 0.25 3.49593 0.25 7.50024C0.25 10.703 2.32715 13.4206 5.2081 14.3797C5.57084 14.446 5.70302 14.2222 5.70302 14.0299C5.70302 13.8576 5.69679 13.4019 5.69323 12.797C3.67661 13.235 3.25112 11.825 3.25112 11.825C2.92132 10.9874 2.44599 10.7644 2.44599 10.7644C1.78773 10.3149 2.49584 10.3238 2.49584 10.3238C3.22353 10.375 3.60629 11.0711 3.60629 11.0711C4.25298 12.1788 5.30335 11.8588 5.71638 11.6732C5.78225 11.205 5.96962 10.8854 6.17658 10.7043C4.56675 10.5209 2.87415 9.89918 2.87415 7.12104C2.87415 6.32925 3.15677 5.68257 3.62053 5.17563C3.54576 4.99226 3.29697 4.25521 3.69174 3.25691C3.69174 3.25691 4.30015 3.06196 5.68522 3.99973C6.26337 3.83906 6.8838 3.75895 7.50022 3.75583C8.1162 3.75895 8.73619 3.83906 9.31523 3.99973C10.6994 3.06196 11.3069 3.25691 11.3069 3.25691C11.7026 4.25521 11.4538 4.99226 11.3795 5.17563C11.8441 5.68257 12.1245 6.32925 12.1245 7.12104C12.1245 9.9063 10.4292 10.5192 8.81452 10.6985C9.07444 10.9224 9.30633 11.3648 9.30633 12.0413C9.30633 13.0102 9.29742 13.7922 9.29742 14.0299C9.29742 14.2239 9.42828 14.4496 9.79591 14.3788C12.6746 13.4179 14.75 10.7025 14.75 7.50024C14.75 3.49593 11.5036 0.25 7.49933 0.25Z"
              fill="currentColor"
              fillRule="evenodd"
              clipRule="evenodd"
            ></path>
          </svg>
          GitHub
        </Button>
      </form>
    </Form>
  )
}

type CardProps = React.ComponentProps<typeof Card>

export function SignupCard({ className, ...props }: CardProps) {
  const [showAlert, setShowAlert] = useState(false)

  return (
    <Card className={cn('w-96 border-none bg-background shadow-none', className)} {...props}>
      <CardHeader className="flex items-center">
        <CardTitle className="text-4xl text-title">Create an Account</CardTitle>
        <CardDescription className="text-2xl text-current text-title">
          Join us on this exciting journey
        </CardDescription>
      </CardHeader>
      <CardContent>
        {showAlert && (
          <Alert className="bg-destructive text-secondary">
            <AlertTitle>Could not sign up!</AlertTitle>
            <AlertDescription>
              Please try again or use a different email address.
              <br />
              <Link href="/login">Already have an account? Log in</Link>
            </AlertDescription>
          </Alert>
        )}
        <SignupForm setShowAlert={setShowAlert} />
      </CardContent>
    </Card>
  )
}
