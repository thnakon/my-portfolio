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
                        workspace/scribehub
                    </div>
                </div>
            </div>

            <div className="flex flex-1 min-h-0">
                {/* Sidebar */}
                <div className="w-48 border-r border-white/5 bg-white/[0.02] p-4 hidden md:block">
                    <div className="text-[10px] font-bold text-white/20 uppercase tracking-widest mb-4">Project Explorer</div>
                    <div className="space-y-2">
                        <div className="flex items-center gap-2 text-white/60 text-xs">
                            <span className="text-yellow-500/80">📁</span> src/components
                        </div>
                        <div className="flex items-center gap-2 text-white/60 text-xs">
                            <span className="text-blue-500/80">📁</span> src/lib
                        </div>
                        <div className="flex items-center gap-2 text-white/90 text-xs bg-white/5 -mx-2 px-2 py-1.5 rounded border-l-2 border-emerald-500">
                            <span className="text-emerald-500/80">📄</span> ResearchAgent.ts
                        </div>
                        <div className="flex items-center gap-2 text-white/60 text-xs">
                            <span className="text-emerald-500/80">📄</span> KnowledgeGraph.tsx
                        </div>
                        <div className="flex items-center gap-2 text-white/60 text-xs mt-4 uppercase text-[9px] tracking-widest font-bold opacity-30">API</div>
                        <div className="flex items-center gap-2 text-white/60 text-xs">
                            <span className="text-yellow-500/80">📄</span> openai.ts
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
                            <div><span className="text-purple-400">export async function</span> <span className="text-yellow-400">analyzePaper</span>(content: <span className="text-emerald-400">string</span>)</div>
                            <div>{'{'}</div>
                            <div className="pl-6"><span className="text-purple-400">const</span> <span className="text-blue-300">completion</span> = <span className="text-purple-400">await</span> openai.chat.completions.create({'{'}</div>
                            <div className="pl-12">model: <span className="text-emerald-300">"gpt-4-turbo"</span>,</div>
                            <div className="pl-12">messages: [</div>
                            <div className="pl-18">{'{'} role: <span className="text-emerald-300">"system"</span>, content: <span className="text-emerald-300">"Expert researcher"</span> {'}'},</div>
                            <div className="pl-18">{'{'} role: <span className="text-emerald-300">"user"</span>, content: <span className="text-blue-300">content</span> {'}'}</div>
                            <div className="pl-12">]</div>
                            <div className="pl-6">{'}'});</div>
                            <div />
                            <div className="pl-6"><span className="text-purple-400">return</span> <span className="text-blue-300">completion</span>.choices[0].message;</div>
                            <div>{'}'}</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="h-6 bg-emerald-600 flex items-center px-3 justify-between text-[10px] text-white shrink-0">
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

