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

/* --- Specialized Component 1: Workstation --- */
const WorkstationShowcase = ({ lang, isVisible }) => {
    const [expandedIndex, setExpandedIndex] = useState(null);

    const specs = [
        {
            en: 'Macbook Air M2',
            th: 'Macbook Air M2',
            value: '13.6-inch',
            image: '/images/macbook-air-m2.png',
            badge: { en: 'Midnight Edition', th: 'สีมิดไนท์', color: '#2e3641' },
            details: [
                { label: lang === 'en' ? 'Color' : 'สี', val: lang === 'en' ? 'Midnight' : 'สีมิดไนท์' },
                { label: lang === 'en' ? 'Display' : 'จอภาพ', val: 'Liquid Retina' },
                { label: lang === 'en' ? 'Chip' : 'ชิป', val: 'Apple M2' },
                { label: lang === 'en' ? 'RAM' : 'หน่วยความจำ', val: '16GB' }
            ]
        },
        {
            en: 'Lofree Flow',
            th: 'Lofree Flow',
            value: 'Low-Profile',
            image: '/images/lofree-flow.png',
            badge: { en: 'Space Gray', th: 'สีสเปซเกรย์', color: '#555559' },
            details: [
                { label: lang === 'en' ? 'Switch' : 'สวิตช์', val: 'Phantom (Tactile)' },
                { label: lang === 'en' ? 'Material' : 'วัสดุ', val: 'Aluminum' },
                { label: lang === 'en' ? 'Mount' : 'การยึด', val: 'Gasket Mount' }
            ]
        },
    ];

    const currentSpec = expandedIndex !== null ? specs[expandedIndex] : specs[0];

    return (
        <div className={`relative overflow-hidden bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-[40px] p-8 md:p-16 mb-24 h-[500px] md:h-[600px] flex items-center justify-center transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} hover:border-[var(--text-primary)]/20 shadow-sm`}>

            {/* Top Left: Spec Pills */}
            <div className="absolute top-8 left-8 md:top-12 md:left-12 z-20 flex flex-col gap-3 items-start">
                {specs.map((spec, i) => (
                    <div
                        key={i}
                        onClick={() => setExpandedIndex(expandedIndex === i ? null : i)}
                        className={`group flex flex-col gap-4 bg-[var(--bg-primary)]/80 hover:bg-[var(--bg-primary)] border border-[var(--border-color)] hover:border-[var(--text-primary)]/30 transition-all duration-500 backdrop-blur-md cursor-pointer w-fit hover:scale-[1.02] hover:shadow-glow shadow-xl
                        ${expandedIndex === i ? 'rounded-[32px] p-8 pb-12 min-w-[350px]' : 'rounded-full px-5 py-3 overflow-hidden'}`}
                    >
                        <div className="flex items-center gap-4">
                            <div className={`w-6 h-6 rounded-full border border-[var(--text-primary)] flex items-center justify-center transition-all duration-500 shadow-sm ${expandedIndex === i ? 'bg-[var(--text-primary)] rotate-45' : 'bg-[var(--text-primary)]'}`}>
                                <svg className={`w-3.5 h-3.5 transition-colors ${expandedIndex === i ? 'text-[var(--bg-primary)]' : 'text-[var(--bg-primary)]'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                </svg>
                            </div>
                            <div className="flex flex-col">
                                <span className={`text-sm font-medium text-[var(--text-primary)] tracking-tight transition-all ${expandedIndex === i ? 'text-lg font-bold' : ''}`}>
                                    {lang === 'en' ? spec.en : spec.th}
                                </span>
                                <span className="text-[10px] text-[var(--text-muted)] uppercase font-bold tracking-widest mt-0.5">
                                    {spec.value}
                                </span>
                            </div>
                        </div>

                        {expandedIndex === i && (
                            <div className="grid grid-cols-1 gap-3 mt-2 animate-in fade-in slide-in-from-top-2 duration-500">
                                {spec.details.map((detail, di) => (
                                    <div key={di} className="flex justify-between items-center gap-8 border-t border-[var(--border-color)]/50 pt-3 first:border-0 first:pt-0">
                                        <span className="text-[10px] uppercase tracking-wider text-[var(--text-muted)] font-bold">{detail.label}</span>
                                        <span className="text-xs font-medium text-[var(--text-primary)]">{detail.val}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Bottom Right: Color Badge */}
            <div className="absolute bottom-8 right-8 md:bottom-12 md:right-12 z-20 flex items-center gap-3 bg-[var(--bg-primary)]/80 backdrop-blur-md border border-[var(--border-color)] px-4 py-2 rounded-2xl shadow-lg hover:border-[var(--text-primary)]/30 transition-all duration-500 cursor-default group">
                <div
                    className="w-3.5 h-3.5 rounded-full border border-white/20 shadow-inner group-hover:scale-110 transition-all duration-500"
                    style={{ backgroundColor: currentSpec.badge.color }}
                />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--text-primary)]">
                    {lang === 'en' ? currentSpec.badge.en : currentSpec.badge.th}
                </span>
            </div>

            {/* Center: Product Image */}
            <div className="relative w-full max-w-[450px] z-10 flex justify-center items-center hover:scale-[1.03] transition-all duration-700 md:translate-x-32 lg:translate-x-40">
                <img
                    key={currentSpec.image}
                    src={currentSpec.image}
                    className="w-full h-auto drop-shadow-[0_40px_80px_rgba(0,0,0,0.4)] animate-product-swap"
                    alt={lang === 'en' ? currentSpec.en : currentSpec.th}
                />
            </div>
        </div>
    );
};

/* --- Specialized Component 2: Development Tools (Bento Style) --- */
const DevToolsBento = ({ lang, isVisible }) => {
    const tools = [
        { name: 'VS Code', icon: 'vscode', desc: 'Main IDE', size: 'col-span-2' },
        { name: 'Warp', icon: 'bash', desc: '21st Century Terminal', size: 'col-span-1' },
        { name: 'TablePlus', icon: 'mysql', desc: 'DB Manager', size: 'col-span-1' },
        { name: 'Postman', icon: 'postman', desc: 'API Testing', size: 'col-span-2' }
    ];

    return (
        <div className={`grid grid-cols-2 lg:grid-cols-4 gap-4 mb-24 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {tools.map((tool, i) => (
                <div key={i} className={`group relative p-6 rounded-3xl bg-[var(--bg-secondary)] border border-[var(--border-color)] hover:border-[var(--text-primary)] transition-all duration-500 overflow-hidden ${tool.size}`}>
                    <div className="absolute inset-0 bg-gradient-to-br from-[var(--text-primary)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                    <div className="relative z-10 flex flex-col h-full items-center text-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform duration-500 group-hover:-rotate-3">
                            <img src={`https://skillicons.dev/icons?i=${tool.icon}`} className="w-7 h-7" alt={tool.name} />
                        </div>
                        <div>
                            <h4 className="text-[var(--text-primary)] font-bold text-sm tracking-tight">{tool.name}</h4>
                            <p className="text-[var(--text-muted)] text-[10px] uppercase font-bold tracking-[0.2em] mt-1 group-hover:text-[var(--text-primary)] transition-colors">{tool.desc}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

/* --- Specialized Component 3: Software & Productivity (Floating List) --- */
const ProductivityGrid = ({ lang, isVisible }) => {
    const apps = [
        { name: 'Notion', desc: 'Second Brain & Knowledge Base', icon: 'notion' },
        { name: 'Figma', desc: 'UI/UX Design Workflow', icon: 'figma' },
        { name: 'Arc', desc: 'Modular Web Browsing', icon: 'chrome' },
        { name: 'Slack', desc: 'Professional Communication', icon: 'slack' }
    ];

    return (
        <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 mb-24 transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {apps.map((app, i) => (
                <div key={i} className="group relative flex items-center gap-6 p-6 rounded-[32px] bg-[var(--bg-secondary)] border border-[var(--border-color)] hover:bg-[var(--primary)] transition-all duration-500">
                    <div className="w-16 h-16 rounded-[20px] bg-[var(--bg-primary)] border border-[var(--border-color)] flex items-center justify-center p-4 group-hover:scale-110 transition-transform duration-700 shadow-glow">
                        <img src={`https://skillicons.dev/icons?i=${app.icon}`} className="w-full h-full object-contain" alt={app.name} />
                    </div>
                    <div>
                        <h4 className="text-[var(--text-primary)] font-medium text-lg leading-tight mb-1">{app.name}</h4>
                        <p className="text-[var(--text-muted)] text-sm leading-relaxed">{app.desc}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default function UsesPage({ theme, setTheme, lang, setLang }) {
    const [bookingOpen, setBookingOpen] = useState(false);
    const [showContent, setShowContent] = useState(false);

    const t = translations[lang] || translations.en;

    useEffect(() => {
        const timer = setTimeout(() => setShowContent(true), 100);
        return () => clearTimeout(timer);
    }, []);

    return (
        <main className="min-h-screen transition-theme bg-[var(--bg-primary)]">
            <Navbar t={t} lang={lang} setLang={setLang} theme={theme} setTheme={setTheme} onBookCall={() => setBookingOpen(true)} />

            <div className="pt-32 pb-24 max-w-[1050px] mx-auto px-6">
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
                            <TypewriterText text={lang === 'en' ? "A collection of tools and gear I use on a daily basis." : "รวมเครื่องมือและอุปกรณ์ที่ผมใช้งานเป็นประจำทุกวัน"} />
                        )}
                    </div>
                </div>

                {/* --- Section 1: Workstation --- */}
                <div className="mb-20">
                    <h2 className="text-xl font-heading mb-12 flex items-center gap-4">
                        <span className="w-12 h-[1px] bg-gradient-to-r from-[var(--text-primary)] to-transparent opacity-20"></span>
                        {lang === 'en' ? "Workstation" : "ชุดโต๊ะคทำงาน"}
                    </h2>
                    <WorkstationShowcase lang={lang} isVisible={showContent} />
                </div>

                {/* --- Section 2: Development Tools --- */}
                <div className="mb-20">
                    <h2 className="text-xl font-heading mb-12 flex items-center gap-4">
                        <span className="w-12 h-[1px] bg-gradient-to-r from-[var(--text-primary)] to-transparent opacity-20"></span>
                        {lang === 'en' ? "Development Tools" : "เครื่องมือการพัฒนา"}
                    </h2>
                    <DevToolsBento lang={lang} isVisible={showContent} />
                </div>

                {/* --- Section 3: Software & Productivity --- */}
                <div className="mb-20">
                    <h2 className="text-xl font-heading mb-12 flex items-center gap-4">
                        <span className="w-12 h-[1px] bg-gradient-to-r from-[var(--text-primary)] to-transparent opacity-20"></span>
                        {lang === 'en' ? "Software & Productivity" : "ซอฟต์แวร์และผลงาน"}
                    </h2>
                    <ProductivityGrid lang={lang} isVisible={showContent} />
                </div>

                {/* Bottom Callout */}
                <div className={`mt-20 p-8 rounded-[40px] bg-gradient-to-b from-white/[0.03] to-transparent border border-white/5 text-center transition-all duration-1000 delay-1000 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                    <p className="text-[var(--text-secondary)] italic mb-6">
                        {lang === 'en' ? "Note: This list is constantly evolving as I try new tools." : "หมายเหตุ: รายการเหล่านี้อาจมีการเปลี่ยนแปลงเมื่อผมได้ลองเครื่องมือใหม่ๆ"}
                    </p>
                    <Link href="/" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-[var(--text-primary)] hover:gap-4 transition-all duration-300">
                        {lang === 'en' ? "← Back to Home" : "← กลับสู่หน้าหลัก"}
                    </Link>
                </div>
            </div>

            <Footer t={t} />
            <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} t={t} />
        </main>
    );
}
