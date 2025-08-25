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
    console.log('🎵 AudioPlayer received URL:', audioUrl);
    console.log('🎵 Track title:', trackTitle);
    
    if (audioRef.current) {
      audioRef.current.load();
      // Auto-play after user interaction
      audioRef.current.play().catch(error => {
        console.log('Autoplay blocked, user must click play:', error);
      });
    }
  }, [audioUrl]);

  return (
    <div className="audio-player-fixed">
      <div className="audio-player-container">
        <div className="player-header">
          <div className="track-info">
            <h4>🎵 {trackTitle}</h4>
            <p>PKRK FM - Streaming from CloudFront CDN</p>
            <p className="audio-url">📍 Mumbai, India Region</p>
          </div>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>
        
        <div className="player-controls">
          <audio 
            ref={audioRef}
            controls 
            style={{ width: '100%' }}
            crossOrigin="anonymous"
            preload="metadata"
          >
            <source src={audioUrl} type="audio/mpeg" />
            Your browser does not support audio playback.
          </audio>
          
          <div className="audio-debug">
            <small>URL: {audioUrl}</small>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
