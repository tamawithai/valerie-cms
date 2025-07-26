import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function NewArticle() {
  const router = useRouter();
  const [article, setArticle] = useState({
    title: '',
    excerpt: '',
    content: '',
    category: '',
    status: 'Draft',
    tags: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setArticle(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Artikel akan disimpan (simulasi). Nanti akan terhubung ke Firebase.');
    // Di sini nanti akan kita hubungkan ke Firebase
  };

  return (
    <>
      <Head>
        <title>Buat Artikel Baru - Valerie CMS</title>
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Navbar - sama seperti sebelumnya */}
        <nav className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <div className="flex-shrink-0 flex items-center">
                  <span className="text-xl font-bold text-primary-600">Valerie CMS</span>
                </div>
                <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                  <Link href="/admin/dashboard" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                    Dashboard
                  </Link>
                  <Link href="/admin/articles" className="border-primary-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                    Artikel
                  </Link>
                  <Link href="/admin/landing" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                    Landing Page
                  </Link>
                  <Link href="/admin/users" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                    Pengguna
                  </Link>
                </div>
              </div>
              <div className="flex items-center">
                <div className="ml-3 relative">
                  <div>
                    <button
                      type="button"
                      className="bg-white rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                    >
                      <span className="sr-only">Open user menu</span>
                      <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center">
                        <span className="text-primary-800 font-medium">A</span>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="py-6">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-6">
              <div className="flex items-center">
                <Link href="/admin/articles" className="text-primary-600 hover:text-primary-800 flex items-center">
                  <svg className="h-5 w-5 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
                  </svg>
                  Kembali
                </Link>
                <h1 className="text-2xl font-bold text-gray-900 ml-4">Buat Artikel Baru</h1>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="bg-white shadow sm:rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <div className="space-y-6">
                  {/* Judul */}
                  <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                      Judul Artikel
                    </label>
                    <input
                      type="text"
                      name="title"
                      id="title"
                      value={article.title}
                      onChange={handleChange}
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    />
                  </div>

                  {/* Kategori */}
                  <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                      Kategori
                    </label>
                    <select
                      id="category"
                      name="category"
                      value={article.category}
                      onChange={handleChange}
                      className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    >
                      <option value="">Pilih kategori</option>
                      <option value="Bisnis">Bisnis</option>
                      <option value="Marketing">Marketing</option>
                      <option value="Keuangan">Keuangan</option>
                      <option value="Teknologi">Teknologi</option>
                      <option value="Tips">Tips</option>
                    </select>
                  </div>

                  {/* Excerpt */}
                  <div>
                    <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700">
                      Ringkasan (Excerpt)
                    </label>
                    <textarea
                      id="excerpt"
                      name="excerpt"
                      rows={3}
                      value={article.excerpt}
                      onChange={handleChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                      placeholder="Ringkasan singkat tentang artikel ini..."
                    />
                  </div>

                  {/* Konten */}
                  <div>
                    <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                      Konten Artikel
                    </label>
                    <textarea
                      id="content"
                      name="content"
                      rows={15}
                      value={article.content}
                      onChange={handleChange}
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm font-mono"
                      placeholder="Tulis konten artikel Anda di sini..."
                    />
                  </div>

                  {/* Tags */}
                  <div>
                    <label htmlFor="tags" className="block text-sm font-medium text-gray-700">
                      Tags (pisahkan dengan koma)
                    </label>
                    <input
                      type="text"
                      name="tags"
                      id="tags"
                      value={article.tags}
                      onChange={handleChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                      placeholder="tips, bisnis, ukm"
                    />
                  </div>

                  {/* Status */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Status</label>
                    <div className="mt-2 space-y-2">
                      <div className="flex items-center">
                        <input
                          id="draft"
                          name="status"
                          type="radio"
                          value="Draft"
                          checked={article.status === 'Draft'}
                          onChange={handleChange}
                          className="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300"
                        />
                        <label htmlFor="draft" className="ml-3 block text-sm font-medium text-gray-700">
                          Draft
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          id="pending"
                          name="status"
                          type="radio"
                          value="Pending"
                          checked={article.status === 'Pending'}
                          onChange={handleChange}
                          className="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300"
                        />
                        <label htmlFor="pending" className="ml-3 block text-sm font-medium text-gray-700">
                          Pending (Menunggu Moderasi)
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                <div className="flex justify-end space-x-3">
                  <Link
                    href="/admin/articles"
                    className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  >
                    Batal
                  </Link>
                  <button
                    type="submit"
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  >
                    Simpan Artikel
                  </button>
                </div>
              </div>
            </form>
          </div>
        </main>
      </div>
    </>
  );
}