"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogDescription } from "@/components/ui/dialog"
import { Search, Trash2, Eye, FileSpreadsheet, MapPin, User, Calendar, Bus, AlertCircle, ChevronLeft, ChevronRight, RefreshCw, FileText } from "lucide-react"

const formatDate = (dateString: string) => {
  if (!dateString) return "-"
  return new Date(dateString).toLocaleDateString('id-ID', {
    day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
  })
}

export default function RespondentsPage() {
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  
  // State untuk Detail Modal
  const [selectedData, setSelectedData] = useState<any>(null)
  
  // State untuk Delete Confirmation
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const fetchData = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/survei', { cache: 'no-store' })
      const json = await res.json()
      if(json.success) setData(json.data)
    } catch (err) {
      console.error("Gagal ambil data", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchData() }, [])

  const filteredData = data.filter(item => {
    const lower = search.toLowerCase()
    return (
      item.pekerjaan?.toLowerCase().includes(lower) || 
      item.domisiliProv?.toLowerCase().includes(lower) ||
      (item.tujuanProvinsi || "").toLowerCase().includes(lower) ||
      item.modaTransportasi?.toLowerCase().includes(lower)
    )
  })

  const totalPages = Math.ceil(filteredData.length / itemsPerPage)
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage, 
    currentPage * itemsPerPage
  )

  const handleExport = () => {
    if (data.length === 0) return alert("Tidak ada data untuk diexport.")
    const headers = ["ID,Tanggal,Usia,Pekerjaan,Penghasilan,Asal Provinsi,Asal Kota,Tujuan Provinsi,Tujuan Kota,Moda,Alasan,Saran"]
    const rows = data.map(row => [
      `"${row.id}"`, `"${new Date(row.createdAt).toISOString()}"`, `"${row.usia}"`, `"${row.pekerjaan}"`, `"${row.penghasilan}"`, `"${row.domisiliProv}"`, `"${row.domisiliKota}"`, `"${row.tujuanProvinsi}"`, `"${row.tujuanKota}"`, `"${row.modaTransportasi}"`, `"${row.alasanPerjalanan}"`, `"${row.saran.replace(/"/g, '""')}"`
    ].join(","))
    const csvContent = "data:text/csv;charset=utf-8," + [headers, ...rows].join("\n")
    const encodedUri = encodeURI(csvContent)
    const link = document.createElement("a")
    link.setAttribute("href", encodedUri)
    link.setAttribute("download", `Responden_${new Date().toISOString().slice(0,10)}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  // 1. Fungsi Buka Modal Hapus
  const openDeleteModal = (id: string) => {
    setDeleteId(id)
    setIsDeleteOpen(true)
  }

  // 2. Fungsi Eksekusi Hapus
  const confirmDelete = () => {
    if (!deleteId) return
    setData(data.filter(item => item.id !== deleteId))
    setIsDeleteOpen(false)
    setDeleteId(null)
  }

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white p-6 rounded-xl border border-slate-200 shadow-sm gap-4">
            <div>
                <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
                    <User className="w-6 h-6 text-blue-600" />
                    Manajemen Responden
                </h2>
                <p className="text-slate-500 text-sm mt-1">
                    Total <span className="font-bold text-slate-900">{data.length}</span> data masuk.
                </p>
            </div>
            <div className="flex w-full md:w-auto gap-2">
                <Button variant="outline" onClick={fetchData} className="flex-1 md:flex-none gap-2">
                    <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} /> Refresh
                </Button>
                <Button onClick={handleExport} className="flex-1 md:flex-none gap-2 bg-green-600 hover:bg-green-700 text-white shadow-sm">
                    <FileSpreadsheet className="w-4 h-4" /> Export
                </Button>
            </div>
        </div>

        <Card className="shadow-md border-slate-200">
            <CardHeader className="border-b bg-slate-50/50 pb-4">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="space-y-1 w-full md:w-auto">
                        <CardTitle>Database Lengkap</CardTitle>
                        <CardDescription>Cari data responden.</CardDescription>
                    </div>
                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <Input 
                            placeholder="Cari nama, kota, atau moda..." 
                            className="pl-9 bg-white w-full"
                            value={search}
                            onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
                        />
                    </div>
                </div>
            </CardHeader>
            <CardContent className="p-0">
                <div className="rounded-md border-b overflow-x-auto">
                    <Table className="min-w-[800px] md:min-w-full">
                        <TableHeader className="bg-slate-100/50">
                            <TableRow>
                                <TableHead className="w-[50px] text-center">#</TableHead>
                                <TableHead className="w-[200px]">Waktu & Profil</TableHead>
                                <TableHead className="min-w-[200px]">Rute Perjalanan</TableHead>
                                <TableHead className="w-[150px]">Moda</TableHead>
                                <TableHead className="w-[200px] hidden md:table-cell">Alasan</TableHead>
                                <TableHead className="text-right pr-6">Aksi</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {loading ? (
                                Array.from({ length: 5 }).map((_, i) => (
                                    <TableRow key={i}>
                                        <TableCell colSpan={6} className="h-16 text-center text-slate-400 animate-pulse">Memuat data...</TableCell>
                                    </TableRow>
                                ))
                            ) : paginatedData.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={6} className="h-24 text-center text-slate-500">Data tidak ditemukan.</TableCell>
                                </TableRow>
                            ) : (
                                paginatedData.map((row, index) => (
                                    <TableRow key={row.id} className="hover:bg-slate-50/80 transition-colors">
                                        <TableCell className="text-center text-slate-500 text-xs">{(currentPage - 1) * itemsPerPage + index + 1}</TableCell>
                                        <TableCell>
                                            <div className="flex flex-col gap-0.5">
                                                <span className="font-semibold text-slate-800 text-sm">{row.pekerjaan}</span>
                                                <span className="text-xs text-slate-500">{row.usia}</span>
                                                <span className="text-[10px] text-slate-400 mt-1 flex items-center gap-1">
                                                    <Calendar className="w-3 h-3" /> {formatDate(row.createdAt).split(',')[0]}
                                                </span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex flex-col gap-2 text-sm">
                                                <div className="flex items-center gap-2 text-slate-600">
                                                    <div className="w-2 h-2 rounded-full bg-blue-500 shrink-0" />
                                                    <span className="truncate max-w-[120px]">{row.domisiliProv}</span>
                                                </div>
                                                <div className="pl-[3px] border-l border-dashed border-slate-300 h-2 ml-1"></div>
                                                <div className="flex items-center gap-2 font-medium text-slate-900">
                                                    <MapPin className="w-3 h-3 text-red-500 shrink-0" />
                                                    {row.tujuanProvinsi === "Tidak Mudik" ? (
                                                        <span className="text-slate-400 italic">Tidak Mudik</span>
                                                    ) : (
                                                        <span className="truncate max-w-[120px]">{row.tujuanProvinsi}</span>
                                                    )}
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            {row.modaTransportasi ? (
                                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200 whitespace-nowrap">
                                                    <Bus className="w-3 h-3 mr-1" /> {row.modaTransportasi}
                                                </span>
                                            ) : <span className="text-slate-400 text-xs">-</span>}
                                        </TableCell>
                                        <TableCell className="hidden md:table-cell">
                                            <p className="text-xs text-slate-600 line-clamp-2" title={row.alasanPerjalanan}>{row.alasanPerjalanan || "-"}</p>
                                        </TableCell>
                                        <TableCell className="text-right pr-4">
                                            <div className="flex justify-end gap-2">
                                                {/* DETAIL BUTTON */}
                                                <Button variant="ghost" size="icon" onClick={() => setSelectedData(row)} className="h-8 w-8 text-blue-600 bg-blue-50 hover:bg-blue-100 border border-blue-200">
                                                    <Eye className="w-4 h-4" />
                                                </Button>
                                                
                                                {/* DELETE BUTTON (Triggers Modal) */}
                                                <Button variant="ghost" size="icon" onClick={() => openDeleteModal(row.id)} className="h-8 w-8 text-red-500 hover:bg-red-50 border border-red-100">
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
                
                {/* FOOTER */}
                {filteredData.length > 0 && (
                    <div className="flex flex-col md:flex-row items-center justify-between px-4 py-4 bg-slate-50 rounded-b-xl gap-4">
                        <div className="text-xs text-slate-500 text-center md:text-left">
                            Menampilkan <strong>{(currentPage - 1) * itemsPerPage + 1}</strong> - <strong>{Math.min(currentPage * itemsPerPage, filteredData.length)}</strong> dari <strong>{filteredData.length}</strong> data.
                        </div>
                        <div className="flex gap-1">
                            <Button variant="outline" size="sm" onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="h-8 w-8 p-0"><ChevronLeft className="w-4 h-4" /></Button>
                            <span className="flex items-center px-2 text-sm font-medium">Halaman {currentPage}</span>
                            <Button variant="outline" size="sm" onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="h-8 w-8 p-0"><ChevronRight className="w-4 h-4" /></Button>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>

        {/* --- MODAL DETAIL (Diluar Table loop) --- */}
        <Dialog open={!!selectedData} onOpenChange={(open) => !open && setSelectedData(null)}>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto w-[95vw] rounded-lg">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-xl"><FileText className="w-5 h-5 text-blue-600" /> Detail Responden</DialogTitle>
                    <CardDescription>ID: {selectedData?.id}</CardDescription>
                </DialogHeader>
                {selectedData && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                        {/* Bagian Kiri: Profil */}
                        <div className="space-y-4">
                            <div className="bg-slate-50 p-4 rounded-lg border">
                                <h4 className="font-semibold text-slate-800 mb-3 flex items-center gap-2"><User className="w-4 h-4" /> Profil</h4>
                                <div className="grid grid-cols-2 gap-y-3 text-sm">
                                    <div className="text-slate-500">Usia</div><div className="font-medium">{selectedData.usia}</div>
                                    <div className="text-slate-500">Pekerjaan</div><div className="font-medium">{selectedData.pekerjaan}</div>
                                    <div className="text-slate-500">Penghasilan</div><div className="font-medium">{selectedData.penghasilan}</div>
                                    <div className="text-slate-500">Waktu</div><div className="font-medium">{formatDate(selectedData.createdAt)}</div>
                                </div>
                            </div>
                            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                                <h4 className="font-semibold text-blue-900 mb-2">Moda</h4>
                                <p className="text-lg font-bold text-blue-700">{selectedData.modaTransportasi || "Belum Memilih"}</p>
                            </div>
                        </div>
                        {/* Bagian Kanan: Perjalanan */}
                        <div className="space-y-4">
                                <div className="bg-slate-50 p-4 rounded-lg border">
                                <h4 className="font-semibold text-slate-800 mb-3 flex items-center gap-2"><MapPin className="w-4 h-4" /> Perjalanan</h4>
                                <div className="relative pl-4 border-l-2 border-slate-200 space-y-6">
                                    <div className="relative">
                                        <div className="absolute -left-[21px] top-1 w-3 h-3 bg-slate-400 rounded-full border-2 border-white"></div>
                                        <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">Asal</p>
                                        <p className="font-semibold">{selectedData.domisiliProv}</p>
                                        <p className="text-sm text-slate-600">{selectedData.domisiliKota}</p>
                                    </div>
                                    <div className="relative">
                                        <div className="absolute -left-[21px] top-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></div>
                                        <p className="text-xs text-red-500 uppercase font-bold tracking-wider">Tujuan</p>
                                        {selectedData.tujuanProvinsi === "Tidak Mudik" ? (
                                            <p className="font-semibold text-slate-400 italic">Tidak Mudik</p>
                                        ) : (
                                            <>
                                                <p className="font-semibold text-slate-900">{selectedData.tujuanProvinsi}</p>
                                                <p className="text-sm text-slate-600">{selectedData.tujuanKota}</p>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100">
                                <h4 className="font-semibold text-yellow-800 mb-1 flex items-center gap-2"><AlertCircle className="w-4 h-4" /> Saran</h4>
                                <p className="text-sm text-slate-700 italic">"{selectedData.saran || "-"}"</p>
                            </div>
                        </div>
                    </div>
                )}
                <DialogFooter><Button variant="outline" onClick={() => setSelectedData(null)}>Tutup</Button></DialogFooter>
            </DialogContent>
        </Dialog>

        {/* --- MODAL KONFIRMASI HAPUS (BARU) --- */}
        <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
            <DialogContent className="max-w-md rounded-lg">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-red-600">
                        <AlertCircle className="w-6 h-6" /> Hapus Data Responden?
                    </DialogTitle>
                    <DialogDescription className="pt-2 text-slate-600">
                        Apakah Anda yakin ingin menghapus data responden ini secara permanen? 
                        Tindakan ini tidak dapat dibatalkan.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="mt-4 gap-2 sm:gap-0">
                    <Button variant="outline" onClick={() => setIsDeleteOpen(false)}>Batal</Button>
                    <Button variant="destructive" onClick={confirmDelete}>Ya, Hapus Data</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>

    </div>
  )
}