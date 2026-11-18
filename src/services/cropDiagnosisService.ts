import { supabase } from '../lib/supabase'
import type {
  CropDiagnosisResult,
  CropDiagnosisRecord,
  SeverityLevel,
  CropTreatmentRecord,
  CreateTreatmentInput,
  RecoveryMonitoringPlan,
} from '../types/diagnosis'

// Safe helper to strip any HTML entities in browser (e.g. &#x50;, &amp;)
export function decodeEntities(text: string): string {
  if (!text) return ''
  return text
    .replace(/&#x([0-9a-fA-F]+);/g, (_, hex) => String.fromCharCode(parseInt(hex, 16)))
    .replace(/&#([0-9]+);/g, (_, dec) => String.fromCharCode(parseInt(dec, 10)))
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
}

function cleanArray(arr: unknown): string[] {
  if (!Array.isArray(arr)) return []
  return arr.map((item) => decodeEntities(String(item).trim())).filter(Boolean)
}

/**
 * Converts a browser File object to a raw base64 string (without the data URL prefix)
 */
export async function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      const result = reader.result as string
      // Strip data:image/...;base64, prefix
      const base64Data = result.split(',')[1]
      resolve(base64Data)
    }
    reader.onerror = (error) => reject(error)
    reader.readAsDataURL(file)
  })
}

/**
 * Validates and sanitizes the parsed AI diagnosis JSON received from Edge Function
 */
export function validateDiagnosisJSON(raw: unknown): CropDiagnosisResult {
  if (!raw || typeof raw !== 'object') {
    throw new Error('Diagnostic service returned an invalid response structure.')
  }

  const obj = raw as Record<string, unknown>

  const crop_name = decodeEntities(typeof obj.crop_name === 'string' && obj.crop_name.trim() ? obj.crop_name.trim() : 'Unknown Crop')
  const scientific_name = typeof obj.scientific_name === 'string' && obj.scientific_name.trim() ? decodeEntities(obj.scientific_name.trim()) : undefined

  // Real confidence bounds - clamp and round cleanly
  const rawCropConf = typeof obj.crop_identification_confidence === 'number' ? obj.crop_identification_confidence : 0.5
  const crop_confidence = Math.min(1.0, Math.max(0.1, Number(rawCropConf.toFixed(2))))

  const disease_name = decodeEntities(typeof obj.disease_name === 'string' && obj.disease_name.trim() ? obj.disease_name.trim() : 'Indeterminate')
  const rawDisConf = typeof obj.disease_confidence === 'number' ? obj.disease_confidence : 0.5
  const disease_confidence = Math.min(1.0, Math.max(0.1, Number(rawDisConf.toFixed(2))))

  let severity: SeverityLevel = 'Low'
  if (typeof obj.severity === 'string') {
    const s = obj.severity.trim().toLowerCase()
    if (s.includes('high') || s.includes('ఎక్కువ') || s.includes('తీవ్ర')) severity = 'High'
    else if (s.includes('med') || s.includes('మధ్య')) severity = 'Medium'
    else severity = 'Low'
  } else if (disease_name.toLowerCase().includes('healthy') || disease_name.includes('ఆరోగ్య')) {
    severity = 'Low'
  }

  const likely_cause = typeof obj.likely_cause === 'string' ? decodeEntities(obj.likely_cause.trim()) : undefined
  const immediate_actions = cleanArray(obj.immediate_actions)
  const visible_symptoms = cleanArray(obj.visible_symptoms)
  const observations = cleanArray(obj.observations)
  const organic_treatments = cleanArray(obj.organic_treatments)
  const chemical_treatments = cleanArray(obj.chemical_treatments)
  const prevention_steps = cleanArray(obj.prevention_steps)
  const recommendations = cleanArray(obj.recommendations)

  let recovery_monitoring: RecoveryMonitoringPlan | undefined
  if (obj.recovery_monitoring && typeof obj.recovery_monitoring === 'object') {
    const rec = obj.recovery_monitoring as Record<string, unknown>
    recovery_monitoring = {
      follow_up_3d: decodeEntities(String(rec.follow_up_3d || '')),
      follow_up_7d: decodeEntities(String(rec.follow_up_7d || '')),
    }
  }

  const is_uncertain = Boolean(obj.is_uncertain) || crop_confidence < 0.6 || disease_confidence < 0.4

  const disclaimer = decodeEntities(
    typeof obj.disclaimer === 'string' && obj.disclaimer.trim()
      ? obj.disclaimer.trim()
      : 'AI-assisted preliminary assessment. Confirm with an agricultural expert or extension officer before chemical application.'
  )

  return {
    crop_name,
    scientific_name,
    crop_identification_confidence: crop_confidence,
    disease_name,
    disease_confidence,
    severity,
    likely_cause,
    immediate_actions,
    visible_symptoms,
    observations,
    organic_treatments,
    chemical_treatments,
    prevention_steps,
    recovery_monitoring,
    recommendations,
    is_uncertain,
    disclaimer,
  }
}

