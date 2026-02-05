import { useState, useEffect } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import translations from '@/lib/translations';
import Navbar from '@/components/Navbar';
import BookingModal from '@/components/BookingModal';
import Footer from '@/components/Footer';

const TypewriterText = ({ text, delay = 50, startDelay = 500, onComplete }) => {
    const [displayedText, setDisplayedText] = useState('');
    const [isStarted, setIsStarted] = useState(false);

    useEffect(() => {
        const startTimer = setTimeout(() => setIsStarted(true), startDelay);
        return () => clearTimeout(startTimer);
    }, [startDelay]);

    useEffect(() => {
        if (!isStarted) return;

        if (displayedText.length < text.length) {
            const timeout = setTimeout(() => {
                setDisplayedText(text.slice(0, displayedText.length + 1));
            }, delay);
            return () => clearTimeout(timeout);
        } else if (onComplete) {
            onComplete();
        }
    }, [displayedText, text, delay, isStarted, onComplete]);

    return (
        <span>
            {displayedText}
            {displayedText.length < text.length && (
                <span className="inline-block w-0.5 h-4 ml-1 bg-[var(--text-primary)] animate-pulse align-middle" />
            )}
        </span>
    );
};

// Pill-shaped message bubble (Freeform-style)
const PillMessage = ({ msg, index, total }) => {
    const colors = [
        { bg: 'bg-gradient-to-r from-rose-500 to-pink-500', text: 'text-white' },
        { bg: 'bg-gradient-to-r from-blue-500 to-cyan-500', text: 'text-white' },
        { bg: 'bg-gradient-to-r from-emerald-500 to-teal-500', text: 'text-white' },
        { bg: 'bg-gradient-to-r from-violet-500 to-purple-500', text: 'text-white' },
        { bg: 'bg-gradient-to-r from-amber-500 to-orange-500', text: 'text-white' },
        { bg: 'bg-gradient-to-r from-indigo-500 to-blue-600', text: 'text-white' },
    ];

    const color = colors[index % colors.length];

    // Random positioning for freeform canvas feel
    const positions = [
        { x: '5%', y: '0%' },
        { x: '55%', y: '5%' },
        { x: '25%', y: '20%' },
        { x: '70%', y: '25%' },
        { x: '10%', y: '40%' },
        { x: '50%', y: '45%' },
        { x: '30%', y: '60%' },
        { x: '65%', y: '65%' },
        { x: '15%', y: '80%' },
        { x: '55%', y: '85%' },
    ];

    const pos = positions[index % positions.length];
    const rotate = (index % 2 === 0 ? 'rotate-1' : '-rotate-2');
    const animDelay = index * 0.15;

    return (
        <div
            className="absolute transition-all duration-700 hover:scale-105 hover:z-50 cursor-pointer group"
            style={{
                left: pos.x,
                top: pos.y,
                animation: `floatIn 0.6s ease-out ${animDelay}s both, float 6s ease-in-out ${animDelay}s infinite`
            }}
        >
            <div className={`${color.bg} ${color.text} ${rotate} rounded-[32px] px-5 py-4 shadow-xl hover:shadow-2xl transition-all duration-300 max-w-[320px] backdrop-blur-sm`}>
                {/* Header: Avatar + Name + Date */}
                <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-sm border-2 border-white/30 shadow-inner flex-shrink-0">
                        {msg.avatar ? (
                            <img src={msg.avatar} alt={msg.name} className="w-full h-full rounded-full object-cover" />
                        ) : (
                            <span>{msg.name.charAt(0).toUpperCase()}</span>
                        )}
                    </div>
                    <div className="flex-1 min-w-0">
                        <div className="font-bold text-sm truncate">{msg.name}</div>
                        <div className="text-[10px] opacity-70 font-mono">{msg.date}</div>
                    </div>
                </div>

                {/* Message */}
                <p className="text-sm leading-relaxed opacity-95 font-medium">
                    "{msg.message}"
                </p>
            </div>
        </div>
    );
};

