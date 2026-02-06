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
                <div className="px-3 py-1 bg-white/5 rounded-md text-[10px] text-white/40 font-mono">workspace/singha-web</div>
            </div>
        </div>
        <div className="flex flex-1 min-h-0">
            <div className="w-48 border-r border-white/5 bg-white/[0.02] p-4 hidden md:block">
                <div className="text-[10px] font-bold text-white/20 uppercase tracking-widest mb-4">Explorer</div>
                <div className="space-y-2">
                    <div className="flex items-center gap-2 text-white/90 text-xs bg-white/5 -mx-2 px-2 py-1.5 rounded border-l-2 border-amber-500">
                        <span>📄</span> ProductService.php
                    </div>
                    <div className="flex items-center gap-2 text-white/60 text-xs"><span>📄</span> BrandService.php</div>
                </div>
            </div>
            <div className="flex-1 p-6 font-mono text-[11px] md:text-sm leading-relaxed">
                <div className="flex gap-4">
                    <div className="text-white/20 text-right select-none space-y-0.5">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(n => <div key={n}>{n}</div>)}
                    </div>
                    <div className="text-white/80 space-y-0.5">
                        <div><span className="text-purple-400">namespace</span> App\Services;</div>
                        <div />
                        <div><span className="text-purple-400">class</span> <span className="text-yellow-400">ProductService</span></div>
                        <div>{'{'}</div>
                        <div className="pl-6"><span className="text-purple-400">public function</span> <span className="text-yellow-400">getBrandDetails</span>(<span className="text-blue-300">$slug</span>)</div>
                        <div className="pl-6">{'{'}</div>
                        <div className="pl-12"><span className="text-purple-400">return</span> <span className="text-emerald-400">Brand</span>::where(<span className="text-emerald-300">'slug'</span>, <span className="text-blue-300">$slug</span>)</div>
                        <div className="pl-18">-&gt;with(<span className="text-emerald-300">'products'</span>)</div>
                        <div className="pl-18">-&gt;firstOrFail();</div>
                        <div className="pl-6">{'}'}</div>
                        <div>{'}'}</div>
                    </div>
                </div>
            </div>
        </div>
        <div className="h-6 bg-amber-600 flex items-center px-3 justify-between text-[10px] text-white shrink-0">
            <div className="flex items-center gap-3"><span>git(<span className="font-bold">develop</span>)</span></div>
            <span>PHP</span>
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

