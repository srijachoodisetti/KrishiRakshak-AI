import { useState, useRef, useEffect } from 'react'
import { Globe, Check, ChevronDown, ChevronUp } from 'lucide-react'
import { useLanguage } from '../../hooks/useLanguage'
import type { Language } from '../../locales/translations'

interface LanguageOption {
  code: string
  nativeName: string
  englishName: string
  available: boolean
}

const SUPPORTED_LANGUAGES: LanguageOption[] = [
  { code: 'en', nativeName: 'English', englishName: 'English', available: true },
  { code: 'te', nativeName: 'తెలుగు', englishName: 'Telugu', available: true },
  { code: 'hi', nativeName: 'हिन्दी', englishName: 'Hindi', available: true },
  { code: 'ta', nativeName: 'தமிழ்', englishName: 'Tamil', available: false },
  { code: 'kn', nativeName: 'ಕನ್ನಡ', englishName: 'Kannada', available: false },
]

interface LanguageSelectorProps {
  /** Visual variant: 'header' (pill matching topbar), 'compact' (smaller for mobile), 'sidebar' (full width) */
  variant?: 'header' | 'compact' | 'sidebar'
  /** Dropdown menu placement direction */
  align?: 'left' | 'right'
  /** Optional custom class names */
  className?: string
}

export function LanguageSelector({
  variant = 'header',
  align = 'right',
  className = '',
}: LanguageSelectorProps) {
  const { language, setLanguage } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  // Close dropdown on Escape key
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown)
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen])

  const handleSelect = (langOption: LanguageOption) => {
    if (!langOption.available) {
      return // Tamil and Kannada are previewed in dropdown but full translation is forthcoming
    }
    setLanguage(langOption.code as Language)
    setIsOpen(false)
  }

  // Active language option
  const currentLangOption =
    SUPPORTED_LANGUAGES.find((l) => l.code === language) || SUPPORTED_LANGUAGES[0]

  const buttonText = `${currentLangOption.nativeName} (${currentLangOption.code.toUpperCase()})`

  // Base button styles per variant matching screenshot
  const buttonStyle =
    variant === 'compact'
      ? 'inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs font-semibold text-gray-800 shadow-2xs hover:border-gray-300 transition'
      : variant === 'sidebar'
      ? 'w-full flex items-center justify-between rounded-full border border-gray-200 bg-white px-4 py-2 text-xs font-semibold text-gray-800 hover:bg-gray-50 transition'
      : 'inline-flex items-center gap-2.5 rounded-full border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-800 shadow-2xs hover:border-gray-300 transition cursor-pointer'

  return (
    <div
      ref={dropdownRef}
      className={`relative inline-block text-left ${variant === 'sidebar' ? 'w-full' : ''} ${className}`}
    >
      {/* Trigger Button matching screenshot: (Globe) తెలుగు (TE) ^ */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label="Select Language"
        className={buttonStyle}
      >
        {variant === 'sidebar' ? (
          <>
            <div className="flex items-center gap-2.5 text-teal-600">
              <Globe size={18} />
              <span className="font-semibold text-gray-800">{buttonText}</span>
            </div>
            {isOpen ? (
              <ChevronUp size={16} className="text-gray-500" />
            ) : (
              <ChevronDown size={16} className="text-gray-500" />
            )}
          </>
        ) : (
          <>
            <Globe size={variant === 'compact' ? 15 : 18} className="text-teal-600 shrink-0" />
            <span className="whitespace-nowrap">{buttonText}</span>
            {isOpen ? (
              <ChevronUp size={variant === 'compact' ? 14 : 16} className="text-gray-500 shrink-0" />
            ) : (
              <ChevronDown size={variant === 'compact' ? 14 : 16} className="text-gray-500 shrink-0" />
            )}
          </>
        )}
      </button>

      {/* Dropdown Menu matching screenshot (without bottom preview box) */}
      {isOpen && (
        <div
          role="listbox"
          aria-label="Languages"
          className={`absolute z-50 w-64 rounded-2xl border border-gray-200/90 bg-white shadow-xl transition-all duration-150 overflow-hidden ${
            align === 'left' ? 'left-0' : 'right-0'
          } ${variant === 'sidebar' ? 'bottom-full mb-2' : 'mt-2'}`}
        >
          {/* Header */}
          <div className="px-5 pt-4 pb-3 border-b border-gray-100">
            <div className="text-[11px] font-bold text-gray-500 tracking-wider uppercase leading-snug">
              SELECT LANGUAGE / భాష
              <br />
              ఎంచుకోండి
            </div>
          </div>

          {/* Language Options List */}
          <div className="py-1">
            {SUPPORTED_LANGUAGES.map((item) => {
              const isSelected = item.code === language

              return (
                <button
                  key={item.code}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => handleSelect(item)}
                  className={`w-full flex items-center justify-between px-5 py-2.5 text-left transition-colors cursor-pointer ${
                    isSelected
                      ? 'bg-[#E6F4F1] text-teal-700'
                      : 'text-gray-800 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex flex-col">
                    <span
                      className={`text-[15px] font-medium leading-tight ${
                        isSelected ? 'text-teal-700 font-semibold' : 'text-gray-800'
                      }`}
                    >
                      {item.nativeName}
                    </span>
                    <span
                      className={`text-xs mt-0.5 ${
                        isSelected ? 'text-teal-600' : 'text-gray-400'
                      }`}
                    >
                      {item.englishName}
                    </span>
                  </div>

                  {isSelected && (
                    <Check size={18} className="text-teal-600 stroke-[2.5]" />
                  )}
                </button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
