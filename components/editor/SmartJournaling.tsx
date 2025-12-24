'use client';

import React, { useState, useCallback } from 'react';
import { PenTool, Sparkles, MessageSquare, Quote, Heart, Calendar, MapPin, Users, Loader2, Copy, Check, RefreshCw } from 'lucide-react';

// Journaling prompt templates
const JOURNALING_PROMPTS = {
  'caption': {
    name: 'Photo Caption',
    icon: MessageSquare,
    description: 'Short, catchy caption',
    templates: [
      "Making memories that last a lifetime ✨",
      "Every picture tells a story 📸",
      "Cherishing these precious moments 💕",
      "Living our best life, one photo at a time",
      "Happiness looks gorgeous on us 🌟",
      "Creating our own sunshine ☀️",
      "Adventure awaits around every corner 🗺️",
      "Together is our favorite place to be 💝",
    ]
  },
  'memory': {
    name: 'Memory Journal',
    icon: Heart,
    description: 'Detailed memory entry',
    templates: [
      "This moment captured exactly how I felt - surrounded by love, filled with joy, and grateful for every second we share together. Looking at this photo takes me right back to that perfect day.",
      "Some days are just meant to be remembered forever. The laughter, the warmth, the feeling of being exactly where you're supposed to be - this photo holds all of that and more.",
      "Years from now, I want to remember exactly how this felt. The way the light hit everything just right, the sounds of happiness all around, the feeling that life couldn't get any better.",
    ]
  },
  'story': {
    name: 'Story Starter',
    icon: Quote,
    description: 'Narrative beginning',
    templates: [
      "It all started with...",
      "The day began like any other, but little did we know...",
      "Looking back, this was the moment everything changed...",
      "They say the best stories are lived, not told. This is ours...",
      "In the heart of this ordinary day, something extraordinary happened...",
    ]
  },
  'date': {
    name: 'Date & Details',
    icon: Calendar,
    description: 'Who, what, when, where',
    templates: [
      "📅 Date: [Enter date]\n📍 Location: [Enter location]\n👥 With: [Enter names]\n💭 Occasion: [Enter occasion]",
      "When: \nWhere: \nWho: \nWhy this matters: ",
    ]
  },
  'gratitude': {
    name: 'Gratitude Entry',
    icon: Heart,
    description: 'What you\'re thankful for',
    templates: [
      "In this moment, I'm grateful for:\n• The people who make life beautiful\n• The memories we're creating together\n• The simple joy of being present\n• The love that surrounds us",
      "Thankful for: the laughter, the love, the little things that make big memories. This photo reminds me that happiness isn't a destination - it's right here, right now.",
      "Gratitude fills my heart when I look at this. For the people in my life, for moments like these, for the ability to freeze time in a photograph.",
    ]
  },
  'letter': {
    name: 'Letter Format',
    icon: PenTool,
    description: 'Dear future self...',
    templates: [
      "Dear Future Me,\n\nI hope when you look at this photo, you remember exactly how it felt. The way your heart was so full, the way everything seemed possible, the way love was everywhere you looked.\n\nRemember this feeling.\n\nWith love,\nYour Past Self",
      "To my little ones,\n\nOne day you'll look at this photo and wonder what life was like. Let me tell you - it was magical. Chaotic, exhausting, but absolutely magical.\n\nLove always,\nMom/Dad",
    ]
  },
  'milestone': {
    name: 'Milestone Marker',
    icon: MapPin,
    description: 'First times & achievements',
    templates: [
      "🎉 MILESTONE MOMENT 🎉\n\nWhat: [First/Achievement]\nWhen: [Date]\nHow it felt: [Emotion]\nWhy it matters: [Significance]",
      "A moment to remember: Today marked a special milestone in our journey. We celebrated, we laughed, we made memories that will last forever.",
      "First time for everything! This photo captures one of those magical 'firsts' that we'll treasure forever.",
    ]
  },
  'family': {
    name: 'Family Story',
    icon: Users,
    description: 'Family-focused journaling',
    templates: [
      "Our family story is written in moments like these. In the chaos and the calm, the laughter and the love, we find our greatest joy - being together.",
      "Family isn't just about sharing a name. It's about sharing moments like this one. Building a legacy of love, one memory at a time.",
      "The best inheritance we can give our children is a lifetime of memories. This photo is a piece of that treasure.",
    ]
  },
};

// AI-generated captions based on themes
const THEME_CAPTIONS: Record<string, string[]> = {
  'birthday': [
    "Another trip around the sun, and every year gets better! 🎂",
    "Celebrating [NAME] and all the joy they bring to our lives ✨",
    "Make a wish! Here's to another year of dreams coming true 🌟",
    "Growing older, growing wiser, growing more loved every day 💕",
  ],
  'wedding': [
    "Two hearts, one love, forever and always 💍",
    "The beginning of our forever story 👰🤵",
    "Love brought us together, and here we'll stay 💕",
    "Every love story is beautiful, but ours is my favorite",
  ],
  'baby': [
    "The tiniest feet leave the biggest footprints on our hearts 👶",
    "A new chapter begins with the sweetest little character 💕",
    "Born to be loved, destined to be cherished forever",
    "Our greatest adventure began with you, little one ✨",
  ],
  'vacation': [
    "Adventure awaits around every corner 🌴",
    "Collect moments, not things 📸",
    "Life's too short for boring vacations ✈️",
    "Making memories in paradise 🏝️",
  ],
  'graduation': [
    "The tassel was worth the hassle! 🎓",
    "One chapter ends, a new adventure begins ✨",
    "Dreams don't work unless you do - and look where hard work got us!",
    "Proud doesn't even begin to describe how we feel 💕",
  ],
  'holiday': [
    "Making spirits bright, one memory at a time 🎄",
    "The magic of the season is in moments like these ✨",
    "Thankful for family, grateful for love, blessed beyond measure 🙏",
    "Creating traditions, building memories, spreading joy 💝",
  ],
  'everyday': [
    "It's the ordinary moments that become extraordinary memories 💕",
    "No special occasion needed - just us, being us ✨",
    "Tuesday looked pretty great from here 📸",
    "These simple moments are the ones we'll treasure most",
  ],
};

