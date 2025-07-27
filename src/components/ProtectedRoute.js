// src/components/ProtectedRoute.js
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      // Jika tidak sedang loading dan tidak terautentikasi, redirect ke login
      router.push('/admin/login');
    }
  }, [isAuthenticated, loading, router]);

  // Jika sedang loading, tampilkan indikator
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Memeriksa autentikasi...</p>
        </div>
      </div>
    );
  }

  // Jika terautentikasi, tampilkan children (halaman yang dilindungi)
  if (isAuthenticated) {
    return <>{children}</>;
  }

  // Jika tidak terautentikasi dan tidak sedang loading, jangan tampilkan apa pun
  // (karena useEffect akan menangani redirect)
  return null;
}