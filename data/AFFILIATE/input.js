// INPUT: kolom apa saja yang diisi user untuk tools ini.
// Lihat data/_template/input.js untuk penjelasan tiap baris.

export default {
  label: "Affiliate AI",
  description: "",
  cover: "",
  order: 5,

  inputs: [
  {
    "name": "nama",
    "label": "Nama dan Deskripsi Produk",
    "type": "teks-panjang",
    "wajib": true,
    "placeholder": ""
  },
  {
    "name": "scene",
    "label": "Jumlah scene",
    "type": "pilihan",
    "opsi": "jumlahScene",
    "placeholder": ""
  },
  {
    "name": "tipe",
    "label": "Tipe Video",
    "type": "pilihan",
    "opsi": "tipevideo",
    "placeholder": "Pilih tipe video yang ingin dibuat"
  }
 ],
};
