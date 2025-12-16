// app/api/patterns/route.ts
// FREE Background Patterns - SVG-based
// Includes geometric, organic, texture patterns

import { NextResponse } from 'next/server';

// Pattern definitions (SVG-based, infinitely scalable)
const PATTERNS = {
  geometric: [
    {
      id: 'dots',
      name: 'Polka Dots',
      svg: (color: string, bg: string, size: number) => `
        <svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
          <rect width="100%" height="100%" fill="${bg}"/>
          <circle cx="${size/4}" cy="${size/4}" r="${size/10}" fill="${color}"/>
        </svg>
      `
    },
    {
      id: 'grid',
      name: 'Grid Lines',
      svg: (color: string, bg: string, size: number) => `
        <svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
          <rect width="100%" height="100%" fill="${bg}"/>
          <path d="M ${size} 0 L 0 0 0 ${size}" fill="none" stroke="${color}" stroke-width="1"/>
        </svg>
      `
    },
    {
      id: 'diagonal-lines',
      name: 'Diagonal Lines',
      svg: (color: string, bg: string, size: number) => `
        <svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
          <rect width="100%" height="100%" fill="${bg}"/>
          <path d="M 0 ${size} L ${size} 0" stroke="${color}" stroke-width="1"/>
        </svg>
      `
    },
    {
      id: 'chevrons',
      name: 'Chevrons',
      svg: (color: string, bg: string, size: number) => `
        <svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
          <rect width="100%" height="100%" fill="${bg}"/>
          <path d="M 0 ${size/2} L ${size/2} 0 L ${size} ${size/2}" fill="none" stroke="${color}" stroke-width="2"/>
        </svg>
      `
    },
    {
      id: 'hexagons',
      name: 'Hexagons',
      svg: (color: string, bg: string, size: number) => `
        <svg width="${size}" height="${size * 0.866}" xmlns="http://www.w3.org/2000/svg">
          <rect width="100%" height="100%" fill="${bg}"/>
          <polygon points="${size/2},0 ${size},${size*0.25} ${size},${size*0.75} ${size/2},${size} 0,${size*0.75} 0,${size*0.25}" fill="none" stroke="${color}" stroke-width="1"/>
        </svg>
      `
    },
    {
      id: 'triangles',
      name: 'Triangles',
      svg: (color: string, bg: string, size: number) => `
        <svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
          <rect width="100%" height="100%" fill="${bg}"/>
          <polygon points="${size/2},0 ${size},${size} 0,${size}" fill="none" stroke="${color}" stroke-width="1"/>
        </svg>
      `
    },
    {
      id: 'diamonds',
      name: 'Diamonds',
      svg: (color: string, bg: string, size: number) => `
        <svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
          <rect width="100%" height="100%" fill="${bg}"/>
          <polygon points="${size/2},0 ${size},${size/2} ${size/2},${size} 0,${size/2}" fill="none" stroke="${color}" stroke-width="1"/>
        </svg>
      `
    },
    {
      id: 'circles',
      name: 'Concentric Circles',
      svg: (color: string, bg: string, size: number) => `
        <svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
          <rect width="100%" height="100%" fill="${bg}"/>
          <circle cx="${size/2}" cy="${size/2}" r="${size/3}" fill="none" stroke="${color}" stroke-width="1"/>
          <circle cx="${size/2}" cy="${size/2}" r="${size/6}" fill="none" stroke="${color}" stroke-width="1"/>
        </svg>
      `
    },
    {
      id: 'zigzag',
      name: 'Zigzag',
      svg: (color: string, bg: string, size: number) => `
        <svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
          <rect width="100%" height="100%" fill="${bg}"/>
          <polyline points="0,${size/2} ${size/4},0 ${size/2},${size/2} ${size*3/4},0 ${size},${size/2}" fill="none" stroke="${color}" stroke-width="2"/>
        </svg>
      `
    },
    {
      id: 'waves',
      name: 'Waves',
      svg: (color: string, bg: string, size: number) => `
        <svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
          <rect width="100%" height="100%" fill="${bg}"/>
          <path d="M 0 ${size/2} Q ${size/4} 0, ${size/2} ${size/2} T ${size} ${size/2}" fill="none" stroke="${color}" stroke-width="2"/>
        </svg>
      `
    }
  ],
  organic: [
    {
      id: 'leaves',
      name: 'Leaves',
      svg: (color: string, bg: string, size: number) => `
        <svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
          <rect width="100%" height="100%" fill="${bg}"/>
          <path d="M ${size/2} 0 Q ${size} ${size/2} ${size/2} ${size} Q 0 ${size/2} ${size/2} 0" fill="${color}" opacity="0.3"/>
        </svg>
      `
    },
    {
      id: 'bubbles',
      name: 'Bubbles',
      svg: (color: string, bg: string, size: number) => `
        <svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
          <rect width="100%" height="100%" fill="${bg}"/>
          <circle cx="${size*0.2}" cy="${size*0.3}" r="${size/10}" fill="${color}" opacity="0.2"/>
          <circle cx="${size*0.7}" cy="${size*0.6}" r="${size/8}" fill="${color}" opacity="0.15"/>
          <circle cx="${size*0.4}" cy="${size*0.8}" r="${size/12}" fill="${color}" opacity="0.25"/>
        </svg>
      `
    },
    {
      id: 'confetti',
      name: 'Confetti',
      svg: (color: string, bg: string, size: number) => `
        <svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
          <rect width="100%" height="100%" fill="${bg}"/>
          <rect x="${size*0.1}" y="${size*0.2}" width="${size/15}" height="${size/8}" fill="${color}" opacity="0.5" transform="rotate(30 ${size*0.1} ${size*0.2})"/>
          <rect x="${size*0.6}" y="${size*0.4}" width="${size/15}" height="${size/8}" fill="${color}" opacity="0.4" transform="rotate(-20 ${size*0.6} ${size*0.4})"/>
          <rect x="${size*0.3}" y="${size*0.7}" width="${size/15}" height="${size/8}" fill="${color}" opacity="0.6" transform="rotate(45 ${size*0.3} ${size*0.7})"/>
        </svg>
      `
    }
  ],
  texture: [
    {
      id: 'noise',
      name: 'Noise Texture',
      svg: (color: string, bg: string, size: number) => `
        <svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
          <filter id="noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch"/>
          </filter>
          <rect width="100%" height="100%" fill="${bg}"/>
          <rect width="100%" height="100%" filter="url(#noise)" opacity="0.1"/>
        </svg>
      `
    },
    {
      id: 'paper',
      name: 'Paper Texture',
      svg: (color: string, bg: string, size: number) => `
        <svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
          <filter id="paper">
            <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="5"/>
            <feDiffuseLighting lighting-color="${bg}" surfaceScale="2">
              <feDistantLight azimuth="45" elevation="60"/>
            </feDiffuseLighting>
          </filter>
          <rect width="100%" height="100%" filter="url(#paper)"/>
        </svg>
      `
    }
  ]
};

