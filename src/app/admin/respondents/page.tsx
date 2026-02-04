"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Search, Trash2, Eye, FileText, Download } from "lucide-react"

export default function RespondentsPage() {
  const [data, setData] = useState<any[]>([])
  const [filteredData, setFilteredData] = useState<any[]>([])
  const [search, setSearch] = useState("")
  const [selectedData, setSelectedData] = useState<any>(null)

  // Load Data
  useEffect(() => {
    fetch('/api/survei').then(res => res.json()).then(json => {
        if(json.success) {
            setData(json.data)
            setFilteredData(json.data)
        }
    })
  }, [])

  // Filter Search
  useEffect(() => {
    const lower = search.toLowerCase()
    const filtered = data.filter(item => 
        item.pekerjaan.toLowerCase().includes(lower) || 
        item.domisiliProv.toLowerCase().includes(lower) ||
        (item.tujuanProvinsi || "").toLowerCase().includes(lower)
    )
    setFilteredData(filtered)
  }, [search, data])

  const handleDelete = (id: string) => {
    if(confirm("Hapus data ini?")) alert("Simulasi: Data dihapus.")
  }

  return (
    <div className="space-y-6">
        <div className="flex justify-between items-center bg-white p-4 rounded-xl border shadow-sm">
            <div>
                <h2 className="text-2xl font-bold text-slate-800">Manajemen Data Responden</h2>
                <p className="text-slate-500 text-sm">Kelola seluruh data masuk, lihat detail, dan validasi.</p>
            </div>
            <Button variant="outline" className="gap-2 text-green-700 bg-green-50 border-green-200">
                <Download className="w-4 h-4" /> Export Excel
            </Button>
        </div>

        <Card>
            <CardHeader className="border-b pb-4">
                <div className="flex items-center justify-between">
                    <CardTitle>Database Lengkap ({filteredData.length})</CardTitle>
                    <div className="relative w-72">
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-slate-400" />
                        <Input 
                            placeholder="Cari Asal, Tujuan, atau Pekerjaan..." 
                            className="pl-8"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>
            </CardHeader>
            <CardContent className="p-0">
                <Table>
                    <TableHeader className="bg-slate-50">
                        <TableRow>
                            <TableHead>Tanggal</TableHead>
                            <TableHead>Profil</TableHead>
                            <TableHead>Asal (Domisili)</TableHead>
                            <TableHead>Tujuan Mudik</TableHead>
                            <TableHead>Moda</TableHead>
                            <TableHead className="text-center">Aksi</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredData.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell className="text-xs text-slate-500">
                                    {new Date(row.createdAt).toLocaleDateString()}
                                </TableCell>
                                <TableCell>
                                    <div className="font-medium">{row.pekerjaan}</div>
                                    <div className="text-xs text-slate-400">{row.usia}</div>
                                </TableCell>
                                <TableCell>{row.domisiliProv}</TableCell>
                                <TableCell>
                                    {row.tujuanProvinsi ? (
                                        <span className="text-green-600 font-medium">{row.tujuanProvinsi}</span>
                                    ) : <span className="text-slate-300">-</span>}
                                </TableCell>
                                <TableCell>{row.modaTransportasi || "-"}</TableCell>
                                <TableCell className="text-center space-x-2">
                                    {/* TOMBOL DETAIL (MODAL) */}
                                    <Dialog>
                                        <DialogTrigger asChild>
                                            <Button variant="ghost" size="icon" onClick={() => setSelectedData(row)} className="text-blue-600 bg-blue-50 hover:bg-blue-100">
                                                <Eye className="w-4 h-4" />
                                            </Button>
                                        </DialogTrigger>
                                        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                                            <DialogHeader>
                                                <DialogTitle>Detail Data Responden</DialogTitle>
                                            </DialogHeader>
                                            {selectedData && (
                                                <div className="grid grid-cols-2 gap-4 text-sm mt-4">
                                                    <div className="space-y-1"><p className="font-semibold text-slate-500">ID System</p><p>{selectedData.id}</p></div>
                                                    <div className="space-y-1"><p className="font-semibold text-slate-500">Waktu Input</p><p>{new Date(selectedData.createdAt).toLocaleString()}</p></div>
                                                    <div className="p-3 bg-slate-50 col-span-2 rounded border font-medium text-blue-800">Bagian 1: Data Diri</div>
                                                    <div><p className="font-bold">Usia:</p> {selectedData.usia}</div>
                                                    <div><p className="font-bold">Pekerjaan:</p> {selectedData.pekerjaan}</div>
                                                    <div><p className="font-bold">Penghasilan:</p> {selectedData.penghasilan}</div>
                                                    
                                                    <div className="p-3 bg-slate-50 col-span-2 rounded border font-medium text-blue-800">Bagian 2: Perjalanan</div>
                                                    <div><p className="font-bold">Asal:</p> {selectedData.domisiliProv}, {selectedData.domisiliKota}</div>
                                                    <div><p className="font-bold">Tujuan:</p> {selectedData.tujuanProvinsi || "Tidak Mudik"}, {selectedData.tujuanKota}</div>
                                                    <div><p className="font-bold">Moda:</p> {selectedData.modaTransportasi}</div>
                                                    <div><p className="font-bold">Alasan:</p> {selectedData.alasanPerjalanan}</div>

                                                    <div className="p-3 bg-slate-50 col-span-2 rounded border font-medium text-blue-800">Lainnya</div>
                                                    <div className="col-span-2"><p className="font-bold">Saran/Masukan:</p> <p className="italic text-slate-600">"{selectedData.saran}"</p></div>
                                                </div>
                                            )}
                                        </DialogContent>
                                    </Dialog>

                                    <Button variant="ghost" size="icon" onClick={() => handleDelete(row.id)} className="text-red-500 hover:bg-red-50">
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    </div>
  )
}