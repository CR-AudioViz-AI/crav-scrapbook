// components/editor/QuotesBrowser.tsx
// Inspirational Quotes Library for Scrapbook Journaling
// Timestamp: Tuesday, December 24, 2025 – 3:00 PM Eastern Time
// CR AudioViz AI - "Your Story. Our Design"

'use client';

import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Quote, 
  Heart, 
  Star, 
  Sparkles, 
  Smile, 
  Users, 
  Compass, 
  Sun,
  Baby,
  GraduationCap,
  Cake,
  Plane,
  TreePine,
  Copy,
  Check,
  Plus
} from 'lucide-react';

interface QuoteItem {
  id: string;
  text: string;
  author: string;
  category: string;
  tags: string[];
}

interface QuotesBrowserProps {
  onSelect?: (quote: QuoteItem) => void;
  onAddToCanvas?: (text: string, author: string) => void;
}

// Comprehensive quotes library organized by scrapbooking themes
const QUOTES_LIBRARY: QuoteItem[] = [
  // FAMILY
  { id: 'fam-1', text: 'Family is not an important thing. It\'s everything.', author: 'Michael J. Fox', category: 'family', tags: ['love', 'home'] },
  { id: 'fam-2', text: 'The love of a family is life\'s greatest blessing.', author: 'Unknown', category: 'family', tags: ['love', 'blessing'] },
  { id: 'fam-3', text: 'In family life, love is the oil that eases friction.', author: 'Friedrich Nietzsche', category: 'family', tags: ['love', 'life'] },
  { id: 'fam-4', text: 'Family: where life begins and love never ends.', author: 'Unknown', category: 'family', tags: ['love', 'home'] },
  { id: 'fam-5', text: 'The memories we make with our family is everything.', author: 'Candace Cameron Bure', category: 'family', tags: ['memories', 'love'] },
  { id: 'fam-6', text: 'Home is where your story begins.', author: 'Unknown', category: 'family', tags: ['home', 'story'] },
  { id: 'fam-7', text: 'Together is our favorite place to be.', author: 'Unknown', category: 'family', tags: ['together', 'love'] },
  { id: 'fam-8', text: 'Family is the heart of a home.', author: 'Unknown', category: 'family', tags: ['home', 'heart'] },

  // LOVE & ROMANCE
  { id: 'love-1', text: 'The best thing to hold onto in life is each other.', author: 'Audrey Hepburn', category: 'love', tags: ['together', 'romance'] },
  { id: 'love-2', text: 'Love is composed of a single soul inhabiting two bodies.', author: 'Aristotle', category: 'love', tags: ['soul', 'romance'] },
  { id: 'love-3', text: 'You are my today and all of my tomorrows.', author: 'Leo Christopher', category: 'love', tags: ['forever', 'romance'] },
  { id: 'love-4', text: 'I have found the one whom my soul loves.', author: 'Song of Solomon', category: 'love', tags: ['soul', 'romance'] },
  { id: 'love-5', text: 'Every love story is beautiful, but ours is my favorite.', author: 'Unknown', category: 'love', tags: ['story', 'romance'] },
  { id: 'love-6', text: 'Where there is love, there is life.', author: 'Mahatma Gandhi', category: 'love', tags: ['life', 'romance'] },
  { id: 'love-7', text: 'You are my sun, my moon, and all my stars.', author: 'E.E. Cummings', category: 'love', tags: ['romance', 'poetry'] },
  { id: 'love-8', text: 'And suddenly all the love songs were about you.', author: 'Unknown', category: 'love', tags: ['music', 'romance'] },

  // FRIENDSHIP
  { id: 'friend-1', text: 'A friend is someone who knows all about you and still loves you.', author: 'Elbert Hubbard', category: 'friendship', tags: ['love', 'understanding'] },
  { id: 'friend-2', text: 'Good friends are like stars. You don\'t always see them, but you know they\'re always there.', author: 'Unknown', category: 'friendship', tags: ['stars', 'forever'] },
  { id: 'friend-3', text: 'Friends are the family you choose.', author: 'Jess C. Scott', category: 'friendship', tags: ['family', 'choice'] },
  { id: 'friend-4', text: 'True friendship comes when the silence between two people is comfortable.', author: 'David Tyson', category: 'friendship', tags: ['comfort', 'understanding'] },
  { id: 'friend-5', text: 'A real friend is one who walks in when the rest of the world walks out.', author: 'Walter Winchell', category: 'friendship', tags: ['loyalty', 'support'] },
  { id: 'friend-6', text: 'Side by side or miles apart, friends are forever close to the heart.', author: 'Unknown', category: 'friendship', tags: ['heart', 'distance'] },

  // BABY & CHILDREN
  { id: 'baby-1', text: 'A baby fills a place in your heart that you never knew was empty.', author: 'Unknown', category: 'baby', tags: ['heart', 'love'] },
  { id: 'baby-2', text: 'Ten little fingers, ten perfect toes, fill our hearts with love that overflows.', author: 'Unknown', category: 'baby', tags: ['love', 'newborn'] },
  { id: 'baby-3', text: 'Babies are bits of stardust, blown from the hand of God.', author: 'Barretto', category: 'baby', tags: ['miracle', 'blessing'] },
  { id: 'baby-4', text: 'The littlest feet make the biggest footprints in our hearts.', author: 'Unknown', category: 'baby', tags: ['heart', 'footprints'] },
  { id: 'baby-5', text: 'Children are the anchors of a mother\'s life.', author: 'Sophocles', category: 'baby', tags: ['mother', 'anchor'] },
  { id: 'baby-6', text: 'Making the decision to have a child is momentous. It is to decide forever to have your heart go walking around outside your body.', author: 'Elizabeth Stone', category: 'baby', tags: ['heart', 'parenthood'] },
  { id: 'baby-7', text: 'A new baby is like the beginning of all things—wonder, hope, a dream of possibilities.', author: 'Eda LeShan', category: 'baby', tags: ['hope', 'possibilities'] },
  { id: 'baby-8', text: 'Twinkle, twinkle little star, do you know how loved you are?', author: 'Unknown', category: 'baby', tags: ['star', 'love'] },

  // INSPIRATIONAL
  { id: 'insp-1', text: 'The only way to do great work is to love what you do.', author: 'Steve Jobs', category: 'inspirational', tags: ['work', 'passion'] },
  { id: 'insp-2', text: 'Believe you can and you\'re halfway there.', author: 'Theodore Roosevelt', category: 'inspirational', tags: ['believe', 'confidence'] },
  { id: 'insp-3', text: 'In the middle of every difficulty lies opportunity.', author: 'Albert Einstein', category: 'inspirational', tags: ['opportunity', 'challenge'] },
  { id: 'insp-4', text: 'The future belongs to those who believe in the beauty of their dreams.', author: 'Eleanor Roosevelt', category: 'inspirational', tags: ['dreams', 'future'] },
  { id: 'insp-5', text: 'She believed she could, so she did.', author: 'R.S. Grey', category: 'inspirational', tags: ['believe', 'achieve'] },
  { id: 'insp-6', text: 'Life is not about waiting for the storm to pass, it\'s about learning to dance in the rain.', author: 'Vivian Greene', category: 'inspirational', tags: ['life', 'resilience'] },
  { id: 'insp-7', text: 'Be the change you wish to see in the world.', author: 'Mahatma Gandhi', category: 'inspirational', tags: ['change', 'action'] },
  { id: 'insp-8', text: 'You are never too old to set another goal or dream a new dream.', author: 'C.S. Lewis', category: 'inspirational', tags: ['dreams', 'goals'] },

  // TRAVEL & ADVENTURE
  { id: 'travel-1', text: 'The world is a book and those who do not travel read only one page.', author: 'Saint Augustine', category: 'travel', tags: ['world', 'explore'] },
  { id: 'travel-2', text: 'Adventure is worthwhile in itself.', author: 'Amelia Earhart', category: 'travel', tags: ['adventure', 'worth'] },
  { id: 'travel-3', text: 'Travel far enough, you meet yourself.', author: 'David Mitchell', category: 'travel', tags: ['journey', 'self'] },
  { id: 'travel-4', text: 'Life is either a daring adventure or nothing at all.', author: 'Helen Keller', category: 'travel', tags: ['adventure', 'life'] },
  { id: 'travel-5', text: 'Take only memories, leave only footprints.', author: 'Chief Seattle', category: 'travel', tags: ['memories', 'nature'] },
  { id: 'travel-6', text: 'Jobs fill your pocket, but adventures fill your soul.', author: 'Jaime Lyn Beatty', category: 'travel', tags: ['soul', 'adventure'] },
  { id: 'travel-7', text: 'Collect moments, not things.', author: 'Unknown', category: 'travel', tags: ['moments', 'experiences'] },
  { id: 'travel-8', text: 'Not all those who wander are lost.', author: 'J.R.R. Tolkien', category: 'travel', tags: ['wander', 'journey'] },

  // MILESTONES & CELEBRATION
  { id: 'mile-1', text: 'Today is the first day of the rest of your life.', author: 'Charles Dederich', category: 'milestones', tags: ['new', 'beginning'] },
  { id: 'mile-2', text: 'The tassel was worth the hassle.', author: 'Unknown', category: 'milestones', tags: ['graduation', 'achievement'] },
  { id: 'mile-3', text: 'Cheers to a new chapter in life.', author: 'Unknown', category: 'milestones', tags: ['new', 'chapter'] },
  { id: 'mile-4', text: 'What feels like the end is often the beginning.', author: 'Unknown', category: 'milestones', tags: ['end', 'beginning'] },
  { id: 'mile-5', text: 'Go confidently in the direction of your dreams.', author: 'Henry David Thoreau', category: 'milestones', tags: ['dreams', 'confidence'] },
  { id: 'mile-6', text: 'The best is yet to come.', author: 'Frank Sinatra', category: 'milestones', tags: ['future', 'hope'] },

  // BIRTHDAY
  { id: 'bday-1', text: 'Count your age by friends, not years. Count your life by smiles, not tears.', author: 'John Lennon', category: 'birthday', tags: ['age', 'friends'] },
  { id: 'bday-2', text: 'Today you are you! That is truer than true! There is no one alive who is you-er than you!', author: 'Dr. Seuss', category: 'birthday', tags: ['unique', 'celebration'] },
  { id: 'bday-3', text: 'Another year older, another year wiser.', author: 'Unknown', category: 'birthday', tags: ['wisdom', 'growth'] },
  { id: 'bday-4', text: 'A birthday is nature\'s way of telling us to eat more cake.', author: 'Unknown', category: 'birthday', tags: ['cake', 'fun'] },
  { id: 'bday-5', text: 'Age is merely the number of years the world has been enjoying you.', author: 'Unknown', category: 'birthday', tags: ['age', 'joy'] },

  // HOLIDAYS
  { id: 'hol-1', text: 'Christmas isn\'t a season. It\'s a feeling.', author: 'Edna Ferber', category: 'holidays', tags: ['christmas', 'feeling'] },
  { id: 'hol-2', text: 'The best of all gifts around any Christmas tree: the presence of a happy family.', author: 'Burton Hillis', category: 'holidays', tags: ['christmas', 'family'] },
  { id: 'hol-3', text: 'Gratitude turns what we have into enough.', author: 'Unknown', category: 'holidays', tags: ['thanksgiving', 'gratitude'] },
  { id: 'hol-4', text: 'Every day may not be good, but there is something good in every day.', author: 'Unknown', category: 'holidays', tags: ['gratitude', 'positivity'] },
  { id: 'hol-5', text: 'Love is what\'s in the room with you at Christmas if you stop opening presents and listen.', author: 'Bobby', category: 'holidays', tags: ['christmas', 'love'] },

  // MEMORIES
  { id: 'mem-1', text: 'We do not remember days, we remember moments.', author: 'Cesare Pavese', category: 'memories', tags: ['moments', 'remember'] },
  { id: 'mem-2', text: 'The best thing about memories is making them.', author: 'Unknown', category: 'memories', tags: ['making', 'joy'] },
  { id: 'mem-3', text: 'Some memories never leave your bones.', author: 'Unknown', category: 'memories', tags: ['lasting', 'deep'] },
  { id: 'mem-4', text: 'Take a picture, it lasts longer.', author: 'Unknown', category: 'memories', tags: ['photo', 'capture'] },
  { id: 'mem-5', text: 'Life is made of small moments like this.', author: 'Unknown', category: 'memories', tags: ['moments', 'life'] },
  { id: 'mem-6', text: 'Yesterday is history, tomorrow is a mystery, today is a gift. That\'s why it\'s called the present.', author: 'Eleanor Roosevelt', category: 'memories', tags: ['present', 'gift'] },
];

