// components/editor/PexelsBrowser.tsx
// Pexels API Integration - Free Photos & Videos
// Timestamp: Tuesday, December 24, 2025 – 1:58 PM Eastern Time
// CR AudioViz AI - "Your Story. Our Design"

'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { 
  Search, 
  Image, 
  Video, 
  User, 
  ExternalLink, 
  Loader2,
  Camera,
  Film,
  Grid,
  LayoutGrid,
  RefreshCw,
  Play
} from 'lucide-react';

interface PexelsPhoto {
  id: number;
  width: number;
  height: number;
  url: string;
  photographer: string;
  photographer_url: string;
  photographer_id: number;
  avg_color: string;
  src: {
    original: string;
    large2x: string;
    large: string;
    medium: string;
    small: string;
    portrait: string;
    landscape: string;
    tiny: string;
  };
  alt: string;
}

interface PexelsVideo {
  id: number;
  width: number;
  height: number;
  url: string;
  image: string;
  duration: number;
  user: {
    name: string;
    url: string;
  };
  video_files: Array<{
    id: number;
    quality: string;
    file_type: string;
    width: number;
    height: number;
    link: string;
  }>;
}

interface PexelsBrowserProps {
  onSelectPhoto?: (photo: PexelsPhoto) => void;
  onSelectVideo?: (video: PexelsVideo) => void;
  onAddToCanvas?: (url: string, type: 'photo' | 'video', attribution: string) => void;
}

// Curated collections for scrapbooking
const CURATED_TOPICS = [
  { id: 'family', name: 'Family', query: 'family' },
  { id: 'baby', name: 'Baby', query: 'baby newborn' },
  { id: 'wedding', name: 'Wedding', query: 'wedding' },
  { id: 'travel', name: 'Travel', query: 'travel adventure' },
  { id: 'nature', name: 'Nature', query: 'nature' },
  { id: 'flowers', name: 'Flowers', query: 'flowers' },
  { id: 'seasons', name: 'Seasons', query: 'seasons' },
  { id: 'holidays', name: 'Holidays', query: 'holiday celebration' },
  { id: 'food', name: 'Food', query: 'food' },
  { id: 'pets', name: 'Pets', query: 'pets' },
  { id: 'birthday', name: 'Birthday', query: 'birthday party' },
  { id: 'textures', name: 'Textures', query: 'texture background' },
  { id: 'bokeh', name: 'Bokeh', query: 'bokeh lights' },
  { id: 'confetti', name: 'Confetti', query: 'confetti celebration' },
];

