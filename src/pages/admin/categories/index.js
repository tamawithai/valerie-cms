// src/pages/admin/categories/index.js
import Head from 'next/head';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import ProtectedRoute from '../../../components/ProtectedRoute';

export default function ManageCategories() {
  const [categories, setCategories] = useState([]);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  async function fetchCategories() {
    try {
      setIsLoading(true);
      const response = await fetch('/api/categories');
      const data = await response.json();
      setCategories(data);
    } catch (err) {
      setError('Gagal memuat data.');
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!newCategoryName.trim()) return;
    try {
      const response = await fetch('/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newCategoryName }),
      });
      if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message);
      }
      setNewCategoryName('');
      fetchCategories(); // Muat ulang daftar kategori
    } catch (err) {
      alert('Error: ' + err.message);
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Apakah Anda yakin ingin menghapus kategori ini?')) {
      try {
        const response = await fetch(`/api/categories/${id}`, { method: 'DELETE' });
         if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message);
        }
        fetchCategories(); // Muat ulang daftar kategori
      } catch (err) {
        alert('Error: ' + err.message);
      }
    }
  };

  return (
    <ProtectedRoute>
      <>
        <Head><title>Manajemen Kategori - Valerie CMS</title></Head>
        <div className="min-h-screen bg-gray-50">
          {/* Anda bisa meletakkan komponen Navbar di sini jika perlu */}
          <main className="py-10">
            <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
              <h1 className="text-2xl font-bold text-gray-900 mb-6">Manajemen Kategori</h1>

              {/* Form Tambah Kategori */}
              <form onSubmit={handleCreate} className="bg-white p-6 rounded-lg shadow-md mb-8">
                <label htmlFor="categoryName" className="block text-sm font-medium text-gray-700">Nama Kategori Baru</label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <input
                    type="text"
                    id="categoryName"
                    value={newCategoryName}
                    onChange={(e) => setNewCategoryName(e.target.value)}
                    className="flex-1 block w-full rounded-none rounded-l-md border-gray-300 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    placeholder="e.g. Teknologi"
                  />
                  <button type="submit" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-r-md shadow-sm text-white bg-primary-600 hover:bg-primary-700">
                    Tambah
                  </button>
                </div>
              </form>

              {/* Daftar Kategori */}
              <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <ul role="list" className="divide-y divide-gray-200">
                  {isLoading ? <li className="p-4 text-center">Memuat...</li> : 
                   error ? <li className="p-4 text-center text-red-500">{error}</li> :
                   categories.map(cat => (
                    <li key={cat.id} className="p-4 flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-900">{cat.name}</p>
                      <button onClick={() => handleDelete(cat.id)} className="text-sm text-red-600 hover:text-red-800">
                        Hapus
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
               <div className="mt-6 text-center">
                  <Link href="/admin/dashboard" className="text-sm font-medium text-primary-600 hover:text-primary-500">
                    &larr; Kembali ke Dashboard
                  </Link>
                </div>
            </div>
          </main>
        </div>
      </>
    </ProtectedRoute>
  );
}