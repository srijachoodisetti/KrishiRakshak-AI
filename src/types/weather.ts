export interface FarmLocation {
  latitude: number
  longitude: number
  name?: string
  source: 'gps' | 'map' | 'default'
}

export interface CurrentWeatherData {
  time: string
  temperature: number
  relativeHumidity: number
  apparentTemperature: number
  precipitation: number
  weatherCode: number
  windSpeed: number
}

export interface HourlyWeatherItem {
  time: string
  hourLabel: string
  temperature: number
  relativeHumidity: number
  precipitationProbability: number
  precipitation: number
  windSpeed: number
}

export interface DailyForecastItem {
  date: string
  dayKey: string // e.g. 'monday', 'tuesday', 'today'
  dayFallback: string
  weatherCode: number
  temperatureMax: number
  temperatureMin: number
  precipitationProbabilityMax: number
  sunrise: string
  sunset: string
}

export interface WeatherData {
  location: FarmLocation
  current: CurrentWeatherData
  hourly: HourlyWeatherItem[]
  daily: DailyForecastItem[]
  timezone: string
  elevation?: number
  fetchedAt: string
}

export type RiskSeverity = 'low' | 'moderate' | 'high'
export type RiskCategory = 'rainfall' | 'temperature' | 'humidity' | 'wind'

export interface CropWeatherRiskItem {
  id: string
  category: RiskCategory
  severity: RiskSeverity
  titleKey: string
  titleFallback: string
  metricValue: string
  thresholdNote: string
  descriptionKey: string
  descriptionFallback: string
  advisoryKey: string
  advisoryFallback: string
}

export interface CropWeatherRiskAssessment {
  overallSeverity: RiskSeverity
  evaluatedAt: string
  risks: CropWeatherRiskItem[]
  summaryKey: string
  summaryFallback: string
}
