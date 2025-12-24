// components/editor/PixabayBrowser.tsx
// Pixabay API Integration - Photos, Illustrations, Vectors, Videos
// Timestamp: Tuesday, December 24, 2025 – 2:20 PM Eastern Time
// CR AudioViz AI - "Your Story. Our Design"

'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { 
  Search, 
  Image, 
  Palette, 
  PenTool,
  Film,
  Loader2,
  Camera,
  Grid,
  LayoutGrid,
  RefreshCw,
  Play,
  Download,
  Heart,
  Eye
} from 'lucide-react';

interface PixabayImage {
  id: number;
  pageURL: string;
  type: string;
  tags: string;
  previewURL: string;
  previewWidth: number;
  previewHeight: number;
  webformatURL: string;
  webformatWidth: number;
  webformatHeight: number;
  largeImageURL: string;
  fullHDURL?: string;
  imageURL?: string;
  imageWidth: number;
  imageHeight: number;
  views: number;
  downloads: number;
  likes: number;
  user: string;
  userImageURL: string;
}

interface PixabayVideo {
  id: number;
  pageURL: string;
  type: string;
  tags: string;
  duration: number;
  picture_id: string;
  videos: {
    large?: { url: string; width: number; height: number; size: number };
    medium: { url: string; width: number; height: number; size: number };
    small: { url: string; width: number; height: number; size: number };
    tiny: { url: string; width: number; height: number; size: number };
  };
  views: number;
  downloads: number;
  likes: number;
  user: string;
  userImageURL: string;
}

interface PixabayBrowserProps {
  onSelectImage?: (image: PixabayImage) => void;
  onSelectVideo?: (video: PixabayVideo) => void;
  onAddToCanvas?: (url: string, type: string, attribution: string) => void;
}

// Media type options
const MEDIA_TYPES = [
  { id: 'photo', name: 'Photos', icon: Camera, apiType: 'photo' },
  { id: 'illustration', name: 'Illustrations', icon: Palette, apiType: 'illustration' },
  { id: 'vector', name: 'Vectors', icon: PenTool, apiType: 'vector' },
  { id: 'video', name: 'Videos', icon: Film, apiType: 'video' },
];

// Curated categories for scrapbooking
const CATEGORIES = [
  { id: 'all', name: 'All' },
  { id: 'backgrounds', name: 'Backgrounds' },
  { id: 'fashion', name: 'Fashion' },
  { id: 'nature', name: 'Nature' },
  { id: 'science', name: 'Science' },
  { id: 'education', name: 'Education' },
  { id: 'feelings', name: 'Feelings' },
  { id: 'health', name: 'Health' },
  { id: 'people', name: 'People' },
  { id: 'religion', name: 'Religion' },
  { id: 'places', name: 'Places' },
  { id: 'animals', name: 'Animals' },
  { id: 'industry', name: 'Industry' },
  { id: 'computer', name: 'Computer' },
  { id: 'food', name: 'Food' },
  { id: 'sports', name: 'Sports' },
  { id: 'transportation', name: 'Transport' },
  { id: 'travel', name: 'Travel' },
  { id: 'buildings', name: 'Buildings' },
  { id: 'business', name: 'Business' },
  { id: 'music', name: 'Music' },
];

// Color filter options
const COLORS = [
  { id: '', name: 'Any', color: 'transparent' },
  { id: 'grayscale', name: 'B&W', color: '#666' },
  { id: 'transparent', name: 'Transparent', color: 'linear-gradient(45deg, #ccc 25%, transparent 25%, transparent 75%, #ccc 75%), linear-gradient(45deg, #ccc 25%, transparent 25%, transparent 75%, #ccc 75%)' },
  { id: 'red', name: 'Red', color: '#ef4444' },
  { id: 'orange', name: 'Orange', color: '#f97316' },
  { id: 'yellow', name: 'Yellow', color: '#eab308' },
  { id: 'green', name: 'Green', color: '#22c55e' },
  { id: 'turquoise', name: 'Turquoise', color: '#14b8a6' },
  { id: 'blue', name: 'Blue', color: '#3b82f6' },
  { id: 'lilac', name: 'Lilac', color: '#a78bfa' },
  { id: 'pink', name: 'Pink', color: '#ec4899' },
  { id: 'white', name: 'White', color: '#fff' },
  { id: 'gray', name: 'Gray', color: '#9ca3af' },
  { id: 'black', name: 'Black', color: '#1f2937' },
  { id: 'brown', name: 'Brown', color: '#92400e' },
];

