export type SeverityLevel = 'Low' | 'Medium' | 'High'

export interface RecoveryMonitoringPlan {
  follow_up_3d: string
  follow_up_7d: string
}

export interface CropDiagnosisResult {
  crop_name: string
  scientific_name?: string
  crop_identification_confidence: number // 0.0 - 1.0
  disease_name: string
  disease_confidence: number // 0.0 - 1.0
  severity?: SeverityLevel // Low | Medium | High
  likely_cause?: string // Underlying cause of disease / stress
  immediate_actions?: string[] // Rapid mitigation steps for farmer
  organic_treatments?: string[] // Organic / natural treatment methods
  chemical_treatments?: string[] // Cautious chemical active ingredients
  prevention_steps?: string[] // Long term cultural / preventive methods
  recovery_monitoring?: RecoveryMonitoringPlan // 3-day and 7-day follow up plan
  visible_symptoms: string[]
  observations: string[]
  recommendations: string[]
  is_uncertain: boolean
  disclaimer: string
}

export interface CropDiagnosisRecord extends CropDiagnosisResult {
  id: string
  farmer_id: string
  created_at: string
  updated_at: string
  image_url?: string | null
}

export type TreatmentType =
  | 'Organic / Biological'
  | 'Chemical Management'
  | 'Cultural / Sanitation'
  | 'Other'

export type RecoveryStatus =
  | 'Under Monitoring'
  | 'Recovering'
  | 'Resolved'
  | 'Needs Follow-up'

export interface CropTreatmentRecord {
  id: string
  farmer_id: string
  farm_id?: string | null
  crop_id?: string | null
  diagnosis_id?: string | null
  treatment_name: string
  treatment_type: TreatmentType
  application_date: string
  dosage_or_method?: string | null
  observations?: string | null
  follow_up_date_3d?: string | null
  follow_up_date_7d?: string | null
  recovery_status: RecoveryStatus
  created_at: string
  updated_at: string
}

export interface CreateTreatmentInput {
  farm_id?: string | null
  crop_id?: string | null
  diagnosis_id?: string | null
  treatment_name: string
  treatment_type: TreatmentType
  application_date: string
  dosage_or_method?: string | null
  observations?: string | null
  follow_up_date_3d?: string | null
  follow_up_date_7d?: string | null
  recovery_status?: RecoveryStatus
}

export interface DiagnosisTranslationRecord {
  id: string
  diagnosis_id: string
  farmer_id: string
  target_language: 'en' | 'te' | 'hi'
  translated_diagnosis: CropDiagnosisResult
  created_at: string
  updated_at: string
}
