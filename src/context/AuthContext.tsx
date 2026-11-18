import { useState, useEffect, useCallback, type ReactNode } from 'react'
import type { User, Session } from '@supabase/supabase-js'
import { supabase } from '../lib/supabase'
import type { FarmerProfile } from '../types/auth'
import { fetchFarmerProfile, logoutFarmer } from '../services/authService'
import { AuthContext, type AuthContextType } from './authContextDef'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [profile, setProfile] = useState<FarmerProfile | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const loadProfile = useCallback(async (userId: string) => {
    try {
      const data = await fetchFarmerProfile(userId)
      setProfile(data)
    } catch {
      setProfile(null)
    }
  }, [])

  const refreshProfile = useCallback(async () => {
    if (user) {
      await loadProfile(user.id)
    }
  }, [user, loadProfile])

  useEffect(() => {
    let isMounted = true

    // 1. Initial active session check
    supabase.auth.getSession().then(({ data: { session: initialSession }, error }) => {
      if (!isMounted) return
      if (error) {
        setIsLoading(false)
        return
      }

      setSession(initialSession)
      setUser(initialSession?.user ?? null)

      if (initialSession?.user) {
        loadProfile(initialSession.user.id).finally(() => {
          if (isMounted) setIsLoading(false)
        })
      } else {
        setIsLoading(false)
      }
    })

    // 2. Auth state change listener
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, newSession) => {
      if (!isMounted) return

      setSession(newSession)
      setUser(newSession?.user ?? null)

      if (newSession?.user) {
        if (event === 'SIGNED_IN' || event === 'USER_UPDATED' || event === 'TOKEN_REFRESHED') {
          await loadProfile(newSession.user.id)
        }
      } else {
        setProfile(null)
      }

      setIsLoading(false)
    })

    return () => {
      isMounted = false
      subscription.unsubscribe()
    }
  }, [loadProfile])

  const signOut = async () => {
    setIsLoading(true)
    try {
      await logoutFarmer()
    } finally {
      setUser(null)
      setSession(null)
      setProfile(null)
      setIsLoading(false)
    }
  }

  const value: AuthContextType = {
    user,
    session,
    profile,
    isLoading,
    signOut,
    refreshProfile,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
