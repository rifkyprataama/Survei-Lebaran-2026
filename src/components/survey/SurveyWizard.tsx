"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Checkbox } from "@/components/ui/checkbox"
import { Form } from "@/components/ui/form"
import { FileText, ShieldCheck, ChevronRight, ArrowLeft } from "lucide-react"
import { Separator } from "@/components/ui/separator"

// Import Components
import StepOne from "./steps/StepOne"
import StepTwo from "./steps/StepTwo"
import StepThree from "./steps/StepThree" 

// --- DEFINISI GRUP TRANSPORTASI (Kunci Logika Loncat) ---
const TRANS_UMUM = ["Pesawat", "Kereta Api", "Kereta Cepat", "KRL/LRT", "Bus", "Kapal Laut", "Kapal Penyeberangan"]
// Bagian 4 - Start No 19
const TRANS_PRIBADI_MOBIL = ["Mobil Travel", "Mobil Sewa", "Taksi Reguler", "Mobil Online", "Mobil Pribadi"] 
// Bagian 4 - Start No 18
const TRANS_PRIBADI_MOTOR = ["Sepeda Motor", "Sepeda"] 
const TRANS_LAINNYA = ["Mudik Gratis", "Lainnya"]

const formSchema = z.object({
  // --- BAGIAN 1 ---
  usia: z.string().min(1, "Usia wajib diisi"),
  jenisKelamin: z.string().min(1, "Jenis kelamin wajib diisi"),
  pendidikan: z.string().min(1, "Pendidikan wajib diisi"),
  pekerjaan: z.string().min(1, "Pekerjaan wajib diisi"),
  penghasilan: z.string().min(1, "Penghasilan wajib diisi"),
  domisiliProv: z.string().min(1, "Provinsi wajib diisi"),
  domisiliKota: z.string().min(1, "Kota/Kabupaten wajib diisi"),
  rencanaMudik: z.enum(["Ya", "Tidak"]),
  
  // --- BAGIAN 2 ---
  alasanTidakMudik: z.string().optional(),

  // --- BAGIAN 3 ---
  jumlahOrang: z.string().optional(),
  alasanPerjalanan: z.string().optional(),
  tujuanProvinsi: z.string().optional(),
  tujuanKota: z.string().optional(),
  tanggalPergi: z.string().optional(),
  jamPergi: z.string().optional(),
  lamaDiTujuan: z.string().optional(),
  totalDana: z.string().optional(),
  pertimbanganModa: z.string().optional(),
  modaTransportasi: z.string().optional(),
})

type FormValues = z.infer<typeof formSchema>

