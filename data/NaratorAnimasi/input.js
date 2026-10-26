// INPUT: kolom apa saja yang diisi user untuk tools ini.
// Lihat data/_template/input.js untuk penjelasan tiap baris.

export default {
  label: "Narator Animasi",
  description: "",
  cover: "",
  order: 3,

  inputs: [
  {
    "name": "topik",
    "label": "Topik atau tema cerita",
    "type": "teks-panjang",
    "wajib": true,
    "placeholder": "Tulis topik atau tema ceritanya di sini"
  },
  {
    "name": "gaya",
    "label": "Gaya visual",
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
  }
],
};
