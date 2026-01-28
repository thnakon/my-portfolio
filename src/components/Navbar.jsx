import { useState, useEffect } from 'react';

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
  menu: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  ),
  close: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  ),
};

export default function Navbar({ t, lang, setLang, theme, setTheme, onBookCall }) {
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showGreeting, setShowGreeting] = useState(true);
  const [moreMenuOpen, setMoreMenuOpen] = useState(false);

  // Get time-based greeting
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return t.nav.greetings.morning;
    if (hour >= 12 && hour < 17) return t.nav.greetings.afternoon;
    if (hour >= 17 && hour < 21) return t.nav.greetings.evening;
    return t.nav.greetings.night;
  };

  // Transition from greeting to nav after 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowGreeting(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      
      const sections = ['home', 'about', 'skills', 'projects', 'contact'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

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
    { id: 'home', label: t.nav.home },
    { id: 'about', label: t.nav.about },
    { id: 'projects', label: t.nav.work }, // 'projects' section ID for 'Work'
    { id: 'blog', label: t.nav.blog },
    { id: 'more', label: t.nav.more, hasArrow: true },
  ];

  return (
    <>
      {/* Header Container for Logo & Command - Mobile Only */}
      <div className="fixed top-[16px] left-0 right-0 z-[1001] pointer-events-none flex justify-center md:hidden">
        <div className="pointer-events-auto flex items-center justify-between h-[50px] 
             w-[calc(100%-32px)] 
             px-4 
             rounded-full
             bg-[rgba(255,255,255,0.05)] 
             backdrop-blur-md
             border border-white/10 
             shadow-lg
             transition-all duration-300">
          {/* Logo */}
          <div className="pointer-events-auto flex items-center h-10">
            <img 
              src={theme === 'dark' ? '/logo-light.png' : '/logo-dark.png'} 
              alt="Logo" 
              className="h-9 w-auto cursor-pointer transition-transform duration-200 hover:opacity-80 active:scale-90"
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                setActiveSection('home');
              }}
            />
          </div>

          {/* Command Icon */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="pointer-events-auto flex items-center justify-center h-8 w-8 text-primary hover:opacity-80 transition-opacity active:scale-90"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Desktop Logo & Command - Aligned with Container */}
      <div className="hidden md:flex fixed top-[16px] left-0 right-0 z-[999] pointer-events-none">
        <div className="max-w-[1200px] w-full mx-auto px-6 flex items-center justify-between h-[50px]">
          {/* Logo */}
          <div className="pointer-events-auto">
            <img 
              src={theme === 'dark' ? '/logo-light.png' : '/logo-dark.png'} 
              alt="Logo" 
              className="h-9 w-auto cursor-pointer transition-transform duration-200 hover:opacity-80 active:scale-90"
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                setActiveSection('home');
              }}
            />
          </div>

          {/* Command Icon */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="pointer-events-auto flex items-center justify-center h-8 w-8 text-primary hover:opacity-80 transition-opacity active:scale-90"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3z" />
            </svg>
          </button>
        </div>
      </div>

      <nav className="navbar hidden md:block">
        <div className="relative flex items-center justify-center min-w-[400px] min-h-[36px]">
          {/* Greeting Message */}
          <div 
            className={`absolute inset-0 flex items-center justify-center px-4 py-2 text-primary font-medium whitespace-nowrap transition-all duration-700 ease-out ${
              showGreeting 
                ? 'opacity-100 transform translate-y-0' 
                : 'opacity-0 transform -translate-y-4 pointer-events-none'
            }`}
          >
            <span className={showGreeting ? 'animate-reveal-text' : ''}>
              {getGreeting()}
            </span>
          </div>
          
          {/* Normal Navigation */}
          <div 
            className={`flex items-center gap-2 transition-all duration-700 ease-out ${
              showGreeting 
                ? 'opacity-0 transform translate-y-4 pointer-events-none' 
                : 'opacity-100 transform translate-y-0 pointer-events-auto'
            }`}
          >
            {navItems.map((item) => (
              <div 
                key={item.id} 
                className="relative"
                onMouseEnter={() => item.id === 'more' && setMoreMenuOpen(true)}
                onMouseLeave={() => item.id === 'more' && setMoreMenuOpen(false)}
              >
                <button
                  onClick={() => {
                     if (item.id === 'more') return;
                     scrollToSection(item.id);
                  }}
                  className={`nav-item flex items-center gap-1 ${activeSection === item.id ? 'active' : ''}`}
                >
                  {item.label}
                  {item.hasArrow && (
                     <svg className={`w-3 h-3 mt-0.5 transition-transform duration-300 ${moreMenuOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                     </svg>
                  )}
                </button>

                {/* More Dropdown Menu */}
                {item.id === 'more' && (
                  <div className={`absolute top-full left-1/2 -translate-x-1/2 pt-4 transition-all duration-300 ${moreMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'}`}>
                    <div className="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-2xl shadow-2xl p-4 flex gap-4 w-[600px] backdrop-blur-xl">
                      {/* Left: Featured Cards */}
                      <div className="flex gap-4 flex-1">
                        {/* Guestbook Card */}
                        <div className="relative group w-1/2 aspect-[4/5] rounded-xl overflow-hidden cursor-pointer shadow-lg border border-[var(--border-color)]">
                          <img src="/nav/guestbook_bg.png" alt="Guestbook" className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                          <div className="absolute bottom-5 left-5 right-5">
                            <h4 className="!text-white font-bold text-lg mb-1 drop-shadow-md">{t.nav.moreDropdown.guestbook.title}</h4>
                            <p className="!text-white/80 text-[11px] leading-tight drop-shadow-sm">{t.nav.moreDropdown.guestbook.desc}</p>
                          </div>
                        </div>
                        {/* Bucket List Card */}
                        <div className="relative group w-1/2 aspect-[4/5] rounded-xl overflow-hidden cursor-pointer shadow-lg border border-[var(--border-color)]">
                          <img src="/nav/bucketlist_bg.png" alt="Bucket List" className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                          <div className="absolute bottom-5 left-5 right-5">
                            <h4 className="!text-white font-bold text-lg mb-1 drop-shadow-md">{t.nav.moreDropdown.bucketList.title}</h4>
                            <p className="!text-white/80 text-[11px] leading-tight drop-shadow-sm">{t.nav.moreDropdown.bucketList.desc}</p>
                          </div>
                        </div>
                      </div>

                      {/* Right: Quick Links */}
                      <div className="w-[240px] flex flex-col justify-between py-1">
                        {[
                          { id: 'links', icon: (
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                            </svg>
                          ), ...t.nav.moreDropdown.links },
                          { id: 'uses', icon: (
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                            </svg>
                          ), ...t.nav.moreDropdown.uses },
                          { id: 'attribution', icon: (
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                            </svg>
                          ), ...t.nav.moreDropdown.attribution }
                        ].map((link) => (
                          <div key={link.id} className="group flex items-center gap-4 p-4 rounded-xl hover:bg-[var(--bg-tertiary)] cursor-pointer transition-all duration-200">
                            <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-[var(--bg-tertiary)] text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors shadow-sm">
                              {link.icon}
                            </div>
                            <div>
                              <h5 className="text-[13px] font-bold text-[var(--text-primary)]">{link.title}</h5>
                              <p className="text-[10px] text-[var(--text-secondary)] line-clamp-1">{link.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
            
            {/* Book a Call CTA */}
            <button onClick={onBookCall} className="btn-premium-nav">
              {t.nav.bookCall}
              <div className="nav-arrow-circle">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7-7 7M3 12h18" />
                </svg>
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Bottom Right Controls */}
      <div className="fixed bottom-6 right-6 z-[999] flex flex-col gap-3">
        {/* Language Toggle */}
        <button 
          onClick={toggleLang} 
          className="h-10 w-10 flex items-center justify-center text-xs font-bold hover:scale-110 transition-transform text-secondary hover:text-primary"
        >
          {lang === 'en' ? 'TH' : 'EN'}
        </button>
        
        {/* Theme Toggle */}
        <button 
          onClick={toggleTheme} 
          className="h-10 w-10 flex items-center justify-center hover:scale-110 transition-transform text-secondary hover:text-primary"
        >
          {theme === 'dark' ? Icons.sun : Icons.moon}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      <div className={`mobile-nav ${mobileMenuOpen ? 'active' : ''}`}>
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => scrollToSection(item.id)}
            className={`nav-item w-full text-center ${activeSection === item.id ? 'active' : ''}`}
          >
            {item.label}
          </button>
        ))}
        <button onClick={onBookCall} className="nav-cta w-full mt-2">
          {t.nav.bookCall}
        </button>
      </div>
    </>
  );
}