// SinghaShowcase component for Singha project with hover effect
const SinghaShowcase = () => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className="relative w-full aspect-[5/3] rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-[#0D0D0D] cursor-pointer group"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Glow effect on hover - amber for Singha brand */}
            <div className={`absolute -inset-1 bg-gradient-to-r from-amber-500/20 via-yellow-500/20 to-amber-500/20 rounded-2xl blur-xl transition-opacity duration-700 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />

            {/* Main container with perspective for 3D effect */}
            <div className="relative w-full h-full" style={{ perspective: '1000px' }}>

                {/* First Image - Singha Products (default state) */}
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
                        src="/images/projects/singha-products.png"
                        alt="Singha Products Page"
                        className="w-full h-full object-cover object-top"
                    />
                    {/* Subtle overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                </motion.div>

                {/* Second Image - Singha Ingredients (hover state) */}
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
                        src="/images/projects/singha-ingredients.png"
                        alt="Singha Ingredients Page"
                        className="w-full h-full object-cover object-top"
                    />
                    {/* Subtle overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                </motion.div>

                {/* Hover indicator */}
                <div className={`absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 px-4 py-2 bg-black/60 backdrop-blur-md rounded-full border border-white/10 transition-all duration-500 ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                    <div className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                    <span className="text-[11px] text-white/90 font-medium">Ingredients Page</span>
                </div>

                {/* Default state indicator */}
                <div className={`absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 px-4 py-2 bg-black/60 backdrop-blur-md rounded-full border border-white/10 transition-all duration-500 ${isHovered ? 'opacity-0 -translate-y-4' : 'opacity-100 translate-y-0'}`}>
                    <span className="text-[11px] text-white/70">Hover to explore</span>
                    <svg className="w-3 h-3 text-white/50 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                    </svg>
                </div>
            </div>

            {/* Corner accent - Singha gold/amber theme */}
            <div className={`absolute top-3 right-3 w-8 h-8 rounded-full bg-amber-500/10 backdrop-blur-sm flex items-center justify-center transition-all duration-500 ${isHovered ? 'scale-110 bg-amber-500/20' : 'scale-100'}`}>
                <motion.svg
                    className="w-4 h-4 text-amber-400/70"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    animate={{ rotate: isHovered ? 180 : 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </motion.svg>
            </div>

            {/* Amber glow background - matches the project accent */}
            <div className="absolute -inset-4 bg-amber-500/5 rounded-3xl blur-2xl -z-10" />
        </div>
    );
};

const AccordionItem = ({ title, content, isOpen, onClick }) => (
    <div className="border-b border-white/5 last:border-0">
        <button onClick={onClick} className="w-full py-5 flex items-center justify-between group text-left">
            <div className="flex items-center gap-4">
                <motion.span animate={{ rotate: isOpen ? 90 : 0 }} className="text-[var(--text-muted)] group-hover:text-amber-500">
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
        <Link href="/work/klin" className="group px-6 py-5 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-color)] hover:border-[var(--text-primary)]/30">
            <div className="text-[9px] text-[var(--text-muted)] uppercase tracking-widest mb-2">{lang === 'en' ? '← Previous' : '← ก่อนหน้า'}</div>
            <h4 className="text-lg font-heading text-[var(--text-primary)]">Klin Dental Clinic</h4>
        </Link>
        <Link href="/work/myportfolio" className="group px-6 py-5 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-color)] hover:border-[var(--text-primary)]/30 text-right">
            <div className="text-[9px] text-[var(--text-muted)] uppercase tracking-widest mb-2">{lang === 'en' ? 'Next →' : 'ถัดไป →'}</div>
            <h4 className="text-lg font-heading text-[var(--text-primary)]">My Portfolio</h4>
        </Link>
    </div>
);

export default function SinghaPage({ theme, setTheme, lang, setLang }) {
    const [bookingOpen, setBookingOpen] = useState(false);
    const [openFeature, setOpenFeature] = useState(0);
    const t = translations[lang] || translations.en;

    const features = [
        { title: lang === 'en' ? 'Professional Git Workflow' : 'Git Workflow มืออาชีพ', content: lang === 'en' ? 'Collaborated using Git and Sourcetree for enterprise version control.' : 'ร่วมงานโดยใช้ Git และ Sourcetree สำหรับ Version Control ระดับองค์กร' },
        { title: lang === 'en' ? 'Laravel Development' : 'Laravel Development', content: lang === 'en' ? 'Developed corporate features using Laravel framework with MVC architecture.' : 'พัฒนาฟีเจอร์องค์กรด้วย Laravel framework และสถาปัตยกรรม MVC' },
        { title: lang === 'en' ? 'Frontend Optimization' : 'ปรับแต่ง Frontend', content: lang === 'en' ? 'Optimized frontend assets ensuring cross-browser compatibility.' : 'ปรับแต่ง Frontend Assets รับรอง Cross-browser Compatibility' },
        { title: lang === 'en' ? 'Enterprise Deployment' : 'Enterprise Deployment', content: lang === 'en' ? 'Participated in code reviews and enterprise deployment workflows.' : 'มีส่วนร่วมใน Code Review และ Deployment Workflow ระดับองค์กร' },
    ];

    const project = {
        title: t.projects.singha.title,
        period: t.projects.singha.period,
        description: t.projects.singha.description,
        type: t.projects.singha.type,
        websiteUrl: "https://singha.com/",
        tech: [
            { name: 'Laravel', icon: 'laravel' },
            { name: 'Git', icon: 'git' },
            { name: 'Sourcetree', icon: '/images/uses/sourcetree-logo.png' }
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
                            <div className="w-12 h-[2px] bg-amber-500" />
                            <div className="text-[10px] font-mono uppercase tracking-widest font-bold text-amber-500">{project.type}</div>
                        </div>
                        <h1 className="text-3xl md:text-5xl font-heading text-[var(--text-primary)] mb-6">{project.title}</h1>
                        <p className="text-base md:text-lg text-[var(--text-secondary)] leading-relaxed mb-10 min-h-[4em]">
                            <TypewriterText text={project.description} delay={20} startDelay={800} />
                        </p>
                        <div className="flex flex-wrap items-center gap-x-10 gap-y-8 text-[var(--text-muted)] border-t border-[var(--border-color)] pt-8">
                            <a href={project.websiteUrl} target="_blank" rel="noopener noreferrer" className="group relative p-[1px] rounded-full hover:scale-105 transition-transform">
                                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 opacity-40 group-hover:opacity-100 transition-opacity" />
                                <div className="relative px-4 py-1.5 bg-[#0D1117] rounded-full flex items-center gap-2">
                                    <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>
                                    <span className="text-white text-[11px] font-medium">Visit Website</span>
                                </div>
                            </a>
                            <div className="flex gap-8">
                                <div><div className="text-[10px] uppercase tracking-widest font-bold mb-1">{lang === 'en' ? 'Year' : 'ปี'}</div><div className="text-sm text-[var(--text-primary)]">{project.period}</div></div>
                                <div><div className="text-[10px] uppercase tracking-widest font-bold mb-1">{lang === 'en' ? 'Type' : 'ประเภท'}</div><div className="text-sm text-[var(--text-primary)]">{project.type}</div></div>
                            </div>
                        </div>
                    </motion.div>
                    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="lg:col-span-7 relative">
                        <SinghaShowcase />
                        <div className="absolute -inset-10 bg-amber-500/5 rounded-full blur-[120px] -z-10" />
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
                                {lang === 'en' ? "Contributing to Singha.com during my internship was a landmark experience. Working on Thailand's most recognizable brand websites taught me enterprise-level standards." : "การมีส่วนร่วมกับ Singha.com ระหว่างฝึกงานเป็นประสบการณ์สำคัญ การทำงานกับเว็บไซต์แบรนด์ที่รู้จักที่สุดสอนผมถึงมาตรฐานระดับองค์กร"}
                            </p>
                        </section>

                        <section id="summary" className="pt-12 scroll-mt-32">
                            <h2 className="text-2xl font-heading mb-8 text-[var(--text-primary)]">{lang === 'en' ? 'Conclusion' : 'สรุป'}</h2>
                            <p className="text-lg text-[var(--text-secondary)] leading-relaxed italic">
                                {lang === 'en' ? "Working on Singha.com was a defining moment in my career, showing me what enterprise development looks like." : "การทำงานกับ Singha.com เป็นช่วงเวลาสำคัญในอาชีพ แสดงให้เห็นว่าการพัฒนาระดับองค์กรเป็นอย่างไร"}
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
