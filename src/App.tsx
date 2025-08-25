import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Amplify } from 'aws-amplify';
import { withAuthenticator, Button } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import axios from 'axios';
import CategoryBrowser from './components/CategoryBrowser';
import ShowDetails from './components/ShowDetails';
import AudioPlayer from './components/AudioPlayer';
import awsconfig from './aws-exports';
import './App.css';

Amplify.configure(awsconfig);

interface Category {
  category_id: string;
  display_name: string;
  description: string;
  background_image: string;
  shows?: string[];
  subcategories?: string[];
  seasons?: string[];
}

function App({ signOut, user }: any) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentAudio, setCurrentAudio] = useState<string | null>(null);
  const [currentTrack, setCurrentTrack] = useState('');

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      console.log('📡 Fetching categories from API...');
      const response = await axios.get(
        'https://fz7forxwz8.execute-api.ap-south-1.amazonaws.com/prod/categories'
      );
      console.log('📊 Categories response:', response.data);
      setCategories(response.data);
    } catch (error) {
      console.error('❌ Error fetching categories:', error);
      // Only use fallback if API completely fails
      setCategories(getDefaultCategories());
    } finally {
      setLoading(false);
    }
  };

  const getDefaultCategories = (): Category[] => [
    {
      category_id: 'film-songs',
      display_name: 'ಚಲನಚಿತ್ರ ಗೀತೆಗಳು',
      description: 'Popular Kannada film songs collection',
      background_image: 'film-songs-bg.jpg'
    },
    {
      category_id: 'podcasts',
      display_name: 'ಪಾಡ್‌ಕಾಸ್ಟ್‌ಗಳು',
      description: 'Kannada podcasts and talk shows',
      background_image: 'podcasts-bg.jpg'
    },
    {
      category_id: 'stories',
      display_name: 'ಕಥೆಗಳು',
      description: 'Engaging Kannada stories - horror and thriller',
      background_image: 'stories-bg.jpg'
    },
    {
      category_id: 'web-series',
      display_name: 'ವೆಬ್ ಸರಣಿಗಳು',
      description: 'Kannada web series collection',
      background_image: 'web-series-bg.jpg'
    }
  ];

  const playAudio = (audioPath: string, trackTitle?: string) => {
    // Properly encode URL for special characters like spaces
    const encodedPath = audioPath
      .split('/')
      .map(segment => encodeURIComponent(segment))
      .join('/');
    
    const fullURL = `https://d1jespy3mv91ys.cloudfront.net/${encodedPath}`;
    
    console.log('🎵 Original path:', audioPath);
    console.log('🎵 Encoded path:', encodedPath);
    console.log('🎵 Full URL:', fullURL);
    
    setCurrentAudio(fullURL);
    setCurrentTrack(trackTitle || 'Now Playing');
  };

  return (
    <div className="App">
      <header className="app-header">
        <div className="logo-section">
          <h1>🎵 PKRK FM</h1>
          <p>ಕನ್ನಡ ಆಡಿಯೋ ಅಪ್ಲಿಕೇಶನ್</p>
        </div>
        <div className="user-info">
          <span>Welcome, {user?.username}!</span>
          <Button onClick={signOut} variation="primary">Sign Out</Button>
        </div>
      </header>

      {loading ? (
        <div className="loading">
          <div className="spinner"></div>
          <p>Loading your Kannada content...</p>
        </div>
      ) : (
        <Routes>
          <Route 
            path="/" 
            element={
              <CategoryBrowser 
                categories={categories}
                onPlayAudio={playAudio}
              />
            } 
          />
          <Route 
            path="/category/:categoryId" 
            element={<ShowDetails onPlayAudio={playAudio} />} 
          />
        </Routes>
      )}

      {currentAudio && (
        <AudioPlayer 
          audioUrl={currentAudio}
          trackTitle={currentTrack}
          onClose={() => setCurrentAudio(null)}
        />
      )}
    </div>
  );
}

export default withAuthenticator(App, {
  signUpAttributes: ['email']
});
