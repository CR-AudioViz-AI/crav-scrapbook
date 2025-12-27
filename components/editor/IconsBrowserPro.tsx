// components/editor/IconsBrowserPro.tsx
// Icons Browser with verified Lucide icons
// Timestamp: Tuesday, December 24, 2025 – 5:10 PM Eastern Time
// CR AudioViz AI - "Your Story. Our Design"

'use client';

import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Shapes,
  Heart, 
  Star, 
  Home, 
  User, 
  Mail, 
  Phone, 
  Camera, 
  Music,
  Sun,
  Moon,
  Cloud,
  Gift,
  Cake,
  Baby,
  Plane,
  Car,
  Bike,
  Train,
  Ship,
  Anchor,
  Compass,
  Map,
  MapPin,
  Globe,
  Flag,
  Trophy,
  Award,
  Crown,
  Sparkles,
  Zap,
  Flame,
  Snowflake,
  Umbrella,
  Trees,
  Leaf,
  Apple,
  Coffee,
  Pizza,
  Palette,
  Pencil,
  Scissors,
  Book,
  BookOpen,
  GraduationCap,
  Briefcase,
  Building,
  Landmark,
  Tent,
  Mountain,
  Fish,
  Bird,
  Bug,
  Cat,
  Dog,
  Smile,
  Frown,
  Meh,
  ThumbsUp,
  ThumbsDown,
  Bell,
  Calendar,
  Clock,
  Timer,
  AlarmClock,
  Check,
  X,
  Plus,
  Minus,
  ArrowRight,
  ArrowLeft,
  ArrowUp,
  ArrowDown,
  RefreshCw,
  RotateCw,
  Shuffle,
  Play,
  Pause,
  Square,
  Circle,
  Triangle,
  Hexagon,
  Octagon,
  Pentagon,
  Diamond,
  Settings,
  Wrench,
  Key,
  Lock,
  Unlock,
  Eye,
  EyeOff,
  Search as SearchIcon,
  Filter,
  Download,
  Upload,
  Share,
  Link,
  Bookmark,
  Tag,
  Folder,
  File,
  Image,
  Video,
  Mic,
  Volume2,
  Wifi,
  Bluetooth,
  Battery,
  Cpu,
  Monitor,
  Smartphone,
  Tablet,
  Printer,
  Keyboard
} from 'lucide-react';

interface IconItem {
  id: string;
  name: string;
  category: string;
  icon: React.ComponentType<{ className?: string }>;
  tags: string[];
}

interface IconsBrowserProProps {
  onSelectIcon?: (icon: IconItem) => void;
  onAddToCanvas?: (iconName: string) => void;
}

