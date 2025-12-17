'use client';

import { useState, useEffect } from 'react';
import { Loader2, Check, Grid3X3 } from 'lucide-react';

interface Pattern {
  id: string;
  name: string;
  preview: string;
}

interface PatternPickerProps {
  onSelectPattern: (pattern: { id: string; name: string; cssBackground: string; dataUrl: string }) => void;
}

const CATEGORIES = ['geometric', 'organic', 'texture'];

export default function PatternPicker({ onSelectPattern }: PatternPickerProps) {
  const [patterns, setPatterns] = useState<Record<string, Pattern[]>>({});
  const [loading, setLoading] = useState(true);
  const [selectedPattern, setSelectedPattern] = useState('');
  const [color, setColor] = useState('6366f1');
  const [bgColor, setBgColor] = useState('ffffff');
  const [size, setSize] = useState(40);

  useEffect(() => {
    fetchPatterns();
  }, [color, bgColor, size]);

  const fetchPatterns = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        color,
        bgcolor: bgColor,
        size: size.toString()
      });
      
      const res = await fetch(`/api/patterns?${params}`);
      const data = await res.json();
      setPatterns(data.patterns || {});
    } catch (error) {
      console.error('Error fetching patterns:', error);
    }
    setLoading(false);
  };

  const handleSelectPattern = async (patternId: string) => {
    try {
      const res = await fetch(`/api/patterns?id=${patternId}&color=${color}&bgcolor=${bgColor}&size=${size}`);
      const data = await res.json();
      if (data.pattern) {
        setSelectedPattern(patternId);
        onSelectPattern({
          id: data.pattern.id,
          name: data.pattern.name,
          cssBackground: data.pattern.cssBackground,
          dataUrl: data.pattern.dataUrl
        });
      }
    } catch (error) {
      console.error('Error getting pattern:', error);
    }
  };

  const totalPatterns = Object.values(patterns).flat().length;

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-sm">
      {/* Header */}
      <div className="p-4 border-b space-y-3">
        <h3 className="font-semibold text-lg flex items-center gap-2">
          <Grid3X3 className="w-5 h-5" />
          Background Patterns
        </h3>
        
        {/* Color Pickers */}
        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <label className="text-xs text-gray-600">Pattern:</label>
            <input
              type="color"
              value={`#${color}`}
              onChange={(e) => setColor(e.target.value.replace('#', ''))}
              className="w-8 h-8 rounded cursor-pointer"
            />
          </div>
          <div className="flex items-center gap-2">
            <label className="text-xs text-gray-600">Background:</label>
            <input
              type="color"
              value={`#${bgColor}`}
              onChange={(e) => setBgColor(e.target.value.replace('#', ''))}
              className="w-8 h-8 rounded cursor-pointer"
            />
          </div>
        </div>

        {/* Size Slider */}
        <div>
          <label className="block text-xs text-gray-600 mb-1">Pattern Size: {size}px</label>
          <input
            type="range"
            min="20"
            max="100"
            value={size}
            onChange={(e) => setSize(Number(e.target.value))}
            className="w-full"
          />
        </div>
      </div>

      {/* Patterns */}
      <div className="flex-1 overflow-y-auto p-4">
        {loading ? (
          <div className="flex items-center justify-center h-32">
            <Loader2 className="w-6 h-6 animate-spin text-purple-600" />
          </div>
        ) : (
          <div className="space-y-6">
            {CATEGORIES.map((category) => (
              patterns[category] && patterns[category].length > 0 && (
                <div key={category}>
                  <h4 className="text-sm font-medium text-gray-700 capitalize mb-3">{category}</h4>
                  <div className="grid grid-cols-4 gap-2">
                    {patterns[category].map((pattern) => (
                      <button
                        key={pattern.id}
                        onClick={() => handleSelectPattern(pattern.id)}
                        className={`aspect-square rounded-lg border-2 overflow-hidden transition ${
                          selectedPattern === pattern.id
                            ? 'border-purple-600 ring-2 ring-purple-200'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        title={pattern.name}
                      >
                        <img
                          src={pattern.preview}
                          alt={pattern.name}
                          className="w-full h-full"
                          style={{ imageRendering: 'pixelated' }}
                        />
                        {selectedPattern === pattern.id && (
                          <div className="absolute inset-0 flex items-center justify-center bg-purple-600/20">
                            <Check className="w-4 h-4 text-purple-600" />
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-3 border-t bg-gray-50 text-xs text-gray-500 text-center">
        {totalPatterns} patterns • Click to apply
      </div>
    </div>
  );
}
