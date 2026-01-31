import { useState, useEffect } from 'react';

export default function Hero({ t, onGetInTouch }) {
  const [copied, setCopied] = useState(false);
  const [fireflies, setFireflies] = useState([]);
  const [typedText, setTypedText] = useState('');
  const [showContent, setShowContent] = useState(false);
  const [typingComplete, setTypingComplete] = useState(false);
  const email = 'thnakon.d@gmail.com';

  // Full headline text
  const fullHeadline = `${t.hero.headline} ${t.hero.headlineAccent}`;

  useEffect(() => {
    const flies = Array.from({ length: 150 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: `${1 + Math.random() * 3}px`,
      duration: `${3 + Math.random() * 5}s`,
      floatDuration: `${15 + Math.random() * 25}s`,
      delay: `${Math.random() * 10}s`,
      endX: `${(Math.random() - 0.5) * 300}px`,
      endY: `${(Math.random() - 0.5) * 300}px`,
    }));
    setFireflies(flies);
  }, []);

  // Typewriter effect - synced with navbar greeting (2 seconds)
  useEffect(() => {
    let currentIndex = 0;
    // Calculate typing speed to finish in ~2 seconds (same as navbar greeting)
    const totalDuration = 2000; // 2 seconds
    const typingSpeed = Math.max(30, totalDuration / fullHeadline.length);

    const typeInterval = setInterval(() => {
      if (currentIndex <= fullHeadline.length) {
        setTypedText(fullHeadline.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(typeInterval);
        setTypingComplete(true);
        // Start fading in content after typing is complete
        setTimeout(() => {
          setShowContent(true);
        }, 200);
      }
    }, typingSpeed);

    return () => clearInterval(typeInterval);
  }, [fullHeadline]);

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

  // Split typed text to apply accent styling
  const headlineLength = t.hero.headline.length;
  const typedHeadline = typedText.slice(0, headlineLength);
  const typedAccent = typedText.slice(headlineLength + 1); // +1 for the space

  return (
    <section id="home" className="min-h-screen flex items-center justify-center text-center px-6 pt-16 pb-20 relative snap-start snap-always">
      {/* Fireflies Background */}
      <div className="firefly-container">
        {fireflies.map((fly) => (
          <div
            key={fly.id}
            className="firefly"
            style={{
              left: fly.left,
              top: fly.top,
              width: fly.size,
              height: fly.size,
              '--duration': fly.duration,
              '--float-duration': fly.floatDuration,
              '--delay': fly.delay,
              '--end-x': fly.endX,
              '--end-y': fly.endY,
              animationDelay: `${fly.delay}, 0s`,
            }}
          />
        ))}
      </div>

      <div className="max-w-4xl mx-auto">
        {/* Announcement Badge - Hidden until typing completes */}
        <div 
          className="hero-announcement group transition-all duration-700"
          style={{
            opacity: showContent ? 1 : 0,
            transform: showContent ? 'translateY(0)' : 'translateY(-16px)',
            pointerEvents: showContent ? 'auto' : 'none'
          }}
        >
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

        {/* Headline with Typewriter Effect */}
        <h1 className="hero-headline font-heading mb-8">
          {typedHeadline}
          {typedAccent && <em> {typedAccent}</em>}
          <span className={`inline-block w-[3px] h-[1em] bg-[var(--text-primary)] ml-1 align-middle ${typingComplete ? 'opacity-0' : 'animate-blink'}`} />
        </h1>
        
        {/* Description */}
        <p 
          className="text-secondary text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed transition-all duration-700"
          style={{
            opacity: showContent ? 1 : 0,
            transform: showContent ? 'translateY(0)' : 'translateY(16px)',
            transitionDelay: '100ms'
          }}
        >
          {t.hero.description.split('Thanakon').map((part, index, array) => (
            <span key={index}>
              {part}
              {index < array.length - 1 && (
                <span className="inline-flex items-center gap-2 align-middle mx-1">
                  <span className="text-primary">Thanakon</span>
                  <img 
                    src="/images/profile-bento.jpg" 
                    alt="Thanakon" 
                    className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover border-2 border-[var(--border-color)] shadow-sm hover:scale-110 transition-transform duration-300"
                  />
                </span>
              )}
            </span>
          ))}
        </p>
        
        {/* CTA Buttons */}
        <div 
          className="flex flex-col sm:flex-row gap-6 justify-center items-center transition-all duration-700"
          style={{
            opacity: showContent ? 1 : 0,
            transform: showContent ? 'translateY(0)' : 'translateY(16px)',
            transitionDelay: '200ms',
            pointerEvents: showContent ? 'auto' : 'none'
          }}
        >
          <button
            onClick={onGetInTouch}
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
    </section>
  );
}
