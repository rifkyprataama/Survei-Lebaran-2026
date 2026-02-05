"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Lock, Bus, ArrowRight, AlertCircle } from "lucide-react"
import Cookies from "js-cookie"

export default function LoginPage() {
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      // PERUBAHAN DISINI: Kita tanya ke server, apakah password benar?
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      })

      const data = await res.json()

      if (res.ok && data.success) {
        // Jika Server bilang "OK", baru kita izinkan masuk
        Cookies.set("admin_session", "true", { expires: 1 })
        router.push("/admin")
      } else {
        // Jika Server bilang "Gagal"
        setError("Kode akses salah. Silakan coba lagi.")
      }
    } catch (err) {
      console.error(err)
      setError("Terjadi kesalahan koneksi ke server.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full min-h-screen lg:grid lg:grid-cols-2">
      
      {/* BAGIAN KIRI: BRANDING & VISUAL (Gelap) */}
      <div className="hidden bg-slate-900 lg:flex flex-col justify-between p-10 text-white relative overflow-hidden">
        {/* Dekorasi Background Abstrak */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
             <div className="absolute right-0 top-0 w-[500px] h-[500px] bg-blue-500 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
             <div className="absolute left-0 bottom-0 w-[300px] h-[300px] bg-indigo-600 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2"></div>
        </div>

        <div className="relative z-10 flex items-center gap-2 font-bold text-xl tracking-wider">
          <div className="bg-blue-600 p-1.5 rounded-lg">
            <Bus className="w-5 h-5 text-white" />
          </div>
          SI-MUDIK 2026
        </div>

        <div className="relative z-10 space-y-4 max-w-lg">
          <blockquote className="space-y-2">
            <p className="text-lg font-medium leading-relaxed text-slate-200">
              "Sistem terintegrasi untuk pemantauan real-time arus mudik, analisis preferensi pemudik, dan pengambilan keputusan berbasis data."
            </p>
            <footer className="text-sm text-slate-400">
              &copy; 2026 Kementerian Perhubungan RI
            </footer>
          </blockquote>
        </div>
      </div>

      {/* BAGIAN KANAN: FORM LOGIN (Terang) */}
      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="mx-auto grid w-[350px] gap-6">
          
          <div className="grid gap-2 text-center">
            <div className="mx-auto bg-slate-100 p-3 rounded-full mb-2">
                 <Lock className="w-6 h-6 text-slate-700" />
            </div>
            <h1 className="text-3xl font-bold text-slate-900">Admin Login</h1>
            <p className="text-balance text-slate-500 text-sm">
              Masukkan kode akses khusus administrator untuk masuk ke dashboard.
            </p>
          </div>

          <form onSubmit={handleLogin} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="password">Kode Akses / Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-11"
              />
            </div>

            {error && (
                <div className="flex items-center gap-2 text-red-600 text-xs bg-red-50 p-3 rounded border border-red-100">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    {error}
                </div>
            )}

            <Button type="submit" className="w-full h-11 bg-slate-900 hover:bg-slate-800 text-base" disabled={loading}>
              {loading ? "Memverifikasi..." : (
                  <span className="flex items-center gap-2">
                      Masuk Dashboard <ArrowRight className="w-4 h-4" />
                  </span>
              )}
            </Button>
          </form>

          <div className="mt-4 text-center text-xs text-slate-400">
            Secure Connection • Encrypted End-to-End
          </div>
        </div>
      </div>
    </div>
  )
}