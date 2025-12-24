'use client';

import React, { useState, useMemo } from 'react';
import { Search, FileText, Palette, Layers } from 'lucide-react';

// Paper texture categories with CSS/SVG-based textures (no external dependencies)
const PAPER_TEXTURE_CATEGORIES = {
  'vintage': {
    name: 'Vintage Paper',
    icon: FileText,
    textures: [
      { id: 'vp-1', name: 'Aged Parchment', base: '#f5f0e1', noise: true, stains: true },
      { id: 'vp-2', name: 'Old Newspaper', base: '#f0ebe0', lines: true, yellowed: true },
      { id: 'vp-3', name: 'Antique Letter', base: '#faf6ed', creases: true, edges: true },
      { id: 'vp-4', name: 'Sepia Document', base: '#f4e9d5', sepia: true },
      { id: 'vp-5', name: 'Weathered Book', base: '#ede4d0', spots: true },
      { id: 'vp-6', name: 'Tea Stained', base: '#f0e2c8', stains: true },
      { id: 'vp-7', name: 'Burnt Edges', base: '#faf5eb', burnt: true },
      { id: 'vp-8', name: 'Crumpled Old', base: '#f5efe2', crumpled: true },
    ]
  },
  'watercolor': {
    name: 'Watercolor',
    icon: Palette,
    textures: [
      { id: 'wc-1', name: 'Soft Pink Wash', gradient: ['#fce7f3', '#fdf2f8', '#fff1f2'] },
      { id: 'wc-2', name: 'Ocean Blue Wash', gradient: ['#dbeafe', '#e0f2fe', '#f0f9ff'] },
      { id: 'wc-3', name: 'Sage Green Wash', gradient: ['#dcfce7', '#d1fae5', '#ecfdf5'] },
      { id: 'wc-4', name: 'Lavender Wash', gradient: ['#ede9fe', '#f3e8ff', '#faf5ff'] },
      { id: 'wc-5', name: 'Sunset Wash', gradient: ['#fef3c7', '#ffedd5', '#fff7ed'] },
      { id: 'wc-6', name: 'Rose Gold Wash', gradient: ['#fce7f3', '#fef3c7', '#fff7ed'] },
      { id: 'wc-7', name: 'Mint Wash', gradient: ['#d1fae5', '#cffafe', '#ecfeff'] },
      { id: 'wc-8', name: 'Blush Wash', gradient: ['#ffe4e6', '#fce7f3', '#fdf2f8'] },
      { id: 'wc-9', name: 'Sky Wash', gradient: ['#e0f2fe', '#dbeafe', '#eff6ff'] },
      { id: 'wc-10', name: 'Peach Wash', gradient: ['#ffedd5', '#fed7aa', '#fef3c7'] },
    ]
  },
  'kraft': {
    name: 'Kraft & Cardboard',
    icon: Layers,
    textures: [
      { id: 'kr-1', name: 'Brown Kraft', base: '#c4a574', fiber: true },
      { id: 'kr-2', name: 'Natural Kraft', base: '#d4b896', fiber: true },
      { id: 'kr-3', name: 'Dark Cardboard', base: '#8b7355', fiber: true, rough: true },
      { id: 'kr-4', name: 'Recycled Paper', base: '#bfae94', speckled: true },
      { id: 'kr-5', name: 'Manila Folder', base: '#f5deb3', smooth: true },
      { id: 'kr-6', name: 'Chipboard', base: '#9a8a6e', rough: true },
      { id: 'kr-7', name: 'Corrugated', base: '#c9b896', corrugated: true },
      { id: 'kr-8', name: 'Eco Kraft', base: '#d9c9a5', fiber: true, speckled: true },
    ]
  },
  'canvas': {
    name: 'Canvas & Linen',
    icon: Layers,
    textures: [
      { id: 'cv-1', name: 'Natural Canvas', base: '#f5f0e6', weave: 'canvas' },
      { id: 'cv-2', name: 'Linen White', base: '#faf8f5', weave: 'linen' },
      { id: 'cv-3', name: 'Burlap', base: '#d4c4a8', weave: 'burlap' },
      { id: 'cv-4', name: 'Cotton Canvas', base: '#f8f4ed', weave: 'canvas-fine' },
      { id: 'cv-5', name: 'Raw Canvas', base: '#e8dcc8', weave: 'canvas-rough' },
      { id: 'cv-6', name: 'Cream Linen', base: '#faf5eb', weave: 'linen' },
      { id: 'cv-7', name: 'Jute Texture', base: '#c9b896', weave: 'jute' },
      { id: 'cv-8', name: 'Muslin', base: '#f5f2ed', weave: 'muslin' },
    ]
  },
  'specialty': {
    name: 'Specialty Paper',
    icon: FileText,
    textures: [
      { id: 'sp-1', name: 'Rice Paper', base: '#fefdfb', translucent: true },
      { id: 'sp-2', name: 'Handmade Paper', base: '#f8f4eb', deckle: true, fiber: true },
      { id: 'sp-3', name: 'Mulberry Paper', base: '#faf6f0', fiber: true, organic: true },
      { id: 'sp-4', name: 'Washi Paper', base: '#fdfbf7', delicate: true },
      { id: 'sp-5', name: 'Vellum', base: '#fffef9', translucent: true, smooth: true },
      { id: 'sp-6', name: 'Tissue Paper', base: '#fefefe', crinkled: true },
      { id: 'sp-7', name: 'Tracing Paper', base: '#f8f8f8', translucent: true },
      { id: 'sp-8', name: 'Petal Paper', base: '#fdf2f8', organic: true, petals: true },
    ]
  },
  'grunge': {
    name: 'Grunge & Distressed',
    icon: Layers,
    textures: [
      { id: 'gr-1', name: 'Heavy Grunge', base: '#e5ddd0', scratches: true, stains: true },
      { id: 'gr-2', name: 'Distressed White', base: '#f5f2ed', distressed: true },
      { id: 'gr-3', name: 'Urban Grit', base: '#d8d0c4', gritty: true },
      { id: 'gr-4', name: 'Worn Paper', base: '#efe8dc', worn: true, faded: true },
      { id: 'gr-5', name: 'Ink Splatter', base: '#faf8f5', splatter: true },
      { id: 'gr-6', name: 'Coffee Stained', base: '#f0e6d8', coffee: true },
      { id: 'gr-7', name: 'Torn Edges', base: '#f5f0e8', torn: true },
      { id: 'gr-8', name: 'Paint Splatter', base: '#faf6f0', paint: true },
    ]
  },
  'pastel': {
    name: 'Pastel Solids',
    icon: Palette,
    textures: [
      { id: 'ps-1', name: 'Baby Pink', base: '#fce7f3', solid: true },
      { id: 'ps-2', name: 'Sky Blue', base: '#dbeafe', solid: true },
      { id: 'ps-3', name: 'Mint Green', base: '#d1fae5', solid: true },
      { id: 'ps-4', name: 'Lavender', base: '#ede9fe', solid: true },
      { id: 'ps-5', name: 'Peach', base: '#fed7aa', solid: true },
      { id: 'ps-6', name: 'Lemon', base: '#fef9c3', solid: true },
      { id: 'ps-7', name: 'Coral', base: '#fecaca', solid: true },
      { id: 'ps-8', name: 'Lilac', base: '#f3e8ff', solid: true },
      { id: 'ps-9', name: 'Aqua', base: '#cffafe', solid: true },
      { id: 'ps-10', name: 'Blush', base: '#ffe4e6', solid: true },
      { id: 'ps-11', name: 'Cream', base: '#fefce8', solid: true },
      { id: 'ps-12', name: 'Rose', base: '#fce7f3', solid: true },
    ]
  },
  'patterned': {
    name: 'Patterned Paper',
    icon: Layers,
    textures: [
      { id: 'pt-1', name: 'Grid Paper', base: '#ffffff', pattern: 'grid' },
      { id: 'pt-2', name: 'Lined Paper', base: '#fffef9', pattern: 'lines' },
      { id: 'pt-3', name: 'Dot Grid', base: '#faf8f5', pattern: 'dots' },
      { id: 'pt-4', name: 'Graph Paper', base: '#f0fdf4', pattern: 'graph' },
      { id: 'pt-5', name: 'Music Sheet', base: '#fffbeb', pattern: 'music' },
      { id: 'pt-6', name: 'Ledger Paper', base: '#ecfeff', pattern: 'ledger' },
      { id: 'pt-7', name: 'Blueprint', base: '#1e3a5f', pattern: 'blueprint' },
      { id: 'pt-8', name: 'Notebook', base: '#fef3c7', pattern: 'notebook' },
    ]
  },
};

