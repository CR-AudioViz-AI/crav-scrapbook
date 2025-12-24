import { NextRequest, NextResponse } from 'next/server';

const GRAPHICS_CATEGORIES = {
  'arrows': {
    name: 'Arrows & Pointers',
    graphics: [
      { id: 'arr-1', name: 'Arrow Right', svg: '<svg viewBox="0 0 50 30"><path d="M5,15 L35,15 M25,5 L35,15 L25,25" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"/></svg>' },
      { id: 'arr-2', name: 'Arrow Curved', svg: '<svg viewBox="0 0 50 40"><path d="M10,30 Q10,10 30,10 L40,10 M35,5 L40,10 L35,15" fill="none" stroke="currentColor" stroke-width="2"/></svg>' },
      { id: 'arr-3', name: 'Double Arrow', svg: '<svg viewBox="0 0 60 30"><path d="M5,15 L55,15 M15,5 L5,15 L15,25 M45,5 L55,15 L45,25" fill="none" stroke="currentColor" stroke-width="2"/></svg>' },
    ]
  },
  'banners': {
    name: 'Banners & Ribbons',
    graphics: [
      { id: 'ban-1', name: 'Simple Banner', svg: '<svg viewBox="0 0 120 40"><polygon points="10,5 110,5 110,35 60,25 10,35" fill="currentColor"/></svg>' },
      { id: 'ban-2', name: 'Ribbon Banner', svg: '<svg viewBox="0 0 140 50"><path d="M0,15 L15,15 L15,5 L125,5 L125,15 L140,15 L125,25 L125,45 L115,35 L25,35 L15,45 L15,25 Z" fill="currentColor"/></svg>' },
      { id: 'ban-3', name: 'Curved Banner', svg: '<svg viewBox="0 0 120 50"><path d="M10,25 Q60,5 110,25 L110,35 Q60,15 10,35 Z" fill="currentColor"/></svg>' },
    ]
  },
  'hearts': {
    name: 'Hearts & Love',
    graphics: [
      { id: 'hrt-1', name: 'Solid Heart', svg: '<svg viewBox="0 0 50 50"><path d="M25,45 L5,25 C-5,15 -5,0 10,0 C18,0 23,8 25,12 C27,8 32,0 40,0 C55,0 55,15 45,25 Z" fill="currentColor"/></svg>' },
      { id: 'hrt-2', name: 'Outline Heart', svg: '<svg viewBox="0 0 50 50"><path d="M25,45 L5,25 C-5,15 -5,0 10,0 C18,0 23,8 25,12 C27,8 32,0 40,0 C55,0 55,15 45,25 Z" fill="none" stroke="currentColor" stroke-width="2"/></svg>' },
      { id: 'hrt-3', name: 'Arrow Heart', svg: '<svg viewBox="0 0 70 50"><path d="M35,45 L15,25 C5,15 5,0 20,0 C28,0 33,8 35,12 C37,8 42,0 50,0 C65,0 65,15 55,25 Z" fill="currentColor"/><line x1="0" y1="35" x2="70" y2="15" stroke="currentColor" stroke-width="2"/></svg>' },
    ]
  },
  'stars': {
    name: 'Stars & Sparkles',
    graphics: [
      { id: 'str-1', name: '5-Point Star', svg: '<svg viewBox="0 0 50 50"><polygon points="25,2 31,18 48,18 34,29 39,46 25,36 11,46 16,29 2,18 19,18" fill="currentColor"/></svg>' },
      { id: 'str-2', name: 'Sparkle', svg: '<svg viewBox="0 0 50 50"><path d="M25,0 L27,20 L50,25 L27,30 L25,50 L23,30 L0,25 L23,20 Z" fill="currentColor"/></svg>' },
      { id: 'str-3', name: 'Starburst', svg: '<svg viewBox="0 0 50 50"><path d="M25,0 L27,18 L40,5 L30,20 L50,25 L30,30 L40,45 L27,32 L25,50 L23,32 L10,45 L20,30 L0,25 L20,20 L10,5 L23,18 Z" fill="currentColor"/></svg>' },
    ]
  },
  'flowers': {
    name: 'Flowers & Plants',
    graphics: [
      { id: 'flw-1', name: 'Simple Flower', svg: '<svg viewBox="0 0 50 50"><circle cx="25" cy="25" r="6" fill="currentColor"/><ellipse cx="25" cy="10" rx="6" ry="10" fill="currentColor" opacity="0.7"/><ellipse cx="40" cy="18" rx="6" ry="10" fill="currentColor" opacity="0.7" transform="rotate(72,40,18)"/><ellipse cx="37" cy="35" rx="6" ry="10" fill="currentColor" opacity="0.7" transform="rotate(144,37,35)"/><ellipse cx="13" cy="35" rx="6" ry="10" fill="currentColor" opacity="0.7" transform="rotate(-144,13,35)"/><ellipse cx="10" cy="18" rx="6" ry="10" fill="currentColor" opacity="0.7" transform="rotate(-72,10,18)"/></svg>' },
      { id: 'flw-2', name: 'Leaf', svg: '<svg viewBox="0 0 40 60"><path d="M20,5 Q35,20 30,40 Q20,55 20,55 Q20,55 10,40 Q5,20 20,5" fill="currentColor"/><line x1="20" y1="10" x2="20" y2="50" stroke="white" stroke-width="1" opacity="0.5"/></svg>' },
    ]
  },
  'shapes': {
    name: 'Basic Shapes',
    graphics: [
      { id: 'shp-1', name: 'Circle', svg: '<svg viewBox="0 0 50 50"><circle cx="25" cy="25" r="22" fill="currentColor"/></svg>' },
      { id: 'shp-2', name: 'Square', svg: '<svg viewBox="0 0 50 50"><rect x="5" y="5" width="40" height="40" fill="currentColor"/></svg>' },
      { id: 'shp-3', name: 'Triangle', svg: '<svg viewBox="0 0 50 50"><polygon points="25,5 45,45 5,45" fill="currentColor"/></svg>' },
      { id: 'shp-4', name: 'Hexagon', svg: '<svg viewBox="0 0 50 50"><polygon points="25,3 45,15 45,35 25,47 5,35 5,15" fill="currentColor"/></svg>' },
      { id: 'shp-5', name: 'Diamond', svg: '<svg viewBox="0 0 50 60"><polygon points="25,5 45,30 25,55 5,30" fill="currentColor"/></svg>' },
    ]
  },
  'frames': {
    name: 'Frames & Borders',
    graphics: [
      { id: 'frm-1', name: 'Simple Frame', svg: '<svg viewBox="0 0 100 80"><rect x="5" y="5" width="90" height="70" fill="none" stroke="currentColor" stroke-width="3"/></svg>' },
      { id: 'frm-2', name: 'Double Frame', svg: '<svg viewBox="0 0 100 80"><rect x="3" y="3" width="94" height="74" fill="none" stroke="currentColor" stroke-width="1"/><rect x="8" y="8" width="84" height="64" fill="none" stroke="currentColor" stroke-width="2"/></svg>' },
      { id: 'frm-3', name: 'Polaroid', svg: '<svg viewBox="0 0 80 100"><rect x="5" y="5" width="70" height="90" fill="currentColor" opacity="0.1" stroke="currentColor" stroke-width="1"/><rect x="10" y="10" width="60" height="60" fill="none" stroke="currentColor" stroke-width="1" opacity="0.5"/></svg>' },
    ]
  },
  'seasonal': {
    name: 'Seasonal & Holiday',
    graphics: [
      { id: 'sea-1', name: 'Snowflake', svg: '<svg viewBox="0 0 50 50"><line x1="25" y1="5" x2="25" y2="45" stroke="currentColor" stroke-width="2"/><line x1="5" y1="25" x2="45" y2="25" stroke="currentColor" stroke-width="2"/><line x1="11" y1="11" x2="39" y2="39" stroke="currentColor" stroke-width="2"/><line x1="39" y1="11" x2="11" y2="39" stroke="currentColor" stroke-width="2"/><circle cx="25" cy="25" r="3" fill="currentColor"/></svg>' },
      { id: 'sea-2', name: 'Christmas Tree', svg: '<svg viewBox="0 0 50 60"><polygon points="25,5 40,25 33,25 45,40 35,40 45,55 5,55 15,40 5,40 17,25 10,25" fill="currentColor"/></svg>' },
      { id: 'sea-3', name: 'Pumpkin', svg: '<svg viewBox="0 0 50 50"><ellipse cx="25" cy="30" rx="20" ry="18" fill="currentColor"/><rect x="22" y="8" width="6" height="10" fill="currentColor" opacity="0.8"/></svg>' },
    ]
  },
  'icons': {
    name: 'Common Icons',
    graphics: [
      { id: 'ico-1', name: 'Camera', svg: '<svg viewBox="0 0 50 40"><rect x="5" y="10" width="40" height="28" rx="3" fill="currentColor"/><circle cx="25" cy="24" r="9" fill="white" opacity="0.3"/><circle cx="25" cy="24" r="6" fill="currentColor"/><rect x="18" y="5" width="14" height="7" fill="currentColor"/></svg>' },
      { id: 'ico-2', name: 'Gift', svg: '<svg viewBox="0 0 50 50"><rect x="5" y="18" width="40" height="30" fill="currentColor"/><rect x="5" y="12" width="40" height="10" fill="currentColor" opacity="0.8"/><rect x="22" y="12" width="6" height="36" fill="white" opacity="0.3"/></svg>' },
      { id: 'ico-3', name: 'Sun', svg: '<svg viewBox="0 0 50 50"><circle cx="25" cy="25" r="10" fill="currentColor"/><line x1="25" y1="5" x2="25" y2="12" stroke="currentColor" stroke-width="3"/><line x1="25" y1="38" x2="25" y2="45" stroke="currentColor" stroke-width="3"/><line x1="5" y1="25" x2="12" y2="25" stroke="currentColor" stroke-width="3"/><line x1="38" y1="25" x2="45" y2="25" stroke="currentColor" stroke-width="3"/></svg>' },
    ]
  },
};

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const search = searchParams.get('search');
  const color = searchParams.get('color') || '#000000';

  try {
    if (category && GRAPHICS_CATEGORIES[category as keyof typeof GRAPHICS_CATEGORIES]) {
      const cat = GRAPHICS_CATEGORIES[category as keyof typeof GRAPHICS_CATEGORIES];
      const graphics = cat.graphics.map(g => ({
        ...g,
        svg: g.svg.replace(/currentColor/g, color),
        dataUrl: `data:image/svg+xml,${encodeURIComponent(g.svg.replace(/currentColor/g, color))}`,
      }));
      return NextResponse.json({ success: true, category, name: cat.name, graphics, count: graphics.length });
    }

    if (search) {
      const searchLower = search.toLowerCase();
      const results: { id: string; name: string; svg: string; category: string; dataUrl: string }[] = [];
      Object.entries(GRAPHICS_CATEGORIES).forEach(([catKey, cat]) => {
        if (cat.name.toLowerCase().includes(searchLower)) {
          cat.graphics.forEach(g => {
            results.push({
              ...g, category: catKey,
              svg: g.svg.replace(/currentColor/g, color),
              dataUrl: `data:image/svg+xml,${encodeURIComponent(g.svg.replace(/currentColor/g, color))}`,
            });
          });
        } else {
          cat.graphics.forEach(g => {
            if (g.name.toLowerCase().includes(searchLower)) {
              results.push({
                ...g, category: catKey,
                svg: g.svg.replace(/currentColor/g, color),
                dataUrl: `data:image/svg+xml,${encodeURIComponent(g.svg.replace(/currentColor/g, color))}`,
              });
            }
          });
        }
      });
      return NextResponse.json({ success: true, search, results, count: results.length });
    }

    const categories = Object.entries(GRAPHICS_CATEGORIES).map(([key, cat]) => ({
      id: key, name: cat.name, count: cat.graphics.length,
    }));
    const totalGraphics = Object.values(GRAPHICS_CATEGORIES).reduce((acc, cat) => acc + cat.graphics.length, 0);
    return NextResponse.json({ success: true, categories, totalGraphics });
  } catch {
    return NextResponse.json({ success: false, error: 'Failed to fetch graphics' }, { status: 500 });
  }
}
