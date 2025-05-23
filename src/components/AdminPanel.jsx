import React, { useState } from 'react';
import Sidebar from './Sidebar';
import ChatWindow from './ChatWindow';
import AICopilot from './AICopilot';
import { conversationsData } from '../data/conversationsData';

const AdminPanel = () => {
  const [conversations, setConversations] = useState(conversationsData);
  const [selectedId, setSelectedId] = useState(conversations[0].id);
  const [showAICopilot, setShowAICopilot] = useState(true);
  
  // State for column widths (in px)
  const [leftWidth, setLeftWidth] = useState(320);
  const [middleWidth, setMiddleWidth] = useState(600);
  const [rightWidth, setRightWidth] = useState(320);

  const selectedConversation = conversations.find(c => c.id === selectedId);

  // Add message to conversation
  const handleSendMessage = (conversationId, text) => {
    setConversations(prev =>
      prev.map(conv => {
        if (conv.id === conversationId) {
          const newMessage = {
            id: conv.messages.length + 1,
            sender: "agent",
            text,
            time: new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
          };
          return {
            ...conv,
            messages: [...conv.messages, newMessage],
            lastMessage: text,
            lastTime: "Just now",
            unread: 0,
          };
        }
        return conv;
      })
    );
  };

  // Add AI answer to composer as a new message
  const handleAddAIAnswer = (text) => {
    handleSendMessage(selectedId, text);
  };

  const handleResize = (type, startX, startWidth) => {
    const onMouseMove = (e) => {
      let newWidth;
      switch (type) {
        case 'left':
          newWidth = Math.min(Math.max(startWidth + e.clientX - startX, 240), 480);
          setLeftWidth(newWidth);
          break;
        case 'middle':
          newWidth = Math.min(Math.max(startWidth + e.clientX - startX, 320), 720);
          setMiddleWidth(newWidth);
          break;
        case 'right':
          newWidth = Math.min(Math.max(startWidth - (e.clientX - startX), 240), 480);
          setRightWidth(newWidth);
          break;
        default:
          break;
      }
    };

    const onMouseUp = () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  };

  return (
    <>
      <style>{`
        :root {
          --left-width: ${leftWidth}px;
          --middle-width: ${middleWidth}px;
          --right-width: ${showAICopilot ? rightWidth : 0}px;
        }
        html, body, #root {
          height: 100%;
          margin: 0;
          padding: 0;
          width: 100vw;
          max-width: 100vw;
        }
        .app-container {
          height: 100%;
          width: 100vw;
          max-width: 100vw;
        }
      `}</style>
      <div className="app-container">
        {/* Left Sidebar */}
        <Sidebar
          conversations={conversations}
          selectedId={selectedId}
          onSelectConversation={setSelectedId}
          width={leftWidth}
          onResize={(startX, startWidth) => handleResize('left', startX, startWidth)}
        />

        {/* Middle Chat Window */}
        <ChatWindow
          conversation={selectedConversation}
          onSendMessage={handleSendMessage}
          width={middleWidth}
          onResize={(startX, startWidth) => handleResize('middle', startX, startWidth)}
        />

        {/* Right AI Copilot Panel */}
        {showAICopilot && (
          <AICopilot
            onAddAnswer={handleAddAIAnswer}
            conversationContext={selectedConversation?.messages || []}
            width={rightWidth}
            onResize={(startX, startWidth) => handleResize('right', startX, startWidth)}
          />
        )}
      </div>
    </>
  );
};

export default AdminPanel;