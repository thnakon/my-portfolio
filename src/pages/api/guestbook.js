import { appendToSheet, fetchFromSheet, deleteFromSheet } from '@/lib/googleSheets';
import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";

const ADMIN_EMAIL = 'thnakon.d@gmail.com';

export default async function handler(req, res) {
    const sheetName = 'Guestbook';
    const session = await getServerSession(req, res, authOptions);

    if (req.method === 'GET') {
        // Get all messages from Google Sheets
        try {
            const messages = await fetchFromSheet(sheetName);

            // Format messages to ensure correct field names and types
            // Google Sheets returns headers exactly as they are in the sheet
            const formattedMessages = messages.map(msg => ({
                id: msg.id || Date.now(),
                name: msg.name || 'Anonymous',
                avatar: msg.avatar || null,
                message: msg.message || '',
                email: msg.email || '', // Include email for admin visibility if needed
                date: msg.date || new Date().toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                }),
                createdAt: msg.createdAt || new Date().toISOString()
            }));

            // Sort by createdAt descending
            formattedMessages.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

            res.status(200).json(formattedMessages);
        } catch (error) {
            console.error('Fetch Guestbook Error:', error);
            res.status(500).json({ error: 'Failed to load messages from Google Sheets' });
        }
    } else if (req.method === 'POST') {
        // Add new message to Google Sheets
        try {
            if (!session) {
                return res.status(401).json({ error: 'Unauthorized' });
            }

            const { name, avatar, message } = req.body;

            if (!name || !message) {
                return res.status(400).json({ error: 'Name and message are required' });
            }

            const newMessage = {
                id: Date.now(),
                name,
                avatar: avatar || null,
                message,
                email: session.user.email, // Store the email in the sheet
                date: new Date().toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                }),
                createdAt: new Date().toISOString()
            };

            await appendToSheet(sheetName, newMessage);

            res.status(201).json(newMessage);
        } catch (error) {
            console.error('Save Guestbook Error:', error);
            res.status(500).json({ error: 'Failed to save message to Google Sheets' });
        }
    } else if (req.method === 'DELETE') {
        // Admin delete message
        try {
            if (!session || session.user.email !== ADMIN_EMAIL) {
                return res.status(403).json({ error: 'Only admin can delete messages' });
            }

            const { id } = req.query;
            if (!id) {
                return res.status(400).json({ error: 'ID is required' });
            }

            await deleteFromSheet(sheetName, id);
            res.status(200).json({ success: true });
        } catch (error) {
            console.error('Delete Guestbook Error:', error);
            res.status(500).json({ error: 'Failed to delete message' });
        }
    } else {
        res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
