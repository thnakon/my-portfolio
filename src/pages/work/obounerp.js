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

// ObounShowcase component for Oboun ERP project with 5 images
const ObounShowcase = ({ project }) => {
    const [currentImage, setCurrentImage] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    const images = [
        { src: "/images/projects/oboun-home.png", alt: "Oboun ERP Landing", label: "Landing" },
        { src: "/images/projects/oboun-dashboard.png", alt: "Oboun ERP Dashboard", label: "Dashboard" },
        { src: "/images/projects/oboun-pos.png", alt: "Oboun ERP POS", label: "POS" },
        { src: "/images/projects/oboun-receipt.png", alt: "Oboun ERP Receipt", label: "Receipt" },
        { src: "/images/projects/oboun-order.png", alt: "Oboun ERP Order Details", label: "Order" }
    ];

    const nextImage = () => {
        setCurrentImage((prev) => (prev + 1) % images.length);
    };

    const prevImage = () => {
        setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
    };

    return (
        <div
            className="relative w-full aspect-[5/3] rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-[#0D0D0D] cursor-pointer group"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Glow effect on hover - blue for Oboun ERP brand */}
            <div className={`absolute -inset-1 bg-gradient-to-r from-blue-500/20 via-sky-500/20 to-blue-500/20 rounded-2xl blur-xl transition-opacity duration-700 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />

            {/* Main container */}
            <div className="relative w-full h-full">
                {/* Images */}
                {images.map((image, index) => (
                    <motion.div
                        key={index}
                        className="absolute inset-0 w-full h-full"
                        initial={false}
                        animate={{
                            opacity: currentImage === index ? 1 : 0,
                            scale: currentImage === index ? 1 : 0.95,
                            x: currentImage === index ? 0 : (index > currentImage ? 50 : -50),
                        }}
                        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                    >
                        <img
                            src={image.src}
                            alt={image.alt}
                            className="w-full h-full object-cover object-top"
                        />
                        {/* Subtle overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                    </motion.div>
                ))}

                {/* Navigation arrows */}
                <button
                    onClick={(e) => { e.stopPropagation(); prevImage(); }}
                    className={`absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center border border-white/10 transition-all duration-300 ${isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'} hover:bg-blue-500/30`}
                >
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
                <button
                    onClick={(e) => { e.stopPropagation(); nextImage(); }}
                    className={`absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center border border-white/10 transition-all duration-300 ${isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2'} hover:bg-blue-500/30`}
                >
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </button>

                {/* Slide indicator with labels */}
                <div className={`absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 px-3 py-1.5 bg-black/60 backdrop-blur-md rounded-full border border-white/10 transition-all duration-500`}>
                    {images.map((image, index) => (
                        <button
                            key={index}
                            onClick={(e) => { e.stopPropagation(); setCurrentImage(index); }}
                            className={`flex items-center gap-1 px-1.5 py-0.5 rounded-full transition-all duration-300 ${currentImage === index ? 'bg-blue-500/30' : 'hover:bg-white/5'}`}
                        >
                            <div className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${currentImage === index ? 'bg-blue-400' : 'bg-white/20'}`} />
                            <span className={`text-[9px] font-medium transition-all duration-300 ${currentImage === index ? 'text-white/90' : 'text-white/40'}`}>
                                {image.label}
                            </span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Corner accent - Oboun blue theme */}
            <div className={`absolute top-3 right-3 w-8 h-8 rounded-full bg-blue-500/10 backdrop-blur-sm flex items-center justify-center transition-all duration-500 ${isHovered ? 'scale-110 bg-blue-500/20' : 'scale-100'}`}>
                <span className="text-[10px] font-bold text-blue-400">{currentImage + 1}/{images.length}</span>
            </div>

            {/* Blue glow background */}
            <div className="absolute -inset-4 bg-blue-500/5 rounded-3xl blur-2xl -z-10" />
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
                        className="text-[var(--text-muted)] group-hover:text-blue-500 transition-colors"
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
                                    <span className="text-blue-500 opacity-50 select-none">•</span>
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
                className={`flex items-center gap-2.5 px-4 py-2 bg-[var(--bg-secondary)] border ${isOpen ? 'border-blue-500/50 ring-1 ring-blue-500/20' : 'border-[var(--border-color)]'} rounded-xl hover:border-[var(--text-primary)]/30 transition-all group relative z-20`}
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
                        <div className="text-[10px] font-bold text-blue-500 uppercase tracking-widest mb-1.5 flex items-center gap-2">
                            <div className="w-1 h-1 rounded-full bg-blue-500" />
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
                                    className="absolute -left-[25px] top-0 bottom-0 w-[2px] bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)]"
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
                                                className="absolute -left-[17px] top-0 bottom-0 w-[1.5px] bg-blue-400/50"
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
            <Link href="/work/my-portfolio" className="group px-6 py-5 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-color)] hover:border-[var(--text-primary)]/30 transition-all relative overflow-hidden">
                <div className="relative z-10">
                    <div className="flex items-center gap-2 text-[var(--text-muted)] mb-2 text-[9px] font-bold tracking-[0.2em] uppercase">
                        <svg className="w-3 h-3 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                        </svg>
                        {lang === 'en' ? 'Previous' : 'ก่อนหน้า'}
                    </div>
                    <h4 className="text-lg font-heading text-[var(--text-primary)]">My Portfolio</h4>
                </div>
            </Link>

            <Link href="/work/babybib" className="group px-6 py-5 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-color)] hover:border-[var(--text-primary)]/30 transition-all text-right relative overflow-hidden">
                <div className="relative z-10">
                    <div className="flex items-center justify-end gap-2 text-[var(--text-muted)] mb-2 text-[9px] font-bold tracking-[0.2em] uppercase">
                        {lang === 'en' ? 'Next' : 'ถัดไป'}
                        <svg className="w-3 h-3 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                        </svg>
                    </div>
                    <h4 className="text-lg font-heading text-[var(--text-primary)]">Babybib</h4>
                </div>
            </Link>
        </div>
    );
};

export default function ObounERPPage({ theme, setTheme, lang, setLang }) {
    const [bookingOpen, setBookingOpen] = useState(false);
    const [openFeature, setOpenFeature] = useState(0);
    const t = translations[lang] || translations.en;

    const featureHighlights = [
        {
            title: lang === 'en' ? 'Smart POS System' : 'ระบบขายอัจฉริยะ (POS)',
            content: lang === 'en'
                ? 'Barcode scanning, bill holding, multi-channel payment (PromptPay, Cash, Credit), and receipt printing.'
                : 'สแกนบาร์โค้ด, ระบบพักบิล, ชำระเงินหลายช่องทาง (PromptPay QR, เงินสด, บัตร) และพิมพ์ใบเสร็จอัตโนมัติ'
        },
        {
            title: lang === 'en' ? 'Advanced Inventory Management' : 'การจัดการคลังสินค้าขั้นสูง',
            content: lang === 'en'
                ? 'Lot management, expiration tracking, real-time stock alerts, and automated reordering workflows.'
                : 'จัดการ Lot สินค้า, ติดตามวันหมดอายุ, ระบบแจ้งเตือนสินค้าใกล้หมด/หมดอายุ และระบบปรับสต็อกอัจฉริยะ'
        },
        {
            title: lang === 'en' ? 'Pharmacy Specialized Modules' : 'โมดูลเฉพาะทางด้านเภสัชกรรม',
            content: lang === 'en'
                ? 'Prescription management, drug interaction checks, allergy alerts, and controlled substance logging.'
                : 'จัดการใบสั่งยา, ตรวจสอบการตีกันของยา, แจ้งเตือนประวัติแพ้ยา และบันทึกบัญชียาควบคุม'
        },
        {
            title: lang === 'en' ? 'Enterprise Security & Compliance' : 'ความปลอดภัยระดับองค์กร',
            content: lang === 'en'
                ? 'Two-Factor Authentication (2FA), role-based access control (RBAC), activity logs, and automated backups.'
                : 'ระบบ 2FA, กำหนดสิทธิ์ผู้ใช้ (RBAC), บันทึกประวัติการใช้งาน (Activity Logs) และระบบสำรองข้อมูลอัตโนมัติ'
        },
        {
            title: lang === 'en' ? 'AI Assistant & LINE Integration' : 'ผู้ช่วย AI และการเชื่อมต่อ LINE',
            content: lang === 'en'
                ? 'Integrated Gemini AI for pharmaceutical support and LINE Messaging API for smart notifications.'
                : 'เชื่อมต่อ Gemini AI ช่วยตอบคำถามเภสัชกรรม และ LINE Messaging API สำหรับการแจ้งเตือนอัจฉริยะ'
        }
    ];

    const project = {
        slug: 'obounerp',
        title: t.projects.obounERP.title,
        period: t.projects.obounERP.period,
        description: t.projects.obounERP.description,
        type: t.projects.obounERP.type,
        githubUrl: "https://github.com/thnakon/ERP_PMS",
        tech: [
            {
                name: 'Laravel 11',
                icon: 'laravel',
                role: lang === 'en'
                    ? 'Core backend framework handling business logic, API routing, and database ORM with robust security.'
                    : 'เฟรมเวิร์กหลักฝั่ง Backend จัดการ Logic ทางธุรกิจ, API และฐานข้อมูล พร้อมระบบความปลอดภัยที่แข็งแกร่ง'
            },
            {
                name: 'Vue.js 3',
                icon: 'vue',
                role: lang === 'en'
                    ? 'Modern frontend framework used for high-performance reactive interfaces and state management.'
                    : 'เฟรมเวิร์กฝั่ง Frontend สำหรับสร้างหน้าจอที่ตอบสนองไว (Reactive) และจัดการสถานะของข้อมูลที่ซับซ้อน'
            },
            {
                name: 'MySQL',
                icon: 'mysql',
                role: lang === 'en'
                    ? 'Primary relational database for storing comprehensive enterprise data with ACID compliance.'
                    : 'ฐานข้อมูลหลักสำหรับจัดเก็บข้อมูลองค์กรขนาดใหญ่ รับรองความถูกต้องและเสถียรภาพของข้อมูล'
            },
            {
                name: 'Tailwind',
                icon: 'tailwind',
                role: lang === 'en'
                    ? 'Utility-first CSS framework for crafting a custom, responsive, and high-performance design system.'
                    : 'CSS เฟรมเวิร์กสำหรับจัดแต่งดีไซน์ที่สวยงาม ทันสมัย และรองรับการแสดงผลทุกหน้าจออย่างรวดเร็ว'
            },
            {
                name: 'Docker',
                icon: 'docker',
                role: lang === 'en'
                    ? 'Containerization for consistent development environment and streamlined production deployment.'
                    : 'การจำลองสภาพแวดล้อมเพื่อความเสถียรในการพัฒนาและการติดตั้งระบบบนเซิร์ฟเวอร์ที่ง่ายและรวดเร็ว'
            }
        ],
        features: t.projects.obounERP.features,
        accent: 'blue'
    };

    return (
        <main className="min-h-screen transition-theme bg-[var(--bg-primary)]">
            <Head>
                <title>ObounERP - Pharmacy Management System | Thanakon</title>
                <meta name="description" content="Full-featured ERP system for pharmacies with POS, inventory management, and AI assistant. Built with Laravel, React, and modern technologies." />
                <meta property="og:title" content="ObounERP - Pharmacy Management System" />
                <meta property="og:description" content="Full-featured ERP system for pharmacies with POS, inventory management, and AI assistant." />
                <meta property="og:url" content="https://thnakon.dev/work/obounerp" />
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
                        <ObounShowcase project={project} />
                        {/* Glow Effect */}
                        <div className="absolute -inset-10 bg-blue-500/5 rounded-full blur-[120px] -z-10" />
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
                                        <div className="pl-10 space-y-3 text-[var(--text-secondary)] text-lg leading-relaxed">
                                            {lang === 'en' ? (
                                                <>
                                                    <p>Traditional pharmacy management in Thailand often relies on outdated systems—paper-based records, Excel spreadsheets, or expensive legacy software that doesn't meet modern needs.</p>
                                                    <p className="text-[var(--text-muted)]">• Inventory tracking was manual and error-prone, leading to expired medications going unnoticed</p>
                                                    <p className="text-[var(--text-muted)]">• No integration between POS, inventory, and financial systems</p>
                                                    <p className="text-[var(--text-muted)]">• Lack of drug interaction alerts put patient safety at risk</p>
                                                    <p className="text-[var(--text-muted)]">• Small pharmacies couldn't afford enterprise-grade solutions</p>
                                                </>
                                            ) : (
                                                <>
                                                    <p>การจัดการร้านขายยาในประเทศไทยส่วนใหญ่ยังคงพึ่งพาระบบเก่า เช่น กระดาษ, Excel หรือซอฟต์แวร์เก่าราคาแพงที่ไม่ตอบโจทย์การทำงานยุคใหม่</p>
                                                    <p className="text-[var(--text-muted)]">• การติดตามสต็อกทำด้วยมือและมีข้อผิดพลาดสูง ทำให้ยาหมดอายุถูกมองข้าม</p>
                                                    <p className="text-[var(--text-muted)]">• ไม่มีการเชื่อมต่อระหว่างระบบขาย, สต็อก และบัญชีการเงิน</p>
                                                    <p className="text-[var(--text-muted)]">• ขาดระบบแจ้งเตือนยาตีกัน ทำให้เสี่ยงต่อความปลอดภัยของผู้ป่วย</p>
                                                    <p className="text-[var(--text-muted)]">• ร้านขายยาขนาดเล็กไม่สามารถจ่ายค่าซอฟต์แวร์ระดับองค์กรได้</p>
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
                                        <div className="pl-10 space-y-3 text-[var(--text-secondary)] text-lg leading-relaxed">
                                            {lang === 'en' ? (
                                                <>
                                                    <p>I developed Oboun ERP—a comprehensive, modern pharmacy management system built from the ground up with Laravel and Vue.js, designed specifically for Thai pharmacies.</p>
                                                    <p className="text-[var(--text-muted)]">• Built an integrated POS with barcode scanning, multi-payment support (PromptPay QR, cash, card)</p>
                                                    <p className="text-[var(--text-muted)]">• Created smart inventory with lot tracking, expiration alerts, and auto-reorder suggestions</p>
                                                    <p className="text-[var(--text-muted)]">• Implemented drug interaction checker and allergy warning system</p>
                                                    <p className="text-[var(--text-muted)]">• Added Gemini AI assistant for pharmaceutical queries and LINE notifications</p>
                                                    <p className="text-[var(--text-muted)]">• Deployed with Docker for easy self-hosting by small pharmacies</p>
                                                </>
                                            ) : (
                                                <>
                                                    <p>ผมพัฒนา Oboun ERP ระบบบริหารร้านขายยาครบวงจรสมัยใหม่ ด้วย Laravel และ Vue.js ออกแบบมาเฉพาะสำหรับร้านขายยาในประเทศไทย</p>
                                                    <p className="text-[var(--text-muted)]">• สร้างระบบ POS แบบครบวงจร พร้อมสแกนบาร์โค้ด รองรับหลายช่องทางชำระเงิน (PromptPay QR, เงินสด, บัตร)</p>
                                                    <p className="text-[var(--text-muted)]">• ระบบคลังสินค้าอัจฉริยะ ติดตาม Lot, แจ้งเตือนหมดอายุ และแนะนำการสั่งซื้อใหม่อัตโนมัติ</p>
                                                    <p className="text-[var(--text-muted)]">• ระบบตรวจสอบยาตีกันและแจ้งเตือนประวัติแพ้ยา</p>
                                                    <p className="text-[var(--text-muted)]">• เชื่อมต่อ Gemini AI สำหรับตอบคำถามเภสัชกรรม และ LINE สำหรับแจ้งเตือน</p>
                                                    <p className="text-[var(--text-muted)]">• Deploy ด้วย Docker ให้ร้านยาขนาดเล็กสามารถติดตั้งเองได้ง่าย</p>
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
                                        <div className="pl-10 space-y-3 text-[var(--text-secondary)] text-lg leading-relaxed">
                                            {lang === 'en' ? (
                                                <>
                                                    <p>The system was successfully deployed and demonstrated significant improvements in pharmacy operations.</p>
                                                    <p className="text-[var(--text-muted)]">• Reduced expired medication incidents by catching products before expiration through automated alerts</p>
                                                    <p className="text-[var(--text-muted)]">• Streamlined daily operations with integrated POS and inventory, eliminating double data entry</p>
                                                    <p className="text-[var(--text-muted)]">• Enhanced patient safety through drug interaction and allergy warning systems</p>
                                                    <p className="text-[var(--text-muted)]">• Provided an affordable, modern solution built specifically for Thai pharmacy workflows</p>
                                                    <p className="text-[var(--text-muted)]">• Achieved Grade A for the capstone project, demonstrating enterprise-level solution design</p>
                                                </>
                                            ) : (
                                                <>
                                                    <p>ระบบถูกนำไปใช้งานจริงและแสดงให้เห็นการปรับปรุงกระบวนการทำงานของร้านขายยาอย่างชัดเจน</p>
                                                    <p className="text-[var(--text-muted)]">• ลดปัญหายาหมดอายุด้วยระบบแจ้งเตือนล่วงหน้าอัตโนมัติ</p>
                                                    <p className="text-[var(--text-muted)]">• เพิ่มความคล่องตัวในการทำงานประจำวันด้วยระบบ POS และสต็อกที่เชื่อมต่อกัน ไม่ต้องกรอกข้อมูลซ้ำ</p>
                                                    <p className="text-[var(--text-muted)]">• เพิ่มความปลอดภัยให้ผู้ป่วยด้วยระบบแจ้งเตือนยาตีกันและประวัติแพ้ยา</p>
                                                    <p className="text-[var(--text-muted)]">• เป็นโซลูชันราคาประหยัดที่ออกแบบมาเฉพาะสำหรับร้านขายยาไทย</p>
                                                    <p className="text-[var(--text-muted)]">• ได้เกรด A สำหรับโปรเจกต์จบการศึกษา แสดงถึงความสามารถในการออกแบบโซลูชันระดับองค์กร</p>
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
                                    ? "Oboun ERP stands as a testament to the intersection of traditional pharmaceutical practice and modern digital efficiency. By modernizing inventory control and enhancing patient safety through AI, it demonstrates how technology can transform local businesses into data-driven enterprises."
                                    : "Oboun ERP คือความสำเร็จของการผสานภูมิปัญญาด้านเภสัชกรรมแบบดั้งเดิมเข้ากับประสิทธิภาพของเทคโนโลยีดิจิทัลสมัยใหม่ ด้วยการเปลี่ยนระบบคลังสินค้าให้เป็นดิจิทัลและเสริมความปลอดภัยผ่านระบบ AI โปรเจกต์นี้จึงเป็นต้นแบบที่แสดงให้เห็นว่าเทคโนโลยีสามารถยกระดับธุรกิจท้องถิ่นให้กลายเป็นองค์กรที่ขับเคลื่อนด้วยข้อมูลอย่างยั่งยืน"}
                            </p>
                            <div className="mt-6 text-xl font-heading text-[var(--text-primary)]">
                                {lang === 'en' ? 'Thank You!' : 'ขอบคุณครับ!'}
                            </div>
                        </section>

                        {/* Project Navigation moved inside */}
                        <ProjectNavigation lang={lang} />
                    </div>

                    <div className="space-y-8">
                        <OnThisPage lang={lang} />
                    </div>
                </div >
            </div >

            <Contact t={t} onGetInTouch={() => setBookingOpen(true)} />
            <Footer t={t} />
            <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} t={t} />
        </main >
    );
}
