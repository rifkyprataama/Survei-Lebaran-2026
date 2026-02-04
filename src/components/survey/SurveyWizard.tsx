"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card" // Update Import
import { ScrollArea } from "@/components/ui/scroll-area"
import { Checkbox } from "@/components/ui/checkbox"
import { Form } from "@/components/ui/form"
import { FileText, ShieldCheck, ChevronRight, ArrowLeft, Send, CheckCircle2 } from "lucide-react" // Tambah Icon CheckCircle2
import { Separator } from "@/components/ui/separator"

// Import Components
import StepOne from "./steps/StepOne"
import StepTwo from "./steps/StepTwo"
import StepThree from "./steps/StepThree" 
import StepFour from "./steps/StepFour"
import StepFive from "./steps/StepFive" 
import StepSix from "./steps/StepSix"
import StepSeven from "./steps/StepSeven" 
import StepEight from "./steps/StepEight" 

// --- GRUP TRANSPORTASI ---
const TRANS_UMUM = ["Pesawat", "Kereta Api", "Kereta Cepat", "KRL/LRT", "Bus", "Kapal Laut", "Kapal Penyeberangan"]
const TRANS_PRIBADI_MOBIL = ["Mobil Travel", "Mobil Sewa", "Taksi Reguler", "Mobil Online", "Mobil Pribadi"] 
const TRANS_PRIBADI_MOTOR = ["Sepeda Motor", "Sepeda"] 
const TRANS_LAINNYA = ["Mudik Gratis", "Lainnya"]

const formSchema = z.object({
  // BAGIAN 1
  usia: z.string().min(1, "Wajib diisi"),
  jenisKelamin: z.string().min(1, "Wajib diisi"),
  pendidikan: z.string().min(1, "Wajib diisi"),
  pekerjaan: z.string().min(1, "Wajib diisi"),
  penghasilan: z.string().min(1, "Wajib diisi"),
  domisiliProv: z.string().min(1, "Wajib diisi"),
  domisiliKota: z.string().min(1, "Wajib diisi"),
  rencanaMudik: z.enum(["Ya", "Tidak"]),
  
  // BAGIAN 2
  alasanTidakMudik: z.string().optional(),

  // BAGIAN 3
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

  // BAGIAN 4
  jalurMotor: z.string().optional(), 
  jalurMobil: z.string().optional(), 
  namaTol: z.string().optional(),    
  diskonTol: z.string().optional(),  
  rekayasaLalin: z.string().optional(), 
  rencanaIstirahat: z.string().optional(), 
  lokasiRestArea: z.string().optional(),   
  mediaTol: z.string().optional(),   
  kebiasaanIstirahat: z.string().optional(), 
  durasiIstirahat: z.string().optional(),    
  biayaBBM: z.string().optional(),           

  // BAGIAN 5
  transportKeTerminal: z.string().optional(),
  transportDariTerminal: z.string().optional(),
  waktuBeliTiket: z.string().optional(),
  modaAlternatif: z.string().optional(),

  // BAGIAN 6
  tanggalPulang: z.string().optional(),
  jamPulang: z.string().optional(),
  modaSama: z.enum(["Ya", "Tidak"]).optional(), 
  modaPulang: z.string().optional(), 
  tambahOrang: z.string().optional(),

  // BAGIAN 7
  faktorBatal: z.string().optional(),
  persepsiWFA: z.string().optional(), 
  pilihanKebijakan: z.string().optional(),
  pilihanTanggalWFA: z.string().optional(),
  ubahHariBerangkat: z.string().optional(), 
  tanggalBerangkatBaru: z.string().optional(),
  pilihanWFApasca: z.string().optional(),
  ubahHariPulang: z.string().optional(), 
  tanggalPulangBaru: z.string().optional(),

  // BAGIAN 8
  libur2025: z.string().min(1, "Wajib diisi"), 
  persepsi2025: z.string().optional(), 
  saran: z.string().min(5, "Saran wajib diisi minimal 5 karakter"),
  pilihanReward: z.string().min(1, "Wajib pilih reward"),
  sumberInfo: z.string().min(1, "Wajib diisi"),
  bersediaResponden: z.string().min(1, "Wajib diisi"),
  nomorWA: z.string().min(9, "Nomor WA minimal 9 digit"),
})

