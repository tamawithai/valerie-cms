import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';

export default function LandingPageManager() {
  // Data dummy untuk landing page content
  const [landingContent, setLandingContent] = useState({
    // Hero Section
    hero: {
      title: "Solusi Konten Terbaik untuk UKM",
      description: "Kelola website dan blog Anda dengan mudah tanpa perlu coding.",
      buttonText: "Lihat Fitur",
      buttonLink: "#features",
      backgroundImage: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    },
    
    // Slider/Carousel
    sliders: [
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
    ],
    
    // About Section
    about: {
      title: "Tentang Valerie CMS",
      content: "Valerie CMS adalah solusi Content Management System yang dirancang khusus untuk membantu Usaha Kecil Menengah (UKM) mengelola konten website mereka dengan mudah dan profesional. Dengan antarmuka yang bersih dan intuitif, siapa pun dapat membuat, mengedit, dan mempublikasikan konten tanpa perlu pengetahuan teknis.",
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
    },
    
    // Services
    services: [
      {
        id: 1,
        title: "Pembuatan Website",
        description: "Buat website profesional untuk UKM Anda dengan cepat dan mudah."
      },
      {
        id: 2,
        title: "Optimasi SEO",
        description: "Pastikan website Anda mudah ditemukan di mesin pencari."
      },
      {
        id: 3,
        title: "Maintenance",
        description: "Dapatkan dukungan teknis dan pemeliharaan berkala."
      }
    ],
    
    // Testimonials
    testimonials: [
      {
        id: 1,
        name: "Budi Santoso",
        role: "Pemilik Toko Online",
        content: "Valerie CMS benar-benar mengubah cara saya mengelola konten toko online saya. Sangat mudah digunakan!",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg"
      },
      {
        id: 2,
        name: "Siti Aminah",
        role: "Marketing UKM",
        content: "Dengan Valerie CMS, kami bisa update blog dan landing page kapan saja tanpa harus panggil programmer.",
        avatar: "https://randomuser.me/api/portraits/women/44.jpg"
      }
    ],
    
    // Contact Info
    contact: {
      title: "Hubungi Kami",
      description: "Punya pertanyaan? Kami siap membantu Anda.",
      email: "info@valeriecms.com",
      phone: "+62 812 3456 7890",
      address: "Jl. Teknologi No. 123, Jakarta"
    }
  });

  const [activeTab, setActiveTab] = useState('hero');

  const handleSave = (e) => {
    e.preventDefault();
    alert('Perubahan akan disimpan (simulasi). Nanti akan terhubung ke Firebase.');
  };

  // Fungsi untuk menambah slider
  const addSlider = () => {
    const newSlider = {
      id: Date.now(),
      title: "Slider Baru",
      description: "Deskripsi slider baru",
      image: "https://images.unsplash.com/photo-1500000000000-000000000000?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
    };
    setLandingContent({
      ...landingContent,
      sliders: [...landingContent.sliders, newSlider]
    });
  };

  // Fungsi untuk menghapus slider
  const removeSlider = (id) => {
    setLandingContent({
      ...landingContent,
      sliders: landingContent.sliders.filter(slider => slider.id !== id)
    });
  };

  // Fungsi untuk menambah service
  const addService = () => {
    const newService = {
      id: Date.now(),
      title: "Layanan Baru",
      description: "Deskripsi layanan baru"
    };
    setLandingContent({
      ...landingContent,
      services: [...landingContent.services, newService]
    });
  };

  // Fungsi untuk menghapus service
  const removeService = (id) => {
    setLandingContent({
      ...landingContent,
      services: landingContent.services.filter(service => service.id !== id)
    });
  };

  // Fungsi untuk menambah testimonial
  const addTestimonial = () => {
    const newTestimonial = {
      id: Date.now(),
      name: "Nama Pengguna",
      role: "Posisi",
      content: "Testimoni baru",
      avatar: "https://randomuser.me/api/portraits/lego/1.jpg"
    };
    setLandingContent({
      ...landingContent,
      testimonials: [...landingContent.testimonials, newTestimonial]
    });
  };

  // Fungsi untuk menghapus testimonial
  const removeTestimonial = (id) => {
    setLandingContent({
      ...landingContent,
      testimonials: landingContent.testimonials.filter(testimonial => testimonial.id !== id)
    });
  };

  // Render form berdasarkan tab aktif
  const renderTabContent = () => {
    switch(activeTab) {
      case 'hero':
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Judul Hero</label>
              <input
                type="text"
                value={landingContent.hero.title}
                onChange={(e) => setLandingContent({
                  ...landingContent,
                  hero: {...landingContent.hero, title: e.target.value}
                })}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Deskripsi</label>
              <textarea
                rows={3}
                value={landingContent.hero.description}
                onChange={(e) => setLandingContent({
                  ...landingContent,
                  hero: {...landingContent.hero, description: e.target.value}
                })}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Teks Tombol</label>
              <input
                type="text"
                value={landingContent.hero.buttonText}
                onChange={(e) => setLandingContent({
                  ...landingContent,
                  hero: {...landingContent.hero, buttonText: e.target.value}
                })}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Link Tombol</label>
              <input
                type="text"
                value={landingContent.hero.buttonLink}
                onChange={(e) => setLandingContent({
                  ...landingContent,
                  hero: {...landingContent.hero, buttonLink: e.target.value}
                })}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Background Image URL</label>
              <input
                type="text"
                value={landingContent.hero.backgroundImage}
                onChange={(e) => setLandingContent({
                  ...landingContent,
                  hero: {...landingContent.hero, backgroundImage: e.target.value}
                })}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
          </div>
        );
      
      case 'slider':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900">Slider Items</h3>
              <button
                type="button"
                onClick={addSlider}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                <svg className="-ml-0.5 mr-1 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Tambah Slider
              </button>
            </div>
            
            <div className="space-y-4">
              {landingContent.sliders.map((slider, index) => (
                <div key={slider.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="text-md font-medium text-gray-900">Slider {index + 1}</h4>
                    <button
                      type="button"
                      onClick={() => removeSlider(slider.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Judul</label>
                      <input
                        type="text"
                        value={slider.title}
                        onChange={(e) => {
                          const newSliders = [...landingContent.sliders];
                          newSliders[index].title = e.target.value;
                          setLandingContent({
                            ...landingContent,
                            sliders: newSliders
                          });
                        }}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Deskripsi</label>
                      <textarea
                        rows={2}
                        value={slider.description}
                        onChange={(e) => {
                          const newSliders = [...landingContent.sliders];
                          newSliders[index].description = e.target.value;
                          setLandingContent({
                            ...landingContent,
                            sliders: newSliders
                          });
                        }}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Image URL</label>
                      <input
                        type="text"
                        value={slider.image}
                        onChange={(e) => {
                          const newSliders = [...landingContent.sliders];
                          newSliders[index].image = e.target.value;
                          setLandingContent({
                            ...landingContent,
                            sliders: newSliders
                          });
                        }}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      
      case 'about':
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Judul About</label>
              <input
                type="text"
                value={landingContent.about.title}
                onChange={(e) => setLandingContent({
                  ...landingContent,
                  about: {...landingContent.about, title: e.target.value}
                })}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Konten About</label>
              <textarea
                rows={6}
                value={landingContent.about.content}
                onChange={(e) => setLandingContent({
                  ...landingContent,
                  about: {...landingContent.about, content: e.target.value}
                })}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Image URL</label>
              <input
                type="text"
                value={landingContent.about.image}
                onChange={(e) => setLandingContent({
                  ...landingContent,
                  about: {...landingContent.about, image: e.target.value}
                })}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
          </div>
        );
      
      case 'services':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900">Services</h3>
              <button
                type="button"
                onClick={addService}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                <svg className="-ml-0.5 mr-1 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Tambah Service
              </button>
            </div>
            
            <div className="space-y-4">
              {landingContent.services.map((service, index) => (
                <div key={service.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="text-md font-medium text-gray-900">Service {index + 1}</h4>
                    <button
                      type="button"
                      onClick={() => removeService(service.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Judul</label>
                      <input
                        type="text"
                        value={service.title}
                        onChange={(e) => {
                          const newServices = [...landingContent.services];
                          newServices[index].title = e.target.value;
                          setLandingContent({
                            ...landingContent,
                            services: newServices
                          });
                        }}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Deskripsi</label>
                      <textarea
                        rows={2}
                        value={service.description}
                        onChange={(e) => {
                          const newServices = [...landingContent.services];
                          newServices[index].description = e.target.value;
                          setLandingContent({
                            ...landingContent,
                            services: newServices
                          });
                        }}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      
      case 'testimonials':
        return (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900">Testimonials</h3>
              <button
                type="button"
                onClick={addTestimonial}
                className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
              >
                <svg className="-ml-0.5 mr-1 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                Tambah Testimonial
              </button>
            </div>
            
            <div className="space-y-4">
              {landingContent.testimonials.map((testimonial, index) => (
                <div key={testimonial.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <h4 className="text-md font-medium text-gray-900">Testimonial {index + 1}</h4>
                    <button
                      type="button"
                      onClick={() => removeTestimonial(testimonial.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Nama</label>
                      <input
                        type="text"
                        value={testimonial.name}
                        onChange={(e) => {
                          const newTestimonials = [...landingContent.testimonials];
                          newTestimonials[index].name = e.target.value;
                          setLandingContent({
                            ...landingContent,
                            testimonials: newTestimonials
                          });
                        }}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Posisi/Role</label>
                      <input
                        type="text"
                        value={testimonial.role}
                        onChange={(e) => {
                          const newTestimonials = [...landingContent.testimonials];
                          newTestimonials[index].role = e.target.value;
                          setLandingContent({
                            ...landingContent,
                            testimonials: newTestimonials
                          });
                        }}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Testimoni</label>
                      <textarea
                        rows={3}
                        value={testimonial.content}
                        onChange={(e) => {
                          const newTestimonials = [...landingContent.testimonials];
                          newTestimonials[index].content = e.target.value;
                          setLandingContent({
                            ...landingContent,
                            testimonials: newTestimonials
                          });
                        }}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Avatar URL</label>
                      <input
                        type="text"
                        value={testimonial.avatar}
                        onChange={(e) => {
                          const newTestimonials = [...landingContent.testimonials];
                          newTestimonials[index].avatar = e.target.value;
                          setLandingContent({
                            ...landingContent,
                            testimonials: newTestimonials
                          });
                        }}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      
      case 'contact':
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Judul Kontak</label>
              <input
                type="text"
                value={landingContent.contact.title}
                onChange={(e) => setLandingContent({
                  ...landingContent,
                  contact: {...landingContent.contact, title: e.target.value}
                })}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Deskripsi</label>
              <textarea
                rows={3}
                value={landingContent.contact.description}
                onChange={(e) => setLandingContent({
                  ...landingContent,
                  contact: {...landingContent.contact, description: e.target.value}
                })}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                value={landingContent.contact.email}
                onChange={(e) => setLandingContent({
                  ...landingContent,
                  contact: {...landingContent.contact, email: e.target.value}
                })}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Telepon</label>
              <input
                type="text"
                value={landingContent.contact.phone}
                onChange={(e) => setLandingContent({
                  ...landingContent,
                  contact: {...landingContent.contact, phone: e.target.value}
                })}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Alamat</label>
              <input
                type="text"
                value={landingContent.contact.address}
                onChange={(e) => setLandingContent({
                  ...landingContent,
                  contact: {...landingContent.contact, address: e.target.value}
                })}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
          </div>
        );
      
      default:
        return (
          <div className="text-center py-12">
            <p className="text-gray-500">Pilih tab untuk mengedit konten</p>
          </div>
        );
    }
  };

  return (
    <>
      <Head>
        <title>Manajemen Landing Page - Valerie CMS</title>
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Navbar - sama seperti sebelumnya */}
        <nav className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <div className="flex-shrink-0 flex items-center">
                  <span className="text-xl font-bold text-primary-600">Valerie CMS</span>
                </div>
                <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                  <Link href="/admin/dashboard" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                    Dashboard
                  </Link>
                  <Link href="/admin/articles" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                    Artikel
                  </Link>
                   <Link href="/admin/moderation" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                                      Moderasi
                                  </Link>
                  <Link href="/admin/landing" className="border-primary-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                    Landing Page
                  </Link>
                  <Link href="/admin/users" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                    Pengguna
                  </Link>
                </div>
              </div>
              <div className="flex items-center">
                <div className="ml-3 relative">
                  <div>
                    <button
                      type="button"
                      className="bg-white rounded-full flex text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                    >
                      <span className="sr-only">Open user menu</span>
                      <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center">
                        <span className="text-primary-800 font-medium">A</span>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-6">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Manajemen Landing Page</h1>
                  <p className="mt-1 text-sm text-gray-500">Kelola tampilan website utama Anda</p>
                </div>
                <div className="mt-4 md:mt-0">
                  <Link
                    href="/"
                    target="_blank"
                    className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  >
                    <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    Lihat Website
                  </Link>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="mb-6">
              <div className="border-b border-gray-200">
                <nav className="-mb-px flex space-x-8">
                  <button
                    onClick={() => setActiveTab('hero')}
                    className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === 'hero'
                        ? 'border-primary-500 text-primary-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    Hero Section
                  </button>
                  <button
                    onClick={() => setActiveTab('slider')}
                    className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === 'slider'
                        ? 'border-primary-500 text-primary-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    Slider
                  </button>
                  <button
                    onClick={() => setActiveTab('about')}
                    className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === 'about'
                        ? 'border-primary-500 text-primary-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    About
                  </button>
                  <button
                    onClick={() => setActiveTab('services')}
                    className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === 'services'
                        ? 'border-primary-500 text-primary-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    Services
                  </button>
                  <button
                    onClick={() => setActiveTab('testimonials')}
                    className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === 'testimonials'
                        ? 'border-primary-500 text-primary-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    Testimonials
                  </button>
                  <button
                    onClick={() => setActiveTab('contact')}
                    className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === 'contact'
                        ? 'border-primary-500 text-primary-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    Contact
                  </button>
                </nav>
              </div>
            </div>

            {/* Content Area */}
            <div className="bg-white shadow sm:rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <form onSubmit={handleSave}>
                  {renderTabContent()}
                  
                  <div className="mt-8 flex justify-end">
                    <button
                      type="submit"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                    >
                      <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Simpan Perubahan
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Preview Section */}
            <div className="mt-8 bg-white shadow sm:rounded-lg">
              <div className="px-4 py-5 sm:p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Preview Perubahan</h3>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <svg className="mx-auto h-12 w-12 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  <h3 className="mt-2 text-sm font-medium text-gray-900">Preview Konten</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Perubahan akan terlihat di website utama setelah disimpan.
                  </p>
                  <div className="mt-6">
                    <Link
                      href="/"
                      target="_blank"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                    >
                      Lihat Website
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}