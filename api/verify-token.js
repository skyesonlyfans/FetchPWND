// api/verify-token.js
export default function handler(req, res) {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Handle preflight requests
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { token } = req.body;
    const devToken = process.env.DEV_TOKEN;

    if (!devToken) {
        return res.status(500).json({ error: 'Developer token is not configured on the server.' });
    }

    if (token === devToken) {
        res.status(200).json({ success: true });
    } else {
        res.status(401).json({ error: 'Invalid developer token.' });
    }
}