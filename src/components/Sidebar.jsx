import React from 'react';
import InboxItem from './InboxItem';

const Sidebar = ({ conversations, selectedId, onSelectConversation, width, onResize }) => {
  const handleMouseDown = (e) => {
    e.preventDefault();
    const startX = e.clientX;
    const startWidth = width;
    onResize(startX, startWidth);
  };

  return (
    <aside 
      className="left-sidebar" 
      role="navigation" 
      aria-label="Inbox conversations" 
      style={{width: `${width}px`}}
    >
      <div className="left-sidebar-header">
        <i className="fas fa-inbox"></i>
        Inbox
      </div>
      <div className="inbox-list scrollbar-thin" tabIndex={0}>
        {conversations.map((conv) => (
          <InboxItem
            key={conv.id}
            conversation={conv}
            selected={conv.id === selectedId}
            onClick={() => onSelectConversation(conv.id)}
          />
        ))}
      </div>
      
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
    </aside>
  );
};

export default Sidebar;