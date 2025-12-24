// components/editor/PrintExportModal.tsx
// Print-Ready Export System with PDF, Bleed, CMYK Support
// Timestamp: Tuesday, December 24, 2025 – 2:05 PM Eastern Time
// CR AudioViz AI - "Your Story. Our Design"

'use client';

import React, { useState } from 'react';
import { 
  X, 
  Download, 
  Printer, 
  FileImage, 
  FileText, 
  Settings,
  AlertTriangle,
  CheckCircle,
  Info,
  Loader2,
  Ruler,
  Palette,
  Layers,
  BookOpen,
  Image as ImageIcon
} from 'lucide-react';

interface PrintExportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onExport: (settings: ExportSettings) => Promise<void>;
  pageCount?: number;
  hasRGBColors?: boolean;
}

interface ExportSettings {
  format: 'pdf' | 'png' | 'jpg' | 'tiff';
  quality: 'web' | 'print' | 'professional';
  dpi: number;
  colorSpace: 'rgb' | 'cmyk';
  includeBleed: boolean;
  bleedSize: number;
  includeTrimMarks: boolean;
  includeCropMarks: boolean;
  flattenLayers: boolean;
  embedFonts: boolean;
  pageRange: 'all' | 'current' | 'custom';
  customPages?: string;
  paperSize: string;
  orientation: 'portrait' | 'landscape';
}

// Standard paper sizes for scrapbooking
const PAPER_SIZES = [
  { id: '12x12', name: '12" × 12" (Scrapbook)', width: 12, height: 12, unit: 'in' },
  { id: '8x8', name: '8" × 8" (Mini Album)', width: 8, height: 8, unit: 'in' },
  { id: '6x6', name: '6" × 6" (Mini)', width: 6, height: 6, unit: 'in' },
  { id: '8.5x11', name: '8.5" × 11" (Letter)', width: 8.5, height: 11, unit: 'in' },
  { id: 'a4', name: 'A4 (210 × 297mm)', width: 210, height: 297, unit: 'mm' },
  { id: '4x6', name: '4" × 6" (Photo)', width: 4, height: 6, unit: 'in' },
  { id: '5x7', name: '5" × 7" (Photo)', width: 5, height: 7, unit: 'in' },
  { id: '11x14', name: '11" × 14" (Large)', width: 11, height: 14, unit: 'in' },
];

// Quality presets
const QUALITY_PRESETS = [
  { 
    id: 'web', 
    name: 'Web/Screen', 
    dpi: 72, 
    description: 'Best for sharing online, smaller file size',
    icon: '🌐'
  },
  { 
    id: 'print', 
    name: 'Home Print', 
    dpi: 150, 
    description: 'Good for home printers, balanced quality',
    icon: '🖨️'
  },
  { 
    id: 'professional', 
    name: 'Professional Print', 
    dpi: 300, 
    description: 'Best for professional printing services',
    icon: '⭐'
  },
];

