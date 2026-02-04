"use client"

import { FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { UseFormReturn } from "react-hook-form"

// Daftar Tol (Contoh Sederhana)
const DAFTAR_TOL = [
  "Tol Jagorawi", "Tol Jakarta - Cikampek", "Tol Cikopo - Palimanan (Cipali)",
  "Tol Palimanan - Kanci", "Tol Kanci - Pejagan", "Tol Pejagan - Pemalang",
  "Tol Pemalang - Batang", "Tol Batang - Semarang", "Tol Semarang - Solo",
  "Tol Solo - Ngawi", "Tol Ngawi - Kertosono", "Tol Surabaya - Mojokerto",
  "Tol Trans Sumatera (Bakauheni - Palembang)", "Tol Lainnya"
]

const DAFTAR_NON_TOL = [
  "Jalur Lintas Utara Jawa (Pantura)", "Jalur Lintas Selatan Jawa (Pansela)", 
  "Jalur Lintas Tengah Jawa", "Jalur Bogor – Puncak – Cianjur", 
  "Jalur Ciawi – Sukabumi", "Jalur Arteri Lainnya", "Jalur Alternatif Lainnya"
]

interface StepProps {
  form: UseFormReturn<any>
}

export default function StepFour({ form }: StepProps) {
  const { errors } = form.formState
  const moda = form.watch("modaTransportasi") // Cek moda dari Step 3
  const jalurMobil = form.watch("jalurMobil") // Cek apakah lewat tol
  const rencanaIstirahat = form.watch("rencanaIstirahat") // Cek apakah istirahat

  // Cek Grup Transportasi
  const isMotor = ["Sepeda Motor", "Sepeda"].includes(moda)
  const isMobil = !isMotor // Sisanya (Mobil Pribadi, Travel, Sewa, Taksi) dianggap Mobil

  return (
    <Card className="border-t-[6px] border-blue-600 shadow-sm animate-in fade-in slide-in-from-right duration-500">
      <CardHeader>
        <CardTitle>Pengguna Kendaraan Pribadi</CardTitle>
      </CardHeader>
      <CardContent className="space-y-8">

        {/* --- KONDISI A: PENGGUNA MOTOR (NO 1) --- */}
        {isMotor && (
          <FormField
            control={form.control}
            name="jalurMotor"
            render={({ field }) => (
              <FormItem>
                <label className="font-bold text-base text-slate-900 block mb-2">
                  1. Mana Jalur utama yang akan Anda lewati? <span className="text-red-500">*</span>
                </label>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className={`h-12 bg-slate-50 ${errors.jalurMotor ? "border-red-500 bg-red-50" : ""}`}>
                      <SelectValue placeholder="Pilih Jalur..." />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {DAFTAR_NON_TOL.map((jalur) => (
                        <SelectItem key={jalur} value={jalur}>{jalur}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
        )}

        {/* --- KONDISI B: PENGGUNA MOBIL (NO 2) --- */}
        {isMobil && (
          <>
            <FormField
              control={form.control}
              name="jalurMobil"
              render={({ field }) => (
                <FormItem>
                  <label className="font-bold text-base text-slate-900 block mb-2">
                    2. Mana Jalur utama yang akan Anda lewati? <span className="text-red-500">*</span>
                  </label>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className={`h-12 bg-slate-50 ${errors.jalurMobil ? "border-red-500 bg-red-50" : ""}`}>
                        <SelectValue placeholder="Pilih Jalur..." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Jalan Tol" className="font-bold text-blue-700 bg-blue-50">a. Jalan Tol</SelectItem>
                      <SelectItem value="Trans Sumatera">b. Trans Sumatera (Non Tol)</SelectItem>
                      {DAFTAR_NON_TOL.map((jalur, idx) => (
                          <SelectItem key={jalur} value={jalur}>{String.fromCharCode(99 + idx)}. {jalur}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-red-500" />
                </FormItem>
              )}
            />

            {/* SUB-PERTANYAAN JIKA PILIH JALAN TOL */}
            {jalurMobil === "Jalan Tol" && (
              <div className="pl-4 border-l-4 border-blue-200 space-y-6 bg-slate-50/50 p-4 rounded-r-lg">
                
                {/* PILIHAN NAMA TOL */}
                <FormField
                  control={form.control}
                  name="namaTol"
                  render={({ field }) => (
                    <FormItem>
                      <label className="font-semibold text-sm text-slate-700">Ruas Tol Utama:</label>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                           <SelectTrigger className="bg-white"><SelectValue placeholder="Pilih Ruas Tol..." /></SelectTrigger>
                        </FormControl>
                        <SelectContent>
                           {DAFTAR_TOL.map(tol => <SelectItem key={tol} value={tol}>{tol}</SelectItem>)}
                        </SelectContent>
                      </Select>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />

                {/* 19a. DISKON TOL */}
                <FormField
                  control={form.control}
                  name="diskonTol"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <label className="font-bold text-sm text-slate-900">2a. Apabila diberlakukan discount tarif tol, apakah anda akan mengubah jadwal?</label>
                      <RadioGroup onValueChange={field.onChange} defaultValue={field.value}>
                        <div className="flex items-center space-x-2"><RadioGroupItem value="Tidak" id="2a-1"/><label htmlFor="2a-1" className="text-sm">a. Tidak</label></div>
                        <div className="flex items-center space-x-2"><RadioGroupItem value="Ya" id="2a-2"/><label htmlFor="2a-2" className="text-sm">b. Ya, menyesuaikan diskon</label></div>
                      </RadioGroup>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />

                {/* 2b. REKAYASA LALIN */}
                <FormField
                  control={form.control}
                  name="rekayasaLalin"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <label className="font-bold text-sm text-slate-900">2b. Apabila diberlakukan rekayasa lalu lintas (contra flow/one way), apakah anda mengubah jadwal?</label>
                      <RadioGroup onValueChange={field.onChange} defaultValue={field.value}>
                        <div className="flex items-center space-x-2"><RadioGroupItem value="Tidak" id="2b-1"/><label htmlFor="2b-1" className="text-sm">a. Tidak</label></div>
                        <div className="flex items-center space-x-2"><RadioGroupItem value="Ya" id="2b-2"/><label htmlFor="2b-2" className="text-sm">b. Ya, menyesuaikan rekayasa</label></div>
                      </RadioGroup>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />

                {/* 2c. ISTIRAHAT DI TOL */}
                <FormField
                  control={form.control}
                  name="rencanaIstirahat"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <label className="font-bold text-sm text-slate-900">2c. Apakah anda berencana istirahat di rest area tol?</label>
                      <RadioGroup onValueChange={field.onChange} defaultValue={field.value}>
                        <div className="flex items-center space-x-2"><RadioGroupItem value="Tidak" id="2c-1"/><label htmlFor="2c-1" className="text-sm">a. Tidak istirahat</label></div>
                        <div className="flex items-center space-x-2"><RadioGroupItem value="Ya" id="2c-2"/><label htmlFor="2c-2" className="text-sm">b. Ya istirahat</label></div>
                      </RadioGroup>
                      {/* INPUT TEXT JIKA YA */}
                      {rencanaIstirahat === "Ya" && (
                         <Input 
                            placeholder="Sebutkan KM berapa..." 
                            {...form.register("lokasiRestArea")} 
                            className="mt-2 bg-white"
                         />
                      )}
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />

                {/* 2d. MEDIA INFORMASI */}
                <FormField
                  control={form.control}
                  name="mediaTol"
                  render={({ field }) => (
                    <FormItem>
                      <label className="font-bold text-sm text-slate-900">2d. Dari media mana anda tahu info tol?</label>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl><SelectTrigger className="bg-white"><SelectValue placeholder="Pilih Media..." /></SelectTrigger></FormControl>
                        <SelectContent>
                          <SelectItem value="SMS">a. SMS</SelectItem>
                          <SelectItem value="Call Center">b. Call Center</SelectItem>
                          <SelectItem value="WhatsApp">c. WhatsApp (WA)</SelectItem>
                          <SelectItem value="Instagram">d. Instagram</SelectItem>
                          <SelectItem value="Website">e. Website</SelectItem>
                          <SelectItem value="Facebook">f. Facebook (FB)</SelectItem>
                          <SelectItem value="Aplikasi">g. Aplikasi Smartphone</SelectItem>
                          <SelectItem value="Rambu">h. Rambu terpasang</SelectItem>
                          <SelectItem value="Lainnya">i. Lainnya</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
              </div>
            )}
          </>
        )}

        {/* --- PERTANYAAN UMUM (SEMUA TIPE KENDARAAN) --- */}
        
        {/* 3. KEBIASAAN ISTIRAHAT */}
        <FormField
          control={form.control}
          name="kebiasaanIstirahat"
          render={({ field }) => (
            <FormItem>
              <label className="font-bold text-base text-slate-900 block mb-2">
                3. Dalam melakukan perjalanan apakah Anda melakukan istirahat? <span className="text-red-500">*</span>
              </label>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className={`h-12 bg-slate-50 ${errors.kebiasaanIstirahat ? "border-red-500 bg-red-50" : ""}`}>
                    <SelectValue placeholder="Pilih Kebiasaan..." />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Tidak">a. Tidak istirahat</SelectItem>
                  <SelectItem value="< 4 jam">b. Ya, kurang dari 4 jam perjalanan</SelectItem>
                  <SelectItem value="4-6 jam">c. Ya, setelah 4-6 jam perjalanan</SelectItem>
                  <SelectItem value="6-8 jam">d. Ya, setelah 6-8 jam perjalanan</SelectItem>
                  <SelectItem value="8-10 jam">e. Ya, setelah 8-10 jam perjalanan</SelectItem>
                  <SelectItem value="> 10 jam">f. Ya, setelah lebih dari 10 jam</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />

        {/* 4. DURASI ISTIRAHAT */}
        <FormField
          control={form.control}
          name="durasiIstirahat"
          render={({ field }) => (
            <FormItem>
              <label className="font-bold text-base text-slate-900 block mb-2">
                4. Berapa lama biasanya Anda beristirahat di rest area? <span className="text-red-500">*</span>
              </label>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className={`h-12 bg-slate-50 ${errors.durasiIstirahat ? "border-red-500 bg-red-50" : ""}`}>
                    <SelectValue placeholder="Pilih Durasi..." />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="< 30 menit">a. Kurang dari 30 menit</SelectItem>
                  <SelectItem value="30-60 menit">b. 30 menit s.d 1 jam</SelectItem>
                  <SelectItem value="1-2 jam">c. 1 s.d 2 jam</SelectItem>
                  <SelectItem value="> 2 jam">d. Lebih dari 2 jam</SelectItem>
                  <SelectItem value="Tidak istirahat">e. Tidak istirahat</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />

        {/* 5. BIAYA TRANSPORT */}
        <FormField
          control={form.control}
          name="biayaBBM"
          render={({ field }) => (
            <FormItem>
              <label className="font-bold text-base text-slate-900 block mb-2">
                5. Perkiraan biaya transportasi pulang dan pergi (BBM & Tol)? <span className="text-red-500">*</span>
              </label>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className={`h-12 bg-slate-50 ${errors.biayaBBM ? "border-red-500 bg-red-50" : ""}`}>
                    <SelectValue placeholder="Pilih Biaya..." />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="≤ 1 Juta">a. ≤ Rp. 1.000.000</SelectItem>
                  <SelectItem value="1-3 Juta">b. 1 - 3 Juta</SelectItem>
                  <SelectItem value="3-5 Juta">c. 3 - 5 Juta</SelectItem>
                  <SelectItem value="5-7 Juta">d. 5 - 7 Juta</SelectItem>
                  <SelectItem value="7-10 Juta">e. 7 - 10 Juta</SelectItem>
                  <SelectItem value="> 10 Juta">f. &gt; Rp. 10.000.000</SelectItem>
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