// src/proxy.ts
import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function proxy(req: NextRequest) {
  const res = NextResponse.next()

  // Skip middleware for auth routes to avoid loops
  if (req.nextUrl.pathname.startsWith('/auth/') || req.nextUrl.pathname === '/auth/callback') {
    return res
  }

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return req.cookies.getAll() },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => res.cookies.set(name, value, options))
        },
      },
    }
  )

  const { data: { session } } = await supabase.auth.getSession()

  // Protect /paths/* — redirect if no session
  if (req.nextUrl.pathname.startsWith('/paths/') && !session) {
    const redirectUrl = new URL('/auth/signin', req.url)
    redirectUrl.searchParams.set('redirect_to', req.nextUrl.pathname)
    return NextResponse.redirect(redirectUrl)
  }

  // After login, check if there's a redirect_to and send user there
  if (req.nextUrl.pathname === '/' && session && req.nextUrl.searchParams.has('redirect_to')) {
    const redirectPath = req.nextUrl.searchParams.get('redirect_to')
    if (redirectPath && redirectPath.startsWith('/paths/')) {
      return NextResponse.redirect(new URL(redirectPath, req.url))
    }
  }

  return res
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|api/|auth/).*)',  // Skip static, API, and auth
    '/paths/:path*',  // Explicit paths
  ],
}