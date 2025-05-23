(https://admin-panel-one-liart.vercel.app/)
# AI Copilot Admin Panel

A React-based administrative panel for customer support with integrated chat inbox and AI-powered assistance.

## Features

- Responsive three-column layout (inbox, chat, AI copilot)
- Chat interface with message history and composer
- AI copilot integration using local Ollama instance
- Message formatting options (bold, italic, underline, code)
- Call and video call simulation panels
- Conversation management with unread counts

## Technologies

- React 18+
- JavaScript ES6+
- CSS3
- Node.js & Express (proxy server)
- Ollama (local LLM runtime)
- Font Awesome (icons)

## Setup

### Prerequisites
- Node.js (v16+)
- npm or yarn
- Ollama

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up Ollama:
   ```bash
   ollama serve
   ollama pull llama2
   ```

3. Create proxy server (`server.js`):
   ```javascript
   const express = require('express');
   const cors = require('cors');
   
   const app = express();
   app.use(cors());
   app.use(express.json());
   
   app.post('/api/ollama', async (req, res) => {
     const response = await fetch('http://localhost:11434/api/generate', {
       method: 'POST',
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify(req.body)
     });
     const data = await response.text();
     res.send(data);
   });
   
   app.listen(5000);
   ```

4. Run the application:
   ```bash
   # Terminal 1
   node server.js
   
   # Terminal 2  
   npm start
   ```

5. Open `http://localhost:3000`

## Notes

- Extra actions (notes, summaries, file attachments) have placeholder functionality
- Proxy server handles CORS issues between React app and Ollama
- Application uses plain CSS without external UI frameworks
- All ports and URLs can be configured as needed
