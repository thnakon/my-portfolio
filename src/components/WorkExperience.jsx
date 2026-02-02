import { useState, useEffect, useRef } from 'react';

export default function WorkExperience({ t }) {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const expData = t.experience;

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

  return (
    <div ref={sectionRef} id="experience" className="mt-32 scroll-mt-32">
      {/* Centered Header */}
      <div className="text-center mb-12">
        <span className={`inline-block text-[9px] tracking-[0.3em] font-bold text-[var(--text-muted)] uppercase mb-4 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          {expData.tag}
        </span>
        <h3 className={`text-2xl md:text-3xl font-heading tracking-tight mb-6 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <span className="text-[var(--text-primary)]">{expData.title} </span>
          <em className="overview-title-accent">{expData.titleAccent}</em>
        </h3>
      </div>

      {/* Experience Timeline */}
      <div className="max-w-4xl mx-auto">
        <div className="relative border-l border-[var(--border-color)] ml-3 md:ml-6 pl-8 md:pl-12 space-y-12 pb-12">
          {expData.items.map((item, idx) => (
            <div 
              key={idx}
              className={`relative transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}
              style={{ transitionDelay: `${500 + (idx * 200)}ms` }}
            >
              {/* Timeline Dot */}
              <div className="absolute left-[-41px] md:left-[-57px] top-0 w-4 h-4 rounded-full bg-[var(--bg-primary)] border-2 border-[var(--text-primary)] z-10" />
              
              <div className="group relative bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-[32px] p-6 md:p-8 transition-all duration-500 hover:border-[var(--text-primary)]/30 hover:shadow-2xl hover:shadow-black/5">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
                  <div>
                    <h4 className="text-xl font-heading text-[var(--text-primary)] mb-1">{item.role}</h4>
                    <p className="text-sm font-semibold text-[var(--text-primary)] opacity-60 uppercase tracking-widest">{item.company}</p>
                  </div>
                  <span className="inline-block px-4 py-1.5 rounded-full bg-[var(--bg-primary)] border border-[var(--border-color)] text-[10px] font-bold text-[var(--text-muted)] group-hover:text-[var(--text-primary)] group-hover:border-[var(--text-primary)]/20 transition-all">
                    {item.duration}
                  </span>
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
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
