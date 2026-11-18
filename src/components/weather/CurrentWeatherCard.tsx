import {
  Sun,
  CloudSun,
  Cloud,
  CloudFog,
  CloudDrizzle,
  CloudRain,
  CloudLightning,
  Droplets,
  Wind,
  Sunrise,
  Sunset,
  Thermometer,
  Clock,
  Compass,
} from 'lucide-react'
import type { WeatherData } from '../../types/weather'
import { getWeatherConditionKey } from '../../services/weatherService'
import type { TranslationDictionary } from '../../locales/translations'

interface CurrentWeatherCardProps {
  weather: WeatherData
  t: TranslationDictionary
}

export function CurrentWeatherCard({ weather, t }: CurrentWeatherCardProps) {
  const current = weather.current
  const today = weather.daily[0] || {
    sunrise: '--:--',
    sunset: '--:--',
    temperatureMax: current.temperature,
    temperatureMin: current.temperature,
  }

  const conditionKey = getWeatherConditionKey(current.weatherCode)
  const conditionText =
    (t.weather.conditions as Record<string, string>)[conditionKey] ||
    t.weather.conditions.partlyCloudy

  const getWeatherIcon = (code: number, size = 48) => {
    const key = getWeatherConditionKey(code)
    switch (key) {
      case 'clearSky':
        return <Sun size={size} className="text-amber-500" />
      case 'mainlyClear':
      case 'partlyCloudy':
        return <CloudSun size={size} className="text-amber-500" />
      case 'overcast':
        return <Cloud size={size} className="text-slate-500" />
      case 'fog':
        return <CloudFog size={size} className="text-slate-400" />
      case 'drizzle':
      case 'freezingDrizzle':
        return <CloudDrizzle size={size} className="text-blue-400" />
      case 'slightRain':
      case 'moderateRain':
      case 'heavyRain':
      case 'rainShowers':
      case 'violentRainShowers':
      case 'freezingRain':
        return <CloudRain size={size} className="text-blue-500" />
      case 'thunderstorm':
      case 'thunderstormWithHail':
        return <CloudLightning size={size} className="text-purple-600" />
      default:
        return <CloudSun size={size} className="text-amber-500" />
    }
  }

  // Format updated time
  let formattedUpdated = weather.fetchedAt
  try {
    const d = new Date(weather.fetchedAt)
    formattedUpdated = d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  } catch {
    // fallback
  }

  return (
    <div className="overflow-hidden rounded-3xl border border-[#E5EAE2] bg-white shadow-sm">
      {/* Top Banner with Location and Timestamp */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#E5EAE2] bg-[#EAF3E5]/60 px-6 py-4">
        <div className="flex items-center gap-2 text-xs font-semibold text-forest">
          <Compass size={16} />
          <span>
            {t.weather.current.locationLabel}: {weather.location.latitude.toFixed(4)}° N, {weather.location.longitude.toFixed(4)}° E
          </span>
          {weather.location.name && (
            <span className="rounded-md bg-forest/10 px-2 py-0.5 text-[11px] text-forest">
              {weather.location.name}
            </span>
          )}
        </div>

        <div className="flex items-center gap-1.5 text-xs text-gray-500">
          <Clock size={14} />
          <span>{t.weather.current.lastUpdated}: {formattedUpdated}</span>
        </div>
      </div>

      <div className="p-6 md:p-8">
        {/* Main Temperature and Condition */}
        <div className="grid gap-6 md:grid-cols-2 md:items-center">
          <div className="flex items-center gap-5">
            <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-3xl bg-[#F6F8F1] shadow-inner">
              {getWeatherIcon(current.weatherCode, 52)}
            </div>
            <div>
              <div className="flex items-baseline gap-1">
                <span className="text-5xl font-extrabold text-[#24332A] sm:text-6xl">
                  {Math.round(current.temperature)}
                </span>
                <span className="text-2xl font-bold text-gray-500">°C</span>
              </div>
              <p className="mt-1 text-lg font-bold text-forest sm:text-xl">
                {conditionText}
              </p>
              <p className="text-xs text-gray-500">
                {t.weather.current.feelsLike}: {Math.round(current.apparentTemperature)} °C
                {today.temperatureMax !== undefined && (
                  <span className="ml-2 font-medium">
                    (H: {today.temperatureMax}° · L: {today.temperatureMin}°)
                  </span>
                )}
              </p>
            </div>
          </div>

          {/* Quick Metrics Grid */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 md:grid-cols-2 lg:grid-cols-4">
            {/* Humidity */}
            <div className="rounded-2xl border border-[#E5EAE2] bg-[#F6F8F1] p-3.5">
              <div className="flex items-center gap-1.5 text-xs text-gray-500">
                <Droplets size={15} className="text-blue-500" />
                <span>{t.weather.current.humidity}</span>
              </div>
              <p className="mt-1 text-xl font-bold text-[#24332A]">
                {current.relativeHumidity}%
              </p>
            </div>

            {/* Precipitation */}
            <div className="rounded-2xl border border-[#E5EAE2] bg-[#F6F8F1] p-3.5">
              <div className="flex items-center gap-1.5 text-xs text-gray-500">
                <CloudRain size={15} className="text-blue-600" />
                <span>{t.weather.current.rainfall}</span>
              </div>
              <p className="mt-1 text-xl font-bold text-[#24332A]">
                {current.precipitation} <span className="text-xs font-normal">mm</span>
              </p>
            </div>

            {/* Wind Speed */}
            <div className="rounded-2xl border border-[#E5EAE2] bg-[#F6F8F1] p-3.5">
              <div className="flex items-center gap-1.5 text-xs text-gray-500">
                <Wind size={15} className="text-teal-600" />
                <span>{t.weather.current.windSpeed}</span>
              </div>
              <p className="mt-1 text-xl font-bold text-[#24332A]">
                {current.windSpeed} <span className="text-xs font-normal">km/h</span>
              </p>
            </div>

            {/* Apparent Temp */}
            <div className="rounded-2xl border border-[#E5EAE2] bg-[#F6F8F1] p-3.5">
              <div className="flex items-center gap-1.5 text-xs text-gray-500">
                <Thermometer size={15} className="text-orange-500" />
                <span>{t.weather.current.feelsLikeShort}</span>
              </div>
              <p className="mt-1 text-xl font-bold text-[#24332A]">
                {Math.round(current.apparentTemperature)}°
              </p>
            </div>
          </div>
        </div>

        {/* Sunrise and Sunset Bar */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-[#E5EAE2] pt-4 text-xs text-gray-600">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <Sunrise size={18} className="text-amber-500" />
              <span>{t.weather.current.sunrise}: <strong>{today.sunrise}</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <Sunset size={18} className="text-orange-500" />
              <span>{t.weather.current.sunset}: <strong>{today.sunset}</strong></span>
            </div>
          </div>

          <div className="text-[11px] text-gray-500">
            {t.weather.current.timezoneLabel}: {weather.timezone}
          </div>
        </div>
      </div>
    </div>
  )
}
