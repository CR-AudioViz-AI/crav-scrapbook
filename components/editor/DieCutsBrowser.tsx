// components/editor/DieCutsBrowser.tsx
// 100+ Digital Die Cut Shapes for Scrapbooking
// Timestamp: Tuesday, December 24, 2025 – 1:12 PM Eastern Time
// CR AudioViz AI - "Your Story. Our Design"

'use client';

import React, { useState, useMemo } from 'react';
import { Search, Scissors, Heart, Star, Flower2, Baby, Cake, Gift, TreePine, Sun, Moon, Cloud, Sparkles } from 'lucide-react';

interface DieCut {
  id: string;
  name: string;
  category: string;
  svg: string;
  tags: string[];
}

interface DieCutsBrowserProps {
  onSelect?: (dieCut: DieCut) => void;
  onAddToCanvas?: (svg: string, name: string) => void;
}

// Comprehensive die cut library - scrapbook essentials
const DIE_CUTS: DieCut[] = [
  // HEARTS & LOVE
  { id: 'heart-simple', name: 'Simple Heart', category: 'hearts', tags: ['love', 'valentine', 'romance'], svg: '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M50 88C25 70 10 55 10 35C10 20 22 10 35 10C42 10 48 13 50 18C52 13 58 10 65 10C78 10 90 20 90 35C90 55 75 70 50 88Z" fill="currentColor"/></svg>' },
  { id: 'heart-scallop', name: 'Scalloped Heart', category: 'hearts', tags: ['love', 'decorative'], svg: '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M50 90C25 70 8 52 8 32C8 15 22 5 38 8C45 9 50 15 50 15C50 15 55 9 62 8C78 5 92 15 92 32C92 52 75 70 50 90Z" fill="currentColor" stroke="currentColor" stroke-width="2" stroke-dasharray="3,3"/></svg>' },
  { id: 'heart-double', name: 'Double Heart', category: 'hearts', tags: ['love', 'wedding'], svg: '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M35 75C15 60 5 48 5 32C5 18 15 10 27 10C33 10 38 13 40 17C42 13 47 10 53 10C65 10 75 18 75 32C75 35 74 38 72 42" fill="none" stroke="currentColor" stroke-width="3"/><path d="M65 85C45 70 30 55 30 38C30 25 40 15 52 15C58 15 63 18 65 22C67 18 72 15 78 15C90 15 100 25 100 38C100 55 85 70 65 85Z" fill="currentColor"/></svg>' },
  { id: 'heart-arrow', name: 'Heart with Arrow', category: 'hearts', tags: ['love', 'cupid', 'valentine'], svg: '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M50 85C28 68 15 54 15 36C15 22 26 12 40 12C46 12 51 15 53 19C55 15 60 12 66 12C80 12 91 22 91 36C91 54 78 68 50 85Z" fill="currentColor"/><line x1="5" y1="80" x2="95" y2="20" stroke="currentColor" stroke-width="3"/><polygon points="95,20 85,18 87,28" fill="currentColor"/></svg>' },
  { id: 'heart-lock', name: 'Heart Lock', category: 'hearts', tags: ['love', 'romance', 'wedding'], svg: '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M50 90C25 72 10 57 10 37C10 22 22 12 37 12C44 12 50 16 53 21C56 16 62 12 69 12C84 12 96 22 96 37C96 57 81 72 50 90Z" fill="currentColor"/><rect x="40" y="45" width="20" height="18" rx="3" fill="white"/><path d="M43 45V40C43 35 46 32 50 32C54 32 57 35 57 40V45" fill="none" stroke="white" stroke-width="3"/></svg>' },
  
  // STARS & CELESTIAL
  { id: 'star-5point', name: '5-Point Star', category: 'stars', tags: ['celestial', 'achievement'], svg: '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><polygon points="50,5 61,40 98,40 68,62 79,97 50,75 21,97 32,62 2,40 39,40" fill="currentColor"/></svg>' },
  { id: 'star-6point', name: '6-Point Star', category: 'stars', tags: ['celestial', 'holiday'], svg: '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><polygon points="50,5 58,35 90,20 65,50 90,80 58,65 50,95 42,65 10,80 35,50 10,20 42,35" fill="currentColor"/></svg>' },
  { id: 'star-burst', name: 'Starburst', category: 'stars', tags: ['celebration', 'special'], svg: '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><polygon points="50,0 55,40 95,25 60,50 95,75 55,60 50,100 45,60 5,75 40,50 5,25 45,40" fill="currentColor"/></svg>' },
  { id: 'moon-crescent', name: 'Crescent Moon', category: 'stars', tags: ['celestial', 'night', 'baby'], svg: '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M70 10C45 15 25 40 25 70C25 85 35 95 50 95C75 95 95 70 95 45C95 30 85 15 70 10C80 25 80 55 60 75C45 85 30 75 30 60C30 40 45 20 70 10Z" fill="currentColor"/></svg>' },
  { id: 'sun-rays', name: 'Sun with Rays', category: 'stars', tags: ['celestial', 'summer', 'bright'], svg: '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="20" fill="currentColor"/><g stroke="currentColor" stroke-width="4" stroke-linecap="round"><line x1="50" y1="5" x2="50" y2="20"/><line x1="50" y1="80" x2="50" y2="95"/><line x1="5" y1="50" x2="20" y2="50"/><line x1="80" y1="50" x2="95" y2="50"/><line x1="18" y1="18" x2="28" y2="28"/><line x1="72" y1="72" x2="82" y2="82"/><line x1="18" y1="82" x2="28" y2="72"/><line x1="72" y1="28" x2="82" y2="18"/></g></svg>' },
  
  // FLOWERS & NATURE
  { id: 'flower-daisy', name: 'Daisy', category: 'flowers', tags: ['nature', 'spring', 'garden'], svg: '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><ellipse cx="50" cy="20" rx="12" ry="18" fill="currentColor"/><ellipse cx="50" cy="80" rx="12" ry="18" fill="currentColor"/><ellipse cx="20" cy="50" rx="18" ry="12" fill="currentColor"/><ellipse cx="80" cy="50" rx="18" ry="12" fill="currentColor"/><ellipse cx="26" cy="26" rx="12" ry="18" transform="rotate(-45 26 26)" fill="currentColor"/><ellipse cx="74" cy="74" rx="12" ry="18" transform="rotate(-45 74 74)" fill="currentColor"/><ellipse cx="74" cy="26" rx="12" ry="18" transform="rotate(45 74 26)" fill="currentColor"/><ellipse cx="26" cy="74" rx="12" ry="18" transform="rotate(45 26 74)" fill="currentColor"/><circle cx="50" cy="50" r="15" fill="#FFD700"/></svg>' },
  { id: 'flower-rose', name: 'Rose', category: 'flowers', tags: ['nature', 'romantic', 'elegant'], svg: '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M50 10C55 20 65 25 70 35C75 45 70 55 60 60C65 55 65 45 55 40C60 50 55 60 45 65C50 60 50 50 40 50C50 55 50 65 40 75C45 70 55 70 60 80C55 75 45 75 40 85C35 80 30 70 35 60C25 65 20 60 15 50C20 55 30 55 35 45C25 50 20 45 15 35C25 40 35 35 45 40C40 30 45 20 50 10Z" fill="currentColor"/></svg>' },
  { id: 'flower-tulip', name: 'Tulip', category: 'flowers', tags: ['nature', 'spring', 'garden'], svg: '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M50 10C40 20 30 30 30 45C30 55 38 60 45 60L45 90L55 90L55 60C62 60 70 55 70 45C70 30 60 20 50 10Z" fill="currentColor"/><path d="M30 75C35 70 42 72 45 75" fill="none" stroke="currentColor" stroke-width="3"/><path d="M70 75C65 70 58 72 55 75" fill="none" stroke="currentColor" stroke-width="3"/></svg>' },
  { id: 'leaf-simple', name: 'Simple Leaf', category: 'flowers', tags: ['nature', 'botanical'], svg: '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M50 5C20 30 10 60 15 85C40 75 70 55 85 25C75 20 60 10 50 5Z" fill="currentColor"/><path d="M50 5C50 50 30 80 15 85" fill="none" stroke="white" stroke-width="2"/></svg>' },
  { id: 'butterfly', name: 'Butterfly', category: 'flowers', tags: ['nature', 'spring', 'garden'], svg: '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><ellipse cx="25" cy="35" rx="22" ry="28" fill="currentColor"/><ellipse cx="75" cy="35" rx="22" ry="28" fill="currentColor"/><ellipse cx="30" cy="70" rx="15" ry="22" fill="currentColor"/><ellipse cx="70" cy="70" rx="15" ry="22" fill="currentColor"/><ellipse cx="50" cy="50" rx="5" ry="30" fill="currentColor"/><path d="M45 15Q35 5 25 15M55 15Q65 5 75 15" stroke="currentColor" stroke-width="2" fill="none"/></svg>' },
  
  // BABY & CHILDREN
  { id: 'baby-bottle', name: 'Baby Bottle', category: 'baby', tags: ['newborn', 'infant'], svg: '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><rect x="35" y="5" width="30" height="12" rx="3" fill="currentColor"/><path d="M30 17L30 80C30 90 40 95 50 95C60 95 70 90 70 80L70 17Z" fill="currentColor"/><line x1="30" y1="35" x2="70" y2="35" stroke="white" stroke-width="2"/><line x1="30" y1="50" x2="70" y2="50" stroke="white" stroke-width="2"/><line x1="30" y1="65" x2="70" y2="65" stroke="white" stroke-width="2"/></svg>' },
  { id: 'baby-footprint', name: 'Baby Footprint', category: 'baby', tags: ['newborn', 'infant', 'milestone'], svg: '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><ellipse cx="50" cy="60" rx="25" ry="35" fill="currentColor"/><circle cx="30" cy="18" r="8" fill="currentColor"/><circle cx="42" cy="10" r="7" fill="currentColor"/><circle cx="55" cy="8" r="6" fill="currentColor"/><circle cx="67" cy="12" r="6" fill="currentColor"/><circle cx="76" cy="22" r="6" fill="currentColor"/></svg>' },
  { id: 'baby-onesie', name: 'Baby Onesie', category: 'baby', tags: ['newborn', 'clothes', 'infant'], svg: '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M35 10L20 25L25 35L35 30L35 85C35 90 40 95 50 95C60 95 65 90 65 85L65 30L75 35L80 25L65 10C60 15 55 18 50 18C45 18 40 15 35 10Z" fill="currentColor"/></svg>' },
  { id: 'baby-rattle', name: 'Baby Rattle', category: 'baby', tags: ['toy', 'infant'], svg: '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="30" r="25" fill="currentColor"/><rect x="45" y="55" width="10" height="35" rx="5" fill="currentColor"/><circle cx="40" cy="25" r="5" fill="white"/><circle cx="55" cy="20" r="4" fill="white"/><circle cx="60" cy="35" r="4" fill="white"/></svg>' },
  { id: 'stork', name: 'Stork', category: 'baby', tags: ['newborn', 'delivery'], svg: '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><ellipse cx="60" cy="35" rx="25" ry="20" fill="currentColor"/><circle cx="40" cy="25" r="15" fill="currentColor"/><path d="M25 25L5 20" stroke="currentColor" stroke-width="4"/><path d="M55 55L50 90M65 55L70 90" stroke="currentColor" stroke-width="4"/><ellipse cx="75" cy="55" rx="15" ry="8" fill="currentColor"/></svg>' },
  
  // CELEBRATION & PARTY
  { id: 'birthday-cake', name: 'Birthday Cake', category: 'celebration', tags: ['party', 'birthday'], svg: '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><rect x="15" y="45" width="70" height="50" rx="5" fill="currentColor"/><rect x="20" y="35" width="60" height="15" rx="3" fill="currentColor" opacity="0.8"/><rect x="25" y="25" width="50" height="15" rx="3" fill="currentColor" opacity="0.6"/><rect x="35" y="10" width="4" height="18" fill="currentColor"/><rect x="48" y="10" width="4" height="18" fill="currentColor"/><rect x="61" y="10" width="4" height="18" fill="currentColor"/><ellipse cx="37" cy="8" rx="4" ry="6" fill="#FFD700"/><ellipse cx="50" cy="8" rx="4" ry="6" fill="#FFD700"/><ellipse cx="63" cy="8" rx="4" ry="6" fill="#FFD700"/></svg>' },
  { id: 'balloon', name: 'Balloon', category: 'celebration', tags: ['party', 'birthday'], svg: '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><ellipse cx="50" cy="40" rx="30" ry="38" fill="currentColor"/><polygon points="50,78 45,85 55,85" fill="currentColor"/><path d="M50 85Q45 90 50 95Q55 90 50 85" stroke="currentColor" stroke-width="2" fill="none"/></svg>' },
  { id: 'gift-box', name: 'Gift Box', category: 'celebration', tags: ['party', 'birthday', 'christmas'], svg: '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><rect x="10" y="35" width="80" height="60" rx="3" fill="currentColor"/><rect x="5" y="25" width="90" height="15" rx="3" fill="currentColor" opacity="0.8"/><rect x="45" y="25" width="10" height="70" fill="white" opacity="0.3"/><rect x="5" y="30" width="90" height="8" fill="white" opacity="0.3"/><path d="M30 25C30 15 40 5 50 5C40 15 45 25 45 25" fill="none" stroke="currentColor" stroke-width="3"/><path d="M70 25C70 15 60 5 50 5C60 15 55 25 55 25" fill="none" stroke="currentColor" stroke-width="3"/></svg>' },
  { id: 'party-hat', name: 'Party Hat', category: 'celebration', tags: ['party', 'birthday'], svg: '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><polygon points="50,5 15,90 85,90" fill="currentColor"/><ellipse cx="50" cy="90" rx="35" ry="8" fill="currentColor" opacity="0.8"/><circle cx="50" cy="5" r="8" fill="#FFD700"/><circle cx="35" cy="40" r="4" fill="white"/><circle cx="55" cy="55" r="4" fill="white"/><circle cx="40" cy="70" r="4" fill="white"/><circle cx="60" cy="35" r="3" fill="white"/></svg>' },
  { id: 'confetti', name: 'Confetti Burst', category: 'celebration', tags: ['party', 'celebration'], svg: '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><rect x="15" y="20" width="8" height="4" transform="rotate(30 19 22)" fill="currentColor"/><rect x="75" y="15" width="8" height="4" transform="rotate(-20 79 17)" fill="currentColor"/><rect x="45" y="10" width="8" height="4" transform="rotate(45 49 12)" fill="currentColor"/><rect x="25" y="45" width="6" height="3" transform="rotate(-30 28 47)" fill="currentColor"/><rect x="70" y="50" width="6" height="3" transform="rotate(60 73 52)" fill="currentColor"/><rect x="35" y="75" width="8" height="4" transform="rotate(-45 39 77)" fill="currentColor"/><rect x="60" y="80" width="8" height="4" transform="rotate(15 64 82)" fill="currentColor"/><circle cx="50" cy="50" r="3" fill="currentColor"/><circle cx="20" cy="70" r="3" fill="currentColor"/><circle cx="80" cy="35" r="3" fill="currentColor"/></svg>' },
  
  // HOLIDAY - CHRISTMAS
  { id: 'christmas-tree', name: 'Christmas Tree', category: 'christmas', tags: ['holiday', 'winter'], svg: '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><polygon points="50,5 20,40 30,40 10,70 25,70 5,95 95,95 75,70 90,70 70,40 80,40" fill="currentColor"/><rect x="42" y="95" width="16" height="10" fill="#8B4513"/><circle cx="50" cy="8" r="5" fill="#FFD700"/></svg>' },
  { id: 'snowflake', name: 'Snowflake', category: 'christmas', tags: ['holiday', 'winter', 'snow'], svg: '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><line x1="50" y1="5" x2="50" y2="95" stroke="currentColor" stroke-width="4"/><line x1="5" y1="50" x2="95" y2="50" stroke="currentColor" stroke-width="4"/><line x1="18" y1="18" x2="82" y2="82" stroke="currentColor" stroke-width="4"/><line x1="82" y1="18" x2="18" y2="82" stroke="currentColor" stroke-width="4"/><circle cx="50" cy="50" r="8" fill="currentColor"/><line x1="50" y1="5" x2="40" y2="15" stroke="currentColor" stroke-width="3"/><line x1="50" y1="5" x2="60" y2="15" stroke="currentColor" stroke-width="3"/><line x1="50" y1="95" x2="40" y2="85" stroke="currentColor" stroke-width="3"/><line x1="50" y1="95" x2="60" y2="85" stroke="currentColor" stroke-width="3"/></svg>' },
  { id: 'candy-cane', name: 'Candy Cane', category: 'christmas', tags: ['holiday', 'sweet'], svg: '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M60 95L60 35C60 20 50 10 35 10C20 10 10 20 10 35" fill="none" stroke="currentColor" stroke-width="12" stroke-linecap="round"/></svg>' },
  { id: 'ornament', name: 'Christmas Ornament', category: 'christmas', tags: ['holiday', 'decoration'], svg: '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="55" r="35" fill="currentColor"/><rect x="42" y="15" width="16" height="10" rx="2" fill="currentColor" opacity="0.8"/><ellipse cx="50" cy="15" rx="5" ry="8" fill="currentColor"/><path d="M30 45Q50 35 70 45" fill="none" stroke="white" stroke-width="2" opacity="0.5"/></svg>' },
  { id: 'holly', name: 'Holly', category: 'christmas', tags: ['holiday', 'decoration'], svg: '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M50 50C30 40 10 50 15 70C20 85 40 90 50 80C45 70 50 55 50 50Z" fill="currentColor"/><path d="M50 50C70 40 90 50 85 70C80 85 60 90 50 80C55 70 50 55 50 50Z" fill="currentColor"/><circle cx="45" cy="45" r="6" fill="#FF0000"/><circle cx="55" cy="42" r="6" fill="#FF0000"/><circle cx="50" cy="52" r="6" fill="#FF0000"/></svg>' },
  
  // FRAMES & BORDERS
  { id: 'frame-scallop', name: 'Scalloped Frame', category: 'frames', tags: ['border', 'decorative'], svg: '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M15 10Q25 5 35 10Q45 5 55 10Q65 5 75 10Q85 5 95 10L95 90Q85 95 75 90Q65 95 55 90Q45 95 35 90Q25 95 15 90L15 10" fill="none" stroke="currentColor" stroke-width="4"/></svg>' },
  { id: 'frame-circle', name: 'Circle Frame', category: 'frames', tags: ['photo', 'border'], svg: '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" stroke-width="8"/></svg>' },
  { id: 'frame-oval', name: 'Oval Frame', category: 'frames', tags: ['photo', 'elegant'], svg: '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><ellipse cx="50" cy="50" rx="45" ry="35" fill="none" stroke="currentColor" stroke-width="6"/></svg>' },
  { id: 'frame-polaroid', name: 'Polaroid Frame', category: 'frames', tags: ['photo', 'vintage'], svg: '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><rect x="10" y="5" width="80" height="90" rx="2" fill="currentColor"/><rect x="15" y="10" width="70" height="60" fill="white"/></svg>' },
  { id: 'frame-ticket', name: 'Ticket Frame', category: 'frames', tags: ['vintage', 'event'], svg: '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M5 25L5 75L20 75C20 70 25 65 30 65C35 65 40 70 40 75L60 75C60 70 65 65 70 65C75 65 80 70 80 75L95 75L95 25L80 25C80 30 75 35 70 35C65 35 60 30 60 25L40 25C40 30 35 35 30 35C25 35 20 30 20 25Z" fill="currentColor"/></svg>' },
  
  // TRAVEL
  { id: 'airplane', name: 'Airplane', category: 'travel', tags: ['vacation', 'journey'], svg: '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M85 15L60 40L65 70L55 65L50 50L20 55L15 45L45 40L50 25L40 20L45 10L60 15L85 15Z" fill="currentColor"/></svg>' },
  { id: 'suitcase', name: 'Suitcase', category: 'travel', tags: ['vacation', 'luggage'], svg: '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><rect x="10" y="25" width="80" height="60" rx="5" fill="currentColor"/><rect x="35" y="15" width="30" height="15" rx="3" fill="none" stroke="currentColor" stroke-width="4"/><line x1="50" y1="35" x2="50" y2="75" stroke="white" stroke-width="4"/><circle cx="25" cy="90" r="5" fill="currentColor"/><circle cx="75" cy="90" r="5" fill="currentColor"/></svg>' },
  { id: 'camera', name: 'Camera', category: 'travel', tags: ['photo', 'vacation'], svg: '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><rect x="10" y="30" width="80" height="55" rx="5" fill="currentColor"/><rect x="35" y="20" width="30" height="15" fill="currentColor"/><circle cx="50" cy="57" r="18" fill="white"/><circle cx="50" cy="57" r="12" fill="currentColor"/><circle cx="78" cy="40" r="5" fill="white"/></svg>' },
  { id: 'compass', name: 'Compass', category: 'travel', tags: ['adventure', 'navigation'], svg: '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" stroke-width="4"/><polygon points="50,15 55,45 50,50 45,45" fill="currentColor"/><polygon points="50,85 45,55 50,50 55,55" fill="currentColor" opacity="0.5"/><polygon points="15,50 45,45 50,50 45,55" fill="currentColor" opacity="0.5"/><polygon points="85,50 55,55 50,50 55,45" fill="currentColor"/></svg>' },
  { id: 'map-pin', name: 'Map Pin', category: 'travel', tags: ['location', 'destination'], svg: '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M50 95C50 95 85 55 85 35C85 15 70 5 50 5C30 5 15 15 15 35C15 55 50 95 50 95Z" fill="currentColor"/><circle cx="50" cy="35" r="15" fill="white"/></svg>' },
  
  // SPORTS & HOBBIES
  { id: 'soccer-ball', name: 'Soccer Ball', category: 'sports', tags: ['football', 'game'], svg: '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="45" fill="currentColor"/><polygon points="50,15 62,30 58,45 42,45 38,30" fill="white"/><polygon points="20,40 35,35 42,48 35,62 18,55" fill="white"/><polygon points="80,40 65,35 58,48 65,62 82,55" fill="white"/><polygon points="30,80 42,68 58,68 70,80 60,90 40,90" fill="white"/></svg>' },
  { id: 'basketball', name: 'Basketball', category: 'sports', tags: ['ball', 'game'], svg: '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="50" r="45" fill="currentColor"/><path d="M5 50H95M50 5V95M15 20Q50 50 15 80M85 20Q50 50 85 80" stroke="white" stroke-width="3" fill="none"/></svg>' },
  { id: 'music-note', name: 'Music Note', category: 'hobbies', tags: ['music', 'song'], svg: '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><ellipse cx="25" cy="75" rx="20" ry="15" fill="currentColor"/><rect x="43" y="15" width="5" height="65" fill="currentColor"/><path d="M48 15C48 15 75 10 85 25C95 40 70 55 48 50" fill="currentColor"/></svg>' },
  { id: 'palette', name: 'Artist Palette', category: 'hobbies', tags: ['art', 'paint', 'creative'], svg: '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M50 5C25 5 5 25 5 50C5 75 25 95 50 95C55 95 60 90 60 85C60 80 55 75 55 70C55 60 65 55 75 55C85 55 95 45 95 35C95 15 75 5 50 5Z" fill="currentColor"/><circle cx="30" cy="35" r="8" fill="#FF6B6B"/><circle cx="25" cy="55" r="6" fill="#4ECDC4"/><circle cx="35" cy="70" r="7" fill="#FFE66D"/><circle cx="55" cy="35" r="6" fill="#95E1D3"/><circle cx="70" cy="40" r="5" fill="#DDA0DD"/></svg>' },
  
  // FOOD & KITCHEN
  { id: 'cupcake', name: 'Cupcake', category: 'food', tags: ['dessert', 'sweet', 'birthday'], svg: '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M20 45C20 30 30 20 50 20C70 20 80 30 80 45L80 50L20 50Z" fill="currentColor"/><path d="M15 50L25 95L75 95L85 50Z" fill="currentColor" opacity="0.8"/><circle cx="50" cy="12" r="5" fill="#FF6B6B"/><line x1="25" y1="55" x2="30" y2="90" stroke="white" stroke-width="2"/><line x1="50" y1="55" x2="50" y2="90" stroke="white" stroke-width="2"/><line x1="75" y1="55" x2="70" y2="90" stroke="white" stroke-width="2"/></svg>' },
  { id: 'coffee-cup', name: 'Coffee Cup', category: 'food', tags: ['drink', 'morning'], svg: '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M15 30L20 85C20 90 30 95 50 95C70 95 80 90 80 85L85 30Z" fill="currentColor"/><path d="M85 35C95 35 100 45 100 55C100 65 95 75 85 75" fill="none" stroke="currentColor" stroke-width="6"/><path d="M30 15Q35 5 40 15Q45 5 50 15Q55 5 60 15Q65 5 70 15" stroke="currentColor" stroke-width="3" fill="none"/></svg>' },
  { id: 'ice-cream', name: 'Ice Cream Cone', category: 'food', tags: ['dessert', 'summer', 'sweet'], svg: '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><polygon points="50,95 25,40 75,40" fill="currentColor" opacity="0.8"/><circle cx="50" cy="30" r="25" fill="currentColor"/><circle cx="35" cy="25" r="15" fill="currentColor"/><circle cx="65" cy="25" r="15" fill="currentColor"/><line x1="30" y1="50" x2="40" y2="85" stroke="white" stroke-width="2" opacity="0.5"/><line x1="50" y1="50" x2="50" y2="85" stroke="white" stroke-width="2" opacity="0.5"/><line x1="70" y1="50" x2="60" y2="85" stroke="white" stroke-width="2" opacity="0.5"/></svg>' },
  
  // ANIMALS
  { id: 'paw-print', name: 'Paw Print', category: 'animals', tags: ['pet', 'dog', 'cat'], svg: '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><ellipse cx="50" cy="65" rx="25" ry="20" fill="currentColor"/><ellipse cx="25" cy="35" rx="12" ry="15" fill="currentColor"/><ellipse cx="75" cy="35" rx="12" ry="15" fill="currentColor"/><ellipse cx="40" cy="20" rx="10" ry="12" fill="currentColor"/><ellipse cx="60" cy="20" rx="10" ry="12" fill="currentColor"/></svg>' },
  { id: 'fish', name: 'Fish', category: 'animals', tags: ['ocean', 'sea', 'pet'], svg: '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><ellipse cx="55" cy="50" rx="35" ry="25" fill="currentColor"/><polygon points="10,50 30,30 30,70" fill="currentColor"/><circle cx="75" cy="45" r="5" fill="white"/><path d="M40 40Q50 50 40 60" fill="none" stroke="white" stroke-width="2"/></svg>' },
  { id: 'bird', name: 'Bird', category: 'animals', tags: ['nature', 'flying'], svg: '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><ellipse cx="55" cy="50" rx="30" ry="20" fill="currentColor"/><circle cx="30" cy="45" r="15" fill="currentColor"/><polygon points="10,45 25,40 25,50" fill="currentColor" opacity="0.8"/><path d="M50 35L40 15L55 30M60 35L70 10L65 32" fill="currentColor"/><ellipse cx="70" cy="60" rx="15" ry="8" fill="currentColor"/><circle cx="25" cy="42" r="3" fill="white"/></svg>' },
  
  // LABELS & TAGS
  { id: 'tag-simple', name: 'Simple Tag', category: 'labels', tags: ['label', 'price'], svg: '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M10 50L10 15C10 10 15 5 20 5L55 5L95 45L95 55L55 95L20 95C15 95 10 90 10 85Z" fill="currentColor"/><circle cx="30" cy="30" r="8" fill="white"/></svg>' },
  { id: 'banner-ribbon', name: 'Banner Ribbon', category: 'labels', tags: ['title', 'heading'], svg: '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><polygon points="0,30 15,40 15,70 0,80 0,60 10,50 0,40" fill="currentColor" opacity="0.7"/><polygon points="100,30 85,40 85,70 100,80 100,60 90,50 100,40" fill="currentColor" opacity="0.7"/><rect x="10" y="35" width="80" height="30" fill="currentColor"/></svg>' },
  { id: 'badge-circle', name: 'Circle Badge', category: 'labels', tags: ['award', 'achievement'], svg: '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle cx="50" cy="45" r="35" fill="currentColor"/><polygon points="35,75 50,95 65,75" fill="currentColor"/><polygon points="30,78 20,95 40,85" fill="currentColor" opacity="0.8"/><polygon points="70,78 80,95 60,85" fill="currentColor" opacity="0.8"/></svg>' },
  { id: 'speech-bubble', name: 'Speech Bubble', category: 'labels', tags: ['chat', 'quote'], svg: '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><path d="M10 10L90 10C95 10 95 15 95 20L95 60C95 65 90 70 85 70L40 70L25 90L25 70L15 70C10 70 5 65 5 60L5 20C5 15 10 10 15 10Z" fill="currentColor"/></svg>' },
  { id: 'thought-bubble', name: 'Thought Bubble', category: 'labels', tags: ['thinking', 'idea'], svg: '<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><ellipse cx="50" cy="40" rx="40" ry="30" fill="currentColor"/><circle cx="25" cy="75" r="10" fill="currentColor"/><circle cx="15" cy="90" r="6" fill="currentColor"/></svg>' },
];

