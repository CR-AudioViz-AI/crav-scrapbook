'use client';

import React, { useState, useCallback } from 'react';
import { Wand2, Layout, Grid, Columns, Rows, Square, Shuffle, Sparkles, Loader2 } from 'lucide-react';

// Layout templates with positioning algorithms
const LAYOUT_TEMPLATES = {
  'classic-grid': {
    name: 'Classic Grid',
    icon: Grid,
    description: 'Even grid layout',
    generate: (photoCount: number, canvasWidth: number, canvasHeight: number) => {
      const cols = Math.ceil(Math.sqrt(photoCount));
      const rows = Math.ceil(photoCount / cols);
      const cellWidth = canvasWidth / cols;
      const cellHeight = canvasHeight / rows;
      const padding = 10;
      
      return Array.from({ length: photoCount }, (_, i) => ({
        x: (i % cols) * cellWidth + padding,
        y: Math.floor(i / cols) * cellHeight + padding,
        width: cellWidth - padding * 2,
        height: cellHeight - padding * 2,
        rotation: 0,
      }));
    }
  },
  'scattered': {
    name: 'Scattered',
    icon: Shuffle,
    description: 'Casual scattered look',
    generate: (photoCount: number, canvasWidth: number, canvasHeight: number) => {
      const baseSize = Math.min(canvasWidth, canvasHeight) / 3;
      return Array.from({ length: photoCount }, (_, i) => ({
        x: Math.random() * (canvasWidth - baseSize),
        y: Math.random() * (canvasHeight - baseSize),
        width: baseSize * (0.8 + Math.random() * 0.4),
        height: baseSize * (0.8 + Math.random() * 0.4),
        rotation: (Math.random() - 0.5) * 20,
      }));
    }
  },
  'polaroid-stack': {
    name: 'Polaroid Stack',
    icon: Square,
    description: 'Stacked like polaroids',
    generate: (photoCount: number, canvasWidth: number, canvasHeight: number) => {
      const centerX = canvasWidth / 2;
      const centerY = canvasHeight / 2;
      const size = Math.min(canvasWidth, canvasHeight) * 0.5;
      
      return Array.from({ length: photoCount }, (_, i) => ({
        x: centerX - size / 2 + (i - photoCount / 2) * 15,
        y: centerY - size / 2 + (i - photoCount / 2) * 10,
        width: size,
        height: size * 1.15, // Polaroid aspect ratio
        rotation: (i - photoCount / 2) * 8,
      }));
    }
  },
  'collage-overlap': {
    name: 'Collage Overlap',
    icon: Columns,
    description: 'Artistic overlapping',
    generate: (photoCount: number, canvasWidth: number, canvasHeight: number) => {
      const sizes = [0.45, 0.35, 0.4, 0.3, 0.38, 0.32];
      return Array.from({ length: photoCount }, (_, i) => {
        const sizeMultiplier = sizes[i % sizes.length];
        const width = canvasWidth * sizeMultiplier;
        const height = canvasHeight * sizeMultiplier;
        return {
          x: (canvasWidth * 0.1) + (i % 3) * (canvasWidth * 0.3),
          y: (canvasHeight * 0.1) + Math.floor(i / 3) * (canvasHeight * 0.35),
          width,
          height,
          rotation: (Math.random() - 0.5) * 10,
        };
      });
    }
  },
  'hero-sidebar': {
    name: 'Hero + Sidebar',
    icon: Layout,
    description: 'One large, rest small',
    generate: (photoCount: number, canvasWidth: number, canvasHeight: number) => {
      const layouts = [];
      const padding = 15;
      
      // Hero image (60% width)
      layouts.push({
        x: padding,
        y: padding,
        width: canvasWidth * 0.6 - padding * 2,
        height: canvasHeight - padding * 2,
        rotation: 0,
      });
      
      // Sidebar images
      const sidebarX = canvasWidth * 0.6 + padding;
      const sidebarWidth = canvasWidth * 0.4 - padding * 2;
      const itemCount = photoCount - 1;
      const itemHeight = (canvasHeight - padding * (itemCount + 1)) / itemCount;
      
      for (let i = 0; i < itemCount; i++) {
        layouts.push({
          x: sidebarX,
          y: padding + i * (itemHeight + padding),
          width: sidebarWidth,
          height: itemHeight,
          rotation: 0,
        });
      }
      
      return layouts;
    }
  },
  'filmstrip': {
    name: 'Film Strip',
    icon: Rows,
    description: 'Horizontal sequence',
    generate: (photoCount: number, canvasWidth: number, canvasHeight: number) => {
      const itemWidth = (canvasWidth - 20) / photoCount;
      const itemHeight = canvasHeight * 0.7;
      const y = (canvasHeight - itemHeight) / 2;
      
      return Array.from({ length: photoCount }, (_, i) => ({
        x: 10 + i * itemWidth,
        y,
        width: itemWidth - 10,
        height: itemHeight,
        rotation: 0,
      }));
    }
  },
  'masonry': {
    name: 'Masonry',
    icon: Grid,
    description: 'Pinterest-style columns',
    generate: (photoCount: number, canvasWidth: number, canvasHeight: number) => {
      const cols = 3;
      const colWidth = canvasWidth / cols;
      const padding = 10;
      const colHeights = [0, 0, 0];
      
      return Array.from({ length: photoCount }, (_, i) => {
        // Find shortest column
        const col = colHeights.indexOf(Math.min(...colHeights));
        const height = (0.5 + Math.random() * 0.5) * colWidth; // Variable height
        
        const layout = {
          x: col * colWidth + padding,
          y: colHeights[col] + padding,
          width: colWidth - padding * 2,
          height: height - padding,
          rotation: 0,
        };
        
        colHeights[col] += height;
        return layout;
      });
    }
  },
  'timeline': {
    name: 'Timeline',
    icon: Rows,
    description: 'Alternating sides',
    generate: (photoCount: number, canvasWidth: number, canvasHeight: number) => {
      const itemHeight = canvasHeight / Math.ceil(photoCount / 2);
      const itemWidth = canvasWidth * 0.4;
      
      return Array.from({ length: photoCount }, (_, i) => ({
        x: i % 2 === 0 ? 20 : canvasWidth - itemWidth - 20,
        y: Math.floor(i / 2) * itemHeight + 10,
        width: itemWidth,
        height: itemHeight - 20,
        rotation: i % 2 === 0 ? -3 : 3,
      }));
    }
  },
};

