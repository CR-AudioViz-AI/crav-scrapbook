// components/editor/JournalingCardsBrowser.tsx
// 60+ Journaling Card Templates for Scrapbooking
// Timestamp: Tuesday, December 24, 2025 – 1:30 PM Eastern Time
// CR AudioViz AI - "Your Story. Our Design"

'use client';

import React, { useState, useMemo } from 'react';
import { Search, FileText, Sparkles, Heart, Calendar, MapPin, Camera, Quote, Star, Bookmark, PenTool } from 'lucide-react';

interface JournalingCard {
  id: string;
  name: string;
  category: string;
  width: number;
  height: number;
  style: React.CSSProperties;
  innerStyle?: React.CSSProperties;
  lines?: number;
  hasHeader?: boolean;
  hasIcon?: boolean;
  icon?: string;
  prompts?: string[];
  tags: string[];
}

interface JournalingCardsBrowserProps {
  onSelect?: (card: JournalingCard) => void;
  onAddToCanvas?: (cardHtml: string, width: number, height: number) => void;
}

// Comprehensive journaling cards library - 60+ cards
const JOURNALING_CARDS: JournalingCard[] = [
  // BASIC LINED CARDS (10 styles)
  {
    id: 'basic-lined-white',
    name: 'Classic Lined',
    category: 'basic',
    width: 300,
    height: 200,
    style: { background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '8px' },
    lines: 6,
    tags: ['simple', 'clean', 'minimal']
  },
  {
    id: 'basic-lined-cream',
    name: 'Cream Lined',
    category: 'basic',
    width: 300,
    height: 200,
    style: { background: '#fef3c7', border: '1px solid #d97706', borderRadius: '8px' },
    lines: 6,
    tags: ['vintage', 'warm', 'classic']
  },
  {
    id: 'basic-lined-pink',
    name: 'Blush Lined',
    category: 'basic',
    width: 300,
    height: 200,
    style: { background: '#fce7f3', border: '1px solid #ec4899', borderRadius: '8px' },
    lines: 6,
    tags: ['feminine', 'soft', 'romantic']
  },
  {
    id: 'basic-lined-blue',
    name: 'Sky Lined',
    category: 'basic',
    width: 300,
    height: 200,
    style: { background: '#dbeafe', border: '1px solid #3b82f6', borderRadius: '8px' },
    lines: 6,
    tags: ['calm', 'serene', 'boy']
  },
  {
    id: 'basic-lined-green',
    name: 'Sage Lined',
    category: 'basic',
    width: 300,
    height: 200,
    style: { background: '#dcfce7', border: '1px solid #22c55e', borderRadius: '8px' },
    lines: 6,
    tags: ['nature', 'fresh', 'spring']
  },
  {
    id: 'basic-dotted',
    name: 'Dotted Grid',
    category: 'basic',
    width: 300,
    height: 200,
    style: { background: 'radial-gradient(circle, #d1d5db 1px, #ffffff 1px)', backgroundSize: '20px 20px', border: '1px solid #e5e7eb', borderRadius: '8px' },
    tags: ['grid', 'bullet', 'modern']
  },
  {
    id: 'basic-graph',
    name: 'Graph Paper',
    category: 'basic',
    width: 300,
    height: 200,
    style: { background: 'linear-gradient(#e5e7eb 1px, transparent 1px), linear-gradient(90deg, #e5e7eb 1px, transparent 1px)', backgroundSize: '20px 20px', backgroundColor: '#ffffff', border: '1px solid #9ca3af', borderRadius: '4px' },
    tags: ['grid', 'math', 'technical']
  },
  {
    id: 'basic-kraft',
    name: 'Kraft Paper',
    category: 'basic',
    width: 300,
    height: 200,
    style: { background: 'linear-gradient(135deg, #d4a574 0%, #c4956a 100%)', border: 'none', borderRadius: '4px' },
    lines: 6,
    tags: ['rustic', 'natural', 'eco']
  },
  {
    id: 'basic-blackboard',
    name: 'Chalkboard',
    category: 'basic',
    width: 300,
    height: 200,
    style: { background: '#1f2937', border: '4px solid #92400e', borderRadius: '4px' },
    innerStyle: { color: '#ffffff' },
    lines: 5,
    tags: ['chalk', 'school', 'dark']
  },
  {
    id: 'basic-notebook',
    name: 'Notebook Paper',
    category: 'basic',
    width: 300,
    height: 200,
    style: { background: '#ffffff', borderLeft: '3px solid #ef4444', border: '1px solid #e5e7eb', borderRadius: '0' },
    lines: 7,
    tags: ['school', 'notes', 'classic']
  },

  // DATED CARDS (10 styles)
  {
    id: 'dated-simple',
    name: 'Simple Date Card',
    category: 'dated',
    width: 300,
    height: 180,
    style: { background: '#ffffff', border: '2px solid #6366f1', borderRadius: '12px' },
    hasHeader: true,
    icon: 'calendar',
    prompts: ['DATE:', 'LOCATION:', 'NOTES:'],
    tags: ['date', 'organized', 'clean']
  },
  {
    id: 'dated-polaroid',
    name: 'Polaroid Style',
    category: 'dated',
    width: 280,
    height: 320,
    style: { background: '#ffffff', border: 'none', borderRadius: '4px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' },
    hasHeader: false,
    prompts: ['Write your memory here...'],
    tags: ['photo', 'vintage', 'instant']
  },
  {
    id: 'dated-stamp',
    name: 'Date Stamp',
    category: 'dated',
    width: 300,
    height: 200,
    style: { background: '#fef3c7', border: '2px dashed #d97706', borderRadius: '8px' },
    hasHeader: true,
    icon: 'stamp',
    prompts: ['MONTH:', 'DAY:', 'YEAR:'],
    tags: ['stamp', 'vintage', 'postal']
  },
  {
    id: 'dated-calendar',
    name: 'Calendar Block',
    category: 'dated',
    width: 250,
    height: 250,
    style: { background: 'linear-gradient(180deg, #ef4444 0%, #ef4444 25%, #ffffff 25%)', border: '1px solid #e5e7eb', borderRadius: '8px' },
    hasHeader: true,
    tags: ['calendar', 'block', 'date']
  },
  {
    id: 'dated-timeline',
    name: 'Timeline Card',
    category: 'dated',
    width: 350,
    height: 150,
    style: { background: '#ffffff', borderLeft: '4px solid #6366f1', borderRadius: '0 8px 8px 0', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' },
    hasHeader: true,
    prompts: ['DATE:', 'EVENT:'],
    tags: ['timeline', 'event', 'chronological']
  },
  {
    id: 'dated-milestone',
    name: 'Milestone Marker',
    category: 'dated',
    width: 280,
    height: 200,
    style: { background: 'linear-gradient(135deg, #fce7f3 0%, #fbcfe8 100%)', border: '2px solid #ec4899', borderRadius: '16px' },
    hasHeader: true,
    icon: 'star',
    prompts: ['MILESTONE:', 'DATE:', 'WHY IT MATTERS:'],
    tags: ['milestone', 'achievement', 'special']
  },
  {
    id: 'dated-travel',
    name: 'Travel Log',
    category: 'dated',
    width: 300,
    height: 220,
    style: { background: '#ecfdf5', border: '2px solid #10b981', borderRadius: '8px' },
    hasHeader: true,
    icon: 'mappin',
    prompts: ['DESTINATION:', 'DATE:', 'HIGHLIGHTS:'],
    tags: ['travel', 'vacation', 'adventure']
  },
  {
    id: 'dated-memory',
    name: 'Memory Lane',
    category: 'dated',
    width: 300,
    height: 200,
    style: { background: 'linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 100%)', border: 'none', borderRadius: '20px' },
    hasHeader: true,
    prompts: ['REMEMBER WHEN...', 'DATE:', 'WHO WAS THERE:'],
    tags: ['memory', 'nostalgia', 'remember']
  },
  {
    id: 'dated-diary',
    name: 'Diary Entry',
    category: 'dated',
    width: 320,
    height: 240,
    style: { background: '#fffbeb', border: '1px solid #f59e0b', borderRadius: '4px' },
    hasHeader: true,
    prompts: ['DEAR DIARY,', 'DATE:'],
    lines: 5,
    tags: ['diary', 'personal', 'journal']
  },
  {
    id: 'dated-recipe',
    name: 'Recipe Card',
    category: 'dated',
    width: 350,
    height: 250,
    style: { background: '#ffffff', border: '3px double #d97706', borderRadius: '8px' },
    hasHeader: true,
    prompts: ['RECIPE:', 'DATE:', 'INGREDIENTS:', 'INSTRUCTIONS:'],
    tags: ['recipe', 'food', 'cooking']
  },

  // PROMPT CARDS (15 styles)
  {
    id: 'prompt-gratitude',
    name: 'Gratitude Card',
    category: 'prompts',
    width: 300,
    height: 200,
    style: { background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)', border: '2px solid #f59e0b', borderRadius: '12px' },
    hasHeader: true,
    icon: 'heart',
    prompts: ['TODAY I AM GRATEFUL FOR...'],
    lines: 4,
    tags: ['gratitude', 'thankful', 'positive']
  },
  {
    id: 'prompt-goals',
    name: 'Goals & Dreams',
    category: 'prompts',
    width: 300,
    height: 220,
    style: { background: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)', border: '2px solid #3b82f6', borderRadius: '12px' },
    hasHeader: true,
    icon: 'star',
    prompts: ['MY GOAL:', 'WHY IT MATTERS:', 'FIRST STEP:'],
    tags: ['goals', 'dreams', 'aspirations']
  },
  {
    id: 'prompt-favorites',
    name: 'My Favorites',
    category: 'prompts',
    width: 280,
    height: 280,
    style: { background: '#fce7f3', border: '2px solid #ec4899', borderRadius: '16px' },
    hasHeader: true,
    prompts: ['FAVORITE COLOR:', 'FAVORITE FOOD:', 'FAVORITE SONG:', 'FAVORITE PLACE:', 'FAVORITE PERSON:'],
    tags: ['favorites', 'about me', 'personal']
  },
  {
    id: 'prompt-interview',
    name: 'Interview Questions',
    category: 'prompts',
    width: 320,
    height: 250,
    style: { background: '#f0fdf4', border: '2px solid #22c55e', borderRadius: '8px' },
    hasHeader: true,
    prompts: ['Q: WHAT MAKES YOU HAPPY?', 'Q: WHAT ARE YOU PROUD OF?', 'Q: WHAT DO YOU WISH FOR?'],
    tags: ['interview', 'questions', 'answers']
  },
  {
    id: 'prompt-bucket-list',
    name: 'Bucket List',
    category: 'prompts',
    width: 280,
    height: 300,
    style: { background: '#fef3c7', border: '2px dashed #d97706', borderRadius: '8px' },
    hasHeader: true,
    prompts: ['THINGS TO DO BEFORE...', '☐', '☐', '☐', '☐', '☐'],
    tags: ['bucket list', 'goals', 'adventures']
  },
  {
    id: 'prompt-letter',
    name: 'Letter to Future Self',
    category: 'prompts',
    width: 300,
    height: 350,
    style: { background: 'linear-gradient(180deg, #e0e7ff 0%, #c7d2fe 100%)', border: '2px solid #6366f1', borderRadius: '4px' },
    hasHeader: true,
    prompts: ['DEAR FUTURE ME,', 'OPEN ON:'],
    lines: 8,
    tags: ['letter', 'future', 'time capsule']
  },
  {
    id: 'prompt-affirmation',
    name: 'Daily Affirmation',
    category: 'prompts',
    width: 280,
    height: 180,
    style: { background: 'linear-gradient(135deg, #fce7f3 0%, #f9a8d4 100%)', border: 'none', borderRadius: '20px' },
    hasHeader: true,
    prompts: ['I AM...', 'I CAN...', 'I WILL...'],
    tags: ['affirmation', 'positive', 'motivation']
  },
  {
    id: 'prompt-highlight',
    name: 'Day Highlights',
    category: 'prompts',
    width: 300,
    height: 200,
    style: { background: '#ffffff', border: '3px solid #8b5cf6', borderRadius: '12px' },
    hasHeader: true,
    prompts: ['BEST PART OF TODAY:', 'SOMETHING I LEARNED:', 'TOMORROW I WILL:'],
    tags: ['daily', 'highlights', 'reflection']
  },
  {
    id: 'prompt-mood',
    name: 'Mood Tracker',
    category: 'prompts',
    width: 280,
    height: 200,
    style: { background: 'linear-gradient(135deg, #fef9c3 0%, #fde047 100%)', border: '2px solid #eab308', borderRadius: '16px' },
    hasHeader: true,
    prompts: ['TODAY I FEEL:', '😊 😐 😢 😡 😴', 'BECAUSE:'],
    tags: ['mood', 'emotions', 'feelings']
  },
  {
    id: 'prompt-five-senses',
    name: 'Five Senses',
    category: 'prompts',
    width: 280,
    height: 280,
    style: { background: '#ecfdf5', border: '2px solid #10b981', borderRadius: '12px' },
    hasHeader: true,
    prompts: ['I SAW:', 'I HEARD:', 'I SMELLED:', 'I TASTED:', 'I FELT:'],
    tags: ['senses', 'descriptive', 'details']
  },
  {
    id: 'prompt-quote',
    name: 'Quote Card',
    category: 'prompts',
    width: 320,
    height: 180,
    style: { background: '#1f2937', border: 'none', borderRadius: '8px' },
    innerStyle: { color: '#ffffff' },
    hasHeader: true,
    icon: 'quote',
    prompts: ['"', '"', '— AUTHOR'],
    tags: ['quote', 'inspiration', 'words']
  },
  {
    id: 'prompt-first-time',
    name: 'First Time',
    category: 'prompts',
    width: 300,
    height: 200,
    style: { background: 'linear-gradient(135deg, #fce7f3 0%, #fbcfe8 100%)', border: '2px solid #db2777', borderRadius: '16px' },
    hasHeader: true,
    icon: 'star',
    prompts: ["MY FIRST TIME...", 'DATE:', 'HOW I FELT:'],
    tags: ['first', 'milestone', 'baby']
  },
  {
    id: 'prompt-wish',
    name: 'Make a Wish',
    category: 'prompts',
    width: 280,
    height: 200,
    style: { background: 'linear-gradient(180deg, #312e81 0%, #4338ca 100%)', border: 'none', borderRadius: '20px' },
    innerStyle: { color: '#ffffff' },
    hasHeader: true,
    prompts: ['IF I COULD WISH FOR ANYTHING...', 'MY WISH:'],
    tags: ['wish', 'dream', 'hope']
  },
  {
    id: 'prompt-thankful',
    name: '3 Good Things',
    category: 'prompts',
    width: 300,
    height: 220,
    style: { background: '#fff7ed', border: '2px solid #ea580c', borderRadius: '12px' },
    hasHeader: true,
    prompts: ['3 GOOD THINGS TODAY:', '1.', '2.', '3.'],
    tags: ['gratitude', 'positive', 'daily']
  },
  {
    id: 'prompt-growth',
    name: 'Growth Tracker',
    category: 'prompts',
    width: 300,
    height: 250,
    style: { background: 'linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)', border: '2px solid #059669', borderRadius: '12px' },
    hasHeader: true,
    prompts: ['DATE:', 'HEIGHT:', 'WEIGHT:', 'NEW SKILLS:', 'FAVORITE THINGS:'],
    tags: ['growth', 'baby', 'development']
  },

  // DECORATIVE CARDS (15 styles)
  {
    id: 'deco-scallop',
    name: 'Scalloped Edge',
    category: 'decorative',
    width: 300,
    height: 200,
    style: { background: '#ffffff', border: '2px solid #ec4899', borderRadius: '8px' },
    lines: 5,
    tags: ['scallop', 'fancy', 'decorative']
  },
  {
    id: 'deco-ticket',
    name: 'Ticket Stub',
    category: 'decorative',
    width: 350,
    height: 150,
    style: { background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)', border: '2px dashed #d97706', borderRadius: '8px' },
    hasHeader: true,
    prompts: ['ADMIT ONE', 'EVENT:', 'DATE:'],
    tags: ['ticket', 'event', 'admission']
  },
  {
    id: 'deco-banner',
    name: 'Banner Flag',
    category: 'decorative',
    width: 200,
    height: 250,
    style: { background: 'linear-gradient(135deg, #dbeafe 0%, #93c5fd 100%)', clipPath: 'polygon(0 0, 100% 0, 100% 85%, 50% 100%, 0 85%)', border: 'none' },
    hasHeader: true,
    tags: ['banner', 'flag', 'celebration']
  },
  {
    id: 'deco-tag',
    name: 'Gift Tag',
    category: 'decorative',
    width: 180,
    height: 280,
    style: { background: '#ffffff', border: '2px solid #9ca3af', borderRadius: '8px 8px 8px 40px' },
    hasHeader: true,
    prompts: ['TO:', 'FROM:', 'MESSAGE:'],
    tags: ['tag', 'gift', 'label']
  },
  {
    id: 'deco-cloud',
    name: 'Cloud Shape',
    category: 'decorative',
    width: 320,
    height: 180,
    style: { background: '#ffffff', border: '2px solid #60a5fa', borderRadius: '100px' },
    lines: 3,
    tags: ['cloud', 'dreamy', 'soft']
  },
  {
    id: 'deco-heart',
    name: 'Heart Frame',
    category: 'decorative',
    width: 250,
    height: 220,
    style: { background: 'linear-gradient(135deg, #fce7f3 0%, #f9a8d4 100%)', border: '3px solid #ec4899', borderRadius: '50%' },
    lines: 3,
    tags: ['heart', 'love', 'valentine']
  },
  {
    id: 'deco-postcard',
    name: 'Postcard',
    category: 'decorative',
    width: 400,
    height: 250,
    style: { background: '#ffffff', border: '1px solid #d1d5db', borderRadius: '4px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' },
    hasHeader: true,
    prompts: ['GREETINGS FROM...', 'MESSAGE:'],
    tags: ['postcard', 'travel', 'vintage']
  },
  {
    id: 'deco-washi',
    name: 'Washi Tape Edge',
    category: 'decorative',
    width: 300,
    height: 200,
    style: { background: '#ffffff', borderTop: '15px solid #f472b6', borderBottom: '15px solid #a78bfa', borderRadius: '0' },
    lines: 4,
    tags: ['washi', 'tape', 'decorative']
  },
  {
    id: 'deco-filmstrip',
    name: 'Film Strip',
    category: 'decorative',
    width: 350,
    height: 120,
    style: { background: '#1f2937', border: 'none', borderRadius: '0' },
    innerStyle: { color: '#ffffff' },
    hasHeader: true,
    tags: ['film', 'movie', 'cinema']
  },
  {
    id: 'deco-instant',
    name: 'Instant Photo',
    category: 'decorative',
    width: 260,
    height: 320,
    style: { background: '#ffffff', border: 'none', borderRadius: '4px', boxShadow: '0 4px 15px rgba(0,0,0,0.15)' },
    hasHeader: false,
    lines: 2,
    tags: ['instant', 'polaroid', 'photo']
  },
  {
    id: 'deco-stamp',
    name: 'Postage Stamp',
    category: 'decorative',
    width: 200,
    height: 240,
    style: { background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)', border: '8px solid #ffffff', borderRadius: '0', boxShadow: '0 0 0 2px #d97706' },
    hasHeader: true,
    tags: ['stamp', 'postage', 'mail']
  },
  {
    id: 'deco-ribbon',
    name: 'Ribbon Banner',
    category: 'decorative',
    width: 350,
    height: 100,
    style: { background: 'linear-gradient(135deg, #ec4899 0%, #db2777 100%)', border: 'none', borderRadius: '0' },
    innerStyle: { color: '#ffffff' },
    hasHeader: true,
    tags: ['ribbon', 'banner', 'title']
  },
  {
    id: 'deco-starburst',
    name: 'Starburst',
    category: 'decorative',
    width: 250,
    height: 250,
    style: { background: 'linear-gradient(135deg, #fef08a 0%, #fde047 100%)', border: '3px solid #eab308', borderRadius: '0' },
    hasHeader: true,
    tags: ['starburst', 'sale', 'attention']
  },
  {
    id: 'deco-circle',
    name: 'Circle Frame',
    category: 'decorative',
    width: 250,
    height: 250,
    style: { background: 'linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 100%)', border: '4px solid #6366f1', borderRadius: '50%' },
    lines: 4,
    tags: ['circle', 'round', 'frame']
  },
  {
    id: 'deco-envelope',
    name: 'Love Letter',
    category: 'decorative',
    width: 320,
    height: 220,
    style: { background: 'linear-gradient(180deg, transparent 30%, #fce7f3 30%)', border: '2px solid #ec4899', borderRadius: '4px' },
    hasHeader: true,
    prompts: ['SEALED WITH A KISS'],
    tags: ['envelope', 'letter', 'love']
  },

  // SPECIAL OCCASION (10 styles)
  {
    id: 'occasion-birthday',
    name: 'Birthday Card',
    category: 'occasion',
    width: 300,
    height: 220,
    style: { background: 'linear-gradient(135deg, #fce7f3 0%, #f9a8d4 100%)', border: '3px solid #ec4899', borderRadius: '16px' },
    hasHeader: true,
    icon: 'cake',
    prompts: ['HAPPY BIRTHDAY!', 'AGE:', 'WISH:'],
    tags: ['birthday', 'party', 'celebration']
  },
  {
    id: 'occasion-wedding',
    name: 'Wedding Memory',
    category: 'occasion',
    width: 320,
    height: 240,
    style: { background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)', border: '2px solid #d97706', borderRadius: '8px' },
    hasHeader: true,
    prompts: ['THE BRIDE & GROOM:', 'DATE:', 'VENUE:', 'SPECIAL MOMENT:'],
    tags: ['wedding', 'marriage', 'love']
  },
  {
    id: 'occasion-baby',
    name: 'Baby Announcement',
    category: 'occasion',
    width: 300,
    height: 250,
    style: { background: 'linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)', border: '3px dotted #3b82f6', borderRadius: '20px' },
    hasHeader: true,
    prompts: ['WELCOME BABY!', 'NAME:', 'BORN:', 'WEIGHT:', 'LENGTH:'],
    tags: ['baby', 'newborn', 'birth']
  },
  {
    id: 'occasion-graduate',
    name: 'Graduation',
    category: 'occasion',
    width: 300,
    height: 220,
    style: { background: 'linear-gradient(135deg, #1f2937 0%, #374151 100%)', border: '3px solid #fbbf24', borderRadius: '8px' },
    innerStyle: { color: '#ffffff' },
    hasHeader: true,
    prompts: ['CLASS OF:', 'GRADUATE:', 'SCHOOL:', 'ACHIEVEMENT:'],
    tags: ['graduation', 'school', 'achievement']
  },
  {
    id: 'occasion-holiday',
    name: 'Holiday Greetings',
    category: 'occasion',
    width: 300,
    height: 200,
    style: { background: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)', border: '4px solid #fbbf24', borderRadius: '12px' },
    innerStyle: { color: '#ffffff' },
    hasHeader: true,
    prompts: ['SEASON\'S GREETINGS!', 'FROM:', 'YEAR:'],
    tags: ['holiday', 'christmas', 'seasonal']
  },
  {
    id: 'occasion-easter',
    name: 'Easter Joy',
    category: 'occasion',
    width: 280,
    height: 200,
    style: { background: 'linear-gradient(135deg, #fce7f3 0%, #a7f3d0 50%, #fef08a 100%)', border: '2px solid #ec4899', borderRadius: '16px' },
    hasHeader: true,
    prompts: ['HOPPY EASTER!', 'DATE:', 'EGG HUNT FINDS:'],
    tags: ['easter', 'spring', 'bunny']
  },
  {
    id: 'occasion-halloween',
    name: 'Spooky Halloween',
    category: 'occasion',
    width: 300,
    height: 220,
    style: { background: 'linear-gradient(135deg, #1f2937 0%, #111827 100%)', border: '3px solid #f97316', borderRadius: '8px' },
    innerStyle: { color: '#f97316' },
    hasHeader: true,
    prompts: ['BOO!', 'COSTUME:', 'CANDY COUNT:'],
    tags: ['halloween', 'spooky', 'costume']
  },
  {
    id: 'occasion-thanksgiving',
    name: 'Thanksgiving Thanks',
    category: 'occasion',
    width: 320,
    height: 220,
    style: { background: 'linear-gradient(135deg, #fef3c7 0%, #f59e0b 100%)', border: '2px solid #92400e', borderRadius: '8px' },
    hasHeader: true,
    prompts: ['GIVE THANKS', 'DATE:', 'GRATEFUL FOR:', 'FEAST FAVORITES:'],
    tags: ['thanksgiving', 'gratitude', 'fall']
  },
  {
    id: 'occasion-vacation',
    name: 'Vacation Memories',
    category: 'occasion',
    width: 350,
    height: 250,
    style: { background: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)', border: 'none', borderRadius: '16px' },
    innerStyle: { color: '#ffffff' },
    hasHeader: true,
    icon: 'mappin',
    prompts: ['WISH YOU WERE HERE!', 'DESTINATION:', 'DATES:', 'BEST MEMORY:'],
    tags: ['vacation', 'travel', 'adventure']
  },
  {
    id: 'occasion-anniversary',
    name: 'Anniversary',
    category: 'occasion',
    width: 300,
    height: 220,
    style: { background: 'linear-gradient(135deg, #fce7f3 0%, #f9a8d4 100%)', border: '3px double #db2777', borderRadius: '12px' },
    hasHeader: true,
    prompts: ['YEARS TOGETHER:', 'DATE:', 'OUR STORY:', 'STILL IN LOVE BECAUSE:'],
    tags: ['anniversary', 'love', 'celebration']
  },
];

// Category definitions
const CATEGORIES = [
  { id: 'all', name: 'All Cards', icon: Sparkles },
  { id: 'basic', name: 'Basic', icon: FileText },
  { id: 'dated', name: 'Dated', icon: Calendar },
  { id: 'prompts', name: 'Prompts', icon: PenTool },
  { id: 'decorative', name: 'Decorative', icon: Star },
  { id: 'occasion', name: 'Occasions', icon: Heart },
];

export default function JournalingCardsBrowser({ onSelect, onAddToCanvas }: JournalingCardsBrowserProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Filter cards
  const filteredCards = useMemo(() => {
    return JOURNALING_CARDS.filter(card => {
      const matchesSearch = searchQuery === '' || 
        card.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        card.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesCategory = selectedCategory === 'all' || card.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  // Generate card preview HTML
  const generateCardHtml = (card: JournalingCard): string => {
    let linesHtml = '';
    if (card.lines) {
      for (let i = 0; i < card.lines; i++) {
        linesHtml += `<div style="border-bottom: 1px solid rgba(0,0,0,0.1); height: 24px;"></div>`;
      }
    }

    let promptsHtml = '';
    if (card.prompts) {
      promptsHtml = card.prompts.map(p => 
        `<div style="font-size: 12px; font-weight: 500; margin-bottom: 4px; opacity: 0.7;">${p}</div>`
      ).join('');
    }

    return `
      <div style="width: ${card.width}px; height: ${card.height}px; ${Object.entries(card.style).map(([k, v]) => `${k.replace(/([A-Z])/g, '-$1').toLowerCase()}: ${v}`).join('; ')}">
        <div style="padding: 16px; height: 100%; box-sizing: border-box; ${card.innerStyle ? Object.entries(card.innerStyle).map(([k, v]) => `${k.replace(/([A-Z])/g, '-$1').toLowerCase()}: ${v}`).join('; ') : ''}">
          ${card.hasHeader ? `<div style="font-weight: bold; margin-bottom: 8px;">${card.name}</div>` : ''}
          ${promptsHtml}
          ${linesHtml}
        </div>
      </div>
    `;
  };

  // Handle card selection
  const handleSelect = (card: JournalingCard) => {
    onSelect?.(card);
    onAddToCanvas?.(generateCardHtml(card), card.width, card.height);
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b bg-gradient-to-r from-amber-50 to-orange-50">
        <div className="flex items-center gap-2 mb-3">
          <div className="p-2 bg-gradient-to-br from-amber-500 to-orange-500 rounded-lg">
            <FileText className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Journaling Cards</h3>
            <p className="text-xs text-gray-500">{filteredCards.length} card templates</p>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search cards..."
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

      {/* Cards Grid */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="grid grid-cols-2 gap-4">
          {filteredCards.map(card => (
            <button
              key={card.id}
              onClick={() => handleSelect(card)}
              className="group relative bg-gray-50 rounded-lg p-3 hover:bg-gray-100 transition-all hover:shadow-md"
            >
              {/* Card Preview */}
              <div 
                className="w-full aspect-[4/3] rounded overflow-hidden flex items-center justify-center"
                style={{ transform: 'scale(0.5)', transformOrigin: 'center' }}
              >
                <div
                  style={{
                    ...card.style,
                    width: card.width * 0.6,
                    height: card.height * 0.6,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '8px',
                    ...card.innerStyle,
                  }}
                >
                  <span className="opacity-50">{card.name}</span>
                </div>
              </div>
              
              {/* Card Name */}
              <p className="text-xs font-medium text-gray-700 mt-2 text-center truncate">
                {card.name}
              </p>
              <p className="text-[10px] text-gray-400 text-center">
                {card.width} × {card.height}
              </p>
            </button>
          ))}
        </div>

        {filteredCards.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <FileText className="w-12 h-12 mx-auto mb-2 opacity-30" />
            <p className="text-sm">No journaling cards found</p>
          </div>
        )}
      </div>
    </div>
  );
}
