"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Save, RefreshCw } from "lucide-react"

export default function SettingsPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold text-slate-800">Pengaturan Sistem</h2>

      <Tabs defaultValue="app" className="w-full">
        <TabsList className="grid w-full grid-cols-2 lg:w-[400px]">
          <TabsTrigger value="app">Aplikasi</TabsTrigger>
          <TabsTrigger value="account">Akun Admin</TabsTrigger>
        </TabsList>

        {/* TAB PENGATURAN APLIKASI */}
        <TabsContent value="app">
          <Card>
            <CardHeader>
              <CardTitle>Identitas Aplikasi</CardTitle>
              <CardDescription>Atur informasi dasar yang tampil di halaman publik.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label>Nama Aplikasi</Label>
                    <Input defaultValue="Survei Angkutan Lebaran" />
                </div>
                <div className="space-y-2">
                    <Label>Tahun Periode</Label>
                    <Input defaultValue="2026" />
                </div>
                <div className="space-y-2">
                    <Label>Instansi Penyelenggara</Label>
                    <Input defaultValue="Badan Kebijakan Transportasi - Kemenhub RI" />
                </div>
                <div className="space-y-2">
                    <Label>Versi Sistem</Label>
                    <Input defaultValue="v1.0.0 (Beta)" disabled className="bg-slate-50" />
                </div>
              </div>
              
              <div className="flex items-center justify-between p-4 border rounded-lg bg-slate-50 mt-4">
                <div className="space-y-0.5">
                    <Label className="text-base">Mode Maintenance</Label>
                    <p className="text-sm text-slate-500">Tutup akses survei untuk publik sementara waktu.</p>
                </div>
                <Switch />
              </div>
            </CardContent>
            <CardFooter className="justify-end border-t pt-4">
                <Button className="bg-blue-700 gap-2"><Save className="w-4 h-4" /> Simpan Perubahan</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* TAB PENGATURAN AKUN */}
        <TabsContent value="account">
          <Card>
            <CardHeader>
              <CardTitle>Keamanan Akun</CardTitle>
              <CardDescription>Perbarui kata sandi administrator.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Email</Label>
                <Input defaultValue="admin@kemenhub.go.id" disabled className="bg-slate-50" />
              </div>
              <div className="space-y-2">
                <Label>Password Lama</Label>
                <Input type="password" placeholder="••••••••" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <Label>Password Baru</Label>
                    <Input type="password" />
                </div>
                <div className="space-y-2">
                    <Label>Konfirmasi Password</Label>
                    <Input type="password" />
                </div>
              </div>
            </CardContent>
            <CardFooter className="justify-end border-t pt-4 gap-2">
                <Button variant="outline" className="gap-2"><RefreshCw className="w-4 h-4" /> Reset</Button>
                <Button className="bg-blue-700 gap-2"><Save className="w-4 h-4" /> Update Password</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}