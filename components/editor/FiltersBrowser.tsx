'use client';

import { useState, useEffect } from 'react';
import { Search, Loader2, Check, RotateCcw } from 'lucide-react';

interface Filter {
  id: string;
  name: string;
  category: string;
  css: string;
  description: string;
}

interface FiltersBrowserProps {
  previewImage?: string;
  currentFilter?: string;
  onSelectFilter: (filter: { id: string; name: string; css: string }) => void;
}

const CATEGORIES = ['basic', 'instagram', 'vintage', 'artistic', 'color'];

export default function FiltersBrowser({ previewImage, currentFilter, onSelectFilter }: FiltersBrowserProps) {
  const [filters, setFilters] = useState<Filter[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('');
  const [selectedFilter, setSelectedFilter] = useState(currentFilter || 'none');

  useEffect(() => {
    fetchFilters();
  }, [category]);

  const fetchFilters = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (category) params.set('category', category);
      
      const res = await fetch(`/api/filters?${params}`);
      const data = await res.json();
      setFilters(data.filters || []);
    } catch (error) {
      console.error('Error fetching filters:', error);
    }
    setLoading(false);
  };

  const handleSelectFilter = (filter: Filter) => {
    setSelectedFilter(filter.id);
    onSelectFilter({
      id: filter.id,
      name: filter.name,
      css: filter.css
    });
  };

  const handleReset = () => {
    const noneFilter = filters.find(f => f.id === 'none') || { id: 'none', name: 'Original', css: 'none' };
    handleSelectFilter(noneFilter as Filter);
  };

  // Default preview image if none provided
  const previewSrc = previewImage || 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop';

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-sm">
      {/* Header */}
      <div className="p-4 border-b space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-lg">Photo Filters</h3>
          <button
            onClick={handleReset}
            className="flex items-center gap-1 px-3 py-1 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded"
          >
            <RotateCcw className="w-4 h-4" />
            Reset
          </button>
        </div>
        
        {/* Category Filter */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setCategory('')}
            className={`px-3 py-1 rounded-full text-xs font-medium transition ${
              category === '' ? 'bg-purple-600 text-white' : 'bg-gray-100 hover:bg-gray-200'
            }`}
          >
            All
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-3 py-1 rounded-full text-xs font-medium capitalize transition ${
                category === cat ? 'bg-purple-600 text-white' : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Preview */}
      {previewImage && (
        <div className="p-4 border-b bg-gray-50">
          <div className="aspect-video rounded-lg overflow-hidden bg-gray-200">
            <img
              src={previewSrc}
              alt="Filter preview"
              className="w-full h-full object-cover"
              style={{ filter: filters.find(f => f.id === selectedFilter)?.css || 'none' }}
            />
          </div>
          <p className="text-center text-sm text-gray-600 mt-2">
            Current: {filters.find(f => f.id === selectedFilter)?.name || 'Original'}
          </p>
        </div>
      )}

      {/* Filters Grid */}
      <div className="flex-1 overflow-y-auto p-4">
        {loading ? (
          <div className="flex items-center justify-center h-32">
            <Loader2 className="w-6 h-6 animate-spin text-purple-600" />
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-3">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => handleSelectFilter(filter)}
                className={`relative rounded-lg overflow-hidden border-2 transition ${
                  selectedFilter === filter.id
                    ? 'border-purple-600 ring-2 ring-purple-200'
                    : 'border-transparent hover:border-gray-300'
                }`}
              >
                <div className="aspect-square bg-gray-100">
                  <img
                    src={previewSrc}
                    alt={filter.name}
                    className="w-full h-full object-cover"
                    style={{ filter: filter.css }}
                  />
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-xs py-1.5 px-1 text-center">
                  {filter.name}
                </div>
                {selectedFilter === filter.id && (
                  <div className="absolute top-2 right-2 w-5 h-5 bg-purple-600 rounded-full flex items-center justify-center">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-3 border-t bg-gray-50 text-xs text-gray-500 text-center">
        {filters.length} filters • Click to apply
      </div>
    </div>
  );
}
