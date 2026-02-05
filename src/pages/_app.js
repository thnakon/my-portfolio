import '@/styles/globals.css';
import { useState, useEffect } from 'react';
import Head from 'next/head';
import { SessionProvider } from 'next-auth/react';

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  const [theme, setTheme] = useState('dark');
  const [lang, setLang] = useState('en');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Get saved preferences from localStorage
    const savedTheme = localStorage.getItem('theme') || 'dark';
    const savedLang = localStorage.getItem('lang') || 'en';

    setTheme(savedTheme);
    setLang(savedLang);
    document.documentElement.setAttribute('data-theme', savedTheme);
    setMounted(true);

    // Scroll Restoration Logic
    const savedScrollPos = sessionStorage.getItem('scrollPos');
    if (savedScrollPos) {
      // Small delay to ensure content is rendered before scrolling
      setTimeout(() => {
        window.scrollTo({
          top: parseInt(savedScrollPos),
          behavior: 'instant'
        });
      }, 100);
    }

    const handleScroll = () => {
      sessionStorage.setItem('scrollPos', window.scrollY.toString());
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent flash of unstyled content
  if (!mounted) {
    return null;
  }

  return (
    <SessionProvider session={session}>
      <Head>
        <title>Thanakon Dungkumwattanasiri | Full Stack Developer</title>
        <meta name="description" content="Full Stack Web Developer based in Chiang Mai, specializing in Laravel, Next.js, and modern web technologies." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="author" content="Thanakon Dungkumwattanasiri" />
        <meta name="keywords" content="Full Stack Developer, Web Developer, Laravel, Next.js, React, Chiang Mai, Thailand" />

        {/* Open Graph */}
        <meta property="og:title" content="Thanakon Dungkumwattanasiri | Full Stack Developer" />
        <meta property="og:description" content="Full Stack Web Developer based in Chiang Mai, specializing in Laravel, Next.js, and modern web technologies." />
        <meta property="og:type" content="website" />

        {/* Favicon */}
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Component {...pageProps} theme={theme} setTheme={setTheme} lang={lang} setLang={setLang} />
    </SessionProvider>
  );
}

