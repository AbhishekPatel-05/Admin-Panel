import React, { useEffect, useRef, useState } from 'react';
import ChatHeader from './ChatHeader'; // Changed to default import
import Message from './Message'; // Changed to default import
import Composer from './Composer'; // Changed to default import
import CallPanel from './CallPanel'; // Changed to default import
import VideoCallPanel from './VideoCallPanel'; // Changed to default import

export const ChatWindow = ({ conversation, onSendMessage, width, onResize }) => {
  const messagesEndRef = useRef(null);
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showCallPanel, setShowCallPanel] = useState(false);
  const [showVideoCallPanel, setShowVideoCallPanel] = useState(false);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversation]);

  const handleMouseDown = (e) => {
    e.preventDefault();
    const startX = e.clientX;
    const startWidth = width;
    onResize(startX, startWidth);
  };

  // Filter messages by search term
  const filteredMessages = searchTerm
    ? conversation.messages.filter((msg) =>
        msg.text.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : conversation.messages;

  const handleSend = (text) => {
    onSendMessage(conversation.id, text);
  };

  const headerActions = {
    onCall: () => setShowCallPanel(true),
    onVideoCall: () => setShowVideoCallPanel(true),
    onSearch: () => setShowSearch(v => !v),
    onClose: () => alert('Close chat clicked!'),
    showSearch
  };

  if (!conversation) {
    return (
      <div className="chat-window" style={{width: `${width}px`}}>
        <div className="flex items-center justify-center h-full text-gray-500 select-none">
          Select a conversation
        </div>
      </div>
    );
  }

  return (
    <>
      <main 
        className="chat-window" 
        role="main" 
        aria-label="Chat window" 
        style={{width: `${width}px`, position: 'relative'}}
      >
        <ChatHeader 
          conversation={conversation} 
          actions={headerActions}
        />
        
        {showSearch && (
          <div className="p-3 border-b border-gray-300 bg-gray-50">
            <input
              type="text"
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Search messages..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              autoFocus
            />
          </div>
        )}
        
        <div className="chat-messages scrollbar-thin">
          {filteredMessages.length > 0 ? (
            filteredMessages.map((msg) => (
              <Message key={msg.id} message={msg} />
            ))
          ) : (
            <div className="text-center text-gray-400 mt-10 select-none">
              No messages found.
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        
        <Composer onSend={handleSend} disabled={false} />
        
        {/* Resize handle */}
        <div
          className="resize-handle"
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            width: '6px',
            height: '100%',
            cursor: 'col-resize',
            userSelect: 'none',
            zIndex: 10,
          }}
          onMouseDown={handleMouseDown}
        />
      </main>
      
      {showCallPanel && (
        <CallPanel
          name={conversation.name}
          onClose={() => setShowCallPanel(false)}
        />
      )}
      
      {showVideoCallPanel && (
        <VideoCallPanel
          name={conversation.name}
          onClose={() => setShowVideoCallPanel(false)}
        />
      )}
    </>
  );
};

export default ChatWindow;