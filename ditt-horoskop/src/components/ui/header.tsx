'use client'

import { AuthContext, useAuth } from '@/providers/auth'
import { Avatar, AvatarFallback, AvatarImage } from './avatar'
import { Button, buttonVariants } from './button'
import { User } from '@/payload-types'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from './dropdown-menu'
import { DropdownMenuItem, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu'
import Link from 'next/link'
import { missingSettings } from '@/lib/userUtils'
import Image from 'next/image'
import { MoonIcon, SunIcon } from 'lucide-react'
import { useTheme } from 'next-themes'

function Header() {
  const { user, logout } = useAuth()

  return (
    <header className="w-full mx-auto p-2 sm:p-4 flex justify-between items-center">
      {/* Logo Section */}
      <Link href="/" className="flex items-center flex-shrink-0">
        <Image className="h-12 w-12 mr-2" src="/logo.png" alt="Logo" width={100} height={100} />
      </Link>

      {/* Buttons Section */}
      <div className="flex md:flex space-x-4">
        <SignUpButton user={user} />
        <UserMenu user={user} logout={logout} />
        <LoginButton user={user} />
        <span className="hidden md:flex">
          <ModeToggle />
        </span>
      </div>
    </header>
  )
}

function UserMenu({ user, logout }: Pick<AuthContext, 'user' | 'logout'>) {
  if (!user?.email) return null
  if (missingSettings(user)) return null

  const { name, email, id } = user

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="cursor-pointer">
        <Avatar>
          <AvatarImage src="llogo.png" />
          <AvatarFallback>{name!.at(0)}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>{name}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link href={`/user/${id}`}>
            <DropdownMenuItem>Your Daily Horoscope</DropdownMenuItem>
          </Link>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Link href={`/user/${id}/profile`}>Profile</Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer" onClick={logout}>
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function LoginButton({ user }: { user: User | null | undefined }) {
  if (user?.email) return null

  return (
    <Link href="/login" className={buttonVariants({ variant: 'default' })}>
      Log in
    </Link>
  )
}

function SignUpButton({ user }: { user: User | null | undefined }) {
  if (user?.email) return null

  return (
    <Link href="/signup" className={buttonVariants({ variant: 'default' })}>
      Sign up
    </Link>
  )
}

export default Header

export function ModeToggle() {
  const { setTheme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme('light')}>Light</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('dark')}>Dark</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme('system')}>System</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
