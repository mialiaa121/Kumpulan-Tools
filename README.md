# Generator Brief Konten

Pilih jenis konten, isi brief, klik Generate: ChatGPT terbuka dengan knowledge + brief.

## Menambah tools baru
1. Salin folder `data/_template`, ganti namanya, misalnya `data/Faktaunik`.
2. Isi tiga file di dalamnya:
   - `input.js`: nama, ikon, dan kolom apa saja yang diisi user.
   - `opsi.js`: daftar pilihan untuk kolom bertipe "pilihan" (misalnya gaya visual, jumlah scene).
   - `prompt.js`: kalimat pembuka dan knowledge yang dikirim ke ChatGPT.
3. Simpan (commit). Vercel otomatis deploy, dan tools baru muncul di halaman awal.

Folder atau file di `data/` yang namanya diawali garis bawah (`_`) tidak tampil di aplikasi.

## input.js
- `label`, `description`, `icon`, `order`: tampilan kartu dan urutannya.
- `inputs`: daftar kolom, urutannya = urutan di form. Tiap kolom punya:
  - `label`: tulisan di atas kolom
  - `type`: `teks` (satu baris), `teks-panjang` (kotak besar), atau `pilihan`
  - `wajib: true`: user harus mengisi dulu sebelum bisa klik Generate
  - `opsi`: nama daftar di `opsi.js` (untuk `pilihan`)
  - `placeholder`: tulisan petunjuk. Untuk `pilihan`, ini jadi tulisan awal di dropdown.
  - `isiSendiri: false`: menyembunyikan pilihan "Isi sendiri…" (default tampil)
- Ikon yang tersedia: film, chat, bulb, person, sparkles, book, mic, camera, megaphone, heart, star, pencil, play, smile.

## opsi.js
Tiap daftar boleh berbentuk daftar biasa `["3 scene", "4 scene"]`, atau berkelompok
`{ "3D": ["..."], "2D": ["..."] }`. Menambah pilihan = menambah satu baris teks (jangan lupa koma).

## prompt.js
- `instruction`: kalimat pembuka (opsional).
- `knowledge`: teks knowledge di antara tanda backtick. Kalau teksmu mengandung tanda backtick, `${`, atau `\`, tulis dengan garis miring di depannya.
- Untuk teks panjang, hapus `knowledge` dari `prompt.js` dan taruh teksnya di file `.txt` di folder yang sama. Semua `.txt` / `.md` di folder itu digabung berurutan sesuai nama file (`01-...`, `02-...`).
- `knowledge` juga boleh berupa daftar `[`A`, `B`]` untuk beberapa knowledge yang dikirim berurutan.

## Mengubah judul dan nama brand
Edit `data/_site.md`: `brand`, `tagline`, `title`, `logo`.

## Cara lama (masih jalan)
File `data/nama.md` atau `.txt` dengan baris `fields:` di bagian atas, dan folder berisi banyak `.md`/`.txt`
(dengan `_info.md`) tetap berfungsi. Daftar pilihannya ada di `data/_opsi/*.txt`.
Disarankan pindah ke cara baru di atas.

## Jalankan lokal (opsional)
    npm install
    npm run dev

## Deploy
Push ke GitHub, import repo di Vercel. Tidak perlu environment variable.
