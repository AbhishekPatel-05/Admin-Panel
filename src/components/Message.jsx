import React from 'react';

const Message = ({ message }) => {
  const isAgent = message.sender === "agent";
  return (
    <div
      className={`message ${isAgent ? "agent" : "user"}`}
      title={message.time}
    >
      {message.text}
      <div className="message-time">{message.time}</div>
    </div>
  );
};


export default Message;