// Style suggestions based on photo count and content
const STYLE_SUGGESTIONS = [
  { id: 'modern', name: 'Modern Minimal', colors: ['#ffffff', '#f5f5f5', '#1f2937'], fonts: ['Inter', 'Helvetica'] },
  { id: 'vintage', name: 'Vintage Charm', colors: ['#fef3c7', '#f5f0e1', '#92400e'], fonts: ['Playfair Display', 'Georgia'] },
  { id: 'playful', name: 'Playful & Fun', colors: ['#fce7f3', '#dbeafe', '#dcfce7'], fonts: ['Comic Sans MS', 'Fredoka'] },
  { id: 'elegant', name: 'Elegant Classic', colors: ['#faf5ff', '#f3e8ff', '#7c3aed'], fonts: ['Cormorant', 'Times New Roman'] },
  { id: 'nature', name: 'Nature Inspired', colors: ['#ecfdf5', '#d1fae5', '#065f46'], fonts: ['Lora', 'Merriweather'] },
  { id: 'travel', name: 'Travel Adventure', colors: ['#fef9c3', '#e0f2fe', '#0ea5e9'], fonts: ['Adventure', 'Oswald'] },
];

interface PhotoLayout {
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
}

interface AILayoutGeneratorProps {
  photoCount?: number;
  canvasWidth?: number;
  canvasHeight?: number;
  onGenerateLayout?: (layouts: PhotoLayout[], style: typeof STYLE_SUGGESTIONS[0]) => void;
}

