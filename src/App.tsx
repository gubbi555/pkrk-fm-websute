import React, { useState, useEffect } from 'react';
import { Amplify } from 'aws-amplify';
import { withAuthenticator, Button } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import axios from 'axios';
import AudioPlayer from './components/AudioPlayer';
import CategoryBrowser from './components/CategoryBrowser';
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
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [currentAudio, setCurrentAudio] = useState<string | null>(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        'https://fz7forxwz8.execute-api.ap-south-1.amazonaws.com/prod/categories'
      );
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setLoading(false);
    }
  };

  const playAudio = (audioPath: string) => {
    setCurrentAudio(`https://d1jespy3mv91ys.cloudfront.net/${audioPath}`);
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
        <>
          <CategoryBrowser 
            categories={categories}
            onCategorySelect={setSelectedCategory}
            onPlayAudio={playAudio}
          />
          
          {currentAudio && (
            <AudioPlayer 
              audioUrl={currentAudio}
              onClose={() => setCurrentAudio(null)}
            />
          )}
        </>
      )}
    </div>
  );
}

export default withAuthenticator(App, {
  signUpAttributes: ['email']
});
