// src/pages/admin/dashboard.js
import Head from 'next/head';
import Link from 'next/link';
import ProtectedRoute from '../../components/ProtectedRoute';
import AdminLayout from '../../components/AdminLayout';
import { PrismaClient } from '@prisma/client';

// stats & recentArticles sekarang dikirim via getServerSideProps
export default function AdminDashboard({ stats, recentArticles }) {

  return (
    <ProtectedRoute>
      <AdminLayout>
        <Head>
          <title>Dashboard - Valerie CMS</title>
        </Head>
        
        {/* Notification Banner */}
        {stats.find(stat => stat.name === 'Menunggu Moderasi' && parseInt(stat.value) > 0) && (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-700">
                  Ada <span className="font-medium">{stats.find(stat => stat.name === 'Menunggu Moderasi').value}</span> artikel yang menunggu moderasi.{' '}
                  <Link href="/admin/moderation" className="font-medium underline">
                    Lihat daftar
                  </Link>
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
              <p className="mt-1 text-sm text-gray-500">Selamat datang kembali! Berikut ringkasan aktivitas terbaru.</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
              {stats.map((stat) => (
                <div key={stat.name} className="bg-white overflow-hidden shadow rounded-lg">
                  <div className="px-4 py-5 sm:p-6">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 bg-primary-100 rounded-md p-3">
                        <svg className="h-6 w-6 text-primary-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 012-2h2a2 2 0 012 2v6a2 2 0 01-2 2h-2a2 2 0 01-2-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10a2 2 0 01-2 2h-2a2 2 0 01-2-2zm0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                        </svg>
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 truncate">{stat.name}</dt>
                          <dd className="flex items-baseline">
                            <div className="text-2xl font-semibold text-gray-900">{stat.value}</div>
                            <div className={`ml-2 flex items-baseline text-sm font-semibold ${stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'}`}>
                              {stat.changeType === 'positive' ? (
                                <svg className="self-center flex-shrink-0 h-5 w-5 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" /></svg>
                              ) : (
                                <svg className="self-center flex-shrink-0 h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                              )}
                              <span className="sr-only">{stat.changeType === 'positive' ? 'Increased' : 'Decreased'} by</span>
                              {stat.change}
                            </div>
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Recent Articles */}
            <div className="bg-white shadow overflow-hidden sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
                <h3 className="text-lg leading-6 font-medium text-gray-900">Artikel Terbaru</h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">Daftar artikel yang baru saja dibuat atau diubah.</p>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Judul</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tanggal</th>
                      <th scope="col" className="relative px-6 py-3"><span className="sr-only">Edit</span></th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-y-gray-200">
                    {recentArticles.map((article) => (
                      <tr key={article.id}>
                        <td className="px-6 py-4 whitespace-nowrap"><div className="text-sm font-medium text-gray-900">{article.title}</div></td>
                        <td className="px-6 py-4 whitespace-nowrap"><span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${article.status === 'Published' ? 'bg-green-100 text-green-800' : article.status === 'Draft' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>{article.status}</span></td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{article.date}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <Link href={`/admin/articles/${article.id}`} className="text-primary-600 hover:text-primary-900">Edit</Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </AdminLayout>
    </ProtectedRoute>
  );
}

export async function getServerSideProps() {
  const prisma = new PrismaClient();

  // Hitung statistik
  const totalArticles      = await prisma.article.count();
  const activeUsers        = await prisma.user.count();
  const draftCount         = await prisma.article.count({ where: { status: 'Draft' } });
  const pendingCount       = await prisma.article.count({ where: { status: 'Pending' } });

  // Ambil 4 artikel terbaru untuk preview
  const recentRaw = await prisma.article.findMany({
    orderBy: { updatedAt: 'desc' },
    take: 4,
    include: { author: { select: { name: true } } }
  });

  await prisma.$disconnect();

  // Bentuk sesuai format yang dipakai UI
  const stats = [
    { name: 'Total Artikel',        value: totalArticles,  change: null,     changeType: null },
    { name: 'Pengguna Aktif',       value: activeUsers,    change: null,     changeType: null },
    { name: 'Draft',                value: draftCount,     change: null,     changeType: null },
    { name: 'Menunggu Moderasi',    value: pendingCount,   change: null,     changeType: pendingCount > 0 ? 'negative' : 'positive' },
  ];

  const recentArticles = recentRaw.map(a => ({
    id:     a.id,
    title:  a.title,
    status: a.status,
    date:   a.updatedAt.toISOString().split('T')[0], // YYYY-MM-DD
  }));

  return {
    props: { stats, recentArticles }
  };
}