const CATEGORIES = ['geometric', 'organic', 'texture'];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category') || 'all';
  const patternId = searchParams.get('id');
  const color = searchParams.get('color') || '6366f1'; // Default indigo
  const bgColor = searchParams.get('bgcolor') || 'ffffff';
  const size = parseInt(searchParams.get('size') || '40');

  // Return specific pattern as SVG
  if (patternId) {
    for (const cat of Object.values(PATTERNS)) {
      const pattern = cat.find(p => p.id === patternId);
      if (pattern) {
        const svg = pattern.svg(`#${color}`, `#${bgColor}`, size);
        const base64 = Buffer.from(svg.trim()).toString('base64');
        return NextResponse.json({
          pattern: {
            id: pattern.id,
            name: pattern.name,
            svg: svg.trim(),
            dataUrl: `data:image/svg+xml;base64,${base64}`,
            cssBackground: `url("data:image/svg+xml;base64,${base64}")`,
            color: `#${color}`,
            backgroundColor: `#${bgColor}`,
            size
          }
        });
      }
    }
    return NextResponse.json({ error: 'Pattern not found' }, { status: 404 });
  }

  // Return pattern catalog
  const catalog: any = {};
  
  if (category === 'all') {
    for (const [cat, patterns] of Object.entries(PATTERNS)) {
      catalog[cat] = patterns.map(p => ({
        id: p.id,
        name: p.name,
        preview: `/api/patterns?id=${p.id}&color=${color}&bgcolor=${bgColor}&size=${size}`
      }));
    }
  } else if (PATTERNS[category as keyof typeof PATTERNS]) {
    catalog[category] = PATTERNS[category as keyof typeof PATTERNS].map(p => ({
      id: p.id,
      name: p.name,
      preview: `/api/patterns?id=${p.id}&color=${color}&bgcolor=${bgColor}&size=${size}`
    }));
  }

  return NextResponse.json({
    patterns: catalog,
    categories: CATEGORIES,
    total: Object.values(PATTERNS).flat().length,
    usage: {
      example: '/api/patterns?id=dots&color=6366f1&bgcolor=ffffff&size=40',
      tip: 'Use cssBackground directly in CSS background-image property'
    }
  });
}
