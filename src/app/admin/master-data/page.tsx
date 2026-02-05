"use client"

import { useState, useEffect, useMemo } from "react"
// Pastikan path import ini sesuai dengan file Anda
import { PROVINSI, getKotaByProvinsi } from "@/lib/wilayah-data" 

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogDescription } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Plus, Edit, Trash2, Map, Search, Save, X, CheckCircle2, AlertCircle } from "lucide-react"

export default function MasterDataPage() {
  // --- STATE MANAGEMENT ---
  const [selectedProv, setSelectedProv] = useState(PROVINSI[0])
  
  // Kita simpan data di State agar bisa diedit (CRUD) tanpa merubah file asli
  // Format: { "Jawa Barat": ["Bandung", "Bogor"], "Bali": ["Denpasar"] }
  const [masterData, setMasterData] = useState<Record<string, string[]>>({})
  const [loading, setLoading] = useState(true)
  
  // State untuk Fitur
  const [searchQuery, setSearchQuery] = useState("")
  const [isAddOpen, setIsAddOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)

  // State untuk Form Input
  const [tempCity, setTempCity] = useState("") // Untuk input nama kota baru/edit
  const [targetCity, setTargetCity] = useState("") // Kota yang sedang dipilih untuk diedit/hapus

  // 1. INITIAL LOAD (Memindahkan data statis ke State)
  useEffect(() => {
    const initialData: Record<string, string[]> = {}
    PROVINSI.forEach(prov => {
        initialData[prov] = getKotaByProvinsi(prov)
    })
    setMasterData(initialData)
    setLoading(false)
  }, [])

  // 2. LOGIKA SEARCH & LISTING
  // Ambil daftar kota berdasarkan provinsi yang dipilih & filter search
  const currentCities = useMemo(() => {
    const cities = masterData[selectedProv] || []
    if (!searchQuery) return cities
    return cities.filter(c => c.toLowerCase().includes(searchQuery.toLowerCase()))
  }, [masterData, selectedProv, searchQuery])

  // 3. FUNGSI CRUD (Create, Update, Delete)
  
  // Tambah Kota
  const handleAddCity = () => {
    if (!tempCity.trim()) return
    
    setMasterData(prev => ({
        ...prev,
        [selectedProv]: [tempCity, ...(prev[selectedProv] || [])] // Tambah di paling atas
    }))
    setTempCity("")
    setIsAddOpen(false)
  }

  // Edit Kota
  const openEdit = (city: string) => {
      setTargetCity(city)
      setTempCity(city)
      setIsEditOpen(true)
  }

  const handleUpdateCity = () => {
      if (!tempCity.trim()) return

      setMasterData(prev => ({
          ...prev,
          [selectedProv]: prev[selectedProv].map(c => c === targetCity ? tempCity : c)
      }))
      setIsEditOpen(false)
  }

  // Hapus Kota
  const openDelete = (city: string) => {
      setTargetCity(city)
      setIsDeleteOpen(true)
  }

  const handleDeleteCity = () => {
      setMasterData(prev => ({
          ...prev,
          [selectedProv]: prev[selectedProv].filter(c => c !== targetCity)
      }))
      setIsDeleteOpen(false)
  }

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto">
      
      {/* HEADER PAGE */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
            <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                <Map className="w-6 h-6 text-blue-600" /> Data Master Wilayah
            </h2>
            <p className="text-slate-500 text-sm mt-1">Kelola referensi Provinsi dan Kabupaten/Kota secara dinamis.</p>
        </div>
        
        {/* TOMBOL TAMBAH (Membuka Modal) */}
        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
            <DialogTrigger asChild>
                <Button className="bg-blue-700 hover:bg-blue-800 gap-2 shadow-sm w-full md:w-auto">
                    <Plus className="w-4 h-4" /> Tambah Wilayah Baru
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Tambah Wilayah Baru</DialogTitle>
                    <DialogDescription>Masukkan nama Kabupaten/Kota baru untuk provinsi <strong>{selectedProv}</strong>.</DialogDescription>
                </DialogHeader>
                <div className="py-4">
                    <Label className="mb-2 block">Nama Kabupaten / Kota</Label>
                    <Input 
                        placeholder="Contoh: Kab. Baru Mekar" 
                        value={tempCity} 
                        onChange={(e) => setTempCity(e.target.value)} 
                    />
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => setIsAddOpen(false)}>Batal</Button>
                    <Button onClick={handleAddCity} className="bg-blue-700">Simpan Data</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* BAGIAN KIRI: PILIH PROVINSI */}
        <Card className="md:col-span-1 h-fit shadow-md border-slate-200">
            <CardHeader className="bg-slate-50/50 border-b pb-4">
                <CardTitle className="text-base font-semibold text-slate-700">Filter Wilayah</CardTitle>
                <CardDescription>Pilih provinsi untuk melihat data.</CardDescription>
            </CardHeader>
            <CardContent className="p-5 space-y-4">
                <div className="space-y-2">
                    <Label>Provinsi</Label>
                    <Select value={selectedProv} onValueChange={(val) => { setSelectedProv(val); setSearchQuery(""); }}>
                        <SelectTrigger className="bg-white">
                            <SelectValue placeholder="Pilih Provinsi" />
                        </SelectTrigger>
                        <SelectContent className="max-h-[300px]">
                            {PROVINSI.map((p) => (
                                <SelectItem key={p} value={p}>{p}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                
                {/* INFO BOX */}
                <div className="p-4 bg-blue-50/50 rounded-lg border border-blue-100 space-y-3">
                    <div className="flex justify-between items-center border-b border-blue-200 pb-2">
                        <span className="text-xs text-slate-500 uppercase font-bold">Terpilih</span>
                        <Badge variant="secondary" className="bg-blue-100 text-blue-700 hover:bg-blue-100">Aktif</Badge>
                    </div>
                    <div>
                        <p className="text-lg font-bold text-blue-900 leading-tight">{selectedProv}</p>
                        <p className="text-xs text-slate-500 mt-1">Region ID: {PROVINSI.indexOf(selectedProv) + 1}</p>
                    </div>
                    <div className="pt-2 flex items-center gap-2 text-sm font-medium text-slate-700">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                        Total: {masterData[selectedProv]?.length || 0} Wilayah
                    </div>
                </div>
            </CardContent>
        </Card>

        {/* BAGIAN KANAN: TABEL KOTA */}
        <Card className="md:col-span-2 shadow-md border-slate-200 flex flex-col h-[600px]">
            <CardHeader className="bg-slate-50/50 border-b py-3 px-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                    <CardTitle className="text-base font-semibold text-slate-700">Daftar Kabupaten / Kota</CardTitle>
                    <Badge variant="outline" className="bg-white border-slate-300 text-slate-600 font-normal">
                        {currentCities.length} Items
                    </Badge>
                </div>
                
                {/* SEARCH INPUT */}
                <div className="relative w-full sm:w-64">
                    <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                    <Input 
                        placeholder="Cari nama wilayah..." 
                        className="pl-9 h-9 bg-white text-sm"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
            </CardHeader>
            
            <CardContent className="p-0 flex-1 overflow-hidden">
                {/* TABLE CONTAINER: SCROLLABLE */}
                <div className="h-full overflow-y-auto">
                    <Table>
                        <TableHeader className="bg-white sticky top-0 z-10 shadow-sm">
                            <TableRow>
                                <TableHead className="w-[60px] text-center">No</TableHead>
                                <TableHead>Nama Wilayah Administratif</TableHead>
                                <TableHead className="w-[120px] text-right pr-6">Aksi</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {loading ? (
                                <TableRow><TableCell colSpan={3} className="text-center py-10">Memuat data...</TableCell></TableRow>
                            ) : currentCities.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={3} className="h-40 text-center text-slate-500">
                                        <div className="flex flex-col items-center justify-center gap-2">
                                            <AlertCircle className="w-8 h-8 text-slate-300" />
                                            <p>Tidak ada data wilayah ditemukan.</p>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ) : (
                                currentCities.map((kota, idx) => (
                                    <TableRow key={idx} className="hover:bg-slate-50/80 transition-colors">
                                        <TableCell className="text-center text-slate-500 text-xs">
                                            {idx + 1}
                                        </TableCell>
                                        <TableCell className="font-medium text-slate-700">
                                            {kota}
                                        </TableCell>
                                        <TableCell className="text-right pr-4">
                                            <div className="flex justify-end gap-1">
                                                <Button 
                                                    variant="ghost" size="icon" 
                                                    onClick={() => openEdit(kota)}
                                                    className="h-8 w-8 text-yellow-600 hover:text-yellow-700 hover:bg-yellow-50"
                                                >
                                                    <Edit className="w-4 h-4" />
                                                </Button>
                                                <Button 
                                                    variant="ghost" size="icon" 
                                                    onClick={() => openDelete(kota)}
                                                    className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
        </Card>
      </div>

      {/* --- MODAL EDIT --- */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Edit Nama Wilayah</DialogTitle>
                <DialogDescription>Ubah nama wilayah di provinsi {selectedProv}.</DialogDescription>
            </DialogHeader>
            <div className="py-4">
                <Label className="mb-2 block">Nama Wilayah</Label>
                <Input value={tempCity} onChange={(e) => setTempCity(e.target.value)} />
            </div>
            <DialogFooter>
                <Button variant="outline" onClick={() => setIsEditOpen(false)}>Batal</Button>
                <Button onClick={handleUpdateCity} className="bg-yellow-600 hover:bg-yellow-700 text-white">Update Perubahan</Button>
            </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* --- MODAL DELETE CONFIRMATION --- */}
      <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle className="flex items-center gap-2 text-red-600">
                    <AlertCircle className="w-5 h-5" /> Hapus Wilayah?
                </DialogTitle>
                <DialogDescription>
                    Anda akan menghapus <strong>"{targetCity}"</strong> dari daftar master {selectedProv}. Tindakan ini tidak dapat dibatalkan.
                </DialogDescription>
            </DialogHeader>
            <DialogFooter>
                <Button variant="outline" onClick={() => setIsDeleteOpen(false)}>Batal</Button>
                <Button onClick={handleDeleteCity} variant="destructive">Ya, Hapus Permanen</Button>
            </DialogFooter>
        </DialogContent>
      </Dialog>

    </div>
  )
}