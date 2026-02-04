"use client"

import { FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { UseFormReturn } from "react-hook-form"

// Opsi Transportasi (Sama dengan sebelumnya)
const OPS_MODA = [
  "Pesawat", "Kereta Api Antar Kota", "Kereta Cepat", "Kereta Perkotaan (KRL/MRT/LRT/KRD)",
  "Bus", "Kapal Laut/PELNI", "Kapal Penyeberangan/ferry/ASDP",
  "Mobil Travel", "Mobil Sewa", "Taksi Reguler", "Mobil Online/Taksi Online",
  "Mobil pribadi", "Sepeda Motor", "Sepeda", "Angkutan Gratis", "Angkutan lainnya"
]

interface StepProps {
  form: UseFormReturn<any>
}

export default function StepSix({ form }: StepProps) {
  const { errors } = form.formState
  
  // Pantau jawaban "Apakah moda sama?"
  const modaSama = form.watch("modaSama")

  return (
    <Card className="border-t-[6px] border-blue-600 shadow-sm animate-in fade-in slide-in-from-right duration-500">
      <CardHeader>
        <CardTitle>Pulang/Kembali</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">

        {/* 1. TANGGAL PULANG */}
        <FormField
          control={form.control}
          name="tanggalPulang"
          render={({ field }) => (
            <FormItem>
              <label className="font-bold text-base text-slate-900 block mb-2">
                1. Kapan Anda merencanakan pulang/kembali? <span className="text-red-500">*</span>
              </label>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className={`h-12 bg-slate-50 ${errors.tanggalPulang ? "border-red-500 bg-red-50" : ""}`}>
                    <SelectValue placeholder="Pilih Tanggal Kembali..." />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="H2">H2, Minggu 22 Maret 2026 (Lebaran 2)</SelectItem>
                  <SelectItem value="H+1">H+1, Senin 23 Maret 2026</SelectItem>
                  <SelectItem value="H+2">H+2, Selasa 24 Maret 2026</SelectItem>
                  <SelectItem value="H+3">H+3, Rabu 25 Maret 2026</SelectItem>
                  <SelectItem value="H+4">H+4, Kamis 26 Maret 2026</SelectItem>
                  <SelectItem value="H+5">H+5, Jumat 27 Maret 2026</SelectItem>
                  <SelectItem value="H+6">H+6, Sabtu 28 Maret 2026</SelectItem>
                  <SelectItem value="H+7">H+7, Minggu 29 Maret 2026</SelectItem>
                  <SelectItem value="Setelah H+7">Setelah H+7</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />

        {/* 2. JAM PULANG */}
        <FormField
          control={form.control}
          name="jamPulang"
          render={({ field }) => (
            <FormItem>
              <label className="font-bold text-base text-slate-900 block mb-2">
                2. Pukul berapa Anda akan pulang/kembali? <span className="text-red-500">*</span>
              </label>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className={`h-12 bg-slate-50 ${errors.jamPulang ? "border-red-500 bg-red-50" : ""}`}>
                    <SelectValue placeholder="Pilih Waktu..." />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="00.00 – 03.59">a. Pukul 00.00 – 03.59</SelectItem>
                  <SelectItem value="04.00 – 06.59">b. Pukul 04.00 – 06.59</SelectItem>
                  <SelectItem value="07.00 – 09.59">c. Pukul 07.00 – 09.59</SelectItem>
                  <SelectItem value="10.00 – 12.59">d. Pukul 10.00 – 12.59</SelectItem>
                  <SelectItem value="13.00 – 15.59">e. Pukul 13.00 – 15.59</SelectItem>
                  <SelectItem value="16.00 – 18.59">f. Pukul 16.00 – 18.59</SelectItem>
                  <SelectItem value="19.00 – 21.59">g. Pukul 19.00 – 21.59</SelectItem>
                  <SelectItem value="22.00 – 23.59">h. Pukul 22.00 – 23.59</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />

        {/* 3. APAKAH MODA SAMA */}
        <FormField
          control={form.control}
          name="modaSama"
          render={({ field }) => (
            <FormItem className="space-y-3 p-4 bg-slate-50 rounded-lg border border-slate-200">
              <label className="font-bold text-base text-slate-900 block">
                3. Apakah Anda menggunakan moda transportasi yang SAMA dengan ketika Anda berangkat? <span className="text-red-500">*</span>
              </label>
              <FormControl>
                <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-col space-y-2">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Ya" id="sama-y" />
                    <label htmlFor="sama-y" className="cursor-pointer">a. Ya</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Tidak" id="sama-t" />
                    <label htmlFor="sama-t" className="cursor-pointer">b. Tidak</label>
                  </div>
                </RadioGroup>
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />

        {/* 4. MODA PULANG (Hanya jika NO 3 = TIDAK) */}
        {modaSama === "Tidak" && (
          <FormField
            control={form.control}
            name="modaPulang"
            render={({ field }) => (
              <FormItem className="animate-in fade-in slide-in-from-top-2">
                <label className="font-bold text-base text-slate-900 block mb-2">
                  4. Transportasi utama apa yang akan Anda gunakan untuk pulang? <span className="text-red-500">*</span>
                </label>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className={`h-12 bg-white ${errors.modaPulang ? "border-red-500 bg-red-50" : ""}`}>
                      <SelectValue placeholder="Pilih Transportasi Pulang..." />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {OPS_MODA.map((moda, i) => (
                      <SelectItem key={i} value={moda}>{String.fromCharCode(97 + i)}. {moda}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
        )}

        {/* 5. TAMBAH ORANG */}
        <FormField
          control={form.control}
          name="tambahOrang"
          render={({ field }) => (
            <FormItem>
              <label className="font-bold text-base text-slate-900 block mb-2">
                5. Apakah ada rencana menambah orang pada saat balik kembali? <span className="text-red-500">*</span>
              </label>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className={`h-12 bg-slate-50 ${errors.tambahOrang ? "border-red-500 bg-red-50" : ""}`}>
                    <SelectValue placeholder="Pilih Rencana..." />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Tidak ada">a. Tidak ada tambahan orang</SelectItem>
                  <SelectItem value="1 orang">b. Ada tambahan 1 orang</SelectItem>
                  <SelectItem value="2 orang">c. Ada tambahan 2 orang</SelectItem>
                  <SelectItem value="3 orang">d. Ada tambahan 3 orang</SelectItem>
                  <SelectItem value="4 orang">e. Ada tambahan 4 orang</SelectItem>
                  <SelectItem value="> 4 orang">f. Ada tambahan lebih dari 4 orang</SelectItem>
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