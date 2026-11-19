import { useState, useRef, useEffect } from 'react'
import { Languages, Check, ChevronDown } from 'lucide-react'
import { useLanguage } from '../../hooks/useLanguage'
import type { Language } from '../../locales/translations'

interface LanguageOption {
  code: string
  label: string
  subLabel?: string
  available: boolean
}

const SUPPORTED_LANGUAGES: LanguageOption[] = [
  { code: 'en', label: 'English', available: true },
  { code: 'te', label: 'Telugu', subLabel: 'తెలుగు', available: true },
  { code: 'hi', label: 'Hindi', subLabel: 'हिन्दी', available: true },
  { code: 'ta', label: 'Tamil', subLabel: 'தமிழ்', available: false },
  { code: 'kn', label: 'Kannada', subLabel: 'ಕನ್ನಡ', available: false },
]

interface LanguageSelectorProps {
  /** Visual variant: 'header' (default bordered pill), 'compact' (smaller for mobile headers), 'sidebar' (full width for sidebar drawer) */
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
      return // Do nothing for disabled/coming soon languages
    }
    setLanguage(langOption.code as Language)
    setIsOpen(false)
  }

  // Active language display name
  const currentLangOption =
    SUPPORTED_LANGUAGES.find((l) => l.code === language) || SUPPORTED_LANGUAGES[0]

  const currentDisplayName =
    language === 'en'
      ? 'English'
      : language === 'te'
      ? 'తెలుగు'
      : language === 'hi'
      ? 'हिन्दी'
      : currentLangOption.label

  // Base button styles per variant matching existing project design
  const buttonStyle =
    variant === 'compact'
      ? 'px-2.5 py-1 rounded-lg border border-gray-200 text-xs font-semibold text-gray-700 hover:border-[#176B45] hover:text-[#176B45] bg-white transition inline-flex items-center gap-1.5'
      : variant === 'sidebar'
      ? 'w-full flex items-center justify-between px-3.5 py-2 rounded-xl border border-gray-200 text-xs font-semibold text-gray-700 hover:bg-[#F6F8F1] bg-white transition'
      : 'flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-1.5 text-xs font-semibold text-[#24332A] shadow-2xs hover:border-[#176B45] hover:text-[#176B45] transition'

  return (
    <div ref={dropdownRef} className={`relative inline-block text-left ${variant === 'sidebar' ? 'w-full' : ''} ${className}`}>
      {/* Trigger Button */}
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
            <div className="flex items-center gap-2 text-[#176B45]">
              <Languages size={15} />
              <span className="font-semibold text-gray-800">{currentDisplayName}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] uppercase tracking-wide bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded font-bold">
                {language.toUpperCase()}
              </span>
              <ChevronDown
                size={14}
                className={`text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
              />
            </div>
          </>
        ) : variant === 'compact' ? (
          <>
            <Languages size={13} className="text-[#176B45]" />
            <span>{language === 'en' ? 'EN' : currentDisplayName}</span>
            <ChevronDown
              size={12}
              className={`text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
            />
          </>
        ) : (
          <>
            <Languages size={15} className="text-[#176B45]" />
            <span>{currentDisplayName}</span>
            <ChevronDown
              size={13}
              className={`text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
            />
          </>
        )}
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          role="listbox"
          aria-label="Languages"
          className={`absolute z-50 mt-1.5 w-60 rounded-2xl border border-[#E5EAE2] bg-white p-1.5 shadow-xl transition-all duration-150 animate-in fade-in slide-in-from-top-1 ${
            align === 'left' ? 'left-0' : 'right-0'
          } ${variant === 'sidebar' ? 'bottom-full mb-2 mt-0' : ''}`}
        >
          <div className="px-3 py-1.5 text-[10px] font-bold tracking-wider text-gray-400 uppercase">
            Select Language / భాష ఎంచుకోండి
          </div>

          <div className="my-1 border-t border-gray-100" />

          <div className="space-y-0.5">
            {SUPPORTED_LANGUAGES.map((item) => {
              const isSelected = item.code === language
              const isAvailable = item.available

              return (
                <button
                  key={item.code}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  disabled={!isAvailable}
                  onClick={() => handleSelect(item)}
                  className={`w-full flex items-center justify-between rounded-xl px-3 py-2 text-xs transition-colors text-left ${
                    isSelected
                      ? 'bg-emerald-50 text-[#176B45] font-semibold'
                      : isAvailable
                      ? 'text-gray-700 hover:bg-[#F6F8F1] hover:text-[#176B45] cursor-pointer'
                      : 'text-gray-400 bg-gray-50/50 cursor-not-allowed opacity-75'
                  }`}
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="truncate">
                      {item.label}
                      {item.subLabel ? (
                        <span className="ml-1.5 text-[11px] text-gray-500 font-normal">
                          ({item.subLabel})
                        </span>
                      ) : null}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    {!isAvailable && (
                      <span className="inline-flex items-center rounded-full bg-amber-50 px-2 py-0.5 text-[10px] font-medium text-amber-700 border border-amber-200/80">
                        Coming Soon
                      </span>
                    )}

                    {isSelected && (
                      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#176B45] text-white">
                        <Check size={12} strokeWidth={2.5} />
                      </span>
                    )}
                  </div>
                </button>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
