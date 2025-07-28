import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import RoleGuard from '../../components/RoleGuard';
import ProtectedRoute from '../../components/ProtectedRoute'; // Pastikan path ini benar
// KOMENTAR: Tambahkan baris ini.
import AdminLayout from '../../components/AdminLayout';

export default function ArticleModeration() {
  // Data dummy untuk artikel yang menunggu moderasi
  const [pendingArticles, setPendingArticles] = useState([
    {
      id: 1,
      title: 'Strategi Pemasaran Digital untuk UKM Tahun 2025',
      excerpt: 'Tips dan trik pemasaran digital yang efektif untuk usaha kecil menengah di era modern',
      author: 'John Contributor',
      date: '2025-05-20',
      category: 'Marketing',
      status: 'Pending'
    },
    {
      id: 2,
      title: 'Panduan Lengkap Manajemen Keuangan UKM',
      excerpt: 'Cara mengelola keuangan usaha kecil dengan sistem yang terstruktur dan efisien',
      author: 'Jane Contributor',
      date: '2025-05-19',
      category: 'Keuangan',
      status: 'Pending'
    },
    {
      id: 3,
      title: 'Tren Teknologi yang Harus Diketahui UKM',
      excerpt: 'Teknologi terbaru yang dapat membantu pertumbuhan dan efisiensi usaha kecil menengah',
      author: 'Mike Contributor',
      date: '2025-05-18',
      category: 'Teknologi',
      status: 'Pending'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');

  // Filter artikel berdasarkan pencarian dan kategori
  const filteredArticles = pendingArticles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         article.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || article.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleApprove = (id) => {
    if (confirm('Apakah Anda yakin ingin menyetujui artikel ini?')) {
      setPendingArticles(pendingArticles.filter(article => article.id !== id));
      alert('Artikel telah disetujui dan dipublikasikan!');
    }
  };

  const handleReject = (id) => {
    const reason = prompt('Masukkan alasan penolakan:');
    if (reason !== null) {
      setPendingArticles(pendingArticles.filter(article => article.id !== id));
      alert(`Artikel telah ditolak. Alasan: ${reason}`);
    }
  };

  // Data dummy untuk kategori
  const categories = ['All', 'Bisnis', 'Marketing', 'Keuangan', 'Teknologi', 'Tips'];

// ... (bagian atas file: import, fungsi, state, dll) ...

return (
  <ProtectedRoute>
  <RoleGuard allowedRoles={['Admin']}> {/* RoleGuard dimulai di sini */}
    {/* AdminLayout diletakkan di dalam RoleGuard */}
      <AdminLayout>
    <>
      <Head>
        <title>Moderasi Artikel - Valerie CMS</title>
      </Head>

        {/* Main Content */}
        <div className="py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Moderasi Artikel</h1>
                  <p className="mt-1 text-sm text-gray-500">Kelola artikel yang menunggu persetujuan</p>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="mb-6 grid grid-cols-1 gap-5 sm:grid-cols-3">
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-red-100 rounded-md p-3">
                      <svg className="h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">Menunggu Moderasi</dt>
                        <dd className="flex items-baseline">
                          <div className="text-2xl font-semibold text-gray-900">{pendingArticles.length}</div>
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-green-100 rounded-md p-3">
                      <svg className="h-6 w-6 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">Disetujui Hari Ini</dt>
                        <dd className="flex items-baseline">
                          <div className="text-2xl font-semibold text-gray-900">3</div>
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="px-4 py-5 sm:p-6">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 bg-yellow-100 rounded-md p-3">
                      <svg className="h-6 w-6 text-yellow-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                      </svg>
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">Ditolak Hari Ini</dt>
                        <dd className="flex items-baseline">
                          <div className="text-2xl font-semibold text-gray-900">1</div>
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Filters */}
            <div className="mb-6 bg-white p-4 rounded-lg shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
                    Cari Artikel
                  </label>
                  <input
                    type="text"
                    id="search"
                    placeholder="Cari judul atau isi artikel..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>

                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                    Kategori
                  </label>
                  <select
                    id="category"
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>{category === 'All' ? 'Semua Kategori' : category}</option>
                    ))}
                  </select>
                </div>

                <div className="flex items-end">
                  <button
                    onClick={() => {
                      setSearchTerm('');
                      setCategoryFilter('All');
                    }}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  >
                    Reset Filter
                  </button>
                </div>
              </div>
            </div>

            {/* Pending Articles Table */}
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Artikel
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Penulis
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Kategori
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Tanggal
                      </th>
                      <th scope="col" className="relative px-6 py-3">
                        <span className="sr-only">Actions</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredArticles.length > 0 ? (
                      filteredArticles.map((article) => (
                        <tr key={article.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4">
                            <div className="text-sm font-medium text-gray-900">{article.title}</div>
                            <div className="text-sm text-gray-500 mt-1 line-clamp-2">{article.excerpt}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {article.author}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              {article.category}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {article.date}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <div className="flex space-x-2">
                              <Link
                                href={`/admin/articles/${article.id}?preview=true`}
                                target="_blank"
                                className="text-primary-600 hover:text-primary-900"
                              >
                                Preview
                              </Link>
                              <button
                                onClick={() => handleApprove(article.id)}
                                className="text-green-600 hover:text-green-900"
                              >
                                Setujui
                              </button>
                              <button
                                onClick={() => handleReject(article.id)}
                                className="text-red-600 hover:text-red-900"
                              >
                                Tolak
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="px-6 py-4 text-center text-sm text-gray-500">
                          Tidak ada artikel yang menunggu moderasi
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Instructions */}
            <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-blue-800">Petunjuk Moderasi</h3>
                  <div className="mt-2 text-sm text-blue-700">
                    <ul className="list-disc space-y-1 pl-5">
                      <li>Klik <strong>Preview</strong> untuk melihat artikel sebelum menyetujui</li>
                      <li>Klik <strong>Setujui</strong> untuk mempublikasikan artikel</li>
                      <li>Klik <strong>Tolak</strong> untuk mengembalikan artikel ke penulis dengan alasan</li>
                      <li>Artikel yang ditolak akan dikembalikan ke draft penulis</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    </>
    </AdminLayout>
  </RoleGuard>
</ProtectedRoute>
);
}