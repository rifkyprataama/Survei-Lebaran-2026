"use client"

import { useEffect, useState } from "react"
import { FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { UseFormReturn } from "react-hook-form"
import { PROVINSI, getKotaByProvinsi } from "@/lib/wilayah-data"

interface StepProps {
  form: UseFormReturn<any>
}

export default function StepThree({ form }: StepProps) {
  // Logic untuk Kota Tujuan (Dynamic Dropdown)
  const provTujuan = form.watch("tujuanProvinsi")
  const [listKotaTujuan, setListKotaTujuan] = useState<string[]>([])
  const { errors } = form.formState

  // Update list kota saat provinsi tujuan dipilih
  useEffect(() => {
    if (provTujuan) {
      setListKotaTujuan(getKotaByProvinsi(provTujuan))
    }
  }, [provTujuan])

  return (
    <Card className="border-t-[6px] border-blue-600 shadow-sm animate-in fade-in slide-in-from-right duration-500">
      <CardHeader>
        <CardTitle>Yang Melakukan Perjalanan</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">

        {/* 1. JUMLAH ORANG */}
        <FormField
          control={form.control}
          name="jumlahOrang"
          render={({ field }) => (
            <FormItem>
              <label className="font-bold text-base text-slate-900 block mb-2">
                1. Berapa jumlah orang yang melakukan perjalanan ke luar kota termasuk Anda? <span className="text-red-500">*</span>
              </label>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className={`h-12 bg-slate-50 ${errors.jumlahOrang ? "border-red-500 bg-red-50" : ""}`}>
                    <SelectValue placeholder="Pilih Jumlah Orang" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="1 orang">a. 1 orang (Anda sendiri)</SelectItem>
                  <SelectItem value="2 orang">b. 2 orang</SelectItem>
                  <SelectItem value="3 orang">c. 3 orang</SelectItem>
                  <SelectItem value="4 orang">d. 4 orang</SelectItem>
                  <SelectItem value="5 orang">e. 5 orang</SelectItem>
                  <SelectItem value="> 5 orang">f. Lebih dari 5 orang</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage className="text-red-500 font-medium" />
            </FormItem>
          )}
        />

        {/* 2. ALASAN PERJALANAN */}
        <FormField
          control={form.control}
          name="alasanPerjalanan"
          render={({ field }) => (
            <FormItem>
              <label className="font-bold text-base text-slate-900 block mb-2">
                2. Alasan melakukan perjalanan ke luar kota pada masa Lebaran Tahun 2026? <span className="text-red-500">*</span>
              </label>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className={`h-12 bg-slate-50 ${errors.alasanPerjalanan ? "border-red-500 bg-red-50" : ""}`}>
                    <SelectValue placeholder="Pilih Alasan..." />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Mudik Idul Fitri">a. Mudik, merayakan Idul Fitri di kampung halaman</SelectItem>
                  <SelectItem value="Mudik Nyepi">b. Mudik, dalam rangka merayakan Hari Raya Nyepi</SelectItem>
                  <SelectItem value="Wisata">c. Memanfaatkan waktu liburan lebaran ke lokasi wisata</SelectItem>
                  <SelectItem value="Mengunjungi Saudara">d. Tradisi mengunjungi orangtua/sanak saudara</SelectItem>
                  <SelectItem value="Dinas">e. Tugas/dinas/pekerjaan</SelectItem>
                  <SelectItem value="Rutin">f. Perjalanan rutin</SelectItem>
                  <SelectItem value="Lainnya">g. Perjalanan Lainnya</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage className="text-red-500 font-medium" />
            </FormItem>
          )}
        />

        {/* 3. DAERAH TUJUAN (PROVINSI & KOTA) */}
        <div className="bg-slate-50 p-5 rounded-lg border border-slate-200 space-y-4">
            <label className="font-bold block text-base text-slate-900">
              3. Daerah tujuan perjalanan Anda? <span className="text-red-500">*</span>
            </label>
            
            {/* Provinsi Tujuan */}
            <FormField
              control={form.control}
              name="tujuanProvinsi"
              render={({ field }) => (
                <FormItem>
                  <label className="text-xs uppercase text-slate-500 font-bold block mb-1.5">Provinsi Tujuan</label>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className={`h-12 bg-white ${errors.tujuanProvinsi ? "border-red-500 bg-red-50" : ""}`}>
                        <SelectValue placeholder="Pilih Provinsi Tujuan..." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="max-h-[250px]">
                      {PROVINSI.map((prov, i) => (
                        <SelectItem key={prov} value={prov}>{i+1}. {prov}</SelectItem>
                      ))}
                      <SelectItem value="Luar Negeri">39. Luar Negeri</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-red-500 font-medium" />
                </FormItem>
              )}
            />

            {/* Kota Tujuan */}
            <FormField
              control={form.control}
              name="tujuanKota"
              render={({ field }) => (
                <FormItem>
                  <label className="text-xs uppercase text-slate-500 font-bold block mb-1.5">Kabupaten / Kota Tujuan</label>
                  <Select 
                    onValueChange={field.onChange} 
                    value={field.value} 
                    disabled={!provTujuan || provTujuan === "Luar Negeri"} 
                  >
                    <FormControl>
                      <SelectTrigger className={`h-12 bg-white ${errors.tujuanKota ? "border-red-500 bg-red-50" : ""}`}>
                        <SelectValue placeholder={provTujuan ? "Pilih Kabupaten/Kota..." : "Pilih Provinsi Dahulu"} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="max-h-[250px]">
                      {listKotaTujuan.map((kota) => (
                        <SelectItem key={kota} value={kota}>{kota}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-red-500 font-medium" />
                </FormItem>
              )}
            />
        </div>

        {/* 4. RENCANA TANGGAL PERGI */}
        <FormField
          control={form.control}
          name="tanggalPergi"
          render={({ field }) => (
            <FormItem>
              <label className="font-bold text-base text-slate-900 block mb-2">
                4. Bila Anda melakukan perjalanan ke luar kota, kapan Anda merencanakan pergi? <span className="text-red-500">*</span>
              </label>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className={`h-12 bg-slate-50 ${errors.tanggalPergi ? "border-red-500 bg-red-50" : ""}`}>
                    <SelectValue placeholder="Pilih Tanggal Berangkat..." />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="max-h-[300px]">
                  <SelectItem value="Sebelum Puasa">Sebelum Bulan Puasa</SelectItem>
                  <SelectItem value="Sebelum H-15">Sebelum H-15 (Bulan Puasa)</SelectItem>
                  <SelectItem value="H-15">H-15, Jumat 6 Maret 2026</SelectItem>
                  <SelectItem value="H-14">H-14, Sabtu 7 Maret 2026</SelectItem>
                  <SelectItem value="H-13">H-13, Minggu 8 Maret 2026</SelectItem>
                  <SelectItem value="H-12">H-12, Senin 9 Maret 2026</SelectItem>
                  <SelectItem value="H-11">H-11, Selasa 10 Maret 2026</SelectItem>
                  <SelectItem value="H-10">H-10, Rabu 11 Maret 2026</SelectItem>
                  <SelectItem value="H-9">H-9, Kamis 12 Maret 2026</SelectItem>
                  <SelectItem value="H-8">H-8, Jum’at 13 Maret 2026</SelectItem>
                  <SelectItem value="H-7">H-7, Sabtu 14 Maret 2026</SelectItem>
                  <SelectItem value="H-6">H-6, Minggu 15 Maret 2026</SelectItem>
                  <SelectItem value="H-5">H-5, Senin 16 Maret 2026</SelectItem>
                  <SelectItem value="H-4">H-4, Selasa 17 Maret 2026</SelectItem>
                  <SelectItem value="H-3">H-3, Rabu 18 Maret 2026</SelectItem>
                  <SelectItem value="H-2">H-2, Kamis 19 Maret 2026</SelectItem>
                  <SelectItem value="H-1">H-1, Jumat 20 Maret 2026</SelectItem>
                  <SelectItem value="H1">H1, Sabtu 21 Maret 2026 (Lebaran 1)</SelectItem>
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
              <FormMessage className="text-red-500 font-medium" />
            </FormItem>
          )}
        />

        {/* 5. JAM BERANGKAT */}
        <FormField
          control={form.control}
          name="jamPergi"
          render={({ field }) => (
            <FormItem>
              <label className="font-bold text-base text-slate-900 block mb-2">
                5. Bila Anda melakukan perjalanan, pukul berapa akan berangkat? <span className="text-red-500">*</span>
              </label>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className={`h-12 bg-slate-50 ${errors.jamPergi ? "border-red-500 bg-red-50" : ""}`}>
                    <SelectValue placeholder="Pilih Waktu Berangkat..." />
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
              <FormMessage className="text-red-500 font-medium" />
            </FormItem>
          )}
        />

        {/* 6. LAMA DI TUJUAN */}
        <FormField
          control={form.control}
          name="lamaDiTujuan"
          render={({ field }) => (
            <FormItem>
              <label className="font-bold text-base text-slate-900 block mb-2">
                6. Berapa lama biasanya Anda berada di kota tujuan pada saat Lebaran 2026? <span className="text-red-500">*</span>
              </label>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className={`h-12 bg-slate-50 ${errors.lamaDiTujuan ? "border-red-500 bg-red-50" : ""}`}>
                    <SelectValue placeholder="Pilih Durasi..." />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="< 4 Jam">a. &lt; 4 Jam</SelectItem>
                  <SelectItem value="4-8 jam">b. &gt; 4 jam s.d 8 jam</SelectItem>
                  <SelectItem value="8-12 jam">c. &gt; 8 jam s.d 12 jam</SelectItem>
                  <SelectItem value="1 hari">d. 1 hari</SelectItem>
                  <SelectItem value="2-4 hari">e. 2-4 hari</SelectItem>
                  <SelectItem value="4-6 hari">f. 4-6 hari</SelectItem>
                  <SelectItem value="Seminggu">g. Seminggu</SelectItem>
                  <SelectItem value="> Seminggu">h. &gt; Seminggu</SelectItem>
                  <SelectItem value="Selama liburan">i. Selama masa liburan lebaran</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage className="text-red-500 font-medium" />
            </FormItem>
          )}
        />

        {/* 7. TOTAL DANA */}
        <FormField
          control={form.control}
          name="totalDana"
          render={({ field }) => (
            <FormItem>
              <label className="font-bold text-base text-slate-900 block mb-2">
                7. Perkiraan total dana yang akan dihabiskan (di luar transportasi)? <span className="text-red-500">*</span>
              </label>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className={`h-12 bg-slate-50 ${errors.totalDana ? "border-red-500 bg-red-50" : ""}`}>
                    <SelectValue placeholder="Pilih Kisaran Biaya..." />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="≤ 1 Juta">a. ≤ Rp. 1.000.000</SelectItem>
                  <SelectItem value="1-3 Juta">b. 1 - 3 Juta</SelectItem>
                  <SelectItem value="3-5 Juta">c. 3 - 5 Juta</SelectItem>
                  <SelectItem value="5-7 Juta">d. 5 - 7 Juta</SelectItem>
                  <SelectItem value="7-10 Juta">e. 7 - 10 Juta</SelectItem>
                  <SelectItem value="10-15 Juta">f. 10 - 15 Juta</SelectItem>
                  <SelectItem value="15-20 Juta">g. 15 - 20 Juta</SelectItem>
                  <SelectItem value="> 20 Juta">h. &gt; Rp. 20.000.000</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage className="text-red-500 font-medium" />
            </FormItem>
          )}
        />

        {/* 8. PERTIMBANGAN MODA */}
        <FormField
          control={form.control}
          name="pertimbanganModa"
          render={({ field }) => (
            <FormItem>
              <label className="font-bold text-base text-slate-900 block mb-2">
                8. Apa pertimbangan utama Anda dalam memilih moda utama? <span className="text-red-500">*</span>
              </label>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className={`h-12 bg-slate-50 ${errors.pertimbanganModa ? "border-red-500 bg-red-50" : ""}`}>
                    <SelectValue placeholder="Pilih Pertimbangan..." />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Biaya terjangkau">a. Biaya terjangkau</SelectItem>
                  <SelectItem value="Tepat waktu">b. Lebih tepat waktu sampai</SelectItem>
                  <SelectItem value="Cepat sampai">c. Lebih cepat sampai</SelectItem>
                  <SelectItem value="Aman nyaman">d. Lebih aman dan nyaman</SelectItem>
                  <SelectItem value="Fleksibel">e. Lebih fleksibel</SelectItem>
                  <SelectItem value="Tidak ada pilihan">f. Tidak ada pilihan transportasi lain</SelectItem>
                  <SelectItem value="Lainnya">g. Lainnya</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage className="text-red-500 font-medium" />
            </FormItem>
          )}
        />

        {/* 9. MODA TRANSPORTASI (LOGIC JUMP) */}
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg space-y-4">
          <FormField
            control={form.control}
            name="modaTransportasi"
            render={({ field }) => (
              <FormItem>
                <label className="font-bold text-base text-blue-900 block mb-2">
                  9. Transportasi utama apa yang akan Anda gunakan? <span className="text-red-500">*</span>
                </label>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className={`h-12 bg-white ${errors.modaTransportasi ? "border-red-500 bg-red-50" : ""}`}>
                      <SelectValue placeholder="Pilih Transportasi Utama..." />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="max-h-[300px]">
                    <SelectItem value="Pesawat">a. Pesawat</SelectItem>
                    <SelectItem value="Kereta Api">b. Kereta Api Antar Kota</SelectItem>
                    <SelectItem value="Kereta Cepat">c. Kereta Cepat</SelectItem>
                    <SelectItem value="KRL/LRT">d. Kereta Commuter (KRL/LRT/KRD)</SelectItem>
                    <SelectItem value="Bus">e. Bus</SelectItem>
                    <SelectItem value="Kapal Laut">f. Kapal Laut/PELNI</SelectItem>
                    <SelectItem value="Kapal Penyeberangan">g. Kapal Penyeberangan/Ferry</SelectItem>
                    <SelectItem value="Mobil Travel">h. Mobil Travel</SelectItem>
                    <SelectItem value="Mobil Sewa">i. Mobil Sewa</SelectItem>
                    <SelectItem value="Taksi Reguler">j. Taksi Reguler</SelectItem>
                    <SelectItem value="Mobil Online">k. Mobil Online/Taksi Online</SelectItem>
                    <SelectItem value="Mobil Pribadi">l. Mobil pribadi</SelectItem>
                    <SelectItem value="Sepeda Motor">m. Sepeda Motor</SelectItem>
                    <SelectItem value="Sepeda">n. Sepeda</SelectItem>
                    <SelectItem value="Mudik Gratis">o. Angkutan Mudik Gratis</SelectItem>
                    <SelectItem value="Lainnya">p. Angkutan lainnya</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage className="text-red-500 font-medium" />
                <p className="text-xs text-blue-800 italic mt-2">
                  *Pilihan Anda di sini akan menentukan pertanyaan selanjutnya.
                </p>
              </FormItem>
            )}
          />
        </div>

      </CardContent>
    </Card>
  )
}