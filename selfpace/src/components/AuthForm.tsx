'use client'

import { useState } from 'react'
import { createBrowserSupabaseClient } from '@/lib/supabase-client'

type AuthMode = 'signin' | 'signup' | 'forgot'

interface AuthFormProps {
  defaultMode?: AuthMode
}

export default function AuthForm({ defaultMode = 'signin' }: AuthFormProps) {
  const [mode, setMode] = useState<AuthMode>(defaultMode)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null)
  
  const supabase = createBrowserSupabaseClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)

    try {
      if (mode === 'signup') {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${location.origin}/auth/callback`,
          },
        })
        if (error) throw error
        setMessage({
          type: 'success',
          text: 'Check your email for the confirmation link!',
        })
      } else if (mode === 'signin') {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        })
        if (error) throw error
        // Redirect will happen automatically
        window.location.href = '/'
      } else if (mode === 'forgot') {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${location.origin}/auth/reset-password`,
        })
        if (error) throw error
        setMessage({
          type: 'success',
          text: 'Check your email for the password reset link!',
        })
      }
    } catch (error: any) {
      setMessage({
        type: 'error',
        text: error.message,
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full max-w-md mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200">
        <h2 className="text-2xl font-bold text-center mb-6">
          {mode === 'signin' && 'Sign In'}
          {mode === 'signup' && 'Create Account'}
          {mode === 'forgot' && 'Reset Password'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="your@email.com"
            />
          </div>

          {mode !== 'forgot' && (
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="••••••••"
                minLength={6}
              />
            </div>
          )}

          {message && (
            <div
              className={`p-3 rounded-md ${
                message.type === 'success'
                  ? 'bg-green-50 text-green-800 border border-green-200'
                  : 'bg-red-50 text-red-800 border border-red-200'
              }`}
            >
              {message.text}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Loading...' : 
             mode === 'signin' ? 'Sign In' :
             mode === 'signup' ? 'Create Account' : 'Send Reset Link'}
          </button>
        </form>

        <div className="mt-6 text-center space-y-2">
          {mode === 'signin' && (
            <>
              <button
                onClick={() => setMode('forgot')}
                className="block text-sm text-blue-600 hover:text-blue-800"
              >
                Forgot your password?
              </button>
              <button
                onClick={() => setMode('signup')}
                className="block text-sm text-gray-600 hover:text-gray-800"
              >
                Don't have an account? Sign up
              </button>
            </>
          )}

          {mode === 'signup' && (
            <button
              onClick={() => setMode('signin')}
              className="block text-sm text-gray-600 hover:text-gray-800"
            >
              Already have an account? Sign in
            </button>
          )}

          {mode === 'forgot' && (
            <button
              onClick={() => setMode('signin')}
              className="block text-sm text-gray-600 hover:text-gray-800"
            >
              Back to sign in
            </button>
          )}
        </div>
      </div>
    </div>
  )
}