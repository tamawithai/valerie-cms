Valerie CMS

Valerie CMS adalah Content Management System (CMS) sederhana yang dibangun dengan Next.js, React, dan PostgreSQL (melalui Neon.tech). CMS ini dirancang khusus untuk membantu Usaha Kecil Menengah (UKM) mengelola konten website mereka dengan mudah dan profesional, tanpa perlu pengetahuan teknis yang mendalam.

Fitur Utama

Manajemen Artikel/Blog: Buat, edit, dan kelola artikel dengan status (Draft, Pending, Published).
Sistem Moderasi: Artikel dari Contributor dapat dimoderasi oleh Admin sebelum dipublikasikan.
Manajemen Pengguna: Dua role pengguna (Admin dan Contributor) dengan hak akses yang berbeda.
Landing Page Dinamis: Kelola tampilan halaman utama website (Hero, About, Services, dll) dari dashboard.
Autentikasi: Sistem login/logout yang aman.
Responsif: Tampilan yang menarik dan berfungsi baik di desktop maupun mobile.
Struktur Proyek

valerie-cms/
├── .gitignore
├── next.config.js
├── package.json
├── postcss.config.js (jika menggunakan Tailwind)
├── tailwind.config.js (jika menggunakan Tailwind)
├── README.md (Dokumen ini)
├── public/
│ ├── favicon.ico
│ └── images/
├── src/
│ ├── components/
│ │ ├── Navbar.js
│ │ ├── Footer.js
│ │ ├── ProtectedRoute.js
│ │ └── RoleGuard.js
│ ├── context/
│ │ └── AuthContext.js
│ ├── lib/
│ │ ├── db.js (Utility database jika tidak menggunakan Prisma penuh)
│ │ └── cloudinary.js (Utility untuk upload ke Cloudinary)
│ ├── pages/
│ │ ├── _app.js
│ │ ├── index.js (Landing Page)
│ │ ├── blog/
│ │ │ ├── index.js (Halaman daftar blog)
│ │ │ └── [id].js (Halaman detail artikel)
│ │ ├── admin/
│ │ │ ├── login.js (Halaman login admin)
│ │ │ ├── dashboard.js (Dashboard Admin)
│ │ │ ├── articles/
│ │ │ │ ├── index.js (Manajemen Artikel)
│ │ │ │ ├── new.js (Buat Artikel Baru)
│ │ │ │ └── [id].js (Edit Artikel)
│ │ │ ├── users/
│ │ │ │ ├── index.js (Manajemen Pengguna)
│ │ │ │ ├── new.js (Tambah Pengguna Baru)
│ │ │ │ └── [id].js (Edit Pengguna)
│ │ │ ├── landing.js (Manajemen Konten Landing Page)
│ │ │ ├── moderation.js (Moderasi Artikel)
│ │ │ └── contributor-dashboard.js (Dashboard untuk Contributor)
│ │ └── api/
│ │ ├── auth/
│ │ │ ├── login.js
│ │ │ ├── logout.js
│ │ │ └── me.js
│ │ ├── users/
│ │ │ └── index.js
│ │ ├── articles/
│ │ │ └── index.js (dan [id].js jika perlu)
│ │ └── init-db.js (Endpoint untuk inisialisasi tabel)
│ └── styles/
│ └── globals.css
└── prisma/ (Jika menggunakan Prisma)
├── schema.prisma
└── migrations/

Catatan: Struktur di atas merupakan representasi umum berdasarkan percakapan. Beberapa file mungkin belum dibuat atau belum sesuai 100% dengan struktur ini. Sesuaikan dengan file aktual dalam proyek Anda.

Cara Instalasi

Clone Repository:
git clone <url-repository-anda>
cd valerie-cms
Instal Dependensi:
Pastikan Anda memiliki Node.js dan npm terinstal.
npm install
Konfigurasi Environment Variables:
Buat file .env.local di root project.
Isi dengan konfigurasi yang diperlukan:
DATABASE_URL="postgresql://<user>:<password>@<endpoint>.neon.tech/<dbname>?sslmode=require"
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your_cloud_name"
CLOUDINARY_API_KEY="your_api_key"
CLOUDINARY_API_SECRET="your_api_secret"
(Jika menggunakan Prisma) Inisialisasi Database:
Pastikan DATABASE_URL sudah dikonfigurasi di .env.local.
Jalankan migrasi untuk membuat tabel:
npx prisma migrate dev --name init
(Opsional) Untuk menggenerate client Prisma:
npx prisma generate
Jalankan Aplikasi dalam Mode Development:
npm run dev
Akses Aplikasi:
Buka browser Anda dan akses http://localhost:3000 .
Cara Konfigurasi Awal

Buat Pengguna Admin Pertama:
Gunakan tools seperti curl atau Postman untuk mengirim permintaan POST ke endpoint /api/users.
Contoh dengan curl:
curl -X POST http://localhost:3000/api/users
-H "Content-Type: application/json"
-d '{
"name": "Admin User",
"email": "admin@example.com ",
"password": "password123",
"role": "Admin",
"status": "Active"
}'
Login ke Dashboard Admin:
Akses http://localhost:3000/admin/login .
Gunakan kredensial yang dibuat pada langkah sebelumnya.
Penjelasan Singkat Komponen Utama

/ (Landing Page): Halaman utama website yang menampilkan informasi tentang UKM.
/blog: Halaman publik yang menampilkan daftar artikel yang telah dipublikasikan.
/admin/login: Halaman autentikasi untuk mengakses dashboard admin.
/admin/dashboard: Ringkasan aktivitas dan statistik untuk pengguna dengan role Admin.
/admin/contributor-dashboard: Ringkasan aktivitas untuk pengguna dengan role Contributor.
/admin/articles: Manajemen artikel (lihat daftar, buat baru, edit, hapus).
/admin/moderation: Halaman khusus untuk Admin melakukan moderasi artikel yang diajukan oleh Contributor.
/admin/users: Manajemen pengguna (lihat daftar, tambah baru, edit, hapus, ubah status).
/admin/landing: Mengelola konten halaman utama (Hero section, About, Services, dll).
Kontribusi

(Kamu bisa menambahkan bagian ini jika membuka proyek untuk kontribusi dari orang lain)

Lisensi

(Kamu bisa menambahkan bagian ini untuk menjelaskan lisensi proyek)