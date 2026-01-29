import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import confetti from 'canvas-confetti';

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

  const bento = t.bento || {
    collaboration: {
      tag: 'COLLABORATION',
      title: 'I prioritize client collaboration, fostering open communication',
    },
    techStack: {
      title: 'Passionate about cutting-edge',
      titleAccent: 'technologies',
    },
    remote: {
      tag: 'REMOTE',
      location: 'THAILAND',
      title: "I'm flexible with time zone communications",
    },
    cta: {
      title: "Let's work",
      titleAccent: 'together',
      subtitle: 'on your next project',
      email: 'thnakon.d@gmail.com',
    },
    performance: {
      title: 'Built to Perform.',
      subtitle: 'Websites that impact your business.',
    },
    currentWork: {
      tag: 'THE INSIDE SCOOP',
      title: 'Currently building a SaaS Application',
    },
  };

  // Tech list with icon names for skillicons.dev
  const techRows = [
    [
      { name: 'Laravel', icon: 'laravel' },
      { name: 'Next.js', icon: 'nextjs' },
      { name: 'React', icon: 'react' },
      { name: 'Tailwind', icon: 'tailwind' },
      { name: 'TypeScript', icon: 'ts' },
    ],
    [
      { name: 'Node.js', icon: 'nodejs' },
      { name: 'MySQL', icon: 'mysql' },
      { name: 'PostgreSQL', icon: 'postgres' },
      { name: 'Docker', icon: 'docker' },
      { name: 'Git', icon: 'git' },
    ],
    [
      { name: 'Figma', icon: 'figma' },
      { name: 'VS Code', icon: 'vscode' },
      { name: 'Linux', icon: 'linux' },
      { name: 'Postman', icon: 'postman' },
      { name: 'GraphQL', icon: 'graphql' },
    ],
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          setTimeout(() => setStartTyping(true), 800);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!startTyping) return;

    let currentIndex = 0;
    const typingSpeed = 20;
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

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(bento.cta.email);
    
    // Confetti effect
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
      // since particles fall down, start a bit higher than random
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
      confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
    }, 250);
  };

  return (
    <section 
      ref={sectionRef}
      className="relative pt-24 pb-8 px-6 bg-[var(--bg-primary)] overflow-hidden"
    >
      {/* Fireflies Background */}
      <div className="firefly-container opacity-20">
        {Array.from({ length: 20 }).map((_, i) => (
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

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <span 
            className={`inline-block text-[10px] tracking-[0.3em] font-bold text-[var(--text-muted)] uppercase mb-6 transition-all duration-1000 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            {content.tag}
          </span>
          
          <h2 
            className={`text-3xl md:text-5xl font-heading tracking-tight mb-8 transition-all duration-1000 delay-300 ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            <span className="text-[var(--text-primary)]">{content.title} </span>
            <em className="overview-title-accent">{content.titleAccent}</em>
          </h2>
          
          <div className="min-h-[3em]">
            <p className="text-base md:text-lg text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed">
              {typedDescription}
              {startTyping && typedDescription.length < content.description.length && (
                <span className="inline-block w-[2px] h-[1.1em] bg-[var(--text-primary)] ml-1 animate-blink align-middle" />
              )}
            </p>
          </div>
        </div>

        {/* Bento Grid */}
        <div 
          className={`grid grid-cols-1 md:grid-cols-3 gap-4 transition-all duration-1000 delay-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {/* Row 1: Collaboration Card (2 cols) + Tech Stack Card (1 col) */}
          <div className="md:col-span-2 bento-card bento-card-collaboration group relative overflow-hidden">
            {/* Grid Pattern Background */}
            <div className="absolute inset-0 opacity-[0.03] group-hover:opacity-[0.06] transition-opacity duration-500">
              <div className="absolute inset-0" style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, var(--text-muted) 1px, transparent 0)`,
                backgroundSize: '24px 24px'
              }} />
            </div>

            {/* Animated Glow */}
            <div className="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity duration-500">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gradient-radial from-[var(--text-muted)]/30 via-transparent to-transparent rounded-full blur-3xl" />
            </div>

            {/* Floating Decorative Elements */}
            <div className="absolute top-8 left-8 w-16 h-16 rounded-full border border-[var(--border-color)] opacity-20 group-hover:opacity-40 group-hover:scale-110 transition-all duration-700" />
            <div className="absolute top-16 left-20 w-8 h-8 rounded-full border border-dashed border-[var(--border-color)] opacity-10 group-hover:opacity-30 transition-opacity duration-500" />
            <div className="absolute bottom-12 left-12 w-4 h-4 rounded-full bg-[var(--text-muted)] opacity-10 group-hover:opacity-30 transition-opacity" />
            
            <div className="absolute top-12 right-16 w-12 h-12 rounded-full border border-[var(--border-color)] opacity-15 group-hover:opacity-35 group-hover:scale-110 transition-all duration-700" />
            <div className="absolute bottom-16 right-12 w-20 h-20 rounded-full border border-dashed border-[var(--border-color)] opacity-10 group-hover:opacity-25 transition-opacity duration-500" />
            <div className="absolute bottom-8 right-24 w-3 h-3 rounded-full bg-[var(--text-muted)] opacity-10 group-hover:opacity-40 transition-opacity" />
            
            {/* Connection Lines & Network Pattern */}
            <svg className="absolute inset-0 w-full h-full opacity-[0.08] group-hover:opacity-[0.18] transition-opacity duration-500" xmlns="http://www.w3.org/2000/svg">
              {/* Main Connection Lines */}
              <line x1="10%" y1="20%" x2="40%" y2="50%" stroke="var(--text-muted)" strokeWidth="1" strokeDasharray="4 4" />
              <line x1="60%" y1="50%" x2="90%" y2="25%" stroke="var(--text-muted)" strokeWidth="1" strokeDasharray="4 4" />
              <line x1="15%" y1="80%" x2="45%" y2="50%" stroke="var(--text-muted)" strokeWidth="1" strokeDasharray="4 4" />
              <line x1="55%" y1="50%" x2="85%" y2="75%" stroke="var(--text-muted)" strokeWidth="1" strokeDasharray="4 4" />
              
              {/* Additional Cross Lines */}
              <line x1="5%" y1="50%" x2="25%" y2="30%" stroke="var(--text-muted)" strokeWidth="0.5" strokeDasharray="2 6" />
              <line x1="75%" y1="70%" x2="95%" y2="50%" stroke="var(--text-muted)" strokeWidth="0.5" strokeDasharray="2 6" />
              <line x1="20%" y1="15%" x2="35%" y2="35%" stroke="var(--text-muted)" strokeWidth="0.5" strokeDasharray="2 6" />
              <line x1="65%" y1="65%" x2="80%" y2="85%" stroke="var(--text-muted)" strokeWidth="0.5" strokeDasharray="2 6" />
              
              {/* Hub Lines from Center */}
              <line x1="50%" y1="50%" x2="30%" y2="20%" stroke="var(--text-muted)" strokeWidth="0.5" opacity="0.5" />
              <line x1="50%" y1="50%" x2="70%" y2="20%" stroke="var(--text-muted)" strokeWidth="0.5" opacity="0.5" />
              <line x1="50%" y1="50%" x2="25%" y2="70%" stroke="var(--text-muted)" strokeWidth="0.5" opacity="0.5" />
              <line x1="50%" y1="50%" x2="75%" y2="70%" stroke="var(--text-muted)" strokeWidth="0.5" opacity="0.5" />
              
              {/* Node Circles */}
              <circle cx="10%" cy="20%" r="3" fill="var(--text-muted)" opacity="0.4" />
              <circle cx="90%" cy="25%" r="3" fill="var(--text-muted)" opacity="0.4" />
              <circle cx="15%" cy="80%" r="2" fill="var(--text-muted)" opacity="0.3" />
              <circle cx="85%" cy="75%" r="2" fill="var(--text-muted)" opacity="0.3" />
              <circle cx="50%" cy="50%" r="4" fill="none" stroke="var(--text-muted)" strokeWidth="1" opacity="0.5" />
              <circle cx="30%" cy="20%" r="2" fill="var(--text-muted)" opacity="0.2" />
              <circle cx="70%" cy="20%" r="2" fill="var(--text-muted)" opacity="0.2" />
              <circle cx="25%" cy="70%" r="2" fill="var(--text-muted)" opacity="0.2" />
              <circle cx="75%" cy="70%" r="2" fill="var(--text-muted)" opacity="0.2" />
              
              {/* Decorative Arcs */}
              <path d="M 10 80 Q 30 60, 50 80" stroke="var(--text-muted)" strokeWidth="0.5" fill="none" opacity="0.3" />
              <path d="M 150 80 Q 170 60, 190 80" stroke="var(--text-muted)" strokeWidth="0.5" fill="none" opacity="0.3" />
            </svg>

            {/* Corner Decorations */}
            <div className="absolute top-4 left-4 w-8 h-8 border-l border-t border-[var(--border-color)] opacity-30 group-hover:opacity-60 transition-opacity" />
            <div className="absolute bottom-4 left-4 w-8 h-8 border-l border-b border-[var(--border-color)] opacity-30 group-hover:opacity-60 transition-opacity" />

            {/* Arrow Button - Absolute Bottom Right (appears on hover) */}
            <div className="absolute bottom-6 right-6 z-20 opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-[var(--border-color)] bg-[var(--bg-secondary)] hover:border-[var(--text-muted)] hover:bg-[var(--bg-tertiary)] transition-all cursor-pointer shadow-lg">
                <svg className="w-4 h-4 text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:translate-x-0.5 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </div>

            <div className="flex flex-col h-full relative z-10">
              {/* Profile Image with Orbiting Rings */}
              <div className="flex justify-center mb-6">
                <div className="relative">
                  {/* Orbit Ring 1 */}
                  <div className="absolute inset-0 w-28 h-28 -m-2 rounded-full border border-[var(--border-color)] opacity-40 group-hover:animate-orbit-slow" />
                  {/* Orbit Ring 2 */}
                  <div className="absolute inset-0 w-36 h-36 -m-6 rounded-full border border-dashed border-[var(--border-color)] opacity-20 group-hover:animate-orbit-reverse" />
                  
                  {/* Orbit Dots */}
                  <div className="absolute w-2 h-2 bg-[var(--text-muted)] rounded-full top-0 left-1/2 -translate-x-1/2 -mt-2 opacity-0 group-hover:opacity-60 transition-opacity group-hover:animate-orbit-dot" />
                  
                  {/* Profile Image */}
                  <div className="relative w-24 h-24 rounded-full overflow-hidden ring-2 ring-[var(--border-color)] ring-offset-4 ring-offset-[var(--bg-secondary)] group-hover:ring-[var(--text-muted)] transition-all duration-300 group-hover:scale-105">
                    <Image
                      src="/images/profile-bento.jpg"
                      alt="Thanakon"
                      fill
                      sizes="96px"
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
              
              <div className="text-center">
                <span className="bento-tag">{bento.collaboration.tag}</span>
                <h3 className="text-sm md:text-base font-heading text-[var(--text-primary)] mt-3 whitespace-nowrap">
                  {bento.collaboration.title}
                </h3>
              </div>
            </div>
          </div>

          <div className="bento-card bento-card-tech flex flex-col md:row-span-2 group/tech relative overflow-hidden">
            {/* 1. Blueprint Grid Background */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
              <div className="absolute inset-0" style={{ 
                backgroundImage: `linear-gradient(var(--border-color) 1px, transparent 1px), linear-gradient(90deg, var(--border-color) 1px, transparent 1px)`,
                backgroundSize: '20px 20px'
              }} />
            </div>

            {/* 2. Background Mesh Gradient */}
            <div className="absolute inset-0 opacity-0 group-hover/tech:opacity-100 transition-opacity duration-700">
              <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-blue-500/15 rounded-full blur-[100px] animate-pulse" />
              <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-purple-500/15 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />
            </div>

            {/* 3. Animated Circuit Board SVG */}
            <svg className="absolute inset-0 w-full h-full opacity-0 group-hover/tech:opacity-20 transition-opacity duration-500 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
              {/* Circuit Paths */}
              <path d="M 0 50 L 50 50 L 70 30 L 150 30" stroke="var(--text-muted)" strokeWidth="0.5" fill="none" className="animate-circuit-flow" style={{ strokeDasharray: '300', strokeDashoffset: '300' }} />
              <path d="M 200 100 L 150 100 L 130 120 L 50 120" stroke="var(--text-muted)" strokeWidth="0.5" fill="none" className="animate-circuit-flow-reverse" style={{ strokeDasharray: '300', strokeDashoffset: '300' }} />
              <path d="M 100 0 L 100 40 L 120 60 L 120 150" stroke="var(--text-muted)" strokeWidth="0.5" fill="none" className="animate-circuit-flow" style={{ strokeDasharray: '300', strokeDashoffset: '300' }} />
              
              {/* Nodes */}
              <circle cx="50" cy="50" r="1.5" fill="var(--text-muted)" />
              <circle cx="150" cy="30" r="1.5" fill="var(--text-muted)" />
              <circle cx="120" cy="60" r="1.5" fill="var(--text-muted)" />
            </svg>

            {/* 4. Binary Stream Fragments */}
            <div className="absolute top-4 right-4 text-[10px] font-mono text-[var(--text-muted)] opacity-5 select-none pointer-events-none leading-none group-hover/tech:opacity-20 transition-opacity">
              <div className="animate-bounce" style={{ animationDuration: '3s' }}>010110</div>
              <div className="animate-bounce" style={{ animationDuration: '4s', animationDelay: '0.5s' }}>110010</div>
              <div className="animate-bounce" style={{ animationDuration: '3.5s', animationDelay: '1s' }}>001101</div>
            </div>

            {/* 6. macOS Browser Style Performance - Flush to bottom, side gaps, taller */}
            <div className="absolute bottom-0 left-4 right-4 z-20 opacity-100 transition-all duration-500 pointer-events-none group-hover/tech:-translate-y-1">
              <div className="bg-[var(--bg-secondary)] border border-b-0 border-[var(--border-color)] shadow-xl rounded-t-xl overflow-hidden">
                {/* Browser Header */}
                <div className="bg-[var(--bg-tertiary)]/80 px-4 py-2 flex items-center gap-1.5 border-b border-[var(--border-color)]">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                  </div>
                  <div className="mx-auto bg-[var(--bg-primary)]/50 rounded-md px-4 py-0.5 text-[9px] text-[var(--text-muted)] font-mono">
                    Thanakon.warm
                  </div>
                </div>
                
                {/* Browser Content */}
                <div className="p-6 bg-gradient-to-b from-transparent to-blue-500/5">
                  <div className="mb-4">
                    <h3 className="text-base font-heading font-bold text-[var(--text-primary)] leading-tight">
                      {bento.performance.title}
                    </h3>
                    <p className="text-[10px] text-[var(--text-secondary)] font-mono uppercase tracking-wider">
                      {bento.performance.subtitle}
                    </p>
                  </div>
                  
                  {/* Performance Indicators - Taller Bars */}
                  <div className="flex gap-1.5 items-end h-16 mt-2">
                    {[30, 60, 40, 85, 50, 75, 95, 45, 70, 55, 80, 65].map((h, i) => (
                      <div 
                        key={i} 
                        className="flex-1 bg-blue-500/20 rounded-t-[2px] group-hover/tech:bg-blue-500/40 transition-all duration-500"
                        style={{ height: `${h}%`, transitionDelay: `${i * 40}ms` }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="relative z-10 flex flex-col h-full">
              {/* Tech Stack Section */}
              <div className="mb-6">
                <h3 className="text-base font-heading text-[var(--text-primary)] mb-1">
                  {bento.techStack.title}
                </h3>
                <p className="text-base font-heading overview-title-accent mb-4">
                  {bento.techStack.titleAccent}
                </p>
                
                {/* Tech Tags - 3 Rows with Marquee Animation */}
                <div className="overflow-hidden space-y-4">
                  {techRows.map((row, rowIndex) => (
                    <div key={rowIndex} className="relative overflow-hidden">
                      <div className={`flex gap-4 ${rowIndex % 2 === 0 ? 'animate-marquee-left' : 'animate-marquee-right'}`}>
                        {/* Duplicate for seamless loop */}
                        {[...row, ...row].map((tech, i) => (
                          <span key={i} className="bento-tech-tag shrink-0 flex items-center gap-2">
                            <img 
                              src={`https://skillicons.dev/icons?i=${tech.icon}`} 
                              alt={tech.name}
                              className="w-4 h-4 object-contain transition-all duration-300"
                            />
                            <span className="text-xs font-medium">{tech.name}</span>
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Row 2: Remote Card (spans 2 rows) + CTA Card */}
          <div className="bento-card bento-card-remote md:row-span-2 relative group/remote overflow-hidden flex flex-col h-full hover:shadow-2xl transition-all duration-500">
            {/* 1. Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-[var(--bg-secondary)] to-[var(--bg-tertiary)]/50" />
            
            {/* 2. Map Dots Pattern & Radar */}
            <div className="absolute inset-0 z-0">
               {/* Grid Pattern */}
               <div className="absolute inset-0 opacity-[0.03] group-hover/remote:opacity-[0.06] transition-opacity duration-700" style={{
                  backgroundImage: 'radial-gradient(var(--text-muted) 1px, transparent 1px)',
                  backgroundSize: '20px 20px'
               }}></div>
               
               {/* Rotating Radar Overlay */}
               <div className="absolute inset-0 overflow-hidden opacity-[0.05] group-hover/remote:opacity-[0.1] transition-opacity">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[conic-gradient(from_0deg,transparent_0deg,var(--text-primary)_360deg)] opacity-10 rounded-full animate-spin-slow-reverse mask-radial-fade"></div>
               </div>

               {/* Flight Paths */}
               <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M -10 100 Q 100 -20 250 50" stroke="var(--text-muted)" strokeWidth="0.5" fill="none" strokeDasharray="4 4" className="animate-dash" />
                  <path d="M -10 200 Q 50 100 250 150" stroke="var(--text-muted)" strokeWidth="0.5" fill="none" strokeDasharray="3 3" className="animate-dash-reverse" />
               </svg>
            </div>

            {/* 3. Animated Globe Wireframe */}
            <div className="absolute -right-20 top-1/2 -translate-y-1/2 w-80 h-80 opacity-30 group-hover/remote:opacity-50 transition-all duration-700 pointer-events-none group-hover/remote:scale-110 group-hover/remote:rotate-12">
               {/* Globe Glow */}
               <div className="absolute inset-0 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
               
               <svg viewBox="0 0 200 200" className="w-full h-full animate-orbit-slow" style={{ animationDuration: '60s' }}>
                 {/* Sphere Border */}
                 <circle cx="100" cy="100" r="90" fill="none" stroke="var(--border-color)" strokeWidth="1" className="opacity-50" />
                 
                 {/* Longitude Lines - Rotating */}
                 <ellipse cx="100" cy="100" rx="30" ry="90" fill="none" stroke="var(--text-muted)" strokeWidth="0.5" className="opacity-40" />
                 <ellipse cx="100" cy="100" rx="60" ry="90" fill="none" stroke="var(--text-muted)" strokeWidth="0.5" className="opacity-40" />
                 <ellipse cx="100" cy="100" rx="90" ry="90" fill="none" stroke="var(--text-muted)" strokeWidth="0.5" className="opacity-20" />
                 
                 {/* Latitude Lines - Static or Counter-rotating */}
                 <ellipse cx="100" cy="100" rx="90" ry="30" fill="none" stroke="var(--text-muted)" strokeWidth="0.5" className="opacity-40" />
                 <ellipse cx="100" cy="100" rx="90" ry="60" fill="none" stroke="var(--text-muted)" strokeWidth="0.5" className="opacity-40" />
                 
                 {/* Decorative Points */}
                 <circle cx="100" cy="10" r="2" fill="var(--color-primary)" className="animate-ping" style={{ animationDuration: '3s' }} />
                 <circle cx="100" cy="190" r="2" fill="var(--color-primary)" className="animate-ping" style={{ animationDuration: '3s', animationDelay: '1.5s' }} />
               </svg>
            </div>

            {/* 4. Scanning Line Effect */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--text-primary)]/5 to-transparent h-[20%] w-full -translate-y-[150%] group-hover/remote:animate-scan-shimmer opacity-0 group-hover/remote:opacity-100 transition-opacity duration-300 pointer-events-none" />

            {/* Content Content - Relative for Z-Index */}
            <div className="relative z-10 flex flex-col h-full p-2">
              <div className="mb-4">
                <span className="bento-tag mb-3 inline-block">{bento.remote.tag}</span>
                <h3 className="text-xl md:text-2xl font-heading text-[var(--text-primary)] leading-snug">
                  {bento.remote.title}
                </h3>
              </div>
              
              {/* Location Pins with Pulse */}
              <div className="flex flex-wrap gap-2 mb-6 justify-center">
                 {['🇹🇭 TH', '🇺🇸 USA', '🇬🇧 UK'].map((loc, i) => (
                   <span key={i} className="bento-flag-tag bg-[var(--bg-primary)]/80 backdrop-blur-sm border-[var(--border-color)] hover:border-[var(--text-primary)]/50 transition-colors">
                     {loc}
                   </span>
                 ))}
              </div>
              
              <div className="mt-auto">
                 {/* Modern Location Indicator */}
                 <div className="flex items-center gap-3">
                   <div className="relative">
                     <span className="flex w-3 h-3">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                      </span>
                   </div>
                   <div>
                     <p className="text-[10px] font-mono text-[var(--text-muted)] uppercase tracking-widest">Base Location</p>
                     <p className="text-xl font-bold text-[var(--text-primary)]">{bento.remote.location}</p>
                   </div>
                 </div>
              </div>
            </div>
          </div>

          <div className="bento-card bento-card-cta text-center group/cta relative overflow-hidden flex flex-col items-center justify-center min-h-[250px]">
            {/* Background Logos as Watermarks */}
            <div className="absolute inset-0 opacity-[0.03] group-hover/cta:opacity-[0.06] transition-opacity duration-700 pointer-events-none">
              <img 
                src="/logo-dark.png" 
                alt="" 
                className="absolute -top-10 -right-10 w-40 h-40 object-contain rotate-12 group-hover/cta:rotate-[30deg] group-hover/cta:scale-125 transition-all duration-1000" 
              />
              <img 
                src="/logo-dark.png" 
                alt="" 
                className="absolute -bottom-10 -left-10 w-40 h-40 object-contain -rotate-12 group-hover/cta:-rotate-[30deg] group-hover/cta:scale-125 transition-all duration-1000" 
              />
            </div>

            {/* Floating Decoration */}
            <div className="relative z-10 mb-4 p-3 rounded-2xl bg-[var(--bg-secondary)] group-hover/cta:scale-110 group-hover/cta:rotate-[360deg] transition-all duration-1000">
              <span className="text-3xl block">✦</span>
            </div>

            <div className="relative z-10 px-4">
              <h3 className="text-xl md:text-2xl font-heading text-[var(--text-primary)] mb-2 leading-tight">
                {bento.cta.title} <br />
                <em className="overview-title-accent not-italic">{bento.cta.titleAccent}</em>
              </h3>
              <p className="text-sm text-[var(--text-secondary)] mb-6 max-w-[280px] mx-auto">
                {bento.cta.subtitle}
              </p>
              
              <button 
                onClick={handleCopyEmail}
                className="relative inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-[var(--bg-tertiary)] border border-[var(--border-color)] text-[var(--text-secondary)] text-sm font-medium hover:border-[var(--text-primary)]/30 hover:text-[var(--text-primary)] transition-all group/btn active:scale-95"
              >
                <svg className="w-5 h-5 opacity-60 group-hover/btn:opacity-100 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
                </svg>
                <span className="font-mono">{bento.cta.email}</span>
                
                {/* Tooltip-like indicator on hover */}
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-[var(--text-primary)] text-[var(--bg-primary)] text-[10px] rounded opacity-0 group-hover/btn:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
                  Click to copy
                </div>
              </button>
            </div>
          </div>

          {/* Row 3: Current Work (spans 2 columns) */}
          {/* Row 3: Current Work (spans 2 columns) */}
          <div className="md:col-span-2 bento-card bento-card-current relative group/current overflow-hidden !flex !flex-row !items-start !justify-start transition-all duration-500 hover:shadow-2xl">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--bg-secondary)] via-[var(--bg-secondary)] to-[var(--bg-tertiary)]" />
            
            {/* Enhanced Background (Radar + Grid) */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute inset-0 opacity-[0.03] group-hover/current:opacity-[0.06] transition-opacity duration-700" style={{ backgroundImage: 'radial-gradient(var(--text-muted) 1px, transparent 1px)', backgroundSize: '16px 16px' }} />
                
                {/* Rotating Radar Overlay */}
                <div className="absolute inset-0 overflow-hidden opacity-[0.03] group-hover/current:opacity-[0.08] transition-opacity">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[conic-gradient(from_0deg,transparent_0deg,var(--text-primary)_360deg)] opacity-10 rounded-full animate-spin-slow mask-radial-fade"></div>
                </div>
            </div>
            
            {/* Left Content - Compact & Top-Left Aligned */}
            <div className="relative z-10 p-4 flex flex-col items-start text-left w-full md:w-[45%] justify-start gap-3">
              <div>
                <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-500 text-[9px] font-bold tracking-wider uppercase mb-2 animate-pulse">
                  <span className="w-1 h-1 rounded-full bg-yellow-500" />
                  Dev
                </div>
                
                <h3 className="text-lg md:text-xl font-heading text-[var(--text-primary)] mb-1 leading-tight">
                  {bento.currentWork.title}
                </h3>
                <p className="text-[10px] md:text-xs text-[var(--text-secondary)] leading-relaxed max-w-[200px]">
                  AI-driven workflow automation for teams.
                </p>
              </div>
              
              <div className="flex items-center gap-3 text-[9px] font-mono text-[var(--text-muted)] mt-2">
                <div className="flex items-center gap-1">
                  <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  <span>v0.1.0</span>
                </div>
                <div className="w-0.5 h-0.5 rounded-full bg-[var(--text-muted)]" />
                <div className="flex items-center gap-1">
                  <svg className="w-2.5 h-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                  <span>Next 14</span>
                </div>
              </div>
            </div>

            {/* Right Visual - Abstract SaaS Mockup */}
            <div className="absolute right-[-40px] top-4 w-[65%] h-full z-0 pointer-events-none perspective-1000 md:block hidden">
              <div className="relative w-full h-full transform rotate-[-6deg] translate-x-10 group-hover/current:rotate-0 group-hover/current:translate-x-0 transition-all duration-700 ease-out">
                {/* Main Window */}
                <div className="absolute inset-0 bg-[var(--bg-primary)] rounded-tl-lg border border-[var(--border-color)] shadow-xl overflow-hidden">
                  {/* Window Header */}
                  <div className="h-6 bg-[var(--bg-tertiary)] border-b border-[var(--border-color)] flex items-center px-3 gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-[var(--border-color)]" />
                    <div className="w-2 h-2 rounded-full bg-[var(--border-color)]" />
                  </div>
                  
                  <div className="flex h-full">
                    {/* Sidebar */}
                    <div className="w-12 border-r border-[var(--border-color)] bg-[var(--bg-secondary)]/50 p-2 space-y-2">
                       <div className="h-6 w-6 rounded bg-[var(--color-primary)]/10" />
                       <div className="h-1.5 w-8 bg-[var(--text-muted)]/20 rounded-full" />
                       <div className="h-1.5 w-6 bg-[var(--text-muted)]/20 rounded-full" />
                    </div>
                    {/* Content */}
                    <div className="flex-1 p-3 bg-[var(--bg-tertiary)]/10">
                       <div className="flex gap-2 mb-3">
                         <div className="h-16 flex-1 rounded bg-[var(--bg-primary)] border border-[var(--border-color)]" />
                         <div className="h-16 flex-1 rounded bg-[var(--bg-primary)] border border-[var(--border-color)]" />
                       </div>
                       <div className="h-2 w-full bg-[var(--text-muted)]/10 rounded mb-1" />
                       <div className="h-2 w-2/3 bg-[var(--text-muted)]/10 rounded" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Visual for Mobile (Simplified Background) */}
            <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-[var(--color-primary)]/5 rounded-full blur-3xl md:hidden" />

            {/* Hover Arrow Button */}
            <div className="absolute bottom-4 right-4 z-20 opacity-0 scale-75 group-hover/current:opacity-100 group-hover/current:scale-100 transition-all duration-300">
              <div className="inline-flex items-center justify-center w-8 h-8 rounded-full border border-[var(--border-color)] bg-[var(--bg-secondary)] hover:border-[var(--text-muted)] hover:bg-[var(--bg-tertiary)] transition-all cursor-pointer shadow-lg">
                <svg className="w-3 h-3 text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:translate-x-0.5 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
