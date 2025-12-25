// components/editor/ClipArtBrowser.tsx
// Clip Art & Illustrations Browser
// Timestamp: Tuesday, December 24, 2025 – 4:00 PM Eastern Time
// CR AudioViz AI - "Your Story. Our Design"

'use client';

import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Palette,
  Heart,
  Star,
  Sun,
  Moon,
  Cloud,
  Flower2,
  TreePine,
  Gift,
  Cake,
  Baby,
  Plane,
  Car,
  Home,
  Music,
  Camera,
  Book,
  Coffee,
  Pizza,
  IceCream,
  Bird,
  Fish,
  Cat,
  Dog,
  Rabbit,
  Crown,
  Sparkles,
  Rainbow,
  Umbrella,
  Snowflake,
  Leaf,
  Apple
} from 'lucide-react';

interface ClipArt {
  id: string;
  name: string;
  category: string;
  svg: string;
  colors: string[];
  tags: string[];
}

interface ClipArtBrowserProps {
  onSelect?: (clipArt: ClipArt) => void;
  onAddToCanvas?: (svg: string, name: string) => void;
}

// Generate SVG clip art
const generateClipArt = (icon: string, colors: string[]): string => {
  // Simple SVG wrapper - in production these would be detailed illustrations
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <circle cx="50" cy="50" r="45" fill="${colors[0]}" opacity="0.2"/>
    <text x="50" y="60" text-anchor="middle" font-size="40">${icon}</text>
  </svg>`;
};

// Clip art library
const CLIP_ART_LIBRARY: ClipArt[] = [
  // LOVE & ROMANCE
  { id: 'heart-red', name: 'Red Heart', category: 'love', svg: '❤️', colors: ['#DC2626'], tags: ['love', 'valentine', 'heart'] },
  { id: 'heart-pink', name: 'Pink Heart', category: 'love', svg: '💗', colors: ['#EC4899'], tags: ['love', 'cute', 'heart'] },
  { id: 'heart-sparkling', name: 'Sparkling Heart', category: 'love', svg: '💖', colors: ['#F472B6'], tags: ['love', 'sparkle'] },
  { id: 'heart-arrow', name: 'Heart Arrow', category: 'love', svg: '💘', colors: ['#EC4899'], tags: ['cupid', 'valentine'] },
  { id: 'kiss', name: 'Kiss', category: 'love', svg: '💋', colors: ['#DC2626'], tags: ['kiss', 'lips'] },
  { id: 'ring', name: 'Ring', category: 'love', svg: '💍', colors: ['#FCD34D'], tags: ['wedding', 'engagement'] },
  { id: 'rose', name: 'Rose', category: 'love', svg: '🌹', colors: ['#DC2626'], tags: ['flower', 'romantic'] },
  
  // CELEBRATION
  { id: 'balloon-red', name: 'Red Balloon', category: 'celebration', svg: '🎈', colors: ['#DC2626'], tags: ['party', 'birthday'] },
  { id: 'confetti', name: 'Confetti', category: 'celebration', svg: '🎊', colors: ['#FCD34D'], tags: ['party', 'celebration'] },
  { id: 'party-popper', name: 'Party Popper', category: 'celebration', svg: '🎉', colors: ['#F59E0B'], tags: ['party', 'celebration'] },
  { id: 'gift', name: 'Gift Box', category: 'celebration', svg: '🎁', colors: ['#DC2626'], tags: ['present', 'birthday'] },
  { id: 'cake', name: 'Birthday Cake', category: 'celebration', svg: '🎂', colors: ['#EC4899'], tags: ['birthday', 'cake'] },
  { id: 'trophy', name: 'Trophy', category: 'celebration', svg: '🏆', colors: ['#FCD34D'], tags: ['winner', 'award'] },
  { id: 'medal', name: 'Medal', category: 'celebration', svg: '🥇', colors: ['#FCD34D'], tags: ['winner', 'first'] },
  { id: 'crown', name: 'Crown', category: 'celebration', svg: '👑', colors: ['#FCD34D'], tags: ['royal', 'king'] },

  // NATURE
  { id: 'sun', name: 'Sun', category: 'nature', svg: '☀️', colors: ['#FCD34D'], tags: ['sunny', 'summer'] },
  { id: 'moon', name: 'Moon', category: 'nature', svg: '🌙', colors: ['#FCD34D'], tags: ['night', 'lunar'] },
  { id: 'star', name: 'Star', category: 'nature', svg: '⭐', colors: ['#FCD34D'], tags: ['star', 'shine'] },
  { id: 'rainbow', name: 'Rainbow', category: 'nature', svg: '🌈', colors: ['#EC4899'], tags: ['colorful', 'hope'] },
  { id: 'cloud', name: 'Cloud', category: 'nature', svg: '☁️', colors: ['#E5E7EB'], tags: ['sky', 'weather'] },
  { id: 'snowflake', name: 'Snowflake', category: 'nature', svg: '❄️', colors: ['#60A5FA'], tags: ['winter', 'snow'] },
  { id: 'rain', name: 'Rain', category: 'nature', svg: '🌧️', colors: ['#3B82F6'], tags: ['weather', 'rain'] },
  { id: 'lightning', name: 'Lightning', category: 'nature', svg: '⚡', colors: ['#FCD34D'], tags: ['storm', 'power'] },

  // PLANTS & FLOWERS
  { id: 'flower-cherry', name: 'Cherry Blossom', category: 'plants', svg: '🌸', colors: ['#F9A8D4'], tags: ['flower', 'spring'] },
  { id: 'flower-sunflower', name: 'Sunflower', category: 'plants', svg: '🌻', colors: ['#FCD34D'], tags: ['flower', 'summer'] },
  { id: 'flower-tulip', name: 'Tulip', category: 'plants', svg: '🌷', colors: ['#F472B6'], tags: ['flower', 'spring'] },
  { id: 'flower-rose', name: 'Rose', category: 'plants', svg: '🌹', colors: ['#DC2626'], tags: ['flower', 'romantic'] },
  { id: 'leaf-maple', name: 'Maple Leaf', category: 'plants', svg: '🍁', colors: ['#F97316'], tags: ['autumn', 'fall'] },
  { id: 'leaf-fallen', name: 'Fallen Leaf', category: 'plants', svg: '🍂', colors: ['#92400E'], tags: ['autumn', 'fall'] },
  { id: 'tree-pine', name: 'Pine Tree', category: 'plants', svg: '🌲', colors: ['#166534'], tags: ['christmas', 'forest'] },
  { id: 'clover', name: 'Clover', category: 'plants', svg: '☘️', colors: ['#22C55E'], tags: ['luck', 'irish'] },
  { id: 'cactus', name: 'Cactus', category: 'plants', svg: '🌵', colors: ['#22C55E'], tags: ['desert', 'plant'] },

  // ANIMALS
  { id: 'butterfly', name: 'Butterfly', category: 'animals', svg: '🦋', colors: ['#3B82F6'], tags: ['insect', 'spring'] },
  { id: 'bee', name: 'Bee', category: 'animals', svg: '🐝', colors: ['#FCD34D'], tags: ['insect', 'honey'] },
  { id: 'ladybug', name: 'Ladybug', category: 'animals', svg: '🐞', colors: ['#DC2626'], tags: ['insect', 'luck'] },
  { id: 'bird', name: 'Bird', category: 'animals', svg: '🐦', colors: ['#3B82F6'], tags: ['bird', 'fly'] },
  { id: 'cat', name: 'Cat', category: 'animals', svg: '🐱', colors: ['#F97316'], tags: ['pet', 'cat'] },
  { id: 'dog', name: 'Dog', category: 'animals', svg: '🐶', colors: ['#92400E'], tags: ['pet', 'dog'] },
  { id: 'bunny', name: 'Bunny', category: 'animals', svg: '🐰', colors: ['#FAFAFA'], tags: ['easter', 'rabbit'] },
  { id: 'paw', name: 'Paw Print', category: 'animals', svg: '🐾', colors: ['#78350F'], tags: ['pet', 'animal'] },
  { id: 'fish', name: 'Fish', category: 'animals', svg: '🐟', colors: ['#3B82F6'], tags: ['sea', 'ocean'] },
  { id: 'turtle', name: 'Turtle', category: 'animals', svg: '🐢', colors: ['#22C55E'], tags: ['slow', 'shell'] },
  { id: 'unicorn', name: 'Unicorn', category: 'animals', svg: '🦄', colors: ['#A855F7'], tags: ['magical', 'fantasy'] },

  // FOOD
  { id: 'cupcake', name: 'Cupcake', category: 'food', svg: '🧁', colors: ['#F9A8D4'], tags: ['dessert', 'sweet'] },
  { id: 'ice-cream', name: 'Ice Cream', category: 'food', svg: '🍦', colors: ['#FDE68A'], tags: ['dessert', 'summer'] },
  { id: 'cookie', name: 'Cookie', category: 'food', svg: '🍪', colors: ['#D4A574'], tags: ['sweet', 'baking'] },
  { id: 'candy', name: 'Candy', category: 'food', svg: '🍬', colors: ['#EC4899'], tags: ['sweet', 'treat'] },
  { id: 'lollipop', name: 'Lollipop', category: 'food', svg: '🍭', colors: ['#EC4899'], tags: ['candy', 'sweet'] },
  { id: 'pizza', name: 'Pizza', category: 'food', svg: '🍕', colors: ['#F97316'], tags: ['food', 'italian'] },
  { id: 'apple', name: 'Apple', category: 'food', svg: '🍎', colors: ['#DC2626'], tags: ['fruit', 'healthy'] },
  { id: 'strawberry', name: 'Strawberry', category: 'food', svg: '🍓', colors: ['#DC2626'], tags: ['fruit', 'sweet'] },
  { id: 'coffee', name: 'Coffee', category: 'food', svg: '☕', colors: ['#78350F'], tags: ['drink', 'cafe'] },

  // TRAVEL
  { id: 'airplane', name: 'Airplane', category: 'travel', svg: '✈️', colors: ['#6B7280'], tags: ['travel', 'fly'] },
  { id: 'car', name: 'Car', category: 'travel', svg: '🚗', colors: ['#DC2626'], tags: ['drive', 'road'] },
  { id: 'boat', name: 'Boat', category: 'travel', svg: '⛵', colors: ['#FAFAFA'], tags: ['sail', 'ocean'] },
  { id: 'compass', name: 'Compass', category: 'travel', svg: '🧭', colors: ['#78350F'], tags: ['navigate', 'explore'] },
  { id: 'world', name: 'Globe', category: 'travel', svg: '🌍', colors: ['#22C55E'], tags: ['world', 'earth'] },
  { id: 'camera', name: 'Camera', category: 'travel', svg: '📷', colors: ['#1F2937'], tags: ['photo', 'memory'] },
  { id: 'suitcase', name: 'Suitcase', category: 'travel', svg: '🧳', colors: ['#92400E'], tags: ['luggage', 'trip'] },
  { id: 'beach', name: 'Beach', category: 'travel', svg: '🏖️', colors: ['#FDE68A'], tags: ['vacation', 'summer'] },
  { id: 'mountain', name: 'Mountain', category: 'travel', svg: '⛰️', colors: ['#6B7280'], tags: ['hiking', 'nature'] },
  { id: 'tent', name: 'Tent', category: 'travel', svg: '⛺', colors: ['#F97316'], tags: ['camping', 'outdoor'] },

  // BABY
  { id: 'baby-face', name: 'Baby Face', category: 'baby', svg: '👶', colors: ['#FDE68A'], tags: ['baby', 'newborn'] },
  { id: 'bottle', name: 'Baby Bottle', category: 'baby', svg: '🍼', colors: ['#FAFAFA'], tags: ['baby', 'feeding'] },
  { id: 'stroller', name: 'Stroller', category: 'baby', svg: '🚼', colors: ['#60A5FA'], tags: ['baby', 'walk'] },
  { id: 'rattle', name: 'Rattle', category: 'baby', svg: '🎀', colors: ['#F9A8D4'], tags: ['baby', 'toy'] },
  { id: 'teddy', name: 'Teddy Bear', category: 'baby', svg: '🧸', colors: ['#D4A574'], tags: ['toy', 'cute'] },
  { id: 'footprints', name: 'Baby Footprints', category: 'baby', svg: '👣', colors: ['#FDE68A'], tags: ['baby', 'feet'] },

  // HOLIDAYS
  { id: 'christmas-tree', name: 'Christmas Tree', category: 'holiday', svg: '🎄', colors: ['#166534'], tags: ['christmas', 'tree'] },
  { id: 'santa', name: 'Santa', category: 'holiday', svg: '🎅', colors: ['#DC2626'], tags: ['christmas', 'santa'] },
  { id: 'snowman', name: 'Snowman', category: 'holiday', svg: '⛄', colors: ['#FAFAFA'], tags: ['winter', 'christmas'] },
  { id: 'pumpkin', name: 'Pumpkin', category: 'holiday', svg: '🎃', colors: ['#F97316'], tags: ['halloween', 'fall'] },
  { id: 'ghost', name: 'Ghost', category: 'holiday', svg: '👻', colors: ['#FAFAFA'], tags: ['halloween', 'spooky'] },
  { id: 'turkey', name: 'Turkey', category: 'holiday', svg: '🦃', colors: ['#92400E'], tags: ['thanksgiving'] },
  { id: 'egg', name: 'Easter Egg', category: 'holiday', svg: '🥚', colors: ['#FDE68A'], tags: ['easter', 'spring'] },
  { id: 'fireworks', name: 'Fireworks', category: 'holiday', svg: '🎆', colors: ['#FCD34D'], tags: ['celebration', 'new year'] },
  { id: 'shamrock', name: 'Shamrock', category: 'holiday', svg: '☘️', colors: ['#22C55E'], tags: ['irish', 'luck'] },

  // SCHOOL
  { id: 'book', name: 'Book', category: 'school', svg: '📚', colors: ['#DC2626'], tags: ['read', 'study'] },
  { id: 'pencil', name: 'Pencil', category: 'school', svg: '✏️', colors: ['#FCD34D'], tags: ['write', 'draw'] },
  { id: 'backpack', name: 'Backpack', category: 'school', svg: '🎒', colors: ['#DC2626'], tags: ['school', 'bag'] },
  { id: 'graduation', name: 'Graduation Cap', category: 'school', svg: '🎓', colors: ['#1F2937'], tags: ['graduate', 'achievement'] },
  { id: 'bus', name: 'School Bus', category: 'school', svg: '🚌', colors: ['#FCD34D'], tags: ['school', 'transport'] },
  { id: 'apple-teacher', name: 'Teacher Apple', category: 'school', svg: '🍎', colors: ['#DC2626'], tags: ['teacher', 'school'] },

  // SPORTS
  { id: 'soccer', name: 'Soccer Ball', category: 'sports', svg: '⚽', colors: ['#FAFAFA'], tags: ['football', 'sport'] },
  { id: 'basketball', name: 'Basketball', category: 'sports', svg: '🏀', colors: ['#F97316'], tags: ['sport', 'ball'] },
  { id: 'baseball', name: 'Baseball', category: 'sports', svg: '⚾', colors: ['#FAFAFA'], tags: ['sport', 'ball'] },
  { id: 'tennis', name: 'Tennis', category: 'sports', svg: '🎾', colors: ['#22C55E'], tags: ['sport', 'ball'] },
  { id: 'swimming', name: 'Swimming', category: 'sports', svg: '🏊', colors: ['#3B82F6'], tags: ['sport', 'water'] },
  { id: 'bicycle', name: 'Bicycle', category: 'sports', svg: '🚴', colors: ['#DC2626'], tags: ['cycling', 'exercise'] },

  // MUSIC & ARTS
  { id: 'music-note', name: 'Music Note', category: 'arts', svg: '🎵', colors: ['#1F2937'], tags: ['music', 'song'] },
  { id: 'guitar', name: 'Guitar', category: 'arts', svg: '🎸', colors: ['#92400E'], tags: ['music', 'instrument'] },
  { id: 'palette', name: 'Art Palette', category: 'arts', svg: '🎨', colors: ['#F97316'], tags: ['art', 'paint'] },
  { id: 'microphone', name: 'Microphone', category: 'arts', svg: '🎤', colors: ['#6B7280'], tags: ['music', 'sing'] },
  { id: 'drama', name: 'Drama Masks', category: 'arts', svg: '🎭', colors: ['#FCD34D'], tags: ['theater', 'acting'] },
];

// Categories
const CATEGORIES = [
  { id: 'all', name: 'All' },
  { id: 'love', name: 'Love' },
  { id: 'celebration', name: 'Celebration' },
  { id: 'nature', name: 'Nature' },
  { id: 'plants', name: 'Plants' },
  { id: 'animals', name: 'Animals' },
  { id: 'food', name: 'Food' },
  { id: 'travel', name: 'Travel' },
  { id: 'baby', name: 'Baby' },
  { id: 'holiday', name: 'Holidays' },
  { id: 'school', name: 'School' },
  { id: 'sports', name: 'Sports' },
  { id: 'arts', name: 'Arts' },
];

export default function ClipArtBrowser({ onSelect, onAddToCanvas }: ClipArtBrowserProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Filter clip art
  const filteredClipArt = useMemo(() => {
    return CLIP_ART_LIBRARY.filter(art => {
      const matchesSearch = searchQuery === '' || 
        art.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        art.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesCategory = selectedCategory === 'all' || art.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  // Handle selection
  const handleSelect = (art: ClipArt) => {
    onSelect?.(art);
    onAddToCanvas?.(art.svg, art.name);
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b bg-gradient-to-r from-orange-50 to-amber-50">
        <div className="flex items-center gap-2 mb-3">
          <div className="p-2 bg-gradient-to-br from-orange-500 to-amber-500 rounded-lg">
            <Palette className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Clip Art</h3>
            <p className="text-xs text-gray-500">{filteredClipArt.length} illustrations</p>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search clip art..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-white border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
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
                  ? 'bg-orange-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Clip Art Grid */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="grid grid-cols-5 gap-2">
          {filteredClipArt.map(art => (
            <button
              key={art.id}
              onClick={() => handleSelect(art)}
              className="aspect-square flex items-center justify-center text-3xl p-2 rounded-lg border hover:border-orange-300 hover:bg-orange-50 transition-all"
              title={art.name}
            >
              {art.svg}
            </button>
          ))}
        </div>

        {filteredClipArt.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <Palette className="w-12 h-12 mx-auto mb-2 opacity-30" />
            <p className="text-sm">No clip art found</p>
          </div>
        )}
      </div>
    </div>
  );
}
