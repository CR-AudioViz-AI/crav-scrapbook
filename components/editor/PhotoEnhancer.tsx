// components/editor/PhotoEnhancer.tsx
// Photo Enhancement Tools - Auto-Enhance, Filters, Adjustments
// Timestamp: Tuesday, December 24, 2025 – 2:55 PM Eastern Time
// CR AudioViz AI - "Your Story. Our Design"

'use client';

import React, { useState, useCallback, useRef, useEffect } from 'react';
import { 
  Wand2, 
  Sun, 
  Contrast, 
  Droplets,
  Palette,
  RotateCcw,
  Check,
  Sparkles,
  Sliders,
  Image,
  Loader2,
  Download,
  RefreshCw
} from 'lucide-react';

interface PhotoEnhancerProps {
  imageUrl?: string;
  onEnhance?: (enhancedUrl: string, filters: ImageFilters) => void;
  onApply?: (filters: ImageFilters) => void;
}

interface ImageFilters {
  brightness: number;
  contrast: number;
  saturation: number;
  warmth: number;
  sharpen: number;
  vignette: number;
  blur: number;
  grayscale: number;
  sepia: number;
}

// Preset filters for quick enhancement
const PRESET_FILTERS = [
  { id: 'original', name: 'Original', filters: { brightness: 100, contrast: 100, saturation: 100, warmth: 0, sharpen: 0, vignette: 0, blur: 0, grayscale: 0, sepia: 0 } },
  { id: 'auto', name: 'Auto', filters: { brightness: 105, contrast: 110, saturation: 110, warmth: 5, sharpen: 10, vignette: 0, blur: 0, grayscale: 0, sepia: 0 } },
  { id: 'vivid', name: 'Vivid', filters: { brightness: 105, contrast: 115, saturation: 130, warmth: 0, sharpen: 15, vignette: 0, blur: 0, grayscale: 0, sepia: 0 } },
  { id: 'warm', name: 'Warm', filters: { brightness: 105, contrast: 105, saturation: 105, warmth: 20, sharpen: 5, vignette: 0, blur: 0, grayscale: 0, sepia: 0 } },
  { id: 'cool', name: 'Cool', filters: { brightness: 100, contrast: 105, saturation: 95, warmth: -15, sharpen: 5, vignette: 0, blur: 0, grayscale: 0, sepia: 0 } },
  { id: 'vintage', name: 'Vintage', filters: { brightness: 95, contrast: 90, saturation: 80, warmth: 10, sharpen: 0, vignette: 30, blur: 0, grayscale: 0, sepia: 25 } },
  { id: 'dramatic', name: 'Dramatic', filters: { brightness: 95, contrast: 130, saturation: 90, warmth: 0, sharpen: 20, vignette: 40, blur: 0, grayscale: 0, sepia: 0 } },
  { id: 'soft', name: 'Soft', filters: { brightness: 110, contrast: 90, saturation: 95, warmth: 5, sharpen: 0, vignette: 15, blur: 5, grayscale: 0, sepia: 0 } },
  { id: 'bw', name: 'B&W', filters: { brightness: 105, contrast: 115, saturation: 0, warmth: 0, sharpen: 10, vignette: 20, blur: 0, grayscale: 100, sepia: 0 } },
  { id: 'sepia', name: 'Sepia', filters: { brightness: 100, contrast: 95, saturation: 80, warmth: 15, sharpen: 0, vignette: 20, blur: 0, grayscale: 0, sepia: 60 } },
  { id: 'fade', name: 'Fade', filters: { brightness: 110, contrast: 85, saturation: 85, warmth: 5, sharpen: 0, vignette: 0, blur: 0, grayscale: 0, sepia: 10 } },
  { id: 'pop', name: 'Pop', filters: { brightness: 105, contrast: 120, saturation: 140, warmth: 0, sharpen: 20, vignette: 0, blur: 0, grayscale: 0, sepia: 0 } },
];

// Default filters
const DEFAULT_FILTERS: ImageFilters = {
  brightness: 100,
  contrast: 100,
  saturation: 100,
  warmth: 0,
  sharpen: 0,
  vignette: 0,
  blur: 0,
  grayscale: 0,
  sepia: 0,
};

