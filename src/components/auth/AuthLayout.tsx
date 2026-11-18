import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { Sprout, Languages, ArrowLeft } from 'lucide-react'
import { useLanguage } from '../../hooks/useLanguage'

interface AuthLayoutProps {
  title: string
  subtitle?: string
  children: ReactNode
}

export function AuthLayout({ title, subtitle, children }: AuthLayoutProps) {
  const { t, toggleLanguage, language } = useLanguage()

  return (
    <div className="flex min-h-screen flex-col bg-cream text-[#24332A]">
      {/* Top Header */}
      <header className="border-b border-[#E5EAE2] bg-white/95 px-5 py-4 backdrop-blur lg:px-8">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-forest text-white">
              <Sprout size={24} />
            </div>
            <div>
              <h1 className="text-lg font-bold text-forest">KrishiRakshak</h1>
              <p className="text-[10px] tracking-wider text-gray-500">AI · SMART AGRICULTURE</p>
            </div>
          </Link>

          <div className="flex items-center gap-4">
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-semibold text-[#24332A] transition hover:bg-cream"
            >
              <Languages size={15} />
              {language === 'en' ? 'తెలుగు' : language === 'te' ? 'हिन्दी' : 'English'}
            </button>

            <Link
              to="/"
              className="hidden items-center gap-1.5 text-xs font-semibold text-gray-600 transition hover:text-forest sm:flex"
            >
              <ArrowLeft size={14} />
              {t.nav.home}
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex flex-1 items-center justify-center p-4 sm:p-8">
        <div className="w-full max-w-md">
          <div className="rounded-3xl border border-[#E5EAE2] bg-white p-6 shadow-xl sm:p-9">
            <div className="mb-6 text-center">
              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EAF3E5] text-forest">
                <Sprout size={28} />
              </div>
              <h2 className="text-2xl font-extrabold text-[#24332A]">{title}</h2>
              {subtitle && <p className="mt-1.5 text-xs text-gray-600">{subtitle}</p>}
            </div>

            {children}
          </div>

          <div className="mt-6 text-center text-xs text-gray-500">
            © 2026 KrishiRakshak AI. Built for smarter agriculture.
          </div>
        </div>
      </main>
    </div>
  )
}
