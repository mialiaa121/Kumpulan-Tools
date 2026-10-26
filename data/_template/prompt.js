// PROMPT: kalimat pembuka dan knowledge yang dikirim ke ChatGPT.
// Yang dikirim: instruction + knowledge + brief yang diisi user.

export default {
  // (Opsional) Kalimat pembuka. Kalau dihapus, dipakai kalimat standar.
  instruction:
    "Kamu adalah kreator konten. Gunakan knowledge di bawah sebagai acuan utama, lalu buatkan konten sesuai brief.",

  // Knowledge: tempel teksnya di antara dua tanda ` (backtick) di bawah.
  //
  // PENTING: kalau teksmu mengandung tanda ` atau ${ atau \ , tulis dengan
  // garis miring di depannya: \` atau \${ atau \\
  //
  // Cara lebih mudah untuk teks panjang: hapus bagian knowledge ini, lalu
  // taruh teksnya di file .txt di folder yang sama (misalnya knowledge.txt).
  // Semua file .txt / .md di folder ini otomatis digabung berurutan sesuai nama file.
  //
  // Knowledge juga boleh berupa daftar, dikirim berurutan:
  //   knowledge: [`Knowledge A ...`, `Knowledge B ...`],
  knowledge: `
Tempel knowledge-mu di sini.
`,
};
