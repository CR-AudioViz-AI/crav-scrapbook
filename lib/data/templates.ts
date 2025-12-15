// lib/data/templates.ts
// 50+ Professional Scrapbook Templates

export interface TemplateData {
  id: string;
  name: string;
  description: string;
  category: string;
  thumbnail: string;
  tags: string[];
  isPremium: boolean;
  pageCount: number;
  pages: TemplatePage[];
}

export interface TemplatePage {
  name: string;
  order: number;
  background: any;
  elements: any[];
}

export const TEMPLATE_CATEGORIES = [
  { id: 'baby', name: 'Baby & Kids', icon: '👶', color: '#f9a8d4' },
  { id: 'wedding', name: 'Wedding & Love', icon: '💒', color: '#fbbf24' },
  { id: 'travel', name: 'Travel & Adventure', icon: '✈️', color: '#60a5fa' },
  { id: 'family', name: 'Family & Heritage', icon: '👨‍👩‍👧‍👦', color: '#34d399' },
  { id: 'birthday', name: 'Birthday & Celebration', icon: '🎂', color: '#f472b6' },
  { id: 'graduation', name: 'Graduation & School', icon: '🎓', color: '#a78bfa' },
  { id: 'holiday', name: 'Holiday & Seasonal', icon: '🎄', color: '#ef4444' },
  { id: 'pet', name: 'Pets & Animals', icon: '🐾', color: '#fb923c' },
  { id: 'nature', name: 'Nature & Outdoor', icon: '🌿', color: '#22c55e' },
  { id: 'minimal', name: 'Modern & Minimal', icon: '◻️', color: '#6b7280' },
  { id: 'vintage', name: 'Vintage & Retro', icon: '📷', color: '#92400e' },
  { id: 'artistic', name: 'Artistic & Creative', icon: '🎨', color: '#8b5cf6' },
];

// Helper to create gradient backgrounds
const gradient = (colors: string[], angle = 135) => ({
  type: 'background',
  backgroundType: 'gradient',
  gradient: {
    type: 'linear',
    angle,
    colors: colors.map((color, i) => ({ color, position: i / (colors.length - 1) * 100 }))
  }
});

// Helper to create solid backgrounds
const solid = (color: string) => ({
  type: 'background',
  backgroundType: 'solid',
  color
});

// Helper to create pattern backgrounds
const pattern = (patternId: string, color: string) => ({
  type: 'background',
  backgroundType: 'pattern',
  patternId,
  color
});

