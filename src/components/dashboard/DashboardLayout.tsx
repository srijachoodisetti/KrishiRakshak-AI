import { useState, type ReactNode } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard,
  MapPin,
  CloudSun,
  Dna,
  Tractor,
  ClipboardList,
  User,
  Settings,
  LogOut,
  Menu,
  X,
  Bell,
  ShieldCheck,
  ChevronRight,
} from 'lucide-react'
import { useAuth } from '../../hooks/useAuth'
import { useLanguage } from '../../hooks/useLanguage'
import { LanguageSelector } from '../common/LanguageSelector'

interface DashboardLayoutProps {
  children: ReactNode
  activeTab?: string
}

export function DashboardLayout({ children, activeTab }: DashboardLayoutProps) {
  const { user, profile, signOut } = useAuth()
  const { t, language } = useLanguage()
  const location = useLocation()
  const navigate = useNavigate()
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false)
  const [showNotificationToast, setShowNotificationToast] = useState(false)

  const currentPath = activeTab ? `/${activeTab}` : location.pathname

  const handleSignOut = async () => {
    try {
      await signOut()
      navigate('/login')
    } catch {
      // Ignored
    }
  }

  const defaultFarmerLabel = language === 'te' ? 'రైతు' : language === 'hi' ? 'किसान' : 'Farmer'
  const displayName = profile?.full_name || user?.user_metadata?.full_name || user?.email?.split('@')[0] || defaultFarmerLabel
  const displayLocation = [profile?.village, profile?.district].filter(Boolean).join(', ')

  const navItems = [
    {
      name: t.dashboard.sidebar.dashboard,
      path: '/dashboard',
      icon: LayoutDashboard,
    },
    {
      name: t.dashboard.sidebar.myFarm,
      path: '/farm',
      icon: MapPin,
    },
    {
      name: t.dashboard.sidebar.weather,
      path: '/weather',
      icon: CloudSun,
    },
    {
      name: t.dashboard.sidebar.cropDoctor,
      path: '/crop-doctor',
      icon: Dna,
    },
    {
      name: t.dashboard.sidebar.cropManagement,
      path: '/crops',
      icon: Tractor,
    },
    {
      name: t.dashboard.sidebar.farmActivities,
      path: '/activities',
      icon: ClipboardList,
    },
    {
      name: t.dashboard.sidebar.profile,
      path: '/profile',
      icon: User,
    },
    {
      name: t.dashboard.sidebar.settings,
      path: '/profile', // settings alias
      icon: Settings,
    },
  ]

  return (
    <div className="min-h-screen bg-[#F6F8F1] flex flex-col md:flex-row text-[#24332A]">
      {/* Mobile Top Header */}
      <div className="md:hidden sticky top-0 z-40 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setMobileSidebarOpen(true)}
            className="p-1.5 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50"
            aria-label={t.nav.toggleMenuAria || 'Navigation'}
          >
            <Menu size={20} />
          </button>
          <Link to="/dashboard" className="flex items-center gap-2">
            <span className="text-xl">🌱</span>
            <span className="font-heading font-bold text-base text-[#176B45]">
              {t.nav.brandName}
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <LanguageSelector variant="compact" align="right" />

          <Link
            to="/profile"
            className="h-8 w-8 rounded-full bg-[#176B45]/15 text-[#176B45] font-bold text-xs flex items-center justify-center border border-[#176B45]/20"
          >
            {displayName[0]?.toUpperCase() || 'F'}
          </Link>
        </div>
      </div>

      {/* Desktop & Mobile Drawer Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-[#E5EAE2] flex flex-col justify-between transition-transform duration-200 md:static md:translate-x-0 ${mobileSidebarOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'
          }`}
      >
        <div>
          {/* Brand header */}
          <div className="p-5 border-b border-gray-100 flex items-center justify-between">
            <Link to="/dashboard" className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-[#176B45] text-white flex items-center justify-center shadow-md shadow-[#176B45]/20">
                <span className="text-xl">🌱</span>
              </div>
              <div>
                <h2 className="font-heading font-bold text-base text-[#176B45]">
                  {t.nav.brandName}
                </h2>
                <p className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold">
                  {t.nav.brandSubtitle}
                </p>
              </div>
            </Link>

            <button
              onClick={() => setMobileSidebarOpen(false)}
              className="md:hidden p-1 text-gray-400 hover:text-gray-700"
            >
              <X size={20} />
            </button>
          </div>

          {/* Farmer profile glance */}
          <div className="p-4 mx-3 my-3 rounded-2xl bg-[#F6F8F1] border border-[#75B843]/20 flex items-center gap-3">
            <div className="h-10 w-10 shrink-0 rounded-xl bg-[#176B45] text-white font-bold text-sm flex items-center justify-center shadow-xs">
              {displayName[0]?.toUpperCase() || 'F'}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold text-gray-900 truncate">{displayName}</p>
              <p className="text-[11px] text-gray-500 truncate">
                {displayLocation || user?.email || (language === 'te' ? 'క్రియాశీల రైతు' : language === 'hi' ? 'सक्रिय किसान' : 'Active Farmer')}
              </p>
            </div>
          </div>

          {/* Nav Links */}
          <nav className="px-3 py-2 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = currentPath === item.path
              return (
                <Link
                  key={item.path + item.name}
                  to={item.path}
                  onClick={() => setMobileSidebarOpen(false)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition ${isActive
                    ? 'bg-[#176B45] text-white shadow-sm shadow-[#176B45]/20'
                    : 'text-gray-600 hover:bg-[#F6F8F1] hover:text-[#176B45]'
                    }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon size={17} className={isActive ? 'text-white' : 'text-gray-400'} />
                    <span>{item.name}</span>
                  </div>
                  {isActive && <ChevronRight size={14} className="opacity-75" />}
                </Link>
              )
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-gray-100 space-y-2">
          {/* Language Switcher pill */}
          <LanguageSelector variant="sidebar" align="left" />

          {/* Logout */}
          <button
            onClick={handleSignOut}
            className="w-full flex items-center gap-2.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-red-600 hover:bg-red-50 transition"
          >
            <LogOut size={16} />
            <span>{t.dashboard.sidebar.logout}</span>
          </button>
        </div>
      </aside>

      {/* Backdrop for mobile drawer */}
      {mobileSidebarOpen && (
        <div
          onClick={() => setMobileSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-xs md:hidden"
        />
      )}

      {/* Main Workspace */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar for Desktop */}
        <header className="hidden md:flex h-16 bg-white border-b border-[#E5EAE2] items-center justify-between px-8 sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-[#176B45] border border-[#75B843]/20">
              <ShieldCheck size={14} className="text-[#75B843]" />
              <span>{t.dashboard.activeProtection}</span>
            </span>
            <span className="text-xs text-gray-400">|</span>
            <span className="text-xs text-gray-500 font-medium">
              KrishiRakshak AI · Smart Agriculture
            </span>
          </div>

          <div className="flex items-center gap-4">
            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setShowNotificationToast(!showNotificationToast)}
                className="p-2 rounded-xl border border-gray-200 text-gray-600 hover:text-[#176B45] hover:border-[#176B45] transition relative"
                title={language === 'te' ? 'నోటిఫికేషన్లు' : language === 'hi' ? 'सूचनाएं' : 'Notifications'}
              >
                <Bell size={16} />
                <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-[#75B843]" />
              </button>

              {showNotificationToast && (
                <div className="absolute right-0 mt-2 w-72 rounded-2xl border border-gray-200 bg-white p-4 shadow-xl text-xs space-y-2 z-50 animate-in fade-in">
                  <div className="flex items-center justify-between pb-2 border-b border-gray-100">
                    <span className="font-bold text-gray-800">
                      {language === 'te' ? 'వ్యవసాయ హెచ్చరికలు' : language === 'hi' ? 'कृषि अलर्ट' : 'Agricultural Alerts'}
                    </span>
                    <button
                      onClick={() => setShowNotificationToast(false)}
                      className="text-gray-400 hover:text-gray-600 text-[11px]"
                    >
                      {language === 'te' ? 'మూసివేయి' : language === 'hi' ? 'बंद करें' : 'Close'}
                    </button>
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    {language === 'te'
                      ? 'కృషి రక్షక్ AI కి స్వాగతం! స్వయంచాలక వాతావరణ ముప్పు పరిమితులను పొందడానికి మీ పొలాలను నమోదు చేయండి.'
                      : language === 'hi'
                      ? 'कृषि रक्षक AI में आपका स्वागत है! स्वचालित मौसम जोखिम सीमाएं प्राप्त करने के लिए अपने खेतों को पंजीकृत करें।'
                      : 'Welcome to KrishiRakshak AI! Register your farm plots to receive automatic weather risk thresholds.'}
                  </p>
                </div>
              )}
            </div>

            {/* Language Switcher */}
            <LanguageSelector variant="header" align="right" />

            {/* Farmer Avatar & Profile Shortcut */}
            <Link
              to="/profile"
              className="flex items-center gap-2.5 pl-2 py-1 rounded-xl hover:bg-gray-50 transition"
            >
              <div className="h-8 w-8 rounded-full bg-[#176B45] text-white font-bold text-xs flex items-center justify-center shadow-xs">
                {displayName[0]?.toUpperCase() || 'F'}
              </div>
              <div className="text-left hidden lg:block">
                <p className="text-xs font-bold text-gray-800 leading-tight">{displayName}</p>
                <p className="text-[10px] text-gray-400">{profile?.village || defaultFarmerLabel}</p>
              </div>
            </Link>
          </div>
        </header>

        {/* Content area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
