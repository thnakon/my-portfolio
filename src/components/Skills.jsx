import { useState, useEffect, useRef } from 'react';

export default function Skills({ t }) {
  const [isVisible, setIsVisible] = useState(false);
  const [typedSkillsDesc, setTypedSkillsDesc] = useState('');
  const [startSkillsTyping, setStartSkillsTyping] = useState(false);
  const sectionRef = useRef(null);

  const allSkills = [
    { name: 'React', icon: 'react' },
    { name: 'Next.js', icon: 'nextjs' },
    { name: 'TypeScript', icon: 'ts' },
    { name: 'Tailwind CSS', icon: 'tailwind' },
    { name: 'Laravel', icon: 'laravel' },
    { name: 'Vue.js', icon: 'vue' },
    { name: 'PHP', icon: 'php' },
    { name: 'JavaScript', icon: 'js' },
    { name: 'HTML5', icon: 'html' },
    { name: 'CSS3', icon: 'css' },
    { name: 'Node.js', icon: 'nodejs' },
    { name: 'Express', icon: 'express' },
    { name: 'Python', icon: 'py' },
    { name: 'MySQL', icon: 'mysql' },
    { name: 'PostgreSQL', icon: 'postgres' },
    { name: 'MongoDB', icon: 'mongodb' },
    { name: 'Redis', icon: 'redis' },
    { name: 'Supabase', icon: 'supabase' },
    { name: 'Firebase', icon: 'firebase' },
    { name: 'Docker', icon: 'docker' },
    { name: 'Git', icon: 'git' },
    { name: 'GitHub', icon: 'github' },
    { name: 'Figma', icon: 'figma' },
    { name: 'Linux', icon: 'linux' },
    { name: 'Vercel', icon: 'vercel' },
    { name: 'Postman', icon: 'postman' },
    { name: 'AWS', icon: 'aws' },
    { name: 'Cloudflare', icon: 'cloudflare' },
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
    <section id="skills" className="relative py-24 bg-white" ref={sectionRef}>

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
              className={`group relative p-3 md:p-4 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] transition-all duration-700 hover:border-[var(--text-primary)]/40 hover:-translate-y-2 hover:shadow-xl hover:shadow-[var(--text-primary)]/10 cursor-default ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
              style={{ 
                transitionDelay: isVisible ? `${(index % 12) * 50 + 600}ms` : '0ms'
              }}
            >
              <img 
                src={`https://skillicons.dev/icons?i=${skill.icon}`} 
                alt={skill.name}
                className="w-7 h-7 md:w-9 md:h-9 transition-all duration-500 group-hover:scale-110"
              />
              
              {/* Tooltip */}
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 px-3 py-1 bg-[var(--text-primary)] text-[var(--bg-primary)] text-[10px] font-bold rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap z-10 shadow-lg">
                {skill.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
