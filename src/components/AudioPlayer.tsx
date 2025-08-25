import React, { useRef, useEffect } from 'react';
import './AudioPlayer.css';

interface AudioPlayerProps {
  audioUrl: string;
  trackTitle: string;
  onClose: () => void;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ audioUrl, trackTitle, onClose }) => {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.load();
    }
  }, [audioUrl]);

  return (
    <div className="audio-player-fixed">
      <div className="audio-player-container">
        <div className="player-header">
          <div className="track-info">
            <h4>🎵 {trackTitle}</h4>
            <p>PKRK FM - Streaming from CloudFront</p>
          </div>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>
        
        <div className="player-controls">
          <audio 
            ref={audioRef}
            controls 
            autoPlay
            style={{ width: '100%' }}
          >
            <source src={audioUrl} type="audio/mpeg" />
            Your browser does not support audio playback.
          </audio>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
