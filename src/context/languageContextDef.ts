import { createContext } from 'react'
import type { Language, TranslationDictionary } from '../locales/translations'

export interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  toggleLanguage: () => void
  t: TranslationDictionary
  isTelugu: boolean
  isHindi: boolean
}

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined)
