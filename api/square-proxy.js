// api/square-proxy.js
import fetch from 'node-fetch';

export default async function handler(req, res) {
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

    const { method, path, body } = req.body;
    
    const accessToken = process.env.SQUARE_ACCESS_TOKEN;

    if (!accessToken) {
        return res.status(500).json({ error: 'Square Access Token is not configured on the server.' });
    }

    const squareApiUrl = `https://connect.squareup.com${path}`;

    try {
        const options = {
            method: method,
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Square-Version': '2024-12-18',
                'Content-Type': 'application/json'
            }
        };

        if (body) {
            options.body = JSON.stringify(body);
        }

        const squareResponse = await fetch(squareApiUrl, options);
        const data = await squareResponse.json();

        if (!squareResponse.ok) {
            return res.status(squareResponse.status).json(data);
        }

        res.status(200).json(data);

    } catch (error) {
        console.error('Proxy error:', error);
        console.error('Request details:', { method, path, body });
        res.status(500).json({ 
            error: 'An internal server error occurred.',
            details: error.message,
            path: path,
            method: method
        });
    }
}