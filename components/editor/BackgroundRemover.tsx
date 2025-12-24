// components/editor/BackgroundRemover.tsx
// AI-powered background removal using Remove.bg API
// Timestamp: Tuesday, December 24, 2025 – 1:05 PM Eastern Time
// CR AudioViz AI - "Your Story. Our Design"

'use client';

import React, { useState, useCallback } from 'react';
import { 
  Wand2, 
  Upload, 
  Download, 
  Loader2, 
  ImageIcon,
  Sparkles,
  CheckCircle,
  AlertCircle,
  Scissors,
  RefreshCw
} from 'lucide-react';

interface BackgroundRemoverProps {
  onImageProcessed?: (imageUrl: string) => void;
  onAddToCanvas?: (imageUrl: string) => void;
}

interface ProcessingResult {
  success: boolean;
  imageUrl?: string;
  error?: string;
  creditsUsed?: number;
}

export default function BackgroundRemover({ 
  onImageProcessed, 
  onAddToCanvas 
}: BackgroundRemoverProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [processedUrl, setProcessedUrl] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);

  // Handle file selection
  const handleFileSelect = useCallback((file: File) => {
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file (JPG, PNG, WebP)');
      return;
    }

    if (file.size > 25 * 1024 * 1024) {
      setError('Image must be less than 25MB');
      return;
    }

    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
    setProcessedUrl(null);
    setError(null);
  }, []);

  // Drag and drop handlers
  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  }, [handleFileSelect]);

  // Process image with Remove.bg API
  const processImage = async () => {
    if (!selectedFile) return;

    setIsProcessing(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('image', selectedFile);

      const response = await fetch('/api/background-remove', {
        method: 'POST',
        body: formData,
      });

      const result: ProcessingResult = await response.json();

      if (result.success && result.imageUrl) {
        setProcessedUrl(result.imageUrl);
        onImageProcessed?.(result.imageUrl);
      } else {
        setError(result.error || 'Failed to remove background');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  // Add to canvas
  const handleAddToCanvas = () => {
    if (processedUrl) {
      onAddToCanvas?.(processedUrl);
    }
  };

  // Download processed image
  const handleDownload = () => {
    if (processedUrl) {
      const link = document.createElement('a');
      link.href = processedUrl;
      link.download = `background-removed-${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  // Reset state
  const handleReset = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setProcessedUrl(null);
    setError(null);
  };

  return (
    <div className="p-4 space-y-4">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg">
          <Scissors className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="font-semibold text-gray-900">Background Remover</h3>
          <p className="text-xs text-gray-500">AI-powered instant background removal</p>
        </div>
      </div>

      {/* Upload Area */}
      {!previewUrl && (
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          className={`
            relative border-2 border-dashed rounded-xl p-8 text-center transition-all
            ${dragActive 
              ? 'border-purple-500 bg-purple-50' 
              : 'border-gray-300 hover:border-purple-400 hover:bg-gray-50'
            }
          `}
        >
          <input
            type="file"
            accept="image/*"
            onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <div className="space-y-3">
            <div className="mx-auto w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
              <Upload className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700">
                Drop your image here or click to upload
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Supports JPG, PNG, WebP up to 25MB
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Preview & Result */}
      {previewUrl && (
        <div className="space-y-4">
          {/* Before/After Comparison */}
          <div className="grid grid-cols-2 gap-4">
            {/* Original */}
            <div className="space-y-2">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Original</p>
              <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-100 border">
                <img
                  src={previewUrl}
                  alt="Original"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

            {/* Processed */}
            <div className="space-y-2">
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                {processedUrl ? 'Background Removed' : 'Result'}
              </p>
              <div className="relative aspect-square rounded-lg overflow-hidden border"
                style={{
                  backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'20\' height=\'20\' fill-opacity=\'.1\'%3E%3Crect x=\'0\' y=\'0\' width=\'10\' height=\'10\' fill=\'%23000\'/%3E%3Crect x=\'10\' y=\'10\' width=\'10\' height=\'10\' fill=\'%23000\'/%3E%3C/svg%3E")',
                }}
              >
                {processedUrl ? (
                  <img
                    src={processedUrl}
                    alt="Processed"
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
                    {isProcessing ? (
                      <div className="text-center space-y-2">
                        <Loader2 className="w-8 h-8 text-purple-500 animate-spin mx-auto" />
                        <p className="text-xs text-gray-500">Removing background...</p>
                      </div>
                    ) : (
                      <div className="text-center space-y-2">
                        <Sparkles className="w-8 h-8 text-gray-300 mx-auto" />
                        <p className="text-xs text-gray-400">Click "Remove Background"</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="flex items-center gap-2 p-3 bg-red-50 rounded-lg text-red-700">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <p className="text-sm">{error}</p>
            </div>
          )}

          {/* Success Message */}
          {processedUrl && (
            <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg text-green-700">
              <CheckCircle className="w-4 h-4 flex-shrink-0" />
              <p className="text-sm">Background removed successfully!</p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-2">
            {!processedUrl ? (
              <button
                onClick={processImage}
                disabled={isProcessing}
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    <Wand2 className="w-4 h-4" />
                    Remove Background
                  </>
                )}
              </button>
            ) : (
              <>
                <button
                  onClick={handleAddToCanvas}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 transition-all"
                >
                  <ImageIcon className="w-4 h-4" />
                  Add to Canvas
                </button>
                <button
                  onClick={handleDownload}
                  className="flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-all"
                >
                  <Download className="w-4 h-4" />
                </button>
              </>
            )}
            <button
              onClick={handleReset}
              className="flex items-center justify-center gap-2 px-4 py-2.5 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-all"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Tips */}
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-4 space-y-2">
        <h4 className="text-sm font-medium text-purple-900">✨ Pro Tips</h4>
        <ul className="text-xs text-purple-700 space-y-1">
          <li>• Works best with clear subject/background contrast</li>
          <li>• Supports people, products, animals, and objects</li>
          <li>• Results are transparent PNG files</li>
          <li>• Use for stickers, cutouts, and photo collages</li>
        </ul>
      </div>
    </div>
  );
}
