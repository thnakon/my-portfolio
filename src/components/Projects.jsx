// SVG Icons for Projects section
const Icons = {
  rocket: (
    <svg className="w-12 h-12 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
    </svg>
  ),
  folder: (
    <svg className="w-12 h-12 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
    </svg>
  ),
};

export default function Projects({ t }) {
  const projects = [
    {
      title: 'Project 1',
      description: t.projects.projectDesc,
      image: null,
      tech: ['Next.js', 'Tailwind', 'MySQL'],
      liveUrl: '#',
      githubUrl: '#',
      comingSoon: true,
    },
    {
      title: 'Project 2',
      description: t.projects.projectDesc,
      image: null,
      tech: ['Laravel', 'Vue.js', 'PostgreSQL'],
      liveUrl: '#',
      githubUrl: '#',
      comingSoon: true,
    },
    {
      title: 'Project 3',
      description: t.projects.projectDesc,
      image: null,
      tech: ['React', 'Node.js', 'MongoDB'],
      liveUrl: '#',
      githubUrl: '#',
      comingSoon: true,
    },
  ];

  return (
    <section id="projects" className="py-24 bg-secondary">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="font-heading text-4xl md:text-5xl mb-4">{t.projects.title}</h2>
          <p className="text-secondary text-lg">{t.projects.subtitle}</p>
        </div>
        
        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div key={index} className="project-card">
              {/* Project Image */}
              <div className="h-48 bg-tertiary flex items-center justify-center">
                {project.image ? (
                  <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                ) : (
                  project.comingSoon ? Icons.rocket : Icons.folder
                )}
              </div>
              
              {/* Project Info */}
              <div className="p-6">
                <h3 className="font-heading text-xl mb-3">
                  {project.comingSoon ? t.projects.comingSoon : project.title}
                </h3>
                <p className="text-secondary text-sm mb-4 leading-relaxed">
                  {project.description}
                </p>
                
                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {project.tech.map((tech, techIndex) => (
                    <span 
                      key={techIndex} 
                      className="px-3 py-1 text-xs rounded-full bg-secondary text-secondary"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                {/* Links */}
                {!project.comingSoon && (
                  <div className="flex gap-4">
                    <a 
                      href={project.liveUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-primary flex items-center gap-1 hover:underline"
                    >
                      {t.projects.viewProject} →
                    </a>
                    <a 
                      href={project.githubUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-secondary flex items-center gap-1 hover:underline"
                    >
                      {t.projects.viewCode}
                    </a>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
