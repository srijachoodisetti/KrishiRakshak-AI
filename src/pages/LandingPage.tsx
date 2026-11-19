import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  Sprout,
  Menu,
  X,
  ArrowRight,
  Leaf,
  CloudSun,
  ShieldCheck,
  ScanLine,
  Languages,
  MapPin,
  Search,
  MessageCircle,
  History,
  Tractor,
  CheckCircle2,
  User,
  LayoutDashboard,
  LogOut,
  Lock,
  Compass,
} from 'lucide-react'
import { useAuth } from '../hooks/useAuth'
import { useLanguage } from '../hooks/useLanguage'
import { LanguageSelector } from '../components/common/LanguageSelector'

const quickHighlightIcons = [ScanLine, CloudSun, ShieldCheck]

const featureCardConfigs = [
  { icon: ScanLine, color: 'bg-green-50 text-forest' },
  { icon: CloudSun, color: 'bg-yellow-50 text-yellow-700' },
  { icon: ShieldCheck, color: 'bg-orange-50 text-orange-600' },
  { icon: MessageCircle, color: 'bg-blue-50 text-blue-700' },
  { icon: Tractor, color: 'bg-green-50 text-green-700' },
  { icon: History, color: 'bg-purple-50 text-purple-700' },
]

const stepIcons = [User, MapPin, Search, Sprout]

