// components/editor/PhotoMatsBrowser.tsx
// Photo Mats Browser - Decorative Photo Mats & Frames
// Timestamp: Tuesday, December 24, 2025 – 3:35 PM Eastern Time
// CR AudioViz AI - "Your Story. Our Design"

'use client';

import React, { useState, useMemo } from 'react';
import { Search, Frame, Image } from 'lucide-react';

interface PhotoMat {
  id: string;
  name: string;
  category: string;
  matColor: string;
  borderColor?: string;
  borderWidth: string;
  padding: string;
  shadow?: string;
  cornerStyle?: 'square' | 'rounded' | 'oval';
  texture?: string;
  tags: string[];
}

interface PhotoMatsBrowserProps {
  onSelectMat?: (mat: PhotoMat) => void;
  onApplyMat?: (matStyles: React.CSSProperties) => void;
}

// Comprehensive photo mat designs
const PHOTO_MATS: PhotoMat[] = [
  // CLASSIC MATS
  { id: 'white-classic', name: 'Classic White', category: 'classic', matColor: '#FFFFFF', borderWidth: '0', padding: '24px', shadow: '0 4px 6px rgba(0,0,0,0.1)', cornerStyle: 'square', tags: ['white', 'clean', 'simple'] },
  { id: 'cream-classic', name: 'Classic Cream', category: 'classic', matColor: '#FFFBEB', borderWidth: '0', padding: '24px', shadow: '0 4px 6px rgba(0,0,0,0.1)', cornerStyle: 'square', tags: ['cream', 'warm', 'classic'] },
  { id: 'ivory-classic', name: 'Classic Ivory', category: 'classic', matColor: '#FEFCE8', borderWidth: '0', padding: '24px', shadow: '0 4px 6px rgba(0,0,0,0.1)', cornerStyle: 'square', tags: ['ivory', 'elegant'] },
  { id: 'black-classic', name: 'Classic Black', category: 'classic', matColor: '#1F2937', borderWidth: '0', padding: '24px', shadow: '0 4px 6px rgba(0,0,0,0.2)', cornerStyle: 'square', tags: ['black', 'dramatic'] },
  { id: 'gray-classic', name: 'Classic Gray', category: 'classic', matColor: '#6B7280', borderWidth: '0', padding: '24px', shadow: '0 4px 6px rgba(0,0,0,0.1)', cornerStyle: 'square', tags: ['gray', 'neutral'] },

  // DOUBLE MATS
  { id: 'double-white-black', name: 'White & Black', category: 'double', matColor: '#FFFFFF', borderColor: '#1F2937', borderWidth: '4px', padding: '20px', shadow: '0 4px 6px rgba(0,0,0,0.1)', cornerStyle: 'square', tags: ['double', 'contrast'] },
  { id: 'double-cream-gold', name: 'Cream & Gold', category: 'double', matColor: '#FFFBEB', borderColor: '#D4AF37', borderWidth: '3px', padding: '20px', shadow: '0 4px 6px rgba(0,0,0,0.1)', cornerStyle: 'square', tags: ['double', 'gold', 'elegant'] },
  { id: 'double-black-gold', name: 'Black & Gold', category: 'double', matColor: '#1F2937', borderColor: '#D4AF37', borderWidth: '3px', padding: '20px', shadow: '0 4px 6px rgba(0,0,0,0.2)', cornerStyle: 'square', tags: ['double', 'luxury'] },
  { id: 'double-white-silver', name: 'White & Silver', category: 'double', matColor: '#FFFFFF', borderColor: '#C0C0C0', borderWidth: '3px', padding: '20px', shadow: '0 4px 6px rgba(0,0,0,0.1)', cornerStyle: 'square', tags: ['double', 'silver'] },
  { id: 'double-navy-gold', name: 'Navy & Gold', category: 'double', matColor: '#1E3A5F', borderColor: '#D4AF37', borderWidth: '3px', padding: '20px', shadow: '0 4px 6px rgba(0,0,0,0.15)', cornerStyle: 'square', tags: ['double', 'navy'] },

  // COLORFUL MATS
  { id: 'red-mat', name: 'Classic Red', category: 'colorful', matColor: '#DC2626', borderWidth: '0', padding: '20px', shadow: '0 4px 6px rgba(0,0,0,0.15)', cornerStyle: 'square', tags: ['red', 'bold'] },
  { id: 'blue-mat', name: 'Ocean Blue', category: 'colorful', matColor: '#3B82F6', borderWidth: '0', padding: '20px', shadow: '0 4px 6px rgba(0,0,0,0.15)', cornerStyle: 'square', tags: ['blue'] },
  { id: 'green-mat', name: 'Forest Green', category: 'colorful', matColor: '#166534', borderWidth: '0', padding: '20px', shadow: '0 4px 6px rgba(0,0,0,0.15)', cornerStyle: 'square', tags: ['green', 'nature'] },
  { id: 'purple-mat', name: 'Royal Purple', category: 'colorful', matColor: '#7C3AED', borderWidth: '0', padding: '20px', shadow: '0 4px 6px rgba(0,0,0,0.15)', cornerStyle: 'square', tags: ['purple', 'royal'] },
  { id: 'pink-mat', name: 'Pretty Pink', category: 'colorful', matColor: '#EC4899', borderWidth: '0', padding: '20px', shadow: '0 4px 6px rgba(0,0,0,0.15)', cornerStyle: 'square', tags: ['pink', 'feminine'] },
  { id: 'teal-mat', name: 'Teal', category: 'colorful', matColor: '#14B8A6', borderWidth: '0', padding: '20px', shadow: '0 4px 6px rgba(0,0,0,0.15)', cornerStyle: 'square', tags: ['teal', 'modern'] },
  { id: 'orange-mat', name: 'Sunset Orange', category: 'colorful', matColor: '#F97316', borderWidth: '0', padding: '20px', shadow: '0 4px 6px rgba(0,0,0,0.15)', cornerStyle: 'square', tags: ['orange', 'warm'] },
  { id: 'yellow-mat', name: 'Sunny Yellow', category: 'colorful', matColor: '#FBBF24', borderWidth: '0', padding: '20px', shadow: '0 4px 6px rgba(0,0,0,0.15)', cornerStyle: 'square', tags: ['yellow', 'bright'] },

  // PASTEL MATS
  { id: 'pastel-pink', name: 'Pastel Pink', category: 'pastel', matColor: '#FBCFE8', borderWidth: '0', padding: '24px', shadow: '0 2px 4px rgba(0,0,0,0.05)', cornerStyle: 'square', tags: ['pastel', 'pink', 'soft'] },
  { id: 'pastel-blue', name: 'Pastel Blue', category: 'pastel', matColor: '#BFDBFE', borderWidth: '0', padding: '24px', shadow: '0 2px 4px rgba(0,0,0,0.05)', cornerStyle: 'square', tags: ['pastel', 'blue', 'soft'] },
  { id: 'pastel-green', name: 'Pastel Green', category: 'pastel', matColor: '#BBF7D0', borderWidth: '0', padding: '24px', shadow: '0 2px 4px rgba(0,0,0,0.05)', cornerStyle: 'square', tags: ['pastel', 'green', 'soft'] },
  { id: 'pastel-yellow', name: 'Pastel Yellow', category: 'pastel', matColor: '#FEF08A', borderWidth: '0', padding: '24px', shadow: '0 2px 4px rgba(0,0,0,0.05)', cornerStyle: 'square', tags: ['pastel', 'yellow', 'soft'] },
  { id: 'pastel-purple', name: 'Pastel Purple', category: 'pastel', matColor: '#DDD6FE', borderWidth: '0', padding: '24px', shadow: '0 2px 4px rgba(0,0,0,0.05)', cornerStyle: 'square', tags: ['pastel', 'purple', 'soft'] },
  { id: 'pastel-mint', name: 'Pastel Mint', category: 'pastel', matColor: '#A7F3D0', borderWidth: '0', padding: '24px', shadow: '0 2px 4px rgba(0,0,0,0.05)', cornerStyle: 'square', tags: ['pastel', 'mint', 'soft'] },

  // ROUNDED MATS
  { id: 'rounded-white', name: 'Rounded White', category: 'rounded', matColor: '#FFFFFF', borderWidth: '0', padding: '24px', shadow: '0 4px 6px rgba(0,0,0,0.1)', cornerStyle: 'rounded', tags: ['rounded', 'soft'] },
  { id: 'rounded-black', name: 'Rounded Black', category: 'rounded', matColor: '#1F2937', borderWidth: '0', padding: '24px', shadow: '0 4px 6px rgba(0,0,0,0.2)', cornerStyle: 'rounded', tags: ['rounded', 'modern'] },
  { id: 'rounded-cream', name: 'Rounded Cream', category: 'rounded', matColor: '#FEF3C7', borderWidth: '0', padding: '24px', shadow: '0 4px 6px rgba(0,0,0,0.1)', cornerStyle: 'rounded', tags: ['rounded', 'warm'] },
  { id: 'oval-white', name: 'Oval White', category: 'rounded', matColor: '#FFFFFF', borderWidth: '0', padding: '32px', shadow: '0 4px 6px rgba(0,0,0,0.1)', cornerStyle: 'oval', tags: ['oval', 'vintage'] },
  { id: 'oval-gold', name: 'Oval Gold Border', category: 'rounded', matColor: '#FFFBEB', borderColor: '#D4AF37', borderWidth: '3px', padding: '28px', shadow: '0 4px 6px rgba(0,0,0,0.1)', cornerStyle: 'oval', tags: ['oval', 'elegant'] },

  // VINTAGE MATS
  { id: 'vintage-sepia', name: 'Vintage Sepia', category: 'vintage', matColor: '#F5E6D3', borderColor: '#92400E', borderWidth: '2px', padding: '24px', shadow: '0 4px 8px rgba(0,0,0,0.15)', cornerStyle: 'square', tags: ['vintage', 'sepia'] },
  { id: 'vintage-brown', name: 'Antique Brown', category: 'vintage', matColor: '#D7CCC8', borderColor: '#5D4037', borderWidth: '3px', padding: '24px', shadow: '0 4px 8px rgba(0,0,0,0.15)', cornerStyle: 'square', tags: ['vintage', 'antique'] },
  { id: 'vintage-gold-ornate', name: 'Ornate Gold', category: 'vintage', matColor: '#FFFBEB', borderColor: '#B45309', borderWidth: '4px', padding: '28px', shadow: '0 6px 12px rgba(0,0,0,0.15)', cornerStyle: 'square', tags: ['vintage', 'ornate'] },
  { id: 'victorian', name: 'Victorian', category: 'vintage', matColor: '#7C2D12', borderColor: '#D4AF37', borderWidth: '3px', padding: '24px', shadow: '0 6px 12px rgba(0,0,0,0.2)', cornerStyle: 'square', tags: ['victorian', 'elegant'] },

  // MODERN MATS
  { id: 'modern-thin', name: 'Thin Modern', category: 'modern', matColor: '#FFFFFF', borderWidth: '0', padding: '8px', shadow: '0 2px 4px rgba(0,0,0,0.1)', cornerStyle: 'square', tags: ['modern', 'minimal'] },
  { id: 'modern-wide', name: 'Wide Modern', category: 'modern', matColor: '#FFFFFF', borderWidth: '0', padding: '48px', shadow: '0 4px 6px rgba(0,0,0,0.1)', cornerStyle: 'square', tags: ['modern', 'gallery'] },
  { id: 'floating', name: 'Floating', category: 'modern', matColor: 'transparent', borderWidth: '0', padding: '16px', shadow: '0 10px 25px rgba(0,0,0,0.15)', cornerStyle: 'square', tags: ['floating', 'modern'] },
  { id: 'acrylic', name: 'Acrylic Look', category: 'modern', matColor: 'rgba(255,255,255,0.9)', borderWidth: '0', padding: '20px', shadow: '0 8px 32px rgba(0,0,0,0.12)', cornerStyle: 'rounded', tags: ['acrylic', 'clean'] },

  // BABY MATS
  { id: 'baby-blue-mat', name: 'Baby Blue', category: 'baby', matColor: '#BFDBFE', borderColor: '#93C5FD', borderWidth: '3px', padding: '20px', shadow: '0 4px 6px rgba(0,0,0,0.1)', cornerStyle: 'rounded', tags: ['baby', 'boy'] },
  { id: 'baby-pink-mat', name: 'Baby Pink', category: 'baby', matColor: '#FBCFE8', borderColor: '#F9A8D4', borderWidth: '3px', padding: '20px', shadow: '0 4px 6px rgba(0,0,0,0.1)', cornerStyle: 'rounded', tags: ['baby', 'girl'] },
  { id: 'baby-yellow-mat', name: 'Baby Yellow', category: 'baby', matColor: '#FEF08A', borderColor: '#FDE047', borderWidth: '3px', padding: '20px', shadow: '0 4px 6px rgba(0,0,0,0.1)', cornerStyle: 'rounded', tags: ['baby', 'neutral'] },
  { id: 'baby-mint-mat', name: 'Baby Mint', category: 'baby', matColor: '#A7F3D0', borderColor: '#6EE7B7', borderWidth: '3px', padding: '20px', shadow: '0 4px 6px rgba(0,0,0,0.1)', cornerStyle: 'rounded', tags: ['baby', 'neutral'] },

  // WEDDING MATS
  { id: 'wedding-white-gold', name: 'Wedding White & Gold', category: 'wedding', matColor: '#FFFFFF', borderColor: '#D4AF37', borderWidth: '4px', padding: '28px', shadow: '0 6px 12px rgba(0,0,0,0.1)', cornerStyle: 'square', tags: ['wedding', 'elegant'] },
  { id: 'wedding-blush', name: 'Blush Wedding', category: 'wedding', matColor: '#FDF2F8', borderColor: '#FBCFE8', borderWidth: '3px', padding: '24px', shadow: '0 4px 8px rgba(0,0,0,0.1)', cornerStyle: 'square', tags: ['wedding', 'blush'] },
  { id: 'wedding-silver', name: 'Silver Wedding', category: 'wedding', matColor: '#F8FAFC', borderColor: '#C0C0C0', borderWidth: '4px', padding: '28px', shadow: '0 6px 12px rgba(0,0,0,0.1)', cornerStyle: 'square', tags: ['wedding', 'silver'] },
  { id: 'wedding-rose-gold', name: 'Rose Gold Wedding', category: 'wedding', matColor: '#FDF2F8', borderColor: '#B76E79', borderWidth: '3px', padding: '24px', shadow: '0 4px 8px rgba(0,0,0,0.1)', cornerStyle: 'square', tags: ['wedding', 'rose-gold'] },
];

