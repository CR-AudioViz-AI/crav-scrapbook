'use client';

import { useState, useEffect } from 'react';
import { Loader2, Download, Shuffle, Copy, Check, User } from 'lucide-react';

interface AvatarCreatorProps {
  onInsertAvatar: (avatar: { url: string; style: string; seed: string }) => void;
}

const AVATAR_STYLES = [
  { id: 'adventurer', name: 'Adventurer', description: 'Illustrated adventure characters' },
  { id: 'avataaars', name: 'Avataaars', description: 'Cartoon avatar style' },
  { id: 'big-ears', name: 'Big Ears', description: 'Cute big-eared characters' },
  { id: 'big-smile', name: 'Big Smile', description: 'Happy smiling faces' },
  { id: 'bottts', name: 'Bottts', description: 'Robot avatars' },
  { id: 'croodles', name: 'Croodles', description: 'Hand-drawn doodle style' },
  { id: 'fun-emoji', name: 'Fun Emoji', description: 'Playful emoji faces' },
  { id: 'icons', name: 'Icons', description: 'Simple icon avatars' },
  { id: 'identicon', name: 'Identicon', description: 'GitHub-style identicons' },
  { id: 'initials', name: 'Initials', description: 'Letter-based avatars' },
  { id: 'lorelei', name: 'Lorelei', description: 'Illustrated portraits' },
  { id: 'micah', name: 'Micah', description: 'Modern illustrated style' },
  { id: 'miniavs', name: 'Miniavs', description: 'Mini avatar characters' },
  { id: 'notionists', name: 'Notionists', description: 'Notion-style avatars' },
  { id: 'open-peeps', name: 'Open Peeps', description: 'Hand-drawn illustrations' },
  { id: 'personas', name: 'Personas', description: 'Diverse character personas' },
  { id: 'pixel-art', name: 'Pixel Art', description: 'Retro pixel style' },
  { id: 'shapes', name: 'Shapes', description: 'Geometric shape avatars' },
  { id: 'thumbs', name: 'Thumbs', description: 'Thumbs up characters' },
];

const BACKGROUND_COLORS = [
  'b6e3f4', 'c0aede', 'd1d4f9', 'ffd5dc', 'ffdfbf',
  'f4d35e', 'ee964b', 'f95738', '083d77', '2dc653',
  '7209b7', '3a0ca3', '4361ee', '4cc9f0', '06d6a0',
  'transparent'
];

