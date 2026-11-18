export type LandAreaUnit = 'Acres' | 'Hectares'

export type SoilType =
  | 'Red Soil'
  | 'Black Soil'
  | 'Alluvial Soil'
  | 'Sandy Soil'
  | 'Clay Soil'
  | 'Loamy Soil'
  | 'Other'

export type IrrigationType =
  | 'Drip Irrigation'
  | 'Sprinkler Irrigation'
  | 'Canal Irrigation'
  | 'Borewell'
  | 'Rainfed'
  | 'Other'

export interface Farm {
  id: string
  farmer_id: string
  farm_name: string
  village?: string | null
  district?: string | null
  state?: string | null
  latitude?: number | null
  longitude?: number | null
  land_area: number
  land_area_unit: LandAreaUnit
  soil_type?: SoilType | string | null
  irrigation_type?: IrrigationType | string | null
  water_source?: string | null
  description?: string | null
  created_at?: string
  updated_at?: string
}

export interface FarmFormData {
  farm_name: string
  village: string
  district: string
  state: string
  latitude?: number | null
  longitude?: number | null
  land_area: number | string
  land_area_unit: LandAreaUnit
  soil_type: SoilType | string
  irrigation_type: IrrigationType | string
  water_source: string
  description: string
}
