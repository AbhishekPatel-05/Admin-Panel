import React from 'react';

const InboxItem = ({ conversation, selected, onClick }) => {
  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      onClick();
    }
  };

  return (
    <div
      onClick={onClick}
      className={`inbox-item ${selected ? "selected" : ""}`}
      role="button"
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <div className="inbox-item-avatar">
        <img
          src={conversation.avatar}
          alt={`Avatar of ${conversation.name}`}
          loading="lazy"
        />
      </div>
      <div className="inbox-item-content">
        <div className="inbox-item-header">
          <div className="inbox-item-name">{conversation.name}</div>
          <div className="inbox-item-time">{conversation.lastTime}</div>
        </div>
        <div className="inbox-item-message">{conversation.lastMessage}</div>
      </div>
      {conversation.unread > 0 && (
        <div className="inbox-item-unread">{conversation.unread}</div>
      )}
    </div>
  );
};

export default InboxItem;