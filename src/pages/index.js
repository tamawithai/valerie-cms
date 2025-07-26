import Head from 'next/head';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function Home() {
  // Data dummy untuk slider
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
    }
  ];

  // Data dummy untuk fitur
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

  // Data dummy untuk layanan
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

  // Data dummy untuk testimoni
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

  return (
    <>
      <Head>
        <title>Valerie CMS - Solusi Konten UKM</title>
        <meta name="description" content="Content Management System sederhana untuk UKM" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </Head>

      <Navbar />

      {/* Hero Section dengan Slider Sederhana */}
      <section className="relative bg-gray-100">
        <div className="container mx-auto">
          <div className="carousel w-full rounded-box overflow-hidden">
            {slides.map((slide) => (
              <div key={slide.id} className="carousel-item relative w-full">
                <img 
                  src={slide.image} 
                  className="w-full h-96 object-cover" 
                  alt={slide.title} 
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center">
                  <div className="container text-center text-white px-4">
                    <h1 className="text-3xl md:text-5xl font-bold mb-4">{slide.title}</h1>
                    <p className="text-xl mb-8 max-w-2xl mx-auto">{slide.description}</p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                      <a href="#features" className="btn btn-primary">Lihat Fitur</a>
                      <a href="/admin/login" className="btn btn-outline bg-white text-white hover:bg-primary-700">Coba Demo</a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 bg-white">
        <div className="container">
          <h2 className="section-title">Fitur Utama</h2>
          <p className="section-subtitle">
            Sistem manajemen konten yang dirancang khusus untuk UKM
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
            {features.map((feature, index) => (
              <div key={index} className="card p-6 text-center fade-in">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2 fade-in">
              <h2 className="section-title">Tentang Valerie CMS</h2>
              <p className="text-gray-600 mb-6">
                Valerie CMS adalah solusi Content Management System yang dirancang khusus untuk membantu Usaha Kecil Menengah (UKM) mengelola konten website mereka dengan mudah dan profesional.
              </p>
              <p className="text-gray-600 mb-6">
                Dengan antarmuka yang bersih dan intuitif, siapa pun dapat membuat, mengedit, dan memublikasikan konten tanpa perlu pengetahuan teknis. Kami percaya bahwa setiap UKM berhak memiliki website yang menarik dan fungsional.
              </p>
              <a href="#contact" className="btn btn-primary">Hubungi Kami</a>
            </div>
            <div className="lg:w-1/2 flex justify-center fade-in">
              <img 
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Tentang Valerie CMS" 
                className="rounded-xl shadow-lg max-w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-white">
        <div className="container">
          <h2 className="section-title">Layanan Kami</h2>
          <p className="section-subtitle">
            Solusi lengkap untuk kebutuhan digital UKM Anda
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {services.map((service, index) => (
              <div key={index} className="card p-6 text-center fade-in">
                <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-primary-50">
        <div className="container">
          <h2 className="section-title text-primary-800">Apa Kata Mereka</h2>
          <p className="section-subtitle text-primary-700">
            Pengalaman nyata dari pengguna Valerie CMS
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="card p-6 fade-in">
                <div className="flex items-center mb-4">
                  <img 
                    src={testimonial.avatar} 
                    alt={testimonial.name} 
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-gray-600 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">"{testimonial.content}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-white">
        <div className="container">
          <h2 className="section-title">Hubungi Kami</h2>
          <p className="section-subtitle">
            Punya pertanyaan? Kami siap membantu Anda.
          </p>

          <div className="max-w-2xl mx-auto mt-12">
            <form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Nama Lengkap</label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Nama Anda"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                  placeholder="email@anda.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Pesan</label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                  placeholder="Tulis pesan Anda di sini..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full btn btn-primary"
              >
                Kirim Pesan
              </button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}