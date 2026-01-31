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

const IDEMockup = ({ project, isSecondary = false }) => {
  return (
    <div className={`w-full relative rounded-xl overflow-hidden bg-[#0D0D0D] border border-white/10 shadow-2xl group/ide transition-all duration-700 hover:border-white/20 ${isSecondary ? 'opacity-90 scale-95 origin-center' : ''}`}>
      {/* Title Bar */}
      <div className="flex items-center justify-between px-4 py-1.5 border-b border-white/10 bg-[#161616]/50">
        <div className="flex items-center gap-1.5">
          <div className="w-2 h-2 rounded-full bg-[#FF5F56]" />
          <div className="w-2 h-2 rounded-full bg-[#FFBD2E]" />
          <div className="w-2 h-2 rounded-full bg-[#27C93F]" />
        </div>
        <div className="text-[9px] font-mono text-white/40 tracking-wider">
           {isSecondary ? (project.secondaryFileName || 'App.vue') : (project.fileName || 'index.tsx')}
        </div>
        <div className="w-8" />
      </div>

      {/* Main Container */}
      <div className="flex h-[280px] md:h-[350px]">
        {/* Sidebar */}
        <div className="w-8 border-r border-white/5 bg-[#121212] flex flex-col items-center py-4 gap-5 opacity-40">
           <svg className="w-3.5 h-3.5 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" /></svg>
           <svg className="w-3.5 h-3.5 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
           <svg className="w-3.5 h-3.5 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        </div>

        {/* Content Area */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Editor Area */}
          <div className="flex-1 overflow-hidden p-4 font-mono text-[10px] md:text-[11px] leading-relaxed">
             <div className="flex">
                <div className="w-6 flex-shrink-0 text-white/10 text-right pr-3 select-none">
                   {(isSecondary ? (project.secondaryCodeLines || []) : (project.codeLines || [])).map((_, i) => (
                     <div key={i}>{i + 1}</div>
                   ))}
                </div>
                <div className="flex-1 min-w-0 text-white/80 overflow-hidden whitespace-pre">
                   {(isSecondary ? (project.secondaryCodeLines || []) : (project.codeLines || [])).map((line, i) => (
                     <div key={i} dangerouslySetInnerHTML={{ __html: line }} />
                   ))}
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProjectItem = ({ project, index, t }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [typedDesc, setTypedDesc] = useState('');
  const [startTyping, setStartTyping] = useState(false);
  const itemRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          setTimeout(() => setStartTyping(true), 600);
        }
      },
      { threshold: 0.2 }
    );

    if (itemRef.current) observer.observe(itemRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!startTyping) return;

    let currentIndex = 0;
    const fullText = project.descriptionPrefix;
    const interval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setTypedDesc(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 15);

    return () => clearInterval(interval);
  }, [startTyping, project.descriptionPrefix]);

  return (
    <div 
      ref={itemRef}
      className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-20 transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
      }`}
    >
      {/* Text Content */}
      <div className="flex-1 w-full lg:max-w-[400px]">
        <div className={`flex items-center gap-3 mb-6 transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}>
          <div className={`px-2.5 py-1 rounded-md bg-${project.accent}-500/10 border border-${project.accent}-500/20 text-${project.accent}-500 text-[10px] font-mono uppercase tracking-widest`}>
            {project.type}
          </div>
          {project.comingSoon && (
            <div className="px-2.5 py-1 rounded-md bg-yellow-500/10 border border-yellow-500/20 text-yellow-600 text-[10px] font-mono uppercase tracking-widest animate-pulse">
                Coming Soon
            </div>
          )}
        </div>
        
        <h2 className={`text-3xl md:text-5xl font-heading text-[var(--text-primary)] mb-6 leading-tight transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          {project.title}
        </h2>
        
        <div className="min-h-[6em]">
          <p className="text-base md:text-lg text-[var(--text-secondary)] mb-10 leading-relaxed font-body">
            {typedDesc}
            {startTyping && typedDesc.length < project.descriptionPrefix.length && (
              <span className="inline-block w-[2px] h-[1.1em] bg-[var(--text-primary)] ml-1 animate-blink align-middle" />
            )}
          </p>
        </div>
        
        {/* Tech Stack Pills */}
        <div className={`flex flex-wrap gap-3 mb-10 transition-all duration-700 delay-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
           {project.tech.map((tech, i) => (
             <div 
               key={i} 
               className="flex items-center gap-2 px-3 py-1.5 transparent-pill border border-[var(--border-color)] text-[var(--text-muted)] text-[11px] font-medium rounded-full hover:border-[var(--text-primary)] hover:text-[var(--text-primary)] hover:scale-105 transition-all cursor-default group/pill"
               style={{ transitionDelay: `${800 + (i * 100)}ms` }}
             >
                <img 
                  src={`https://skillicons.dev/icons?i=${tech.icon}`} 
                  alt={tech.name} 
                  className="w-3.5 h-3.5 object-contain" 
                />
                <span>{tech.name}</span>
             </div>
           ))}
        </div>

        {!project.comingSoon && (
           <div className={`flex flex-wrap gap-5 items-center transition-all duration-700 delay-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <a href={project.viewUrl || "#"} className="btn-premium-cta hover:scale-105 !py-1.5 !px-2 !pl-6 !text-sm">
                 {t.projects.viewProject}
                 <div className="cta-arrow-circle !w-8 !h-8">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7-7 7M3 12h18" />
                    </svg>
                 </div>
              </a>
              <a href={project.githubUrl || "#"} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
                 {Icons.github}
                 {t.projects.viewCode}
              </a>
           </div>
        )}
      </div>

      {/* Enhanced IDE Mockup Visual with Side-Push Hover Effect */}
      <div className={`flex-1 w-full max-w-[700px] perspective-1000 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
        <div className="relative group/visuals w-full h-[320px] md:h-[400px]">
          {/* Primary Mockup - Moves slightly left on hover */}
          <div className="absolute inset-0 z-20 transform transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover/visuals:-translate-x-[15%] group-hover/visuals:-rotate-3 group-hover/visuals:scale-95 group-hover/visuals:opacity-40">
            <IDEMockup project={project} />
          </div>
          
          {/* Secondary Mockup - Pops out slightly to the right on hover */}
          <div className="absolute inset-0 z-10 opacity-0 scale-95 translate-x-[10%] transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover/visuals:z-30 group-hover/visuals:opacity-100 group-hover/visuals:scale-100 group-hover/visuals:translate-x-[15%] group-hover/visuals:rotate-2">
            <IDEMockup project={project} isSecondary={true} />
          </div>

          {/* Background Decorative Blur */}
          <div className={`absolute -inset-10 bg-${project.accent}-500/10 rounded-full blur-[100px] opacity-0 group-hover/visuals:opacity-100 transition-opacity duration-1000`} />
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

    if (portfolioRef.current) observer.observe(portfolioRef.current);
    return () => observer.disconnect();
  }, []);

  // Portfolio Typing Effect
  useEffect(() => {
    if (!startPortfolioTyping) return;
    const portfolioText = t.portfolio?.sectionSubtitle || 'Explore projects crafted with intention and attention to every detail.';
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= portfolioText.length) {
        setTypedPortfolioDesc(portfolioText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 25);
    return () => clearInterval(interval);
  }, [startPortfolioTyping, t.portfolio?.sectionSubtitle]);

  const projects = [
    {
      title: t.projects.obounERP.title,
      descriptionPrefix: t.projects.obounERP.description,
      type: t.projects.obounERP.type,
      githubUrl: "https://github.com/thnakon/ERP_PMS",
      tech: [
        { name: 'Laravel 11', icon: 'laravel' },
        { name: 'Vue.js 3', icon: 'vue' },
        { name: 'MySQL', icon: 'mysql' },
        { name: 'Tailwind', icon: 'tailwind' },
        { name: 'Docker', icon: 'docker' }
      ],
      fileName: 'SaleController.php',
      codeLines: [
        '<span class="text-purple-400">public function</span> <span class="text-yellow-400">store</span>(SaleRequest <span class="text-blue-300">$request</span>)',
        '{',
        '    <span class="text-blue-300">$sale</span> = <span class="text-emerald-400">Sale</span>::create(<span class="text-blue-300">$request</span>->validated());',
        '    ',
        '    <span class="text-purple-400">foreach</span> (<span class="text-blue-300">$request</span>->items <span class="text-purple-400">as</span> <span class="text-blue-300">$item</span>) {',
        '        <span class="text-blue-300">$sale</span>->items()->create([',
        '            <span class="text-emerald-300">\'product_id\'</span> => <span class="text-blue-300">$item</span>[\'id\'],',
        '            <span class="text-emerald-300">\'quantity\'</span>   => <span class="text-blue-300">$item</span>[\'qty\'],',
        '            <span class="text-emerald-300">\'price\'</span>      => <span class="text-blue-300">$item</span>[\'price\'],',
        '        ]);',
        '        ',
        '        <span class="text-blue-300">$item</span>->decrementInventory();',
        '    }',
        '    ',
        '    <span class="text-purple-400">return</span> response()->json(<span class="text-blue-300">$sale</span>->load(<span class="text-emerald-300">\'items\'</span>));',
        '}'
      ],
      secondaryFileName: 'InventoryDetail.vue',
      secondaryCodeLines: [
        '<span class="text-blue-300">&lt;template&gt;</span>',
        '  <span class="text-white/40">&lt;div class="p-6"&gt;</span>',
        '    <span class="text-white/40">&lt;h3&gt;Stock Status&lt;/h3&gt;</span>',
        '    <span class="text-white/40">&lt;Chart :data="stockLevels" /&gt;</span>',
        '    <span class="text-white/40">&lt;p&gt;Warehouse: Zone A&lt;/p&gt;</span>',
        '  <span class="text-white/40">&lt;/div&gt;</span>',
        '<span class="text-blue-300">&lt;/template&gt;</span>',
        '',
        '<span class="text-purple-400">&lt;script setup&gt;</span>',
        '<span class="text-purple-400">const</span> <span class="text-blue-300">props</span> = defineProps([\'id\']);',
        '<span class="text-purple-400">const</span> <span class="text-blue-300">stockLevels</span> = ref([]);',
        '<span class="text-purple-400">&lt;/script&gt;</span>'
      ],
      accent: 'blue',
      comingSoon: false
    },
    {
      title: t.projects.babybib.title,
      descriptionPrefix: t.projects.babybib.description,
      type: t.projects.babybib.type,
      githubUrl: "https://github.com/thnakon/Babybib",
      tech: [
        { name: 'HTML5', icon: 'html' },
        { name: 'CSS3', icon: 'css' },
        { name: 'JavaScript', icon: 'js' },
        { name: 'PHP', icon: 'php' }
      ],
      fileName: 'index.php',
      codeLines: [
        '<span class="text-blue-300">&lt;?php</span>',
        '<span class="text-purple-400">require_once</span> <span class="text-emerald-300">\'config.php\'</span>;',
        '',
        '<span class="text-purple-400">function</span> <span class="text-yellow-400">getBibliography</span>(<span class="text-blue-300">$type</span>) {',
        '    <span class="text-blue-300">$sql</span> = <span class="text-emerald-300">"SELECT * FROM citations WHERE type = ?"</span>;',
        '    <span class="text-blue-300">$stmt</span> = <span class="text-blue-300">$pdo</span>->prepare(<span class="text-blue-300">$sql</span>);',
        '    <span class="text-blue-300">$stmt</span>->execute([<span class="text-blue-300">$type</span>]);',
        '    <span class="text-purple-400">return</span> <span class="text-blue-300">$stmt</span>->fetchAll();',
        '}',
        '<span class="text-blue-300">?&gt;</span>'
      ],
      secondaryFileName: 'scripts.js',
      secondaryCodeLines: [
        '<span class="text-purple-400">const</span> <span class="text-yellow-400">formatCitation</span> = (data) => {',
        '  <span class="text-purple-400">return</span> <span class="text-emerald-300">`${data.author} (${data.year}).`</span>;',
        '};',
        '',
        '<span class="text-blue-300">document</span>.querySelector(<span class="text-emerald-300">\'#citeBtn\'</span>).addEventListener(<span class="text-emerald-300">\'click\'</span>, () => {',
        '  <span class="text-white/40">// Handle generation logic</span>',
        '});'
      ],
      accent: 'purple',
      comingSoon: false
    },
    {
      title: t.projects.scribehub.title,
      descriptionPrefix: t.projects.scribehub.description,
      type: t.projects.scribehub.type,
      githubUrl: "https://github.com/thnakon/scribehub",
      tech: [
        { name: 'React', icon: 'react' },
        { name: 'Next.js', icon: 'nextjs' },
        { name: 'Supabase', icon: 'supabase' },
        { name: 'TypeScript', icon: 'ts' },
        { name: 'Tailwind', icon: 'tailwind' }
      ],
      fileName: 'ResearchAgent.ts',
      codeLines: [
        '<span class="text-purple-400">export async function</span> <span class="text-yellow-400">analyzePaper</span>(content: string) {',
        '  <span class="text-purple-400">const</span> <span class="text-blue-300">completion</span> = <span class="text-purple-400">await</span> openai.chat.completions.create({',
        '    model: <span class="text-emerald-300">"gpt-4-turbo"</span>,',
        '    messages: [',
        '      { role: <span class="text-emerald-300">"system"</span>, content: <span class="text-emerald-300">"Expert researcher agent"</span> },',
        '      { role: <span class="text-emerald-300">"user"</span>, content: content }',
        '    ]',
        '  });',
        '  <span class="text-purple-400">return</span> <span class="text-blue-300">completion</span>.choices[0].message;',
        '}'
      ],
      secondaryFileName: 'Workspace.tsx',
      secondaryCodeLines: [
        '<span class="text-purple-400">export const</span> <span class="text-yellow-400">ScribeWorkspace</span> = () => {',
        '  <span class="text-purple-400">const</span> { nodes, edges } = useResearchGraph();',
        '  <span class="text-purple-400">return</span> (',
        '    <span class="text-blue-300">&lt;KnowledgeGraph</span> ',
        '      <span class="text-blue-300">nodes</span>={<span class="text-blue-300">nodes</span>} ',
        '      <span class="text-blue-300">edges</span>={<span class="text-blue-300">edges</span>} ',
        '    <span class="text-blue-300">/&gt;</span>',
        '  );',
        '};'
      ],
      accent: 'emerald',
      comingSoon: false
    },
  ];

  return (
    <section id="projects" className="pt-4 pb-24 bg-[var(--bg-primary)] overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Our Work Section Header */}
        <div ref={portfolioRef} className="mb-24">
          <div className="text-center mb-8">
            <span className={`inline-block text-[10px] tracking-[0.3em] font-bold text-[var(--text-muted)] uppercase mb-6 transition-all duration-1000 ${portfolioVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              PORTFOLIO
            </span>
            <h2 className={`text-3xl md:text-5xl font-heading tracking-tight mb-8 transition-all duration-1000 delay-300 ${portfolioVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <span className="text-[var(--text-primary)]">{t.portfolio?.sectionTitlePrefix || 'Our'} </span>
              <em className="overview-title-accent">{t.portfolio?.sectionTitleAccent || 'Work'}</em>
            </h2>
            <div className="min-h-[3em]">
              <p className="text-base md:text-lg text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed">
                {typedPortfolioDesc}
                {startPortfolioTyping && typedPortfolioDesc.length < (t.portfolio?.sectionSubtitle || '').length && (
                  <span className="inline-block w-[2px] h-[1.1em] bg-[var(--text-primary)] ml-1 animate-blink align-middle" />
                )}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-32">
          {projects.map((project, index) => (
            <ProjectItem key={index} project={project} index={index} t={t} />
          ))}
        </div>

        {/* See More Work Button */}
        <div 
          className={`mt-16 flex justify-center transition-all duration-1000 delay-500 ${
            portfolioVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <Link 
            href="https://github.com/thnakon" 
            target="_blank"
            className="btn-premium-cta !border-none !bg-transparent !py-2 !pl-6 !pr-2 group scale-90 md:scale-100"
          >
            <span className="text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase transition-all duration-500">
              {t.projects.seeMoreWork}
            </span>
            <div className="cta-arrow-circle !w-9 !h-9">
              <svg 
                className="w-4 h-4" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7-7 7M3 12h18" />
              </svg>
            </div>
          </Link>
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
