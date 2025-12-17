'use client';

import { useState, useEffect } from 'react';
import { Search, Loader2, X } from 'lucide-react';

interface Sticker {
  id: string;
  emoji: string;
  name: string;
  packId?: string;
  packName?: string;
}

interface StickerPack {
  id: string;
  name: string;
  description: string;
  icon: string;
  count: number;
  stickers?: Sticker[];
}

interface StickersBrowserProps {
  onSelectSticker: (sticker: { emoji: string; name: string }) => void;
}

export default function StickersBrowser({ onSelectSticker }: StickersBrowserProps) {
  const [packs, setPacks] = useState<StickerPack[]>([]);
  const [selectedPack, setSelectedPack] = useState<StickerPack | null>(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState<Sticker[]>([]);
  const [recentStickers, setRecentStickers] = useState<Sticker[]>([]);

  useEffect(() => {
    fetchPacks();
    // Load recent from localStorage
    const recent = localStorage.getItem('recentStickers');
    if (recent) {
      setRecentStickers(JSON.parse(recent).slice(0, 12));
    }
  }, []);

  useEffect(() => {
    if (search) {
      searchStickers();
    } else {
      setSearchResults([]);
    }
  }, [search]);

  const fetchPacks = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/stickers?listPacks=true');
      const data = await res.json();
      setPacks(data.packs || []);
    } catch (error) {
      console.error('Error fetching sticker packs:', error);
    }
    setLoading(false);
  };

  const fetchPack = async (packId: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/stickers?pack=${packId}`);
      const data = await res.json();
      setSelectedPack(data.pack || null);
    } catch (error) {
      console.error('Error fetching pack:', error);
    }
    setLoading(false);
  };

  const searchStickers = async () => {
    try {
      const res = await fetch(`/api/stickers?search=${encodeURIComponent(search)}`);
      const data = await res.json();
      setSearchResults(data.stickers || []);
    } catch (error) {
      console.error('Error searching stickers:', error);
    }
  };

  const handleSelectSticker = (sticker: Sticker) => {
    // Add to recent
    const newRecent = [sticker, ...recentStickers.filter(s => s.id !== sticker.id)].slice(0, 12);
    setRecentStickers(newRecent);
    localStorage.setItem('recentStickers', JSON.stringify(newRecent));
    
    onSelectSticker({ emoji: sticker.emoji, name: sticker.name });
  };

  const renderStickerGrid = (stickers: Sticker[]) => (
    <div className="grid grid-cols-6 gap-2">
      {stickers.map((sticker, idx) => (
        <button
          key={`${sticker.id}-${idx}`}
          onClick={() => handleSelectSticker(sticker)}
          className="aspect-square flex items-center justify-center text-3xl hover:bg-gray-100 rounded-lg transition"
          title={sticker.name}
        >
          {sticker.emoji}
        </button>
      ))}
    </div>
  );

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-sm">
      {/* Header */}
      <div className="p-4 border-b space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-lg">Stickers</h3>
          {selectedPack && (
            <button
              onClick={() => setSelectedPack(null)}
              className="p-1 hover:bg-gray-100 rounded"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
        
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search stickers..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {loading ? (
          <div className="flex items-center justify-center h-32">
            <Loader2 className="w-6 h-6 animate-spin text-purple-600" />
          </div>
        ) : search ? (
          // Search Results
          <div>
            <h4 className="text-sm font-medium text-gray-700 mb-3">
              Results for "{search}" ({searchResults.length})
            </h4>
            {searchResults.length > 0 ? (
              renderStickerGrid(searchResults)
            ) : (
              <p className="text-center text-gray-500 py-4">No stickers found</p>
            )}
          </div>
        ) : selectedPack ? (
          // Pack View
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">{selectedPack.icon}</span>
              <div>
                <h4 className="font-medium">{selectedPack.name}</h4>
                <p className="text-xs text-gray-500">{selectedPack.description}</p>
              </div>
            </div>
            {selectedPack.stickers && renderStickerGrid(selectedPack.stickers)}
          </div>
        ) : (
          // Packs View
          <div className="space-y-6">
            {/* Recent */}
            {recentStickers.length > 0 && (
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-3">Recently Used</h4>
                {renderStickerGrid(recentStickers)}
              </div>
            )}

            {/* Packs */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-3">Sticker Packs</h4>
              <div className="grid grid-cols-2 gap-3">
                {packs.map((pack) => (
                  <button
                    key={pack.id}
                    onClick={() => fetchPack(pack.id)}
                    className="flex items-center gap-3 p-3 bg-gray-50 hover:bg-gray-100 rounded-lg text-left transition"
                  >
                    <span className="text-3xl">{pack.icon}</span>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">{pack.name}</p>
                      <p className="text-xs text-gray-500">{pack.count} stickers</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-3 border-t bg-gray-50 text-xs text-gray-500 text-center">
        {packs.reduce((sum, p) => sum + p.count, 0)} stickers in {packs.length} packs
      </div>
    </div>
  );
}
