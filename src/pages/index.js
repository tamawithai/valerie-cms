import Head from 'next/head';
import { useRef, useCallback } from 'react'; // <-- Tambahkan import ini
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


export default function Home() {
  // Data dummy (tetap sama)
  const slides = [
    {
      id: 1,
      title: "Solusi Konten Terbaik untuk UKM",
      description: "Kelola website dan blog Anda dengan mudah tanpa perlu coding.",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    },
    {
      id: 2,
      title: "Desain Modern & Responsif",
      description: "Tampilan yang menarik di semua perangkat, dari desktop hingga mobile.",
      image: "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    },
    {
      id: 3,
      title: "Didukung AI Cerdas",
      description: "Optimalkan konten dan strategi SEO Anda dengan bantuan AI.",
      image: "https://images.unsplash.com/photo-1677756119517-756a188d2d9b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    }
  ];

  const features = [
    {
      title: "Manajemen Blog",
      description: "Buat dan kelola artikel dengan mudah. Sistem moderasi memastikan kualitas konten.",
      icon: "📝"
    },
    {
      title: "Landing Page Dinamis",
      description: "Kelola tampilan website Anda tanpa perlu coding. Semua bisa diatur dari dashboard.",
      icon: "🖥️"
    },
    {
      title: "Multi Pengguna",
      description: "Dua role pengguna: Admin dan Contributor dengan hak akses yang berbeda.",
      icon: "👥"
    },
    {
      title: "Desain Profesional",
      description: "Template yang indah dan modern untuk memberi kesan terbaik pada pelanggan.",
      icon: "🎨"
    }
  ];

  const services = [
    {
      title: "Pembuatan Website",
      description: "Buat website profesional untuk UKM Anda dengan cepat dan mudah."
    },
    {
      title: "Optimasi SEO",
      description: "Pastikan website Anda mudah ditemukan di mesin pencari."
    },
    {
      title: "Maintenance",
      description: "Dapatkan dukungan teknis dan pemeliharaan berkala."
    }
  ];

    const testimonials = [
    {
      name: "Budi Santoso",
      role: "Pemilik Toko Online",
      content: "Valerie CMS benar-benar mengubah cara saya mengelola konten toko online saya. Sangat mudah digunakan!",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
      name: "Siti Aminah",
      role: "Marketing UKM",
      content: "Dengan Valerie CMS, kami bisa update blog dan landing page kapan saja tanpa harus panggil programmer.",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg"
    }
  ];

  // Logic untuk slider baru
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
    // Wrapper div untuk menjaga posisi relatif
    <div className="relative overflow-x-hidden">
      <Head>
        <title>Valerie CMS - Solusi Konten UKM</title>
        <meta name="description" content="Content Management System sederhana untuk UKM" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </Head>
      
      {/* Efek bola cahaya di latar belakang */}
      <div className="fixed inset-0 -z-10 ambient-orbs pointer-events-none"></div>

      <Navbar />

      <main>
        {/* Hero Section dengan Slider BARU yang sudah diperbaiki */}
        <section className="relative h-[90vh] min-h-[600px] flex items-center justify-center text-center overflow-hidden">
          <div
            ref={sliderRef}
            className="absolute inset-0 w-full h-full flex overflow-x-auto snap-x snap-mandatory scroll-smooth"
          >
            {slides.map((slide, index) => (
              <div key={slide.id} className="relative w-full h-full flex-shrink-0 snap-center">
                <img
                  src={slide.image}
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
                    Valerie CMS
                </h1>
                <p className="text-xl md:text-2xl text-gray-200 mb-8">
                    Solusi Konten Terbaik untuk UKM. Kelola website dan blog Anda dengan mudah tanpa perlu coding.
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <a href="#features" className="btn btn-primary">Lihat Fitur</a>
                    <a href="/admin/login" className="btn btn-outline">Coba Demo</a>
                </div>
             </div>
          </div>
          
           {/* Tombol Navigasi Slider */}
          <button onClick={() => scroll('left')} className="absolute z-20 left-4 top-1/2 -translate-y-1/2 btn-outline !p-3 !rounded-full opacity-70 hover:opacity-100">
            <ChevronLeft />
          </button>
          <button onClick={() => scroll('right')} className="absolute z-20 right-4 top-1/2 -translate-y-1/2 btn-outline !p-3 !rounded-full opacity-70 hover:opacity-100">
            <ChevronRight />
          </button>
        </section>


        {/* Features Section */}
        <section id="features" className="py-20 md:py-28">
          <div className="container">
            <div className="text-center slide-up">
                <h2 className="section-title">Fitur Utama</h2>
                <p className="section-subtitle">
                    Sistem manajemen konten yang dirancang khusus untuk UKM
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
              {features.map((feature, index) => (
                <div key={index} className="glass-card p-6 text-center glass-card-hover slide-up" style={{animationDelay: `${index * 100}ms`}}>
                  <div className="text-5xl mb-5 inline-block ">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-2 text-white">{feature.title}</h3>
                  <p className="text-gray-300">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-20 md:py-28 bg-white/5">
          <div className="container">
            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
              <div className="lg:w-1/2 slide-up">
                <h2 className="section-title !text-left">Tentang Valerie CMS</h2>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  Valerie CMS adalah solusi Content Management System yang dirancang khusus untuk membantu Usaha Kecil Menengah (UKM) mengelola konten website mereka dengan mudah dan profesional.
                </p>
                <p className="text-gray-300 mb-8 leading-relaxed">
                  Dengan antarmuka yang bersih dan intuitif, siapa pun dapat membuat, mengedit, dan memublikasikan konten tanpa perlu pengetahuan teknis. Kami percaya bahwa setiap UKM berhak memiliki website yang menarik dan fungsional.
                </p>
                <a href="#contact" className="btn btn-primary">Hubungi Kami</a>
              </div>
              <div className="lg:w-1/2 flex justify-center slide-up" style={{animationDelay: '200ms'}}>
                <div className="glass-card p-2">
                    <img 
                        src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                        alt="Tentang Valerie CMS" 
                        className="rounded-xl shadow-lg max-w-full h-auto"
                    />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-20 md:py-28">
          <div className="container">
            <div className="text-center slide-up">
                <h2 className="section-title">Layanan Kami</h2>
                <p className="section-subtitle">
                    Solusi lengkap untuk kebutuhan digital UKM Anda
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              {services.map((service, index) => (
                <div key={index} className="glass-card p-8 text-center glass-card-hover slide-up" style={{animationDelay: `${index * 100}ms`}}>
                  <h3 className="text-xl font-semibold mb-3 text-white">{service.title}</h3>
                  <p className="text-gray-300">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 md:py-28 bg-gradient-to-r from-blue-500/10 to-purple-600/10">
          <div className="container">
            <div className="text-center slide-up">
                <h2 className="section-title">Apa Kata Mereka</h2>
                <p className="section-subtitle">
                    Pengalaman nyata dari pengguna Valerie CMS
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="glass-card p-8 slide-up" style={{animationDelay: `${index * 100}ms`}}>
                  <p className="text-gray-200 italic text-lg mb-6">"{testimonial.content}"</p>
                  <div className="flex items-center">
                    <img 
                      src={testimonial.avatar} 
                      alt={testimonial.name} 
                      className="w-12 h-12 rounded-full mr-4 border-2 border-purple-400/50"
                    />
                    <div>
                      <h4 className="font-semibold text-white">{testimonial.name}</h4>
                      <p className="text-gray-400 text-sm">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 md:py-28">
          <div className="container">
            <div className="text-center slide-up">
                <h2 className="section-title">Hubungi Kami</h2>
                <p className="section-subtitle">
                    Punya pertanyaan? Kami siap membantu Anda.
                </p>
            </div>
            <div className="max-w-2xl mx-auto mt-12 slide-up" style={{animationDelay: '200ms'}}>
              <form className="space-y-6 p-8 glass-card">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">Nama Lengkap</label>
                  <input
                    type="text"
                    id="name"
                    className="glass-input"
                    placeholder="Nama Anda"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                  <input
                    type="email"
                    id="email"
                    className="glass-input"
                    placeholder="email@anda.com"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">Pesan</label>
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

      <Footer />
    </div>
  );
}