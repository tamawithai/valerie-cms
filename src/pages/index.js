import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
  return (
    <>
      <Head>
        <title>Valerie CMS - Solusi Konten UKM</title>
        <meta name="description" content="Content Management System sederhana untuk UKM" />
      </Head>

      {/* Hero Section */}
      <section className="py-5 fade-in">
        <div className="container">
          <div className="card text-center py-5">
            <h1 className="mb-3">Valerie CMS</h1>
            <p className="text-muted mb-4">Solusi Konten Sederhana untuk UKM</p>
            <div className="mt-4">
              <Link href="/admin/login" className="btn btn-primary me-3">Masuk Admin</Link>
              <Link href="/blog" className="btn btn-outline">Lihat Blog</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-4">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="mb-3">Fitur Utama</h2>
            <p className="text-muted">Sistem manajemen konten yang dirancang khusus untuk UKM</p>
          </div>

          <div className="row">
            <div className="col-md-4 mb-4">
              <div className="card h-100">
                <div className="py-3">
                  <h3 className="mb-3">Manajemen Blog</h3>
                  <p className="text-muted">Buat dan kelola artikel dengan mudah. Sistem moderasi memastikan kualitas konten.</p>
                </div>
              </div>
            </div>

            <div className="col-md-4 mb-4">
              <div className="card h-100">
                <div className="py-3">
                  <h3 className="mb-3">Landing Page Dinamis</h3>
                  <p className="text-muted">Kelola tampilan website Anda tanpa perlu coding. Semua bisa diatur dari dashboard.</p>
                </div>
              </div>
            </div>

            <div className="col-md-4 mb-4">
              <div className="card h-100">
                <div className="py-3">
                  <h3 className="mb-3">Multi Pengguna</h3>
                  <p className="text-muted">Dua role pengguna: Admin dan Contributor dengan hak akses yang berbeda.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-4 mt-5 bg-white">
        <div className="container text-center">
          <p className="mb-0">Dibuat dengan ❤️ oleh tamawithai © 2025</p>
        </div>
      </footer>
    </>
  );
}