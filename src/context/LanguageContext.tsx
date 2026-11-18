import { useState, useEffect, type ReactNode } from 'react'
import { translations, type Language } from '../locales/translations'
import { LanguageContext, type LanguageContextType } from './languageContextDef'

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('krishi_language') || localStorage.getItem('language')
      if (saved === 'te' || saved === 'hi' || saved === 'en') {
        return saved
      }
    } catch {
      // ignore
    }
    return 'en'
  })

  useEffect(() => {
    try {
      localStorage.setItem('krishi_language', language)
      localStorage.setItem('language', language)
    } catch {
      // ignore
    }
    document.documentElement.lang = language
  }, [language])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
  }

  const toggleLanguage = () => {
    setLanguageState((prev) => {
      if (prev === 'en') return 'te'
      if (prev === 'te') return 'hi'
      return 'en'
    })
  }

  const value: LanguageContextType = {
    language,
    setLanguage,
    toggleLanguage,
    t: translations[language],
    isTelugu: language === 'te',
    isHindi: language === 'hi',
  }

  return (
    <LanguageContext.Provider value={value}>
      <div className={language === 'te' ? 'font-telugu' : language === 'hi' ? 'font-hindi' : ''}>
        {children}
      </div>
    </LanguageContext.Provider>
  )
}
