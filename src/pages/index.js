import Head from 'next/head';
import { useRef, useCallback } from 'react';
import { PrismaClient } from '@prisma/client';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

// Icon untuk tombol slider
const ChevronLeft = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m15 18-6-6 6-6" />
  </svg>
);

const ChevronRight = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m9 18 6-6-6-6" />
  </svg>
);

// Komponen Home sekarang menerima 'content' dari getServerSideProps
export default function Home({ content, contactInfo, services }) {
  // Logic untuk slider tetap dipertahankan
  const sliderRef = useRef(null);

  const scroll = useCallback((direction) => {
    const { current } = sliderRef;
    if (current) {
      const scrollAmount = current.offsetWidth;
      if (direction === 'left') {
        current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  }, []);

  return (
    <div className="relative overflow-x-hidden">
      <Head>
        <title>
          {content.hero?.title || "Valerie CMS - Solusi Konten UKM"}
        </title>
        <meta
          name="description"
          content={
            content.hero?.description ||
            "Content Management System sederhana untuk UKM"
          }
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>

      <div className="fixed inset-0 -z-10 ambient-orbs pointer-events-none"></div>

      <Navbar />

      <main>
        {/* Hero Section dengan data dinamis */}
        <section className="relative h-[90vh] min-h-[600px] flex items-center justify-center text-center overflow-hidden">
          <div
            ref={sliderRef}
            className="absolute inset-0 w-full h-full flex overflow-x-auto snap-x snap-mandatory scroll-smooth"
          >
            {content.sliders?.map((slide) => (
              <div
                key={slide.id}
                className="relative w-full h-full flex-shrink-0 snap-center"
              >
                <img
                  src={
                    slide.image ||
                    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                  }
                  className="w-full h-full object-cover"
                  alt={slide.title}
                />
                <div className="absolute inset-0 bg-black/50"></div>
              </div>
            ))}
          </div>

          <div className="relative z-10 container px-4 animate-fade-in">
            <div className="glass-card p-8 md:p-12 max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-6xl font-bold mb-4 text-white">
                {content.hero?.title || "Valerie CMS"}
              </h1>
              <p className="text-xl md:text-2xl text-gray-200 mb-8">
                {content.hero?.description ||
                  "Solusi Konten Terbaik untuk UKM."}
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <a
                  href={content.hero?.buttonLink || "#features"}
                  className="btn btn-primary"
                >
                  {content.hero?.buttonText || "Lihat Fitur"}
                </a>
                <a href="/admin/login" className="btn btn-outline">
                  Coba Demo
                </a>
              </div>
            </div>
          </div>

          <button
            onClick={() => scroll("left")}
            className="absolute z-20 left-4 top-1/2 -translate-y-1/2 btn-outline !p-3 !rounded-full opacity-70 hover:opacity-100"
          >
            <ChevronLeft />
          </button>
          <button
            onClick={() => scroll("right")}
            className="absolute z-20 right-4 top-1/2 -translate-y-1/2 btn-outline !p-3 !rounded-full opacity-70 hover:opacity-100"
          >
            <ChevronRight />
          </button>
        </section>

        {/* Features Section dengan data dinamis */}
        <section id="features" className="py-20 md:py-28">
          <div className="container">
            <div className="text-center slide-up">
              <h2 className="section-title">Fitur Utama</h2>
              <p className="section-subtitle">
                Sistem manajemen konten yang dirancang khusus untuk UKM
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
              {content.features?.map((feature, index) => (
                <div
                  key={index}
                  className="glass-card p-6 text-center glass-card-hover slide-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="text-5xl mb-5 inline-block ">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-white">
                    {feature.title}
                  </h3>
                  <p className="text-gray-300">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About Section dengan data dinamis */}
        <section className="py-20 md:py-28 bg-white/5">
          <div className="container">
            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
              <div className="lg:w-1/2 slide-up">
                <h2 className="section-title !text-left">
                  {content.about?.title || "Tentang Valerie CMS"}
                </h2>
                <p
                  className="text-gray-300 mb-8 leading-relaxed"
                  dangerouslySetInnerHTML={{
                    __html:
                      content.about?.content?.replace(/\n/g, "<br />") ||
                      "Konten tentang kami.",
                  }}
                />
                <a href="#contact" className="btn btn-primary">
                  Hubungi Kami
                </a>
              </div>
              <div
                className="lg:w-1/2 flex justify-center slide-up"
                style={{ animationDelay: "200ms" }}
              >
                <div className="glass-card p-2">
                  <img
                    src={
                      content.about?.image ||
                      "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                    }
                    alt={content.about?.title}
                    className="rounded-xl shadow-lg max-w-full h-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section dengan data dinamis */}
        <section className="py-20 md:py-28">
          <div className="container">
            <div className="text-center slide-up">
              <h2 className="section-title">Layanan Kami</h2>
              <p className="section-subtitle">
                Solusi lengkap untuk kebutuhan digital UKM Anda
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              {content.services?.map((service, index) => (
                <div
                  key={service.id || index}
                  className="glass-card p-8 text-center glass-card-hover slide-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <h3 className="text-xl font-semibold mb-3 text-white">
                    {service.title}
                  </h3>
                  <p className="text-gray-300">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section dengan data dinamis */}
        <section className="py-20 md:py-28 bg-gradient-to-r from-blue-500/10 to-purple-600/10">
          <div className="container">
            <div className="text-center slide-up">
              <h2 className="section-title">Apa Kata Mereka</h2>
              <p className="section-subtitle">
                Pengalaman nyata dari pengguna Valerie CMS
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
              {content.testimonials?.map((testimonial, index) => (
                <div
                  key={testimonial.id || index}
                  className="glass-card p-8 slide-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <p className="text-gray-200 italic text-lg mb-6">
                    "{testimonial.content}"
                  </p>
                  <div className="flex items-center">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full mr-4 border-2 border-purple-400/50"
                    />
                    <div>
                      <h4 className="font-semibold text-white">
                        {testimonial.name}
                      </h4>
                      <p className="text-gray-400 text-sm">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section (tetap statis) */}
        <section id="contact" className="py-20 md:py-28">
          <div className="container">
            <div className="text-center slide-up">
              <h2 className="section-title">Hubungi Kami</h2>
              <p className="section-subtitle">
                Punya pertanyaan? Kami siap membantu Anda.
              </p>
            </div>

            <div
              className="max-w-2xl mx-auto mt-12 slide-up"
              style={{ animationDelay: "200ms" }}
            >
              <form className="space-y-6 p-8 glass-card">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Nama Lengkap
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="glass-input"
                    placeholder="Nama Anda"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="glass-input"
                    placeholder="email@anda.com"
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Pesan
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="glass-input"
                    placeholder="Tulis pesan Anda di sini..."
                  ></textarea>
                </div>
                <button type="submit" className="w-full btn btn-primary">
                  Kirim Pesan
                </button>
              </form>
            </div>

          </div>
        </section>
      </main>

      <Footer contactInfo={contactInfo} services={services} />
    </div>
  );
}

// Fungsi ini berjalan di server untuk mengambil data sebelum halaman dikirim ke browser
export async function getServerSideProps() {
  const prisma = new PrismaClient();
  let dbContent = null;

  try {
    dbContent = await prisma.landingPage.findFirst({
      where: { id: 1 },
    });
  } catch (error) {
    console.error("Gagal mengambil data landing page:", error);
  } finally {
    await prisma.$disconnect();
  }

  // Sediakan data default jika database kosong, untuk mencegah error
  const defaultContent = {
    hero: { title: "Selamat Datang di Valerie CMS", description: "Kelola konten Anda melalui halaman admin.", buttonText: "Lihat Fitur", buttonLink: "#features", backgroundImage: "" },
    sliders: [{ id: 1, title: 'Default Slider', description: 'Description', image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80' }],
    features: [
        { title: "Manajemen Blog", description: "Buat dan kelola artikel dengan mudah.", icon: "📝" },
        { title: "Landing Page Dinamis", description: "Kelola tampilan website Anda tanpa coding.", icon: "🖥️" },
        { title: "Multi Pengguna", description: "Role Admin dan Contributor dengan hak akses berbeda.", icon: "👥" },
        { title: "Desain Profesional", description: "Template yang indah dan modern.", icon: "🎨" }
    ],
    about: { title: "Tentang Kami", content: "Isi bagian tentang kami dari dashboard admin.", image: "" },
    services: [{id: 1, title: 'Layanan Default', description: 'Deskripsi layanan default'}],
    testimonials: [{id: 1, name: 'Pengguna', role: 'Tester', content: 'Sangat mudah digunakan!', avatar: 'https://randomuser.me/api/portraits/lego/1.jpg'}],
    contact: { title: "", description: "", email: "", phone: "", address: "" }
  };

const content = dbContent ? dbContent.content : defaultContent;

return {
  props: {
    content: content,
    contactInfo: content.contact || null,
    services: content.services || [], // <-- TAMBAHKAN BARIS INI
  },
};
}