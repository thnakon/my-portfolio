import { useState } from 'react';

// SVG Icons
const Icons = {
  close: (
    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
  ),
};

export default function BookingModal({ isOpen, onClose, t }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    date: '',
    time: '',
    message: '',
  });
  const [status, setStatus] = useState('idle');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('booking');

    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', date: '', time: '', message: '' });
        setTimeout(() => {
          setStatus('idle');
          onClose();
        }, 3000);
      } else {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 5000);
      }
    } catch (error) {
      console.error('Error:', error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  const timeSlots = [
    '09:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00', '17:00'
  ];

  const getMinDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  if (!isOpen) return null;

  return (
    <div className={`modal-overlay ${isOpen ? 'active' : ''}`} onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="font-heading text-2xl">{t.booking.title}</h3>
            <p className="text-secondary text-sm mt-1">{t.booking.subtitle}</p>
          </div>
          <button onClick={onClose} className="toggle-btn">
            {Icons.close}
          </button>
        </div>

        {/* Success Message */}
        {status === 'success' && (
          <div className="mb-6 p-4 bg-green-500 text-white rounded-xl text-center">
            {t.booking.success}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-2">{t.contact.nameLabel}</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder={t.contact.namePlaceholder}
              required
              className="form-input"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">{t.contact.emailLabel}</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder={t.contact.emailPlaceholder}
              required
              className="form-input"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">{t.booking.dateLabel}</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                min={getMinDate()}
                required
                className="form-input"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">{t.booking.timeLabel}</label>
              <select
                name="time"
                value={formData.time}
                onChange={handleChange}
                required
                className="form-input"
              >
                <option value="">--:--</option>
                {timeSlots.map((time) => (
                  <option key={time} value={time}>{time}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">{t.contact.messageLabel}</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder={t.contact.messagePlaceholder}
              rows={3}
              className="form-input resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={status === 'booking'}
            className="btn-primary w-full py-4 rounded-xl font-medium disabled:opacity-50"
          >
            {status === 'booking' ? t.booking.booking : t.booking.book}
          </button>
        </form>
      </div>
    </div>
  );
}