export default function PrintExportModal({ 
  isOpen, 
  onClose, 
  onExport, 
  pageCount = 1,
  hasRGBColors = true 
}: PrintExportModalProps) {
  const [settings, setSettings] = useState<ExportSettings>({
    format: 'pdf',
    quality: 'print',
    dpi: 150,
    colorSpace: 'rgb',
    includeBleed: false,
    bleedSize: 0.125,
    includeTrimMarks: false,
    includeCropMarks: false,
    flattenLayers: true,
    embedFonts: true,
    pageRange: 'all',
    paperSize: '12x12',
    orientation: 'portrait',
  });
  
  const [isExporting, setIsExporting] = useState(false);
  const [activeTab, setActiveTab] = useState<'basic' | 'advanced'>('basic');

  if (!isOpen) return null;

  // Update settings
  const updateSettings = (updates: Partial<ExportSettings>) => {
    setSettings(prev => ({ ...prev, ...updates }));
  };

  // Handle quality preset selection
  const handleQualityChange = (preset: typeof QUALITY_PRESETS[0]) => {
    updateSettings({ quality: preset.id as 'web' | 'print' | 'professional', dpi: preset.dpi });
  };

  // Handle export
  const handleExport = async () => {
    setIsExporting(true);
    try {
      await onExport(settings);
      onClose();
    } catch (error) {
      console.error('Export failed:', error);
    } finally {
      setIsExporting(false);
    }
  };

  // Get selected paper size
  const selectedPaper = PAPER_SIZES.find(p => p.id === settings.paperSize);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg">
              <Printer className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Export for Print</h2>
              <p className="text-xs text-gray-500">Create print-ready files</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b">
          <button
            onClick={() => setActiveTab('basic')}
            className={`flex-1 py-3 text-sm font-medium transition-colors ${
              activeTab === 'basic' 
                ? 'text-blue-600 border-b-2 border-blue-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Basic Settings
          </button>
          <button
            onClick={() => setActiveTab('advanced')}
            className={`flex-1 py-3 text-sm font-medium transition-colors ${
              activeTab === 'advanced' 
                ? 'text-blue-600 border-b-2 border-blue-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Advanced Options
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[50vh]">
          {activeTab === 'basic' && (
            <div className="space-y-6">
              {/* Format Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Export Format
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { id: 'pdf', name: 'PDF', icon: FileText, desc: 'Best for printing' },
                    { id: 'png', name: 'PNG', icon: FileImage, desc: 'Lossless quality' },
                    { id: 'jpg', name: 'JPG', icon: ImageIcon, desc: 'Smaller files' },
                    { id: 'tiff', name: 'TIFF', icon: Layers, desc: 'Professional' },
                  ].map(format => {
                    const Icon = format.icon;
                    return (
                      <button
                        key={format.id}
                        onClick={() => updateSettings({ format: format.id as 'pdf' | 'png' | 'jpg' | 'tiff' })}
                        className={`p-3 rounded-lg border-2 transition-all ${
                          settings.format === format.id
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <Icon className={`w-6 h-6 mx-auto mb-1 ${
                          settings.format === format.id ? 'text-blue-600' : 'text-gray-400'
                        }`} />
                        <div className="text-xs font-medium">{format.name}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Quality Preset */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quality Preset
                </label>
                <div className="space-y-2">
                  {QUALITY_PRESETS.map(preset => (
                    <button
                      key={preset.id}
                      onClick={() => handleQualityChange(preset)}
                      className={`w-full p-3 rounded-lg border-2 text-left transition-all ${
                        settings.quality === preset.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{preset.icon}</span>
                        <div className="flex-1">
                          <div className="font-medium text-sm">{preset.name}</div>
                          <div className="text-xs text-gray-500">{preset.description}</div>
                        </div>
                        <div className="text-sm font-mono text-gray-500">{preset.dpi} DPI</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Paper Size */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Paper Size
                </label>
                <select
                  value={settings.paperSize}
                  onChange={(e) => updateSettings({ paperSize: e.target.value })}
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {PAPER_SIZES.map(size => (
                    <option key={size.id} value={size.id}>{size.name}</option>
                  ))}
                </select>
              </div>

              {/* Page Range */}
              {pageCount > 1 && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Pages to Export ({pageCount} total)
                  </label>
                  <div className="flex gap-2">
                    {[
                      { id: 'all', name: 'All Pages' },
                      { id: 'current', name: 'Current Page' },
                      { id: 'custom', name: 'Custom Range' },
                    ].map(option => (
                      <button
                        key={option.id}
                        onClick={() => updateSettings({ pageRange: option.id as 'all' | 'current' | 'custom' })}
                        className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                          settings.pageRange === option.id
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        {option.name}
                      </button>
                    ))}
                  </div>
                  {settings.pageRange === 'custom' && (
                    <input
                      type="text"
                      placeholder="e.g., 1-3, 5, 7-10"
                      value={settings.customPages || ''}
                      onChange={(e) => updateSettings({ customPages: e.target.value })}
                      className="mt-2 w-full p-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  )}
                </div>
              )}
            </div>
          )}

          {activeTab === 'advanced' && (
            <div className="space-y-6">
              {/* Color Space */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Palette className="w-4 h-4 inline mr-1" />
                  Color Space
                </label>
                <div className="flex gap-2">
                  <button
                    onClick={() => updateSettings({ colorSpace: 'rgb' })}
                    className={`flex-1 py-3 px-4 rounded-lg border-2 transition-all ${
                      settings.colorSpace === 'rgb'
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="font-medium">RGB</div>
                    <div className="text-xs text-gray-500">Screen & home print</div>
                  </button>
                  <button
                    onClick={() => updateSettings({ colorSpace: 'cmyk' })}
                    className={`flex-1 py-3 px-4 rounded-lg border-2 transition-all ${
                      settings.colorSpace === 'cmyk'
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="font-medium">CMYK</div>
                    <div className="text-xs text-gray-500">Professional print</div>
                  </button>
                </div>
                {settings.colorSpace === 'cmyk' && hasRGBColors && (
                  <div className="mt-2 p-3 bg-amber-50 border border-amber-200 rounded-lg flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                    <div className="text-xs text-amber-700">
                      <strong>Color Warning:</strong> Some RGB colors in your design may look different when converted to CMYK. Bright blues and greens are most affected.
                    </div>
                  </div>
                )}
              </div>

              {/* Bleed Settings */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Ruler className="w-4 h-4 inline mr-1" />
                  Bleed & Marks
                </label>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.includeBleed}
                      onChange={(e) => updateSettings({ includeBleed: e.target.checked })}
                      className="w-4 h-4 text-blue-600 rounded"
                    />
                    <div className="flex-1">
                      <div className="text-sm font-medium">Include Bleed Area</div>
                      <div className="text-xs text-gray-500">Extends design beyond trim edge</div>
                    </div>
                    {settings.includeBleed && (
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          step="0.0625"
                          min="0"
                          max="0.5"
                          value={settings.bleedSize}
                          onChange={(e) => updateSettings({ bleedSize: parseFloat(e.target.value) })}
                          className="w-20 p-1 text-sm border rounded"
                        />
                        <span className="text-xs text-gray-500">inches</span>
                      </div>
                    )}
                  </label>

                  <label className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.includeTrimMarks}
                      onChange={(e) => updateSettings({ includeTrimMarks: e.target.checked })}
                      className="w-4 h-4 text-blue-600 rounded"
                    />
                    <div className="flex-1">
                      <div className="text-sm font-medium">Include Trim Marks</div>
                      <div className="text-xs text-gray-500">Shows where to cut the paper</div>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.includeCropMarks}
                      onChange={(e) => updateSettings({ includeCropMarks: e.target.checked })}
                      className="w-4 h-4 text-blue-600 rounded"
                    />
                    <div className="flex-1">
                      <div className="text-sm font-medium">Include Crop Marks</div>
                      <div className="text-xs text-gray-500">Corner marks for professional cutting</div>
                    </div>
                  </label>
                </div>
              </div>

              {/* Advanced Options */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Settings className="w-4 h-4 inline mr-1" />
                  Additional Options
                </label>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.flattenLayers}
                      onChange={(e) => updateSettings({ flattenLayers: e.target.checked })}
                      className="w-4 h-4 text-blue-600 rounded"
                    />
                    <div className="flex-1">
                      <div className="text-sm font-medium">Flatten Layers</div>
                      <div className="text-xs text-gray-500">Merge all layers for compatibility</div>
                    </div>
                  </label>

                  <label className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg cursor-pointer">
                    <input
                      type="checkbox"
                      checked={settings.embedFonts}
                      onChange={(e) => updateSettings({ embedFonts: e.target.checked })}
                      className="w-4 h-4 text-blue-600 rounded"
                    />
                    <div className="flex-1">
                      <div className="text-sm font-medium">Embed Fonts</div>
                      <div className="text-xs text-gray-500">Include fonts in PDF for accurate display</div>
                    </div>
                  </label>
                </div>
              </div>

              {/* Custom DPI */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Custom Resolution (DPI)
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min="72"
                    max="600"
                    step="1"
                    value={settings.dpi}
                    onChange={(e) => updateSettings({ dpi: parseInt(e.target.value) })}
                    className="flex-1"
                  />
                  <span className="w-16 text-center font-mono text-sm">{settings.dpi} DPI</span>
                </div>
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>Web (72)</span>
                  <span>Print (150-300)</span>
                  <span>Pro (600)</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Summary & Export */}
        <div className="p-4 border-t bg-gray-50">
          {/* Export Summary */}
          <div className="mb-4 p-3 bg-white rounded-lg border">
            <div className="text-xs font-medium text-gray-500 mb-2">Export Summary</div>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-gray-500">Format:</span>
                <span className="ml-1 font-medium uppercase">{settings.format}</span>
              </div>
              <div>
                <span className="text-gray-500">Quality:</span>
                <span className="ml-1 font-medium">{settings.dpi} DPI</span>
              </div>
              <div>
                <span className="text-gray-500">Color:</span>
                <span className="ml-1 font-medium uppercase">{settings.colorSpace}</span>
              </div>
              <div>
                <span className="text-gray-500">Size:</span>
                <span className="ml-1 font-medium">{selectedPaper?.name.split('(')[0]}</span>
              </div>
              <div>
                <span className="text-gray-500">Bleed:</span>
                <span className="ml-1 font-medium">{settings.includeBleed ? `${settings.bleedSize}"` : 'None'}</span>
              </div>
              <div>
                <span className="text-gray-500">Pages:</span>
                <span className="ml-1 font-medium">
                  {settings.pageRange === 'all' ? pageCount : settings.pageRange === 'current' ? '1' : settings.customPages}
                </span>
              </div>
            </div>
          </div>

          {/* Export Button */}
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 py-3 px-4 border border-gray-300 rounded-lg font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleExport}
              disabled={isExporting}
              className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 transition-all"
            >
              {isExporting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Exporting...
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  Export {settings.format.toUpperCase()}
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
