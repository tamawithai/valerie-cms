import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-white shadow-sm">
      <div className="container flex items-center justify-between h-16">
        <Link href="/" className="text-xl font-bold text-primary-600">
          VALERIE
        </Link>
        
        <div className="hidden md:flex items-center space-x-8">
          <Link href="/" className="text-gray-600 hover:text-primary-600 transition">
            Beranda
          </Link>
          <Link href="/blog" className="text-gray-600 hover:text-primary-600 transition">
            Blog
          </Link>
          <Link href="/#features" className="text-gray-600 hover:text-primary-600 transition">
            Fitur
          </Link>
          <Link href="/#contact" className="text-gray-600 hover:text-primary-600 transition">
            Kontak
          </Link>
        </div>
        
        <div>
          <Link href="/admin/login" className="btn btn-primary">
            Masuk
          </Link>
        </div>
      </div>
    </nav>
  );
}