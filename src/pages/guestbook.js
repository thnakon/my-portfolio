import { useState, useEffect } from 'react';
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

const NoteCard = ({ msg, index }) => {
    const gradients = [
        'from-[#FF4E50] to-[#F9D423]', // Sunset
        'from-[#00c6ff] to-[#0072ff]', // Blue
        'from-[#f77062] to-[#fe5196]', // Pinky
        'from-[#11998e] to-[#38ef7d]', // Green
        'from-[#8E2DE2] to-[#4A00E0]', // Purple
        'from-[#f953c6] to-[#b91d73]', // Magenta
    ];

    const gradient = gradients[index % gradients.length];
    const rotation = (index % 2 === 0 ? 'rotate-1' : '-rotate-1');

    return (
        <div className={`relative group p-8 rounded-[24px] bg-gradient-to-br ${gradient} shadow-xl transition-all duration-500 hover:rotate-0 hover:scale-[1.02] flex flex-col h-full min-h-[240px] ${rotation}`}>
            {/* Tape Effect */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-12 h-6 bg-white/20 backdrop-blur-sm border border-white/10 rounded-sm z-10 shadow-sm" />

            {/* Quote Mark */}
            <div className="absolute top-4 left-6 text-6xl font-serif text-white/20 select-none">“</div>

            <div className="flex-1 pt-6 px-2">
                <p className="text-white text-lg md:text-xl font-heading leading-[1.4] italic drop-shadow-sm opacity-95 group-hover:opacity-100 transition-opacity">
                    {msg.message}
                </p>
            </div>

            {/* Divider */}
            <div className="h-px w-full bg-white/20 my-6" />

            {/* Author Info */}
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white border border-white/30 overflow-hidden shadow-inner">
                    <span className="text-sm font-bold">{msg.name.charAt(0)}</span>
                </div>
                <div className="flex flex-col">
                    <span className="text-white text-sm font-bold tracking-tight">{msg.name}</span>
                    <span className="text-white/60 text-[10px] font-mono uppercase tracking-widest">{msg.date}</span>
                </div>
            </div>
        </div>
    );
};

export default function GuestbookPage({ theme, setTheme, lang, setLang }) {
    const [bookingOpen, setBookingOpen] = useState(false);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [showContent, setShowContent] = useState(false);
    const [messages, setMessages] = useState([
        { id: 1, name: "Alexander", message: "Beyond the code, there's a soul in this work. Absolutely stunning craftsmanship.", date: "Feb 01, 2026" },
        { id: 2, name: "Sarah K.", message: "The attention to detail is actually insane. Well done on the redesign!", date: "Jan 31, 2026" },
        { id: 3, name: "itzwarm", message: "Love the new wall aesthetic! Keep building great things.", date: "Jan 31, 2026" },
        { id: 4, name: "John K.", message: "This site changed how I think about digital design. Pure gold.", date: "Jan 29, 2026" },
        { id: 5, name: "Melissa", message: "So inspiring to see such a creative portfolio! ✨", date: "Jan 28, 2026" },
    ]);
    const [newName, setNewName] = useState('');
    const [newMessage, setNewMessage] = useState('');

    const t = translations[lang] || translations.en;

    useEffect(() => {
        const timer = setTimeout(() => setShowContent(true), 100);
        return () => clearTimeout(timer);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!newName.trim() || !newMessage.trim()) return;

        const msg = {
            id: Date.now(),
            name: newName,
            message: newMessage,
            date: new Date().toLocaleDateString(lang === 'en' ? 'en-US' : 'th-TH', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            })
        };

        setMessages([msg, ...messages]);
        setNewName('');
        setNewMessage('');
        setIsFormOpen(false);
    };

    return (
        <main className="min-h-screen transition-theme bg-[var(--bg-primary)]">
            <Navbar t={t} lang={lang} setLang={setLang} theme={theme} setTheme={setTheme} onBookCall={() => setBookingOpen(true)} />

            <div className="pt-32 pb-24 max-w-[1400px] mx-auto px-6">
                {/* Header Section */}
                <div className="text-center mb-24">
                    <span className={`inline-block text-[10px] tracking-[0.4em] font-bold text-[var(--text-muted)] uppercase mb-6 transition-all duration-1000 ${showContent ? 'opacity-60 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                        {t.nav.moreDropdown.guestbook.title}
                    </span>
                    <h1 className={`text-4xl md:text-6xl font-heading mb-8 transition-all duration-1000 delay-200 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                        {lang === 'en' ? "Signature Wall" : "กำแพงลายเซ็น"}
                    </h1>
                    <div className="text-[var(--text-secondary)] text-lg md:text-xl font-light leading-relaxed h-8">
                        {showContent && (
                            <TypewriterText text={lang === 'en' ? "Let me know you were here." : "ทิ้งข้อความไว้ว่าคุณเคยมาที่นี่..."} />
                        )}
                    </div>
                </div>

                {/* Wall of Messages Grid */}
                <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-1000 delay-1000 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>

                    {/* CTA Card - Join the Wall */}
                    <div
                        onClick={() => setIsFormOpen(true)}
                        className="relative group p-8 rounded-[24px] border-2 border-dashed border-[var(--border-color)] bg-transparent flex flex-col items-center justify-center text-center gap-6 hover:border-[var(--text-primary)] transition-all duration-500 cursor-pointer min-h-[240px]"
                    >
                        <div className="absolute top-4 left-1/2 -translate-x-1/2 text-lg font-heading italic opacity-40">
                            {lang === 'en' ? '"Join the wall..."' : '"ร่วมเป็นส่วนหนึ่ง..."'}
                        </div>
                        <div className="w-16 h-16 rounded-full bg-[var(--bg-secondary)] flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-xl border border-[var(--border-color)]">
                            <svg className="w-8 h-8 text-[var(--text-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                        </div>
                        <p className="text-[var(--text-muted)] text-xs max-w-[200px] leading-relaxed">
                            {lang === 'en' ? "Pin your message to this board forever." : "ปักหมุดข้อความลงบนบอร์ดนี้ตลอดไป"}
                        </p>
                    </div>

                    {/* Message Cards */}
                    {messages.map((msg, i) => (
                        <NoteCard key={msg.id} msg={msg} index={i} />
                    ))}
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
                                <h2 className="text-2xl font-heading uppercase tracking-widest border-b-2 border-black/10 pb-2">New Note</h2>
                                <button onClick={() => setIsFormOpen(false)} className="text-black/30 hover:text-black transition-colors transform hover:rotate-90 duration-300">
                                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-10">
                                <div className="relative group">
                                    <label className="text-[10px] font-bold tracking-[0.2em] text-black/40 uppercase mb-2 block">Your Identity</label>
                                    <input
                                        type="text"
                                        value={newName}
                                        onChange={(e) => setNewName(e.target.value)}
                                        placeholder="Name or Alias"
                                        className="w-full bg-transparent border-b border-black/20 py-2 outline-none focus:border-black transition-colors font-heading text-xl"
                                        required
                                    />
                                </div>
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
                                <button type="submit" className="w-full py-5 bg-black text-white rounded-none font-bold text-sm uppercase tracking-[0.3em] hover:bg-black/80 transition-all shadow-xl active:scale-[0.98]">
                                    Pin this note
                                </button>
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
