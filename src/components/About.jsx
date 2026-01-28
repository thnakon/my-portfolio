// SVG Icons for About section
const Icons = {
  user: (
    <svg className="w-24 h-24 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  ),
};

export default function About({ t }) {
  return (
    <section id="about" className="py-24 bg-secondary">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="font-heading text-4xl md:text-5xl mb-4">{t.about.title}</h2>
          <p className="text-secondary text-lg">{t.about.subtitle}</p>
        </div>
        
        {/* Content Grid */}
        <div className="grid md:grid-cols-5 gap-12 items-center">
          {/* Image */}
          <div className="md:col-span-2 flex justify-center">
            <div className="w-64 h-64 md:w-80 md:h-80 rounded-2xl bg-tertiary flex items-center justify-center overflow-hidden">
              {/* Placeholder - Replace with actual image */}
              {Icons.user}
            </div>
          </div>
          
          {/* Info */}
          <div className="md:col-span-3">
            <p className="text-secondary text-lg leading-relaxed mb-8">
              {t.about.bio}
            </p>
            
            {/* Meta Info */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="flex flex-col gap-1">
                <span className="text-xs uppercase tracking-wider text-muted">{t.about.age}</span>
                <span className="font-semibold text-primary">23 {t.about.years}</span>
              </div>
              
              <div className="flex flex-col gap-1">
                <span className="text-xs uppercase tracking-wider text-muted">{t.about.location}</span>
                <span className="font-semibold text-primary">{t.about.chiangMai}</span>
              </div>
              
              <div className="flex flex-col gap-1">
                <span className="text-xs uppercase tracking-wider text-muted">{t.about.email}</span>
                <a href="mailto:thnakon.d@gmail.com" className="font-semibold text-primary hover:underline">
                  thnakon.d@gmail.com
                </a>
              </div>
              
              <div className="flex flex-col gap-1">
                <span className="text-xs uppercase tracking-wider text-muted">GitHub</span>
                <a 
                  href="https://github.com/thnakon" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="font-semibold text-primary hover:underline"
                >
                  @thnakon
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
