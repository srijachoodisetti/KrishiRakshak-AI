import { useState, useEffect, useRef, type ChangeEvent, type FormEvent } from 'react'
import {
  Camera,
  Upload,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  ShieldCheck,
  AlertCircle,
  X,
  FileQuestion,
  DnaIcon,
  Leaf,
  History,
  Trash2,
  BookmarkPlus,
  Calendar,
  Layers,
  ChevronRight,
  Clock,
  Sparkles,
  CheckSquare,
  BookOpen,
} from 'lucide-react'
import { DashboardLayout } from '../../components/dashboard/DashboardLayout'
import { useAuth } from '../../hooks/useAuth'
import { useLanguage } from '../../hooks/useLanguage'
import { fetchFarmerFarms } from '../../services/farmService'
import { fetchFarmerCrops } from '../../services/cropService'
import {
  analyzeCropPhoto,
  saveDiagnosisRecord,
  fetchFarmerDiagnosisHistory,
  deleteDiagnosisRecord,
  createCropTreatment,
  fetchFarmerTreatments,
  updateCropTreatmentRecovery,
  deleteCropTreatment,
} from '../../services/cropDiagnosisService'
import {
  localizeCropName,
  localizeDiseaseName,
  localizeText,
  isCropMatching,
} from '../../utils/cropTranslations'
import { getOrTranslateDiagnosis } from '../../services/translationCacheService'
import type {
  CropDiagnosisResult,
  CropDiagnosisRecord,
  CropTreatmentRecord,
  TreatmentType,
  RecoveryStatus,
  CreateTreatmentInput,
} from '../../types/diagnosis'
import type { Farm } from '../../types/farm'
import type { Crop } from '../../types/crop'

type DiagnosisStage = 'idle' | 'uploading' | 'identifying' | 'analyzing' | 'recommendations' | 'completing'

