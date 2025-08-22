import React from 'react';
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
  const getSampleAudio = (category: Category) => {
    switch (category.category_id) {
      case 'film-songs':
        return 'film-songs/hit-kannada-songs-vol1/MonsoonRaga/Hombisilina (PenduJatt.Com.Se).mp3';
      case 'podcasts':
        return 'podcasts/season1/episode1.mp3';
      case 'stories':
        return 'stories/horror/BhootadaMane1/season1/episode1.mp3';
      case 'web-series':
        return 'web-series/jackie1/season1/episode1.mp3';
      default:
        return '';
    }
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
                  onClick={() => onCategorySelect(category)}
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
    </div>
  );
};

export default CategoryBrowser;
