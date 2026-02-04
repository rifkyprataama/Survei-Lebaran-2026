"use client"

import { useState } from "react"
import { PROVINSI, getKotaByProvinsi } from "@/lib/wilayah-data"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Plus, Edit, Trash } from "lucide-react"

export default function MasterDataPage() {
  const [selectedProv, setSelectedProv] = useState(PROVINSI[0])
  const listKota = getKotaByProvinsi(selectedProv)

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
            <h2 className="text-2xl font-bold text-slate-800">Data Master Wilayah</h2>
            <p className="text-slate-500 text-sm">Referensi baku Provinsi dan Kabupaten/Kota se-Indonesia.</p>
        </div>
        <Button className="bg-blue-700 hover:bg-blue-800 gap-2">
            <Plus className="w-4 h-4" /> Tambah Wilayah Baru
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* List Provinsi */}
        <Card className="md:col-span-1 h-fit">
            <CardHeader className="bg-slate-50 border-b pb-3">
                <CardTitle className="text-base">Pilih Provinsi</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
                <Select value={selectedProv} onValueChange={setSelectedProv}>
                    <SelectTrigger>
                        <SelectValue placeholder="Pilih Provinsi" />
                    </SelectTrigger>
                    <SelectContent className="max-h-[300px]">
                        {PROVINSI.map((p) => (
                            <SelectItem key={p} value={p}>{p}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                
                <div className="mt-4 p-4 bg-blue-50 rounded-lg text-sm text-blue-800 border border-blue-100">
                    <p>Provinsi Terpilih:</p>
                    <p className="font-bold text-lg">{selectedProv}</p>
                    <p className="text-xs mt-1 text-blue-600">Total Kabupaten/Kota: {listKota.length}</p>
                </div>
            </CardContent>
        </Card>

        {/* Tabel Kota */}
        <Card className="md:col-span-2">
            <CardHeader className="bg-slate-50 border-b pb-3 flex flex-row justify-between items-center">
                <CardTitle className="text-base">Daftar Kabupaten / Kota</CardTitle>
                <Badge variant="outline" className="bg-white">Total: {listKota.length}</Badge>
            </CardHeader>
            <CardContent className="p-0">
                <div className="max-h-[500px] overflow-y-auto">
                    <Table>
                        <TableHeader className="bg-white sticky top-0">
                            <TableRow>
                                <TableHead className="w-[50px]">No</TableHead>
                                <TableHead>Nama Wilayah</TableHead>
                                <TableHead className="text-right">Aksi</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {listKota.map((kota, idx) => (
                                <TableRow key={idx}>
                                    <TableCell className="text-slate-500 text-xs">{idx + 1}</TableCell>
                                    <TableCell className="font-medium">{kota}</TableCell>
                                    <TableCell className="text-right space-x-1">
                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-yellow-600"><Edit className="w-3 h-3" /></Button>
                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-red-600"><Trash className="w-3 h-3" /></Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
        </Card>
      </div>
    </div>
  )
}