import SurveyWizard from "@/components/survey/SurveyWizard"; 

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 flex flex-col items-center py-6 px-4 font-sans">
      
      {/* Container Utama */}
      <div className="w-full max-w-md space-y-6">

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