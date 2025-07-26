import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

// Data dummy untuk simulasi user role
// Nanti akan diambil dari Firebase Auth
const getCurrentUser = () => {
  // Simulasi: return role berdasarkan kondisi
  // Dalam implementasi nyata, ini akan diambil dari context/auth
  return {
    id: 1,
    name: "Admin User",
    email: "admin@valeriecms.com",
    role: "Admin" // Bisa diganti ke "Contributor" untuk testing
  };
};

export default function RoleGuard({ children, allowedRoles = ['Admin'] }) {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulasi pengecekan user
    const currentUser = getCurrentUser();
    setUser(currentUser);
    
    // Cek apakah role user diizinkan
    if (currentUser && !allowedRoles.includes(currentUser.role)) {
      // Redirect ke halaman yang sesuai
      if (currentUser.role === 'Contributor') {
        router.push('/admin/contributor-dashboard');
      } else {
        router.push('/admin/login');
      }
    }
    
    setLoading(false);
  }, [allowedRoles, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Memeriksa hak akses...</p>
        </div>
      </div>
    );
  }

  // Jika user tidak ditemukan
  if (!user) {
    router.push('/admin/login');
    return null;
  }

  // Jika role tidak diizinkan
  if (!allowedRoles.includes(user.role)) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
            <svg className="h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h3 className="mt-4 text-lg font-medium text-gray-900">Akses Ditolak</h3>
          <p className="mt-2 text-sm text-gray-500">
            Anda tidak memiliki hak akses untuk melihat halaman ini.
          </p>
          <div className="mt-6">
            <button
              onClick={() => router.push('/admin/dashboard')}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              Kembali ke Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Jika user memiliki akses
  return children;
}