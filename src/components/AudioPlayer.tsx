import React, { useRef, useEffect } from 'react';
import ReactPlayer from 'react-player';
import './AudioPlayer.css';

interface AudioPlayerProps {
  audioUrl: string;
  onClose: () => void;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ audioUrl, onClose }) => {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    console.log('🎵 AudioPlayer received URL:', audioUrl);
  }, [audioUrl]);

  return (
    <div className="audio-player-overlay">
      <div className="audio-player-container">
        <div className="player-header">
          <h4>🎵 Now Playing - PKRK FM</h4>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>
        
        <div className="player-controls">
          {/* ReactPlayer */}
          <ReactPlayer
            url={audioUrl}
            controls
            playing
            width="100%"
            height="60px"
            onError={(error) => console.error('ReactPlayer error:', error)}
            onReady={() => console.log('ReactPlayer ready')}
            config={{
              file: {
                attributes: {
                  controlsList: 'nodownload',
                  crossOrigin: 'anonymous'
                }
              }
            }}
          />
          
          {/* Fallback HTML5 Audio */}
          <audio 
            ref={audioRef}
            controls 
            style={{ width: '100%', marginTop: '10px' }}
            crossOrigin="anonymous"
          >
            <source src={audioUrl} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
        </div>
        
        <div className="audio-info">
          <p className="audio-url">🌐 Streaming from CloudFront CDN</p>
          <p className="audio-source">📍 Mumbai, India Region</p>
          <p className="audio-debug">URL: {audioUrl}</p>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
