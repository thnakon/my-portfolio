import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

export default function Hero({ t, onGetInTouch, onImageClick }) {
  const [copied, setCopied] = useState(false);
  const [fireflies, setFireflies] = useState([]);
  const [typedText, setTypedText] = useState('');
  const [showContent, setShowContent] = useState(false);
  const [typingComplete, setTypingComplete] = useState(false);
  const email = 'thnakon.d@gmail.com';

  // Full headline text
  const fullHeadline = `${t.hero.headline} ${t.hero.headlineAccent}`;

  /* Interactive Fireflies Logic */
  const firefliesRef = useRef([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const [flies, setFlies] = useState([]);

  useEffect(() => {
    // Initialize firefly data
    const count = 40;
    const newFlies = Array.from({ length: count }).map((_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: 2 + Math.random() * 4,
      // Random wandering parameters
      angle: Math.random() * Math.PI * 2,
      speed: 0.5 + Math.random() * 1.5,
      // Appearance delay
      delay: i * 150, // 150ms stagger
    }));
    setFlies(newFlies);

    // Initialize physics state in ref to avoid re-renders
    firefliesRef.current = newFlies.map(fly => ({
      ...fly,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2
    }));

    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('mousemove', handleMouseMove);

    let animationFrameId;

    const animate = () => {
      const { x: mouseX, y: mouseY } = mouseRef.current;
      
      firefliesRef.current.forEach((fly, i) => {
        const el = document.getElementById(`firefly-${i}`);
        if (!el) return;

        // 1. Attraction to mouse (gentle pull)
        const dx = mouseX - fly.x;
        const dy = mouseY - fly.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        // Only attract if reasonably close (e.g., within 400px) or just global weak pull
        const attractionStrength = 0.0005; // Very weak global pull
        
        // 2. Random wandering (noise-like)
        fly.angle += (Math.random() - 0.5) * 0.2;
        fly.vx += Math.cos(fly.angle) * 0.05;
        fly.vy += Math.sin(fly.angle) * 0.05;

        // Apply attraction
        if (dist > 0) {
           fly.vx += (dx / dist) * attractionStrength * dist * 0.5;
           fly.vy += (dy / dist) * attractionStrength * dist * 0.5;
        }

        // Dampen velocity to prevent infinite acceleration
        fly.vx *= 0.98;
        fly.vy *= 0.98;

        // Update position
        fly.x += fly.vx;
        fly.y += fly.vy;

        // Wrap around screen edges (optional, or bounce)
        // Here we'll just let them float freely, maybe wrapping keeps them in view
        if (fly.x < -50) fly.x = window.innerWidth + 50;
        if (fly.x > window.innerWidth + 50) fly.x = -50;
        if (fly.y < -50) fly.y = window.innerHeight + 50;
        if (fly.y > window.innerHeight + 50) fly.y = -50;

        el.style.transform = `translate(${fly.x}px, ${fly.y}px)`;
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
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
    <section id="home" className="min-h-screen flex items-center justify-center text-center px-6 pt-16 pb-20 relative overflow-hidden">
      {/* Interactive Fireflies */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {flies.map((fly, i) => (
          <div
            id={`firefly-${fly.id}`}
            key={fly.id}
            className="absolute rounded-full bg-[var(--text-primary)] transition-opacity duration-1000"
            style={{
              left: 0,
              top: 0,
              width: `${fly.size}px`,
              height: `${fly.size}px`,
              opacity: 0, // Start invisible, handled by animation delay
              animation: `fadeIn 1s forwards ${fly.delay}ms`,
              boxShadow: `0 0 ${fly.size * 2}px ${fly.size / 2}px rgba(255, 255, 255, 0.3)`
            }}
          />
        ))}
        {/* Keyframes for the one-by-one appearance */}
        <style jsx>{`
          @keyframes fadeIn {
            to { opacity: 0.6; } /* Max opacity */
          }
        `}</style>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <Link href="/work">
          <div 
            className="hero-announcement group transition-all duration-700 cursor-pointer"
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
        </Link>

        {/* Headline with Typewriter Effect */}
        <h1 className="hero-headline font-heading mb-8">
          {typedHeadline}
          {typedAccent && <em> {typedAccent}</em>}
          <span className={`inline-block w-[3px] h-[1em] bg-[var(--text-primary)] ml-1 align-middle ${typingComplete ? 'opacity-0' : 'animate-blink'}`} />
        </h1>
        
        <div 
          className="text-secondary text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed transition-all duration-700 font-light flex flex-wrap items-center justify-center"
          style={{
            opacity: showContent ? 1 : 0,
            transform: showContent ? 'translateY(0)' : 'translateY(16px)',
            transitionDelay: '100ms'
          }}
        >
          {t.hero.description.split('Thanakon').map((part, index, array) => (
            <span key={index} className="flex items-center">
              {part}
              {index < array.length - 1 && (
                <span className="inline-flex items-center gap-2 align-middle mx-1">
                  <span className="text-primary">Thanakon</span>
                  <div className="relative group/avatar">
                    <img 
                      src="/images/profile-bento.jpg" 
                      alt="Thanakon" 
                      className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover border-2 border-[var(--border-color)] shadow-sm group-hover/avatar:scale-110 transition-transform duration-300 cursor-zoom-in"
                      onClick={() => onImageClick && onImageClick("/images/profile-bento.jpg", "Thanakon")}
                    />
                    <span className="absolute -top-6 -right-2 opacity-0 group-hover/avatar:opacity-100 transition-all duration-300 text-xl pointer-events-none group-hover/avatar:-translate-y-1">
                      👋
                    </span>
                  </div>
                </span>
              )}
            </span>
          ))}
        </div>
        
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
