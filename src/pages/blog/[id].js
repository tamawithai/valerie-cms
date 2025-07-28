// src/pages/blog/[id].js (VERSI FINAL)
import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default function ArticleDetail({ article }) {
  // Jika article null (karena tidak ditemukan atau tidak published), komponen tidak akan dirender karena getServerSideProps mengembalikan notFound: true
  return (
    <div className="relative overflow-x-hidden bg-gray-900 text-white">
      <Head>
        <title>{article.title} - Valerie CMS</title>
        <meta name="description" content={article.excerpt} />
      </Head>

      <div className="fixed inset-0 -z-10 ambient-orbs pointer-events-none"></div>
      <Navbar />

      <main className="pt-24">
        <section className="py-10 md:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="mb-8">
                <Link href="/blog" className="text-blue-400 hover:text-blue-300 transition-colors inline-block">
                  ← Kembali ke semua artikel
                </Link>
              </div>

              <div className="glass-card p-6 md:p-10">
                <header className="mb-8">
                  <h1 className="text-3xl md:text-5xl font-bold text-white leading-tight mb-4">
                    {article.title}
                  </h1>
                  <div className="flex items-center text-gray-400">
                    {/* Ganti dengan gambar author dari database jika ada */}
                    <img src={article.author.imageUrl || 'https://randomuser.me/api/portraits/women/44.jpg'} alt={article.author.name} className="w-8 h-8 rounded-full mr-3" />
                    <span>{article.author.name}</span>
                    <span className="mx-2">•</span>
                    <span>{new Date(article.createdAt).toLocaleDateString()}</span>
                  </div>
                </header>

                {article.imageUrl && (
                   <img src={article.imageUrl} alt={article.title} className="w-full h-auto max-h-96 object-cover rounded-xl mb-8" />
                )}

                <div 
                  className="prose prose-invert prose-lg max-w-none prose-p:text-gray-300 prose-h3:text-white"
                  dangerouslySetInnerHTML={{ __html: article.content }}
                />

                {article.tags && (
                  <footer className="border-t border-white/10 mt-10 pt-6">
                    <h4 className="text-lg font-semibold text-white mb-4">Tags</h4>
                    <div className="flex flex-wrap gap-2">
                        {article.tags.split(',').map((tag, index) => (
                            <span key={index} className="bg-blue-500/20 text-blue-300 text-xs font-medium px-3 py-1 rounded-full">
                            {tag.trim()}
                            </span>
                        ))}
                    </div>
                  </footer>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.params;

  const article = await prisma.article.findUnique({
    where: { id: parseInt(id) },
    include: { author: true },
  });

  // Jika artikel tidak ditemukan ATAU statusnya bukan 'Published'
  // Kembalikan halaman 404 Not Found untuk keamanan
  if (!article || article.status !== 'Published') {
    return {
      notFound: true,
    };
  }

  const serializedArticle = {
    ...article,
    createdAt: article.createdAt.toISOString(),
    updatedAt: article.updatedAt.toISOString(),
    author: {
      ...article.author,
      createdAt: article.author.createdAt.toISOString(),
      updatedAt: article.author.updatedAt.toISOString(),
    },
  };

  return {
    props: {
      article: serializedArticle,
    },
  };
}