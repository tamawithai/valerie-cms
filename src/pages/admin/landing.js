import Head from 'next/head';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import ProtectedRoute from '../../components/ProtectedRoute'; // Pastikan path ini benar
// KOMENTAR: Tambahkan baris ini untuk mengimpor komponen layout kita.
import AdminLayout from '../../components/AdminLayout';

export default function LandingPageManager() {
  // Data dummy untuk landing page content
// ================== AWAL PERUBAHAN 2 DARI 4 ==================
// Struktur data kosong sebagai nilai awal
const initialContent = {
    hero: { title: "", description: "", buttonText: "", buttonLink: "", backgroundImage: "" },
    sliders: [],
    about: { title: "", content: "", image: "" },
    services: [],
    testimonials: [],
    contact: { title: "", description: "", email: "", phone: "", address: "" }
};

const [landingContent, setLandingContent] = useState(initialContent);
// ================== AKHIR PERUBAHAN 2 DARI 4 ==================

  const [activeTab, setActiveTab] = useState('hero');

  // ================== AWAL PERUBAHAN 1 DARI 4 ==================
const [isLoading, setIsLoading] = useState(true);

// EFEK UNTUK MENGAMBIL DATA DARI DATABASE SAAT HALAMAN DIBUKA
useEffect(() => {
  const fetchContent = async () => {
    try {
      const response = await fetch('/api/landing-content');
      if (!response.ok) {
        throw new Error('Gagal mengambil data');
      }
      const data = await response.json();
      // Pastikan data yang diterima adalah objek yang valid sebelum di-set
      if (data && typeof data === 'object' && Object.keys(data).length > 0) {
        setLandingContent(data);
      }
    } catch (error) {
      console.error(error);
      alert('Terjadi kesalahan saat mengambil data konten.');
    } finally {
      setIsLoading(false);
    }
  };

  fetchContent();
}, []); // Array kosong berarti efek ini hanya berjalan sekali
// ================== AKHIR PERUBAHAN 1 DARI 4 ==================

  // ================== AWAL PERUBAHAN 3 DARI 4 ==================
const handleSave = async (e) => {
  e.preventDefault();
  try {
    const response = await fetch('/api/landing-content', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(landingContent),
    });

    if (!response.ok) {
      throw new Error('Gagal menyimpan data');
    }

    alert('Perubahan berhasil disimpan ke database!');
  } catch (error) {
    console.error(error);
    alert('Terjadi kesalahan saat menyimpan perubahan.');
  }
};
// ================== AKHIR PERUBAHAN 3 DARI 4 ==================

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

// ================== TAMBAHKAN DUA FUNGSI INI ==================
const addFeature = () => {
    const newFeature = { id: Date.now(), icon: "💡", title: "Fitur Baru", description: "Deskripsi singkat fitur baru" };
    setLandingContent({ ...landingContent, features: [...(landingContent.features || []), newFeature] });
};

