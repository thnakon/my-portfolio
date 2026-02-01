import { useState, useEffect } from 'react';
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
  blog: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
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
};

export default function Navbar({ t, lang, setLang, theme, setTheme, onBookCall }) {
  const router = useRouter();
  const [activeSection, setActiveSection] = useState('home');
  const [isGreeting, setIsGreeting] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);

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
        else if (router.pathname === '/blog') setActiveSection('blog');
        else if (router.pathname === '/guestbook') setActiveSection('guestbook');
      }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [router.pathname]);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const toggleLang = () => {
    const newLang = lang === 'en' ? 'th' : 'en';
    setLang(newLang);
    localStorage.setItem('lang', newLang);
  };

  const navItems = [
    { id: 'home', label: t.nav.home, href: '/' },
    { id: 'about', label: t.nav.about, href: '/about' },
    { id: 'projects', label: t.nav.work, href: '/work' },
    { id: 'blog', label: t.nav.blog, href: '/blog' },
  ];

  return (
    <>
      {/* 1. Header Layer (Logo & Command) */}
      <div className="fixed top-0 left-0 right-0 z-[1001] pointer-events-none">
        <div className="max-w-6xl mx-auto px-6 h-[80px] flex items-center justify-between">
          <Link href="/" className="pointer-events-auto transition-transform active:scale-95 animate-reveal-fade-up" style={{ animationDelay: '0.1s' }}>
            <img src={theme === 'dark' ? '/logo-light.png' : '/logo-dark.png'} alt="Logo" className="h-9 w-auto" />
          </Link>
          <button 
            onClick={() => setIsExpanded(!isExpanded)} 
            className="pointer-events-auto w-10 h-10 flex items-center justify-center text-[var(--text-primary)] hover:scale-110 transition-all active:scale-90 animate-reveal-fade-up"
            style={{ animationDelay: '0.2s' }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3z" />
            </svg>
          </button>
        </div>
      </div>

      {/* 2. Centered Dynamic Island Group */}
      <div className="fixed top-0 left-0 right-0 z-[1000] flex justify-center pt-5 pointer-events-none">
        <div className="flex items-center gap-1.5 px-4 transition-all duration-700">
           
           {/* MAIN DYNAMIC ISLAND PILL */}
           <div 
             onMouseLeave={() => setIsExpanded(false)}
             className={`
               pointer-events-auto
               relative flex flex-col items-center overflow-hidden
               transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)]
               backdrop-blur-2xl
               ${theme === 'dark' 
                 ? 'bg-black/60 border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.4)]' 
                 : 'bg-white/70 border border-black/5 shadow-[0_20px_50px_rgba(0,0,0,0.1)]'}
               ${isGreeting ? 'w-[140px] h-[36px] rounded-full' : ''}
               ${!isGreeting && !isExpanded ? 'w-[90vw] md:w-[480px] h-[44px] rounded-full px-4' : ''}
               ${isExpanded ? 'w-[95vw] min-h-[500px] md:w-[750px] md:h-[480px] rounded-[32px] md:rounded-[42px] p-6 pt-12' : ''}
             `}
           >
              {/* Greeting Layer */}
              <div className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${isGreeting ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                 <span className={`text-[13px] font-bold tracking-tight animate-reveal-text ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                   {getGreeting()}
                 </span>
              </div>

              {/* Nav Items Level */}
              <div className={`w-full flex items-center h-[44px] shrink-0 transition-all duration-500 ${!isGreeting ? 'opacity-100' : 'opacity-0 pointer-events-none'} ${isExpanded ? 'mb-8' : ''}`}>
                 <div className="w-full flex items-center justify-between overflow-x-auto no-scrollbar md:overflow-visible">
                   <div className="flex items-center gap-0.5 shrink-0">
                     {navItems.map((item) => (
                       <Link 
                         key={item.id} 
                         href={item.href}
                         className={`
                           px-3 md:px-4 py-1.5 rounded-full text-[12px] font-bold transition-all duration-300
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
                       onMouseEnter={() => setIsExpanded(true)}
                       className={`
                         px-3 md:px-4 py-1.5 rounded-full text-[12px] font-bold cursor-pointer transition-all duration-300 flex items-center gap-1
                         ${isExpanded 
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

                   {/* GET IN TOUCH CTA */}
                   <button 
                     onClick={onBookCall}
                     className={`
                       flex shrink-0 items-center gap-1.5 px-1.5 py-1 rounded-full transition-all duration-300 group/cta border ml-2 md:ml-0
                       ${theme === 'dark' ? 'border-white/20 text-white hover:bg-white/10' : 'border-black/10 text-black hover:bg-black/5'}
                     `}
                   >
                     <span className="text-[10px] font-bold whitespace-nowrap">{t.hero.cta}</span>
                     <div className={`w-5 h-5 rounded-full flex items-center justify-center transition-all duration-300 ${theme === 'dark' ? 'bg-white text-black' : 'bg-black text-white'}`}>
                        <svg className="w-3 h-3 transition-transform duration-300 group-hover/cta:rotate-[-45deg]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7-7 7M3 12h18" />
                        </svg>
                     </div>
                   </button>
                 </div>
              </div>

              {/* Dashboard Dropdown Content (Expanded) */}
              <div className={`w-full flex-1 transition-all duration-500 delay-100 flex flex-col md:grid md:grid-cols-12 gap-6 overflow-y-auto md:overflow-hidden ${isExpanded ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
                 {/* Left side: Grid of Visual Cards */}
                 <div className="w-full md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-4 shrink-0">
                    <Link href="/guestbook" className={`relative group h-[180px] md:h-auto rounded-3xl overflow-hidden border transition-all ${theme === 'dark' ? 'bg-white/5 border-white/10 hover:border-white/20' : 'bg-black/5 border-black/5 hover:border-black/10'}`}>
                       <img src="/nav/guestbook_bg.png" className="absolute inset-0 w-full h-full object-cover grayscale opacity-30 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-1000" />
                       <div className={`absolute inset-0 bg-gradient-to-t via-transparent to-transparent ${theme === 'dark' ? 'from-black/80' : 'from-white/80'}`} />
                       <div className="absolute bottom-6 left-6">
                         <div className={`w-8 h-8 rounded-full mb-3 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform ${theme === 'dark' ? 'bg-white text-black' : 'bg-black text-white'}`}>
                            {Icons.book}
                         </div>
                         <h4 className={`text-lg font-bold mb-1 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>{t.nav.moreDropdown.guestbook.title}</h4>
                         <p className={`text-[10px] leading-tight max-w-[140px] ${theme === 'dark' ? 'text-white/60' : 'text-black/60'}`}>{t.nav.moreDropdown.guestbook.desc}</p>
                       </div>
                    </Link>
                    <Link href="/bucket-list" className={`relative group h-[180px] md:h-auto rounded-3xl overflow-hidden border transition-all ${theme === 'dark' ? 'bg-white/5 border-white/10 hover:border-white/20' : 'bg-black/5 border-black/5 hover:border-black/10'}`}>
                       <img src="/nav/bucketlist_bg.png" className="absolute inset-0 w-full h-full object-cover grayscale opacity-30 group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-1000" />
                       <div className={`absolute inset-0 bg-gradient-to-t via-transparent to-transparent ${theme === 'dark' ? 'from-black/80' : 'from-white/80'}`} />
                       <div className="absolute bottom-6 left-6">
                         <div className={`w-8 h-8 rounded-full mb-3 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform ${theme === 'dark' ? 'bg-white text-black' : 'bg-black text-white'}`}>
                            {Icons.blog}
                         </div>
                         <h4 className={`text-lg font-bold mb-1 ${theme === 'dark' ? 'text-white' : 'text-black'}`}>{t.nav.moreDropdown.bucketList.title}</h4>
                         <p className={`text-[10px] leading-tight max-w-[140px] ${theme === 'dark' ? 'text-white/60' : 'text-black/60'}`}>{t.nav.moreDropdown.bucketList.desc}</p>
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
                      <Link key={link.id} href={`/${link.id}`} className={`group flex items-center gap-4 p-4 rounded-3xl border transition-all ${theme === 'dark' ? 'bg-white/5 border-white/5 hover:bg-white/10' : 'bg-black/5 border-black/5 hover:bg-black/10'}`}>
                         <div className={`w-10 h-10 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform ${theme === 'dark' ? 'bg-white/5 text-white' : 'bg-black/5 text-black'}`}>
                            {link.icon}
                         </div>
                         <div>
                            <h5 className={`text-sm font-bold ${theme === 'dark' ? 'text-white' : 'text-black'}`}>{link.title}</h5>
                            <p className={`text-[10px] line-clamp-1 ${theme === 'dark' ? 'text-white/40' : 'text-black/40'}`}>{link.desc}</p>
                         </div>
                      </Link>
                    ))}
                    <button 
                      onClick={onBookCall} 
                      className={`mt-auto w-full py-4 rounded-3xl font-bold text-xs uppercase tracking-[0.2em] shadow-xl hover:scale-105 active:scale-95 transition-all ${theme === 'dark' ? 'bg-white text-black shadow-white/5' : 'bg-black text-white shadow-black/10'}`}
                    >
                      {t.nav.bookCall}
                    </button>
                 </div>
              </div>
           </div>

           {/* RIGHT AUXILIARY PILL (Status Icon) */}
           <div className={`
             pointer-events-auto
             hidden md:flex items-center justify-center
             backdrop-blur-2xl transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)]
             ${theme === 'dark' ? 'bg-black/60 border border-white/10' : 'bg-white/70 border border-black/5'}
             ${!isGreeting && !isExpanded ? 'w-[38px] h-[38px] rounded-full opacity-100 shadow-lg' : 'w-0 h-0 opacity-0 overflow-hidden'}
           `}>
             <div className={`scale-100 animate-reveal-fade-up ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
               {activeSection === 'home' && Icons.home}
               {activeSection === 'about' && Icons.user}
               {activeSection === 'projects' && Icons.work}
               {activeSection === 'blog' && Icons.blog}
               {activeSection === 'guestbook' && Icons.book}
             </div>
           </div>
        </div>
      </div>

      {/* 3. Controls (Theme & Lang) */}
      <div className="fixed bottom-6 right-6 z-[1001] flex flex-col gap-3 pointer-events-none">
        <button 
          onClick={toggleLang} 
          className={`pointer-events-auto h-12 w-12 rounded-full backdrop-blur-xl border flex items-center justify-center text-xs font-bold hover:scale-110 transition-all shadow-lg ${theme === 'dark' ? 'bg-black/60 border-white/10 text-white' : 'bg-white/70 border-black/10 text-black'}`}
        >
          {lang === 'en' ? 'TH' : 'EN'}
        </button>
        <button 
          onClick={toggleTheme} 
          className={`pointer-events-auto h-12 w-12 rounded-full backdrop-blur-xl border flex items-center justify-center hover:scale-110 transition-all shadow-lg ${theme === 'dark' ? 'bg-black/60 border-white/10 text-white' : 'bg-white/70 border-black/10 text-black'}`}
        >
          {theme === 'dark' ? Icons.sun : Icons.moon}
        </button>
      </div>
    </>
  );
}
