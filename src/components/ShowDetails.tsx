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
    if (categoryId) {
      fetchShowsForCategory(categoryId);
    }
  }, [categoryId]);

  const fetchShowsForCategory = async (category: string) => {
    try {
      console.log(`🔍 Fetching shows for category: ${category}`);
      
      // Call your API with category parameter
      const response = await axios.get(
        `https://fz7forxwz8.execute-api.ap-south-1.amazonaws.com/prod/categories/shows?category=${category}`
      );
      
      console.log(`📚 Shows response for ${category}:`, response.data);
      
      if (response.data && Array.isArray(response.data)) {
        setShows(response.data);
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      console.error(`❌ Error fetching shows for ${category}:`, error);
      // Use metadata-based fallback that matches your S3 structure
      setShows(getMetadataBasedShows(category));
    } finally {
      setLoading(false);
    }
  };

  const getMetadataBasedShows = (categoryId: string): Show[] => {
    // This should match exactly your S3 folder structure and metadata.json contents
    switch (categoryId) {
      case 'film-songs':
        return [{
          show_id: 'hit-kannada-songs-vol1',
          title: 'Hit Kannada Songs Vol 1',
          description: 'Popular Kannada film songs collection',
          cover_image: 'monsoon-raga-thumb.jpg',
          episodes: [
            {
              episode_id: 'monsoon_hombisilina',
              title: 'Hombisilina',
              audio_path: 'film-songs/hit-kannada-songs-vol1/MonsoonRaga/Hombisilina (PenduJatt.Com.Se).mp3',
              duration: '4:30'
            },
            {
              episode_id: 'monsoon_muddada',
              title: 'Muddada Moothi',
              audio_path: 'film-songs/hit-kannada-songs-vol1/MonsoonRaga/Muddada Moothi (PenduJatt.Com.Se).mp3',
              duration: '3:45'
            },
            {
              episode_id: 'param_hesaru',
              title: 'Hesaru Poorthi',
              audio_path: 'film-songs/hit-kannada-songs-vol1/Paramathma/Hesaru Poorthi (PenduJatt.Com.Se).mp3',
              duration: '4:15'
            },
            {
              episode_id: 'param_thanmaya',
              title: 'Thanmayaladenu',
              audio_path: 'film-songs/hit-kannada-songs-vol1/Paramathma/Thanmayaladenu (PenduJatt.Com.Se).mp3',
              duration: '3:50'
            },
            {
              episode_id: 'raj_kuch',
              title: 'Kuch Kuch Anthide',
              audio_path: 'film-songs/hit-kannada-songs-vol1/Raj/Kuch Kuch Anthide (PenduJatt.Com.Se).mp3',
              duration: '3:20'
            },
            {
              episode_id: 'raj_heluvagella',
              title: 'Raja Heluvagella',
              audio_path: 'film-songs/hit-kannada-songs-vol1/Raj/Raja Heluvagella (PenduJatt.Com.Se).mp3',
              duration: '4:05'
            }
          ]
        }];

      case 'stories':
        return [
          {
            show_id: 'bhootada-mane-1',
            title: 'Bhootada Mane Season 1',
            description: 'Thrilling horror stories in Kannada',
            cover_image: 'bhootada-mane-1-thumb.jpg',
            episodes: [
              {
                episode_id: 'bm1_s1_e1',
                title: 'Episode 1',
                audio_path: 'stories/horror/BhootadaMane1/season1/episode1.mp3',
                duration: '25:00'
              },
              {
                episode_id: 'bm1_s1_e2',
                title: 'Episode 2',
                audio_path: 'stories/horror/BhootadaMane1/season1/episode2.mp3',
                duration: '28:00'
              }
            ]
          },
          {
            show_id: 'bhootada-mane-2',
            title: 'Bhootada Mane Season 2',
            description: 'Continue the horror journey',
            episodes: [
              {
                episode_id: 'bm1_s2_e1',
                title: 'Episode 1',
                audio_path: 'stories/horror/BhootadaMane1/season2/episode1.mp3',
                duration: '26:00'
              },
              {
                episode_id: 'bm1_s2_e2',
                title: 'Episode 2', 
                audio_path: 'stories/horror/BhootadaMane1/season2/episode2.mp3',
                duration: '29:00'
              }
            ]
          },
          {
            show_id: 'bhootada-mane-2-series',
            title: 'BhootadaMane2',
            description: 'New horror series',
            episodes: [
              {
                episode_id: 'bm2_s1_e1',
                title: 'Episode 1',
                audio_path: 'stories/horror/BhoothadaMane2/season1/episode1.mp3',
                duration: '24:00'
              },
              {
                episode_id: 'bm2_s1_e2',
                title: 'Episode 2',
                audio_path: 'stories/horror/BhoothadaMane2/season1/episode2.mp3',
                duration: '27:00'
              }
            ]
          },
          {
            show_id: 'bloodcase',
            title: 'Bloodcase',
            description: 'Thriller series',
            episodes: [
              {
                episode_id: 'bc_s1_e1',
                title: 'Episode 1',
                audio_path: 'stories/thriller/bloodcase/season1/episode1.mp3',
                duration: '30:00'
              },
              {
                episode_id: 'bc_s1_e2',
                title: 'Episode 2',
                audio_path: 'stories/thriller/bloodcase/season1/episode2.mp3',
                duration: '32:00'
              }
            ]
          },
          {
            show_id: 'bloodcase2',
            title: 'Bloodcase 2',
            description: 'Thriller series continuation',
            episodes: [
              {
                episode_id: 'bc2_s1_e1',
                title: 'Episode 1',
                audio_path: 'stories/thriller/bloodcase2/season1/episode1.mp3',
                duration: '29:00'
              },
              {
                episode_id: 'bc2_s1_e2',
                title: 'Episode 2',
                audio_path: 'stories/thriller/bloodcase2/season1/episode2.mp3',
                duration: '31:00'
              }
            ]
          }
        ];

      case 'web-series':
        return [
          {
            show_id: 'jackie1',
            title: 'Jackie Season 1',
            description: 'Engaging Kannada web series',
            cover_image: 'jackie1-thumb.jpg',
            episodes: [
              {
                episode_id: 'j1_s1_e1',
                title: 'Episode 1',
                audio_path: 'web-series/jackie1/season1/episode1.mp3',
                duration: '30:00'
              },
              {
                episode_id: 'j1_s1_e2',
                title: 'Episode 2',
                audio_path: 'web-series/jackie1/season1/episode2.mp3',
                duration: '32:00'
              }
            ]
          },
          {
            show_id: 'jackie2',
            title: 'Jackie Season 2',
            description: 'The story continues',
            episodes: [
              {
                episode_id: 'j1_s2_e1',
                title: 'Episode 1',
                audio_path: 'web-series/jackie1/season2/episode1.mp3',
                duration: '28:00'
              },
              {
                episode_id: 'j1_s2_e2',
                title: 'Episode 2',
                audio_path: 'web-series/jackie1/season2/episode2.mp3',
                duration: '31:00'
              }
            ]
          },
          {
            show_id: 'jackie2-series',
            title: 'Jackie 2',
            description: 'New Jackie series',
            episodes: [
              {
                episode_id: 'j2_s1_e1',
                title: 'Episode 1',
                audio_path: 'web-series/jackie2/season1/episode1.mp3',
                duration: '29:00'
              },
              {
                episode_id: 'j2_s1_e2',
                title: 'Episode 2',
                audio_path: 'web-series/jackie2/season1/episode2.mp3',
                duration: '33:00'
              }
            ]
          }
        ];

      case 'podcasts':
        return [
          {
            show_id: 'season1',
            title: 'Podcast Season 1',
            description: 'Interesting Kannada podcasts and talk shows',
            episodes: [
              {
                episode_id: 'p_s1_e1',
                title: 'Episode 1',
                audio_path: 'podcasts/season1/episode1.mp3',
                duration: '45:00'
              },
              {
                episode_id: 'p_s1_e2',
                title: 'Episode 2',
                audio_path: 'podcasts/season1/episode2.mp3',
                duration: '42:00'
              }
            ]
          },
          {
            show_id: 'season2',
            title: 'Podcast Season 2',
            description: 'More engaging discussions and stories',
            episodes: [
              {
                episode_id: 'p_s2_e1',
                title: 'Episode 1',
                audio_path: 'podcasts/season2/episode1.mp3',
                duration: '48:00'
              },
              {
                episode_id: 'p_s2_e2',
                title: 'Episode 2',
                audio_path: 'podcasts/season2/episode2.mp3',
                duration: '44:00'
              }
            ]
          }
        ];

      default:
        return [];
    }
  };

  const getCoverImage = (imageName?: string) => {
    if (!imageName) return `https://d1jespy3mv91ys.cloudfront.net/images/backgrounds/${categoryId}-bg.jpg`;
    return `https://d1jespy3mv91ys.cloudfront.net/images/thumbnails/${imageName}`;
  };

  const handlePlayEpisode = (episode: Episode) => {
    console.log('🎵 Playing episode:', episode.title, 'Path:', episode.audio_path);
    onPlayAudio(episode.audio_path, episode.title);
  };

  if (loading) {
    return (
      <div className="show-details-loading">
        <div className="spinner"></div>
        <p>Loading shows for {categoryId}...</p>
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
        <p>Found {shows.length} shows in this category</p>
      </div>

      <div className="shows-list">
        {shows.length > 0 ? (
          shows.map((show) => (
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
                          onClick={() => handlePlayEpisode(episode)}
                        >
                          ▶️ Play
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="no-shows">
            <p>No shows found for this category.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShowDetails;
