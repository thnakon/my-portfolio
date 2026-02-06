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
                        workspace/dental-clinic
                    </div>
                </div>
            </div>

            <div className="flex flex-1 min-h-0">
                {/* Sidebar */}
                <div className="w-48 border-r border-white/5 bg-white/[0.02] p-4 hidden md:block">
                    <div className="text-[10px] font-bold text-white/20 uppercase tracking-widest mb-4">Project Explorer</div>
                    <div className="space-y-2">
                        <div className="flex items-center gap-2 text-white/60 text-xs">
                            <span className="text-red-500/80">📁</span> app/Http/Controllers
                        </div>
                        <div className="flex items-center gap-2 text-white/90 text-xs bg-white/5 -mx-2 px-2 py-1.5 rounded border-l-2 border-cyan-500">
                            <span className="text-cyan-500/80">📄</span> BookingController.php
                        </div>
                        <div className="flex items-center gap-2 text-white/60 text-xs">
                            <span className="text-emerald-500/80">📄</span> PatientController.php
                        </div>
                        <div className="flex items-center gap-2 text-white/60 text-xs mt-4 uppercase text-[9px] tracking-widest font-bold opacity-30">Resources</div>
                        <div className="flex items-center gap-2 text-white/60 text-xs">
                            <span className="text-yellow-500/80">📄</span> booking.blade.php
                        </div>
                        <div className="flex items-center gap-2 text-white/60 text-xs">
                            <span className="text-blue-500/80">📄</span> booking.js
                        </div>
                    </div>
                </div>

                {/* Code Area */}
                <div className="flex-1 p-6 font-mono text-[11px] md:text-sm leading-relaxed overflow-hidden">
                    <div className="flex gap-4">
                        <div className="text-white/20 text-right select-none space-y-0.5">
                            {Array.from({ length: 11 }).map((_, i) => (
                                <div key={i}>{i + 1}</div>
                            ))}
                        </div>
                        <div className="text-white/80 space-y-0.5">
                            <div><span className="text-purple-400">public function</span> <span className="text-yellow-400">createAppointment</span>(Request <span className="text-blue-300">$request</span>)</div>
                            <div>{'{'}</div>
                            <div className="pl-6"><span className="text-blue-300">$patient</span> = <span className="text-emerald-400">Patient</span>::find(<span className="text-blue-300">$request</span>-&gt;id);</div>
                            <div className="pl-6"><span className="text-blue-300">$appointment</span> = <span className="text-emerald-400">Appointment</span>::create([</div>
                            <div className="pl-12"><span className="text-emerald-300">'patient_id'</span> =&gt; <span className="text-blue-300">$patient</span>-&gt;id,</div>
                            <div className="pl-12"><span className="text-emerald-300">'dentist_id'</span> =&gt; <span className="text-blue-300">$request</span>-&gt;dentist_id,</div>
                            <div className="pl-12"><span className="text-emerald-300">'scheduled_at'</span> =&gt; <span className="text-blue-300">$request</span>-&gt;date</div>
                            <div className="pl-6">]);</div>
                            <div />
                            <div className="pl-6"><span className="text-purple-400">return</span> redirect()-&gt;back()-&gt;with(<span className="text-emerald-300">'success'</span>, <span className="text-emerald-300">'Booked!'</span>);</div>
                            <div>{'}'}</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="h-6 bg-cyan-600 flex items-center px-3 justify-between text-[10px] text-white shrink-0">
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1"><span>git(</span><span className="font-bold">main</span><span>)</span></div>
                    <div className="flex items-center gap-1 opacity-80"><span>UTF-8</span></div>
                </div>
                <div className="flex items-center gap-3 font-mono">
                    <span>Ln 1, Col 1</span>
                    <span>PHP</span>
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

