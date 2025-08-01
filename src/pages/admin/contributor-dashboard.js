import Head from 'next/head';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import ProtectedRoute from '../../components/ProtectedRoute';
import AdminLayout   from '../../components/AdminLayout';


export default function ContributorDashboard() {
  // Data dummy untuk statistik contributor

const { user } = useAuth();
const [articles, setArticles]       = useState([]);
const [stats, setStats]             = useState([]);
const [myArticles, setMyArticles]   = useState([]);
const [loadingData, setLoadingData] = useState(true);

// Fetch semua artikel, lalu filter berdasarkan author.id === user.id
useEffect(() => {
if (!user) return;
async function loadMyData() {
setLoadingData(true);
 try {
const res = await fetch('/api/articles');
if (!res.ok) throw new Error('Gagal memuat artikel');
const all = await res.json();
 const mine = all.filter(a => a.author.id === user.id);
        setMyArticles(mine);
        setStats([
          { name: 'Artikel Saya',        value: String(mine.length) },
          { name: 'Draft',               value: String(mine.filter(a => a.status === 'Draft').length) },
          { name: 'Menunggu Moderasi',   value: String(mine.filter(a => a.status === 'Pending').length) },
         { name: 'Published',           value: String(mine.filter(a => a.status === 'Published').length) },
        ]);
       } catch (err) {
         console.error('ContributorDashboard load error:', err);
      } finally {
        setLoadingData(false);
      }
    }
    loadMyData();
  }, [user]);


  return (
    <ProtectedRoute>
    <>
      <Head>
        <title>Dashboard Contributor - Valerie CMS</title>
      </Head>
      <AdminLayout>
      <div className="min-h-screen bg-gray-50">

        {/* Main Content */}
        <main className="py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900">Dashboard Contributor</h1>
              <p className="mt-1 text-sm text-gray-500">Kelola artikel Anda dan pantau status publikasi</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
              {stats.map((stat) => (
                <div key={stat.name} className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="px-4 py-5 sm:p-6">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 bg-blue-100 rounded-md p-3">
                        <svg className="h-6 w-6 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 truncate">{stat.name}</dt>
                          <dd className="flex items-baseline">
                            <div className="text-2xl font-semibold text-gray-900">{stat.value}</div>
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* My Articles */}
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Artikel Saya</h3>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">Daftar artikel yang telah Anda buat</p>
                  </div>
                  <div className="mt-4 md:mt-0">
                    <Link
                      href="/admin/articles"
                      className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                    >
                      Lihat Semua
                    </Link>
                  </div>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Judul
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Tanggal
                      </th>
                      <th scope="col" className="relative px-6 py-3">
                        <span className="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {myArticles.map((article) => (
                      <tr key={article.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">{article.title}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                            ${article.status === 'Published' ? 'bg-green-100 text-green-800' : 
                              article.status === 'Draft' ? 'bg-yellow-100 text-yellow-800' : 
                              'bg-red-100 text-red-800'}`}>
                            {article.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {article.date}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <Link href={`/admin/articles/${article.id}`} className="text-primary-600 hover:text-primary-900">
                            Edit
                          </Link>
                        </td>
                      </tr>
                    ))}
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
                  <h3 className="text-sm font-medium text-blue-800">Petunjuk untuk Contributor</h3>
                  <div className="mt-2 text-sm text-blue-700">
                    <ul className="list-disc space-y-1 pl-5">
                      <li>Buat artikel baru dengan klik tombol "Buat Artikel"</li>
                      <li>Artikel dengan status "Draft" hanya bisa dilihat oleh Anda</li>
                      <li>Artikel dengan status "Pending" sedang menunggu moderasi oleh Admin</li>
                      <li>Artikel dengan status "Published" sudah tampil di website publik</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      </AdminLayout>
    </>
    </ProtectedRoute>
  );
}