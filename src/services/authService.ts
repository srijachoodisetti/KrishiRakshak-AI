import { supabase } from '../lib/supabase'
import type { RegistrationFormData, LoginFormData, ProfileUpdateData, FarmerProfile } from '../types/auth'

export async function registerFarmer(data: RegistrationFormData) {
  // Use current window origin or environment-configured URL
  const siteUrl = window.location.origin
  const emailRedirectTo = `${siteUrl}/login`

  const { data: authData, error: authError } = await supabase.auth.signUp({
    email: data.email.trim(),
    password: data.password,
    options: {
      data: {
        full_name: data.fullName.trim(),
        phone: data.phone.trim(),
        village: data.village.trim(),
        district: data.district.trim(),
        state: data.state.trim(),
      },
      emailRedirectTo,
    },
  })

  if (authError) {
    throw authError
  }

  // If session is returned immediately (e.g. email verification disabled in dev/local project), ensure profile row exists
  if (authData.user && authData.session) {
    try {
      await supabase.from('profiles').upsert({
        id: authData.user.id,
        full_name: data.fullName.trim(),
        email: data.email.trim(),
        phone: data.phone.trim(),
        village: data.village.trim(),
        district: data.district.trim(),
        state: data.state.trim(),
      })
    } catch {
      // Trigger handles this if direct upsert fails
    }
  }

  const needsEmailVerification = !authData.session && !!authData.user
  return {
    user: authData.user,
    session: authData.session,
    needsEmailVerification,
  }
}

export async function resendVerificationEmail(email: string) {
  const siteUrl = window.location.origin
  const { error } = await supabase.auth.resend({
    type: 'signup',
    email: email.trim(),
    options: {
      emailRedirectTo: `${siteUrl}/login`,
    },
  })

  if (error) {
    throw error
  }
}

export async function loginFarmer(data: LoginFormData) {
  const { data: authData, error } = await supabase.auth.signInWithPassword({
    email: data.email.trim(),
    password: data.password,
  })

  if (error) {
    throw error
  }

  return authData
}

export async function logoutFarmer() {
  const { error } = await supabase.auth.signOut()
  if (error) {
    throw error
  }
}

export async function sendPasswordResetEmail(email: string) {
  const siteUrl = window.location.origin
  const { data, error } = await supabase.auth.resetPasswordForEmail(email.trim(), {
    redirectTo: `${siteUrl}/reset-password`,
  })

  if (error) {
    throw error
  }

  return data
}

export async function updateFarmerPassword(newPassword: string) {
  const { data, error } = await supabase.auth.updateUser({
    password: newPassword,
  })

  if (error) {
    throw error
  }

  return data
}

export async function fetchFarmerProfile(userId: string): Promise<FarmerProfile | null> {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single()

  if (error) {
    // If profile row doesn't exist yet, fallback to user metadata
    const { data: userData } = await supabase.auth.getUser()
    if (userData.user && userData.user.id === userId) {
      const meta = userData.user.user_metadata || {}
      const fallbackProfile: FarmerProfile = {
        id: userId,
        full_name: meta.full_name || 'Farmer',
        email: userData.user.email,
        phone: meta.phone || null,
        village: meta.village || null,
        district: meta.district || null,
        state: meta.state || null,
      }
      return fallbackProfile
    }
    return null
  }

  return data as FarmerProfile
}

export async function updateFarmerProfile(userId: string, updateData: ProfileUpdateData): Promise<FarmerProfile> {
  const { data, error } = await supabase
    .from('profiles')
    .upsert({
      id: userId,
      ...updateData,
    })
    .select()
    .single()

  if (error) {
    throw error
  }

  // Also keep auth metadata in sync
  try {
    await supabase.auth.updateUser({
      data: {
        full_name: updateData.full_name,
        phone: updateData.phone,
        village: updateData.village,
        district: updateData.district,
        state: updateData.state,
      },
    })
  } catch {
    // Non-critical
  }

  return data as FarmerProfile
}
