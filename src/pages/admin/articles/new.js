// KODE DIMULAI
import Head from 'next/head';
import Link from 'next/link';
import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import ProtectedRoute from '../../../components/ProtectedRoute';
import AdminLayout from '../../../components/AdminLayout';
import dynamic from 'next/dynamic';
// Quill CSS
import 'react-quill/dist/quill.snow.css';

// Import hanya di client
const ReactQuill = dynamic(() => import('react-quill'), {
  ssr: false,
  loading: () => <p>Loading editor…</p>,
});

export default function NewArticle() {
  const router = useRouter();
  const [categories, setCategories] = useState([]);
  const [article, setArticle] = useState({
    title: '',
    excerpt: '',
    content: '',
    categoryId: '',
    tags: '',
    status: 'Draft',
    authorId: 1, // Ganti dengan ID user yang login jika sudah ada context
    thumbnail: ''
  });
  const [thumbnailPreview, setThumbnailPreview] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [showPreview, setShowPreview] = useState(false);

  // Ambil kategori saat mount
  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await fetch('/api/categories');
        if (!response.ok) throw new Error('Gagal memuat kategori');
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        setSubmitError('Tidak dapat memuat daftar kategori.');
      }
    }
    fetchCategories();
  }, []);

  // --- TipTap Editor ---
  const [isClient, setIsClient] = useState(false);
  useEffect(() => { setIsClient(true); }, []);

  // --- Handle Input Form ---
  const handleChange = (e) => {
    const { name, value } = e.target;
    setArticle((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // --- Upload Thumbnail ke Cloudinary ---
  const handleThumbnailChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setThumbnailPreview(URL.createObjectURL(file));
    setIsUploading(true);
    setSubmitError(null);

    // Buat FormData untuk upload file ke /api/upload-image (buat endpoint ini jika belum ada)
    const formData = new FormData();
    formData.append('file', file);

    try {
      console.log('📤 Uploading thumbnail file:', file);
      const res = await fetch('/api/upload-image', {
        method: 'POST',
        body: formData
      });
      console.log('📥 /api/upload-image status:', res.status);
      if (!res.ok) {
          const errText = await res.text();
          throw new Error('Gagal upload thumbnail: ' + res.status + ' ' + errText);
        }
      
    
      const data = await res.json();
      console.log('🎉 Upload succeeded, got:', data);
      setArticle(prev => ({ ...prev, thumbnail: data.url }));
    } catch (err) {
      setSubmitError('Upload gambar gagal. ' + err.message);
      setThumbnailPreview('');
    } finally {
      setIsUploading(false);
    }
  };

  // --- Submit Artikel ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      if (!article.title.trim() || !article.content.trim() || !article.categoryId) {
        throw new Error('Judul, konten, dan kategori wajib diisi.');
      }

      const { categoryId, authorId, ...restOfArticle } = article;

      const payload = {
        ...article,
        authorId: article.authorId || 1, // fallback ke 1 jika kosong
        categoryId: article.categoryId, // WAJIB: dari select dropdown
      };

      const response = await fetch("/api/articles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });


      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to create article');
      }

      const newArticle = await response.json();
      alert('Artikel berhasil dibuat!');
      router.push(`/admin/articles/${newArticle.id}`);

    } catch (error) {
      setSubmitError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- Preview Artikel Modal ---
  const ArticlePreview = useCallback(() => (
    <div className="fixed z-40 inset-0 flex items-center justify-center bg-black bg-opacity-60">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full relative shadow-xl">
        <button
          className="absolute top-2 right-3 text-gray-600 hover:text-red-600 text-xl"
          onClick={() => setShowPreview(false)}
        >
          ×
        </button>
        <h2 className="text-2xl font-bold mb-2">{article.title}</h2>
        <div className="mb-2 text-gray-600">{article.excerpt}</div>
        {thumbnailPreview || article.thumbnail ? (
          <img
            src={thumbnailPreview || article.thumbnail}
            alt="Thumbnail Preview"
            className="rounded w-full max-h-64 object-cover mb-3"
          />
        ) : null}
        <div className="prose max-w-full" dangerouslySetInnerHTML={{ __html: article.content }} />
      </div>
    </div>
  ), [article, thumbnailPreview]);

  return (
    <ProtectedRoute>
      <AdminLayout>
        <Head>
          <title>Buat Artikel Baru - Valerie CMS</title>
        </Head>

        <main className="py-6">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-6 flex items-center">
              <Link
                href="/admin/articles"
                className="text-primary-600 hover:text-primary-800 flex items-center"
              >
                <svg
                  className="h-5 w-5 mr-1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
                    clipRule="evenodd"
                  />
                </svg>
                Kembali
              </Link>
              <h1 className="text-2xl font-bold text-gray-900 ml-4">
                Buat Artikel Baru
              </h1>
            </div>

            {/* Error Message */}
            {submitError && (
              <div className="mb-6 bg-red-50 border-l-4 border-red-400 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg
                      className="h-5 w-5 text-red-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-red-700">{submitError}</p>
                  </div>
                </div>
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              className="bg-white shadow sm:rounded-lg"
            >
              <div className="px-4 py-5 sm:p-6 space-y-6">
                {/* Judul */}
                <div>
                  <label
                    htmlFor="title"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Judul Artikel
                  </label>
                  <input
                    type="text"
                    name="title"
                    id="title"
                    value={article.title}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  />
                </div>
                {/* Excerpt */}
                <div>
                  <label
                    htmlFor="excerpt"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Ringkasan (Excerpt)
                  </label>
                  <textarea
                    id="excerpt"
                    name="excerpt"
                    rows={3}
                    value={article.excerpt}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    placeholder="Ringkasan singkat tentang artikel ini..."
                  />
                </div>
                {/* Editor */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Konten Artikel
                  </label>
                  <div className="mt-1">
                    <ReactQuill
                      theme="snow"
                      value={article.content}
                      onChange={(html) =>
                        setArticle((prev) => ({ ...prev, content: html }))
                      }
                      modules={{
                        toolbar: [
                          [{ font: [] }],
                          [{ header: [1, 2, 3, 4, 5, 6, false] }],
                          ["bold", "italic", "underline", "strike"],
                          [{ color: [] }, { background: [] }],
                          [{ script: "sub" }, { script: "super" }],
                          ["blockquote", "code-block"],
                          [
                            { list: "ordered" },
                            { list: "bullet" },
                            { indent: "-1" },
                            { indent: "+1" },
                          ],
                          [{ align: [] }],
                          ["link", "image", "video"],
                          ["clean"],
                        ],
                      }}
                      formats={[
                        "font",
                        "header",
                        "bold",
                        "italic",
                        "underline",
                        "strike",
                        "color",
                        "background",
                        "script",
                        "blockquote",
                        "code-block",
                        "list",
                        "bullet",
                        "indent",
                        "align",
                        "link",
                        "image",
                        "video",
                        "clean",
                      ]}
                      style={{
                        minHeight: 300, // Perbesar tinggi editor minimum (300px, bisa ganti ke 400px)
                        fontSize: "1rem", // Ukuran font lebih besar
                        color: "#1a202c", // Tailwind gray-800, font lebih gelap
                        background: "white",
                      }}
                    />
                    <style jsx global>{`
                      .ql-editor {
                        min-height: 300px !important; /* Editor lebih tinggi */
                        font-size: 1.02rem !important; /* Font lebih besar */
                        color: #1a202c !important; /* Warna font lebih gelap */
                        background: #fff !important; /* Background tetap putih */
                      }
                      .ql-toolbar {
                        background: #f9fafb;
                      }
                    `}</style>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">
                    * Gunakan format rich text, gambar embed dan lainnya
                  </p>
                </div>
                {/* Thumbnail Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Thumbnail Artikel
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleThumbnailChange}
                    className="mt-1"
                  />
                  {isUploading && (
                    <p className="text-xs text-blue-600 mt-1">
                      Mengupload gambar...
                    </p>
                  )}
                  {(thumbnailPreview || article.thumbnail) && (
                    <img
                      src={thumbnailPreview || article.thumbnail}
                      alt="Preview Thumbnail"
                      className="mt-2 rounded max-h-40 border"
                    />
                  )}
                </div>
                {/* Tags */}
                <div>
                  <label
                    htmlFor="tags"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Tags (pisahkan dengan koma)
                  </label>
                  <input
                    type="text"
                    name="tags"
                    id="tags"
                    value={article.tags}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                    placeholder="tips, bisnis, ukm"
                  />
                </div>
                {/* Kategori */}
                <div>
                  <label
                    htmlFor="category"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Kategori
                  </label>
                  <select
                    id="category"
                    name="categoryId"
                    value={article.categoryId}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  >
                    <option value="" disabled>
                      Pilih Kategori
                    </option>
                    {categories.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
                {/* Status */}
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Status
                  </label>
                  <div className="mt-2 space-y-2">
                    <div className="flex items-center">
                      <input
                        id="draft"
                        name="status"
                        type="radio"
                        value="Draft"
                        checked={article.status === "Draft"}
                        onChange={handleChange}
                        className="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300"
                      />
                      <label
                        htmlFor="draft"
                        className="ml-3 block text-sm font-medium text-gray-700"
                      >
                        Draft
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="pending"
                        name="status"
                        type="radio"
                        value="Pending"
                        checked={article.status === "Pending"}
                        onChange={handleChange}
                        className="focus:ring-primary-500 h-4 w-4 text-primary-600 border-gray-300"
                      />
                      <label
                        htmlFor="pending"
                        className="ml-3 block text-sm font-medium text-gray-700"
                      >
                        Pending (Menunggu Moderasi)
                      </label>
                    </div>
                  </div>
                </div>
                {/* Tombol Action */}
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    className="inline-flex items-center px-4 py-2 border border-primary-500 text-primary-700 rounded-md bg-white hover:bg-gray-50"
                    onClick={() => setShowPreview(true)}
                  >
                    Preview
                  </button>
                  <Link
                    href="/admin/articles"
                    className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  >
                    Batal
                  </Link>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Menyimpan...
                      </>
                    ) : (
                      "Simpan Artikel"
                    )}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </main>
        {/* PREVIEW MODAL */}
        {showPreview && <ArticlePreview />}
      </AdminLayout>
    </ProtectedRoute>
  );
}
// KODE DI AKHIRI
