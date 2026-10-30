// INPUT: kolom apa saja yang diisi user untuk tools ini.
// Lihat data/_template/input.js untuk penjelasan tiap baris.

export default {
  label: "Game Edukasi AI",
  description: "",
  cover: "",
  order: 3,

  inputs: [
  {
    "name": "topik",
    "label": "Tema atau konsep game",
    "type": "pilihan",
    "opsi": "konsepgame",
    "placeholder": "Pilih konsep game"
  },
  {
    "name": "usia",
    "label": "Target usia",
    "type": "pilihan",
    "opsi": "targetusia",
    "placeholder": "Pilih target usia"
  },
  {
    "name": "gaya",
    "label": "Gaya visual karakter",
    "type": "pilihan",
    "opsi": "gayaVisual",
    "placeholder": "Pilih gaya visual"
  },
  {
    "name": "rasio",
    "label": "Rasio",
    "type": "pilihan",
    "opsi": "rasio",
    "placeholder": "Pilih rasio"
  },
  {
    "name": "karakter",
    "label": "Master Karakter",
    "type": "pilihan",
    "opsi": "masterkarakter",
    "placeholder": "Pilih Master Karakter"
  },
  {
    "name": "level1",
    "label": "Konsep Level 1",
    "type": "pilihan",
    "opsi": "level1",
    "placeholder": "Pilih konsep kuis level 1"
  },
  {
    "name": "level2",
    "label": "Konsep Level 2",
    "type": "pilihan",
    "opsi": "level2",
    "placeholder": "Pilih konsep kuis level 2"
  },
  {
    "name": "level3",
    "label": "Konsep Level 3",
    "type": "pilihan",
    "opsi": "level2",
    "placeholder": "Pilih konsep kuis level 3"
  },
  {
    "name": "level4",
    "label": "Konsep Level 4",
    "type": "pilihan",
    "opsi": "level4",
    "placeholder": "Pilih konsep kuis level 4"
  }
],
};
