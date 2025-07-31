// src/pages/blog/index.js (VERSI FINAL)
import Head from 'next/head';
import Link from 'next/link';
import Navbar from '../../src/components/Navbar';
import Footer from '../../src/components/Footer';
import { PrismaClient } from '@prisma/client';
import { format } from 'date-fns';

const prisma = new PrismaClient();

export default function Blog({ articles }) {
  return (
    <div className="relative overflow-x-hidden bg-gray-900 text-white">
      <Head>
        <title>Blog - Valerie CMS</title>
        <meta
          name="description"
          content="Artikel dan informasi untuk pengembangan UKM"
        />
      </Head>

      <div className="fixed inset-0 -z-10 ambient-orbs pointer-events-none"></div>
      <Navbar />

      <main className="pt-24">
        <section id="blog-list" className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Blog Valerie
              </h1>
              <p className="text-lg text-gray-300">
                Kumpulan artikel, tips, dan wawasan untuk membantu pengembangan
                UKM Anda.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {articles.length > 0 ? (
                articles.map((article, index) => (
                  <Link
                    key={article.id}
                    href={`/blog/${article.id}`}
                    legacyBehavior
                  >
                    <a
                      className="block glass-card p-4 overflow-hidden glass-card-hover"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <div className="relative mb-4">
                        {/* Ganti dengan gambar dari database jika ada, jika tidak, gunakan placeholder */}
                        <img
                          src={
                            article.thumbnail ||
                            "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=60"
                          }
                          alt={article.title}
                          className="w-full h-48 object-cover rounded-lg"
                        />
                      </div>
                      <div className="p-2">
                        <h3 className="text-xl font-bold text-white mb-2 leading-snug">
                          {article.title}
                        </h3>
                        <p className="text-gray-300 text-sm mb-4">
                          {article.excerpt}
                        </p>
                        <div className="border-t border-white/10 pt-3">
                          <p className="text-gray-400 text-xs">
                            {format(new Date(article.createdAt), 'dd/MM/yyyy')} • {article.author.name}
                          </p>
                        </div>
                      </div>
                    </a>
                  </Link>
                ))
              ) : (
                <p className="text-center col-span-full text-gray-400">
                  Belum ada artikel yang dipublikasikan.
                </p>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export async function getServerSideProps() {
  const articles = await prisma.article.findMany({
    where: {
      status: 'Published', // Hanya ambil artikel yang sudah di-publish
    },
    include: {
      author: true, // Sertakan data penulis
    },
    orderBy: {
      createdAt: 'desc',
    }
  });

  // Serialisasi data agar aman dikirim ke komponen
  const serializedArticles = articles.map(article => ({
    ...article,
    createdAt: article.createdAt.toISOString(),
    updatedAt: article.updatedAt.toISOString(),
    author: {
      ...article.author,
      createdAt: article.author.createdAt.toISOString(),
      updatedAt: article.author.updatedAt.toISOString(),
    },
  }));

  return {
    props: {
      articles: serializedArticles,
    },
  };
}