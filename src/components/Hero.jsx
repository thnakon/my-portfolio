export default function Hero({ t }) {
  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center text-center px-6 pt-32 pb-20 relative">
      <div className="max-w-4xl mx-auto">
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
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={scrollToContact}
            className="btn-primary px-8 py-4 rounded-full font-medium text-base inline-flex items-center justify-center gap-2"
          >
            {t.hero.cta}
            <span>→</span>
          </button>
          
          <a
            href="https://github.com/thnakon"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary px-8 py-4 rounded-full font-medium text-base inline-flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            GitHub
          </a>
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
