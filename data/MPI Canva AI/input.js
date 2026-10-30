// INPUT: kolom apa saja yang diisi user untuk tools ini.
// Lihat data/_template/input.js untuk penjelasan tiap baris.

export default {
  label: "MPI CANVA AI",
  description: "",
  cover: "",
  order: 3,

  inputs: [
  {
    "name": "tema",
    "label": "Tema pembelajaran",
    "type": "teks-panjang",
    "wajib": true,
    "placeholder": ""
  },
  {
    "name": "jenjang",
    "label": "Jenjang & Kelas",
    "type": "teks-panjang",
    "wajib": true,
    "placeholder": " "
  },
  {
    "name": "slide",
    "label": "Jumlah Slide",
    "type": "teks-panjang",
    "wajib": true,
    "placeholder": "11 Slide"
  },
  {
    "name": "struktur",
    "label": "Struktur Slide",
    "type": "teks-panjang",
    "wajib": true,
    "placeholder": "Slide 1 : halaman cover dengan judul.
      Slide 2 : narasi teks dan ajakan untuk belajar 
      Slide 3 : pilihan menu yang terdiri dari tujuan pembelajaran, materi pembelajaran, video dan kuis. 
      Slide 4 : tujuan pembelajaran.
      Slide 5 : materi pembelajaran meliputi pengertian sistem ekskresi 
      Slide 6 : organ-organ sistem ekskresi (ginjal) 
      Slide 7 : organ-organ sistem ekskresi (kulit) 
      Slide 8 : organ-organ sistem ekskresi (paru-paru) 
      Slide 9 : organ-organ sistem ekskresi (hati) 
      Slide 10 : halaman untuk video pembelajaran. 
      Slide 11 : halaman untuk kuis."
  },
  {
    "name": "gaya",
    "label": "Gaya Visual",
    "type": "teks-panjang",
    "wajib": true,
    "placeholder": "3D Soft Plasticky Toy premium dengan tampilan modern, bersih, edukatif, dan menarik untuk siswa SMP."
  },
  {
    "name": "fitur",
    "label": "Fitur Interaktif",
    "type": "teks-panjang",
    "wajib": true,
    "placeholder": "Setiap slide memiliki tombol navigasi Home, Kembali, dan Lanjut dengan bentuk membulat yang konsisten."
  },    
  {
    "name": "tambahan",
    "label": "Intruksi Tambahana",
    "type": "teks-panjang",
    "wajib": true,
    "placeholder": "Semua objek memiliki bentuk membulat, tekstur plastik halus mengilap (glossy), warna cerah, pencahayaan lembut, bayangan halus, serta kualitas render tinggi seperti animasi Pixar. Dominasi warna biru langit, putih, hijau toska, dan biru muda. Tambahkan elemen dekorasi berupa tetesan air, molekul, ikon sains, daun, gelembung, dan partikel cahaya. Rasio 16:9, Resolusi Ultra HD."
  },
],
};
