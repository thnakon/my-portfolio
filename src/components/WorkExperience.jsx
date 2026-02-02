import { useState, useEffect, useRef } from 'react';

export default function WorkExperience({ t }) {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState(null);
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
      {/* Section Header */}
      <div className="text-center mb-24">
        <span className={`inline-block text-[10px] tracking-[0.3em] font-bold text-[var(--text-muted)] uppercase mb-6 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          {expData.tag}
        </span>
        <h2 className={`text-3xl md:text-5xl font-heading tracking-tight mb-8 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <span className="text-[var(--text-primary)]">{expData.title} </span>
          <em className="overview-title-accent">{expData.titleAccent}</em>
        </h2>
      </div>

      <div className="max-w-6xl mx-auto relative px-6">
        {/* Central Timeline Line */}
        <div className="absolute left-[30%] top-0 bottom-0 w-[1px] bg-[var(--border-color)] hidden lg:block opacity-30" />

        <div className="space-y-32 relative">
          {expData.items.map((item, idx) => (
            <div 
              key={idx}
              className={`relative grid grid-cols-1 lg:grid-cols-[3fr_7fr] gap-12 lg:gap-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
              style={{ transitionDelay: `${idx * 200}ms` }}
            >
              {/* Left Side: Company & Logo */}
              <div className="lg:text-right flex flex-col lg:items-end order-2 lg:order-1">
                <div className="mb-6">
                  <span className="text-[10px] font-bold text-[var(--text-muted)] tracking-widest uppercase opacity-60">
                    {item.duration}
                  </span>
                </div>
                <div className="flex items-center lg:flex-row-reverse gap-5 mb-4">
                  <div className="w-14 h-14 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-color)] flex items-center justify-center overflow-hidden p-3 group-hover:border-[var(--text-primary)]/30 transition-all duration-500 shadow-xl">
                    <img src={item.logo} alt={item.company} className="w-full h-full object-contain" />
                  </div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-heading text-[var(--text-primary)] tracking-tight leading-tight">
                      {item.company}
                    </h3>
                  </div>
                </div>
                <div className="flex flex-col lg:items-end gap-2 text-[10px] font-medium text-[var(--text-muted)] tracking-wide uppercase opacity-70">
                  <div className="flex items-center lg:flex-row-reverse gap-2">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                    <span>{item.location}</span>
                  </div>
                  <div className="flex items-center lg:flex-row-reverse gap-2">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                    <span>{item.workType}</span>
                  </div>
                </div>
              </div>

              {/* Central Dot/Avatar Connection */}
              <div className="absolute left-[calc(30%-1px)] top-0 bottom-0 hidden lg:flex items-center justify-center z-10">
                <div className={`w-[2px] h-full absolute top-0 bottom-0 transition-all duration-700 ${hoveredIdx === idx ? 'bg-gradient-to-b from-transparent via-[var(--text-primary)] to-transparent opacity-100' : 'bg-transparent opacity-0'}`} />
                <div className="relative">
                   <div className={`w-10 h-10 rounded-full border-2 border-[var(--bg-primary)] bg-[var(--bg-secondary)] transition-all duration-700 shadow-2xl flex items-center justify-center overflow-hidden ${hoveredIdx === idx ? 'scale-110 border-[var(--text-primary)]' : 'scale-75 opacity-50'}`}>
                      <img src="https://github.com/thnakon.png" alt="Profile" className="w-full h-full object-cover" />
                   </div>
                   <div className={`absolute -inset-2 bg-[var(--text-primary)]/20 rounded-full blur-md transition-opacity duration-700 ${hoveredIdx === idx ? 'opacity-100 animate-pulse' : 'opacity-0'}`} />
                </div>
              </div>

              {/* Right Side: Role & Description */}
              <div className="order-1 lg:order-2">
                <div className="mb-4">
                  <h4 className="text-2xl md:text-3xl font-heading text-[var(--text-primary)] mb-4">{item.role}</h4>
                  <p 
                    className="text-sm md:text-base text-[var(--text-secondary)] leading-relaxed mb-8 opacity-80"
                    dangerouslySetInnerHTML={{ __html: item.description }}
                  />
                </div>

                <ul className="space-y-4 mb-8">
                  {item.achievements.map((achievement, i) => (
                    <li key={i} className="flex items-start gap-4 group/item">
                      <div className="mt-2.5 w-1.5 h-1.5 rounded-full bg-[var(--text-primary)]/40 group-hover/item:bg-[var(--text-primary)] transition-colors shrink-0" />
                      <p 
                        className="text-xs md:text-sm text-[var(--text-secondary)] leading-relaxed group-hover/item:text-[var(--text-primary)] transition-colors duration-300"
                        dangerouslySetInnerHTML={{ __html: achievement }}
                      />
                    </li>
                  ))}
                </ul>

                {/* Tech Stack Pills */}
                <div className="flex flex-wrap gap-2.5">
                  {item.technologies.map((tech, i) => (
                    <div 
                      key={i}
                      className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] hover:border-[var(--text-primary)]/40 hover:-translate-y-0.5 transition-all duration-300 group/pill"
                    >
                      <img src={tech.icon} alt={tech.name} className="w-3.5 h-3.5 object-contain transition-all duration-300 group-hover/pill:scale-110" />
                      <span className="text-[10px] font-bold text-[var(--text-muted)] tracking-tight uppercase group-hover/pill:text-[var(--text-primary)] transition-colors">
                        {tech.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
