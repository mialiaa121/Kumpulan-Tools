// INPUT: kolom apa saja yang diisi user untuk tools ini.
// Lihat data/_template/input.js untuk penjelasan tiap baris.

export default {
  label: "Talking Head",
  description: "",
  cover: "",
  order: 3,

  inputs: [
  {
    "name": "script",
    "label": "Script",
    "type": "teks-panjang",
    "wajib": true,
    "placeholder": "Tulis scriptnya di sini"
  },
  {
    "name": "scene",
    "label": "Durasi perscene",
    "type": "pilihan",
    "opsi": "Durasi 1 Scene",
    "placeholder": ""
  }
],
};
