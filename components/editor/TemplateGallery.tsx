'use client';

// components/editor/TemplateGallery.tsx
// Browse and apply 50+ professional templates

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, X, Filter, ChevronDown, Sparkles, Crown, Check,
  Baby, Heart, Plane, Users, Cake, GraduationCap, TreePine, 
  PawPrint, Flower, Palette, Camera, Brush
} from 'lucide-react';
import { TEMPLATES, TEMPLATE_CATEGORIES, TemplateData } from '@/lib/data/templates';

interface TemplateGalleryProps {
  onClose: () => void;
  onSelect: (template: TemplateData) => void;
}

const CATEGORY_ICONS: Record<string, any> = {
  baby: Baby,
  wedding: Heart,
  travel: Plane,
  family: Users,
  birthday: Cake,
  graduation: GraduationCap,
  holiday: TreePine,
  pet: PawPrint,
  nature: Flower,
  minimal: Palette,
  vintage: Camera,
  artistic: Brush,
};

export function TemplateGallery({ onClose, onSelect }: TemplateGalleryProps) {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [showPremiumOnly, setShowPremiumOnly] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateData | null>(null);

  const filteredTemplates = useMemo(() => {
    let results = TEMPLATES;

    if (activeCategory) {
      results = results.filter(t => t.category === activeCategory);
    }

    if (search) {
      const searchLower = search.toLowerCase();
      results = results.filter(t =>
        t.name.toLowerCase().includes(searchLower) ||
        t.description.toLowerCase().includes(searchLower) ||
        t.tags.some(tag => tag.toLowerCase().includes(searchLower))
      );
    }

    if (showPremiumOnly) {
      results = results.filter(t => t.isPremium);
    }

    return results;
  }, [search, activeCategory, showPremiumOnly]);

  const handleApply = () => {
    if (selectedTemplate) {
      onSelect(selectedTemplate);
      onClose();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 to-purple-500 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Template Gallery</h2>
              <p className="text-sm text-gray-500">{TEMPLATES.length}+ professional designs</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar - Categories */}
          <div className="w-64 border-r border-gray-200 dark:border-gray-700 overflow-y-auto">
            <div className="p-4">
              <button
                onClick={() => setActiveCategory(null)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                  !activeCategory
                    ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white'
                    : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                <Sparkles className="w-5 h-5" />
                <span className="font-medium">All Templates</span>
                <span className="ml-auto text-sm opacity-70">{TEMPLATES.length}</span>
              </button>
            </div>

            <div className="px-4 pb-4 space-y-1">
              {TEMPLATE_CATEGORIES.map((cat) => {
                const Icon = CATEGORY_ICONS[cat.id] || Sparkles;
                const count = TEMPLATES.filter(t => t.category === cat.id).length;
                
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition ${
                      activeCategory === cat.id
                        ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white'
                        : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                  >
                    <div 
                      className="w-8 h-8 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: activeCategory === cat.id ? 'rgba(255,255,255,0.2)' : cat.color + '20' }}
                    >
                      <Icon className="w-4 h-4" style={{ color: activeCategory === cat.id ? 'white' : cat.color }} />
                    </div>
                    <span className="font-medium">{cat.name}</span>
                    <span className="ml-auto text-sm opacity-70">{count}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Search Bar */}
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search templates..."
                    className="w-full pl-10 pr-4 py-3 bg-gray-100 dark:bg-gray-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-500"
                  />
                </div>
              </div>
            </div>

            {/* Template Grid */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTemplates.map((template) => (
                  <motion.button
                    key={template.id}
                    onClick={() => setSelectedTemplate(template)}
                    className={`group relative rounded-2xl overflow-hidden border-2 transition text-left ${
                      selectedTemplate?.id === template.id
                        ? 'border-pink-500 ring-4 ring-pink-500/30'
                        : 'border-gray-200 dark:border-gray-700 hover:border-pink-300'
                    }`}
                    whileHover={{ y: -4 }}
                  >
                    {/* Thumbnail */}
                    <div className="aspect-[4/5] bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 flex items-center justify-center">
                      <div 
                        className="w-3/4 h-3/4 rounded-lg shadow-lg"
                        style={{ 
                          background: template.pages[0]?.background?.gradient 
                            ? `linear-gradient(${template.pages[0].background.gradient.angle || 135}deg, ${template.pages[0].background.gradient.colors?.map((c: any) => c.color).join(', ') || '#f0f0f0'})`
                            : template.pages[0]?.background?.color || '#f0f0f0'
                        }}
                      />
                    </div>

                    {/* Info */}
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-bold text-gray-900 dark:text-white">{template.name}</h3>
                        {template.isPremium && (
                          <Crown className="w-4 h-4 text-yellow-500" />
                        )}
                      </div>
                      <p className="text-sm text-gray-500 line-clamp-2">{template.description}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                          {template.pageCount} pages
                        </span>
                        <span className="text-xs text-gray-400">
                          {TEMPLATE_CATEGORIES.find(c => c.id === template.category)?.name}
                        </span>
                      </div>
                    </div>

                    {/* Selection indicator */}
                    {selectedTemplate?.id === template.id && (
                      <div className="absolute top-3 right-3 w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center">
                        <Check className="w-5 h-5 text-white" />
                      </div>
                    )}
                  </motion.button>
                ))}
              </div>

              {filteredTemplates.length === 0 && (
                <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                  <Sparkles className="w-16 h-16 mb-4 opacity-50" />
                  <p>No templates found. Try a different search.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        {selectedTemplate && (
          <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between bg-gray-50 dark:bg-gray-800/50">
            <div>
              <p className="font-bold text-gray-900 dark:text-white">{selectedTemplate.name}</p>
              <p className="text-sm text-gray-500">{selectedTemplate.pageCount} pages ready to customize</p>
            </div>
            <button
              onClick={handleApply}
              className="px-8 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-xl font-bold hover:opacity-90 flex items-center gap-2"
            >
              <Sparkles className="w-5 h-5" />
              Use This Template
            </button>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
