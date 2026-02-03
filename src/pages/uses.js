import { useState, useEffect } from 'react';
import translations from '@/lib/translations';
import Navbar from '@/components/Navbar';
import BookingModal from '@/components/BookingModal';
import Footer from '@/components/Footer';
import Link from 'next/link';

const TypewriterText = ({ text, delay = 50, startDelay = 500, onComplete }) => {
    const [displayedText, setDisplayedText] = useState('');
    const [isStarted, setIsStarted] = useState(false);

    useEffect(() => {
        const startTimer = setTimeout(() => setIsStarted(true), startDelay);
        return () => clearTimeout(startTimer);
    }, [startDelay]);

    useEffect(() => {
        if (!isStarted) return;

        if (displayedText.length < text.length) {
            const timeout = setTimeout(() => {
                setDisplayedText(text.slice(0, displayedText.length + 1));
            }, delay);
            return () => clearTimeout(timeout);
        } else if (onComplete) {
            onComplete();
        }
    }, [displayedText, text, delay, isStarted, onComplete]);

    return (
        <span>
            {displayedText}
            {displayedText.length < text.length && (
                <span className="inline-block w-0.5 h-4 ml-1 bg-[var(--text-primary)] animate-pulse align-middle" />
            )}
        </span>
    );
};

const HardwareShowcase = ({ lang, isVisible }) => {
    const specs = [
        { label: lang === 'en' ? 'Size' : 'ขนาด', value: '13.6"' },
        { label: lang === 'en' ? 'Color' : 'สี', value: lang === 'en' ? 'Midnight' : 'มิดไนท์' },
        { label: lang === 'en' ? 'Display' : 'จอภาพ', value: 'Liquid Retina' },
        { label: lang === 'en' ? 'Storage' : 'ความจุ', value: '256GB SSD' },
        { label: lang === 'en' ? 'Memory' : 'หน่วยความจำ', value: '16GB RAM' },
    ];

    return (
        <div className={`relative mb-32 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="relative bg-[#050505] rounded-[40px] border border-white/5 overflow-hidden p-8 md:p-16 flex flex-col md:flex-row items-center gap-12">
                {/* Hotspots / Specs List */}
                <div className="flex flex-col gap-4 w-full md:w-auto z-10">
                    {specs.map((spec, i) => (
                        <div key={i} className="group/spec flex items-center gap-4 bg-white/5 hover:bg-white/10 border border-white/5 rounded-full px-5 py-3 transition-all duration-300 backdrop-blur-md cursor-default">
                            <div className="w-5 h-5 rounded-full border border-white/20 flex items-center justify-center group-hover/spec:scale-110 group-hover/spec:border-white/40 transition-all">
                                <div className="w-1.5 h-1.5 bg-white rounded-full group-hover/spec:scale-125 transition-all" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-[10px] text-white/40 uppercase font-bold tracking-widest">{spec.label}</span>
                                <span className="text-sm text-white/90 font-medium">{spec.value}</span>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Laptop Mockup Area */}
                <div className="relative flex-1 flex justify-center items-center py-10">
                    {/* Glow background */}
                    <div className="absolute inset-x-0 inset-y-0 bg-blue-500/10 blur-[100px] rounded-full" />

                    <div className="relative group/laptop">
                        {/* MacBook Air M2 Midnight Mockup */}
                        <div className="relative w-72 md:w-[500px] transition-transform duration-1000 group-hover/laptop:scale-[1.02] group-hover/laptop:-translate-y-2">
                            {/* Screen */}
                            <div className="relative aspect-[16/10.5] bg-[#0c0c0c] border-[10px] border-[#18181b] rounded-t-[1.5rem] shadow-2xl overflow-hidden">
                                {/* Wallpaper Abstract */}
                                <div className="absolute inset-0 bg-gradient-to-br from-[#121421] via-[#1a1c2e] to-black opacity-80">
                                    <div className="absolute top-[20%] left-[-10%] w-[120%] h-full bg-blue-500/10 blur-[80px] rounded-full animate-pulse" />
                                </div>
                                {/* Notch */}
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-4 bg-[#18181b] rounded-b-lg z-10" />

                                <img
                                    src="https://www.apple.com/v/macbook-air-m2/e/images/overview/design/design_midnight__e5w98305msiu_large.jpg"
                                    className="absolute inset-0 w-full h-full object-contain opacity-90 transition-transform duration-700 group-hover/laptop:scale-110"
                                    alt="MacBook Air M2"
                                />
                            </div>
                            {/* Bottom Case */}
                            <div className="h-4 bg-gradient-to-b from-[#18181b] to-[#0a0a0d] rounded-b-lg border-t border-white/5 shadow-2xl relative">
                                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-[2px] bg-white/10 rounded-full" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Info Text Bubble */}
                <div className="absolute bottom-8 right-8 z-10 hidden md:block">
                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-4 rounded-2xl max-w-[200px]">
                        <p className="text-[10px] text-white/40 uppercase font-bold mb-2 tracking-tighter">Daily Driver</p>
                        <p className="text-xs text-white/80 leading-relaxed font-light italic">
                            {lang === 'en' ? '"The perfect balance of portability and power. M2 is magic."' : '"ความสมดุลที่ลงตัวระหว่างความเบาและประสิทธิภาพ"'}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

const UsesSection = ({ title, items }) => (
    <div className="mb-20">
        <h2 className="text-xl font-heading mb-8 flex items-center gap-3">
            <span className="w-8 h-[1px] bg-[var(--text-muted)] opacity-30"></span>
            {title}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {items.map((item, i) => (
                <div key={i} className="group relative p-6 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-color)] hover:border-[var(--text-primary)] transition-all duration-500 overflow-hidden">
                    {/* Glow Effect */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[var(--text-primary)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />

                    <div className="relative z-10 flex items-start justify-between">
                        <div>
                            <h3 className="text-[var(--text-primary)] font-medium mb-1">{item.name}</h3>
                            <p className="text-[var(--text-muted)] text-sm leading-relaxed">{item.description}</p>
                        </div>
                        {item.link && (
                            <Link href={item.link} target="_blank" className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                            </Link>
                        )}
                    </div>
                </div>
            ))}
        </div>
    </div>
);

export default function UsesPage({ theme, setTheme, lang, setLang }) {
    const [bookingOpen, setBookingOpen] = useState(false);
    const [showContent, setShowContent] = useState(false);

    const t = translations[lang] || translations.en;

    useEffect(() => {
        const timer = setTimeout(() => setShowContent(true), 100);
        return () => clearTimeout(timer);
    }, []);

    const categories = [
        {
            title: lang === 'en' ? "Workstation" : "ชุดโต๊ะคทำงาน",
            items: [
                { name: "MacBook Air M2 13\"", description: lang === 'en' ? "Midnight, 16GB RAM, 256GB SSD. My perfectly silent powerhouse." : "สี Midnight, RAM 16GB, SSD 256GB. ขุมพลังที่เงียบสนิทและลงตัวที่สุด", link: "https://www.apple.com/th/macbook-air-m2/" },
                { name: "Lofree Flow", description: lang === 'en' ? "Low Profile Mechanical Keyboard with smooth tactile feel." : "คีย์บอร์ด Low Profile Mechanical ที่สัมผัสลื่นไหลและดีไซน์มินิมอล", link: "https://www.lofree.co/products/lofree-flow-artistic-low-profile-mechanical-keyboard" },
            ]
        },
        {
            title: lang === 'en' ? "Development Tools" : "เครื่องมือการพัฒนา",
            items: [
                { name: "Visual Studio Code", description: "Theme: Tokyo Night, Font: JetBrains Mono.", link: "https://code.visualstudio.com/" },
                { name: "Warp", description: "The terminal for the 21st century. Blazing fast.", link: "https://www.warp.dev/" },
                { name: "TablePlus", description: "Modern, native tool for database management.", link: "https://tableplus.com/" },
                { name: "Postman", description: "Essential for API development and testing.", link: "https://www.postman.com/" }
            ]
        },
        {
            title: lang === 'en' ? "Software & Productivity" : "ซอฟต์แวร์และผลงาน",
            items: [
                { name: "Notion", description: "Where my entire life and second brain live.", link: "https://www.notion.so/" },
                { name: "Figma", description: "All my UI/UX designs start and end here.", link: "https://www.figma.com/" },
                { name: "Arc Browser", description: "A better way to browse the internet.", link: "https://arc.net/" },
                { name: "Slack", description: "Communication hub for all professional collaboration.", link: "https://slack.com/" }
            ]
        }
    ];

    return (
        <main className="min-h-screen transition-theme bg-[var(--bg-primary)]">
            <Navbar t={t} lang={lang} setLang={setLang} theme={theme} setTheme={setTheme} onBookCall={() => setBookingOpen(true)} />

            <div className="pt-32 pb-24 max-w-[1000px] mx-auto px-6">
                {/* Header Section */}
                <div className="text-center mb-24">
                    <span className={`inline-block text-[10px] tracking-[0.4em] font-bold text-[var(--text-muted)] uppercase mb-6 transition-all duration-1000 ${showContent ? 'opacity-60 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                        {t.nav.moreDropdown.uses.title}
                    </span>
                    <h1 className={`text-3xl md:text-5xl font-heading tracking-tight mb-8 transition-all duration-1000 delay-200 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                        <span className="text-[var(--text-primary)]">{(lang === 'en' ? "Hardware & Software" : "อุปกรณ์และซอฟต์แวร์").split(' ')[0]} </span>
                        <em className="overview-title-accent">{(lang === 'en' ? "Hardware & Software" : "อุปกรณ์และซอฟต์แวร์").split(' ').slice(1).join(' ')}</em>
                    </h1>
                    <div className="text-[var(--text-secondary)] text-lg md:text-xl font-light leading-relaxed h-8">
                        {showContent && (
                            <TypewriterText text={lang === 'en' ? "The tools I use for building modern digital products." : "เครื่องมือที่ผมใช้สร้างสรรค์ผลงานดิจิทัลสมัยใหม่"} />
                        )}
                    </div>
                </div>

                {/* Featured Hardware Showcase */}
                <HardwareShowcase lang={lang} isVisible={showContent} />

                {/* Categories */}
                <div className={`transition-all duration-1000 delay-700 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    {categories.map((cat, i) => (
                        <UsesSection key={i} title={cat.title} items={cat.items} />
                    ))}
                </div>

                {/* Bottom Callout */}
                <div className={`mt-20 p-8 rounded-[32px] bg-[var(--bg-secondary)] border border-[var(--border-color)] text-center transition-all duration-1000 delay-1000 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                    <p className="text-[var(--text-secondary)] italic mb-4">
                        {lang === 'en' ? "Note: This list is constantly evolving as I try new tools." : "หมายเหตุ: รายการเหล่านี้อาจมีการเปลี่ยนแปลงเมื่อผมได้ลองเครื่องมือใหม่ๆ"}
                    </p>
                    <Link href="/" className="text-sm font-bold uppercase tracking-widest text-[var(--text-primary)] hover:opacity-70 transition-opacity">
                        {lang === 'en' ? "← Back to Home" : "← กลับสู่หน้าหลัก"}
                    </Link>
                </div>
            </div>

            <Footer t={t} />
            <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} t={t} />
        </main>
    );
}
