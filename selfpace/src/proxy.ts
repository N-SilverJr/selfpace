// src/proxy.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function proxy(req: NextRequest) {
  const res = NextResponse.next();

  // Force redirect for any /paths/* when not logged in
  if (req.nextUrl.pathname.startsWith('/paths/')) {
    // Check for session cookie (simple fallback)
    const sessionCookie = req.cookies.get('sb-access-token')?.value;
    if (!sessionCookie) {
      const redirectUrl = new URL('/auth/signin', req.url);
      redirectUrl.searchParams.set('redirect_to', req.nextUrl.pathname);
      return NextResponse.redirect(redirectUrl);
    }
  }

  return res;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',  // Match all except static
    '/paths/:path*',  // Explicit paths matcher
  ],
};