// ===========================================================================
// TEMPLATE TOOLS BARU
// Cara pakai: salin seluruh folder _template, ganti nama foldernya
// (misalnya "Faktaunik"), lalu isi tiga file di dalamnya.
// Folder yang namanya diawali garis bawah (_) tidak tampil di aplikasi.
// ===========================================================================

// INPUT: kolom apa saja yang diisi user untuk tools ini.

export default {
  // Nama di kartu pilihan
  label: "Nama Tools Baru",

  // Penjelasan singkat di halaman brief
  description: "Penjelasan singkat tentang tools ini.",

  // Gambar sampul kartu (opsional). Taruh gambarnya di folder public/covers/,
  // lalu tulis nama filenya. Rasio terbaik 16:9. Kalau baris ini tidak ada,
  // sampul dibuat otomatis dari nama tools.
  // cover: "nama-gambar.jpg",

  // Warna sampul otomatis (kode hex, opsional). Default ungu.
  // color: "#4C8DF0",

  // Urutan tampil di halaman awal (angka kecil di atas)
  order: 5,

  // Daftar kolom, urutannya = urutan di form.
  // type: "teks" (satu baris), "teks-panjang" (kotak besar), atau "pilihan"
  // wajib: true  -> user harus mengisi dulu sebelum bisa klik Generate
  // opsi: nama daftar di opsi.js (hanya untuk type "pilihan")
  // isiSendiri: false -> menyembunyikan pilihan "Isi sendiri…" (default: tampil)
  inputs: [
    {
      name: "topik",
      label: "Topik atau tema cerita",
      type: "teks-panjang",
      wajib: true,
      placeholder: "Tulis topik atau tema ceritanya di sini",
    },
    {
      name: "gaya",
      label: "Gaya visual",
      type: "pilihan",
      opsi: "gayaVisual",
      placeholder: "Pilih gaya visual",
    },
    {
      name: "scene",
      label: "Jumlah scene",
      type: "pilihan",
      opsi: "jumlahScene",
      placeholder: "Pilih jumlah scene",
    },
  ],
};