export default function AvatarCreator({ onInsertAvatar }: AvatarCreatorProps) {
  const [style, setStyle] = useState('avataaars');
  const [seed, setSeed] = useState('');
  const [backgroundColor, setBackgroundColor] = useState('b6e3f4');
  const [size, setSize] = useState(200);
  const [avatarUrl, setAvatarUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [variations, setVariations] = useState<string[]>([]);

  useEffect(() => {
    generateAvatar();
  }, [style, seed, backgroundColor, size]);

  const generateAvatar = () => {
    const actualSeed = seed || Math.random().toString(36).substring(7);
    const bg = backgroundColor === 'transparent' ? '' : backgroundColor;
    const url = `https://api.dicebear.com/7.x/${style}/svg?seed=${encodeURIComponent(actualSeed)}&size=${size}${bg ? `&backgroundColor=${bg}` : ''}`;
    setAvatarUrl(url);
    
    // Generate variations
    const vars = [];
    for (let i = 0; i < 6; i++) {
      const varSeed = `${actualSeed}-var-${i}`;
      vars.push(`https://api.dicebear.com/7.x/${style}/svg?seed=${encodeURIComponent(varSeed)}&size=80${bg ? `&backgroundColor=${bg}` : ''}`);
    }
    setVariations(vars);
  };

  const randomize = () => {
    setSeed(Math.random().toString(36).substring(7));
  };

  const handleInsert = () => {
    onInsertAvatar({
      url: avatarUrl,
      style,
      seed: seed || 'random'
    });
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(avatarUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = async () => {
    try {
      const response = await fetch(avatarUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `avatar-${style}-${seed || 'random'}.svg`;
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download failed:', error);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-lg shadow-sm">
      {/* Header */}
      <div className="p-4 border-b">
        <h3 className="font-semibold text-lg flex items-center gap-2">
          <User className="w-5 h-5" />
          Avatar Creator
        </h3>
        <p className="text-sm text-gray-500 mt-1">Create unique avatars with DiceBear</p>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Main Preview */}
        <div className="flex flex-col items-center">
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-purple-200 shadow-lg bg-gray-100">
            {avatarUrl && (
              <img
                src={avatarUrl}
                alt="Avatar preview"
                className="w-full h-full object-cover"
              />
            )}
          </div>
          <div className="flex gap-2 mt-4">
            <button
              onClick={randomize}
              className="flex items-center gap-1 px-3 py-1.5 bg-purple-100 text-purple-700 rounded-lg text-sm font-medium hover:bg-purple-200"
            >
              <Shuffle className="w-4 h-4" />
              Randomize
            </button>
            <button
              onClick={handleCopy}
              className="p-1.5 bg-gray-100 rounded-lg hover:bg-gray-200"
              title="Copy URL"
            >
              {copied ? <Check className="w-4 h-4 text-green-600" /> : <Copy className="w-4 h-4" />}
            </button>
            <button
              onClick={handleDownload}
              className="p-1.5 bg-gray-100 rounded-lg hover:bg-gray-200"
              title="Download SVG"
            >
              <Download className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Variations */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Variations</label>
          <div className="flex gap-2 flex-wrap">
            {variations.map((url, i) => (
              <button
                key={i}
                onClick={() => setSeed(`${seed || 'random'}-var-${i}`)}
                className="w-12 h-12 rounded-full overflow-hidden border-2 border-gray-200 hover:border-purple-400 transition"
              >
                <img src={url} alt={`Variation ${i + 1}`} className="w-full h-full" />
              </button>
            ))}
          </div>
        </div>

        {/* Seed Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Name/Seed</label>
          <input
            type="text"
            value={seed}
            onChange={(e) => setSeed(e.target.value)}
            placeholder="Enter a name or leave empty for random"
            className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
        </div>

        {/* Style Selector */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Style</label>
          <div className="grid grid-cols-3 gap-2 max-h-40 overflow-y-auto">
            {AVATAR_STYLES.map((s) => (
              <button
                key={s.id}
                onClick={() => setStyle(s.id)}
                className={`p-2 rounded-lg border text-left transition ${
                  style === s.id
                    ? 'border-purple-600 bg-purple-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <p className="text-xs font-medium truncate">{s.name}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Background Color */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Background</label>
          <div className="flex flex-wrap gap-2">
            {BACKGROUND_COLORS.map((color) => (
              <button
                key={color}
                onClick={() => setBackgroundColor(color)}
                className={`w-8 h-8 rounded-lg border-2 transition ${
                  backgroundColor === color
                    ? 'border-purple-600 ring-2 ring-purple-200'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                style={{
                  backgroundColor: color === 'transparent' ? 'transparent' : `#${color}`,
                  backgroundImage: color === 'transparent' 
                    ? 'linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(-45deg, transparent 75%, #ccc 75%)'
                    : 'none',
                  backgroundSize: '8px 8px',
                  backgroundPosition: '0 0, 0 4px, 4px -4px, -4px 0px'
                }}
              />
            ))}
          </div>
        </div>

        {/* Size */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Size: {size}px</label>
          <input
            type="range"
            min="50"
            max="500"
            value={size}
            onChange={(e) => setSize(Number(e.target.value))}
            className="w-full"
          />
        </div>

        {/* Insert Button */}
        <button
          onClick={handleInsert}
          className="w-full py-3 bg-purple-600 text-white rounded-lg font-medium hover:bg-purple-700 flex items-center justify-center gap-2"
        >
          Add to Canvas
        </button>
      </div>

      {/* Footer */}
      <div className="p-3 border-t bg-gray-50 text-xs text-gray-500 text-center">
        Powered by DiceBear • Free for commercial use
      </div>
    </div>
  );
}
