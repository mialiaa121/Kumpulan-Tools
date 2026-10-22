# Generator Brief Konten

Pilih jenis konten, isi brief, klik Generate: ChatGPT terbuka dengan knowledge + brief.

## Menambah knowledge baru (tanpa coding)
1. Buka folder `data/`, buat file baru, misalnya `talkinghead.md`.
2. Isi dengan format ini:

       ---
       label: Talking Head
       description: Skrip untuk video bicara langsung ke kamera.
       color: #2FA37C
       order: 4
       ---
       (tempel knowledge-mu di sini)

3. Simpan (commit). Vercel otomatis deploy, dan pilihan baru muncul di halaman awal.

Keterangan:
- `label`: nama yang tampil di tombol pilihan.
- `description`: penjelasan singkat di bawah nama.
- `color`: warna aksen (kode hex).
- `order`: urutan tampil (angka kecil di atas). Boleh dihapus.
- Semua yang ada di bawah garis `---` kedua adalah knowledge.

## Kalau knowledge banyak (beberapa file, semua ikut terkirim)
1. Buat folder di `data/`, misalnya `data/talkinghead/`.
2. Di dalamnya buat `_info.md` (isinya hanya bagian atas: label, description, color, order).
3. Tiap knowledge jadi satu file `.md`. Beri awalan angka supaya urutannya jelas:
   `01-inti.md`, `02-hook.md`, `03-contoh-skrip.md`, dst.
4. Semua file digabung berurutan dan dikirim sekaligus. Menambah knowledge baru = tambah file baru.

Di layar ada info panjang prompt, jadi kamu tahu kalau sudah terlalu panjang.

## Format file
File knowledge boleh `.txt` atau `.md`. Untuk file knowledge di dalam folder, cukup tempel teksnya,
tidak perlu bagian atas (label, dll). Bagian atas hanya dipakai di `_info.md` (atau `_info.txt`).

## Mengubah knowledge yang sudah ada
Edit file `.md`-nya di folder `data/`, lalu commit.

## Jalankan lokal (opsional)
    npm install
    npm run dev

## Deploy
Push ke GitHub, import repo di Vercel. Tidak perlu environment variable.
