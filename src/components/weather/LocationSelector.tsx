import { useState } from 'react'
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet'
import L from 'leaflet'
import { MapPin, Navigation, Check, AlertCircle, RefreshCw, Crosshair, ChevronDown, ChevronUp } from 'lucide-react'
import type { FarmLocation } from '../../types/weather'
import type { TranslationDictionary } from '../../locales/translations'

const DEFAULT_CENTER: [number, number] = [16.5062, 80.648] // Andhra Pradesh / Telangana agricultural heartland

const farmMarkerIcon = L.divIcon({
  className: 'krishi-farm-marker',
  html: `
    <div style="
      position: relative;
      width: 36px;
      height: 36px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #176B45;
      border: 2px solid #ffffff;
      border-radius: 50% 50% 50% 0;
      transform: rotate(-45deg);
      box-shadow: 0 4px 12px rgba(23,107,69,0.45);
    ">
      <div style="transform: rotate(45deg); color: #ffffff; display: flex; align-items: center; justify-content: center;">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M7 20h10"/>
          <path d="M10 20c0-4 1.5-6 2-9"/>
          <path d="M12 11c0-4 4-7 8-7 0 4-3 8-7 8"/>
          <path d="M12 11c0-3-2-5-6-5 0 3 2 6 5 6"/>
        </svg>
      </div>
    </div>
  `,
  iconSize: [36, 36],
  iconAnchor: [18, 36],
  popupAnchor: [0, -36],
})

function MapEventsHandler({ onSelect }: { onSelect: (lat: number, lng: number) => void }) {
  const map = useMapEvents({
    click(e) {
      onSelect(e.latlng.lat, e.latlng.lng)
      map.panTo(e.latlng)
    },
  })
  return null
}

function MapRecenter({ center }: { center: [number, number] }) {
  const map = useMap()
  useMapEvents({})
  map.setView(center, map.getZoom())
  return null
}

interface LocationSelectorProps {
  currentLocation: FarmLocation | null
  onLocationConfirmed: (location: FarmLocation) => void
  isWeatherLoading: boolean
  t: TranslationDictionary
}

