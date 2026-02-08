import { useState, useEffect } from 'react';
import Link from 'next/link';
import translations from '@/lib/translations';
import Navbar from '@/components/Navbar';
import BookingModal from '@/components/BookingModal';
import Footer from '@/components/Footer';

const TypewriterText = ({ text, delay = 25, startDelay = 500 }) => {
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
                <span className="inline-block w-0.5 h-5 ml-1 bg-[var(--text-primary)] animate-pulse align-middle" />
            )}
        </span>
    );
};

// Blog posts data
const blogPosts = [
    {
        slug: 'my-2025-stack-as-a-frontend-developer',
        date: 'FEB 05, 2026',
        readTime: 5,
        title: {
            en: 'My 2026 Stack as an AI-Augmented Developer',
            th: 'Stack ที่ฉันใช้ในฐานะ AI-Augmented Developer ปี 2024'
        },
        excerpt: {
            en: "As an AI-Augmented Developer in 2026, I've fine-tuned my environment with a set of powerful AI-driven tools that enhance productivity and efficiency. Let me share my current stack...",
            th: "ในฐานะนักพัฒนาที่ขับเคลื่อนด้วย AI ในปี 2024 ผมได้ปรับแต่งสภาพแวดล้อมการพัฒนาด้วยเครื่องมือที่ทรงพลังที่เพิ่มประสิทธิภาพและความสะดวก..."
        },
        image: '/images/blog/stack-2026.png',
        tags: ['next.js', 'react', 'tools', 'productivity']
    },
    {
        slug: 'how-to-build-a-blog-with-nextjs-and-mdx',
        date: 'JAN 28, 2026',
        readTime: 14,
        title: {
            en: 'How to Build a Blog with Next.js and MDX',
            th: 'วิธีสร้างบล็อกด้วย Next.js และ MDX'
        },
        excerpt: {
            en: "Build a blazing fast markdown blog using Next.js and MDX with this complete walkthrough. From setup to deployment, I'll show you everything you need to know.",
            th: "สร้างบล็อก Markdown ที่เร็วสุดๆ ด้วย Next.js และ MDX พร้อมคำแนะนำครบถ้วน ตั้งแต่ติดตั้งจนถึง Deploy..."
        },
        image: '/images/blog/nextjs-mdx.png',
        tags: ['next.js', 'react', 'typescript', 'setup']
    },
    {
        slug: 'learning-programming-easy-to-start-hard-to-master',
        date: 'JAN 15, 2026',
        readTime: 8,
        title: {
            en: 'Learning Programming – Easy to Start, Hard to Master',
            th: 'การเรียนเขียนโปรแกรม – เริ่มง่าย แต่ยากที่จะเชี่ยวชาญ'
        },
        excerpt: {
            en: "Programming is more accessible than ever, yet mastering it takes time, persistence, and clarity. Let's bust some myths, and cover what I wish I knew when I started. 📚",
            th: "การเขียนโปรแกรมเข้าถึงได้ง่ายขึ้นกว่าเดิม แต่การเชี่ยวชาญต้องใช้เวลา ความอดทน และความชัดเจน มาทำลายตำนานและแบ่งปันสิ่งที่ผมอยากรู้ตอนเริ่มต้น 📚"
        },
        image: '/images/blog/learning-programming.png',
        tags: ['tips', 'core-concept', 'productivity']
    }
];

const allTags = ['next.js', 'react', 'css', 'tailwindcss', 'java', 'flexbox', 'design', 'tips', 'grid', 'tools', 'vite', 'core-concept', 'git', 'pattern', 'typescript', 'setup', 'form', 'productivity', 'web', 'animation'];

