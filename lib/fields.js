// Katalog kolom form. Tiap jenis konten memilih kolomnya lewat baris
//   fields: topik, gaya, scene
// di bagian atas file knowledge-nya (urutan di baris itu = urutan di form).
//
// Tipe kolom:
//   text / textarea : isian bebas
//   choice          : pilihan dari daftar (file di data/_opsi/) + opsi "Isi sendiri"

export const defaultFields = "topik, gaya, scene";

export const fieldCatalog = {
  topik: {
    label: "Topik atau tema cerita",
    type: "textarea",
    required: true,
    placeholder: "Tulis topik atau tema ceritanya di sini",
  },
  gaya: {
    label: "Gaya visual",
    type: "choice",
    options: "gaya-visual",
    customPlaceholder: "Tulis gaya visual sendiri",
  },
  scene: {
    label: "Jumlah scene",
    type: "choice",
    options: "jumlah-scene",
    customPlaceholder: "Contoh: 7 scene",
  },
  emosi: {
    label: "Emosi cerita",
    type: "choice",
    options: "emosi",
    customPlaceholder: "Tulis emosi cerita sendiri",
  },
  script: {
    label: "Script",
    type: "textarea",
    required: true,
    rows: 8,
    placeholder: "Tempel script-mu di sini",
  },
  format: {
    label: "Mau dibikin seperti apa videonya",
    type: "textarea",
    placeholder: "Contoh: gaya podcast, latar studio, subtitle kuning, ada B-roll",
  },
  durasi: {
    label: "Durasi video",
    type: "choice",
    options: "durasi",
    customPlaceholder: "Contoh: 45 detik",
  },
  catatan: {
    label: "Catatan tambahan",
    type: "textarea",
    placeholder: "Contoh: gaya bahasa santai, target penonton remaja",
  },
};
