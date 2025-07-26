import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulasi login - akan kita hubungkan ke Firebase nanti
    setTimeout(() => {
      setLoading(false);
      alert('Fitur login akan dihubungkan ke Firebase');
    }, 1000);
  };

  return (
    <>
      <Head>
        <title>Login Admin - Valerie CMS</title>
      </Head>

      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="text-center mb-4">
                <h2>Login Admin</h2>
                <p className="text-muted">Masuk ke dashboard Valerie CMS</p>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="form-group mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group mb-4">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <button 
                  type="submit" 
                  className="btn btn-primary w-100 mb-3"
                  disabled={loading}
                >
                  {loading ? 'Memproses...' : 'Masuk'}
                </button>

                <div className="text-center">
                  <Link href="/" className="text-muted">
                    ← Kembali ke beranda
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}