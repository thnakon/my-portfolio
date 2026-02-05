import { useState, useEffect } from 'react';
import translations from '@/lib/translations';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BookingModal from '@/components/BookingModal';
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
                <span className="inline-block w-0.5 h-4 ml-0.5 bg-[var(--text-primary)] animate-pulse align-middle" />
            )}
        </span>
    );
};

// Link data with icons and colors
const links = [
    {
        id: 'github',
        name: 'GitHub',
        url: 'https://github.com/thnakon',
        description: 'Open source projects & code repositories',
        descriptionTH: 'โปรเจกต์ Open Source และ Code Repositories',
        icon: (
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
        ),
        color: '#333',
        bgGradient: 'from-gray-700 to-gray-900'
    },
    {
        id: 'linkedin',
        name: 'LinkedIn',
        url: 'https://www.linkedin.com/in/thanakon-duangkumwattanasiri/',
        description: 'Professional network & career updates',
        descriptionTH: 'เครือข่ายมืออาชีพและอัปเดตอาชีพ',
        icon: (
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
            </svg>
        ),
        color: '#0A66C2',
        bgGradient: 'from-blue-600 to-blue-800'
    },
    {
        id: 'twitter',
        name: 'X (Twitter)',
        url: 'https://x.com/Obounwarm',
        description: 'Thoughts, updates & tech discussions',
        descriptionTH: 'ความคิด อัปเดต และการสนทนาเทคโนโลยี',
        icon: (
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
        ),
        color: '#000',
        bgGradient: 'from-gray-800 to-black'
    },
    {
        id: 'gitlab',
        name: 'GitLab',
        url: 'https://gitlab.com/thnakon',
        description: 'Private projects & enterprise work',
        descriptionTH: 'โปรเจกต์ส่วนตัวและงานองค์กร',
        icon: (
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="m23.6 9.593-.033-.086L20.3.98a.851.851 0 0 0-.336-.405.87.87 0 0 0-.52-.144.87.87 0 0 0-.52.152.86.86 0 0 0-.324.413l-2.178 6.674H7.59L5.412.996a.856.856 0 0 0-.324-.413A.87.87 0 0 0 4.568.43a.87.87 0 0 0-.52.144.851.851 0 0 0-.336.405L.433 9.502l-.032.086a6.066 6.066 0 0 0 2.012 7.01l.01.008.028.02 4.984 3.737 2.467 1.87 1.502 1.136a1.01 1.01 0 0 0 1.22 0l1.502-1.136 2.467-1.87 5.012-3.757.013-.01a6.07 6.07 0 0 0 2.005-7.003z" />
            </svg>
        ),
        color: '#FC6D26',
        bgGradient: 'from-orange-500 to-orange-700'
    },
    {
        id: 'email',
        name: 'Email',
        url: 'mailto:thnakon.d@gmail.com',
        description: 'Contact me directly via email',
        descriptionTH: 'ติดต่อผมโดยตรงผ่านอีเมล',
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
        ),
        color: '#EA4335',
        bgGradient: 'from-red-500 to-red-700'
    },
    {
        id: 'portfolio',
        name: 'Portfolio',
        url: '/',
        description: 'Explore my work & projects',
        descriptionTH: 'สำรวจผลงานและโปรเจกต์ของผม',
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
        ),
        color: '#8B5CF6',
        bgGradient: 'from-violet-500 to-purple-700'
    },
    {
        id: 'resume',
        name: 'Resume / CV',
        url: '/resume.pdf',
        description: 'Download my resume',
        descriptionTH: 'ดาวน์โหลดประวัติย่อของผม',
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
        ),
        color: '#10B981',
        bgGradient: 'from-emerald-500 to-emerald-700'
    },
    {
        id: 'blog',
        name: 'Blog',
        url: '/blog',
        description: 'Read my thoughts & tutorials',
        descriptionTH: 'อ่านความคิดและบทเรียนของผม',
        icon: (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
            </svg>
        ),
        color: '#F59E0B',
        bgGradient: 'from-amber-500 to-amber-700'
    }
];

