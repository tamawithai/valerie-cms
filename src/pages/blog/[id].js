import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function ArticleDetail() {
  const router = useRouter();
  const { id } = router.query;

  // Data dummy untuk artikel detail
  const article = {
    id: id || 1,
    title: "Tips Memulai Usaha Kecil yang Sukses",
    content: `
      <p>Memulai usaha kecil memang membutuhkan perencanaan yang matang. Berikut beberapa tips yang bisa Anda terapkan:</p>
      
      <h3>1. Identifikasi Peluang Pasar</h3>
      <p>Cari tahu kebutuhan masyarakat di sekitar Anda. Peluang bisnis seringkali ada di hal-hal sederhana yang sering diabaikan.</p>
      
      <h3>2. Rencana Bisnis yang Jelas</h3>
      <p>Buat rencana bisnis sederhana yang mencakup target pasar, strategi pemasaran, dan proyeksi keuangan.</p>
      
      <h3>3. Mulai dengan Modal Kecil</h3>
      <p>Jangan terlalu memaksakan diri dengan modal besar. Mulailah dengan skala kecil dan tingkatkan secara bertahap.</p>
      
      <h3>4. Manfaatkan Teknologi</h3>
      <p>Gunakan media sosial dan platform digital untuk mempromosikan produk Anda. Valerie CMS bisa membantu Anda mengelola konten digital dengan mudah.</p>
      
      <p>Dengan konsistensi dan kerja keras, usaha kecil Anda bisa berkembang menjadi besar. Semangat terus!</p>
    `,
    date: "15 Mei 2025",
    author: "Admin Valerie",
    tags: ["UKM", "Tips", "Bisnis"]
  };

  return (
    <>
      <Head>
        <title>{article.title} - Valerie CMS</title>
        <meta name="description" content="Artikel tentang tips memulai usaha kecil" />
      </Head>

      <div className="container py-5">
        <div className="mb-4">
          <Link href="/blog" className="text-muted">← Kembali ke blog</Link>
        </div>

        <article className="card">
          <header className="mb-4">
            <h1 className="mb-3">{article.title}</h1>
            <div className="d-flex align-items-center text-muted">
              <span>{article.date}</span>
              <span className="mx-2">•</span>
              <span>{article.author}</span>
            </div>
            <div className="mt-3">
              {article.tags.map((tag, index) => (
                <span key={index} className="badge bg-primary me-2">
                  {tag}
                </span>
              ))}
            </div>
          </header>

          <div 
            className="article-content"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </article>
      </div>

      <footer className="py-4 mt-5 bg-white">
        <div className="container text-center">
          <p className="mb-0">Dibuat dengan ❤️ oleh tamawithai © 2025</p>
        </div>
      </footer>

      <style jsx>{`
        .article-content h3 {
          margin: 1.5rem 0 1rem 0;
          color: var(--text-dark);
        }
        
        .article-content p {
          margin-bottom: 1rem;
        }
        
        .badge {
          font-size: 0.75rem;
        }
      `}</style>
    </>
  );
}