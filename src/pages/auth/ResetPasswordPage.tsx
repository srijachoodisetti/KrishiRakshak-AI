import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AlertCircle, RefreshCw, CheckCircle2, ArrowRight } from 'lucide-react'
import { AuthLayout } from '../../components/auth/AuthLayout'
import { PasswordInput } from '../../components/auth/PasswordInput'
import { updateFarmerPassword } from '../../services/authService'
import { useLanguage } from '../../hooks/useLanguage'

export function ResetPasswordPage() {
  const { t } = useLanguage()
  const navigate = useNavigate()

  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errors, setErrors] = useState<{ password?: string; confirmPassword?: string }>({})
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const validate = () => {
    const errs: { password?: string; confirmPassword?: string } = {}
    if (!password) {
      errs.password = t.auth.errRequired
    } else if (password.length < 6) {
      errs.password = t.auth.errPasswordMin
    }

    if (!confirmPassword) {
      errs.confirmPassword = t.auth.errRequired
    } else if (password !== confirmPassword) {
      errs.confirmPassword = t.auth.errPasswordMatch
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
      await updateFarmerPassword(password)
      setSuccess(true)
      setTimeout(() => {
        navigate('/login', { replace: true })
      }, 2500)
    } catch (err: unknown) {
      const errObj = err as { message?: string }
      setErrorMessage(errObj.message || t.auth.errGeneric)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AuthLayout title={t.auth.resetPasswordTitle} subtitle={t.auth.resetPasswordSubtitle}>
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
          <h3 className="text-base font-semibold text-gray-900">{t.auth.passwordResetSuccess}</h3>
          <div className="mt-5">
            <Link
              to="/login"
              className="inline-flex items-center gap-2 rounded-xl bg-[#176B45] px-4 py-2.5 text-xs font-semibold text-white shadow-sm transition hover:bg-[#125335]"
            >
              {t.auth.loginNow}
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <div>
            <PasswordInput
              id="new-password"
              label={t.auth.newPassword}
              placeholder={t.auth.newPasswordPlaceholder}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
                if (errors.password) setErrors((prev) => ({ ...prev, password: undefined }))
              }}
              error={errors.password}
            />
          </div>

          <div>
            <PasswordInput
              id="confirm-new-password"
              label={t.auth.confirmPassword}
              placeholder={t.auth.confirmPasswordPlaceholder}
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value)
                if (errors.confirmPassword) setErrors((prev) => ({ ...prev, confirmPassword: undefined }))
              }}
              error={errors.confirmPassword}
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#176B45] py-2.5 text-xs font-semibold text-white shadow-sm transition hover:bg-[#125335] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoading ? (
              <>
                <RefreshCw size={14} className="animate-spin" />
                {t.auth.updating}
              </>
            ) : (
              t.auth.updatePasswordButton
            )}
          </button>
        </form>
      )}
    </AuthLayout>
  )
}
