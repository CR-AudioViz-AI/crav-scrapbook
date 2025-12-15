'use client';

// components/editor/AIEnhancePanel.tsx
// AI-powered photo enhancement tools

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Wand2, Eraser, Maximize, Palette, Sparkles, RefreshCw,
  Sun, Contrast, Droplets, Focus, Scissors, User, X, Loader2,
  ChevronRight, Check
} from 'lucide-react';

interface AIEnhancePanelProps {
  imageUrl: string;
  onEnhance: (enhancedUrl: string) => void;
  onClose: () => void;
}

const AI_TOOLS = [
  { id: 'remove-bg', name: 'Remove Background', icon: Eraser, description: 'Instantly remove the background' },
  { id: 'upscale', name: 'Upscale 2x', icon: Maximize, description: 'Enhance resolution without quality loss' },
  { id: 'auto-enhance', name: 'Auto Enhance', icon: Wand2, description: 'AI-powered one-click enhancement' },
  { id: 'colorize', name: 'Colorize', icon: Palette, description: 'Add color to black & white photos' },
  { id: 'restore', name: 'Restore Old Photo', icon: RefreshCw, description: 'Fix scratches, tears, and fading' },
  { id: 'face-enhance', name: 'Face Enhance', icon: User, description: 'Improve facial details and clarity' },
  { id: 'smart-crop', name: 'Smart Crop', icon: Scissors, description: 'AI-powered subject-aware cropping' },
];

const QUICK_FILTERS = [
  { id: 'brighten', name: 'Brighten', icon: Sun },
  { id: 'contrast', name: 'Contrast', icon: Contrast },
  { id: 'saturate', name: 'Vivid', icon: Droplets },
  { id: 'sharpen', name: 'Sharpen', icon: Focus },
];

export function AIEnhancePanel({ imageUrl, onEnhance, onClose }: AIEnhancePanelProps) {
  const [processing, setProcessing] = useState<string | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>(imageUrl);
  const [appliedEffects, setAppliedEffects] = useState<string[]>([]);

  const applyEnhancement = async (toolId: string) => {
    setProcessing(toolId);
    
    try {
      const response = await fetch('/api/ai/enhance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: toolId,
          imageUrl: previewUrl
        })
      });

      const data = await response.json();
      
      if (data.success) {
        if (data.imageData) {
          setPreviewUrl(data.imageData);
        }
        setAppliedEffects(prev => [...prev, toolId]);
      }
    } catch (error) {
      console.error('Enhancement failed:', error);
    } finally {
      setProcessing(null);
    }
  };

  const handleSave = () => {
    onEnhance(previewUrl);
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 z-50 flex"
    >
      {/* Preview Area */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="relative max-w-3xl max-h-[80vh]">
          <img
            src={previewUrl}
            alt="Preview"
            className="max-w-full max-h-[80vh] rounded-2xl shadow-2xl"
          />
          {processing && (
            <div className="absolute inset-0 bg-black/50 rounded-2xl flex items-center justify-center">
              <div className="text-center text-white">
                <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4" />
                <p className="text-lg font-medium">Enhancing with AI...</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Tools Panel */}
      <div className="w-96 bg-gray-900 border-l border-gray-800 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">AI Enhance</h2>
              <p className="text-sm text-gray-400">Powered by AI</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-800 rounded-lg text-gray-400">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Filters */}
        <div className="px-6 py-4 border-b border-gray-800">
          <h3 className="text-sm font-medium text-gray-400 mb-3">Quick Adjustments</h3>
          <div className="grid grid-cols-4 gap-2">
            {QUICK_FILTERS.map((filter) => (
              <button
                key={filter.id}
                onClick={() => applyEnhancement(filter.id)}
                disabled={processing !== null}
                className="flex flex-col items-center gap-2 p-3 rounded-xl bg-gray-800 hover:bg-gray-700 transition disabled:opacity-50"
              >
                <filter.icon className="w-5 h-5 text-gray-300" />
                <span className="text-xs text-gray-400">{filter.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* AI Tools */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          <h3 className="text-sm font-medium text-gray-400 mb-3">AI Tools</h3>
          <div className="space-y-2">
            {AI_TOOLS.map((tool) => (
              <button
                key={tool.id}
                onClick={() => applyEnhancement(tool.id)}
                disabled={processing !== null}
                className={`w-full flex items-center gap-4 p-4 rounded-xl transition ${
                  appliedEffects.includes(tool.id)
                    ? 'bg-purple-500/20 border border-purple-500/50'
                    : 'bg-gray-800 hover:bg-gray-700'
                } disabled:opacity-50`}
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  appliedEffects.includes(tool.id) ? 'bg-purple-500' : 'bg-gray-700'
                }`}>
                  {processing === tool.id ? (
                    <Loader2 className="w-5 h-5 text-white animate-spin" />
                  ) : appliedEffects.includes(tool.id) ? (
                    <Check className="w-5 h-5 text-white" />
                  ) : (
                    <tool.icon className="w-5 h-5 text-gray-300" />
                  )}
                </div>
                <div className="flex-1 text-left">
                  <p className="font-medium text-white">{tool.name}</p>
                  <p className="text-sm text-gray-400">{tool.description}</p>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-500" />
              </button>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-800 space-y-3">
          <div className="flex gap-3">
            <button
              onClick={() => {
                setPreviewUrl(imageUrl);
                setAppliedEffects([]);
              }}
              className="flex-1 py-3 border border-gray-700 text-gray-300 rounded-xl hover:bg-gray-800 transition"
            >
              Reset
            </button>
            <button
              onClick={handleSave}
              disabled={previewUrl === imageUrl}
              className="flex-1 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-medium hover:opacity-90 transition disabled:opacity-50"
            >
              Apply Changes
            </button>
          </div>
          <p className="text-xs text-center text-gray-500">
            Free tier: 10 AI enhancements per month
          </p>
        </div>
      </div>
    </motion.div>
  );
}
