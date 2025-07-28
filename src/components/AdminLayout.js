// src/components/AdminLayout.js (Versi Final dan Lengkap)
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext'; // Path ke AuthContext

export default function AdminLayout({ children }) {
  // --- Logika untuk Dropdown Menu User ---
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);
  const { user, logout } = useAuth(); // Dapatkan user dan fungsi logout

  // --- useEffect untuk menutup menu jika klik di luar ---
  useEffect(() => {
    function handleClickOutside(event) {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    }
    if (isUserMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isUserMenuOpen]);

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <span className="text-xl font-bold text-primary-600">Valerie CMS</span>
              </div>
              {/* Link Navigasi Utama */}
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <Link href="/admin/dashboard" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">Dashboard</Link>
                <Link href="/admin/articles" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">Artikel</Link>
                <Link href="/admin/categories" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">Kategori</Link>
                <Link href="/admin/moderation" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">Moderasi</Link>
                <Link href="/admin/landing" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">Landing Page</Link>
                <Link href="/admin/users" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">Pengguna</Link>
              </div>
            </div>

            {/* Tombol Aksi dan Menu User */}
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Link href="/admin/articles/new" className="relative inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                  <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                  <span>Buat Artikel</span>
                </Link>
              </div>

              {/* USER PROFILE DROPDOWN */}
              <div className="ml-3 relative">
                <div>
                  <button onClick={() => setIsUserMenuOpen(!isUserMenuOpen)} type="button" className="bg-white rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
                    <span className="sr-only">Open user menu</span>
                    <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center">
                      <span className="text-primary-800 font-medium">
                        {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                      </span>
                    </div>
                  </button>
                </div>
                {isUserMenuOpen && (
                  <div ref={userMenuRef} className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                    <div className="block px-4 py-2 text-sm text-gray-700 border-b border-gray-200">
                      <p className="font-medium truncate">{user?.name || 'User'}</p>
                      <p className="truncate text-gray-500 text-xs">{user?.email || ''}</p>
                    </div>
                    <button onClick={logout} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Keluar
                    </button>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </nav>

      <main>{children}</main>
    </div>
  );
}