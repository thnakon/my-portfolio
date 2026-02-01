import { useState } from 'react';
import translations from '@/lib/translations';
import Navbar from '@/components/Navbar';
import BookingModal from '@/components/BookingModal';
import Footer from '@/components/Footer';

export default function BlogPage({ theme, setTheme, lang, setLang }) {
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

            <div className="pt-32 pb-24 max-w-6xl mx-auto px-6">
                <div className="text-center mb-16">
                    <span className="inline-block text-[10px] tracking-[0.3em] font-bold text-[var(--text-muted)] uppercase mb-6">
                        {lang === 'en' ? "WRITINGS" : "บทความ"}
                    </span>
                    <h1 className="text-4xl md:text-6xl font-heading mb-8">
                        {t.nav.blog}
                    </h1>
                    <p className="text-[var(--text-secondary)] text-lg max-w-2xl mx-auto font-light leading-relaxed">
                        {lang === 'en'
                            ? "Thoughts, stories and ideas about design, technology, and life."
                            : "ความคิด เรื่องราว และไอเดียเกี่ยวกับการออกแบบ เทคโนโลยี และการใช้ชีวิต"}
                    </p>
                </div>

                {/* Blog Placeholder */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="group bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-[32px] p-6 hover:border-[var(--text-primary)] transition-all duration-500">
                            <div className="aspect-[16/10] bg-[var(--bg-tertiary)] rounded-2xl mb-6 overflow-hidden">
                                <div className="w-full h-full bg-gradient-to-br from-[var(--bg-tertiary)] to-[var(--border-color)] group-hover:scale-110 transition-transform duration-700" />
                            </div>
                            <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider mb-2 block">Feb 01, 2026</span>
                            <h3 className="text-xl font-heading mb-3 group-hover:text-[var(--text-primary)] transition-colors">
                                {lang === 'en' ? `Coming Soon Post ${i}` : `บทความที่กำลังจะมา ${i}`}
                            </h3>
                            <p className="text-sm text-[var(--text-secondary)] font-light line-clamp-2">
                                {lang === 'en'
                                    ? "Stay tuned for my upcoming articles and blog posts about web development."
                                    : "คอยติดตามบทความใหม่ๆ เกี่ยวกับการพัฒนาเว็บไซต์ได้เร็วๆ นี้ครับ"}
                            </p>
                        </div>
                    ))}
                </div>
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