// KlinShowcase component for Klin Dental Clinic project with hover effect
const KlinShowcase = ({ project }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className="relative w-full aspect-[5/3] rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-[#0D0D0D] cursor-pointer group"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Glow effect on hover - cyan for Klin Dental brand */}
            <div className={`absolute -inset-1 bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-cyan-500/20 rounded-2xl blur-xl transition-opacity duration-700 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />

            {/* Main container with perspective for 3D effect */}
            <div className="relative w-full h-full" style={{ perspective: '1000px' }}>

                {/* First Image - Klin Homepage (default state) */}
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
                        src="/images/projects/klin-home.png"
                        alt="Klin Dental Homepage"
                        className="w-full h-full object-cover object-top"
                    />
                    {/* Subtle overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                </motion.div>

                {/* Second Image - Klin Dashboard (hover state) */}
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
                        src="/images/projects/klin-dashboard.png"
                        alt="Klin Patient Dashboard"
                        className="w-full h-full object-cover object-top"
                    />
                    {/* Subtle overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                </motion.div>

                {/* Hover indicator */}
                <div className={`absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 px-4 py-2 bg-black/60 backdrop-blur-md rounded-full border border-white/10 transition-all duration-500 ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                    <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                    <span className="text-[11px] text-white/90 font-medium">Patient Dashboard</span>
                </div>

                {/* Default state indicator */}
                <div className={`absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 px-4 py-2 bg-black/60 backdrop-blur-md rounded-full border border-white/10 transition-all duration-500 ${isHovered ? 'opacity-0 -translate-y-4' : 'opacity-100 translate-y-0'}`}>
                    <span className="text-[11px] text-white/70">Hover to explore</span>
                    <svg className="w-3 h-3 text-white/50 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                    </svg>
                </div>
            </div>

            {/* Corner accent - Klin cyan/blue theme */}
            <div className={`absolute top-3 right-3 w-8 h-8 rounded-full bg-cyan-500/10 backdrop-blur-sm flex items-center justify-center transition-all duration-500 ${isHovered ? 'scale-110 bg-cyan-500/20' : 'scale-100'}`}>
                <motion.svg
                    className="w-4 h-4 text-cyan-400/70"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    animate={{ rotate: isHovered ? 180 : 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </motion.svg>
            </div>

            {/* Cyan glow background - matches the project accent */}
            <div className="absolute -inset-4 bg-cyan-500/5 rounded-3xl blur-2xl -z-10" />
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
                        className="text-[var(--text-muted)] group-hover:text-cyan-500 transition-colors"
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
                                    <span className="text-cyan-500 opacity-50 select-none">•</span>
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
                className={`flex items-center gap-2.5 px-4 py-2 bg-[var(--bg-secondary)] border ${isOpen ? 'border-cyan-500/50 ring-1 ring-cyan-500/20' : 'border-[var(--border-color)]'} rounded-xl hover:border-[var(--text-primary)]/30 transition-all group relative z-20`}
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
                        <div className="text-[10px] font-bold text-cyan-500 uppercase tracking-widest mb-1.5 flex items-center gap-2">
                            <div className="w-1 h-1 rounded-full bg-cyan-500" />
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
                                    className="absolute -left-[25px] top-0 bottom-0 w-[2px] bg-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.5)]"
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
                                                className="absolute -left-[17px] top-0 bottom-0 w-[1.5px] bg-cyan-400/50"
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
            <Link href="/work/mailon" className="group px-6 py-5 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-color)] hover:border-[var(--text-primary)]/30 transition-all relative overflow-hidden">
                <div className="relative z-10">
                    <div className="flex items-center gap-2 text-[var(--text-muted)] mb-2 text-[9px] font-bold tracking-[0.2em] uppercase">
                        <svg className="w-3 h-3 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                        </svg>
                        {lang === 'en' ? 'Previous' : 'ก่อนหน้า'}
                    </div>
                    <h4 className="text-lg font-heading text-[var(--text-primary)]">Mai-lon</h4>
                </div>
            </Link>

            <Link href="/work/singha" className="group px-6 py-5 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-color)] hover:border-[var(--text-primary)]/30 transition-all text-right relative overflow-hidden">
                <div className="relative z-10">
                    <div className="flex items-center justify-end gap-2 text-[var(--text-muted)] mb-2 text-[9px] font-bold tracking-[0.2em] uppercase">
                        {lang === 'en' ? 'Next' : 'ถัดไป'}
                        <svg className="w-3 h-3 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                        </svg>
                    </div>
                    <h4 className="text-lg font-heading text-[var(--text-primary)]">Singha.com</h4>
                </div>
            </Link>
        </div>
    );
};

export default function KlinPage({ theme, setTheme, lang, setLang }) {
    const [bookingOpen, setBookingOpen] = useState(false);
    const [openFeature, setOpenFeature] = useState(0);
    const t = translations[lang] || translations.en;

    const featureHighlights = [
        {
            title: lang === 'en' ? 'Appointment Booking System' : 'ระบบจองนัดหมาย',
            content: lang === 'en'
                ? 'Engineered a seamless appointment booking system allowing patients to select dentists, services, and available time slots with real-time availability checking.'
                : 'พัฒนาระบบจองนัดหมายที่ราบรื่นให้ผู้ป่วยเลือกทันตแพทย์ บริการ และช่วงเวลาที่ว่างพร้อมตรวจสอบความพร้อมแบบเรียลไทม์'
        },
        {
            title: lang === 'en' ? 'Patient Record Management' : 'ระบบจัดการข้อมูลผู้ป่วย',
            content: lang === 'en'
                ? 'Implemented a secure patient record management system using MySQL with proper data encryption and access control for sensitive medical information.'
                : 'พัฒนาระบบจัดการข้อมูลผู้ป่วยที่ปลอดภัยโดยใช้ MySQL พร้อมการเข้ารหัสข้อมูลและการควบคุมการเข้าถึงข้อมูลทางการแพทย์ที่เหมาะสม'
        },
        {
            title: lang === 'en' ? 'Responsive Modern UI' : 'UI ที่ทันสมัยและ Responsive',
            content: lang === 'en'
                ? 'Designed a responsive and modern user interface using Bootstrap and custom JavaScript for optimal experience across all devices.'
                : 'ออกแบบอินเตอร์เฟซผู้ใช้ที่ทันสมัยและ Responsive โดยใช้ Bootstrap และ JavaScript เฉพาะทางเพื่อประสบการณ์ที่ดีที่สุดในทุกอุปกรณ์'
        },
        {
            title: lang === 'en' ? 'Clinic Workflow Management' : 'ระบบจัดการ Workflow คลินิก',
            content: lang === 'en'
                ? 'Streamlined clinic workflows including service selection, dentist scheduling, and calendar management for efficient daily operations.'
                : 'ปรับปรุง Workflow คลินิกรวมถึงการเลือกบริการ การจัดตารางทันตแพทย์ และการจัดการปฏิทิน เพื่อการดำเนินงานประจำวันที่มีประสิทธิภาพ'
        },
        {
            title: lang === 'en' ? 'Automated Notifications' : 'การแจ้งเตือนอัตโนมัติ',
            content: lang === 'en'
                ? 'Integrated automated notification systems for booking confirmations, appointment reminders, and schedule changes via email.'
                : 'เชื่อมต่อระบบแจ้งเตือนอัตโนมัติสำหรับการยืนยันการจอง การเตือนนัดหมาย และการเปลี่ยนแปลงตารางเวลาผ่านอีเมล'
        }
    ];

    const project = {
        slug: 'klin',
        title: t.projects.klin.title,
        period: t.projects.klin.period,
        description: t.projects.klin.description,
        type: t.projects.klin.type,
        gitlabUrl: "https://gitlab.com/merge_digital_agency/intern/CMU2025_THNAKON_DUANGKUMWATTANASIRI/-/tree/main/dental-test?ref_type=heads",
        tech: [
            {
                name: 'Laravel',
                icon: 'laravel',
                role: lang === 'en'
                    ? 'PHP framework providing MVC architecture, Eloquent ORM, and robust backend logic for clinic operations.'
                    : 'PHP framework ที่ให้สถาปัตยกรรม MVC, Eloquent ORM และ Backend logic ที่แข็งแกร่งสำหรับการดำเนินงานคลินิก'
            },
            {
                name: 'Bootstrap',
                icon: 'bootstrap',
                role: lang === 'en'
                    ? 'CSS framework for rapid, responsive UI development with consistent styling across devices.'
                    : 'CSS framework สำหรับพัฒนา UI ที่รวดเร็ว Responsive พร้อม Styling ที่สม่ำเสมอในทุกอุปกรณ์'
            },
            {
                name: 'MySQL',
                icon: 'mysql',
                role: lang === 'en'
                    ? 'Relational database for secure storage of patient records, appointments, and clinic data.'
                    : 'ฐานข้อมูลเชิงสัมพันธ์สำหรับจัดเก็บข้อมูลผู้ป่วย นัดหมาย และข้อมูลคลินิกอย่างปลอดภัย'
            },
            {
                name: 'JavaScript',
                icon: 'js',
                role: lang === 'en'
                    ? 'Client-side scripting for interactive calendar, date picker, and dynamic form validation.'
                    : 'Client-side scripting สำหรับปฏิทินแบบ Interactive, Date Picker และการ Validate Form แบบ Dynamic'
            }
        ],
        features: t.projects.klin.features,
        accent: 'cyan'
    };

    return (
        <main className="min-h-screen transition-theme bg-[var(--bg-primary)]">
            <Head>
                <title>Klin - Dental Clinic Management | Thanakon</title>
                <meta name="description" content="Laravel-based dental clinic management system with appointment booking, patient records, and automated notifications. Built during internship at Merge Digital Agency." />
                <meta property="og:title" content="Klin - Dental Clinic Management" />
                <meta property="og:description" content="Laravel-based dental clinic management system with appointment booking and patient records." />
                <meta property="og:url" content="https://thnakon.dev/work/klin" />
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
                            <div className="w-12 h-[2px] rounded-full bg-cyan-500" />
                            <div className="text-[10px] font-mono uppercase tracking-[0.2em] font-bold text-cyan-500">
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
                                    href={project.gitlabUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group relative p-[1px] rounded-full transition-all duration-300 hover:scale-105 active:scale-95"
                                >
                                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500 via-teal-500 to-emerald-500 opacity-40 group-hover:opacity-100 transition-opacity" />
                                    <div className="relative px-4 py-1.5 bg-[#0D1117] rounded-full flex items-center gap-2">
                                        <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M22.65 14.39L12 22.13 1.35 14.39a.84.84 0 0 1-.3-.94l1.22-3.78 2.44-7.51A.42.42 0 0 1 4.82 2a.43.43 0 0 1 .58 0 .42.42 0 0 1 .11.18l2.44 7.49h8.1l2.44-7.51A.42.42 0 0 1 18.6 2a.43.43 0 0 1 .58 0 .42.42 0 0 1 .11.18l2.44 7.51L23 13.45a.84.84 0 0 1-.35.94z" />
                                        </svg>
                                        <span className="text-white text-[11px] font-medium tracking-tight whitespace-nowrap">View on GitLab</span>
                                    </div>
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
                        <KlinShowcase project={project} />
                        <div className="absolute -inset-10 bg-cyan-500/5 rounded-full blur-[120px] -z-10" />
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
                                                    <p>The dental clinic struggled with manual appointment scheduling, leading to double-bookings, missed appointments, and inefficient staff workflows. Patient records were scattered across paper files, making retrieval slow and error-prone.</p>
                                                    <p className="text-[var(--text-muted)]">• Manual scheduling caused frequent double-booking conflicts</p>
                                                    <p className="text-[var(--text-muted)]">• Paper-based patient records were hard to retrieve and update</p>
                                                    <p className="text-[var(--text-muted)]">• No automated reminders for patient appointments</p>
                                                    <p className="text-[var(--text-muted)]">• Dentist schedules were difficult to manage and coordinate</p>
                                                </>
                                            ) : (
                                                <>
                                                    <p>คลินิกทันตกรรมประสบปัญหากับการนัดหมายแบบมือ นำไปสู่การจองซ้ำซ้อน นัดหมายที่พลาด และ Workflow ที่ไม่มีประสิทธิภาพ ข้อมูลผู้ป่วยกระจัดกระจายอยู่ในเอกสารกระดาษ ทำให้การค้นหาช้าและมีโอกาสผิดพลาด</p>
                                                    <p className="text-[var(--text-muted)]">• การนัดหมายด้วยมือแบบเก่าทำให้เกิดการจองซ้ำซ้อนบ่อยครั้ง</p>
                                                    <p className="text-[var(--text-muted)]">• เอกสารผู้ป่วยแบบกระดาษค้นหายากและอัปเดตลำบาก</p>
                                                    <p className="text-[var(--text-muted)]">• ไม่มีระบบเตือนนัดหมายอัตโนมัติสำหรับผู้ป่วย</p>
                                                    <p className="text-[var(--text-muted)]">• ตารางทันตแพทย์จัดการและประสานงานยาก</p>
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
                                                    <p>During my internship at Merge Digital Agency, I built a comprehensive clinic management system using Laravel that digitizes the entire patient journey from booking to treatment.</p>
                                                    <p className="text-[var(--text-muted)]">• Developed real-time appointment booking with conflict prevention</p>
                                                    <p className="text-[var(--text-muted)]">• Created secure patient record management with MySQL encryption</p>
                                                    <p className="text-[var(--text-muted)]">• Implemented automated email notifications for bookings and reminders</p>
                                                    <p className="text-[var(--text-muted)]">• Built responsive UI with Bootstrap for easy access on any device</p>
                                                </>
                                            ) : (
                                                <>
                                                    <p>ระหว่างฝึกงานที่ Merge Digital Agency ผมพัฒนาระบบจัดการคลินิกครบวงจรโดยใช้ Laravel ที่ทำให้การดูแลผู้ป่วยตั้งแต่การจองจนถึงการรักษาเป็นดิจิทัล</p>
                                                    <p className="text-[var(--text-muted)]">• พัฒนาระบบจองนัดหมายแบบเรียลไทม์พร้อมป้องกันการจองซ้ำซ้อน</p>
                                                    <p className="text-[var(--text-muted)]">• สร้างระบบจัดการข้อมูลผู้ป่วยที่ปลอดภัยด้วยการเข้ารหัส MySQL</p>
                                                    <p className="text-[var(--text-muted)]">• พัฒนาการแจ้งเตือนอัตโนมัติทางอีเมลสำหรับการจองและเตือน</p>
                                                    <p className="text-[var(--text-muted)]">• สร้าง UI ที่ Responsive ด้วย Bootstrap สำหรับเข้าถึงได้จากทุกอุปกรณ์</p>
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
                                                    <p>The Klin Dental Clinic system transformed the clinic's operations, providing a pivotal internship experience in healthcare software development.</p>
                                                    <p className="text-[var(--text-muted)]">• Eliminated double-booking issues with real-time availability checking</p>
                                                    <p className="text-[var(--text-muted)]">• Streamlined patient record access and management</p>
                                                    <p className="text-[var(--text-muted)]">• Gained hands-on Laravel experience in a professional agency environment</p>
                                                    <p className="text-[var(--text-muted)]">• Learned healthcare data security best practices</p>
                                                </>
                                            ) : (
                                                <>
                                                    <p>ระบบ Klin Dental Clinic เปลี่ยนการดำเนินงานของคลินิก มอบประสบการณ์ฝึกงานสำคัญในการพัฒนาซอฟต์แวร์ด้านสุขภาพ</p>
                                                    <p className="text-[var(--text-muted)]">• ขจัดปัญหาการจองซ้ำซ้อนด้วยการตรวจสอบความว่างแบบเรียลไทม์</p>
                                                    <p className="text-[var(--text-muted)]">• ปรับปรุงการเข้าถึงและจัดการข้อมูลผู้ป่วย</p>
                                                    <p className="text-[var(--text-muted)]">• ได้ประสบการณ์ Laravel จริงในสภาพแวดล้อม Agency มืออาชีพ</p>
                                                    <p className="text-[var(--text-muted)]">• เรียนรู้แนวปฏิบัติที่ดีที่สุดด้านความปลอดภัยข้อมูลสุขภาพ</p>
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
                                    ? "The Klin Dental Clinic project was a pivotal experience in my development journey. Working on real healthcare software during my internship gave me invaluable insights into building secure, user-friendly applications that genuinely help people manage their health."
                                    : "โปรเจกต์ Klin Dental Clinic เป็นประสบการณ์สำคัญในเส้นทางการพัฒนาของผม การทำงานกับซอฟต์แวร์ด้านสุขภาพจริงระหว่างฝึกงานให้ข้อมูลเชิงลึกอันล้ำค่าในการสร้างแอปพลิเคชันที่ปลอดภัย ใช้งานง่าย ที่ช่วยให้ผู้คนจัดการสุขภาพของตนได้อย่างแท้จริง"}
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
