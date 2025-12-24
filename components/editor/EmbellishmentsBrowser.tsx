'use client';

import React, { useState, useMemo } from 'react';
import { Search, Gem, Circle, Tag, Gift, Flower2, Heart, Star, Sparkles } from 'lucide-react';

// Comprehensive embellishments - all SVG-based for perfect scaling
const EMBELLISHMENT_CATEGORIES = {
  'brads': {
    name: 'Brads & Fasteners',
    icon: Circle,
    items: [
      { id: 'br-1', name: 'Gold Brad', svg: `<svg viewBox="0 0 40 40"><circle cx="20" cy="20" r="18" fill="url(#goldGrad)"/><circle cx="20" cy="20" r="12" fill="url(#goldGrad2)"/><circle cx="20" cy="20" r="4" fill="#92400e"/><defs><radialGradient id="goldGrad"><stop offset="0%" stop-color="#fde047"/><stop offset="100%" stop-color="#ca8a04"/></radialGradient><radialGradient id="goldGrad2"><stop offset="0%" stop-color="#fef08a"/><stop offset="100%" stop-color="#eab308"/></radialGradient></defs></svg>` },
      { id: 'br-2', name: 'Silver Brad', svg: `<svg viewBox="0 0 40 40"><circle cx="20" cy="20" r="18" fill="url(#silverGrad)"/><circle cx="20" cy="20" r="12" fill="url(#silverGrad2)"/><circle cx="20" cy="20" r="4" fill="#4b5563"/><defs><radialGradient id="silverGrad"><stop offset="0%" stop-color="#f3f4f6"/><stop offset="100%" stop-color="#9ca3af"/></radialGradient><radialGradient id="silverGrad2"><stop offset="0%" stop-color="#ffffff"/><stop offset="100%" stop-color="#d1d5db"/></radialGradient></defs></svg>` },
      { id: 'br-3', name: 'Rose Gold Brad', svg: `<svg viewBox="0 0 40 40"><circle cx="20" cy="20" r="18" fill="url(#roseGrad)"/><circle cx="20" cy="20" r="12" fill="url(#roseGrad2)"/><circle cx="20" cy="20" r="4" fill="#9f1239"/><defs><radialGradient id="roseGrad"><stop offset="0%" stop-color="#fda4af"/><stop offset="100%" stop-color="#e11d48"/></radialGradient><radialGradient id="roseGrad2"><stop offset="0%" stop-color="#fecdd3"/><stop offset="100%" stop-color="#fb7185"/></radialGradient></defs></svg>` },
      { id: 'br-4', name: 'Copper Brad', svg: `<svg viewBox="0 0 40 40"><circle cx="20" cy="20" r="18" fill="url(#copperGrad)"/><circle cx="20" cy="20" r="12" fill="url(#copperGrad2)"/><circle cx="20" cy="20" r="4" fill="#7c2d12"/><defs><radialGradient id="copperGrad"><stop offset="0%" stop-color="#fdba74"/><stop offset="100%" stop-color="#c2410c"/></radialGradient><radialGradient id="copperGrad2"><stop offset="0%" stop-color="#fed7aa"/><stop offset="100%" stop-color="#ea580c"/></radialGradient></defs></svg>` },
      { id: 'br-5', name: 'Black Brad', svg: `<svg viewBox="0 0 40 40"><circle cx="20" cy="20" r="18" fill="url(#blackGrad)"/><circle cx="20" cy="20" r="12" fill="url(#blackGrad2)"/><circle cx="20" cy="20" r="4" fill="#030712"/><defs><radialGradient id="blackGrad"><stop offset="0%" stop-color="#4b5563"/><stop offset="100%" stop-color="#111827"/></radialGradient><radialGradient id="blackGrad2"><stop offset="0%" stop-color="#6b7280"/><stop offset="100%" stop-color="#1f2937"/></radialGradient></defs></svg>` },
      { id: 'br-6', name: 'Star Brad', svg: `<svg viewBox="0 0 40 40"><polygon points="20,2 25,15 38,15 27,24 31,38 20,29 9,38 13,24 2,15 15,15" fill="url(#starGrad)"/><defs><radialGradient id="starGrad"><stop offset="0%" stop-color="#fde047"/><stop offset="100%" stop-color="#ca8a04"/></radialGradient></defs></svg>` },
      { id: 'br-7', name: 'Heart Brad', svg: `<svg viewBox="0 0 40 40"><path d="M20,35 L8,22 C2,16 2,8 10,8 C14,8 18,12 20,14 C22,12 26,8 30,8 C38,8 38,16 32,22 Z" fill="url(#heartGrad)"/><defs><radialGradient id="heartGrad"><stop offset="0%" stop-color="#fda4af"/><stop offset="100%" stop-color="#e11d48"/></radialGradient></defs></svg>` },
      { id: 'br-8', name: 'Flower Brad', svg: `<svg viewBox="0 0 40 40"><circle cx="20" cy="10" r="8" fill="#fda4af"/><circle cx="30" cy="17" r="8" fill="#fda4af"/><circle cx="27" cy="28" r="8" fill="#fda4af"/><circle cx="13" cy="28" r="8" fill="#fda4af"/><circle cx="10" cy="17" r="8" fill="#fda4af"/><circle cx="20" cy="20" r="6" fill="#fbbf24"/></svg>` },
    ]
  },
  'buttons': {
    name: 'Buttons',
    icon: Circle,
    items: [
      { id: 'bt-1', name: 'White Button', svg: `<svg viewBox="0 0 50 50"><circle cx="25" cy="25" r="23" fill="#f5f5f4" stroke="#d6d3d1" stroke-width="2"/><circle cx="18" cy="18" r="3" fill="#a8a29e"/><circle cx="32" cy="18" r="3" fill="#a8a29e"/><circle cx="18" cy="32" r="3" fill="#a8a29e"/><circle cx="32" cy="32" r="3" fill="#a8a29e"/></svg>` },
      { id: 'bt-2', name: 'Pink Button', svg: `<svg viewBox="0 0 50 50"><circle cx="25" cy="25" r="23" fill="#fce7f3" stroke="#f9a8d4" stroke-width="2"/><circle cx="18" cy="18" r="3" fill="#ec4899"/><circle cx="32" cy="18" r="3" fill="#ec4899"/><circle cx="18" cy="32" r="3" fill="#ec4899"/><circle cx="32" cy="32" r="3" fill="#ec4899"/></svg>` },
      { id: 'bt-3', name: 'Blue Button', svg: `<svg viewBox="0 0 50 50"><circle cx="25" cy="25" r="23" fill="#dbeafe" stroke="#93c5fd" stroke-width="2"/><circle cx="18" cy="18" r="3" fill="#3b82f6"/><circle cx="32" cy="18" r="3" fill="#3b82f6"/><circle cx="18" cy="32" r="3" fill="#3b82f6"/><circle cx="32" cy="32" r="3" fill="#3b82f6"/></svg>` },
      { id: 'bt-4', name: 'Green Button', svg: `<svg viewBox="0 0 50 50"><circle cx="25" cy="25" r="23" fill="#dcfce7" stroke="#86efac" stroke-width="2"/><circle cx="18" cy="18" r="3" fill="#22c55e"/><circle cx="32" cy="18" r="3" fill="#22c55e"/><circle cx="18" cy="32" r="3" fill="#22c55e"/><circle cx="32" cy="32" r="3" fill="#22c55e"/></svg>` },
      { id: 'bt-5', name: 'Red Button', svg: `<svg viewBox="0 0 50 50"><circle cx="25" cy="25" r="23" fill="#fee2e2" stroke="#fca5a5" stroke-width="2"/><circle cx="18" cy="18" r="3" fill="#ef4444"/><circle cx="32" cy="18" r="3" fill="#ef4444"/><circle cx="18" cy="32" r="3" fill="#ef4444"/><circle cx="32" cy="32" r="3" fill="#ef4444"/></svg>` },
      { id: 'bt-6', name: 'Wood Button', svg: `<svg viewBox="0 0 50 50"><circle cx="25" cy="25" r="23" fill="#d4a574" stroke="#a16207" stroke-width="2"/><circle cx="18" cy="25" r="3" fill="#78350f"/><circle cx="32" cy="25" r="3" fill="#78350f"/><line x1="5" y1="15" x2="45" y2="15" stroke="#92400e" stroke-width="0.5" opacity="0.3"/><line x1="5" y1="25" x2="45" y2="25" stroke="#92400e" stroke-width="0.5" opacity="0.3"/><line x1="5" y1="35" x2="45" y2="35" stroke="#92400e" stroke-width="0.5" opacity="0.3"/></svg>` },
      { id: 'bt-7', name: 'Pearl Button', svg: `<svg viewBox="0 0 50 50"><defs><radialGradient id="pearlGrad" cx="30%" cy="30%"><stop offset="0%" stop-color="#ffffff"/><stop offset="50%" stop-color="#f5f5f4"/><stop offset="100%" stop-color="#e7e5e4"/></radialGradient></defs><circle cx="25" cy="25" r="23" fill="url(#pearlGrad)"/><circle cx="18" cy="18" r="2" fill="#a8a29e"/><circle cx="32" cy="18" r="2" fill="#a8a29e"/><circle cx="18" cy="32" r="2" fill="#a8a29e"/><circle cx="32" cy="32" r="2" fill="#a8a29e"/></svg>` },
      { id: 'bt-8', name: 'Vintage Button', svg: `<svg viewBox="0 0 50 50"><circle cx="25" cy="25" r="23" fill="#fef3c7" stroke="#d97706" stroke-width="1"/><circle cx="25" cy="25" r="18" fill="none" stroke="#d97706" stroke-width="1"/><circle cx="18" cy="22" r="2.5" fill="#92400e"/><circle cx="32" cy="22" r="2.5" fill="#92400e"/><circle cx="25" cy="32" r="2.5" fill="#92400e"/></svg>` },
    ]
  },
  'ribbons': {
    name: 'Ribbons & Bows',
    icon: Gift,
    items: [
      { id: 'rb-1', name: 'Pink Bow', svg: `<svg viewBox="0 0 80 50"><ellipse cx="20" cy="25" rx="18" ry="12" fill="#f472b6" transform="rotate(-20,20,25)"/><ellipse cx="60" cy="25" rx="18" ry="12" fill="#f472b6" transform="rotate(20,60,25)"/><ellipse cx="40" cy="25" rx="8" ry="6" fill="#ec4899"/><path d="M35,30 Q40,50 45,30" fill="#ec4899"/><path d="M30,35 L28,48 Q40,52 52,48 L50,35" fill="#f472b6"/></svg>` },
      { id: 'rb-2', name: 'Red Bow', svg: `<svg viewBox="0 0 80 50"><ellipse cx="20" cy="25" rx="18" ry="12" fill="#f87171" transform="rotate(-20,20,25)"/><ellipse cx="60" cy="25" rx="18" ry="12" fill="#f87171" transform="rotate(20,60,25)"/><ellipse cx="40" cy="25" rx="8" ry="6" fill="#dc2626"/><path d="M35,30 Q40,50 45,30" fill="#dc2626"/><path d="M30,35 L28,48 Q40,52 52,48 L50,35" fill="#f87171"/></svg>` },
      { id: 'rb-3', name: 'Gold Bow', svg: `<svg viewBox="0 0 80 50"><ellipse cx="20" cy="25" rx="18" ry="12" fill="#fbbf24" transform="rotate(-20,20,25)"/><ellipse cx="60" cy="25" rx="18" ry="12" fill="#fbbf24" transform="rotate(20,60,25)"/><ellipse cx="40" cy="25" rx="8" ry="6" fill="#d97706"/><path d="M35,30 Q40,50 45,30" fill="#d97706"/><path d="M30,35 L28,48 Q40,52 52,48 L50,35" fill="#fbbf24"/></svg>` },
      { id: 'rb-4', name: 'Blue Ribbon', svg: `<svg viewBox="0 0 100 30"><path d="M0,15 Q25,5 50,15 Q75,25 100,15" fill="none" stroke="#3b82f6" stroke-width="12"/><path d="M0,15 Q25,5 50,15 Q75,25 100,15" fill="none" stroke="#60a5fa" stroke-width="6"/></svg>` },
      { id: 'rb-5', name: 'Pink Ribbon', svg: `<svg viewBox="0 0 100 30"><path d="M0,15 Q25,5 50,15 Q75,25 100,15" fill="none" stroke="#ec4899" stroke-width="12"/><path d="M0,15 Q25,5 50,15 Q75,25 100,15" fill="none" stroke="#f472b6" stroke-width="6"/></svg>` },
      { id: 'rb-6', name: 'Satin White', svg: `<svg viewBox="0 0 100 30"><defs><linearGradient id="satinGrad" x1="0%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stop-color="#ffffff"/><stop offset="50%" stop-color="#e5e7eb"/><stop offset="100%" stop-color="#ffffff"/></linearGradient></defs><path d="M0,15 Q25,5 50,15 Q75,25 100,15" fill="none" stroke="url(#satinGrad)" stroke-width="14"/></svg>` },
      { id: 'rb-7', name: 'Lace Trim', svg: `<svg viewBox="0 0 100 20"><rect y="5" width="100" height="10" fill="#faf5ff"/><circle cx="5" cy="0" r="5" fill="#faf5ff"/><circle cx="15" cy="0" r="5" fill="#faf5ff"/><circle cx="25" cy="0" r="5" fill="#faf5ff"/><circle cx="35" cy="0" r="5" fill="#faf5ff"/><circle cx="45" cy="0" r="5" fill="#faf5ff"/><circle cx="55" cy="0" r="5" fill="#faf5ff"/><circle cx="65" cy="0" r="5" fill="#faf5ff"/><circle cx="75" cy="0" r="5" fill="#faf5ff"/><circle cx="85" cy="0" r="5" fill="#faf5ff"/><circle cx="95" cy="0" r="5" fill="#faf5ff"/></svg>` },
      { id: 'rb-8', name: 'Twine', svg: `<svg viewBox="0 0 100 10"><path d="M0,5 Q10,2 20,5 Q30,8 40,5 Q50,2 60,5 Q70,8 80,5 Q90,2 100,5" fill="none" stroke="#a16207" stroke-width="3"/><path d="M0,5 Q10,8 20,5 Q30,2 40,5 Q50,8 60,5 Q70,2 80,5 Q90,8 100,5" fill="none" stroke="#ca8a04" stroke-width="2"/></svg>` },
    ]
  },
  'flowers': {
    name: 'Flowers & Leaves',
    icon: Flower2,
    items: [
      { id: 'fl-1', name: 'Pink Rose', svg: `<svg viewBox="0 0 60 60"><circle cx="30" cy="30" r="8" fill="#fda4af"/><ellipse cx="30" cy="18" rx="8" ry="12" fill="#fb7185"/><ellipse cx="42" cy="25" rx="8" ry="12" fill="#fb7185" transform="rotate(72,42,25)"/><ellipse cx="38" cy="40" rx="8" ry="12" fill="#fb7185" transform="rotate(144,38,40)"/><ellipse cx="22" cy="40" rx="8" ry="12" fill="#fb7185" transform="rotate(216,22,40)"/><ellipse cx="18" cy="25" rx="8" ry="12" fill="#fb7185" transform="rotate(288,18,25)"/><circle cx="30" cy="30" r="5" fill="#fecdd3"/></svg>` },
      { id: 'fl-2', name: 'Daisy', svg: `<svg viewBox="0 0 60 60"><ellipse cx="30" cy="12" rx="6" ry="12" fill="white" stroke="#e5e7eb"/><ellipse cx="45" cy="22" rx="6" ry="12" fill="white" stroke="#e5e7eb" transform="rotate(60,45,22)"/><ellipse cx="45" cy="42" rx="6" ry="12" fill="white" stroke="#e5e7eb" transform="rotate(120,45,42)"/><ellipse cx="30" cy="48" rx="6" ry="12" fill="white" stroke="#e5e7eb" transform="rotate(180,30,48)"/><ellipse cx="15" cy="42" rx="6" ry="12" fill="white" stroke="#e5e7eb" transform="rotate(240,15,42)"/><ellipse cx="15" cy="22" rx="6" ry="12" fill="white" stroke="#e5e7eb" transform="rotate(300,15,22)"/><circle cx="30" cy="30" r="8" fill="#fbbf24"/></svg>` },
      { id: 'fl-3', name: 'Lavender', svg: `<svg viewBox="0 0 30 80"><line x1="15" y1="80" x2="15" y2="20" stroke="#22c55e" stroke-width="3"/><ellipse cx="15" cy="15" rx="4" ry="6" fill="#a78bfa"/><ellipse cx="10" cy="22" rx="4" ry="6" fill="#a78bfa"/><ellipse cx="20" cy="22" rx="4" ry="6" fill="#a78bfa"/><ellipse cx="15" cy="30" rx="4" ry="6" fill="#c4b5fd"/><ellipse cx="10" cy="38" rx="4" ry="6" fill="#c4b5fd"/><ellipse cx="20" cy="38" rx="4" ry="6" fill="#c4b5fd"/></svg>` },
      { id: 'fl-4', name: 'Sunflower', svg: `<svg viewBox="0 0 70 70"><g transform="translate(35,35)"><ellipse cx="0" cy="-22" rx="5" ry="14" fill="#fbbf24"/><ellipse cx="0" cy="-22" rx="5" ry="14" fill="#fbbf24" transform="rotate(30)"/><ellipse cx="0" cy="-22" rx="5" ry="14" fill="#fbbf24" transform="rotate(60)"/><ellipse cx="0" cy="-22" rx="5" ry="14" fill="#fbbf24" transform="rotate(90)"/><ellipse cx="0" cy="-22" rx="5" ry="14" fill="#fbbf24" transform="rotate(120)"/><ellipse cx="0" cy="-22" rx="5" ry="14" fill="#fbbf24" transform="rotate(150)"/><ellipse cx="0" cy="-22" rx="5" ry="14" fill="#fbbf24" transform="rotate(180)"/><ellipse cx="0" cy="-22" rx="5" ry="14" fill="#fbbf24" transform="rotate(210)"/><ellipse cx="0" cy="-22" rx="5" ry="14" fill="#fbbf24" transform="rotate(240)"/><ellipse cx="0" cy="-22" rx="5" ry="14" fill="#fbbf24" transform="rotate(270)"/><ellipse cx="0" cy="-22" rx="5" ry="14" fill="#fbbf24" transform="rotate(300)"/><ellipse cx="0" cy="-22" rx="5" ry="14" fill="#fbbf24" transform="rotate(330)"/></g><circle cx="35" cy="35" r="12" fill="#78350f"/></svg>` },
      { id: 'fl-5', name: 'Green Leaf', svg: `<svg viewBox="0 0 50 70"><path d="M25,5 Q45,25 40,50 Q25,65 25,65 Q25,65 10,50 Q5,25 25,5" fill="#22c55e"/><line x1="25" y1="15" x2="25" y2="60" stroke="#15803d" stroke-width="2"/><line x1="25" y1="25" x2="18" y2="35" stroke="#15803d" stroke-width="1"/><line x1="25" y1="35" x2="32" y2="45" stroke="#15803d" stroke-width="1"/></svg>` },
      { id: 'fl-6', name: 'Cherry Blossom', svg: `<svg viewBox="0 0 50 50"><ellipse cx="25" cy="12" rx="8" ry="10" fill="#fce7f3"/><ellipse cx="38" cy="22" rx="8" ry="10" fill="#fce7f3" transform="rotate(72,38,22)"/><ellipse cx="33" cy="38" rx="8" ry="10" fill="#fce7f3" transform="rotate(144,33,38)"/><ellipse cx="17" cy="38" rx="8" ry="10" fill="#fce7f3" transform="rotate(216,17,38)"/><ellipse cx="12" cy="22" rx="8" ry="10" fill="#fce7f3" transform="rotate(288,12,22)"/><circle cx="25" cy="25" r="5" fill="#fbbf24"/></svg>` },
      { id: 'fl-7', name: 'Autumn Leaf', svg: `<svg viewBox="0 0 50 60"><path d="M25,5 Q40,15 38,35 L42,32 L38,38 L44,40 L35,45 Q25,58 15,45 L6,40 L12,38 L8,32 L12,35 Q10,15 25,5" fill="#f97316"/><line x1="25" y1="10" x2="25" y2="50" stroke="#c2410c" stroke-width="2"/></svg>` },
      { id: 'fl-8', name: 'Fern', svg: `<svg viewBox="0 0 40 80"><line x1="20" y1="80" x2="20" y2="5" stroke="#15803d" stroke-width="2"/><path d="M20,10 Q30,15 25,20" stroke="#22c55e" stroke-width="2" fill="none"/><path d="M20,10 Q10,15 15,20" stroke="#22c55e" stroke-width="2" fill="none"/><path d="M20,25 Q32,30 26,38" stroke="#22c55e" stroke-width="2" fill="none"/><path d="M20,25 Q8,30 14,38" stroke="#22c55e" stroke-width="2" fill="none"/><path d="M20,42 Q34,48 27,58" stroke="#22c55e" stroke-width="2" fill="none"/><path d="M20,42 Q6,48 13,58" stroke="#22c55e" stroke-width="2" fill="none"/></svg>` },
    ]
  },
  'tags': {
    name: 'Tags & Labels',
    icon: Tag,
    items: [
      { id: 'tg-1', name: 'Kraft Tag', svg: `<svg viewBox="0 0 60 90"><path d="M10,20 L50,20 L50,85 L30,75 L10,85 Z" fill="#d4a574"/><circle cx="30" cy="10" r="8" fill="#d4a574" stroke="#a16207" stroke-width="2"/><circle cx="30" cy="10" r="4" fill="none" stroke="#a16207" stroke-width="1"/></svg>` },
      { id: 'tg-2', name: 'White Tag', svg: `<svg viewBox="0 0 60 90"><path d="M10,20 L50,20 L50,85 L30,75 L10,85 Z" fill="#fafafa" stroke="#d4d4d4" stroke-width="1"/><circle cx="30" cy="10" r="8" fill="#fafafa" stroke="#d4d4d4" stroke-width="1"/><circle cx="30" cy="10" r="4" fill="none" stroke="#a3a3a3" stroke-width="1"/></svg>` },
      { id: 'tg-3', name: 'Pink Tag', svg: `<svg viewBox="0 0 60 90"><path d="M10,20 L50,20 L50,85 L30,75 L10,85 Z" fill="#fce7f3" stroke="#f9a8d4" stroke-width="1"/><circle cx="30" cy="10" r="8" fill="#fce7f3" stroke="#f9a8d4" stroke-width="1"/><circle cx="30" cy="10" r="4" fill="none" stroke="#ec4899" stroke-width="1"/></svg>` },
      { id: 'tg-4', name: 'Round Label', svg: `<svg viewBox="0 0 70 70"><circle cx="35" cy="35" r="32" fill="#fef3c7" stroke="#d97706" stroke-width="2"/><circle cx="35" cy="35" r="26" fill="none" stroke="#d97706" stroke-width="1" stroke-dasharray="3,3"/></svg>` },
      { id: 'tg-5', name: 'Scallop Label', svg: `<svg viewBox="0 0 80 60"><path d="M10,30 Q10,15 25,15 Q30,5 40,5 Q50,5 55,15 Q70,15 70,30 Q70,45 55,45 Q50,55 40,55 Q30,55 25,45 Q10,45 10,30" fill="#e0f2fe" stroke="#0ea5e9" stroke-width="1"/></svg>` },
      { id: 'tg-6', name: 'Banner', svg: `<svg viewBox="0 0 120 40"><polygon points="5,5 115,5 115,35 60,25 5,35" fill="#fef3c7"/><polygon points="0,0 10,5 10,35 0,40" fill="#eab308"/><polygon points="120,0 110,5 110,35 120,40" fill="#eab308"/></svg>` },
      { id: 'tg-7', name: 'Ticket', svg: `<svg viewBox="0 0 100 50"><rect x="5" y="5" width="90" height="40" rx="3" fill="#fef3c7" stroke="#d97706" stroke-width="1"/><line x1="25" y1="5" x2="25" y2="45" stroke="#d97706" stroke-dasharray="3,3"/><circle cx="25" cy="5" r="5" fill="white"/><circle cx="25" cy="45" r="5" fill="white"/></svg>` },
      { id: 'tg-8', name: 'Stamp', svg: `<svg viewBox="0 0 70 70"><rect x="5" y="5" width="60" height="60" fill="#fef2f2"/><rect x="10" y="10" width="50" height="50" fill="none" stroke="#dc2626" stroke-width="2"/><text x="35" y="40" text-anchor="middle" font-size="10" fill="#dc2626" font-family="serif">STAMP</text></svg>` },
    ]
  },
  'gems': {
    name: 'Gems & Rhinestones',
    icon: Gem,
    items: [
      { id: 'gm-1', name: 'Diamond Clear', svg: `<svg viewBox="0 0 50 50"><polygon points="25,5 45,20 40,45 10,45 5,20" fill="url(#diamondGrad)" stroke="#e5e7eb"/><polygon points="25,5 35,20 25,45 15,20" fill="rgba(255,255,255,0.5)"/><defs><linearGradient id="diamondGrad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#ffffff"/><stop offset="50%" stop-color="#e5e7eb"/><stop offset="100%" stop-color="#ffffff"/></linearGradient></defs></svg>` },
      { id: 'gm-2', name: 'Ruby Red', svg: `<svg viewBox="0 0 50 50"><polygon points="25,5 45,20 40,45 10,45 5,20" fill="url(#rubyGrad)"/><polygon points="25,5 35,20 25,45 15,20" fill="rgba(255,255,255,0.3)"/><defs><linearGradient id="rubyGrad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#fca5a5"/><stop offset="50%" stop-color="#dc2626"/><stop offset="100%" stop-color="#991b1b"/></linearGradient></defs></svg>` },
      { id: 'gm-3', name: 'Sapphire Blue', svg: `<svg viewBox="0 0 50 50"><polygon points="25,5 45,20 40,45 10,45 5,20" fill="url(#sapphireGrad)"/><polygon points="25,5 35,20 25,45 15,20" fill="rgba(255,255,255,0.3)"/><defs><linearGradient id="sapphireGrad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#93c5fd"/><stop offset="50%" stop-color="#2563eb"/><stop offset="100%" stop-color="#1e40af"/></linearGradient></defs></svg>` },
      { id: 'gm-4', name: 'Emerald Green', svg: `<svg viewBox="0 0 50 50"><polygon points="25,5 45,20 40,45 10,45 5,20" fill="url(#emeraldGrad)"/><polygon points="25,5 35,20 25,45 15,20" fill="rgba(255,255,255,0.3)"/><defs><linearGradient id="emeraldGrad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#86efac"/><stop offset="50%" stop-color="#16a34a"/><stop offset="100%" stop-color="#166534"/></linearGradient></defs></svg>` },
      { id: 'gm-5', name: 'Amethyst Purple', svg: `<svg viewBox="0 0 50 50"><polygon points="25,5 45,20 40,45 10,45 5,20" fill="url(#amethystGrad)"/><polygon points="25,5 35,20 25,45 15,20" fill="rgba(255,255,255,0.3)"/><defs><linearGradient id="amethystGrad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#c4b5fd"/><stop offset="50%" stop-color="#7c3aed"/><stop offset="100%" stop-color="#5b21b6"/></linearGradient></defs></svg>` },
      { id: 'gm-6', name: 'Pearl', svg: `<svg viewBox="0 0 50 50"><defs><radialGradient id="pearlGem" cx="30%" cy="30%"><stop offset="0%" stop-color="#ffffff"/><stop offset="70%" stop-color="#f5f5f4"/><stop offset="100%" stop-color="#d6d3d1"/></radialGradient></defs><circle cx="25" cy="25" r="20" fill="url(#pearlGem)"/><ellipse cx="18" cy="18" rx="5" ry="3" fill="rgba(255,255,255,0.8)" transform="rotate(-30,18,18)"/></svg>` },
      { id: 'gm-7', name: 'Gold Sequin', svg: `<svg viewBox="0 0 40 40"><defs><radialGradient id="sequinGold" cx="30%" cy="30%"><stop offset="0%" stop-color="#fef08a"/><stop offset="50%" stop-color="#fbbf24"/><stop offset="100%" stop-color="#b45309"/></radialGradient></defs><circle cx="20" cy="20" r="18" fill="url(#sequinGold)"/><circle cx="14" cy="14" r="3" fill="rgba(255,255,255,0.6)"/></svg>` },
      { id: 'gm-8', name: 'Silver Sequin', svg: `<svg viewBox="0 0 40 40"><defs><radialGradient id="sequinSilver" cx="30%" cy="30%"><stop offset="0%" stop-color="#ffffff"/><stop offset="50%" stop-color="#d1d5db"/><stop offset="100%" stop-color="#6b7280"/></radialGradient></defs><circle cx="20" cy="20" r="18" fill="url(#sequinSilver)"/><circle cx="14" cy="14" r="3" fill="rgba(255,255,255,0.8)"/></svg>` },
    ]
  },
  'shapes': {
    name: 'Decorative Shapes',
    icon: Star,
    items: [
      { id: 'sh-1', name: 'Gold Star', svg: `<svg viewBox="0 0 50 50"><polygon points="25,2 31,18 48,18 34,29 39,46 25,36 11,46 16,29 2,18 19,18" fill="url(#starGold)"/><defs><linearGradient id="starGold" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#fef08a"/><stop offset="100%" stop-color="#ca8a04"/></linearGradient></defs></svg>` },
      { id: 'sh-2', name: 'Pink Heart', svg: `<svg viewBox="0 0 50 50"><path d="M25,45 L10,28 C0,18 0,8 12,8 C18,8 22,14 25,18 C28,14 32,8 38,8 C50,8 50,18 40,28 Z" fill="url(#heartPink)"/><defs><linearGradient id="heartPink" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="#fda4af"/><stop offset="100%" stop-color="#e11d48"/></linearGradient></defs></svg>` },
      { id: 'sh-3', name: 'Blue Butterfly', svg: `<svg viewBox="0 0 60 40"><ellipse cx="15" cy="15" rx="12" ry="10" fill="#60a5fa"/><ellipse cx="45" cy="15" rx="12" ry="10" fill="#60a5fa"/><ellipse cx="18" cy="28" rx="8" ry="10" fill="#93c5fd"/><ellipse cx="42" cy="28" rx="8" ry="10" fill="#93c5fd"/><ellipse cx="30" cy="20" rx="3" ry="15" fill="#1e3a8a"/><line x1="28" y1="5" x2="24" y2="0" stroke="#1e3a8a" stroke-width="1"/><line x1="32" y1="5" x2="36" y2="0" stroke="#1e3a8a" stroke-width="1"/></svg>` },
      { id: 'sh-4', name: 'Rainbow', svg: `<svg viewBox="0 0 100 50"><path d="M5,50 A45,45 0 0,1 95,50" fill="none" stroke="#ef4444" stroke-width="6"/><path d="M11,50 A39,39 0 0,1 89,50" fill="none" stroke="#f97316" stroke-width="6"/><path d="M17,50 A33,33 0 0,1 83,50" fill="none" stroke="#eab308" stroke-width="6"/><path d="M23,50 A27,27 0 0,1 77,50" fill="none" stroke="#22c55e" stroke-width="6"/><path d="M29,50 A21,21 0 0,1 71,50" fill="none" stroke="#3b82f6" stroke-width="6"/><path d="M35,50 A15,15 0 0,1 65,50" fill="none" stroke="#8b5cf6" stroke-width="6"/></svg>` },
      { id: 'sh-5', name: 'Cloud', svg: `<svg viewBox="0 0 80 50"><ellipse cx="25" cy="35" rx="20" ry="15" fill="white" stroke="#e5e7eb"/><ellipse cx="45" cy="30" rx="18" ry="18" fill="white" stroke="#e5e7eb"/><ellipse cx="60" cy="35" rx="15" ry="12" fill="white" stroke="#e5e7eb"/><ellipse cx="35" cy="25" rx="12" ry="10" fill="white" stroke="#e5e7eb"/></svg>` },
      { id: 'sh-6', name: 'Crown', svg: `<svg viewBox="0 0 60 40"><polygon points="5,35 10,15 20,25 30,5 40,25 50,15 55,35" fill="#fbbf24" stroke="#b45309" stroke-width="1"/><circle cx="30" cy="8" r="3" fill="#ef4444"/><circle cx="15" cy="18" r="2" fill="#3b82f6"/><circle cx="45" cy="18" r="2" fill="#22c55e"/></svg>` },
      { id: 'sh-7', name: 'Music Note', svg: `<svg viewBox="0 0 40 50"><ellipse cx="12" cy="42" rx="8" ry="6" fill="#1f2937"/><rect x="18" y="8" width="3" height="36" fill="#1f2937"/><path d="M21,8 Q35,5 35,18 Q35,25 21,22" fill="#1f2937"/></svg>` },
      { id: 'sh-8', name: 'Anchor', svg: `<svg viewBox="0 0 50 60"><circle cx="25" cy="10" r="6" fill="none" stroke="#1e3a5f" stroke-width="3"/><line x1="25" y1="16" x2="25" y2="50" stroke="#1e3a5f" stroke-width="3"/><path d="M10,40 Q25,55 40,40" fill="none" stroke="#1e3a5f" stroke-width="3"/><line x1="15" y1="30" x2="35" y2="30" stroke="#1e3a5f" stroke-width="3"/></svg>` },
    ]
  },
  'frames': {
    name: 'Mini Frames',
    icon: Sparkles,
    items: [
      { id: 'fr-1', name: 'Gold Frame', svg: `<svg viewBox="0 0 80 60"><rect x="5" y="5" width="70" height="50" fill="none" stroke="url(#frameGold)" stroke-width="6"/><rect x="12" y="12" width="56" height="36" fill="#fafafa"/><defs><linearGradient id="frameGold"><stop offset="0%" stop-color="#fef08a"/><stop offset="50%" stop-color="#ca8a04"/><stop offset="100%" stop-color="#fef08a"/></linearGradient></defs></svg>` },
      { id: 'fr-2', name: 'Ornate Frame', svg: `<svg viewBox="0 0 90 70"><rect x="10" y="10" width="70" height="50" fill="#fafafa" stroke="#a16207" stroke-width="2"/><rect x="5" y="5" width="80" height="60" fill="none" stroke="#d97706" stroke-width="3"/><circle cx="5" cy="5" r="4" fill="#fbbf24"/><circle cx="85" cy="5" r="4" fill="#fbbf24"/><circle cx="5" cy="65" r="4" fill="#fbbf24"/><circle cx="85" cy="65" r="4" fill="#fbbf24"/></svg>` },
      { id: 'fr-3', name: 'Polaroid', svg: `<svg viewBox="0 0 70 85"><rect x="5" y="5" width="60" height="75" fill="white" stroke="#e5e7eb"/><rect x="10" y="10" width="50" height="50" fill="#f5f5f4"/></svg>` },
      { id: 'fr-4', name: 'Film Strip', svg: `<svg viewBox="0 0 100 40"><rect width="100" height="40" fill="#1f2937"/><rect x="15" y="8" width="20" height="24" fill="#f5f5f4"/><rect x="40" y="8" width="20" height="24" fill="#f5f5f4"/><rect x="65" y="8" width="20" height="24" fill="#f5f5f4"/><rect x="3" y="3" width="6" height="6" rx="1" fill="#404040"/><rect x="3" y="15" width="6" height="6" rx="1" fill="#404040"/><rect x="3" y="27" width="6" height="6" rx="1" fill="#404040"/><rect x="91" y="3" width="6" height="6" rx="1" fill="#404040"/><rect x="91" y="15" width="6" height="6" rx="1" fill="#404040"/><rect x="91" y="27" width="6" height="6" rx="1" fill="#404040"/></svg>` },
      { id: 'fr-5', name: 'Heart Frame', svg: `<svg viewBox="0 0 70 65"><path d="M35,60 L12,35 C0,22 0,10 15,10 C23,10 30,18 35,25 C40,18 47,10 55,10 C70,10 70,22 58,35 Z" fill="none" stroke="#ec4899" stroke-width="4"/><path d="M35,52 L18,33 C10,24 10,16 20,16 C25,16 30,21 35,27 C40,21 45,16 50,16 C60,16 60,24 52,33 Z" fill="#fce7f3"/></svg>` },
      { id: 'fr-6', name: 'Circle Frame', svg: `<svg viewBox="0 0 70 70"><circle cx="35" cy="35" r="32" fill="none" stroke="url(#circleFrame)" stroke-width="5"/><circle cx="35" cy="35" r="25" fill="#fafafa"/><defs><linearGradient id="circleFrame"><stop offset="0%" stop-color="#c084fc"/><stop offset="100%" stop-color="#7c3aed"/></linearGradient></defs></svg>` },
      { id: 'fr-7', name: 'Star Frame', svg: `<svg viewBox="0 0 80 80"><polygon points="40,5 48,28 72,28 53,43 60,68 40,53 20,68 27,43 8,28 32,28" fill="none" stroke="#fbbf24" stroke-width="4"/><polygon points="40,18 45,32 60,32 48,41 52,56 40,47 28,56 32,41 20,32 35,32" fill="#fef3c7"/></svg>` },
      { id: 'fr-8', name: 'Scallop Frame', svg: `<svg viewBox="0 0 80 60"><path d="M10,30 Q10,10 30,10 Q40,0 50,10 Q70,10 70,30 Q70,50 50,50 Q40,60 30,50 Q10,50 10,30" fill="none" stroke="#f472b6" stroke-width="3"/><path d="M18,30 Q18,16 32,16 Q40,10 48,16 Q62,16 62,30 Q62,44 48,44 Q40,50 32,44 Q18,44 18,30" fill="#fdf2f8"/></svg>` },
    ]
  },
};

