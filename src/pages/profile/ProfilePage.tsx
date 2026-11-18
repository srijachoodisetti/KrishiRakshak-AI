import { useState, type FormEvent } from 'react'
import {
  User,
  Phone,
  MapPin,
  Mail,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Save,
} from 'lucide-react'
import { DashboardLayout } from '../../components/dashboard/DashboardLayout'
import { useAuth } from '../../hooks/useAuth'
import { useLanguage } from '../../hooks/useLanguage'
import { updateFarmerProfile } from '../../services/authService'

export function ProfilePage() {
  const { user, profile, refreshProfile } = useAuth()
  const { t } = useLanguage()

  const [formData, setFormData] = useState(() => ({
    fullName: profile?.full_name || user?.user_metadata?.full_name || '',
    phone: profile?.phone || '',
    village: profile?.village || '',
    district: profile?.district || '',
    state: profile?.state || ''
  }))

  const [lastLoadedId, setLastLoadedId] = useState<string | null>(null)
  const [errors, setErrors] = useState<{ [k: string]: string | undefined }>({})
  const [successMessage, setSuccessMessage] = useState<string | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [isSaving, setIsSaving] = useState(false)

  // Populate or refresh form data when profile finishes initial async load
  const profileKey = profile ? `${profile.id}-${profile.updated_at || ''}` : user?.id || null
  if (profileKey && profileKey !== lastLoadedId) {
    setLastLoadedId(profileKey)
    setFormData({
      fullName: profile?.full_name || user?.user_metadata?.full_name || '',
      phone: profile?.phone || '',
      village: profile?.village || '',
      district: profile?.district || '',
      state: profile?.state || ''
    })
  }

  const validate = () => {
    const errs: { [k: string]: string } = {}
    if (!formData.fullName.trim()) {
      errs.fullName = t.auth.errRequired
    }

    if (formData.phone.trim()) {
      const cleaned = formData.phone.trim().replace(/^(\+91|91|0)/, '')
      if (!/^[6-9]\d{9}$/.test(cleaned)) {
        errs.phone = t.auth.errPhone
      }
    }

    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setSuccessMessage(null)
    setErrorMessage(null)

    if (!user) return
    if (!validate()) return

    setIsSaving(true)

    try {
      await updateFarmerProfile(user.id, {
        full_name: formData.fullName.trim(),
        phone: formData.phone.trim() || undefined,
        village: formData.village.trim() || undefined,
        district: formData.district.trim() || undefined,
        state: formData.state.trim() || undefined
      })

      await refreshProfile()
      setSuccessMessage(t.profile.saveSuccess)
    } catch (err: unknown) {
      const errObj = err as { message?: string }
      setErrorMessage(errObj.message || t.profile.saveError)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <DashboardLayout activeTab="profile">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
            {t.profile.title}
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-gray-600">
            {t.profile.subtitle}
          </p>
        </div>

        {successMessage && (
          <div className="flex items-start gap-2.5 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-xs text-emerald-900 animate-in fade-in">
            <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-emerald-600" />
            <p className="leading-relaxed font-medium">{successMessage}</p>
          </div>
        )}

        {errorMessage && (
          <div className="flex items-start gap-2.5 rounded-2xl border border-red-200 bg-red-50 p-4 text-xs text-red-900 animate-in fade-in">
            <AlertCircle size={18} className="mt-0.5 shrink-0 text-red-600" />
            <p className="leading-relaxed">{errorMessage}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="rounded-3xl border border-gray-200/80 bg-white p-6 shadow-xs sm:p-8">
            <h2 className="mb-5 text-sm font-bold text-gray-900 flex items-center gap-2">
              <User size={16} className="text-[#176B45]" />
              {t.profile.accountInfo}
            </h2>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {/* Full Name */}
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-gray-700">
                  {t.auth.fullName} *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => {
                      setFormData({ ...formData, fullName: e.target.value })
                      if (errors.fullName) setErrors({ ...errors, fullName: undefined })
                    }}
                    placeholder={t.auth.fullNamePlaceholder}
                    className={`w-full rounded-xl border px-3.5 py-2.5 pl-10 text-xs text-gray-900 transition focus:outline-none focus:ring-2 ${
                      errors.fullName
                        ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                        : 'border-gray-300 focus:border-[#176B45] focus:ring-[#176B45]/20'
                    }`}
                  />
                  <User size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>
                {errors.fullName && <p className="mt-1 text-[11px] text-red-600">{errors.fullName}</p>}
              </div>

              {/* Email Address (Read-only) */}
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-gray-700">
                  {t.auth.email} (Permanent)
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={user?.email || ''}
                    disabled
                    className="w-full rounded-xl border border-gray-200 bg-gray-50/80 px-3.5 py-2.5 pl-10 text-xs text-gray-500 cursor-not-allowed select-none"
                  />
                  <Mail size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>
              </div>

              {/* Phone Number */}
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-gray-700">
                  {t.auth.phone}
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => {
                      setFormData({ ...formData, phone: e.target.value })
                      if (errors.phone) setErrors({ ...errors, phone: undefined })
                    }}
                    placeholder={t.auth.phonePlaceholder}
                    className={`w-full rounded-xl border px-3.5 py-2.5 pl-10 text-xs text-gray-900 transition focus:outline-none focus:ring-2 ${
                      errors.phone
                        ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                        : 'border-gray-300 focus:border-[#176B45] focus:ring-[#176B45]/20'
                    }`}
                  />
                  <Phone size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>
                {errors.phone && <p className="mt-1 text-[11px] text-red-600">{errors.phone}</p>}
              </div>

              {/* Village */}
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-gray-700">
                  {t.auth.village}
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={formData.village}
                    onChange={(e) => setFormData({ ...formData, village: e.target.value })}
                    placeholder={t.auth.villagePlaceholder}
                    className="w-full rounded-xl border border-gray-300 px-3.5 py-2.5 pl-10 text-xs text-gray-900 transition focus:border-[#176B45] focus:outline-none focus:ring-2 focus:ring-[#176B45]/20"
                  />
                  <MapPin size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>
              </div>

              {/* District */}
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-gray-700">
                  {t.auth.district}
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={formData.district}
                    onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                    placeholder={t.auth.districtPlaceholder}
                    className="w-full rounded-xl border border-gray-300 px-3.5 py-2.5 pl-10 text-xs text-gray-900 transition focus:border-[#176B45] focus:outline-none focus:ring-2 focus:ring-[#176B45]/20"
                  />
                  <MapPin size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>
              </div>

              {/* State */}
              <div>
                <label className="mb-1.5 block text-xs font-semibold text-gray-700">
                  {t.auth.state}
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    placeholder={t.auth.statePlaceholder}
                    className="w-full rounded-xl border border-gray-300 px-3.5 py-2.5 pl-10 text-xs text-gray-900 transition focus:border-[#176B45] focus:outline-none focus:ring-2 focus:ring-[#176B45]/20"
                  />
                  <MapPin size={16} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>
              </div>
            </div>

            {/* Save Button */}
            <div className="mt-8 flex justify-end">
              <button
                type="submit"
                disabled={isSaving}
                className="flex items-center gap-2 rounded-xl bg-[#176B45] px-6 py-2.5 text-xs font-semibold text-white shadow-sm transition hover:bg-[#125335] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSaving ? (
                  <>
                    <RefreshCw size={14} className="animate-spin" />
                    {t.profile.saving}
                  </>
                ) : (
                  <>
                    <Save size={14} />
                    {t.profile.saveButton}
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </DashboardLayout>
  )
}
