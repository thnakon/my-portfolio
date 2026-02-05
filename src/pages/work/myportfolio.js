import { useState, useEffect } from 'react';
import translations from '@/lib/translations';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BookingModal from '@/components/BookingModal';
import Contact from '@/components/Contact';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

const IDEMockup = () => (
    <div className="w-full h-full bg-[#0D1117] rounded-xl border border-white/10 overflow-hidden shadow-2xl flex flex-col">
        <div className="h-10 bg-white/5 border-b border-white/10 flex items-center px-4 gap-2 shrink-0">
            <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
                <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
            </div>
            <div className="flex-1 flex justify-center">
                <div className="px-3 py-1 bg-white/5 rounded-md text-[10px] text-white/40 font-mono">workspace/my-portfolio</div>
            </div>
        </div>
        <div className="flex flex-1 min-h-0">
            <div className="w-48 border-r border-white/5 bg-white/[0.02] p-4 hidden md:block">
                <div className="text-[10px] font-bold text-white/20 uppercase tracking-widest mb-4">Explorer</div>
                <div className="space-y-2">
                    <div className="flex items-center gap-2 text-white/90 text-xs bg-white/5 -mx-2 px-2 py-1.5 rounded border-l-2 border-white">
                        <span>📄</span> Navbar.jsx
                    </div>
                    <div className="flex items-center gap-2 text-white/60 text-xs"><span>📄</span> Projects.jsx</div>
                    <div className="flex items-center gap-2 text-white/60 text-xs"><span>📄</span> Contact.jsx</div>
                </div>
            </div>
            <div className="flex-1 p-6 font-mono text-[11px] md:text-sm leading-relaxed">
                <div className="flex gap-4">
                    <div className="text-white/20 text-right select-none space-y-0.5">
                        {[1,2,3,4,5,6].map(n => <div key={n}>{n}</div>)}
                    </div>
                    <div className="text-white/80 space-y-0.5">
                        <div><span className="text-purple-400">const</span> <span className="text-yellow-400">getGreeting</span> = () =&gt; {'{'}</div>
                        <div className="pl-6"><span className="text-purple-400">const</span> <span className="text-blue-300">hour</span> = <span className="text-purple-400">new</span> Date().getHours();</div>
                        <div className="pl-6"><span className="text-purple-400">if</span> (<span className="text-blue-300">hour</span> &lt; 12) <span className="text-purple-400">return</span> t.nav.greetings.morning;</div>
                        <div className="pl-6"><span className="text-purple-400">if</span> (<span className="text-blue-300">hour</span> &lt; 17) <span className="text-purple-400">return</span> t.nav.greetings.afternoon;</div>
                        <div className="pl-6"><span className="text-purple-400">return</span> t.nav.greetings.evening;</div>
                        <div>{'}'};</div>
                    </div>
                </div>
            </div>
        </div>
        <div className="h-6 bg-white flex items-center px-3 justify-between text-[10px] text-black shrink-0">
            <div className="flex items-center gap-3"><span>git(<span className="font-bold">main</span>)</span></div>
            <span>JavaScript React</span>
        </div>
    </div>
);

const TypewriterText = ({ text, delay = 50, startDelay = 500 }) => {
    const [displayedText, setDisplayedText] = useState('');
    const [isStarted, setIsStarted] = useState(false);
    useEffect(() => { const t = setTimeout(() => setIsStarted(true), startDelay); return () => clearTimeout(t); }, [startDelay]);
    useEffect(() => {
        if (!isStarted) return;
        if (displayedText.length < text.length) {
            const t = setTimeout(() => setDisplayedText(text.slice(0, displayedText.length + 1)), delay);
            return () => clearTimeout(t);
        }
    }, [displayedText, text, delay, isStarted]);
    return <span>{displayedText}{displayedText.length < text.length && <span className="inline-block w-0.5 h-5 ml-1 bg-[var(--text-primary)] animate-pulse align-middle" />}</span>;
};