// Categories
const CATEGORIES = [
  { id: 'all', name: 'All Mats' },
  { id: 'classic', name: 'Classic' },
  { id: 'double', name: 'Double Mat' },
  { id: 'colorful', name: 'Colorful' },
  { id: 'pastel', name: 'Pastel' },
  { id: 'rounded', name: 'Rounded' },
  { id: 'vintage', name: 'Vintage' },
  { id: 'modern', name: 'Modern' },
  { id: 'baby', name: 'Baby' },
  { id: 'wedding', name: 'Wedding' },
];

export default function PhotoMatsBrowser({ onSelectMat, onApplyMat }: PhotoMatsBrowserProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Filter mats
  const filteredMats = useMemo(() => {
    return PHOTO_MATS.filter(mat => {
      const matchesSearch = searchQuery === '' || 
        mat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        mat.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesCategory = selectedCategory === 'all' || mat.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  // Generate CSS styles from mat
  const getMatStyles = (mat: PhotoMat): React.CSSProperties => {
    const borderRadius = mat.cornerStyle === 'rounded' ? '12px' : mat.cornerStyle === 'oval' ? '50%' : '0';
    return {
      backgroundColor: mat.matColor,
      padding: mat.padding,
      borderRadius,
      boxShadow: mat.shadow,
      border: mat.borderColor ? `${mat.borderWidth} solid ${mat.borderColor}` : 'none',
    };
  };

  // Handle mat selection
  const handleMatSelect = (mat: PhotoMat) => {
    onSelectMat?.(mat);
    onApplyMat?.(getMatStyles(mat));
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b bg-gradient-to-r from-stone-50 to-amber-50">
        <div className="flex items-center gap-2 mb-3">
          <div className="p-2 bg-gradient-to-br from-stone-500 to-amber-600 rounded-lg">
            <Frame className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Photo Mats</h3>
            <p className="text-xs text-gray-500">{filteredMats.length} mat designs</p>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search mats..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-white border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
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
                  ? 'bg-amber-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Mats Grid */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="grid grid-cols-2 gap-3">
          {filteredMats.map(mat => (
            <button
              key={mat.id}
              onClick={() => handleMatSelect(mat)}
              className="group p-2 rounded-lg hover:bg-gray-50 transition-all"
            >
              {/* Mat Preview */}
              <div 
                className="aspect-square mb-2 flex items-center justify-center"
                style={getMatStyles(mat)}
              >
                <div 
                  className="w-2/3 h-2/3 bg-gray-200 flex items-center justify-center"
                  style={{ borderRadius: mat.cornerStyle === 'oval' ? '50%' : mat.cornerStyle === 'rounded' ? '8px' : '0' }}
                >
                  <Image className="w-6 h-6 text-gray-400" />
                </div>
              </div>
              
              {/* Mat Name */}
              <p className="text-xs font-medium text-gray-700 text-center truncate">
                {mat.name}
              </p>
            </button>
          ))}
        </div>

        {filteredMats.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <Frame className="w-12 h-12 mx-auto mb-2 opacity-30" />
            <p className="text-sm">No mats found</p>
          </div>
        )}
      </div>
    </div>
  );
}
