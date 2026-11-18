import axios from 'axios'
import type { WeatherData, FarmLocation, HourlyWeatherItem, DailyForecastItem } from '../types/weather'

const OPEN_METEO_BASE_URL = 'https://api.open-meteo.com/v1/forecast'

export function isValidCoordinate(latitude: number, longitude: number): boolean {
  return (
    typeof latitude === 'number' &&
    typeof longitude === 'number' &&
    !isNaN(latitude) &&
    !isNaN(longitude) &&
    latitude >= -90 &&
    latitude <= 90 &&
    longitude >= -180 &&
    longitude <= 180
  )
}

export function getWeatherConditionKey(code: number): string {
  switch (code) {
    case 0:
      return 'clearSky'
    case 1:
      return 'mainlyClear'
    case 2:
      return 'partlyCloudy'
    case 3:
      return 'overcast'
    case 45:
    case 48:
      return 'fog'
    case 51:
    case 53:
    case 55:
      return 'drizzle'
    case 56:
    case 57:
      return 'freezingDrizzle'
    case 61:
      return 'slightRain'
    case 63:
      return 'moderateRain'
    case 65:
      return 'heavyRain'
    case 66:
    case 67:
      return 'freezingRain'
    case 71:
    case 73:
    case 75:
    case 77:
      return 'snow'
    case 80:
    case 81:
      return 'rainShowers'
    case 82:
      return 'violentRainShowers'
    case 85:
    case 86:
      return 'snowShowers'
    case 95:
      return 'thunderstorm'
    case 96:
    case 99:
      return 'thunderstormWithHail'
    default:
      return 'partlyCloudy'
  }
}

interface OpenMeteoApiResponse {
  latitude: number
  longitude: number
  timezone: string
  elevation?: number
  current: {
    time: string
    temperature_2m: number
    relative_humidity_2m: number
    apparent_temperature: number
    precipitation: number
    weather_code: number
    wind_speed_10m: number
  }
  hourly: {
    time: string[]
    temperature_2m: number[]
    relative_humidity_2m: number[]
    precipitation_probability: number[]
    precipitation: number[]
    wind_speed_10m: number[]
  }
  daily: {
    time: string[]
    weather_code: number[]
    temperature_2m_max: number[]
    temperature_2m_min: number[]
    precipitation_probability_max: number[]
    sunrise: string[]
    sunset: string[]
  }
}

const DAY_KEYS = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']

export async function fetchFarmWeather(
  location: FarmLocation,
  signal?: AbortSignal
): Promise<WeatherData> {
  const { latitude, longitude } = location

  if (!isValidCoordinate(latitude, longitude)) {
    throw new Error('Invalid geographic coordinates provided for farm location.')
  }

  const params = {
    latitude: Number(latitude.toFixed(4)),
    longitude: Number(longitude.toFixed(4)),
    current: 'temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,weather_code,wind_speed_10m',
    hourly: 'temperature_2m,relative_humidity_2m,precipitation_probability,precipitation,wind_speed_10m',
    daily: 'weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,sunrise,sunset',
    timezone: 'auto',
    forecast_days: 7,
    temperature_unit: 'celsius',
    wind_speed_unit: 'kmh',
  }

  const response = await axios.get<OpenMeteoApiResponse>(OPEN_METEO_BASE_URL, {
    params,
    signal,
    timeout: 12000,
  })

  const data = response.data

  if (!data || !data.current || !data.hourly || !data.daily) {
    throw new Error('Incomplete weather data received from Open-Meteo.')
  }

  // Find index of current hour in hourly array or take next 24 hours
  const now = new Date()
  let startIndex = 0
  if (Array.isArray(data.hourly.time)) {
    const currentIsoPrefix = now.toISOString().slice(0, 13) // e.g. "2026-11-16T09"
    const foundIdx = data.hourly.time.findIndex((t) => t.startsWith(currentIsoPrefix))
    if (foundIdx >= 0) {
      startIndex = foundIdx
    }
  }

  const next24Hours: HourlyWeatherItem[] = []
  const maxHours = Math.min(startIndex + 24, data.hourly.time.length)

  for (let i = startIndex; i < maxHours; i++) {
    const rawTime = data.hourly.time[i]
    let hourLabel: string
    try {
      const d = new Date(rawTime)
      const hours = d.getHours()
      const ampm = hours >= 12 ? 'PM' : 'AM'
      const formattedHour = hours % 12 === 0 ? 12 : hours % 12
      hourLabel = `${formattedHour} ${ampm}`
    } catch {
      hourLabel = rawTime.slice(11, 16)
    }

    next24Hours.push({
      time: rawTime,
      hourLabel,
      temperature: Math.round(data.hourly.temperature_2m[i] * 10) / 10,
      relativeHumidity: Math.round(data.hourly.relative_humidity_2m[i]),
      precipitationProbability: Math.round(data.hourly.precipitation_probability[i] || 0),
      precipitation: Math.round((data.hourly.precipitation[i] || 0) * 10) / 10,
      windSpeed: Math.round((data.hourly.wind_speed_10m[i] || 0) * 10) / 10,
    })
  }

  // Daily forecast (7 days)
  const dailyForecast: DailyForecastItem[] = []
  const daysCount = Math.min(7, data.daily.time.length)

  for (let d = 0; d < daysCount; d++) {
    const dateStr = data.daily.time[d]
    const dateObj = new Date(dateStr)
    const dayOfWeek = dateObj.getDay()
    const dayKey = d === 0 ? 'today' : d === 1 ? 'tomorrow' : DAY_KEYS[dayOfWeek]
    const dayFallback = d === 0 ? 'Today' : d === 1 ? 'Tomorrow' : dateObj.toLocaleDateString('en-US', { weekday: 'short' })

    // Format sunrise/sunset for human-readable display
    let formattedSunrise = data.daily.sunrise[d] || '--'
    let formattedSunset = data.daily.sunset[d] || '--'
    try {
      if (data.daily.sunrise[d]) {
        formattedSunrise = data.daily.sunrise[d].slice(11, 16)
      }
      if (data.daily.sunset[d]) {
        formattedSunset = data.daily.sunset[d].slice(11, 16)
      }
    } catch {
      // keep raw
    }

    dailyForecast.push({
      date: dateStr,
      dayKey,
      dayFallback,
      weatherCode: data.daily.weather_code[d],
      temperatureMax: Math.round(data.daily.temperature_2m_max[d]),
      temperatureMin: Math.round(data.daily.temperature_2m_min[d]),
      precipitationProbabilityMax: Math.round(data.daily.precipitation_probability_max[d] || 0),
      sunrise: formattedSunrise,
      sunset: formattedSunset,
    })
  }

  return {
    location,
    current: {
      time: data.current.time,
      temperature: Math.round(data.current.temperature_2m * 10) / 10,
      relativeHumidity: Math.round(data.current.relative_humidity_2m),
      apparentTemperature: Math.round(data.current.apparent_temperature * 10) / 10,
      precipitation: Math.round(data.current.precipitation * 10) / 10,
      weatherCode: data.current.weather_code,
      windSpeed: Math.round(data.current.wind_speed_10m * 10) / 10,
    },
    hourly: next24Hours,
    daily: dailyForecast,
    timezone: data.timezone,
    elevation: data.elevation,
    fetchedAt: new Date().toISOString(),
  }
}