const ProjectShowcase = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const slides = [
        { type: 'code', component: <IDEMockup /> },
        { type: 'image', src: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=2370', alt: 'Code' },
    ];
    useEffect(() => { const t = setInterval(() => setCurrentSlide(p => (p + 1) % slides.length), 5000); return () => clearInterval(t); }, [slides.length]);
    return (
        <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl border border-white/5 bg-[#0D1117]">
            <AnimatePresence mode="wait">
                <motion.div key={currentSlide} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full h-full">
                    {slides[currentSlide].type === 'code' ? slides[currentSlide].component : <img src={slides[currentSlide].src} alt={slides[currentSlide].alt} className="w-full h-full object-cover" />}
                </motion.div>
            </AnimatePresence>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-1.5">
                {slides.map((_, i) => <div key={i} className={`h-1 rounded-full transition-all ${currentSlide === i ? 'w-6 bg-white' : 'w-1.5 bg-white/30'}`} />)}
            </div>
        </div>
    );
};

const AccordionItem = ({ title, content, isOpen, onClick }) => (
    <div className="border-b border-white/5 last:border-0">
        <button onClick={onClick} className="w-full py-5 flex items-center justify-between group text-left">
            <div className="flex items-center gap-4">
                <motion.span animate={{ rotate: isOpen ? 90 : 0 }} className="text-[var(--text-muted)] group-hover:text-white">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
                </motion.span>
                <span className={`text-sm md:text-base font-medium ${isOpen ? 'text-[var(--text-primary)]' : 'text-[var(--text-secondary)]'}`}>{title}</span>
            </div>
        </button>
        <AnimatePresence>
            {isOpen && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                    <div className="pb-6 pl-11 text-sm text-[var(--text-muted)] leading-relaxed">{content}</div>
                </motion.div>
            )}
        </AnimatePresence>
    </div>
);

const TechBadge = ({ tech, i }) => (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 + (i * 0.1) }}
        className="flex items-center gap-2.5 px-4 py-2 bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl">
        <img src={tech.icon.startsWith('/') ? tech.icon : `https://skillicons.dev/icons?i=${tech.icon}`} alt={tech.name} className="w-5 h-5 object-contain" />
        <span className="text-xs font-medium text-[var(--text-primary)]">{tech.name}</span>
    </motion.div>
);

const OnThisPage = ({ lang }) => {
    const [activeId, setActiveId] = useState('');
    const menuItems = [
        { id: 'tech-stack', label: lang === 'en' ? 'Tech Stack' : 'เทคโนโลยี' },
        { id: 'features', label: lang === 'en' ? 'Features' : 'ฟีเจอร์' },
        { id: 'journey', label: lang === 'en' ? 'Journey' : 'เส้นทาง' },
        { id: 'summary', label: lang === 'en' ? 'Summary' : 'สรุป' },
    ];
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => { entries.forEach(e => { if (e.isIntersecting) setActiveId(e.target.id); }); }, { rootMargin: '-20% 0% -35% 0%' });
        document.querySelectorAll('section[id]').forEach(s => observer.observe(s));
        return () => observer.disconnect();
    }, []);
    const scrollTo = (id) => { const el = document.getElementById(id); if (el) { window.scrollTo({ top: el.offsetTop - 120, behavior: 'smooth' }); } };
    return (
        <div className="sticky top-32">
            <h3 className="text-sm font-bold uppercase tracking-widest opacity-70 mb-6 text-[var(--text-primary)]">On this page</h3>
            <div className="border-l border-[var(--border-color)] pl-4 space-y-4">
                {menuItems.map(item => (
                    <button key={item.id} onClick={() => scrollTo(item.id)} className={`block text-sm ${activeId === item.id ? 'text-[var(--text-primary)] font-medium' : 'text-[var(--text-muted)]'}`}>{item.label}</button>
                ))}
            </div>
        </div>
    );
};

const ProjectNavigation = ({ lang }) => (
    <div className="grid md:grid-cols-2 gap-4 pt-8">
        <Link href="/work/singha" className="group px-6 py-5 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-color)] hover:border-[var(--text-primary)]/30">
            <div className="text-[9px] text-[var(--text-muted)] uppercase tracking-widest mb-2">{lang === 'en' ? '← Previous' : '← ก่อนหน้า'}</div>
            <h4 className="text-lg font-heading text-[var(--text-primary)]">Singha.com</h4>
        </Link>
        <Link href="/work/obounerp" className="group px-6 py-5 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-color)] hover:border-[var(--text-primary)]/30 text-right">
            <div className="text-[9px] text-[var(--text-muted)] uppercase tracking-widest mb-2">{lang === 'en' ? 'Next →' : 'ถัดไป →'}</div>
            <h4 className="text-lg font-heading text-[var(--text-primary)]">Oboun ERP</h4>
        </Link>
    </div>
);