const ProjectShowcase = ({ project }) => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const slides = [
        { type: 'code', component: <IDEMockup project={project} /> },
        { type: 'image', src: 'https://images.unsplash.com/photo-1532619675605-1ede6c2ed2b0?q=80&w=2370&auto=format&fit=crop', alt: 'AI Research' },
        { type: 'image', src: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2370&auto=format&fit=crop', alt: 'Collaboration' },
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [slides.length]);

    return (
        <div className="relative group w-full aspect-video rounded-2xl overflow-hidden shadow-2xl border border-white/5 bg-[#0D1117]">
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.7, ease: "easeInOut" }}
                    className="w-full h-full"
                >
                    {slides[currentSlide].type === 'code' ? (
                        slides[currentSlide].component
                    ) : (
                        <img
                            src={slides[currentSlide].src}
                            alt={slides[currentSlide].alt}
                            className="w-full h-full object-cover"
                        />
                    )}
                </motion.div>
            </AnimatePresence>

            <button className="absolute bottom-4 right-4 z-20 flex items-center gap-2 px-4 py-2 rounded-xl bg-black/40 backdrop-blur-md border border-white/10 text-[10px] font-bold uppercase tracking-widest text-white hover:bg-white hover:text-black transition-all duration-300 shadow-xl group/btn">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>View all photos</span>
                <span className="opacity-40 group-hover/btn:opacity-100 ml-1">{slides.length}</span>
            </button>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-1.5">
                {slides.map((_, i) => (
                    <div
                        key={i}
                        className={`h-1 rounded-full transition-all duration-500 ${currentSlide === i ? 'w-6 bg-white' : 'w-1.5 bg-white/30'}`}
                    />
                ))}
            </div>
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
                        className="text-[var(--text-muted)] group-hover:text-emerald-500 transition-colors"
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
                                    <span className="text-emerald-500 opacity-50 select-none">•</span>
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
                className={`flex items-center gap-2.5 px-4 py-2 bg-[var(--bg-secondary)] border ${isOpen ? 'border-emerald-500/50 ring-1 ring-emerald-500/20' : 'border-[var(--border-color)]'} rounded-xl hover:border-[var(--text-primary)]/30 transition-all group relative z-20`}
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
                        <div className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest mb-1.5 flex items-center gap-2">
                            <div className="w-1 h-1 rounded-full bg-emerald-500" />
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
                                    className="absolute -left-[25px] top-0 bottom-0 w-[2px] bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)]"
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
                                                className="absolute -left-[17px] top-0 bottom-0 w-[1.5px] bg-emerald-400/50"
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
            <Link href="/work/babybib" className="group px-6 py-5 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-color)] hover:border-[var(--text-primary)]/30 transition-all relative overflow-hidden">
                <div className="relative z-10">
                    <div className="flex items-center gap-2 text-[var(--text-muted)] mb-2 text-[9px] font-bold tracking-[0.2em] uppercase">
                        <svg className="w-3 h-3 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                        </svg>
                        {lang === 'en' ? 'Previous' : 'ก่อนหน้า'}
                    </div>
                    <h4 className="text-lg font-heading text-[var(--text-primary)]">Babybib</h4>
                </div>
            </Link>

            <Link href="/work/mailon" className="group px-6 py-5 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-color)] hover:border-[var(--text-primary)]/30 transition-all text-right relative overflow-hidden">
                <div className="relative z-10">
                    <div className="flex items-center justify-end gap-2 text-[var(--text-muted)] mb-2 text-[9px] font-bold tracking-[0.2em] uppercase">
                        {lang === 'en' ? 'Next' : 'ถัดไป'}
                        <svg className="w-3 h-3 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                        </svg>
                    </div>
                    <h4 className="text-lg font-heading text-[var(--text-primary)]">Mai-lon</h4>
                </div>
            </Link>
        </div>
    );
};