/**
 * Analyzes crop leaf photo directly in requested language (English or Telugu)
 * Single fast round-trip without redundant translation calls.
 */
export async function analyzeCropPhoto(
  file: File,
  language: 'en' | 'te' | 'hi' = 'en'
): Promise<CropDiagnosisResult> {
  // Validate file type
  const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg']
  if (!validTypes.includes(file.type.toLowerCase()) && !file.type.startsWith('image/')) {
    throw new Error('Invalid file type. Please upload a valid image (JPEG, PNG, WEBP).')
  }

  if (file.size > 10 * 1024 * 1024) {
    throw new Error('Image size exceeds 10MB limit. Please upload a compressed or smaller photograph.')
  }

  const base64Data = await fileToBase64(file)
  const mimeType = file.type || 'image/jpeg'

  // Single fast invocation directly requesting target language output
  const { data, error } = await supabase.functions.invoke('crop-diagnosis', {
    body: {
      imageBase64: base64Data,
      mimeType,
      language,
    },
  })

  if (error) {
    let errorDetail = error.message || 'Server error occurred during diagnosis.'

    if ('context' in error && error.context && typeof error.context === 'object') {
      try {
        const responseContext = error.context as Response
        if (typeof responseContext.json === 'function') {
          const jsonErr = await responseContext.json()
          if (jsonErr?.error) {
            errorDetail = jsonErr.error
          }
        }
      } catch {
        // fallback to original error detail
      }
    }

    if (
      errorDetail.includes('FunctionsFetchError') ||
      errorDetail.includes('Failed to send a request to the Edge Function') ||
      errorDetail.includes('not found')
    ) {
      throw new Error(
        'The Supabase Edge Function "crop-diagnosis" is not deployed yet. Please deploy it using: `supabase functions deploy crop-diagnosis`.'
      )
    }

    throw new Error(errorDetail)
  }

  return validateDiagnosisJSON(data)
}

/**
 * Saves a diagnosis record to Supabase crop_diagnoses table
 */
export async function saveDiagnosisRecord(
  farmerId: string | undefined,
  diagnosis: CropDiagnosisResult,
  imageUrl?: string | null
): Promise<CropDiagnosisRecord> {
  const { data: authData, error: authError } = await supabase.auth.getUser()
  if (authError || !authData.user) {
    throw new Error('Authentication required. Please log in.')
  }

  const verifiedUserId = authData.user.id
  const targetId = farmerId || verifiedUserId

  const payload = {
    farmer_id: targetId,
    crop_name: diagnosis.crop_name,
    scientific_name: diagnosis.scientific_name || null,
    crop_identification_confidence: diagnosis.crop_identification_confidence,
    disease_name: diagnosis.disease_name,
    disease_confidence: diagnosis.disease_confidence,
    severity: diagnosis.severity || 'Low',
    visible_symptoms: diagnosis.visible_symptoms,
    observations: diagnosis.observations,
    recommendations: diagnosis.recommendations,
    is_uncertain: diagnosis.is_uncertain,
    disclaimer: diagnosis.disclaimer,
    image_url: imageUrl || null,
  }

  const { data, error } = await supabase
    .from('crop_diagnoses')
    .insert([payload])
    .select()
    .single()

  if (error) {
    if (import.meta.env.DEV) {
      console.error('[saveDiagnosisRecord Supabase error]', error)
    }
    throw new Error(error.message || 'Failed to save diagnosis record to database.')
  }

  return data as CropDiagnosisRecord
}

/**
 * Fetches diagnosis history for the authenticated farmer
 */
export async function fetchFarmerDiagnosisHistory(farmerId?: string): Promise<CropDiagnosisRecord[]> {
  const { data: authData, error: authError } = await supabase.auth.getUser()
  if (authError || !authData.user) {
    throw new Error('Authentication required. Please log in.')
  }

  const verifiedUserId = authData.user.id
  const targetId = farmerId || verifiedUserId

  const { data, error } = await supabase
    .from('crop_diagnoses')
    .select('*')
    .eq('farmer_id', targetId)
    .order('created_at', { ascending: false })

  if (error) {
    if (import.meta.env.DEV) {
      console.error('[fetchFarmerDiagnosisHistory Supabase error]', error)
    }
    throw error
  }

  return (data || []) as CropDiagnosisRecord[]
}

