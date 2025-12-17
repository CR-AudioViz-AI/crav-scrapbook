'use client';

import { useState, useEffect } from 'react';
import { Search, Loader2, Download, Copy, Check } from 'lucide-react';

interface Shape {
  id: string;
  name: string;
  category: string;
  preview: string;
}

interface ShapesBrowserProps {
  onSelectShape: (shape: { svg: string; dataUrl: string }) => void;
}

const CATEGORIES = ['basic', 'love', 'stars', 'arrows', 'callouts', 'decorative', 'frames'];

export default function ShapesBrowser({ onSelectShape }: ShapesBrowserProps) {
  const [shapes, setShapes] = useState<Shape[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [color, setColor] = useState('6366f1');
  const [strokeColor, setStrokeColor] = useState('4f46e5');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    fetchShapes();
  }, [category, color, strokeColor]);

  const fetchShapes = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (category) params.set('category', category);
      params.set('color', color);
      params.set('stroke', strokeColor);
      
      const res = await fetch(`/api/shapes?${params}`);
      const data = await res.json();
      setShapes(data.shapes || []);
    } catch (error) {
      console.error('Error fetching shapes:', error);
    }
    setLoading(false);
  };

  const handleSelectShape = async (shapeId: string) => {
    try {
      const res = await fetch(`/api/shapes?id=${shapeId}&color=${color}&stroke=${strokeColor}`);
      const data = await res.json();
      if (data.shape) {
        onSelectShape({
          svg: data.shape.svg,
          dataUrl: data.shape.dataUrl
        });
      }
    } catch (error) {
      console.error('Error getting shape:', error);
    }
  };

  const handleCopySvg = async (shapeId: string) => {
    try {
      const res = await fetch(`/api/shapes?id=${shapeId}&color=${color}&stroke=${strokeColor}`);
      const data = await res.json();
      if (data.shape) {
        await navigator.clipboard.writeText(data.shape.svg);
        setCopiedId(shapeId);
        setTimeout(() => setCopiedId(null), 2000);
      }
    } catch (error) {
      console.error('Error copying SVG:', error);
    }
  };

  const filteredShapes = shapes.filter(shape =>
    shape.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-sm">
      {/* Header */}
      <div className="p-4 border-b space-y-3">
        <h3 className="font-semibold text-lg">Shapes Library</h3>
        
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search shapes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
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

        {/* Color Pickers */}
        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <label className="text-xs text-gray-600">Fill:</label>
            <input
              type="color"
              value={`#${color}`}
              onChange={(e) => setColor(e.target.value.replace('#', ''))}
              className="w-8 h-8 rounded cursor-pointer"
            />
          </div>
          <div className="flex items-center gap-2">
            <label className="text-xs text-gray-600">Stroke:</label>
            <input
              type="color"
              value={`#${strokeColor}`}
              onChange={(e) => setStrokeColor(e.target.value.replace('#', ''))}
              className="w-8 h-8 rounded cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* Shapes Grid */}
      <div className="flex-1 overflow-y-auto p-4">
        {loading ? (
          <div className="flex items-center justify-center h-32">
            <Loader2 className="w-6 h-6 animate-spin text-purple-600" />
          </div>
        ) : filteredShapes.length === 0 ? (
          <p className="text-center text-gray-500 py-8">No shapes found</p>
        ) : (
          <div className="grid grid-cols-4 gap-3">
            {filteredShapes.map((shape) => (
              <div
                key={shape.id}
                className="group relative aspect-square bg-gray-50 rounded-lg border hover:border-purple-300 transition cursor-pointer overflow-hidden"
                onClick={() => handleSelectShape(shape.id)}
              >
                <img
                  src={shape.preview}
                  alt={shape.name}
                  className="w-full h-full object-contain p-2"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCopySvg(shape.id);
                    }}
                    className="p-2 bg-white rounded-full hover:bg-gray-100"
                    title="Copy SVG"
                  >
                    {copiedId === shape.id ? (
                      <Check className="w-4 h-4 text-green-600" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelectShape(shape.id);
                    }}
                    className="p-2 bg-purple-600 text-white rounded-full hover:bg-purple-700"
                    title="Add to canvas"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
                <p className="absolute bottom-0 left-0 right-0 bg-white/90 text-xs text-center py-1 truncate px-1">
                  {shape.name}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-3 border-t bg-gray-50 text-xs text-gray-500 text-center">
        {filteredShapes.length} shapes • Click to add to canvas
      </div>
    </div>
  );
}
