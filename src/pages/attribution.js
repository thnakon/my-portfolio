import { useState, useEffect } from 'react';
import translations from '@/lib/translations';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BookingModal from '@/components/BookingModal';
import Link from 'next/link';
import { motion } from 'framer-motion';

const TypewriterText = ({ text, delay = 50, startDelay = 500 }) => {
    const [displayedText, setDisplayedText] = useState('');
    const [isStarted, setIsStarted] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setIsStarted(true), startDelay);
        return () => clearTimeout(timer);
    }, [startDelay]);

    useEffect(() => {
        if (!isStarted) return;
        if (displayedText.length < text.length) {
            const timer = setTimeout(() => {
                setDisplayedText(text.slice(0, displayedText.length + 1));
            }, delay);
            return () => clearTimeout(timer);
        }
    }, [displayedText, text, delay, isStarted]);

    return (
        <span>
            {displayedText}
            {displayedText.length < text.length && (
                <span className="inline-block w-0.5 h-5 ml-0.5 bg-[var(--text-primary)] animate-pulse align-middle" />
            )}
        </span>
    );
};

const attributions = [
    {
        category: { en: 'Frameworks & Libraries', th: 'เฟรมเวิร์กและไลบรารี' },
        items: [
            { name: 'Next.js', url: 'https://nextjs.org/', description: { en: 'React framework for production', th: 'React framework สำหรับ Production' } },
            { name: 'React', url: 'https://react.dev/', description: { en: 'JavaScript library for building UIs', th: 'JavaScript library สำหรับสร้าง UI' } },
            { name: 'Tailwind CSS', url: 'https://tailwindcss.com/', description: { en: 'Utility-first CSS framework', th: 'Utility-first CSS framework' } },
            { name: 'Framer Motion', url: 'https://www.framer.com/motion/', description: { en: 'Animation library for React', th: 'Animation library สำหรับ React' } },
        ]
    },
    {
        category: { en: 'Icons & Graphics', th: 'ไอคอนและกราฟิก' },
        items: [
            { name: 'Lucide Icons', url: 'https://lucide.dev/', description: { en: 'Beautiful & consistent icons', th: 'ไอคอนสวยและสม่ำเสมอ' } },
            { name: 'Skill Icons', url: 'https://skillicons.dev/', description: { en: 'Tech stack icon badges', th: 'ไอคอน Badge สำหรับ Tech Stack' } },
            { name: 'Heroicons', url: 'https://heroicons.com/', description: { en: 'SVG icons by Tailwind team', th: 'SVG icons จากทีม Tailwind' } },
        ]
    },
    {
        category: { en: 'Fonts & Typography', th: 'ฟอนต์และตัวอักษร' },
        items: [
            { name: 'Google Fonts', url: 'https://fonts.google.com/', description: { en: 'Free web fonts library', th: 'ห้องสมุดฟอนต์เว็บฟรี' } },
            { name: 'Inter', url: 'https://rsms.me/inter/', description: { en: 'Body text typeface', th: 'ฟอนต์สำหรับข้อความหลัก' } },
            { name: 'Space Grotesk', url: 'https://fonts.google.com/specimen/Space+Grotesk', description: { en: 'Heading typeface', th: 'ฟอนต์สำหรับหัวข้อ' } },
        ]
    },
    {
        category: { en: 'Images & Media', th: 'รูปภาพและสื่อ' },
        items: [
            { name: 'Unsplash', url: 'https://unsplash.com/', description: { en: 'Free high-resolution photos', th: 'รูปภาพความละเอียดสูงฟรี' } },
        ]
    },
    {
        category: { en: 'Development Tools', th: 'เครื่องมือพัฒนา' },
        items: [
            { name: 'VS Code', url: 'https://code.visualstudio.com/', description: { en: 'Code editor', th: 'โปรแกรมแก้ไขโค้ด' } },
            { name: 'GitHub', url: 'https://github.com/', description: { en: 'Version control & hosting', th: 'Version Control และ Hosting' } },
            { name: 'Vercel', url: 'https://vercel.com/', description: { en: 'Deployment platform', th: 'แพลตฟอร์ม Deployment' } },
        ]
    },
    {
        category: { en: 'AI Assistants', th: 'ผู้ช่วย AI' },
        items: [
            { name: 'Claude (Anthropic)', url: 'https://www.anthropic.com/', description: { en: 'AI coding assistant', th: 'ผู้ช่วยเขียนโค้ด AI' } },
            { name: 'Gemini (Google)', url: 'https://gemini.google.com/', description: { en: 'AI development partner', th: 'พาร์ทเนอร์การพัฒนา AI' } },
        ]
    },
    {
        category: { en: 'Inspiration', th: 'แรงบันดาลใจ' },
        items: [
            { name: 'Awwwards', url: 'https://www.awwwards.com/', description: { en: 'Website design inspiration', th: 'แรงบันดาลใจการออกแบบเว็บ' } },
            { name: 'Dribbble', url: 'https://dribbble.com/', description: { en: 'Design community', th: 'ชุมชนนักออกแบบ' } },
            { name: 'Mobbin', url: 'https://mobbin.com/', description: { en: 'UI/UX patterns library', th: 'ห้องสมุดรูปแบบ UI/UX' } },
        ]
    },
];