export function CropDoctorPage() {
  const { user } = useAuth()
  const { t, language } = useLanguage()

  // Active view tab: 'live', 'history', or 'treatments'
  const [activeTab, setActiveTab] = useState<'live' | 'history' | 'treatments'>('live')

  // Farms & Crops lists
  const [farms, setFarms] = useState<Farm[]>([])
  const [crops, setCrops] = useState<Crop[]>([])

  // Live Diagnosis States
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [selectedImagePreview, setSelectedImagePreview] = useState<string | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [diagnosisStage, setDiagnosisStage] = useState<DiagnosisStage>('idle')
  const [diagnosisResult, setDiagnosisResult] = useState<CropDiagnosisResult | null>(null)
  const [savedRecordId, setSavedRecordId] = useState<string | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [isSavingRecord, setIsSavingRecord] = useState(false)
  const [saveSuccessMessage, setSaveSuccessMessage] = useState<string | null>(null)

  // Track active request to prevent duplicate concurrent API invocations
  const isRequestInFlight = useRef(false)
  const stageTimers = useRef<ReturnType<typeof setTimeout>[]>([])

  // History Tab States
  const [historyRecords, setHistoryRecords] = useState<CropDiagnosisRecord[]>([])
  const [loadingHistory, setLoadingHistory] = useState(false)
  const [selectedHistoryItem, setSelectedHistoryItem] = useState<CropDiagnosisRecord | null>(null)
  const [activeModalDiagnosis, setActiveModalDiagnosis] = useState<CropDiagnosisResult | null>(null)
  const [historyDeleteConfirmId, setHistoryDeleteConfirmId] = useState<string | null>(null)

  // Treatment Logging Modal States
  const [showTreatmentModal, setShowTreatmentModal] = useState(false)
  const [treatmentSubmitting, setTreatmentSubmitting] = useState(false)
  const [treatmentSuccess, setTreatmentSuccess] = useState<string | null>(null)
  const [recentTreatments, setRecentTreatments] = useState<CropTreatmentRecord[]>([])
  const [loadingTreatments, setLoadingTreatments] = useState(false)

  // Selected Treatment for Status Update Modal
  const [selectedTreatmentToUpdate, setSelectedTreatmentToUpdate] = useState<CropTreatmentRecord | null>(null)
  const [updatingRecoveryStatus, setUpdatingRecoveryStatus] = useState<RecoveryStatus>('Under Monitoring')
  const [updatingObservations, setUpdatingObservations] = useState('')
  const [isUpdatingTreatment, setIsUpdatingTreatment] = useState(false)

  const [treatmentForm, setTreatmentForm] = useState<CreateTreatmentInput>({
    farm_id: '',
    crop_id: '',
    diagnosis_id: '',
    treatment_name: '',
    treatment_type: 'Organic / Biological',
    application_date: new Date().toISOString().split('T')[0],
    dosage_or_method: '',
    observations: '',
    follow_up_date_3d: '',
    follow_up_date_7d: '',
    recovery_status: 'Under Monitoring',
  })

  // Load farms & crops once
  useEffect(() => {
    if (!user) return
    Promise.all([fetchFarmerFarms(user.id), fetchFarmerCrops(user.id)])
      .then(([fList, cList]) => {
        setFarms(fList)
        setCrops(cList)
      })
      .catch((err) => {
        if (import.meta.env.DEV) {
          console.error('[CropDoctorPage load farms/crops error]', err)
        }
      })
  }, [user])

  // Clean up timers on unmount
  useEffect(() => {
    return () => {
      stageTimers.current.forEach(clearTimeout)
    }
  }, [])

  // Load history & treatments when switching tabs or user changes
  useEffect(() => {
    if (!user) return

    if (activeTab === 'history') {
      let isMounted = true
      Promise.resolve().then(() => {
        if (isMounted) setLoadingHistory(true)
      })

      Promise.all([fetchFarmerDiagnosisHistory(user.id), fetchFarmerTreatments()])
        .then(([records, treatments]) => {
          if (isMounted) {
            setHistoryRecords(records)
            setRecentTreatments(treatments)
          }
        })
        .catch((err) => {
          if (import.meta.env.DEV) {
            console.error('[fetchFarmerDiagnosisHistory error]', err)
          }
        })
        .finally(() => {
          if (isMounted) setLoadingHistory(false)
        })

      return () => {
        isMounted = false
      }
    }

    if (activeTab === 'treatments') {
      let isMounted = true
      Promise.resolve().then(() => {
        if (isMounted) setLoadingTreatments(true)
      })

      fetchFarmerTreatments()
        .then((treatments) => {
          if (isMounted) {
            setRecentTreatments(treatments)
          }
        })
        .catch((err) => {
          if (import.meta.env.DEV) {
            console.error('[fetchFarmerTreatments tab error]', err)
          }
        })
        .finally(() => {
          if (isMounted) setLoadingTreatments(false)
        })

      return () => {
        isMounted = false
      }
    }
  }, [activeTab, user])

  // Synchronize translation for selected history modal item whenever language changes
  useEffect(() => {
    if (!selectedHistoryItem || !user) {
      return
    }

    let isMounted = true
    getOrTranslateDiagnosis(selectedHistoryItem, language as 'en' | 'te' | 'hi', user.id)
      .then((translated) => {
        if (isMounted) {
          setActiveModalDiagnosis(translated)
        }
      })
      .catch(() => {
        if (isMounted) {
          setActiveModalDiagnosis(selectedHistoryItem)
        }
      })

    return () => {
      isMounted = false
    }
  }, [selectedHistoryItem, language, user])

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg']
      if (!validTypes.includes(file.type.toLowerCase()) && !file.type.startsWith('image/')) {
        setErrorMessage(t.cropDoctor.errInvalidFile)
        return
      }
      if (file.size > 10 * 1024 * 1024) {
        setErrorMessage(t.cropDoctor.errFileLimit)
        return
      }

      setErrorMessage(null)
      setSelectedFile(file)
      setDiagnosisResult(null)
      setSavedRecordId(null)
      setSaveSuccessMessage(null)
      setTreatmentSuccess(null)

      const reader = new FileReader()
      reader.onload = (event) => {
        setSelectedImagePreview(event.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleAnalyzePhoto = async () => {
    if (!selectedFile) {
      setErrorMessage(t.cropDoctor.uploadCardDesc)
      return
    }

    if (isRequestInFlight.current || isAnalyzing) {
      return
    }

    isRequestInFlight.current = true
    setIsAnalyzing(true)
    setErrorMessage(null)
    setSaveSuccessMessage(null)
    setTreatmentSuccess(null)
    setDiagnosisResult(null)
    setSavedRecordId(null)

    stageTimers.current.forEach(clearTimeout)
    stageTimers.current = []

    setDiagnosisStage('uploading')

    const t1 = setTimeout(() => {
      setDiagnosisStage('identifying')
    }, 800)

    const t2 = setTimeout(() => {
      setDiagnosisStage('analyzing')
    }, 2200)

    const t3 = setTimeout(() => {
      setDiagnosisStage('recommendations')
    }, 4000)

    stageTimers.current.push(t1, t2, t3)

    try {
      const result = await analyzeCropPhoto(selectedFile, language as 'en' | 'te' | 'hi')
      setDiagnosisStage('completing')
      setDiagnosisResult(result)

      // Calculate follow-up dates (3-day and 7-day)
      const now = new Date()
      const d3 = new Date(now)
      d3.setDate(d3.getDate() + 3)
      const d7 = new Date(now)
      d7.setDate(d7.getDate() + 7)

      // INTELLIGENT MATCHING OF DIAGNOSED CROP AGAINST REGISTERED CROPS
      let matchedFarmId = ''
      let matchedCropId = ''

      if (result.crop_name) {
        const foundCrop = crops.find((c) => isCropMatching(c.crop_name, result.crop_name))
        if (foundCrop) {
          matchedCropId = foundCrop.id
          matchedFarmId = foundCrop.farm_id || (farms.length > 0 ? farms[0].id : '')
        }
      }

      // Populate default treatment form
      setTreatmentForm((prev) => ({
        ...prev,
        farm_id: matchedFarmId || (farms.length > 0 ? farms[0].id : ''),
        crop_id: matchedCropId,
        treatment_name:
          result.organic_treatments && result.organic_treatments.length > 0
            ? result.organic_treatments[0]
            : result.disease_name,
        follow_up_date_3d: d3.toISOString().split('T')[0],
        follow_up_date_7d: d7.toISOString().split('T')[0],
      }))
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : t.cropDoctor.errGeneric
      setErrorMessage(msg)
    } finally {
      stageTimers.current.forEach(clearTimeout)
      stageTimers.current = []
      setIsAnalyzing(false)
      setDiagnosisStage('idle')
      isRequestInFlight.current = false
    }
  }

  const handleSaveToHistory = async () => {
    if (!diagnosisResult || !user || isSavingRecord) return
    setIsSavingRecord(true)
    try {
      const saved = await saveDiagnosisRecord(user.id, diagnosisResult, selectedImagePreview)
      setSavedRecordId(saved.id)
      setTreatmentForm((prev) => ({ ...prev, diagnosis_id: saved.id }))
      setSaveSuccessMessage(t.cropDoctor.savedToHistoryNotice)
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to save record.'
      setErrorMessage(msg)
    } finally {
      setIsSavingRecord(false)
    }
  }

  const handleOpenTreatmentModal = () => {
    // Re-verify diagnosed crop matching
    let matchedFarmId = treatmentForm.farm_id
    let matchedCropId = treatmentForm.crop_id

    if (!matchedCropId && diagnosisResult?.crop_name) {
      const foundCrop = crops.find((c) => isCropMatching(c.crop_name, diagnosisResult.crop_name))
      if (foundCrop) {
        matchedCropId = foundCrop.id
        matchedFarmId = foundCrop.farm_id || matchedFarmId
      }
    }

    if (!matchedFarmId && farms.length > 0) {
      matchedFarmId = farms[0].id
    }

    setTreatmentForm((prev) => ({
      ...prev,
      farm_id: matchedFarmId,
      crop_id: matchedCropId,
      diagnosis_id: savedRecordId || prev.diagnosis_id,
    }))

    setShowTreatmentModal(true)
  }

  const handleTreatmentSubmit = async (e: FormEvent) => {
    e.preventDefault()
    if (!treatmentForm.treatment_name.trim()) return

    setTreatmentSubmitting(true)
    setTreatmentSuccess(null)
    try {
      await createCropTreatment(treatmentForm)
      setTreatmentSuccess(t.cropDoctor.treatmentSuccessNotice)
      setShowTreatmentModal(false)
      if (user) {
        const updated = await fetchFarmerTreatments()
        setRecentTreatments(updated)
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : t.cropDoctor.treatmentErrorNotice
      setErrorMessage(msg)
    } finally {
      setTreatmentSubmitting(false)
    }
  }

  const handleSaveRecoveryStatusUpdate = async (e: FormEvent) => {
    e.preventDefault()
    if (!selectedTreatmentToUpdate) return

    setIsUpdatingTreatment(true)
    try {
      const updated = await updateCropTreatmentRecovery(
        selectedTreatmentToUpdate.id,
        updatingRecoveryStatus,
        updatingObservations
      )
      setRecentTreatments((prev) =>
        prev.map((tRec) => (tRec.id === updated.id ? updated : tRec))
      )
      setSelectedTreatmentToUpdate(null)
      setTreatmentSuccess(t.cropDoctor.treatmentSuccessNotice)
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to update treatment status.'
      setErrorMessage(msg)
    } finally {
      setIsUpdatingTreatment(false)
    }
  }

  const handleDeleteHistory = async (recordId: string) => {
    try {
      await deleteDiagnosisRecord(recordId)
      setHistoryRecords((prev) => prev.filter((r) => r.id !== recordId))
      setHistoryDeleteConfirmId(null)
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to delete record.'
      setErrorMessage(msg)
    }
  }

  const handleDeleteTreatment = async (treatmentId: string) => {
    try {
      await deleteCropTreatment(treatmentId)
      setRecentTreatments((prev) => prev.filter((tRec) => tRec.id !== treatmentId))
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Failed to delete treatment.'
      setErrorMessage(msg)
    }
  }

  // Filter crops belonging to selected farm
  const cropsForSelectedFarm = treatmentForm.farm_id
    ? crops.filter((c) => c.farm_id === treatmentForm.farm_id)
    : crops

  // Check whether diagnosed crop matches currently selected crop
  const isDiagnosedCropMatched = Boolean(
    diagnosisResult &&
    treatmentForm.crop_id &&
    crops.some((c) => c.id === treatmentForm.crop_id && isCropMatching(c.crop_name, diagnosisResult.crop_name))
  )

  const isCropMismatch = Boolean(
    diagnosisResult &&
    treatmentForm.crop_id &&
    !isDiagnosedCropMatched
  )

  const renderConfidenceBadge = (confidence?: number) => {
    if (confidence === undefined || confidence === null) return null
    const pct = Math.round(confidence * 100)
    let colorClass = 'bg-emerald-50 text-[#176B45] border-emerald-200'
    let label = t.cropDoctor.confidenceHigh

    if (confidence < 0.5) {
      colorClass = 'bg-red-50 text-red-700 border-red-200'
      label = t.cropDoctor.confidenceLow
    } else if (confidence < 0.75) {
      colorClass = 'bg-amber-50 text-amber-800 border-amber-200'
      label = t.cropDoctor.confidenceModerate
    }

    return (
      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${colorClass}`}>
        <span>{pct}%</span>
        <span>·</span>
        <span>{label}</span>
      </span>
    )
  }

  const renderSeverityBadge = (severity?: string) => {
    const s = severity?.toLowerCase() || 'low'
    if (s.includes('high') || s.includes('ఎక్కువ') || s.includes('తీవ్ర')) {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-red-100 text-red-800 border border-red-200">
          <AlertTriangle size={12} className="text-red-600" />
          <span>{t.cropDoctor.severityHigh}</span>
        </span>
      )
    }
    if (s.includes('med') || s.includes('మధ్య')) {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800 border border-amber-200">
          <AlertCircle size={12} className="text-amber-600" />
          <span>{t.cropDoctor.severityMedium}</span>
        </span>
      )
    }
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-[#176B45] border border-emerald-200">
        <ShieldCheck size={12} className="text-[#176B45]" />
        <span>{t.cropDoctor.severityLow}</span>
      </span>
    )
  }

  const renderRecoveryStatusBadge = (status: string) => {
    switch (status) {
      case 'Recovering':
      case 'Improving':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-[#176B45] border border-emerald-200">
            <CheckCircle2 size={12} className="text-[#176B45]" />
            <span>{t.cropDoctor.treatmentStatusImproving}</span>
          </span>
        )
      case 'Resolved':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-100 text-blue-800 border border-blue-200">
            <ShieldCheck size={12} className="text-blue-600" />
            <span>{t.cropDoctor.treatmentStatusResolved}</span>
          </span>
        )
      case 'Needs Follow-up':
      case 'Worsening':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-red-100 text-red-800 border border-red-200">
            <AlertTriangle size={12} className="text-red-600" />
            <span>{t.cropDoctor.treatmentStatusWorsening}</span>
          </span>
        )
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-800 border border-amber-200">
            <Clock size={12} className="text-amber-600" />
            <span>{t.cropDoctor.treatmentStatusMonitoring}</span>
          </span>
        )
    }
  }

  const getStageLabel = (stage: DiagnosisStage) => {
    switch (stage) {
      case 'uploading':
        return t.cropDoctor.stepUploading
      case 'identifying':
        return t.cropDoctor.stepIdentifying
      case 'analyzing':
        return t.cropDoctor.stepAnalyzing
      case 'recommendations':
        return t.cropDoctor.stepRecommendations
      case 'completing':
        return t.cropDoctor.stepCompleting
      default:
        return t.cropDoctor.analyzingButton
    }
  }

  return (
    <DashboardLayout activeTab="crop-doctor">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-[#176B45]/10 px-3.5 py-1 text-xs font-semibold text-[#176B45]">
              <DnaIcon size={14} />
              <span>{t.cropDoctor.badge}</span>
            </div>
            <h1 className="mt-2 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              {t.cropDoctor.title}
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-gray-600 max-w-2xl leading-relaxed">
              {t.cropDoctor.subtitle}
            </p>
          </div>

          {/* Tab Switcher: Live vs History vs Treatment Journal */}
          <div className="inline-flex rounded-2xl bg-gray-100 p-1 border border-gray-200 self-start sm:self-auto">
            <button
              onClick={() => setActiveTab('live')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition ${activeTab === 'live'
                ? 'bg-white text-[#176B45] shadow-xs'
                : 'text-gray-600 hover:text-gray-900'
                }`}
            >
              <Camera size={14} />
              <span>{t.cropDoctor.liveDiagnosisTabTitle}</span>
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition ${activeTab === 'history'
                ? 'bg-white text-[#176B45] shadow-xs'
                : 'text-gray-600 hover:text-gray-900'
                }`}
            >
              <History size={14} />
              <span>{t.cropDoctor.historyTabTitle}</span>
              {historyRecords.length > 0 && (
                <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] bg-[#176B45]/15 text-[#176B45]">
                  {historyRecords.length}
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveTab('treatments')}
              className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition ${activeTab === 'treatments'
                ? 'bg-white text-[#176B45] shadow-xs'
                : 'text-gray-600 hover:text-gray-900'
                }`}
            >
              <BookOpen size={14} />
              <span>{t.cropDoctor.treatmentHistoryTabTitle}</span>
              {recentTreatments.length > 0 && (
                <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] bg-[#75B843]/20 text-[#176B45]">
                  {recentTreatments.length}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Error notification */}
        {errorMessage && (
          <div className="p-4 rounded-2xl border border-red-200 bg-red-50 text-xs text-red-900 flex items-start gap-2.5 animate-in fade-in">
            <AlertCircle size={18} className="mt-0.5 shrink-0 text-red-600" />
            <div className="flex-1">
              <p className="font-semibold">{t.cropDoctor.errorTitle}</p>
              <p className="mt-0.5 text-red-700 leading-relaxed">{errorMessage}</p>
            </div>
            <button
              onClick={() => setErrorMessage(null)}
              className="text-red-400 hover:text-red-600"
            >
              <X size={15} />
            </button>
          </div>
        )}

        {/* Success Notice */}
        {(saveSuccessMessage || treatmentSuccess) && (
          <div className="p-3.5 rounded-2xl border border-emerald-200 bg-emerald-50 text-xs text-emerald-900 flex items-center justify-between gap-2.5 animate-in fade-in">
            <div className="flex items-center gap-2.5">
              <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
              <p className="font-semibold">{saveSuccessMessage || treatmentSuccess}</p>
            </div>
            <button
              onClick={() => {
                setSaveSuccessMessage(null)
                setTreatmentSuccess(null)
              }}
              className="text-emerald-700 hover:text-emerald-900"
            >
              <X size={15} />
            </button>
          </div>
        )}

        {activeTab === 'live' ? (
          /* TAB 1: LIVE DIAGNOSIS WORKFLOW */
          <div className="space-y-8 animate-in fade-in">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* LEFT COLUMN: UPLOAD & IMAGE INPUT */}
              <div className="lg:col-span-5 space-y-6">
                <div className="rounded-3xl border border-gray-200 bg-white p-6 sm:p-7 shadow-xs">
                  <h3 className="text-base font-bold text-gray-900">
                    {t.cropDoctor.uploadCardTitle}
                  </h3>
                  <p className="mt-1 text-xs text-gray-500 leading-relaxed">
                    {t.cropDoctor.uploadCardDesc}
                  </p>

                  <div className="mt-5">
                    {selectedImagePreview ? (
                      <div className="space-y-4">
                        <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-gray-50 aspect-4/3 flex items-center justify-center">
                          <img
                            src={selectedImagePreview}
                            alt="Crop under analysis"
                            className="h-full w-full object-cover"
                          />
                        </div>

                        <div className="flex gap-3">
                          <label className="flex-1 cursor-pointer inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-xs font-semibold text-gray-700 hover:bg-gray-50 transition">
                            <Upload size={14} />
                            <span>{t.cropDoctor.changePhoto}</span>
                            <input
                              type="file"
                              accept="image/jpeg,image/png,image/webp,image/jpg"
                              onChange={handleFileChange}
                              className="hidden"
                            />
                          </label>

                          <button
                            type="button"
                            onClick={() => {
                              setSelectedFile(null)
                              setSelectedImagePreview(null)
                              setDiagnosisResult(null)
                              setSavedRecordId(null)
                            }}
                            className="px-3 py-2.5 rounded-xl border border-gray-200 text-gray-500 hover:text-red-600 hover:bg-red-50 transition"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </div>
                    ) : (
                      <label className="cursor-pointer border-2 border-dashed border-gray-300 hover:border-[#176B45] rounded-3xl p-8 flex flex-col items-center justify-center text-center bg-[#F6F8F1]/60 hover:bg-[#F6F8F1] transition group">
                        <div className="h-14 w-14 rounded-2xl bg-white shadow-xs border border-gray-200/80 flex items-center justify-center text-[#176B45] group-hover:scale-105 transition">
                          <Camera size={26} />
                        </div>
                        <p className="mt-4 text-xs font-bold text-gray-800">
                          {t.cropDoctor.dropzonePrompt}
                        </p>
                        <p className="mt-1 text-[11px] text-gray-500">
                          {t.cropDoctor.dropzoneHint}
                        </p>
                        <input
                          type="file"
                          accept="image/jpeg,image/png,image/webp,image/jpg"
                          onChange={handleFileChange}
                          className="hidden"
                        />
                      </label>
                    )}
                  </div>

                  {/* Primary CTA */}
                  <div className="mt-6">
                    <button
                      type="button"
                      onClick={handleAnalyzePhoto}
                      disabled={!selectedFile || isAnalyzing}
                      className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#176B45] hover:bg-[#125335] text-white text-xs font-bold shadow-md hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isAnalyzing ? (
                        <>
                          <RefreshCw size={15} className="animate-spin" />
                          <span>{getStageLabel(diagnosisStage)}</span>
                        </>
                      ) : (
                        <>
                          <Sparkles size={15} />
                          <span>{t.cropDoctor.runDiagnosisButton}</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Identification Tips */}
                <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-xs">
                  <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider flex items-center gap-1.5">
                    <Leaf size={14} className="text-[#176B45]" />
                    <span>{t.cropDoctor.guidelinesTitle}</span>
                  </h4>
                  <ul className="mt-3 space-y-2.5 text-xs text-gray-600 leading-relaxed">
                    <li className="flex items-start gap-2">
                      <span className="text-[#176B45] font-bold">•</span>
                      <span>{t.cropDoctor.guideline1}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#176B45] font-bold">•</span>
                      <span>{t.cropDoctor.guideline2}</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#176B45] font-bold">•</span>
                      <span>{t.cropDoctor.guideline3}</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* RIGHT COLUMN: DIAGNOSTIC RESULTS */}
              <div className="lg:col-span-7 space-y-6">
                <div className="rounded-3xl border border-gray-200 bg-white p-6 sm:p-8 shadow-xs">
                  <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-6">
                    <div>
                      <span className="text-[11px] font-bold tracking-wider text-[#176B45] uppercase">
                        {t.cropDoctor.liveIntelTitle}
                      </span>
                      <h3 className="text-lg font-bold text-gray-900 mt-0.5">
                        {diagnosisResult
                          ? localizeCropName(diagnosisResult.crop_name, language as 'en' | 'te' | 'hi') + ' — ' + localizeDiseaseName(diagnosisResult.disease_name, language as 'en' | 'te' | 'hi')
                          : t.cropDoctor.defaultAssessment}
                      </h3>
                    </div>

                    {diagnosisResult && (
                      <div className="flex items-center gap-2">
                        {savedRecordId ? (
                          <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-emerald-50 text-[#176B45] text-xs font-bold border border-emerald-200">
                            <CheckCircle2 size={13} />
                            <span>Saved</span>
                          </span>
                        ) : (
                          <button
                            onClick={handleSaveToHistory}
                            disabled={isSavingRecord}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-xs font-semibold text-gray-700 transition"
                          >
                            {isSavingRecord ? (
                              <RefreshCw size={13} className="animate-spin" />
                            ) : (
                              <BookmarkPlus size={13} />
                            )}
                            <span>{t.cropDoctor.saveToHistoryButton}</span>
                          </button>
                        )}
                      </div>
                    )}
                  </div>

                  {diagnosisResult ? (
                    <div className="space-y-6">
                      {/* TASK A: PLANT IDENTIFICATION */}
                      <div className="rounded-2xl border border-gray-100 bg-[#F6F8F1] p-5">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold uppercase tracking-wider text-[#176B45]">
                            {t.cropDoctor.taskATitle}
                          </span>
                          {renderConfidenceBadge(diagnosisResult.crop_identification_confidence)}
                        </div>

                        <div className="mt-3">
                          <h4 className="text-xl font-bold text-gray-900">
                            {localizeCropName(diagnosisResult.crop_name, language as 'en' | 'te' | 'hi')}
                          </h4>
                          {diagnosisResult.scientific_name && (
                            <p className="text-xs italic text-gray-500 mt-0.5">
                              {t.cropDoctor.scientificNamePrefix}: {diagnosisResult.scientific_name}
                            </p>
                          )}
                        </div>

                        {diagnosisResult.observations && diagnosisResult.observations.length > 0 && (
                          <div className="mt-3 pt-3 border-t border-gray-200/60">
                            <p className="text-xs font-bold text-gray-700">{t.cropDoctor.observedTraitsTitle}</p>
                            <ul className="mt-1.5 space-y-1 text-xs text-gray-600">
                              {diagnosisResult.observations.map((obs, idx) => (
                                <li key={idx} className="flex items-start gap-1.5">
                                  <span className="text-[#176B45] font-bold shrink-0">•</span>
                                  <span className="leading-relaxed">{obs}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>

                      {/* TASK B: PATHOLOGY & SYMPTOMS */}
                      <div className="rounded-2xl border border-gray-100 bg-gray-50 p-5">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold uppercase tracking-wider text-gray-600">
                            {t.cropDoctor.taskBTitle}
                          </span>
                          <div className="flex items-center gap-2">
                            {renderSeverityBadge(diagnosisResult.severity)}
                            {renderConfidenceBadge(diagnosisResult.disease_confidence)}
                          </div>
                        </div>

                        <h4 className="text-xl font-bold text-gray-900 mt-3">
                          {localizeDiseaseName(diagnosisResult.disease_name, language as 'en' | 'te' | 'hi')}
                        </h4>

                        {diagnosisResult.visible_symptoms && diagnosisResult.visible_symptoms.length > 0 && (
                          <div className="mt-3 pt-3 border-t border-gray-100">
                            <p className="text-xs font-bold text-gray-700">{t.cropDoctor.observableSymptomsTitle}</p>
                            <ul className="mt-1.5 space-y-1 text-xs text-gray-600">
                              {diagnosisResult.visible_symptoms.map((sym, idx) => (
                                <li key={idx} className="flex items-start gap-1.5">
                                  <span className="text-amber-600 font-bold shrink-0">•</span>
                                  <span className="leading-relaxed">{sym}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>

                      {/* Scientific Disclaimer */}
                      <div className="rounded-xl bg-gray-100/70 p-3 text-[11px] text-gray-500 leading-relaxed">
                        <strong>{t.cropDoctor.disclaimerPrefix}</strong> {diagnosisResult.disclaimer}
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-16 text-center">
                      <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-gray-400 shadow-xs">
                        {isAnalyzing ? (
                          <RefreshCw size={26} className="animate-spin text-[#176B45]" />
                        ) : (
                          <FileQuestion size={26} />
                        )}
                      </div>
                      <h4 className="text-sm font-bold text-gray-800">
                        {isAnalyzing ? getStageLabel(diagnosisStage) : t.cropDoctor.emptyStateTitle}
                      </h4>
                      <p className="mt-1 text-xs text-gray-500 max-w-sm leading-relaxed">
                        {isAnalyzing
                          ? t.cropDoctor.analyzingDesc
                          : t.cropDoctor.emptyStateDesc}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* AUTOMATIC SECTION: AI SMART CROP SOLUTION ADVISOR */}
            {diagnosisResult && (
              <div className="rounded-3xl border border-emerald-200/90 bg-white p-6 sm:p-8 shadow-sm space-y-6 animate-in fade-in">
                {/* Advisor Banner */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-gray-100">
                  <div>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#176B45]/10 text-xs font-bold text-[#176B45]">
                      <Sparkles size={14} />
                      <span>{t.cropDoctor.advisorBadge}</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mt-1.5">
                      {t.cropDoctor.advisorTitle}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 mt-0.5">
                      {t.cropDoctor.advisorSubtitle}
                    </p>
                  </div>

                  <button
                    onClick={handleOpenTreatmentModal}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#176B45] text-white text-xs font-semibold hover:bg-[#125335] shadow-sm transition self-start sm:self-auto"
                  >
                    <CheckSquare size={16} />
                    <span>{t.cropDoctor.logTreatmentButton}</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Left Column: Root Cause & Immediate Actions */}
                  <div className="space-y-6">
                    {/* Likely Cause */}
                    <div className="rounded-2xl border border-gray-200 bg-[#F6F8F1] p-5">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-gray-600 flex items-center gap-1.5">
                        <AlertCircle size={15} className="text-[#176B45]" />
                        <span>{t.cropDoctor.likelyCauseTitle}</span>
                      </h4>
                      <p className="mt-2 text-xs text-gray-800 leading-relaxed font-medium">
                        {diagnosisResult.likely_cause
                          ? (language === 'te' ? localizeText(diagnosisResult.likely_cause, 'te') : diagnosisResult.likely_cause)
                          : (language === 'te'
                            ? 'వాతావరణంలో అధిక తేమ, నీటి నిల్వ లేదా ఉష్ణోగ్రతల వ్యత్యాసాల వల్ల పంటపై వ్యాధికారక ఒత్తిడి పెరిగింది.'
                            : 'Foliar canopy humidity, ambient weather stressors, or microclimate dampness facilitated spore transmission.')}
                      </p>
                    </div>

                    {/* Immediate Actions */}
                    <div className="rounded-2xl border border-amber-200 bg-amber-50/40 p-5">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-amber-900 flex items-center gap-1.5">
                        <Clock size={15} className="text-amber-600" />
                        <span>{t.cropDoctor.immediateActionsTitle}</span>
                      </h4>
                      <ul className="mt-3 space-y-2 text-xs text-gray-800">
                        {diagnosisResult.immediate_actions && diagnosisResult.immediate_actions.length > 0 ? (
                          diagnosisResult.immediate_actions.map((act, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="h-5 w-5 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                                {idx + 1}
                              </span>
                              <span className="leading-relaxed">
                                {language === 'te' ? localizeText(act, 'te') : act}
                              </span>
                            </li>
                          ))
                        ) : (
                          <li className="flex items-start gap-2">
                            <CheckCircle2 size={14} className="mt-0.5 shrink-0 text-[#75B843]" />
                            <span className="leading-relaxed">
                              {language === 'te'
                                ? 'పొలంలో నీరు నిల్వ ఉండకుండా తక్షణం మురుగునీటి పారుదల సౌకర్యం కల్పించండి మరియు వ్యాధిగ్రస్తు ఆకులను వేరు చేయండి.'
                                : 'Ensure adequate field drainage and sanitize pruning shears/implements before working in unaffected rows.'}
                            </span>
                          </li>
                        )}
                      </ul>
                    </div>

                    {/* Organic Treatments Card */}
                    <div className="rounded-2xl border border-emerald-200 bg-white p-5 shadow-xs">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-[#176B45] flex items-center gap-1.5">
                        <Leaf size={14} />
                        <span>{t.cropDoctor.organicTreatmentsTitle}</span>
                      </h4>
                      <ul className="mt-3 space-y-2 text-xs text-gray-700">
                        {diagnosisResult.organic_treatments && diagnosisResult.organic_treatments.length > 0 ? (
                          diagnosisResult.organic_treatments.map((org, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <CheckCircle2 size={14} className="mt-0.5 shrink-0 text-[#75B843]" />
                              <span className="leading-relaxed">
                                {language === 'te' ? localizeText(org, 'te') : org}
                              </span>
                            </li>
                          ))
                        ) : (
                          <li className="text-xs text-gray-500 italic">
                            {language === 'te' ? 'సేంద్రీయ వేప నూనె లేదా జీవామృతం సిఫార్సు చేయబడింది.' : 'Neem oil spray (5ml/L) or Trichoderma harzianum bioprotection recommended.'}
                          </li>
                        )}
                      </ul>
                    </div>
                  </div>

                  {/* Right Column: Chemical Management & Recovery Plan */}
                  <div className="space-y-6">
                    {/* Chemical Guidance (Only if not uncertain) */}
                    {!diagnosisResult.is_uncertain && diagnosisResult.chemical_treatments && diagnosisResult.chemical_treatments.length > 0 && (
                      <div className="rounded-2xl border border-amber-200 bg-white p-5 shadow-xs">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-amber-800 flex items-center gap-1.5">
                          <ShieldCheck size={14} className="text-amber-600" />
                          <span>{t.cropDoctor.chemicalTreatmentsTitle}</span>
                        </h4>
                        <ul className="mt-3 space-y-2 text-xs text-gray-700">
                          {diagnosisResult.chemical_treatments.map((chem, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="text-amber-600 font-bold shrink-0">•</span>
                              <span className="leading-relaxed">
                                {language === 'te' ? localizeText(chem, 'te') : chem}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Chemical Safety Warning Banner */}
                    <div className="rounded-2xl border border-amber-200 bg-amber-50/70 p-4 text-[11px] text-amber-900 leading-relaxed">
                      <strong className="font-bold flex items-center gap-1 mb-1 text-amber-950">
                        <AlertTriangle size={13} className="text-amber-700" />
                        <span>Safety Advisory</span>
                      </strong>
                      <p>{t.cropDoctor.chemicalDisclaimerWarning}</p>
                    </div>

                    {/* Long-term Prevention */}
                    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-xs">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-gray-700 flex items-center gap-1.5">
                        <Layers size={14} />
                        <span>{t.cropDoctor.preventionTitle}</span>
                      </h4>
                      <ul className="mt-3 space-y-2 text-xs text-gray-700">
                        {diagnosisResult.prevention_steps && diagnosisResult.prevention_steps.length > 0 ? (
                          diagnosisResult.prevention_steps.map((prev, idx) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="text-[#176B45] font-bold shrink-0">•</span>
                              <span className="leading-relaxed">
                                {language === 'te' ? localizeText(prev, 'te') : prev}
                              </span>
                            </li>
                          ))
                        ) : (
                          <li className="text-xs text-gray-500 italic">
                            {language === 'te' ? 'మొక్కల మధ్య సరైన దూరం పాటించండి, పంట మార్పిడి చేయండి.' : 'Maintain spacing and rotate with non-host crops.'}
                          </li>
                        )}
                      </ul>
                    </div>

                    {/* Recovery Monitoring Plan (3-day and 7-day) */}
                    <div className="rounded-2xl border border-emerald-200 bg-[#F6F8F1] p-5 shadow-xs space-y-3">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-[#176B45] flex items-center gap-1.5">
                        <Calendar size={14} />
                        <span>{t.cropDoctor.recoveryPlanTitle}</span>
                      </h4>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                        <div className="p-3 rounded-xl bg-white border border-gray-200">
                          <span className="font-bold text-[#176B45] flex items-center gap-1">
                            <Clock size={12} />
                            {t.cropDoctor.followUp3dLabel}
                          </span>
                          <p className="mt-1 text-gray-600 leading-relaxed">
                            {diagnosisResult.recovery_monitoring?.follow_up_3d
                              ? (language === 'te' ? localizeText(diagnosisResult.recovery_monitoring.follow_up_3d, 'te') : diagnosisResult.recovery_monitoring.follow_up_3d)
                              : (language === 'te'
                                ? 'కొత్తగా ఏర్పడే మచ్చల పరిమాణాన్ని పరిశీలించండి; మచ్చల వ్యాప్తి ఆగిందో లేదో తనిఖీ చేయండి.'
                                : 'Inspect lesion margins to verify spreading has ceased.')}
                          </p>
                        </div>

                        <div className="p-3 rounded-xl bg-white border border-gray-200">
                          <span className="font-bold text-[#176B45] flex items-center gap-1">
                            <CheckCircle2 size={12} />
                            {t.cropDoctor.followUp7dLabel}
                          </span>
                          <p className="mt-1 text-gray-600 leading-relaxed">
                            {diagnosisResult.recovery_monitoring?.follow_up_7d
                              ? (language === 'te' ? localizeText(diagnosisResult.recovery_monitoring.follow_up_7d, 'te') : diagnosisResult.recovery_monitoring.follow_up_7d)
                              : (language === 'te'
                                ? 'కొత్తగా చిగురించే ఆకుల ఆరోగ్యాన్ని మరియు మొక్కల పెరుగుదలను సమీక్షించండి.'
                                : 'Evaluate new foliar shoot emergence and overall canopy vigor.')}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Treatment Logging Modal */}
            {showTreatmentModal && (
              <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
                <div className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-8 max-w-lg w-full shadow-2xl my-8 animate-in zoom-in-95">
                  <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                    <h3 className="text-base font-bold text-gray-900">
                      {t.cropDoctor.treatmentModalTitle}
                    </h3>
                    <button
                      onClick={() => setShowTreatmentModal(false)}
                      className="p-1 text-gray-400 hover:text-gray-700 rounded-lg"
                    >
                      <X size={20} />
                    </button>
                  </div>

                  <form onSubmit={handleTreatmentSubmit} className="space-y-4 mt-5 text-xs">
                    {/* Crop Verification & Match Badges */}
                    {diagnosisResult && (
                      <div className="p-3 rounded-2xl bg-gray-50 border border-gray-200 space-y-1.5">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-semibold text-gray-500">
                            Diagnosed Species:
                          </span>
                          <span className="font-bold text-gray-900">
                            {localizeCropName(diagnosisResult.crop_name, language as 'en' | 'te' | 'hi')}
                          </span>
                        </div>

                        {isDiagnosedCropMatched ? (
                          <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-[#176B45]">
                            <CheckCircle2 size={12} />
                            <span>{t.cropDoctor.cropMatchedBadge}</span>
                          </div>
                        ) : isCropMismatch ? (
                          <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-[11px] leading-relaxed flex items-start gap-1.5">
                            <AlertTriangle size={14} className="text-amber-600 shrink-0 mt-0.5" />
                            <span>{t.cropDoctor.treatmentWarningCropMismatch}</span>
                          </div>
                        ) : null}
                      </div>
                    )}

                    {/* Farm & Crop Linking */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block font-semibold text-gray-700 mb-1">
                          {t.cropDoctor.treatmentSelectFarm}
                        </label>
                        <select
                          value={treatmentForm.farm_id || ''}
                          onChange={(e) => {
                            const newFarmId = e.target.value
                            setTreatmentForm((prev) => {
                              const currentCrop = crops.find((c) => c.id === prev.crop_id)
                              const resetCrop = currentCrop && currentCrop.farm_id !== newFarmId
                              return {
                                ...prev,
                                farm_id: newFarmId,
                                crop_id: resetCrop ? '' : prev.crop_id,
                              }
                            })
                          }}
                          className="w-full px-3 py-2 rounded-xl border border-gray-300 text-gray-900 focus:border-[#176B45] outline-none bg-white"
                        >
                          <option value="">{t.cropDoctor.generalFieldLabel}</option>
                          {farms.map((f) => (
                            <option key={f.id} value={f.id}>
                              {f.farm_name}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block font-semibold text-gray-700 mb-1">
                          {t.cropDoctor.treatmentAssociatedCrop}
                        </label>
                        <select
                          value={treatmentForm.crop_id || ''}
                          onChange={(e) => setTreatmentForm({ ...treatmentForm, crop_id: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl border border-gray-300 text-gray-900 focus:border-[#176B45] outline-none bg-white"
                        >
                          <option value="">{t.cropDoctor.treatmentNoLinkedCrop}</option>
                          {cropsForSelectedFarm.map((c) => (
                            <option key={c.id} value={c.id}>
                              {localizeCropName(c.crop_name, language as 'en' | 'te' | 'hi')} {c.variety ? `(${c.variety})` : ''}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Treatment Name */}
                    <div>
                      <label className="block font-semibold text-gray-700 mb-1">
                        {t.cropDoctor.treatmentNameLabel} *
                      </label>
                      <input
                        type="text"
                        required
                        value={treatmentForm.treatment_name}
                        onChange={(e) => setTreatmentForm({ ...treatmentForm, treatment_name: e.target.value })}
                        placeholder="e.g. Neem Oil 5ml/L or Trichoderma viride"
                        className="w-full px-3 py-2 rounded-xl border border-gray-300 text-gray-900 focus:border-[#176B45] outline-none"
                      />
                    </div>

                    {/* Method & Date */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block font-semibold text-gray-700 mb-1">
                          {t.cropDoctor.treatmentTypeLabel}
                        </label>
                        <select
                          value={treatmentForm.treatment_type}
                          onChange={(e) =>
                            setTreatmentForm({
                              ...treatmentForm,
                              treatment_type: e.target.value as TreatmentType,
                            })
                          }
                          className="w-full px-3 py-2 rounded-xl border border-gray-300 text-gray-900 focus:border-[#176B45] outline-none bg-white"
                        >
                          <option value="Organic / Biological">{t.cropDoctor.treatmentTypeOrganic}</option>
                          <option value="Chemical Management">{t.cropDoctor.treatmentTypeChemical}</option>
                          <option value="Cultural / Sanitation">{t.cropDoctor.treatmentTypeCultural}</option>
                          <option value="Other">{t.cropDoctor.treatmentTypeOther}</option>
                        </select>
                      </div>

                      <div>
                        <label className="block font-semibold text-gray-700 mb-1">
                          {t.cropDoctor.applicationDateLabel}
                        </label>
                        <input
                          type="date"
                          value={treatmentForm.application_date}
                          onChange={(e) => setTreatmentForm({ ...treatmentForm, application_date: e.target.value })}
                          className="w-full px-3 py-2 rounded-xl border border-gray-300 text-gray-900 focus:border-[#176B45] outline-none bg-white"
                        />
                      </div>
                    </div>

                    {/* Application Method / Notes */}
                    <div>
                      <label className="block font-semibold text-gray-700 mb-1">
                        {t.cropDoctor.dosageOrMethodLabel}
                      </label>
                      <input
                        type="text"
                        value={treatmentForm.dosage_or_method || ''}
                        onChange={(e) => setTreatmentForm({ ...treatmentForm, dosage_or_method: e.target.value })}
                        placeholder="e.g. Foliar knapsack spray during evening hours"
                        className="w-full px-3 py-2 rounded-xl border border-gray-300 text-gray-900 focus:border-[#176B45] outline-none"
                      />
                    </div>

                    {/* Observations */}
                    <div>
                      <label className="block font-semibold text-gray-700 mb-1">
                        {t.cropDoctor.observationsLabel}
                      </label>
                      <textarea
                        rows={2}
                        value={treatmentForm.observations || ''}
                        onChange={(e) => setTreatmentForm({ ...treatmentForm, observations: e.target.value })}
                        placeholder="Weather conditions during spraying, cloud cover, soil moisture..."
                        className="w-full px-3 py-2 rounded-xl border border-gray-300 text-gray-900 focus:border-[#176B45] outline-none"
                      />
                    </div>

                    {/* Scheduled Checkpoint preview */}
                    <div className="p-3 rounded-2xl bg-emerald-50/70 border border-emerald-200">
                      <span className="text-[11px] font-bold text-[#176B45] block mb-1">
                        {t.cropDoctor.followUpCheckpointsTitle}
                      </span>
                      <div className="flex items-center justify-between text-[11px] text-gray-600">
                        <span>Day 3: {treatmentForm.follow_up_date_3d}</span>
                        <span>Day 7: {treatmentForm.follow_up_date_7d}</span>
                      </div>
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                      <button
                        type="button"
                        onClick={() => setShowTreatmentModal(false)}
                        className="px-4 py-2 rounded-xl border border-gray-200 font-semibold text-gray-700 hover:bg-gray-50 transition"
                      >
                        {t.cropDoctor.cancelButton}
                      </button>

                      <button
                        type="submit"
                        disabled={treatmentSubmitting}
                        className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-[#176B45] text-white font-semibold hover:bg-[#125335] shadow-sm transition disabled:opacity-50"
                      >
                        {treatmentSubmitting ? (
                          <RefreshCw size={14} className="animate-spin" />
                        ) : (
                          <CheckSquare size={14} />
                        )}
                        <span>{t.cropDoctor.saveTreatmentButton}</span>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        ) : activeTab === 'history' ? (
          /* TAB 2: DIAGNOSIS ARCHIVE */
          <div className="space-y-6 animate-in fade-in">
            {loadingHistory ? (
              <div className="py-20 flex flex-col items-center justify-center text-center">
                <RefreshCw size={26} className="animate-spin text-[#176B45]" />
                <p className="mt-3 text-xs text-gray-500 font-medium">Loading diagnosis archives...</p>
              </div>
            ) : historyRecords.length === 0 ? (
              <div className="p-8 sm:p-12 rounded-3xl border border-gray-200 bg-white text-center shadow-xs">
                <div className="h-16 w-16 mx-auto rounded-2xl bg-emerald-50 text-[#176B45] flex items-center justify-center mb-4">
                  <History size={32} />
                </div>
                <h3 className="text-lg font-bold text-gray-900">{t.cropDoctor.historyEmptyTitle}</h3>
                <p className="text-xs sm:text-sm text-gray-600 max-w-md mx-auto mt-2 leading-relaxed">
                  {t.cropDoctor.historyEmptyDesc}
                </p>
                <button
                  onClick={() => setActiveTab('live')}
                  className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#176B45] text-white text-xs font-semibold hover:bg-[#125335] shadow-sm transition"
                >
                  <Camera size={14} />
                  <span>{t.cropDoctor.runDiagnosisButton}</span>
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {historyRecords.map((item) => {
                  const localizedCrop = localizeCropName(item.crop_name, language as 'en' | 'te' | 'hi')
                  const localizedDisease = localizeDiseaseName(item.disease_name, language as 'en' | 'te' | 'hi')
                  const localizedSymptoms = item.visible_symptoms?.map((s) => localizeText(s, language as 'en' | 'te' | 'hi')) || []

                  return (
                    <div
                      key={item.id}
                      className="rounded-3xl border border-gray-200 bg-white p-6 shadow-xs hover:shadow-md transition flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                              {new Date(item.created_at).toLocaleDateString(language === 'te' ? 'te-IN' : language === 'hi' ? 'hi-IN' : 'en-IN')}
                            </span>
                            <h3 className="font-bold text-base text-gray-900 mt-0.5">
                              {localizedCrop}
                            </h3>
                            {item.scientific_name && (
                              <p className="text-[11px] italic text-gray-500">
                                {item.scientific_name}
                              </p>
                            )}
                          </div>

                          <button
                            onClick={() => setHistoryDeleteConfirmId(item.id)}
                            className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition"
                            title={t.cropDoctor.deleteButton}
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>

                        <div className="mt-4 p-3 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-between text-xs">
                          <span className="text-gray-700 font-medium">{localizedDisease}</span>
                          {renderSeverityBadge(item.severity)}
                        </div>

                        {localizedSymptoms.length > 0 && (
                          <div className="mt-3 text-xs text-gray-600">
                            <p className="text-[10px] uppercase font-bold text-gray-400">
                              {t.cropDoctor.historySymptomsLabel}:
                            </p>
                            <p className="mt-0.5 line-clamp-2">{localizedSymptoms.join(', ')}</p>
                          </div>
                        )}
                      </div>

                      <div className="mt-5 pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
                        <span className="text-gray-400 text-[11px] flex items-center gap-1">
                          <Calendar size={12} />
                          {new Date(item.created_at).toLocaleTimeString(language === 'te' ? 'te-IN' : language === 'hi' ? 'hi-IN' : 'en-IN', {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </span>
                        <button
                          onClick={() => setSelectedHistoryItem(item)}
                          className="inline-flex items-center gap-1 font-semibold text-[#176B45] hover:text-[#125335]"
                        >
                          <span>{t.cropDoctor.viewDetailsButton}</span>
                          <ChevronRight size={14} />
                        </button>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}

            {/* History Details Modal */}
            {selectedHistoryItem && (() => {
              const displayDiagnosis = activeModalDiagnosis || selectedHistoryItem
              const localizedCrop = localizeCropName(displayDiagnosis.crop_name, language as 'en' | 'te' | 'hi')
              const localizedDisease = localizeDiseaseName(displayDiagnosis.disease_name, language as 'en' | 'te' | 'hi')
              const localizedSymptoms = displayDiagnosis.visible_symptoms?.map((s) => localizeText(s, language as 'en' | 'te' | 'hi')) || []
              const localizedRecommendations = displayDiagnosis.recommendations?.map((r) => localizeText(r, language as 'en' | 'te' | 'hi')) || []
              const localizedDisclaimer = localizeText(displayDiagnosis.disclaimer, language as 'en' | 'te' | 'hi')
              const matchedTreatments = recentTreatments.filter((tr) => tr.diagnosis_id === selectedHistoryItem.id)

              return (
                <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
                  <div className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-8 max-w-xl w-full shadow-2xl my-8 animate-in zoom-in-95">
                    <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                      <div>
                        <span className="text-[11px] text-gray-400 uppercase font-bold">
                          {new Date(selectedHistoryItem.created_at).toLocaleDateString(language === 'te' ? 'te-IN' : language === 'hi' ? 'hi-IN' : 'en-IN')}
                        </span>
                        <h3 className="text-lg font-bold text-gray-900 mt-0.5">
                          {localizedCrop} — {localizedDisease}
                        </h3>
                        {selectedHistoryItem.scientific_name && (
                          <p className="text-xs italic text-gray-500 mt-0.5">
                            {t.cropDoctor.scientificNamePrefix}: {selectedHistoryItem.scientific_name}
                          </p>
                        )}
                      </div>
                      <button
                        onClick={() => {
                          setSelectedHistoryItem(null)
                          setActiveModalDiagnosis(null)
                        }}
                        className="p-1 text-gray-400 hover:text-gray-700 rounded-lg"
                      >
                        <X size={20} />
                      </button>
                    </div>

                    <div className="space-y-4 mt-5 text-xs">
                      <div className="flex items-center justify-between p-3 rounded-2xl bg-gray-50 border border-gray-100">
                        <div>
                          <span className="text-gray-500 font-medium">{t.cropDoctor.historySeverityLabel}:</span>
                          <div className="mt-1">{renderSeverityBadge(selectedHistoryItem.severity)}</div>
                        </div>
                        <div>
                          <span className="text-gray-500 font-medium">{t.cropDoctor.historyConfidenceLabel}:</span>
                          <div className="mt-1">{renderConfidenceBadge(selectedHistoryItem.disease_confidence)}</div>
                        </div>
                      </div>

                      {localizedSymptoms.length > 0 && (
                        <div>
                          <strong className="block text-gray-700 font-bold mb-1">
                            {t.cropDoctor.historySymptomsLabel}:
                          </strong>
                          <ul className="list-disc pl-4 space-y-1 text-gray-600">
                            {localizedSymptoms.map((sym, i) => (
                              <li key={i}>{sym}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {localizedRecommendations.length > 0 && (
                        <div>
                          <strong className="block text-gray-700 font-bold mb-1">
                            {t.cropDoctor.historyRecommendationsLabel}:
                          </strong>
                          <ul className="list-disc pl-4 space-y-1 text-gray-600">
                            {localizedRecommendations.map((rec, i) => (
                              <li key={i}>{rec}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Linked Treatments Journal */}
                      {matchedTreatments.length > 0 && (
                        <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200">
                          <strong className="block text-[#176B45] font-bold mb-2 flex items-center gap-1.5">
                            <CheckSquare size={14} />
                            <span>Logged Treatments:</span>
                          </strong>
                          <div className="space-y-2">
                            {matchedTreatments.map((tr) => (
                              <div key={tr.id} className="p-2.5 rounded-xl bg-white border border-emerald-100">
                                <div className="flex justify-between items-center font-semibold text-gray-800">
                                  <span>{tr.treatment_name}</span>
                                  <span className="text-[10px] text-gray-400">{tr.application_date}</span>
                                </div>
                                <div className="text-[11px] text-gray-500 mt-0.5">
                                  <span>Type: {tr.treatment_type}</span>
                                  {tr.dosage_or_method && <span> · Method: {tr.dosage_or_method}</span>}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="p-3 rounded-xl bg-gray-100 text-[11px] text-gray-500 leading-relaxed">
                        <strong>{t.cropDoctor.disclaimerPrefix}</strong> {localizedDisclaimer}
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-gray-100 flex justify-end">
                      <button
                        onClick={() => {
                          setSelectedHistoryItem(null)
                          setActiveModalDiagnosis(null)
                        }}
                        className="px-5 py-2.5 rounded-xl bg-gray-100 text-xs font-semibold text-gray-700 hover:bg-gray-200 transition"
                      >
                        {t.cropDoctor.closeModalButton}
                      </button>
                    </div>
                  </div>
                </div>
              )
            })()}

            {/* Delete Confirmation Modal */}
            {historyDeleteConfirmId && (
              <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
                <div className="bg-white rounded-3xl border border-gray-200 p-6 max-w-sm w-full shadow-2xl animate-in zoom-in-95">
                  <h3 className="text-base font-bold text-gray-900">{t.cropDoctor.deleteRecordTitle}</h3>
                  <p className="mt-2 text-xs text-gray-600 leading-relaxed">
                    {t.cropDoctor.deleteHistoryConfirm}
                  </p>
                  <div className="mt-5 flex gap-3">
                    <button
                      type="button"
                      onClick={() => setHistoryDeleteConfirmId(null)}
                      className="flex-1 py-2.5 rounded-xl border border-gray-200 text-xs font-semibold text-gray-700 hover:bg-gray-50 transition"
                    >
                      {t.cropDoctor.cancelButton}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteHistory(historyDeleteConfirmId)}
                      className="flex-1 py-2.5 rounded-xl bg-red-600 text-xs font-semibold text-white hover:bg-red-700 transition"
                    >
                      {t.cropDoctor.deleteButton}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* TAB 3: DEDICATED TREATMENT JOURNAL & RECOVERY FOLLOW-UPS */
          <div className="space-y-6 animate-in fade-in">
            {loadingTreatments ? (
              <div className="py-20 flex flex-col items-center justify-center text-center">
                <RefreshCw size={26} className="animate-spin text-[#176B45]" />
                <p className="mt-3 text-xs text-gray-500 font-medium">Loading treatment journal...</p>
              </div>
            ) : recentTreatments.length === 0 ? (
              <div className="p-8 sm:p-12 rounded-3xl border border-gray-200 bg-white text-center shadow-xs">
                <div className="h-16 w-16 mx-auto rounded-2xl bg-emerald-50 text-[#176B45] flex items-center justify-center mb-4">
                  <BookOpen size={32} />
                </div>
                <h3 className="text-lg font-bold text-gray-900">{t.cropDoctor.treatmentHistoryEmptyTitle}</h3>
                <p className="text-xs sm:text-sm text-gray-600 max-w-md mx-auto mt-2 leading-relaxed">
                  {t.cropDoctor.treatmentHistoryEmptyDesc}
                </p>
                <button
                  onClick={() => setActiveTab('live')}
                  className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#176B45] text-white text-xs font-semibold hover:bg-[#125335] shadow-sm transition"
                >
                  <Camera size={14} />
                  <span>{t.cropDoctor.runDiagnosisButton}</span>
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {recentTreatments.map((tr) => {
                  const linkedFarm = farms.find((f) => f.id === tr.farm_id)
                  const linkedCrop = crops.find((c) => c.id === tr.crop_id)

                  return (
                    <div
                      key={tr.id}
                      className="rounded-3xl border border-gray-200 bg-white p-6 shadow-xs hover:shadow-md transition flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                              {new Date(tr.application_date).toLocaleDateString(language === 'te' ? 'te-IN' : language === 'hi' ? 'hi-IN' : 'en-IN')}
                            </span>
                            <h3 className="font-bold text-base text-gray-900 mt-0.5">
                              {tr.treatment_name}
                            </h3>
                            <p className="text-[11px] text-gray-500">
                              {linkedFarm ? linkedFarm.farm_name : t.cropDoctor.generalFieldLabel}
                              {linkedCrop ? ` · ${localizeCropName(linkedCrop.crop_name, language as 'en' | 'te' | 'hi')}` : ''}
                            </p>
                          </div>

                          <button
                            onClick={() => handleDeleteTreatment(tr.id)}
                            className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition"
                            title={t.cropDoctor.deleteButton}
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>

                        <div className="mt-3 flex items-center justify-between text-xs">
                          <span className="px-2 py-0.5 rounded-md bg-gray-100 text-gray-700 font-medium text-[11px]">
                            {tr.treatment_type}
                          </span>
                          {renderRecoveryStatusBadge(tr.recovery_status)}
                        </div>

                        {tr.dosage_or_method && (
                          <div className="mt-3 text-xs text-gray-600">
                            <span className="font-semibold text-gray-700">Method: </span>
                            <span>{tr.dosage_or_method}</span>
                          </div>
                        )}

                        {tr.observations && (
                          <div className="mt-2 text-xs text-gray-600 italic">
                            <span>"{tr.observations}"</span>
                          </div>
                        )}

                        {/* Follow-up Checkpoints */}
                        <div className="mt-4 pt-3 border-t border-gray-100 grid grid-cols-2 gap-2 text-[11px]">
                          <div className="p-2 rounded-xl bg-gray-50 border border-gray-100">
                            <span className="font-bold text-gray-500 block">3-Day Check</span>
                            <span className="text-gray-800 font-semibold">{tr.follow_up_date_3d || 'N/A'}</span>
                          </div>
                          <div className="p-2 rounded-xl bg-gray-50 border border-gray-100">
                            <span className="font-bold text-gray-500 block">7-Day Assess</span>
                            <span className="text-gray-800 font-semibold">{tr.follow_up_date_7d || 'N/A'}</span>
                          </div>
                        </div>
                      </div>

                      <div className="mt-5 pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
                        {tr.diagnosis_id ? (
                          <span className="inline-flex items-center gap-1 text-[10px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded-md">
                            <CheckCircle2 size={11} />
                            <span>AI Linked</span>
                          </span>
                        ) : (
                          <span className="text-gray-400 text-[10px]">Field Log</span>
                        )}

                        <button
                          onClick={() => {
                            setSelectedTreatmentToUpdate(tr)
                            setUpdatingRecoveryStatus(tr.recovery_status)
                            setUpdatingObservations(tr.observations || '')
                          }}
                          className="inline-flex items-center gap-1 font-semibold text-[#176B45] hover:text-[#125335]"
                        >
                          <span>{t.cropDoctor.updateRecoveryStatusTitle}</span>
                          <ChevronRight size={14} />
                        </button>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}

            {/* Update Recovery Status Modal */}
            {selectedTreatmentToUpdate && (
              <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
                <div className="bg-white rounded-3xl border border-gray-200 p-6 sm:p-7 max-w-md w-full shadow-2xl animate-in zoom-in-95">
                  <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                    <h3 className="text-base font-bold text-gray-900">
                      {t.cropDoctor.updateRecoveryStatusTitle}
                    </h3>
                    <button
                      onClick={() => setSelectedTreatmentToUpdate(null)}
                      className="p-1 text-gray-400 hover:text-gray-700 rounded-lg"
                    >
                      <X size={20} />
                    </button>
                  </div>

                  <form onSubmit={handleSaveRecoveryStatusUpdate} className="space-y-4 mt-4 text-xs">
                    <div>
                      <p className="font-bold text-gray-900">{selectedTreatmentToUpdate.treatment_name}</p>
                      <p className="text-[11px] text-gray-500 mt-0.5">
                        Applied: {selectedTreatmentToUpdate.application_date}
                      </p>
                    </div>

                    <div>
                      <label className="block font-semibold text-gray-700 mb-1">
                        Recovery Status (Based on Field Observation)
                      </label>
                      <select
                        value={updatingRecoveryStatus}
                        onChange={(e) => setUpdatingRecoveryStatus(e.target.value as RecoveryStatus)}
                        className="w-full px-3 py-2 rounded-xl border border-gray-300 text-gray-900 focus:border-[#176B45] outline-none bg-white"
                      >
                        <option value="Under Monitoring">{t.cropDoctor.treatmentStatusMonitoring}</option>
                        <option value="Recovering">{t.cropDoctor.treatmentStatusImproving}</option>
                        <option value="Resolved">{t.cropDoctor.treatmentStatusResolved}</option>
                        <option value="Needs Follow-up">{t.cropDoctor.treatmentStatusWorsening}</option>
                      </select>
                    </div>

                    <div>
                      <label className="block font-semibold text-gray-700 mb-1">
                        Updated Field Observations
                      </label>
                      <textarea
                        rows={3}
                        value={updatingObservations}
                        onChange={(e) => setUpdatingObservations(e.target.value)}
                        placeholder="Inspect lesion perimeters or foliar regrowth. Record actual status..."
                        className="w-full px-3 py-2 rounded-xl border border-gray-300 text-gray-900 focus:border-[#176B45] outline-none"
                      />
                    </div>

                    <div className="flex justify-end gap-3 pt-3 border-t border-gray-100">
                      <button
                        type="button"
                        onClick={() => setSelectedTreatmentToUpdate(null)}
                        className="px-4 py-2 rounded-xl border border-gray-200 font-semibold text-gray-700 hover:bg-gray-50 transition"
                      >
                        {t.cropDoctor.cancelButton}
                      </button>

                      <button
                        type="submit"
                        disabled={isUpdatingTreatment}
                        className="inline-flex items-center gap-2 px-5 py-2 rounded-xl bg-[#176B45] text-white font-semibold hover:bg-[#125335] shadow-sm transition disabled:opacity-50"
                      >
                        {isUpdatingTreatment ? (
                          <RefreshCw size={14} className="animate-spin" />
                        ) : (
                          <CheckSquare size={14} />
                        )}
                        <span>{t.cropDoctor.saveStatusButton}</span>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}

export default CropDoctorPage
