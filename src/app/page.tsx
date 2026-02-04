import SurveyWizard from "@/components/survey/SurveyWizard"; 

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 flex flex-col items-center py-6 px-4 font-sans">
      
      {/* Container Utama */}
      <div className="w-full max-w-md space-y-6">
        
        {/* CATATAN PENTING:
          Progress Bar & Header "Persiapan 2026" telah dipindahkan ke dalam 
          komponen <SurveyWizard />.
          
          Hal ini dilakukan agar bar bisa bergerak otomatis (dinamis) 
          mengikuti state 'step' yang ada di dalam Wizard tersebut.
        */}

        {/* Panggil Komponen Otak Survei */}
        <SurveyWizard />

        {/* Footer Copyright */}
        <div className="text-center py-6 text-xs text-slate-400">
          Badan Kebijakan Transportasi © 2026
        </div>

      </div>
    </main>
  );
}