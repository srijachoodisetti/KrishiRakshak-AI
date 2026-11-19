import { useState, useEffect, useCallback, type FormEvent } from 'react'
import {
  Tractor,
  Plus,
  Trash2,
  Save,
  X,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Calendar,
  Layers,
  FileText
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { DashboardLayout } from '../../components/dashboard/DashboardLayout'
import { useAuth } from '../../hooks/useAuth'
import { useLanguage } from '../../hooks/useLanguage'
import { fetchFarmerFarms } from '../../services/farmService'
import { fetchFarmerCrops, createCrop, deleteCrop } from '../../services/cropService'
import {
  localizeCropName,
  localizeGrowthStage,
  localizeLandUnit,
} from '../../utils/cropTranslations'
import type { Farm } from '../../types/farm'
import type { Crop, CropFormData, GrowthStage } from '../../types/crop'

const CROP_OPTIONS = [
  'Rice (Paddy)',
  'Maize',
  'Cotton',
  'Chilli',
  'Groundnut',
  'Turmeric',
  'Tomato',
  'Sugarcane',
  'Wheat',
  'Pulse / Dal',
  'Other',
]

const GROWTH_STAGES: GrowthStage[] = [
  'Sowing / Seedling',
  'Vegetative',
  'Flowering',
  'Fruiting / Grain Formation',
  'Maturity / Harvesting',
  'Post-Harvest',
]

export function CropsPage() {
  const { user } = useAuth()
  const { t, language } = useLanguage()

  const [farms, setFarms] = useState<Farm[]>([])
  const [crops, setCrops] = useState<Crop[]>([])
  const [loading, setLoading] = useState(true)
  const [fetchError, setFetchError] = useState<string | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null)
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null)

  const initialFormData: CropFormData = {
    farm_id: '',
    crop_name: 'Rice (Paddy)',
    variety: '',
    sowing_date: new Date().toISOString().split('T')[0],
    expected_harvest_date: '',
    cultivated_area: '',
    growth_stage: 'Vegetative',
    irrigation_method: 'Drip',
    notes: '',
  }

  const [formData, setFormData] = useState<CropFormData>(initialFormData)
  const [formErrors, setFormErrors] = useState<{ [k: string]: string }>({})

  const loadData = useCallback(async () => {
    if (!user) return
    setLoading(true)
    setFetchError(null)
    try {
      const [farmList, cropList] = await Promise.all([
        fetchFarmerFarms(user.id),
        fetchFarmerCrops(user.id),
      ])
      setFarms(farmList)
      setCrops(cropList)
      if (farmList.length > 0) {
        setFormData((prev) => ({
          ...prev,
          farm_id: prev.farm_id && farmList.some((f) => f.id === prev.farm_id) ? prev.farm_id : farmList[0].id,
        }))
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to load farm and crop data.'
      setFetchError(msg)
      if (import.meta.env.DEV) {
        console.error('[CropsPage loadData error]', err)
      }
    } finally {
      setLoading(false)
    }
  }, [user])

  useEffect(() => {
    let isMounted = true
    if (!user) return

    Promise.all([fetchFarmerFarms(user.id), fetchFarmerCrops(user.id)])
      .then(([farmList, cropList]) => {
        if (!isMounted) return
        setFarms(farmList)
        setCrops(cropList)
        if (farmList.length > 0) {
          setFormData((prev) => ({
            ...prev,
            farm_id: prev.farm_id && farmList.some((f) => f.id === prev.farm_id) ? prev.farm_id : farmList[0].id,
          }))
        }
      })
      .catch((err: unknown) => {
        if (!isMounted) return
        const msg = err instanceof Error ? err.message : 'Failed to load farm and crop data.'
        setFetchError(msg)
        if (import.meta.env.DEV) {
          console.error('[CropsPage initial load error]', err)
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
    if (!formData.crop_name.trim()) errs.crop_name = t.auth.errRequired
    if (!formData.cultivated_area || Number(formData.cultivated_area) <= 0) {
      errs.cultivated_area = t.auth.errRequired
    }
    setFormErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!user || !validate()) return

    setIsSubmitting(true)
    setFeedback(null)

    try {
      await createCrop(user.id, formData)
      setFeedback({ type: 'success', message: t.crops.saveSuccess })
      setShowModal(false)
      await loadData()
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to save crop.'
      setFeedback({ type: 'error', message: msg })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async (cropId: string) => {
    try {
      await deleteCrop(cropId)
      setFeedback({ type: 'success', message: t.crops.deleteSuccess })
      setDeleteConfirmId(null)
      await loadData()
    } catch {
      setFeedback({ type: 'error', message: 'Failed to delete crop.' })
    }
  }

  const getFarmName = (farmId: string) => {
    const matched = farms.find((f) => f.id === farmId)
    return matched ? matched.farm_name : 'Primary Farm'
  }

  return (
    <DashboardLayout activeTab="crops">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">{t.crops.title}</h1>
            <p className="text-xs sm:text-sm text-gray-600 mt-1">{t.crops.subtitle}</p>
          </div>

          <button
            onClick={openAddModal}
            disabled={farms.length === 0}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#176B45] text-white text-xs font-semibold hover:bg-[#125335] shadow-sm transition disabled:opacity-50 self-start sm:self-auto"
          >
            <Plus size={16} />
            <span>{t.crops.addCrop}</span>
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

        {/* Notice if no farms exist */}
        {farms.length === 0 && !loading && !fetchError && (
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <AlertCircle size={18} className="text-amber-600 shrink-0" />
              <span>
                {language === 'te'
                  ? 'పంటలను నమోదు చేయడానికి ముందు మీరు ఒక పొలాన్ని నమోదు చేయాలి.'
                  : language === 'hi'
                  ? 'फसलें जोड़ने से पहले आपको एक खेत पंजीकृत करना होगा।'
                  : 'You must register a farm before adding crops.'}
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
                ? 'పంటల జాబితాను లోడ్ చేస్తోంది...'
                : language === 'hi'
                ? 'फसलों की सूची लोड हो रही है...'
                : 'Loading crops...'}
            </p>
          </div>
        ) : crops.length === 0 ? (
          <div className="p-8 sm:p-12 rounded-3xl border border-gray-200 bg-white text-center shadow-xs">
            <div className="h-16 w-16 mx-auto rounded-2xl bg-emerald-50 text-[#176B45] flex items-center justify-center mb-4">
              <Tractor size={32} />
            </div>
            <h3 className="text-lg font-bold text-gray-900">{t.crops.emptyTitle}</h3>
            <p className="text-xs sm:text-sm text-gray-600 max-w-md mx-auto mt-2 leading-relaxed">
              {t.crops.emptyDesc}
            </p>
            {farms.length > 0 && (
              <button
                onClick={openAddModal}
                className="mt-6 inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#176B45] text-white text-xs font-semibold hover:bg-[#125335] shadow-sm transition"
              >
                <Plus size={16} />
                <span>{t.crops.addFirstCrop}</span>
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {crops.map((crop) => (
              <div
                key={crop.id}
                className="rounded-3xl border border-gray-200/90 bg-white p-6 shadow-xs hover:shadow-md transition flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <div className="h-10 w-10 rounded-xl bg-[#75B843]/15 text-[#75B843] flex items-center justify-center shrink-0">
                        <Tractor size={20} />
                      </div>
                      <div>
                        <h3 className="font-bold text-sm text-gray-900 leading-snug">
                          {crop.crop_name}
                        </h3>
                        <p className="text-[11px] text-gray-500">
                          {crop.variety ? `Variety: ${crop.variety}` : getFarmName(crop.farm_id)}
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => setDeleteConfirmId(crop.id)}
                      className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition"
                      title={t.crops.deleteCrop}
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>

                  <div className="mt-4 p-3 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-between text-xs">
                    <span className="text-gray-500 font-medium">
                      {language === 'te' ? 'పొలం విభాగం' : language === 'hi' ? 'खेत का प्लॉट' : 'Farm Plot'}
                    </span>
                    <strong className="text-gray-800">{getFarmName(crop.farm_id)}</strong>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-3 text-xs border-y border-gray-100 py-3.5">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-gray-400 flex items-center gap-1">
                        <Layers size={12} />
                        {t.crops.cultivatedArea}
                      </span>
                      <p className="font-semibold text-gray-800 mt-0.5">
                        {crop.cultivated_area} {localizeLandUnit('Acres', language)}
                      </p>
                    </div>

                    <div>
                      <span className="text-[10px] uppercase font-bold text-gray-400 flex items-center gap-1">
                        <CheckCircle2 size={12} />
                        {t.crops.growthStage}
                      </span>
                      <p className="font-semibold text-[#176B45] mt-0.5 truncate">
                        {localizeGrowthStage(crop.growth_stage, language)}
                      </p>
                    </div>

                    <div>
                      <span className="text-[10px] uppercase font-bold text-gray-400 flex items-center gap-1">
                        <Calendar size={12} />
                        {t.crops.sowingDate}
                      </span>
                      <p className="font-semibold text-gray-800 mt-0.5">
                        {crop.sowing_date || (language === 'te' ? 'నమోదైంది' : language === 'hi' ? 'दर्ज' : 'Recorded')}
                      </p>
                    </div>

                    <div>
                      <span className="text-[10px] uppercase font-bold text-gray-400 flex items-center gap-1">
                        <Calendar size={12} />
                        {t.crops.expectedHarvestDate}
                      </span>
                      <p className="font-semibold text-gray-800 mt-0.5">
                        {crop.expected_harvest_date || (language === 'te' ? 'పెండింగ్‌లో ఉంది' : language === 'hi' ? 'लंबित' : 'Pending')}
                      </p>
                    </div>
                  </div>

                  {crop.notes && (
                    <p className="mt-3 text-xs text-gray-600 leading-relaxed line-clamp-2">
                      {crop.notes}
                    </p>
                  )}
                </div>

                <div className="mt-5 pt-3 border-t border-gray-100 flex items-center justify-between">
                  <Link
                    to="/activities"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#176B45] hover:underline"
                  >
                    <FileText size={14} />
                    <span>
                      {language === 'te' ? 'క్షేత్ర పనిని నమోదు చేయండి' : language === 'hi' ? 'खेत कार्य दर्ज करें' : 'Log Field Activity'}
                    </span>
                  </Link>
                  <Link
                    to="/crop-doctor"
                    className="text-xs font-semibold text-gray-500 hover:text-gray-800 transition"
                  >
                    {t.dashboard.sidebar.cropDoctor || 'Crop Doctor'} &rarr;
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Delete Confirmation */}
        {deleteConfirmId && (
          <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl border border-gray-200 p-6 max-w-sm w-full shadow-2xl animate-in zoom-in-95">
              <div className="h-12 w-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mb-4">
                <Trash2 size={22} />
              </div>
              <h3 className="text-base font-bold text-gray-900">{t.crops.deleteCrop}</h3>
              <p className="text-xs text-gray-600 mt-2 leading-relaxed">
                {t.crops.confirmDelete}
              </p>
              <div className="mt-6 flex gap-3">
                <button
                  type="button"
                  onClick={() => setDeleteConfirmId(null)}
                  className="flex-1 py-2.5 rounded-xl border border-gray-200 text-xs font-semibold text-gray-700 hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(deleteConfirmId)}
                  className="flex-1 py-2.5 rounded-xl bg-red-600 text-xs font-semibold text-white hover:bg-red-700 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Add Crop Modal */}
        {showModal && (
          <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-8 max-w-xl w-full shadow-2xl my-8 animate-in zoom-in-95">
              <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                <h3 className="text-base font-bold text-gray-900">{t.crops.addCrop}</h3>
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
                    {t.crops.selectFarm} *
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

                {/* Crop Name & Variety */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      {t.crops.cropName} *
                    </label>
                    <select
                      value={formData.crop_name}
                      onChange={(e) => setFormData({ ...formData, crop_name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs text-gray-900 focus:border-[#176B45] focus:ring-2 focus:ring-[#176B45]/20 outline-none bg-white"
                    >
                      {CROP_OPTIONS.map((c) => (
                        <option key={c} value={c}>
                          {localizeCropName(c, language)}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      {t.crops.cropVariety}
                    </label>
                    <input
                      type="text"
                      value={formData.variety}
                      onChange={(e) => setFormData({ ...formData, variety: e.target.value })}
                      placeholder={language === 'te' ? 'ఉదా. BPT 5204 (సాంబ మసూరి)' : language === 'hi' ? 'उदा. बीपीटी 5204 (सांभा मसूरी)' : 'e.g. BPT 5204 (Samba Masuri)'}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs text-gray-900 focus:border-[#176B45] focus:ring-2 focus:ring-[#176B45]/20 outline-none"
                    />
                  </div>
                </div>

                {/* Cultivated Area & Growth Stage */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      {t.crops.cultivatedArea} ({localizeLandUnit('Acres', language)}) *
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={formData.cultivated_area}
                      onChange={(e) => setFormData({ ...formData, cultivated_area: e.target.value })}
                      placeholder="e.g. 3.5"
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-xs text-gray-900 focus:outline-none focus:ring-2 ${
                        formErrors.cultivated_area
                          ? 'border-red-300 focus:ring-red-200'
                          : 'border-gray-300 focus:border-[#176B45] focus:ring-[#176B45]/20'
                      }`}
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      {t.crops.growthStage}
                    </label>
                    <select
                      value={formData.growth_stage}
                      onChange={(e) => setFormData({ ...formData, growth_stage: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs text-gray-900 focus:border-[#176B45] focus:ring-2 focus:ring-[#176B45]/20 outline-none bg-white"
                    >
                      {GROWTH_STAGES.map((gs) => (
                        <option key={gs} value={gs}>
                          {localizeGrowthStage(gs, language)}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Dates */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      {t.crops.sowingDate}
                    </label>
                    <input
                      type="date"
                      value={formData.sowing_date}
                      onChange={(e) => setFormData({ ...formData, sowing_date: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs text-gray-900 focus:border-[#176B45] focus:ring-2 focus:ring-[#176B45]/20 outline-none bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      {t.crops.expectedHarvestDate}
                    </label>
                    <input
                      type="date"
                      value={formData.expected_harvest_date}
                      onChange={(e) =>
                        setFormData({ ...formData, expected_harvest_date: e.target.value })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs text-gray-900 focus:border-[#176B45] focus:ring-2 focus:ring-[#176B45]/20 outline-none bg-white"
                    />
                  </div>
                </div>

                {/* Irrigation method & Notes */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    {t.crops.irrigationMethod}
                  </label>
                  <input
                    type="text"
                    value={formData.irrigation_method}
                    onChange={(e) => setFormData({ ...formData, irrigation_method: e.target.value })}
                    placeholder="e.g. Sub-surface drip cycle every 3 days"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs text-gray-900 focus:border-[#176B45] focus:ring-2 focus:ring-[#176B45]/20 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    {t.crops.notes}
                  </label>
                  <textarea
                    rows={2}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="Observations on germination rate, seed treatment..."
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
                        <span>{t.crops.saving}</span>
                      </>
                    ) : (
                      <>
                        <Save size={14} />
                        <span>{t.crops.saveCrop}</span>
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
