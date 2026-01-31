import { useState, useEffect, useRef } from 'react';

export default function About({ t }) {
  const [isVisible, setIsVisible] = useState(false);
  const [typedAboutDesc, setTypedAboutDesc] = useState('');
  const [startAboutTyping, setStartAboutTyping] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          setTimeout(() => setStartAboutTyping(true), 800);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!startAboutTyping) return;
    const aboutText = t.about.subtitle || 'Behind the code and complexity';
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= aboutText.length) {
        setTypedAboutDesc(aboutText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 25);
    return () => clearInterval(interval);
  }, [startAboutTyping, t.about.subtitle]);

  return (
    <section id="about" className="relative py-32 bg-[var(--bg-primary)] overflow-hidden" ref={sectionRef}>
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="mb-24 text-center">
            <span className={`inline-block text-[10px] tracking-[0.3em] font-bold text-[var(--text-muted)] uppercase mb-6 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              {t.about.tag}
            </span>
            <h2 className={`text-3xl md:text-5xl font-heading tracking-tight mb-8 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <span className="text-[var(--text-primary)]">{t.about.title.split(' ')[0]} </span>
              <em className="overview-title-accent">{t.about.title.split(' ').slice(1).join(' ')}</em>
            </h2>
            <div className="min-h-[2em]">
              <p className="text-base md:text-lg text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed">
                {typedAboutDesc}
                {startAboutTyping && typedAboutDesc.length < (t.about.subtitle || '').length && (
                  <span className="inline-block w-[2px] h-[1.1em] bg-[var(--text-primary)] ml-1 animate-blink align-middle" />
                )}
              </p>
            </div>
        </div>
        
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-20 items-stretch">
          {/* Left Side: Bio & Details */}
          <div className={`lg:col-span-7 order-2 lg:order-1 flex flex-col transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
            <h3 className="text-xl md:text-2xl font-body font-bold text-[var(--text-primary)] mb-6 leading-relaxed">
              {t.about.highlight}
            </h3>
            
            <p className="text-[var(--text-secondary)] text-base md:text-lg leading-relaxed mb-10 font-medium whitespace-pre-wrap">
              {t.about.bio}
            </p>

            <div className="mt-auto">
              {/* Social Links */}
              <div className="flex flex-wrap gap-8 mb-6">
                <a 
                  href="https://www.linkedin.com/public-profile/settings?trk=d_flagship3_profile_self_view_public_profile" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:-translate-y-1 transition-all"
                  title="LinkedIn"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                  </svg>
                </a>

                <a 
                  href="https://github.com/thnakon" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:-translate-y-1 transition-all"
                  title="GitHub"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.627-5.373-12-12-12z" />
                  </svg>
                </a>

                <a 
                  href="https://x.com/Obounwarm" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:-translate-y-1 transition-all"
                  title="X (Twitter)"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
              </div>

              <a 
                href="#experience" 
                className="group inline-flex items-center gap-3 text-sm font-bold tracking-wider text-[var(--text-primary)] hover:gap-5 transition-all duration-300 mb-6"
              >
                <span>{t.about.workExperience}</span>
                <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              
              <div className="w-full border-t border-[var(--border-color)] translate-y-6" />
            </div>
          </div>

          {/* Right Side: Image/Visual */}
          <div className={`lg:col-span-5 order-1 lg:order-2 relative group transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
             <div className="relative aspect-[3/4] max-w-[450px] mx-auto">
                {/* Decorative Frames */}
                <div className="absolute inset-0 border border-[var(--border-color)] rounded-3xl translate-x-6 translate-y-6 transition-transform duration-700 group-hover:translate-x-8 group-hover:translate-y-8" />
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-3xl -rotate-6 scale-[0.9] blur-xl opacity-0 group-hover:opacity-100 transition-all duration-700" />
                
                {/* Main Image Container */}
                <div className="absolute inset-0 bg-[var(--bg-secondary)] rounded-3xl border border-[var(--border-color)] overflow-hidden shadow-2xl flex items-center justify-center group-hover:border-[var(--text-primary)]/30 transition-all duration-700">
                    <img 
                      src="/images/profile-bento.jpg" 
                      alt="Thanakon" 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    {/* Floating Info Badge */}
                    <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-[var(--bg-primary)]/80 backdrop-blur-md border border-[var(--border-color)] transform translate-y-12 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700 delay-100 font-mono text-[10px]">
                        <div className="flex justify-between items-center mb-1">
                            <span className="text-[var(--text-muted)]">SYSTEM_STATUS</span>
                            <span className="text-emerald-400">ACTIVE</span>
                        </div>
                        <div className="h-1 w-full bg-[var(--border-color)] rounded-full overflow-hidden">
                           <div className="h-full bg-emerald-400 w-[95%] animate-pulse" />
                        </div>
                    </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
}