const LinkCard = ({ link, index, lang }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.a
            href={link.url}
            target={link.url.startsWith('http') ? '_blank' : '_self'}
            rel={link.url.startsWith('http') ? 'noopener noreferrer' : ''}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="group relative block"
        >
            <div className={`relative overflow-hidden rounded-2xl border border-[var(--border-color)] bg-[var(--bg-secondary)] p-6 transition-all duration-500 ${isHovered ? 'border-transparent shadow-2xl scale-[1.02]' : 'hover:border-[var(--text-primary)]/20'}`}>
                {/* Background gradient on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${link.bgGradient} opacity-0 transition-opacity duration-500 ${isHovered ? 'opacity-10' : ''}`} />

                <div className="relative flex items-center gap-5">
                    {/* Icon */}
                    <div
                        className="flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-500"
                        style={{
                            backgroundColor: isHovered ? link.color : 'var(--bg-primary)',
                            color: isHovered ? 'white' : 'var(--text-primary)'
                        }}
                    >
                        {link.icon}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                            <h3 className="text-lg font-heading font-semibold text-[var(--text-primary)] truncate">
                                {link.name}
                            </h3>
                            <svg className={`w-4 h-4 text-[var(--text-muted)] transition-all duration-300 ${isHovered ? 'translate-x-1 opacity-100' : 'opacity-50'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </div>
                        <p className="text-sm text-[var(--text-muted)] truncate">
                            {lang === 'en' ? link.description : link.descriptionTH}
                        </p>
                    </div>
                </div>

                {/* Bottom border accent */}
                <div
                    className="absolute bottom-0 left-0 right-0 h-1 transition-all duration-500"
                    style={{
                        background: isHovered ? `linear-gradient(to right, ${link.color}, transparent)` : 'transparent'
                    }}
                />
            </div>
        </motion.a>
    );
};

export default function LinksPage({ theme, setTheme, lang, setLang }) {
    const [bookingOpen, setBookingOpen] = useState(false);
    const t = translations[lang] || translations.en;

    return (
        <main className="min-h-screen transition-theme bg-[var(--bg-primary)]">
            <Navbar t={t} lang={lang} setLang={setLang} theme={theme} setTheme={setTheme} onBookCall={() => setBookingOpen(true)} />

            <div className="pt-32 pb-24 max-w-3xl mx-auto px-6">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    {/* Profile Image */}
                    <div className="relative inline-block mb-6">
                        <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-[var(--border-color)] shadow-xl">
                            <img
                                src="/images/profile-bento.jpg"
                                alt="Thanakon"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-green-500 rounded-full border-4 border-[var(--bg-primary)] flex items-center justify-center">
                            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                        </div>
                    </div>

                    {/* Name & Title */}
                    <h1 className="text-3xl md:text-4xl font-heading font-bold text-[var(--text-primary)] mb-3">
                        Thanakon D.
                    </h1>
                    <p className="text-lg text-[var(--text-secondary)] mb-2">
                        {lang === 'en' ? 'Full Stack Developer' : 'Full Stack Developer'}
                    </p>
                    <p className="text-sm text-[var(--text-muted)] max-w-md mx-auto min-h-[1.5rem]">
                        <TypewriterText
                            text={lang === 'en'
                                ? 'Building high-performance digital products with modern technologies.'
                                : 'สร้างสรรค์ผลิตภัณฑ์ดิจิทัลประสิทธิภาพสูงด้วยเทคโนโลยีที่ทันสมัย'}
                            delay={30}
                            startDelay={800}
                        />
                    </p>
                </motion.div>

                {/* Links Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {links.map((link, index) => (
                        <LinkCard key={link.id} link={link} index={index} lang={lang} />
                    ))}
                </div>

                {/* Footer Text */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="text-center mt-16"
                >
                    <p className="text-sm text-[var(--text-muted)]">
                        {lang === 'en' ? '© 2026 Thanakon D. All rights reserved.' : '© 2026 Thanakon D. สงวนลิขสิทธิ์'}
                    </p>
                </motion.div>
            </div>

            <Footer t={t} />
            <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} t={t} />
        </main>
    );
}
