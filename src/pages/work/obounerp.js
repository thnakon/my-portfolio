import { useState, useEffect } from 'react';
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
                        workspace/oboun-erp
                    </div>
                </div>
            </div>

            <div className="flex flex-1 min-h-0">
                {/* Sidebar */}
                <div className="w-48 border-r border-white/5 bg-white/[0.02] p-4 hidden md:block">
                    <div className="text-[10px] font-bold text-white/20 uppercase tracking-widest mb-4">Project Explorer</div>
                    <div className="space-y-2">
                        <div className="flex items-center gap-2 text-white/60 text-xs">
                            <span className="text-yellow-500/80">📁</span> app/Models
                        </div>
                        <div className="flex items-center gap-2 text-white/60 text-xs">
                            <span className="text-blue-500/80">📁</span> app/Http/Controllers
                        </div>
                        <div className="flex items-center gap-2 text-white/90 text-xs bg-white/5 -mx-2 px-2 py-1.5 rounded border-l-2 border-blue-500">
                            <span className="text-emerald-500/80">📄</span> SaleController.php
                        </div>
                        <div className="flex items-center gap-2 text-white/60 text-xs">
                            <span className="text-emerald-500/80">📄</span> Inventory.php
                        </div>
                        <div className="flex items-center gap-2 text-white/60 text-xs mt-4 uppercase text-[9px] tracking-widest font-bold opacity-30">Frontend</div>
                        <div className="flex items-center gap-2 text-white/60 text-xs">
                            <span className="text-emerald-500/80">📄</span> Dashboard.vue
                        </div>
                    </div>
                </div>

                {/* Code Area */}
                <div className="flex-1 p-6 font-mono text-[11px] md:text-sm leading-relaxed overflow-hidden">
                    <div className="flex gap-4">
                        <div className="text-white/20 text-right select-none space-y-0.5">
                            {Array.from({ length: 14 }).map((_, i) => (
                                <div key={i}>{i + 1}</div>
                            ))}
                        </div>
                        <div className="text-white/80 space-y-0.5">
                            <div><span className="text-purple-400">public function</span> <span className="text-yellow-400">store</span>(SaleRequest <span className="text-blue-300">$request</span>)</div>
                            <div>{'{'}</div>
                            <div className="pl-6"><span className="text-blue-300">$sale</span> = <span className="text-emerald-400">Sale</span>::create(<span className="text-blue-300">$request</span>-&gt;validated());</div>
                            <div />
                            <div className="pl-6"><span className="text-purple-400">foreach</span> (<span class="text-blue-300">$request</span>-&gt;items <span class="text-purple-400">as</span> <span class="text-blue-300">$item</span>) {'{'}</div>
                            <div className="pl-12"><span className="text-blue-300">$sale</span>-&gt;items()-&gt;create([</div>
                            <div className="pl-18"><span className="text-emerald-300">'product_id'</span> =&gt; <span className="text-blue-300">$item</span>['id'],</div>
                            <div className="pl-18"><span className="text-emerald-300">'quantity'</span>   =&gt; <span className="text-blue-300">$item</span>['qty'],</div>
                            <div className="pl-18"><span className="text-emerald-300">'price'</span>      =&gt; <span className="text-blue-300">$item</span>['price'],</div>
                            <div className="pl-12">]);</div>
                            <div />
                            <div className="pl-12"><span className="text-blue-300">$item</span>-&gt;decrementInventory();</div>
                            <div className="pl-6">{'}'}</div>
                            <div className="pl-6"><span className="text-purple-400">return</span> response()-&gt;json(<span className="text-blue-300">$sale</span>-&gt;load(<span className="text-emerald-300">'items'</span>));</div>
                            <div>{'}'}</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="h-6 bg-blue-600 flex items-center px-3 justify-between text-[10px] text-white shrink-0">
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1"><span>git(</span><span className="font-bold">main</span><span>)</span></div>
                    <div className="flex items-center gap-1 opacity-80"><span>UTF-8</span></div>
                </div>
                <div className="flex items-center gap-3 font-mono">
                    <span>Ln 1, Col 1</span>
                    <span>PHP 8.3</span>
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

    // Define slides: Index 0 is the IDE Mockup, others are screenshots
    const slides = [
        { type: 'code', component: <IDEMockup project={project} /> },
        { type: 'image', src: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop', alt: 'Dashboard Overview' },
        { type: 'image', src: 'https://images.unsplash.com/photo-1551288049-bbdac8a28a1e?q=80&w=2340&auto=format&fit=crop', alt: 'Analytics View' },
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

            {/* View All Photos Button */}
            <button className="absolute bottom-4 right-4 z-20 flex items-center gap-2 px-4 py-2 rounded-xl bg-black/40 backdrop-blur-md border border-white/10 text-[10px] font-bold uppercase tracking-widest text-white hover:bg-white hover:text-black transition-all duration-300 shadow-xl group/btn">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>View all photos</span>
                <span className="opacity-40 group-hover/btn:opacity-100 ml-1">{slides.length}</span>
            </button>

            {/* Progress Indicators */}
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

export default function ObounERPPage({ theme, setTheme, lang, setLang }) {
    const [bookingOpen, setBookingOpen] = useState(false);
    const t = translations[lang] || translations.en;

    const project = {
        slug: 'obounerp',
        title: t.projects.obounERP.title,
        period: t.projects.obounERP.period,
        description: t.projects.obounERP.description,
        type: t.projects.obounERP.type,
        githubUrl: "https://github.com/thnakon/ERP_PMS",
        tech: [
            { name: 'Laravel 11', icon: 'laravel' },
            { name: 'Vue.js 3', icon: 'vue' },
            { name: 'MySQL', icon: 'mysql' },
            { name: 'Tailwind', icon: 'tailwind' },
            { name: 'Docker', icon: 'docker' }
        ],
        features: t.projects.obounERP.features,
        accent: 'blue'
    };

    return (
        <main className="min-h-screen transition-theme bg-[var(--bg-primary)]">
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
                            <div className="w-12 h-[2px] rounded-full bg-blue-500" />
                            <div className="text-[10px] font-mono uppercase tracking-[0.2em] font-bold text-blue-500">
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
                            {/* Buttons Group */}
                            <div className="flex items-center gap-4">
                                {/* Small GitHub Button */}
                                <a
                                    href={project.githubUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group relative p-[1px] rounded-full transition-all duration-300 hover:scale-105 active:scale-95"
                                >
                                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 via-red-500 via-yellow-500 to-emerald-500 opacity-40 group-hover:opacity-100 transition-opacity" />
                                    <div className="relative px-4 py-1.5 bg-[#0D1117] rounded-full flex items-center gap-2">
                                        <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                        </svg>
                                        <span className="text-white text-[11px] font-medium tracking-tight whitespace-nowrap">Star on GitHub</span>
                                    </div>
                                </a>

                                {/* Small Check it out Button */}
                                <a
                                    href="#"
                                    className="px-5 py-2 bg-[#E5E7EB] hover:bg-white text-black rounded-full flex items-center gap-2 transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg group"
                                >
                                    <span className="font-heading font-medium text-xs whitespace-nowrap">Check it out</span>
                                    <svg className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M7 17L17 7M17 7H7M17 7V17" />
                                    </svg>
                                </a>
                            </div>

                            {/* Separator Line */}
                            <div className="w-[1px] h-8 bg-[var(--border-color)] hidden sm:block opacity-20" />

                            {/* Meta Info Group */}
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
                        {/* Glow Effect */}
                        <div className="absolute -inset-10 bg-blue-500/5 rounded-full blur-[120px] -z-10" />
                    </motion.div>
                </div>

                {/* Tech Stack */}
                <div className="mb-24">
                    <h2 className="text-xl font-heading mb-12 flex items-center gap-4">
                        <span className="w-12 h-[1px] bg-gradient-to-r from-[var(--text-primary)] to-transparent opacity-20"></span>
                        {lang === 'en' ? "Tech Stack" : "เทคโนโลยีที่ใช้"}
                    </h2>
                    <div className="flex flex-wrap gap-4">
                        {project.tech.map((tech, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 + (i * 0.1) }}
                                className="flex items-center gap-3 px-5 py-3 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-2xl hover:border-[var(--text-primary)]/30 transition-all group"
                            >
                                <img src={`https://skillicons.dev/icons?i=${tech.icon}`} alt={tech.name} className="w-6 h-6 object-contain" />
                                <span className="text-sm font-medium text-[var(--text-primary)]">{tech.name}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Features & Detailed Info */}
                <div className="grid lg:grid-cols-3 gap-16 mb-24">
                    <div className="lg:col-span-2 space-y-12">
                        <div>
                            <h2 className="text-2xl font-heading mb-8 text-[var(--text-primary)]">Key Features</h2>
                            <div className="grid md:grid-cols-2 gap-x-12 gap-y-6">
                                {project.features.map((feature, i) => (
                                    <div key={i} className="flex gap-4">
                                        <div className="mt-1 flex-shrink-0">
                                            <div className="w-5 h-5 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500">
                                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                                </svg>
                                            </div>
                                        </div>
                                        <p className="text-[15px] text-[var(--text-secondary)] leading-relaxed">{feature}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="space-y-8">
                        <div className="p-8 rounded-3xl bg-[var(--bg-secondary)] border border-[var(--border-color)] sticky top-32">
                            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                                <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Project Status
                            </h3>
                            <div className="space-y-4 mb-8">
                                <div className="flex justify-between items-center text-sm py-3 border-b border-[var(--border-color)]">
                                    <span className="text-[var(--text-muted)]">Completed</span>
                                    <span className="text-[var(--text-primary)] font-medium">Q1 2025</span>
                                </div>
                                <div className="flex justify-between items-center text-sm py-3 border-b border-[var(--border-color)]">
                                    <span className="text-[var(--text-muted)]">Client</span>
                                    <span className="text-[var(--text-primary)] font-medium">Internal Project</span>
                                </div>
                                <div className="flex justify-between items-center text-sm py-3">
                                    <span className="text-[var(--text-muted)]">Role</span>
                                    <span className="text-[var(--text-primary)] font-medium">Full-Stack Developer</span>
                                </div>
                            </div>

                            <a
                                href={project.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-premium-cta w-full flex justify-center py-4 bg-blue-500 text-white border-none hover:bg-blue-600"
                            >
                                {lang === 'en' ? "View Source Code" : "ดูซอร์สโค้ด"}
                                <div className="cta-arrow-circle !w-8 !h-8">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7-7 7M3 12h18" />
                                    </svg>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            <Contact t={t} onGetInTouch={() => setBookingOpen(true)} />
            <Footer t={t} />
            <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} t={t} />
        </main>
    );
}
