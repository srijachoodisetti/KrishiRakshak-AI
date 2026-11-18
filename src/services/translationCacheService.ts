import { supabase } from '../lib/supabase'
import type {
  CropDiagnosisResult,
  CropDiagnosisRecord,
  DiagnosisTranslationRecord,
} from '../types/diagnosis'
import {
  localizeCropName,
  localizeDiseaseName,
  localizeText,
} from '../utils/cropTranslations'
import { validateDiagnosisJSON } from './cropDiagnosisService'

// In-memory request deduplication map to prevent redundant concurrent translation calls
const inFlightTranslations = new Map<string, Promise<CropDiagnosisResult>>()

/**
 * Checks if a diagnosis record is already naturally in the requested language.
 */
export function isDiagnosisAlreadyInLanguage(
  diagnosis: CropDiagnosisResult | CropDiagnosisRecord,
  targetLang: 'en' | 'te' | 'hi'
): boolean {
  const crop = (diagnosis.crop_name || '').trim()
  const disease = (diagnosis.disease_name || '').trim()

  const teluguRegex = /[\u0C00-\u0C7F]/
  const hindiRegex = /[\u0900-\u097F]/

  const hasTelugu = teluguRegex.test(crop) || teluguRegex.test(disease)
  const hasHindi = hindiRegex.test(crop) || hindiRegex.test(disease)

  if (targetLang === 'te') {
    return hasTelugu
  }
  if (targetLang === 'hi') {
    return hasHindi
  }
  if (targetLang === 'en') {
    return !hasTelugu && !hasHindi
  }

  return false
}

/**
 * Fetches cached translation from Supabase diagnosis_translations table.
 */
export async function getCachedTranslation(
  diagnosisId: string,
  targetLang: 'en' | 'te' | 'hi'
): Promise<DiagnosisTranslationRecord | null> {
  try {
    const { data, error } = await supabase
      .from('diagnosis_translations')
      .select('*')
      .eq('diagnosis_id', diagnosisId)
      .eq('target_language', targetLang)
      .maybeSingle()

    if (error) {
      if (import.meta.env.DEV) {
        console.warn('[getCachedTranslation warning]', error.message)
      }
      return null
    }

    return data as DiagnosisTranslationRecord | null
  } catch {
    return null
  }
}

/**
 * Saves a translated structured diagnosis into the Supabase diagnosis_translations cache.
 */
export async function saveTranslationToCache(
  diagnosisId: string,
  farmerId: string,
  targetLang: 'en' | 'te' | 'hi',
  translatedDiagnosis: CropDiagnosisResult
): Promise<DiagnosisTranslationRecord | null> {
  try {
    const payload = {
      diagnosis_id: diagnosisId,
      farmer_id: farmerId,
      target_language: targetLang,
      translated_diagnosis: translatedDiagnosis,
    }

    const { data, error } = await supabase
      .from('diagnosis_translations')
      .upsert(payload, { onConflict: 'diagnosis_id,target_language' })
      .select()
      .maybeSingle()

    if (error) {
      if (import.meta.env.DEV) {
        console.warn('[saveTranslationToCache warning]', error.message)
      }
      return null
    }

    return data as DiagnosisTranslationRecord | null
  } catch (err) {
    if (import.meta.env.DEV) {
      console.warn('[saveTranslationToCache error]', err)
    }
    return null
  }
}

/**
 * Fast client-side dictionary fallback translation with 100% preservation of Latin names.
 */
