import React from 'react';

export const ChatHeader = ({ conversation, actions }) => {
  const { onCall, onVideoCall, onSearch, onClose, showSearch } = actions;

  return (
  <div className="chat-header">
    <div className="chat-header-left">
      <div className="chat-header-avatar">
        <img src={conversation.avatar} alt={`Avatar of ${conversation.name}`} loading="lazy" />
      </div>
      <div className="chat-header-info">
        <div className="chat-header-name">{conversation.name}</div>
        <div className="chat-header-status">
          {conversation.unread > 0
            ? `${conversation.unread} unread message${conversation.unread > 1 ? "s" : ""}`
            : "No unread messages"}
        </div>
      </div>
    </div>
    <div className="chat-header-buttons" role="group" aria-label="Chat actions">
      <button title="Call" aria-label="Call" onClick={onCall}>
        <i className="fas fa-phone"></i>
      </button>
      <button title="Video Call" aria-label="Video Call" onClick={onVideoCall}>
        <i className="fas fa-video"></i>
      </button>
      <button
        title="Search"
        aria-label="Search"
        onClick={onSearch}
        className={`search-button ${showSearch ? "active" : ""}`}
      >
        <i className="fas fa-search"></i>
      </button>
      <button title="Close Chat" aria-label="Close Chat" onClick={onClose}>
        <i className="fas fa-times"></i>
      </button>
    </div>
  </div>
);

};

export default ChatHeader;