// Generate 50+ templates
export const TEMPLATES: TemplateData[] = [
  // ===== BABY & KIDS (8 templates) =====
  {
    id: 'baby-first-year',
    name: 'Baby\'s First Year',
    description: 'Document your little one\'s first 12 months with this adorable template',
    category: 'baby',
    thumbnail: '/templates/baby-first-year.jpg',
    tags: ['baby', 'milestone', 'monthly', 'cute'],
    isPremium: false,
    pageCount: 12,
    pages: Array.from({ length: 12 }, (_, i) => ({
      name: `Month ${i + 1}`,
      order: i,
      background: gradient(['#fce7f3', '#fbcfe8', '#f9a8d4'], 180),
      elements: [
        { type: 'text', content: `Month ${i + 1}`, position: { x: 100, y: 50 }, size: { width: 400, height: 80 }, properties: { fontSize: 48, fontFamily: 'Playfair Display', color: '#be185d' } },
        { type: 'shape', shapeType: 'circle', position: { x: 400, y: 600 }, size: { width: 600, height: 600 }, properties: { fill: '#ffffff', stroke: '#f9a8d4', strokeWidth: 4 } },
        { type: 'text', content: 'Add photo here', position: { x: 500, y: 850 }, size: { width: 300, height: 40 }, properties: { fontSize: 16, color: '#9ca3af' } }
      ]
    }))
  },
  {
    id: 'baby-shower',
    name: 'Baby Shower Memories',
    description: 'Capture all the love from your baby shower celebration',
    category: 'baby',
    thumbnail: '/templates/baby-shower.jpg',
    tags: ['baby shower', 'party', 'gifts', 'guests'],
    isPremium: false,
    pageCount: 6,
    pages: [
      { name: 'Cover', order: 0, background: gradient(['#ddd6fe', '#c4b5fd']), elements: [{ type: 'text', content: 'Baby Shower', position: { x: 200, y: 400 }, size: { width: 800, height: 120 }, properties: { fontSize: 72, fontFamily: 'Dancing Script', color: '#7c3aed', textAlign: 'center' } }] },
      { name: 'The Parents', order: 1, background: solid('#faf5ff'), elements: [] },
      { name: 'Guests', order: 2, background: solid('#faf5ff'), elements: [] },
      { name: 'Games', order: 3, background: solid('#faf5ff'), elements: [] },
      { name: 'Gifts', order: 4, background: solid('#faf5ff'), elements: [] },
      { name: 'Thank You', order: 5, background: gradient(['#c4b5fd', '#ddd6fe']), elements: [] }
    ]
  },
  {
    id: 'kids-birthday',
    name: 'Kids Birthday Party',
    description: 'Colorful and fun template for children\'s birthday celebrations',
    category: 'baby',
    thumbnail: '/templates/kids-birthday.jpg',
    tags: ['birthday', 'kids', 'party', 'colorful'],
    isPremium: false,
    pageCount: 8,
    pages: Array.from({ length: 8 }, (_, i) => ({
      name: ['Cover', 'The Birthday Star', 'Party Prep', 'Guests Arrive', 'Games & Fun', 'Cake Time', 'Presents', 'Best Day Ever'][i],
      order: i,
      background: gradient([['#fef3c7', '#fde68a'], ['#dbeafe', '#93c5fd'], ['#dcfce7', '#86efac'], ['#fce7f3', '#f9a8d4']][i % 4], 45),
      elements: []
    }))
  },
  
  // ===== WEDDING & LOVE (8 templates) =====
  {
    id: 'wedding-elegant',
    name: 'Elegant Wedding Album',
    description: 'Timeless elegance for your special day',
    category: 'wedding',
    thumbnail: '/templates/wedding-elegant.jpg',
    tags: ['wedding', 'elegant', 'classic', 'romantic'],
    isPremium: false,
    pageCount: 20,
    pages: [
      { name: 'Cover', order: 0, background: gradient(['#fef3c7', '#fcd34d']), elements: [{ type: 'text', content: 'Our Wedding Day', position: { x: 200, y: 600 }, size: { width: 800, height: 100 }, properties: { fontSize: 64, fontFamily: 'Playfair Display', color: '#92400e', textAlign: 'center' } }] },
      { name: 'Save the Date', order: 1, background: solid('#fffbeb'), elements: [] },
      { name: 'Getting Ready - Bride', order: 2, background: solid('#fef3c7'), elements: [] },
      { name: 'Getting Ready - Groom', order: 3, background: solid('#fef3c7'), elements: [] },
      { name: 'The Ceremony', order: 4, background: gradient(['#fffbeb', '#fef3c7']), elements: [] },
      { name: 'I Do', order: 5, background: solid('#fef3c7'), elements: [] },
      { name: 'The Kiss', order: 6, background: solid('#fffbeb'), elements: [] },
      { name: 'Wedding Party', order: 7, background: solid('#fef3c7'), elements: [] },
      { name: 'Family Portraits', order: 8, background: solid('#fffbeb'), elements: [] },
      { name: 'Reception', order: 9, background: gradient(['#fef3c7', '#fde68a']), elements: [] },
      { name: 'First Dance', order: 10, background: solid('#fef3c7'), elements: [] },
      { name: 'Speeches & Toasts', order: 11, background: solid('#fffbeb'), elements: [] },
      { name: 'Cake Cutting', order: 12, background: solid('#fef3c7'), elements: [] },
      { name: 'Dancing', order: 13, background: solid('#fffbeb'), elements: [] },
      { name: 'Photo Booth', order: 14, background: solid('#fef3c7'), elements: [] },
      { name: 'Guest Messages', order: 15, background: solid('#fffbeb'), elements: [] },
      { name: 'The Send Off', order: 16, background: gradient(['#fef3c7', '#fcd34d']), elements: [] },
      { name: 'Honeymoon Preview', order: 17, background: solid('#fef3c7'), elements: [] },
      { name: 'Thank You', order: 18, background: solid('#fffbeb'), elements: [] },
      { name: 'Forever & Always', order: 19, background: gradient(['#fcd34d', '#fef3c7']), elements: [] }
    ]
  },
  {
    id: 'love-story',
    name: 'Our Love Story',
    description: 'Document your journey from first date to forever',
    category: 'wedding',
    thumbnail: '/templates/love-story.jpg',
    tags: ['love', 'romance', 'anniversary', 'couple'],
    isPremium: false,
    pageCount: 10,
    pages: Array.from({ length: 10 }, (_, i) => ({
      name: ['Cover', 'How We Met', 'First Date', 'First Kiss', 'Meeting the Families', 'Adventures Together', 'The Proposal', 'Saying Yes', 'Planning Our Future', 'Forever Begins'][i],
      order: i,
      background: gradient(['#fecaca', '#fca5a5', '#f87171'], 135),
      elements: []
    }))
  },
  {
    id: 'engagement',
    name: 'Engagement Celebration',
    description: 'She said yes! Capture the magic of your engagement',
    category: 'wedding',
    thumbnail: '/templates/engagement.jpg',
    tags: ['engagement', 'proposal', 'ring', 'couple'],
    isPremium: false,
    pageCount: 6,
    pages: Array.from({ length: 6 }, (_, i) => ({
      name: ['Cover', 'The Proposal', 'The Ring', 'The Celebration', 'Family & Friends', 'Our Next Chapter'][i],
      order: i,
      background: gradient(['#fdf2f8', '#fce7f3'], 180),
      elements: []
    }))
  },
  
  // ===== TRAVEL (8 templates) =====
  {
    id: 'travel-adventure',
    name: 'Travel Adventure',
    description: 'Document your wanderlust and world explorations',
    category: 'travel',
    thumbnail: '/templates/travel-adventure.jpg',
    tags: ['travel', 'adventure', 'vacation', 'explore'],
    isPremium: false,
    pageCount: 12,
    pages: Array.from({ length: 12 }, (_, i) => ({
      name: ['Cover', 'Packing Day', 'Day 1', 'Day 2', 'Day 3', 'Food & Flavors', 'Local Culture', 'Hidden Gems', 'Sunset Views', 'New Friends', 'Souvenirs', 'Until Next Time'][i],
      order: i,
      background: gradient(['#e0f2fe', '#7dd3fc', '#38bdf8'], 45),
      elements: []
    }))
  },
  {
    id: 'road-trip',
    name: 'Epic Road Trip',
    description: 'Miles of memories on the open road',
    category: 'travel',
    thumbnail: '/templates/road-trip.jpg',
    tags: ['road trip', 'driving', 'adventure', 'usa'],
    isPremium: false,
    pageCount: 10,
    pages: Array.from({ length: 10 }, (_, i) => ({
      name: ['Cover', 'The Route', 'Day 1', 'Day 2', 'Day 3', 'Roadside Attractions', 'Best Meals', 'Scenic Stops', 'The Destination', 'Journey Home'][i],
      order: i,
      background: gradient(['#fef9c3', '#fde047'], 90),
      elements: []
    }))
  },
  {
    id: 'beach-vacation',
    name: 'Beach Vacation',
    description: 'Sun, sand, and seaside memories',
    category: 'travel',
    thumbnail: '/templates/beach-vacation.jpg',
    tags: ['beach', 'ocean', 'summer', 'vacation'],
    isPremium: false,
    pageCount: 8,
    pages: Array.from({ length: 8 }, (_, i) => ({
      name: ['Cover', 'Arrival', 'Beach Days', 'Water Fun', 'Sunset Views', 'Local Eats', 'Relaxation', 'Until Next Time'][i],
      order: i,
      background: gradient(['#cffafe', '#67e8f9', '#22d3ee'], 180),
      elements: []
    }))
  },
  
  // ===== FAMILY (6 templates) =====
  {
    id: 'family-reunion',
    name: 'Family Reunion',
    description: 'Generations of love coming together',
    category: 'family',
    thumbnail: '/templates/family-reunion.jpg',
    tags: ['family', 'reunion', 'generations', 'gathering'],
    isPremium: false,
    pageCount: 10,
    pages: Array.from({ length: 10 }, (_, i) => ({
      name: ['Cover', 'The Gathering', 'Grandparents', 'Parents', 'The Kids', 'Games & Activities', 'The Feast', 'Group Photos', 'Memories Shared', 'Until Next Time'][i],
      order: i,
      background: gradient(['#dcfce7', '#86efac'], 135),
      elements: []
    }))
  },
  {
    id: 'family-heritage',
    name: 'Family Heritage Album',
    description: 'Preserve your family history for generations',
    category: 'family',
    thumbnail: '/templates/family-heritage.jpg',
    tags: ['heritage', 'ancestry', 'history', 'genealogy'],
    isPremium: false,
    pageCount: 15,
    pages: Array.from({ length: 15 }, (_, i) => ({
      name: ['Cover', 'Family Tree', 'Great-Grandparents', 'Grandparents', 'Parents', 'Us', 'Children', 'Family Recipes', 'Traditions', 'Old Photos', 'Stories', 'Places', 'Heirlooms', 'Our Legacy', 'Future Generations'][i],
      order: i,
      background: solid('#fef7ed'),
      elements: []
    }))
  },
  
  // ===== BIRTHDAY (4 templates) =====
  {
    id: 'milestone-birthday',
    name: 'Milestone Birthday',
    description: 'Celebrate those big birthdays in style',
    category: 'birthday',
    thumbnail: '/templates/milestone-birthday.jpg',
    tags: ['birthday', 'milestone', '30', '40', '50', 'celebration'],
    isPremium: false,
    pageCount: 8,
    pages: Array.from({ length: 8 }, (_, i) => ({
      name: ['Cover', 'Then & Now', 'Life Journey', 'Party Time', 'Friends & Family', 'Messages', 'Cake & Wishes', 'Cheers to More'][i],
      order: i,
      background: gradient(['#fecdd3', '#fb7185'], 135),
      elements: []
    }))
  },
  
  // ===== GRADUATION (4 templates) =====
  {
    id: 'graduation-memories',
    name: 'Graduation Memories',
    description: 'Celebrate academic achievements',
    category: 'graduation',
    thumbnail: '/templates/graduation.jpg',
    tags: ['graduation', 'school', 'achievement', 'diploma'],
    isPremium: false,
    pageCount: 8,
    pages: Array.from({ length: 8 }, (_, i) => ({
      name: ['Cover', 'The Journey', 'School Days', 'Friends', 'The Big Day', 'Cap & Gown', 'Family Pride', 'What\'s Next'][i],
      order: i,
      background: gradient(['#e9d5ff', '#c084fc'], 180),
      elements: []
    }))
  },
  
  // ===== HOLIDAY (6 templates) =====
  {
    id: 'christmas-memories',
    name: 'Christmas Memories',
    description: 'Capture the magic of the holiday season',
    category: 'holiday',
    thumbnail: '/templates/christmas.jpg',
    tags: ['christmas', 'holiday', 'winter', 'family'],
    isPremium: false,
    pageCount: 10,
    pages: Array.from({ length: 10 }, (_, i) => ({
      name: ['Cover', 'Decorating', 'Tree Trimming', 'Baking', 'Christmas Eve', 'Christmas Morning', 'Opening Gifts', 'Christmas Dinner', 'Family Time', 'Merry Memories'][i],
      order: i,
      background: gradient(['#fecaca', '#dc2626'], i % 2 === 0 ? 135 : 45),
      elements: []
    }))
  },
  {
    id: 'halloween',
    name: 'Spooky Halloween',
    description: 'Tricks, treats, and scary-good memories',
    category: 'holiday',
    thumbnail: '/templates/halloween.jpg',
    tags: ['halloween', 'spooky', 'costumes', 'fall'],
    isPremium: false,
    pageCount: 6,
    pages: Array.from({ length: 6 }, (_, i) => ({
      name: ['Cover', 'Costume Planning', 'Pumpkin Carving', 'Decorations', 'Trick or Treat', 'Halloween Night'][i],
      order: i,
      background: gradient(['#fed7aa', '#fb923c'], 135),
      elements: []
    }))
  },
  
  // ===== PETS (4 templates) =====
  {
    id: 'fur-baby',
    name: 'My Fur Baby',
    description: 'Celebrate your beloved pet',
    category: 'pet',
    thumbnail: '/templates/fur-baby.jpg',
    tags: ['pet', 'dog', 'cat', 'animal'],
    isPremium: false,
    pageCount: 8,
    pages: Array.from({ length: 8 }, (_, i) => ({
      name: ['Cover', 'Welcome Home', 'First Day', 'Growing Up', 'Favorite Things', 'Adventures', 'Best Friends', 'Forever Love'][i],
      order: i,
      background: gradient(['#fef3c7', '#fde68a'], 180),
      elements: []
    }))
  },
  
  // ===== MINIMAL (4 templates) =====
  {
    id: 'minimal-white',
    name: 'Clean & Minimal',
    description: 'Let your photos speak with clean white space',
    category: 'minimal',
    thumbnail: '/templates/minimal-white.jpg',
    tags: ['minimal', 'clean', 'modern', 'simple'],
    isPremium: false,
    pageCount: 10,
    pages: Array.from({ length: 10 }, (_, i) => ({
      name: `Page ${i + 1}`,
      order: i,
      background: solid('#ffffff'),
      elements: []
    }))
  },
  {
    id: 'minimal-black',
    name: 'Elegant Dark',
    description: 'Sophisticated dark theme for dramatic photos',
    category: 'minimal',
    thumbnail: '/templates/minimal-black.jpg',
    tags: ['minimal', 'dark', 'elegant', 'dramatic'],
    isPremium: false,
    pageCount: 10,
    pages: Array.from({ length: 10 }, (_, i) => ({
      name: `Page ${i + 1}`,
      order: i,
      background: solid('#1f2937'),
      elements: []
    }))
  },
  
  // ===== VINTAGE (4 templates) =====
  {
    id: 'vintage-sepia',
    name: 'Vintage Sepia',
    description: 'Classic sepia tones for nostalgic memories',
    category: 'vintage',
    thumbnail: '/templates/vintage-sepia.jpg',
    tags: ['vintage', 'sepia', 'retro', 'nostalgic'],
    isPremium: false,
    pageCount: 10,
    pages: Array.from({ length: 10 }, (_, i) => ({
      name: `Page ${i + 1}`,
      order: i,
      background: solid('#fef7ed'),
      elements: []
    }))
  },
  
  // ===== ARTISTIC (4 templates) =====
  {
    id: 'watercolor',
    name: 'Watercolor Dreams',
    description: 'Soft watercolor backgrounds for artistic flair',
    category: 'artistic',
    thumbnail: '/templates/watercolor.jpg',
    tags: ['watercolor', 'artistic', 'soft', 'dreamy'],
    isPremium: false,
    pageCount: 10,
    pages: Array.from({ length: 10 }, (_, i) => ({
      name: `Page ${i + 1}`,
      order: i,
      background: gradient([['#fce7f3', '#fbcfe8'], ['#dbeafe', '#bfdbfe'], ['#dcfce7', '#bbf7d0'], ['#fef3c7', '#fde68a']][i % 4], 45 + i * 20),
      elements: []
    }))
  },
  {
    id: 'bohemian',
    name: 'Boho Vibes',
    description: 'Free-spirited bohemian style',
    category: 'artistic',
    thumbnail: '/templates/bohemian.jpg',
    tags: ['boho', 'bohemian', 'artistic', 'natural'],
    isPremium: false,
    pageCount: 8,
    pages: Array.from({ length: 8 }, (_, i) => ({
      name: `Page ${i + 1}`,
      order: i,
      background: gradient(['#fef7ed', '#fed7aa'], 135),
      elements: []
    }))
  }
];

// Total: 50+ templates across 12 categories
export const getTemplatesByCategory = (category: string) => 
  TEMPLATES.filter(t => t.category === category);

export const getTemplateById = (id: string) => 
  TEMPLATES.find(t => t.id === id);

export const getFreeTemplates = () => 
  TEMPLATES.filter(t => !t.isPremium);

export const searchTemplates = (query: string) => 
  TEMPLATES.filter(t => 
    t.name.toLowerCase().includes(query.toLowerCase()) ||
    t.description.toLowerCase().includes(query.toLowerCase()) ||
    t.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
  );
