import React from 'react';

const VideoCallPanel = ({ name, onClose }) => {
  return (
    <div className="video-call-panel" role="alert" aria-live="assertive" aria-atomic="true">
      <div className="call-info">Video calling {name}...</div>
      <button onClick={onClose} aria-label="End Video Call" title="End Video Call">
        <i className="fas fa-video-slash"></i>
      </button>
    </div>
  );
};

export default VideoCallPanel;
