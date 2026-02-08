import Link from 'next/link';

// SVG Icons
const Icons = {
  github: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
    </svg>
  ),
  linkedin: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
    </svg>
  ),
  twitter: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  ),
  heart: (
    <svg className="w-3 h-3 inline-block mx-1 text-red-500" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
    </svg>
  ),
};

export default function Footer({ t }) {
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="pt-24 pb-12 bg-[var(--bg-primary)] border-t border-[var(--border-color)]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between gap-12 mb-16">
          
          {/* Brand Column */}
          <div className="flex flex-col items-start gap-6">
            <div className="flex items-center gap-3 group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                <div className="w-10 h-10 rounded-full overflow-hidden border border-[var(--border-color)] group-hover:border-[var(--text-primary)] transition-colors duration-500">
                    <img src="/images/profile-bento.jpg" alt="Profile" className="w-full h-full object-cover transition-all duration-500" />
                </div>
                <span className="font-heading text-xl font-bold tracking-tight text-[var(--text-primary)]">Thanakon D.</span>
            </div>
            <p className="text-[var(--text-secondary)] text-sm leading-relaxed max-w-sm font-light">
              {t.footer.tagline}
            </p>
            <div className="mt-auto">
                <p className="text-[var(--text-muted)] text-[11px] font-mono tracking-wider">
                  {t.footer.copyright}
                </p>
            </div>
          </div>

          {/* Links Columns */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 md:gap-16 md:text-right">
            
            {/* Navigation */}
            <div className="flex flex-col gap-4">
              <h4 className="text-[10px] font-bold tracking-[0.3em] text-[var(--text-primary)] uppercase">{t.footer.linksTitle}</h4>
              <ul className="flex flex-col gap-3">
                <li><Link href="/" className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">{t.nav.home}</Link></li>
                <li><Link href="/about" className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">{t.nav.about}</Link></li>
                <li><Link href="/work" className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">{t.nav.work}</Link></li>
                <li><Link href="/uses" className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">{t.nav.uses}</Link></li>
                <li><button onClick={() => scrollToSection('contact')} className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors inline-block">{t.nav.contact || "Contact"}</button></li>
              </ul>
            </div>

            {/* Explore */}
            <div className="flex flex-col gap-4">
              <h4 className="text-[10px] font-bold tracking-[0.3em] text-[var(--text-primary)] uppercase">{t.footer.exploreTitle}</h4>
              <ul className="flex flex-col gap-3">
                <li><Link href="/ai-toolkit" className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">{t.nav.moreDropdown.aiToolkit.title}</Link></li>
                <li><Link href="/guestbook" className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">{t.nav.moreDropdown.guestbook.title}</Link></li>
                <li><Link href="/links" className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">{t.nav.moreDropdown.links.title}</Link></li>
                <li><Link href="/attribution" className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">{t.nav.moreDropdown.attribution.title}</Link></li>
              </ul>
            </div>

            {/* Social */}
            <div className="flex flex-col gap-4">
              <h4 className="text-[10px] font-bold tracking-[0.3em] text-[var(--text-primary)] uppercase">{t.footer.socialTitle}</h4>
              <ul className="flex flex-col md:items-end gap-3">
                <li>
                  <a href="https://github.com/thnakon" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors group">
                    <span className="opacity-60 group-hover:opacity-100 transition-opacity whitespace-nowrap">{Icons.github}</span>
                    <span>GitHub</span>
                  </a>
                </li>
                <li>
                  <a href="https://www.linkedin.com/in/thnakon" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors group">
                    <span className="opacity-60 group-hover:opacity-100 transition-opacity whitespace-nowrap">{Icons.linkedin}</span>
                    <span>LinkedIn</span>
                  </a>
                </li>
                <li>
                  <a href="https://x.com/Obounwarm" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors group">
                    <span className="opacity-60 group-hover:opacity-100 transition-opacity whitespace-nowrap">{Icons.twitter}</span>
                    <span>X (Twitter)</span>
                  </a>
                </li>
              </ul>
            </div>

          </div>
        </div>
        
      </div>
    </footer>
  );
}
