import { useState, useEffect } from 'react';
import Head from 'next/head';
import translations from '@/lib/translations';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BookingModal from '@/components/BookingModal';
import Contact from '@/components/Contact';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

const IDEMockup = ({ project }) => {
    return (
        <div className="w-full h-full bg-[#0D1117] rounded-xl border border-white/10 overflow-hidden shadow-2xl flex flex-col">
            {/* OS Header */}
            <div className="h-10 bg-white/5 border-b border-white/10 flex items-center px-4 gap-2 shrink-0">
                <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
                </div>
                <div className="flex-1 flex justify-center">
                    <div className="px-3 py-1 bg-white/5 rounded-md text-[10px] text-white/40 font-mono flex items-center gap-2">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                        workspace/mailon
                    </div>
                </div>
            </div>

            <div className="flex flex-1 min-h-0">
                {/* Sidebar */}
                <div className="w-48 border-r border-white/5 bg-white/[0.02] p-4 hidden md:block">
                    <div className="text-[10px] font-bold text-white/20 uppercase tracking-widest mb-4">Project Explorer</div>
                    <div className="space-y-2">
                        <div className="flex items-center gap-2 text-white/60 text-xs">
                            <span className="text-yellow-500/80">📁</span> app/(dashboard)
                        </div>
                        <div className="flex items-center gap-2 text-white/60 text-xs">
                            <span className="text-blue-500/80">📁</span> components/ui
                        </div>
                        <div className="flex items-center gap-2 text-white/90 text-xs bg-white/5 -mx-2 px-2 py-1.5 rounded border-l-2 border-yellow-500">
                            <span className="text-emerald-500/80">📄</span> StudentJourney.tsx
                        </div>
                        <div className="flex items-center gap-2 text-white/60 text-xs">
                            <span className="text-emerald-500/80">📄</span> CareerTracker.tsx
                        </div>
                        <div className="flex items-center gap-2 text-white/60 text-xs mt-4 uppercase text-[9px] tracking-widest font-bold opacity-30">Database</div>
                        <div className="flex items-center gap-2 text-white/60 text-xs">
                            <span className="text-yellow-500/80">📄</span> schema.sql
                        </div>
                    </div>
                </div>

                {/* Code Area */}
                <div className="flex-1 p-6 font-mono text-[11px] md:text-sm leading-relaxed overflow-hidden">
                    <div className="flex gap-4">
                        <div className="text-white/20 text-right select-none space-y-0.5">
                            {Array.from({ length: 12 }).map((_, i) => (
                                <div key={i}>{i + 1}</div>
                            ))}
                        </div>
                        <div className="text-white/80 space-y-0.5">
                            <div><span className="text-purple-400">export default function</span> <span className="text-yellow-400">JourneyTracker</span>()</div>
                            <div>{'{'}</div>
                            <div className="pl-6"><span className="text-purple-400">const</span> {'{'} <span className="text-blue-300">user</span> {'}'} = useAuth();</div>
                            <div className="pl-6"><span className="text-purple-400">const</span> [<span className="text-blue-300">goals</span>, <span className="text-blue-300">setGoals</span>] = useState([]);</div>
                            <div />
                            <div className="pl-6"><span className="text-purple-400">return</span> (</div>
                            <div className="pl-12">&lt;<span className="text-blue-300">div</span> <span className="text-emerald-300">className</span>=<span className="text-emerald-300">"grid gap-6"</span>&gt;</div>
                            <div className="pl-18">&lt;<span className="text-yellow-400">StudyHardCard</span> /&gt;</div>
                            <div className="pl-18">&lt;<span className="text-yellow-400">CareerSuccessGrid</span> /&gt;</div>
                            <div className="pl-18">&lt;<span className="text-yellow-400">GoodLifeMetrics</span> /&gt;</div>
                            <div className="pl-12">&lt;/<span className="text-blue-300">div</span>&gt;</div>
                            <div className="pl-6">);</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="h-6 bg-yellow-600 flex items-center px-3 justify-between text-[10px] text-white shrink-0">
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1"><span>git(</span><span className="font-bold">main</span><span>)</span></div>
                    <div className="flex items-center gap-1 opacity-80"><span>UTF-8</span></div>
                </div>
                <div className="flex items-center gap-3 font-mono">
                    <span>Ln 1, Col 1</span>
                    <span>TypeScript</span>
                </div>
            </div>
        </div>
    );
};

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
                <span className="inline-block w-0.5 h-5 ml-1 bg-[var(--text-primary)] animate-pulse align-middle" />
            )}
        </span>
    );
};