// Icon library with verified lucide-react icons
const ICONS_LIBRARY: IconItem[] = [
  // BASIC
  { id: 'heart', name: 'Heart', category: 'basic', icon: Heart, tags: ['love', 'favorite'] },
  { id: 'star', name: 'Star', category: 'basic', icon: Star, tags: ['rating', 'favorite'] },
  { id: 'home', name: 'Home', category: 'basic', icon: Home, tags: ['house', 'building'] },
  { id: 'user', name: 'User', category: 'basic', icon: User, tags: ['person', 'profile'] },
  { id: 'mail', name: 'Mail', category: 'basic', icon: Mail, tags: ['email', 'envelope'] },
  { id: 'phone', name: 'Phone', category: 'basic', icon: Phone, tags: ['call', 'mobile'] },
  { id: 'camera', name: 'Camera', category: 'basic', icon: Camera, tags: ['photo', 'picture'] },
  { id: 'music', name: 'Music', category: 'basic', icon: Music, tags: ['audio', 'song'] },

  // NATURE
  { id: 'sun', name: 'Sun', category: 'nature', icon: Sun, tags: ['sunny', 'day'] },
  { id: 'moon', name: 'Moon', category: 'nature', icon: Moon, tags: ['night', 'dark'] },
  { id: 'cloud', name: 'Cloud', category: 'nature', icon: Cloud, tags: ['weather', 'sky'] },
  { id: 'snowflake', name: 'Snowflake', category: 'nature', icon: Snowflake, tags: ['winter', 'cold'] },
  { id: 'umbrella', name: 'Umbrella', category: 'nature', icon: Umbrella, tags: ['rain', 'weather'] },
  { id: 'trees', name: 'Trees', category: 'nature', icon: Trees, tags: ['forest', 'nature'] },
  { id: 'leaf', name: 'Leaf', category: 'nature', icon: Leaf, tags: ['plant', 'nature'] },
  { id: 'mountain', name: 'Mountain', category: 'nature', icon: Mountain, tags: ['hiking', 'outdoor'] },
  { id: 'flame', name: 'Flame', category: 'nature', icon: Flame, tags: ['fire', 'hot'] },
  { id: 'zap', name: 'Zap', category: 'nature', icon: Zap, tags: ['lightning', 'energy'] },

  // CELEBRATION
  { id: 'gift', name: 'Gift', category: 'celebration', icon: Gift, tags: ['present', 'birthday'] },
  { id: 'cake', name: 'Cake', category: 'celebration', icon: Cake, tags: ['birthday', 'party'] },
  { id: 'sparkles', name: 'Sparkles', category: 'celebration', icon: Sparkles, tags: ['magic', 'special'] },
  { id: 'crown', name: 'Crown', category: 'celebration', icon: Crown, tags: ['royal', 'king'] },
  { id: 'trophy', name: 'Trophy', category: 'celebration', icon: Trophy, tags: ['winner', 'prize'] },
  { id: 'award', name: 'Award', category: 'celebration', icon: Award, tags: ['medal', 'prize'] },
  { id: 'baby', name: 'Baby', category: 'celebration', icon: Baby, tags: ['newborn', 'child'] },
  { id: 'bell', name: 'Bell', category: 'celebration', icon: Bell, tags: ['ring', 'notification'] },

  // TRAVEL
  { id: 'plane', name: 'Plane', category: 'travel', icon: Plane, tags: ['flight', 'airport'] },
  { id: 'car', name: 'Car', category: 'travel', icon: Car, tags: ['drive', 'vehicle'] },
  { id: 'bike', name: 'Bike', category: 'travel', icon: Bike, tags: ['bicycle', 'cycling'] },
  { id: 'train', name: 'Train', category: 'travel', icon: Train, tags: ['railway', 'transport'] },
  { id: 'ship', name: 'Ship', category: 'travel', icon: Ship, tags: ['boat', 'cruise'] },
  { id: 'anchor', name: 'Anchor', category: 'travel', icon: Anchor, tags: ['nautical', 'marine'] },
  { id: 'compass', name: 'Compass', category: 'travel', icon: Compass, tags: ['direction', 'navigate'] },
  { id: 'map', name: 'Map', category: 'travel', icon: Map, tags: ['navigation', 'location'] },
  { id: 'mappin', name: 'Map Pin', category: 'travel', icon: MapPin, tags: ['location', 'marker'] },
  { id: 'globe', name: 'Globe', category: 'travel', icon: Globe, tags: ['world', 'earth'] },
  { id: 'flag', name: 'Flag', category: 'travel', icon: Flag, tags: ['country', 'nation'] },
  { id: 'tent', name: 'Tent', category: 'travel', icon: Tent, tags: ['camping', 'outdoor'] },

  // FOOD
  { id: 'apple', name: 'Apple', category: 'food', icon: Apple, tags: ['fruit', 'healthy'] },
  { id: 'coffee', name: 'Coffee', category: 'food', icon: Coffee, tags: ['drink', 'cafe'] },
  { id: 'pizza', name: 'Pizza', category: 'food', icon: Pizza, tags: ['food', 'italian'] },

  // EDUCATION
  { id: 'book', name: 'Book', category: 'education', icon: Book, tags: ['read', 'study'] },
  { id: 'bookopen', name: 'Book Open', category: 'education', icon: BookOpen, tags: ['reading', 'learn'] },
  { id: 'graduationcap', name: 'Graduation', category: 'education', icon: GraduationCap, tags: ['school', 'degree'] },
  { id: 'pencil', name: 'Pencil', category: 'education', icon: Pencil, tags: ['write', 'draw'] },
  { id: 'scissors', name: 'Scissors', category: 'education', icon: Scissors, tags: ['cut', 'craft'] },

  // BUSINESS
  { id: 'briefcase', name: 'Briefcase', category: 'business', icon: Briefcase, tags: ['work', 'job'] },
  { id: 'building', name: 'Building', category: 'business', icon: Building, tags: ['office', 'company'] },
  { id: 'landmark', name: 'Landmark', category: 'business', icon: Landmark, tags: ['bank', 'government'] },
  { id: 'calendar', name: 'Calendar', category: 'business', icon: Calendar, tags: ['date', 'schedule'] },
  { id: 'clock', name: 'Clock', category: 'business', icon: Clock, tags: ['time', 'watch'] },

  // ANIMALS
  { id: 'fish', name: 'Fish', category: 'animals', icon: Fish, tags: ['sea', 'ocean'] },
  { id: 'bird', name: 'Bird', category: 'animals', icon: Bird, tags: ['fly', 'wing'] },
  { id: 'bug', name: 'Bug', category: 'animals', icon: Bug, tags: ['insect', 'beetle'] },
  { id: 'cat', name: 'Cat', category: 'animals', icon: Cat, tags: ['pet', 'feline'] },
  { id: 'dog', name: 'Dog', category: 'animals', icon: Dog, tags: ['pet', 'canine'] },

  // SHAPES
  { id: 'circle', name: 'Circle', category: 'shapes', icon: Circle, tags: ['round', 'shape'] },
  { id: 'square', name: 'Square', category: 'shapes', icon: Square, tags: ['box', 'shape'] },
  { id: 'triangle', name: 'Triangle', category: 'shapes', icon: Triangle, tags: ['three', 'shape'] },
  { id: 'hexagon', name: 'Hexagon', category: 'shapes', icon: Hexagon, tags: ['six', 'shape'] },
  { id: 'diamond', name: 'Diamond', category: 'shapes', icon: Diamond, tags: ['gem', 'shape'] },

  // EMOTIONS
  { id: 'smile', name: 'Smile', category: 'emotions', icon: Smile, tags: ['happy', 'face'] },
  { id: 'frown', name: 'Frown', category: 'emotions', icon: Frown, tags: ['sad', 'face'] },
  { id: 'meh', name: 'Meh', category: 'emotions', icon: Meh, tags: ['neutral', 'face'] },
  { id: 'thumbsup', name: 'Thumbs Up', category: 'emotions', icon: ThumbsUp, tags: ['like', 'approve'] },
  { id: 'thumbsdown', name: 'Thumbs Down', category: 'emotions', icon: ThumbsDown, tags: ['dislike', 'reject'] },

  // ACTIONS
  { id: 'check', name: 'Check', category: 'actions', icon: Check, tags: ['done', 'complete'] },
  { id: 'x', name: 'X', category: 'actions', icon: X, tags: ['close', 'cancel'] },
  { id: 'plus', name: 'Plus', category: 'actions', icon: Plus, tags: ['add', 'new'] },
  { id: 'minus', name: 'Minus', category: 'actions', icon: Minus, tags: ['remove', 'subtract'] },
  { id: 'download', name: 'Download', category: 'actions', icon: Download, tags: ['save', 'get'] },
  { id: 'upload', name: 'Upload', category: 'actions', icon: Upload, tags: ['send', 'share'] },
  { id: 'share', name: 'Share', category: 'actions', icon: Share, tags: ['social', 'send'] },
  { id: 'link', name: 'Link', category: 'actions', icon: Link, tags: ['url', 'connect'] },
  { id: 'bookmark', name: 'Bookmark', category: 'actions', icon: Bookmark, tags: ['save', 'mark'] },

  // TECH
  { id: 'settings', name: 'Settings', category: 'tech', icon: Settings, tags: ['gear', 'config'] },
  { id: 'wifi', name: 'WiFi', category: 'tech', icon: Wifi, tags: ['internet', 'wireless'] },
  { id: 'monitor', name: 'Monitor', category: 'tech', icon: Monitor, tags: ['screen', 'display'] },
  { id: 'smartphone', name: 'Smartphone', category: 'tech', icon: Smartphone, tags: ['phone', 'mobile'] },
];

