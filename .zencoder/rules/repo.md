---
description: Repository Information Overview
alwaysApply: true
---

# FetchPWND Information

## Summary
FetchPWND is a web application that serves as an e-receipt generation utility. It provides a secure proxy for the Square API, allowing users to generate receipts and manage Square products. The application includes token-based authentication and supports both EmailJS and Square API for receipt delivery.

## Structure
- **api/**: Contains server-side JavaScript files for API endpoints
  - `server.js`: Main Express server implementation
  - `square-proxy.js`: Serverless function for Square API proxy
  - `verify-token.js`: Serverless function for token verification
- **index.html**: Main frontend interface with UI components
- **package.json**: Node.js project configuration
- **vercel.json**: Vercel deployment configuration

## Language & Runtime
**Language**: JavaScript
**Version**: Node.js 22.x (specified in package.json)
**Framework**: Express.js for backend, vanilla JavaScript for frontend
**Deployment**: Vercel serverless functions

## Dependencies
**Main Dependencies**:
- express: ^4.18.2 - Web server framework
- node-fetch: ^2.6.7 - HTTP client for making requests to Square API

**Frontend Dependencies** (CDN-loaded):
- TailwindCSS - For styling
- EmailJS - For email delivery functionality

## Build & Installation
```bash
npm install
npm start
```

## Deployment
The application is configured for deployment on Vercel with the following environment variables:
- `SQUARE_ACCESS_TOKEN`: Square API access token
- `DEV_TOKEN`: 6-digit developer token for application access

## API Endpoints
**Verify Token**: `/api/verify-token`
- Validates the developer token for application access

**Square Proxy**: `/api/square-proxy`
- Securely proxies requests to the Square API
- Handles authentication with Square
- Supports various Square API operations

## Frontend Features
- Token-based authentication gate
- Configuration options for receipt generation
- Support for multiple delivery methods:
  - EmailJS custom delivery
  - Square API integration
- Square product management interface
- Points per receipt configuration
- Responsive design with hacker-themed UI

## Integration Points
- **Square API**: For product management, inventory, and receipt generation
- **EmailJS**: For custom email delivery of receipts
- **Vercel**: For serverless function hosting and deployment