import type { WeatherData, CropWeatherRiskAssessment, CropWeatherRiskItem, RiskSeverity } from '../types/weather'

export function evaluateCropWeatherRisk(weather: WeatherData): CropWeatherRiskAssessment {
  const current = weather.current
  const todayForecast = weather.daily[0] || {
    temperatureMax: current.temperature,
    precipitationProbabilityMax: 0,
  }

  // Calculate 24h total precipitation from hourly data if available
  const next24hPrecipitation = weather.hourly.slice(0, 24).reduce((sum, h) => sum + (h.precipitation || 0), 0)
  const maxWindSpeedNext24h = Math.max(
    current.windSpeed,
    ...weather.hourly.slice(0, 24).map((h) => h.windSpeed || 0)
  )

  const risks: CropWeatherRiskItem[] = []

  // 1. Heavy Rainfall Assessment
  const rainTotal24h = Math.max(next24hPrecipitation, current.precipitation)
  if (rainTotal24h >= 50 || current.precipitation >= 15) {
    risks.push({
      id: 'rainfall',
      category: 'rainfall',
      severity: 'high',
      titleKey: 'riskRainHeavyTitle',
      titleFallback: 'Heavy Rainfall Warning',
      metricValue: `${rainTotal24h.toFixed(1)} mm (24h)`,
      thresholdNote: '> 50 mm / 24h',
      descriptionKey: 'riskRainHeavyDesc',
      descriptionFallback: 'Forecast indicates heavy rain. Waterlogging and root suffocation risks in low-drainage fields.',
      advisoryKey: 'riskRainHeavyAdv',
      advisoryFallback: 'Clear field drainage channels. Postpone fertilizer broadcasting and chemical spraying.',
    })
  } else if (rainTotal24h >= 20 || todayForecast.precipitationProbabilityMax >= 70) {
    risks.push({
      id: 'rainfall',
      category: 'rainfall',
      severity: 'moderate',
      titleKey: 'riskRainModerateTitle',
      titleFallback: 'Moderate Rain Expected',
      metricValue: `${rainTotal24h.toFixed(1)} mm (24h)`,
      thresholdNote: '20 - 50 mm / 24h',
      descriptionKey: 'riskRainModerateDesc',
      descriptionFallback: 'Moderate showers anticipated. Beneficial for soil moisture, but monitor field retention.',
      advisoryKey: 'riskRainModerateAdv',
      advisoryFallback: 'Inspect field bunds and drainage outlets. Hold off on non-urgent foliar spraying.',
    })
  } else {
    risks.push({
      id: 'rainfall',
      category: 'rainfall',
      severity: 'low',
      titleKey: 'riskRainLowTitle',
      titleFallback: 'Normal Rainfall Conditions',
      metricValue: `${rainTotal24h.toFixed(1)} mm (24h)`,
      thresholdNote: '< 20 mm / 24h',
      descriptionKey: 'riskRainLowDesc',
      descriptionFallback: 'Light or negligible precipitation forecast. Favorable for routine field operations.',
      advisoryKey: 'riskRainLowAdv',
      advisoryFallback: 'Proceed with scheduled irrigation and field activities based on soil moisture.',
    })
  }

  // 2. High Temperature / Heat Stress Assessment
  const maxTemp = Math.max(current.temperature, todayForecast.temperatureMax)
  if (maxTemp >= 38) {
    risks.push({
      id: 'temperature',
      category: 'temperature',
      severity: 'high',
      titleKey: 'riskTempHighTitle',
      titleFallback: 'High Temperature Warning',
      metricValue: `${maxTemp.toFixed(1)} °C`,
      thresholdNote: 'Max temp >= 38 °C',
      descriptionKey: 'riskTempHighDesc',
      descriptionFallback: 'Extreme heat stress. High evapotranspiration rate may induce wilting or flower drop.',
      advisoryKey: 'riskTempHighAdv',
      advisoryFallback: 'Provide light irrigation during early morning or late evening. Maintain mulch to protect root zones.',
    })
  } else if (maxTemp >= 33) {
    risks.push({
      id: 'temperature',
      category: 'temperature',
      severity: 'moderate',
      titleKey: 'riskTempModerateTitle',
      titleFallback: 'Elevated Daytime Temperature',
      metricValue: `${maxTemp.toFixed(1)} °C`,
      thresholdNote: 'Max temp 33 - 38 °C',
      descriptionKey: 'riskTempModerateDesc',
      descriptionFallback: 'Warm conditions with accelerated moisture depletion in shallow soils.',
      advisoryKey: 'riskTempModerateAdv',
      advisoryFallback: 'Monitor soil moisture regularly; irrigate before peak afternoon heat if soil is dry.',
    })
  } else {
    risks.push({
      id: 'temperature',
      category: 'temperature',
      severity: 'low',
      titleKey: 'riskTempLowTitle',
      titleFallback: 'Favorable Temperature Range',
      metricValue: `${maxTemp.toFixed(1)} °C`,
      thresholdNote: 'Max temp < 33 °C',
      descriptionKey: 'riskTempLowDesc',
      descriptionFallback: 'Temperature is within the optimal vegetative development range for regional crops.',
      advisoryKey: 'riskTempLowAdv',
      advisoryFallback: 'Standard growing conditions. Continue regular crop management practices.',
    })
  }

  // 3. High Humidity / Fungal Favorable Conditions Assessment
  const humidity = current.relativeHumidity
  if (humidity >= 85 && current.temperature >= 20 && current.temperature <= 32) {
    risks.push({
      id: 'humidity',
      category: 'humidity',
      severity: 'high',
      titleKey: 'riskHumidityHighTitle',
      titleFallback: 'High Humidity Alert',
      metricValue: `${humidity}%`,
      thresholdNote: 'RH >= 85% with warm air',
      descriptionKey: 'riskHumidityHighDesc',
      descriptionFallback: 'Sustained high humidity creates favorable microclimatic conditions for fungal spore germination.',
      advisoryKey: 'riskHumidityHighAdv',
      advisoryFallback: 'Ensure crop canopy aeration and weed clearance. Inspect lower leaves for early fungal spotting.',
    })
  } else if (humidity >= 70) {
    risks.push({
      id: 'humidity',
      category: 'humidity',
      severity: 'moderate',
      titleKey: 'riskHumidityModerateTitle',
      titleFallback: 'Moderate Humidity Level',
      metricValue: `${humidity}%`,
      thresholdNote: 'RH 70% - 85%',
      descriptionKey: 'riskHumidityModerateDesc',
      descriptionFallback: 'Moderately humid conditions. Keep observe plant health during continuous cloud cover.',
      advisoryKey: 'riskHumidityModerateAdv',
      advisoryFallback: 'Promote good field air circulation. Avoid late-afternoon leaf wetting.',
    })
  } else {
    risks.push({
      id: 'humidity',
      category: 'humidity',
      severity: 'low',
      titleKey: 'riskHumidityLowTitle',
      titleFallback: 'Normal Humidity Level',
      metricValue: `${humidity}%`,
      thresholdNote: 'RH < 70%',
      descriptionKey: 'riskHumidityLowDesc',
      descriptionFallback: 'Relative humidity is normal. Low risk of moisture-induced microclimatic disease buildup.',
      advisoryKey: 'riskHumidityLowAdv',
      advisoryFallback: 'Dry canopy conditions favorable for general crop health and field spraying.',
    })
  }

  // 4. Strong Wind Assessment
  const wind = maxWindSpeedNext24h
  if (wind >= 40) {
    risks.push({
      id: 'wind',
      category: 'wind',
      severity: 'high',
      titleKey: 'riskWindHighTitle',
      titleFallback: 'Strong Wind Warning',
      metricValue: `${wind.toFixed(1)} km/h`,
      thresholdNote: 'Wind speed >= 40 km/h',
      descriptionKey: 'riskWindHighDesc',
      descriptionFallback: 'High wind gusts may cause lodging in tall crops (maize, banana, sugarcane) or branch snapping.',
      advisoryKey: 'riskWindHighAdv',
      advisoryFallback: 'Provide staking or propping for vulnerable crops. Secure nursery nets and avoid high spraying.',
    })
  } else if (wind >= 25) {
    risks.push({
      id: 'wind',
      category: 'wind',
      severity: 'moderate',
      titleKey: 'riskWindModerateTitle',
      titleFallback: 'Breezy Wind Conditions',
      metricValue: `${wind.toFixed(1)} km/h`,
      thresholdNote: 'Wind speed 25 - 40 km/h',
      descriptionKey: 'riskWindModerateDesc',
      descriptionFallback: 'Moderate breeze observed. Chemical spray drift risk during field application.',
      advisoryKey: 'riskWindModerateAdv',
      advisoryFallback: 'Postpone herbicide and pesticide spraying until wind calms to prevent chemical drift.',
    })
  } else {
    risks.push({
      id: 'wind',
      category: 'wind',
      severity: 'low',
      titleKey: 'riskWindLowTitle',
      titleFallback: 'Calm Wind Conditions',
      metricValue: `${wind.toFixed(1)} km/h`,
      thresholdNote: 'Wind speed < 25 km/h',
      descriptionKey: 'riskWindLowDesc',
      descriptionFallback: 'Gentle wind conditions. Minimal physical stress on standing vegetation.',
      advisoryKey: 'riskWindLowAdv',
      advisoryFallback: 'Ideal weather window for scheduled foliar sprays and farm machinery operations.',
    })
  }

  // Determine overall severity
  let overallSeverity: RiskSeverity = 'low'
  if (risks.some((r) => r.severity === 'high')) {
    overallSeverity = 'high'
  } else if (risks.some((r) => r.severity === 'moderate')) {
    overallSeverity = 'moderate'
  }

  let summaryKey = 'riskSummaryLow'
  let summaryFallback = 'Overall weather conditions are favorable for regular farming activities.'
  if (overallSeverity === 'high') {
    summaryKey = 'riskSummaryHigh'
    summaryFallback = 'Active weather alerts detected. Review recommended advisories for crop protection.'
  } else if (overallSeverity === 'moderate') {
    summaryKey = 'riskSummaryModerate'
    summaryFallback = 'Moderate weather conditions noted. Monitor field conditions and plan accordingly.'
  }

  return {
    overallSeverity,
    evaluatedAt: new Date().toISOString(),
    risks,
    summaryKey,
    summaryFallback,
  }
}