// Generate SVG texture patterns
function generateTextureStyle(texture: any): React.CSSProperties {
  const base = texture.base;
  let backgroundImage = '';
  let filter = '';
  
  // Noise/grain effect
  if (texture.noise) {
    backgroundImage = `url("data:image/svg+xml,${encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200">
        <defs>
          <filter id="noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4"/>
            <feColorMatrix type="saturate" values="0"/>
            <feComponentTransfer><feFuncA type="linear" slope="0.1"/></feComponentTransfer>
          </filter>
        </defs>
        <rect width="200" height="200" fill="${base}"/>
        <rect width="200" height="200" filter="url(#noise)"/>
      </svg>
    `)}")`;
  }
  
  // Stains
  if (texture.stains) {
    backgroundImage = `url("data:image/svg+xml,${encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" width="300" height="300">
        <rect width="300" height="300" fill="${base}"/>
        <ellipse cx="80" cy="100" rx="40" ry="30" fill="rgba(180,150,100,0.1)" transform="rotate(15,80,100)"/>
        <ellipse cx="220" cy="180" rx="35" ry="25" fill="rgba(160,130,80,0.08)" transform="rotate(-20,220,180)"/>
        <ellipse cx="150" cy="250" rx="45" ry="30" fill="rgba(170,140,90,0.07)" transform="rotate(10,150,250)"/>
      </svg>
    `)}")`;
  }
  
  // Fiber texture (for kraft paper)
  if (texture.fiber) {
    backgroundImage = `url("data:image/svg+xml,${encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100">
        <rect width="100" height="100" fill="${base}"/>
        <line x1="0" y1="20" x2="30" y2="25" stroke="rgba(0,0,0,0.05)" stroke-width="0.5"/>
        <line x1="50" y1="10" x2="80" y2="15" stroke="rgba(0,0,0,0.04)" stroke-width="0.5"/>
        <line x1="20" y1="60" x2="60" y2="65" stroke="rgba(0,0,0,0.05)" stroke-width="0.5"/>
        <line x1="70" y1="80" x2="100" y2="85" stroke="rgba(0,0,0,0.04)" stroke-width="0.5"/>
      </svg>
    `)}")`;
  }
  
  // Weave patterns
  if (texture.weave === 'canvas') {
    backgroundImage = `url("data:image/svg+xml,${encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8">
        <rect width="8" height="8" fill="${base}"/>
        <rect x="0" y="0" width="4" height="4" fill="rgba(0,0,0,0.03)"/>
        <rect x="4" y="4" width="4" height="4" fill="rgba(0,0,0,0.03)"/>
      </svg>
    `)}")`;
  }
  
  if (texture.weave === 'linen') {
    backgroundImage = `url("data:image/svg+xml,${encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" width="6" height="6">
        <rect width="6" height="6" fill="${base}"/>
        <line x1="0" y1="3" x2="6" y2="3" stroke="rgba(0,0,0,0.04)" stroke-width="0.5"/>
        <line x1="3" y1="0" x2="3" y2="6" stroke="rgba(0,0,0,0.04)" stroke-width="0.5"/>
      </svg>
    `)}")`;
  }
  
  // Watercolor gradient
  if (texture.gradient) {
    const colors = texture.gradient;
    backgroundImage = `
      radial-gradient(ellipse at 20% 30%, ${colors[0]} 0%, transparent 50%),
      radial-gradient(ellipse at 80% 70%, ${colors[1]} 0%, transparent 50%),
      radial-gradient(ellipse at 50% 50%, ${colors[2]} 0%, transparent 60%),
      linear-gradient(135deg, ${colors[0]} 0%, ${colors[2]} 100%)
    `;
  }
  
  // Pattern-based textures
  if (texture.pattern === 'grid') {
    backgroundImage = `url("data:image/svg+xml,${encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20">
        <rect width="20" height="20" fill="${base}"/>
        <path d="M20,0 L20,20 M0,20 L20,20" stroke="#e5e7eb" stroke-width="0.5" fill="none"/>
      </svg>
    `)}")`;
  }
  
  if (texture.pattern === 'lines') {
    backgroundImage = `url("data:image/svg+xml,${encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30">
        <rect width="30" height="30" fill="${base}"/>
        <line x1="0" y1="29" x2="30" y2="29" stroke="#93c5fd" stroke-width="0.5"/>
      </svg>
    `)}")`;
  }
  
  if (texture.pattern === 'dots') {
    backgroundImage = `url("data:image/svg+xml,${encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20">
        <rect width="20" height="20" fill="${base}"/>
        <circle cx="10" cy="10" r="0.8" fill="#d1d5db"/>
      </svg>
    `)}")`;
  }
  
  if (texture.pattern === 'graph') {
    backgroundImage = `url("data:image/svg+xml,${encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20">
        <rect width="20" height="20" fill="${base}"/>
        <path d="M20,0 L20,20 M0,20 L20,20" stroke="#86efac" stroke-width="0.5" fill="none"/>
      </svg>
    `)}")`;
  }
  
  if (texture.pattern === 'blueprint') {
    backgroundImage = `url("data:image/svg+xml,${encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40">
        <rect width="40" height="40" fill="${base}"/>
        <path d="M40,0 L40,40 M0,40 L40,40" stroke="#3b82f6" stroke-width="0.3" fill="none"/>
        <path d="M20,0 L20,40 M0,20 L40,20" stroke="#3b82f6" stroke-width="0.15" fill="none"/>
      </svg>
    `)}")`;
  }
  
  // Solid colors with subtle texture
  if (texture.solid) {
    backgroundImage = `url("data:image/svg+xml,${encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100">
        <defs>
          <filter id="subtle">
            <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3"/>
            <feColorMatrix type="saturate" values="0"/>
            <feComponentTransfer><feFuncA type="linear" slope="0.02"/></feComponentTransfer>
          </filter>
        </defs>
        <rect width="100" height="100" fill="${base}"/>
        <rect width="100" height="100" filter="url(#subtle)"/>
      </svg>
    `)}")`;
  }
  
  // Fallback to solid color if no special pattern
  if (!backgroundImage) {
    return { backgroundColor: base };
  }
  
  return {
    backgroundImage,
    backgroundSize: texture.gradient ? 'cover' : 'auto',
    backgroundRepeat: texture.gradient ? 'no-repeat' : 'repeat',
  };
}

