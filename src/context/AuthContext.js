// src/context/AuthContext.js
import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie'; // Untuk membaca/menulis cookies di client

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Cek status login saat aplikasi dimuat
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        // Coba ambil data user dari API endpoint khusus
        // Misalnya: /api/auth/me
        const response = await fetch('/api/auth/me');
        if (response.ok) {
          const userData = await response.json();
          setUser(userData.user);
        } else {
          // Jika tidak login, pastikan state user null
          setUser(null);
        }
      } catch (err) {
        console.error("Error checking login status:", err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkLoginStatus();
  }, []);

  const login = async (email, password, rememberMe = false) => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Login failed');
      }

      setUser(data.user);

      // Jika "Ingat saya" dicentang, set cookie dengan masa berlaku lama
      // Jika tidak, set cookie sesi (akan hilang saat browser ditutup)
      const cookieOptions = rememberMe ? { expires: 7 } : {}; // 7 hari
      Cookies.set('isLoggedIn', 'true', cookieOptions);

      return { success: true };
    } catch (error) {
      console.error("Login error in context:", error);
      return { success: false, message: error.message };
    }
  };

  const logout = async () => {
    try {
      // Panggil API logout untuk membersihkan session di server (jika ada)
      await fetch('/api/auth/logout', { method: 'POST' });
    } catch (err) {
      console.error("Error calling logout API:", err);
    } finally {
      // Bersihkan state dan cookie di client
      setUser(null);
      Cookies.remove('isLoggedIn');
      // Redirect ke halaman login
      router.push('/admin/login');
    }
  };

  const value = {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user, // Boolean shorthand untuk mengecek apakah user ada
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}