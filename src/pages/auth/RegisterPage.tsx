import { useState, type FormEvent } from 'react'
import { Link, useNavigate, Navigate } from 'react-router-dom'
import { UserPlus, AlertCircle, RefreshCw, CheckCircle2 } from 'lucide-react'
import { AuthLayout } from '../../components/auth/AuthLayout'
import { PasswordInput } from '../../components/auth/PasswordInput'
import { registerFarmer, resendVerificationEmail } from '../../services/authService'
import { useAuth } from '../../hooks/useAuth'
import { useLanguage } from '../../hooks/useLanguage'
import type { RegistrationFormData } from '../../types/auth'

export function RegisterPage() {
  const { user } = useAuth()
  const { t } = useLanguage()
  const navigate = useNavigate()

  const [formData, setFormData] = useState<RegistrationFormData>({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    village: '',
    district: '',
    state: 'Andhra Pradesh',
  })

  const [errors, setErrors] = useState<Partial<Record<keyof RegistrationFormData, string>>>({})
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [successVerification, setSuccessVerification] = useState<string | null>(null)
  const [registeredEmail, setRegisteredEmail] = useState<string>('')
  const [resendStatus, setResendStatus] = useState<string | null>(null)
  const [isResending, setIsResending] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // Redirect if already authenticated
  if (user) {
    return <Navigate to="/dashboard" replace />
  }

  const validate = () => {
    const errs: Partial<Record<keyof RegistrationFormData, string>> = {}

    if (!formData.fullName.trim()) {
      errs.fullName = t.auth.errRequired
    }

    if (!formData.email.trim()) {
      errs.email = t.auth.errRequired
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = t.auth.errEmail
    }

    const cleanPhone = formData.phone.trim().replace(/\D/g, '')
    if (!cleanPhone) {
      errs.phone = t.auth.errRequired
    } else if (!/^[6-9]\d{9}$/.test(cleanPhone)) {
      errs.phone = t.auth.errPhone
    }

    if (!formData.password) {
      errs.password = t.auth.errRequired
    } else if (formData.password.length < 6) {
      errs.password = t.auth.errPasswordMin
    }

    if (!formData.confirmPassword) {
      errs.confirmPassword = t.auth.errRequired
    } else if (formData.confirmPassword !== formData.password) {
      errs.confirmPassword = t.auth.errPasswordMatch
    }

    if (!formData.village.trim()) {
      errs.village = t.auth.errRequired
    }

    if (!formData.district.trim()) {
      errs.district = t.auth.errRequired
    }

    if (!formData.state.trim()) {
      errs.state = t.auth.errRequired
    }

    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setErrorMessage(null)
    setSuccessVerification(null)

    if (!validate()) return

    setIsLoading(true)

    try {
      const result = await registerFarmer(formData)
      setIsLoading(false)

      if (result.needsEmailVerification) {
        setRegisteredEmail(formData.email.trim())
        setSuccessVerification(t.auth.regSuccessVerification)
      } else {
        // Direct session created, navigate to dashboard
        navigate('/dashboard', { replace: true })
      }
    } catch (err: unknown) {
      setIsLoading(false)
      const errObj = err as { message?: string }
      if (errObj.message?.includes('User already registered')) {
        setErrorMessage('A user with this email address is already registered. Please sign in instead.')
      } else {
        setErrorMessage(errObj.message || t.auth.errGeneric)
      }
    }
  }

  return (
    <AuthLayout title={t.auth.registerTitle} subtitle={t.auth.registerSubtitle}>
      {successVerification ? (
        <div className="space-y-5 py-2 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600">
            <CheckCircle2 size={32} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-emerald-900">Registration Received!</h3>
            <p className="mt-2 text-xs leading-relaxed text-emerald-800">
              {successVerification}
            </p>
            {registeredEmail && (
              <p className="mt-2 text-xs font-semibold text-gray-700">
                Verification link sent to: <span className="text-[#176B45]">{registeredEmail}</span>
              </p>
            )}
          </div>

          {resendStatus && (
            <p className="text-xs text-[#176B45] font-medium bg-emerald-50 py-1.5 px-3 rounded-lg border border-emerald-200">
              {resendStatus}
            </p>
          )}

          <div className="flex flex-col gap-2 pt-2">
            <Link
              to="/login"
              className="inline-flex w-full items-center justify-center rounded-xl bg-forest py-3 text-sm font-semibold text-white transition hover:bg-leaf shadow-sm"
            >
              {t.auth.loginButton}
            </Link>

            {registeredEmail && (
              <button
                type="button"
                disabled={isResending}
                onClick={async () => {
                  try {
                    setIsResending(true)
                    setResendStatus(null)
                    await resendVerificationEmail(registeredEmail)
                    setResendStatus('Verification email resent! Please check your inbox.')
                  } catch (err: unknown) {
                    const errObj = err as { message?: string }
                    setResendStatus(errObj.message || 'Failed to resend email. Please try again shortly.')
                  } finally {
                    setIsResending(false)
                  }
                }}
                className="inline-flex w-full items-center justify-center gap-1.5 rounded-xl border border-gray-300 bg-white py-2.5 text-xs font-semibold text-gray-700 transition hover:bg-gray-50"
              >
                {isResending ? (
                  <>
                    <RefreshCw size={13} className="animate-spin" />
                    <span>Resending...</span>
                  </>
                ) : (
                  <span>Resend Verification Email</span>
                )}
              </button>
            )}
          </div>
        </div>
      ) : (
        <>
          {errorMessage && (
            <div className="mb-5 flex items-start gap-2.5 rounded-2xl border border-red-200 bg-red-50 p-3.5 text-xs text-red-900">
              <AlertCircle size={18} className="mt-0.5 shrink-0 text-red-600" />
              <p className="leading-relaxed">{errorMessage}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            {/* Full Name */}
            <div>
              <label htmlFor="reg-name" className="mb-1.5 block text-xs font-semibold text-gray-700">
                {t.auth.fullName} *
              </label>
              <input
                id="reg-name"
                type="text"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                placeholder={t.auth.fullNamePlaceholder}
                className={`w-full rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm text-[#24332A] placeholder-gray-400 transition focus:border-forest focus:outline-none focus:ring-2 focus:ring-forest/20 ${
                  errors.fullName ? 'border-red-400' : ''
                }`}
              />
              {errors.fullName && <p className="mt-1 text-xs text-red-600">{errors.fullName}</p>}
            </div>

            {/* Email & Phone Grid */}
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label htmlFor="reg-email" className="mb-1.5 block text-xs font-semibold text-gray-700">
                  {t.auth.email} *
                </label>
                <input
                  id="reg-email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder={t.auth.emailPlaceholder}
                  className={`w-full rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm text-[#24332A] placeholder-gray-400 transition focus:border-forest focus:outline-none focus:ring-2 focus:ring-forest/20 ${
                    errors.email ? 'border-red-400' : ''
                  }`}
                />
                {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="reg-phone" className="mb-1.5 block text-xs font-semibold text-gray-700">
                  {t.auth.phone} *
                </label>
                <input
                  id="reg-phone"
                  type="tel"
                  maxLength={10}
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value.replace(/\D/g, '') })}
                  placeholder={t.auth.phonePlaceholder}
                  className={`w-full rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm text-[#24332A] placeholder-gray-400 transition focus:border-forest focus:outline-none focus:ring-2 focus:ring-forest/20 ${
                    errors.phone ? 'border-red-400' : ''
                  }`}
                />
                {errors.phone && <p className="mt-1 text-xs text-red-600">{errors.phone}</p>}
              </div>
            </div>

            {/* Password & Confirm Password Grid */}
            <div className="grid gap-3 sm:grid-cols-2">
              <PasswordInput
                id="reg-pass"
                label={`${t.auth.password} *`}
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder={t.auth.passwordPlaceholder}
                error={errors.password}
              />

              <PasswordInput
                id="reg-confirm"
                label={`${t.auth.confirmPassword} *`}
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                placeholder={t.auth.confirmPasswordPlaceholder}
                error={errors.confirmPassword}
              />
            </div>

            {/* Location Fields: Village, District, State */}
            <div className="grid gap-3 sm:grid-cols-3">
              <div>
                <label htmlFor="reg-village" className="mb-1.5 block text-xs font-semibold text-gray-700">
                  {t.auth.village} *
                </label>
                <input
                  id="reg-village"
                  type="text"
                  value={formData.village}
                  onChange={(e) => setFormData({ ...formData, village: e.target.value })}
                  placeholder={t.auth.villagePlaceholder}
                  className={`w-full rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-sm text-[#24332A] placeholder-gray-400 transition focus:border-forest focus:outline-none focus:ring-2 focus:ring-forest/20 ${
                    errors.village ? 'border-red-400' : ''
                  }`}
                />
                {errors.village && <p className="mt-1 text-xs text-red-600">{errors.village}</p>}
              </div>

              <div>
                <label htmlFor="reg-district" className="mb-1.5 block text-xs font-semibold text-gray-700">
                  {t.auth.district} *
                </label>
                <input
                  id="reg-district"
                  type="text"
                  value={formData.district}
                  onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                  placeholder={t.auth.districtPlaceholder}
                  className={`w-full rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-sm text-[#24332A] placeholder-gray-400 transition focus:border-forest focus:outline-none focus:ring-2 focus:ring-forest/20 ${
                    errors.district ? 'border-red-400' : ''
                  }`}
                />
                {errors.district && <p className="mt-1 text-xs text-red-600">{errors.district}</p>}
              </div>

              <div>
                <label htmlFor="reg-state" className="mb-1.5 block text-xs font-semibold text-gray-700">
                  {t.auth.state} *
                </label>
                <input
                  id="reg-state"
                  type="text"
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  placeholder={t.auth.statePlaceholder}
                  className={`w-full rounded-xl border border-gray-300 bg-white px-3 py-2.5 text-sm text-[#24332A] placeholder-gray-400 transition focus:border-forest focus:outline-none focus:ring-2 focus:ring-forest/20 ${
                    errors.state ? 'border-red-400' : ''
                  }`}
                />
                {errors.state && <p className="mt-1 text-xs text-red-600">{errors.state}</p>}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl bg-forest py-3.5 text-sm font-semibold text-white shadow-md transition hover:bg-leaf disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoading ? (
                <>
                  <RefreshCw size={17} className="animate-spin" />
                  <span>{t.auth.registering}</span>
                </>
              ) : (
                <>
                  <UserPlus size={17} />
                  <span>{t.auth.registerButton}</span>
                </>
              )}
            </button>
          </form>

          {/* Footer link to Login */}
          <div className="mt-6 border-t border-[#E5EAE2] pt-4 text-center text-xs text-gray-600">
            <span>{t.auth.haveAccount} </span>
            <Link to="/login" className="font-bold text-forest transition hover:underline">
              {t.auth.loginNow}
            </Link>
          </div>
        </>
      )}
    </AuthLayout>
  )
}