export default function MyPortfolioPage({ theme, setTheme, lang, setLang }) {
    const [bookingOpen, setBookingOpen] = useState(false);
    const [openFeature, setOpenFeature] = useState(0);
    const t = translations[lang] || translations.en;

    const features = [
        { title: lang === 'en' ? 'Next.js 14 Performance' : 'ประสิทธิภาพ Next.js 14', content: lang === 'en' ? 'Built with Next.js 14 and React for lightning-fast performance with server-side rendering.' : 'สร้างด้วย Next.js 14 และ React สำหรับประสิทธิภาพที่รวดเร็วพร้อม Server-side Rendering' },
        { title: lang === 'en' ? 'Narrative Storytelling' : 'การเล่าเรื่อง', content: lang === 'en' ? 'Custom narrative experience with smooth Framer Motion animations throughout.' : 'ประสบการณ์การเล่าเรื่องพร้อม Animation จาก Framer Motion ที่ลื่นไหล' },
        { title: lang === 'en' ? 'Multi-language Support' : 'รองรับหลายภาษา', content: lang === 'en' ? 'Premium responsive UI with full English and Thai language support.' : 'UI Responsive พรีเมียมพร้อมรองรับภาษาอังกฤษและไทยเต็มรูปแบบ' },
        { title: lang === 'en' ? 'SEO Optimized' : 'SEO Optimized', content: lang === 'en' ? 'Semantic HTML and modern web standards for optimal search visibility.' : 'Semantic HTML และมาตรฐานเว็บสมัยใหม่สำหรับ Search Visibility ที่ดีที่สุด' },
    ];

    const project = {
        title: t.projects.myPortfolio.title,
        period: t.projects.myPortfolio.period,
        description: t.projects.myPortfolio.description,
        type: t.projects.myPortfolio.type,
        githubUrl: "https://github.com/thnakon/my-portfolio",
        tech: [
            { name: 'Next.js', icon: 'nextjs' },
            { name: 'React', icon: 'react' },
            { name: 'Tailwind', icon: 'tailwind' },
            { name: 'Framer Motion', icon: '/images/tech/framer.png' },
        ]
    };

    return (
        <main className="min-h-screen transition-theme bg-[var(--bg-primary)]">
            <Navbar t={t} lang={lang} setLang={setLang} theme={theme} setTheme={setTheme} onBookCall={() => setBookingOpen(true)} />
            <div className="pt-32 pb-24 max-w-6xl mx-auto px-6">
                <Link href="/work" className="inline-flex items-center gap-2 px-4 py-2 mb-12 rounded-full border border-[var(--border-color)] text-[10px] font-bold uppercase tracking-widest text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
                    ← {lang === 'en' ? 'Back to work' : 'กลับไปหน้าผลงาน'}
                </Link>

                <div className="grid lg:grid-cols-12 gap-16 items-center mb-24">
                    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="lg:col-span-5">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-[2px] bg-white" />
                            <div className="text-[10px] font-mono uppercase tracking-widest font-bold text-[var(--text-primary)]">{project.type}</div>
                        </div>
                        <h1 className="text-3xl md:text-5xl font-heading text-[var(--text-primary)] mb-6">{project.title}</h1>
                        <p className="text-base md:text-lg text-[var(--text-secondary)] leading-relaxed mb-10 min-h-[4em]">
                            <TypewriterText text={project.description} delay={20} startDelay={800} />
                        </p>
                        <div className="flex flex-wrap items-center gap-x-10 gap-y-8 text-[var(--text-muted)] border-t border-[var(--border-color)] pt-8">
                            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="group relative p-[1px] rounded-full hover:scale-105 transition-transform">
                                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-gray-400 to-white opacity-40 group-hover:opacity-100 transition-opacity" />
                                <div className="relative px-4 py-1.5 bg-[#0D1117] rounded-full flex items-center gap-2">
                                    <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                                    <span className="text-white text-[11px] font-medium">View on GitHub</span>
                                </div>
                            </a>
                            <div className="flex gap-8">
                                <div><div className="text-[10px] uppercase tracking-widest font-bold mb-1">{lang === 'en' ? 'Year' : 'ปี'}</div><div className="text-sm text-[var(--text-primary)]">{project.period}</div></div>
                                <div><div className="text-[10px] uppercase tracking-widest font-bold mb-1">{lang === 'en' ? 'Type' : 'ประเภท'}</div><div className="text-sm text-[var(--text-primary)]">{project.type}</div></div>
                            </div>
                        </div>
                    </motion.div>
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="lg:col-span-7 relative">
                        <ProjectShowcase />
                        <div className="absolute -inset-10 bg-white/5 rounded-full blur-[120px] -z-10" />
                    </motion.div>
                </div>

                <section id="tech-stack" className="mb-24 scroll-mt-32">
                    <h2 className="text-2xl font-heading mb-8 text-[var(--text-primary)]">{lang === 'en' ? 'Tech Stack' : 'เทคโนโลยี'}</h2>
                    <div className="flex flex-wrap gap-3">{project.tech.map((tech, i) => <TechBadge key={i} tech={tech} i={i} />)}</div>
                </section>

                <div className="grid lg:grid-cols-3 gap-16 mb-24">
                    <div className="lg:col-span-2 space-y-12">
                        <section id="features" className="scroll-mt-32">
                            <h2 className="text-2xl font-heading mb-8 text-[var(--text-primary)]">Features</h2>
                            <div className="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-3xl p-2">
                                {features.map((f, i) => <AccordionItem key={i} title={f.title} content={f.content} isOpen={openFeature === i} onClick={() => setOpenFeature(openFeature === i ? -1 : i)} />)}
                            </div>
                        </section>

                        <section id="journey" className="pt-12 scroll-mt-32">
                            <h2 className="text-2xl font-heading mb-8 text-[var(--text-primary)]">Project Journey</h2>
                            <p className="text-lg text-[var(--text-secondary)] leading-relaxed mb-8">
                                {lang === 'en' ? "This portfolio represents the culmination of my web development journey. Every component, animation, and design decision was crafted to showcase not just my work, but my philosophy as a developer." : "Portfolio นี้แสดงถึงจุดสูงสุดของเส้นทางการพัฒนาเว็บของผม ทุก Component, Animation และการตัดสินใจด้านการออกแบบถูกสร้างขึ้นเพื่อแสดงไม่เพียงแค่ผลงาน แต่ยังรวมถึงปรัชญาในฐานะนักพัฒนา"}
                            </p>
                        </section>

                        <section id="summary" className="pt-12 scroll-mt-32">
                            <h2 className="text-2xl font-heading mb-8 text-[var(--text-primary)]">{lang === 'en' ? 'Conclusion' : 'สรุป'}</h2>
                            <p className="text-lg text-[var(--text-secondary)] leading-relaxed italic">
                                {lang === 'en' ? "Building this portfolio pushed me to explore cutting-edge technologies and design principles. It's not just a showcase—it's a testament to continuous learning and growth." : "การสร้าง Portfolio นี้ผลักดันให้ผมสำรวจเทคโนโลยีและหลักการออกแบบล้ำสมัย ไม่ใช่แค่การแสดงผลงาน—แต่เป็นหลักฐานของการเรียนรู้และเติบโตอย่างต่อเนื่อง"}
                            </p>
                            <div className="mt-6 text-xl font-heading text-[var(--text-primary)]">{lang === 'en' ? 'Thank You!' : 'ขอบคุณครับ!'}</div>
                        </section>

                        <ProjectNavigation lang={lang} />
                    </div>
                    <div><OnThisPage lang={lang} /></div>
                </div>
            </div>
            <Contact t={t} onGetInTouch={() => setBookingOpen(true)} />
            <Footer t={t} />
            <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} t={t} />
        </main>
    );
}
