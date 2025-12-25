// components/editor/DateStampsBrowser.tsx
// Date Stamps & Calendar Elements Browser
// Timestamp: Tuesday, December 24, 2025 – 4:55 PM Eastern Time
// CR AudioViz AI - "Your Story. Our Design"

'use client';

import React, { useState, useMemo } from 'react';
import { Search, Calendar } from 'lucide-react';

interface DateStamp {
  id: string;
  name: string;
  category: string;
  template: (date: Date) => string;
  style: React.CSSProperties;
  tags: string[];
}

interface DateStampsBrowserProps {
  selectedDate?: Date;
  onSelectStamp?: (stamp: DateStamp) => void;
  onAddToCanvas?: (text: string, styles: React.CSSProperties) => void;
}

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const MONTHS_SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

// Helper function for ordinal numbers
function getOrdinal(n: number): string {
  const s = ['th', 'st', 'nd', 'rd'];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

// Date stamp templates
const DATE_STAMPS: DateStamp[] = [
  // SIMPLE DATE FORMATS
  { id: 'simple-full', name: 'Full Date', category: 'simple', template: (d) => `${MONTHS[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`, style: { fontFamily: 'Georgia, serif', fontSize: '16px', color: '#1F2937' }, tags: ['full', 'formal'] },
  { id: 'simple-short', name: 'Short Date', category: 'simple', template: (d) => `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`, style: { fontFamily: 'Arial, sans-serif', fontSize: '14px', color: '#1F2937' }, tags: ['short', 'numeric'] },
  { id: 'simple-iso', name: 'ISO Format', category: 'simple', template: (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`, style: { fontFamily: '"Courier New", monospace', fontSize: '14px', color: '#6B7280' }, tags: ['iso', 'numeric'] },
  { id: 'simple-european', name: 'European Format', category: 'simple', template: (d) => `${d.getDate()}.${d.getMonth() + 1}.${d.getFullYear()}`, style: { fontFamily: 'Arial, sans-serif', fontSize: '14px', color: '#1F2937' }, tags: ['european', 'dots'] },
  { id: 'simple-day-month', name: 'Day & Month', category: 'simple', template: (d) => `${d.getDate()} ${MONTHS[d.getMonth()]}`, style: { fontFamily: 'Georgia, serif', fontSize: '16px', color: '#1F2937' }, tags: ['day', 'month'] },
  { id: 'simple-month-year', name: 'Month & Year', category: 'simple', template: (d) => `${MONTHS[d.getMonth()]} ${d.getFullYear()}`, style: { fontFamily: 'Georgia, serif', fontSize: '16px', color: '#1F2937' }, tags: ['month', 'year'] },

  // DECORATIVE STAMPS
  { id: 'deco-circle', name: 'Circle Stamp', category: 'decorative', template: (d) => `◉ ${MONTHS_SHORT[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()} ◉`, style: { fontFamily: '"Courier New", monospace', fontSize: '12px', color: '#1F2937', border: '2px solid #1F2937', borderRadius: '50%', padding: '10px 20px' }, tags: ['circle', 'stamp'] },
  { id: 'deco-postmark', name: 'Postmark', category: 'decorative', template: (d) => `POSTED: ${MONTHS_SHORT[d.getMonth()].toUpperCase()} ${d.getDate()} ${d.getFullYear()}`, style: { fontFamily: '"Courier New", monospace', fontSize: '11px', color: '#DC2626', letterSpacing: '0.1em' }, tags: ['postmark', 'mail'] },
  { id: 'deco-tag', name: 'Label Tag', category: 'decorative', template: (d) => `📅 ${MONTHS[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`, style: { fontFamily: 'Georgia, serif', fontSize: '14px', color: '#1F2937', backgroundColor: '#FEF3C7', padding: '4px 12px', borderRadius: '4px' }, tags: ['tag', 'label'] },
  { id: 'deco-banner', name: 'Banner', category: 'decorative', template: (d) => `★ ${MONTHS[d.getMonth()].toUpperCase()} ${d.getDate()} ★`, style: { fontFamily: 'Georgia, serif', fontSize: '16px', color: '#D4AF37', fontWeight: 'bold', letterSpacing: '0.15em' }, tags: ['banner', 'star'] },
  { id: 'deco-bracket', name: 'Bracketed', category: 'decorative', template: (d) => `[ ${MONTHS_SHORT[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()} ]`, style: { fontFamily: '"Courier New", monospace', fontSize: '14px', color: '#6B7280' }, tags: ['brackets', 'simple'] },
  { id: 'deco-dots', name: 'Dotted', category: 'decorative', template: (d) => `• ${d.getDate()} • ${MONTHS[d.getMonth()]} • ${d.getFullYear()} •`, style: { fontFamily: 'Georgia, serif', fontSize: '14px', color: '#1F2937' }, tags: ['dots', 'elegant'] },

  // VINTAGE STYLES
  { id: 'vintage-typewriter', name: 'Typewriter', category: 'vintage', template: (d) => `DATE: ${MONTHS_SHORT[d.getMonth()].toUpperCase()} ${d.getDate()}, ${d.getFullYear()}`, style: { fontFamily: '"Courier New", monospace', fontSize: '12px', color: '#1F2937', letterSpacing: '0.05em' }, tags: ['typewriter', 'retro'] },
  { id: 'vintage-classic', name: 'Classic Serif', category: 'vintage', template: (d) => `${MONTHS[d.getMonth()]} ${getOrdinal(d.getDate())}, ${d.getFullYear()}`, style: { fontFamily: 'Georgia, serif', fontSize: '16px', color: '#78350F', fontStyle: 'italic' }, tags: ['classic', 'ordinal'] },
  { id: 'vintage-stamp', name: 'Rubber Stamp', category: 'vintage', template: (d) => `${MONTHS_SHORT[d.getMonth()].toUpperCase()} ${d.getDate()} ${d.getFullYear()}`, style: { fontFamily: '"Courier New", monospace', fontSize: '14px', color: '#7C3AED', fontWeight: 'bold', letterSpacing: '0.1em' }, tags: ['stamp', 'rubber'] },
  { id: 'vintage-newspaper', name: 'Newspaper', category: 'vintage', template: (d) => `${DAYS[d.getDay()]}, ${MONTHS[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`, style: { fontFamily: 'Georgia, serif', fontSize: '12px', color: '#374151' }, tags: ['newspaper', 'full'] },

  // CALENDAR STYLES
  { id: 'calendar-block', name: 'Calendar Block', category: 'calendar', template: (d) => `${d.getDate()}\n${MONTHS_SHORT[d.getMonth()].toUpperCase()}`, style: { fontFamily: 'Arial, sans-serif', fontSize: '24px', color: '#1F2937', fontWeight: 'bold', textAlign: 'center', lineHeight: '1.2' }, tags: ['block', 'large'] },
  { id: 'calendar-mini', name: 'Mini Calendar', category: 'calendar', template: (d) => `${MONTHS_SHORT[d.getMonth()]}\n${d.getDate()}`, style: { fontFamily: 'Arial, sans-serif', fontSize: '14px', color: '#FFFFFF', backgroundColor: '#DC2626', padding: '8px 12px', borderRadius: '4px', textAlign: 'center', fontWeight: 'bold' }, tags: ['mini', 'colored'] },
  { id: 'calendar-day-focus', name: 'Day Focus', category: 'calendar', template: (d) => `${d.getDate()}`, style: { fontFamily: 'Georgia, serif', fontSize: '48px', color: '#1F2937', fontWeight: 'bold' }, tags: ['day', 'large'] },
  { id: 'calendar-weekday', name: 'Weekday', category: 'calendar', template: (d) => `${DAYS[d.getDay()]}`, style: { fontFamily: 'Georgia, serif', fontSize: '18px', color: '#1F2937', fontStyle: 'italic' }, tags: ['weekday', 'day'] },

  // HANDWRITTEN STYLES
  { id: 'hand-casual', name: 'Casual Script', category: 'handwritten', template: (d) => `${MONTHS[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`, style: { fontFamily: 'Georgia, cursive', fontSize: '20px', color: '#1F2937' }, tags: ['script', 'casual'] },
  { id: 'hand-elegant', name: 'Elegant Script', category: 'handwritten', template: (d) => `${MONTHS[d.getMonth()]} ${getOrdinal(d.getDate())}`, style: { fontFamily: 'Georgia, cursive', fontSize: '24px', color: '#1F2937' }, tags: ['elegant', 'script'] },
  { id: 'hand-marker', name: 'Marker Style', category: 'handwritten', template: (d) => `${d.getMonth() + 1}/${d.getDate()}/${String(d.getFullYear()).slice(-2)}`, style: { fontFamily: 'Arial, cursive', fontSize: '18px', color: '#1F2937', fontWeight: 'bold' }, tags: ['marker', 'bold'] },

  // SPECIAL OCCASIONS
  { id: 'special-birthday', name: 'Birthday', category: 'special', template: (d) => `🎂 Born: ${MONTHS[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()} 🎂`, style: { fontFamily: 'Georgia, serif', fontSize: '14px', color: '#EC4899' }, tags: ['birthday', 'born'] },
  { id: 'special-wedding', name: 'Wedding Date', category: 'special', template: (d) => `💒 ${MONTHS[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()} 💒`, style: { fontFamily: 'Georgia, cursive', fontSize: '20px', color: '#D4AF37' }, tags: ['wedding', 'married'] },
  { id: 'special-vacation', name: 'Vacation', category: 'special', template: (d) => `✈️ ${MONTHS[d.getMonth()]} ${d.getDate()}-${d.getDate() + 7}, ${d.getFullYear()}`, style: { fontFamily: 'Arial, sans-serif', fontSize: '14px', color: '#0EA5E9' }, tags: ['vacation', 'travel'] },
  { id: 'special-memory', name: 'Memory', category: 'special', template: (d) => `📸 Captured: ${MONTHS_SHORT[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`, style: { fontFamily: '"Courier New", monospace', fontSize: '12px', color: '#6B7280' }, tags: ['photo', 'memory'] },
];

// Categories
const CATEGORIES = [
  { id: 'all', name: 'All Stamps' },
  { id: 'simple', name: 'Simple' },
  { id: 'decorative', name: 'Decorative' },
  { id: 'vintage', name: 'Vintage' },
  { id: 'calendar', name: 'Calendar' },
  { id: 'handwritten', name: 'Handwritten' },
  { id: 'special', name: 'Occasions' },
];

export default function DateStampsBrowser({ 
  selectedDate = new Date(), 
  onSelectStamp, 
  onAddToCanvas 
}: DateStampsBrowserProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentDate, setCurrentDate] = useState(selectedDate);

  const filteredStamps = useMemo(() => {
    return DATE_STAMPS.filter(stamp => {
      const matchesSearch = searchQuery === '' || 
        stamp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        stamp.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesCategory = selectedCategory === 'all' || stamp.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const handleSelect = (stamp: DateStamp) => {
    const text = stamp.template(currentDate);
    onSelectStamp?.(stamp);
    onAddToCanvas?.(text, stamp.style);
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b bg-gradient-to-r from-rose-50 to-pink-50">
        <div className="flex items-center gap-2 mb-3">
          <div className="p-2 bg-gradient-to-br from-rose-500 to-pink-500 rounded-lg">
            <Calendar className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Date Stamps</h3>
            <p className="text-xs text-gray-500">{filteredStamps.length} stamp styles</p>
          </div>
        </div>

        {/* Date Picker */}
        <div className="mb-3">
          <label className="block text-xs font-medium text-gray-500 mb-1">SELECT DATE</label>
          <input
            type="date"
            value={currentDate.toISOString().split('T')[0]}
            onChange={(e) => setCurrentDate(new Date(e.target.value))}
            className="w-full px-3 py-2 bg-white border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
          />
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search stamps..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-white border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
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
                  ? 'bg-rose-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Stamps Grid */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-3">
          {filteredStamps.map(stamp => (
            <button
              key={stamp.id}
              onClick={() => handleSelect(stamp)}
              className="w-full p-4 bg-white rounded-lg border hover:border-rose-300 hover:shadow-md transition-all text-left"
            >
              <div className="mb-2 whitespace-pre-line" style={stamp.style}>
                {stamp.template(currentDate)}
              </div>
              <p className="text-xs text-gray-500">{stamp.name}</p>
            </button>
          ))}
        </div>

        {filteredStamps.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <Calendar className="w-12 h-12 mx-auto mb-2 opacity-30" />
            <p className="text-sm">No stamps found</p>
          </div>
        )}
      </div>
    </div>
  );
}
