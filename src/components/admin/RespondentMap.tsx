"use client"

import { MapContainer, TileLayer, CircleMarker, Tooltip, Polyline } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import { useMemo } from "react"

// Koordinat Provinsi (Diperlengkap)
const PROVINSI_COORDS: Record<string, [number, number]> = {
  "Aceh": [4.6951, 96.7494], "Sumatera Utara": [2.1154, 99.5451], "Sumatera Barat": [-0.7399, 100.8000], "Riau": [0.2933, 101.7068], "Jambi": [-1.6101, 103.6131], "Sumatera Selatan": [-3.3194, 104.9145], "Bengkulu": [-3.5778, 102.3464], "Lampung": [-4.5585, 105.4068], "Kepulauan Bangka Belitung": [-2.7410, 106.4406], "Kepulauan Riau": [3.9456, 108.1428],
  "DKI Jakarta": [-6.2088, 106.8456], "Jawa Barat": [-6.9175, 107.6191], "Jawa Tengah": [-7.1510, 110.1403], "DI Yogyakarta": [-7.7955, 110.3695], "Jawa Timur": [-7.5360, 112.2384], "Banten": [-6.4058, 106.0640],
  "Bali": [-8.3405, 115.0920], "Nusa Tenggara Barat": [-8.6529, 117.3616], "Nusa Tenggara Timur": [-8.6573, 121.0794],
  "Kalimantan Barat": [-0.2787, 111.4753], "Kalimantan Tengah": [-1.6814, 113.3823], "Kalimantan Selatan": [-3.0926, 115.2838], "Kalimantan Timur": [0.5386, 116.4193], "Kalimantan Utara": [3.0730, 116.0413],
  "Sulawesi Utara": [0.6246, 123.9750], "Sulawesi Tengah": [-1.4300, 121.4456], "Sulawesi Selatan": [-3.6686, 119.9740], "Sulawesi Tenggara": [-4.1449, 122.1746], "Gorontalo": [0.6999, 122.4467], "Sulawesi Barat": [-2.8441, 119.2320],
  "Maluku": [-3.2384, 130.1452], "Maluku Utara": [1.5709, 127.8087],
  "Papua": [-4.2699, 138.0803], "Papua Barat": [-1.3361, 133.1747]
}

export default function RespondentMap({ data }: { data: any[] }) {
  // 1. Data Titik (Jumlah Responden per Provinsi Asal)
  const markers = useMemo(() => {
    const counts: Record<string, number> = {}
    data.forEach(item => {
      const prov = item.domisiliProv || "Lainnya"
      counts[prov] = (counts[prov] || 0) + 1
    })
    return counts
  }, [data])

  // 2. Data Garis (Flow Mudik: Asal -> Tujuan)
  const flows = useMemo(() => {
    return data
      .filter(item => item.tujuanProvinsi && item.tujuanProvinsi !== "Tidak Mudik" && PROVINSI_COORDS[item.domisiliProv] && PROVINSI_COORDS[item.tujuanProvinsi])
      .map((item, idx) => ({
        id: idx,
        from: PROVINSI_COORDS[item.domisiliProv],
        to: PROVINSI_COORDS[item.tujuanProvinsi],
        info: `${item.domisiliProv} ➝ ${item.tujuanProvinsi}`
      }))
  }, [data])

  return (
    <div className="h-[400px] w-full rounded-xl overflow-hidden shadow-sm border border-slate-200 z-0 relative">
      <MapContainer center={[-2.5489, 118.0149]} zoom={5} scrollWheelZoom={false} className="h-full w-full">
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {/* Render Garis Arus Mudik (Curved lines simulated usually via plugins, but straight lines for now) */}
        {flows.map((flow) => (
            <Polyline 
                key={flow.id} 
                positions={[flow.from, flow.to]} 
                pathOptions={{ color: '#f59e0b', weight: 2, opacity: 0.6, dashArray: '5, 10' }} 
            >
                <Tooltip sticky>{flow.info}</Tooltip>
            </Polyline>
        ))}

        {/* Render Titik Asal */}
        {Object.entries(markers).map(([prov, count]) => {
          const coords = PROVINSI_COORDS[prov]
          if (!coords) return null
          return (
            <CircleMarker 
              key={prov} 
              center={coords} 
              radius={6 + Math.log(count) * 4} // Skala logaritmik agar tidak terlalu besar
              pathOptions={{ color: '#2563eb', fillColor: '#3b82f6', fillOpacity: 0.8 }}
            >
              <Tooltip direction="top" offset={[0, -10]} opacity={1}>
                <div className="text-center">
                    <span className="font-bold block text-sm">{prov}</span>
                    <span className="text-xs">Asal: {count} Orang</span>
                </div>
              </Tooltip>
            </CircleMarker>
          )
        })}
      </MapContainer>
    </div>
  )
}