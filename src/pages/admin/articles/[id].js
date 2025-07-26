import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function EditArticle() {
  const router = useRouter();
  const { id } = router.query;

  // Data dummy untuk artikel (nanti akan diambil dari database)
  const [article, setArticle] = useState({
    id: id || 1,
    title: 'Tips Memulai Usaha Kecil yang Sukses',
    excerpt: 'Panduan lengkap untuk memulai usaha kecil dengan modal minimal dan strategi yang tepat',
    content: `Memulai usaha kecil memang membutuhkan perencanaan yang matang. Berikut beberapa tips yang bisa Anda terapkan:

1. Identifikasi Peluang Pasar
Cari tahu kebutuhan masyarakat di sekitar Anda. Peluang bisnis seringkali ada di halal-hal sederhana yang sering diabaikan.

2. Rencana Bisnis yang Jelas
Buat rencana bisnis sederhana yang mencakup target pasar, strategi pemasaran, dan proyeksi keuangan.

3. Mulai dengan Modal Kecil
Jangan terlalu memaksakan diri dengan modal besar. Mulailah dengan skala kecil dan tingkatkan secara bertahap.

4. Manfaatkan Teknologi
Gunakan media sosial dan platform digital untuk mempromosikan produk Anda. Valerie CMS bisa membantu Anda mengelola konten digital dengan mudah.

Dengan konsistensi dan kerja keras, usaha kecil Anda bisa berkembang menjadi besar. Semangat terus!`,
    category: 'Bisnis',
    status: 'Published',
    tags: 'tips, bisnis, ukm',
    author: 'Admin Valerie',
    date: '2025-05-15'
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
    alert('Perubahan artikel akan disimpan (simulasi). Nanti akan terhubung ke Firebase.');
    // Di sini nanti akan kita hubungkan ke Firebase
  };

  const handleDelete = () => {
    if (confirm('Apakah Anda yakin ingin menghapus artikel ini? Tindakan ini tidak dapat dibatalkan.')) {
      alert('Artikel akan dihapus (simulasi).');
      router.push('/admin/articles');
    }
  };

  return (
    <>
      <Head>
        <title>Edit Artikel - Valerie CMS</title>
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
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Link href="/admin/articles" className="text-primary-600 hover:text-primary-800 flex items-center">
                    <svg className="h-5 w-5 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
                    </svg>
                    Kembali
                  </Link>
                  <h1 className="text-2xl font-bold text-gray-900 ml-4">Edit Artikel</h1>
                </div>
                <div>
                  <Link
                    href={`/blog/${article.id}`}
                    target="_blank"
                    className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  >
                    <svg className="-ml-0.5 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    Preview
                  </Link>
                </div>
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
                          id="published"
                          name="status"
                          type="radio"
                          value="Published"
                          checked={article.status === 'Published'}
                          onChange={handleChange}
                          className="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300"
                        />
                        <label htmlFor="published" className="ml-3 block text-sm font-medium text-gray-700">
                          Published
                        </label>
                      </div>
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

                  {/* Info Artikel */}
                  <div className="bg-gray-50 p-4 rounded-md">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-600">
                      <div>
                        <span className="font-medium">ID:</span> {article.id}
                      </div>
                      <div>
                        <span className="font-medium">Penulis:</span> {article.author}
                      </div>
                      <div>
                        <span className="font-medium">Tanggal Dibuat:</span> {article.date}
                      </div>
                      <div>
                        <span className="font-medium">Status Saat Ini:</span> 
                        <span className={`ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                          ${article.status === 'Published' ? 'bg-green-100 text-green-800' : 
                            article.status === 'Draft' ? 'bg-yellow-100 text-yellow-800' : 
                            'bg-red-100 text-red-800'}`}>
                          {article.status}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                <div className="flex justify-between items-center">
                  <button
                    type="button"
                    onClick={handleDelete}
                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    <svg className="-ml-0.5 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Hapus Artikel
                  </button>
                  
                  <div className="flex space-x-3">
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
                      Simpan Perubahan
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </main>
      </div>
    </>
  );
}