export default function ScribeHubPage({ theme, setTheme, lang, setLang }) {
    const [bookingOpen, setBookingOpen] = useState(false);
    const [openFeature, setOpenFeature] = useState(0);
    const t = translations[lang] || translations.en;

    const featureHighlights = [
        {
            title: lang === 'en' ? 'AI Research Assistant (GPT-4)' : 'ผู้ช่วยวิจัย AI (GPT-4)',
            content: lang === 'en'
                ? 'Leveraged OpenAI GPT-4 to create an intelligent research paper assistant that can analyze, summarize, and provide insights on academic content.'
                : 'ใช้ OpenAI GPT-4 สร้างผู้ช่วยวิจัยอัจฉริยะที่สามารถวิเคราะห์ สรุป และให้ข้อมูลเชิงลึกเกี่ยวกับเนื้อหาทางวิชาการ'
        },
        {
            title: lang === 'en' ? 'Real-time Collaboration' : 'การทำงานร่วมกันแบบเรียลไทม์',
            content: lang === 'en'
                ? 'Engineered a collaborative environment with real-time updates for research teams using Supabase Realtime subscriptions.'
                : 'สร้างสภาพแวดล้อมการทำงานร่วมกันพร้อมอัปเดตแบบเรียลไทม์สำหรับทีมวิจัยโดยใช้ Supabase Realtime'
        },
        {
            title: lang === 'en' ? 'Reference Management System' : 'ระบบจัดการบรรณานุกรม',
            content: lang === 'en'
                ? 'Integrated a powerful reference management system with automatic metadata extraction from DOIs, URLs, and uploaded PDFs.'
                : 'ระบบจัดการบรรณานุกรมพร้อมดึงข้อมูล Metadata อัตโนมัติจาก DOI, URL และไฟล์ PDF ที่อัปโหลด'
        },
        {
            title: lang === 'en' ? 'Interactive Knowledge Graph' : 'Knowledge Graph แบบ Interactive',
            content: lang === 'en'
                ? 'Developed an interactive knowledge graph for visual data discovery, helping researchers understand connections between papers and concepts.'
                : 'พัฒนา Knowledge Graph แบบ Interactive สำหรับการค้นพบข้อมูลเชิงภาพ ช่วยให้นักวิจัยเข้าใจความเชื่อมโยงระหว่างบทความและแนวคิด'
        },
        {
            title: lang === 'en' ? 'Premium User Experience' : 'ประสบการณ์ผู้ใช้ระดับพรีเมียม',
            content: lang === 'en'
                ? 'Focused on creating a premium, intuitive interface with smooth animations and seamless research interactions.'
                : 'มุ่งเน้นสร้างอินเตอร์เฟซระดับพรีเมียมที่ใช้งานง่ายพร้อม Animation ลื่นไหลและการโต้ตอบที่ราบรื่น'
        }
    ];

    const project = {
        slug: 'scribehub',
        title: t.projects.scribehub.title,
        period: t.projects.scribehub.period,
        description: t.projects.scribehub.description,
        type: t.projects.scribehub.type,
        githubUrl: "https://github.com/thnakon/scribehub",
        tech: [
            {
                name: 'React',
                icon: 'react',
                role: lang === 'en'
                    ? 'Core UI library for building interactive and reusable component-based interfaces.'
                    : 'ไลบรารี UI หลักสำหรับสร้างอินเตอร์เฟซแบบ Component ที่สามารถนำกลับมาใช้ใหม่ได้'
            },
            {
                name: 'Next.js',
                icon: 'nextjs',
                role: lang === 'en'
                    ? 'Full-stack React framework providing SSR, API routes, and optimized production builds.'
                    : 'เฟรมเวิร์ก React แบบ Full-stack พร้อม SSR, API routes และการ Build สำหรับ Production ที่เหมาะสม'
            },
            {
                name: 'Supabase',
                icon: 'supabase',
                role: lang === 'en'
                    ? 'Backend-as-a-Service providing real-time database, authentication, and storage capabilities.'
                    : 'Backend-as-a-Service ที่ให้บริการฐานข้อมูลเรียลไทม์, ระบบยืนยันตัวตน และพื้นที่จัดเก็บข้อมูล'
            },
            {
                name: 'TypeScript',
                icon: 'ts',
                role: lang === 'en'
                    ? 'Strongly-typed JavaScript ensuring code reliability, better tooling, and maintainability.'
                    : 'JavaScript แบบ Type-safe ที่ช่วยให้โค้ดน่าเชื่อถือ เครื่องมือทำงานได้ดีขึ้น และดูแลรักษาง่าย'
            },
            {
                name: 'Tailwind',
                icon: 'tailwind',
                role: lang === 'en'
                    ? 'Utility-first CSS framework for rapid, consistent, and responsive UI development.'
                    : 'CSS เฟรมเวิร์กแบบ Utility-first สำหรับพัฒนา UI ที่รวดเร็ว สม่ำเสมอ และตอบสนองทุกหน้าจอ'
            }
        ],
        features: t.projects.scribehub.features,
        accent: 'emerald'
    };

    return (
        <main className="min-h-screen transition-theme bg-[var(--bg-primary)]">
            <Head>
                <title>ScribeHub - AI Research Assistant | Thanakon</title>
                <meta name="description" content="AI-powered research platform with knowledge graphs, real-time collaboration, and GPT-4 integration for academic discovery and organization." />
                <meta property="og:title" content="ScribeHub - AI Research Assistant" />
                <meta property="og:description" content="AI-powered research platform with knowledge graphs and real-time collaboration for academic discovery." />
                <meta property="og:url" content="https://thnakon.dev/work/scribehub" />
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
                            <div className="w-12 h-[2px] rounded-full bg-emerald-500" />
                            <div className="text-[10px] font-mono uppercase tracking-[0.2em] font-bold text-emerald-500">
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
                                    href={project.githubUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group relative p-[1px] rounded-full transition-all duration-300 hover:scale-105 active:scale-95"
                                >
                                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 opacity-40 group-hover:opacity-100 transition-opacity" />
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
                                    <span className="font-heading font-medium text-xs whitespace-nowrap">Try it out</span>
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
                        <ProjectShowcase project={project} />
                        <div className="absolute -inset-10 bg-emerald-500/5 rounded-full blur-[120px] -z-10" />
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
                                                    <p>Academic research is fragmented across countless papers, databases, and tools. Researchers struggle to connect ideas across sources, track citations, and collaborate effectively with their teams.</p>
                                                    <p className="text-[var(--text-muted)]">• Finding relevant papers across multiple databases is time-consuming</p>
                                                    <p className="text-[var(--text-muted)]">• No easy way to visualize connections between research concepts</p>
                                                    <p className="text-[var(--text-muted)]">• Collaboration on research is often limited to shared documents</p>
                                                    <p className="text-[var(--text-muted)]">• AI assistance for research is scattered across different tools</p>
                                                </>
                                            ) : (
                                                <>
                                                    <p>งานวิจัยทางวิชาการกระจัดกระจายอยู่ในบทความ ฐานข้อมูล และเครื่องมือมากมาย นักวิจัยต้องดิ้นรนเชื่อมโยงไอเดีย ติดตามการอ้างอิง และทำงานร่วมกับทีม</p>
                                                    <p className="text-[var(--text-muted)]">• การค้นหาบทความที่เกี่ยวข้องจากหลายฐานข้อมูลใช้เวลามาก</p>
                                                    <p className="text-[var(--text-muted)]">• ไม่มีวิธีง่ายๆ ในการเห็นความเชื่อมโยงระหว่างแนวคิดงานวิจัย</p>
                                                    <p className="text-[var(--text-muted)]">• การทำงานร่วมกันมักจำกัดเฉพาะการแชร์เอกสาร</p>
                                                    <p className="text-[var(--text-muted)]">• เครื่องมือ AI ช่วยวิจัยกระจัดกระจายอยู่ในเครื่องมือต่างๆ</p>
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
                                                    <p>I built ScribeHub—an AI-powered research platform that unifies paper discovery, knowledge visualization, and team collaboration in one seamless experience.</p>
                                                    <p className="text-[var(--text-muted)]">• Integrated GPT-4 for intelligent paper analysis and summarization</p>
                                                    <p className="text-[var(--text-muted)]">• Created interactive knowledge graphs to visualize research connections</p>
                                                    <p className="text-[var(--text-muted)]">• Built real-time collaboration with Supabase for research teams</p>
                                                    <p className="text-[var(--text-muted)]">• Implemented automatic metadata extraction from DOIs and PDFs</p>
                                                </>
                                            ) : (
                                                <>
                                                    <p>ผมพัฒนา ScribeHub แพลตฟอร์มวิจัยขับเคลื่อนด้วย AI ที่รวมการค้นหาบทความ การแสดงผลความรู้ และการทำงานร่วมกันไว้ในที่เดียว</p>
                                                    <p className="text-[var(--text-muted)]">• เชื่อมต่อ GPT-4 สำหรับวิเคราะห์และสรุปบทความอัจฉริยะ</p>
                                                    <p className="text-[var(--text-muted)]">• สร้าง Knowledge Graph แบบ Interactive เพื่อแสดงความเชื่อมโยงงานวิจัย</p>
                                                    <p className="text-[var(--text-muted)]">• สร้างระบบทำงานร่วมกันแบบเรียลไทม์ด้วย Supabase</p>
                                                    <p className="text-[var(--text-muted)]">• ดึงข้อมูล Metadata อัตโนมัติจาก DOI และ PDF</p>
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
                                                    <p>ScribeHub demonstrates how AI can transform the research workflow, making it more efficient and collaborative.</p>
                                                    <p className="text-[var(--text-muted)]">• Reduced paper discovery and analysis time with AI-powered summaries</p>
                                                    <p className="text-[var(--text-muted)]">• Enabled visual exploration of research connections through knowledge graphs</p>
                                                    <p className="text-[var(--text-muted)]">• Facilitated real-time team collaboration on research projects</p>
                                                    <p className="text-[var(--text-muted)]">• Showcased integration of AI/LLM APIs in production-grade applications</p>
                                                </>
                                            ) : (
                                                <>
                                                    <p>ScribeHub แสดงให้เห็นว่า AI สามารถเปลี่ยนกระบวนการวิจัยให้มีประสิทธิภาพและทำงานร่วมกันได้ดีขึ้น</p>
                                                    <p className="text-[var(--text-muted)]">• ลดเวลาค้นหาและวิเคราะห์บทความด้วยการสรุปโดย AI</p>
                                                    <p className="text-[var(--text-muted)]">• เปิดให้สำรวจความเชื่อมโยงงานวิจัยผ่าน Knowledge Graph</p>
                                                    <p className="text-[var(--text-muted)]">• สนับสนุนการทำงานร่วมกันแบบเรียลไทม์สำหรับโปรเจกต์วิจัย</p>
                                                    <p className="text-[var(--text-muted)]">• แสดงการเชื่อมต่อ AI/LLM API ในแอพพลิเคชันระดับ Production</p>
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
                                    ? "ScribeHub represents the future of research—where AI augments human intellect rather than replacing it. By providing intelligent assistance and seamless collaboration, it empowers researchers to focus on what they do best: advancing human knowledge."
                                    : "ScribeHub แทนอนาคตของการวิจัย—ที่ AI ช่วยเสริมสติปัญญาของมนุษย์แทนที่จะมาแทน ด้วยการให้ความช่วยเหลืออัจฉริยะและการทำงานร่วมกันที่ราบรื่น ช่วยให้นักวิจัยโฟกัสกับสิ่งที่พวกเขาทำได้ดีที่สุด: การผลักดันองค์ความรู้ของมนุษยชาติ"}
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
