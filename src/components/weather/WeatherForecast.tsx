import { useState } from 'react'
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts'
import {
  Sun,
  CloudSun,
  Cloud,
  CloudFog,
  CloudDrizzle,
  CloudRain,
  CloudLightning,
  Calendar,
  Clock,
  Droplet,
} from 'lucide-react'
import type { WeatherData } from '../../types/weather'
import { getWeatherConditionKey } from '../../services/weatherService'
import type { TranslationDictionary } from '../../locales/translations'

interface WeatherForecastProps {
  weather: WeatherData
  t: TranslationDictionary
}

export function WeatherForecast({ weather, t }: WeatherForecastProps) {
  const [activeTab, setActiveTab] = useState<'hourly' | 'daily'>('hourly')

  const getWeatherIcon = (code: number, size = 22) => {
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

  // Chart data for next 24 hours
  const hourlyChartData = weather.hourly.map((item) => ({
    time: item.hourLabel,
    temperature: item.temperature,
    precipitationProbability: item.precipitationProbability,
    rain: item.precipitation,
  }))

  const getDayName = (dayKey: string, fallback: string): string => {
    const daysDict = t.weather.forecast.days as Record<string, string>
    return daysDict[dayKey] || fallback
  }

  return (
    <div className="rounded-3xl border border-[#E5EAE2] bg-white p-6 shadow-sm md:p-8">
      {/* Header and Mode Selector */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-[#EAF3E5] px-3 py-1 text-xs font-bold text-forest">
            <Calendar size={14} />
            {t.weather.forecast.badge}
          </div>
          <h3 className="mt-2 text-xl font-bold text-[#24332A] sm:text-2xl">
            {t.weather.forecast.title}
          </h3>
          <p className="mt-1 text-sm text-gray-600">
            {t.weather.forecast.subtitle}
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="inline-flex rounded-xl border border-gray-200 bg-[#F6F8F1] p-1">
          <button
            type="button"
            onClick={() => setActiveTab('hourly')}
            className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-bold transition ${
              activeTab === 'hourly'
                ? 'bg-forest text-white shadow-sm'
                : 'text-gray-600 hover:text-forest'
            }`}
          >
            <Clock size={14} />
            {t.weather.forecast.tabHourly}
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('daily')}
            className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-bold transition ${
              activeTab === 'daily'
                ? 'bg-forest text-white shadow-sm'
                : 'text-gray-600 hover:text-forest'
            }`}
          >
            <Calendar size={14} />
            {t.weather.forecast.tabDaily}
          </button>
        </div>
      </div>

      {/* Hourly View */}
      {activeTab === 'hourly' && (
        <div className="mt-6">
          {/* Recharts Visualization */}
          <div className="mb-4 flex items-center justify-between text-xs text-gray-500">
            <span className="font-semibold text-forest">
              {t.weather.forecast.hourlyChartTitle}
            </span>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <span className="inline-block h-2.5 w-2.5 rounded-full bg-forest" />
                {t.weather.forecast.tempLegend} (°C)
              </span>
              <span className="flex items-center gap-1.5">
                <span className="inline-block h-2.5 w-2.5 rounded-full bg-blue-500" />
                {t.weather.forecast.rainLegend} (%)
              </span>
            </div>
          </div>

          <div className="h-64 w-full sm:h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={hourlyChartData}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="tempGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#176B45" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#176B45" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="rainGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5EAE2" />
                <XAxis
                  dataKey="time"
                  tickLine={false}
                  stroke="#9CA3AF"
                  fontSize={11}
                  interval={3}
                />
                <YAxis
                  yAxisId="left"
                  tickLine={false}
                  stroke="#9CA3AF"
                  fontSize={11}
                  domain={['dataMin - 2', 'dataMax + 2']}
                />
                <YAxis
                  yAxisId="right"
                  orientation="right"
                  tickLine={false}
                  stroke="#9CA3AF"
                  fontSize={11}
                  domain={[0, 100]}
                  hide
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#ffffff',
                    borderRadius: '12px',
                    border: '1px solid #E5EAE2',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                    fontSize: '12px',
                  }}
                  formatter={(value: number | string | readonly (number | string)[] | undefined, name: string | number | undefined) => {
                    if (name === 'temperature') return [`${value} °C`, t.weather.current.temperature]
                    if (name === 'precipitationProbability') return [`${value} %`, t.weather.forecast.rainChance]
                    return [String(value ?? ''), String(name ?? '')]
                  }}
                />
                <Area
                  yAxisId="left"
                  type="monotone"
                  dataKey="temperature"
                  stroke="#176B45"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#tempGradient)"
                />
                <Area
                  yAxisId="right"
                  type="monotone"
                  dataKey="precipitationProbability"
                  stroke="#3B82F6"
                  strokeWidth={1.5}
                  fillOpacity={1}
                  fill="url(#rainGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Hourly Mini Cards Slider */}
          <div className="mt-6 flex gap-3 overflow-x-auto pb-2 pt-1 scrollbar-thin">
            {weather.hourly.slice(0, 24).map((h, idx) => (
              <div
                key={idx}
                className="flex w-24 shrink-0 flex-col items-center justify-between rounded-2xl border border-[#E5EAE2] bg-[#F6F8F1] p-3 text-center transition hover:border-forest/40 hover:bg-white"
              >
                <span className="text-xs font-semibold text-gray-500">{h.hourLabel}</span>
                <div className="my-2">{getWeatherIcon(weather.current.weatherCode, 26)}</div>
                <span className="text-base font-extrabold text-[#24332A]">{Math.round(h.temperature)}°</span>
                <div className="mt-1 flex items-center gap-1 text-[11px] text-blue-600">
                  <Droplet size={11} />
                  <span>{h.precipitationProbability}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 7-Day Forecast Grid */}
      {activeTab === 'daily' && (
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-7">
          {weather.daily.map((day, idx) => {
            const conditionKey = getWeatherConditionKey(day.weatherCode)
            const conditionText =
              (t.weather.conditions as Record<string, string>)[conditionKey] ||
              t.weather.conditions.partlyCloudy

            return (
              <div
                key={day.date}
                className={`flex flex-col items-center justify-between rounded-2xl border p-4 text-center transition duration-200 hover:-translate-y-1 hover:shadow-md ${
                  idx === 0
                    ? 'border-forest/40 bg-[#EAF3E5]/40 shadow-sm'
                    : 'border-[#E5EAE2] bg-[#F6F8F1]'
                }`}
              >
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-forest">
                    {getDayName(day.dayKey, day.dayFallback)}
                  </span>
                  <p className="mt-0.5 text-[11px] text-gray-500">
                    {day.date.slice(5).replace('-', '/')}
                  </p>
                </div>

                <div className="my-3 flex flex-col items-center gap-1">
                  {getWeatherIcon(day.weatherCode, 32)}
                  <span className="text-[11px] font-medium text-gray-700 line-clamp-1">
                    {conditionText}
                  </span>
                </div>

                <div className="w-full">
                  <div className="flex items-center justify-center gap-2 text-sm">
                    <span className="font-extrabold text-[#24332A]">{day.temperatureMax}°</span>
                    <span className="text-xs text-gray-500">{day.temperatureMin}°</span>
                  </div>

                  <div className="mt-2 flex items-center justify-center gap-1 rounded-full bg-blue-50 px-2 py-0.5 text-[11px] font-semibold text-blue-600">
                    <Droplet size={11} />
                    <span>{day.precipitationProbabilityMax}%</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
