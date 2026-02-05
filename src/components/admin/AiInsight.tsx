"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bot, Sparkles, AlertTriangle, Lightbulb } from "lucide-react"

export default function AiInsight({ data }: { data: any[] }) {
  const total = data.length
  
  // 1. STATE KOSONG: Tampilan jika belum ada responden sama sekali
  if (total === 0) return (
    <Card className="bg-slate-900 text-white h-full border-none shadow-md">
        <CardContent className="p-6 flex flex-col items-center justify-center h-full text-center space-y-3 opacity-60">
            <Bot className="w-10 h-10 mb-2 text-indigo-400" />
            <div>
              <p className="text-base font-semibold">Menunggu Data Survei</p>
              <p className="text-xs text-slate-400">AI akan menganalisis setelah data masuk.</p>
            </div>
        </CardContent>
    </Card>
  )

  // 2. HELPER FUNCTION (ROBUST)
  // Fungsi ini menghitung frekuensi data dengan aman (menangani null/undefined)
  const countFreq = (key: string) => {
    const counts: Record<string, number> = {}
    data.forEach(d => { 
        // Ambil value, jika null/kosong ganti "Unknown"
        // Kita juga pastikan data di-trim spasinnya
        let v = d[key] ? String(d[key]).trim() : "Unknown"; 
        
        // Filter data sampah/default yang tidak perlu dihitung
        if(v !== "Unknown" && v !== "Tidak Mudik" && v !== "") {
            counts[v] = (counts[v] || 0) + 1 
        }
    })
    // Urutkan dari terbanyak ke sedikit
    return Object.entries(counts).sort((a,b) => b[1] - a[1])
  }

  // 3. ANALISIS DATA (SAFE MODE)
  const topModaList = countFreq("modaTransportasi")
  const topTujuanList = countFreq("tujuanProvinsi")
  const topAsalList = countFreq("domisiliProv")

  // Fallback jika data valid tidak ditemukan (Default Value)
  const topModa = topModaList.length > 0 ? topModaList[0] : ["Data Belum Cukup", 0]
  const topTujuan = topTujuanList.length > 0 ? topTujuanList[0] : ["Data Belum Cukup", 0]
  const topAsal = topAsalList.length > 0 ? topAsalList[0] : ["Data Belum Cukup", 0]

  // Hitung persentase untuk visualisasi
  const modaPercent = total > 0 ? Math.round((Number(topModa[1]) / total) * 100) : 0

  return (
    <Card className="bg-gradient-to-br from-indigo-950 to-slate-900 text-white border-none shadow-lg h-full flex flex-col">
      <CardHeader className="pb-3 shrink-0">
        <CardTitle className="text-sm font-bold flex items-center gap-2 text-indigo-100">
          <Bot className="w-4 h-4 text-indigo-400" />
          AI Strategic Insight
          <span className="bg-indigo-500/20 text-indigo-200 text-[10px] px-2 py-0.5 rounded-full flex items-center gap-1 border border-indigo-500/30">
            <Sparkles className="w-3 h-3 animate-pulse" /> Live Analysis
          </span>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-4 flex-1 flex flex-col justify-center text-sm p-5 pt-0">
        
        {/* HIGHLIGHT BOXES */}
        <div className="grid grid-cols-2 gap-3">
            <div className="bg-white/5 p-3 rounded-lg border border-white/10 hover:bg-white/10 transition-colors">
                <p className="text-[10px] text-indigo-300 mb-1 uppercase tracking-wider font-semibold">Moda Dominan</p>
                <p className="font-bold text-base truncate" title={String(topModa[0])}>
                    {topModa[0]}
                </p>
                <p className="text-[10px] text-slate-400 mt-1">
                    {modaPercent}% dari {total} Responden
                </p>
            </div>
            <div className="bg-white/5 p-3 rounded-lg border border-white/10 hover:bg-white/10 transition-colors">
                <p className="text-[10px] text-indigo-300 mb-1 uppercase tracking-wider font-semibold">Hotspot Tujuan</p>
                <p className="font-bold text-base truncate" title={String(topTujuan[0])}>
                    {topTujuan[0]}
                </p>
                <p className="text-[10px] text-slate-400 mt-1">Destinasi Utama</p>
            </div>
        </div>

        {/* ANALISIS NARATIF */}
        <div className="space-y-3 bg-indigo-900/20 p-3 rounded-lg border border-indigo-500/20">
            <div className="flex gap-2 items-start">
                <AlertTriangle className="w-3.5 h-3.5 text-orange-400 shrink-0 mt-0.5" />
                <p className="text-slate-300 leading-relaxed text-xs">
                    Pola pergerakan terdeteksi tinggi dari <strong>{topAsal[0]}</strong>. 
                    Waspadai penumpukan di titik keberangkatan utama wilayah ini.
                </p>
            </div>
             <div className="flex gap-2 items-start">
                <Lightbulb className="w-3.5 h-3.5 text-yellow-400 shrink-0 mt-0.5" />
                <p className="text-slate-300 leading-relaxed text-xs">
                    Rekomendasi: Fokuskan pengawasan kelaikan jalan (Ramp Check) untuk armada <strong>{topModa[0]}</strong> tujuan <strong>{topTujuan[0]}</strong>.
                </p>
            </div>
        </div>
      </CardContent>
    </Card>
  )
}