export default function SurveyWizard() {
  const [step, setStep] = useState(0)
  const [isAgreed, setIsAgreed] = useState(false)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      usia: "",
      jenisKelamin: "",
      pendidikan: "",
      pekerjaan: "",
      penghasilan: "",
      domisiliProv: "",
      domisiliKota: "",
      rencanaMudik: undefined,
      alasanTidakMudik: "",
      jumlahOrang: "",
      alasanPerjalanan: "",
      tujuanProvinsi: "",
      tujuanKota: "",
      tanggalPergi: "",
      jamPergi: "",
      lamaDiTujuan: "",
      totalDana: "",
      pertimbanganModa: "",
      modaTransportasi: "",
    },
  })

  // LOGIKA NAVIGASI 1 -> 2/3
  const handleNextStep1 = async () => {
    const isValid = await form.trigger([
      "usia", "jenisKelamin", "pendidikan", "pekerjaan", 
      "penghasilan", "domisiliProv", "domisiliKota", "rencanaMudik"
    ])
    
    if (isValid) {
      const values = form.getValues()
      if (values.usia === "≤ 14 Tahun") return 

      window.scrollTo(0, 0)
      if (values.rencanaMudik === "Tidak") {
        setStep(2)
      } else {
        setStep(3)
      }
    }
  }

  // LOGIKA NAVIGASI 2 -> 8
  const handleNextStep2 = async () => {
    const alasan = form.getValues("alasanTidakMudik")
    if (!alasan) {
        form.setError("alasanTidakMudik", { type: "manual", message: "Wajib diisi" })
        return
    }
    window.scrollTo(0, 0)
    alert("Bagian 2 Selesai. Lompat ke Bagian 8.")
  }

  // LOGIKA NAVIGASI 3 -> 4/5/6
  const handleNextStep3 = async () => {
    // 1. Validasi Manual
    const fieldsStep3: (keyof FormValues)[] = [
        "jumlahOrang", "alasanPerjalanan", "tujuanProvinsi", "tujuanKota",
        "tanggalPergi", "jamPergi", "lamaDiTujuan", "totalDana",
        "pertimbanganModa", "modaTransportasi"
    ]
    
    let isAllValid = true
    fieldsStep3.forEach((field) => {
        const value = form.getValues(field)
        if (field === "tujuanKota" && form.getValues("tujuanProvinsi") === "Luar Negeri") return 
        if (!value) {
            form.setError(field, { type: "manual", message: "Wajib diisi" })
            isAllValid = false
        }
    })

    if (!isAllValid) return 

    // 2. Logika Loncat
    const moda = form.getValues("modaTransportasi")
    window.scrollTo(0, 0)

    // A. Angkutan Umum -> Bagian 5
    if (moda && TRANS_UMUM.includes(moda)) {
        setStep(5)
        return
    }

    // B. Mobil/Travel/Taksi -> Bagian 4 (Start No 19)
    if (moda && TRANS_PRIBADI_MOBIL.includes(moda)) {
        setStep(4)
        return
    }

    // C. Motor/Sepeda -> Bagian 4 (Start No 18)
    if (moda && TRANS_PRIBADI_MOTOR.includes(moda)) {
        setStep(4)
        return
    }

    // D. Lainnya -> Bagian 6
    if (moda && TRANS_LAINNYA.includes(moda)) {
        setStep(6)
        return
    }
    
    setStep(6) // Fallback
  }

  // LOGIKA KEMBALI
  const handleBack = () => {
    window.scrollTo(0,0)
    const currentModa = form.getValues("modaTransportasi")

    // Dari Bagian 6
    if (step === 6) {
        if (currentModa && TRANS_LAINNYA.includes(currentModa)) {
            setStep(3) // Kembali ke 3 jika dari jalur "Lainnya"
        } else {
            setStep(5) // Normal flow
        }
        return
    }

    // Dari Bagian 5
    if (step === 5) {
        if (currentModa && TRANS_UMUM.includes(currentModa)) {
            setStep(3) // Kembali ke 3 jika dari jalur "Angkutan Umum"
        } else {
            setStep(4) // Normal flow
        }
        return
    }

    // Dari Bagian 4
    if (step === 4) {
        setStep(3) // Bagian 4 selalu berasal dari Bagian 3
        return
    }

    // Dari Bagian 3
    if (step === 3) {
        setStep(1) // Lewati Bagian 2
        return
    }

    setStep((prev) => prev - 1)
  }

  // --- HELPER UNTUK PLACEHOLDER TEXT ---
  const getPlaceholderText = () => {
    const moda = form.getValues("modaTransportasi")
    
    if (step === 4) {
        if (moda && TRANS_PRIBADI_MOTOR.includes(moda)) {
            return "Anda memilih Motor/Sepeda. Formulir Bagian 4 ini akan dimulai dari Nomor 18."
        }
        if (moda && TRANS_PRIBADI_MOBIL.includes(moda)) {
            return "Anda memilih Mobil/Travel. Formulir Bagian 4 ini akan dimulai dari Nomor 19 (Nomor 18 dilewati)."
        }
    }
    return `Silakan berikan teks soal untuk Bagian ${step}.`
  }

  // --- RENDER ---
  if (step === 0) {
    return (
      <Card className="border-t-[8px] border-blue-800 shadow-xl h-[90vh] flex flex-col overflow-hidden bg-white">
        <CardHeader className="pb-4 border-b bg-slate-50/80 backdrop-blur shrink-0 space-y-1">
          <div className="flex items-center justify-center gap-2 mb-1">
             <div className="bg-blue-100 p-2 rounded-full"><FileText className="w-6 h-6 text-blue-800" /></div>
          </div>
          <p className="text-xs font-bold text-center text-blue-800 tracking-wider uppercase">Kementerian Perhubungan RI</p>
          <CardTitle className="text-lg md:text-xl font-bold text-center text-slate-900 leading-snug">Survei Angkutan Lebaran 2026</CardTitle>
          <p className="text-xs text-center text-slate-500 font-medium">Badan Kebijakan Transportasi</p>
        </CardHeader>
        <ScrollArea className="flex-1 w-full p-0 bg-white">
          <div className="p-6 text-sm text-slate-700 leading-relaxed space-y-6">
            {/* Teks Dokumen Lengkap */}
            <p className="font-semibold text-slate-900">Bapak/Ibu yang terhormat,</p>
            <p className="text-justify">Badan Kebijakan Transportasi Kementerian Perhubungan melakukan survei persepsi masyarakat guna memprakirakan mobilitas masyarakat pada libur Lebaran 2026...</p>
            <Separator className="bg-slate-200" />
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-5 space-y-4 shadow-sm">
              <h3 className="font-bold text-blue-900 text-center text-sm uppercase tracking-wide border-b border-blue-100 pb-3 leading-relaxed">Persetujuan Penggunaan Data Pribadi</h3>
              <p className="text-justify text-xs md:text-sm">Dengan penuh kesadaran dan tanpa paksaan, bersedia secara sukarela untuk memberikan informasi...</p>
              <ol className="list-decimal list-inside space-y-1 ml-1 font-medium text-slate-800 text-xs md:text-sm bg-white p-3 rounded border border-slate-100">
                <li>Nomor telepon</li><li>Kode Provinsi dan Kabupaten</li><li>Usia</li><li>Pekerjaan</li><li>Pendidikan</li><li>Penghasilan</li>
              </ol>
              <p className="text-justify text-xs md:text-sm">Dengan menyetujui halaman ini dan mengklik <strong>"Setuju dan Lanjutkan"</strong>, saya memberikan wewenang...</p>
              <div className="flex gap-3 items-start bg-blue-50/50 p-3 rounded border border-blue-100 mt-2">
                <ShieldCheck className="w-5 h-5 text-blue-700 shrink-0 mt-0.5" />
                <p className="text-xs text-blue-800 italic text-justify">Kemenhub dan Pihak Ketiga memastikan bahwa ketika mentransfer data pribadi ini telah dilakukan enkripsi...</p>
              </div>
            </div>
            <p className="font-semibold text-center text-slate-900 pt-2">Atas partisipasinya, diucapkan terima kasih.</p>
            <div className="h-20"></div>
          </div>
        </ScrollArea>
        <div className="p-5 bg-white border-t border-slate-200 shrink-0 z-10 shadow-[0_-5px_15px_rgba(0,0,0,0.05)]">
           <div className="flex items-start space-x-3 mb-4 p-3 border border-slate-200 rounded-lg bg-slate-50 hover:bg-slate-100 cursor-pointer" onClick={() => setIsAgreed(!isAgreed)}>
             <Checkbox checked={isAgreed} onCheckedChange={(c) => setIsAgreed(!!c)} className="mt-1" />
             <label className="text-sm font-medium">Saya menyetujui persyaratan.</label>
           </div>
           <Button onClick={() => { window.scrollTo(0,0); setStep(1); }} disabled={!isAgreed} className="w-full h-12 bg-blue-800 hover:bg-blue-900 text-white shadow-lg">Setuju dan Lanjutkan</Button>
        </div>
      </Card>
    )
  }

  // --- RENDER FORM ---
  return (
    <Form {...form}>
      <form className="space-y-6 pb-20">
        
        <Button 
            type="button" 
            variant="ghost" 
            size="sm" 
            onClick={handleBack} 
            className="text-slate-500 hover:text-blue-700 pl-0 -ml-2 mb-2"
        >
          <ArrowLeft className="w-4 h-4 mr-1" /> 
          {step === 1 ? "Kembali ke Persetujuan" : "Kembali"}
        </Button>

        {step === 1 && (
          <>
             <StepOne form={form} />
             <div className="pt-4"><Button type="button" onClick={handleNextStep1} className="w-full h-12 text-lg font-bold bg-blue-800 hover:bg-blue-900 shadow-lg">Lanjut</Button></div>
          </>
        )}

        {step === 2 && (
          <>
             <StepTwo form={form} />
             <div className="pt-4"><Button type="button" onClick={handleNextStep2} className="w-full h-12 text-lg font-bold bg-blue-800 hover:bg-blue-900 shadow-lg">Lanjut ke Bagian 8</Button></div>
          </>
        )}

        {step === 3 && (
          <>
             <StepThree form={form} />
             <div className="pt-4"><Button type="button" onClick={handleNextStep3} className="w-full h-12 text-lg font-bold bg-blue-800 hover:bg-blue-900 shadow-lg">Lanjut</Button></div>
          </>
        )}

        {step >= 4 && (
            <Card className="border-t-[6px] border-yellow-500 shadow-sm mt-10">
                <CardHeader><CardTitle>BAGIAN {step} (Sedang Dibuat)</CardTitle></CardHeader>
                <div className="p-6 space-y-4">
                <p className="text-slate-600">
                    Logika navigasi berhasil! Anda diarahkan ke Bagian {step} karena memilih: 
                    <strong> {form.getValues("modaTransportasi")}</strong>.
                </p>
                <div className="p-4 bg-slate-100 rounded border border-slate-200 font-mono text-sm text-blue-800">
                    {getPlaceholderText()}
                </div>
                <Button type="button" onClick={handleBack} variant="outline">Kembali ke Bagian Sebelumnya</Button>
                </div>
            </Card>
        )}

      </form>
    </Form>
  )
}