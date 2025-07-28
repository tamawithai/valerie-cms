import Link from 'next/link';

// Komponen Ikon sederhana
const MailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>
);
const PhoneIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
);
const LocationIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg>
);

// Menerima props 'contactInfo' dan 'services'
export default function Footer({ contactInfo, services }) {
  
  return (
    <footer className="bg-gray-900/50 text-white py-12 mt-16">
      <div className="container mx-auto px-4">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* Kolom 1: Brand & Kontak (SEKARANG DINAMIS) */}
          <div className="md:col-span-2">
            {/* ================== AWAL PERUBAHAN ================== */}
            <h3 className="font-bold text-2xl mb-2">{contactInfo?.title || 'Judul Kontak Belum Diatur'}</h3>
            <p className="text-gray-400 mb-4 max-w-md">{contactInfo?.description || 'Deskripsi kontak belum diatur dari admin.'}</p>
            {/* ================== AKHIR PERUBAHAN ================== */}
            
            {contactInfo && (
              <div className="space-y-2 text-gray-300">
                <div className="flex items-center gap-3">
                  <MailIcon /> <a href={`mailto:${contactInfo.email}`} className="hover:text-white">{contactInfo.email}</a>
                </div>
                <div className="flex items-center gap-3">
                  <PhoneIcon /> <a href={`tel:${contactInfo.phone}`} className="hover:text-white">{contactInfo.phone}</a>
                </div>
                <div className="flex items-center gap-3">
                  <LocationIcon /> <span>{contactInfo.address}</span>
                </div>
              </div>
            )}
          </div>

          {/* Kolom 2: Navigasi */}
          <div>
            <h3 className="font-bold text-lg mb-4">Navigasi</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/#features" legacyBehavior><a className="hover:text-white">Fitur</a></Link></li>
              <li><Link href="/#services" legacyBehavior><a className="hover:text-white">Layanan</a></Link></li>
              <li><Link href="/blog" legacyBehavior><a className="hover:text-white">Blog</a></Link></li>
              <li><Link href="/#contact" legacyBehavior><a className="hover:text-white">Kontak</a></Link></li>
            </ul>
          </div>

          {/* Kolom 3: Layanan Dinamis */}
          <div>
            <h3 className="font-bold text-lg mb-4">Layanan</h3>
            {/* Bagian ini akan memeriksa apakah 'services' ada dan tidak kosong */}
            {services && services.length > 0 ? (
              <ul className="space-y-2 text-gray-400">
                {services.map((service) => (
                  <li key={service.id}>{service.title}</li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">Tidak ada layanan.</p>
            )}
          </div>
        </div>

        <hr className="border-t border-white/10 my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} {contactInfo?.title || 'Valerie CMS'}. Dibuat dengan ❤️ menggunakan React & Tailwind CSS.
          </p>
          <div className="flex space-x-4 text-gray-400 text-sm">
            <a href="/syarat-ketentuan" className="hover:text-white">Syarat & Ketentuan</a>
            <a href="/kebijakan-privasi" className="hover:text-white">Kebijakan Privasi</a>
          </div>
        </div>
      </div>
    </footer>
  );
}