type FormValues = z.infer<typeof formSchema>

export default function SurveyWizard() {
  const [step, setStep] = useState(0)
  const [isAgreed, setIsAgreed] = useState(false)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      usia: "", jenisKelamin: "", pendidikan: "", pekerjaan: "", penghasilan: "",
      domisiliProv: "", domisiliKota: "", rencanaMudik: undefined, alasanTidakMudik: "",
      jumlahOrang: "", alasanPerjalanan: "", tujuanProvinsi: "", tujuanKota: "",
      tanggalPergi: "", jamPergi: "", lamaDiTujuan: "", totalDana: "", pertimbanganModa: "", modaTransportasi: "",
      jalurMotor: "", jalurMobil: "", namaTol: "", diskonTol: "", rekayasaLalin: "",
      rencanaIstirahat: "", lokasiRestArea: "", mediaTol: "",
      kebiasaanIstirahat: "", durasiIstirahat: "", biayaBBM: "",
      transportKeTerminal: "", transportDariTerminal: "", waktuBeliTiket: "", modaAlternatif: "",
      tanggalPulang: "", jamPulang: "", modaSama: undefined, modaPulang: "", tambahOrang: "",
      faktorBatal: "", persepsiWFA: "", pilihanKebijakan: "", pilihanTanggalWFA: "",
      ubahHariBerangkat: "", tanggalBerangkatBaru: "", pilihanWFApasca: "",
      ubahHariPulang: "", tanggalPulangBaru: "",
      libur2025: undefined, persepsi2025: "", saran: "", pilihanReward: "", sumberInfo: "", bersediaResponden: undefined, nomorWA: ""
    },
  })

  // LOGIKA NAVIGASI
  const handleNextStep1 = async () => {
    const isValid = await form.trigger(["usia", "jenisKelamin", "pendidikan", "pekerjaan", "penghasilan", "domisiliProv", "domisiliKota", "rencanaMudik"])
    if (isValid) {
      const values = form.getValues()
      if (values.usia === "≤ 14 Tahun") return 
      window.scrollTo(0, 0)
      form.getValues("rencanaMudik") === "Tidak" ? setStep(2) : setStep(3)
    }
  }

  const handleNextStep2 = async () => {
    const alasan = form.getValues("alasanTidakMudik")
    if (!alasan) { form.setError("alasanTidakMudik", { type: "manual", message: "Wajib diisi" }); return }
    window.scrollTo(0, 0)
    setStep(8) 
  }

  const handleNextStep3 = async () => {
    const fieldsStep3: (keyof FormValues)[] = ["jumlahOrang", "alasanPerjalanan", "tujuanProvinsi", "tujuanKota", "tanggalPergi", "jamPergi", "lamaDiTujuan", "totalDana", "pertimbanganModa", "modaTransportasi"]
    let isAllValid = true
    fieldsStep3.forEach((field) => {
        const value = form.getValues(field)
        if(field==="tujuanKota" && form.getValues("tujuanProvinsi")==="Luar Negeri") return;
        if (!value) { form.setError(field, { type: "manual", message: "Wajib diisi" }); isAllValid = false; }
    })
    if (!isAllValid) return 

    const moda = form.getValues("modaTransportasi")
    window.scrollTo(0, 0)
    if (moda && TRANS_UMUM.includes(moda)) { setStep(5); return }
    if (moda && (TRANS_PRIBADI_MOBIL.includes(moda) || TRANS_PRIBADI_MOTOR.includes(moda))) { setStep(4); return }
    if (moda && TRANS_LAINNYA.includes(moda)) { setStep(6); return }
    setStep(6) 
  }

  const handleNextStep4 = async () => {
    const moda = form.getValues("modaTransportasi")
    const isMotor = moda && TRANS_PRIBADI_MOTOR.includes(moda)
    let isValid = true

    if (isMotor) {
        if (!form.getValues("jalurMotor")) { form.setError("jalurMotor", { type: "manual", message: "Wajib diisi" }); isValid = false; }
    } else {
        const jalur = form.getValues("jalurMobil")
        if (!jalur) { form.setError("jalurMobil", { type: "manual", message: "Wajib diisi" }); isValid = false; }
        if (jalur === "Jalan Tol") {
            const tolFields: (keyof FormValues)[] = ["namaTol", "diskonTol", "rekayasaLalin", "rencanaIstirahat", "mediaTol"]
            tolFields.forEach(f => { if(!form.getValues(f)) { form.setError(f, { type: "manual", message: "Wajib diisi" }); isValid = false; } })
            if (form.getValues("rencanaIstirahat") === "Ya" && !form.getValues("lokasiRestArea")) {
                 form.setError("rencanaIstirahat", { type: "manual", message: "Lokasi wajib diisi" }); isValid = false;
            }
        }
    }
    const commonFields: (keyof FormValues)[] = ["kebiasaanIstirahat", "durasiIstirahat", "biayaBBM"]
    commonFields.forEach(f => { if (!form.getValues(f)) { form.setError(f, { type: "manual", message: "Wajib diisi" }); isValid = false; } })
    if (!isValid) return
    window.scrollTo(0, 0); setStep(6);
  }

  const handleNextStep5 = async () => {
    const fieldsStep5: (keyof FormValues)[] = ["transportKeTerminal", "transportDariTerminal", "waktuBeliTiket", "modaAlternatif"]
    let isValid = true
    fieldsStep5.forEach(f => { if(!form.getValues(f)) { form.setError(f, { type: "manual", message: "Wajib diisi" }); isValid = false } })
    if(!isValid) return
    window.scrollTo(0, 0); setStep(6);
  }

  const handleNextStep6 = async () => {
    const basicFields: (keyof FormValues)[] = ["tanggalPulang", "jamPulang", "modaSama", "tambahOrang"]
    let isValid = true
    basicFields.forEach(f => { if(!form.getValues(f)) { form.setError(f, { type: "manual", message: "Wajib diisi" }); isValid = false } })
    if (form.getValues("modaSama") === "Tidak" && !form.getValues("modaPulang")) { form.setError("modaPulang", { type: "manual", message: "Wajib diisi" }); isValid = false }
    if (!isValid) return
    window.scrollTo(0, 0); setStep(7);
  }

  const handleNextStep7 = async () => {
    let isValid = true
    const wajib = ["faktorBatal", "persepsiWFA"] as (keyof FormValues)[]
    wajib.forEach(f => { if(!form.getValues(f)) { form.setError(f, { type: "manual", message: "Wajib diisi" }); isValid = false } })
    if(!isValid) return

    const persepsi = form.getValues("persepsiWFA")
    if (persepsi === "Tidak Setuju") { window.scrollTo(0,0); setStep(8); return }

    const lanjutan = ["pilihanKebijakan", "pilihanTanggalWFA", "ubahHariBerangkat", "pilihanWFApasca", "ubahHariPulang"] as (keyof FormValues)[]
    lanjutan.forEach(f => { if(!form.getValues(f)) { form.setError(f, { type: "manual", message: "Wajib diisi" }); isValid = false } })
    if (form.getValues("ubahHariBerangkat") === "Ya" && !form.getValues("tanggalBerangkatBaru")) { form.setError("tanggalBerangkatBaru", { type: "manual", message: "Wajib diisi" }); isValid = false }
    if (form.getValues("ubahHariPulang") === "Ya" && !form.getValues("tanggalPulangBaru")) { form.setError("tanggalPulangBaru", { type: "manual", message: "Wajib diisi" }); isValid = false }
    if(!isValid) return
    window.scrollTo(0,0); setStep(8);
  }

  // --- FINAL SUBMIT (KIRIM KE SERVER DATABASE) ---
  const handleFinalSubmit = async () => {
    // 1. Validasi Input Terakhir (Bagian 8)
    const commonFields = ["libur2025", "saran", "pilihanReward", "sumberInfo", "bersediaResponden", "nomorWA"] as (keyof FormValues)[]
    let isValid = true
    const validationResults = await form.trigger(commonFields)
    if (!validationResults) isValid = false

    // Validasi Kondisional Bagian 8
    if (form.getValues("libur2025") === "Ya" && !form.getValues("persepsi2025")) {
        form.setError("persepsi2025", { type: "manual", message: "Wajib diisi" })
        isValid = false
    }

    if (!isValid) {
        // Scroll ke error pertama jika ada
        const firstError = document.querySelector('.text-red-500')
        if(firstError) firstError.scrollIntoView({ behavior: 'smooth', block: 'center' })
        return
    }

    // 2. Ambil Semua Data Formulir
    const finalData = form.getValues()
    
    try {
        // 3. Kirim Data ke API Server (POST)
        const response = await fetch('/api/survei', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(finalData),
        })

        if (!response.ok) {
            throw new Error("Gagal menyimpan data ke server")
        }

        console.log("SUKSES SIMPAN KE DATABASE")
        
        // 4. Pindah ke Halaman Sukses
        window.scrollTo(0,0)
        setStep(9) 

    } catch (error) {
        console.error("Error saving survey:", error)
        alert("Terjadi kesalahan saat menyimpan data. Mohon periksa koneksi internet Anda dan coba lagi.")
    }
  }

  const handleBack = () => {
    window.scrollTo(0,0)
    const currentModa = form.getValues("modaTransportasi")
    
    if (step === 8) { 
        if (form.getValues("rencanaMudik") === "Tidak") { setStep(2); return; }
        setStep(7); return 
    }
    if (step === 7) { setStep(6); return }
    if (step === 6) {
        if (currentModa && TRANS_LAINNYA.includes(currentModa)) { setStep(3) } 
        else if (currentModa && TRANS_UMUM.includes(currentModa)) { setStep(5) } 
        else { setStep(4) }
        return
    }
    if (step === 5) { setStep(3); return; } 
    if (step === 4) { setStep(3); return; } 
    if (step === 3) { setStep(1); return; } 
    setStep((prev) => prev - 1)
  }

  // --- RENDER PERSETUJUAN (STEP 0) ---
  if (step === 0) {
    return (
      <Card className="border-t-[8px] border-blue-800 shadow-xl h-[90vh] flex flex-col overflow-hidden bg-white">
        <CardHeader className="pb-4 border-b bg-slate-50/80 backdrop-blur shrink-0 space-y-1">
          <div className="flex items-center justify-center gap-2 mb-1"><div className="bg-blue-100 p-2 rounded-full"><FileText className="w-6 h-6 text-blue-800" /></div></div>
          <p className="text-xs font-bold text-center text-blue-800 tracking-wider uppercase">Kementerian Perhubungan RI</p>
          <CardTitle className="text-lg md:text-xl font-bold text-center text-slate-900 leading-snug">Survei Angkutan Lebaran 2026</CardTitle>
          <p className="text-xs text-center text-slate-500 font-medium">Badan Kebijakan Transportasi</p>
        </CardHeader>
        <ScrollArea className="flex-1 w-full p-0 bg-white">
          <div className="p-6 text-sm text-slate-700 leading-relaxed space-y-6">
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

  // --- RENDER HALAMAN SUKSES (STEP 9) ---
  if (step === 9) {
    return (
        <Card className="border-t-[8px] border-green-600 shadow-2xl h-[80vh] flex flex-col items-center justify-center bg-white animate-in zoom-in-95 duration-500">
            <CardContent className="text-center space-y-6 p-10">
                <div className="flex justify-center">
                    <div className="bg-green-100 p-4 rounded-full">
                        <CheckCircle2 className="w-20 h-20 text-green-600" />
                    </div>
                </div>
                <div className="space-y-2">
                    <h2 className="text-2xl font-bold text-slate-900">Terima Kasih!</h2>
                    <p className="text-slate-600 text-lg">Jawaban Anda telah berhasil kami simpan.</p>
                </div>
                <p className="text-sm text-slate-500 max-w-md mx-auto">
                    Partisipasi Anda sangat berharga dalam membantu kami menyusun rencana operasi Angkutan Lebaran 2026 yang lebih baik.
                </p>
                <div className="pt-6">
                    <Button 
                        onClick={() => window.location.reload()} 
                        variant="outline" 
                        className="border-green-600 text-green-700 hover:bg-green-50"
                    >
                        Kembali ke Halaman Awal
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
  }

  return (
    <Form {...form}>
      <form className="space-y-6 pb-20">
        
        <Button type="button" variant="ghost" size="sm" onClick={handleBack} className="text-slate-500 hover:text-blue-700 pl-0 -ml-2 mb-2">
          <ArrowLeft className="w-4 h-4 mr-1" /> {step === 1 ? "Kembali ke Persetujuan" : "Kembali"}
        </Button>

        {step === 1 && (<><StepOne form={form} /><div className="pt-4"><Button type="button" onClick={handleNextStep1} className="w-full h-12 text-lg font-bold bg-blue-800 hover:bg-blue-900 shadow-lg">Lanjut</Button></div></>)}
        {step === 2 && (<><StepTwo form={form} /><div className="pt-4"><Button type="button" onClick={handleNextStep2} className="w-full h-12 text-lg font-bold bg-blue-800 hover:bg-blue-900 shadow-lg">Lanjut ke Bagian 8</Button></div></>)}
        {step === 3 && (<><StepThree form={form} /><div className="pt-4"><Button type="button" onClick={handleNextStep3} className="w-full h-12 text-lg font-bold bg-blue-800 hover:bg-blue-900 shadow-lg">Lanjut</Button></div></>)}
        {step === 4 && (<><StepFour form={form} /><div className="pt-4"><Button type="button" onClick={handleNextStep4} className="w-full h-12 text-lg font-bold bg-blue-800 hover:bg-blue-900 shadow-lg">Lanjut ke Bagian 6</Button></div></>)}
        {step === 5 && (<><StepFive form={form} /><div className="pt-4"><Button type="button" onClick={handleNextStep5} className="w-full h-12 text-lg font-bold bg-blue-800 hover:bg-blue-900 shadow-lg">Lanjut ke Bagian 6</Button></div></>)}
        {step === 6 && (<><StepSix form={form} /><div className="pt-4"><Button type="button" onClick={handleNextStep6} className="w-full h-12 text-lg font-bold bg-blue-800 hover:bg-blue-900 shadow-lg">Lanjut ke Bagian 7</Button></div></>)}
        {step === 7 && (<><StepSeven form={form} /><div className="pt-4"><Button type="button" onClick={handleNextStep7} className="w-full h-12 text-lg font-bold bg-blue-800 hover:bg-blue-900 shadow-lg">Lanjut ke Bagian 8</Button></div></>)}
        
        {step === 8 && (
          <>
             <StepEight form={form} />
             <div className="pt-4">
                <Button 
                    type="button" 
                    onClick={handleFinalSubmit} 
                    className="w-full h-12 text-lg font-bold bg-green-700 hover:bg-green-800 shadow-lg text-white"
                >
                    <Send className="w-5 h-5 mr-2" />
                    Kirim Survei
                </Button>
             </div>
          </>
        )}

      </form>
    </Form>
  )
}