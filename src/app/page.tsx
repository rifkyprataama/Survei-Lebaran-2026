import { Progress } from "@/components/ui/progress";
import SurveyWizard from "@/components/survey/SurveyWizard"; // Kita panggil komponen otak survei

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 flex flex-col items-center py-6 px-4 font-sans">
      
      {/* Container Utama */}
      <div className="w-full max-w-md space-y-6">
        
        {/* Header Progress: Kita taruh di luar Wizard agar tetap konsisten */}
        <div className="sticky top-0 z-10 bg-slate-50/95 backdrop-blur-sm pt-4 pb-2">
          <div className="flex justify-between text-xs text-slate-500 mb-2 font-medium">
            <span>Survei Angkutan Lebaran</span>
            <span>Persiapan 2026</span>
          </div>
          {/* Progress bar statis dulu, nanti kita bikin dinamis */}
          <Progress value={5} className="h-2" />
        </div>

        {/* INI KUNCINYA: Kita panggil komponen Wizard disini */}
        {/* Komponen ini yang akan menampilkan Halaman Persetujuan (Bagian 0) */}
        <SurveyWizard />

        {/* Footer Copyright */}
        <div className="text-center py-6 text-xs text-slate-400">
          Badan Kebijakan Transportasi © 2026
        </div>

      </div>
    </main>
  );
}