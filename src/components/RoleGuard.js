// src/components/RoleGuard.js
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function RoleGuard({ children, allowedRoles = ['Admin'] }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      // Jika user tidak ditemukan, redirect ke login
      if (!user) {
        router.push('/admin/login');
        return;
      }

      // Jika role user tidak diizinkan, redirect ke halaman sesuai role atau dashboard
      if (!allowedRoles.includes(user.role)) {
        if (user.role === 'Contributor') {
          router.push('/admin/contributor-dashboard'); // Jika ada
        } else {
          router.push('/admin/dashboard');
        }
      }
    }
  }, [user, loading, allowedRoles, router]);

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

  // Jika user ada dan rolenya diizinkan
  if (user && allowedRoles.includes(user.role)) {
    return <>{children}</>;
  }

  // Jika tidak memenuhi syarat, jangan render apa pun
  // (redirect akan ditangani oleh useEffect)
  return null;
}