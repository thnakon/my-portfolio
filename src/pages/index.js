import { useState } from 'react';
import translations from '@/lib/translations';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Overview from '@/components/Overview';
import About from '@/components/About';
import Projects from '@/components/Projects';
import Skills from '@/components/Skills';
import MySite from '@/components/MySite';
import Contact from '@/components/Contact';
import BookingModal from '@/components/BookingModal';
import Footer from '@/components/Footer';
import ImageModal from '@/components/ImageModal';

export default function Home({ theme, setTheme, lang, setLang }) {
  const [bookingOpen, setBookingOpen] = useState(false);
  const [modalImage, setModalImage] = useState(null);

  // Get translations for current language
  const t = translations[lang] || translations.en;

  const openImage = (src, alt) => setModalImage({ src, alt });
  const closeImage = () => setModalImage(null);

  return (
    <main className="min-h-screen transition-theme">
      {/* Navigation */}
      <Navbar
        t={t}
        lang={lang}
        setLang={setLang}
        theme={theme}
        setTheme={setTheme}
        onBookCall={() => setBookingOpen(true)}
      />

      {/* Hero Section */}
      <Hero t={t} lang={lang} onGetInTouch={() => setBookingOpen(true)} onImageClick={openImage} />

      {/* Overview Section */}
      <Overview t={t} onGetInTouch={() => setBookingOpen(true)} />

      {/* About Section */}
      <About
        t={t}
        isFull={false}
        onGetInTouch={() => setBookingOpen(true)}
        onImageClick={openImage}
      />

      {/* Projects Section */}
      <Projects t={t} lang={lang} openImage={openImage} />

      {/* Skills Section */}
      <Skills t={t} />

      {/* My Site Section */}
      <MySite t={t} />

      {/* Contact Section */}
      <Contact t={t} onGetInTouch={() => setBookingOpen(true)} />

      {/* Footer */}
      <Footer t={t} />

      {/* Booking Modal */}
      <BookingModal
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
        t={t}
      />

      {/* Image Modal */}
      <ImageModal
        isOpen={!!modalImage}
        onClose={closeImage}
        imageSrc={modalImage?.src}
        imageAlt={modalImage?.alt}
      />
    </main>
  );
}
