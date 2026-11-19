import { useState, useEffect, useCallback, type FormEvent } from 'react'
import {
  MapPin,
  Plus,
  Edit2,
  Trash2,
  Save,
  X,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Tractor,
  Layers,
  Droplets,
  CloudSun
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { DashboardLayout } from '../../components/dashboard/DashboardLayout'
import { FarmLocationPicker } from '../../components/farm/FarmLocationPicker'
import { useAuth } from '../../hooks/useAuth'
import { useLanguage } from '../../hooks/useLanguage'
import { fetchFarmerFarms, createFarm, updateFarm, deleteFarm } from '../../services/farmService'
import {
  localizeSoilType,
  localizeIrrigationType,
  localizeLandUnit,
} from '../../utils/cropTranslations'
import type { Farm, FarmFormData, LandAreaUnit, SoilType, IrrigationType } from '../../types/farm'

const SOIL_TYPES: SoilType[] = [
  'Red Soil',
  'Black Soil',
  'Alluvial Soil',
  'Sandy Soil',
  'Clay Soil',
  'Loamy Soil',
  'Other',
]

const IRRIGATION_TYPES: IrrigationType[] = [
  'Drip Irrigation',
  'Sprinkler Irrigation',
  'Canal Irrigation',
  'Borewell',
  'Rainfed',
  'Other',
]

export function FarmPage() {
  const { user } = useAuth()
  const { t, language } = useLanguage()

  const [farms, setFarms] = useState<Farm[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingFarmId, setEditingFarmId] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null)
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null)

  const initialFormData: FarmFormData = {
    farm_name: '',
    village: '',
    district: '',
    state: 'Andhra Pradesh',
    latitude: 16.5062,
    longitude: 80.648,
    land_area: '',
    land_area_unit: 'Acres',
    soil_type: 'Red Soil',
    irrigation_type: 'Drip Irrigation',
    water_source: '',
    description: '',
  }

  const [formData, setFormData] = useState<FarmFormData>(initialFormData)
  const [formErrors, setFormErrors] = useState<{ [k: string]: string }>({})

  const loadFarms = useCallback(async () => {
    if (!user) return
    try {
      const data = await fetchFarmerFarms(user.id)
      setFarms(data)
    } catch {
      // handled
    } finally {
      setLoading(false)
    }
  }, [user])

  useEffect(() => {
    let isMounted = true
    if (!user) return

    fetchFarmerFarms(user.id)
      .then((data) => {
        if (isMounted) setFarms(data)
      })
      .catch(() => {
        // handled
      })
      .finally(() => {
        if (isMounted) setLoading(false)
      })

    return () => {
      isMounted = false
    }
  }, [user])

  const openCreateModal = () => {
    setEditingFarmId(null)
    setFormData(initialFormData)
    setFormErrors({})
    setShowModal(true)
  }

  const openEditModal = (farm: Farm) => {
    setEditingFarmId(farm.id)
    setFormData({
      farm_name: farm.farm_name,
      village: farm.village || '',
      district: farm.district || '',
      state: farm.state || 'Andhra Pradesh',
      latitude: farm.latitude || null,
      longitude: farm.longitude || null,
      land_area: farm.land_area || '',
      land_area_unit: farm.land_area_unit || 'Acres',
      soil_type: farm.soil_type || 'Red Soil',
      irrigation_type: farm.irrigation_type || 'Drip Irrigation',
      water_source: farm.water_source || '',
      description: farm.description || '',
    })
    setFormErrors({})
    setShowModal(true)
  }

  const validate = () => {
    const errs: { [k: string]: string } = {}
    if (!formData.farm_name.trim()) errs.farm_name = t.auth.errRequired
    if (!formData.land_area || Number(formData.land_area) <= 0) {
      errs.land_area = t.auth.errRequired
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
      if (editingFarmId) {
        await updateFarm(editingFarmId, formData)
        setFeedback({ type: 'success', message: t.farm.updateSuccess })
      } else {
        await createFarm(user.id, formData)
        setFeedback({ type: 'success', message: t.farm.saveSuccess })
      }
      setShowModal(false)
      await loadFarms()
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : t.farm.saveError
      setFeedback({ type: 'error', message: msg })
      console.error('[FarmPage save error]', err)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async (farmId: string) => {
    try {
      await deleteFarm(farmId)
      setFeedback({ type: 'success', message: t.farm.deleteSuccess })
      setDeleteConfirmId(null)
      await loadFarms()
    } catch {
      setFeedback({ type: 'error', message: 'Failed to delete farm.' })
    }
  }

  return (
    <DashboardLayout activeTab="farm">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">{t.farm.title}</h1>
            <p className="text-xs sm:text-sm text-gray-600 mt-1">{t.farm.subtitle}</p>
          </div>

          <button
            onClick={openCreateModal}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#176B45] text-white text-xs font-semibold hover:bg-[#125335] shadow-sm transition self-start sm:self-auto"
          >
            <Plus size={16} />
            <span>{t.farm.registerNewFarm}</span>
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

        {/* Loading state */}
        {loading ? (
          <div className="py-20 flex flex-col items-center justify-center text-center">
            <RefreshCw size={26} className="animate-spin text-[#176B45]" />
            <p className="mt-3 text-xs text-gray-500 font-medium">
              {language === 'te'
                ? 'మీ పొలం రికార్డులను లోడ్ చేస్తోంది...'
                : language === 'hi'
                ? 'आपके खेत रिकॉर्ड लोड किए जा रहे हैं...'
                : 'Loading your farm records...'}
            </p>
          </div>
        ) : farms.length === 0 ? (
          /* Empty state */
          <div className="p-8 sm:p-12 rounded-3xl border border-gray-200 bg-white text-center shadow-xs">
            <div className="h-16 w-16 mx-auto rounded-2xl bg-emerald-50 text-[#176B45] flex items-center justify-center mb-4">
              <Tractor size={32} />
            </div>
            <h3 className="text-lg font-bold text-gray-900">{t.farm.emptyTitle}</h3>
            <p className="text-xs sm:text-sm text-gray-600 max-w-md mx-auto mt-2 leading-relaxed">
              {t.farm.emptyDesc}
            </p>
            <button
              onClick={openCreateModal}
              className="mt-6 inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#176B45] text-white text-xs font-semibold hover:bg-[#125335] shadow-sm transition"
            >
              <Plus size={16} />
              <span>{t.farm.addFirstFarm}</span>
            </button>
          </div>
        ) : (
          /* Farm Cards Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {farms.map((farm) => (
              <div
                key={farm.id}
                className="rounded-3xl border border-gray-200/90 bg-white p-6 shadow-xs hover:shadow-md transition flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <div className="h-10 w-10 rounded-xl bg-emerald-50 text-[#176B45] flex items-center justify-center shrink-0">
                        <MapPin size={20} />
                      </div>
                      <div>
                        <h3 className="font-bold text-sm text-gray-900 leading-snug">
                          {farm.farm_name}
                        </h3>
                        <p className="text-[11px] text-gray-500">
                          {[farm.village, farm.district, farm.state].filter(Boolean).join(', ') || 'Andhra Pradesh'}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => openEditModal(farm)}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-[#176B45] hover:bg-gray-50 transition"
                        title={t.farm.editFarm}
                      >
                        <Edit2 size={15} />
                      </button>
                      <button
                        onClick={() => setDeleteConfirmId(farm.id)}
                        className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition"
                        title={t.farm.deleteFarm}
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>

                  {/* Specs */}
                  <div className="mt-5 grid grid-cols-2 gap-3 text-xs border-y border-gray-100 py-3.5">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-gray-400 flex items-center gap-1">
                        <Layers size={12} />
                        {t.farm.landArea}
                      </span>
                      <p className="font-semibold text-gray-800 mt-0.5">
                        {farm.land_area} {localizeLandUnit(farm.land_area_unit, language)}
                      </p>
                    </div>

                    <div>
                      <span className="text-[10px] uppercase font-bold text-gray-400 flex items-center gap-1">
                        <Tractor size={12} />
                        {t.farm.soilType}
                      </span>
                      <p className="font-semibold text-gray-800 mt-0.5 truncate">
                        {localizeSoilType(farm.soil_type, language)}
                      </p>
                    </div>

                    <div>
                      <span className="text-[10px] uppercase font-bold text-gray-400 flex items-center gap-1">
                        <Droplets size={12} />
                        {t.farm.irrigationType}
                      </span>
                      <p className="font-semibold text-gray-800 mt-0.5 truncate">
                        {localizeIrrigationType(farm.irrigation_type, language)}
                      </p>
                    </div>

                    <div>
                      <span className="text-[10px] uppercase font-bold text-gray-400 flex items-center gap-1">
                        <Droplets size={12} />
                        {t.farm.waterSource}
                      </span>
                      <p className="font-semibold text-gray-800 mt-0.5 truncate">
                        {farm.water_source || (language === 'te' ? 'వర్షాధారం' : language === 'hi' ? 'वर्षा आधारित' : 'Rainfed')}
                      </p>
                    </div>
                  </div>

                  {farm.description && (
                    <p className="mt-3 text-xs text-gray-600 leading-relaxed line-clamp-2">
                      {farm.description}
                    </p>
                  )}
                </div>

                {/* Footer action to view weather for this farm */}
                <div className="mt-5 pt-3 border-t border-gray-100 flex items-center justify-between">
                  <Link
                    to="/weather"
                    onClick={() => {
                      if (farm.latitude && farm.longitude) {
                        try {
                          localStorage.setItem(
                            'krishi_farm_location',
                            JSON.stringify({
                              latitude: farm.latitude,
                              longitude: farm.longitude,
                              name: farm.farm_name,
                              source: 'farm_record',
                            })
                          )
                        } catch {
                          // ignore
                        }
                      }
                    }}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#176B45] hover:text-[#125335] transition"
                  >
                    <CloudSun size={15} />
                    <span>
                      {language === 'te'
                        ? 'వాతావరణ వివరాలు చూడండి'
                        : language === 'hi'
                        ? 'सटीक मौसम देखें'
                        : 'View Hyperlocal Weather'}
                    </span>
                  </Link>

                  <Link
                    to="/crops"
                    className="text-xs font-semibold text-gray-500 hover:text-gray-800 transition"
                  >
                    {language === 'te' ? 'పంటల నిర్వహణ →' : language === 'hi' ? 'फसल प्रबंधन →' : 'Manage Crops →'}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Delete Confirmation Dialog */}
        {deleteConfirmId && (
          <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl border border-gray-200 p-6 max-w-sm w-full shadow-2xl animate-in zoom-in-95">
              <div className="h-12 w-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mb-4">
                <Trash2 size={22} />
              </div>
              <h3 className="text-base font-bold text-gray-900">{t.farm.confirmDeleteTitle}</h3>
              <p className="text-xs text-gray-600 mt-2 leading-relaxed">
                {t.farm.confirmDeleteBody}
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

        {/* Farm Register/Edit Modal */}
        {showModal && (
          <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-8 max-w-2xl w-full shadow-2xl my-8 animate-in zoom-in-95 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                <h3 className="text-base font-bold text-gray-900">
                  {editingFarmId ? t.farm.editFarm : t.farm.registerNewFarm}
                </h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-1 text-gray-400 hover:text-gray-700 rounded-lg"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 mt-5">
                {/* Farm Name */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    {t.farm.farmName} *
                  </label>
                  <input
                    type="text"
                    value={formData.farm_name}
                    onChange={(e) => setFormData({ ...formData, farm_name: e.target.value })}
                    placeholder={t.farm.farmNamePlaceholder}
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-xs text-gray-900 focus:outline-none focus:ring-2 ${
                      formErrors.farm_name
                        ? 'border-red-300 focus:ring-red-200'
                        : 'border-gray-300 focus:border-[#176B45] focus:ring-[#176B45]/20'
                    }`}
                  />
                  {formErrors.farm_name && (
                    <p className="text-[11px] text-red-600 mt-1">{formErrors.farm_name}</p>
                  )}
                </div>

                {/* Location row */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      {t.farm.village}
                    </label>
                    <input
                      type="text"
                      value={formData.village}
                      onChange={(e) => setFormData({ ...formData, village: e.target.value })}
                      placeholder={t.farm.villagePlaceholder}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs text-gray-900 focus:border-[#176B45] focus:ring-2 focus:ring-[#176B45]/20 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      {t.farm.district}
                    </label>
                    <input
                      type="text"
                      value={formData.district}
                      onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                      placeholder={t.farm.districtPlaceholder}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs text-gray-900 focus:border-[#176B45] focus:ring-2 focus:ring-[#176B45]/20 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      {t.farm.state}
                    </label>
                    <input
                      type="text"
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      placeholder={t.farm.statePlaceholder}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs text-gray-900 focus:border-[#176B45] focus:ring-2 focus:ring-[#176B45]/20 outline-none"
                    />
                  </div>
                </div>

                {/* Land Area and Unit */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      {t.farm.landArea} *
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      value={formData.land_area}
                      onChange={(e) => setFormData({ ...formData, land_area: e.target.value })}
                      placeholder={t.farm.landAreaPlaceholder}
                      className={`w-full px-3.5 py-2.5 rounded-xl border text-xs text-gray-900 focus:outline-none focus:ring-2 ${
                        formErrors.land_area
                          ? 'border-red-300 focus:ring-red-200'
                          : 'border-gray-300 focus:border-[#176B45] focus:ring-[#176B45]/20'
                      }`}
                    />
                    {formErrors.land_area && (
                      <p className="text-[11px] text-red-600 mt-1">{formErrors.land_area}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      {t.farm.landAreaUnit}
                    </label>
                    <select
                      value={formData.land_area_unit}
                      onChange={(e) =>
                        setFormData({ ...formData, land_area_unit: e.target.value as LandAreaUnit })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs text-gray-900 focus:border-[#176B45] focus:ring-2 focus:ring-[#176B45]/20 outline-none bg-white"
                    >
                      <option value="Acres">{localizeLandUnit('Acres', language)}</option>
                      <option value="Hectares">{localizeLandUnit('Hectares', language)}</option>
                    </select>
                  </div>
                </div>

                {/* Soil & Irrigation */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      {t.farm.soilType}
                    </label>
                    <select
                      value={formData.soil_type}
                      onChange={(e) => setFormData({ ...formData, soil_type: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs text-gray-900 focus:border-[#176B45] focus:ring-2 focus:ring-[#176B45]/20 outline-none bg-white"
                    >
                      {SOIL_TYPES.map((st) => (
                        <option key={st} value={st}>
                          {localizeSoilType(st, language)}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-700 mb-1">
                      {t.farm.irrigationType}
                    </label>
                    <select
                      value={formData.irrigation_type}
                      onChange={(e) => setFormData({ ...formData, irrigation_type: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs text-gray-900 focus:border-[#176B45] focus:ring-2 focus:ring-[#176B45]/20 outline-none bg-white"
                    >
                      {IRRIGATION_TYPES.map((it) => (
                        <option key={it} value={it}>
                          {localizeIrrigationType(it, language)}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Water Source & Description */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    {t.farm.waterSource}
                  </label>
                  <input
                    type="text"
                    value={formData.water_source}
                    onChange={(e) => setFormData({ ...formData, water_source: e.target.value })}
                    placeholder={t.farm.waterSourcePlaceholder}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-xs text-gray-900 focus:border-[#176B45] focus:ring-2 focus:ring-[#176B45]/20 outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    {t.farm.description}
                  </label>
                  <textarea
                    rows={2}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder={t.farm.descriptionPlaceholder}
                    className="w-full px-3.5 py-2 rounded-xl border border-gray-300 text-xs text-gray-900 focus:border-[#176B45] focus:ring-2 focus:ring-[#176B45]/20 outline-none"
                  />
                </div>

                {/* Map Picker */}
                <div className="pt-2">
                  <FarmLocationPicker
                    latitude={formData.latitude || null}
                    longitude={formData.longitude || null}
                    onChange={(lat, lng) => setFormData((prev) => ({ ...prev, latitude: lat, longitude: lng }))}
                  />
                </div>

                {/* Action buttons */}
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
                        <span>{t.farm.saving}</span>
                      </>
                    ) : (
                      <>
                        <Save size={14} />
                        <span>{t.farm.saveFarm}</span>
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
