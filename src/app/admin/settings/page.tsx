"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Save, RefreshCw, Loader2, AlertCircle, CheckCircle2, Shield, Settings as SettingsIcon } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function SettingsPage() {
  // --- STATE 1: PENGATURAN APLIKASI ---
  const [appConfig, setAppConfig] = useState({
    appName: "Survei Angkutan Lebaran",
    year: "2026",
    agency: "Badan Kebijakan Transportasi - Kemenhub RI",
    isMaintenance: false,
  })
  const [appLoading, setAppLoading] = useState(false)

  // --- STATE 2: PENGATURAN AKUN ---
  const [passwords, setPasswords] = useState({
    old: "",
    new: "",
    confirm: ""
  })
  const [passLoading, setPassLoading] = useState(false)
  const [passMessage, setPassMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

  // --- HANDLER: SIMPAN APLIKASI ---
  const handleSaveApp = async () => {
    setAppLoading(true)
    // Simulasi delay API
    await new Promise(resolve => setTimeout(resolve, 1500))
    setAppLoading(false)
    // Di sini bisa tambahkan Toast notification library jika ada
    alert("Konfigurasi aplikasi berhasil diperbarui!")
  }

  // --- HANDLER: UPDATE PASSWORD ---
  const handleUpdatePassword = async () => {
    setPassMessage(null)
    
    // 1. Validasi Sederhana
    if (!passwords.old || !passwords.new || !passwords.confirm) {
        setPassMessage({ type: 'error', text: "Semua kolom password wajib diisi." })
        return
    }
    if (passwords.new !== passwords.confirm) {
        setPassMessage({ type: 'error', text: "Konfirmasi password tidak cocok." })
        return
    }
    if (passwords.new.length < 6) {
        setPassMessage({ type: 'error', text: "Password baru minimal 6 karakter." })
        return
    }

    setPassLoading(true)
    // Simulasi delay API
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    setPassLoading(false)
    setPassMessage({ type: 'success', text: "Password administrator berhasil diubah." })
    setPasswords({ old: "", new: "", confirm: "" }) // Reset form
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-10">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-6">
         <div className="space-y-1">
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">Pengaturan Sistem</h2>
            <p className="text-slate-500">Kelola konfigurasi global aplikasi dan keamanan akun administrator.</p>
         </div>
      </div>

      <Tabs defaultValue="app" className="w-full">
        <TabsList className="grid w-full grid-cols-2 lg:w-[400px] mb-6">
          <TabsTrigger value="app" className="gap-2"><SettingsIcon className="w-4 h-4" /> Aplikasi</TabsTrigger>
          <TabsTrigger value="account" className="gap-2"><Shield className="w-4 h-4" /> Akun Admin</TabsTrigger>
        </TabsList>

        {/* TAB 1: PENGATURAN APLIKASI */}
        <TabsContent value="app" className="space-y-6">
          <Card className="shadow-sm border-slate-200">
            <CardHeader className="bg-slate-50/50 border-b pb-4">
              <CardTitle className="text-xl">Identitas & Konfigurasi</CardTitle>
              <CardDescription>Informasi ini akan ditampilkan pada halaman publik survei.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <Label htmlFor="appName" className="text-slate-600">Nama Aplikasi</Label>
                    <Input 
                        id="appName"
                        value={appConfig.appName} 
                        onChange={(e) => setAppConfig({...appConfig, appName: e.target.value})}
                        className="bg-white"
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="year" className="text-slate-600">Tahun Periode</Label>
                    <Input 
                        id="year"
                        value={appConfig.year} 
                        onChange={(e) => setAppConfig({...appConfig, year: e.target.value})}
                        className="bg-white"
                    />
                </div>
                <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="agency" className="text-slate-600">Instansi Penyelenggara</Label>
                    <Input 
                        id="agency"
                        value={appConfig.agency} 
                        onChange={(e) => setAppConfig({...appConfig, agency: e.target.value})}
                        className="bg-white"
                    />
                </div>
                <div className="space-y-2">
                    <Label className="text-slate-600">Versi Sistem</Label>
                    <Input defaultValue="v1.2.0 (Stable)" disabled className="bg-slate-100 text-slate-500 cursor-not-allowed" />
                </div>
              </div>
              
              <div className="flex items-center justify-between p-4 border border-slate-200 rounded-xl bg-slate-50">
                <div className="space-y-0.5">
                    <Label className="text-base font-semibold text-slate-800">Mode Maintenance</Label>
                    <p className="text-sm text-slate-500">Jika aktif, halaman survei publik akan ditutup sementara.</p>
                </div>
                <Switch 
                    checked={appConfig.isMaintenance}
                    onCheckedChange={(checked) => setAppConfig({...appConfig, isMaintenance: checked})}
                />
              </div>
            </CardContent>
            <CardFooter className="justify-end border-t bg-slate-50/50 py-4">
                <Button 
                    onClick={handleSaveApp} 
                    disabled={appLoading}
                    className="bg-blue-700 hover:bg-blue-800 min-w-[140px]"
                >
                    {appLoading ? (
                        <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Menyimpan...</>
                    ) : (
                        <><Save className="w-4 h-4 mr-2" /> Simpan Perubahan</>
                    )}
                </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* TAB 2: PENGATURAN AKUN */}
        <TabsContent value="account">
          <Card className="shadow-sm border-slate-200">
            <CardHeader className="bg-slate-50/50 border-b pb-4">
              <CardTitle className="text-xl">Keamanan Akun</CardTitle>
              <CardDescription>Perbarui kata sandi untuk akun administrator.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              
              {/* ALERT MESSAGE */}
              {passMessage && (
                  <Alert variant={passMessage.type === 'error' ? "destructive" : "default"} className={passMessage.type === 'success' ? "border-green-200 bg-green-50 text-green-800" : ""}>
                      {passMessage.type === 'error' ? <AlertCircle className="h-4 w-4" /> : <CheckCircle2 className="h-4 w-4 text-green-600" />}
                      <AlertTitle>{passMessage.type === 'error' ? "Gagal" : "Berhasil"}</AlertTitle>
                      <AlertDescription>{passMessage.text}</AlertDescription>
                  </Alert>
              )}

              <div className="space-y-2">
                <Label className="text-slate-600">Email Administrator</Label>
                <Input defaultValue="admin@kemenhub.go.id" disabled className="bg-slate-100 text-slate-500 font-medium" />
                <p className="text-[11px] text-slate-400">Email tidak dapat diubah. Hubungi IT Support untuk perubahan email.</p>
              </div>

              <div className="border-t border-slate-100 my-4"></div>

              <div className="space-y-4">
                  <div className="space-y-2 relative">
                    <Label htmlFor="oldPass">Password Lama</Label>
                    <Input 
                        id="oldPass"
                        type="password" 
                        placeholder="••••••••" 
                        value={passwords.old}
                        onChange={(e) => setPasswords({...passwords, old: e.target.value})}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="newPass">Password Baru</Label>
                        <Input 
                            id="newPass"
                            type="password" 
                            value={passwords.new}
                            onChange={(e) => setPasswords({...passwords, new: e.target.value})}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="confirmPass">Konfirmasi Password</Label>
                        <Input 
                            id="confirmPass"
                            type="password" 
                            value={passwords.confirm}
                            onChange={(e) => setPasswords({...passwords, confirm: e.target.value})}
                        />
                    </div>
                  </div>
              </div>
            </CardContent>
            <CardFooter className="justify-end border-t bg-slate-50/50 py-4 gap-3">
                <Button 
                    variant="outline" 
                    onClick={() => {
                        setPasswords({ old: "", new: "", confirm: "" })
                        setPassMessage(null)
                    }}
                    disabled={passLoading}
                >
                    <RefreshCw className="w-4 h-4 mr-2" /> Reset
                </Button>
                <Button 
                    onClick={handleUpdatePassword} 
                    disabled={passLoading}
                    className="bg-blue-700 hover:bg-blue-800 min-w-[150px]"
                >
                    {passLoading ? (
                        <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Memproses...</>
                    ) : (
                        <><Save className="w-4 h-4 mr-2" /> Update Password</>
                    )}
                </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}