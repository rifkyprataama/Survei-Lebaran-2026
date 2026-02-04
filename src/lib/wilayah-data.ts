// src/lib/wilayah-data.ts

// --- 1. DAFTAR 38 PROVINSI (SORTED) ---
export const PROVINSI = [
  "Aceh", "Sumatera Utara", "Sumatera Barat", "Riau", "Jambi", "Sumatera Selatan", "Bengkulu", "Lampung", "Kepulauan Bangka Belitung", "Kepulauan Riau",
  "DKI Jakarta", "Jawa Barat", "Jawa Tengah", "DI Yogyakarta", "Jawa Timur", "Banten",
  "Bali", "Nusa Tenggara Barat", "Nusa Tenggara Timur",
  "Kalimantan Barat", "Kalimantan Tengah", "Kalimantan Selatan", "Kalimantan Timur", "Kalimantan Utara",
  "Sulawesi Utara", "Sulawesi Tengah", "Sulawesi Selatan", "Sulawesi Tenggara", "Gorontalo", "Sulawesi Barat",
  "Maluku", "Maluku Utara",
  "Papua", "Papua Barat", "Papua Selatan", "Papua Tengah", "Papua Pegunungan", "Papua Barat Daya"
].sort();

// --- 2. DATA KOTA/KABUPATEN (MAPPING) ---
const DATA_KOTA: Record<string, string[]> = {
  // SUMATERA
  "Aceh": ["Kota Banda Aceh", "Kota Sabang", "Kota Lhokseumawe", "Kota Langsa", "Kota Subulussalam", "Kab. Aceh Besar", "Kab. Pidie", "Kab. Bireuen", "Kab. Aceh Utara", "Kab. Aceh Timur", "Kab. Aceh Tengah", "Kab. Aceh Barat", "Kab. Aceh Selatan", "Kab. Aceh Tenggara", "Kab. Simeulue", "Kab. Aceh Singkil", "Kab. Bener Meriah", "Kab. Pidie Jaya", "Kab. Gayo Lues", "Kab. Nagan Raya", "Kab. Aceh Jaya", "Kab. Aceh Barat Daya", "Kab. Aceh Tamiang"],
  "Sumatera Utara": ["Kota Medan", "Kota Binjai", "Kota Pematangsiantar", "Kota Tebing Tinggi", "Kota Tanjungbalai", "Kota Sibolga", "Kota Padangsidimpuan", "Kota Gunungsitoli", "Kab. Deli Serdang", "Kab. Langkat", "Kab. Karo", "Kab. Simalungun", "Kab. Asahan", "Kab. Labuhanbatu", "Kab. Tapanuli Utara", "Kab. Tapanuli Selatan", "Kab. Tapanuli Tengah", "Kab. Nias", "Kab. Mandailing Natal", "Kab. Toba", "Kab. Samosir", "Kab. Serdang Bedagai", "Kab. Batubara", "Kab. Padang Lawas", "Kab. Labuhanbatu Utara", "Kab. Labuhanbatu Selatan", "Kab. Nias Selatan", "Kab. Nias Utara", "Kab. Nias Barat", "Kab. Pakpak Bharat", "Kab. Humbang Hasundutan"],
  "Sumatera Barat": ["Kota Padang", "Kota Bukittinggi", "Kota Payakumbuh", "Kota Solok", "Kota Sawahlunto", "Kota Padang Panjang", "Kota Pariaman", "Kab. Agam", "Kab. Tanah Datar", "Kab. Padang Pariaman", "Kab. Lima Puluh Kota", "Kab. Pasaman", "Kab. Pasaman Barat", "Kab. Pesisir Selatan", "Kab. Solok", "Kab. Solok Selatan", "Kab. Sijunjung", "Kab. Dharmasraya", "Kab. Kepulauan Mentawai"],
  "Riau": ["Kota Pekanbaru", "Kota Dumai", "Kab. Kampar", "Kab. Indragiri Hulu", "Kab. Indragiri Hilir", "Kab. Pelalawan", "Kab. Siak", "Kab. Rokan Hulu", "Kab. Rokan Hilir", "Kab. Bengkalis", "Kab. Kuantan Singingi", "Kab. Kepulauan Meranti"],
  "Jambi": ["Kota Jambi", "Kota Sungai Penuh", "Kab. Batanghari", "Kab. Bungo", "Kab. Kerinci", "Kab. Merangin", "Kab. Muaro Jambi", "Kab. Sarolangun", "Kab. Tanjung Jabung Barat", "Kab. Tanjung Jabung Timur", "Kab. Tebo"],
  "Sumatera Selatan": ["Kota Palembang", "Kota Lubuklinggau", "Kota Pagar Alam", "Kota Prabumulih", "Kab. Banyuasin", "Kab. Empat Lawang", "Kab. Lahat", "Kab. Muara Enim", "Kab. Musi Banyuasin", "Kab. Musi Rawas", "Kab. Ogan Ilir", "Kab. Ogan Komering Ilir", "Kab. Ogan Komering Ulu", "Kab. Penukal Abab Lematang Ilir"],
  "Bengkulu": ["Kota Bengkulu", "Kab. Bengkulu Selatan", "Kab. Bengkulu Tengah", "Kab. Bengkulu Utara", "Kab. Kaur", "Kab. Kepahiang", "Kab. Lebong", "Kab. Mukomuko", "Kab. Rejang Lebong", "Kab. Seluma"],
  "Lampung": ["Kota Bandar Lampung", "Kota Metro", "Kab. Lampung Barat", "Kab. Lampung Selatan", "Kab. Lampung Tengah", "Kab. Lampung Timur", "Kab. Lampung Utara", "Kab. Mesuji", "Kab. Pesawaran", "Kab. Pesisir Barat", "Kab. Pringsewu", "Kab. Tanggamus", "Kab. Tulang Bawang", "Kab. Way Kanan"],
  "Kepulauan Bangka Belitung": ["Kota Pangkalpinang", "Kab. Bangka", "Kab. Bangka Barat", "Kab. Bangka Selatan", "Kab. Bangka Tengah", "Kab. Belitung", "Kab. Belitung Timur"],
  "Kepulauan Riau": ["Kota Tanjungpinang", "Kota Batam", "Kab. Bintan", "Kab. Karimun", "Kab. Kepulauan Anambas", "Kab. Lingga", "Kab. Natuna"],

  // JAWA
  "DKI Jakarta": ["Jakarta Pusat", "Jakarta Utara", "Jakarta Barat", "Jakarta Selatan", "Jakarta Timur", "Kepulauan Seribu"],
  "Jawa Barat": ["Kota Bandung", "Kota Bekasi", "Kota Bogor", "Kota Cimahi", "Kota Cirebon", "Kota Depok", "Kota Sukabumi", "Kota Tasikmalaya", "Kota Banjar", "Kab. Bandung", "Kab. Bandung Barat", "Kab. Bekasi", "Kab. Bogor", "Kab. Ciamis", "Kab. Cianjur", "Kab. Cirebon", "Kab. Garut", "Kab. Indramayu", "Kab. Karawang", "Kab. Kuningan", "Kab. Majalengka", "Kab. Pangandaran", "Kab. Purwakarta", "Kab. Subang", "Kab. Sukabumi", "Kab. Sumedang", "Kab. Tasikmalaya"],
  "Jawa Tengah": ["Kota Semarang", "Kota Surakarta (Solo)", "Kota Tegal", "Kota Pekalongan", "Kota Salatiga", "Kota Magelang", "Kab. Banjarnegara", "Kab. Banyumas", "Kab. Batang", "Kab. Blora", "Kab. Boyolali", "Kab. Brebes", "Kab. Cilacap", "Kab. Demak", "Kab. Grobogan", "Kab. Jepara", "Kab. Karanganyar", "Kab. Kebumen", "Kab. Kendal", "Kab. Klaten", "Kab. Kudus", "Kab. Magelang", "Kab. Pati", "Kab. Pekalongan", "Kab. Pemalang", "Kab. Purbalingga", "Kab. Purworejo", "Kab. Rembang", "Kab. Semarang", "Kab. Sragen", "Kab. Sukoharjo", "Kab. Tegal", "Kab. Temanggung", "Kab. Wonogiri", "Kab. Wonosobo"],
  "DI Yogyakarta": ["Kota Yogyakarta", "Kab. Bantul", "Kab. Gunungkidul", "Kab. Kulon Progo", "Kab. Sleman"],
  "Jawa Timur": ["Kota Surabaya", "Kota Malang", "Kota Madiun", "Kota Kediri", "Kota Mojokerto", "Kota Pasuruan", "Kota Probolinggo", "Kota Batu", "Kota Blitar", "Kab. Banyuwangi", "Kab. Blitar", "Kab. Bojonegoro", "Kab. Bondowoso", "Kab. Gresik", "Kab. Jember", "Kab. Jombang", "Kab. Kediri", "Kab. Lamongan", "Kab. Lumajang", "Kab. Madiun", "Kab. Magetan", "Kab. Malang", "Kab. Mojokerto", "Kab. Nganjuk", "Kab. Ngawi", "Kab. Pacitan", "Kab. Pamekasan", "Kab. Pasuruan", "Kab. Ponorogo", "Kab. Probolinggo", "Kab. Sampang", "Kab. Sidoarjo", "Kab. Situbondo", "Kab. Sumenep", "Kab. Trenggalek", "Kab. Tuban", "Kab. Tulungagung"],
  "Banten": ["Kota Serang", "Kota Cilegon", "Kota Tangerang", "Kota Tangerang Selatan", "Kab. Lebak", "Kab. Pandeglang", "Kab. Serang", "Kab. Tangerang"],

  // BALI & NUSA TENGGARA
  "Bali": ["Kota Denpasar", "Kab. Badung", "Kab. Bangli", "Kab. Buleleng", "Kab. Gianyar", "Kab. Jembrana", "Kab. Karangasem", "Kab. Klungkung", "Kab. Tabanan"],
  "Nusa Tenggara Barat": ["Kota Mataram", "Kota Bima", "Kab. Bima", "Kab. Dompu", "Kab. Lombok Barat", "Kab. Lombok Tengah", "Kab. Lombok Timur", "Kab. Lombok Utara", "Kab. Sumbawa", "Kab. Sumbawa Barat"],
  "Nusa Tenggara Timur": ["Kota Kupang", "Kab. Alor", "Kab. Belu", "Kab. Ende", "Kab. Flores Timur", "Kab. Kupang", "Kab. Lembata", "Kab. Malaka", "Kab. Manggarai", "Kab. Manggarai Barat", "Kab. Manggarai Timur", "Kab. Nagekeo", "Kab. Ngada", "Kab. Rote Ndao", "Kab. Sabu Raijua", "Kab. Sikka", "Kab. Sumba Barat", "Kab. Sumba Barat Daya", "Kab. Sumba Tengah", "Kab. Sumba Timur", "Kab. Timor Tengah Selatan", "Kab. Timor Tengah Utara"],

  // KALIMANTAN
  "Kalimantan Barat": ["Kota Pontianak", "Kota Singkawang", "Kab. Bengkayang", "Kab. Kapuas Hulu", "Kab. Kayong Utara", "Kab. Ketapang", "Kab. Kubu Raya", "Kab. Landak", "Kab. Melawi", "Kab. Mempawah", "Kab. Sambas", "Kab. Sanggau", "Kab. Sekadau", "Kab. Sintang"],
  "Kalimantan Tengah": ["Kota Palangka Raya", "Kab. Barito Selatan", "Kab. Barito Timur", "Kab. Barito Utara", "Kab. Gunung Mas", "Kab. Kapuas", "Kab. Katingan", "Kab. Kotawaringin Barat", "Kab. Kotawaringin Timur", "Kab. Lamandau", "Kab. Murung Raya", "Kab. Pulang Pisau", "Kab. Seruyan", "Kab. Sukamara"],
  "Kalimantan Selatan": ["Kota Banjarmasin", "Kota Banjarbaru", "Kab. Balangan", "Kab. Banjar", "Kab. Barito Kuala", "Kab. Hulu Sungai Selatan", "Kab. Hulu Sungai Tengah", "Kab. Hulu Sungai Utara", "Kab. Kotabaru", "Kab. Tabalong", "Kab. Tanah Bumbu", "Kab. Tanah Laut", "Kab. Tapin"],
  "Kalimantan Timur": ["Kota Samarinda", "Kota Balikpapan", "Kota Bontang", "Kab. Berau", "Kab. Kutai Barat", "Kab. Kutai Kartanegara", "Kab. Kutai Timur", "Kab. Mahakam Ulu", "Kab. Paser", "Kab. Penajam Paser Utara"],
  "Kalimantan Utara": ["Kota Tarakan", "Kab. Bulungan", "Kab. Malinau", "Kab. Nunukan", "Kab. Tana Tidung"],

  // SULAWESI
  "Sulawesi Utara": ["Kota Manado", "Kota Bitung", "Kota Kotamobagu", "Kota Tomohon", "Kab. Bolaang Mongondow", "Kab. Kepulauan Sangihe", "Kab. Kepulauan Siau Tagulandang Biaro", "Kab. Kepulauan Talaud", "Kab. Minahasa", "Kab. Minahasa Selatan", "Kab. Minahasa Tenggara", "Kab. Minahasa Utara"],
  "Sulawesi Tengah": ["Kota Palu", "Kab. Banggai", "Kab. Banggai Kepulauan", "Kab. Banggai Laut", "Kab. Buol", "Kab. Donggala", "Kab. Morowali", "Kab. Morowali Utara", "Kab. Parigi Moutong", "Kab. Poso", "Kab. Sigi", "Kab. Tojo Una-Una", "Kab. Tolitoli"],
  "Sulawesi Selatan": ["Kota Makassar", "Kota Parepare", "Kota Palopo", "Kab. Bantaeng", "Kab. Barru", "Kab. Bone", "Kab. Bulukumba", "Kab. Enrekang", "Kab. Gowa", "Kab. Jeneponto", "Kab. Kepulauan Selayar", "Kab. Luwu", "Kab. Luwu Timur", "Kab. Luwu Utara", "Kab. Maros", "Kab. Pangkajene dan Kepulauan", "Kab. Pinrang", "Kab. Sidenreng Rappang", "Kab. Sinjai", "Kab. Soppeng", "Kab. Takalar", "Kab. Tana Toraja", "Kab. Toraja Utara", "Kab. Wajo"],
  "Sulawesi Tenggara": ["Kota Kendari", "Kota Baubau", "Kab. Bombana", "Kab. Buton", "Kab. Buton Selatan", "Kab. Buton Tengah", "Kab. Buton Utara", "Kab. Kolaka", "Kab. Kolaka Timur", "Kab. Kolaka Utara", "Kab. Konawe", "Kab. Konawe Kepulauan", "Kab. Konawe Selatan", "Kab. Konawe Utara", "Kab. Muna", "Kab. Muna Barat", "Kab. Wakatobi"],
  "Gorontalo": ["Kota Gorontalo", "Kab. Boalemo", "Kab. Bone Bolango", "Kab. Gorontalo", "Kab. Gorontalo Utara", "Kab. Pohuwato"],
  "Sulawesi Barat": ["Kab. Majene", "Kab. Mamasa", "Kab. Mamuju", "Kab. Mamuju Tengah", "Kab. Pasangkayu", "Kab. Polewali Mandar"],

  // MALUKU & PAPUA
  "Maluku": ["Kota Ambon", "Kota Tual", "Kab. Buru", "Kab. Buru Selatan", "Kab. Kepulauan Aru", "Kab. Kepulauan Tanimbar", "Kab. Maluku Barat Daya", "Kab. Maluku Tengah", "Kab. Maluku Tenggara", "Kab. Seram Bagian Barat", "Kab. Seram Bagian Timur"],
  "Maluku Utara": ["Kota Ternate", "Kota Tidore Kepulauan", "Kab. Halmahera Barat", "Kab. Halmahera Tengah", "Kab. Halmahera Timur", "Kab. Halmahera Selatan", "Kab. Halmahera Utara", "Kab. Kepulauan Sula", "Kab. Pulau Morotai", "Kab. Pulau Taliabu"],
  
  // PAPUA (WILAYAH PEMEKARAN BARU)
  "Papua": ["Kota Jayapura", "Kab. Jayapura", "Kab. Keerom", "Kab. Sarmi", "Kab. Mamberamo Raya", "Kab. Waropen", "Kab. Kepulauan Yapen", "Kab. Biak Numfor", "Kab. Supiori"],
  "Papua Barat": ["Kab. Fakfak", "Kab. Kaimana", "Kab. Manokwari", "Kab. Manokwari Selatan", "Kab. Pegunungan Arfak", "Kab. Teluk Bintuni", "Kab. Teluk Wondama"],
  "Papua Selatan": ["Kab. Merauke", "Kab. Boven Digoel", "Kab. Mappi", "Kab. Asmat"],
  "Papua Tengah": ["Kab. Nabire", "Kab. Puncak Jaya", "Kab. Paniai", "Kab. Mimika", "Kab. Puncak", "Kab. Dogiyai", "Kab. Intan Jaya", "Kab. Deiyai"],
  "Papua Pegunungan": ["Kab. Jayawijaya", "Kab. Pegunungan Bintang", "Kab. Yahukimo", "Kab. Tolikara", "Kab. Mamberamo Tengah", "Kab. Yalimo", "Kab. Lanny Jaya", "Kab. Nduga"],
  "Papua Barat Daya": ["Kota Sorong", "Kab. Sorong", "Kab. Sorong Selatan", "Kab. Raja Ampat", "Kab. Tambrauw", "Kab. Maybrat"]
};

// --- 3. HELPER FUNCTION ---
export const getKotaByProvinsi = (provinsi: string): string[] => {
  if (!provinsi) return [];
  
  // Ambil dari Mapping di atas, jika tidak ada kembalikan array kosong
  return DATA_KOTA[provinsi] || [];
};