export default function GuestbookPage({ theme, setTheme, lang, setLang }) {
    const { data: session, status } = useSession();
    const [bookingOpen, setBookingOpen] = useState(false);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [showContent, setShowContent] = useState(false);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const t = translations[lang] || translations.en;

    // Fetch messages on mount
    useEffect(() => {
        fetchMessages();
        const timer = setTimeout(() => setShowContent(true), 100);
        return () => clearTimeout(timer);
    }, []);

    const fetchMessages = async () => {
        try {
            const res = await fetch('/api/guestbook');
            const data = await res.json();
            setMessages(data);
        } catch (error) {
            console.error('Failed to fetch messages:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!session || !newMessage.trim() || isSubmitting) return;

        setIsSubmitting(true);

        try {
            const res = await fetch('/api/guestbook', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: session.user.name,
                    avatar: session.user.image,
                    message: newMessage.trim()
                })
            });

            if (res.ok) {
                const savedMessage = await res.json();
                setMessages([savedMessage, ...messages]);
                setNewMessage('');
                setIsFormOpen(false);
            }
        } catch (error) {
            console.error('Failed to save message:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleLeaveMarkClick = () => {
        if (!session) {
            signIn('github');
        } else {
            setIsFormOpen(true);
        }
    };

    return (
        <main className="min-h-screen transition-theme bg-[var(--bg-primary)]">
            <Navbar t={t} lang={lang} setLang={setLang} theme={theme} setTheme={setTheme} onBookCall={() => setBookingOpen(true)} />

            <div className="pt-32 pb-24 max-w-[1400px] mx-auto px-6">
                {/* Header Section */}
                <div className="mb-16 text-center">
                    <span className={`inline-block text-[10px] tracking-[0.3em] font-bold text-[var(--text-muted)] uppercase mb-6 transition-all duration-1000 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                        {lang === 'en' ? 'LEAVE YOUR MARK' : 'ทิ้งร่องรอยของคุณ'}
                    </span>
                    <h2 className={`text-3xl md:text-5xl font-heading tracking-tight mb-8 transition-all duration-1000 delay-300 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                        <span className="text-[var(--text-primary)]">{lang === 'en' ? 'Signature' : 'กำแพง'} </span>
                        <em className="overview-title-accent">{lang === 'en' ? 'Wall' : 'ลายเซ็น'}</em>
                    </h2>
                    <div className="min-h-[2em]">
                        <p className="text-base md:text-lg text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed">
                            {showContent && (
                                <TypewriterText
                                    text={lang === 'en' ? "Let me know you were here." : "ทิ้งข้อความไว้ว่าคุณเคยมาที่นี่..."}
                                    delay={25}
                                />
                            )}
                        </p>
                    </div>
                </div>

                {/* Freeform Canvas - Scattered Pills */}
                <div className={`relative w-full min-h-[800px] md:min-h-[700px] transition-all duration-1000 delay-500 ${showContent ? 'opacity-100' : 'opacity-0'}`}>

                    {/* Add Button (Floating) */}
                    <div
                        onClick={handleLeaveMarkClick}
                        className="absolute left-1/2 -translate-x-1/2 top-[45%] z-40 group cursor-pointer"
                    >
                        <div className="flex items-center gap-3 px-6 py-4 rounded-full bg-[var(--bg-secondary)] border-2 border-dashed border-[var(--border-color)] hover:border-[var(--text-primary)] transition-all duration-300 shadow-lg hover:shadow-xl">
                            {session ? (
                                <>
                                    <img src={session.user.image} alt={session.user.name} className="w-10 h-10 rounded-full border-2 border-[var(--border-color)]" />
                                    <span className="text-sm font-medium text-[var(--text-primary)]">
                                        {lang === 'en' ? 'Leave your mark' : 'ทิ้งข้อความ'}
                                    </span>
                                </>
                            ) : (
                                <>
                                    <div className="w-10 h-10 rounded-full bg-[var(--text-primary)] flex items-center justify-center group-hover:scale-110 transition-all duration-500">
                                        <svg className="w-5 h-5 text-[var(--bg-primary)]" fill="currentColor" viewBox="0 0 24 24">
                                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                        </svg>
                                    </div>
                                    <span className="text-sm font-medium text-[var(--text-primary)]">
                                        {lang === 'en' ? 'Sign in with GitHub' : 'เข้าสู่ระบบด้วย GitHub'}
                                    </span>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Message Pills */}
                    {isLoading ? (
                        /* Skeleton Loading Pills */
                        <div className="absolute inset-0 pt-[15%] px-4 md:px-8">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <div
                                    key={i}
                                    className="mb-4 animate-pulse"
                                    style={{
                                        marginLeft: `${(i * 7) % 40}%`,
                                        width: `${45 + (i * 5) % 20}%`,
                                        maxWidth: '320px'
                                    }}
                                >
                                    <div className={`
                                        rounded-3xl px-5 py-4 backdrop-blur-xl
                                        ${theme === 'dark'
                                            ? 'bg-white/5 border border-white/10'
                                            : 'bg-black/5 border border-black/10'}
                                    `}>
                                        {/* Avatar + Name skeleton */}
                                        <div className="flex items-center gap-2 mb-2">
                                            <div className={`w-6 h-6 rounded-full ${theme === 'dark' ? 'bg-white/10' : 'bg-black/10'}`} />
                                            <div className={`h-3 rounded-full ${theme === 'dark' ? 'bg-white/10' : 'bg-black/10'}`} style={{ width: `${50 + (i * 10) % 30}%` }} />
                                        </div>
                                        {/* Message skeleton */}
                                        <div className="space-y-2">
                                            <div className={`h-3 rounded-full ${theme === 'dark' ? 'bg-white/10' : 'bg-black/10'}`} style={{ width: '100%' }} />
                                            <div className={`h-3 rounded-full ${theme === 'dark' ? 'bg-white/10' : 'bg-black/10'}`} style={{ width: `${60 + (i * 5) % 30}%` }} />
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : messages.length === 0 ? (
                        <div className="absolute left-1/2 top-[20%] -translate-x-1/2 text-center max-w-md">
                            <div className="text-6xl mb-4">✍️</div>
                            <h3 className="text-xl font-heading text-[var(--text-primary)] mb-2">
                                {lang === 'en' ? 'No messages yet' : 'ยังไม่มีข้อความ'}
                            </h3>
                            <p className="text-[var(--text-muted)] text-sm">
                                {lang === 'en'
                                    ? 'Be the first to leave your mark on this wall!'
                                    : 'เป็นคนแรกที่ทิ้งร่องรอยบนกำแพงนี้!'}
                            </p>
                        </div>
                    ) : (
                        messages.map((msg, i) => (
                            <PillMessage key={msg.id} msg={msg} index={i} total={messages.length} />
                        ))
                    )}

                    {/* CSS Animations */}
                    <style jsx>{`
                        @keyframes floatIn {
                            from {
                                opacity: 0;
                                transform: translateY(30px) scale(0.9);
                            }
                            to {
                                opacity: 1;
                                transform: translateY(0) scale(1);
                            }
                        }
                        @keyframes float {
                            0%, 100% { transform: translateY(0px); }
                            50% { transform: translateY(-8px); }
                        }
                    `}</style>
                </div>
            </div>

            {/* Modal - Pinned Note Style */}
            {isFormOpen && (
                <div className="fixed inset-0 z-[10000] flex items-center justify-center p-6 bg-black/60 backdrop-blur-md">
                    <div className="relative bg-[#fcfcfc] text-[#333] p-10 md:p-12 w-full max-w-xl shadow-[20px_20px_60px_rgba(0,0,0,0.5)] animate-reveal-fade-up overflow-hidden"
                        style={{ borderRadius: '4px 4px 40px 4px' }}>

                        {/* Ruled Lines Background */}
                        <div className="absolute inset-0 opacity-[0.05] pointer-events-none"
                            style={{ backgroundImage: 'linear-gradient(#333 1px, transparent 1px)', backgroundSize: '100% 32px' }} />

                        {/* Folded Corner Decor */}
                        <div className="absolute bottom-0 right-0 w-12 h-12 bg-gradient-to-tl from-black/10 to-transparent" />

                        <div className="relative z-10">
                            <div className="flex justify-between items-center mb-10">
                                <div className="flex items-center gap-4">
                                    {session && (
                                        <img src={session.user.image} alt={session.user.name} className="w-12 h-12 rounded-full border-2 border-black/10" />
                                    )}
                                    <div>
                                        <h2 className="text-2xl font-heading uppercase tracking-widest border-b-2 border-black/10 pb-2">New Note</h2>
                                        {session && (
                                            <p className="text-sm text-black/50 mt-1">Signed in as <strong>{session.user.name}</strong></p>
                                        )}
                                    </div>
                                </div>
                                <button onClick={() => setIsFormOpen(false)} className="text-black/30 hover:text-black transition-colors transform hover:rotate-90 duration-300">
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-10">
                                <div className="relative group">
                                    <label className="text-[10px] font-bold tracking-[0.2em] text-black/40 uppercase mb-2 block">Your Message</label>
                                    <textarea
                                        value={newMessage}
                                        onChange={(e) => setNewMessage(e.target.value)}
                                        placeholder="Write something nice..."
                                        rows={4}
                                        className="w-full bg-transparent border-b border-black/20 py-2 outline-none focus:border-black transition-colors font-heading text-xl md:text-2xl resize-none leading-relaxed italic"
                                        required
                                    />
                                </div>
                                <div className="flex gap-4">
                                    <button type="submit" className="flex-1 py-5 bg-black text-white rounded-none font-bold text-sm uppercase tracking-[0.3em] hover:bg-black/80 transition-all shadow-xl active:scale-[0.98]">
                                        Pin this note
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => signOut()}
                                        className="px-6 py-5 bg-red-500/10 text-red-600 rounded-none font-bold text-xs uppercase tracking-[0.2em] hover:bg-red-500/20 transition-all"
                                    >
                                        Sign Out
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            <Footer t={t} />
            <BookingModal isOpen={bookingOpen} onClose={() => setBookingOpen(false)} t={t} />
        </main>
    );
}
