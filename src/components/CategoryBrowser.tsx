import React from 'react';
import { useNavigate } from 'react-router-dom';
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
  onPlayAudio: (audioPath: string, trackTitle?: string) => void;
}

const CategoryBrowser: React.FC<CategoryBrowserProps> = ({ 
  categories, 
  onPlayAudio
}) => {
  const navigate = useNavigate();

  const getSampleAudioForCategory = (categoryId: string): string => {
    // Return first available audio file path based on your S3 structure
    switch (categoryId) {
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

  const getBackgroundImage = (categoryId: string) => {
    return `https://d1jespy3mv91ys.cloudfront.net/images/backgrounds/${categoryId}-bg.jpg`;
  };

  const handleBrowseContent = (category: Category) => {
    console.log('🔍 Browsing category:', category.category_id);
    navigate(`/category/${category.category_id}`);
  };

  const handlePlaySample = (category: Category) => {
    const sampleAudio = getSampleAudioForCategory(category.category_id);
    if (sampleAudio) {
      console.log('🎵 Playing sample for:', category.display_name);
      onPlayAudio(sampleAudio, `${category.display_name} Sample`);
    }
  };

  return (
    <div className="category-browser">
      <div className="categories-grid">
        {categories.map((category) => (
          <div
            key={category.category_id}
            className={`category-card ${category.category_id}`}
            style={{
              backgroundImage: `url(${getBackgroundImage(category.category_id)})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat'
            }}
          >
            <div className="category-overlay">
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
                    onClick={() => handlePlaySample(category)}
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoryBrowser;
