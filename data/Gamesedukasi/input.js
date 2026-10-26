// INPUT: kolom apa saja yang diisi user untuk tools ini.
// Lihat data/_template/input.js untuk penjelasan tiap baris.

export default {
  label: "Game Edukasi CANVA AI",
  description: "",
  cover: "",
  order: 4,

  inputs: [
  {
    "name": "topik",
    "label": "Mau Bikin Apa?",
    "type": "teks-panjang",
    "wajib": true,
    "placeholder": "Tulis topik atau tema gamenya di sini"
  },
  {
    "name": "gaya",
    "label": "Gaya visual",
    "type": "pilihan",
    "opsi": "gayaVisual",
    "placeholder": "Pilih gaya visual"
  },
  {
    "name": "target",
    "label": "Target Usia",
    "type": "pilihan",
    "opsi": "targetusia",
    "placeholder": "Pilih Target Usia"
  }
  {
    "name": "rasio",
    "label": "Format Rasio",
    "type": "pilihan",
    "opsi": "rasio",
    "placeholder": "Pilih Rasio"
    }
],
};
