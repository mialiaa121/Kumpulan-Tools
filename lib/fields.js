// Kolom form yang sama untuk semua jenis konten.
export const fields = [
  {
    name: "topik",
    label: "Topik atau ide konten",
    type: "textarea",
    placeholder: "Tulis ide, topik, atau kebutuhan kontenmu di sini",
    required: true,
  },
  {
    name: "durasi",
    label: "Durasi video",
    type: "select",
    options: ["15 detik", "30 detik", "60 detik"],
  },
  {
    name: "catatan",
    label: "Catatan tambahan",
    type: "textarea",
    placeholder: "Contoh: gaya bahasa santai, target penonton remaja",
  },
];
