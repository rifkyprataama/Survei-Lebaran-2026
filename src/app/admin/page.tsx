"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { 
  Users, 
  TrainFront, 
  ThumbsUp, 
  MapPin, 
  Trash2,
  RefreshCcw,
  Home
} from "lucide-react"
import Link from "next/link"

// Definisikan tipe data agar tidak merah (Type Error)
type Responden = {
  id: string
  createdAt: string
  usia: string
  pekerjaan: string
  domisiliProv: string
  tujuanProvinsi: string
  modaTransportasi: string
  persepsi2025: string
}

export default function AdminDashboard() {
  const [data, setData] = useState<Responden[]>([])
  const [loading, setLoading] = useState(true)

  // FUNGSI LOAD DATA DARI SERVER API
  const loadData = async () => {
    setLoading(true)
    try {
      // Panggil API yang sudah kita buat
      const res = await fetch('/api/survei', { cache: 'no-store' })
      const json = await res.json()
      
      if (json.success) {
        setData(json.data) // Simpan data ke state
      } else {
        console.error("API Error:", json.error)
      }
    } catch (error) {
      console.error("Gagal ambil data:", error)
      alert("Gagal memuat data dari server")
    } finally {
      setLoading(false)
    }
  }

  // Load saat halaman pertama kali dibuka
  useEffect(() => {
    loadData()
  }, [])

  // Fungsi Reset (Opsional - Hanya Alert untuk keamanan)
  const handleReset = () => {
     alert("Fitur hapus database dinonaktifkan untuk keamanan demo ini.")
  }

  // Hitung Statistik Sederhana
  const totalResponden = data.length
  
  // Cari Moda Terbanyak
  const modaCounts = data.reduce((acc: any, curr) => {
    const moda = curr.modaTransportasi || "Tidak Mudik"
    acc[moda] = (acc[moda] || 0) + 1
    return acc
  }, {})
  const modaPalingBanyak = Object.keys(modaCounts).sort((a, b) => modaCounts[b] - modaCounts[a])[0] || "-"

  // Cari Tujuan Terbanyak
  const tujuanCounts = data.reduce((acc: any, curr) => {
    const tujuan = curr.tujuanProvinsi || "-"
    acc[tujuan] = (acc[tujuan] || 0) + 1
    return acc
  }, {})
  const tujuanFavorit = Object.keys(tujuanCounts).sort((a, b) => tujuanCounts[b] - tujuanCounts[a])[0] || "-"

  return (
    <div className="min-h-screen bg-slate-50 font-sans pb-20">
      
      {/* NAVBAR */}
      <nav className="bg-slate-900 text-white p-4 sticky top-0 z-50 shadow-md">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-lg">
                <Users className="w-5 h-5 text-white" />
            </div>
            <div>
                <h1 className="font-bold text-lg leading-none">Admin Monitor</h1>
                <p className="text-xs text-slate-400">Real-time Database (SQLite)</p>
            </div>
          </div>
          <div className="flex gap-3">
             <Button onClick={loadData} variant="secondary" size="sm" className="gap-2">
                <RefreshCcw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} /> Refresh
             </Button>
             <Link href="/">
                <Button variant="outline" size="sm" className="gap-2 bg-transparent text-white border-slate-600 hover:bg-slate-800">
                    <Home className="w-4 h-4" /> Buka Survei
                </Button>
             </Link>
          </div>
        </div>
      </nav>

      {/* CONTENT */}
      <main className="max-w-7xl mx-auto p-6 space-y-8">
        
        {/* 1. STATISTIK CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="border-l-4 border-blue-600 shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-slate-500">Total Responden</CardTitle>
                    <Users className="h-4 w-4 text-blue-600" />
                </CardHeader>
                <CardContent>
                    <div className="text-3xl font-bold text-slate-900">{totalResponden}</div>
                    <p className="text-xs text-slate-500">Orang mengisi survei</p>
                </CardContent>
            </Card>

            <Card className="border-l-4 border-green-600 shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-slate-500">Moda Terpopuler</CardTitle>
                    <TrainFront className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                    <div className="text-xl font-bold text-slate-900 line-clamp-1">{modaPalingBanyak}</div>
                    <p className="text-xs text-slate-500">Pilihan terbanyak</p>
                </CardContent>
            </Card>

            <Card className="border-l-4 border-red-500 shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-slate-500">Tujuan Favorit</CardTitle>
                    <MapPin className="h-4 w-4 text-red-500" />
                </CardHeader>
                <CardContent>
                    <div className="text-xl font-bold text-slate-900 line-clamp-1">{tujuanFavorit}</div>
                    <p className="text-xs text-slate-500">Dominasi Pemudik</p>
                </CardContent>
            </Card>
        </div>

        {/* 2. TABEL DATA REAL */}
        <Card className="shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between border-b bg-slate-50/50">
                <div>
                    <CardTitle>Data Masuk ({totalResponden})</CardTitle>
                    <p className="text-sm text-slate-500">Data diambil langsung dari Database.</p>
                </div>
                <Button onClick={handleReset} variant="destructive" size="sm" className="gap-2">
                    <Trash2 className="w-4 h-4" /> Reset
                </Button>
            </CardHeader>
            <CardContent className="p-0">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs text-slate-700 uppercase bg-slate-100">
                            <tr>
                                <th className="px-6 py-3">ID</th>
                                <th className="px-6 py-3">Profil</th>
                                <th className="px-6 py-3">Rute</th>
                                <th className="px-6 py-3">Moda</th>
                                <th className="px-6 py-3">Feedback 2025</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-10 text-center text-slate-500">
                                        Sedang memuat data...
                                    </td>
                                </tr>
                            ) : data.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-10 text-center text-slate-400 italic">
                                        Belum ada data masuk. Silakan isi survei di halaman utama.
                                    </td>
                                </tr>
                            ) : (
                                data.map((row) => (
                                    <tr key={row.id} className="bg-white border-b hover:bg-slate-50">
                                        <td className="px-6 py-4">
                                            <div className="font-bold text-blue-700 text-xs">#{row.id.slice(-5)}</div>
                                            <div className="text-xs text-slate-400">{new Date(row.createdAt).toLocaleDateString()}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="font-medium">{row.pekerjaan}</div>
                                            <div className="text-xs text-slate-500">{row.usia}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col gap-1">
                                                <span className="text-xs bg-slate-100 px-2 py-0.5 rounded w-fit">Asal: {row.domisiliProv}</span>
                                                <span className="text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded w-fit">Tujuan: {row.tujuanProvinsi || "-"}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            {row.modaTransportasi ? (
                                                <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                                                    {row.modaTransportasi}
                                                </span>
                                            ) : <span className="text-slate-400">-</span>}
                                        </td>
                                        <td className="px-6 py-4">
                                            {row.persepsi2025 || "-"}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </CardContent>
        </Card>

      </main>
    </div>
  )
}