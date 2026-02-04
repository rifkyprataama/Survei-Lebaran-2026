// src/lib/wilayah-data.ts

// Data 38 Provinsi Indonesia (Update Terbaru)
export const PROVINSI = [
  "Aceh", "Sumatera Utara", "Sumatera Barat", "Riau", "Jambi", "Sumatera Selatan", "Bengkulu", "Lampung", "Kepulauan Bangka Belitung", "Kepulauan Riau",
  "DKI Jakarta", "Jawa Barat", "Jawa Tengah", "DI Yogyakarta", "Jawa Timur", "Banten",
  "Bali", "Nusa Tenggara Barat", "Nusa Tenggara Timur",
  "Kalimantan Barat", "Kalimantan Tengah", "Kalimantan Selatan", "Kalimantan Timur", "Kalimantan Utara",
  "Sulawesi Utara", "Sulawesi Tengah", "Sulawesi Selatan", "Sulawesi Tenggara", "Gorontalo", "Sulawesi Barat",
  "Maluku", "Maluku Utara",
  "Papua", "Papua Barat", "Papua Selatan", "Papua Tengah", "Papua Pegunungan", "Papua Barat Daya"
].sort();

// Data Dummy Kota/Kabupaten untuk Contoh (Karena 514 kota terlalu banyak untuk kode chat)
// Dalam implementasi nyata, bagian ini biasanya diganti API wilayah Indonesia
export const getKotaByProvinsi = (provinsi: string) => {
  if (!provinsi) return [];
  
  // Contoh Data untuk Provinsi Besar (Jawa) agar Anda bisa tes
  if (provinsi === "DKI Jakarta") return ["Jakarta Pusat", "Jakarta Utara", "Jakarta Barat", "Jakarta Selatan", "Jakarta Timur", "Kepulauan Seribu"];
  if (provinsi === "Jawa Barat") return ["Kota Bandung", "Kab. Bandung", "Kota Bekasi", "Kab. Bekasi", "Kota Depok", "Kota Bogor", "Kab. Bogor", "Cimahi", "Sukabumi", "Cirebon"];
  if (provinsi === "Jawa Tengah") return ["Kota Semarang", "Kab. Semarang", "Solo (Surakarta)", "Magelang", "Banyumas", "Tegal", "Pekalongan", "Cilacap"];
  if (provinsi === "Jawa Timur") return ["Kota Surabaya", "Sidoarjo", "Malang", "Banyuwangi", "Jember", "Kediri", "Madiun", "Gresik"];
  
  // Default untuk provinsi lain (Placeholder)
  return [
    `Kota di ${provinsi} (Contoh)`,
    `Kabupaten di ${provinsi} A`,
    `Kabupaten di ${provinsi} B`
  ];
};