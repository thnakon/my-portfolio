import { useState } from 'react';
import translations from '@/lib/translations';
import Navbar from '@/components/Navbar';
import Projects from '@/components/Projects';
import Contact from '@/components/Contact';
import BookingModal from '@/components/BookingModal';
import Footer from '@/components/Footer';
import ImageModal from '@/components/ImageModal';

export default function WorkPage({ theme, setTheme, lang, setLang }) {
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
                <Projects t={t} lang={lang} isHistory={true} openImage={openImage} />
            </div>

            <Contact t={t} onGetInTouch={() => setBookingOpen(true)} />

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
