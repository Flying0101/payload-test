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
  DropdownMenuShortcut,
} from './dropdown-menu'
import { DropdownMenuItem, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { missingSettings } from '@/lib/userUtils'

function Header() {
  const { user, logout } = useAuth()

  return (
    <header>
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          {/* Logo Section */}
          <Link href="/" className="flex items-center flex-shrink-0">
            <img className="h-20 w-20 mr-2" src="/logo.png" alt="Logo" />
          </Link>

          {/* Buttons Section */}
          <div className="hidden md:flex space-x-4">
            <SignUpButton user={user} />
            <UserMenu user={user} logout={logout} />
            <LoginButton user={user} />
          </div>
        </div>
      </div>
    </header>
  )
}

function UserMenu({ user, logout }: Pick<AuthContext, 'user' | 'logout'>) {
  console.log('rerender header', user)

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
        <DropdownMenuLabel>My Account ({email})</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <Link href={`${id}/daily`}>
            <DropdownMenuItem>
              Daily Horoscope
              <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
            </DropdownMenuItem>
          </Link>
          <DropdownMenuItem>
            Weekly Horoscope
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            Monthly Horoscope
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            Profile
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            Settings
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer" onClick={logout}>
          Log out
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
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
