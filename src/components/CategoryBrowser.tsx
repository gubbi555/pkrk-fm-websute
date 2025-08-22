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
  episodes?: string[];
}

interface CategoryBrowserProps {
  categories: Category[];
  onPlayAudio: (audioPath: string) => void;
}

const CategoryBrowser: React.FC<CategoryBrowserProps> = ({
  categories,
  onPlayAudio
}) => {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [shows, setShows] = useState<Show[]>([]);
  const [loadingShows, setLoadingShows] = useState(false);

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

  // Handler for Browse Content
  const handleBrowseContent = async (category: Category) => {
    setSelectedCategory(category);
    setShows([]);
    setLoadingShows(true);

    // Example fetch shows API call - update API endpoint as per your backend
    try {
      const response = await fetch(
        `https://fz7forxwz8.execute-api.ap-south-1.amazonaws.com/prod/categories/${category.category_id}/shows`
      );
      if (!response.ok) throw new Error('Failed to load shows');
      const data: Show[] = await response.json();
      setShows(data);
    } catch (error) {
      // Fallback: show basic info or error
      setShows([]);
    }
    setLoadingShows(false);
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

      {/* Minimal show list modal/section */}
      {selectedCategory && (
        <div className="browse-modal">
          <h2>
            {selectedCategory.display_name} Shows
            <button onClick={() => setSelectedCategory(null)}>Close</button>
          </h2>
          {loadingShows && <p>Loading shows...</p>}
          <ul>
            {shows.length > 0 ? (
              shows.map((show) => (
                <li key={show.show_id}>
                  <strong>{show.title}</strong> <br />
                  {show.description}
                </li>
              ))
            ) : (
              !loadingShows && <p>No shows available.</p>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CategoryBrowser;
