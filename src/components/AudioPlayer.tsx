import React from 'react';
import ReactPlayer from 'react-player';
import './AudioPlayer.css';

interface AudioPlayerProps {
  audioUrl: string;
  onClose: () => void;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ audioUrl, onClose }) => {
  return (
    <div className="audio-player-overlay">
      <div className="audio-player-container">
        <div className="player-header">
          <h4>🎵 Now Playing - PKRK FM</h4>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>
        
        <div className="player-controls">
          <ReactPlayer
            url={audioUrl}
            controls
            playing
            width="100%"
            height="60px"
            config={{
              file: {
                attributes: {
                  controlsList: 'nodownload'
                }
              }
            }}
          />
        </div>
        
        <div className="audio-info">
          <p className="audio-url">🌐 Streaming from CloudFront CDN</p>
          <p className="audio-source">📍 Mumbai, India Region</p>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
