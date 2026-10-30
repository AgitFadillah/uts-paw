# Sikampus, Direktori Kuliner Sekitar Kampus

Tugas Ujian Tengah Semester IF25-22014 Pengembangan Aplikasi Web (Ganjil 2026/2027).

| | |
|---|---|
| Nama | AGIT FADILLAH |
| NIM | 124140157 |
| Kelas | RB |
| Tema | Direktori Kuliner Sekitar Kampus |

URL deployment: <https://agitfadillah.github.io/uts-paw/>

## Fitur

- Beranda menampilkan nama tema beserta ringkasan jumlah item dan jumlah kategori,
  dengan tautan ke halaman koleksi.
- Koleksi berisi 12 tempat makan dalam bentuk kartu, lengkap dengan kolom pencarian
  berdasarkan judul (`input type="search"`) dan saringan kategori.
- Detail tempat makan memuat semua field (kategori, alamat, harga rata-rata, jam buka,
  deskripsi), tombol Hapus dengan konfirmasi `window.confirm`, serta tautan kembali.
  Id yang tidak ada menampilkan pesan tidak ditemukan.
- Form tambah item terkontrol dengan validasi di JavaScript (judul wajib, minimal
  3 karakter) ditampilkan lewat `role="alert"`. Data baru disimpan ke localStorage,
  jadi tetap ada setelah halaman diperbarui.
- Statistik berupa tabel HTML jumlah tempat makan per kategori (hitung dengan
  `reduce` + `Object.entries`) beserta baris total di `tfoot`.
- Tentang berisi nama, NIM, kelas, tema, dan tautan repo GitHub ini.
- Rute yang tidak dikenal menampilkan halaman 404 dengan tautan kembali ke beranda.
- Data awal diambil dari `public/data/koleksi.json` menggunakan `fetch` dengan
  `async/await`, ada keadaan memuat dan gagal memuat.
- Semua halaman dibungkus Layout semantik (header, nav, main, footer) dengan CSS
  yang dipecah per berkas: `Layout.css`, `Tambah.css`, dan `Statistik.css`.

## Struktur berkas

```
app/
├── public/data/koleksi.json   data awal 12 item
├── src/
│   ├── App.jsx                daftar rute React Router
│   ├── main.jsx               BrowserRouter dengan basename "/uts-paw"
│   ├── components/
│   │   ├── Layout.jsx/.css    kerangka, menu navigasi, footer
│   │   ├── KartuTempat.jsx    kartu satu tempat makan
│   │   ├── KotakPencarian.jsx input cari judul
│   │   ├── PilihKategori.jsx  dropdown saringan kategori
│   │   └── DaftarRinci.jsx    daftar definisi rincian
│   ├── context/
│   │   ├── koleksiContext.js  createContext + VERSI_SKEMA
│   │   └── KoleksiProvider.jsx fetch, tambah, hapus
│   ├── hooks/
│   │   ├── useLocalStorage.js  state tersimpan di localStorage
│   │   └── useKoleksi.js       akses context koleksi
│   └── pages/                 Beranda, Koleksi, Detail, Tambah,
│                              Statistik, Tentang, TidakDitemukan
└── mahasiswa.json             nama, NIM, kelas, tema
```

## Cara menjalankan

```bash
cd app
npm install
npm run dev
```

Untuk build produksi dan preview hasilnya gunakan `npm run build` lalu
`npm run preview`.

Untuk menjalankan test dan pemeriksaan:

```bash
npm test   # Vitest + React Testing Library, 10 test
npm run lint
npm run cek
```

## Tangkapan layar

![Halaman koleksi berisi kartu tempat makan](tangkapan-layar/koleksi.png)

![Detail tempat makan](tangkapan-layar/detail.png)

![Halaman beranda](tangkapan-layar/beranda.png)

![Form tambah tempat makan](tangkapan-layar/tambah.png)
