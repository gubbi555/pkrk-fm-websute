import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ShowDetails.css';

interface Episode {
  episode_id: string;
  title: string;
  audio_path: string;
  duration: string;
}

interface Show {
  show_id: string;
  title: string;
  description: string;
  cover_image?: string;
  episodes: Episode[];
}

interface ShowDetailsProps {
  onPlayAudio: (audioPath: string, trackTitle?: string) => void;
}

const ShowDetails: React.FC<ShowDetailsProps> = ({ onPlayAudio }) => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();
  const [shows, setShows] = useState<Show[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchShows();
  }, [categoryId]);

  const fetchShows = async () => {
    try {
      const response = await axios.get(
        `https://fz7forxwz8.execute-api.ap-south-1.amazonaws.com/prod/categories/shows`
      );
      setShows(response.data);
    } catch (error) {
      console.error('Error fetching shows:', error);
      // Fallback with sample data based on your folder structure
      setShows(getSampleShows());
    } finally {
      setLoading(false);
    }
  };

  const getSampleShows = (): Show[] => {
    switch (categoryId) {
      case 'film-songs':
        return [{
          show_id: 'hit-kannada-songs-vol1',
          title: 'Hit Kannada Songs Vol 1',
          description: 'Popular Kannada film songs collection',
          cover_image: 'monsoon-raga-thumb.jpg',
          episodes: [
            {
              episode_id: 'ep1',
              title: 'Hombisilina',
              audio_path: 'film-songs/hit-kannada-songs-vol1/MonsoonRaga/Hombisilina (PenduJatt.Com.Se).mp3',
              duration: '4:30'
            },
            {
              episode_id: 'ep2',
              title: 'Muddada Moothi',
              audio_path: 'film-songs/hit-kannada-songs-vol1/MonsoonRaga/Muddada Moothi (PenduJatt.Com.Se).mp3',
              duration: '3:45'
            },
            {
              episode_id: 'ep3',
              title: 'Hesaru Poorthi',
              audio_path: 'film-songs/hit-kannada-songs-vol1/Paramathma/Hesaru Poorthi (PenduJatt.Com.Se).mp3',
              duration: '4:15'
            },
            {
              episode_id: 'ep4',
              title: 'Kuch Kuch Anthide',
              audio_path: 'film-songs/hit-kannada-songs-vol1/Raj/Kuch Kuch Anthide (PenduJatt.Com.Se).mp3',
              duration: '3:20'
            }
          ]
        }];
      case 'stories':
        return [{
          show_id: 'bhootada-mane-1',
          title: 'Bhootada Mane Season 1',
          description: 'Thrilling horror stories in Kannada',
          cover_image: 'bhootada-mane-1-thumb.jpg',
          episodes: [
            {
              episode_id: 'ep1',
              title: 'Episode 1',
              audio_path: 'stories/horror/BhootadaMane1/season1/episode1.mp3',
              duration: '25:00'
            },
            {
              episode_id: 'ep2',
              title: 'Episode 2',
              audio_path: 'stories/horror/BhootadaMane1/season1/episode2.mp3',
              duration: '28:00'
            }
          ]
        }];
      case 'web-series':
        return [{
          show_id: 'jackie1',
          title: 'Jackie Season 1',
          description: 'Engaging Kannada web series',
          cover_image: 'jackie1-thumb.jpg',
          episodes: [
            {
              episode_id: 'ep1',
              title: 'Episode 1',
              audio_path: 'web-series/jackie1/season1/episode1.mp3',
              duration: '30:00'
            },
            {
              episode_id: 'ep2',
              title: 'Episode 2',
              audio_path: 'web-series/jackie1/season1/episode2.mp3',
              duration: '32:00'
            }
          ]
        }];
      case 'podcasts':
        return [{
          show_id: 'season1',
          title: 'Podcast Season 1',
          description: 'Interesting Kannada podcasts and talk shows',
          episodes: [
            {
              episode_id: 'ep1',
              title: 'Episode 1',
              audio_path: 'podcasts/season1/episode1.mp3',
              duration: '45:00'
            },
            {
              episode_id: 'ep2',
              title: 'Episode 2',
              audio_path: 'podcasts/season1/episode2.mp3',
              duration: '42:00'
            }
          ]
        }];
      default:
        return [];
    }
  };

  const getCoverImage = (imageName?: string) => {
    if (!imageName) return `https://d1jespy3mv91ys.cloudfront.net/images/backgrounds/${categoryId}-bg.jpg`;
    return `https://d1jespy3mv91ys.cloudfront.net/images/thumbnails/${imageName}`;
  };

  if (loading) {
    return (
      <div className="show-details-loading">
        <div className="spinner"></div>
        <p>Loading shows...</p>
      </div>
    );
  }

  return (
    <div className="show-details">
      <div className="show-header">
        <button className="back-btn" onClick={() => navigate('/')}>
          ← Back to Categories
        </button>
        <h1>{categoryId?.replace('-', ' ').toUpperCase()}</h1>
      </div>

      <div className="shows-list">
        {shows.map((show) => (
          <div key={show.show_id} className="show-item">
            <div className="show-cover">
              <img 
                src={getCoverImage(show.cover_image)}
                alt={show.title}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = `https://d1jespy3mv91ys.cloudfront.net/images/backgrounds/${categoryId}-bg.jpg`;
                }}
              />
            </div>
            
            <div className="show-content">
              <h2>{show.title}</h2>
              <p>{show.description}</p>
              
              <div className="episodes-section">
                <h3>Episodes ({show.episodes.length})</h3>
                <div className="episodes-list">
                  {show.episodes.map((episode) => (
                    <div key={episode.episode_id} className="episode-item">
                      <div className="episode-info">
                        <h4>{episode.title}</h4>
                        <span className="duration">{episode.duration}</span>
                      </div>
                      <button 
                        className="episode-play-btn"
                        onClick={() => onPlayAudio(episode.audio_path, episode.title)}
                      >
                        ▶️ Play
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowDetails;