export default function PixabayBrowser({ onSelectImage, onSelectVideo, onAddToCanvas }: PixabayBrowserProps) {
  const [images, setImages] = useState<PixabayImage[]>([]);
  const [videos, setVideos] = useState<PixabayVideo[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [mediaType, setMediaType] = useState('photo');
  const [category, setCategory] = useState('all');
  const [colorFilter, setColorFilter] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'masonry'>('grid');
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  // Fetch media from API
  const fetchMedia = useCallback(async (
    query: string, 
    pageNum: number, 
    type: string,
    cat: string,
    color: string,
    append: boolean = false
  ) => {
    setIsLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams({
        q: query,
        page: pageNum.toString(),
        type: type,
        category: cat !== 'all' ? cat : '',
        colors: color,
      });

      const endpoint = type === 'video' 
        ? `/api/pixabay/videos?${params}`
        : `/api/pixabay/images?${params}`;

      const response = await fetch(endpoint);
      
      if (!response.ok) {
        throw new Error('Failed to fetch media');
      }

      const data = await response.json();

      if (type === 'video') {
        if (append) {
          setVideos(prev => [...prev, ...(data.hits || [])]);
        } else {
          setVideos(data.hits || []);
        }
        setHasMore((data.hits?.length || 0) >= 20);
      } else {
        if (append) {
          setImages(prev => [...prev, ...(data.hits || [])]);
        } else {
          setImages(data.hits || []);
        }
        setHasMore((data.hits?.length || 0) >= 20);
      }
    } catch (err) {
      setError('Unable to load media. Please try again.');
      console.error('Pixabay fetch error:', err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Initial load
  useEffect(() => {
    fetchMedia('', 1, mediaType, category, colorFilter);
  }, []);

  // Search handler
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    setImages([]);
    setVideos([]);
    fetchMedia(searchQuery, 1, mediaType, category, colorFilter);
  };

  // Media type change
  const handleMediaTypeChange = (type: string) => {
    setMediaType(type);
    setPage(1);
    setImages([]);
    setVideos([]);
    fetchMedia(searchQuery, 1, type, category, colorFilter);
  };

  // Category change
  const handleCategoryChange = (cat: string) => {
    setCategory(cat);
    setPage(1);
    setImages([]);
    setVideos([]);
    fetchMedia(searchQuery, 1, mediaType, cat, colorFilter);
  };

  // Color filter change
  const handleColorChange = (color: string) => {
    setColorFilter(color);
    setPage(1);
    setImages([]);
    setVideos([]);
    fetchMedia(searchQuery, 1, mediaType, category, color);
  };

  // Load more
  const loadMore = useCallback(() => {
    if (!isLoading && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchMedia(searchQuery, nextPage, mediaType, category, colorFilter, true);
    }
  }, [isLoading, hasMore, page, searchQuery, mediaType, category, colorFilter, fetchMedia]);

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

  // Handle image selection
  const handleImageSelect = (image: PixabayImage) => {
    const attribution = `Image by ${image.user} on Pixabay`;
    onSelectImage?.(image);
    onAddToCanvas?.(image.largeImageURL, image.type, attribution);
  };

  // Handle video selection
  const handleVideoSelect = (video: PixabayVideo) => {
    const attribution = `Video by ${video.user} on Pixabay`;
    const videoUrl = video.videos.medium?.url || video.videos.small.url;
    onSelectVideo?.(video);
    onAddToCanvas?.(videoUrl, 'video', attribution);
  };

  // Refresh
  const handleRefresh = () => {
    setPage(1);
    setImages([]);
    setVideos([]);
    fetchMedia(searchQuery, 1, mediaType, category, colorFilter);
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b bg-gradient-to-r from-emerald-50 to-teal-50">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-lg">
              <Image className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Pixabay</h3>
              <p className="text-xs text-gray-500">2.7M+ free images & videos</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded ${viewMode === 'grid' ? 'bg-emerald-200' : 'hover:bg-emerald-100'}`}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('masonry')}
              className={`p-1.5 rounded ${viewMode === 'masonry' ? 'bg-emerald-200' : 'hover:bg-emerald-100'}`}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={handleRefresh}
              className="p-1.5 rounded hover:bg-emerald-100"
              disabled={isLoading}
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>

        {/* Media Type Tabs */}
        <div className="flex gap-1 mb-3">
          {MEDIA_TYPES.map(type => {
            const Icon = type.icon;
            return (
              <button
                key={type.id}
                onClick={() => handleMediaTypeChange(type.apiType)}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-medium transition-colors ${
                  mediaType === type.apiType
                    ? 'bg-emerald-500 text-white'
                    : 'bg-white text-gray-600 hover:bg-emerald-50'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {type.name}
              </button>
            );
          })}
        </div>

        {/* Search */}
        <form onSubmit={handleSearch} className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search free images..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-white border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </form>
      </div>

      {/* Color Filter (for images only) */}
      {mediaType !== 'video' && (
        <div className="p-2 border-b bg-gray-50">
          <div className="flex gap-1 overflow-x-auto pb-1">
            {COLORS.map(color => (
              <button
                key={color.id}
                onClick={() => handleColorChange(color.id)}
                className={`flex-shrink-0 w-6 h-6 rounded-full border-2 transition-transform ${
                  colorFilter === color.id ? 'border-emerald-500 scale-110' : 'border-gray-300'
                }`}
                style={{ 
                  background: color.color,
                  backgroundSize: '8px 8px',
                  backgroundPosition: '0 0, 4px 4px'
                }}
                title={color.name}
              />
            ))}
          </div>
        </div>
      )}

      {/* Categories */}
      <div className="p-2 border-b overflow-x-auto">
        <div className="flex gap-1">
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => handleCategoryChange(cat.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                category === cat.id
                  ? 'bg-emerald-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Media Grid */}
      <div className="flex-1 overflow-y-auto p-4">
        {error && (
          <div className="text-center py-8 text-red-500">
            <p className="text-sm">{error}</p>
            <button onClick={handleRefresh} className="mt-2 text-xs text-gray-500 hover:text-gray-700 underline">
              Try again
            </button>
          </div>
        )}

        {!error && mediaType !== 'video' && (
          <div className={viewMode === 'grid' ? 'grid grid-cols-2 gap-3' : 'columns-2 gap-3 space-y-3'}>
            {images.map(image => (
              <div
                key={image.id}
                className={`group relative overflow-hidden rounded-lg cursor-pointer ${viewMode === 'grid' ? 'aspect-square' : 'break-inside-avoid'}`}
                onClick={() => handleImageSelect(image)}
              >
                <img
                  src={image.webformatURL}
                  alt={image.tags}
                  className={`w-full object-cover transition-transform group-hover:scale-105 ${viewMode === 'grid' ? 'h-full' : 'h-auto'}`}
                  loading="lazy"
                />

                {/* Type badge */}
                {image.type !== 'photo' && (
                  <div className="absolute top-2 left-2 px-2 py-0.5 bg-black/70 rounded text-white text-[10px] uppercase">
                    {image.type}
                  </div>
                )}

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute bottom-0 left-0 right-0 p-2">
                    <div className="flex items-center justify-between text-white text-xs">
                      <span className="truncate">{image.user}</span>
                      <div className="flex items-center gap-2">
                        <span className="flex items-center gap-0.5">
                          <Heart className="w-3 h-3" />
                          {image.likes}
                        </span>
                        <span className="flex items-center gap-0.5">
                          <Download className="w-3 h-3" />
                          {image.downloads}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!error && mediaType === 'video' && (
          <div className="grid grid-cols-2 gap-3">
            {videos.map(video => (
              <div
                key={video.id}
                className="group relative overflow-hidden rounded-lg cursor-pointer aspect-video"
                onClick={() => handleVideoSelect(video)}
              >
                <img
                  src={`https://i.vimeocdn.com/video/${video.picture_id}_295x166.jpg`}
                  alt={video.tags}
                  className="w-full h-full object-cover transition-transform group-hover:scale-105"
                  loading="lazy"
                />

                {/* Play overlay */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors">
                  <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center">
                    <Play className="w-6 h-6 text-gray-800 ml-1" />
                  </div>
                </div>

                {/* Duration */}
                <div className="absolute bottom-2 right-2 px-2 py-0.5 bg-black/70 rounded text-white text-xs">
                  {Math.floor(video.duration / 60)}:{(video.duration % 60).toString().padStart(2, '0')}
                </div>

                {/* Stats */}
                <div className="absolute bottom-2 left-2 flex items-center gap-2 text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="flex items-center gap-0.5">
                    <Eye className="w-3 h-3" />
                    {video.views}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Loading */}
        {isLoading && (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="w-6 h-6 text-emerald-500 animate-spin" />
          </div>
        )}

        {/* Load more trigger */}
        <div ref={loadMoreRef} className="h-4" />

        {/* Empty state */}
        {!isLoading && images.length === 0 && videos.length === 0 && !error && (
          <div className="text-center py-8 text-gray-500">
            <Image className="w-12 h-12 mx-auto mb-2 opacity-30" />
            <p className="text-sm">No media found</p>
            <p className="text-xs mt-1">Try different search terms or filters</p>
          </div>
        )}
      </div>

      {/* Pixabay Attribution */}
      <div className="p-2 border-t bg-emerald-50 text-center">
        <a
          href="https://pixabay.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-emerald-700 hover:text-emerald-900"
        >
          Images & Videos from Pixabay
        </a>
      </div>
    </div>
  );
}
