import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

// SVG Icons for Projects section
const Icons = {
  rocket: (
    <svg className="w-10 h-10 text-[var(--text-muted)] opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.2} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  ),
  external: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
    </svg>
  ),
  github: (
    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  )
};

const IDEMockup = ({ project }) => {
  return (
    <div className="w-full relative rounded-xl overflow-hidden bg-[#0D0D0D] border border-white/10 shadow-2xl group/ide transition-all duration-700 hover:border-white/20">
      {/* Title Bar */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-white/10 bg-[#161616]/50">
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
        </div>
        <div className="text-[10px] font-mono text-white/40 tracking-wider">
           {project.fileName || 'index.tsx'} - {project.title}
        </div>
        <div className="w-10" />
      </div>

      {/* Main Container */}
      <div className="flex h-[320px] md:h-[400px]">
        {/* Sidebar */}
        <div className="w-10 border-r border-white/5 bg-[#121212] flex flex-col items-center py-4 gap-6 opacity-60">
           <svg className="w-4 h-4 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" /></svg>
           <svg className="w-4 h-4 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
           <svg className="w-4 h-4 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        </div>

        {/* Content Area */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Tabs */}
          <div className="flex items-center bg-[#161616]/30 border-b border-white/5">
            <div className="px-4 py-2 bg-[#0D0D0D] border-r border-white/5 flex items-center gap-2 text-blue-400">
               <span className="text-[10px] font-mono">{project.fileName || 'index.tsx'}</span>
               <span className="text-[8px] opacity-40">M</span>
            </div>
            <div className="px-4 py-2 border-r border-white/5 flex items-center gap-2 text-white/40">
               <span className="text-[10px] font-mono">styles.css</span>
            </div>
          </div>

          {/* Breadcrumbs */}
          <div className="px-4 py-1.5 flex items-center gap-2 text-[10px] font-mono text-white/20 border-b border-white/5">
             <span>src</span>
             <span>›</span>
             <span>app</span>
             <span>›</span>
             <span className="text-white/40">{project.fileName || 'index.tsx'}</span>
          </div>

          {/* Editor Area */}
          <div className="flex-1 overflow-hidden p-4 font-mono text-[11px] md:text-xs leading-relaxed">
             <div className="flex">
                <div className="w-8 flex-shrink-0 text-white/10 text-right pr-4 select-none">
                   {project.codeContent?.map((_, i) => (
                     <div key={i}>{i + 1}</div>
                   )) || [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map(n => <div key={n}>{n}</div>)}
                </div>
                <div className="flex-1 min-w-0 text-white/80 overflow-hidden whitespace-pre group-hover/ide:text-white/100 transition-colors">
                   {project.codeLines ? project.codeLines.map((line, i) => (
                     <div key={i} dangerouslySetInnerHTML={{ __html: line }} />
                   )) : (
                     <>
                        <div className="text-blue-400">"use client"<span className="text-white/60">;</span></div>
                        <div className="h-4" />
                        <div><span className="text-purple-400">export default function</span> <span className="text-yellow-400">{project.functionName || 'App'}</span>() {"{"}</div>
                        <div className="pl-4"><span className="text-purple-400">const</span> <span className="text-blue-300">onSubmit</span> = () =&gt; {"{"}</div>
                        <div className="pl-8 text-white/60">console.log("Submitted");</div>
                        <div className="pl-4">{"}"}</div>
                        <div className="h-4" />
                        <div className="pl-4"><span className="text-purple-400">return</span> (</div>
                        <div className="pl-8 text-blue-300">&lt;form <span className="text-yellow-200">onSubmit</span>={`{onSubmit}`}<span>&gt;</span></div>
                        <div className="pl-12 text-white/40">&lt;label <span className="text-yellow-200">htmlFor</span>="origin"&gt;Origin&lt;/label&gt;</div>
                        <div className="pl-12 text-white/40">&lt;input <span className="text-yellow-200">type</span>="text" ... /&gt;</div>
                        <div className="h-4" />
                        <div className="pl-12 text-white/40">&lt;button <span className="text-yellow-200">type</span>="submit"&gt;Submit&lt;/button&gt;</div>
                        <div className="pl-8 text-blue-300">&lt;/form&gt;</div>
                        <div className="pl-4">);</div>
                        <div>{"}"}</div>
                     </>
                   )}
                </div>
             </div>
          </div>

          {/* Status Bar */}
          <div className="flex items-center justify-between px-3 py-1 bg-[#0D0D0D] border-t border-white/5 text-[9px] font-mono text-white/30">
             <div className="flex items-center gap-3">
               <div className="flex items-center gap-1.5">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M12.2 2c-.3 0-.6.1-.8.4L7.1 6.7c-.2.2-.3.5-.3.8v9c0 .3.1.6.3.8l4.3 4.3c.2.2.5.3.8.3s.6-.1.8-.3l4.3-4.3c.2-.2.3-.5.3-.8v-9c0-.3-.1-.6-.3-.8L13 2.4c-.2-.3-.5-.4-.8-.4zm-1.2 5.5l1.2-1.2 1.2 1.2M9 9h6m-6 3h6m-3 3h3" /></svg>
                  <span>main*</span>
               </div>
               <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-yellow-400/50" />
                  <span>0 △ 0</span>
               </div>
             </div>
             <div className="flex items-center gap-4">
                <span>Tab - Showing completions</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function Projects({ t }) {
  const [portfolioVisible, setPortfolioVisible] = useState(false);
  const [typedPortfolioDesc, setTypedPortfolioDesc] = useState('');
  const [startPortfolioTyping, setStartPortfolioTyping] = useState(false);
  const portfolioRef = useRef(null);

  // Portfolio Section Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setPortfolioVisible(true);
          setTimeout(() => setStartPortfolioTyping(true), 800);
        }
      },
      { threshold: 0.1 }
    );

    if (portfolioRef.current) {
      observer.observe(portfolioRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Portfolio Typing Effect
  useEffect(() => {
    if (!startPortfolioTyping) return;

    const portfolioText = t.portfolio?.sectionSubtitle || 'Explore projects crafted with intention and attention to every detail.';
    let currentIndex = 0;
    const typingSpeed = 25;

    const interval = setInterval(() => {
      if (currentIndex <= portfolioText.length) {
        setTypedPortfolioDesc(portfolioText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, typingSpeed);

    return () => clearInterval(interval);
  }, [startPortfolioTyping, t.portfolio?.sectionSubtitle]);

  const projects = [
    {
      title: 'An AI IDE Core',
      descriptionPrefix: "Google Antigravity's Editor view offers tab autocompletion, natural language code commands, and a configurable, and context-aware configurable agent.",
      type: 'IDE Engine',
      tech: ['TypeScript', 'Monaco', 'WebAssembly'],
      fileName: 'page.tsx',
      functionName: 'Editor',
      accent: 'blue',
      comingSoon: false
    },
    {
      title: 'Fintech Dashboard v2',
      descriptionPrefix: "Real-time analytics and transaction management for modern startups. Built with high-performance visualization engines.",
      type: 'Web Application',
      tech: ['Next.js 15', 'Three.js', 'PostgreSQL'],
      fileName: 'Dashboard.tsx',
      functionName: 'Analytics',
      accent: 'purple',
      comingSoon: true
    },
    {
      title: 'Global Supply Chain AI',
      descriptionPrefix: "Optimizing logistics routes using deep learning models. Visualizing complex data paths with interactive 3D globes.",
      type: 'Enterprise Tool',
      tech: ['Python', 'React', 'PyTorch'],
      fileName: 'SupplyChain.py',
      functionName: 'Optimize',
      accent: 'emerald',
      comingSoon: true
    },
  ];

  return (
    <section id="projects" className="pt-4 pb-24 bg-[var(--bg-primary)] overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Our Work Section Header (Moved from Overview) */}
        <div ref={portfolioRef} className="mb-24">
          <div className="text-center mb-8">
            <span 
              className={`inline-block text-[10px] tracking-[0.3em] font-bold text-[var(--text-muted)] uppercase mb-6 transition-all duration-1000 ${
                portfolioVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              PORTFOLIO
            </span>
            
            <h2 
              className={`text-3xl md:text-5xl font-heading tracking-tight mb-8 transition-all duration-1000 delay-300 ${
                portfolioVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <span className="text-[var(--text-primary)]">{t.portfolio?.sectionTitlePrefix || 'Our'} </span>
              <em className="overview-title-accent">{t.portfolio?.sectionTitleAccent || 'Work'}</em>
            </h2>
            
            <div className="min-h-[3em]">
              <p className="text-base md:text-lg text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed">
                {typedPortfolioDesc}
                {startPortfolioTyping && typedPortfolioDesc.length < (t.portfolio?.sectionSubtitle || 'Explore projects crafted with intention and attention to every detail.').length && (
                  <span className="inline-block w-[2px] h-[1.1em] bg-[var(--text-primary)] ml-1 animate-blink align-middle" />
                )}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-32">
          {projects.map((project, index) => (
            <div 
              key={index} 
              className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-20 ${
                index % 2 !== 0 ? 'lg:flex-row-reverse' : ''
              }`}
            >
              {/* Text Content */}
              <div className="flex-1 w-full lg:max-w-[400px]">
                <div className="flex items-center gap-3 mb-6">
                  <div className={`px-2.5 py-1 rounded-md bg-${project.accent}-500/10 border border-${project.accent}-500/20 text-${project.accent}-500 text-[10px] font-mono uppercase tracking-widest`}>
                    {project.type}
                  </div>
                  {project.comingSoon && (
                    <div className="px-2.5 py-1 rounded-md bg-yellow-500/10 border border-yellow-500/20 text-yellow-600 text-[10px] font-mono uppercase tracking-widest animate-pulse">
                        Coming Soon
                    </div>
                  )}
                </div>
                
                <h2 className="text-3xl md:text-5xl font-heading text-[var(--text-primary)] mb-6 leading-tight">
                  {project.title}
                </h2>
                
                <p className="text-base md:text-lg text-[var(--text-secondary)] mb-10 leading-relaxed font-body">
                  {project.descriptionPrefix}
                </p>
                
                {/* Tech Stack Pills */}
                <div className="flex flex-wrap gap-2 mb-10">
                   {project.tech.map((tech, i) => (
                     <span key={i} className="px-3 py-1 transparent-pill border border-[var(--border-color)] text-[var(--text-muted)] text-[11px] font-medium rounded-full hover:border-[var(--text-primary)] hover:text-[var(--text-primary)] transition-all cursor-default">
                        {tech}
                     </span>
                   ))}
                </div>

                {!project.comingSoon && (
                   <div className="flex flex-wrap gap-5 items-center">
                      <a href="#" className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[var(--text-primary)] text-[var(--bg-primary)] text-sm font-medium hover:scale-105 transition-all shadow-xl">
                         {Icons.external}
                         {t.projects.viewProject}
                      </a>
                      <a href="#" className="inline-flex items-center gap-2 text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                         {Icons.github}
                         {t.projects.viewCode}
                      </a>
                   </div>
                )}
              </div>

              {/* IDE Mockup Visual */}
              <div className="flex-1 w-full max-w-[700px] perspective-1000">
                <div className={`transform transition-all duration-1000 group-hover:rotate-0 group-hover:translate-y-0 ${
                  index % 2 === 0 ? 'rotate-[-2deg]' : 'rotate-[2deg]'
                }`}>
                  <IDEMockup project={project} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .transparent-pill {
           background: transparent;
           backdrop-filter: blur(8px);
        }
      `}</style>
    </section>
  );
}
