import {
  ShieldCheck,
  AlertTriangle,
  AlertOctagon,
  CloudRain,
  ThermometerSun,
  Droplets,
  Wind,
  Info,
} from 'lucide-react'
import type { CropWeatherRiskAssessment, CropWeatherRiskItem, RiskSeverity } from '../../types/weather'
import type { TranslationDictionary } from '../../locales/translations'

interface WeatherRiskPanelProps {
  assessment: CropWeatherRiskAssessment
  t: TranslationDictionary
}

export function WeatherRiskPanel({ assessment, t }: WeatherRiskPanelProps) {
  const getSeverityBadge = (severity: RiskSeverity) => {
    switch (severity) {
      case 'high':
        return {
          icon: AlertOctagon,
          label: t.weather.risk.severityHigh,
          badgeClass: 'bg-red-100 text-red-800 border-red-200',
          cardBorder: 'border-red-200 hover:border-red-400',
          dotClass: 'bg-red-600',
        }
      case 'moderate':
        return {
          icon: AlertTriangle,
          label: t.weather.risk.severityModerate,
          badgeClass: 'bg-amber-100 text-amber-800 border-amber-200',
          cardBorder: 'border-amber-200 hover:border-amber-400',
          dotClass: 'bg-amber-600',
        }
      case 'low':
      default:
        return {
          icon: ShieldCheck,
          label: t.weather.risk.severityLow,
          badgeClass: 'bg-[#EAF3E5] text-forest border-[#DCE9D6]',
          cardBorder: 'border-[#E5EAE2] hover:border-forest/40',
          dotClass: 'bg-forest',
        }
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'rainfall':
        return <CloudRain className="text-blue-600" size={24} />
      case 'temperature':
        return <ThermometerSun className="text-orange-500" size={24} />
      case 'humidity':
        return <Droplets className="text-teal-600" size={24} />
      case 'wind':
        return <Wind className="text-purple-600" size={24} />
      default:
        return <AlertTriangle className="text-gray-600" size={24} />
    }
  }

  const getRiskTitle = (risk: CropWeatherRiskItem) => {
    const riskDict = t.weather.risk as Record<string, string>
    return riskDict[risk.titleKey] || risk.titleFallback
  }

  const getRiskDescription = (risk: CropWeatherRiskItem) => {
    const riskDict = t.weather.risk as Record<string, string>
    return riskDict[risk.descriptionKey] || risk.descriptionFallback
  }

  const getRiskAdvisory = (risk: CropWeatherRiskItem) => {
    const riskDict = t.weather.risk as Record<string, string>
    return riskDict[risk.advisoryKey] || risk.advisoryFallback
  }

  const overallBadge = getSeverityBadge(assessment.overallSeverity)
  const OverallIcon = overallBadge.icon

  return (
    <div className="rounded-3xl border border-[#E5EAE2] bg-white p-6 shadow-sm md:p-8">
      {/* Header and Overall Severity Status */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-[#EAF3E5] px-3 py-1 text-xs font-bold text-forest">
            <ShieldCheck size={14} />
            {t.weather.risk.badge}
          </div>
          <h3 className="mt-2 text-xl font-bold text-[#24332A] sm:text-2xl">
            {t.weather.risk.title}
          </h3>
          <p className="mt-1 text-sm text-gray-600">
            {t.weather.risk.subtitle}
          </p>
        </div>

        {/* Overall Status Badge */}
        <div
          className={`inline-flex items-center gap-2.5 rounded-2xl border px-4 py-2.5 shadow-sm ${overallBadge.badgeClass}`}
        >
          <OverallIcon size={20} className="shrink-0" />
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider opacity-80">
              {t.weather.risk.overallStatusLabel}
            </div>
            <div className="text-sm font-extrabold">{overallBadge.label}</div>
          </div>
        </div>
      </div>

      {/* Summary Alert Notice */}
      <div className="mt-6 rounded-2xl border border-[#E5EAE2] bg-[#F6F8F1] p-4 text-sm text-[#24332A]">
        <div className="flex items-start gap-3">
          <Info size={18} className="mt-0.5 shrink-0 text-forest" />
          <p className="leading-relaxed">
            {(t.weather.risk as Record<string, string>)[assessment.summaryKey] || assessment.summaryFallback}
          </p>
        </div>
      </div>

      {/* 4 Risk Cards Grid */}
      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        {assessment.risks.map((risk) => {
          const badge = getSeverityBadge(risk.severity)
          return (
            <div
              key={risk.id}
              className={`flex flex-col justify-between rounded-2xl border bg-white p-5 shadow-sm transition duration-200 ${badge.cardBorder}`}
            >
              <div>
                {/* Card Top: Icon & Severity Badge */}
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#F6F8F1]">
                      {getCategoryIcon(risk.category)}
                    </div>
                    <div>
                      <h4 className="font-bold text-[#24332A]">{getRiskTitle(risk)}</h4>
                      <p className="text-xs font-mono text-gray-500">
                        {t.weather.risk.metricLabel}: <strong className="text-forest">{risk.metricValue}</strong>
                      </p>
                    </div>
                  </div>

                  <span
                    className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-bold ${badge.badgeClass}`}
                  >
                    <span className={`h-1.5 w-1.5 rounded-full ${badge.dotClass}`} />
                    {badge.label}
                  </span>
                </div>

                {/* Explanation */}
                <p className="mt-3 text-xs leading-relaxed text-gray-600">
                  {getRiskDescription(risk)}
                </p>
              </div>

              {/* Threshold & Practical Agricultural Advisory */}
              <div className="mt-4 border-t border-[#E5EAE2] pt-3">
                <div className="mb-1 text-[11px] font-semibold text-gray-500">
                  {t.weather.risk.thresholdLabel}: <span className="font-mono">{risk.thresholdNote}</span>
                </div>
                <div className="rounded-xl bg-[#EAF3E5]/60 p-2.5 text-xs text-forest">
                  <strong className="block font-semibold">{t.weather.risk.advisoryHeader}:</strong>
                  <span className="mt-0.5 block leading-relaxed">{getRiskAdvisory(risk)}</span>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Preliminary Indicator Disclaimer (Requirement 4) */}
      <div className="mt-6 border-t border-[#E5EAE2] pt-4 text-center text-xs leading-relaxed text-gray-500">
        <p>
          {t.weather.risk.disclaimerText}
        </p>
      </div>
    </div>
  )
}