export default function BlogPage({ theme, setTheme, lang, setLang }) {
    const [bookingOpen, setBookingOpen] = useState(false);
    const [showContent, setShowContent] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedTags, setSelectedTags] = useState([]);
    const t = translations[lang] || translations.en;

    useEffect(() => {
        const timer = setTimeout(() => setShowContent(true), 100);
        return () => clearTimeout(timer);
    }, []);

    const filteredPosts = blogPosts.filter(post => {
        const matchesSearch = searchQuery === '' ||
            post.title.en.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.title.th.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesTags = selectedTags.length === 0 ||
            selectedTags.some(tag => post.tags.includes(tag));
        return matchesSearch && matchesTags;
    });

    const toggleTag = (tag) => {
        setSelectedTags(prev =>
            prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
        );
    };

    return (
        <main className="min-h-screen transition-theme bg-[var(--bg-primary)]">
            <Navbar
                t={t}
                lang={lang}
                setLang={setLang}
                theme={theme}
                setTheme={setTheme}
                onBookCall={() => setBookingOpen(true)}
            />

            <div className="pt-32 pb-24 max-w-6xl mx-auto px-6">
                {/* Header */}
                <div className="text-center mb-16">
                    <span className={`inline-block text-[10px] tracking-[0.3em] font-bold text-[var(--text-muted)] uppercase mb-6 transition-all duration-1000 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                        {lang === 'en' ? "WRITINGS" : "บันทึก"}
                    </span>
                    <h1 className={`text-3xl md:text-5xl font-heading tracking-tight mb-8 transition-all duration-1000 delay-300 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                        <span className="text-[var(--text-primary)]">{lang === 'en' ? 'My' : 'เรื่องราว'} </span>
                        <em className="overview-title-accent">{lang === 'en' ? 'Blog' : 'บล็อก'}</em>
                    </h1>
                    <div className="min-h-[2.5em]">
                        <p className="text-base md:text-lg text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed">
                            {showContent && (
                                <TypewriterText
                                    text={lang === 'en'
                                        ? "Thoughts, stories and ideas about design, technology, and life."
                                        : "ความคิด เรื่องราว และไอเดียเกี่ยวกับการออกแบบ เทคโนโลยี และการใช้ชีวิต"}
                                />
                            )}
                        </p>
                    </div>
                </div>

                {/* Blog Layout */}
                <div className={`grid lg:grid-cols-12 gap-10 transition-all duration-1000 delay-700 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>

                    {/* Sidebar */}
                    <aside className="lg:col-span-3 order-2 lg:order-1">
                        <div className="lg:sticky lg:top-32 space-y-8">
                            {/* Explore Header */}
                            <div>
                                <span className="text-[10px] tracking-[0.2em] font-bold text-[var(--text-muted)] uppercase mb-2 block">
                                    {lang === 'en' ? 'EXPLORE' : 'สำรวจ'}
                                </span>
                                <div className="flex items-center justify-between">
                                    <h2 className="text-2xl font-heading font-bold text-[var(--text-primary)]">
                                        {lang === 'en' ? 'Library' : 'คลังบทความ'}
                                    </h2>
                                    <button className="w-8 h-8 rounded-lg border border-[var(--border-color)] flex items-center justify-center text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:border-[var(--text-primary)] transition-all">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                                        </svg>
                                    </button>
                                </div>
                                <p className="text-xs text-[var(--text-muted)] mt-1">
                                    {lang === 'en' ? `Showing ${filteredPosts.length} posts` : `แสดง ${filteredPosts.length} บทความ`}
                                </p>
                            </div>

                            {/* Search */}
                            <div>
                                <span className="text-[10px] tracking-[0.2em] font-bold text-[var(--text-muted)] uppercase mb-3 block">
                                    {lang === 'en' ? 'SEARCH' : 'ค้นหา'}
                                </span>
                                <div className="relative">
                                    <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                    <input
                                        type="text"
                                        placeholder={lang === 'en' ? 'Search' : 'ค้นหา'}
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full pl-10 pr-12 py-2.5 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] text-sm text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--text-primary)] transition-all"
                                    />
                                    <div className="absolute right-3 top-1/2 -translate-y-1/2 flex gap-0.5">
                                        <span className="w-5 h-5 rounded bg-[var(--bg-tertiary)] border border-[var(--border-color)] flex items-center justify-center text-[8px] text-[var(--text-muted)]">⌘</span>
                                        <span className="w-5 h-5 rounded bg-[var(--bg-tertiary)] border border-[var(--border-color)] flex items-center justify-center text-[8px] text-[var(--text-muted)]">K</span>
                                    </div>
                                </div>
                            </div>

                            {/* Topics */}
                            <div>
                                <span className="text-[10px] tracking-[0.2em] font-bold text-[var(--text-muted)] uppercase mb-3 block">
                                    {lang === 'en' ? 'TOPICS' : 'หัวข้อ'}
                                </span>
                                <div className="flex flex-wrap gap-2">
                                    {allTags.map(tag => (
                                        <button
                                            key={tag}
                                            onClick={() => toggleTag(tag)}
                                            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${selectedTags.includes(tag)
                                                ? 'bg-[var(--text-primary)] text-[var(--bg-primary)]'
                                                : 'bg-[var(--bg-secondary)] text-[var(--text-muted)] border border-[var(--border-color)] hover:border-[var(--text-muted)]'
                                                }`}
                                        >
                                            {tag}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* Blog Posts */}
                    <div className="lg:col-span-9 order-1 lg:order-2 space-y-8">
                        {filteredPosts.map((post, index) => (
                            <Link
                                href={`/blog/${post.slug}`}
                                key={post.slug}
                                className="group flex flex-col md:flex-row gap-6 p-6 rounded-3xl border border-[var(--border-color)] bg-[var(--bg-secondary)]/50 hover:border-[var(--text-primary)]/30 hover:bg-[var(--bg-secondary)] transition-all duration-500"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                {/* Content */}
                                <div className="flex-1 order-2 md:order-1">
                                    <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-wider mb-3 block">
                                        {post.date}
                                    </span>
                                    <h3 className="text-xl md:text-2xl font-heading font-bold text-[var(--text-primary)] mb-3 group-hover:text-[var(--text-primary)] transition-colors leading-tight">
                                        {lang === 'en' ? post.title.en : post.title.th}
                                    </h3>
                                    <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-4 line-clamp-2">
                                        {lang === 'en' ? post.excerpt.en : post.excerpt.th}
                                    </p>
                                    <div className="flex items-center gap-4">
                                        <span className="flex items-center gap-1.5 text-xs text-[var(--text-muted)]">
                                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            {post.readTime} min read
                                        </span>
                                        <span className="flex items-center gap-1.5 text-xs font-bold text-[var(--text-primary)] group-hover:gap-2.5 transition-all">
                                            {lang === 'en' ? 'Read Article' : 'อ่านบทความ'}
                                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                            </svg>
                                        </span>
                                    </div>
                                </div>

                                {/* Image */}
                                <div className="w-full md:w-48 h-36 md:h-32 rounded-2xl overflow-hidden flex-shrink-0 order-1 md:order-2 border border-[var(--border-color)]">
                                    <img
                                        src={post.image}
                                        alt={lang === 'en' ? post.title.en : post.title.th}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                </div>
                            </Link>
                        ))}

                        {filteredPosts.length === 0 && (
                            <div className="text-center py-20">
                                <p className="text-[var(--text-muted)]">
                                    {lang === 'en' ? 'No posts found matching your criteria.' : 'ไม่พบบทความที่ตรงกับเงื่อนไขของคุณ'}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <Footer t={t} />

            <BookingModal
                isOpen={bookingOpen}
                onClose={() => setBookingOpen(false)}
                t={t}
            />
        </main>
    );
}
