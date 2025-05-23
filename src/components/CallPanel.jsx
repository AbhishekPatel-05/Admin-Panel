import React from 'react';

const CallPanel = ({ name, onClose }) => {
  return (
    <div className="call-panel" role="alert" aria-live="assertive" aria-atomic="true">
      <div className="call-info">Calling {name}...</div>
      <button onClick={onClose} aria-label="End Call" title="End Call">
        <i className="fas fa-phone-slash"></i>
      </button>
    </div>
  );
};
export default CallPanel;