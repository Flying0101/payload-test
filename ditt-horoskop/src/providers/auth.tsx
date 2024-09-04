'use client'

import React, { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { User } from '@/payload-types'
import { rest } from '@/lib/rest'
import { useRouter } from 'next/navigation'

// Type Definitions
export type ResetPassword = (args: {
  password: string
  passwordConfirm: string
  token: string
}) => Promise<User | null>

export type ForgotPassword = (args: { email: string }) => Promise<User | null>

export type Create = (args: { email: string; password: string }) => Promise<User | null>

export type Login = (args: { email: string; password: string }) => Promise<User | null>

export type Logout = () => Promise<void>

export type Update = (args: Partial<User>) => User | null

export interface AuthContext {
  user?: User | null
  setUser: React.Dispatch<React.SetStateAction<User | null>>
  logout: Logout
  login: Login
  update: Update
  create: Create
  resetPassword: ResetPassword
  forgotPassword: ForgotPassword
}

const Context = createContext<AuthContext | undefined>(undefined)

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const router = useRouter()

  const create = useCallback<Create>(async (args) => {
    const user = await rest(
      `${process.env.NEXT_PUBLIC_CMS_URL || 'http://localhost:3000'}/api/users`,
      args,
    )
    setUser(user)
    return user
  }, [])

  const login = useCallback<Login>(async (args) => {
    const user = await rest(
      `${process.env.NEXT_PUBLIC_CMS_URL || 'http://localhost:3000'}/api/users/login`,
      args,
    )
    setUser(user)
    return user
  }, [])

  const logout = useCallback<Logout>(async () => {
    await rest(`${process.env.NEXT_PUBLIC_CMS_URL || 'http://localhost:3000'}/api/users/logout`)
    setUser(null)
    router.refresh()
  }, [router])

  const update = useCallback<Update>(
    (args) => {
      setUser((prevUser) => (prevUser ? { ...prevUser, ...args } : null))
      return user
    },
    [user],
  )

  useEffect(() => {
    const fetchMe = async () => {
      const user = await rest(
        `${process.env.NEXT_PUBLIC_CMS_URL || 'http://localhost:3000'}/api/users/me`,
        {},
        {
          method: 'GET',
        },
      )
      setUser(user)
    }

    fetchMe()
  }, [])

  const forgotPassword = useCallback<ForgotPassword>(async (args) => {
    const user = await rest(
      `${process.env.NEXT_PUBLIC_CMS_URL || 'http://localhost:3000'}/api/users/forgot-password`,
      args,
    )
    setUser(user)
    return user
  }, [])

  const resetPassword = useCallback<ResetPassword>(async (args) => {
    const user = await rest(
      `${process.env.NEXT_PUBLIC_CMS_URL || 'http://localhost:3000'}/api/users/reset-password`,
      args,
    )
    setUser(user)
    return user
  }, [])

  return (
    <Context.Provider
      value={{
        user,
        setUser,
        login,
        logout,
        update,
        create,
        resetPassword,
        forgotPassword,
      }}
    >
      {children}
    </Context.Provider>
  )
}

export const useAuth = (): AuthContext => {
  const context = useContext(Context)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
