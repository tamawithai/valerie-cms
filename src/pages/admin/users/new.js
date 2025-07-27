import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import ProtectedRoute from '../../components/ProtectedRoute';

export default function NewUser() {
  const [user, setUser] = useState({
    name: '',
    email: '',
    role: 'Contributor',
    status: 'Active'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Pengguna akan ditambahkan (simulasi). Nanti akan terhubung ke Firebase.');
    // Di sini nanti akan kita hubungkan ke Firebase
  };

  return (
    <ProtectedRoute>
    <>
      <Head>
        <title>Tambah Pengguna Baru - Valerie CMS</title>
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
                  <Link href="/admin/articles" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                    Artikel
                  </Link>
                  <Link href="/admin/landing" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                    Landing Page
                  </Link>
                  <Link href="/admin/users" className="border-primary-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
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

                  {/* Informasi Password */}
                  <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 102 0v-3a1 1 0 10-2 0zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div className="ml-3">
                        <h3 className="text-sm font-medium text-blue-800">Informasi Password</h3>
                        <div className="mt-2 text-sm text-blue-700">
                          <p>
                            Password akan dibuat secara otomatis dan dikirim ke email pengguna.
                          </p>
                        </div>
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
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  >
                    <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                    </svg>
                    Tambah Pengguna
                  </button>
                </div>
              </div>
            </form>
          </div>
        </main>
      </div>
    </>
    </ProtectedRoute>
  );
}