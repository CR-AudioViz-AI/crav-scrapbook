'use client';

import { useState, useEffect } from 'react';
import { Loader2, Check, Type, Sparkles } from 'lucide-react';

interface TextEffect {
  id: string;
  name: string;
  category: string;
  css: Record<string, string>;
  description: string;
}

interface TextEffectsPanelProps {
  currentEffect?: string;
  sampleText?: string;
  onSelectEffect: (effect: { id: string; name: string; css: Record<string, string> }) => void;
}

const CATEGORIES = ['shadows', 'outlines', 'decorative', 'colorful', 'special'];

export default function TextEffectsPanel({ currentEffect, sampleText = 'Sample Text', onSelectEffect }: TextEffectsPanelProps) {
  const [effects, setEffects] = useState<TextEffect[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('');
  const [selectedEffect, setSelectedEffect] = useState(currentEffect || '');
  const [previewText, setPreviewText] = useState(sampleText);

  useEffect(() => {
    fetchEffects();
  }, [category]);

  const fetchEffects = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (category) params.set('category', category);
      
      const res = await fetch(`/api/text-effects?${params}`);
      const data = await res.json();
      setEffects(data.effects || []);
    } catch (error) {
      console.error('Error fetching effects:', error);
    }
    setLoading(false);
  };

  const handleSelectEffect = (effect: TextEffect) => {
    setSelectedEffect(effect.id);
    onSelectEffect({
      id: effect.id,
      name: effect.name,
      css: effect.css
    });
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-sm">
      {/* Header */}
      <div className="p-4 border-b space-y-3">
        <h3 className="font-semibold text-lg flex items-center gap-2">
          <Type className="w-5 h-5" />
          Text Effects
        </h3>
        
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

        {/* Preview Text Input */}
        <div>
          <label className="block text-xs font-medium text-gray-600 mb-1">Preview Text</label>
          <input
            type="text"
            value={previewText}
            onChange={(e) => setPreviewText(e.target.value)}
            className="w-full px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            placeholder="Enter preview text..."
          />
        </div>
      </div>

      {/* Effects Grid */}
      <div className="flex-1 overflow-y-auto p-4">
        {loading ? (
          <div className="flex items-center justify-center h-32">
            <Loader2 className="w-6 h-6 animate-spin text-purple-600" />
          </div>
        ) : effects.length === 0 ? (
          <p className="text-center text-gray-500 py-8">No effects found</p>
        ) : (
          <div className="space-y-3">
            {effects.map((effect) => (
              <button
                key={effect.id}
                onClick={() => handleSelectEffect(effect)}
                className={`w-full p-4 rounded-lg border-2 text-left transition ${
                  selectedEffect === effect.id
                    ? 'border-purple-600 bg-purple-50'
                    : 'border-gray-200 hover:border-gray-300 bg-white'
                }`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <span className="font-medium text-sm">{effect.name}</span>
                    <span className="ml-2 text-xs text-gray-500 capitalize">{effect.category}</span>
                  </div>
                  {selectedEffect === effect.id && (
                    <Check className="w-4 h-4 text-purple-600" />
                  )}
                </div>
                <div
                  className="text-2xl font-bold text-gray-800 py-2 truncate"
                  style={effect.css}
                >
                  {previewText}
                </div>
                <p className="text-xs text-gray-500 mt-1">{effect.description}</p>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-3 border-t bg-gray-50 text-xs text-gray-500 text-center">
        {effects.length} effects • Click to apply
      </div>
    </div>
  );
}
