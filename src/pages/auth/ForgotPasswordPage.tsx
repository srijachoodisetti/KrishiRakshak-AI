import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { Mail, AlertCircle, RefreshCw, CheckCircle2, ArrowLeft } from 'lucide-react'
import { AuthLayout } from '../../components/auth/AuthLayout'
import { sendPasswordResetEmail } from '../../services/authService'
import { useLanguage } from '../../hooks/useLanguage'

export function ForgotPasswordPage() {
  const { t } = useLanguage()

  const [email, setEmail] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError(null)
    setErrorMessage(null)

    const trimmed = email.trim()
    if (!trimmed) {
      setError(t.auth.errRequired)
      return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setError(t.auth.errEmail)
      return
    }

    setIsLoading(true)

    try {
      await sendPasswordResetEmail(trimmed)
      setSuccess(true)
    } catch (err: unknown) {
      const errObj = err as { message?: string }
      setErrorMessage(errObj.message || t.auth.errGeneric)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthLayout title={t.auth.forgotPasswordTitle} subtitle={t.auth.forgotPasswordSubtitle}>
      {errorMessage && (
        <div className="mb-5 flex items-start gap-2.5 rounded-2xl border border-red-200 bg-red-50 p-3.5 text-xs text-red-900">
          <AlertCircle size={18} className="mt-0.5 shrink-0 text-red-600" />
          <p className="leading-relaxed">{errorMessage}</p>
        </div>
      )}

      {success ? (
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50/70 p-5 text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
            <CheckCircle2 size={24} />
          </div>
          <h3 className="text-base font-semibold text-gray-900">{t.auth.resetEmailSent}</h3>
          <p className="mt-1 text-xs text-gray-600 leading-relaxed">
            {email}
          </p>
          <div className="mt-5">
            <Link
              to="/login"
              className="inline-flex items-center gap-2 rounded-xl bg-[#176B45] px-4 py-2.5 text-xs font-semibold text-white shadow-sm transition hover:bg-[#125335]"
            >
              <ArrowLeft size={14} />
              {t.auth.backToLogin}
            </Link>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <div>
            <label htmlFor="reset-email" className="mb-1.5 block text-xs font-semibold text-gray-700">
              {t.auth.email}
            </label>
            <div className="relative">
              <input
                id="reset-email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value)
                  if (error) setError(null)
                }}
                placeholder={t.auth.emailPlaceholder}
                className={`w-full rounded-xl border px-3.5 py-2.5 pl-10 text-xs text-gray-900 transition focus:outline-none focus:ring-2 ${
                  error
                    ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                    : 'border-gray-300 focus:border-[#176B45] focus:ring-[#176B45]/20'
                }`}
              />
              <Mail
                size={16}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
            </div>
            {error && <p className="mt-1 text-[11px] text-red-600">{error}</p>}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#176B45] py-2.5 text-xs font-semibold text-white shadow-sm transition hover:bg-[#125335] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoading ? (
              <>
                <RefreshCw size={14} className="animate-spin" />
                {t.auth.sending}
              </>
            ) : (
              t.auth.sendResetLink
            )}
          </button>

          <div className="text-center pt-2">
            <Link
              to="/login"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#176B45] hover:text-[#125335] transition"
            >
              <ArrowLeft size={14} />
              {t.auth.backToLogin}
            </Link>
          </div>
        </form>
      )}
    </AuthLayout>
  )
}