export function AILayoutGenerator({ 
  photoCount = 4, 
  canvasWidth = 800, 
  canvasHeight = 600,
  onGenerateLayout 
}: AILayoutGeneratorProps) {
  const [selectedTemplate, setSelectedTemplate] = useState<string>('classic-grid');
  const [selectedStyle, setSelectedStyle] = useState<string>('modern');
  const [customPhotoCount, setCustomPhotoCount] = useState(photoCount);
  const [isGenerating, setIsGenerating] = useState(false);
  const [previewLayouts, setPreviewLayouts] = useState<PhotoLayout[]>([]);

  const generateLayout = useCallback(async () => {
    setIsGenerating(true);
    
    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const template = LAYOUT_TEMPLATES[selectedTemplate as keyof typeof LAYOUT_TEMPLATES];
    const style = STYLE_SUGGESTIONS.find(s => s.id === selectedStyle) || STYLE_SUGGESTIONS[0];
    
    if (template) {
      const layouts = template.generate(customPhotoCount, canvasWidth, canvasHeight);
      setPreviewLayouts(layouts);
      onGenerateLayout?.(layouts, style);
    }
    
    setIsGenerating(false);
  }, [selectedTemplate, selectedStyle, customPhotoCount, canvasWidth, canvasHeight, onGenerateLayout]);

  const randomizeLayout = useCallback(() => {
    const templateKeys = Object.keys(LAYOUT_TEMPLATES);
    const randomTemplate = templateKeys[Math.floor(Math.random() * templateKeys.length)];
    const randomStyle = STYLE_SUGGESTIONS[Math.floor(Math.random() * STYLE_SUGGESTIONS.length)];
    
    setSelectedTemplate(randomTemplate);
    setSelectedStyle(randomStyle.id);
    
    // Auto-generate after randomize
    setTimeout(() => generateLayout(), 100);
  }, [generateLayout]);

  return (
    <div className="flex flex-col h-full bg-gray-900 text-white">
      {/* Header */}
      <div className="p-3 border-b border-gray-700">
        <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
          <Wand2 className="w-5 h-5 text-violet-400" />
          AI Layout Generator
        </h3>
        <p className="text-xs text-gray-400">
          Let AI arrange your photos perfectly
        </p>
      </div>

      {/* Photo Count */}
      <div className="p-3 border-b border-gray-700">
        <label className="text-xs text-gray-400 mb-2 block">Number of Photos</label>
        <div className="flex items-center gap-2">
          <input
            type="range"
            min="1"
            max="12"
            value={customPhotoCount}
            onChange={(e) => setCustomPhotoCount(Number(e.target.value))}
            className="flex-1 h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer"
          />
          <span className="text-sm font-medium w-8 text-center">{customPhotoCount}</span>
        </div>
      </div>

      {/* Layout Templates */}
      <div className="p-3 border-b border-gray-700">
        <label className="text-xs text-gray-400 mb-2 block">Layout Template</label>
        <div className="grid grid-cols-2 gap-2">
          {Object.entries(LAYOUT_TEMPLATES).map(([key, template]) => {
            const Icon = template.icon;
            return (
              <button
                key={key}
                onClick={() => setSelectedTemplate(key)}
                className={`flex items-center gap-2 p-2 rounded-lg text-xs transition-colors ${
                  selectedTemplate === key
                    ? 'bg-violet-600 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                <Icon className="w-4 h-4" />
                <div className="text-left">
                  <div className="font-medium">{template.name}</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Style Suggestions */}
      <div className="p-3 border-b border-gray-700">
        <label className="text-xs text-gray-400 mb-2 block">Style Theme</label>
        <div className="grid grid-cols-2 gap-2">
          {STYLE_SUGGESTIONS.map((style) => (
            <button
              key={style.id}
              onClick={() => setSelectedStyle(style.id)}
              className={`p-2 rounded-lg text-xs transition-colors ${
                selectedStyle === style.id
                  ? 'ring-2 ring-violet-500'
                  : 'hover:bg-gray-800'
              }`}
            >
              <div className="flex gap-1 mb-1">
                {style.colors.map((color, i) => (
                  <div
                    key={i}
                    className="w-4 h-4 rounded-full border border-gray-600"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
              <div className="text-left font-medium">{style.name}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Preview */}
      <div className="p-3 border-b border-gray-700">
        <label className="text-xs text-gray-400 mb-2 block">Preview</label>
        <div 
          className="relative bg-gray-800 rounded-lg overflow-hidden"
          style={{ aspectRatio: `${canvasWidth}/${canvasHeight}` }}
        >
          {previewLayouts.map((layout, i) => (
            <div
              key={i}
              className="absolute bg-violet-500/30 border border-violet-400 rounded"
              style={{
                left: `${(layout.x / canvasWidth) * 100}%`,
                top: `${(layout.y / canvasHeight) * 100}%`,
                width: `${(layout.width / canvasWidth) * 100}%`,
                height: `${(layout.height / canvasHeight) * 100}%`,
                transform: `rotate(${layout.rotation}deg)`,
              }}
            >
              <span className="absolute inset-0 flex items-center justify-center text-xs text-violet-200">
                {i + 1}
              </span>
            </div>
          ))}
          {previewLayouts.length === 0 && (
            <div className="absolute inset-0 flex items-center justify-center text-gray-500 text-xs">
              Click "Generate" to preview
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="p-3 space-y-2">
        <button
          onClick={generateLayout}
          disabled={isGenerating}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-violet-600 hover:bg-violet-700 disabled:bg-violet-800 rounded-lg font-medium transition-colors"
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              Generate Layout
            </>
          )}
        </button>
        
        <button
          onClick={randomizeLayout}
          disabled={isGenerating}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm transition-colors"
        >
          <Shuffle className="w-4 h-4" />
          Surprise Me!
        </button>
      </div>

      {/* Footer */}
      <div className="mt-auto p-2 border-t border-gray-700 text-center text-xs text-gray-500">
        8 layout templates • 6 style themes • Powered by AI
      </div>
    </div>
  );
}

export default AILayoutGenerator;
