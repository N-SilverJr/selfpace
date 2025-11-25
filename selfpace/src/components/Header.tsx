import Link from 'next/link'
import { createClient } from '@/lib/supabase-server'

export default async function Header() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex">
          <Link className="mr-6 flex items-center space-x-2" href="/">
            <span className="font-bold">SelfPace</span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-sm">
                  Hello, {user.email?.split('@')[0]}
                </span>
                <form action="/auth/signout" method="post">
                  <button
                    type="submit"
                    className="text-sm text-gray-600 hover:text-gray-900"
                  >
                    Sign Out
                  </button>
                </form>
              </div>
            ) : (
              <>
                <Link
                  href="/auth/signin"
                  className="text-sm font-medium text-gray-600 hover:text-gray-900"
                >
                  Sign In
                </Link>
                <Link
                  href="/auth/signup"
                  className="text-sm font-medium text-gray-600 hover:text-gray-900"
                >
                  Sign Up
                </Link>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  )
}