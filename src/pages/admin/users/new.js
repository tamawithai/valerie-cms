// src/pages/admin/users/new.js (VERSI FINAL YANG SUDAH DIPERBAIKI)
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react'; // Hapus useRef dan useEffect karena tidak perlu lagi
import { useRouter } from 'next/router';
import ProtectedRoute from '../../../components/ProtectedRoute';
import AdminLayout from '../../../components/AdminLayout'; // BARU: Import AdminLayout

export default function NewUser() {
  const router = useRouter();

  // State untuk data form pengguna baru
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    role: 'Contributor',
    status: 'Active'
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!user.name || !user.email || !user.password) {
      setError('Nama Lengkap, Email, dan Password wajib diisi.');
      return;
    }
    if (user.password.length < 8) {
      setError('Password minimal harus 8 karakter.');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      const newUser = await response.json();
      alert(`Pengguna ${newUser.name} berhasil ditambahkan!`);
      router.push('/admin/users');
    } catch (err) {
      setError('Gagal menambahkan pengguna: ' + err.message);
      console.error("Gagal menambahkan pengguna:", err);
    } finally {
        setIsSubmitting(false);
    }
  };

  return (
    <ProtectedRoute>
      {/* DIUBAH: Seluruh halaman dibungkus AdminLayout */}
      <AdminLayout>
        <Head>
          <title>Tambah Pengguna Baru - Valerie CMS</title>
        </Head>
        
        {/* DIHAPUS: Semua kode <nav> dan div pembungkusnya dihapus */}

        <main className="py-6">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-6">
              <div className="flex items-center">
                <Link href="/admin/users" className="text-primary-600 hover:text-primary-800 flex items-center">
                  <svg className="h-5 w-5 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
                  </svg>
                  Kembali
                </Link>
                <h1 className="text-2xl font-bold text-gray-900 ml-4">Tambah Pengguna Baru</h1>
              </div>
            </div>

            {/* Menampilkan pesan error jika ada */}
            {error && (
                <div className="mb-4 p-4 bg-red-100 text-red-700 border border-red-400 rounded">
                    {error}
                </div>
            )}
            
            <form onSubmit={handleSubmit} className="bg-white shadow sm:rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <div className="space-y-6">
                  {/* Nama */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                      Nama Lengkap
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      value={user.name}
                      onChange={handleChange}
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    />
                  </div>
                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Alamat Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      value={user.email}
                      onChange={handleChange}
                      required
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    />
                  </div>
                  {/* Password */}
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                      Password
                    </label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      value={user.password}
                      onChange={handleChange}
                      required
                      minLength="8"
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    />
                    <p className="mt-2 text-sm text-gray-500">
                      Minimal 8 karakter.
                    </p>
                  </div>
                  {/* Role */}
                  <div>
                    <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                      Role
                    </label>
                    <select
                      id="role"
                      name="role"
                      value={user.role}
                      onChange={handleChange}
                      className="mt-1 block w-full bg-white border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    >
                      <option value="Admin">Admin</option>
                      <option value="Contributor">Contributor</option>
                    </select>
                    <p className="mt-2 text-sm text-gray-500">
                      {user.role === 'Admin' 
                        ? 'Admin dapat mengelola semua fitur sistem' 
                        : 'Contributor dapat membuat dan mengelola artikel'}
                    </p>
                  </div>
                  {/* Status */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Status</label>
                    <div className="mt-2 space-y-2">
                      <div className="flex items-center">
                        <input
                          id="active"
                          name="status"
                          type="radio"
                          value="Active"
                          checked={user.status === 'Active'}
                          onChange={handleChange}
                          className="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300"
                        />
                        <label htmlFor="active" className="ml-3 block text-sm font-medium text-gray-700">
                          Active
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          id="inactive"
                          name="status"
                          type="radio"
                          value="Inactive"
                          checked={user.status === 'Inactive'}
                          onChange={handleChange}
                          className="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300"
                        />
                        <label htmlFor="inactive" className="ml-3 block text-sm font-medium text-gray-700">
                          Inactive
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                <div className="flex justify-end space-x-3">
                  <Link
                    href="/admin/users"
                    className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  >
                    Batal
                  </Link>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
                  >
                    {isSubmitting ? 'Menyimpan...' : 'Tambah Pengguna'}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </main>
      </AdminLayout>
    </ProtectedRoute>
  );
}