interface EmbellishmentsBrowserProps {
  onSelectEmbellishment?: (item: { id: string; name: string; svg: string }) => void;
}

export function EmbellishmentsBrowser({ onSelectEmbellishment }: EmbellishmentsBrowserProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('brads');
  const [size, setSize] = useState(60);

  const filteredItems = useMemo(() => {
    const category = EMBELLISHMENT_CATEGORIES[selectedCategory as keyof typeof EMBELLISHMENT_CATEGORIES];
    if (!category) return [];
    
    if (!searchTerm) return category.items;
    
    return category.items.filter(item =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [selectedCategory, searchTerm]);

  const handleSelectItem = (item: { id: string; name: string; svg: string }) => {
    onSelectEmbellishment?.(item);
  };

  const totalItems = Object.values(EMBELLISHMENT_CATEGORIES).reduce(
    (acc, cat) => acc + cat.items.length, 0
  );

  return (
    <div className="flex flex-col h-full bg-gray-900 text-white">
      {/* Header */}
      <div className="p-3 border-b border-gray-700">
        <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
          <Gem className="w-5 h-5 text-emerald-400" />
          Embellishments
        </h3>
        
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search embellishments..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-sm focus:outline-none focus:border-emerald-500"
          />
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex overflow-x-auto p-2 gap-1 border-b border-gray-700">
        {Object.entries(EMBELLISHMENT_CATEGORIES).map(([key, category]) => {
          const Icon = category.icon;
          return (
            <button
              key={key}
              onClick={() => setSelectedCategory(key)}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs whitespace-nowrap transition-colors ${
                selectedCategory === key
                  ? 'bg-emerald-600 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {category.name}
            </button>
          );
        })}
      </div>

      {/* Size Control */}
      <div className="p-3 border-b border-gray-700">
        <div className="flex items-center gap-2">
          <label className="text-xs text-gray-400 w-12">Size:</label>
          <input
            type="range"
            min="30"
            max="100"
            value={size}
            onChange={(e) => setSize(Number(e.target.value))}
            className="flex-1 h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer"
          />
          <span className="text-xs text-gray-400 w-10">{size}px</span>
        </div>
      </div>

      {/* Item Grid */}
      <div className="flex-1 overflow-y-auto p-3">
        <div className="grid grid-cols-3 gap-3">
          {filteredItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleSelectItem(item)}
              className="group flex flex-col items-center p-2 rounded-lg border-2 border-gray-700 hover:border-emerald-500 transition-colors bg-gray-800/50"
            >
              {/* SVG Preview */}
              <div
                className="flex items-center justify-center"
                style={{ width: size, height: size }}
                dangerouslySetInnerHTML={{ __html: item.svg }}
              />
              
              {/* Label */}
              <p className="text-xs mt-1 text-center text-gray-400 group-hover:text-white transition-colors truncate w-full">
                {item.name}
              </p>
            </button>
          ))}
        </div>
        
        {filteredItems.length === 0 && (
          <div className="text-center text-gray-500 py-8">
            No embellishments found
          </div>
        )}
      </div>

      {/* Footer Stats */}
      <div className="p-2 border-t border-gray-700 text-center text-xs text-gray-500">
        {totalItems} embellishments • 8 categories • 100% Free
      </div>
    </div>
  );
}

export default EmbellishmentsBrowser;
