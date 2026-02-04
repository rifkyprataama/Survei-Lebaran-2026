"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bot, Sparkles, AlertTriangle, Lightbulb } from "lucide-react"

export default function AiInsight({ data }: { data: any[] }) {
  const total = data.length
  if (total === 0) return <Card className="bg-slate-50"><CardContent className="p-6 text-center text-slate-400">Menunggu data...</CardContent></Card>

  // Helper Hitung Frekuensi
  const countFreq = (key: string) => {
    const counts: Record<string, number> = {}
    data.forEach(d => { const v = d[key] || "N/A"; counts[v] = (counts[v] || 0) + 1 })
    return Object.entries(counts).sort((a,b) => b[1] - a[1])
  }

  const topModa = countFreq("modaTransportasi")[0]
  const topTujuan = countFreq("tujuanProvinsi").filter(x => x[0] !== "Tidak Mudik")[0]
  const topAsal = countFreq("domisiliProv")[0]

  return (
    <Card className="bg-gradient-to-br from-indigo-900 to-slate-900 text-white border-none shadow-lg h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-bold flex items-center gap-2 text-indigo-100">
          <Bot className="w-5 h-5 text-indigo-400" />
          AI Strategic Insight
          <span className="bg-indigo-500/20 text-indigo-200 text-[10px] px-2 py-0.5 rounded-full flex items-center gap-1 border border-indigo-500/30">
            <Sparkles className="w-3 h-3" /> Live
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-5 text-sm">
        
        {/* Highlight Utama */}
        <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/5 p-3 rounded-lg border border-white/10">
                <p className="text-xs text-indigo-300 mb-1">Moda Dominan</p>
                <p className="font-bold text-lg">{topModa ? topModa[0] : "-"}</p>
                <p className="text-xs text-slate-400">{topModa ? Math.round((topModa[1]/total)*100) : 0}% Pengguna</p>
            </div>
            <div className="bg-white/5 p-3 rounded-lg border border-white/10">
                <p className="text-xs text-indigo-300 mb-1">Hotspot Tujuan</p>
                <p className="font-bold text-lg">{topTujuan ? topTujuan[0] : "-"}</p>
                <p className="text-xs text-slate-400">Tujuan Utama</p>
            </div>
        </div>

        {/* Analisis Naratif */}
        <div className="space-y-3">
            <div className="flex gap-3 items-start">
                <AlertTriangle className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                <p className="text-slate-300 leading-relaxed text-xs">
                    Terdeteksi pergerakan masif dari <strong>{topAsal ? topAsal[0] : "-"}</strong> menuju <strong>{topTujuan ? topTujuan[0] : "-"}</strong>. 
                    Potensi kemacetan tinggi di jalur penghubung kedua provinsi ini pada H-3.
                </p>
            </div>
             <div className="flex gap-3 items-start">
                <Lightbulb className="w-4 h-4 text-yellow-400 shrink-0 mt-0.5" />
                <p className="text-slate-300 leading-relaxed text-xs">
                    Rekomendasi Kebijakan: Lakukan <em>Ramp Check</em> intensif pada armada {topModa ? topModa[0] : "-"} 
                    dan siapkan skema <em>Contraflow</em> di perbatasan {topTujuan ? topTujuan[0] : "-"}.
                </p>
            </div>
        </div>

      </CardContent>
    </Card>
  )
}