export function LocationSelector({
  currentLocation,
  onLocationConfirmed,
  isWeatherLoading,
  t,
}: LocationSelectorProps) {
  const [selectedCoords, setSelectedCoords] = useState<[number, number]>(() => {
    if (currentLocation) {
      return [currentLocation.latitude, currentLocation.longitude]
    }
    return DEFAULT_CENTER
  })

  const [isGpsLocating, setIsGpsLocating] = useState(false)
  const [gpsError, setGpsError] = useState<string | null>(null)
  const [mapOpen, setMapOpen] = useState(true)
  const [confirmedSuccess, setConfirmedSuccess] = useState(false)

  const handleGpsRequest = () => {
    setGpsError(null)

    if (!('geolocation' in navigator)) {
      setGpsError(t.weather.location.gpsErrorUnsupported)
      return
    }

    setIsGpsLocating(true)

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setIsGpsLocating(false)
        const lat = position.coords.latitude
        const lng = position.coords.longitude
        setSelectedCoords([lat, lng])
        setConfirmedSuccess(true)
        setTimeout(() => setConfirmedSuccess(false), 3000)

        onLocationConfirmed({
          latitude: lat,
          longitude: lng,
          name: t.weather.location.gpsLocatedName,
          source: 'gps',
        })
      },
      (error) => {
        setIsGpsLocating(false)
        switch (error.code) {
          case error.PERMISSION_DENIED:
            setGpsError(t.weather.location.gpsErrorPermission)
            break
          case error.POSITION_UNAVAILABLE:
            setGpsError(t.weather.location.gpsErrorUnavailable)
            break
          case error.TIMEOUT:
            setGpsError(t.weather.location.gpsErrorTimeout)
            break
          default:
            setGpsError(t.weather.location.gpsErrorUnavailable)
            break
        }
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    )
  }

  const handleMapSelect = (lat: number, lng: number) => {
    setSelectedCoords([lat, lng])
    setGpsError(null)
  }

  const handleConfirmLocation = () => {
    setGpsError(null)
    setConfirmedSuccess(true)
    setTimeout(() => setConfirmedSuccess(false), 3000)

    onLocationConfirmed({
      latitude: selectedCoords[0],
      longitude: selectedCoords[1],
      name: t.weather.location.mapSelectedName,
      source: 'map',
    })
  }

  return (
    <div className="rounded-3xl border border-[#E5EAE2] bg-white p-6 shadow-sm md:p-8">
      {/* Header and Toggle */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-[#EAF3E5] px-3 py-1 text-xs font-bold text-forest">
            <MapPin size={14} />
            {t.weather.location.badge}
          </div>
          <h3 className="mt-2 text-xl font-bold text-[#24332A] sm:text-2xl">
            {t.weather.location.title}
          </h3>
          <p className="mt-1 text-sm text-gray-600">
            {t.weather.location.subtitle}
          </p>
        </div>

        {/* Action Buttons: GPS & Toggle Map */}
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={handleGpsRequest}
            disabled={isGpsLocating || isWeatherLoading}
            className="inline-flex items-center gap-2 rounded-xl bg-forest px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-leaf disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isGpsLocating ? (
              <>
                <RefreshCw size={16} className="animate-spin" />
                {t.weather.location.gpsLocating}
              </>
            ) : (
              <>
                <Navigation size={16} />
                {t.weather.location.useGpsButton}
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => setMapOpen(!mapOpen)}
            className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-forest shadow-sm transition hover:bg-[#EAF3E5]"
          >
            <Crosshair size={16} />
            {mapOpen ? t.weather.location.hideMapButton : t.weather.location.showMapButton}
            {mapOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
        </div>
      </div>

      {/* GPS Error Banner */}
      {gpsError && (
        <div className="mt-4 flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
          <AlertCircle size={20} className="mt-0.5 shrink-0 text-amber-600" />
          <div className="flex-1">
            <p className="font-semibold">{t.weather.location.gpsNoticeTitle}</p>
            <p className="mt-0.5 text-xs text-amber-800">{gpsError}</p>
          </div>
        </div>
      )}

      {/* Map and Coordinates Section */}
      {mapOpen && (
        <div className="mt-6">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-2 text-xs text-gray-500">
            <span>{t.weather.location.mapInstruction}</span>
            <span className="font-mono font-medium text-forest">
              {t.weather.location.coordinatesLabel}: {selectedCoords[0].toFixed(4)}° N, {selectedCoords[1].toFixed(4)}° E
            </span>
          </div>

          {/* Leaflet Map Box with isolated stacking context */}
          <div className="relative isolate z-10 h-72 w-full overflow-hidden rounded-2xl border border-[#E5EAE2] shadow-inner sm:h-80">
            <MapContainer
              center={selectedCoords}
              zoom={10}
              scrollWheelZoom={false}
              className="h-full w-full"
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <MapEventsHandler onSelect={handleMapSelect} />
              <MapRecenter center={selectedCoords} />
              <Marker position={selectedCoords} icon={farmMarkerIcon} />
            </MapContainer>
          </div>

          {/* Confirm Button & Location Status */}
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs text-gray-600">
              <span className="inline-block h-2.5 w-2.5 rounded-full bg-forest" />
              <span>
                {currentLocation
                  ? `${t.weather.location.activeLocationLabel}: ${currentLocation.latitude.toFixed(4)}°, ${currentLocation.longitude.toFixed(4)}° (${currentLocation.source.toUpperCase()})`
                  : t.weather.location.noLocationYet}
              </span>
            </div>

            <button
              type="button"
              onClick={handleConfirmLocation}
              disabled={isWeatherLoading}
              className="inline-flex items-center gap-2 rounded-xl bg-forest px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-leaf disabled:opacity-60"
            >
              {confirmedSuccess ? (
                <>
                  <Check size={16} />
                  {t.weather.location.confirmedButton}
                </>
              ) : (
                <>
                  <MapPin size={16} />
                  {t.weather.location.confirmButton}
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