const CategorySection = ({ category, items, index, lang }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="mb-12"
        >
            <h2 className="text-xl font-heading font-semibold text-[var(--text-primary)] mb-6 flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-gray-600 to-gray-800 flex items-center justify-center text-white text-sm font-bold">
                    {index + 1}
                </span>
                {lang === 'en' ? category.en : category.th}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {items.map((item, i) => (
                    <motion.a
                        key={item.name}
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: (index * 0.1) + (i * 0.05) }}
                        className="group relative p-5 rounded-2xl border border-[var(--border-color)] bg-[var(--bg-secondary)] hover:border-gray-600/50 hover:shadow-lg hover:shadow-gray-600/5 transition-all duration-300"
                    >
                        <div className="flex items-start justify-between gap-3">
                            <div className="flex-1 min-w-0">
                                <h3 className="text-base font-medium text-[var(--text-primary)] group-hover:text-gray-400 transition-colors truncate">
                                    {item.name}
                                </h3>
                                <p className="text-sm text-[var(--text-muted)] mt-1 line-clamp-2">
                                    {lang === 'en' ? item.description.en : item.description.th}
                                </p>
                            </div>
                            <svg className="w-4 h-4 text-[var(--text-muted)] group-hover:text-gray-400 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                        </div>
                    </motion.a>
                ))}
            </div>
        </motion.div>
    );
};

export default function AttributionPage({ theme, setTheme, lang, setLang }) {
    const [bookingOpen, setBookingOpen] = useState(false);
    const t = translations[lang] || translations.en;

    return (
        <main className="min-h-screen transition-theme bg-[var(--bg-primary)]">
            <Navbar t={t} lang={lang} setLang={setLang} theme={theme} setTheme={setTheme} onBookCall={() => setBookingOpen(true)} />

            <div className="pt-32 pb-24 max-w-5xl mx-auto px-6">
                {/* Back Button */}
                <Link href="/" className="inline-flex items-center gap-2 px-4 py-2 mb-12 rounded-full border border-[var(--border-color)] bg-[var(--bg-secondary)]/50 text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--text-primary)] transition-all">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    {lang === 'en' ? 'Back to Home' : 'กลับหน้าหลัก'}
                </Link>

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-16"
                >
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-[2px] rounded-full bg-gradient-to-r from-gray-600 to-gray-700" />
                        <span className="text-[10px] font-mono uppercase tracking-[0.2em] font-bold text-gray-400">
                            {lang === 'en' ? 'Credits & Thanks' : 'เครดิตและขอบคุณ'}
                        </span>
                    </div>

                    <h1 className="text-4xl md:text-5xl font-heading font-bold text-[var(--text-primary)] mb-6">
                        {lang === 'en' ? 'Attribution' : 'เครดิต'}
                    </h1>

                    <p className="text-lg text-[var(--text-secondary)] max-w-2xl leading-relaxed min-h-[4.5rem]">
                        <TypewriterText
                            text={lang === 'en'
                                ? 'This portfolio was built with love and made possible by the incredible open-source community. Here are the amazing tools, libraries, and resources that helped bring this project to life.'
                                : 'Portfolio นี้ถูกสร้างด้วยความรักและเป็นไปได้ด้วยชุมชน Open-source ที่ยอดเยี่ยม นี่คือเครื่องมือ ไลบรารี และทรัพยากรที่ช่วยทำให้โปรเจกต์นี้เป็นจริง'}
                            delay={20}
                            startDelay={600}
                        />
                    </p>
                </motion.div>

                {/* Attribution Categories */}
                <div className="space-y-8">
                    {attributions.map((section, index) => (
                        <CategorySection
                            key={section.category.en}
                            category={section.category}
                            items={section.items}
                            index={index}
                            lang={lang}
                        />
                    ))}
                </div>

                {/* Special Thanks */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 }}
                    className="mt-20 p-8 rounded-3xl bg-gradient-to-br from-gray-600/10 to-gray-700/10 border border-gray-600/20"
                >
                    <div className="flex items-center gap-3 mb-4">
                        <span className="text-3xl">🖤</span>
                        <h2 className="text-2xl font-heading font-bold text-[var(--text-primary)]">
                            {lang === 'en' ? 'Special Thanks' : 'ขอบคุณเป็นพิเศษ'}
                        </h2>
                    </div>
                    <p className="text-[var(--text-secondary)] leading-relaxed">
                        {lang === 'en'
                            ? 'A heartfelt thank you to everyone who has supported me on this journey. To my family, friends, mentors, and the entire developer community — your encouragement and inspiration made this possible. This portfolio is a testament to collaborative creativity and the power of open source.'
                            : 'ขอบคุณจากใจถึงทุกคนที่สนับสนุนผมในการเดินทางครั้งนี้ ถึงครอบครัว เพื่อน พี่เลี้ยง และชุมชนนักพัฒนาทั้งหมด — กำลังใจและแรงบันดาลใจของคุณทำให้สิ่งนี้เป็นไปได้ Portfolio นี้เป็นหลักฐานของความคิดสร้างสรรค์ร่วมกันและพลังของ Open Source'}
                    </p>
                </motion.div>

                {/* Footer */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="mt-16 text-center"
                >
                    <p className="text-sm text-[var(--text-muted)]">
                        {lang === 'en'
                            ? 'Built with ❤️ by Thanakon D. — © 2026'
                            : 'สร้างด้วย ❤️ โดย Thanakon D. — © 2026'}
                    </p>
                </motion.div>
            </div>

            <Footer t={t} />
            <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} t={t} />
        </main>
    );
}
