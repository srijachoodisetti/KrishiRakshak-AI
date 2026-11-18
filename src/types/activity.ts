export type FarmActivityType =
  | 'Irrigation'
  | 'Fertilizer application'
  | 'Pesticide application'
  | 'Sowing'
  | 'Weeding'
  | 'Harvesting'
  | 'Other'

export interface FarmActivity {
  id: string
  farmer_id: string
  farm_id: string
  crop_id?: string | null
  activity_type: FarmActivityType | string
  activity_date: string
  description: string
  notes?: string | null
  created_at?: string
  updated_at?: string
}

export interface FarmActivityFormData {
  farm_id: string
  crop_id?: string
  activity_type: FarmActivityType | string
  activity_date: string
  description: string
  notes: string
}
