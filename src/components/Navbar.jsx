import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

// SVG Icons
const Icons = {
  sun: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
    </svg>
  ),
  moon: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
    </svg>
  ),
  home: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
    </svg>
  ),
  user: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  ),
  work: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
  link: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
    </svg>
  ),
  monitor: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
  book: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
  ),
  chevronDown: (
    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
    </svg>
  ),
  mail: (
    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
  ai: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
    </svg>
  ),
  search: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  ),
  guestbook: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
    </svg>
  ),
  bucketlist: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
    </svg>
  ),
  calendar: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  ),
  attribution: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  ),
  github: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  ),
  linkedin: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
    </svg>
  ),
  twitter: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  ),
  email: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
  arrow: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7v10" />
    </svg>
  ),
};

// Shared Navigation Data
const getNavData = (lang, t, onClose, onBookCall) => ({
  pages: [
    { id: 'home', label: lang === 'en' ? 'Home' : 'หน้าหลัก', icon: Icons.home, href: '/' },
    { id: 'about', label: lang === 'en' ? 'About' : 'เกี่ยวกับ', icon: Icons.user, href: '/about' },
    { id: 'projects', label: lang === 'en' ? 'Projects' : 'โปรเจกต์', icon: Icons.work, href: '/work' },
    { id: 'uses', label: lang === 'en' ? 'Uses' : 'เครื่องมือ', icon: Icons.monitor, href: '/uses' },
    { id: 'guestbook', label: lang === 'en' ? 'Signature Wall' : 'Signature Wall', icon: Icons.guestbook, href: '/guestbook' },
    { id: 'ai-toolkit', label: lang === 'en' ? 'AI Toolkit' : 'AI Toolkit', icon: Icons.ai, href: '/ai-toolkit' },
    { id: 'book-call', label: lang === 'en' ? 'Book a call' : 'นัดโทร', icon: Icons.calendar, action: () => { onClose(); onBookCall(); } },
    { id: 'attribution', label: lang === 'en' ? 'Attribution' : 'เครดิต', icon: Icons.attribution, href: '/attribution' },
    { id: 'links', label: lang === 'en' ? 'Links' : 'ลิงก์', icon: Icons.link, href: '/links' },
  ],
  connect: [
    { id: 'github', label: 'GitHub', icon: Icons.github, href: 'https://github.com/thnakon', external: true },
    { id: 'linkedin', label: 'LinkedIn', icon: Icons.linkedin, href: 'https://www.linkedin.com/in/thnakon', external: true },
    { id: 'twitter', label: 'X (Twitter)', icon: Icons.twitter, href: 'https://x.com/Obounwarm', external: true },
    { id: 'email', label: 'Email', icon: Icons.email, href: 'mailto:thnakon.n@gmail.com', external: true },
  ]
});

