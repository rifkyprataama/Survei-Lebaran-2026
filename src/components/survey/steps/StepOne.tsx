"use client"

import { useEffect, useState } from "react"
import { FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { UseFormReturn } from "react-hook-form"
import { 
  AlertDialog, 
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogHeader, 
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogAction 
} from "@/components/ui/alert-dialog"
import { PROVINSI, getKotaByProvinsi } from "@/lib/wilayah-data"

interface StepProps {
  form: UseFormReturn<any>
}

export default function StepOne({ form }: StepProps) {
  const usia = form.watch("usia")
  const provinsi = form.watch("domisiliProv")
  const [listKota, setListKota] = useState<string[]>([])
  const [showStopAlert, setShowStopAlert] = useState(false)
  const { errors } = form.formState // Ambil state error untuk styling merah

  // Efek: Logika Stop Usia
  useEffect(() => {
    if (usia === "≤ 14 Tahun") {
      setShowStopAlert(true)
    } else {
      setShowStopAlert(false)
    }
  }, [usia])

  // Efek: Ambil Kota saat Provinsi berubah
  useEffect(() => {
    if (provinsi) {
      setListKota(getKotaByProvinsi(provinsi))
    }
  }, [provinsi])

  const handleResetUsia = () => {
    form.setValue("usia", "") 
    setShowStopAlert(false)   
  }

  return (
    <>
      <AlertDialog open={showStopAlert} onOpenChange={setShowStopAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-red-600 font-bold">Mohon Maaf</AlertDialogTitle>
            <AlertDialogDescription className="text-slate-600">
              Batas usia minimal responden belum memenuhi syarat. 
              Survei ini ditujukan untuk responden berusia 15 tahun ke atas.
              <br/><br/>
              Silakan klik tombol di bawah untuk mengulang.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={handleResetUsia} className="bg-red-600 hover:bg-red-700 text-white">
              Kembali / Koreksi Pilihan
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Card className="border-t-[6px] border-blue-600 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
        <CardHeader>
          <CardTitle>Karakteristik Responden</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          
          {/* 1. USIA */}
          <FormField
            control={form.control}
            name="usia"
            render={({ field }) => (
              <FormItem>
                <label className="font-bold text-base text-slate-900">
                  1. Berapa usia Anda saat ini? <span className="text-red-500">*</span>
                </label>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className={`h-12 bg-slate-50 focus:ring-blue-500 ${errors.usia ? "border-red-500 bg-red-50" : ""}`}>
                      <SelectValue placeholder="Pilih Usia" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="≤ 14 Tahun">a. ≤ 14 Tahun</SelectItem>
                    <SelectItem value="15 – 19 tahun">b. 15 – 19 tahun</SelectItem>
                    <SelectItem value="20 – 24 tahun">c. 20 – 24 tahun</SelectItem>
                    <SelectItem value="25 – 29 tahun">d. 25 – 29 tahun</SelectItem>
                    <SelectItem value="30 – 34 tahun">e. 30 – 34 tahun</SelectItem>
                    <SelectItem value="35 – 39 tahun">f. 35 – 39 tahun</SelectItem>
                    <SelectItem value="40 – 44 tahun">g. 40 – 44 tahun</SelectItem>
                    <SelectItem value="45 – 49 tahun">h. 45 – 49 tahun</SelectItem>
                    <SelectItem value="55 – 59 tahun">i. 55 – 59 tahun</SelectItem>
                    <SelectItem value="60 – 64 tahun">j. 60 – 64 tahun</SelectItem>
                    <SelectItem value="65 – 69 tahun">k. 65 – 69 tahun</SelectItem>
                    <SelectItem value="70 – 74 tahun">l. 70 – 74 tahun</SelectItem>
                    <SelectItem value="≥ 75 tahun">m. ≥ 75 tahun</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage className="text-red-500 font-medium" />
              </FormItem>
            )}
          />

          {/* 2. JENIS KELAMIN */}
          <FormField
            control={form.control}
            name="jenisKelamin"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <label className="font-bold text-base text-slate-900">
                  2. Jenis kelamin <span className="text-red-500">*</span>
                </label>
                <FormControl>
                  <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="grid grid-cols-2 gap-4">
                    <div className={`flex items-center space-x-2 border p-3 rounded hover:bg-slate-50 cursor-pointer transition-colors has-[:checked]:bg-blue-50 has-[:checked]:border-blue-500 ${errors.jenisKelamin ? "border-red-500 bg-red-50" : ""}`}>
                      <RadioGroupItem value="Perempuan" id="p" className="text-blue-600" />
                      <label htmlFor="p" className="cursor-pointer w-full font-normal text-sm">a. Perempuan</label>
                    </div>
                    <div className={`flex items-center space-x-2 border p-3 rounded hover:bg-slate-50 cursor-pointer transition-colors has-[:checked]:bg-blue-50 has-[:checked]:border-blue-500 ${errors.jenisKelamin ? "border-red-500 bg-red-50" : ""}`}>
                      <RadioGroupItem value="Laki-laki" id="l" className="text-blue-600" />
                      <label htmlFor="l" className="cursor-pointer w-full font-normal text-sm">b. Laki-laki</label>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage className="text-red-500 font-medium" />
              </FormItem>
            )}
          />

          {/* 3. PENDIDIKAN */}
          <FormField
            control={form.control}
            name="pendidikan"
            render={({ field }) => (
              <FormItem>
                <label className="font-bold text-base text-slate-900">
                  3. Pendidikan terakhir Anda? <span className="text-red-500">*</span>
                </label>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className={`h-12 bg-slate-50 focus:ring-blue-500 ${errors.pendidikan ? "border-red-500 bg-red-50" : ""}`}>
                      <SelectValue placeholder="Pilih Pendidikan" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="SD">a. SD/sederajat</SelectItem>
                    <SelectItem value="SMP">b. SMP/sederajat</SelectItem>
                    <SelectItem value="SMA">c. SMA/sederajat</SelectItem>
                    <SelectItem value="D1-D3">d. D1/D2/D3/sederajat</SelectItem>
                    <SelectItem value="S1/D4">e. D4/S1</SelectItem>
                    <SelectItem value="S2/S3">f. S2/S3</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage className="text-red-500 font-medium" />
              </FormItem>
            )}
          />

          {/* 4. PEKERJAAN */}
          <FormField
            control={form.control}
            name="pekerjaan"
            render={({ field }) => (
              <FormItem>
                <label className="font-bold text-base text-slate-900">
                  4. Status pekerjaan Anda saat ini? <span className="text-red-500">*</span>
                </label>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className={`h-12 bg-slate-50 focus:ring-blue-500 ${errors.pekerjaan ? "border-red-500 bg-red-50" : ""}`}>
                      <SelectValue placeholder="Pilih Pekerjaan" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="max-h-[300px]">
                    <SelectItem value="PNS">a. PNS/ASN</SelectItem>
                    <SelectItem value="TNI/POLRI">b. TNI/POLRI</SelectItem>
                    <SelectItem value="BUMN">c. Pegawai BUMN/BUMD</SelectItem>
                    <SelectItem value="Dosen/Guru">d. Tenaga Pendidik Non ASN</SelectItem>
                    <SelectItem value="Swasta Tetap">e. Karyawan Tetap Swasta</SelectItem>
                    <SelectItem value="Swasta Kontrak">f. Pekerja Kontrak Swasta</SelectItem>
                    <SelectItem value="Wiraswasta">g. Wiraswasta/Pedagang/UMKM</SelectItem>
                    <SelectItem value="Digital">h. Pekerja Berbasis Digital (Ojol/Olshop)</SelectItem>
                    <SelectItem value="Freelance">i. Freelancer/Harian</SelectItem>
                    <SelectItem value="PRT">j. Pekerja Rumah Tangga</SelectItem>
                    <SelectItem value="Pensiunan">k. Pensiunan</SelectItem>
                    <SelectItem value="PHK">l. Belum Kerja/PHK</SelectItem>
                    <SelectItem value="Pelajar">m. Pelajar/Mahasiswa</SelectItem>
                    <SelectItem value="IRT">n. Ibu Rumah Tangga</SelectItem>
                    <SelectItem value="Lainnya">o. Lainnya</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage className="text-red-500 font-medium" />
              </FormItem>
            )}
          />

          {/* 5. PENGHASILAN */}
          <FormField
            control={form.control}
            name="penghasilan"
            render={({ field }) => (
              <FormItem>
                <label className="font-bold text-base text-slate-900">
                  5. Berapa penghasilan per bulan saat ini? <span className="text-red-500">*</span>
                </label>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className={`h-12 bg-slate-50 focus:ring-blue-500 ${errors.penghasilan ? "border-red-500 bg-red-50" : ""}`}>
                      <SelectValue placeholder="Rentang Penghasilan" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Tidak punya">a. Tidak punya penghasilan</SelectItem>
                    <SelectItem value="<2.5jt">b. ≤ 2,5 juta</SelectItem>
                    <SelectItem value="2.5-5jt">c. {">"} 2,5 juta s.d. 5 juta</SelectItem>
                    <SelectItem value="5-10jt">d. {">"} 5 juta s.d. 10 juta</SelectItem>
                    <SelectItem value="10-20jt">e. {">"} 10 juta s.d. 20 juta</SelectItem>
                    <SelectItem value="20-30jt">f. {">"} 20 juta s.d. 30 juta</SelectItem>
                    <SelectItem value=">30jt">g. {">"} 30 juta</SelectItem>
                    <SelectItem value="Rahasia">h. Tidak ingin menjawab</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage className="text-red-500 font-medium" />
              </FormItem>
            )}
          />

          {/* 6. WILAYAH (DOMISILI) */}
          <div className="bg-slate-50 p-5 rounded-lg border border-slate-200 space-y-4">
            <label className="font-bold block text-base text-slate-900">
              6. Daerah tempat tinggal/domisili Anda saat ini? <span className="text-red-500">*</span>
            </label>
            
            <FormField
              control={form.control}
              name="domisiliProv"
              render={({ field }) => (
                <FormItem>
                  <label className="text-xs uppercase text-slate-500 font-bold block mb-1.5">Provinsi</label>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className={`h-12 bg-white focus:ring-blue-500 ${errors.domisiliProv ? "border-red-500 bg-red-50" : ""}`}>
                        <SelectValue placeholder="Pilih Provinsi..." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="max-h-[250px]">
                      {PROVINSI.map((prov, i) => (
                        <SelectItem key={prov} value={prov}>{i+1}. {prov}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-red-500 font-medium" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="domisiliKota"
              render={({ field }) => (
                <FormItem>
                  <label className="text-xs uppercase text-slate-500 font-bold block mb-1.5">Kabupaten / Kota</label>
                  <Select 
                    onValueChange={field.onChange} 
                    value={field.value} 
                    disabled={!provinsi} 
                  >
                    <FormControl>
                      <SelectTrigger className={`h-12 bg-white focus:ring-blue-500 ${errors.domisiliKota ? "border-red-500 bg-red-50" : ""}`}>
                        <SelectValue placeholder={provinsi ? "Pilih Kabupaten/Kota..." : "Pilih Provinsi Dahulu"} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="max-h-[250px]">
                      {listKota.map((kota) => (
                        <SelectItem key={kota} value={kota}>{kota}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-red-500 font-medium" />
                </FormItem>
              )}
            />
          </div>

          {/* 7. RENCANA MUDIK */}
          <FormField
            control={form.control}
            name="rencanaMudik"
            render={({ field }) => (
              <FormItem className="space-y-3 pt-6 border-t border-slate-200">
                <label className="font-bold text-base leading-snug text-slate-900">
                  7. Pada masa lebaran 2026 (Idul Fitri 1447 H) nanti, apakah anda berencana akan melakukan perjalanan ke luar kota untuk mudik/liburan? <span className="text-red-500">*</span>
                </label>
                <FormControl>
                  <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="space-y-2 mt-2">
                    <div className={`flex items-center space-x-3 rounded-lg border p-4 hover:bg-slate-50 cursor-pointer transition-all has-[:checked]:bg-blue-50 has-[:checked]:border-blue-500 has-[:checked]:shadow-sm ${errors.rencanaMudik ? "border-red-500 bg-red-50" : ""}`}>
                      <RadioGroupItem value="Ya" id="mudik-y" className="text-blue-700" />
                      <label htmlFor="mudik-y" className="cursor-pointer font-medium w-full font-normal text-slate-700">a. Ya</label>
                    </div>
                    <div className={`flex items-center space-x-3 rounded-lg border p-4 hover:bg-slate-50 cursor-pointer transition-all has-[:checked]:bg-blue-50 has-[:checked]:border-blue-500 has-[:checked]:shadow-sm ${errors.rencanaMudik ? "border-red-500 bg-red-50" : ""}`}>
                      <RadioGroupItem value="Tidak" id="mudik-t" className="text-blue-700" />
                      <label htmlFor="mudik-t" className="cursor-pointer font-medium w-full font-normal text-slate-700">b. Tidak</label>
                    </div>
                  </RadioGroup>
                </FormControl>
                <FormMessage className="text-red-500 font-medium" />
              </FormItem>
            )}
          />
        </CardContent>
      </Card>
    </>
  )
}