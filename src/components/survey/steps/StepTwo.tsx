"use client"

import { FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { UseFormReturn } from "react-hook-form"

interface StepProps {
  form: UseFormReturn<any>
}

export default function StepTwo({ form }: StepProps) {
  return (
    <Card className="border-t-[6px] border-blue-600 shadow-sm animate-in fade-in slide-in-from-right duration-500">
      <CardHeader>
        <CardTitle>BAGIAN 2 : Yang Tidak Melakukan Perjalanan</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        
        {/* PERTANYAAN 1 */}
        <FormField
          control={form.control}
          name="alasanTidakMudik"
          render={({ field }) => (
            <FormItem>
              <label className="font-bold text-base text-slate-900 block mb-2">
                1. Apa alasan utama Anda tidak melakukan perjalanan ke luar kota? <span className="text-red-500">*</span>
              </label>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className={`h-12 bg-slate-50 focus:ring-blue-500 ${form.formState.errors.alasanTidakMudik ? "border-red-500 bg-red-50" : ""}`}>
                    <SelectValue placeholder="Pilih Alasan..." />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Tidak punya kampung halaman">a. Tidak punya kampung halaman</SelectItem>
                  <SelectItem value="Tidak punya biaya">b. Tidak punya biaya</SelectItem>
                  <SelectItem value="Tidak mendapat cuti">c. Tidak mendapat cuti</SelectItem>
                  <SelectItem value="Menghindari kemacetan">d. Menghindari kemacetan</SelectItem>
                  <SelectItem value="Cuaca buruk">e. Cuaca buruk atau kurang mendukung</SelectItem>
                  <SelectItem value="Masih bencana">f. Masih dalam kondisi bencana</SelectItem>
                  <SelectItem value="Liburan dalam kota">g. Melakukan perjalanan/liburan di dalam kota</SelectItem>
                  <SelectItem value="Malas">h. Malas kemana mana</SelectItem>
                  <SelectItem value="Tidak merayakan">i. Tidak merayakan lebaran</SelectItem>
                  <SelectItem value="Lainnya">j. Lainnya</SelectItem>
                </SelectContent>
              </Select>
              {/* Ini yang memunculkan teks merah bahasa Indonesia */}
              <FormMessage className="text-red-500 text-sm font-medium" />
            </FormItem>
          )}
        />

      </CardContent>
    </Card>
  )
}