interface PaperTexturesBrowserProps {
  onSelectTexture?: (texture: { id: string; name: string; css: React.CSSProperties }) => void;
}

export function PaperTexturesBrowser({ onSelectTexture }: PaperTexturesBrowserProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('vintage');

  const filteredTextures = useMemo(() => {
    const category = PAPER_TEXTURE_CATEGORIES[selectedCategory as keyof typeof PAPER_TEXTURE_CATEGORIES];
    if (!category) return [];
    
    if (!searchTerm) return category.textures;
    
    return category.textures.filter(texture =>
      texture.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [selectedCategory, searchTerm]);

  const handleSelectTexture = (texture: any) => {
    onSelectTexture?.({
      id: texture.id,
      name: texture.name,
      css: generateTextureStyle(texture),
    });
  };

  const totalTextures = Object.values(PAPER_TEXTURE_CATEGORIES).reduce(
    (acc, cat) => acc + cat.textures.length, 0
  );

  return (
    <div className="flex flex-col h-full bg-gray-900 text-white">
      {/* Header */}
      <div className="p-3 border-b border-gray-700">
        <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
          <FileText className="w-5 h-5 text-amber-400" />
          Paper Textures
        </h3>
        
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search paper textures..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-sm focus:outline-none focus:border-amber-500"
          />
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex overflow-x-auto p-2 gap-1 border-b border-gray-700">
        {Object.entries(PAPER_TEXTURE_CATEGORIES).map(([key, category]) => {
          const Icon = category.icon;
          return (
            <button
              key={key}
              onClick={() => setSelectedCategory(key)}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs whitespace-nowrap transition-colors ${
                selectedCategory === key
                  ? 'bg-amber-600 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {category.name}
            </button>
          );
        })}
      </div>

      {/* Texture Grid */}
      <div className="flex-1 overflow-y-auto p-3">
        <div className="grid grid-cols-2 gap-3">
          {filteredTextures.map((texture) => (
            <button
              key={texture.id}
              onClick={() => handleSelectTexture(texture)}
              className="group relative aspect-[4/3] rounded-lg overflow-hidden border-2 border-gray-700 hover:border-amber-500 transition-colors"
            >
              {/* Texture Preview */}
              <div
                className="absolute inset-0"
                style={generateTextureStyle(texture)}
              />
              
              {/* Label */}
              <div className="absolute bottom-0 left-0 right-0 bg-black/70 px-2 py-1.5">
                <p className="text-xs truncate text-center">{texture.name}</p>
              </div>
            </button>
          ))}
        </div>
        
        {filteredTextures.length === 0 && (
          <div className="text-center text-gray-500 py-8">
            No textures found
          </div>
        )}
      </div>

      {/* Footer Stats */}
      <div className="p-2 border-t border-gray-700 text-center text-xs text-gray-500">
        {totalTextures} textures • 8 categories • 100% Free
      </div>
    </div>
  );
}

export default PaperTexturesBrowser;
