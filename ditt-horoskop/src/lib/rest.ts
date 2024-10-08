import { User } from '@/payload-types'

export const rest = async (
  url: string,
  args?: any,
  options?: RequestInit,
): Promise<User | null> => {
  const method = options?.method || 'POST'

  try {
    const res = await fetch(url, {
      method,
      ...(method === 'POST' || method === 'PATCH' ? { body: JSON.stringify(args) } : {}),
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      ...options,
    })

    const { errors, user, ...data } = await res.json()

    if (errors) {
      throw new Error(errors[0].message)
    }

    if (res.ok) {
      return user || data.doc || null
    }

    return null
  } catch (e: unknown) {
    throw new Error(e as string)
  }
}
