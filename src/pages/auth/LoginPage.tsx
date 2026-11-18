import { useState, type FormEvent } from 'react'
import { Link, useNavigate, useLocation, Navigate } from 'react-router-dom'
import { LogIn, AlertCircle, RefreshCw, CheckCircle2 } from 'lucide-react'
import { AuthLayout } from '../../components/auth/AuthLayout'
import { PasswordInput } from '../../components/auth/PasswordInput'
import { loginFarmer } from '../../services/authService'
import { useAuth } from '../../hooks/useAuth'
import { useLanguage } from '../../hooks/useLanguage'

export function LoginPage() {
  const { user } = useAuth()
  const { t } = useLanguage()
  const navigate = useNavigate()
  const location = useLocation()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(true)
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({})
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  // Message passed from registration (e.g. email verification notice)
  const successNotice = location.state?.message as string | undefined

  // If already authenticated, redirect to dashboard or intended route
  if (user) {
    const from = (location.state as { from?: { pathname: string } })?.from?.pathname || '/dashboard'
    return <Navigate to={from} replace />
  }

  const validate = () => {
    const errs: { email?: string; password?: string } = {}
    if (!email.trim()) {
      errs.email = t.auth.errRequired
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      errs.email = t.auth.errEmail
    }

    if (!password) {
      errs.password = t.auth.errRequired
    }

    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setErrorMessage(null)

    if (!validate()) return

    setIsLoading(true)

    try {
      await loginFarmer({ email, password, rememberMe })
      const from = (location.state as { from?: { pathname: string } })?.from?.pathname || '/dashboard'
      navigate(from, { replace: true })
    } catch (err: unknown) {
      setIsLoading(false)
      const errObj = err as { message?: string }
      if (errObj.message?.includes('Invalid login credentials')) {
        setErrorMessage(t.auth.errGeneric)
      } else if (errObj.message?.includes('Email not confirmed')) {
        setErrorMessage(t.auth.regSuccessVerification)
      } else {
        setErrorMessage(errObj.message || t.auth.errGeneric)
      }
    }
  }

  return (
    <AuthLayout title={t.auth.loginTitle} subtitle={t.auth.loginSubtitle}>
      {successNotice && (
        <div className="mb-5 flex items-start gap-2.5 rounded-2xl border border-emerald-200 bg-emerald-50 p-3.5 text-xs text-emerald-900">
          <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-emerald-600" />
          <p className="leading-relaxed">{successNotice}</p>
        </div>
      )}

      {errorMessage && (
        <div className="mb-5 flex items-start gap-2.5 rounded-2xl border border-red-200 bg-red-50 p-3.5 text-xs text-red-900">
          <AlertCircle size={18} className="mt-0.5 shrink-0 text-red-600" />
          <p className="leading-relaxed">{errorMessage}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        {/* Email */}
        <div>
          <label htmlFor="login-email" className="mb-1.5 block text-xs font-semibold text-gray-700">
            {t.auth.email}
          </label>
          <input
            id="login-email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t.auth.emailPlaceholder}
            className={`w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-sm text-[#24332A] placeholder-gray-400 transition focus:border-forest focus:outline-none focus:ring-2 focus:ring-forest/20 ${
              errors.email ? 'border-red-400 focus:border-red-500 focus:ring-red-200' : ''
            }`}
          />
          {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
        </div>

        {/* Password */}
        <div>
          <PasswordInput
            id="login-password"
            label={t.auth.password}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={t.auth.passwordPlaceholder}
            autoComplete="current-password"
            error={errors.password}
          />
        </div>

        {/* Remember me & Forgot password */}
        <div className="flex items-center justify-between text-xs">
          <label className="flex cursor-pointer items-center gap-2 text-gray-600">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="h-4 w-4 rounded border-gray-300 text-forest focus:ring-forest"
            />
            <span>{t.auth.rememberMe}</span>
          </label>

          <Link
            to="/forgot-password"
            className="font-semibold text-forest transition hover:underline"
          >
            {t.auth.forgotPasswordLink}
          </Link>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="mt-2 flex w-full items-center justify-center gap-2 rounded-xl bg-forest py-3.5 text-sm font-semibold text-white shadow-md transition hover:bg-leaf disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isLoading ? (
            <>
              <RefreshCw size={17} className="animate-spin" />
              <span>{t.auth.signingIn}</span>
            </>
          ) : (
            <>
              <LogIn size={17} />
              <span>{t.auth.loginButton}</span>
            </>
          )}
        </button>
      </form>

      {/* Footer link to Register */}
      <div className="mt-6 border-t border-[#E5EAE2] pt-4 text-center text-xs text-gray-600">
        <span>{t.auth.noAccount} </span>
        <Link to="/register" className="font-bold text-forest transition hover:underline">
          {t.auth.registerNow}
        </Link>
      </div>
    </AuthLayout>
  )
}
