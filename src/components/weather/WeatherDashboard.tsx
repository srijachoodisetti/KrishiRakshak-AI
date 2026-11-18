import { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { CloudSun, RefreshCw, AlertCircle } from 'lucide-react'
import type { FarmLocation, WeatherData, CropWeatherRiskAssessment } from '../../types/weather'
import { fetchFarmWeather, isValidCoordinate } from '../../services/weatherService'
import { evaluateCropWeatherRisk } from '../../services/cropRiskService'
import { LocationSelector } from './LocationSelector'
import { CurrentWeatherCard } from './CurrentWeatherCard'
import { WeatherForecast } from './WeatherForecast'
import { WeatherRiskPanel } from './WeatherRiskPanel'
import type { TranslationDictionary } from '../../locales/translations'

const DEFAULT_FARM_LOCATION: FarmLocation = {
  latitude: 16.5062,
  longitude: 80.648,
  name: 'Krishna-Godavari Agricultural Belt',
  source: 'default',
}

interface WeatherDashboardProps {
  t: TranslationDictionary
}

export function WeatherDashboard({ t }: WeatherDashboardProps) {
  // Load saved location from localStorage if available
  const [location, setLocation] = useState<FarmLocation>(() => {
    try {
      const saved = localStorage.getItem('krishi_farm_location')
      if (saved) {
        const parsed = JSON.parse(saved)
        if (isValidCoordinate(parsed.latitude, parsed.longitude)) {
          return parsed
        }
      }
    } catch {
      // fallback
    }
    return DEFAULT_FARM_LOCATION
  })

  const [weather, setWeather] = useState<WeatherData | null>(null)
  const [riskAssessment, setRiskAssessment] = useState<CropWeatherRiskAssessment | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [refreshCount, setRefreshCount] = useState<number>(0)

  const activeRequestIdRef = useRef<number>(0)

  // Fetch weather data asynchronously without synchronous setState in effect body
  useEffect(() => {
    let isMounted = true
    const controller = new AbortController()
    const requestId = ++activeRequestIdRef.current

    async function loadData() {
      if (!isValidCoordinate(location.latitude, location.longitude)) {
        if (isMounted) {
          setErrorMessage(t.weather.dashboard.invalidCoordinates)
          setIsLoading(false)
        }
        return
      }

      try {
        const data = await fetchFarmWeather(location, controller.signal)

        if (isMounted && requestId === activeRequestIdRef.current) {
          setWeather(data)
          setRiskAssessment(evaluateCropWeatherRisk(data))
          setIsLoading(false)
          setErrorMessage(null)

          try {
            localStorage.setItem('krishi_farm_location', JSON.stringify(location))
          } catch {
            // ignore storage errors
          }
        }
      } catch (err: unknown) {
        if (axios.isCancel(err) || !isMounted) {
          return
        }

        if (requestId === activeRequestIdRef.current) {
          setIsLoading(false)
          let msg = t.weather.dashboard.fetchErrorGeneric

          if (axios.isAxiosError(err)) {
            if (err.response && err.response.status >= 500) {
              msg = t.weather.dashboard.apiServerError
            } else if (err.code === 'ECONNABORTED' || err.message?.includes('timeout')) {
              msg = t.weather.dashboard.apiTimeoutError
            }
          } else if (!navigator.onLine) {
            msg = t.weather.dashboard.offlineError
          }

          setErrorMessage(msg)
        }
      }
    }

    loadData()

    return () => {
      isMounted = false
      controller.abort()
    }
  }, [location, refreshCount, t.weather.dashboard])

  const handleLocationConfirmed = (newLoc: FarmLocation) => {
    setIsLoading(true)
    setErrorMessage(null)
    setLocation(newLoc)
  }

  const handleManualRefresh = () => {
    setIsLoading(true)
    setErrorMessage(null)
    setRefreshCount((prev) => prev + 1)
  }

  return (
    <section id="weather" className="scroll-mt-20 bg-[#F6F8F1] px-5 py-20 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Section Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#DCE9D6] bg-[#EAF3E5] px-4 py-1.5 text-xs font-bold text-forest shadow-sm">
            <CloudSun size={17} />
            {t.weather.dashboard.badge}
          </div>

          <h2 className="mt-4 text-3xl font-extrabold text-[#24332A] sm:text-4xl lg:text-5xl">
            {t.weather.dashboard.title}
          </h2>

          <p className="mt-4 text-base leading-relaxed text-gray-600 sm:text-lg">
            {t.weather.dashboard.description}
          </p>
        </div>

        {/* Location Selector (GPS + Interactive Map) */}
        <div className="mt-12">
          <LocationSelector
            currentLocation={location}
            onLocationConfirmed={handleLocationConfirmed}
            isWeatherLoading={isLoading}
            t={t}
          />
        </div>

        {/* Loading Indicator */}
        {isLoading && !weather && (
          <div className="mt-8 flex flex-col items-center justify-center rounded-3xl border border-[#E5EAE2] bg-white p-12 text-center shadow-sm">
            <RefreshCw size={36} className="animate-spin text-forest" />
            <h4 className="mt-4 text-lg font-bold text-[#24332A]">
              {t.weather.dashboard.loadingTitle}
            </h4>
            <p className="mt-1 text-sm text-gray-500">
              {t.weather.dashboard.loadingDesc}
            </p>
          </div>
        )}

        {/* Error Banner */}
        {errorMessage && (
          <div className="mt-8 flex flex-col items-center justify-center rounded-3xl border border-red-200 bg-red-50 p-8 text-center text-red-900 shadow-sm sm:flex-row sm:justify-between sm:text-left">
            <div className="flex items-center gap-3">
              <AlertCircle size={28} className="shrink-0 text-red-600" />
              <div>
                <h4 className="font-bold">{t.weather.dashboard.errorHeader}</h4>
                <p className="mt-0.5 text-sm text-red-800">{errorMessage}</p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleManualRefresh}
              className="mt-4 inline-flex items-center gap-2 rounded-xl bg-red-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-red-700 sm:mt-0"
            >
              <RefreshCw size={15} />
              {t.weather.dashboard.retryButton}
            </button>
          </div>
        )}

        {/* Weather Content when Data is Ready */}
        {weather && (
          <div className="mt-8 space-y-8">
            {/* Top: Current Weather Card */}
            <CurrentWeatherCard
              weather={weather}
              t={t}
            />

            {/* Middle: Crop Weather Risk Engine */}
            {riskAssessment && (
              <WeatherRiskPanel
                assessment={riskAssessment}
                t={t}
              />
            )}

            {/* Bottom: Hourly Chart & 7-Day Forecast */}
            <WeatherForecast
              weather={weather}
              t={t}
            />
          </div>
        )}
      </div>
    </section>
  )
}
