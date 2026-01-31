import { useState } from 'react';
import translations from '@/lib/translations';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Overview from '@/components/Overview';
import About from '@/components/About';
import Projects from '@/components/Projects';
import Skills from '@/components/Skills';
import Contact from '@/components/Contact';
import BookingModal from '@/components/BookingModal';
import Footer from '@/components/Footer';

export default function Home({ theme, setTheme, lang, setLang }) {
  const [bookingOpen, setBookingOpen] = useState(false);

  // Get translations for current language
  const t = translations[lang] || translations.en;

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
      <Hero t={t} onGetInTouch={() => setBookingOpen(true)} />

      {/* Overview Section */}
      <Overview t={t} />

      {/* Projects Section */}
      <Projects t={t} />

      {/* Skills Section */}
      <Skills t={t} />

      {/* About Section */}
      <About t={t} />

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
    </main>
  );
}
