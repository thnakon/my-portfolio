import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

const BentoCard = ({ children, className, isVisible, delay = 0, href }) => {
  const commonClasses = `relative group overflow-hidden bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-[32px] p-6 transition-all duration-1000 ${
    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
  } ${className} ${href ? 'cursor-pointer' : ''}`;

  const innerContent = (
    <>
      {children}
      
      {/* Hover Arrow Indicator */}
      <div className="absolute bottom-5 right-5 z-20 opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500 pointer-events-none">
        <div className="inline-flex items-center justify-center w-8 h-8 rounded-full border border-[var(--border-color)] bg-[var(--bg-primary)]/40 backdrop-blur-md shadow-2xl">
          <svg className="w-3.5 h-3.5 text-[var(--text-muted)] group-hover:text-[var(--text-primary)] transition-all duration-300 transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>
      </div>
    </>
  );

  if (href) {
    return (
      <Link 
        href={href} 
        className={commonClasses}
        style={{ transitionDelay: `${delay}ms` }}
      >
        {innerContent}
      </Link>
    );
  }

  return (
    <div 
      className={commonClasses}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {innerContent}
    </div>
  );
};

export default function MySite({ t }) {
  const [isVisible, setIsVisible] = useState(false);
  const [typedSubtitle, setTypedSubtitle] = useState('');
  const [startTyping, setStartTyping] = useState(false);
  const sectionRef = useRef(null);
  const siteInfo = t.mySite;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          setTimeout(() => setStartTyping(true), 800);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!startTyping) return;
    const text = siteInfo.subtitle || '';
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= text.length) {
        setTypedSubtitle(text.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 25);
    return () => clearInterval(interval);
  }, [startTyping, siteInfo.subtitle]);

  return (
    <div ref={sectionRef} className="mt-32">
      {/* Centered Header */}
      <div className="text-center mb-16">
        <span className={`inline-block text-[10px] tracking-[0.3em] font-bold text-[var(--text-muted)] uppercase mb-6 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          {siteInfo.tag}
        </span>
        <h3 className={`text-3xl md:text-5xl font-heading tracking-tight mb-8 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <span className="text-[var(--text-primary)]">{siteInfo.title.split(' ')[0]} </span>
          <em className="overview-title-accent">{siteInfo.title.split(' ').slice(1).join(' ')}</em>
        </h3>
        <div className="min-h-[2em]">
          <p className={`text-base md:text-lg text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            {typedSubtitle}
            {startTyping && typedSubtitle.length < (siteInfo.subtitle || '').length && (
              <span className="inline-block w-[2px] h-[1.1em] bg-[var(--text-primary)] ml-1 animate-blink align-middle" />
            )}
          </p>
        </div>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 w-full max-w-6xl mx-auto">
        
        <BentoCard className="md:col-span-4 flex flex-col min-h-[300px] group/card overflow-hidden" isVisible={isVisible} delay={200} href="/uses">
          {/* Decorative Spotlight */}
          <div className="absolute -top-24 -left-24 w-48 h-48 bg-blue-500/10 rounded-full blur-[80px] group-hover/card:bg-blue-500/20 transition-colors duration-1000" />
          
          {/* Text at Top */}
          <div className="relative z-10 flex flex-col items-center text-center mb-6">
            <div className="flex items-center gap-2 mb-2 justify-center">
               <span className="text-[9px] font-bold tracking-[0.3em] text-[var(--text-muted)] uppercase">{t.mySite.toolsTag}</span>
            </div>
            <h4 className="text-sm font-heading text-[var(--text-secondary)] group-hover/card:text-[var(--text-primary)] transition-colors duration-500 leading-tight px-4">
               {t.mySite.toolsTitle}
            </h4>
          </div>

          <div className="relative flex-1 flex items-end justify-center">
             {/* iPhone Mockup - Anchored to bottom */}
             <div className="relative w-48 h-44 rounded-t-[2.5rem] border-[6px] border-b-0 border-[#1a1a1b] bg-black shadow-2xl transition-all duration-700 group-hover/card:scale-105 group-hover/card:-translate-y-2 group-hover/card:-rotate-2 overflow-hidden translate-y-8 group-hover/card:translate-y-4">
                {/* Screen Content */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 overflow-hidden">
                   {/* Wallpaper Abstract */}
                   <div className="absolute inset-0 opacity-40">
                      <div className="absolute top-[-10%] left-[-10%] w-[120%] h-1/2 bg-white/30 blur-[40px] rounded-full animate-pulse" />
                      <div className="absolute bottom-[-10%] right-[-10%] w-[120%] h-1/2 bg-[var(--bg-primary)]/20 blur-[40px] rounded-full" />
                   </div>

                   {/* DYNAMIC ISLAND */}
                   <div className="absolute top-3 left-1/2 -translate-x-1/2 z-50">
                      <div className="relative flex items-center justify-center">
                         <div className="w-[4.5rem] h-[1.125rem] bg-black rounded-full transition-all duration-700 ease-[cubic-bezier(0.175,0.885,0.32,1.275)] group-hover/card:w-[8.5rem] group-hover/card:h-12 group-hover/card:rounded-[1.25rem] flex items-center justify-center overflow-hidden">
                            {/* Island Content - Revealed on Hover */}
                            <div className="flex gap-2.5 opacity-0 group-hover/card:opacity-100 transition-opacity duration-300 delay-150">
                               {siteInfo.tech.slice(0, 3).map((tech, i) => (
                                  <img 
                                    key={i}
                                    src={`https://skillicons.dev/icons?i=${tech.icon}`} 
                                    className="w-5 h-5 object-contain"
                                    alt={tech.name}
                                  />
                               ))}
                            </div>
                         </div>
                      </div>
                   </div>

                   {/* App Grid */}
                   <div className="absolute top-9 left-3 right-3 grid grid-cols-4 gap-x-2 gap-y-2 opacity-80 group-hover/card:opacity-100 transition-opacity duration-500">
                      {[
                        { name: 'Notion', icon: 'notion' },
                        { name: 'Figma', icon: 'figma' },
                        { name: 'Warp', icon: 'bash' },
                        { name: 'VS Code', icon: 'vscode' },
                        { name: 'API', icon: 'postman' },
                        { name: 'Slack', icon: 'slack' },
                        { name: 'Chrome', icon: 'chrome' },
                        { name: 'GitHub', icon: 'github' }
                      ].map((app, i) => (
                        <div key={i} className="flex flex-col items-center gap-1 group/app">
                           <div className="w-7 h-7 rounded-[8px] bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-sm group-hover/app:scale-110 transition-transform duration-300">
                              <img 
                                src={`https://skillicons.dev/icons?i=${app.icon}`} 
                                className="w-4 h-4 object-contain"
                                alt={app.name}
                              />
                           </div>
                           <span className="text-[5px] text-white/80 font-bold truncate w-full text-center tracking-tighter shadow-sm">{app.name}</span>
                        </div>
                      ))}
                   </div>

                   {/* Footer Bar */}
                   <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-1/3 h-1 bg-white/20 opacity-50 rounded-full" />
                </div>
             </div>
          </div>
        </BentoCard>

        {/* Card 2: Guestbook / Note Interaction */}
        <BentoCard className="md:col-span-4 flex flex-col min-h-[300px] bg-[#0c0c0d] border-white/5 group/guest overflow-hidden" isVisible={isVisible} delay={400} href="/guestbook">
           {/* macOS Notes Background Lighting */}
           <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-transparent opacity-50" />
           
           {/* Text at Top */}
           <div className="relative z-10 flex flex-col items-center text-center mb-6">
              <span className="text-[9px] font-bold tracking-[0.3em] text-[var(--text-muted)] uppercase mb-1 block">{t.mySite.guestbookTag}</span>
              <h4 className="text-sm font-heading text-[var(--text-secondary)] group-hover/guest:text-[var(--text-primary)] transition-colors duration-500 tracking-wide">{t.mySite.guestbookTitle}</h4>
           </div>

           <div className="relative flex-1 flex flex-col items-center justify-end">
              {/* macOS NOTE Component - Anchored to bottom */}
              <div className="relative w-44 h-52 bg-white rounded-t-2xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] overflow-hidden transition-all duration-700 group-hover/guest:scale-105 group-hover/guest:-rotate-2 group-hover/guest:shadow-[0_30px_60px_rgba(0,0,0,0.4)] translate-y-8 group-hover/guest:translate-y-4">
                 {/* Note Header (The Yellow Part) */}
                 <div className="h-12 bg-[#ffd54f] flex items-center justify-between px-4 border-b border-black/5">
                    <div className="flex gap-1.5">
                       <div className="w-2 h-2 rounded-full bg-black/10" />
                       <div className="w-2 h-2 rounded-full bg-black/10" />
                    </div>
                    {/* Pencil Icon */}
                    <svg className="w-4 h-4 text-black/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                    </svg>
                 </div>
                 
                 {/* Note Body (Lined Paper) */}
                 <div className="p-4 space-y-4">
                    <div className="h-4 w-3/4 bg-black/[0.03] rounded" />
                    
                    {/* Horizontal Lines */}
                    <div className="space-y-4 pt-2">
                       {[1, 2, 3, 4].map((i) => (
                          <div key={i} className="h-[1px] w-full bg-black/[0.06] relative">
                             {i === 1 && (
                                <div className="absolute -top-1 left-0 h-3 w-[60%] overflow-hidden">
                                   <div className="h-full w-full bg-gradient-to-r from-transparent via-blue-400/20 to-transparent -translate-x-full group-hover/guest:translate-x-full transition-transform duration-[2000ms] ease-in-out" />
                                </div>
                             )}
                          </div>
                       ))}
                    </div>

                    {/* Bottom Subtle Text */}
                    <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
                       <span className="text-[7px] font-bold text-black/20 uppercase tracking-widest">Guestbook</span>
                       <span className="text-[7px] font-mono text-black/10">v1.2</span>
                    </div>
                 </div>
              </div>
           </div>
        </BentoCard>

        {/* Card 3: Vinyl Record Player (Spans 4 cols) */}
        <BentoCard className="md:col-span-4 flex flex-col justify-between min-h-[200px] bg-[#030303] border-white/5 group/music" isVisible={isVisible} delay={600}>
           {/* Visual Backdrop */}
           <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-red-600/10 to-transparent opacity-40 group-hover/music:opacity-60 transition-opacity duration-1000" />

           <div className="flex items-center justify-between mb-2 relative z-10">
              <div className="flex items-center gap-2">
                 <div className="w-5 h-5 bg-red-600 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(220,38,38,0.5)]">
                    <svg className="w-2.5 h-2.5 text-white fill-current translate-x-[0.5px]" viewBox="0 0 24 24">
                       <path d="M8 5v14l11-7z"/>
                    </svg>
                 </div>
                 <span className="text-[9px] font-bold tracking-[0.2em] text-[var(--text-secondary)] uppercase">{t.mySite.musicTag}</span>
              </div>
           </div>
           
           <div className="flex-1 flex items-center gap-5 relative z-10">
              {/* Spinning Record Link */}
              <a 
                href="https://music.youtube.com/watch?v=GCkhFdMdGOY&si=oT5-ZZo2iINeje57" 
                target="_blank" 
                rel="noopener noreferrer"
                className="relative w-24 h-24 aspect-square flex-shrink-0 block cursor-pointer group/vinyl"
                title="Play on YouTube Music"
              >
                 {/* Outer Record Ring - Always Spinning */}
                 <div className="absolute inset-0 bg-black rounded-full border-2 border-white/10 shadow-2xl overflow-hidden animate-spin-slow transition-all duration-1000" style={{ animationDuration: '6s' }}>
                    {/* Record Texture / Grooves */}
                    <div className="absolute inset-0 opacity-40" style={{ backgroundImage: 'repeating-radial-gradient(circle, #222 0px, transparent 1px, #222 2px)' }} />
                    <div className="absolute inset-2 rounded-full border border-white/5" />
                    
                    {/* The Album Cover as Center Label */}
                    <div className="absolute inset-[15%] rounded-full overflow-hidden border-2 border-black/50 pointer-events-none">
                       <img src="/images/music-cover.png" className="w-full h-full object-cover" alt="Album Cover" />
                    </div>
                 </div>
                 {/* Center Hole */}
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-black rounded-full border border-white/20 z-10 shadow-inner" />
              </a>

              {/* Song Info */}
              <div className="flex flex-col gap-1.5">
                 <h4 className="text-sm font-heading text-white line-clamp-2 leading-tight group-hover/music:text-red-500 transition-colors uppercase tracking-wide">{t.mySite.musicTitle}</h4>
                 <p className="text-[10px] text-[var(--text-secondary)] font-medium font-body italic">{t.mySite.musicArtist}</p>
                 <div className="mt-2 flex gap-0.5 items-end h-3">
                    {[0.6, 1.2, 0.8, 1.5, 1.0].map((h, i) => (
                       <div key={i} className={`w-0.5 bg-red-500 rounded-full animate-pulse`} style={{ height: `${h * 100}%`, animationDelay: `${i * 0.15}s` }} />
                    ))}
                 </div>
              </div>
           </div>

           <div className="relative mt-6 z-10 space-y-3">
              {/* Controls and Track info Aligned */}
              <div className="flex items-center justify-between px-1">
                 <span className="text-[8px] font-mono text-[var(--text-muted)] uppercase tracking-tighter">YT MUSIC</span>
                 <div className="flex items-center gap-4">
                    <svg className="w-3.5 h-3.5 text-white/30 hover:text-white transition-colors cursor-pointer" fill="currentColor" viewBox="0 0 24 24"><path d="M6 6h2v12H6zm3.5 6L18 18V6z"/></svg>
                    <svg className="w-5 h-5 text-white hover:scale-110 transition-transform cursor-pointer" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                    <svg className="w-3.5 h-3.5 text-white/30 hover:text-white transition-colors cursor-pointer" fill="currentColor" viewBox="0 0 24 24"><path d="M16 6h2v12h-2zm-10 6L14.5 18V6z"/></svg>
                 </div>
                 <span className="text-[8px] font-mono text-[var(--text-muted)] tracking-tighter">03:42</span>
              </div>
              
              {/* Progress Bar */}
              <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                 <div className="h-full bg-red-600 w-[68%] rounded-full shadow-[0_0_8px_rgba(220,38,38,0.4)]" />
              </div>
           </div>
        </BentoCard>
      </div>
    </div>
  );
}
