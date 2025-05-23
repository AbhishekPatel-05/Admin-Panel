// api/ollama.js
export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { prompt, test } = req.body;

    // Handle test connection
    if (test) {
      return res.status(200).json({ status: 'ok' });
    }

    // Generate AI response (mock for now)
    // In production, replace this with actual AI service like OpenAI
    const mockResponse = {
      response: `AI Response: I understand you're asking about: "${prompt}". This is a demo response. In production, this would be powered by a real AI service.`
    };
    
    res.status(200).json(mockResponse);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}