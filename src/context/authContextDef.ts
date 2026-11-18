import { createContext } from 'react'
import type { User, Session } from '@supabase/supabase-js'
import type { FarmerProfile } from '../types/auth'

export interface AuthContextType {
  user: User | null
  session: Session | null
  profile: FarmerProfile | null
  isLoading: boolean
  signOut: () => Promise<void>
  refreshProfile: () => Promise<void>
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)
