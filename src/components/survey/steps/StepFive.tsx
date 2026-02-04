"use client"

import { FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { UseFormReturn } from "react-hook-form"

// Opsi Angkutan (First Mile & Last Mile)
const OPS_ANGKUTAN = [
  "Kereta Perkotaan (KRL, MRT, LRT, KRD)",
  "Kereta Api Bandara",
  "Bus Bandara",
  "Bus Umum",
  "Angkot/Angdes/Mikrolet",
  "Mobil Sewa",
  "Taksi",
  "Bajaj",
  "Angkutan Sewa Khusus (Taksi Online)",
  "Ojek Online",
  "Ojek Pangkalan",
  "Mobil Pribadi",
  "Sepeda Motor",
  "Bentor",
  "Becak",
  "Sepeda",
  "Angkutan Sungai, Danau, Penyeberangan",
  "Jalan Kaki",
  "Lainnya"
]

interface StepProps {
  form: UseFormReturn<any>
}

export default function StepFive({ form }: StepProps) {
  const { errors } = form.formState

  return (
    <Card className="border-t-[6px] border-blue-600 shadow-sm animate-in fade-in slide-in-from-right duration-500">
      <CardHeader>
        <CardTitle>Pengguna Angkutan Umum</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">

        {/* 1. TRANSPORTASI MENUJU TERMINAL/STASIUN (FIRST MILE) */}
        <FormField
          control={form.control}
          name="transportKeTerminal"
          render={({ field }) => (
            <FormItem>
              <label className="font-bold text-base text-slate-900 block mb-2">
                1. Angkutan apa yang Anda gunakan untuk menuju ke terminal/stasiun/bandara asal? <span className="text-red-500">*</span>
              </label>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className={`h-12 bg-slate-50 ${errors.transportKeTerminal ? "border-red-500 bg-red-50" : ""}`}>
                    <SelectValue placeholder="Pilih Angkutan..." />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="max-h-[300px]">
                  {OPS_ANGKUTAN.map((opsi, i) => (
                    <SelectItem key={i} value={opsi}>{String.fromCharCode(97 + i)}. {opsi}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />

        {/* 2. TRANSPORTASI DARI TERMINAL/STASIUN (LAST MILE) */}
        <FormField
          control={form.control}
          name="transportDariTerminal"
          render={({ field }) => (
            <FormItem>
              <label className="font-bold text-base text-slate-900 block mb-2">
                2. Setelah turun, angkutan apa yang Anda gunakan untuk sampai ke tujuan akhir? <span className="text-red-500">*</span>
              </label>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className={`h-12 bg-slate-50 ${errors.transportDariTerminal ? "border-red-500 bg-red-50" : ""}`}>
                    <SelectValue placeholder="Pilih Angkutan..." />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="max-h-[300px]">
                  {OPS_ANGKUTAN.map((opsi, i) => (
                    <SelectItem key={i} value={opsi}>{String.fromCharCode(97 + i)}. {opsi}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />

        {/* 3. WAKTU BELI TIKET */}
        <FormField
          control={form.control}
          name="waktuBeliTiket"
          render={({ field }) => (
            <FormItem>
              <label className="font-bold text-base text-slate-900 block mb-2">
                3. Kapan anda membeli tiket? <span className="text-red-500">*</span>
              </label>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className={`h-12 bg-slate-50 ${errors.waktuBeliTiket ? "border-red-500 bg-red-50" : ""}`}>
                    <SelectValue placeholder="Pilih Waktu Pembelian..." />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Belum beli">a. Saat ini belum membeli tiket</SelectItem>
                  <SelectItem value="1 Bulan sebelum">b. 1 Bulan sebelum tanggal bepergian</SelectItem>
                  <SelectItem value="3 Minggu sebelum">c. 3 Minggu sebelum tanggal bepergian</SelectItem>
                  <SelectItem value="2 Minggu sebelum">d. 2 Minggu sebelum tanggal bepergian</SelectItem>
                  <SelectItem value="1 Minggu sebelum">e. 1 Minggu sebelum tanggal bepergian</SelectItem>
                  <SelectItem value="< 1 Minggu">f. &lt; 1 Minggu sebelum tanggal bepergian</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />

        {/* 4. MODA ALTERNATIF */}
        <FormField
          control={form.control}
          name="modaAlternatif"
          render={({ field }) => (
            <FormItem>
              <label className="font-bold text-base text-slate-900 block mb-2">
                4. Jika tidak mendapatkan tiket, moda alternatif apa yang akan digunakan? <span className="text-red-500">*</span>
              </label>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className={`h-12 bg-slate-50 ${errors.modaAlternatif ? "border-red-500 bg-red-50" : ""}`}>
                    <SelectValue placeholder="Pilih Alternatif..." />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="max-h-[300px]">
                  <SelectItem value="Pesawat">a. Pesawat</SelectItem>
                  <SelectItem value="Kereta Api">b. Kereta Api Antar Kota</SelectItem>
                  <SelectItem value="Kereta Cepat">c. Kereta Cepat</SelectItem>
                  <SelectItem value="KRL">d. Kereta Commuter Line</SelectItem>
                  <SelectItem value="Bus">e. Bus</SelectItem>
                  <SelectItem value="Kapal Laut">f. Kapal Laut/PELNI</SelectItem>
                  <SelectItem value="Kapal Ferry">g. Kapal Penyeberangan/Ferry</SelectItem>
                  <SelectItem value="Travel">h. Mobil Travel</SelectItem>
                  <SelectItem value="Mobil Sewa">i. Mobil Sewa</SelectItem>
                  <SelectItem value="Taksi">j. Taksi Reguler</SelectItem>
                  <SelectItem value="Taksi Online">k. Mobil Online/Taksi Online</SelectItem>
                  <SelectItem value="Mobil Pribadi">l. Mobil pribadi</SelectItem>
                  <SelectItem value="Sepeda Motor">m. Sepeda Motor</SelectItem>
                  <SelectItem value="Sepeda">n. Sepeda</SelectItem>
                  <SelectItem value="Batal">o. Tidak jadi bepergian</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />

      </CardContent>
    </Card>
  )
}