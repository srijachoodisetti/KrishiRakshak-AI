export type GrowthStage =
  | 'Sowing / Seedling'
  | 'Vegetative'
  | 'Flowering'
  | 'Fruiting / Grain Formation'
  | 'Maturity / Harvesting'
  | 'Post-Harvest'

export interface Crop {
  id: string
  farmer_id: string
  farm_id: string
  crop_name: string
  variety?: string | null
  sowing_date?: string | null
  expected_harvest_date?: string | null
  cultivated_area: number
  growth_stage?: GrowthStage | string | null
  irrigation_method?: string | null
  notes?: string | null
  created_at?: string
  updated_at?: string
}

export interface CropFormData {
  farm_id: string
  crop_name: string
  variety: string
  sowing_date: string
  expected_harvest_date: string
  cultivated_area: number | string
  growth_stage: GrowthStage | string
  irrigation_method: string
  notes: string
}
