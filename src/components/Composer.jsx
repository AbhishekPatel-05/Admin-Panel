import React, { useState, useRef } from 'react';
import ExtraActions from './ExtraActions';

const Composer = ({ onSend, disabled }) => {
  const [text, setText] = useState("");
  const [showToolbar, setShowToolbar] = useState(false);
  const [toolbarPos, setToolbarPos] = useState({ top: 0, left: 0 });
  const textareaRef = useRef(null);

  const applyFormat = (tag) => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    if (start === end) return;
    
    const before = text.substring(0, start);
    const selected = text.substring(start, end);
    const after = text.substring(end);
    
    let formatted = selected;
    switch (tag) {
      case "bold":
        formatted = `**${selected}**`;
        break;
      case "italic":
        formatted = `*${selected}*`;
        break;
      case "underline":
        formatted = `__${selected}__`;
        break;
      case "strike":
        formatted = `~~${selected}~~`;
        break;
      case "code":
        formatted = `\`${selected}\``;
        break;
      default:
        break;
    }
    
    const newText = before + formatted + after;
    setText(newText);
    
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start, start + formatted.length);
    }, 0);
    setShowToolbar(false);
  };

  const handleSelect = () => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    if (start === end) {
      setShowToolbar(false);
      return;
    }
    
    const rect = textarea.getBoundingClientRect();
    const lineHeight = 24;
    const lines = textarea.value.substr(0, start).split("\n");
    const top = rect.top + window.scrollY + lines.length * lineHeight - textarea.scrollTop - 40;
    const left = rect.left + window.scrollX + 20;
    setToolbarPos({ top, left });
    setShowToolbar(true);
  };

  const handleSend = () => {
    if (!text.trim()) return;
    onSend(text.trim());
    setText("");
    setShowToolbar(false);
    textareaRef.current?.focus();
  };

  return (
    <>
      <div className="composer" style={{ position: "relative" }}>
        <textarea
          ref={textareaRef}
          rows="1"
          placeholder="Type a message"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              handleSend();
            }
          }}
          onSelect={handleSelect}
          disabled={disabled}
        />
        <button 
          onClick={handleSend} 
          disabled={disabled || !text.trim()} 
          aria-label="Send message"
        >
          <i className="fas fa-paper-plane"></i>
        </button>
        {showToolbar && (
          <div
            className="format-toolbar"
            style={{ top: toolbarPos.top, left: toolbarPos.left, position: "absolute" }}
            onMouseDown={(e) => e.preventDefault()}
          >
            <button onClick={() => applyFormat("bold")} title="Bold">
              <i className="fas fa-bold"></i>
            </button>
            <button onClick={() => applyFormat("italic")} title="Italic">
              <i className="fas fa-italic"></i>
            </button>
            <button onClick={() => applyFormat("underline")} title="Underline">
              <i className="fas fa-underline"></i>
            </button>
            <button onClick={() => applyFormat("strike")} title="Strikethrough">
              <i className="fas fa-strikethrough"></i>
            </button>
            <button onClick={() => applyFormat("code")} title="Code">
              <i className="fas fa-code"></i>
            </button>
          </div>
        )}
      </div>
      <ExtraActions />
    </>
  );
};

export default Composer;