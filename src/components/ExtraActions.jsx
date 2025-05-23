import React from 'react';

const ExtraActions = () => {
  const handleWriteNote = () => alert("Write a note action triggered.");
  const handleSummarize = () => alert("Summarize conversation action triggered.");
  const handleUploadAttachment = () => alert("Upload attachment action triggered.");
  const handleInsertGif = () => alert("Insert GIF action triggered.");

  return (
    <div className="extra-actions" role="group" aria-label="Extra message actions">
      <button onClick={handleWriteNote} title="Write a Note" aria-label="Write a Note">
        <i className="fas fa-sticky-note"></i> Note
      </button>
      <button onClick={handleSummarize} title="Summarize Conversation" aria-label="Summarize Conversation">
        <i className="fas fa-file-alt"></i> Summarize
      </button>
      <button onClick={handleUploadAttachment} title="Upload Attachment" aria-label="Upload Attachment">
        <i className="fas fa-paperclip"></i> Attach
      </button>
      <button onClick={handleInsertGif} title="Insert GIF" aria-label="Insert GIF">
        <i className="fas fa-file-image"></i> GIF
      </button>
    </div>
  );
};

export default ExtraActions;