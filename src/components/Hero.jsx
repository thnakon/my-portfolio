import { useState } from 'react';

export default function Hero({ t }) {
  const [copied, setCopied] = useState(false);
  const email = 'thnakon.d@gmail.com';

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center text-center px-6 pt-16 pb-20 relative">
      <div className="max-w-4xl mx-auto">
        {/* Announcement Badge */}
        <div className="hero-announcement group">
          <span className="announcement-tag">{t.hero.announcement.tag}</span>
          <div className="announcement-content">
            <span className="announcement-message ann-shimmer">
              {t.hero.announcement.message}
            </span>
            <svg className="announcement-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>

        {/* Headline */}
        <h1 className="hero-headline font-heading mb-8">
          {t.hero.headline}{' '}
          <em>{t.hero.headlineAccent}</em>
        </h1>
        
        {/* Description */}
        <p className="text-secondary text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          {t.hero.description}
        </p>
        
        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <button
            onClick={scrollToContact}
            className="btn-premium-cta"
          >
            {t.hero.cta}
            <div className="cta-arrow-circle">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7-7 7M3 12h18" />
              </svg>
            </div>
          </button>
          
          <button
            onClick={handleCopy}
            className="relative group/email flex items-center gap-3 text-secondary hover:text-primary transition-colors duration-300"
          >
            <div className="relative w-5 h-5">
              {copied ? (
                <svg className="w-5 h-5 text-green-500 transition-all duration-300 scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7M5 13l4 4L19 7" className="opacity-40" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13l4 4L23 7" />
                </svg>
              ) : (
                <svg className="w-5 h-5 opacity-70 group-hover/email:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
                </svg>
              )}
            </div>
            <span className="text-base font-light tracking-wide">{email}</span>
            
            {/* Tooltip */}
            <div className={`absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1 bg-primary text-white text-xs rounded-lg transition-all duration-300 ${copied ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'}`}>
              Copied!
            </div>
          </button>
        </div>
      </div>
      
      {/* Scroll Indicator */}
      <div className="scroll-indicator absolute bottom-10 left-1/2 flex flex-col items-center gap-2 text-muted text-sm">
        <span>{t.hero.scrollDown}</span>
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}
