import { useState } from 'react'
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { MapPin, Navigation, CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react'
import { useLanguage } from '../../hooks/useLanguage'

// Fix standard Leaflet default icon path in bundler
const DefaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
})
L.Marker.prototype.options.icon = DefaultIcon

interface FarmLocationPickerProps {
  latitude: number | null
  longitude: number | null
  onChange: (lat: number, lng: number) => void
}

function MapClickHandler({ onSelect }: { onSelect: (lat: number, lng: number) => void }) {
  useMapEvents({
    click(e) {
      onSelect(Number(e.latlng.lat.toFixed(5)), Number(e.latlng.lng.toFixed(5)))
    },
  })
  return null
}

export function FarmLocationPicker({ latitude, longitude, onChange }: FarmLocationPickerProps) {
  const { t } = useLanguage()
  const [gpsLoading, setGpsLoading] = useState(false)
  const [gpsError, setGpsError] = useState<string | null>(null)
  const [confirmedCoords, setConfirmedCoords] = useState<{ lat: number; lng: number } | null>(null)

  const defaultCenter: [number, number] = [
    latitude || 16.5062,
    longitude || 80.648,
  ]

  const isConfirmed =
    confirmedCoords !== null &&
    confirmedCoords.lat === latitude &&
    confirmedCoords.lng === longitude

  const handleUseGps = () => {
    setGpsError(null)
    if (!navigator.geolocation) {
      setGpsError(t.weather.location.gpsErrorUnsupported)
      return
    }

    setGpsLoading(true)
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = Number(position.coords.latitude.toFixed(5))
        const lng = Number(position.coords.longitude.toFixed(5))
        onChange(lat, lng)
        setGpsLoading(false)
        setConfirmedCoords({ lat, lng })
      },
      (err) => {
        setGpsLoading(false)
        if (err.code === err.PERMISSION_DENIED) {
          setGpsError(t.weather.location.gpsErrorPermission)
        } else if (err.code === err.POSITION_UNAVAILABLE) {
          setGpsError(t.weather.location.gpsErrorUnavailable)
        } else if (err.code === err.TIMEOUT) {
          setGpsError(t.weather.location.gpsErrorTimeout)
        } else {
          setGpsError(t.weather.location.gpsErrorUnavailable)
        }
      },
      { timeout: 10000, enableHighAccuracy: true }
    )
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <MapPin size={16} className="text-[#176B45]" />
          <span className="text-xs font-bold text-gray-700">{t.farm.locationCoordinates}</span>
        </div>

        <button
          type="button"
          disabled={gpsLoading}
          onClick={handleUseGps}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#176B45]/30 bg-emerald-50 text-xs font-semibold text-[#176B45] hover:bg-emerald-100 transition disabled:opacity-50"
        >
          {gpsLoading ? (
            <>
              <RefreshCw size={13} className="animate-spin" />
              <span>{t.farm.gpsDetecting}</span>
            </>
          ) : (
            <>
              <Navigation size={13} />
              <span>{t.farm.detectGps}</span>
            </>
          )}
        </button>
      </div>

      {gpsError && (
        <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-800 flex items-start gap-2">
          <AlertCircle size={15} className="mt-0.5 shrink-0 text-amber-600" />
          <span>{gpsError}</span>
        </div>
      )}

      {/* Interactive Map */}
      <div className="relative rounded-2xl overflow-hidden border border-gray-200 shadow-inner h-64 z-10">
        <MapContainer
          center={defaultCenter}
          zoom={latitude && longitude ? 13 : 9}
          scrollWheelZoom={false}
          className="h-full w-full"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <MapClickHandler onSelect={onChange} />
          {latitude && longitude && (
            <Marker position={[latitude, longitude]} />
          )}
        </MapContainer>
      </div>

      {/* Coordinates readout and confirmation */}
      <div className="flex items-center justify-between p-3 rounded-xl bg-gray-50 border border-gray-200 text-xs">
        <div>
          {latitude && longitude ? (
            <span className="font-medium text-gray-800">
              {t.farm.latitude}: <strong className="text-[#176B45]">{latitude}</strong>, {t.farm.longitude}:{' '}
              <strong className="text-[#176B45]">{longitude}</strong>
            </span>
          ) : (
            <span className="text-gray-500">
              {t.farm.selectOnMap}
            </span>
          )}
        </div>

        {latitude && longitude && (
          <button
            type="button"
            onClick={() => setConfirmedCoords({ lat: latitude, lng: longitude })}
            className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#176B45] hover:underline"
          >
            {isConfirmed ? (
              <>
                <CheckCircle2 size={13} className="text-[#75B843]" />
                <span>{t.weather.location.confirmedButton}</span>
              </>
            ) : (
              <span>{t.weather.location.confirmButton}</span>
            )}
          </button>
        )}
      </div>
    </div>
  )
}
