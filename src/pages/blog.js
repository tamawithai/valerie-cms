import Head from 'next/head';
import Link from 'next/link';

export default function Blog() {
  // Data dummy untuk artikel
  const articles = [
    {
      id: 1,
      title: "Tips Memulai Usaha Kecil",
      excerpt: "Panduan lengkap untuk memulai usaha kecil dengan modal minimal",
      date: "15 Mei 2025",
      author: "Admin Valerie"
    },
    {
      id: 2,
      title: "Strategi Pemasaran Digital untuk UKM",
      excerpt: "Cara efektif memasarkan produk UKM di era digital",
      date: "10 Mei 2025",
      author: "Admin Valerie"
    },
    {
      id: 3,
      title: "Manajemen Keuangan Sederhana",
      excerpt: "Teknik dasar mengelola keuangan usaha kecil",
      date: "5 Mei 2025",
      author: "Admin Valerie"
    }
  ];

  return (
    <>
      <Head>
        <title>Blog - Valerie CMS</title>
        <meta name="description" content="Artikel dan informasi untuk UKM" />
      </Head>

      <div className="container py-5">
        <div className="mb-5">
          <Link href="/" className="text-muted">← Kembali ke beranda</Link>
        </div>

        <div className="text-center mb-5">
          <h1 className="mb-3">Blog Valerie CMS</h1>
          <p className="text-muted">Artikel dan informasi untuk pengembangan UKM</p>
        </div>

        <div className="row">
          {articles.map((article) => (
            <div key={article.id} className="col-md-4 mb-4">
              <div className="card h-100">
                <div className="py-3">
                  <h3 className="mb-2">{article.title}</h3>
                  <p className="text-muted mb-2">{article.excerpt}</p>
                  <div className="mt-3">
                    <small className="text-muted">
                      {article.date} • {article.author}
                    </small>
                  </div>
                  <Link 
                    href={`/blog/${article.id}`} 
                    className="btn btn-outline mt-3"
                  >
                    Baca Selengkapnya
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <footer className="py-4 mt-5 bg-white">
        <div className="container text-center">
          <p className="mb-0">Dibuat dengan ❤️ oleh tamawithai © 2025</p>
        </div>
      </footer>
    </>
  );
}