const removeFeature = (id) => {
    setLandingContent({ ...landingContent, features: landingContent.features.filter(feature => feature.id !== id) });
};
// ============================================================

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
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 text-gray-800"
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
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 text-gray-800"
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
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500  text-gray-800"
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
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500  text-gray-800"
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
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500  text-gray-800"
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
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 text-gray-800"
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
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 text-gray-800"
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
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 text-gray-800"
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
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 text-gray-800"
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
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 text-gray-800"
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
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 text-gray-800"
              />
            </div>
          </div>
        );
      
      // ================== TAMBAHKAN CASE BARU INI ==================
    case 'features':
        return (
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium text-gray-900">Feature Items</h3>
                    <button type="button" onClick={addFeature} className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700">
                        Tambah Fitur
                    </button>
                </div>
                <div className="space-y-4">
                    {(landingContent.features || []).map((feature, index) => (
                        <div key={feature.id} className="border border-gray-200 rounded-lg p-4">
                            <div className="flex justify-between items-start mb-3">
                                <h4 className="text-md font-medium text-gray-900">Fitur {index + 1}</h4>
                                <button type="button" onClick={() => removeFeature(feature.id)} className="text-red-600 hover:text-red-900">Hapus</button>
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Ikon (Emoji)</label>
                                    <input
                                        type="text"
                                        value={feature.icon}
                                        onChange={(e) => {
                                            const newFeatures = [...landingContent.features];
                                            newFeatures[index].icon = e.target.value;
                                            setLandingContent({ ...landingContent, features: newFeatures });
                                        }}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-800"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Judul</label>
                                    <input
                                        type="text"
                                        value={feature.title}
                                        onChange={(e) => {
                                            const newFeatures = [...landingContent.features];
                                            newFeatures[index].title = e.target.value;
                                            setLandingContent({ ...landingContent, features: newFeatures });
                                        }}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-800"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Deskripsi</label>
                                    <textarea
                                        rows={2}
                                        value={feature.description}
                                        onChange={(e) => {
                                            const newFeatures = [...landingContent.features];
                                            newFeatures[index].description = e.target.value;
                                            setLandingContent({ ...landingContent, features: newFeatures });
                                        }}
                                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-800"
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    // ============================================================

        
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
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 text-gray-800"
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
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 text-gray-800"
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
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 text-gray-800"
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
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 text-gray-800"
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
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 text-gray-800"
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
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 text-gray-800"
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
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 text-gray-800"
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
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 text-gray-800"
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
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 text-gray-800"
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
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 text-gray-800"
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
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 text-gray-800"
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

// 1. BLOK "IF" HANYA UNTUK MENAMPILKAN PESAN LOADING
  if (isLoading) {
    return (
      <ProtectedRoute>
        <AdminLayout>
          <div className="flex justify-center items-center h-64">
            <p className="text-lg">Memuat data konten...</p>
          </div>
        </AdminLayout>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute>
      <AdminLayout>
        <>
          <Head>
            <title>Manajemen Landing Page - Valerie CMS</title>
          </Head>

          {/* Main Content */}
          <main className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="mb-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                      Manajemen Landing Page
                    </h1>
                    <p className="mt-1 text-sm text-gray-500">
                      Kelola tampilan website utama Anda
                    </p>
                  </div>
                  <div className="mt-4 md:mt-0">
                    <Link
                      href="/"
                      target="_blank"
                      className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                    >
                      <svg
                        className="-ml-1 mr-2 h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
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
                      onClick={() => setActiveTab("hero")}
                      className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                        activeTab === "hero"
                          ? "border-primary-500 text-primary-600"
                          : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                      }`}
                    >
                      Hero Section
                    </button>
                    <button
                      onClick={() => setActiveTab("slider")}
                      className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                        activeTab === "slider"
                          ? "border-primary-500 text-primary-600"
                          : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                      }`}
                    >
                      Slider
                    </button>
                    <button
                      onClick={() => setActiveTab("about")}
                      className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                        activeTab === "about"
                          ? "border-primary-500 text-primary-600"
                          : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                      }`}
                    >
                      About
                    </button>
                    <button
                      onClick={() => setActiveTab("features")}
                      className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                        activeTab === "features"
                          ? "border-blue-500 text-blue-600"
                          : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                      }`}
                    >
                      Features
                    </button>
                    <button
                      onClick={() => setActiveTab("services")}
                      className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                        activeTab === "services"
                          ? "border-primary-500 text-primary-600"
                          : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                      }`}
                    >
                      Services
                    </button>
                    <button
                      onClick={() => setActiveTab("testimonials")}
                      className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                        activeTab === "testimonials"
                          ? "border-primary-500 text-primary-600"
                          : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                      }`}
                    >
                      Testimonials
                    </button>
                    <button
                      onClick={() => setActiveTab("contact")}
                      className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                        activeTab === "contact"
                          ? "border-primary-500 text-primary-600"
                          : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
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
                        <svg
                          className="-ml-1 mr-2 h-5 w-5"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
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
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Preview Perubahan
                  </h3>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <svg
                      className="mx-auto h-12 w-12 text-gray-400"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                    <h3 className="mt-2 text-sm font-medium text-gray-900">
                      Preview Konten
                    </h3>
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
        </>
      </AdminLayout>
    </ProtectedRoute>
  );
}