/**
 * Deletes a diagnosis record by ID (enforced by RLS)
 */
export async function deleteDiagnosisRecord(recordId: string): Promise<void> {
  const { data: authData, error: authError } = await supabase.auth.getUser()
  if (authError || !authData.user) {
    throw new Error('Authentication required.')
  }

  const { error } = await supabase
    .from('crop_diagnoses')
    .delete()
    .eq('id', recordId)

  if (error) {
    throw error
  }
}

/**
 * AI Smart Crop Solution Advisor: Saves a farmer treatment action log in Supabase
 */
export async function createCropTreatment(input: CreateTreatmentInput): Promise<CropTreatmentRecord> {
  const { data: authData, error: authError } = await supabase.auth.getUser()
  if (authError || !authData.user) {
    throw new Error('Authentication required. Please log in.')
  }

  const verifiedUserId = authData.user.id

  const payload = {
    farmer_id: verifiedUserId,
    farm_id: input.farm_id || null,
    crop_id: input.crop_id || null,
    diagnosis_id: input.diagnosis_id || null,
    treatment_name: input.treatment_name.trim(),
    treatment_type: input.treatment_type,
    application_date: input.application_date || new Date().toISOString().split('T')[0],
    dosage_or_method: input.dosage_or_method?.trim() || null,
    observations: input.observations?.trim() || null,
    follow_up_date_3d: input.follow_up_date_3d || null,
    follow_up_date_7d: input.follow_up_date_7d || null,
    recovery_status: input.recovery_status || 'Under Monitoring',
  }

  const { data, error } = await supabase
    .from('crop_treatments')
    .insert([payload])
    .select()
    .single()

  if (error) {
    if (import.meta.env.DEV) {
      console.error('[createCropTreatment Supabase error]', error)
    }
    throw new Error(error.message || 'Failed to save crop treatment record.')
  }

  return data as CropTreatmentRecord
}

/**
 * AI Smart Crop Solution Advisor: Fetches treatment records for the authenticated farmer
 */
export async function fetchFarmerTreatments(diagnosisId?: string): Promise<CropTreatmentRecord[]> {
  const { data: authData, error: authError } = await supabase.auth.getUser()
  if (authError || !authData.user) {
    throw new Error('Authentication required. Please log in.')
  }

  let query = supabase
    .from('crop_treatments')
    .select('*')
    .eq('farmer_id', authData.user.id)
    .order('application_date', { ascending: false })
    .order('created_at', { ascending: false })

  if (diagnosisId) {
    query = query.eq('diagnosis_id', diagnosisId)
  }

  const { data, error } = await query

  if (error) {
    if (import.meta.env.DEV) {
      console.error('[fetchFarmerTreatments Supabase error]', error)
    }
    throw error
  }

  return (data || []) as CropTreatmentRecord[]
}

/**
 * AI Smart Crop Solution Advisor: Updates recovery status and observations for a treatment record
 */
export async function updateCropTreatmentRecovery(
  treatmentId: string,
  recoveryStatus: string,
  observations?: string
): Promise<CropTreatmentRecord> {
  const { data: authData, error: authError } = await supabase.auth.getUser()
  if (authError || !authData.user) {
    throw new Error('Authentication required.')
  }

  const updates: Record<string, unknown> = {
    recovery_status: recoveryStatus,
    updated_at: new Date().toISOString(),
  }

  if (observations !== undefined) {
    updates.observations = observations.trim() || null
  }

  const { data, error } = await supabase
    .from('crop_treatments')
    .update(updates)
    .eq('id', treatmentId)
    .eq('farmer_id', authData.user.id)
    .select()
    .single()

  if (error) {
    if (import.meta.env.DEV) {
      console.error('[updateCropTreatmentRecovery error]', error)
    }
    throw new Error(error.message || 'Failed to update recovery status.')
  }

  return data as CropTreatmentRecord
}

/**
 * Deletes a treatment record by ID (enforced by RLS)
 */
export async function deleteCropTreatment(treatmentId: string): Promise<void> {
  const { data: authData, error: authError } = await supabase.auth.getUser()
  if (authError || !authData.user) {
    throw new Error('Authentication required.')
  }

  const { error } = await supabase
    .from('crop_treatments')
    .delete()
    .eq('id', treatmentId)
    .eq('farmer_id', authData.user.id)

  if (error) {
    throw error
  }
}

