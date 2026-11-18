import { supabase } from '../lib/supabase'
import type { Farm, FarmFormData } from '../types/farm'

export interface SupabaseErrorDetails {
  message: string
  code?: string
  details?: string
  hint?: string
}

export async function fetchFarmerFarms(farmerId?: string): Promise<Farm[]> {
  // Confirm active authenticated user
  const { data: authData, error: authError } = await supabase.auth.getUser()
  if (authError || !authData.user) {
    throw new Error('Authentication required. Please log in again.')
  }

  const verifiedUserId = authData.user.id
  const targetUserId = farmerId || verifiedUserId

  const { data, error } = await supabase
    .from('farms')
    .select('*')
    .eq('farmer_id', targetUserId)
    .order('created_at', { ascending: false })

  if (error) {
    if (import.meta.env.DEV) {
      console.error('[fetchFarmerFarms error]', {
        message: error.message,
        code: error.code,
        details: error.details,
        hint: error.hint,
        targetUserId,
      })
    }
    const descriptiveError = new Error(
      error.message
        ? `${error.message}${error.hint ? ` (${error.hint})` : ''}${error.code ? ` [Code: ${error.code}]` : ''}`
        : 'Failed to fetch registered farms.'
    )
    ;(descriptiveError as unknown as { supabaseError: typeof error }).supabaseError = error
    throw descriptiveError
  }

  return (data || []) as Farm[]
}

export async function fetchFarmById(farmId: string): Promise<Farm | null> {
  const { data, error } = await supabase
    .from('farms')
    .select('*')
    .eq('id', farmId)
    .single()

  if (error) {
    return null
  }

  return data as Farm
}

export async function createFarm(farmerId: string, formData: FarmFormData): Promise<Farm> {
  // 1. Confirm active authenticated user
  const { data: authData, error: authError } = await supabase.auth.getUser()
  if (authError || !authData.user) {
    throw new Error('Authentication required. Please log in again to register a farm.')
  }

  // Always enforce server-authenticated UID
  const verifiedUserId = authData.user.id
  if (farmerId !== verifiedUserId) {
    console.warn(`Farmer ID mismatch. Using verified auth UID: ${verifiedUserId}`)
  }

  // 2. Prepare payload matching public.farms schema
  const payload = {
    farmer_id: verifiedUserId,
    farm_name: formData.farm_name.trim(),
    village: formData.village.trim() || null,
    district: formData.district.trim() || null,
    state: formData.state.trim() || null,
    latitude: formData.latitude !== undefined && formData.latitude !== null ? Number(formData.latitude) : null,
    longitude: formData.longitude !== undefined && formData.longitude !== null ? Number(formData.longitude) : null,
    land_area: Number(formData.land_area) || 0,
    land_area_unit: formData.land_area_unit || 'Acres',
    soil_type: formData.soil_type || null,
    irrigation_type: formData.irrigation_type || null,
    water_source: formData.water_source.trim() || null,
    description: formData.description.trim() || null,
  }

  if (import.meta.env.DEV) {
    console.log('[createFarm payload]', {
      submittedKeys: Object.keys(payload),
      verifiedUserId,
      farm_name: payload.farm_name,
    })
  }

  const { data, error } = await supabase
    .from('farms')
    .insert([payload])
    .select()
    .single()

  if (error) {
    if (import.meta.env.DEV) {
      console.error('[createFarm Supabase error]', {
        message: error.message,
        code: error.code,
        details: error.details,
        hint: error.hint,
        verifiedUserId,
      })
    }
    // Formulate descriptive error so it is never masked
    const descriptiveError = new Error(
      error.message
        ? `${error.message}${error.hint ? ` (${error.hint})` : ''}${error.code ? ` [Code: ${error.code}]` : ''}`
        : 'Failed to save farm details.'
    )
    ;(descriptiveError as unknown as { supabaseError: typeof error }).supabaseError = error
    throw descriptiveError
  }

  return data as Farm
}

export async function updateFarm(farmId: string, formData: Partial<FarmFormData>): Promise<Farm> {
  const { data: authData, error: authError } = await supabase.auth.getUser()
  if (authError || !authData.user) {
    throw new Error('Authentication required. Please log in again.')
  }

  const payload: Record<string, unknown> = {}

  if (formData.farm_name !== undefined) payload.farm_name = formData.farm_name.trim()
  if (formData.village !== undefined) payload.village = formData.village.trim() || null
  if (formData.district !== undefined) payload.district = formData.district.trim() || null
  if (formData.state !== undefined) payload.state = formData.state.trim() || null
  if (formData.latitude !== undefined) payload.latitude = formData.latitude !== null ? Number(formData.latitude) : null
  if (formData.longitude !== undefined) payload.longitude = formData.longitude !== null ? Number(formData.longitude) : null
  if (formData.land_area !== undefined) payload.land_area = Number(formData.land_area) || 0
  if (formData.land_area_unit !== undefined) payload.land_area_unit = formData.land_area_unit
  if (formData.soil_type !== undefined) payload.soil_type = formData.soil_type || null
  if (formData.irrigation_type !== undefined) payload.irrigation_type = formData.irrigation_type || null
  if (formData.water_source !== undefined) payload.water_source = formData.water_source.trim() || null
  if (formData.description !== undefined) payload.description = formData.description.trim() || null

  const { data, error } = await supabase
    .from('farms')
    .update(payload)
    .eq('id', farmId)
    .select()
    .single()

  if (error) {
    if (import.meta.env.DEV) {
      console.error('[updateFarm Supabase error]', {
        message: error.message,
        code: error.code,
        details: error.details,
        hint: error.hint,
      })
    }
    throw new Error(
      error.message
        ? `${error.message}${error.hint ? ` (${error.hint})` : ''} [Code: ${error.code}]`
        : 'Failed to update farm details.'
    )
  }

  return data as Farm
}

export async function deleteFarm(farmId: string): Promise<void> {
  const { error } = await supabase
    .from('farms')
    .delete()
    .eq('id', farmId)

  if (error) {
    if (import.meta.env.DEV) {
      console.error('[deleteFarm Supabase error]', {
        message: error.message,
        code: error.code,
        details: error.details,
        hint: error.hint,
      })
    }
    throw new Error(
      error.message
        ? `${error.message}${error.hint ? ` (${error.hint})` : ''}`
        : 'Failed to delete farm.'
    )
  }
}
