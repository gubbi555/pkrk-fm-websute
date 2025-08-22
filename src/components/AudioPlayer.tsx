import React, { useRef, useEffect } from 'react';
import './AudioPlayer.css';

interface AudioPlayerProps {
  audioUrl: string;
  onClose: () => void;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ audioUrl, onClose }) => {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.load();
    }
  }, [audioUrl]);

  return (
    <div className="audio-player-overlay">
      <div className="audio-player-container">
        <div className="player-header">
          <h4>🎵 Now Playing</h4>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>
        
        <div className="player-controls">
          <audio 
            ref={audioRef}
            controls 
            autoPlay
            className="audio-element"
          >
            <source src={audioUrl} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </div>
        
        <div className="audio-info">
          <p className="audio-url">Playing from CloudFront CDN</p>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
