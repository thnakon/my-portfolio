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
    { id: 'skills', label: t.nav.skills },
    { id: 'projects', label: t.nav.projects },
    { id: 'contact', label: t.nav.contact },
  ];

  return (
    <>
      {/* Header Container for Logo & Command */}
      <div className="fixed top-0 left-0 right-0 z-[1001] pointer-events-none">
        <div className="max-w-[1200px] mx-auto px-6 h-[70px] flex items-center justify-between">
          {/* Logo */}
          <div className="pointer-events-auto flex items-center h-10">
            <img 
              src={theme === 'dark' ? '/logo-light.png' : '/logo-dark.png'} 
              alt="Logo" 
              className="h-10 w-auto cursor-pointer transition-transform duration-200 hover:opacity-80 active:scale-90"
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                setActiveSection('home');
              }}
            />
          </div>

          {/* Command Icon */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="pointer-events-auto flex items-center justify-center h-9 w-9 text-primary hover:opacity-80 transition-opacity active:scale-90"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3z" />
            </svg>
          </button>
        </div>
      </div>

      <nav className="navbar">
        <div className="flex items-center gap-2">
          {/* Desktop Navigation */}
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`nav-item hidden md:block ${activeSection === item.id ? 'active' : ''}`}
            >
              {item.label}
            </button>
          ))}
          
          {/* Divider */}
          <div className="nav-divider hidden md:block"></div>
          
          {/* Language Toggle */}
          <button onClick={toggleLang} className="lang-toggle">
            {lang === 'en' ? 'TH' : 'EN'}
          </button>
          
          {/* Theme Toggle */}
          <button onClick={toggleTheme} className="toggle-btn">
            {theme === 'dark' ? Icons.sun : Icons.moon}
          </button>
          
          {/* Book a Call CTA */}
          <button onClick={onBookCall} className="nav-cta hidden sm:block">
            {t.nav.bookCall}
          </button>
          
          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="toggle-btn md:hidden"
          >
            {mobileMenuOpen ? Icons.close : Icons.menu}
          </button>
        </div>
      </nav>

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