export function buildFallbackTranslation(
  record: CropDiagnosisRecord | CropDiagnosisResult,
  targetLang: 'en' | 'te' | 'hi'
): CropDiagnosisResult {
  return {
    ...record,
    crop_name: localizeCropName(record.crop_name, targetLang),
    disease_name: localizeDiseaseName(record.disease_name, targetLang),
    likely_cause: record.likely_cause ? localizeText(record.likely_cause, targetLang) : undefined,
    visible_symptoms: record.visible_symptoms?.map((s) => localizeText(s, targetLang)) || [],
    observations: record.observations?.map((o) => localizeText(o, targetLang)) || [],
    immediate_actions: record.immediate_actions?.map((a) => localizeText(a, targetLang)) || [],
    organic_treatments: record.organic_treatments?.map((t) => localizeText(t, targetLang)) || [],
    chemical_treatments: record.chemical_treatments?.map((c) => localizeText(c, targetLang)) || [],
    prevention_steps: record.prevention_steps?.map((p) => localizeText(p, targetLang)) || [],
    recommendations: record.recommendations?.map((r) => localizeText(r, targetLang)) || [],
    disclaimer: record.disclaimer ? localizeText(record.disclaimer, targetLang) : record.disclaimer,
    recovery_monitoring: record.recovery_monitoring
      ? {
          follow_up_3d: localizeText(record.recovery_monitoring.follow_up_3d, targetLang),
          follow_up_7d: localizeText(record.recovery_monitoring.follow_up_7d, targetLang),
        }
      : undefined,
  }
}

/**
 * Gets or requests a localized diagnosis for history items:
 * 1. Checks if original is already in target language -> return original.
 * 2. Checks Supabase diagnosis_translations table -> return cached translation.
 * 3. Invokes Edge Function with existing Gemini integration (action: 'translate_diagnosis') -> stores in cache -> returns.
 * 4. Graceful localized fallback using local dictionary if API/network fails.
 */
export async function getOrTranslateDiagnosis(
  diagnosis: CropDiagnosisRecord,
  targetLang: 'en' | 'te' | 'hi',
  farmerId: string
): Promise<CropDiagnosisResult> {
  // 1. Is original already in target language?
  if (isDiagnosisAlreadyInLanguage(diagnosis, targetLang)) {
    return diagnosis
  }

  // 2. Check Supabase translation cache
  const cached = await getCachedTranslation(diagnosis.id, targetLang)
  if (cached && cached.translated_diagnosis) {
    return cached.translated_diagnosis
  }

  // Deduplication check
  const cacheKey = `${diagnosis.id}_${targetLang}`
  if (inFlightTranslations.has(cacheKey)) {
    return inFlightTranslations.get(cacheKey)!
  }

  const translationPromise = (async (): Promise<CropDiagnosisResult> => {
    try {
      const sourcePayload = {
        crop_name: diagnosis.crop_name,
        scientific_name: diagnosis.scientific_name,
        crop_identification_confidence: diagnosis.crop_identification_confidence,
        disease_name: diagnosis.disease_name,
        disease_confidence: diagnosis.disease_confidence,
        severity: diagnosis.severity,
        likely_cause: diagnosis.likely_cause,
        immediate_actions: diagnosis.immediate_actions,
        visible_symptoms: diagnosis.visible_symptoms,
        observations: diagnosis.observations,
        organic_treatments: diagnosis.organic_treatments,
        chemical_treatments: diagnosis.chemical_treatments,
        prevention_steps: diagnosis.prevention_steps,
        recovery_monitoring: diagnosis.recovery_monitoring,
        recommendations: diagnosis.recommendations,
        disclaimer: diagnosis.disclaimer,
      }

      const { data, error } = await supabase.functions.invoke('crop-diagnosis', {
        body: {
          action: 'translate_diagnosis',
          sourceDiagnosis: sourcePayload,
          targetLanguage: targetLang,
        },
      })

      if (error || !data) {
        throw new Error(error?.message || 'Failed to translate via Edge Function.')
      }

      const validated = validateDiagnosisJSON(data)

      // Save successful translation to Supabase cache
      await saveTranslationToCache(diagnosis.id, farmerId, targetLang, validated)

      return validated
    } catch (err) {
      if (import.meta.env.DEV) {
        console.warn('[getOrTranslateDiagnosis Edge Function fallback to local dict]', err)
      }
      // Return instant local fallback translation preserving Latin names
      return buildFallbackTranslation(diagnosis, targetLang)
    } finally {
      inFlightTranslations.delete(cacheKey)
    }
  })()

  inFlightTranslations.set(cacheKey, translationPromise)
  return translationPromise
}
