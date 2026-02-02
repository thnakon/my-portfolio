import { useState, useEffect, useRef } from 'react';

export default function OpenSource({ t }) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const data = t.openSource;

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

      {/* Grid Layout for Contributions */}
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 gap-8">
          {data.items.map((item, idx) => (
            <div 
              key={idx}
              className={`group relative bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-[32px] p-6 md:p-8 transition-all duration-500 hover:border-[var(--text-primary)]/30 hover:shadow-2xl hover:shadow-black/5 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
              style={{ transitionDelay: `${500 + (idx * 200)}ms` }}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
                <div>
                  <h4 className="text-xl font-heading text-[var(--text-primary)] mb-1">{item.name}</h4>
                  <p className="text-sm font-semibold text-[var(--text-primary)] opacity-60 uppercase tracking-widest">{item.project}</p>
                </div>
                <div className="flex items-center gap-2">
                   <a href="https://github.com/thnakon" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[var(--bg-primary)] border border-[var(--border-color)] text-[10px] font-bold text-[var(--text-muted)] group-hover:text-[var(--text-primary)] group-hover:border-[var(--text-primary)]/20 transition-all">
                      VIEW GITHUB
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                   </a>
                </div>
              </div>
              
              <p className="text-[var(--text-secondary)] text-sm md:text-base leading-relaxed mb-6">
                {item.description}
              </p>
              
              <div className="flex flex-wrap gap-2">
                {item.achievements.map((achievement, i) => (
                  <span 
                    key={i}
                    className="text-[9px] font-bold uppercase tracking-wider px-3 py-1 bg-[var(--bg-primary)]/50 border border-[var(--border-color)] rounded-lg text-[var(--text-muted)]"
                  >
                    {achievement}
                  </span>
                ))}
              </div>

              {/* Decorative background element on hover */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-500/5 to-teal-500/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
