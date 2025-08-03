// api/server.js
const express = require('express');
const fetch = require('node-fetch');

const app = express();
app.use(express.json());

// Endpoint to verify the developer token
app.post('/api/verify-token', (req, res) => {
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
});

// The secure proxy endpoint for Square API calls
app.post('/api/square-proxy', async (req, res) => {
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
                'Square-Version': '2023-10-18',
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
        res.status(500).json({ error: 'An internal server error occurred.' });
    }
});

// For Vercel serverless functions, we need to export the handler
module.exports = app;