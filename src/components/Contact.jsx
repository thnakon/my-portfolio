import { useEffect, useRef, useState } from 'react';
import confetti from 'canvas-confetti';

export default function Contact({ t, onGetInTouch }) {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [typedSubtitle, setTypedSubtitle] = useState('');
  const [startTyping, setStartTyping] = useState(false);
  const hasFired = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          setTimeout(() => setStartTyping(true), 1200);
          if (!hasFired.current) {
            triggerConfetti();
            hasFired.current = true;
          }
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!startTyping) return;
    const text = t.contact.subtitle || '';
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= text.length) {
        setTypedSubtitle(text.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 20);
    return () => clearInterval(interval);
  }, [startTyping, t.contact.subtitle]);

  const triggerConfetti = () => {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min, max) => Math.random() * (max - min) + min;

    const interval = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);
  };

  const titleParts = t.contact.title.split(' ');
  const firstPart = titleParts[0];
  const restParts = titleParts.slice(1).join(' ');

  return (
    <section id="contact" className="py-32 overflow-hidden bg-[var(--bg-primary)]" ref={sectionRef}>
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          
          {/* Tag Animation */}
          <span className={`inline-block text-[10px] tracking-[0.3em] font-bold text-[var(--text-muted)] uppercase mb-6 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            {t.contact.tag || "FINAL CHAPTER"}
          </span>

          {/* Title Animation */}
          <h2 className={`text-3xl md:text-5xl lg:text-7xl font-heading tracking-tight mb-8 transition-all duration-1000 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            <span className="text-[var(--text-primary)]">{firstPart} </span>
            <em className="overview-title-accent">{restParts}</em>
          </h2>

          {/* Subtitle with Typewriter Effect */}
          <div className="min-h-[4em] md:min-h-[3em] flex items-center justify-center mb-12">
            <p className={`text-base md:text-xl text-[var(--text-secondary)] leading-relaxed font-light transition-all duration-700 ${
              isVisible ? 'opacity-80' : 'opacity-0'
            }`}>
              {typedSubtitle}
              {startTyping && typedSubtitle.length < (t.contact.subtitle || '').length && (
                <span className="inline-block w-[2px] h-[1.1em] bg-[var(--text-primary)] ml-1 animate-blink align-middle" />
              )}
            </p>
          </div>
          
          {/* Button Animation */}
          <div className={`flex justify-center transition-all duration-1000 delay-1000 ${
            isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
          }`}>
            <button
               onClick={onGetInTouch}
               className="btn-premium-cta"
            >
               {t.hero.cta || "Get In Touch"}
               <div className="cta-arrow-circle">
                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7-7 7M3 12h18" />
                 </svg>
               </div>
            </button>
          </div>
          
        </div>
      </div>
    </section>
  );
}