export function LandingPage() {
  const navigate = useNavigate()
  const { user, profile, signOut } = useAuth()
  const { t, language } = useLanguage()
  const [mobileMenu, setMobileMenu] = useState(false)

  // Redirect to dashboard if returning from OAuth provider callback (e.g. Google Sign-In)
  useEffect(() => {
    if (window.location.hash.includes('access_token=')) {
      navigate('/dashboard', { replace: true })
    }
  }, [navigate])

  const isTelugu = language === 'te'

  const handleSignOut = async () => {
    try {
      await signOut()
    } catch {
      // Ignored
    }
  }

  return (
    <div className={`min-h-screen bg-cream text-[#24332A] ${isTelugu ? 'font-telugu' : ''}`}>

      {/* NAVIGATION BAR */}
      <header className="sticky top-0 z-50 border-b border-[#E5EAE2] bg-white/95 backdrop-blur">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">

          <Link to="/" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-forest text-white">
              <Sprout size={27} />
            </div>

            <div>
              <h1 className="text-xl font-bold text-forest">
                {t.nav.brandName}
              </h1>
              <p className="text-xs tracking-wide text-gray-500">
                {t.nav.brandSubtitle}
              </p>
            </div>
          </Link>

          <div className="hidden items-center gap-8 md:flex">
            <a href="#" className="font-medium text-forest">{t.nav.home}</a>
            <a href="#about" className="text-gray-600 hover:text-forest">{t.nav.about}</a>
            <a href="#how-it-works" className="text-gray-600 hover:text-forest">{t.nav.howItWorks}</a>
            <a href="#features" className="text-gray-600 hover:text-forest">{t.nav.features}</a>
          </div>

          <div className="hidden items-center gap-3 md:flex">
            <LanguageSelector variant="header" align="right" />

            {user ? (
              <div className="flex items-center gap-3">
                <Link
                  to="/dashboard"
                  className="flex items-center gap-1.5 rounded-xl border border-[#176B45]/20 bg-emerald-50 px-3.5 py-2 text-sm font-semibold text-[#176B45] hover:bg-emerald-100 transition"
                >
                  <LayoutDashboard size={16} />
                  <span>{t.nav.dashboard}</span>
                </Link>

                <Link
                  to="/profile"
                  className="flex items-center gap-1.5 rounded-xl border border-gray-200 px-3 py-2 text-sm font-medium text-gray-700 hover:border-[#176B45] hover:text-[#176B45] transition"
                  title={profile?.full_name || user.email || 'Profile'}
                >
                  <User size={16} className="text-[#176B45]" />
                  <span className="max-w-[100px] truncate">{profile?.full_name?.split(' ')[0] || t.nav.profile}</span>
                </Link>

                <button
                  onClick={handleSignOut}
                  className="flex items-center gap-1 text-sm font-medium text-gray-500 hover:text-red-600 transition px-2 py-1"
                  title={t.nav.logout}
                >
                  <LogOut size={16} />
                </button>
              </div>
            ) : (
              <>
                <Link to="/login" className="px-3 py-2 font-semibold text-forest">
                  {t.nav.login}
                </Link>

                <Link
                  to="/register"
                  className="rounded-xl bg-forest px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-leaf"
                >
                  {t.nav.getStarted}
                  <ArrowRight className="ml-2 inline" size={17} />
                </Link>
              </>
            )}
          </div>

          <button
            className="rounded-lg p-2 md:hidden"
            onClick={() => setMobileMenu(!mobileMenu)}
            aria-label={t.nav.toggleMenuAria}
          >
            {mobileMenu ? <X /> : <Menu />}
          </button>
        </nav>

        {mobileMenu && (
          <div className="flex flex-col gap-4 border-t border-gray-100 bg-white p-5 md:hidden">
            <a
              href="#"
              onClick={() => setMobileMenu(false)}
              className="font-medium text-forest"
            >
              {t.nav.home}
            </a>
            <a
              href="#about"
              onClick={() => setMobileMenu(false)}
              className="text-gray-600 hover:text-forest"
            >
              {t.nav.about}
            </a>
            <a
              href="#how-it-works"
              onClick={() => setMobileMenu(false)}
              className="text-gray-600 hover:text-forest"
            >
              {t.nav.howItWorks}
            </a>
            <a
              href="#features"
              onClick={() => setMobileMenu(false)}
              className="text-gray-600 hover:text-forest"
            >
              {t.nav.features}
            </a>

            <div className="py-1">
              <LanguageSelector variant="sidebar" align="left" />
            </div>

            {user ? (
              <>
                <Link
                  to="/dashboard"
                  onClick={() => setMobileMenu(false)}
                  className="flex items-center gap-2 rounded-xl bg-emerald-50 p-3 font-semibold text-[#176B45]"
                >
                  <LayoutDashboard size={18} />
                  {t.nav.dashboard}
                </Link>
                <Link
                  to="/profile"
                  onClick={() => setMobileMenu(false)}
                  className="flex items-center gap-2 rounded-xl border border-gray-200 p-3 font-semibold text-gray-700"
                >
                  <User size={18} className="text-[#176B45]" />
                  {t.nav.profile}
                </Link>
                <button
                  onClick={() => {
                    setMobileMenu(false)
                    handleSignOut()
                  }}
                  className="flex items-center gap-2 p-3 font-semibold text-red-600 text-left"
                >
                  <LogOut size={18} />
                  {t.nav.logout}
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setMobileMenu(false)}
                  className="font-semibold text-forest"
                >
                  {t.nav.login}
                </Link>

                <Link
                  to="/register"
                  onClick={() => setMobileMenu(false)}
                  className="rounded-xl bg-forest p-3 text-center font-semibold text-white transition hover:bg-leaf"
                >
                  {t.nav.getStarted}
                </Link>
              </>
            )}
          </div>
        )}
      </header>

      {/* HERO SECTION */}
      <main>
        <section className="mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-24">
          <div className="grid items-center gap-12 lg:grid-cols-2">

            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[#D5DFD1] bg-white px-4 py-2 text-sm font-medium text-forest shadow-xs">
                <Leaf size={16} />
                {t.hero.badge}
              </div>

              <h2 className="mt-6 text-4xl font-extrabold tracking-tight text-forest sm:text-5xl lg:text-6xl">
                {t.hero.title}
              </h2>

              <p className="mt-6 text-lg leading-8 text-gray-600">
                {t.hero.description}
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  to={user ? "/dashboard" : "/login"}
                  className="flex items-center rounded-xl bg-forest px-6 py-4 font-semibold text-white shadow-md transition hover:bg-leaf"
                >
                  {user ? t.nav.dashboard : t.nav.login}
                  <ArrowRight className="ml-2" size={19} />
                </Link>

                <Link
                  to={user ? "/dashboard" : "/register"}
                  className="rounded-xl border border-gray-300 bg-white px-6 py-4 font-semibold text-gray-700 transition hover:bg-cream"
                >
                  {user ? t.nav.profile : t.nav.register}
                </Link>
              </div>

              <div className="mt-12 flex flex-wrap items-center gap-6 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={18} className="text-forest" />
                  <span>{t.hero.cropAssessmentBadge}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={18} className="text-forest" />
                  <span>{t.hero.weatherIntelligenceBadge}</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative overflow-hidden rounded-3xl shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1000&q=80"
                  alt={t.hero.heroImageAlt}
                  className="h-[460px] w-full object-cover"
                />
              </div>

              <div className="absolute -bottom-6 -left-6 rounded-2xl border border-[#E5EAE2] bg-white p-4 shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-50 text-forest">
                    <ScanLine size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">{t.hero.floatingDoctorTitle}</p>
                    <p className="font-bold text-forest">{t.hero.floatingDoctorDesc}</p>
                  </div>
                </div>
              </div>

              <div className="absolute -right-6 top-10 rounded-2xl border border-[#E5EAE2] bg-white p-4 shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-yellow-50 text-yellow-700">
                    <CloudSun size={20} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">{t.hero.floatingSmartTitle}</p>
                    <p className="font-bold text-forest">{t.hero.floatingSmartDesc}</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* QUICK STATS */}
        <section className="border-y border-[#E5EAE2] bg-white py-12">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="grid gap-8 md:grid-cols-3">
              {t.quickHighlights.map((highlight, index) => {
                const IconComponent = quickHighlightIcons[index] || Leaf
                return (
                  <div key={index} className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-cream text-forest">
                      <IconComponent size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold">{highlight.title}</h3>
                      <p className="mt-1 text-sm text-gray-600">{highlight.desc}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* ABOUT KRISHIRAKSHAK AI SECTION */}
        <section id="about" className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <p className="font-semibold text-leaf">{t.aboutSection.badge}</p>
            <h3 className="mt-2 text-3xl font-bold tracking-tight text-forest sm:text-4xl">
              {t.aboutSection.title}
            </h3>
            <p className="mt-4 text-base text-gray-600 leading-relaxed">
              {t.aboutSection.description}
            </p>
          </div>

          <div className="mt-14 grid gap-8 md:grid-cols-3">
            <div className="rounded-2xl border border-[#E5EAE2] bg-white p-7 shadow-xs">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-forest mb-5">
                <Compass size={24} />
              </div>
              <h4 className="text-lg font-bold text-forest">{t.aboutSection.missionTitle}</h4>
              <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                {t.aboutSection.missionDesc}
              </p>
            </div>

            <div className="rounded-2xl border border-[#E5EAE2] bg-white p-7 shadow-xs">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 text-amber-700 mb-5">
                <ShieldCheck size={24} />
              </div>
              <h4 className="text-lg font-bold text-forest">{t.aboutSection.decisionTitle}</h4>
              <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                {t.aboutSection.decisionDesc}
              </p>
            </div>

            <div className="rounded-2xl border border-[#E5EAE2] bg-white p-7 shadow-xs">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-700 mb-5">
                <Languages size={24} />
              </div>
              <h4 className="text-lg font-bold text-forest">{t.aboutSection.languagesTitle}</h4>
              <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                {t.aboutSection.languagesDesc}
              </p>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS */}
        <section id="how-it-works" className="border-t border-[#E5EAE2] bg-white py-20">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="text-center">
              <p className="font-semibold text-leaf">{t.howItWorksSection.badge}</p>
              <h3 className="mt-2 text-3xl font-bold tracking-tight text-forest sm:text-4xl">
                {t.howItWorksSection.title}
              </h3>
              <p className="mx-auto mt-4 max-w-2xl text-gray-600">
                {t.howItWorksSection.description}
              </p>
            </div>

            <div className="mt-16 grid gap-8 md:grid-cols-4">
              {t.howItWorksSection.steps.map((step, index) => {
                const IconComponent = stepIcons[index] || Sprout
                return (
                  <div key={index} className="text-center">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-cream text-forest">
                      <IconComponent size={26} />
                    </div>
                    <div className="mx-auto my-4 h-6 w-6 rounded-full bg-forest text-xs font-bold leading-6 text-white">
                      {step.number}
                    </div>
                    <h4 className="font-bold">{step.title}</h4>
                    <p className="mt-2 text-sm text-gray-600">{step.description}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* FEATURE EXPLANATIONS (INFORMATIONAL ONLY) */}
        <section id="features" className="border-t border-[#E5EAE2] bg-[#F3F6F0]/60 py-20">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="text-center">
              <p className="font-semibold text-leaf">{t.featuresSection.badge}</p>
              <h3 className="mt-2 text-3xl font-bold tracking-tight text-forest sm:text-4xl">
                {t.featuresSection.title}
              </h3>
              <p className="mx-auto mt-4 max-w-2xl text-gray-600">
                {t.featuresSection.description}
              </p>
            </div>

            <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {t.featuresSection.cards.map((card, index) => {
                const config = featureCardConfigs[index] || { icon: Leaf, color: 'bg-green-50 text-forest' }
                const IconComponent = config.icon

                return (
                  <div
                    key={index}
                    className="rounded-2xl border border-[#E5EAE2] bg-white p-8 shadow-xs transition hover:shadow-md"
                  >
                    <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${config.color}`}>
                      <IconComponent size={24} />
                    </div>
                    <h4 className="mt-5 text-xl font-bold text-forest">{card.title}</h4>
                    <p className="mt-3 text-sm leading-6 text-gray-600">{card.description}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </section>

        {/* AI CROP DOCTOR INFORMATIONAL PREVIEW */}
        <section className="border-t border-[#E5EAE2] bg-white py-20">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="grid items-center gap-12 lg:grid-cols-2">

              <div>
                <p className="font-semibold text-leaf">{t.cropDoctorSection.badge}</p>

                <h3 className="mt-2 text-3xl font-bold tracking-tight text-forest sm:text-4xl">
                  {t.cropDoctorSection.title}
                </h3>

                <p className="mt-4 leading-7 text-gray-600">
                  {t.cropDoctorSection.description}
                </p>

                <div className="mt-8 space-y-4">
                  {t.cropDoctorSection.checklist.map((bullet, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="mt-1 text-leaf shrink-0" size={18} />
                      <p className="text-sm text-gray-600">{bullet}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-8 flex items-center gap-4">
                  <Link
                    to={user ? "/dashboard" : "/register"}
                    className="inline-flex items-center rounded-xl bg-forest px-6 py-4 font-semibold text-white shadow-md transition hover:bg-leaf"
                  >
                    {user ? t.nav.dashboard : t.nav.getStarted}
                    <ArrowRight className="ml-2" size={18} />
                  </Link>

                  <div className="flex items-center gap-1.5 text-xs text-gray-500 font-medium">
                    <Lock size={14} className="text-gray-400" />
                    <span>
                      {language === 'te'
                        ? 'లాగిన్ ద్వారా రక్షిత ప్రవేశం'
                        : language === 'hi'
                        ? 'लॉगिन-सुरक्षित पहुंच'
                        : 'Login-First Protected Access'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="rounded-3xl border border-[#E5EAE2] bg-cream p-6 shadow-md">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-500">{t.cropDoctorSection.reportTag}</p>
                    <h4 className="font-bold">{t.cropDoctorSection.reportTitle}</h4>
                  </div>
                  <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-forest">
                    {t.cropDoctorSection.sampleBadge}
                  </span>
                </div>

                <img
                  src="https://images.unsplash.com/photo-1592841200221-a6898f307baa?w=900&q=85"
                  alt={t.cropDoctorSection.reportImageAlt}
                  className="mt-6 h-56 w-full rounded-2xl object-cover"
                />

                <div className="mt-5 rounded-2xl border border-[#E5EAE2] bg-white p-5">
                  <p className="text-sm text-gray-500">{t.cropDoctorSection.issueLabel}</p>

                  <h4 className="mt-1 text-lg font-bold">
                    {t.cropDoctorSection.issueTitle}
                  </h4>

                  <p className="mt-2 text-sm leading-6 text-gray-600">
                    {t.cropDoctorSection.issueDesc}
                  </p>
                </div>

                <div className="mt-4 rounded-2xl border border-[#E5EAE2] bg-white p-5">
                  <p className="font-bold">{t.cropDoctorSection.recommendationsTitle}</p>

                  <ul className="mt-3 space-y-2 text-sm leading-6 text-gray-600">
                    {t.cropDoctorSection.recommendations.map((rec, index) => (
                      <li key={index}>• {rec}</li>
                    ))}
                  </ul>
                </div>

                <p className="mt-4 text-xs leading-5 text-gray-500">
                  {t.cropDoctorSection.disclaimer}
                </p>
              </div>
            </div>
          </div>
        </section>

      </main>

      {/* FOOTER */}
      <footer id="footer" className="bg-[#123F2C] px-5 py-12 text-white">
        <div className="mx-auto max-w-7xl">

          <div className="grid gap-10 md:grid-cols-3">

            <div>
              <div className="flex items-center gap-3">
                <Sprout size={30} />
                <h3 className="text-xl font-bold">{t.footer.brandName}</h3>
              </div>

              <p className="mt-4 max-w-sm text-sm leading-7 text-green-100">
                {t.footer.tagline}
              </p>
            </div>

            <div>
              <h4 className="font-bold">{t.footer.quickLinksTitle}</h4>
              <div className="mt-4 flex flex-col gap-3 text-sm text-green-100">
                <a href="#" className="hover:text-white">{t.footer.quickLinks.home}</a>
                <a href="#about" className="hover:text-white">{t.nav.about}</a>
                <a href="#how-it-works" className="hover:text-white">{t.footer.quickLinks.howItWorks}</a>
                <a href="#features" className="hover:text-white">{t.footer.quickLinks.features}</a>
                <Link to="/login" className="hover:text-white font-semibold text-[#75B843]">{t.footer.quickLinks.login}</Link>
                <Link to="/register" className="hover:text-white font-semibold text-[#75B843]">{t.nav.register}</Link>
              </div>
            </div>

            <div>
              <h4 className="font-bold">{t.footer.platformTitle}</h4>
              <div className="mt-4 flex flex-col gap-3 text-sm text-green-100">
                {t.footer.platformItems.map((item, index) => (
                  <span key={index}>{item}</span>
                ))}
              </div>
            </div>

          </div>

          <div className="mt-10 border-t border-green-800 pt-6 text-center text-xs text-green-200">
            {t.footer.copyright}
          </div>
        </div>
      </footer>

    </div>
  )
}
export default LandingPage
