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
    options: "3D Pixar Style, 3D Disney Style, 3D DreamWorks Style, 3D Cartoon Style, 3D Realistic Style, 3D Photorealistic Style, 3D Stylized Style, 2D Cartoon Style, 2D Hand-Drawn Style, Anime Style, Chibi Style, Clay Motion Style, Paper Craft Style, Cotton Felt Style, Plush Toy Style, LEGO Style, Stop Motion Style, Puppet Animation Style, Cutout Animation Style, Miniature Diorama Style, Watercolor Illustration Style, Gouache Illustration Style, Storybook Illustration Style, Children’s Book Illustration Style, Flat Vector Style, Comic Book Style, Manga Style, Webtoon Style, Cel-Shaded Style, Low-Poly Style, Voxel Art Style, Pixel Art Style, Isometric 3D Style, Paper Collage Style, Oil Painting Style, Pencil Sketch Style, Crayon Illustration Style, Pastel Illustration Style, Ink Wash Style, Vintage Cartoon Style, Retro Animation Style, Cinematic Realism Style, Hyperrealistic 3D Style, Isi Sendiri",
    customPlaceholder: "",
  },
  scene: {
    label: "Jumlah scene",
    type: "choice",
    options: "5 Scene,6 Scene, 7 Scene, 8 Scene, 9 Scene, 10 Scene, 11 Scene, 12 Scene, Isi Sendiri",
    customPlaceholder: "",
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
