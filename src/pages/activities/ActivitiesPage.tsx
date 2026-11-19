import { useState, useEffect, useCallback, type FormEvent } from 'react'
import {
  ClipboardList,
  Plus,
  Trash2,
  Save,
  X,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Calendar,
  Droplets,
  Sparkles,
  Layers
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { DashboardLayout } from '../../components/dashboard/DashboardLayout'
import { useAuth } from '../../hooks/useAuth'
import { useLanguage } from '../../hooks/useLanguage'
import { fetchFarmerFarms } from '../../services/farmService'
import { fetchFarmerCrops } from '../../services/cropService'
import {
  fetchFarmerActivities,
  createFarmActivity,
  deleteFarmActivity,
} from '../../services/activityService'
import { localizeActivityType, localizeCropName } from '../../utils/cropTranslations'
import type { Farm } from '../../types/farm'
import type { Crop } from '../../types/crop'
import type { FarmActivity, FarmActivityFormData, FarmActivityType } from '../../types/activity'

const ACTIVITY_TYPES: FarmActivityType[] = [
  'Irrigation',
  'Fertilizer application',
  'Pesticide application',
  'Sowing',
  'Weeding',
  'Harvesting',
  'Other',
]

export function ActivitiesPage() {
  const { user } = useAuth()
  const { t, language } = useLanguage()

  const [farms, setFarms] = useState<Farm[]>([])
  const [crops, setCrops] = useState<Crop[]>([])
  const [activities, setActivities] = useState<FarmActivity[]>([])
  const [loading, setLoading] = useState(true)
  const [fetchError, setFetchError] = useState<string | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null)

  const initialFormData: FarmActivityFormData = {
    farm_id: '',
    crop_id: '',
    activity_type: 'Irrigation',
    activity_date: new Date().toISOString().split('T')[0],
    description: '',
    notes: '',
  }

  const [formData, setFormData] = useState<FarmActivityFormData>(initialFormData)
  const [formErrors, setFormErrors] = useState<{ [k: string]: string }>({})

  const loadData = useCallback(async () => {
    if (!user) return
    setLoading(true)
    setFetchError(null)
    try {
      const [farmList, cropList, activityList] = await Promise.all([
        fetchFarmerFarms(user.id),
        fetchFarmerCrops(user.id),
        fetchFarmerActivities(user.id),
      ])
      setFarms(farmList)
      setCrops(cropList)
      setActivities(activityList)
      if (farmList.length > 0) {
        setFormData((prev) => ({
          ...prev,
          farm_id: prev.farm_id && farmList.some((f) => f.id === prev.farm_id) ? prev.farm_id : farmList[0].id,
        }))
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to load farm activities data.'
      setFetchError(msg)
      if (import.meta.env.DEV) {
        console.error('[ActivitiesPage loadData error]', err)
      }
    } finally {
      setLoading(false)
    }
  }, [user])

  useEffect(() => {
    let isMounted = true
    if (!user) return

    Promise.all([
      fetchFarmerFarms(user.id),
      fetchFarmerCrops(user.id),
      fetchFarmerActivities(user.id),
    ])
      .then(([farmList, cropList, activityList]) => {
        if (!isMounted) return
        setFarms(farmList)
        setCrops(cropList)
        setActivities(activityList)
        if (farmList.length > 0) {
          setFormData((prev) => ({
            ...prev,
            farm_id: prev.farm_id && farmList.some((f) => f.id === prev.farm_id) ? prev.farm_id : farmList[0].id,
          }))
        }
      })
      .catch((err: unknown) => {
        if (!isMounted) return
        const msg = err instanceof Error ? err.message : 'Failed to load farm activities data.'
        setFetchError(msg)
        if (import.meta.env.DEV) {
          console.error('[ActivitiesPage initial load error]', err)
        }
      })
      .finally(() => {
        if (isMounted) setLoading(false)
      })

    return () => {
      isMounted = false
    }
  }, [user])

  const openAddModal = () => {
    setFormData({
      ...initialFormData,
      farm_id: farms[0]?.id || '',
    })
    setFormErrors({})
    setShowModal(true)
  }

  const validate = () => {
    const errs: { [k: string]: string } = {}
    if (!formData.farm_id) errs.farm_id = 'Please select a registered farm.'
    if (!formData.description.trim()) errs.description = t.auth.errRequired
    setFormErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!user || !validate()) return

    setIsSubmitting(true)
    setFeedback(null)

    try {
      await createFarmActivity(user.id, formData)
      setFeedback({ type: 'success', message: t.activities.saveSuccess })
      setShowModal(false)
      await loadData()
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to save activity.'
      setFeedback({ type: 'error', message: msg })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async (id: string) => {
    try {
      await deleteFarmActivity(id)
      setFeedback({ type: 'success', message: t.activities.deleteSuccess })
      await loadData()
    } catch {
      setFeedback({ type: 'error', message: 'Failed to delete activity.' })
    }
  }

  const getFarmName = (farmId: string) => {
    const f = farms.find((x) => x.id === farmId)
    return f ? f.farm_name : 'Farm'
  }

  const getCropName = (cropId?: string | null) => {
    if (!cropId) return null
    const c = crops.find((x) => x.id === cropId)
    return c ? c.crop_name : null
  }

  const getActivityIcon = (type: string) => {
    if (type.includes('Irrigation')) return Droplets
    if (type.includes('Fertilizer') || type.includes('Pesticide')) return Sparkles
    return Layers
  }

  return (
    <DashboardLayout activeTab="activities">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">
              {t.activities.title}
            </h1>
            <p className="text-xs sm:text-sm text-gray-600 mt-1">{t.activities.subtitle}</p>
          </div>

          <button
            onClick={openAddModal}
            disabled={farms.length === 0}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#176B45] text-white text-xs font-semibold hover:bg-[#125335] shadow-sm transition disabled:opacity-50 self-start sm:self-auto"
          >
            <Plus size={16} />
            <span>{t.activities.logActivity}</span>
          </button>
        </div>

        {/* Feedback alert */}
        {feedback && (
          <div
            className={`p-4 rounded-2xl border text-xs flex items-center justify-between gap-3 animate-in fade-in ${
              feedback.type === 'success'
                ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                : 'bg-red-50 border-red-200 text-red-900'
            }`}
          >
            <div className="flex items-center gap-2.5">
              {feedback.type === 'success' ? (
                <CheckCircle2 size={18} className="text-emerald-600 shrink-0" />
              ) : (
                <AlertCircle size={18} className="text-red-600 shrink-0" />
              )}
              <span>{feedback.message}</span>
            </div>
            <button
              onClick={() => setFeedback(null)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X size={15} />
            </button>
          </div>
        )}

        {/* Error banner if fetching failed */}
        {fetchError && !loading && (
          <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-xs text-red-900 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <AlertCircle size={18} className="text-red-600 shrink-0" />
              <span>{fetchError}</span>
            </div>
            <button
              onClick={() => loadData()}
              className="px-3 py-1.5 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 transition shrink-0 inline-flex items-center gap-1.5"
            >
              <RefreshCw size={13} />
              <span>{language === 'te' ? 'మళ్లీ ప్రయత్నించండి' : language === 'hi' ? 'पुनः प्रयास करें' : 'Retry'}</span>
            </button>
          </div>
        )}

        {/* Notice if no farms */}
        {farms.length === 0 && !loading && !fetchError && (
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <AlertCircle size={18} className="text-amber-600 shrink-0" />
              <span>
                {language === 'te'
                  ? 'వ్యవసాయ పనులను నమోదు చేయడానికి ముందు మీరు ఒక పొలాన్ని నమోదు చేయాలి.'
                  : language === 'hi'
                  ? 'खेत गतिविधियों को दर्ज करने से पहले आपको एक खेत पंजीकृत करना होगा।'
                  : 'Register a farm first to begin logging agricultural operations.'}
              </span>
            </div>
            <Link
              to="/farm"
              className="px-3 py-1.5 rounded-lg bg-amber-600 text-white font-semibold hover:bg-amber-700 transition"
            >
              {t.dashboard.registerFirstFarm}
            </Link>
          </div>
        )}

        {/* Content */}
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center text-center">
            <RefreshCw size={26} className="animate-spin text-[#176B45]" />
            <p className="mt-3 text-xs text-gray-500 font-medium">
              {language === 'te'
                ? 'వ్యవసాయ దినచర్యను లోడ్ చేస్తోంది...'
                : language === 'hi'
                ? 'गतिविधि विवरण लोड हो रहा है...'
                : 'Loading activity journal...'}
            </p>
          </div>
        ) : activities.length === 0 ? (
          <div className="p-8 sm:p-12 rounded-3xl border border-gray-200 bg-white text-center shadow-xs">
            <div className="h-16 w-16 mx-auto rounded-2xl bg-emerald-50 text-[#176B45] flex items-center justify-center mb-4">
              <ClipboardList size={32} />
            </div>
            <h3 className="text-lg font-bold text-gray-900">{t.activities.emptyTitle}</h3>
            <p className="text-xs sm:text-sm text-gray-600 max-w-md mx-auto mt-2 leading-relaxed">
              {t.activities.emptyDesc}
            </p>
            {farms.length > 0 && (
              <button
                onClick={openAddModal}
                className="mt-6 inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#176B45] text-white text-xs font-semibold hover:bg-[#125335] shadow-sm transition"
              >
                <Plus size={16} />
                <span>{t.activities.logFirstActivity}</span>
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-3">
            {activities.map((act) => {
              const Icon = getActivityIcon(act.activity_type)
              const cropName = getCropName(act.crop_id)
              return (
                <div
                  key={act.id}
                  className="rounded-2xl border border-gray-200/90 bg-white p-5 shadow-xs hover:shadow-sm transition flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                >
                  <div className="flex items-start gap-4">
                    <div className="h-11 w-11 rounded-2xl bg-emerald-50 text-[#176B45] flex items-center justify-center shrink-0">
                      <Icon size={22} />
                    </div>

                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-bold text-sm text-gray-900">{localizeActivityType(act.activity_type, language)}</span>
                        <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-gray-100 text-gray-600 font-medium">
                          {getFarmName(act.farm_id)}
                        </span>
                        {cropName && (
                          <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-emerald-50 text-[#176B45] font-semibold border border-[#75B843]/20">
                            {localizeCropName(cropName, language)}
                          </span>
                        )}
                      </div>

                      <p className="text-xs text-gray-700 mt-1 leading-relaxed">{act.description}</p>

                      {act.notes && (
                        <p className="text-[11px] text-gray-500 mt-1 italic">Note: {act.notes}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0 border-t sm:border-t-0 pt-2 sm:pt-0 border-gray-100">
                    <div className="flex items-center gap-1.5 text-xs text-gray-500">
                      <Calendar size={14} className="text-gray-400" />
                      <span>{act.activity_date}</span>
                    </div>

                    <button
                      onClick={() => handleDelete(act.id)}
                      className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition"
                      title="Delete Entry"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* Log Activity Modal */}
        {showModal && (
          <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-8 max-w-xl w-full shadow-2xl my-8 animate-in zoom-in-95">
              <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                <h3 className="text-base font-bold text-gray-900">{t.activities.logActivity}</h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-1 text-gray-400 hover:text-gray-700 rounded-lg"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 mt-5">
                {/* Select Farm */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    {t.activities.selectFarm} *
                  </label>
                  <select
                    value={formData.farm_id}
                    onChange={(e) => setFormData({ ...formData, farm_id: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs text-gray-900 focus:border-[#176B45] focus:ring-2 focus:ring-[#176B45]/20 outline-none bg-white"
                  >
                    {farms.map((f) => (
                      <option key={f.id} value={f.id}>
                        {f.farm_name} ({f.village || 'Plot'})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Optional Crop Selection */}
                {(() => {
                  const farmCrops = crops.filter((c) => c.farm_id === formData.farm_id)
                  return farmCrops.length > 0 ? (
                    <div>
                      <label className="block text-xs font-semibold text-gray-700 mb-1">
                        {t.activities.selectCropOptional}
                      </label>
                      <select
                        value={formData.crop_id || ''}
                        onChange={(e) => setFormData({ ...formData, crop_id: e.target.value || undefined })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs text-gray-900 focus:border-[#176B45] focus:ring-2 focus:ring-[#176B45]/20 outline-none bg-white"
                      >
                        <option value="">
                          {language === 'te'
                            ? 'సాధారణ క్షేత్ర పని (నిర్దిష్ట పంట లేదు)'
                            : language === 'hi'
                            ? 'सामान्य खेत कार्य (कोई विशिष्ट फसल नहीं)'
                            : 'General Field Work (No specific crop)'}
                        </option>
                        {farmCrops.map((c) => (
                          <option key={c.id} value={c.id}>
                            {localizeCropName(c.crop_name, language)} {c.variety ? `(${c.variety})` : ''}
                          </option>
                        ))}
                      </select>
                    </div>
                  ) : null
                })()}

                {/* Activity Type & Date */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      {t.activities.activityType} *
                    </label>
                    <select
                      value={formData.activity_type}
                      onChange={(e) => setFormData({ ...formData, activity_type: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs text-gray-900 focus:border-[#176B45] focus:ring-2 focus:ring-[#176B45]/20 outline-none bg-white"
                    >
                      {ACTIVITY_TYPES.map((at) => (
                        <option key={at} value={at}>
                          {localizeActivityType(at, language)}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      {t.activities.activityDate} *
                    </label>
                    <input
                      type="date"
                      value={formData.activity_date}
                      onChange={(e) => setFormData({ ...formData, activity_date: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs text-gray-900 focus:border-[#176B45] focus:ring-2 focus:ring-[#176B45]/20 outline-none bg-white"
                    />
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    {t.activities.description} *
                  </label>
                  <textarea
                    rows={2}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder={t.activities.descriptionPlaceholder}
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-xs text-gray-900 focus:outline-none focus:ring-2 ${
                      formErrors.description
                        ? 'border-red-300 focus:ring-red-200'
                        : 'border-gray-300 focus:border-[#176B45] focus:ring-[#176B45]/20'
                    }`}
                  />
                  {formErrors.description && (
                    <p className="text-[11px] text-red-600 mt-1">{formErrors.description}</p>
                  )}
                </div>

                {/* Notes */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    {t.activities.notes}
                  </label>
                  <textarea
                    rows={2}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder={t.activities.notesPlaceholder}
                    className="w-full px-3.5 py-2 rounded-xl border border-gray-300 text-xs text-gray-900 focus:border-[#176B45] focus:ring-2 focus:ring-[#176B45]/20 outline-none"
                  />
                </div>

                {/* Buttons */}
                <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2.5 rounded-xl border border-gray-200 text-xs font-semibold text-gray-700 hover:bg-gray-50 transition"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#176B45] text-white text-xs font-semibold hover:bg-[#125335] shadow-sm transition disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <RefreshCw size={14} className="animate-spin" />
                        <span>{t.activities.saving}</span>
                      </>
                    ) : (
                      <>
                        <Save size={14} />
                        <span>{t.activities.saveActivity}</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
