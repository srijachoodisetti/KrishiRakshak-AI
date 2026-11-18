import { supabase } from '../lib/supabase'
import type { FarmActivity, FarmActivityFormData } from '../types/activity'

export async function fetchFarmerActivities(farmerId?: string): Promise<FarmActivity[]> {
  const { data: authData, error: authError } = await supabase.auth.getUser()
  if (authError || !authData.user) {
    throw new Error('Authentication required. Please log in again.')
  }

  const verifiedUserId = authData.user.id
  const targetUserId = farmerId || verifiedUserId

  const { data, error } = await supabase
    .from('farm_activities')
    .select('*')
    .eq('farmer_id', targetUserId)
    .order('activity_date', { ascending: false })
    .order('created_at', { ascending: false })

  if (error) {
    if (import.meta.env.DEV) {
      console.error('[fetchFarmerActivities Supabase error]', {
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
        : 'Failed to fetch farm activities.'
    )
    ;(descriptiveError as unknown as { supabaseError: typeof error }).supabaseError = error
    throw descriptiveError
  }

  return (data || []) as FarmActivity[]
}

export async function createFarmActivity(farmerId: string, formData: FarmActivityFormData): Promise<FarmActivity> {
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
    crop_id: formData.crop_id || null,
    activity_type: formData.activity_type,
    activity_date: formData.activity_date || new Date().toISOString().split('T')[0],
    description: formData.description.trim(),
    notes: formData.notes.trim() || null,
  }

  if (import.meta.env.DEV) {
    console.log('[createFarmActivity insert payload]', {
      submittedKeys: Object.keys(payload),
      verifiedUserId,
      passedFarmerId: farmerId,
      farm_id: payload.farm_id,
      activity_type: payload.activity_type,
    })
  }

  const { data, error } = await supabase
    .from('farm_activities')
    .insert([payload])
    .select()
    .single()

  if (error) {
    if (import.meta.env.DEV) {
      console.error('[createFarmActivity Supabase error]', {
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
        : 'Failed to save farm activity.'
    )
    ;(descriptiveError as unknown as { supabaseError: typeof error }).supabaseError = error
    throw descriptiveError
  }

  return data as FarmActivity
}

export async function deleteFarmActivity(activityId: string): Promise<void> {
  const { data: authData, error: authError } = await supabase.auth.getUser()
  if (authError || !authData.user) {
    throw new Error('Authentication required. Please log in again.')
  }

  const { error } = await supabase
    .from('farm_activities')
    .delete()
    .eq('id', activityId)

  if (error) {
    if (import.meta.env.DEV) {
      console.error('[deleteFarmActivity Supabase error]', error)
    }
    throw error
  }
}
