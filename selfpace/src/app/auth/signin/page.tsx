// src/app/auth/signin/page.tsx
import AuthForm from '@/components/AuthForm'

export default function SignInPage({
  searchParams,
}: {
  searchParams: { redirect_to?: string }
}) {
  const redirectTo = searchParams.redirect_to || '/'

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-gray-950 dark:to-black flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">Welcome Back</h1>
          <p className="text-gray-600 dark:text-gray-400">Sign in to continue your learning journey</p>
        </div>
        <AuthForm defaultMode="signin" redirectTo={redirectTo} />
      </div>
    </div>
  )
}