// MailonShowcase component for Mai-lon project with hover effect
const MailonShowcase = ({ project }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className="relative w-full aspect-[5/3] rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-[#0D0D0D] cursor-pointer group"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Glow effect on hover - orange for Mai-lon brand */}
            <div className={`absolute -inset-1 bg-gradient-to-r from-orange-500/20 via-amber-500/20 to-orange-500/20 rounded-2xl blur-xl transition-opacity duration-700 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />

            {/* Main container with perspective for 3D effect */}
            <div className="relative w-full h-full" style={{ perspective: '1000px' }}>

                {/* First Image - Mai-lon Homepage (default state) */}
                <motion.div
                    className="absolute inset-0 w-full h-full"
                    initial={false}
                    animate={{
                        opacity: isHovered ? 0 : 1,
                        scale: isHovered ? 1.05 : 1,
                        rotateY: isHovered ? -15 : 0,
                    }}
                    transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                >
                    <img
                        src="/images/projects/mailon-home.png"
                        alt="Mai-lon Homepage"
                        className="w-full h-full object-cover object-top"
                    />
                    {/* Subtle overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                </motion.div>

                {/* Second Image - Mai-lon Dashboard (hover state) */}
                <motion.div
                    className="absolute inset-0 w-full h-full"
                    initial={false}
                    animate={{
                        opacity: isHovered ? 1 : 0,
                        scale: isHovered ? 1 : 0.95,
                        rotateY: isHovered ? 0 : 15,
                    }}
                    transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                >
                    <img
                        src="/images/projects/mailon-dashboard.png"
                        alt="Mai-lon Dashboard"
                        className="w-full h-full object-cover object-top"
                    />
                    {/* Subtle overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                </motion.div>

                {/* Hover indicator */}
                <div className={`absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 px-4 py-2 bg-black/60 backdrop-blur-md rounded-full border border-white/10 transition-all duration-500 ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                    <div className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
                    <span className="text-[11px] text-white/90 font-medium">Dashboard</span>
                </div>

                {/* Default state indicator */}
                <div className={`absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 px-4 py-2 bg-black/60 backdrop-blur-md rounded-full border border-white/10 transition-all duration-500 ${isHovered ? 'opacity-0 -translate-y-4' : 'opacity-100 translate-y-0'}`}>
                    <span className="text-[11px] text-white/70">Hover to explore</span>
                    <svg className="w-3 h-3 text-white/50 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                    </svg>
                </div>
            </div>

            {/* Corner accent - Mai-lon orange theme */}
            <div className={`absolute top-3 right-3 w-8 h-8 rounded-full bg-orange-500/10 backdrop-blur-sm flex items-center justify-center transition-all duration-500 ${isHovered ? 'scale-110 bg-orange-500/20' : 'scale-100'}`}>
                <motion.svg
                    className="w-4 h-4 text-orange-400/70"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    animate={{ rotate: isHovered ? 180 : 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </motion.svg>
            </div>

            {/* Orange glow background - matches the project accent */}
            <div className="absolute -inset-4 bg-orange-500/5 rounded-3xl blur-2xl -z-10" />
        </div>
    );
};

const AccordionItem = ({ title, content, isOpen, onClick }) => {
    return (
        <div className="border-b border-white/5 last:border-0">
            <button
                onClick={onClick}
                className="w-full py-5 flex items-center justify-between group text-left"
            >
                <div className="flex items-center gap-4">
                    <motion.span
                        animate={{ rotate: isOpen ? 90 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="text-[var(--text-muted)] group-hover:text-yellow-500 transition-colors"
                    >
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                        </svg>
                    </motion.span>
                    <span className={`text-sm md:text-base font-medium transition-colors ${isOpen ? 'text-[var(--text-primary)]' : 'text-[var(--text-secondary)] group-hover:text-[var(--text-primary)]'}`}>
                        {title}
                    </span>
                </div>
                <div className="text-[var(--text-muted)] opacity-0 group-hover:opacity-40 transition-opacity">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                    </svg>
                </div>
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                    >
                        <div className="pb-6 pl-11 text-sm md:text-[15px] text-[var(--text-muted)] leading-relaxed space-y-2">
                            {content.split('\n').map((line, i) => (
                                <div key={i} className="flex gap-2">
                                    <span className="text-yellow-500 opacity-50 select-none">•</span>
                                    {line}
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const TechBadge = ({ tech, i }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative">
            <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + (i * 0.1) }}
                onClick={() => setIsOpen(!isOpen)}
                className={`flex items-center gap-2.5 px-4 py-2 bg-[var(--bg-secondary)] border ${isOpen ? 'border-yellow-500/50 ring-1 ring-yellow-500/20' : 'border-[var(--border-color)]'} rounded-xl hover:border-[var(--text-primary)]/30 transition-all group relative z-20`}
            >
                <img src={`https://skillicons.dev/icons?i=${tech.icon}`} alt={tech.name} className="w-5 h-5 object-contain" />
                <span className="text-xs font-medium text-[var(--text-primary)]">{tech.name}</span>
                <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    className="text-[var(--text-muted)] opacity-50"
                >
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                    </svg>
                </motion.span>
            </motion.button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        className="absolute top-full left-0 mt-2 w-64 p-4 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-2xl shadow-2xl z-30"
                    >
                        <div className="text-[10px] font-bold text-yellow-500 uppercase tracking-widest mb-1.5 flex items-center gap-2">
                            <div className="w-1 h-1 rounded-full bg-yellow-500" />
                            Role in Project
                        </div>
                        <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                            {tech.role}
                        </p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

const OnThisPage = ({ lang }) => {
    const [activeId, setActiveId] = useState('');

    const menuItems = [
        { id: 'tech-stack', label: lang === 'en' ? 'Tech Stack' : 'เทคโนโลยีที่ใช้' },
        { id: 'features', label: lang === 'en' ? 'Feature Highlights' : 'ฟีเจอร์เด่น' },
        {
            id: 'case-study',
            label: lang === 'en' ? 'Case Study' : 'กรณีศึกษา',
            subItems: [
                { id: 'problem', label: lang === 'en' ? 'The Problem' : 'ปัญหาที่พบ' },
                { id: 'solution', label: lang === 'en' ? 'The Solution' : 'วิธีแก้ปัญหา' },
                { id: 'result', label: lang === 'en' ? 'The Result' : 'ผลลัพธ์' }
            ]
        },
        { id: 'summary', label: lang === 'en' ? 'Final Summary' : 'สรุปโปรเจกต์' },
        { id: 'navigation', label: lang === 'en' ? 'Other Projects' : 'โปรเจกต์อื่นๆ' }
    ];

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            { rootMargin: '-20% 0% -35% 0%', threshold: 0.1 }
        );

        const sections = document.querySelectorAll('section[id]');
        sections.forEach((section) => observer.observe(section));

        return () => sections.forEach((section) => observer.unobserve(section));
    }, []);

    const scrollTo = (id) => {
        const element = document.getElementById(id);
        if (element) {
            const offset = 120;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;
            window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }
    };

    return (
        <div className="sticky top-32">
            <div className="flex items-center gap-3 mb-8 text-[var(--text-primary)]">
                <svg className="w-4 h-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                </svg>
                <h3 className="text-sm font-bold uppercase tracking-widest opacity-70">On this page</h3>
            </div>

            <div className="relative border-l border-[var(--border-color)] ml-2 pl-6 space-y-6">
                {menuItems.map((item) => (
                    <div key={item.id} className="space-y-4">
                        <button
                            onClick={() => scrollTo(item.id)}
                            className={`block text-sm font-medium transition-all hover:text-[var(--text-primary)] relative ${activeId === item.id ? 'text-[var(--text-primary)]' : 'text-[var(--text-muted)]'
                                }`}
                        >
                            {activeId === item.id && (
                                <motion.div
                                    layoutId="active-line"
                                    className="absolute -left-[25px] top-0 bottom-0 w-[2px] bg-yellow-500 shadow-[0_0_15px_rgba(234,179,8,0.5)]"
                                />
                            )}
                            {item.label}
                        </button>

                        {item.subItems && (
                            <div className="ml-4 space-y-4 border-l border-[var(--border-color)]/30 pl-4">
                                {item.subItems.map((sub) => (
                                    <button
                                        key={sub.id}
                                        onClick={() => scrollTo(sub.id)}
                                        className={`block text-[13px] transition-all hover:text-[var(--text-primary)] relative ${activeId === sub.id ? 'text-[var(--text-primary)] font-medium' : 'text-[var(--text-muted)]'
                                            }`}
                                    >
                                        {activeId === sub.id && (
                                            <motion.div
                                                layoutId="active-line-sub"
                                                className="absolute -left-[17px] top-0 bottom-0 w-[1.5px] bg-yellow-400/50"
                                            />
                                        )}
                                        {sub.label}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

const ProjectNavigation = ({ lang }) => {
    return (
        <div id="navigation" className="grid md:grid-cols-2 gap-4 pt-4 scroll-mt-32">
            <Link href="/work/scribehub" className="group px-6 py-5 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-color)] hover:border-[var(--text-primary)]/30 transition-all relative overflow-hidden">
                <div className="relative z-10">
                    <div className="flex items-center gap-2 text-[var(--text-muted)] mb-2 text-[9px] font-bold tracking-[0.2em] uppercase">
                        <svg className="w-3 h-3 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                        </svg>
                        {lang === 'en' ? 'Previous' : 'ก่อนหน้า'}
                    </div>
                    <h4 className="text-lg font-heading text-[var(--text-primary)]">ScribeHub</h4>
                </div>
            </Link>

            <Link href="/work/klin" className="group px-6 py-5 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-color)] hover:border-[var(--text-primary)]/30 transition-all text-right relative overflow-hidden">
                <div className="relative z-10">
                    <div className="flex items-center justify-end gap-2 text-[var(--text-muted)] mb-2 text-[9px] font-bold tracking-[0.2em] uppercase">
                        {lang === 'en' ? 'Next' : 'ถัดไป'}
                        <svg className="w-3 h-3 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                        </svg>
                    </div>
                    <h4 className="text-lg font-heading text-[var(--text-primary)]">Klin Dental Clinic</h4>
                </div>
            </Link>
        </div>
    );
};

export default function MailonPage({ theme, setTheme, lang, setLang }) {
    const [bookingOpen, setBookingOpen] = useState(false);
    const [openFeature, setOpenFeature] = useState(0);
    const t = translations[lang] || translations.en;

    const featureHighlights = [
        {
            title: lang === 'en' ? 'Next.js 14 App Router' : 'Next.js 14 App Router',
            content: lang === 'en'
                ? 'Built with Next.js 14 App Router for optimal performance, SEO, and server-side rendering capabilities.'
                : 'พัฒนาด้วย Next.js 14 App Router สำหรับประสิทธิภาพสูงสุด, SEO และความสามารถในการ Render ฝั่งเซิร์ฟเวอร์'
        },
        {
            title: lang === 'en' ? 'Supabase Backend' : 'Supabase Backend',
            content: lang === 'en'
                ? 'Integrated Supabase for secure authentication, real-time database subscriptions, and scalable storage solutions.'
                : 'เชื่อมต่อ Supabase สำหรับการยืนยันตัวตนที่ปลอดภัย, ฐานข้อมูลเรียลไทม์ และระบบจัดเก็บที่ขยายได้'
        },
        {
            title: lang === 'en' ? 'Premium UI with shadcn/ui' : 'UI พรีเมียมด้วย shadcn/ui',
            content: lang === 'en'
                ? 'Designed with shadcn/ui and Tailwind CSS for a premium, accessible, and consistent user experience across all devices.'
                : 'ออกแบบด้วย shadcn/ui และ Tailwind CSS เพื่อประสบการณ์ผู้ใช้ระดับพรีเมียม เข้าถึงได้ และสม่ำเสมอในทุกอุปกรณ์'
        },
        {
            title: lang === 'en' ? 'Student Support Workflows' : 'เวิร์กโฟลว์สนับสนุนนักศึกษา',
            content: lang === 'en'
                ? 'Implemented automated student support workflows including career tracking, milestone management, and goal setting.'
                : 'พัฒนาเวิร์กโฟลว์สนับสนุนนักศึกษาอัตโนมัติ รวมถึงการติดตามอาชีพ การจัดการ Milestone และการตั้งเป้าหมาย'
        },
        {
            title: lang === 'en' ? 'Academic Resource Storage' : 'พื้นที่จัดเก็บทรัพยากรการศึกษา',
            content: lang === 'en'
                ? 'Features dedicated storage for academic resources, portfolio assets, and student achievement records.'
                : 'มีพื้นที่จัดเก็บเฉพาะสำหรับทรัพยากรการศึกษา, ไฟล์ Portfolio และบันทึกความสำเร็จของนักศึกษา'
        }
    ];

    const project = {
        slug: 'mailon',
        title: t.projects.mailon.title,
        period: t.projects.mailon.period,
        description: t.projects.mailon.description,
        type: t.projects.mailon.type,
        githubUrl: "#",
        tech: [
            {
                name: 'Next.js 14',
                icon: 'nextjs',
                role: lang === 'en'
                    ? 'Full-stack React framework with App Router for server components, API routes, and optimized builds.'
                    : 'เฟรมเวิร์ก React แบบ Full-stack พร้อม App Router สำหรับ Server Components, API routes และการ Build ที่เหมาะสม'
            },
            {
                name: 'Supabase',
                icon: 'supabase',
                role: lang === 'en'
                    ? 'Backend-as-a-Service providing authentication, PostgreSQL database, and real-time subscriptions.'
                    : 'Backend-as-a-Service ที่ให้บริการยืนยันตัวตน, ฐานข้อมูล PostgreSQL และการสมัครสมาชิกแบบเรียลไทม์'
            },
            {
                name: 'Tailwind',
                icon: 'tailwind',
                role: lang === 'en'
                    ? 'Utility-first CSS framework for rapid, consistent, and responsive UI development.'
                    : 'CSS เฟรมเวิร์กแบบ Utility-first สำหรับพัฒนา UI ที่รวดเร็ว สม่ำเสมอ และตอบสนองทุกหน้าจอ'
            },
            {
                name: 'TypeScript',
                icon: 'ts',
                role: lang === 'en'
                    ? 'Strongly-typed JavaScript ensuring code reliability and excellent developer experience.'
                    : 'JavaScript แบบ Type-safe ที่ช่วยให้โค้ดน่าเชื่อถือและประสบการณ์การพัฒนาที่ยอดเยี่ยม'
            },
            {
                name: 'shadcn/ui',
                icon: 'react',
                role: lang === 'en'
                    ? 'Premium component library built on Radix UI primitives for accessible and beautiful interfaces.'
                    : 'ไลบรารี Component พรีเมียมที่สร้างบน Radix UI primitives สำหรับอินเตอร์เฟซที่สวยงามและเข้าถึงได้'
            }
        ],
        features: t.projects.mailon.features,
        accent: 'yellow'
    };

    return (
        <main className="min-h-screen transition-theme bg-[var(--bg-primary)]">
            <Head>
                <title>Mai-lon - Student Success Platform | Thanakon</title>
                <meta name="description" content="Comprehensive student success platform bridging academics with career development through personalized milestone tracking and guidance." />
                <meta property="og:title" content="Mai-lon - Student Success Platform" />
                <meta property="og:description" content="Comprehensive student success platform bridging academics with career development." />
                <meta property="og:url" content="https://thnakon.dev/work/mailon" />
            </Head>
            <Navbar t={t} lang={lang} setLang={setLang} theme={theme} setTheme={setTheme} onBookCall={() => setBookingOpen(true)} />

            <div className="pt-32 pb-24 max-w-6xl mx-auto px-6">
                {/* Back Button */}
                <Link href="/work" className="inline-flex items-center gap-2 px-4 py-2 mb-12 rounded-full border border-[var(--border-color)] bg-[var(--bg-secondary)]/50 text-[10px] font-bold uppercase tracking-[0.2em] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--text-primary)] transition-all">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    {lang === 'en' ? 'Back to work' : 'กลับไปหน้าผลงาน'}
                </Link>

                {/* Header Section */}
                <div className="grid lg:grid-cols-12 gap-16 items-center mb-24">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="lg:col-span-5"
                    >
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-[2px] rounded-full bg-yellow-500" />
                            <div className="text-[10px] font-mono uppercase tracking-[0.2em] font-bold text-yellow-500">
                                {project.type}
                            </div>
                        </div>

                        <h1 className="text-3xl md:text-5xl font-heading text-[var(--text-primary)] mb-6 leading-tight">
                            {project.title}
                        </h1>

                        <p className="text-base md:text-lg text-[var(--text-secondary)] leading-relaxed font-body mb-10 min-h-[4em]">
                            <TypewriterText text={project.description} delay={20} startDelay={800} />
                        </p>

                        <div className="flex flex-wrap items-center gap-x-10 gap-y-8 text-[var(--text-muted)] border-t border-[var(--border-color)] pt-8">
                            <div className="flex items-center gap-4">
                                <a
                                    href="https://github.com/thnakon/Mai-Lon"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group relative p-[1px] rounded-full transition-all duration-300 hover:scale-105 active:scale-95"
                                >
                                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-500 via-amber-500 to-orange-500 opacity-40 group-hover:opacity-100 transition-opacity" />
                                    <div className="relative px-4 py-1.5 bg-[#0D1117] rounded-full flex items-center gap-2">
                                        <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                        </svg>
                                        <span className="text-white text-[11px] font-medium tracking-tight whitespace-nowrap">Star on GitHub</span>
                                    </div>
                                </a>

                                <a
                                    href="#"
                                    className="px-5 py-2 bg-[#E5E7EB] hover:bg-white text-black rounded-full flex items-center gap-2 transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg group"
                                >
                                    <span className="font-heading font-medium text-xs whitespace-nowrap">Coming Soon</span>
                                    <svg className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M7 17L17 7M17 7H7M17 7V17" />
                                    </svg>
                                </a>
                            </div>

                            <div className="w-[1px] h-8 bg-[var(--border-color)] hidden sm:block opacity-20" />

                            <div className="flex items-center gap-8">
                                <div>
                                    <div className="text-[10px] uppercase tracking-widest font-bold mb-1">{lang === 'en' ? 'Year' : 'ปีที่พัฒนา'}</div>
                                    <div className="text-sm font-medium text-[var(--text-primary)]">{project.period}</div>
                                </div>
                                <div>
                                    <div className="text-[10px] uppercase tracking-widest font-bold mb-1">{lang === 'en' ? 'Category' : 'หมวดหมู่'}</div>
                                    <div className="text-sm font-medium text-[var(--text-primary)]">{project.type}</div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="lg:col-span-7 relative"
                    >
                        <MailonShowcase project={project} />
                        <div className="absolute -inset-10 bg-yellow-500/5 rounded-full blur-[120px] -z-10" />
                    </motion.div>
                </div>

                {/* Tech Stack */}
                <section id="tech-stack" className="mb-24 scroll-mt-32">
                    <h2 className="text-2xl font-heading mb-8 text-[var(--text-primary)]">
                        {lang === 'en' ? "Tech Stack" : "เทคโนโลยีที่ใช้"}
                    </h2>
                    <div className="flex flex-wrap gap-3">
                        {project.tech.map((tech, i) => (
                            <TechBadge key={i} tech={tech} i={i} />
                        ))}
                    </div>
                </section>

                <div className="grid lg:grid-cols-3 gap-16 mb-24">
                    <div className="lg:col-span-2 space-y-12">
                        <section id="features" className="scroll-mt-32">
                            <h2 className="text-2xl font-heading mb-8 text-[var(--text-primary)]">Feature Highlights</h2>
                            <div className="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-3xl overflow-hidden p-2">
                                {featureHighlights.map((feature, i) => (
                                    <AccordionItem
                                        key={i}
                                        title={feature.title}
                                        content={feature.content}
                                        isOpen={openFeature === i}
                                        onClick={() => setOpenFeature(openFeature === i ? -1 : i)}
                                    />
                                ))}
                            </div>
                        </section>

                        {/* Case Study: Problem → Solution → Result */}
                        <section id="case-study" className="pt-12 space-y-16 scroll-mt-32">
                            <div>
                                <h2 className="text-2xl font-heading mb-10 text-[var(--text-primary)]">
                                    {lang === 'en' ? 'Case Study' : 'กรณีศึกษา'}
                                </h2>

                                <div className="space-y-12">
                                    {/* The Problem */}
                                    <section id="problem" className="max-w-4xl scroll-mt-32">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center">
                                                <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                                </svg>
                                            </div>
                                            <h3 className="text-xl font-heading text-[var(--text-primary)]">
                                                {lang === 'en' ? 'The Problem' : 'ปัญหาที่พบ'}
                                            </h3>
                                        </div>
                                        <div className="pl-11 space-y-3 text-[var(--text-secondary)] text-lg leading-relaxed">
                                            {lang === 'en' ? (
                                                <>
                                                    <p>Thai university students often struggle to balance academics, personal growth, and career preparation. Traditional educational systems lack tools that guide students holistically toward professional success.</p>
                                                    <p className="text-[var(--text-muted)]">• No unified platform for tracking academic and career milestones</p>
                                                    <p className="text-[var(--text-muted)]">• Limited resources connecting study habits to career outcomes</p>
                                                    <p className="text-[var(--text-muted)]">• Students lack personalized guidance for skill development</p>
                                                    <p className="text-[var(--text-muted)]">• Fragmented tools for portfolio building and job preparation</p>
                                                </>
                                            ) : (
                                                <>
                                                    <p>นักศึกษามหาวิทยาลัยไทยมักดิ้นรนกับการสร้างสมดุลระหว่างการเรียน การพัฒนาตัวเอง และการเตรียมพร้อมสำหรับอาชีพ ระบบการศึกษาแบบดั้งเดิมขาดเครื่องมือที่ช่วยนำทางนักศึกษาสู่ความสำเร็จในอาชีพ</p>
                                                    <p className="text-[var(--text-muted)]">• ไม่มีแพลตฟอร์มรวมศูนย์สำหรับติดตาม Milestone ทางการเรียนและอาชีพ</p>
                                                    <p className="text-[var(--text-muted)]">• แหล่งข้อมูลเชื่อมโยงนิสัยการเรียนกับผลลัพธ์ทางอาชีพมีจำกัด</p>
                                                    <p className="text-[var(--text-muted)]">• นักศึกษาขาดคำแนะนำเฉพาะบุคคลสำหรับการพัฒนาทักษะ</p>
                                                    <p className="text-[var(--text-muted)]">• เครื่องมือสร้าง Portfolio และเตรียมหางานกระจัดกระจาย</p>
                                                </>
                                            )}
                                        </div>
                                    </section>

                                    {/* The Solution */}
                                    <section id="solution" className="scroll-mt-32 max-w-4xl pt-4">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="w-8 h-8 rounded-lg bg-yellow-500/10 flex items-center justify-center">
                                                <svg className="w-4 h-4 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                                </svg>
                                            </div>
                                            <h3 className="text-xl font-heading text-[var(--text-primary)]">
                                                {lang === 'en' ? 'The Solution' : 'วิธีแก้ปัญหา'}
                                            </h3>
                                        </div>
                                        <div className="pl-11 space-y-3 text-[var(--text-secondary)] text-lg leading-relaxed">
                                            {lang === 'en' ? (
                                                <>
                                                    <p>I designed and developed Mai-lon—a comprehensive student success platform that bridges academics with career development through personalized tracking and guidance.</p>
                                                    <p className="text-[var(--text-muted)]">• Built flexible milestone tracking adaptable to diverse student goals</p>
                                                    <p className="text-[var(--text-muted)]">• Created scalable architecture with Supabase for high-volume engagement</p>
                                                    <p className="text-[var(--text-muted)]">• Designed intuitive UI that balances functionality with simplicity</p>
                                                    <p className="text-[var(--text-muted)]">• Implemented Next.js 14 App Router for optimal performance</p>
                                                </>
                                            ) : (
                                                <>
                                                    <p>ผมออกแบบและพัฒนา Mai-lon แพลตฟอร์มสนับสนุนความสำเร็จของนักศึกษาที่เชื่อมการเรียนกับการพัฒนาอาชีพผ่านการติดตามและคำแนะนำเฉพาะบุคคล</p>
                                                    <p className="text-[var(--text-muted)]">• สร้างระบบติดตาม Milestone ยืดหยุ่นปรับตามเป้าหมายที่หลากหลาย</p>
                                                    <p className="text-[var(--text-muted)]">• สร้างสถาปัตยกรรมที่ขยายได้ด้วย Supabase สำหรับผู้ใช้จำนวนมาก</p>
                                                    <p className="text-[var(--text-muted)]">• ออกแบบ UI ใช้งานง่ายสมดุลฟังก์ชันกับความเรียบง่าย</p>
                                                    <p className="text-[var(--text-muted)]">• ใช้ Next.js 14 App Router เพื่อประสิทธิภาพสูงสุด</p>
                                                </>
                                            )}
                                        </div>
                                    </section>

                                    {/* The Result */}
                                    <section id="result" className="scroll-mt-32 max-w-4xl pt-4">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                                                <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                            </div>
                                            <h3 className="text-xl font-heading text-[var(--text-primary)]">
                                                {lang === 'en' ? 'The Result' : 'ผลลัพธ์'}
                                            </h3>
                                        </div>
                                        <div className="pl-11 space-y-3 text-[var(--text-secondary)] text-lg leading-relaxed">
                                            {lang === 'en' ? (
                                                <>
                                                    <p>Mai-lon embodies "study hard, succeed in careers, and live a good life"—providing students with the tools they need for holistic success.</p>
                                                    <p className="text-[var(--text-muted)]">• Comprehensive platform connecting academic progress to career readiness</p>
                                                    <p className="text-[var(--text-muted)]">• Demonstrated mastery of Next.js 14 and modern React patterns</p>
                                                    <p className="text-[var(--text-muted)]">• Showcased production-ready development with Supabase backend</p>
                                                    <p className="text-[var(--text-muted)]">• Created accessible, premium UI with shadcn/ui components</p>
                                                </>
                                            ) : (
                                                <>
                                                    <p>Mai-lon แสดงปรัชญา "เรียนหนัก สำเร็จในอาชีพ และใช้ชีวิตที่ดี" พร้อมมอบเครื่องมือที่นักศึกษาต้องการสำหรับความสำเร็จรอบด้าน</p>
                                                    <p className="text-[var(--text-muted)]">• แพลตฟอร์มครบวงจรเชื่อมโยงความก้าวหน้าทางการเรียนกับความพร้อมทางอาชีพ</p>
                                                    <p className="text-[var(--text-muted)]">• แสดงความเชี่ยวชาญใน Next.js 14 และ React patterns สมัยใหม่</p>
                                                    <p className="text-[var(--text-muted)]">• แสดงการพัฒนาระดับ Production ด้วย Supabase backend</p>
                                                    <p className="text-[var(--text-muted)]">• สร้าง UI พรีเมียมที่เข้าถึงได้ด้วย shadcn/ui components</p>
                                                </>
                                            )}
                                        </div>
                                    </section>
                                </div>
                            </div>
                        </section>

                        {/* Final Summary */}
                        <section id="summary" className="pt-12 scroll-mt-32">
                            <h2 className="text-2xl font-heading mb-8 text-[var(--text-primary)]">
                                {lang === 'en' ? 'Conclusion' : 'สรุปส่งท้าย'}
                            </h2>
                            <p className="text-lg text-[var(--text-secondary)] leading-relaxed font-light italic">
                                {lang === 'en'
                                    ? "Mai-lon represents a commitment to student success—a platform that goes beyond traditional learning management to truly support the complete student journey. By combining modern technology with thoughtful design, it aims to be the trusted companion for the next generation of achievers."
                                    : "Mai-lon แสดงถึงความมุ่งมั่นต่อความสำเร็จของนักศึกษา—แพลตฟอร์มที่ก้าวข้ามระบบจัดการการเรียนรู้แบบดั้งเดิมเพื่อสนับสนุนเส้นทางนักศึกษาอย่างแท้จริง ด้วยการผสมผสานเทคโนโลยีสมัยใหม่เข้ากับการออกแบบอย่างรอบคอบ มุ่งหวังที่จะเป็นเพื่อนคู่ใจที่ไว้วางใจได้สำหรับคนรุ่นใหม่ที่ประสบความสำเร็จ"}
                            </p>
                            <div className="mt-6 text-xl font-heading text-[var(--text-primary)]">
                                {lang === 'en' ? 'Thank You!' : 'ขอบคุณครับ!'}
                            </div>
                        </section>

                        {/* Project Navigation */}
                        <ProjectNavigation lang={lang} />
                    </div>

                    <div className="space-y-8">
                        <OnThisPage lang={lang} />
                    </div>
                </div>
            </div>

            <Contact t={t} onGetInTouch={() => setBookingOpen(true)} />
            <Footer t={t} />
            <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} t={t} />
        </main>
    );
}