// Categories
const CATEGORIES = [
  { id: 'all', name: 'All Quotes', icon: Sparkles },
  { id: 'family', name: 'Family', icon: Users },
  { id: 'love', name: 'Love', icon: Heart },
  { id: 'friendship', name: 'Friendship', icon: Star },
  { id: 'baby', name: 'Baby', icon: Baby },
  { id: 'inspirational', name: 'Inspiration', icon: Sun },
  { id: 'travel', name: 'Travel', icon: Plane },
  { id: 'milestones', name: 'Milestones', icon: GraduationCap },
  { id: 'birthday', name: 'Birthday', icon: Cake },
  { id: 'holidays', name: 'Holidays', icon: TreePine },
  { id: 'memories', name: 'Memories', icon: Compass },
];

export default function QuotesBrowser({ onSelect, onAddToCanvas }: QuotesBrowserProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);

  // Filter quotes
  const filteredQuotes = useMemo(() => {
    return QUOTES_LIBRARY.filter(quote => {
      const matchesSearch = searchQuery === '' || 
        quote.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
        quote.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        quote.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesCategory = selectedCategory === 'all' || quote.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  // Copy quote
  const copyQuote = async (quote: QuoteItem) => {
    await navigator.clipboard.writeText(`"${quote.text}" — ${quote.author}`);
    setCopiedId(quote.id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  // Toggle favorite
  const toggleFavorite = (id: string) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  // Handle quote selection
  const handleSelect = (quote: QuoteItem) => {
    onSelect?.(quote);
    onAddToCanvas?.(quote.text, quote.author);
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b bg-gradient-to-r from-amber-50 to-yellow-50">
        <div className="flex items-center gap-2 mb-3">
          <div className="p-2 bg-gradient-to-br from-amber-500 to-yellow-500 rounded-lg">
            <Quote className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Quotes Library</h3>
            <p className="text-xs text-gray-500">{filteredQuotes.length} inspirational quotes</p>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search quotes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-white border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="p-2 border-b overflow-x-auto">
        <div className="flex gap-1">
          {CATEGORIES.map(cat => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === cat.id
                    ? 'bg-amber-500 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Icon className="w-3 h-3" />
                {cat.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Quotes List */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-3">
          {filteredQuotes.map(quote => (
            <div
              key={quote.id}
              className="group bg-white rounded-lg border hover:border-amber-300 hover:shadow-md transition-all p-4"
            >
              {/* Quote Text */}
              <div className="flex gap-2 mb-2">
                <Quote className="w-4 h-4 text-amber-400 flex-shrink-0 mt-1" />
                <p className="text-sm text-gray-700 italic leading-relaxed">
                  {quote.text}
                </p>
              </div>

              {/* Author */}
              <p className="text-xs text-gray-500 ml-6 mb-3">— {quote.author}</p>

              {/* Actions */}
              <div className="flex items-center justify-between ml-6">
                <div className="flex gap-1">
                  {quote.tags.slice(0, 2).map(tag => (
                    <span key={tag} className="px-2 py-0.5 bg-amber-50 text-amber-700 rounded text-[10px]">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => toggleFavorite(quote.id)}
                    className={`p-1.5 rounded hover:bg-gray-100 ${
                      favorites.includes(quote.id) ? 'text-red-500' : 'text-gray-400'
                    }`}
                  >
                    <Heart className="w-4 h-4" fill={favorites.includes(quote.id) ? 'currentColor' : 'none'} />
                  </button>
                  <button
                    onClick={() => copyQuote(quote)}
                    className="p-1.5 rounded hover:bg-gray-100 text-gray-400"
                  >
                    {copiedId === quote.id ? (
                      <Check className="w-4 h-4 text-green-500" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                  <button
                    onClick={() => handleSelect(quote)}
                    className="p-1.5 rounded bg-amber-100 hover:bg-amber-200 text-amber-700"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredQuotes.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <Quote className="w-12 h-12 mx-auto mb-2 opacity-30" />
            <p className="text-sm">No quotes found</p>
          </div>
        )}
      </div>
    </div>
  );
}
