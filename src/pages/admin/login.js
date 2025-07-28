// src/pages/admin/login.js
import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../context/AuthContext';

export default function AdminLogin() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const result = await login(email, password, rememberMe);
      if (result.success) {
        router.push('/admin/dashboard');
      } else {
        throw new Error(result.message);
      }
    } catch (err) {
      console.error("Login error:", err);
      setError(err.message || 'Login gagal. Periksa kembali email dan password Anda.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Login Admin - Valerie CMS</title>
        <meta name="description" content="Login ke dashboard administrator Valerie CMS" />
      </Head>

      <div className="relative min-h-screen bg-gray-900 bg-gradient-to-br from-gray-900 via-slate-900 to-gray-800 flex flex-col justify-center items-center py-12 sm:px-6 lg:px-8">
        
        {/* Efek bola cahaya di latar belakang */}
        <div className="fixed inset-0 -z-10 ambient-orbs pointer-events-none"></div>

        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-white tracking-wider mb-2">VALERIE</h1>
            <h2 className="text-2xl font-bold text-white">
              Masuk ke Dashboard
            </h2>
            <p className="mt-2 text-sm text-gray-400">
              Valerie CMS Admin Panel
            </p>
          </div>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="glass-card py-8 px-4 sm:px-10">
            {/* Error Message */}
            {error && (
              <div className="mb-4 bg-red-500/20 border border-red-500/30 text-red-300 px-4 py-3 rounded-lg" role="alert">
                <span className="block sm:inline">{error}</span>
              </div>
            )}

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                  Alamat Email
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="glass-input"
                    placeholder="email@anda.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                  Password
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="glass-input"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-4 w-4 text-blue-500 focus:ring-blue-400 bg-transparent border-gray-500 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-200">
                    Ingat saya
                  </label>
                </div>

                <div className="text-sm">
                  <a href="#" className="font-medium text-blue-400 hover:text-blue-300">
                    Lupa password?
                  </a>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full btn btn-primary disabled:opacity-50"
                >
                  {loading ? 'Memproses...' : 'Masuk'}
                </button>
              </div>
            </form>
          </div>

          <div className="mt-6 text-center">
            <Link href="/" className="text-sm font-medium text-blue-400 hover:text-blue-300">
              ← Kembali ke beranda
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}