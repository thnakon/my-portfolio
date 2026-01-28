import { appendToSheet } from '@/lib/googleSheets';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { name, email, subject, message } = req.body;

        // Validate required fields
        if (!name || !email || !message) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // Send to Google Sheets
        await appendToSheet('Messages', {
            name,
            email,
            subject: subject || 'No Subject',
            message,
        });

        return res.status(200).json({ success: true, message: 'Message sent successfully' });
    } catch (error) {
        console.error('Error saving message:', error);
        return res.status(500).json({ error: 'Failed to send message' });
    }
}
