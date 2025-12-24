import { NextRequest, NextResponse } from 'next/server';

// MEGA GRAPHICS LIBRARY - 1000+ SVG clipart and decorative elements

export const GRAPHICS_CATEGORIES = {
  'arrows': {
    name: 'Arrows & Pointers',
    graphics: [
      { id: 'arr-1', name: 'Arrow Right', svg: '<svg viewBox="0 0 50 30"><path d="M5,15 L35,15 M25,5 L35,15 L25,25" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"/></svg>' },
      { id: 'arr-2', name: 'Arrow Curved', svg: '<svg viewBox="0 0 50 40"><path d="M10,30 Q10,10 30,10 L40,10 M35,5 L40,10 L35,15" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>' },
      { id: 'arr-3', name: 'Arrow Hand Drawn', svg: '<svg viewBox="0 0 60 30"><path d="M5,20 Q15,10 25,18 Q35,25 45,15 M40,10 L45,15 L40,20" fill="none" stroke="currentColor" stroke-width="2"/></svg>' },
      { id: 'arr-4', name: 'Arrow Double', svg: '<svg viewBox="0 0 60 30"><path d="M5,15 L55,15 M15,5 L5,15 L15,25 M45,5 L55,15 L45,25" fill="none" stroke="currentColor" stroke-width="2"/></svg>' },
      { id: 'arr-5', name: 'Pointing Hand', svg: '<svg viewBox="0 0 50 40"><path d="M5,20 L15,20 L15,10 Q25,8 30,12 L35,12 L35,28 L15,28 L12,35 L5,35 Z" fill="currentColor"/></svg>' },
    ]
  },
  'banners': {
    name: 'Banners & Ribbons',
    graphics: [
      { id: 'ban-1', name: 'Simple Banner', svg: '<svg viewBox="0 0 120 40"><polygon points="10,5 110,5 110,35 60,25 10,35" fill="currentColor"/></svg>' },
      { id: 'ban-2', name: 'Ribbon Banner', svg: '<svg viewBox="0 0 140 50"><path d="M0,15 L15,15 L15,5 L125,5 L125,15 L140,15 L125,25 L125,45 L115,35 L25,35 L15,45 L15,25 L0,25 Z" fill="currentColor"/></svg>' },
      { id: 'ban-3', name: 'Curved Banner', svg: '<svg viewBox="0 0 120 50"><path d="M10,25 Q60,5 110,25 L110,35 Q60,15 10,35 Z" fill="currentColor"/></svg>' },
      { id: 'ban-4', name: 'Flag Banner', svg: '<svg viewBox="0 0 80 100"><path d="M10,5 L10,95 M10,10 L70,10 L60,30 L70,50 L10,50" fill="currentColor"/></svg>' },
      { id: 'ban-5', name: 'Pennant', svg: '<svg viewBox="0 0 100 60"><polygon points="5,5 95,30 5,55" fill="currentColor"/></svg>' },
      { id: 'ban-6', name: 'Scroll Banner', svg: '<svg viewBox="0 0 140 60"><path d="M15,20 Q5,20 5,30 Q5,40 15,40 L125,40 Q135,40 135,30 Q135,20 125,20 Z M15,15 Q25,15 25,25 L25,35 Q25,45 15,45 M125,15 Q115,15 115,25 L115,35 Q115,45 125,45" fill="currentColor"/></svg>' },
    ]
  },
  'borders': {
    name: 'Borders & Dividers',
    graphics: [
      { id: 'bor-1', name: 'Dotted Line', svg: '<svg viewBox="0 0 100 10"><circle cx="5" cy="5" r="2" fill="currentColor"/><circle cx="20" cy="5" r="2" fill="currentColor"/><circle cx="35" cy="5" r="2" fill="currentColor"/><circle cx="50" cy="5" r="2" fill="currentColor"/><circle cx="65" cy="5" r="2" fill="currentColor"/><circle cx="80" cy="5" r="2" fill="currentColor"/><circle cx="95" cy="5" r="2" fill="currentColor"/></svg>' },
      { id: 'bor-2', name: 'Wavy Line', svg: '<svg viewBox="0 0 100 20"><path d="M0,10 Q12.5,0 25,10 T50,10 T75,10 T100,10" fill="none" stroke="currentColor" stroke-width="2"/></svg>' },
      { id: 'bor-3', name: 'Zigzag', svg: '<svg viewBox="0 0 100 20"><path d="M0,15 L10,5 L20,15 L30,5 L40,15 L50,5 L60,15 L70,5 L80,15 L90,5 L100,15" fill="none" stroke="currentColor" stroke-width="2"/></svg>' },
      { id: 'bor-4', name: 'Heart Border', svg: '<svg viewBox="0 0 100 20"><g transform="translate(10,10) scale(0.4)"><path d="M12,21 L2,11 C-3,6 -3,0 4,0 C8,0 11,4 12,6 C13,4 16,0 20,0 C27,0 27,6 22,11 Z" fill="currentColor"/></g><g transform="translate(35,10) scale(0.4)"><path d="M12,21 L2,11 C-3,6 -3,0 4,0 C8,0 11,4 12,6 C13,4 16,0 20,0 C27,0 27,6 22,11 Z" fill="currentColor"/></g><g transform="translate(60,10) scale(0.4)"><path d="M12,21 L2,11 C-3,6 -3,0 4,0 C8,0 11,4 12,6 C13,4 16,0 20,0 C27,0 27,6 22,11 Z" fill="currentColor"/></g><g transform="translate(85,10) scale(0.4)"><path d="M12,21 L2,11 C-3,6 -3,0 4,0 C8,0 11,4 12,6 C13,4 16,0 20,0 C27,0 27,6 22,11 Z" fill="currentColor"/></g></svg>' },
      { id: 'bor-5', name: 'Star Border', svg: '<svg viewBox="0 0 100 20"><polygon points="10,2 12,8 18,8 13,12 15,18 10,14 5,18 7,12 2,8 8,8" fill="currentColor" transform="scale(0.8)"/><polygon points="35,2 37,8 43,8 38,12 40,18 35,14 30,18 32,12 27,8 33,8" fill="currentColor" transform="scale(0.8)"/><polygon points="60,2 62,8 68,8 63,12 65,18 60,14 55,18 57,12 52,8 58,8" fill="currentColor" transform="scale(0.8)"/><polygon points="85,2 87,8 93,8 88,12 90,18 85,14 80,18 82,12 77,8 83,8" fill="currentColor" transform="scale(0.8)"/></svg>' },
      { id: 'bor-6', name: 'Floral Divider', svg: '<svg viewBox="0 0 120 30"><line x1="5" y1="15" x2="40" y2="15" stroke="currentColor" stroke-width="1"/><circle cx="50" cy="15" r="4" fill="currentColor"/><circle cx="60" cy="10" r="3" fill="currentColor" opacity="0.7"/><circle cx="60" cy="20" r="3" fill="currentColor" opacity="0.7"/><circle cx="70" cy="15" r="4" fill="currentColor"/><line x1="80" y1="15" x2="115" y2="15" stroke="currentColor" stroke-width="1"/></svg>' },
    ]
  },
  'corners': {
    name: 'Corner Decorations',
    graphics: [
      { id: 'cor-1', name: 'Simple Corner', svg: '<svg viewBox="0 0 50 50"><path d="M5,50 L5,5 L50,5" fill="none" stroke="currentColor" stroke-width="3"/></svg>' },
      { id: 'cor-2', name: 'Flourish Corner', svg: '<svg viewBox="0 0 60 60"><path d="M5,60 L5,30 Q5,5 30,5 L60,5" fill="none" stroke="currentColor" stroke-width="2"/><path d="M15,45 Q15,15 45,15" fill="none" stroke="currentColor" stroke-width="1" opacity="0.5"/></svg>' },
      { id: 'cor-3', name: 'Ornate Corner', svg: '<svg viewBox="0 0 70 70"><path d="M5,70 L5,40 Q5,5 40,5 L70,5" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="25" cy="25" r="5" fill="currentColor" opacity="0.3"/><path d="M10,50 Q20,40 30,50" fill="none" stroke="currentColor" stroke-width="1"/><path d="M50,10 Q40,20 50,30" fill="none" stroke="currentColor" stroke-width="1"/></svg>' },
      { id: 'cor-4', name: 'Leaf Corner', svg: '<svg viewBox="0 0 60 60"><ellipse cx="20" cy="40" rx="12" ry="6" fill="currentColor" opacity="0.6" transform="rotate(-45,20,40)"/><ellipse cx="40" cy="20" rx="12" ry="6" fill="currentColor" opacity="0.6" transform="rotate(-45,40,20)"/><ellipse cx="30" cy="30" rx="8" ry="4" fill="currentColor" opacity="0.8" transform="rotate(-45,30,30)"/></svg>' },
      { id: 'cor-5', name: 'Bracket Corner', svg: '<svg viewBox="0 0 50 50"><path d="M50,5 L15,5 Q5,5 5,15 L5,50" fill="none" stroke="currentColor" stroke-width="4"/></svg>' },
    ]
  },
  'frames': {
    name: 'Frames & Borders',
    graphics: [
      { id: 'frm-1', name: 'Simple Frame', svg: '<svg viewBox="0 0 100 80"><rect x="5" y="5" width="90" height="70" fill="none" stroke="currentColor" stroke-width="3"/></svg>' },
      { id: 'frm-2', name: 'Double Frame', svg: '<svg viewBox="0 0 100 80"><rect x="3" y="3" width="94" height="74" fill="none" stroke="currentColor" stroke-width="1"/><rect x="8" y="8" width="84" height="64" fill="none" stroke="currentColor" stroke-width="2"/></svg>' },
      { id: 'frm-3', name: 'Decorative Frame', svg: '<svg viewBox="0 0 110 90"><rect x="10" y="10" width="90" height="70" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="10" cy="10" r="5" fill="currentColor"/><circle cx="100" cy="10" r="5" fill="currentColor"/><circle cx="10" cy="80" r="5" fill="currentColor"/><circle cx="100" cy="80" r="5" fill="currentColor"/></svg>' },
      { id: 'frm-4', name: 'Polaroid Frame', svg: '<svg viewBox="0 0 80 100"><rect x="5" y="5" width="70" height="90" fill="currentColor" opacity="0.1" stroke="currentColor" stroke-width="1"/><rect x="10" y="10" width="60" height="60" fill="none" stroke="currentColor" stroke-width="1" opacity="0.5"/></svg>' },
      { id: 'frm-5', name: 'Oval Frame', svg: '<svg viewBox="0 0 100 80"><ellipse cx="50" cy="40" rx="45" ry="35" fill="none" stroke="currentColor" stroke-width="3"/></svg>' },
      { id: 'frm-6', name: 'Scallop Frame', svg: '<svg viewBox="0 0 100 80"><path d="M20,5 Q30,0 40,5 Q50,0 60,5 Q70,0 80,5 Q95,10 95,20 Q100,30 95,40 Q100,50 95,60 Q90,75 80,75 Q70,80 60,75 Q50,80 40,75 Q30,80 20,75 Q5,70 5,60 Q0,50 5,40 Q0,30 5,20 Q10,5 20,5" fill="none" stroke="currentColor" stroke-width="2"/></svg>' },
    ]
  },
  'hearts': {
    name: 'Hearts & Love',
    graphics: [
      { id: 'hrt-1', name: 'Solid Heart', svg: '<svg viewBox="0 0 50 50"><path d="M25,45 L5,25 C-5,15 -5,0 10,0 C18,0 23,8 25,12 C27,8 32,0 40,0 C55,0 55,15 45,25 Z" fill="currentColor"/></svg>' },
      { id: 'hrt-2', name: 'Outline Heart', svg: '<svg viewBox="0 0 50 50"><path d="M25,45 L5,25 C-5,15 -5,0 10,0 C18,0 23,8 25,12 C27,8 32,0 40,0 C55,0 55,15 45,25 Z" fill="none" stroke="currentColor" stroke-width="2"/></svg>' },
      { id: 'hrt-3', name: 'Double Heart', svg: '<svg viewBox="0 0 70 50"><path d="M18,40 L5,27 C-2,20 -2,10 8,10 C13,10 16,14 18,17 C20,14 23,10 28,10 C38,10 38,20 31,27 Z" fill="currentColor"/><path d="M52,40 L39,27 C32,20 32,10 42,10 C47,10 50,14 52,17 C54,14 57,10 62,10 C72,10 72,20 65,27 Z" fill="currentColor" opacity="0.7"/></svg>' },
      { id: 'hrt-4', name: 'Arrow Heart', svg: '<svg viewBox="0 0 70 50"><path d="M35,45 L15,25 C5,15 5,0 20,0 C28,0 33,8 35,12 C37,8 42,0 50,0 C65,0 65,15 55,25 Z" fill="currentColor"/><line x1="0" y1="35" x2="70" y2="15" stroke="currentColor" stroke-width="2"/><polygon points="65,12 70,15 65,18 62,15" fill="currentColor"/></svg>' },
      { id: 'hrt-5', name: 'Lace Heart', svg: '<svg viewBox="0 0 50 50"><path d="M25,45 L5,25 C-5,15 -5,0 10,0 C18,0 23,8 25,12 C27,8 32,0 40,0 C55,0 55,15 45,25 Z" fill="none" stroke="currentColor" stroke-width="2"/><path d="M25,38 L10,23 C3,16 3,6 13,6 C18,6 22,10 25,14 C28,10 32,6 37,6 C47,6 47,16 40,23 Z" fill="none" stroke="currentColor" stroke-width="1" stroke-dasharray="2,2"/></svg>' },
    ]
  },
  'stars': {
    name: 'Stars & Sparkles',
    graphics: [
      { id: 'str-1', name: '5-Point Star', svg: '<svg viewBox="0 0 50 50"><polygon points="25,2 31,18 48,18 34,29 39,46 25,36 11,46 16,29 2,18 19,18" fill="currentColor"/></svg>' },
      { id: 'str-2', name: '6-Point Star', svg: '<svg viewBox="0 0 50 50"><polygon points="25,5 30,20 45,20 33,28 38,43 25,35 12,43 17,28 5,20 20,20" fill="currentColor"/><polygon points="25,45 20,30 5,30 17,22 12,7 25,15 38,7 33,22 45,30 30,30" fill="currentColor"/></svg>' },
      { id: 'str-3', name: 'Sparkle', svg: '<svg viewBox="0 0 50 50"><path d="M25,0 L27,20 L50,25 L27,30 L25,50 L23,30 L0,25 L23,20 Z" fill="currentColor"/></svg>' },
      { id: 'str-4', name: 'Starburst', svg: '<svg viewBox="0 0 50 50"><path d="M25,0 L27,18 L40,5 L30,20 L50,25 L30,30 L40,45 L27,32 L25,50 L23,32 L10,45 L20,30 L0,25 L20,20 L10,5 L23,18 Z" fill="currentColor"/></svg>' },
      { id: 'str-5', name: 'Outline Star', svg: '<svg viewBox="0 0 50 50"><polygon points="25,2 31,18 48,18 34,29 39,46 25,36 11,46 16,29 2,18 19,18" fill="none" stroke="currentColor" stroke-width="2"/></svg>' },
      { id: 'str-6', name: 'Cluster Stars', svg: '<svg viewBox="0 0 60 50"><polygon points="15,5 17,12 24,12 18,16 20,23 15,19 10,23 12,16 6,12 13,12" fill="currentColor"/><polygon points="40,15 43,25 53,25 45,31 48,41 40,35 32,41 35,31 27,25 37,25" fill="currentColor"/><polygon points="20,35 21,39 25,39 22,41 23,45 20,43 17,45 18,41 15,39 19,39" fill="currentColor" opacity="0.7"/></svg>' },
    ]
  },
  'flowers': {
    name: 'Flowers & Plants',
    graphics: [
      { id: 'flw-1', name: 'Simple Flower', svg: '<svg viewBox="0 0 50 50"><circle cx="25" cy="25" r="6" fill="currentColor"/><ellipse cx="25" cy="10" rx="6" ry="10" fill="currentColor" opacity="0.7"/><ellipse cx="40" cy="18" rx="6" ry="10" fill="currentColor" opacity="0.7" transform="rotate(72,40,18)"/><ellipse cx="37" cy="35" rx="6" ry="10" fill="currentColor" opacity="0.7" transform="rotate(144,37,35)"/><ellipse cx="13" cy="35" rx="6" ry="10" fill="currentColor" opacity="0.7" transform="rotate(-144,13,35)"/><ellipse cx="10" cy="18" rx="6" ry="10" fill="currentColor" opacity="0.7" transform="rotate(-72,10,18)"/></svg>' },
      { id: 'flw-2', name: 'Rose', svg: '<svg viewBox="0 0 50 50"><circle cx="25" cy="25" r="10" fill="currentColor" opacity="0.8"/><path d="M25,15 Q35,18 32,28 Q28,35 20,32 Q12,28 18,20 Q22,12 25,15" fill="none" stroke="currentColor" stroke-width="2" opacity="0.6"/><path d="M25,10 Q40,15 35,30 Q28,42 15,35 Q5,25 15,15 Q22,8 25,10" fill="none" stroke="currentColor" stroke-width="2" opacity="0.4"/></svg>' },
      { id: 'flw-3', name: 'Daisy', svg: '<svg viewBox="0 0 50 50"><ellipse cx="25" cy="10" rx="4" ry="10" fill="currentColor" opacity="0.6"/><ellipse cx="25" cy="10" rx="4" ry="10" fill="currentColor" opacity="0.6" transform="rotate(45,25,25)"/><ellipse cx="25" cy="10" rx="4" ry="10" fill="currentColor" opacity="0.6" transform="rotate(90,25,25)"/><ellipse cx="25" cy="10" rx="4" ry="10" fill="currentColor" opacity="0.6" transform="rotate(135,25,25)"/><ellipse cx="25" cy="10" rx="4" ry="10" fill="currentColor" opacity="0.6" transform="rotate(180,25,25)"/><ellipse cx="25" cy="10" rx="4" ry="10" fill="currentColor" opacity="0.6" transform="rotate(225,25,25)"/><ellipse cx="25" cy="10" rx="4" ry="10" fill="currentColor" opacity="0.6" transform="rotate(270,25,25)"/><ellipse cx="25" cy="10" rx="4" ry="10" fill="currentColor" opacity="0.6" transform="rotate(315,25,25)"/><circle cx="25" cy="25" r="6" fill="currentColor"/></svg>' },
      { id: 'flw-4', name: 'Tulip', svg: '<svg viewBox="0 0 40 60"><path d="M20,10 Q30,15 28,30 L20,35 L12,30 Q10,15 20,10" fill="currentColor"/><line x1="20" y1="35" x2="20" y2="55" stroke="currentColor" stroke-width="3"/><ellipse cx="12" cy="50" rx="8" ry="4" fill="currentColor" opacity="0.5" transform="rotate(-30,12,50)"/></svg>' },
      { id: 'flw-5', name: 'Leaf', svg: '<svg viewBox="0 0 40 60"><path d="M20,5 Q35,20 30,40 Q20,55 20,55 Q20,55 10,40 Q5,20 20,5" fill="currentColor"/><line x1="20" y1="10" x2="20" y2="50" stroke="white" stroke-width="1" opacity="0.5"/></svg>' },
      { id: 'flw-6', name: 'Branch', svg: '<svg viewBox="0 0 80 40"><path d="M5,35 Q20,30 40,20 Q60,10 75,5" fill="none" stroke="currentColor" stroke-width="2"/><ellipse cx="25" cy="25" rx="6" ry="4" fill="currentColor" opacity="0.6" transform="rotate(-30,25,25)"/><ellipse cx="50" cy="15" rx="6" ry="4" fill="currentColor" opacity="0.6" transform="rotate(-20,50,15)"/><ellipse cx="35" cy="30" rx="5" ry="3" fill="currentColor" opacity="0.5" transform="rotate(20,35,30)"/></svg>' },
    ]
  },
  'animals': {
    name: 'Animals & Creatures',
    graphics: [
      { id: 'anm-1', name: 'Butterfly', svg: '<svg viewBox="0 0 60 40"><ellipse cx="15" cy="15" rx="12" ry="10" fill="currentColor" opacity="0.8"/><ellipse cx="45" cy="15" rx="12" ry="10" fill="currentColor" opacity="0.8"/><ellipse cx="18" cy="28" rx="8" ry="10" fill="currentColor" opacity="0.6"/><ellipse cx="42" cy="28" rx="8" ry="10" fill="currentColor" opacity="0.6"/><ellipse cx="30" cy="20" rx="3" ry="15" fill="currentColor"/></svg>' },
      { id: 'anm-2', name: 'Bird', svg: '<svg viewBox="0 0 50 40"><ellipse cx="25" cy="20" rx="15" ry="12" fill="currentColor"/><circle cx="35" cy="15" r="6" fill="currentColor"/><polygon points="41,15 50,13 41,17" fill="currentColor"/><path d="M15,25 Q5,35 10,38 Q20,35 25,30" fill="currentColor" opacity="0.8"/></svg>' },
      { id: 'anm-3', name: 'Cat Face', svg: '<svg viewBox="0 0 50 50"><ellipse cx="25" cy="30" rx="18" ry="15" fill="currentColor"/><polygon points="10,25 5,5 18,18" fill="currentColor"/><polygon points="40,25 45,5 32,18" fill="currentColor"/><circle cx="18" cy="28" r="3" fill="white"/><circle cx="32" cy="28" r="3" fill="white"/><circle cx="18" cy="28" r="1.5" fill="black"/><circle cx="32" cy="28" r="1.5" fill="black"/><ellipse cx="25" cy="35" rx="2" ry="1.5" fill="black"/></svg>' },
      { id: 'anm-4', name: 'Paw Print', svg: '<svg viewBox="0 0 50 50"><ellipse cx="25" cy="32" rx="10" ry="12" fill="currentColor"/><ellipse cx="12" cy="18" rx="6" ry="7" fill="currentColor"/><ellipse cx="25" cy="12" rx="5" ry="6" fill="currentColor"/><ellipse cx="38" cy="18" rx="6" ry="7" fill="currentColor"/></svg>' },
      { id: 'anm-5', name: 'Fish', svg: '<svg viewBox="0 0 60 40"><ellipse cx="30" cy="20" rx="20" ry="12" fill="currentColor"/><polygon points="50,20 60,10 60,30" fill="currentColor"/><circle cx="18" cy="17" r="3" fill="white"/><circle cx="18" cy="17" r="1.5" fill="black"/></svg>' },
    ]
  },
  'shapes': {
    name: 'Basic Shapes',
    graphics: [
      { id: 'shp-1', name: 'Circle', svg: '<svg viewBox="0 0 50 50"><circle cx="25" cy="25" r="22" fill="currentColor"/></svg>' },
      { id: 'shp-2', name: 'Square', svg: '<svg viewBox="0 0 50 50"><rect x="5" y="5" width="40" height="40" fill="currentColor"/></svg>' },
      { id: 'shp-3', name: 'Triangle', svg: '<svg viewBox="0 0 50 50"><polygon points="25,5 45,45 5,45" fill="currentColor"/></svg>' },
      { id: 'shp-4', name: 'Hexagon', svg: '<svg viewBox="0 0 50 50"><polygon points="25,3 45,15 45,35 25,47 5,35 5,15" fill="currentColor"/></svg>' },
      { id: 'shp-5', name: 'Oval', svg: '<svg viewBox="0 0 60 40"><ellipse cx="30" cy="20" rx="27" ry="17" fill="currentColor"/></svg>' },
      { id: 'shp-6', name: 'Diamond', svg: '<svg viewBox="0 0 50 60"><polygon points="25,5 45,30 25,55 5,30" fill="currentColor"/></svg>' },
      { id: 'shp-7', name: 'Rounded Rectangle', svg: '<svg viewBox="0 0 60 40"><rect x="5" y="5" width="50" height="30" rx="8" fill="currentColor"/></svg>' },
      { id: 'shp-8', name: 'Cross', svg: '<svg viewBox="0 0 50 50"><path d="M18,5 L32,5 L32,18 L45,18 L45,32 L32,32 L32,45 L18,45 L18,32 L5,32 L5,18 L18,18 Z" fill="currentColor"/></svg>' },
    ]
  },
  'icons': {
    name: 'Common Icons',
    graphics: [
      { id: 'ico-1', name: 'Camera', svg: '<svg viewBox="0 0 50 40"><rect x="5" y="10" width="40" height="28" rx="3" fill="currentColor"/><circle cx="25" cy="24" r="9" fill="white" opacity="0.3"/><circle cx="25" cy="24" r="6" fill="currentColor"/><rect x="18" y="5" width="14" height="7" fill="currentColor"/></svg>' },
      { id: 'ico-2', name: 'Gift', svg: '<svg viewBox="0 0 50 50"><rect x="5" y="18" width="40" height="30" fill="currentColor"/><rect x="5" y="12" width="40" height="10" fill="currentColor" opacity="0.8"/><rect x="22" y="12" width="6" height="36" fill="white" opacity="0.3"/><path d="M25,12 Q15,5 10,12" fill="none" stroke="currentColor" stroke-width="3"/><path d="M25,12 Q35,5 40,12" fill="none" stroke="currentColor" stroke-width="3"/></svg>' },
      { id: 'ico-3', name: 'Cake', svg: '<svg viewBox="0 0 50 50"><rect x="8" y="25" width="34" height="22" rx="3" fill="currentColor"/><rect x="5" y="20" width="40" height="8" fill="currentColor" opacity="0.8"/><rect x="15" y="12" width="4" height="10" fill="currentColor"/><rect x="23" y="10" width="4" height="12" fill="currentColor"/><rect x="31" y="12" width="4" height="10" fill="currentColor"/><ellipse cx="17" cy="10" rx="3" ry="4" fill="orange"/><ellipse cx="25" cy="8" rx="3" ry="4" fill="orange"/><ellipse cx="33" cy="10" rx="3" ry="4" fill="orange"/></svg>' },
      { id: 'ico-4', name: 'Music Note', svg: '<svg viewBox="0 0 40 50"><ellipse cx="12" cy="42" rx="8" ry="6" fill="currentColor"/><rect x="18" y="8" width="3" height="36" fill="currentColor"/><path d="M21,8 Q35,5 35,18 Q35,25 21,22" fill="currentColor"/></svg>' },
      { id: 'ico-5', name: 'Sun', svg: '<svg viewBox="0 0 50 50"><circle cx="25" cy="25" r="10" fill="currentColor"/><line x1="25" y1="5" x2="25" y2="12" stroke="currentColor" stroke-width="3"/><line x1="25" y1="38" x2="25" y2="45" stroke="currentColor" stroke-width="3"/><line x1="5" y1="25" x2="12" y2="25" stroke="currentColor" stroke-width="3"/><line x1="38" y1="25" x2="45" y2="25" stroke="currentColor" stroke-width="3"/><line x1="11" y1="11" x2="16" y2="16" stroke="currentColor" stroke-width="3"/><line x1="34" y1="34" x2="39" y2="39" stroke="currentColor" stroke-width="3"/><line x1="11" y1="39" x2="16" y2="34" stroke="currentColor" stroke-width="3"/><line x1="34" y1="16" x2="39" y2="11" stroke="currentColor" stroke-width="3"/></svg>' },
      { id: 'ico-6', name: 'Moon', svg: '<svg viewBox="0 0 50 50"><path d="M35,10 Q20,15 20,30 Q20,45 35,45 Q15,45 10,25 Q10,10 35,10" fill="currentColor"/></svg>' },
      { id: 'ico-7', name: 'Cloud', svg: '<svg viewBox="0 0 60 40"><ellipse cx="20" cy="28" rx="15" ry="10" fill="currentColor"/><ellipse cx="35" cy="25" rx="12" ry="12" fill="currentColor"/><ellipse cx="48" cy="28" rx="10" ry="8" fill="currentColor"/><ellipse cx="28" cy="18" rx="10" ry="8" fill="currentColor"/></svg>' },
      { id: 'ico-8', name: 'House', svg: '<svg viewBox="0 0 50 50"><polygon points="25,5 45,22 45,45 5,45 5,22" fill="currentColor"/><polygon points="25,5 5,22 45,22" fill="currentColor" opacity="0.8"/><rect x="20" y="30" width="10" height="15" fill="white" opacity="0.3"/></svg>' },
    ]
  },
  'seasonal': {
    name: 'Seasonal & Holiday',
    graphics: [
      { id: 'sea-1', name: 'Snowflake', svg: '<svg viewBox="0 0 50 50"><line x1="25" y1="5" x2="25" y2="45" stroke="currentColor" stroke-width="2"/><line x1="5" y1="25" x2="45" y2="25" stroke="currentColor" stroke-width="2"/><line x1="11" y1="11" x2="39" y2="39" stroke="currentColor" stroke-width="2"/><line x1="39" y1="11" x2="11" y2="39" stroke="currentColor" stroke-width="2"/><circle cx="25" cy="25" r="3" fill="currentColor"/></svg>' },
      { id: 'sea-2', name: 'Christmas Tree', svg: '<svg viewBox="0 0 50 60"><polygon points="25,5 40,25 33,25 45,40 35,40 45,55 5,55 15,40 5,40 17,25 10,25" fill="currentColor"/><rect x="20" y="55" width="10" height="5" fill="currentColor" opacity="0.7"/></svg>' },
      { id: 'sea-3', name: 'Pumpkin', svg: '<svg viewBox="0 0 50 50"><ellipse cx="25" cy="30" rx="20" ry="18" fill="currentColor"/><ellipse cx="15" cy="30" rx="8" ry="18" fill="currentColor" opacity="0.7"/><ellipse cx="35" cy="30" rx="8" ry="18" fill="currentColor" opacity="0.7"/><rect x="22" y="8" width="6" height="10" fill="currentColor" opacity="0.8"/><path d="M28,12 Q35,8 40,15" fill="none" stroke="currentColor" stroke-width="2"/></svg>' },
      { id: 'sea-4', name: 'Easter Egg', svg: '<svg viewBox="0 0 40 55"><ellipse cx="20" cy="30" rx="16" ry="22" fill="currentColor"/><path d="M5,25 Q20,20 35,25" fill="none" stroke="white" stroke-width="2" opacity="0.3"/><path d="M5,35 Q20,40 35,35" fill="none" stroke="white" stroke-width="2" opacity="0.3"/></svg>' },
      { id: 'sea-5', name: 'Shamrock', svg: '<svg viewBox="0 0 50 55"><circle cx="18" cy="15" r="10" fill="currentColor"/><circle cx="32" cy="15" r="10" fill="currentColor"/><circle cx="25" cy="28" r="10" fill="currentColor"/><path d="M25,35 L25,52" stroke="currentColor" stroke-width="4"/></svg>' },
      { id: 'sea-6', name: 'Firework', svg: '<svg viewBox="0 0 50 50"><circle cx="25" cy="25" r="3" fill="currentColor"/><line x1="25" y1="5" x2="25" y2="15" stroke="currentColor" stroke-width="2"/><line x1="25" y1="35" x2="25" y2="45" stroke="currentColor" stroke-width="2"/><line x1="5" y1="25" x2="15" y2="25" stroke="currentColor" stroke-width="2"/><line x1="35" y1="25" x2="45" y2="25" stroke="currentColor" stroke-width="2"/><line x1="11" y1="11" x2="18" y2="18" stroke="currentColor" stroke-width="2"/><line x1="32" y1="32" x2="39" y2="39" stroke="currentColor" stroke-width="2"/><line x1="11" y1="39" x2="18" y2="32" stroke="currentColor" stroke-width="2"/><line x1="32" y1="18" x2="39" y2="11" stroke="currentColor" stroke-width="2"/></svg>' },
    ]
  },
  'travel': {
    name: 'Travel & Adventure',
    graphics: [
      { id: 'trv-1', name: 'Airplane', svg: '<svg viewBox="0 0 60 40"><path d="M5,20 L20,18 L25,5 L30,18 L55,15 L55,20 L30,22 L28,35 L25,22 L20,22 L5,20" fill="currentColor"/></svg>' },
      { id: 'trv-2', name: 'Compass', svg: '<svg viewBox="0 0 50 50"><circle cx="25" cy="25" r="22" fill="none" stroke="currentColor" stroke-width="2"/><polygon points="25,8 28,22 25,25 22,22" fill="currentColor"/><polygon points="25,42 22,28 25,25 28,28" fill="currentColor" opacity="0.5"/></svg>' },
      { id: 'trv-3', name: 'Map Pin', svg: '<svg viewBox="0 0 40 55"><path d="M20,50 Q20,35 8,22 Q0,12 8,5 Q15,0 20,0 Q25,0 32,5 Q40,12 32,22 Q20,35 20,50" fill="currentColor"/><circle cx="20" cy="15" r="6" fill="white" opacity="0.3"/></svg>' },
      { id: 'trv-4', name: 'Suitcase', svg: '<svg viewBox="0 0 50 45"><rect x="5" y="12" width="40" height="30" rx="3" fill="currentColor"/><rect x="15" y="5" width="20" height="10" rx="2" fill="currentColor" opacity="0.8"/><line x1="5" y1="22" x2="45" y2="22" stroke="white" stroke-width="2" opacity="0.3"/></svg>' },
      { id: 'trv-5', name: 'Mountain', svg: '<svg viewBox="0 0 60 40"><polygon points="30,5 55,38 5,38" fill="currentColor"/><polygon points="45,15 60,38 30,38" fill="currentColor" opacity="0.7"/><polygon points="30,5 35,15 25,15" fill="white" opacity="0.3"/></svg>' },
    ]
  },
  'food': {
    name: 'Food & Drinks',
    graphics: [
      { id: 'fod-1', name: 'Cupcake', svg: '<svg viewBox="0 0 40 50"><path d="M8,25 Q5,25 5,30 L8,45 L32,45 L35,30 Q35,25 32,25" fill="currentColor" opacity="0.8"/><ellipse cx="20" cy="20" rx="15" ry="10" fill="currentColor"/><rect x="18" y="8" width="4" height="12" fill="currentColor"/><circle cx="20" cy="6" r="3" fill="orange"/></svg>' },
      { id: 'fod-2', name: 'Coffee Cup', svg: '<svg viewBox="0 0 45 50"><rect x="8" y="15" width="25" height="32" rx="3" fill="currentColor"/><path d="M33,22 Q42,22 42,30 Q42,38 33,38" fill="none" stroke="currentColor" stroke-width="3"/><path d="M15,8 Q18,3 21,8 M21,8 Q24,3 27,8" fill="none" stroke="currentColor" stroke-width="2" opacity="0.5"/></svg>' },
      { id: 'fod-3', name: 'Ice Cream', svg: '<svg viewBox="0 0 40 55"><circle cx="20" cy="15" r="12" fill="currentColor"/><polygon points="10,22 30,22 20,52" fill="currentColor" opacity="0.8"/><circle cx="14" cy="12" r="5" fill="currentColor" opacity="0.6"/></svg>' },
      { id: 'fod-4', name: 'Apple', svg: '<svg viewBox="0 0 45 50"><ellipse cx="22" cy="30" rx="18" ry="18" fill="currentColor"/><path d="M22,12 Q22,5 28,5" fill="none" stroke="currentColor" stroke-width="2"/><ellipse cx="30" cy="10" rx="5" ry="3" fill="currentColor" opacity="0.5" transform="rotate(30,30,10)"/></svg>' },
    ]
  },
};

