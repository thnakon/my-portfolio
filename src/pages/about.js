import { useState } from 'react';
import translations from '@/lib/translations';
import Navbar from '@/components/Navbar';
import About from '@/components/About';
import BookingModal from '@/components/BookingModal';
import Footer from '@/components/Footer';
import ImageModal from '@/components/ImageModal';

export default function AboutPage({ theme, setTheme, lang, setLang }) {
    const [bookingOpen, setBookingOpen] = useState(false);
    const [modalImage, setModalImage] = useState(null);
    const t = translations[lang] || translations.en;

    const openImage = (src, alt) => setModalImage({ src, alt });
    const closeImage = () => setModalImage(null);

    return (
        <main className="min-h-screen transition-theme">
            <Navbar
                t={t}
                lang={lang}
                setLang={setLang}
                theme={theme}
                setTheme={setTheme}
                onBookCall={() => setBookingOpen(true)}
            />

            <div className="pt-20">
                <About
                    t={t}
                    onGetInTouch={() => setBookingOpen(true)}
                    onImageClick={openImage}
                />
            </div>

            <Footer t={t} />

            <BookingModal
                isOpen={bookingOpen}
                onClose={() => setBookingOpen(false)}
                t={t}
            />

            <ImageModal
                isOpen={!!modalImage}
                onClose={closeImage}
                imageSrc={modalImage?.src}
                imageAlt={modalImage?.alt}
            />
        </main>
    );
}
