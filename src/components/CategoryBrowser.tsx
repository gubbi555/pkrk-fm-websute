import React, { useState } from 'react';
import './CategoryBrowser.css';

interface Category {
  category_id: string;
  display_name: string;
  description: string;
  background_image: string;
  shows?: string[];
  subcategories?: string[];
  seasons?: string[];
}

interface Show {
  show_id: string;
  title: string;
  description: string;
  episodes?: { title: string; audio_path: string }[];
}

interface CategoryBrowserProps {
  categories: Category[];
  onCategorySelect: (category: Category) => void;
  onPlayAudio: (audioPath: string) => void;
}

const CategoryBrowser: React.FC<CategoryBrowserProps> = ({ 
  categories, 
  onCategorySelect,
  onPlayAudio
}) => {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [shows, setShows] = useState<Show[]>([]);
  const [loadingShows, setLoadingShows] = useState(false);

  const getSampleAudio = (category: Category) => {
    let audioPath = '';
    switch (category.category_id) {
      case 'film-songs':
        audioPath = 'film-songs/hit-kannada-songs-vol1/MonsoonRaga/Hombisilina (PenduJatt.Com.Se).mp3';
        break;
      case 'podcasts':
        audioPath = 'podcasts/season1/episode1.mp3';
        break;
      case 'stories':
        audioPath = 'stories/horror/BhootadaMane1/season1/episode1.mp3';
        break;
      case 'web-series':
        audioPath = 'web-series/jackie1/season1/episode1.mp3';
        break;
      default:
        audioPath = '';
    }
    
    // Log the exact URL being constructed
    const fullURL = `https://d1jespy3mv91ys.cloudfront.net/${audioPath}`;
    console.log('🎵 Sample Audio URL:', fullURL);
    console.log('🎵 Audio Path:', audioPath);
    
    return audioPath;
  };

  // Handler for Browse Content
  const handleBrowseContent = async (category: Category) => {
    setSelectedCategory(category);
    setShows([]);
    setLoadingShows(true);

    try {
      console.log('🔍 Fetching shows for category:', category.category_id);
      
      const response = await fetch(
        `https://fz7forxwz8.execute-api.ap-south-1.amazonaws.com/prod/categories/shows`
      );
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      
      const showsData = await response.json();
      console.log('📚 Shows response:', showsData);
      console.log('📚 Shows for', category.display_name, showsData);
      
      setShows(showsData);
    } catch (error) {
      console.error('❌ Error fetching shows:', error);
      setShows([]);
    } finally {
      setLoadingShows(false);
    }
  };

  // Handler for playing episode audio
  const handlePlayEpisode = (audioPath: string) => {
    console.log('🎵 Playing episode:', audioPath);
    onPlayAudio(audioPath);
  };

  return (
    <div className="category-browser">
      <div className="categories-grid">
        {categories.map((category) => (
          <div
            key={category.category_id}
            className={`category-card ${category.category_id}`}
          >
            <div className="category-content">
              <h3>{category.display_name}</h3>
              <p>{category.description}</p>

              <div className="category-actions">
                <button
                  className="browse-btn"
                  onClick={() => handleBrowseContent(category)}
                >
                  Browse Content
                </button>
                <button
                  className="play-sample-btn"
                  onClick={() => onPlayAudio(getSampleAudio(category))}
                >
                  🎵 Play Sample
                </button>
              </div>

              <div className="category-stats">
                {category.shows && (
                  <span className="stat">🎬 {category.shows.length} Shows</span>
                )}
                {category.seasons && (
                  <span className="stat">📻 {category.seasons.length} Seasons</span>
                )}
                {category.subcategories && (
                  <span className="stat">📚 {category.subcategories.length} Types</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Enhanced show list modal */}
      {selectedCategory && (
        <div className="browse-modal">
          <div className="modal-content">
            <div className="modal-header">
              <h2>{selectedCategory.display_name} Shows</h2>
              <button 
                className="close-modal-btn"
                onClick={() => setSelectedCategory(null)}
              >
                ✕
              </button>
            </div>
            
            <div className="modal-body">
              {loadingShows && <p className="loading-text">Loading shows...</p>}
              
              {shows.length > 0 ? (
                <div className="shows-list">
                  {shows.map((show) => (
                    <div key={show.show_id} className="show-item">
                      <h4>{show.title}</h4>
                      <p>{show.description}</p>
                      
                      {show.episodes && show.episodes.length > 0 && (
                        <div className="episodes-list">
                          <h5>Episodes:</h5>
                          {show.episodes.map((episode, index) => (
                            <div key={index} className="episode-item">
                              <span>{episode.title}</span>
                              <button 
                                className="play-episode-btn"
                                onClick={() => handlePlayEpisode(episode.audio_path)}
                              >
                                🎵 Play
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                !loadingShows && <p className="no-shows">No shows available for this category.</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryBrowser;
