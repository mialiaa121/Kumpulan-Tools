// INPUT: kolom apa saja yang diisi user untuk tools ini.
// Lihat data/_template/input.js untuk penjelasan tiap baris.

export default {
  label: "Series",
  description: "",
  cover: "",
  order: 1,

  inputs: [
  {
    "name": "topik",
    "label": "Topik atau tema cerita",
    "type": "teks-panjang",
    "wajib": true,
    "placeholder": "Contoh: Buah yang diremehkan ternyata menyimpan rahasia besar"
  },
  {
    "name": "tema",
    "label": "tema visual karakter",
    "type": "pilihan",
    "opsi": "temakarakter",
    "placeholder": "Pilih tema karakter"
  },
  {
    "name": "gaya",
    "label": "Gaya visual karakter",
    "type": "pilihan",
    "opsi": "gayaVisual",
    "placeholder": "Pilih gaya visual"
  },
  {
    "name": "scene",
    "label": "Jumlah scene",
    "type": "pilihan",
    "opsi": "jumlahScene",
    "placeholder": "Pilih jumlah scene"
  },
  {
    "name": "emosi",
    "label": "Emosi Utama",
    "type": "pilihan",
    "opsi": "emosiutama",
    "placeholder": "Pilih emosi cerita"
  },
  {
    "name": "ending",
    "label": "Jenis Ending",
    "type": "pilihan",
    "opsi": "jenisending",
    "placeholder": "Pilih ending cerita"
  }


],
};
