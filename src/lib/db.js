// src/lib/db.js
import { neon } from '@neondatabase/serverless';

// Fungsi untuk membuat koneksi ke database
export async function connectToDatabase() {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not set in environment variables');
  }

  const sql = neon(process.env.DATABASE_URL);
  return sql;
}

// Fungsi bantu untuk inisialisasi tabel (jika belum ada)
export async function initializeDatabase() {
  const sql = await connectToDatabase();

  // Tabel Pengguna
  await sql`
    CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL,
      password_hash TEXT NOT NULL, -- Untuk menyimpan password yang di-hash
      role VARCHAR(50) NOT NULL DEFAULT 'Contributor', -- 'Admin' atau 'Contributor'
      status VARCHAR(50) NOT NULL DEFAULT 'Active', -- 'Active' atau 'Inactive'
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  // Tabel Artikel
  await sql`
    CREATE TABLE IF NOT EXISTS articles (
      id SERIAL PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      excerpt TEXT,
      content TEXT NOT NULL,
      author_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
      category VARCHAR(100),
      tags TEXT, -- Bisa disimpan sebagai string terpisah koma
      status VARCHAR(50) NOT NULL DEFAULT 'Draft', -- 'Draft', 'Pending', 'Published'
      published_at TIMESTAMP,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  // Tabel Konten Landing Page (disederhanakan)
  await sql`
    CREATE TABLE IF NOT EXISTS landing_page_content (
      id VARCHAR(50) PRIMARY KEY, -- 'hero', 'about', 'contact', dll
      data JSONB NOT NULL, -- Menyimpan seluruh konten dalam format JSON
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  console.log('Database tables initialized successfully.');
}