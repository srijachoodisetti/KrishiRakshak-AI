export interface FarmerProfile {
  id: string
  full_name: string
  email?: string | null
  phone?: string | null
  village?: string | null
  district?: string | null
  state?: string | null
  created_at?: string
  updated_at?: string
}

export interface RegistrationFormData {
  fullName: string
  email: string
  phone: string
  password: string
  confirmPassword: string
  village: string
  district: string
  state: string
}

export interface LoginFormData {
  email: string
  password: string
  rememberMe?: boolean
}

export interface ProfileUpdateData {
  full_name: string
  phone?: string | null
  village?: string | null
  district?: string | null
  state?: string | null
}
