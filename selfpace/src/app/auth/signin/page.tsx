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
      <AuthForm defaultMode="signin" redirectTo={redirectTo} />
    </div>
  )
}