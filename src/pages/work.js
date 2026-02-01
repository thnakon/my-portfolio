import { useState } from 'react';
import translations from '@/lib/translations';
import Navbar from '@/components/Navbar';
import Projects from '@/components/Projects';
import BookingModal from '@/components/BookingModal';
import Footer from '@/components/Footer';

export default function WorkPage({ theme, setTheme, lang, setLang }) {
    const [bookingOpen, setBookingOpen] = useState(false);
    const t = translations[lang] || translations.en;

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
                <Projects t={t} />
            </div>

            <Footer t={t} />

            <BookingModal
                isOpen={bookingOpen}
                onClose={() => setBookingOpen(false)}
                t={t}
            />
        </main>
    );
}
