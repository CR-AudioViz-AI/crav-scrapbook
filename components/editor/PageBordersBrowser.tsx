// components/editor/PageBordersBrowser.tsx
// Decorative Page Borders for Scrapbook Pages
// Timestamp: Tuesday, December 24, 2025 – 3:15 PM Eastern Time
// CR AudioViz AI - "Your Story. Our Design"

'use client';

import React, { useState, useMemo } from 'react';
import { Search, Square, Sparkles } from 'lucide-react';

interface PageBorder {
  id: string;
  name: string;
  category: string;
  borderStyle: string;
  borderWidth: string;
  borderColor: string;
  borderRadius?: string;
  boxShadow?: string;
  background?: string;
  tags: string[];
}

interface PageBordersBrowserProps {
  onSelectBorder?: (border: PageBorder) => void;
  onApplyBorder?: (borderStyles: React.CSSProperties) => void;
}

// Comprehensive border designs - 80+ borders
const PAGE_BORDERS: PageBorder[] = [
  // SIMPLE LINES
  { id: 'thin-black', name: 'Thin Black', category: 'simple', borderStyle: 'solid', borderWidth: '1px', borderColor: '#1F2937', tags: ['minimal', 'clean'] },
  { id: 'medium-black', name: 'Medium Black', category: 'simple', borderStyle: 'solid', borderWidth: '2px', borderColor: '#1F2937', tags: ['classic', 'simple'] },
  { id: 'thick-black', name: 'Thick Black', category: 'simple', borderStyle: 'solid', borderWidth: '4px', borderColor: '#1F2937', tags: ['bold', 'strong'] },
  { id: 'double-line', name: 'Double Line', category: 'simple', borderStyle: 'double', borderWidth: '4px', borderColor: '#1F2937', tags: ['elegant', 'classic'] },
  { id: 'triple-line', name: 'Triple Line', category: 'simple', borderStyle: 'double', borderWidth: '6px', borderColor: '#1F2937', tags: ['formal', 'certificate'] },
  { id: 'dashed', name: 'Dashed', category: 'dashed', borderStyle: 'dashed', borderWidth: '2px', borderColor: '#6B7280', tags: ['playful', 'casual'] },
  { id: 'dotted', name: 'Dotted', category: 'dashed', borderStyle: 'dotted', borderWidth: '2px', borderColor: '#6B7280', tags: ['dots', 'fun'] },
  { id: 'dashed-thick', name: 'Thick Dashed', category: 'dashed', borderStyle: 'dashed', borderWidth: '4px', borderColor: '#1F2937', tags: ['bold', 'playful'] },
  { id: 'dotted-thick', name: 'Thick Dotted', category: 'dashed', borderStyle: 'dotted', borderWidth: '4px', borderColor: '#1F2937', tags: ['bold', 'dots'] },
  { id: 'rounded-sm', name: 'Rounded Small', category: 'rounded', borderStyle: 'solid', borderWidth: '2px', borderColor: '#1F2937', borderRadius: '8px', tags: ['soft', 'modern'] },
  { id: 'rounded-md', name: 'Rounded Medium', category: 'rounded', borderStyle: 'solid', borderWidth: '2px', borderColor: '#1F2937', borderRadius: '16px', tags: ['friendly', 'modern'] },
  { id: 'rounded-lg', name: 'Rounded Large', category: 'rounded', borderStyle: 'solid', borderWidth: '2px', borderColor: '#1F2937', borderRadius: '24px', tags: ['soft', 'gentle'] },
  { id: 'pill', name: 'Pill Shape', category: 'rounded', borderStyle: 'solid', borderWidth: '2px', borderColor: '#1F2937', borderRadius: '9999px', tags: ['oval', 'rounded'] },
  { id: 'red-border', name: 'Classic Red', category: 'colorful', borderStyle: 'solid', borderWidth: '3px', borderColor: '#DC2626', tags: ['red', 'bold'] },
  { id: 'blue-border', name: 'Ocean Blue', category: 'colorful', borderStyle: 'solid', borderWidth: '3px', borderColor: '#3B82F6', tags: ['blue', 'calm'] },
  { id: 'green-border', name: 'Forest Green', category: 'colorful', borderStyle: 'solid', borderWidth: '3px', borderColor: '#22C55E', tags: ['green', 'nature'] },
  { id: 'purple-border', name: 'Royal Purple', category: 'colorful', borderStyle: 'solid', borderWidth: '3px', borderColor: '#8B5CF6', tags: ['purple', 'royal'] },
  { id: 'pink-border', name: 'Pretty Pink', category: 'colorful', borderStyle: 'solid', borderWidth: '3px', borderColor: '#EC4899', tags: ['pink', 'feminine'] },
  { id: 'gold-border', name: 'Golden', category: 'colorful', borderStyle: 'solid', borderWidth: '3px', borderColor: '#F59E0B', tags: ['gold', 'luxury'] },
  { id: 'teal-border', name: 'Teal', category: 'colorful', borderStyle: 'solid', borderWidth: '3px', borderColor: '#14B8A6', tags: ['teal', 'fresh'] },
  { id: 'orange-border', name: 'Vibrant Orange', category: 'colorful', borderStyle: 'solid', borderWidth: '3px', borderColor: '#F97316', tags: ['orange', 'energetic'] },
  { id: 'indigo-border', name: 'Deep Indigo', category: 'colorful', borderStyle: 'solid', borderWidth: '3px', borderColor: '#4F46E5', tags: ['indigo', 'deep'] },
  { id: 'rose-border', name: 'Rose', category: 'colorful', borderStyle: 'solid', borderWidth: '3px', borderColor: '#F43F5E', tags: ['rose', 'romantic'] },
  { id: 'shadow-soft', name: 'Soft Shadow', category: 'shadow', borderStyle: 'solid', borderWidth: '1px', borderColor: '#E5E7EB', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)', tags: ['subtle', 'floating'] },
  { id: 'shadow-medium', name: 'Medium Shadow', category: 'shadow', borderStyle: 'solid', borderWidth: '1px', borderColor: '#E5E7EB', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', tags: ['elevated', 'depth'] },
  { id: 'shadow-strong', name: 'Strong Shadow', category: 'shadow', borderStyle: 'solid', borderWidth: '0px', borderColor: 'transparent', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)', tags: ['dramatic', 'floating'] },
  { id: 'shadow-pink', name: 'Pink Shadow', category: 'shadow', borderStyle: 'solid', borderWidth: '1px', borderColor: '#FBCFE8', boxShadow: '0 10px 25px -5px rgba(236,72,153,0.3)', tags: ['colorful', 'feminine'] },
  { id: 'shadow-blue', name: 'Blue Shadow', category: 'shadow', borderStyle: 'solid', borderWidth: '1px', borderColor: '#BFDBFE', boxShadow: '0 10px 25px -5px rgba(59,130,246,0.3)', tags: ['colorful', 'calm'] },
  { id: 'shadow-purple', name: 'Purple Shadow', category: 'shadow', borderStyle: 'solid', borderWidth: '1px', borderColor: '#DDD6FE', boxShadow: '0 10px 25px -5px rgba(139,92,246,0.3)', tags: ['colorful', 'magical'] },
  { id: 'shadow-green', name: 'Green Shadow', category: 'shadow', borderStyle: 'solid', borderWidth: '1px', borderColor: '#BBF7D0', boxShadow: '0 10px 25px -5px rgba(34,197,94,0.3)', tags: ['colorful', 'nature'] },
  { id: 'scalloped', name: 'Scalloped Edge', category: 'decorative', borderStyle: 'solid', borderWidth: '3px', borderColor: '#F472B6', borderRadius: '20px', tags: ['feminine', 'cute'] },
  { id: 'wavy', name: 'Wavy Border', category: 'decorative', borderStyle: 'dashed', borderWidth: '3px', borderColor: '#60A5FA', borderRadius: '30px', tags: ['playful', 'fun'] },
  { id: 'ticket', name: 'Ticket Stub', category: 'decorative', borderStyle: 'dashed', borderWidth: '2px', borderColor: '#9CA3AF', tags: ['vintage', 'event'] },
  { id: 'stamp', name: 'Postage Stamp', category: 'decorative', borderStyle: 'dotted', borderWidth: '4px', borderColor: '#374151', tags: ['vintage', 'mail'] },
  { id: 'polaroid', name: 'Polaroid', category: 'decorative', borderStyle: 'solid', borderWidth: '8px 8px 40px 8px', borderColor: '#FFFFFF', boxShadow: '0 4px 6px rgba(0,0,0,0.1)', tags: ['photo', 'retro'] },
  { id: 'film-strip', name: 'Film Strip', category: 'decorative', borderStyle: 'solid', borderWidth: '16px 8px', borderColor: '#1F2937', tags: ['movie', 'cinema'] },
  { id: 'groovy', name: 'Groovy', category: 'decorative', borderStyle: 'groove', borderWidth: '6px', borderColor: '#8B5CF6', tags: ['retro', '3d'] },
  { id: 'ridged', name: 'Ridged', category: 'decorative', borderStyle: 'ridge', borderWidth: '6px', borderColor: '#F59E0B', tags: ['3d', 'textured'] },
  { id: 'inset', name: 'Inset', category: 'decorative', borderStyle: 'inset', borderWidth: '6px', borderColor: '#6B7280', tags: ['3d', 'pressed'] },
  { id: 'outset', name: 'Outset', category: 'decorative', borderStyle: 'outset', borderWidth: '6px', borderColor: '#6B7280', tags: ['3d', 'raised'] },
  { id: 'antique-gold', name: 'Antique Gold', category: 'vintage', borderStyle: 'double', borderWidth: '6px', borderColor: '#B45309', tags: ['antique', 'elegant'] },
  { id: 'vintage-brown', name: 'Vintage Brown', category: 'vintage', borderStyle: 'solid', borderWidth: '4px', borderColor: '#78350F', tags: ['old', 'rustic'] },
  { id: 'sepia-frame', name: 'Sepia Frame', category: 'vintage', borderStyle: 'double', borderWidth: '5px', borderColor: '#92400E', tags: ['sepia', 'nostalgic'] },
  { id: 'ornate-gold', name: 'Ornate Gold', category: 'vintage', borderStyle: 'ridge', borderWidth: '8px', borderColor: '#D97706', tags: ['ornate', 'fancy'] },
  { id: 'baroque', name: 'Baroque', category: 'vintage', borderStyle: 'groove', borderWidth: '8px', borderColor: '#78350F', tags: ['baroque', 'classical'] },
  { id: 'art-deco', name: 'Art Deco', category: 'vintage', borderStyle: 'double', borderWidth: '6px', borderColor: '#D4AF37', tags: ['deco', 'elegant'] },
  { id: 'victorian', name: 'Victorian', category: 'vintage', borderStyle: 'ridge', borderWidth: '6px', borderColor: '#7C2D12', tags: ['victorian', 'classic'] },
  { id: 'gradient-pink', name: 'Gradient Pink', category: 'modern', borderStyle: 'solid', borderWidth: '4px', borderColor: '#EC4899', background: 'linear-gradient(135deg, #FDF2F8, #FCE7F3)', tags: ['gradient', 'pink'] },
  { id: 'gradient-blue', name: 'Gradient Blue', category: 'modern', borderStyle: 'solid', borderWidth: '4px', borderColor: '#3B82F6', background: 'linear-gradient(135deg, #EFF6FF, #DBEAFE)', tags: ['gradient', 'blue'] },
  { id: 'gradient-purple', name: 'Gradient Purple', category: 'modern', borderStyle: 'solid', borderWidth: '4px', borderColor: '#8B5CF6', background: 'linear-gradient(135deg, #FAF5FF, #EDE9FE)', tags: ['gradient', 'purple'] },
  { id: 'gradient-green', name: 'Gradient Green', category: 'modern', borderStyle: 'solid', borderWidth: '4px', borderColor: '#22C55E', background: 'linear-gradient(135deg, #F0FDF4, #DCFCE7)', tags: ['gradient', 'green'] },
  { id: 'neon-pink', name: 'Neon Pink', category: 'modern', borderStyle: 'solid', borderWidth: '3px', borderColor: '#F472B6', boxShadow: '0 0 10px #F472B6, 0 0 20px #F472B6', tags: ['neon', 'glow'] },
  { id: 'neon-blue', name: 'Neon Blue', category: 'modern', borderStyle: 'solid', borderWidth: '3px', borderColor: '#60A5FA', boxShadow: '0 0 10px #60A5FA, 0 0 20px #60A5FA', tags: ['neon', 'glow'] },
  { id: 'neon-green', name: 'Neon Green', category: 'modern', borderStyle: 'solid', borderWidth: '3px', borderColor: '#4ADE80', boxShadow: '0 0 10px #4ADE80, 0 0 20px #4ADE80', tags: ['neon', 'glow'] },
  { id: 'neon-purple', name: 'Neon Purple', category: 'modern', borderStyle: 'solid', borderWidth: '3px', borderColor: '#A78BFA', boxShadow: '0 0 10px #A78BFA, 0 0 20px #A78BFA', tags: ['neon', 'glow'] },
  { id: 'neon-yellow', name: 'Neon Yellow', category: 'modern', borderStyle: 'solid', borderWidth: '3px', borderColor: '#FBBF24', boxShadow: '0 0 10px #FBBF24, 0 0 20px #FBBF24', tags: ['neon', 'glow'] },
  { id: 'christmas-red', name: 'Christmas Red', category: 'seasonal', borderStyle: 'double', borderWidth: '6px', borderColor: '#DC2626', tags: ['christmas', 'holiday'] },
  { id: 'christmas-green', name: 'Christmas Green', category: 'seasonal', borderStyle: 'double', borderWidth: '6px', borderColor: '#166534', tags: ['christmas', 'holiday'] },
  { id: 'halloween-orange', name: 'Halloween', category: 'seasonal', borderStyle: 'dashed', borderWidth: '4px', borderColor: '#F97316', tags: ['halloween', 'spooky'] },
  { id: 'valentine-pink', name: 'Valentine', category: 'seasonal', borderStyle: 'double', borderWidth: '4px', borderColor: '#EC4899', tags: ['valentine', 'love'] },
  { id: 'easter-pastel', name: 'Easter Pastel', category: 'seasonal', borderStyle: 'solid', borderWidth: '3px', borderColor: '#A78BFA', borderRadius: '20px', tags: ['easter', 'spring'] },
  { id: 'autumn-orange', name: 'Autumn', category: 'seasonal', borderStyle: 'solid', borderWidth: '4px', borderColor: '#EA580C', tags: ['fall', 'autumn'] },
  { id: 'winter-blue', name: 'Winter Frost', category: 'seasonal', borderStyle: 'solid', borderWidth: '3px', borderColor: '#7DD3FC', boxShadow: '0 0 15px rgba(125,211,252,0.5)', tags: ['winter', 'frost'] },
  { id: 'spring-green', name: 'Spring', category: 'seasonal', borderStyle: 'solid', borderWidth: '3px', borderColor: '#86EFAC', tags: ['spring', 'fresh'] },
  { id: 'summer-yellow', name: 'Summer Sun', category: 'seasonal', borderStyle: 'solid', borderWidth: '3px', borderColor: '#FDE047', boxShadow: '0 0 15px rgba(253,224,71,0.5)', tags: ['summer', 'sunny'] },
  { id: 'baby-blue', name: 'Baby Blue', category: 'baby', borderStyle: 'dotted', borderWidth: '4px', borderColor: '#93C5FD', borderRadius: '16px', tags: ['baby', 'boy'] },
  { id: 'baby-pink', name: 'Baby Pink', category: 'baby', borderStyle: 'dotted', borderWidth: '4px', borderColor: '#F9A8D4', borderRadius: '16px', tags: ['baby', 'girl'] },
  { id: 'baby-yellow', name: 'Baby Yellow', category: 'baby', borderStyle: 'dashed', borderWidth: '3px', borderColor: '#FDE047', borderRadius: '20px', tags: ['baby', 'neutral'] },
  { id: 'baby-mint', name: 'Baby Mint', category: 'baby', borderStyle: 'dotted', borderWidth: '4px', borderColor: '#6EE7B7', borderRadius: '16px', tags: ['baby', 'neutral'] },
  { id: 'baby-lavender', name: 'Baby Lavender', category: 'baby', borderStyle: 'dotted', borderWidth: '4px', borderColor: '#C4B5FD', borderRadius: '16px', tags: ['baby', 'neutral'] },
  { id: 'wedding-gold', name: 'Wedding Gold', category: 'wedding', borderStyle: 'double', borderWidth: '6px', borderColor: '#D4AF37', tags: ['wedding', 'elegant'] },
  { id: 'wedding-silver', name: 'Wedding Silver', category: 'wedding', borderStyle: 'double', borderWidth: '6px', borderColor: '#C0C0C0', tags: ['wedding', 'elegant'] },
  { id: 'wedding-rose-gold', name: 'Rose Gold', category: 'wedding', borderStyle: 'double', borderWidth: '6px', borderColor: '#B76E79', tags: ['wedding', 'elegant'] },
  { id: 'lace', name: 'Lace Border', category: 'wedding', borderStyle: 'dotted', borderWidth: '3px', borderColor: '#FAFAFA', boxShadow: '0 0 0 3px #E5E7EB', tags: ['lace', 'feminine'] },
  { id: 'wedding-blush', name: 'Blush', category: 'wedding', borderStyle: 'solid', borderWidth: '4px', borderColor: '#FBCFE8', tags: ['wedding', 'romantic'] },
];

// Categories
const CATEGORIES = [
  { id: 'all', name: 'All Borders' },
  { id: 'simple', name: 'Simple' },
  { id: 'rounded', name: 'Rounded' },
  { id: 'colorful', name: 'Colorful' },
  { id: 'shadow', name: 'Shadow' },
  { id: 'decorative', name: 'Decorative' },
  { id: 'vintage', name: 'Vintage' },
  { id: 'modern', name: 'Modern' },
  { id: 'seasonal', name: 'Seasonal' },
  { id: 'baby', name: 'Baby' },
  { id: 'wedding', name: 'Wedding' },
];

export default function PageBordersBrowser({ onSelectBorder, onApplyBorder }: PageBordersBrowserProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Filter borders
  const filteredBorders = useMemo(() => {
    return PAGE_BORDERS.filter(border => {
      const matchesSearch = searchQuery === '' || 
        border.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        border.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesCategory = selectedCategory === 'all' || border.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  // Generate CSS styles from border
  const getBorderStyles = (border: PageBorder): React.CSSProperties => ({
    borderStyle: border.borderStyle,
    borderWidth: border.borderWidth,
    borderColor: border.borderColor,
    borderRadius: border.borderRadius,
    boxShadow: border.boxShadow,
    background: border.background,
  });

  // Handle border selection
  const handleBorderSelect = (border: PageBorder) => {
    onSelectBorder?.(border);
    onApplyBorder?.(getBorderStyles(border));
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b bg-gradient-to-r from-slate-50 to-gray-50">
        <div className="flex items-center gap-2 mb-3">
          <div className="p-2 bg-gradient-to-br from-slate-500 to-gray-600 rounded-lg">
            <Square className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Page Borders</h3>
            <p className="text-xs text-gray-500">{filteredBorders.length} decorative borders</p>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search borders..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-white border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-500"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="p-2 border-b overflow-x-auto">
        <div className="flex gap-1">
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                selectedCategory === cat.id
                  ? 'bg-slate-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Borders Grid */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="grid grid-cols-2 gap-3">
          {filteredBorders.map(border => (
            <button
              key={border.id}
              onClick={() => handleBorderSelect(border)}
              className="group p-2 rounded-lg hover:bg-gray-50 transition-all"
            >
              {/* Border Preview */}
              <div 
                className="aspect-square mb-2 bg-white flex items-center justify-center"
                style={getBorderStyles(border)}
              >
                <Sparkles className="w-6 h-6 text-gray-300 group-hover:text-gray-400 transition-colors" />
              </div>
              
              {/* Border Name */}
              <p className="text-xs font-medium text-gray-700 text-center truncate">
                {border.name}
              </p>
            </button>
          ))}
        </div>

        {filteredBorders.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <Square className="w-12 h-12 mx-auto mb-2 opacity-30" />
            <p className="text-sm">No borders found</p>
          </div>
        )}
      </div>
    </div>
  );
}
