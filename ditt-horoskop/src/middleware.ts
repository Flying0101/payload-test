import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getMe } from './lib/getMe'

// const protectedRoutes = ['/user', '/profile', '/settings']

export async function middleware(request: NextRequest) {
  const url = request.nextUrl.clone()
  // const token = request.cookies.get('payload-token')?.value

  if (url.pathname === '/login') {
    const { user, token } = await getMe()

    if (token) {
      url.pathname = `/user/${user.id}`
      return NextResponse.redirect(url)
    }
  }

  // // Check if the requested path is a protected route
  if (url.pathname.startsWith('/user')) {
    const { user, token } = await getMe()

    const [, , idToAccess] = url.pathname.split('/')

    if (!user) {
      url.pathname = '/login'
      return NextResponse.redirect(url)
    }

    if (String(user.id) !== idToAccess) {
      url.pathname = '/login'
      return NextResponse.redirect(url)
    }
  }

  // If the user is authenticated or the route is not protected, allow the request
  return NextResponse.next()
}

// Specify which paths this middleware should be applied to
export const config = {
  matcher: ['/user/:path*', '/login'],
}