export default function Navbar({ t, lang, setLang, theme, setTheme, onBookCall }) {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState('home');
  const [isGreeting, setIsGreeting] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const searchInputRef = useRef(null);

  const { pages, connect } = getNavData(lang, t, () => setIsCommandOpen(false), onBookCall);

  const filteredPages = pages.filter(page => 
    page.label.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const filteredConnect = connect.filter(item => 
    item.label.toLowerCase().includes(searchQuery.toLowerCase())
  );
  const allItems = [...filteredPages, ...filteredConnect];

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return t.nav.greetings.morning;
    if (hour >= 12 && hour < 17) return t.nav.greetings.afternoon;
    if (hour >= 17 && hour < 21) return t.nav.greetings.evening;
    return t.nav.greetings.night;
  };

  useEffect(() => {
    const timer = setTimeout(() => setIsGreeting(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (router.pathname === '/') {
        const sections = ['home', 'projects', 'about', 'contact'];
        for (const section of sections) {
          const element = document.getElementById(section);
          if (element) {
            const rect = element.getBoundingClientRect();
            if (rect.top <= 100 && rect.bottom >= 100) {
              setActiveSection(section);
              break;
            }
          }
        }
      } else {
        if (router.pathname === '/about') setActiveSection('about');
        else if (router.pathname.includes('/work')) setActiveSection('projects');
        else if (router.pathname === '/uses') setActiveSection('uses');
        else if (router.pathname === '/guestbook') setActiveSection('guestbook');
        else if (['/ai-toolkit', '/links', '/attribution'].includes(router.pathname)) setActiveSection('more');
      }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [router.pathname]);

  // Keyboard handling for search
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsCommandOpen(prev => !prev);
        setIsExpanded(false);
      } else if (e.key === 'Escape') {
        setIsCommandOpen(false);
      } else if (isCommandOpen) {
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          setSelectedIndex(prev => (prev + 1) % allItems.length);
        } else if (e.key === 'ArrowUp') {
          e.preventDefault();
          setSelectedIndex(prev => (prev - 1 + allItems.length) % allItems.length);
        } else if (e.key === 'Enter') {
          e.preventDefault();
          const item = allItems[selectedIndex];
          if (item) {
            handleItemClick(item);
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCommandOpen, selectedIndex, allItems]);

  // Focus search input when opened
  useEffect(() => {
    if (isCommandOpen) {
      setTimeout(() => searchInputRef.current?.focus(), 100);
      setSearchQuery('');
      setSelectedIndex(0);
    }
  }, [isCommandOpen]);

  const handleItemClick = (item) => {
    if (item.action) {
      item.action();
    } else if (item.external) {
      window.open(item.href, '_blank');
    } else {
      router.push(item.href);
    }
    setIsCommandOpen(false);
  };

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };


  const navItems = [
    { id: 'home', label: t.nav.home, href: '/' },
    { id: 'about', label: t.nav.about, href: '/about' },
    { id: 'projects', label: t.nav.work, href: '/work' },
    { id: 'uses', label: t.nav.uses, href: '/uses' },
  ];

  return (
    <>
      {/* Command Palette Backdrop */}
      {isCommandOpen && (
        <div 
          className="fixed inset-0 z-[999] bg-black/40 backdrop-blur-sm transition-opacity duration-500"
          onClick={() => setIsCommandOpen(false)}
        />
      )}

      {/* 1. Header Layer (Logo & Command) - Only on Desktop */}
      <div className={`fixed top-0 left-0 right-0 z-[1001] pointer-events-none hidden md:block transition-all duration-300 ${isCommandOpen ? 'opacity-0 invisible' : 'opacity-100 visible'}`}>
        <div className="max-w-6xl mx-auto px-6 h-[80px] flex items-center justify-between">
          <Link 
            href="/" 
            className={`pointer-events-auto transition-transform active:scale-95 ${!isGreeting ? 'animate-reveal-from-island-left' : 'opacity-0'}`}
          >
            <img src={theme === 'dark' ? '/logo-light.png' : '/logo-dark.png'} alt="Logo" className="h-9 w-auto" />
          </Link>
          <button 
            onClick={() => setIsCommandOpen(true)} 
            aria-label="Open command palette"
            className={`pointer-events-auto w-10 h-10 flex items-center justify-center text-[var(--text-primary)] hover:scale-110 transition-all active:scale-90 ${!isGreeting ? 'animate-reveal-from-island-right' : 'opacity-0'}`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Header - Logo | Nav | Command in one row */}
      <div className={`fixed top-0 left-0 right-0 z-[1001] md:hidden pointer-events-none transition-all duration-300 ${isCommandOpen ? 'opacity-0 invisible' : 'opacity-100 visible'}`}>
        <div className="px-4 h-[70px] flex items-center justify-between gap-2">
          {/* Logo */}
          <Link 
            href="/" 
            className={`pointer-events-auto transition-transform active:scale-95 shrink-0 ${!isGreeting ? 'animate-reveal-from-island-left' : 'opacity-0'}`}
          >
            <img src={theme === 'dark' ? '/logo-light.png' : '/logo-dark.png'} alt="Logo" className="h-8 w-auto" />
          </Link>

          {/* Mobile Nav Island */}
          <div 
            onClick={() => isMobile && isExpanded && setIsExpanded(false)}
            className={`
              pointer-events-auto flex-1 max-w-[280px]
              relative flex items-center justify-center overflow-hidden
              transition-all duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)]
              backdrop-blur-2xl h-[40px] rounded-full px-1
              ${theme === 'dark' 
                ? 'bg-black/40 border border-white/25' 
                : 'bg-white/40 border border-black/10'}
              ${!isGreeting ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}
            `}
          >
            <div className="flex items-center gap-0">
              {navItems.map((item) => (
                <Link 
                  key={item.id} 
                  href={item.href}
                  onClick={() => setIsExpanded(false)}
                  className={`
                    px-2.5 py-1 rounded-full text-[11px] font-semibold transition-all duration-300
                    ${activeSection === item.id 
                      ? (theme === 'dark' ? 'bg-white text-black' : 'bg-black text-white') 
                      : (theme === 'dark' ? 'text-white/60' : 'text-black/60')}
                  `}
                >
                  {item.label}
                </Link>
              ))}
              {/* More button */}
              <div 
                onClick={(e) => { e.stopPropagation(); setIsExpanded(!isExpanded); }}
                className={`
                  px-2.5 py-1 rounded-full text-[11px] font-semibold cursor-pointer transition-all duration-300 flex items-center gap-0.5
                  ${isExpanded
                    ? (theme === 'dark' ? 'bg-white text-black' : 'bg-black text-white') 
                    : (theme === 'dark' ? 'text-white/60' : 'text-black/60')}
                `}
              >
                <span>{t.nav.more}</span>
                <div className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}>
                  {Icons.chevronDown}
                </div>
              </div>
            </div>
          </div>

          {/* Command */}
          <button 
            onClick={() => setIsCommandOpen(true)} 
            aria-label="Open command palette"
            className={`pointer-events-auto w-9 h-9 flex items-center justify-center text-[var(--text-primary)] transition-all active:scale-90 shrink-0 ${!isGreeting ? 'animate-reveal-from-island-right' : 'opacity-0'}`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Expanded Menu Overlay */}
      {isMobile && isExpanded && (
        <div 
          className="fixed inset-0 z-[999] bg-black/30 md:hidden"
          onClick={() => setIsExpanded(false)}
        />
      )}

      {/* Mobile Expanded Dropdown */}
      <div className={`
        fixed top-[75px] left-3 right-3 z-[1000] md:hidden
        transition-all duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)]
        ${isExpanded ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-4 pointer-events-none'}
      `}>
        <div className={`
          rounded-[24px] p-4 overflow-y-auto max-h-[calc(100vh-100px)]
          backdrop-blur-2xl
          ${theme === 'dark' 
            ? 'bg-black/80 border border-white/20' 
            : 'bg-white/90 border border-black/10'}
        `}>
          {/* Visual Cards */}
          <div className="grid grid-cols-2 gap-3 mb-4">
            <Link href="/guestbook" onClick={() => setIsExpanded(false)} className={`relative group h-[100px] rounded-2xl overflow-hidden border ${theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'}`}>
              <img src="/images/guestbook-motivation.png" className="absolute inset-0 w-full h-full object-cover opacity-70" />
              <div className={`absolute inset-0 bg-gradient-to-t from-black/80 to-transparent`} />
              <div className="absolute bottom-3 left-3">
                <h4 className="text-sm font-bold text-white">{t.nav.moreDropdown.guestbook.title}</h4>
              </div>
            </Link>
            <Link href="/ai-toolkit" onClick={() => setIsExpanded(false)} className={`relative group h-[100px] rounded-2xl overflow-hidden border ${theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'}`}>
              <img src="/images/ai-toolkit-future.png" className="absolute inset-0 w-full h-full object-cover opacity-70" />
              <div className={`absolute inset-0 bg-gradient-to-t from-black/80 to-transparent`} />
              <div className="absolute bottom-3 left-3">
                <h4 className="text-sm font-bold text-white">{t.nav.moreDropdown.aiToolkit.title}</h4>
              </div>
            </Link>
          </div>

          {/* Quick Links */}
          <div className="space-y-2 mb-4">
            {[
              { id: 'links', icon: Icons.link, ...t.nav.moreDropdown.links },
              { id: 'uses', icon: Icons.monitor, ...t.nav.moreDropdown.uses },
              { id: 'attribution', icon: Icons.book, ...t.nav.moreDropdown.attribution }
            ].map((link) => (
              <Link key={link.id} href={`/${link.id}`} onClick={() => setIsExpanded(false)} className={`flex items-center gap-2.5 py-2 px-3 rounded-xl ${theme === 'dark' ? 'bg-white/5 hover:bg-white/10' : 'bg-black/5 hover:bg-black/10'}`}>
                <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${theme === 'dark' ? 'bg-white/10 text-white' : 'bg-black/10 text-black'}`}>
                  <div className="scale-[0.8]">{link.icon}</div>
                </div>
                <span className={`text-sm font-medium ${theme === 'dark' ? 'text-white' : 'text-black'}`}>{link.title}</span>
              </Link>
            ))}
          </div>

          {/* Controls */}
          <div className="flex gap-2">
            <button 
              onClick={toggleTheme}
              className={`flex-1 flex items-center justify-center gap-2 p-2.5 rounded-xl ${theme === 'dark' ? 'bg-white/5 text-white' : 'bg-black/5 text-black'}`}
            >
              <div className="scale-90">{theme === 'dark' ? Icons.sun : Icons.moon}</div>
              <span className="text-xs font-bold uppercase tracking-wider">{theme === 'dark' ? 'Light' : 'Dark'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Centered Dynamic Island Group - Visible on Mobile only when Command is open */}
      <div className={`fixed top-0 left-0 right-0 z-[1000] ${isCommandOpen ? 'flex' : 'hidden md:flex'} justify-center ${isCommandOpen ? 'pt-20 md:pt-20' : 'pt-4 md:pt-[18px]'} pointer-events-none transition-all duration-500`}>
        <div className={`flex items-center justify-center gap-1.5 px-4 transition-all duration-700 ${isCommandOpen ? 'w-full max-w-2xl' : ''}`}>
           
           {/* MAIN DYNAMIC ISLAND PILL */}
           <div 
             onMouseLeave={() => setIsExpanded(false)}
             className={`
               pointer-events-auto
               relative flex flex-col items-center overflow-hidden
               transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)]
               backdrop-blur-2xl
               ${theme === 'dark' 
                 ? 'bg-black/40 border border-white/25 shadow-[0_20px_50px_rgba(0,0,0,0.5)]' 
                 : 'bg-white/40 border border-black/10 shadow-[0_20px_50px_rgba(0,0,0,0.08)]'}
               ${isGreeting ? 'w-[140px] h-[36px] rounded-full' : ''}
               ${!isGreeting && !isExpanded && !isCommandOpen ? 'w-[480px] h-[44px] rounded-full px-4' : ''}
               ${isExpanded && !isCommandOpen ? 'w-[750px] h-[480px] rounded-[42px] p-6 pt-12' : ''}
               ${isCommandOpen ? 'w-[92%] md:w-[640px] h-[70vh] md:h-[520px] rounded-[32px] p-0 shadow-2xl' : ''}
             `}
           >
              {/* Greeting Layer */}
              <div className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${isGreeting ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                 <span className={`text-[13px] font-bold tracking-tight animate-reveal-text ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                   {getGreeting()}
                 </span>
              </div>

              {/* Nav Items Level */}
              <div className={`w-full flex items-center h-[44px] shrink-0 transition-all duration-500 ${!isGreeting && !isCommandOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'} ${isExpanded ? 'mb-4 md:mb-8' : ''}`}>
                 <div className="w-full flex items-center justify-between overflow-x-auto no-scrollbar md:overflow-visible">
                   <div className="flex items-center gap-0 md:gap-0.5 shrink-0">
                     {navItems.map((item) => (
                       <Link 
                         key={item.id} 
                         href={item.href}
                         onClick={() => setIsExpanded(false)}
                         className={`
                           px-2 md:px-4 py-1.5 rounded-full text-[11px] md:text-[12px] font-semibold transition-all duration-300
                           ${activeSection === item.id 
                             ? (theme === 'dark' ? 'bg-white text-black' : 'bg-black text-white') 
                             : (theme === 'dark' ? 'text-white/50 hover:text-white' : 'text-black/50 hover:text-black')}
                         `}
                       >
                         {item.label}
                       </Link>
                     ))}
                     
                     {/* MORE TRIGGER */}
                     <div 
                       onClick={() => isMobile && setIsExpanded(!isExpanded)}
                       onMouseEnter={() => !isMobile && setIsExpanded(true)}
                        className={`
                          px-2 md:px-4 py-1.5 rounded-full text-[11px] md:text-[12px] font-semibold cursor-pointer transition-all duration-300 flex items-center gap-1
                          ${(isExpanded || activeSection === 'more')
                            ? (theme === 'dark' ? 'bg-white text-black' : 'bg-black text-white') 
                            : (theme === 'dark' ? 'text-white/50 hover:text-white' : 'text-black/50 hover:text-black')}
                        `}
                     >
                       <span>{t.nav.more}</span>
                       <div className={`transition-transform duration-500 ${isExpanded ? 'rotate-180' : ''}`}>
                         {Icons.chevronDown}
                       </div>
                     </div>
                   </div>

                   {/* GET IN TOUCH CTA - Hidden on very small screens */}
                   <button 
                     onClick={onBookCall}
                     className={`
                       hidden sm:flex shrink-0 items-center gap-1.5 px-1.5 py-1 rounded-full transition-all duration-300 group/cta border ml-2 md:ml-0
                       ${theme === 'dark' ? 'border-white/20 text-white hover:bg-white/10' : 'border-black/10 text-black hover:bg-black/5'}
                     `}
                   >
                     <span className="text-[10px] font-semibold whitespace-nowrap">{t.hero.cta}</span>
                     <div className={`w-5 h-5 rounded-full flex items-center justify-center transition-all duration-300 ${theme === 'dark' ? 'bg-white text-black' : 'bg-black text-white'}`}>
                        <svg className="w-3 h-3 transition-transform duration-300 group-hover/cta:rotate-[-45deg]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7-7 7M3 12h18" />
                        </svg>
                     </div>
                   </button>
                 </div>
              </div>

              {/* Command Palette Interface (Inline) */}
              {isCommandOpen && (
                <div className="w-full h-full flex flex-col animate-reveal-fade-up">
                    {/* Search Header */}
                    <div className={`flex items-center gap-3 px-4 md:px-6 py-4 md:py-5 border-b ${theme === 'dark' ? 'border-white/10' : 'border-black/10'}`}>
                      <div className={theme === 'dark' ? 'text-white/50' : 'text-black/50'}>
                        {Icons.search}
                      </div>
                      <input
                        ref={searchInputRef}
                        type="text"
                        placeholder={lang === 'en' ? 'Search' : 'ค้นหา'}
                        value={searchQuery}
                        onChange={(e) => {
                          setSearchQuery(e.target.value);
                          setSelectedIndex(0);
                        }}
                        className={`
                          flex-1 bg-transparent outline-none text-lg md:text-xl font-medium
                          placeholder:opacity-50
                          ${theme === 'dark' ? 'text-white placeholder:text-white/50' : 'text-black placeholder:text-black/50'}
                        `}
                      />
                      <div className="flex items-center gap-1.5 md:gap-2">
                        <button
                          onClick={toggleTheme}
                          className={`p-2 rounded-lg transition-all ${theme === 'dark' ? 'hover:bg-white/10 text-white/50' : 'hover:bg-black/10 text-black/50'}`}
                        >
                          {theme === 'dark' ? Icons.sun : Icons.moon}
                        </button>
                        <button
                          onClick={() => setIsCommandOpen(false)}
                          className={`px-2.5 py-1.5 md:px-3 md:py-1.5 rounded-lg text-[9px] md:text-[10px] font-bold uppercase tracking-wider transition-all ${theme === 'dark' ? 'bg-white/10 text-white/70 hover:bg-white/20' : 'bg-black/10 text-black/70 hover:bg-black/20'}`}
                        >
                          {lang === 'en' ? 'ESC' : 'ปิด'}
                        </button>
                      </div>
                    </div>

                   {/* Results Container */}
                   <div className="flex-1 overflow-y-auto px-2 py-4 no-scrollbar">
                     {/* Pages Section */}
                     {filteredPages.length > 0 && (
                       <div className="px-3 py-2 mb-4">
                         <p className={`px-3 py-2 text-[10px] font-bold tracking-[0.2em] uppercase ${theme === 'dark' ? 'text-white/30' : 'text-black/30'}`}>
                           {lang === 'en' ? 'PAGES' : 'หน้า'}
                         </p>
                         {filteredPages.map((page, index) => (
                           <button
                             key={page.id}
                             onClick={() => handleItemClick(page)}
                             onMouseEnter={() => setSelectedIndex(index)}
                             className={`
                               w-full flex items-center gap-4 px-4 py-3 rounded-2xl transition-all
                               ${selectedIndex === index 
                                 ? (theme === 'dark' ? 'bg-white/10 scale-[1.02]' : 'bg-black/10 scale-[1.02]') 
                                 : 'hover:bg-opacity-5 hover:scale-[1.01]'}
                             `}
                           >
                             <div className={theme === 'dark' ? 'text-white/60' : 'text-black/60'}>
                               {page.icon}
                             </div>
                             <span className={`text-base font-medium ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                               {page.label}
                             </span>
                           </button>
                         ))}
                       </div>
                     )}

                     {/* Connect Section */}
                     {filteredConnect.length > 0 && (
                       <div className="px-3 py-2">
                         <p className={`px-3 py-2 text-[10px] font-bold tracking-[0.2em] uppercase ${theme === 'dark' ? 'text-white/30' : 'text-black/30'}`}>
                           {lang === 'en' ? 'CONNECT' : 'เชื่อมต่อ'}
                         </p>
                         {filteredConnect.map((item, index) => {
                           const itemIndex = filteredPages.length + index;
                           return (
                             <button
                               key={item.id}
                               onClick={() => handleItemClick(item)}
                               onMouseEnter={() => setSelectedIndex(itemIndex)}
                               className={`
                                 w-full flex items-center justify-between gap-4 px-4 py-3 rounded-2xl transition-all
                                 ${selectedIndex === itemIndex 
                                   ? (theme === 'dark' ? 'bg-white/10 scale-[1.02]' : 'bg-black/10 scale-[1.02]') 
                                   : 'hover:bg-opacity-5 hover:scale-[1.01]'}
                               `}
                             >
                               <div className="flex items-center gap-4">
                                 <div className={theme === 'dark' ? 'text-white/60' : 'text-black/60'}>
                                   {item.icon}
                                 </div>
                                 <span className={`text-base font-medium ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                                   {item.label}
                                 </span>
                               </div>
                               <div className={theme === 'dark' ? 'text-white/30' : 'text-black/30'}>
                                 {Icons.arrow}
                               </div>
                             </button>
                           );
                         })}
                       </div>
                     )}

                     {/* No Results */}
                     {allItems.length === 0 && (
                       <div className="px-6 py-12 text-center">
                         <p className={theme === 'dark' ? 'text-white/50' : 'text-black/50'}>
                           {lang === 'en' ? 'No results found' : 'ไม่พบผลลัพธ์'}
                         </p>
                       </div>
                     )}
                   </div>
                </div>
              )}

              {/* Dashboard Dropdown Content (Expanded) */}
              <div className={`w-full flex-1 transition-all duration-500 delay-100 flex flex-col md:grid md:grid-cols-12 gap-4 md:gap-6 overflow-y-auto ${isExpanded && !isCommandOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
                 {/* Left side: Grid of Visual Cards */}
                 <div className="w-full md:col-span-8 grid grid-cols-2 gap-3 md:gap-4 shrink-0">
                    <Link href="/guestbook" onClick={() => setIsExpanded(false)} className={`relative group h-[120px] md:h-auto rounded-2xl md:rounded-3xl overflow-hidden border transition-all ${theme === 'dark' ? 'bg-white/5 border-white/10 hover:border-white/20' : 'bg-black/5 border-black/5 hover:border-black/10'}`}>
                       <img src="/images/guestbook-motivation.png" className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-1000" />
                       <div className={`absolute inset-0 bg-gradient-to-t via-transparent to-transparent ${theme === 'dark' ? 'from-black/90' : 'from-white/90'}`} />
                       <div className="absolute bottom-3 md:bottom-6 left-3 md:left-6">
                         <div className={`w-6 h-6 md:w-8 md:h-8 rounded-full mb-2 md:mb-3 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform ${theme === 'dark' ? 'bg-white text-black' : 'bg-black text-white'}`}>
                            <div className="scale-75 md:scale-100">{Icons.book}</div>
                         </div>
                         <h4 className={`text-sm md:text-lg font-bold mb-0.5 md:mb-1 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>{t.nav.moreDropdown.guestbook.title}</h4>
                         <p className={`text-[8px] md:text-[10px] leading-tight max-w-[100px] md:max-w-[140px] hidden sm:block ${theme === 'dark' ? 'text-white/60' : 'text-black/60'}`}>{t.nav.moreDropdown.guestbook.desc}</p>
                       </div>
                    </Link>
                    <Link href="/ai-toolkit" onClick={() => setIsExpanded(false)} className={`relative group h-[120px] md:h-auto rounded-2xl md:rounded-3xl overflow-hidden border transition-all ${theme === 'dark' ? 'bg-white/5 border-white/10 hover:border-white/20' : 'bg-black/5 border-black/5 hover:border-black/10'}`}>
                       <img src="/images/ai-toolkit-future.png" className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-all duration-1000" />
                       <div className={`absolute inset-0 bg-gradient-to-t via-transparent to-transparent ${theme === 'dark' ? 'from-black/90' : 'from-white/90'}`} />
                       <div className="absolute bottom-3 md:bottom-6 left-3 md:left-6">
                         <div className={`w-6 h-6 md:w-8 md:h-8 rounded-full mb-2 md:mb-3 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform ${theme === 'dark' ? 'bg-white text-black' : 'bg-black text-white'}`}>
                            <div className="scale-75 md:scale-100">{Icons.ai}</div>
                         </div>
                         <h4 className={`text-sm md:text-lg font-bold mb-0.5 md:mb-1 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>{t.nav.moreDropdown.aiToolkit.title}</h4>
                         <p className={`text-[8px] md:text-[10px] leading-tight max-w-[100px] md:max-w-[140px] hidden sm:block ${theme === 'dark' ? 'text-white/60' : 'text-black/60'}`}>{t.nav.moreDropdown.aiToolkit.desc}</p>
                       </div>
                    </Link>
                 </div>

                 {/* Right side: Quick Tool Links */}
                 <div className="w-full md:col-span-4 flex flex-col gap-2 shrink-0 pb-4 md:pb-0">
                    {[
                      { id: 'links', icon: Icons.link, ...t.nav.moreDropdown.links },
                      { id: 'uses', icon: Icons.monitor, ...t.nav.moreDropdown.uses },
                      { id: 'attribution', icon: Icons.book, ...t.nav.moreDropdown.attribution }
                    ].map((link) => (
                      <Link key={link.id} href={`/${link.id}`} onClick={() => setIsExpanded(false)} className={`group flex items-center gap-3 py-3 px-4 md:py-3.5 md:px-5 rounded-2xl md:rounded-[28px] border transition-all ${theme === 'dark' ? 'bg-white/5 border-white/5 hover:bg-white/10' : 'bg-black/5 border-black/5 hover:bg-black/10'}`}>
                         <div className={`w-9 h-9 md:w-10 md:h-10 rounded-xl md:rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform ${theme === 'dark' ? 'bg-white/5 text-white' : 'bg-black/5 text-black'}`}>
                            <div className="scale-90 md:scale-100">{link.icon}</div>
                         </div>
                         <div>
                            <h5 className={`text-sm md:text-base font-bold ${theme === 'dark' ? 'text-white' : 'text-black'}`}>{link.title}</h5>
                            <p className={`text-[10px] opacity-50 line-clamp-1 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>{link.desc}</p>
                         </div>
                      </Link>
                    ))}

                    {/* Theme Controls */}
                    <div className="flex gap-3 mt-auto">
                       <button 
                         onClick={toggleTheme}
                         className={`flex-1 flex items-center justify-center gap-2 p-3.5 rounded-[20px] border transition-all ${theme === 'dark' ? 'bg-white/5 border-white/5 hover:bg-white/10 text-white' : 'bg-black/5 border-black/5 hover:bg-black/10 text-black'}`}
                       >
                          <div className="shrink-0 scale-90">{theme === 'dark' ? Icons.sun : Icons.moon}</div>
                          <span className="text-[10px] font-medium uppercase tracking-wider">{theme === 'dark' ? 'Light' : 'Dark'}</span>
                       </button>
                    </div>
                 </div>
              </div>
           </div>

           {/* RIGHT AUXILIARY PILL (Status Icon) */}
           <div className={`
             pointer-events-auto
             hidden md:flex items-center justify-center
             backdrop-blur-2xl transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)]
             ${theme === 'dark' ? 'bg-black/40 border border-white/25' : 'bg-white/40 border border-black/10'}
             ${!isGreeting && !isExpanded && !isCommandOpen ? 'w-[38px] h-[38px] rounded-full opacity-100 shadow-lg' : 'w-0 h-0 opacity-0 overflow-hidden'}
           `}>
             <div className={`scale-100 animate-reveal-fade-up ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
               {activeSection === 'home' && Icons.home}
               {activeSection === 'about' && Icons.user}
               {activeSection === 'projects' && Icons.work}
               {activeSection === 'guestbook' && Icons.book}
               {activeSection === 'uses' && Icons.monitor}
               {activeSection === 'more' && Icons.ai}
             </div>
           </div>
        </div>
      </div>
    </>
  );
}
