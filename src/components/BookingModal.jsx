import { useState, useEffect } from 'react';

// SVG Icons
const Icons = {
  close: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  ),
  calendar: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
  ),
  mail: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
  message: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
  ),
  send: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
    </svg>
  ),
  back: (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
    </svg>
  ),
  linkedin: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
    </svg>
  ),
  github: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
    </svg>
  ),
  x: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  ),
  facebook: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  ),
  instagram: (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  ),
};

// Google Sheets Web App URL
const GOOGLE_SHEETS_URL = 'https://script.google.com/macros/s/AKfycbyZ15KPnQPCpoEr6xkrrGQAMoULZZva8ZfkaJ3W8BQ4oW6FaEfP47i9BDNYoEizShBZeQ/exec';

export default function BookingModal({ isOpen, onClose, t }) {
  const [mounted, setMounted] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [view, setView] = useState('options'); // 'options' or 'message'
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', null

  useEffect(() => {
    setMounted(true);
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setIsClosing(false);
      setView('options');
      setFormData({ name: '', email: '', message: '' });
      setSubmitStatus(null);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
      setIsClosing(false);
      setView('options');
    }, 400);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // 1. Send to Google Sheets (for backup/record)
      await fetch(GOOGLE_SHEETS_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          timestamp: new Date().toISOString(),
        }),
      });

      // 2. Send thank-you email via API
      const emailResponse = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });

      if (!emailResponse.ok) {
        console.warn('Email sending failed, but form was submitted');
      }

      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
      
      // Auto close after success
      setTimeout(() => {
        handleClose();
      }, 2000);
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!mounted || !isOpen) return null;

  const content = t.contactModal;
  const formContent = t.contactModal?.form || {
    title: 'Send a message',
    back: 'Back to options',
    name: 'Name',
    namePlaceholder: 'Jane Doe',
    email: 'Email',
    emailPlaceholder: 'jane@example.com',
    message: 'Message',
    messagePlaceholder: 'How can I help you?',
    submit: 'Send Message',
    sending: 'Sending...',
    success: 'Message sent successfully!',
    error: 'Failed to send. Please try again.',
  };

  return (
    <div 
      className="fixed inset-0 z-[2000] flex items-end justify-center"
      onClick={handleClose}
    >
      {/* Overlay */}
      <div 
        className={`fixed top-0 left-0 right-0 bottom-0 bg-black/40 transition-opacity duration-400 ${isClosing ? 'opacity-0' : 'opacity-100'}`}
        style={{ 
          backdropFilter: 'blur(2px)', 
          WebkitBackdropFilter: 'blur(2px)' 
        }}
        aria-hidden="true"
      />

      {/* Bottom Sheet Container */}
      <div 
        className={`relative w-full max-w-xl bg-[var(--bg-primary)] border-t border-x border-[var(--border-color)] backdrop-blur-2xl rounded-t-[32px] overflow-hidden shadow-2xl ${isClosing ? 'animate-slide-down' : 'animate-slide-up'}`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drag Handle */}
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-12 h-1.5 rounded-full bg-[var(--border-color)]" />
        </div>
        
        <div className="p-6 md:p-8 pt-2">
          {/* Header */}
          <div className="flex justify-between items-start mb-8">
            <h2 className="text-4xl font-heading tracking-tight text-[var(--text-primary)]">
              {view === 'options' ? content.title : formContent.title}
            </h2>
            <button 
              onClick={handleClose}
              className="p-2 rounded-full hover:bg-[var(--glass-border)] transition-colors text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            >
              {Icons.close}
            </button>
          </div>

          {view === 'options' ? (
            <>
              {/* Grid Options */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Book a Call */}
                <a 
                  href="https://calendly.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group p-6 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-color)] hover:border-[var(--text-primary)]/30 transition-all cursor-pointer block"
                >
                  <div className="w-12 h-12 rounded-full bg-[var(--bg-tertiary)] flex items-center justify-center mb-6 text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors shadow-sm">
                    {Icons.calendar}
                  </div>
                  <h3 className="font-bold text-lg mb-1">{content.book.title}</h3>
                  <p className="text-sm text-[var(--text-secondary)]">{content.book.desc}</p>
                </a>

                {/* Email Me */}
                <a 
                  href={`mailto:${content.email.desc}`}
                  className="group p-6 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-color)] hover:border-[var(--text-primary)]/30 transition-all cursor-pointer block"
                >
                  <div className="w-12 h-12 rounded-full bg-[var(--bg-tertiary)] flex items-center justify-center mb-6 text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-colors shadow-sm">
                    {Icons.mail}
                  </div>
                  <h3 className="font-bold text-lg mb-1">{content.email.title}</h3>
                  <p className="text-sm text-[var(--text-secondary)]">{content.email.desc}</p>
                </a>
              </div>

              {/* Message Bar */}
              <button 
                onClick={() => setView('message')}
                className="w-full group flex items-center justify-between p-5 rounded-2xl border border-dashed border-[var(--border-color)] hover:border-[var(--text-primary)]/40 transition-all cursor-pointer bg-[var(--bg-secondary)]/30 mb-10"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center">
                    {Icons.message}
                  </div>
                  <span className="font-medium">{content.message.title}</span>
                </div>
                <span className="text-sm text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-all">
                  {content.message.action}
                </span>
              </button>

              {/* Socials */}
              <div className="text-center">
                <span className="block text-[10px] tracking-[0.2em] font-bold text-[var(--text-muted)] uppercase mb-6">
                  {content.socials}
                </span>
                <div className="flex justify-center gap-5">
                  <a 
                    href="https://www.facebook.com/warm.thanakorn.2025/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="p-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all hover:scale-110"
                  >
                    {Icons.facebook}
                  </a>
                  <a 
                    href="https://www.instagram.com/itzwarm_/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="p-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all hover:scale-110"
                  >
                    {Icons.instagram}
                  </a>
                  <a 
                    href="https://github.com/thnakon" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="p-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all hover:scale-110"
                  >
                    {Icons.github}
                  </a>
                  <a 
                    href="https://x.com/Obounwarm" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="p-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all hover:scale-110"
                  >
                    {Icons.x}
                  </a>
                  <a 
                    href="https://www.linkedin.com/public-profile/settings?trk=d_flagship3_profile_self_view_public_profile" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="p-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all hover:scale-110"
                  >
                    {Icons.linkedin}
                  </a>
                </div>
              </div>
            </>
          ) : (
            /* Message Form View */
            <div className="animate-fade-in">
              {submitStatus === 'success' ? (
                /* Success State with Animation */
                <div className="flex flex-col items-center justify-center py-12 animate-fade-in">
                  {/* Animated Checkmark Circle */}
                  <div className="relative w-24 h-24 mb-8">
                    <svg className="w-24 h-24 text-green-500" viewBox="0 0 100 100">
                      {/* Circle */}
                      <circle
                        cx="50"
                        cy="50"
                        r="45"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        className="animate-circle-draw"
                        style={{
                          strokeDasharray: '283',
                          strokeDashoffset: '0',
                        }}
                      />
                      {/* Checkmark */}
                      <path
                        d="M30 50 L45 65 L70 35"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="animate-check-draw"
                        style={{
                          strokeDasharray: '60',
                          strokeDashoffset: '0',
                        }}
                      />
                    </svg>
                  </div>
                  
                  {/* Thank You Message */}
                  <h3 className="text-2xl font-heading text-[var(--text-primary)] mb-3">
                    {formContent.thankYouTitle || 'Thank you!'}
                  </h3>
                  <p className="text-[var(--text-secondary)] text-center max-w-sm">
                    {formContent.thankYouMessage || "Your message has been sent. I'll reply to your email soon."}
                  </p>
                </div>
              ) : (
                <>
                  {/* Back Button */}
                  <button 
                    onClick={() => setView('options')}
                    className="flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors mb-8"
                  >
                    {Icons.back}
                    <span className="text-sm">{formContent.back}</span>
                  </button>

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name & Email Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                          {formContent.name}
                        </label>
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder={formContent.namePlaceholder}
                          required
                          className="w-full px-4 py-3 rounded-xl bg-[var(--bg-secondary)] border-2 border-[var(--border-color)] text-[var(--text-primary)] placeholder:text-[var(--text-secondary)]/60 focus:outline-none focus:border-black dark:focus:border-white transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[var(--text-primary)] mb-2">
                          {formContent.email}
                        </label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder={formContent.emailPlaceholder}
                          required
                          className="w-full px-4 py-3 rounded-xl bg-[var(--bg-secondary)] border-2 border-[var(--border-color)] text-[var(--text-primary)] placeholder:text-[var(--text-secondary)]/60 focus:outline-none focus:border-black dark:focus:border-white transition-colors"
                        />
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <label className="text-sm font-medium text-[var(--text-primary)]">
                          {formContent.message}
                        </label>
                        <span className="text-xs text-[var(--text-secondary)]">
                          {formData.message.length}/1000
                        </span>
                      </div>
                      <textarea
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value.slice(0, 1000) })}
                        placeholder={formContent.messagePlaceholder}
                        required
                        rows={5}
                        className="w-full px-4 py-3 rounded-xl bg-[var(--bg-secondary)] border-2 border-[var(--border-color)] text-[var(--text-primary)] placeholder:text-[var(--text-secondary)]/60 focus:outline-none focus:border-black dark:focus:border-white transition-colors resize-none"
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full flex items-center justify-center gap-3 py-4 rounded-2xl font-bold text-base transition-all ${
                        submitStatus === 'error'
                        ? 'bg-red-500 text-white'
                        : 'bg-black text-white dark:bg-white dark:text-black hover:opacity-90 shadow-lg'
                      } ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:scale-[1.02] active:scale-[0.98]'}`}
                    >
                      {submitStatus === 'error' ? (
                        formContent.error
                      ) : isSubmitting ? (
                        <>
                          {/* Spinning Loader */}
                          <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          {formContent.sending}
                        </>
                      ) : (
                        <>
                          {Icons.send}
                          {formContent.submit}
                        </>
                      )}
                    </button>
                  </form>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
