"use client"

import { FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { UseFormReturn } from "react-hook-form"

interface StepProps {
  form: UseFormReturn<any>
}

export default function StepEight({ form }: StepProps) {
  const { errors } = form.formState
  const libur2025 = form.watch("libur2025") // Watcher untuk logika tampil/sembunyi

  return (
    <Card className="border-t-[6px] border-green-600 shadow-sm animate-in fade-in slide-in-from-right duration-500">
      <CardHeader>
        <CardTitle>Evaluasi & Data Diri</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">

        {/* 1. LIBUR LEBARAN 2025 */}
        <FormField
          control={form.control}
          name="libur2025"
          render={({ field }) => (
            <FormItem className="space-y-3 p-4 bg-slate-50 rounded-lg border border-slate-200">
              <label className="font-bold text-base text-slate-900 block">
                1. Pada masa liburan Lebaran 2025 yang lalu, apakah Anda melakukan perjalanan ke luar kota? <span className="text-red-500">*</span>
              </label>
              <FormControl>
                <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-col space-y-2">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Ya" id="l25-y" />
                    <label htmlFor="l25-y" className="cursor-pointer font-normal">a. Ya</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Tidak" id="l25-t" />
                    <label htmlFor="l25-t" className="cursor-pointer font-normal">b. Tidak</label>
                  </div>
                </RadioGroup>
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />

        {/* 2. PERSEPSI 2025 (Hanya jika NO 1 = YA) */}
        {libur2025 === "Ya" && (
          <FormField
            control={form.control}
            name="persepsi2025"
            render={({ field }) => (
              <FormItem className="animate-in fade-in slide-in-from-top-2 bg-green-50 p-4 rounded-lg border border-green-100">
                <label className="font-bold text-base text-green-900 block mb-2">
                  2. Bagaimana Persepsi Anda tentang pelayanan Angkutan Lebaran 2025? <span className="text-red-500">*</span>
                </label>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger className={`h-12 bg-white ${errors.persepsi2025 ? "border-red-500 bg-red-50" : ""}`}>
                      <SelectValue placeholder="Pilih Penilaian..." />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Sangat Puas">a. Sangat Puas</SelectItem>
                    <SelectItem value="Puas">b. Puas</SelectItem>
                    <SelectItem value="Sedang">c. Sedang</SelectItem>
                    <SelectItem value="Tidak Puas">d. Tidak Puas</SelectItem>
                    <SelectItem value="Sangat Tidak Puas">e. Sangat Tidak Puas</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
        )}

        {/* 3. SARAN */}
        <FormField
          control={form.control}
          name="saran"
          render={({ field }) => (
            <FormItem>
              <label className="font-bold text-base text-slate-900 block mb-2">
                3. Apa Saran Anda untuk pemerintah dalam penyelenggaraan angkutan Lebaran 2026 ini? <span className="text-red-500">*</span>
              </label>
              <FormControl>
                <Textarea 
                  placeholder="Tuliskan saran Anda di sini..." 
                  className={`min-h-[100px] ${errors.saran ? "border-red-500 bg-red-50" : ""}`} 
                  {...field} 
                />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />

        {/* 4. PILIHAN REWARD */}
        <FormField
          control={form.control}
          name="pilihanReward"
          render={({ field }) => (
            <FormItem>
              <label className="font-bold text-base text-slate-900 block mb-2">
                4. Apabila Anda terpilih mendapat reward, dalam bentuk apa yang Anda inginkan? <span className="text-red-500">*</span>
              </label>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className={`h-12 bg-slate-50 ${errors.pilihanReward ? "border-red-500 bg-red-50" : ""}`}>
                    <SelectValue placeholder="Pilih Reward..." />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Pulsa">a. Pulsa</SelectItem>
                  <SelectItem value="GoPay">b. GoPay</SelectItem>
                  <SelectItem value="OVO">c. OVO</SelectItem>
                  <SelectItem value="ShopeePay">d. ShopeePay</SelectItem>
                  <SelectItem value="Dana">e. Dana</SelectItem>
                  <SelectItem value="LinkAja">f. LinkAja</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />

        {/* 5. SUMBER INFO */}
        <FormField
          control={form.control}
          name="sumberInfo"
          render={({ field }) => (
            <FormItem>
              <label className="font-bold text-base text-slate-900 block mb-2">
                5. Lewat media apa, Anda mengetahui link survey ini? <span className="text-red-500">*</span>
              </label>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className={`h-12 bg-slate-50 ${errors.sumberInfo ? "border-red-500 bg-red-50" : ""}`}>
                    <SelectValue placeholder="Pilih Media..." />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="SMS">a. SMS</SelectItem>
                  <SelectItem value="WhatsApp">b. WhatsApp (WA)</SelectItem>
                  <SelectItem value="Instagram">c. Instagram</SelectItem>
                  <SelectItem value="Website">d. Website Badan Kebijakan Transportasi</SelectItem>
                  <SelectItem value="Facebook">e. Facebook (FB)</SelectItem>
                  <SelectItem value="Lainnya">f. Lainnya</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />

        {/* 6. BERSEDIA RESPONDEN */}
        <FormField
          control={form.control}
          name="bersediaResponden"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <label className="font-bold text-base text-slate-900 block">
                6. Jika Kementerian Perhubungan mengadakan survei lagi, apakah anda bersedia menjadi responden? <span className="text-red-500">*</span>
              </label>
              <FormControl>
                <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="flex flex-col space-y-2">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Ya" id="resp-y" />
                    <label htmlFor="resp-y" className="cursor-pointer font-normal">a. Ya</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Tidak" id="resp-t" />
                    <label htmlFor="resp-t" className="cursor-pointer font-normal">b. Tidak</label>
                  </div>
                </RadioGroup>
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />

        {/* 7. NOMOR WA (Input Text) */}
        <FormField
          control={form.control}
          name="nomorWA"
          render={({ field }) => (
            <FormItem>
              <label className="font-bold text-base text-slate-900 block mb-2">
                Nomor WhatsApp (WA): <span className="text-red-500">*</span>
              </label>
              <FormControl>
                <Input 
                  placeholder="08xxxxxxxxxx" 
                  type="number"
                  className={`h-12 ${errors.nomorWA ? "border-red-500 bg-red-50" : ""}`} 
                  {...field} 
                />
              </FormControl>
              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />

        <div className="bg-green-50 border border-green-200 p-4 rounded text-center text-green-800 font-bold text-sm">
          TERIMA KASIH ATAS PARTISIPASI DAN JAWABAN ANDA
        </div>
      </CardContent>
    </Card>
  )
}