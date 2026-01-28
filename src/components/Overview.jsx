import { useState, useEffect, useRef } from 'react';

export default function Overview({ t }) {
  const [isVisible, setIsVisible] = useState(false);
  const [typedDescription, setTypedDescription] = useState('');
  const [startTyping, setStartTyping] = useState(false);
  const sectionRef = useRef(null);

  const content = t.overview || {
    tag: 'OVERVIEW',
    title: 'At a',
    titleAccent: 'glance',
    description: 'A brief overview of who I am, what I do, and the value I bring to every project.',
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Start typing after a short delay to allow fade-in of header
          setTimeout(() => setStartTyping(true), 800);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!startTyping) return;

    let currentIndex = 0;
    const typingSpeed = 20; // Faster for description text
    const fullText = content.description;

    const interval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setTypedDescription(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, typingSpeed);

    return () => clearInterval(interval);
  }, [startTyping, content.description]);

  return (
    <section 
      ref={sectionRef}
      className="relative py-24 px-6 bg-[var(--bg-primary)] overflow-hidden"
    >
      {/* Fireflies Background - Same as Hero */}
      <div className="firefly-container opacity-30">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            className="firefly"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${1 + Math.random() * 2}px`,
              height: `${1 + Math.random() * 2}px`,
              '--duration': `${3 + Math.random() * 5}s`,
              '--float-duration': `${15 + Math.random() * 25}s`,
              '--end-x': `${(Math.random() - 0.5) * 200}px`,
              '--end-y': `${(Math.random() - 0.5) * 200}px`,
              animationDelay: `${Math.random() * 10}s, 0s`,
            }}
          />
        ))}
      </div>

      <div className="max-w-6xl mx-auto text-center relative z-10">
        {/* Tag - Fade In */}
        <span 
          className={`inline-block text-[10px] tracking-[0.3em] font-bold text-[var(--text-muted)] uppercase mb-6 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          {content.tag}
        </span>
        
        {/* Title - Fade In */}
        <h2 
          className={`text-3xl md:text-5xl font-heading tracking-tight mb-8 transition-all duration-1000 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          <span className="text-[var(--text-primary)]">{content.title} </span>
          <em className="overview-title-accent">{content.titleAccent}</em>
        </h2>
        
        {/* Description - Typewriter Effect */}
        <div className="min-h-[3em]"> {/* Maintain height to prevent layout shift */}
          <p className="text-base md:text-lg text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed">
            {typedDescription}
            {startTyping && typedDescription.length < content.description.length && (
              <span className="inline-block w-[2px] h-[1.1em] bg-[var(--text-primary)] ml-1 animate-blink align-middle" />
            )}
          </p>
        </div>
      </div>
    </section>
  );
}

