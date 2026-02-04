"use client"

import { FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { UseFormReturn } from "react-hook-form"

// Opsi Tanggal Berangkat Baru (Mulai Jumat 13 Maret)
const TGL_BERANGKAT_BARU = [
  "Jumat, 13 Maret 2026", "Sabtu, 14 Maret 2026", "Minggu, 15 Maret 2026",
  "Senin, 16 Maret 2026", "Selasa, 17 Maret 2026", "Rabu, 18 Maret 2026",
  "Kamis, 19 Maret 2026", "Jumat, 20 Maret 2026"
]

// Opsi Tanggal Pulang Baru (Mulai Senin 23 Maret)
const TGL_PULANG_BARU = [
  "Senin, 23 Maret 2026", "Selasa, 24 Maret 2026", "Rabu, 25 Maret 2026",
  "Kamis, 26 Maret 2026", "Jumat, 27 Maret 2026", "Sabtu, 28 Maret 2026",
  "Minggu, 29 Maret 2026", "Setelah tanggal 29 Maret"
]

interface StepProps {
  form: UseFormReturn<any>
}

export default function StepSeven({ form }: StepProps) {
  const { errors } = form.formState
  
  // Watchers untuk logika tampil/sembunyi
  const persepsiWFA = form.watch("persepsiWFA")
  const ubahBerangkat = form.watch("ubahHariBerangkat")
  const ubahPulang = form.watch("ubahHariPulang")

  return (
    <Card className="border-t-[6px] border-blue-600 shadow-sm animate-in fade-in slide-in-from-right duration-500">
      <CardHeader>
        <CardTitle>Evaluasi & Faktor WFA</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">

        {/* 1. FAKTOR PEMBATALAN */}
        <FormField
          control={form.control}
          name="faktorBatal"
          render={({ field }) => (
            <FormItem>
              <label className="font-bold text-base text-slate-900 block mb-2">
                1. Hal apa yang paling memengaruhi Anda membatalkan perjalanan? <span className="text-red-500">*</span>
              </label>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className={`h-12 bg-slate-50 ${errors.faktorBatal ? "border-red-500 bg-red-50" : ""}`}>
                    <SelectValue placeholder="Pilih Faktor Utama..." />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Ekonomi">a. Tidak punya biaya/ekonomi kurang mendukung</SelectItem>
                  <SelectItem value="Cuti">b. Tidak mendapat cuti/Tidak WFA</SelectItem>
                  <SelectItem value="Cuaca">c. Cuaca buruk atau kurang mendukung</SelectItem>
                  <SelectItem value="Politik">d. Situasi politik kurang mendukung</SelectItem>
                  <SelectItem value="Wabah">e. Adanya wabah penyakit menular</SelectItem>
                  <SelectItem value="Bencana">f. Adanya musibah/bencana alam</SelectItem>
                  <SelectItem value="Lainnya">g. Lainnya</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />

        {/* 2. PERSEPSI WFA (GATEKEEPER) */}
        <FormField
          control={form.control}
          name="persepsiWFA"
          render={({ field }) => (
            <FormItem className="space-y-3 p-4 bg-slate-50 rounded-lg border border-slate-200">
              <label className="font-bold text-base text-slate-900 block">
                2. Bagaimana persepsi anda apabila pemerintah memberlakukan WFA atau cuti bersama? <span className="text-red-500">*</span>
              </label>
              <FormControl>
                <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-col space-y-2">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Setuju" id="wfa-y" />
                    <label htmlFor="wfa-y" className="cursor-pointer">a. Setuju</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Tidak Setuju" id="wfa-t" />
                    <label htmlFor="wfa-t" className="cursor-pointer">b. Tidak Setuju</label>
                  </div>
                </RadioGroup>
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />

        {/* --- BLOK PERTANYAAN LANJUTAN (HANYA JIKA SETUJU) --- */}
        {persepsiWFA === "Setuju" && (
          <div className="space-y-6 border-l-4 border-blue-200 pl-4 ml-1">
            
            {/* 3. PILIHAN KEBIJAKAN */}
            <FormField
              control={form.control}
              name="pilihanKebijakan"
              render={({ field }) => (
                <FormItem>
                  <label className="font-bold text-base text-slate-900 block mb-2">
                    3. Kebijakan mana yang Anda pilih untuk mengendalikan pergerakan? <span className="text-red-500">*</span>
                  </label>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className={`h-12 bg-white ${errors.pilihanKebijakan ? "border-red-500 bg-red-50" : ""}`}>
                        <SelectValue placeholder="Pilih Kebijakan..." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Tambah Cuti">a. Penambahan cuti bersama</SelectItem>
                      <SelectItem value="WFA">b. Pemberlakuan WFA</SelectItem>
                      <SelectItem value="Lainnya">c. Lainnya</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />

            {/* 4. TANGGAL WFA PRE-LEBARAN */}
            <FormField
              control={form.control}
              name="pilihanTanggalWFA"
              render={({ field }) => (
                <FormItem>
                  <label className="font-bold text-base text-slate-900 block mb-2">
                    4. Apabila diberlakukan WFA sebelum lebaran, tanggal berapa pilihan anda? <span className="text-red-500">*</span>
                  </label>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className={`h-12 bg-white ${errors.pilihanTanggalWFA ? "border-red-500 bg-red-50" : ""}`}>
                        <SelectValue placeholder="Pilih Tanggal..." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="16 Maret">a. Mulai Senin, 16 Maret 2026</SelectItem>
                      <SelectItem value="17 Maret">b. Mulai Selasa, 17 Maret 2026</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />

            {/* 5. UBAH HARI BERANGKAT */}
            <FormField
              control={form.control}
              name="ubahHariBerangkat"
              render={({ field }) => (
                <FormItem>
                  <label className="font-bold text-base text-slate-900 block mb-2">
                    5. Apakah Anda akan mengubah hari keberangkatan jika WFA diberlakukan? <span className="text-red-500">*</span>
                  </label>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className={`h-12 bg-white ${errors.ubahHariBerangkat ? "border-red-500 bg-red-50" : ""}`}>
                        <SelectValue placeholder="Pilih Jawaban..." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Tidak">a. Tidak</SelectItem>
                      <SelectItem value="Ya">b. Ya (Pilih tanggal baru)</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />

            {/* 5b. TANGGAL BERANGKAT BARU (CONDITIONAL) */}
            {ubahBerangkat === "Ya" && (
                <FormField
                control={form.control}
                name="tanggalBerangkatBaru"
                render={({ field }) => (
                    <FormItem className="bg-blue-50 p-3 rounded">
                    <label className="font-semibold text-sm text-blue-900 block mb-2">
                        Pilih Tanggal Keberangkatan Baru: <span className="text-red-500">*</span>
                    </label>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                        <SelectTrigger className="bg-white"><SelectValue placeholder="Pilih Tanggal..." /></SelectTrigger>
                        </FormControl>
                        <SelectContent>
                        {TGL_BERANGKAT_BARU.map((tgl) => <SelectItem key={tgl} value={tgl}>{tgl}</SelectItem>)}
                        </SelectContent>
                    </Select>
                    <FormMessage className="text-red-500" />
                    </FormItem>
                )}
                />
            )}

            {/* 6. WFA PASCA LEBARAN */}
            <FormField
              control={form.control}
              name="pilihanWFApasca"
              render={({ field }) => (
                <FormItem>
                  <label className="font-bold text-base text-slate-900 block mb-2">
                    6. Apabila diberlakukan WFA setelah lebaran, tanggal berapa pilihan anda? <span className="text-red-500">*</span>
                  </label>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className={`h-12 bg-white ${errors.pilihanWFApasca ? "border-red-500 bg-red-50" : ""}`}>
                        <SelectValue placeholder="Pilih Opsi..." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="25 Maret">a. Rabu 25 Maret 2026 (1 hari)</SelectItem>
                      <SelectItem value="25-26 Maret">b. Rabu 25 & Kamis 26 Maret 2026 (2 hari)</SelectItem>
                      <SelectItem value="25-27 Maret">c. Rabu 25 s.d Jumat 27 Maret 2026 (3 hari)</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />

            {/* 7. UBAH HARI PULANG */}
            <FormField
              control={form.control}
              name="ubahHariPulang"
              render={({ field }) => (
                <FormItem>
                  <label className="font-bold text-base text-slate-900 block mb-2">
                    7. Apakah Anda akan mengubah hari kepulangan jika WFA diberlakukan? <span className="text-red-500">*</span>
                  </label>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className={`h-12 bg-white ${errors.ubahHariPulang ? "border-red-500 bg-red-50" : ""}`}>
                        <SelectValue placeholder="Pilih Jawaban..." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Tidak">a. Tidak</SelectItem>
                      <SelectItem value="Ya">b. Ya (Pilih tanggal baru)</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />

            {/* 7b. TANGGAL PULANG BARU (CONDITIONAL) */}
            {ubahPulang === "Ya" && (
                <FormField
                control={form.control}
                name="tanggalPulangBaru"
                render={({ field }) => (
                    <FormItem className="bg-blue-50 p-3 rounded">
                    <label className="font-semibold text-sm text-blue-900 block mb-2">
                        Pilih Tanggal Kepulangan Baru: <span className="text-red-500">*</span>
                    </label>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                        <SelectTrigger className="bg-white"><SelectValue placeholder="Pilih Tanggal..." /></SelectTrigger>
                        </FormControl>
                        <SelectContent>
                        {TGL_PULANG_BARU.map((tgl) => <SelectItem key={tgl} value={tgl}>{tgl}</SelectItem>)}
                        </SelectContent>
                    </Select>
                    <FormMessage className="text-red-500" />
                    </FormItem>
                )}
                />
            )}

          </div>
        )}

      </CardContent>
    </Card>
  )
}