"use client"

import { useEffect, useState } from "react"
import dynamic from "next/dynamic" 
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Users, TrendingUp, RefreshCcw, ArrowRight, Bus, Map as MapIcon, Calendar, TrendingDown } from "lucide-react"
import Link from "next/link"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, Legend } from 'recharts';
import AiInsight from "@/components/admin/AiInsight"

// Dynamic Import Map agar tidak error server-side
const RespondentMap = dynamic(() => import("@/components/admin/RespondentMap"), { 
  ssr: false, 
  loading: () => <div className="h-[400px] w-full bg-slate-100 animate-pulse rounded-xl flex items-center justify-center text-slate-400">Loading Map...</div> 
})

const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899'];

// Tipe Data
type Responden = {
  id: string
  createdAt: string
  usia: string
  pekerjaan: string
  domisiliProv: string
  tujuanProvinsi: string
  modaTransportasi: string
  persepsi2025: string
  tanggalPergi?: string
}

export default function AdminDashboard() {
  const [data, setData] = useState<Responden[]>([])
  const [loading, setLoading] = useState(true)
  const [isClient, setIsClient] = useState(false) 

  const loadData = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/survei', { cache: 'no-store' })
      const json = await res.json()
      if (json.success) setData(json.data)
    } catch (error) { console.error(error) } 
    finally { setLoading(false) }
  }

  useEffect(() => { loadData(); setIsClient(true) }, [])

  // --- LOGIKA STATISTIK ---
  const total = data.length
  
  // 1. Hitung Pemudik
  const pemudik = data.filter(d => d.tujuanProvinsi && d.tujuanProvinsi !== "Tidak Mudik").length
  const persenPemudik = total > 0 ? ((pemudik / total) * 100).toFixed(1) : "0"
  
  // 2. Data Chart Moda
  const modaData = data.reduce((acc: any[], curr) => {
    const name = curr.modaTransportasi || "Belum Memilih"
    const existing = acc.find((x: any) => x.name === name)
    if (existing) existing.value += 1
    else acc.push({ name, value: 1 })
    return acc
  }, [])

  const modaChart = modaData.map((m: any) => ({ 
    ...m, 
    percent: total > 0 ? ((m.value / total) * 100).toFixed(1) : 0
  }))

  // 3. Logika PUNCAK ARUS
  const puncakArusData = data.reduce((acc: any, curr) => {
      if(curr.tanggalPergi) {
          acc[curr.tanggalPergi] = (acc[curr.tanggalPergi] || 0) + 1
      }
      return acc
  }, {})
  
  const tanggalPuncak = Object.keys(puncakArusData).length > 0 
      ? Object.keys(puncakArusData).reduce((a, b) => puncakArusData[a] > puncakArusData[b] ? a : b)
      : "Menunggu Data"

  // 4. PERBAIKAN: Logika Tujuan Terfavorit (Frequency Map)
  // Metode ini lebih cepat dan akurat daripada filter berulang
  const tujuanStats = data.reduce((acc: any, curr) => {
    const dest = curr.tujuanProvinsi;
    // Abaikan data kosong atau "Tidak Mudik"
    if (dest && dest !== "Tidak Mudik") {
       acc[dest] = (acc[dest] || 0) + 1;
    }
    return acc;
  }, {});

  // Urutkan dari yang terbanyak
  const sortedTujuan = Object.entries(tujuanStats).sort((a:any, b:any) => b[1] - a[1]);
  const tujuanFavorit = sortedTujuan.length > 0 ? sortedTujuan[0][0] : "Belum Ada Data";

  return (
    <div className="space-y-6">
      
      {/* HEADER DASHBOARD */}
      <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <div>
            <h2 className="text-2xl font-bold text-slate-800">Executive Dashboard</h2>
            <p className="text-slate-500 text-sm">Real-time monitoring Angkutan Lebaran 2026.</p>
        </div>
        <div className="flex gap-2">
            <Button onClick={loadData} variant="outline" size="sm" className="gap-2">
                <RefreshCcw className={`w-4 h-4 ${loading && 'animate-spin'}`} /> Refresh
            </Button>
            <Link href="/admin/respondents">
                <Button size="sm" className="bg-slate-800 hover:bg-slate-900">Kelola Data</Button>
            </Link>
        </div>
      </div>

      {/* ROW 1: KARTU STATISTIK LENGKAP */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          
          {/* TOTAL RESPONDEN */}
          <Card className="bg-gradient-to-br from-blue-600 to-blue-700 text-white border-none shadow-md">
              <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                      <div>
                          <p className="text-blue-100 text-sm font-medium">Total Responden</p>
                          <h3 className="text-3xl font-bold mt-1">{total}</h3>
                      </div>
                      <div className="bg-white/20 p-2 rounded-lg"><Users className="w-5 h-5 text-white" /></div>
                  </div>
                  <div className="mt-4 flex items-center text-xs text-blue-100">
                      <TrendingUp className="w-3 h-3 mr-1" /> Data Masuk Real-time
                  </div>
              </CardContent>
          </Card>

          {/* POTENSI PEMUDIK */}
          <Card className="bg-white border-l-4 border-l-orange-500 shadow-sm">
              <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                      <div>
                          <p className="text-slate-500 text-sm font-medium">Potensi Pemudik</p>
                          <h3 className="text-3xl font-bold mt-1 text-slate-800">{persenPemudik}%</h3>
                      </div>
                      <div className="bg-orange-100 p-2 rounded-lg"><Bus className="w-5 h-5 text-orange-600" /></div>
                  </div>
                  <p className="mt-4 text-xs text-slate-500">
                      {pemudik} orang berencana mudik tahun ini.
                  </p>
              </CardContent>
          </Card>

           {/* PUNCAK ARUS */}
           <Card className="bg-white border-l-4 border-l-green-500 shadow-sm">
              <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                      <div>
                          <p className="text-slate-500 text-sm font-medium">Puncak Arus (Est)</p>
                          <h3 className="text-xl font-bold mt-1 text-slate-800">{tanggalPuncak}</h3>
                      </div>
                      <div className="bg-green-100 p-2 rounded-lg"><Calendar className="w-5 h-5 text-green-600" /></div>
                  </div>
                  <p className="mt-4 text-xs text-slate-500">Berdasarkan data {total} responden.</p>
              </CardContent>
          </Card>

           {/* TUJUAN TERFAVORIT */}
           <Card className="bg-white border-l-4 border-l-purple-500 shadow-sm">
              <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                      <div>
                          <p className="text-slate-500 text-sm font-medium">Tujuan Terfavorit</p>
                          <h3 className="text-xl font-bold mt-1 text-slate-800 truncate max-w-[120px]" title={String(tujuanFavorit)}>
                            {tujuanFavorit}
                          </h3>
                      </div>
                      <div className="bg-purple-100 p-2 rounded-lg"><MapIcon className="w-5 h-5 text-purple-600" /></div>
                  </div>
                  <p className="mt-4 text-xs text-slate-500">Dominasi daerah tujuan.</p>
              </CardContent>
          </Card>
      </div>

      {/* ROW 2: CHART & AI INSIGHT */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* CHART DONUT */}
          <Card className="md:col-span-5 shadow-sm border border-slate-200">
              <CardHeader>
                  <CardTitle className="text-base text-slate-800">Proporsi Moda Transportasi</CardTitle>
              </CardHeader>
              <CardContent className="h-[320px]">
                  {isClient && (
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie 
                                data={modaChart} 
                                cx="50%" cy="50%" 
                                innerRadius={60} 
                                outerRadius={80} 
                                paddingAngle={2} 
                                dataKey="value"
                                label={({ percent }) => percent ? `${(percent * 100).toFixed(0)}%` : ""}
                            >
                                {modaChart.map((entry: any, index: number) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <RechartsTooltip 
                                formatter={(value:any, name:any, props:any) => {
                                    const percent = props.payload?.percent || 0;
                                    return [`${value} Orang (${percent}%)`, name]
                                }} 
                            />
                            <Legend verticalAlign="bottom" height={36} iconType="circle" />
                        </PieChart>
                    </ResponsiveContainer>
                  )}
              </CardContent>
          </Card>

          {/* AI INSIGHT */}
          <div className="md:col-span-7 h-full">
              <AiInsight data={data} />
          </div>
      </div>

      {/* ROW 3: GIS MAP */}
      <div className="space-y-2">
           <div className="flex justify-between items-center px-1">
                <h3 className="font-bold text-slate-700 flex items-center gap-2">
                    <MapIcon className="w-4 h-4 text-blue-600" /> Peta Pola Pergerakan (O-D Survey)
                </h3>
                <span className="text-[10px] text-slate-400 bg-white px-2 py-1 rounded border">Flow Map Visualization</span>
            </div>
          <RespondentMap data={data} />
      </div>

      {/* TOMBOL LINK KELOLA DATA */}
      <div className="flex justify-center pt-6 pb-10">
        <Link href="/admin/respondents">
            <Button variant="outline" className="gap-2 text-slate-600 hover:text-blue-700 hover:border-blue-300 transition-all">
                Lihat Detail & Kelola Data Responden <ArrowRight className="w-4 h-4" />
            </Button>
        </Link>
      </div>

    </div>
  )
}