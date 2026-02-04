"use server"

import { prisma } from "@/lib/prisma"
import { encrypt } from "@/lib/crypto"
import { revalidatePath } from "next/cache"

// Definisi tipe data yang diterima dari Form
type SurveyData = {
  nomorWA?: string // Ini field 'mentah' yang akan kita cabut
  [key: string]: any // Sisa field lain (usia, pekerjaan, dll)
}

export async function submitSurvey(data: SurveyData) {
  try {
    // 1. Teknik Destructuring:
    // Kita pisahkan 'nomorWA' dari sisa data lainnya (surveyFields)
    // variable 'surveyFields' sekarang bersih, tidak mengandung 'nomorWA' lagi
    const { nomorWA, ...surveyFields } = data

    // 2. Enkripsi Nomor WA (jika ada)
    let encryptedWA = null
    if (nomorWA) {
      encryptedWA = encrypt(nomorWA)
    }

    // 3. Simpan ke Database via Prisma
    const newEntry = await prisma.responden.create({
      data: {
        // Masukkan data enkripsi manual
        nomorWA_encrypted: encryptedWA,
        
        // Masukkan sisa data survei (usia, pekerjaan, dll) yang sudah bersih
        // Pastikan nama-nama field di Form nanti SAMA PERSIS dengan di schema.prisma
        usia: surveyFields.usia, // Wajib ada sesuai schema
        rencanaMudik: surveyFields.rencanaMudik || "Tidak", // Default
        
        // Spread operator untuk sisa field opsional lainnya
        ...surveyFields, 
      },
    })

    console.log("✅ Data tersimpan, ID:", newEntry.id)
    revalidatePath("/") // Refresh cache halaman jika perlu
    return { success: true, message: "Terima kasih! Data berhasil disimpan." }
    
  } catch (error) {
    console.error("❌ Gagal menyimpan:", error)
    return { success: false, message: "Terjadi kesalahan sistem. Coba lagi." }
  }
}