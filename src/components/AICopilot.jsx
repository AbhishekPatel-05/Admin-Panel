import React, { useState, useRef, useEffect } from 'react';
import { OllamaService } from '../services/ollamaService';

const AICopilot = ({ onAddAnswer, conversationContext, width, onResize }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isOllamaConnected, setIsOllamaConnected] = useState(false);

  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    // Test Ollama connection on component mount
    const testConnection = async () => {
      const connected = await OllamaService.testConnection();
      setIsOllamaConnected(connected);
    };
    testConnection();
  }, []);

  const handleMouseDown = (e) => {
    e.preventDefault();
    const startX = e.clientX;
    const startWidth = width;
    onResize(startX, startWidth);
  };

  const sendToOllama = async (userMessage) => {
    setLoading(true);
    setMessages(prev => [...prev, { role: "user", content: userMessage }]);

    try {
      const response = await OllamaService.generateResponse([
        ...messages,
        { role: "user", content: userMessage }
      ]);

      setMessages(prev => [...prev, response]);
    } catch (err) {
      console.error('Error:', err);
      setMessages(prev => [...prev, {
        role: "assistant",
        content: "⚠️ Error fetching AI response. Please check if Ollama is running and try again.",
      }]);
    }

    setLoading(false);
    setInput("");
  };

  const handleSend = () => {
    if (!input.trim()) return;
    sendToOllama(input.trim());
  };

  const handleAddAnswer = () => {
    const lastAssistantMessage = messages
      .filter(msg => msg.role === 'assistant')
      .pop();
    
    if (lastAssistantMessage) {
      onAddAnswer(lastAssistantMessage.content);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div 
      className="right-ai flex flex-col" 
      style={{width: `${width}px`, position: 'relative'}}
    >
      <div className="ai-header">
        <div className="ai-header-left">
          <img src="https://placehold.co/24x24/png?text=AI" alt="AI Icon" />
          AI Copilot
          {!isOllamaConnected && (
            <span className="text-xs text-red-500 ml-2">(Offline)</span>
          )}
        </div>
      </div>

      <div className="flex-grow overflow-y-auto mb-2 px-2" style={{ maxHeight: "60vh" }}>
        {messages.length === 0 ? (
          <div className="text-center text-gray-400 mt-4 text-sm">
            Ask me anything to help with customer support!
          </div>
        ) : (
          messages.map((msg, idx) => (
            <div 
              key={idx} 
              className={`p-3 my-2 rounded-md ${
                msg.role === "user" 
                  ? "bg-indigo-100 text-indigo-800 self-start" 
                  : "bg-indigo-600 text-white self-end"
              } max-w-[95%] break-words`}
            >
              {msg.content}
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="space-y-2">
        <textarea
          className="ai-textarea w-full"
          placeholder="Ask AI for help with customer support..."
          rows="3"
          disabled={loading}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        
        <div className="flex gap-2">
          <button
            className="ai-button flex-1"
            onClick={handleSend}
            disabled={loading || !input.trim()}
          >
            {loading ? "Thinking..." : "Ask AI"}
          </button>
          
          <button
            className="ai-button flex-1"
            onClick={handleAddAnswer}
            disabled={messages.filter(m => m.role === 'assistant').length === 0}
            style={{
              background: '#a5b4fc',
              color: '#3730a3'
            }}
          >
            Add to Chat
          </button>
        </div>
        
        <div className="text-xs text-gray-500 text-center">
          {isOllamaConnected ? (
            <span className="text-green-600">✓ Connected to Ollama</span>
          ) : (
            <span className="text-red-500">⚠ Ollama offline - using fallback responses</span>
          )}
        </div>
      </div>
      
      {/* Resize handle */}
      <div
        className="resize-handle"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '6px',
          height: '100%',
          cursor: 'col-resize',
          userSelect: 'none',
          zIndex: 10,
        }}
        onMouseDown={handleMouseDown}
      />
    </div>
  );
};

export default AICopilot;