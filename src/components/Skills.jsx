import { useState, useEffect, useRef } from 'react';

export default function Skills({ t }) {
  const [isVisible, setIsVisible] = useState(false);
  const [typedSkillsDesc, setTypedSkillsDesc] = useState('');
  const [startSkillsTyping, setStartSkillsTyping] = useState(false);
  const sectionRef = useRef(null);

  const allSkills = [
    { name: 'HTML5', icon: 'html' },
    { name: 'CSS3', icon: 'css' },
    { name: 'JavaScript', icon: 'js' },
    { name: 'TypeScript', icon: 'ts' },
    { name: 'Bun', icon: 'bun' },
    { name: 'Node.js', icon: 'nodejs' },
    { name: 'PHP', icon: 'php' },
    { name: 'Python', icon: 'py' },
    { name: 'Laravel', icon: 'laravel' },
    { name: 'PHPCake', icon: 'php' },
    { name: 'Next.js', icon: 'nextjs' },
    { name: 'React', icon: 'react' },
    { name: 'Tailwind CSS', icon: 'tailwind' },
    { name: 'Bootstrap 5', icon: 'bootstrap' },
    { name: 'MySQL', icon: 'mysql' },
    { name: 'PostgreSQL', icon: 'postgres' },
    { name: 'Supabase', icon: 'supabase' },
    { name: 'Git', icon: 'git' },
    { name: 'GitHub', icon: 'github' },
    { name: 'GitLab', icon: 'gitlab' },
    { name: 'Sourcetree', icon: '/images/uses/sourcetree-logo.png', isCustom: true },
    { name: 'Cypress', icon: 'cypress' },
    { name: 'Docker', icon: 'docker' },
    { name: 'YOLO', icon: 'pytorch' },
    { name: 'Figma', icon: 'figma' },
    { name: 'Vercel', icon: 'vercel' },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Toggle visibility based on intersection to allow "scatter" and "assemble"
        setIsVisible(entry.isIntersecting);
        if (entry.isIntersecting) {
          setTimeout(() => setStartSkillsTyping(true), 800);
        } else {
          setStartSkillsTyping(false);
          setTypedSkillsDesc('');
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!startSkillsTyping) return;
    const skillsText = t.skills.subtitle || 'The Secret Sauce';
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= skillsText.length) {
        setTypedSkillsDesc(skillsText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 25);
    return () => clearInterval(interval);
  }, [startSkillsTyping, t.skills.subtitle]);
  return (
    <section id="skills" className="relative py-24 bg-[var(--bg-primary)]" ref={sectionRef}>

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="mb-20 text-center">
            <span className={`inline-block text-[10px] tracking-[0.3em] font-bold text-[var(--text-muted)] uppercase mb-6 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              EXPERTISE
            </span>
            <h2 className={`text-3xl md:text-5xl font-heading tracking-tight mb-8 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <span className="text-[var(--text-primary)]">{t.skills.title.split(' ')[0]} </span>
              <em className="overview-title-accent">{t.skills.title.split(' ').slice(1).join(' ')}</em>
            </h2>
            <div className="min-h-[2em]">
              <p className="text-base md:text-lg text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed">
                {typedSkillsDesc}
                {startSkillsTyping && typedSkillsDesc.length < (t.skills.subtitle || '').length && (
                  <span className="inline-block w-[2px] h-[1.1em] bg-[var(--text-primary)] ml-1 animate-blink align-middle" />
                )}
              </p>
            </div>
        </div>

        {/* Skills Wall */}
        <div className="flex flex-wrap justify-center gap-3 md:gap-4 max-w-4xl mx-auto">
          {allSkills.map((skill, index) => (
            <div 
              key={index}
              className={`group relative p-3 md:p-4 rounded-xl backdrop-blur-sm bg-[var(--bg-secondary)]/80 border border-[var(--border-color)] transition-all duration-500 ease-out cursor-default ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              } hover:border-transparent hover:-translate-y-3 hover:scale-105 hover:rotate-[1deg] hover:shadow-2xl hover:shadow-[var(--accent-primary)]/20`}
              style={{ 
                transitionDelay: isVisible ? `${(index % 12) * 50 + 600}ms` : '0ms'
              }}
            >
              {/* Glassmorphism glow effect on hover */}
              <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-[var(--accent-primary)]/10 via-[var(--accent-secondary)]/10 to-transparent -z-10" />
              <div className="absolute -inset-[1px] rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-[var(--accent-primary)]/40 to-[var(--accent-secondary)]/40 -z-20 blur-sm" />
              
              <img 
                src={skill.isCustom ? skill.icon : `https://skillicons.dev/icons?i=${skill.icon}`} 
                alt={skill.name}
                className="w-7 h-7 md:w-9 md:h-9 transition-all duration-300 ease-out group-hover:scale-125 group-hover:drop-shadow-lg object-contain"
              />
              
              {/* Enhanced Tooltip with animation */}
              <div className="absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-[var(--text-primary)] text-[var(--bg-primary)] text-[10px] font-bold rounded-lg opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100 transition-all duration-300 pointer-events-none whitespace-nowrap z-10 shadow-xl">
                {skill.name}
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[var(--text-primary)] rotate-45" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
