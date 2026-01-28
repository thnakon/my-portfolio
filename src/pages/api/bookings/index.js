import { appendToSheet } from '@/lib/googleSheets';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { name, email, date, time, message } = req.body;

        // Validate required fields
        if (!name || !email || !date || !time) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // Send to Google Sheets
        await appendToSheet('Bookings', {
            name,
            email,
            date,
            time,
            message: message || 'No additional message',
            status: 'pending',
        });

        return res.status(200).json({ success: true, message: 'Booking created successfully' });
    } catch (error) {
        console.error('Error creating booking:', error);
        return res.status(500).json({ error: 'Failed to create booking' });
    }
}
