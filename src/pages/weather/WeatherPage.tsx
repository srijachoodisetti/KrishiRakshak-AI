import { useState, useEffect } from 'react'
import { MapPin, RefreshCw } from 'lucide-react'
import { DashboardLayout } from '../../components/dashboard/DashboardLayout'
import { WeatherDashboard } from '../../components/weather/WeatherDashboard'
import { useAuth } from '../../hooks/useAuth'
import { useLanguage } from '../../hooks/useLanguage'
import { fetchFarmerFarms } from '../../services/farmService'
import type { Farm } from '../../types/farm'

export function WeatherPage() {
  const { user } = useAuth()
  const { t } = useLanguage()
  const [farms, setFarms] = useState<Farm[]>([])
  const [selectedFarmId, setSelectedFarmId] = useState<string>('')
  const [loadingFarms, setLoadingFarms] = useState(true)

  useEffect(() => {
    if (!user) return
    const loadFarms = async () => {
      try {
        setLoadingFarms(true)
        const list = await fetchFarmerFarms(user.id)
        setFarms(list)
        if (list.length > 0) {
          setSelectedFarmId(list[0].id)
        }
      } catch {
        // Handled
      } finally {
        setLoadingFarms(false)
      }
    }
    loadFarms()
  }, [user])

  const handleSelectFarm = (farmId: string) => {
    setSelectedFarmId(farmId)
    const selected = farms.find((f) => f.id === farmId)
    if (selected && selected.latitude && selected.longitude) {
      try {
        localStorage.setItem(
          'krishi_farm_location',
          JSON.stringify({
            latitude: selected.latitude,
            longitude: selected.longitude,
            name: selected.farm_name,
            source: 'farm_record',
          })
        )
        // Trigger storage event or let WeatherDashboard pick up next time
        window.dispatchEvent(new Event('storage'))
      } catch {
        // ignore
      }
    }
  }

  const selectedFarm = farms.find((f) => f.id === selectedFarmId)

  return (
    <DashboardLayout activeTab="weather">
      <div className="space-y-6">
        {/* Farm selector dropdown */}
        {farms.length > 0 && (
          <div className="rounded-2xl border border-gray-200/80 bg-white p-4 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="h-9 w-9 rounded-xl bg-emerald-50 text-[#176B45] flex items-center justify-center shrink-0">
                <MapPin size={18} />
              </div>
              <div>
                <span className="text-xs font-bold text-gray-800">
                  {t.weather.location.activeLocationLabel}
                </span>
                <p className="text-[11px] text-gray-500">
                  {selectedFarm
                    ? `${selectedFarm.farm_name} (${selectedFarm.village || selectedFarm.district || t.weather.location.mapSelectedName})`
                    : t.weather.location.noLocationYet}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <label htmlFor="farm-selector" className="text-xs font-medium text-gray-600">
                {t.farm.farmName}:
              </label>
              <select
                id="farm-selector"
                value={selectedFarmId}
                onChange={(e) => handleSelectFarm(e.target.value)}
                className="px-3 py-1.5 rounded-xl border border-gray-200 text-xs font-semibold text-gray-800 focus:outline-none focus:border-[#176B45] bg-white"
              >
                {farms.map((f) => (
                  <option key={f.id} value={f.id}>
                    {f.farm_name} ({f.land_area} {f.land_area_unit})
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        {loadingFarms ? (
          <div className="py-20 flex flex-col items-center justify-center text-center">
            <RefreshCw size={24} className="animate-spin text-[#176B45]" />
            <p className="mt-2 text-xs text-gray-500 font-medium">Connecting to farm weather stations...</p>
          </div>
        ) : (
          <WeatherDashboard t={t} />
        )}
      </div>
    </DashboardLayout>
  )
}
