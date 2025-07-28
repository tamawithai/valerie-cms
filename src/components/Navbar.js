import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass-nav">
      <div className="container flex items-center justify-between h-20">
        <Link href="/" className="text-2xl font-bold text-white tracking-wider">
          VALERIE
        </Link>
        
        <div className="hidden md:flex items-center space-x-8">
          <Link href="/" className="text-gray-300 hover:text-white transition-colors">
            Beranda
          </Link>
          <Link href="/blog" className="text-gray-300 hover:text-white transition-colors">
            Blog
          </Link>
          <Link href="/#features" className="text-gray-300 hover:text-white transition-colors">
            Fitur
          </Link>
          <Link href="/#contact" className="text-gray-300 hover:text-white transition-colors">
            Kontak
          </Link>
        </div>
        
        <div>
          <Link href="/admin/login" className="btn btn-primary !px-5 !py-2.5">
            Masuk
          </Link>
        </div>
      </div>
    </nav>
  );
}