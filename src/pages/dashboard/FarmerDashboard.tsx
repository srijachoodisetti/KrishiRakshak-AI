import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  MapPin,
  Tractor,
  CloudSun,
  Sparkles,
  ShieldCheck,
  Calendar,
  ArrowRight,
  Plus,
  RefreshCw,
  Layers,
  ClipboardList
} from 'lucide-react'
import { DashboardLayout } from '../../components/dashboard/DashboardLayout'
import { useAuth } from '../../hooks/useAuth'
import { useLanguage } from '../../hooks/useLanguage'
import { fetchFarmerFarms } from '../../services/farmService'
import { fetchFarmerCrops } from '../../services/cropService'
import { fetchFarmerActivities } from '../../services/activityService'
import type { Farm } from '../../types/farm'
import type { Crop } from '../../types/crop'
import type { FarmActivity } from '../../types/activity'

export function FarmerDashboard() {
  const { user, profile } = useAuth()
  const { t } = useLanguage()

  const [farms, setFarms] = useState<Farm[]>([])
  const [crops, setCrops] = useState<Crop[]>([])
  const [activities, setActivities] = useState<FarmActivity[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) return
    let isMounted = true

    const loadDashboardData = async () => {
      try {
        setLoading(true)
        const [farmList, cropList, activityList] = await Promise.all([
          fetchFarmerFarms(user.id),
          fetchFarmerCrops(user.id),
          fetchFarmerActivities(user.id),
        ])
        if (!isMounted) return
        setFarms(farmList)
        setCrops(cropList)
        setActivities(activityList)
      } catch {
        // Handled silently
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    loadDashboardData()

    return () => {
      isMounted = false
    }
  }, [user])

  const displayName =
    profile?.full_name || user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Farmer'

  // Calculate actual statistics from user's Supabase records
  const totalArea = farms.reduce((acc, curr) => acc + (Number(curr.land_area) || 0), 0)
  const primaryFarm = farms[0] || null

  return (
    <DashboardLayout activeTab="dashboard">
      <div className="space-y-8">
        {/* Welcome Banner */}
        <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-[#176B45] via-[#125335] to-[#0D3B26] p-6 text-white shadow-xl shadow-[#176B45]/15 sm:p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="space-y-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold tracking-wide text-white backdrop-blur-sm">
                <ShieldCheck size={14} className="text-[#75B843]" />
                {t.dashboard.activeProtection}
              </span>
              <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
                {t.dashboard.welcome}, {displayName}! 🌾
              </h1>
              <p className="max-w-xl text-xs sm:text-sm text-white/80 leading-relaxed">
                {t.dashboard.tagline}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                to="/farm"
                className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-xs font-semibold text-[#176B45] shadow-sm transition hover:bg-emerald-50"
              >
                <Plus size={15} />
                <span>{t.farm.registerNewFarm}</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Real Supabase Overview Cards */}
        {loading ? (
          <div className="py-10 flex flex-col items-center justify-center text-center">
            <RefreshCw size={24} className="animate-spin text-[#176B45]" />
            <p className="mt-2 text-xs text-gray-500 font-medium">Updating farm records...</p>
          </div>
        ) : farms.length === 0 ? (
          /* Empty State */
          <div className="rounded-3xl border border-gray-200 bg-white p-8 sm:p-12 text-center shadow-xs">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-50 text-[#176B45]">
              <Tractor size={32} />
            </div>
            <h3 className="text-lg font-bold text-gray-900">{t.dashboard.emptyFarmTitle}</h3>
            <p className="mx-auto mt-2 max-w-md text-xs sm:text-sm text-gray-600 leading-relaxed">
              {t.dashboard.emptyFarmDesc}
            </p>
            <div className="mt-6">
              <Link
                to="/farm"
                className="inline-flex items-center gap-2 rounded-xl bg-[#176B45] px-5 py-3 text-xs font-semibold text-white shadow-sm transition hover:bg-[#125335]"
              >
                <Plus size={16} />
                <span>{t.dashboard.registerFirstFarm}</span>
              </Link>
            </div>
          </div>
        ) : (
          /* Actual Statistics from Supabase */
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex items-center gap-4 rounded-2xl border border-gray-200/80 bg-white p-5 shadow-xs">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#176B45]/10 text-[#176B45]">
                <MapPin size={24} />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-medium text-gray-500">{t.dashboard.quickStatsFarms}</p>
                <p className="text-xl font-bold text-gray-900 mt-0.5">{farms.length} Plots</p>
                <p className="text-[11px] text-gray-400 truncate">
                  {primaryFarm ? primaryFarm.farm_name : 'Verified'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-2xl border border-gray-200/80 bg-white p-5 shadow-xs">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#75B843]/15 text-[#75B843]">
                <Layers size={24} />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-medium text-gray-500">{t.dashboard.totalLandArea}</p>
                <p className="text-xl font-bold text-gray-900 mt-0.5">
                  {totalArea.toFixed(1)} {primaryFarm?.land_area_unit || 'Acres'}
                </p>
                <p className="text-[11px] text-gray-400">Total Cultivated</p>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-2xl border border-gray-200/80 bg-white p-5 shadow-xs">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-600">
                <Tractor size={24} />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-medium text-gray-500">{t.dashboard.activeCrops}</p>
                <p className="text-xl font-bold text-gray-900 mt-0.5">{crops.length} Active</p>
                <p className="text-[11px] text-gray-400 truncate">
                  {crops[0]?.crop_name || 'Monitoring'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 rounded-2xl border border-gray-200/80 bg-white p-5 shadow-xs">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-600">
                <ClipboardList size={24} />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-medium text-gray-500">Activities Logged</p>
                <p className="text-xl font-bold text-gray-900 mt-0.5">{activities.length} Entries</p>
                <p className="text-[11px] text-gray-400">Field Operations</p>
              </div>
            </div>
          </div>
        )}

        {/* Feature Fast-Track Cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Weather Module Card */}
          <div className="group relative overflow-hidden rounded-3xl border border-gray-200/80 bg-white p-6 shadow-xs transition hover:shadow-md">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#176B45]/10 text-[#176B45] group-hover:scale-105 transition-transform">
              <CloudSun size={26} />
            </div>
            <h3 className="text-lg font-bold text-gray-900">
              {t.dashboard.weatherCardTitle}
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-gray-600 leading-relaxed">
              {primaryFarm
                ? `Monitoring live conditions for ${primaryFarm.farm_name} (${primaryFarm.village || primaryFarm.district || 'Farm Location'}).`
                : t.dashboard.weatherCardDesc}
            </p>
            <div className="mt-6 flex items-center gap-3">
              <Link
                to="/weather"
                onClick={() => {
                  if (primaryFarm?.latitude && primaryFarm?.longitude) {
                    try {
                      localStorage.setItem(
                        'krishi_farm_location',
                        JSON.stringify({
                          latitude: primaryFarm.latitude,
                          longitude: primaryFarm.longitude,
                          name: primaryFarm.farm_name,
                          source: 'farm_record',
                        })
                      )
                    } catch {
                      // ignore
                    }
                  }
                }}
                className="inline-flex items-center gap-2 rounded-xl bg-[#176B45] px-4 py-2.5 text-xs font-semibold text-white shadow-sm transition hover:bg-[#125335]"
              >
                {t.dashboard.viewWeather}
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>

          {/* AI Crop Doctor Card */}
          <div className="group relative overflow-hidden rounded-3xl border border-gray-200/80 bg-white p-6 shadow-xs transition hover:shadow-md">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#75B843]/15 text-[#75B843] group-hover:scale-105 transition-transform">
              <Sparkles size={26} />
            </div>
            <h3 className="text-lg font-bold text-gray-900">
              {t.dashboard.cropDoctorTitle}
            </h3>
            <p className="mt-2 text-xs sm:text-sm text-gray-600 leading-relaxed">
              {t.dashboard.cropDoctorDesc}
            </p>
            <div className="mt-6 flex items-center gap-3">
              <Link
                to="/crop-doctor"
                className="inline-flex items-center gap-2 rounded-xl bg-[#75B843] px-4 py-2.5 text-xs font-semibold text-white shadow-sm transition hover:bg-[#629d36]"
              >
                {t.dashboard.startScan}
                <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>

        {/* Recent Farm Activities Feed */}
        <div className="rounded-3xl border border-gray-200/80 bg-white p-6 shadow-xs">
          <div className="flex items-center justify-between pb-4 border-b border-gray-100">
            <div>
              <h4 className="text-sm font-bold text-gray-900">
                {t.dashboard.recentActivityTitle}
              </h4>
              <p className="text-[11px] text-gray-500 mt-0.5">
                Real-time log of field operations, soil treatment, and harvesting
              </p>
            </div>

            <Link
              to="/activities"
              className="text-xs font-semibold text-[#176B45] hover:underline"
            >
              View All Logged Activities &rarr;
            </Link>
          </div>

          {activities.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-50 text-gray-400">
                <ClipboardList size={26} />
              </div>
              <p className="text-xs text-gray-500 max-w-sm">
                {t.dashboard.noActivity}
              </p>
              <div className="mt-4 flex gap-3">
                <Link
                  to="/activities"
                  className="rounded-xl bg-[#176B45] px-4 py-2 text-xs font-semibold text-white hover:bg-[#125335] transition"
                >
                  Log First Operation
                </Link>
              </div>
            </div>
          ) : (
            <div className="mt-4 divide-y divide-gray-100">
              {activities.slice(0, 4).map((act) => (
                <div key={act.id} className="py-3 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <span className="h-2 w-2 rounded-full bg-[#176B45]" />
                    <span className="font-bold text-gray-800">{act.activity_type}</span>
                    <span className="text-gray-500 truncate max-w-xs">{act.description}</span>
                  </div>

                  <div className="flex items-center gap-1.5 text-gray-400 text-[11px] shrink-0">
                    <Calendar size={13} />
                    <span>{act.activity_date}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}
export default FarmerDashboard
