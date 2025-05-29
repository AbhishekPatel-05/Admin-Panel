import axios from 'axios';


const API_URL = '/api/ollama';

export class OllamaService {
  static async generateResponse(messages) {
    try {

      const prompt = messages.map(msg => {
        const role = msg.role === 'user' ? 'Human' : 'Assistant';
        return `${role}: ${msg.content}`;
      }).join('\n') + '\nAssistant:';


      const response = await axios.post(API_URL, {
        prompt: prompt,
        messages: messages, 
        options: {
          temperature: 0.7,
          max_tokens: 500,
        }
      });

      return {
        role: 'assistant',
        content: response.data.response || response.data.content
      };
    } catch (error) {
      console.error('AI API Error:', error);
      
      const lastMessage = messages[messages.length - 1]?.content?.toLowerCase() || '';
      
      let fallbackResponse = "I'm here to help! Could you please provide more details about your question?";
      
      if (lastMessage.includes('order')) {
        fallbackResponse = "I see you have a question about your order. Could you please provide your order number?";
      } else if (lastMessage.includes('cancel')) {
        fallbackResponse = "To cancel your subscription, please visit your account settings or contact support.";
      } else if (lastMessage.includes('reset password')) {
        fallbackResponse = "You can reset your password by clicking the 'Forgot Password' link on the login page.";
      } else if (lastMessage.includes('shipment') || lastMessage.includes('delivery')) {
        fallbackResponse = "Your shipment is on the way and should arrive within 3-5 business days.";
      } else if (lastMessage.includes('feature')) {
        fallbackResponse = "The new feature is scheduled for release next month. Stay tuned!";
      }

      return {
        role: 'assistant',
        content: `⚠️ AI service temporarily unavailable. Fallback response: ${fallbackResponse}`
      };
    }
  }

  static async testConnection() {
    try {
  
      const response = await axios.post(API_URL, {
        prompt: "test",
        test: true
      });
      return response.status === 200;
    } catch (error) {
      console.error('AI API connection test failed:', error);
      return false;
    }
  }

  static async getAvailableModels() {
    try {
      return [
        { name: 'gpt-3.5-turbo', size: '4B' },
        { name: 'claude-instant', size: '52B' }
      ];
    } catch (error) {
      console.error('Failed to get models:', error);
      return [];
    }
  }
}

export default OllamaService;
