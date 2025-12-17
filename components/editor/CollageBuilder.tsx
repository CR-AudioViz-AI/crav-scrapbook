'use client';

import { useState, useEffect, useRef } from 'react';
import { Loader2, Plus, Trash2, Grid, Upload, Image as ImageIcon } from 'lucide-react';

interface CollageCell {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

interface CollageLayout {
  id: string;
  name: string;
  description: string;
  photoCount: number;
  aspectRatio: string;
  cells: CollageCell[];
}

interface CollageBuilderProps {
  onCreateCollage: (collage: { layout: CollageLayout; images: { cellId: string; imageUrl: string }[] }) => void;
}

export default function CollageBuilder({ onCreateCollage }: CollageBuilderProps) {
  const [layouts, setLayouts] = useState<CollageLayout[]>([]);
  const [selectedLayout, setSelectedLayout] = useState<CollageLayout | null>(null);
  const [cellImages, setCellImages] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [photoCount, setPhotoCount] = useState<number | ''>('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [activeCell, setActiveCell] = useState<string | null>(null);

  useEffect(() => {
    fetchLayouts();
  }, [photoCount]);

  const fetchLayouts = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (photoCount) params.set('photos', photoCount.toString());
      
      const res = await fetch(`/api/collage?${params}`);
      const data = await res.json();
      setLayouts(data.layouts || []);
    } catch (error) {
      console.error('Error fetching layouts:', error);
    }
    setLoading(false);
  };

  const fetchLayoutDetails = async (layoutId: string) => {
    try {
      const res = await fetch(`/api/collage?id=${layoutId}`);
      const data = await res.json();
      if (data.layout) {
        setSelectedLayout(data.layout);
        setCellImages({});
      }
    } catch (error) {
      console.error('Error fetching layout:', error);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || !activeCell) return;

    const file = files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setCellImages(prev => ({ ...prev, [activeCell]: result }));
      setActiveCell(null);
    };
    reader.readAsDataURL(file);
    
    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleCellClick = (cellId: string) => {
    setActiveCell(cellId);
    fileInputRef.current?.click();
  };

  const removeImage = (cellId: string) => {
    setCellImages(prev => {
      const newImages = { ...prev };
      delete newImages[cellId];
      return newImages;
    });
  };

  const handleCreateCollage = () => {
    if (!selectedLayout) return;
    
    const images = Object.entries(cellImages).map(([cellId, imageUrl]) => ({
      cellId,
      imageUrl
    }));
    
    onCreateCollage({
      layout: selectedLayout,
      images
    });
  };

  const filledCells = Object.keys(cellImages).length;
  const totalCells = selectedLayout?.cells.length || 0;

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-sm">
      {/* Header */}
      <div className="p-4 border-b">
        <h3 className="font-semibold text-lg flex items-center gap-2">
          <Grid className="w-5 h-5" />
          Collage Builder
        </h3>
        <p className="text-sm text-gray-500 mt-1">Create beautiful photo collages</p>
      </div>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {!selectedLayout ? (
          <>
            {/* Photo Count Filter */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Number of Photos</label>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setPhotoCount('')}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
                    photoCount === '' ? 'bg-purple-600 text-white' : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  All
                </button>
                {[2, 3, 4, 5, 6, 9].map((count) => (
                  <button
                    key={count}
                    onClick={() => setPhotoCount(count)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
                      photoCount === count ? 'bg-purple-600 text-white' : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                  >
                    {count} Photos
                  </button>
                ))}
              </div>
            </div>

            {/* Layout Grid */}
            {loading ? (
              <div className="flex items-center justify-center h-32">
                <Loader2 className="w-6 h-6 animate-spin text-purple-600" />
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                {layouts.map((layout) => (
                  <button
                    key={layout.id}
                    onClick={() => fetchLayoutDetails(layout.id)}
                    className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition text-left"
                  >
                    <div className="aspect-square bg-gray-200 rounded mb-2 relative overflow-hidden">
                      {/* Simple layout preview */}
                      <div className="absolute inset-1 grid gap-0.5" style={{
                        gridTemplateColumns: layout.photoCount <= 2 ? 'repeat(2, 1fr)' : 
                          layout.photoCount <= 4 ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
                        gridTemplateRows: layout.photoCount <= 2 ? '1fr' :
                          layout.photoCount <= 4 ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)'
                      }}>
                        {Array.from({ length: Math.min(layout.photoCount, 9) }).map((_, i) => (
                          <div key={i} className="bg-purple-200 rounded-sm" />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm font-medium truncate">{layout.name}</p>
                    <p className="text-xs text-gray-500">{layout.photoCount} photos • {layout.aspectRatio}</p>
                  </button>
                ))}
              </div>
            )}
          </>
        ) : (
          <>
            {/* Back Button */}
            <button
              onClick={() => setSelectedLayout(null)}
              className="text-sm text-purple-600 hover:text-purple-700 font-medium"
            >
              ← Choose Different Layout
            </button>

            {/* Layout Info */}
            <div className="p-3 bg-purple-50 rounded-lg">
              <h4 className="font-medium">{selectedLayout.name}</h4>
              <p className="text-sm text-gray-600">{selectedLayout.description}</p>
              <p className="text-xs text-purple-600 mt-1">
                {filledCells} of {totalCells} photos added
              </p>
            </div>

            {/* Collage Preview */}
            <div className="aspect-square bg-gray-100 rounded-lg relative overflow-hidden border-2 border-dashed border-gray-300">
              {selectedLayout.cells.map((cell) => (
                <div
                  key={cell.id}
                  className="absolute overflow-hidden group"
                  style={{
                    left: `${cell.x}%`,
                    top: `${cell.y}%`,
                    width: `${cell.width}%`,
                    height: `${cell.height}%`,
                  }}
                >
                  {cellImages[cell.id] ? (
                    <div className="relative w-full h-full">
                      <img
                        src={cellImages[cell.id]}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                      <button
                        onClick={() => removeImage(cell.id)}
                        className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleCellClick(cell.id)}
                      className="w-full h-full bg-gray-200 hover:bg-gray-300 transition flex flex-col items-center justify-center gap-1 border border-gray-300"
                    >
                      <Plus className="w-6 h-6 text-gray-400" />
                      <span className="text-xs text-gray-500">Add Photo</span>
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* Quick Add All */}
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-full py-2 border-2 border-dashed border-purple-300 text-purple-600 rounded-lg font-medium hover:bg-purple-50 flex items-center justify-center gap-2"
            >
              <Upload className="w-4 h-4" />
              Upload Photo
            </button>

            {/* Create Button */}
            <button
              onClick={handleCreateCollage}
              disabled={filledCells === 0}
              className="w-full py-3 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <ImageIcon className="w-4 h-4" />
              Create Collage
            </button>
          </>
        )}
      </div>

      {/* Footer */}
      <div className="p-3 border-t bg-gray-50 text-xs text-gray-500 text-center">
        {layouts.length} layouts available
      </div>
    </div>
  );
}