export default function PexelsBrowser({ onSelectPhoto, onSelectVideo, onAddToCanvas }: PexelsBrowserProps) {
  const [photos, setPhotos] = useState<PexelsPhoto[]>([]);
  const [videos, setVideos] = useState<PexelsVideo[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [mediaType, setMediaType] = useState<'photos' | 'videos'>('photos');
  const [viewMode, setViewMode] = useState<'grid' | 'masonry'>('grid');
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  // Fetch media from API
  const fetchMedia = useCallback(async (query: string, pageNum: number, type: 'photos' | 'videos', append: boolean = false) => {
    setIsLoading(true);
    setError(null);

    try {
      const endpoint = query 
        ? `/api/pexels/search?query=${encodeURIComponent(query)}&page=${pageNum}&type=${type}`
        : `/api/pexels/curated?page=${pageNum}&type=${type}`;

      const response = await fetch(endpoint);
      
      if (!response.ok) {
        throw new Error('Failed to fetch media');
      }

      const data = await response.json();
      const items = type === 'photos' ? data.photos : data.videos;

      if (type === 'photos') {
        if (append) {
          setPhotos(prev => [...prev, ...items]);
        } else {
          setPhotos(items || []);
        }
      } else {
        if (append) {
          setVideos(prev => [...prev, ...items]);
        } else {
          setVideos(items || []);
        }
      }

      setHasMore((items?.length || 0) >= 15);
    } catch (err) {
      setError('Unable to load media. Please try again.');
      console.error('Pexels fetch error:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Initial load
  useEffect(() => {
    fetchMedia('', 1, mediaType);
  }, [fetchMedia, mediaType]);

  // Search handler
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setPage(1);
      setSelectedTopic(null);
      fetchMedia(searchQuery, 1, mediaType);
    }
  };

  // Topic selection
  const handleTopicSelect = (topic: typeof CURATED_TOPICS[0]) => {
    setSelectedTopic(topic.id);
    setSearchQuery(topic.query);
    setPage(1);
    fetchMedia(topic.query, 1, mediaType);
  };

  // Media type toggle
  const handleMediaTypeChange = (type: 'photos' | 'videos') => {
    setMediaType(type);
    setPage(1);
    setPhotos([]);
    setVideos([]);
    fetchMedia(searchQuery || '', 1, type);
  };

  // Load more
  const loadMore = useCallback(() => {
    if (!isLoading && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchMedia(searchQuery || '', nextPage, mediaType, true);
    }
  }, [isLoading, hasMore, page, searchQuery, mediaType, fetchMedia]);

  // Infinite scroll observer
  useEffect(() => {
    if (loadMoreRef.current) {
      observerRef.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            loadMore();
          }
        },
        { threshold: 0.1 }
      );
      observerRef.current.observe(loadMoreRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [loadMore]);

  // Handle photo selection
  const handlePhotoSelect = (photo: PexelsPhoto) => {
    const attribution = `Photo by ${photo.photographer} on Pexels`;
    onSelectPhoto?.(photo);
    onAddToCanvas?.(photo.src.large, 'photo', attribution);
  };

  // Handle video selection
  const handleVideoSelect = (video: PexelsVideo) => {
    const attribution = `Video by ${video.user.name} on Pexels`;
    const hdFile = video.video_files.find(f => f.quality === 'hd') || video.video_files[0];
    onSelectVideo?.(video);
    onAddToCanvas?.(hdFile?.link || video.image, 'video', attribution);
  };

  // Refresh
  const handleRefresh = () => {
    setPage(1);
    fetchMedia(searchQuery || '', 1, mediaType);
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b bg-gradient-to-r from-green-50 to-teal-50">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-gradient-to-br from-green-500 to-teal-500 rounded-lg">
              <Camera className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Pexels Media</h3>
              <p className="text-xs text-gray-500">Free photos & videos</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded ${viewMode === 'grid' ? 'bg-green-200' : 'hover:bg-green-100'}`}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('masonry')}
              className={`p-1.5 rounded ${viewMode === 'masonry' ? 'bg-green-200' : 'hover:bg-green-100'}`}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={handleRefresh}
              className="p-1.5 rounded hover:bg-green-100"
              disabled={isLoading}
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>

        {/* Media Type Toggle */}
        <div className="flex gap-2 mb-3">
          <button
            onClick={() => handleMediaTypeChange('photos')}
            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition-colors ${
              mediaType === 'photos'
                ? 'bg-green-500 text-white'
                : 'bg-white text-gray-600 hover:bg-green-50'
            }`}
          >
            <Image className="w-4 h-4" />
            Photos
          </button>
          <button
            onClick={() => handleMediaTypeChange('videos')}
            className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition-colors ${
              mediaType === 'videos'
                ? 'bg-green-500 text-white'
                : 'bg-white text-gray-600 hover:bg-green-50'
            }`}
          >
            <Film className="w-4 h-4" />
            Videos
          </button>
        </div>

        {/* Search */}
        <form onSubmit={handleSearch} className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder={`Search free ${mediaType}...`}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-white border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </form>
      </div>

      {/* Curated Topics */}
      <div className="p-2 border-b overflow-x-auto">
        <div className="flex gap-1">
          {CURATED_TOPICS.map(topic => (
            <button
              key={topic.id}
              onClick={() => handleTopicSelect(topic)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                selectedTopic === topic.id
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {topic.name}
            </button>
          ))}
        </div>
      </div>

      {/* Media Grid */}
      <div className="flex-1 overflow-y-auto p-4">
        {error && (
          <div className="text-center py-8 text-red-500">
            <p className="text-sm">{error}</p>
            <button
              onClick={handleRefresh}
              className="mt-2 text-xs text-gray-500 hover:text-gray-700 underline"
            >
              Try again
            </button>
          </div>
        )}

        {!error && mediaType === 'photos' && (
          <div className={`
            ${viewMode === 'grid' 
              ? 'grid grid-cols-2 gap-3' 
              : 'columns-2 gap-3 space-y-3'
            }
          `}>
            {photos.map(photo => (
              <div
                key={photo.id}
                className={`
                  group relative overflow-hidden rounded-lg cursor-pointer
                  ${viewMode === 'grid' ? 'aspect-square' : 'break-inside-avoid'}
                `}
                onClick={() => handlePhotoSelect(photo)}
              >
                <img
                  src={photo.src.medium}
                  alt={photo.alt || 'Pexels photo'}
                  className={`
                    w-full object-cover transition-transform group-hover:scale-105
                    ${viewMode === 'grid' ? 'h-full' : 'h-auto'}
                  `}
                  style={{ backgroundColor: photo.avg_color }}
                  loading="lazy"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute bottom-0 left-0 right-0 p-2">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-white" />
                      <span className="text-white text-xs truncate flex-1">
                        {photo.photographer}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!error && mediaType === 'videos' && (
          <div className="grid grid-cols-2 gap-3">
            {videos.map(video => (
              <div
                key={video.id}
                className="group relative overflow-hidden rounded-lg cursor-pointer aspect-video"
                onClick={() => handleVideoSelect(video)}
              >
                <img
                  src={video.image}
                  alt="Video thumbnail"
                  className="w-full h-full object-cover transition-transform group-hover:scale-105"
                  loading="lazy"
                />

                {/* Play button overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors">
                  <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center">
                    <Play className="w-6 h-6 text-gray-800 ml-1" />
                  </div>
                </div>

                {/* Duration */}
                <div className="absolute bottom-2 right-2 px-2 py-0.5 bg-black/70 rounded text-white text-xs">
                  {Math.floor(video.duration / 60)}:{(video.duration % 60).toString().padStart(2, '0')}
                </div>

                {/* Attribution */}
                <div className="absolute bottom-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-white text-xs truncate">
                    {video.user.name}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Loading */}
        {isLoading && (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="w-6 h-6 text-green-500 animate-spin" />
          </div>
        )}

        {/* Load more trigger */}
        <div ref={loadMoreRef} className="h-4" />

        {/* Empty state */}
        {!isLoading && ((mediaType === 'photos' && photos.length === 0) || (mediaType === 'videos' && videos.length === 0)) && !error && (
          <div className="text-center py-8 text-gray-500">
            {mediaType === 'photos' ? <Image className="w-12 h-12 mx-auto mb-2 opacity-30" /> : <Film className="w-12 h-12 mx-auto mb-2 opacity-30" />}
            <p className="text-sm">No {mediaType} found</p>
          </div>
        )}
      </div>

      {/* Pexels Attribution */}
      <div className="p-2 border-t bg-green-50 text-center">
        <a
          href="https://www.pexels.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-green-700 hover:text-green-900"
        >
          Photos & Videos provided by Pexels
        </a>
      </div>
    </div>
  );
}
