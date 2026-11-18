import { supabase } from '../lib/supabase'
import type { Crop, CropFormData } from '../types/crop'

export async function fetchFarmerCrops(farmerId?: string): Promise<Crop[]> {
  // Verify session and determine authenticated user UUID
  const { data: authData, error: authError } = await supabase.auth.getUser()
  if (authError || !authData.user) {
    throw new Error('Authentication required. Please log in again.')
  }

  const verifiedUserId = authData.user.id
  const targetUserId = farmerId || verifiedUserId

  const { data, error } = await supabase
    .from('crops')
    .select('*')
    .eq('farmer_id', targetUserId)
    .order('created_at', { ascending: false })

  if (error) {
    if (import.meta.env.DEV) {
      console.error('[fetchFarmerCrops Supabase error]', {
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
        : 'Failed to fetch crops list.'
    )
    ;(descriptiveError as unknown as { supabaseError: typeof error }).supabaseError = error
    throw descriptiveError
  }

  return (data || []) as Crop[]
}

export async function fetchCropsByFarm(farmId: string): Promise<Crop[]> {
  const { data, error } = await supabase
    .from('crops')
    .select('*')
    .eq('farm_id', farmId)
    .order('created_at', { ascending: false })

  if (error) {
    if (import.meta.env.DEV) {
      console.error('[fetchCropsByFarm error]', error)
    }
    throw error
  }

  return (data || []) as Crop[]
}

export async function createCrop(farmerId: string, formData: CropFormData): Promise<Crop> {
  const { data: authData, error: authError } = await supabase.auth.getUser()
  if (authError || !authData.user) {
    throw new Error('Authentication required. Please log in again.')
  }

  const verifiedUserId = authData.user.id

  if (!formData.farm_id) {
    throw new Error('Please select a registered farm.')
  }

  const payload = {
    farmer_id: verifiedUserId,
    farm_id: formData.farm_id,
    crop_name: formData.crop_name.trim(),
    variety: formData.variety.trim() || null,
    sowing_date: formData.sowing_date || null,
    expected_harvest_date: formData.expected_harvest_date || null,
    cultivated_area: Number(formData.cultivated_area) || 0,
    growth_stage: formData.growth_stage || null,
    irrigation_method: formData.irrigation_method.trim() || null,
    notes: formData.notes.trim() || null,
  }

  if (import.meta.env.DEV) {
    console.log('[createCrop insert payload]', {
      submittedKeys: Object.keys(payload),
      verifiedUserId,
      passedFarmerId: farmerId,
      crop_name: payload.crop_name,
      farm_id: payload.farm_id,
    })
  }

  const { data, error } = await supabase
    .from('crops')
    .insert([payload])
    .select()
    .single()

  if (error) {
    if (import.meta.env.DEV) {
      console.error('[createCrop Supabase error]', {
        message: error.message,
        code: error.code,
        details: error.details,
        hint: error.hint,
        verifiedUserId,
        farm_id: payload.farm_id,
      })
    }
    const descriptiveError = new Error(
      error.message
        ? `${error.message}${error.hint ? ` (${error.hint})` : ''}${error.code ? ` [Code: ${error.code}]` : ''}`
        : 'Failed to save crop.'
    )
    ;(descriptiveError as unknown as { supabaseError: typeof error }).supabaseError = error
    throw descriptiveError
  }

  return data as Crop
}

export async function updateCrop(cropId: string, formData: Partial<CropFormData>): Promise<Crop> {
  const { data: authData, error: authError } = await supabase.auth.getUser()
  if (authError || !authData.user) {
    throw new Error('Authentication required. Please log in again.')
  }

  const payload: Record<string, unknown> = {}

  if (formData.farm_id !== undefined) payload.farm_id = formData.farm_id
  if (formData.crop_name !== undefined) payload.crop_name = formData.crop_name.trim()
  if (formData.variety !== undefined) payload.variety = formData.variety.trim() || null
  if (formData.sowing_date !== undefined) payload.sowing_date = formData.sowing_date || null
  if (formData.expected_harvest_date !== undefined) payload.expected_harvest_date = formData.expected_harvest_date || null
  if (formData.cultivated_area !== undefined) payload.cultivated_area = Number(formData.cultivated_area) || 0
  if (formData.growth_stage !== undefined) payload.growth_stage = formData.growth_stage || null
  if (formData.irrigation_method !== undefined) payload.irrigation_method = formData.irrigation_method.trim() || null
  if (formData.notes !== undefined) payload.notes = formData.notes.trim() || null

  const { data, error } = await supabase
    .from('crops')
    .update(payload)
    .eq('id', cropId)
    .select()
    .single()

  if (error) {
    if (import.meta.env.DEV) {
      console.error('[updateCrop Supabase error]', error)
    }
    throw error
  }

  return data as Crop
}

export async function deleteCrop(cropId: string): Promise<void> {
  const { data: authData, error: authError } = await supabase.auth.getUser()
  if (authError || !authData.user) {
    throw new Error('Authentication required. Please log in again.')
  }

  const { error } = await supabase
    .from('crops')
    .delete()
    .eq('id', cropId)

  if (error) {
    if (import.meta.env.DEV) {
      console.error('[deleteCrop Supabase error]', error)
    }
    throw error
  }
}