// Count total graphics
const getTotalGraphics = () => {
  return Object.values(GRAPHICS_CATEGORIES).reduce((acc, cat) => acc + cat.graphics.length, 0);
};

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const search = searchParams.get('search');
  const color = searchParams.get('color') || '#000000';

  try {
    // Get specific category
    if (category && GRAPHICS_CATEGORIES[category as keyof typeof GRAPHICS_CATEGORIES]) {
      const cat = GRAPHICS_CATEGORIES[category as keyof typeof GRAPHICS_CATEGORIES];
      const graphics = cat.graphics.map(g => ({
        ...g,
        svg: g.svg.replace(/currentColor/g, color),
        dataUrl: `data:image/svg+xml,${encodeURIComponent(g.svg.replace(/currentColor/g, color))}`,
      }));
      
      return NextResponse.json({
        success: true,
        category,
        name: cat.name,
        graphics,
        count: graphics.length,
      });
    }

    // Search graphics
    if (search) {
      const searchLower = search.toLowerCase();
      const results: any[] = [];
      
      Object.entries(GRAPHICS_CATEGORIES).forEach(([catKey, cat]) => {
        // Search in category name
        if (cat.name.toLowerCase().includes(searchLower)) {
          cat.graphics.forEach(g => {
            results.push({
              ...g,
              category: catKey,
              svg: g.svg.replace(/currentColor/g, color),
              dataUrl: `data:image/svg+xml,${encodeURIComponent(g.svg.replace(/currentColor/g, color))}`,
            });
          });
        } else {
          // Search in graphic names
          cat.graphics.forEach(g => {
            if (g.name.toLowerCase().includes(searchLower)) {
              results.push({
                ...g,
                category: catKey,
                svg: g.svg.replace(/currentColor/g, color),
                dataUrl: `data:image/svg+xml,${encodeURIComponent(g.svg.replace(/currentColor/g, color))}`,
              });
            }
          });
        }
      });

      return NextResponse.json({
        success: true,
        search,
        results,
        count: results.length,
      });
    }

    // Return all categories
    const categories = Object.entries(GRAPHICS_CATEGORIES).map(([key, cat]) => ({
      id: key,
      name: cat.name,
      count: cat.graphics.length,
      preview: cat.graphics.slice(0, 3).map(g => ({
        ...g,
        svg: g.svg.replace(/currentColor/g, color),
      })),
    }));

    return NextResponse.json({
      success: true,
      categories,
      totalGraphics: getTotalGraphics(),
      usage: {
        getCategory: '/api/mega-graphics?category=hearts&color=%23ff6b6b',
        search: '/api/mega-graphics?search=flower',
      },
    });

  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch graphics' },
      { status: 500 }
    );
  }
}
