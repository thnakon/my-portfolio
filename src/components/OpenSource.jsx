import { useState, useEffect, useRef } from 'react';

export default function OpenSource({ t }) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const data = t.openSource;

  /* Live GitHub Stats Logic */
  const [githubStats, setGithubStats] = useState({ followers: 0, repos: 12, stars: 5 });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    
    // Fetch GitHub Stats
    const fetchStats = async () => {
      try {
        const userRes = await fetch('https://api.github.com/users/thnakon');
        const userData = await userRes.json();
        
        const reposRes = await fetch('https://api.github.com/users/thnakon/repos?per_page=100');
        const reposData = await reposRes.json();
        const totalStars = reposData.reduce((acc, repo) => acc + repo.stargazers_count, 0);

        setGithubStats({
          followers: userData.followers || 0,
          repos: userData.public_repos || 0,
          stars: totalStars || 0
        });
      } catch (error) {
        console.error("Error fetching GitHub stats:", error);
      }
    };
    fetchStats();

    return () => observer.disconnect();
  }, []);

  if (!data) return null;

  return (
    <div ref={sectionRef} id="opensource" className="mt-32 scroll-mt-32">
      {/* Centered Header */}
      <div className="text-center mb-12">
        <span className={`inline-block text-[9px] tracking-[0.3em] font-bold text-[var(--text-muted)] uppercase mb-4 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          {data.tag}
        </span>
        <h3 className={`text-2xl md:text-3xl font-heading tracking-tight mb-6 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <span className="text-[var(--text-primary)]">{data.title} </span>
          <em className="overview-title-accent">{data.titleAccent}</em>
        </h3>
      </div>

      {/* Grid Layout for Contributions & Stats */}
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Main GitHub Activity Card (8 Columns) */}
          <div 
            className={`lg:col-span-8 group relative bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-[2rem] p-5 md:p-6 transition-all duration-500 hover:border-[var(--text-primary)]/30 hover:shadow-2xl hover:shadow-black/10 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
            style={{ transitionDelay: '500ms' }}
          >
            {/* Subtle Gradient Glow */}
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-[2.1rem] blur opacity-0 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
            
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="relative w-10 h-10 rounded-full border-2 border-[var(--border-color)] overflow-hidden group-hover:border-[var(--text-primary)] transition-colors">
                    <img src="https://github.com/thnakon.png" alt="thnakon" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="text-sm font-heading text-[var(--text-primary)] leading-tight">thnakon</h4>
                    <p className="text-[8px] font-semibold text-[var(--text-primary)] opacity-60 uppercase tracking-widest leading-none mt-1">{data.contributionTitle}</p>
                  </div>
                </div>
                <a href="https://github.com/thnakon" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--bg-primary)] border border-[var(--border-color)] text-[8px] font-bold text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:border-[var(--text-primary)] transition-all uppercase tracking-wider">
                  {data.viewProfile}
                </a>
              </div>

              <div className="p-4 bg-zinc-500/10 rounded-2xl border border-[var(--border-color)] overflow-hidden">
                <div className="relative w-full overflow-x-auto no-scrollbar">
                   <img 
                    src={`https://ghchart.rshah.org/40c463/thnakon`} 
                    alt="GitHub Contributions" 
                    className="min-w-[550px] w-full h-auto dark:brightness-110 contrast-110" 
                   />
                </div>
              </div>
              
              <div className="mt-4 flex justify-between items-center text-[7px] font-medium text-[var(--text-muted)] uppercase tracking-widest opacity-60">
                  <span>{data.timeline}</span>
                  <div className="flex items-center gap-2">
                    <span>{data.less}</span>
                    <div className="flex gap-0.5">
                      <div className="w-1.5 h-1.5 bg-emerald-500/10 rounded-sm" />
                      <div className="w-1.5 h-1.5 bg-emerald-500/40 rounded-sm" />
                      <div className="w-1.5 h-1.5 bg-emerald-500/70 rounded-sm" />
                      <div className="w-1.5 h-1.5 bg-emerald-500 rounded-sm shadow-[0_0_8px_rgba(16,185,129,0.3)]" />
                    </div>
                    <span>{data.more}</span>
                  </div>
              </div>
            </div>
          </div>

          {/* Quick Stats Cards (4 Columns) */}
          <div className="lg:col-span-4 grid grid-cols-1 gap-3">
             {/* Followers */}
             <div className={`relative overflow-hidden p-3.5 md:p-4 rounded-[1.5rem] bg-[var(--bg-secondary)] border border-[var(--border-color)] group hover:border-blue-500/40 transition-all duration-500 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`} style={{ transitionDelay: '600ms' }}>
                {/* Background Large Icon Watermark */}
                <div className="absolute w-20 h-20 -bottom-3 -right-3 transition-all duration-700 group-hover:scale-110 group-hover:-rotate-12 opacity-[0.03] group-hover:opacity-[0.08] pointer-events-none">
                  <svg className="w-full h-full text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>

                <div className="relative z-10 h-full flex flex-col justify-between">
                  <div className="flex items-start justify-between">
                    <div className="p-1.5 rounded-lg bg-blue-500/10 text-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.1)]">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                      </svg>
                    </div>
                    <span className="text-[9px] font-bold text-[var(--text-muted)] uppercase tracking-tight opacity-80">{data.followers}</span>
                  </div>
                  <div className="mt-4">
                    <div className="text-2xl font-heading font-bold text-[var(--text-primary)] leading-none">{githubStats.followers}</div>
                    <div className="text-[9px] text-[var(--text-muted)] font-mono mt-1.5 tracking-wide uppercase opacity-60">{data.followersSubtitle}</div>
                  </div>
                </div>
             </div>

             {/* Repositories */}
             <div className={`relative overflow-hidden p-3.5 md:p-4 rounded-[1.5rem] bg-[var(--bg-secondary)] border border-[var(--border-color)] group hover:border-emerald-500/40 transition-all duration-500 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`} style={{ transitionDelay: '700ms' }}>
                {/* Background Large Icon Watermark */}
                <div className="absolute w-20 h-20 -bottom-3 -right-3 transition-all duration-700 group-hover:scale-110 group-hover:-rotate-12 opacity-[0.03] group-hover:opacity-[0.08] pointer-events-none">
                  <svg className="w-full h-full text-emerald-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                  </svg>
                </div>

                <div className="relative z-10 h-full flex flex-col justify-between">
                  <div className="flex items-start justify-between">
                    <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.1)]">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                      </svg>
                    </div>
                    <span className="text-[9px] font-bold text-[var(--text-muted)] uppercase tracking-tight opacity-80">{data.repos}</span>
                  </div>
                  <div className="mt-4">
                    <div className="text-2xl font-heading font-bold text-[var(--text-primary)] leading-none">{githubStats.repos}</div>
                    <div className="text-[9px] text-[var(--text-muted)] font-mono mt-1.5 tracking-wide uppercase opacity-60">{data.reposSubtitle}</div>
                  </div>
                </div>
             </div>

             {/* Stars */}
             <div className={`relative overflow-hidden p-3.5 md:p-4 rounded-[1.5rem] bg-[var(--bg-secondary)] border border-[var(--border-color)] group hover:border-amber-500/40 transition-all duration-500 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`} style={{ transitionDelay: '800ms' }}>
                {/* Background Large Icon Watermark */}
                <div className="absolute w-20 h-20 -bottom-3 -right-3 transition-all duration-700 group-hover:scale-110 group-hover:-rotate-12 opacity-[0.03] group-hover:opacity-[0.08] pointer-events-none">
                  <svg className="w-full h-full text-amber-500" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                </div>

                <div className="relative z-10 h-full flex flex-col justify-between">
                  <div className="flex items-start justify-between">
                    <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.1)]">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.382-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                      </svg>
                    </div>
                    <span className="text-[9px] font-bold text-[var(--text-muted)] uppercase tracking-tight opacity-80">{data.stars}</span>
                  </div>
                  <div className="mt-4">
                    <div className="text-2xl font-heading font-bold text-[var(--text-primary)] leading-none">{githubStats.stars}</div>
                    <div className="text-[9px] text-[var(--text-muted)] font-mono mt-1.5 tracking-wide uppercase opacity-60">{data.starsSubtitle}</div>
                  </div>
                </div>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
}