interface SmartJournalingProps {
  onInsertText?: (text: string) => void;
  selectedTheme?: string;
}

export function SmartJournaling({ onInsertText, selectedTheme = 'everyday' }: SmartJournalingProps) {
  const [selectedPrompt, setSelectedPrompt] = useState<string>('caption');
  const [generatedText, setGeneratedText] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [customTheme, setCustomTheme] = useState(selectedTheme);

  const generateText = useCallback(async () => {
    setIsGenerating(true);
    
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 600));
    
    const prompt = JOURNALING_PROMPTS[selectedPrompt as keyof typeof JOURNALING_PROMPTS];
    if (prompt) {
      const templates = prompt.templates;
      const randomTemplate = templates[Math.floor(Math.random() * templates.length)];
      
      // If it's a caption, also consider theme-based captions
      if (selectedPrompt === 'caption' && customTheme && THEME_CAPTIONS[customTheme]) {
        const themeCaptions = THEME_CAPTIONS[customTheme];
        const useTheme = Math.random() > 0.5;
        if (useTheme) {
          setGeneratedText(themeCaptions[Math.floor(Math.random() * themeCaptions.length)]);
        } else {
          setGeneratedText(randomTemplate);
        }
      } else {
        setGeneratedText(randomTemplate);
      }
    }
    
    setIsGenerating(false);
  }, [selectedPrompt, customTheme]);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(generatedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [generatedText]);

  const handleInsert = useCallback(() => {
    if (generatedText) {
      onInsertText?.(generatedText);
    }
  }, [generatedText, onInsertText]);

  return (
    <div className="flex flex-col h-full bg-gray-900 text-white">
      {/* Header */}
      <div className="p-3 border-b border-gray-700">
        <h3 className="text-lg font-semibold mb-1 flex items-center gap-2">
          <PenTool className="w-5 h-5 text-rose-400" />
          Smart Journaling
        </h3>
        <p className="text-xs text-gray-400">
          AI-powered captions & journaling text
        </p>
      </div>

      {/* Theme Selector */}
      <div className="p-3 border-b border-gray-700">
        <label className="text-xs text-gray-400 mb-2 block">Photo Theme</label>
        <select
          value={customTheme}
          onChange={(e) => setCustomTheme(e.target.value)}
          className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-rose-500"
        >
          <option value="everyday">Everyday Moments</option>
          <option value="birthday">Birthday Celebration</option>
          <option value="wedding">Wedding & Love</option>
          <option value="baby">Baby & Family</option>
          <option value="vacation">Travel & Adventure</option>
          <option value="graduation">Graduation & Achievement</option>
          <option value="holiday">Holidays & Seasons</option>
        </select>
      </div>

      {/* Journaling Type */}
      <div className="p-3 border-b border-gray-700">
        <label className="text-xs text-gray-400 mb-2 block">Journaling Style</label>
        <div className="grid grid-cols-2 gap-2">
          {Object.entries(JOURNALING_PROMPTS).map(([key, prompt]) => {
            const Icon = prompt.icon;
            return (
              <button
                key={key}
                onClick={() => setSelectedPrompt(key)}
                className={`flex items-center gap-2 p-2 rounded-lg text-xs transition-colors ${
                  selectedPrompt === key
                    ? 'bg-rose-600 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                <div className="text-left overflow-hidden">
                  <div className="font-medium truncate">{prompt.name}</div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Generated Text */}
      <div className="p-3 flex-1">
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs text-gray-400">Generated Text</label>
          {generatedText && (
            <button
              onClick={handleCopy}
              className="text-xs text-gray-400 hover:text-white flex items-center gap-1"
            >
              {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
              {copied ? 'Copied!' : 'Copy'}
            </button>
          )}
        </div>
        <div className="relative">
          <textarea
            value={generatedText}
            onChange={(e) => setGeneratedText(e.target.value)}
            placeholder="Click 'Generate' to create journaling text..."
            className="w-full h-40 bg-gray-800 border border-gray-600 rounded-lg p-3 text-sm resize-none focus:outline-none focus:border-rose-500"
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="p-3 space-y-2 border-t border-gray-700">
        <div className="flex gap-2">
          <button
            onClick={generateText}
            disabled={isGenerating}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-rose-600 hover:bg-rose-700 disabled:bg-rose-800 rounded-lg font-medium transition-colors"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                Generate
              </>
            )}
          </button>
          <button
            onClick={generateText}
            disabled={isGenerating}
            className="px-3 py-2.5 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
            title="Generate another"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
        
        <button
          onClick={handleInsert}
          disabled={!generatedText}
          className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 disabled:text-gray-500 rounded-lg text-sm transition-colors"
        >
          <PenTool className="w-4 h-4" />
          Insert into Page
        </button>
      </div>

      {/* Tips */}
      <div className="p-3 bg-gray-800/50 border-t border-gray-700">
        <p className="text-xs text-gray-500">
          💡 <strong>Tip:</strong> You can edit the generated text before inserting. Mix and match styles for unique journaling!
        </p>
      </div>
    </div>
  );
}

export default SmartJournaling;
