import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'data', 'guestbook.json');

// Ensure data directory exists
const ensureDataDir = () => {
    const dataDir = path.join(process.cwd(), 'data');
    if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
    }
    if (!fs.existsSync(dataFilePath)) {
        fs.writeFileSync(dataFilePath, JSON.stringify([], null, 2));
    }
};

const getMessages = () => {
    ensureDataDir();
    const data = fs.readFileSync(dataFilePath, 'utf-8');
    return JSON.parse(data);
};

const saveMessages = (messages) => {
    ensureDataDir();
    fs.writeFileSync(dataFilePath, JSON.stringify(messages, null, 2));
};

export default async function handler(req, res) {
    if (req.method === 'GET') {
        // Get all messages
        try {
            const messages = getMessages();
            res.status(200).json(messages);
        } catch (error) {
            res.status(500).json({ error: 'Failed to load messages' });
        }
    } else if (req.method === 'POST') {
        // Add new message
        try {
            const { name, avatar, message } = req.body;

            if (!name || !message) {
                return res.status(400).json({ error: 'Name and message are required' });
            }

            const messages = getMessages();
            const newMessage = {
                id: Date.now(),
                name,
                avatar: avatar || null,
                message,
                date: new Date().toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                }),
                createdAt: new Date().toISOString()
            };

            messages.unshift(newMessage);
            saveMessages(messages);

            res.status(201).json(newMessage);
        } catch (error) {
            res.status(500).json({ error: 'Failed to save message' });
        }
    } else {
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