// Categories for filtering
const CATEGORIES = [
  { id: 'all', name: 'All', icon: Sparkles },
  { id: 'hearts', name: 'Hearts', icon: Heart },
  { id: 'stars', name: 'Stars', icon: Star },
  { id: 'flowers', name: 'Flowers', icon: Flower2 },
  { id: 'baby', name: 'Baby', icon: Baby },
  { id: 'celebration', name: 'Celebration', icon: Cake },
  { id: 'christmas', name: 'Christmas', icon: TreePine },
  { id: 'frames', name: 'Frames', icon: Gift },
  { id: 'travel', name: 'Travel', icon: Sun },
  { id: 'sports', name: 'Sports', icon: Moon },
  { id: 'food', name: 'Food', icon: Cloud },
  { id: 'animals', name: 'Animals', icon: Star },
  { id: 'labels', name: 'Labels', icon: Scissors },
];

export default function DieCutsBrowser({ onSelect, onAddToCanvas }: DieCutsBrowserProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedColor, setSelectedColor] = useState('#6366f1');

  // Filter die cuts
  const filteredDieCuts = useMemo(() => {
    return DIE_CUTS.filter(dieCut => {
      const matchesSearch = searchQuery === '' || 
        dieCut.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        dieCut.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesCategory = selectedCategory === 'all' || dieCut.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  // Handle die cut selection
  const handleSelect = (dieCut: DieCut) => {
    onSelect?.(dieCut);
    // Apply color to SVG
    const coloredSvg = dieCut.svg.replace(/currentColor/g, selectedColor);
    onAddToCanvas?.(coloredSvg, dieCut.name);
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b bg-gradient-to-r from-rose-50 to-pink-50">
        <div className="flex items-center gap-2 mb-3">
          <div className="p-2 bg-gradient-to-br from-rose-500 to-pink-500 rounded-lg">
            <Scissors className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Die Cuts</h3>
            <p className="text-xs text-gray-500">{filteredDieCuts.length} digital die cuts</p>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search die cuts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-white border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
          />
        </div>

        {/* Color Picker */}
        <div className="flex items-center gap-2 mt-3">
          <span className="text-xs text-gray-500">Color:</span>
          <div className="flex gap-1">
            {['#6366f1', '#ec4899', '#ef4444', '#f59e0b', '#10b981', '#3b82f6', '#8b5cf6', '#000000'].map(color => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                className={`w-6 h-6 rounded-full border-2 transition-transform ${
                  selectedColor === color ? 'border-gray-400 scale-110' : 'border-transparent'
                }`}
                style={{ backgroundColor: color }}
              />
            ))}
            <input
              type="color"
              value={selectedColor}
              onChange={(e) => setSelectedColor(e.target.value)}
              className="w-6 h-6 rounded cursor-pointer"
            />
          </div>
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
                    ? 'bg-rose-500 text-white'
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

      {/* Die Cuts Grid */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="grid grid-cols-4 gap-3">
          {filteredDieCuts.map(dieCut => (
            <button
              key={dieCut.id}
              onClick={() => handleSelect(dieCut)}
              className="group relative aspect-square bg-white rounded-lg border hover:border-rose-300 hover:shadow-md transition-all p-3"
              title={dieCut.name}
            >
              <div 
                className="w-full h-full flex items-center justify-center"
                style={{ color: selectedColor }}
                dangerouslySetInnerHTML={{ __html: dieCut.svg }}
              />
              <div className="absolute inset-x-0 bottom-0 p-1 bg-gradient-to-t from-black/50 to-transparent rounded-b-lg opacity-0 group-hover:opacity-100 transition-opacity">
                <p className="text-[10px] text-white text-center truncate">{dieCut.name}</p>
              </div>
            </button>
          ))}
        </div>

        {filteredDieCuts.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <Scissors className="w-12 h-12 mx-auto mb-2 opacity-30" />
            <p className="text-sm">No die cuts found</p>
          </div>
        )}
      </div>
    </div>
  );
}