// Categories
const CATEGORIES = [
  { id: 'all', name: 'All Icons' },
  { id: 'basic', name: 'Basic' },
  { id: 'nature', name: 'Nature' },
  { id: 'celebration', name: 'Celebration' },
  { id: 'travel', name: 'Travel' },
  { id: 'food', name: 'Food' },
  { id: 'education', name: 'Education' },
  { id: 'business', name: 'Business' },
  { id: 'animals', name: 'Animals' },
  { id: 'shapes', name: 'Shapes' },
  { id: 'emotions', name: 'Emotions' },
  { id: 'actions', name: 'Actions' },
  { id: 'tech', name: 'Tech' },
];

export default function IconsBrowserPro({ onSelectIcon, onAddToCanvas }: IconsBrowserProProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredIcons = useMemo(() => {
    return ICONS_LIBRARY.filter(icon => {
      const matchesSearch = searchQuery === '' || 
        icon.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        icon.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesCategory = selectedCategory === 'all' || icon.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const handleSelect = (iconItem: IconItem) => {
    onSelectIcon?.(iconItem);
    onAddToCanvas?.(iconItem.name);
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b bg-gradient-to-r from-indigo-50 to-purple-50">
        <div className="flex items-center gap-2 mb-3">
          <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg">
            <Shapes className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Icons</h3>
            <p className="text-xs text-gray-500">{filteredIcons.length} icons</p>
          </div>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search icons..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-white border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      <div className="p-2 border-b overflow-x-auto">
        <div className="flex gap-1">
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                selectedCategory === cat.id
                  ? 'bg-indigo-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <div className="grid grid-cols-4 gap-2">
          {filteredIcons.map(iconItem => {
            const Icon = iconItem.icon;
            return (
              <button
                key={iconItem.id}
                onClick={() => handleSelect(iconItem)}
                className="aspect-square flex flex-col items-center justify-center p-2 rounded-lg border hover:border-indigo-300 hover:bg-indigo-50 transition-all"
                title={iconItem.name}
              >
                <Icon className="w-6 h-6 text-gray-700" />
                <span className="text-[10px] text-gray-500 mt-1 truncate w-full text-center">
                  {iconItem.name}
                </span>
              </button>
            );
          })}
        </div>

        {filteredIcons.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <Shapes className="w-12 h-12 mx-auto mb-2 opacity-30" />
            <p className="text-sm">No icons found</p>
          </div>
        )}
      </div>
    </div>
  );
}

