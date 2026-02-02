import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import confetti from 'canvas-confetti';

export default function Overview({ t }) {
  const [isVisible, setIsVisible] = useState(false);
  const [typedDescription, setTypedDescription] = useState('');
  const sectionRef = useRef(null);

  const content = t.overview || {
    tag: 'OVERVIEW',
    title: 'At a',
    titleAccent: 'glance',
    description: 'A brief overview of who I am, what I do, and the value I bring to every project.',
  };

  const bento = t.bento || {
    collaboration: {
      tag: 'ONE WORKFLOW',
      title: 'Integrated Solutions',
      subtitle: 'Every project handled in one seamless pipeline.',
    },
    remote: {
      tag: 'ALERTS',
      location: 'THAILAND',
      title: "Never miss a beat",
    },
    cta: {
      title: "Ready to start?",
      email: 'thnakon.d@gmail.com',
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;
    let currentIndex = 0;
    const fullText = content.description;
    const interval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setTypedDescription(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 15);
    return () => clearInterval(interval);
  }, [isVisible, content.description]);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(bento.cta.email);
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#3b82f6', '#ffffff', '#000000']
    });
  };

  return (
    <section 
      ref={sectionRef}
      className="relative py-32 bg-[var(--bg-primary)] overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        
        {/* Minimal Header */}
        <div className="mb-20 text-center">
          <span className={`inline-block text-[10px] tracking-[0.4em] font-bold text-[var(--text-muted)] uppercase mb-4 transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
            {content.tag}
          </span>
          <h2 className={`text-4xl md:text-5xl font-heading tracking-tight mb-6 transition-all duration-1000 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
            {content.title} <em className="overview-title-accent not-italic">{content.titleAccent}</em>
          </h2>
          <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed opacity-80">
            {typedDescription}
            {typedDescription.length < content.description.length && (
              <span className="inline-block w-[3px] h-[1em] bg-[var(--text-primary)] ml-1 animate-blink align-middle" />
            )}
          </p>
        </div>

        {/* New Dashboard-Style Bento Grid */}
        <div className={`grid grid-cols-1 md:grid-cols-12 gap-5 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          
          {/* Card 1: Personal Intro (Full Stack) - Spans 2 rows vertically */}
          <div className="md:col-span-7 md:row-span-2 group relative rounded-[2rem] bg-[var(--bg-secondary)] border border-[var(--border-color)] overflow-hidden p-10 flex flex-col items-center justify-center text-center hover:shadow-2xl transition-all duration-700">
             
             {/* Circular Avatar Section */}
             <div className="relative mb-8 pt-4">
                {/* Default State: Single Large Circular Photo */}
                <div className="relative z-20">
                   <div className="relative w-28 h-28 rounded-full border-4 border-[var(--bg-secondary)] shadow-2xl overflow-hidden group-hover:scale-105 transition-transform duration-500 ring-1 ring-[var(--border-color)]">
                      <Image src="/images/me-1.jpg" alt="Thanakon" fill className="object-cover" />
                   </div>
                   
                   {/* Black "THANAKON" Badge (from reference) */}
                   <div className="absolute -top-0 -right-6 bg-black text-white px-3 py-1 rounded-full text-[9px] font-bold tracking-widest uppercase shadow-2xl border border-white/10 group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform duration-500 z-30 flex items-center gap-1.5">
                      Thanakon <span className="text-xs">🎉</span>
                   </div>
                </div>
             </div>

             <div className="relative z-20 max-w-sm">
                <h3 className="text-3xl font-bold text-[var(--text-primary)] mb-4 tracking-tight">{bento.intro.title}</h3>
                <p className="text-sm text-[var(--text-secondary)] mb-8 leading-relaxed opacity-70">
                   {bento.intro.desc}
                </p>
                
                <div className="flex justify-center gap-10 mb-10">
                  <div>
                    <p className="text-2xl font-black text-[var(--text-primary)]">3+</p>
                    <p className="text-[9px] font-mono text-[var(--text-muted)] uppercase tracking-widest">{bento.intro.expLabel}</p>
                  </div>
                  <div className="w-[1px] h-10 bg-[var(--border-color)]" />
                  <div>
                    <p className="text-2xl font-black text-[var(--text-primary)]">20+</p>
                    <p className="text-[9px] font-mono text-[var(--text-muted)] uppercase tracking-widest">{bento.intro.projectLabel}</p>
                  </div>
                </div>

                {/* Get in Touch Button */}
                <Link 
                  href="/#contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[var(--text-primary)] text-[var(--bg-primary)] text-xs font-bold uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl hover:shadow-[0_0_20px_rgba(255,255,255,0.15)] group/cta-btn"
                >
                  {bento.intro.cta}
                  <svg className="w-4 h-4 group-hover/cta-btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
             </div>

             {/* Personal Surprise - 4 Dropping Photos on Hover */}
             <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
                {/* Photo Drop Logic - Now all Circular */}
                <div className="absolute top-[8%] left-[8%] w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-2xl -rotate-6 translate-y-[-200%] group-hover:translate-y-0 transition-all duration-1000 delay-100 ease-out">
                   <div className="relative w-full h-full">
                      <Image src="/images/me-1.jpg" alt="Profile" fill className="object-cover" />
                   </div>
                </div>
                <div className="absolute top-[5%] right-[8%] w-36 h-36 rounded-full overflow-hidden border-4 border-white shadow-2xl rotate-12 translate-y-[-200%] group-hover:translate-y-0 transition-all duration-1000 delay-300 ease-out">
                   <div className="relative w-full h-full">
                      <Image src="/images/me-3.jpg" alt="Profile" fill className="object-cover" />
                   </div>
                </div>
                <div className="absolute bottom-[8%] left-[12%] w-34 h-34 rounded-full overflow-hidden border-4 border-white shadow-2xl -rotate-12 translate-y-[200%] group-hover:translate-y-0 transition-all duration-1000 delay-500 ease-out">
                   <div className="relative w-full h-full">
                      <Image src="/images/me-4.jpg" alt="Profile" fill className="object-cover" />
                   </div>
                </div>
                <div className="absolute bottom-[5%] right-[10%] w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-2xl rotate-6 translate-y-[200%] group-hover:translate-y-0 transition-all duration-1000 delay-700 ease-out">
                   <div className="relative w-full h-full">
                      <Image src="/images/me-2.jpg" alt="Profile" fill className="object-cover" />
                   </div>
                </div>
             </div>
          </div>

          {/* Card 2: AI Intelligence Engine (Top Right) */}
          <div className="md:col-span-5 group relative rounded-[2rem] bg-[var(--bg-secondary)] border border-[var(--border-color)] p-8 flex flex-col hover:shadow-2xl transition-all duration-700 overflow-hidden">
             {/* Futuristic Scanning Effect */}
             <div className="absolute inset-0 pointer-events-none z-0">
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[var(--text-muted)]/40 to-transparent animate-scan" />
             </div>

             <div className="relative z-10">
                <div className="flex items-center gap-2 mb-4">
                   <div className="w-1.5 h-1.5 rounded-full bg-[var(--text-primary)] shadow-[0_0_8px_var(--text-primary)] opacity-50" />
                   <span className="text-[11px] font-bold tracking-[0.3em] text-[var(--text-muted)] uppercase">{bento.ai.tag}</span>
                </div>
                <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2">{bento.ai.title}</h3>
                <p className="text-[10px] text-[var(--text-secondary)] mb-6 opacity-70 leading-relaxed max-w-[280px]">
                   {bento.ai.desc}
                </p>
             </div>

             {/* Modular AI Units */}
             <div className="mt-auto grid grid-cols-2 gap-3 relative z-10">
                {[
                   { name: 'ChatGPT', logo: 'https://api.iconify.design/logos:openai-icon.svg', color: '#10a37f', desc: bento.ai.units?.logic },
                   { name: 'Gemini', logo: '/images/gemini-logo.png', color: '#4285f4', desc: bento.ai.units?.vision },
                   { name: 'Claude', logo: 'https://api.iconify.design/logos:claude-icon.svg', color: '#d97757', desc: bento.ai.units?.creative },
                   { name: 'OpenClaw', logo: '/images/openclaw-logo.png', color: '#eb4432', desc: bento.ai.units?.system },
                ].map((ai, i) => (
                   <div 
                      key={i}
                      className="group/ai-unit relative p-2 rounded-xl bg-[var(--bg-primary)]/40 border border-[var(--border-color)] hover:border-[var(--text-muted)]/50 transition-all duration-500"
                   >
                      <div className="flex items-center gap-2">
                         <div 
                           className="w-6 h-6 rounded-lg flex items-center justify-center p-1 bg-white/5 border border-white/10 group-hover/ai-unit:scale-110 transition-transform duration-500"
                           style={{ boxShadow: `0 0 10px ${ai.color}10` }}
                         >
                            <img src={ai.logo} alt={ai.name} className="w-full h-full object-contain" />
                         </div>
                         <div className="flex-1 min-w-0">
                            <p className="text-[9px] font-bold text-[var(--text-primary)] truncate">{ai.name}</p>
                            <p className="text-[7px] text-[var(--text-muted)] truncate group-hover/ai-unit:text-[var(--text-secondary)] transition-colors">{ai.desc}</p>
                         </div>
                      </div>
                      
                      {/* Interactive Corner Accent */}
                      <div 
                        className="absolute bottom-1 right-1 w-1 h-1 rounded-full opacity-20 group-hover/ai-unit:opacity-100 transition-opacity"
                        style={{ backgroundColor: ai.color }}
                      />
                   </div>
                ))}
             </div>
          </div>

          {/* Card 3: Selected Work Showcase (Wide Right) */}
          <Link 
            href="/work" 
            className="md:col-span-5 group relative rounded-[2rem] bg-[var(--bg-secondary)] border border-[var(--border-color)] p-8 flex flex-col hover:shadow-2xl transition-all duration-500 overflow-hidden"
          >
             <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
             
             <div className="relative z-20">
                <h3 className="text-xl font-bold text-[var(--text-primary)] mb-2 group-hover:translate-x-1 transition-transform">{t.projects?.title}</h3>
                <p className="text-xs text-[var(--text-secondary)] opacity-70 max-w-[220px]">
                   {t.projects?.subtitle}
                </p>
             </div>

             {/* Corner Arrow Button */}
             <div className="absolute bottom-6 right-6 w-9 h-9 rounded-full bg-[var(--text-primary)] text-[var(--bg-primary)] flex items-center justify-center opacity-0 scale-50 group-hover:opacity-100 group-hover:scale-100 transition-all duration-500 z-40 shadow-xl border border-[var(--bg-primary)]/20">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
             </div>

             {/* macOS Browser Mockup */}
             <div className="mt-auto relative w-full h-48 bg-[var(--bg-primary)] rounded-t-2xl border border-[var(--border-color)] shadow-2xl translate-y-16 group-hover:translate-y-6 transition-all duration-700 ease-out overflow-hidden">
                {/* Window Header (macOS Style) */}
                <div className="h-7 bg-[var(--bg-secondary)] border-b border-[var(--border-color)] flex items-center px-4 gap-2">
                   <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56] shadow-inner" />
                      <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e] shadow-inner" />
                      <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f] shadow-inner" />
                   </div>
                   {/* Mini URL Bar */}
                   <div className="mx-auto w-1/2 h-4 bg-[var(--bg-tertiary)]/50 rounded-md border border-[var(--border-color)] flex items-center px-2">
                      <div className="w-full h-1 bg-[var(--text-muted)]/20 rounded-full" />
                   </div>
                </div>

                {/* Browser Content */}
                <div className="relative w-full h-full bg-[var(--bg-secondary)]">
                   <Image 
                     src="/images/projects/project-preview-1.png" 
                     alt="Project Preview" 
                     fill 
                     className="object-cover object-top opacity-90 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105"
                   />
                   <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)]/20 to-transparent" />
                </div>
             </div>
          </Link>

          {/* Row 3: 3 Small Cards */}
          {/* Card 4: Location / Thailand Globe */}
          <div className="md:col-span-3 group relative rounded-[2.5rem] bg-[var(--bg-secondary)] border border-[var(--border-color)] p-8 flex flex-col items-center justify-center hover:bg-[var(--bg-tertiary)]/50 transition-all overflow-hidden text-center">
             
             {/* Subtle Atmospheric Background Image */}
             <div className="absolute inset-0 z-0 opacity-[0.08] group-hover:opacity-[0.15] transition-opacity duration-1000">
                <Image 
                  src="/images/location-bg.jpg" 
                  alt="Location Background" 
                  fill 
                  className="object-cover scale-110 group-hover:scale-100 transition-transform duration-[3000ms] ease-out"
                />
             </div>

             <div className="relative z-10 transition-transform duration-500 group-hover:-translate-y-2">
                <span className="text-[10px] font-bold tracking-[0.3em] text-[var(--text-muted)] uppercase mb-3 block">{bento.remote.tag}</span>
                <h3 className="text-2xl font-heading text-[var(--text-primary)] mb-1">{bento.remote.location}</h3>
                <div className="flex items-center justify-center gap-2">
                   <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                   <p className="text-[10px] font-bold font-mono text-[var(--text-muted)] tracking-widest uppercase">GMT +7</p>
                </div>
             </div>

             {/* Dynamic Globe Background */}
             <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-5">
                <div className="relative w-full h-full flex items-center justify-center scale-125 opacity-[0.03] group-hover:opacity-[0.1] group-hover:scale-150 transition-all duration-1000 ease-out">
                   <svg viewBox="0 0 200 200" className="w-full h-full text-[var(--text-primary)] animate-spin-slow">
                      <circle cx="100" cy="100" r="90" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 4" />
                      <circle cx="100" cy="100" r="70" fill="none" stroke="currentColor" strokeWidth="0.3" strokeDasharray="2 2" />
                      <ellipse cx="100" cy="100" rx="90" ry="30" fill="none" stroke="currentColor" strokeWidth="0.5" />
                      <ellipse cx="100" cy="100" rx="30" ry="90" fill="none" stroke="currentColor" strokeWidth="0.5" />
                      <path d="M 10 100 L 190 100" stroke="currentColor" strokeWidth="0.2" />
                      <path d="M 100 10 L 100 190" stroke="currentColor" strokeWidth="0.2" />
                   </svg>
                </div>
                
                {/* Visual Thailand Marker */}
                <div className="absolute top-[52%] left-[62%] transition-all duration-700 opacity-20 group-hover:opacity-100 group-hover:scale-125">
                   <div className="relative">
                      <div className="w-2.5 h-2.5 bg-blue-500 rounded-full relative z-10 shadow-[0_0_15px_rgba(59,130,246,0.8)]" />
                      <div className="absolute inset-0 bg-blue-500 rounded-full animate-ping opacity-40 scale-[2.5]" />
                   </div>
                </div>
             </div>

             <div className="mt-auto relative z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-y-4 group-hover:translate-y-0">
                <p className="text-[11px] font-bold text-[var(--text-muted)] italic leading-none">
                   {bento.remote.title}
                </p>
             </div>
          </div>

          {/* Card 5: CTA / Let's work together */}
          <div 
            className="md:col-span-3 group relative rounded-[2.5rem] bg-[var(--bg-secondary)] border border-[var(--border-color)] py-6 px-8 flex flex-col items-center justify-center hover:bg-[var(--bg-tertiary)]/50 transition-all text-center overflow-hidden"
          >
             <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
             <div className="relative z-10 w-full">
                <h3 className="text-sm font-bold text-[var(--text-primary)] mb-1 leading-tight">
                   {bento.cta.title}
                </h3>
                <p className="text-[10px] text-[var(--text-secondary)] mb-6 opacity-70">
                   {bento.cta.subtitle}
                </p>
                
                <button 
                  onClick={handleCopyEmail}
                  className="w-full flex items-center justify-center gap-3 py-2.5 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)] hover:border-[var(--text-muted)] hover:shadow-lg active:scale-95 transition-all group/btn"
                >
                   <svg className="w-3.5 h-3.5 text-[var(--text-muted)] group-hover/btn:text-[var(--text-primary)] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                   </svg>
                   <span className="text-[10px] font-bold font-mono text-[var(--text-primary)]">
                      {bento.cta.email}
                   </span>
                </button>
                <div className="mt-2 text-[8px] font-bold text-[var(--text-muted)] opacity-0 group-hover:opacity-100 transition-opacity uppercase tracking-widest">
                   {bento.cta.copyLabel}
                </div>
             </div>
          </div>

          {/* Card 6: Categories/Tech Scroll */}
          <div className="md:col-span-6 group relative rounded-[2.5rem] bg-[var(--bg-secondary)] border border-[var(--border-color)] py-6 overflow-hidden flex flex-col hover:bg-[var(--bg-tertiary)]/50 transition-all">
             <h3 className="text-xs font-bold text-[var(--text-primary)] mb-4 px-8">{bento.techStack.title}</h3>
             
             <div className="relative overflow-hidden w-full" style={{ maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)' }}>
                {/* Continuous Marquee */}
                <div className="flex animate-marquee-left whitespace-nowrap gap-3 py-2">
                   {[
                      { name: 'Laravel', icon: 'laravel', color: 'rgba(255, 45, 32, 0.1)', text: '#ff2d20' },
                      { name: 'Next.js', icon: 'nextjs', color: 'rgba(255, 255, 255, 0.05)', text: 'var(--text-primary)' },
                      { name: 'React', icon: 'react', color: 'rgba(97, 218, 251, 0.1)', text: '#61dafb' },
                      { name: 'Tailwind', icon: 'tailwind', color: 'rgba(56, 189, 248, 0.1)', text: '#38bdf8' },
                      { name: 'Postgres', icon: 'postgres', color: 'rgba(51, 103, 145, 0.1)', text: '#336791' },
                      { name: 'Docker', icon: 'docker', color: 'rgba(36, 150, 237, 0.1)', text: '#2496ed' },
                      { name: 'Redis', icon: 'redis', color: 'rgba(216, 44, 32, 0.1)', text: '#d82c20' },
                      { name: 'Node.js', icon: 'nodejs', color: 'rgba(51, 153, 51, 0.1)', text: '#339933' },
                   ].concat([
                      { name: 'Laravel', icon: 'laravel', color: 'rgba(255, 45, 32, 0.1)', text: '#ff2d20' },
                      { name: 'Next.js', icon: 'nextjs', color: 'rgba(255, 255, 255, 0.05)', text: 'var(--text-primary)' },
                      { name: 'React', icon: 'react', color: 'rgba(97, 218, 251, 0.1)', text: '#61dafb' },
                      { name: 'Tailwind', icon: 'tailwind', color: 'rgba(56, 189, 248, 0.1)', text: '#38bdf8' },
                      { name: 'Postgres', icon: 'postgres', color: 'rgba(51, 103, 145, 0.1)', text: '#336791' },
                      { name: 'Docker', icon: 'docker', color: 'rgba(36, 150, 237, 0.1)', text: '#2496ed' },
                      { name: 'Redis', icon: 'redis', color: 'rgba(216, 44, 32, 0.1)', text: '#d82c20' },
                      { name: 'Node.js', icon: 'nodejs', color: 'rgba(51, 153, 51, 0.1)', text: '#339933' },
                   ]).map((tech, i) => (
                      <div 
                        key={i} 
                        className="flex items-center gap-2 pl-4 pr-6 py-1.5 rounded-xl border border-[var(--border-color)] transition-all duration-300 hover:scale-105 hover:brightness-125 hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.2)] active:scale-95 group/tech-item"
                        style={{ backgroundColor: tech.color }}
                      >
                         <img 
                           src={`https://skillicons.dev/icons?i=${tech.icon}`} 
                           alt={tech.name} 
                           className="w-4 h-4 object-contain filter group-hover/tech-item:drop-shadow-sm" 
                         />
                         <span className="text-[10px] font-bold font-mono tracking-tight" style={{ color: tech.text }}>{tech.name}</span>
                      </div>
                   ))}
                </div>

                {/* Second Row - Reverse */}
                <div className="flex animate-marquee-right whitespace-nowrap gap-3 py-2">
                   {[
                      { name: 'TypeScript', icon: 'ts', color: 'rgba(49, 120, 198, 0.1)', text: '#3178c6' },
                      { name: 'Figma', icon: 'figma', color: 'rgba(242, 78, 30, 0.1)', text: '#f24e1e' },
                      { name: 'Git', icon: 'git', color: 'rgba(240, 80, 50, 0.1)', text: '#f05032' },
                      { name: 'VS Code', icon: 'vscode', color: 'rgba(0, 122, 204, 0.1)', text: '#007acc' },
                      { name: 'Python', icon: 'py', color: 'rgba(55, 115, 165, 0.1)', text: '#3773a5' },
                      { name: 'MySQL', icon: 'mysql', color: 'rgba(68, 121, 161, 0.1)', text: '#4479a1' },
                   ].concat([
                      { name: 'TypeScript', icon: 'ts', color: 'rgba(49, 120, 198, 0.1)', text: '#3178c6' },
                      { name: 'Figma', icon: 'figma', color: 'rgba(242, 78, 30, 0.1)', text: '#f24e1e' },
                      { name: 'Git', icon: 'git', color: 'rgba(240, 80, 50, 0.1)', text: '#f05032' },
                      { name: 'VS Code', icon: 'vscode', color: 'rgba(0, 122, 204, 0.1)', text: '#007acc' },
                      { name: 'Python', icon: 'py', color: 'rgba(55, 115, 165, 0.1)', text: '#3773a5' },
                      { name: 'MySQL', icon: 'mysql', color: 'rgba(68, 121, 161, 0.1)', text: '#4479a1' },
                   ]).map((tech, i) => (
                      <div 
                        key={i} 
                        className="flex items-center gap-2 pl-4 pr-6 py-1.5 rounded-xl border border-[var(--border-color)] bg-[var(--bg-primary)]/50 transition-all duration-300 hover:scale-105 hover:brightness-125 hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.2)] active:scale-95 group/tech-item"
                        style={{ backgroundColor: tech.color }}
                      >
                         <img 
                           src={`https://skillicons.dev/icons?i=${tech.icon}`} 
                           alt={tech.name} 
                           className="w-4 h-4 object-contain filter group-hover/tech-item:drop-shadow-sm" 
                         />
                         <span className="text-[10px] font-bold font-mono tracking-tight" style={{ color: tech.text }}>{tech.name}</span>
                      </div>
                   ))}
                </div>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
}