export default function PhotoEnhancer({ imageUrl, onEnhance, onApply }: PhotoEnhancerProps) {
  const [filters, setFilters] = useState<ImageFilters>(DEFAULT_FILTERS);
  const [activePreset, setActivePreset] = useState<string>('original');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // Generate CSS filter string
  const getCssFilter = useCallback((f: ImageFilters) => {
    let filter = `brightness(${f.brightness}%) contrast(${f.contrast}%) saturate(${f.saturation}%)`;
    if (f.grayscale > 0) filter += ` grayscale(${f.grayscale}%)`;
    if (f.sepia > 0) filter += ` sepia(${f.sepia}%)`;
    if (f.blur > 0) filter += ` blur(${f.blur}px)`;
    // Warmth is simulated with hue-rotate
    if (f.warmth !== 0) filter += ` hue-rotate(${f.warmth}deg)`;
    return filter;
  }, []);

  // Update single filter value
  const updateFilter = (key: keyof ImageFilters, value: number) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setActivePreset('');
  };

  // Apply preset
  const applyPreset = (preset: typeof PRESET_FILTERS[0]) => {
    setFilters(preset.filters);
    setActivePreset(preset.id);
  };

  // Reset to original
  const resetFilters = () => {
    setFilters(DEFAULT_FILTERS);
    setActivePreset('original');
  };

  // Auto-enhance (simple algorithm)
  const autoEnhance = () => {
    setIsProcessing(true);
    setTimeout(() => {
      const enhanced: ImageFilters = {
        brightness: 105,
        contrast: 110,
        saturation: 115,
        warmth: 3,
        sharpen: 10,
        vignette: 10,
        blur: 0,
        grayscale: 0,
        sepia: 0,
      };
      setFilters(enhanced);
      setActivePreset('auto');
      setIsProcessing(false);
    }, 500);
  };

  // Apply current filters
  const handleApply = () => {
    onApply?.(filters);
    if (imageUrl && previewUrl) {
      onEnhance?.(previewUrl, filters);
    }
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b bg-gradient-to-r from-cyan-50 to-blue-50">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg">
              <Wand2 className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Photo Enhancer</h3>
              <p className="text-xs text-gray-500">Auto-enhance & adjust</p>
            </div>
          </div>
          <div className="flex gap-1">
            <button
              onClick={resetFilters}
              className="p-1.5 hover:bg-gray-200 rounded"
              title="Reset"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Auto Enhance Button */}
        <button
          onClick={autoEnhance}
          disabled={isProcessing}
          className="w-full py-2.5 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-medium rounded-lg hover:from-cyan-600 hover:to-blue-600 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {isProcessing ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Enhancing...
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4" />
              Auto Enhance
            </>
          )}
        </button>
      </div>

      {/* Preview */}
      {imageUrl && (
        <div className="p-4 border-b">
          <div 
            className="aspect-video rounded-lg overflow-hidden bg-gray-100"
            style={{
              backgroundImage: `url(${imageUrl})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              filter: getCssFilter(filters),
            }}
          />
        </div>
      )}

      {/* Preset Filters */}
      <div className="p-4 border-b">
        <h4 className="text-xs font-medium text-gray-500 mb-3">PRESETS</h4>
        <div className="grid grid-cols-4 gap-2">
          {PRESET_FILTERS.map(preset => (
            <button
              key={preset.id}
              onClick={() => applyPreset(preset)}
              className={`p-2 rounded-lg text-center transition-all ${
                activePreset === preset.id
                  ? 'bg-blue-100 border-2 border-blue-500'
                  : 'bg-gray-100 border-2 border-transparent hover:border-gray-300'
              }`}
            >
              <div 
                className="w-full aspect-square rounded mb-1 bg-gradient-to-br from-gray-200 to-gray-300"
                style={{ filter: getCssFilter(preset.filters) }}
              />
              <span className="text-[10px] font-medium">{preset.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Quick Adjustments */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-xs font-medium text-gray-500">ADJUSTMENTS</h4>
          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="text-xs text-blue-600 hover:underline"
          >
            {showAdvanced ? 'Show Less' : 'Show More'}
          </button>
        </div>

        <div className="space-y-4">
          {/* Brightness */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sun className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-700">Brightness</span>
              </div>
              <span className="text-xs text-gray-500">{filters.brightness}%</span>
            </div>
            <input
              type="range"
              min="50"
              max="150"
              value={filters.brightness}
              onChange={(e) => updateFilter('brightness', Number(e.target.value))}
              className="w-full"
            />
          </div>

          {/* Contrast */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Contrast className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-700">Contrast</span>
              </div>
              <span className="text-xs text-gray-500">{filters.contrast}%</span>
            </div>
            <input
              type="range"
              min="50"
              max="150"
              value={filters.contrast}
              onChange={(e) => updateFilter('contrast', Number(e.target.value))}
              className="w-full"
            />
          </div>

          {/* Saturation */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Droplets className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-700">Saturation</span>
              </div>
              <span className="text-xs text-gray-500">{filters.saturation}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="200"
              value={filters.saturation}
              onChange={(e) => updateFilter('saturation', Number(e.target.value))}
              className="w-full"
            />
          </div>

          {/* Warmth */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Palette className="w-4 h-4 text-gray-500" />
                <span className="text-sm text-gray-700">Warmth</span>
              </div>
              <span className="text-xs text-gray-500">{filters.warmth > 0 ? '+' : ''}{filters.warmth}</span>
            </div>
            <input
              type="range"
              min="-30"
              max="30"
              value={filters.warmth}
              onChange={(e) => updateFilter('warmth', Number(e.target.value))}
              className="w-full"
            />
          </div>

          {/* Advanced Options */}
          {showAdvanced && (
            <>
              {/* Vignette */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">Vignette</span>
                  <span className="text-xs text-gray-500">{filters.vignette}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={filters.vignette}
                  onChange={(e) => updateFilter('vignette', Number(e.target.value))}
                  className="w-full"
                />
              </div>

              {/* Blur */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">Blur</span>
                  <span className="text-xs text-gray-500">{filters.blur}px</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="20"
                  value={filters.blur}
                  onChange={(e) => updateFilter('blur', Number(e.target.value))}
                  className="w-full"
                />
              </div>

              {/* Grayscale */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">Grayscale</span>
                  <span className="text-xs text-gray-500">{filters.grayscale}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={filters.grayscale}
                  onChange={(e) => updateFilter('grayscale', Number(e.target.value))}
                  className="w-full"
                />
              </div>

              {/* Sepia */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">Sepia</span>
                  <span className="text-xs text-gray-500">{filters.sepia}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={filters.sepia}
                  onChange={(e) => updateFilter('sepia', Number(e.target.value))}
                  className="w-full"
                />
              </div>
            </>
          )}
        </div>
      </div>

      {/* Apply Button */}
      <div className="p-4 border-t">
        <button
          onClick={handleApply}
          className="w-full py-2.5 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-medium rounded-lg hover:from-cyan-600 hover:to-blue-600 transition-all flex items-center justify-center gap-2"
        >
          <Check className="w-4 h-4" />
          Apply Enhancements
        </button>
      </div>
    </div>
  );
}
