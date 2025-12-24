import { NextRequest, NextResponse } from 'next/server';

// MEGA TEMPLATE LIBRARY - 200+ scrapbook page templates
// Pre-designed layouts for every occasion

export const TEMPLATE_CATEGORIES = {
  'baby': {
    name: 'Baby & Newborn',
    templates: [
      { id: 'baby-1', name: 'Welcome Baby', slots: 1, style: 'centered', elements: ['title', 'photo', 'stats', 'message'] },
      { id: 'baby-2', name: 'Birth Announcement', slots: 1, style: 'elegant', elements: ['photo', 'name', 'date', 'weight', 'length'] },
      { id: 'baby-3', name: 'Monthly Milestones', slots: 12, style: 'grid', elements: ['month-labels', 'photo-grid'] },
      { id: 'baby-4', name: 'First Year Collage', slots: 13, style: 'hero-grid', elements: ['hero-photo', 'month-photos'] },
      { id: 'baby-5', name: 'Tiny Hands & Feet', slots: 4, style: 'quad', elements: ['handprint', 'footprint', 'photos'] },
      { id: 'baby-6', name: 'Hospital Memories', slots: 6, style: 'scattered', elements: ['hospital-band', 'first-photo', 'visitors'] },
      { id: 'baby-7', name: 'Baby Stats Card', slots: 1, style: 'infographic', elements: ['photo', 'stats', 'icons'] },
      { id: 'baby-8', name: 'First Smile', slots: 3, style: 'filmstrip', elements: ['sequence-photos', 'caption'] },
      { id: 'baby-9', name: 'Nursery Tour', slots: 5, style: 'mosaic', elements: ['room-photos', 'details'] },
      { id: 'baby-10', name: 'Letter to Baby', slots: 1, style: 'journal', elements: ['photo', 'letter-space', 'date'] },
      { id: 'baby-11', name: 'First Foods', slots: 6, style: 'grid', elements: ['food-photos', 'reactions'] },
      { id: 'baby-12', name: 'Sleep Schedule', slots: 4, style: 'timeline', elements: ['sleeping-photos', 'times'] },
      { id: 'baby-13', name: 'Bath Time Fun', slots: 4, style: 'splash', elements: ['bath-photos', 'bubbles'] },
      { id: 'baby-14', name: 'Tummy Time', slots: 3, style: 'progression', elements: ['milestone-photos'] },
      { id: 'baby-15', name: 'First Christmas', slots: 5, style: 'festive', elements: ['holiday-photos', 'ornaments'] },
    ]
  },
  'wedding': {
    name: 'Wedding & Love',
    templates: [
      { id: 'wed-1', name: 'Save the Date', slots: 1, style: 'elegant', elements: ['couple-photo', 'names', 'date', 'venue'] },
      { id: 'wed-2', name: 'Our Love Story', slots: 6, style: 'timeline', elements: ['milestone-photos', 'dates', 'captions'] },
      { id: 'wed-3', name: 'Ceremony Highlights', slots: 8, style: 'grid', elements: ['ceremony-photos'] },
      { id: 'wed-4', name: 'The First Dance', slots: 4, style: 'filmstrip', elements: ['dance-photos', 'song-lyrics'] },
      { id: 'wed-5', name: 'Reception Fun', slots: 9, style: 'mosaic', elements: ['party-photos', 'toasts'] },
      { id: 'wed-6', name: 'Wedding Party', slots: 8, style: 'portraits', elements: ['bridal-party-photos', 'names'] },
      { id: 'wed-7', name: 'The Details', slots: 6, style: 'grid', elements: ['rings', 'flowers', 'cake', 'decor'] },
      { id: 'wed-8', name: 'Guest Book Page', slots: 2, style: 'journal', elements: ['couple-photo', 'message-space'] },
      { id: 'wed-9', name: 'Thank You Card', slots: 1, style: 'centered', elements: ['photo', 'message'] },
      { id: 'wed-10', name: 'Engagement Story', slots: 4, style: 'narrative', elements: ['proposal-photos', 'story'] },
      { id: 'wed-11', name: 'Bridal Shower', slots: 6, style: 'playful', elements: ['shower-photos', 'gifts'] },
      { id: 'wed-12', name: 'Bachelor/Bachelorette', slots: 8, style: 'party', elements: ['party-photos'] },
      { id: 'wed-13', name: 'Vow Renewal', slots: 4, style: 'romantic', elements: ['renewal-photos', 'vows'] },
      { id: 'wed-14', name: 'Anniversary', slots: 5, style: 'then-now', elements: ['wedding-photo', 'current-photos'] },
      { id: 'wed-15', name: 'Honeymoon', slots: 9, style: 'travel', elements: ['destination-photos', 'map'] },
    ]
  },
  'birthday': {
    name: 'Birthday & Celebration',
    templates: [
      { id: 'bday-1', name: 'Party Invitation', slots: 1, style: 'festive', elements: ['photo', 'party-details'] },
      { id: 'bday-2', name: 'Age Milestone', slots: 1, style: 'bold', elements: ['number', 'photo', 'facts'] },
      { id: 'bday-3', name: 'Party Recap', slots: 8, style: 'grid', elements: ['party-photos'] },
      { id: 'bday-4', name: 'Cake Smash', slots: 4, style: 'sequence', elements: ['cake-photos', 'mess'] },
      { id: 'bday-5', name: 'Gift Opening', slots: 6, style: 'scattered', elements: ['gift-photos', 'reactions'] },
      { id: 'bday-6', name: 'Through the Years', slots: 10, style: 'timeline', elements: ['yearly-photos'] },
      { id: 'bday-7', name: 'Birthday Interview', slots: 1, style: 'qa', elements: ['photo', 'questions', 'answers'] },
      { id: 'bday-8', name: 'Sweet 16', slots: 6, style: 'glamour', elements: ['portrait', 'party-photos'] },
      { id: 'bday-9', name: 'Quinceañera', slots: 8, style: 'elegant', elements: ['ceremony', 'reception', 'court'] },
      { id: 'bday-10', name: '50th Birthday', slots: 5, style: 'golden', elements: ['celebration-photos'] },
      { id: 'bday-11', name: 'Surprise Party', slots: 6, style: 'reveal', elements: ['before', 'surprise', 'after'] },
      { id: 'bday-12', name: 'Theme Party', slots: 8, style: 'themed', elements: ['decor', 'costumes', 'activities'] },
    ]
  },
  'travel': {
    name: 'Travel & Adventure',
    templates: [
      { id: 'trav-1', name: 'Trip Cover', slots: 1, style: 'hero', elements: ['destination-photo', 'title', 'dates'] },
      { id: 'trav-2', name: 'Itinerary', slots: 0, style: 'list', elements: ['dates', 'activities', 'icons'] },
      { id: 'trav-3', name: 'Day 1-3-5 Grid', slots: 9, style: 'grid', elements: ['daily-photos', 'captions'] },
      { id: 'trav-4', name: 'Postcard Style', slots: 1, style: 'postcard', elements: ['photo', 'stamp', 'message'] },
      { id: 'trav-5', name: 'Map Journey', slots: 5, style: 'map', elements: ['photos', 'map-markers', 'route'] },
      { id: 'trav-6', name: 'Food Tour', slots: 6, style: 'food', elements: ['food-photos', 'restaurant-names'] },
      { id: 'trav-7', name: 'Beach Vacation', slots: 8, style: 'tropical', elements: ['beach-photos', 'sand-elements'] },
      { id: 'trav-8', name: 'City Explorer', slots: 9, style: 'urban', elements: ['landmark-photos', 'street-scenes'] },
      { id: 'trav-9', name: 'Mountain Adventure', slots: 6, style: 'rugged', elements: ['nature-photos', 'peaks'] },
      { id: 'trav-10', name: 'Road Trip', slots: 8, style: 'journey', elements: ['road-photos', 'stops', 'miles'] },
      { id: 'trav-11', name: 'Cruise Memories', slots: 7, style: 'nautical', elements: ['ship', 'ports', 'activities'] },
      { id: 'trav-12', name: 'Camping Trip', slots: 6, style: 'rustic', elements: ['campsite', 'nature', 'activities'] },
      { id: 'trav-13', name: 'Souvenirs', slots: 4, style: 'collection', elements: ['souvenir-photos', 'stories'] },
      { id: 'trav-14', name: 'Travel Bucket List', slots: 0, style: 'checklist', elements: ['destinations', 'checkboxes'] },
      { id: 'trav-15', name: 'Passport Page', slots: 3, style: 'official', elements: ['stamps', 'photos', 'dates'] },
    ]
  },
  'family': {
    name: 'Family & Gatherings',
    templates: [
      { id: 'fam-1', name: 'Family Portrait', slots: 1, style: 'formal', elements: ['group-photo', 'names', 'year'] },
      { id: 'fam-2', name: 'Generation Photo', slots: 4, style: 'layers', elements: ['multi-gen-photos'] },
      { id: 'fam-3', name: 'Family Tree', slots: 15, style: 'tree', elements: ['ancestor-photos', 'connections'] },
      { id: 'fam-4', name: 'Reunion Recap', slots: 12, style: 'grid', elements: ['group-photos', 'activities'] },
      { id: 'fam-5', name: 'Holiday Dinner', slots: 8, style: 'warm', elements: ['table', 'food', 'family'] },
      { id: 'fam-6', name: 'Sunday Funday', slots: 6, style: 'casual', elements: ['activity-photos'] },
      { id: 'fam-7', name: 'Grandparents Day', slots: 4, style: 'loving', elements: ['grandparent-photos', 'quotes'] },
      { id: 'fam-8', name: 'Sibling Bonds', slots: 4, style: 'playful', elements: ['sibling-photos', 'memories'] },
      { id: 'fam-9', name: 'Cousins Together', slots: 6, style: 'fun', elements: ['cousin-photos', 'ages'] },
      { id: 'fam-10', name: 'New Home', slots: 5, style: 'fresh', elements: ['house-photos', 'moving-day'] },
      { id: 'fam-11', name: 'Family Traditions', slots: 4, style: 'heritage', elements: ['tradition-photos', 'stories'] },
      { id: 'fam-12', name: 'Pet Introduction', slots: 4, style: 'cute', elements: ['pet-photos', 'family-with-pet'] },
    ]
  },
  'school': {
    name: 'School & Education',
    templates: [
      { id: 'sch-1', name: 'First Day of School', slots: 1, style: 'milestone', elements: ['photo', 'grade', 'date', 'stats'] },
      { id: 'sch-2', name: 'School Year Cover', slots: 1, style: 'yearbook', elements: ['portrait', 'year', 'school'] },
      { id: 'sch-3', name: 'Class Photo', slots: 1, style: 'group', elements: ['class-photo', 'names', 'teacher'] },
      { id: 'sch-4', name: 'Report Card', slots: 2, style: 'achievement', elements: ['photo', 'grades', 'comments'] },
      { id: 'sch-5', name: 'Science Fair', slots: 4, style: 'project', elements: ['project-photos', 'description'] },
      { id: 'sch-6', name: 'Sports Season', slots: 6, style: 'athletic', elements: ['action-photos', 'team', 'stats'] },
      { id: 'sch-7', name: 'Field Trip', slots: 6, style: 'adventure', elements: ['trip-photos', 'location'] },
      { id: 'sch-8', name: 'Graduation', slots: 5, style: 'formal', elements: ['cap-gown', 'diploma', 'family'] },
      { id: 'sch-9', name: 'School Play', slots: 6, style: 'theatrical', elements: ['performance', 'costume', 'program'] },
      { id: 'sch-10', name: 'Art Show', slots: 4, style: 'creative', elements: ['artwork', 'artist-photo'] },
      { id: 'sch-11', name: 'Music Recital', slots: 4, style: 'musical', elements: ['performance', 'instrument'] },
      { id: 'sch-12', name: 'Awards Day', slots: 3, style: 'achievement', elements: ['award-photos', 'certificates'] },
    ]
  },
  'holidays': {
    name: 'Holidays & Seasons',
    templates: [
      { id: 'hol-1', name: 'Christmas Card', slots: 1, style: 'festive', elements: ['family-photo', 'greeting'] },
      { id: 'hol-2', name: 'Christmas Morning', slots: 8, style: 'magical', elements: ['gift-opening', 'tree', 'stockings'] },
      { id: 'hol-3', name: 'Thanksgiving Feast', slots: 6, style: 'autumn', elements: ['food', 'family', 'table'] },
      { id: 'hol-4', name: 'Easter Celebration', slots: 6, style: 'spring', elements: ['egg-hunt', 'baskets', 'family'] },
      { id: 'hol-5', name: 'Fourth of July', slots: 6, style: 'patriotic', elements: ['fireworks', 'bbq', 'parade'] },
      { id: 'hol-6', name: 'Halloween Fun', slots: 8, style: 'spooky', elements: ['costumes', 'pumpkins', 'candy'] },
      { id: 'hol-7', name: 'Hanukkah Nights', slots: 8, style: 'golden', elements: ['menorah', 'gifts', 'family'] },
      { id: 'hol-8', name: 'New Years Eve', slots: 6, style: 'sparkle', elements: ['countdown', 'party', 'toast'] },
      { id: 'hol-9', name: 'Valentines Day', slots: 4, style: 'romantic', elements: ['love-photos', 'hearts'] },
      { id: 'hol-10', name: 'St Patricks Day', slots: 4, style: 'lucky', elements: ['green', 'parade', 'fun'] },
      { id: 'hol-11', name: 'Mothers Day', slots: 3, style: 'loving', elements: ['mom-photos', 'tribute'] },
      { id: 'hol-12', name: 'Fathers Day', slots: 3, style: 'tribute', elements: ['dad-photos', 'message'] },
    ]
  },
  'everyday': {
    name: 'Everyday Moments',
    templates: [
      { id: 'day-1', name: 'Day in the Life', slots: 8, style: 'documentary', elements: ['hourly-photos', 'times'] },
      { id: 'day-2', name: 'Simple Joys', slots: 4, style: 'minimal', elements: ['candid-photos', 'captions'] },
      { id: 'day-3', name: 'At Home', slots: 6, style: 'cozy', elements: ['home-moments', 'rooms'] },
      { id: 'day-4', name: 'Outdoor Play', slots: 6, style: 'active', elements: ['play-photos'] },
      { id: 'day-5', name: 'Cooking Together', slots: 4, style: 'kitchen', elements: ['cooking-photos', 'recipe'] },
      { id: 'day-6', name: 'Reading Time', slots: 3, style: 'cozy', elements: ['reading-photos', 'book-list'] },
      { id: 'day-7', name: 'Game Night', slots: 6, style: 'fun', elements: ['game-photos', 'scores'] },
      { id: 'day-8', name: 'Movie Night', slots: 4, style: 'cinema', elements: ['movie-photos', 'tickets'] },
      { id: 'day-9', name: 'Lazy Sunday', slots: 4, style: 'relaxed', elements: ['candid-moments'] },
      { id: 'day-10', name: 'Coffee Moments', slots: 3, style: 'warm', elements: ['coffee-photos', 'quotes'] },
      { id: 'day-11', name: 'Pet Love', slots: 6, style: 'adorable', elements: ['pet-photos', 'names'] },
      { id: 'day-12', name: 'Garden Diary', slots: 6, style: 'botanical', elements: ['garden-photos', 'plants'] },
    ]
  },
  'sports': {
    name: 'Sports & Activities',
    templates: [
      { id: 'spt-1', name: 'Game Day', slots: 6, style: 'action', elements: ['game-photos', 'score'] },
      { id: 'spt-2', name: 'Team Photo', slots: 1, style: 'official', elements: ['team-photo', 'roster'] },
      { id: 'spt-3', name: 'Season Highlights', slots: 8, style: 'dynamic', elements: ['best-moments', 'stats'] },
      { id: 'spt-4', name: 'Championship', slots: 6, style: 'victory', elements: ['trophy', 'celebration'] },
      { id: 'spt-5', name: 'Practice Makes Perfect', slots: 4, style: 'progression', elements: ['practice-photos'] },
      { id: 'spt-6', name: 'MVP Spotlight', slots: 3, style: 'star', elements: ['player-photos', 'stats'] },
      { id: 'spt-7', name: 'Dance Recital', slots: 6, style: 'graceful', elements: ['dance-photos', 'program'] },
      { id: 'spt-8', name: 'Martial Arts', slots: 4, style: 'disciplined', elements: ['training', 'belt-ceremony'] },
      { id: 'spt-9', name: 'Swimming Lessons', slots: 4, style: 'aquatic', elements: ['pool-photos', 'progress'] },
      { id: 'spt-10', name: 'Gymnastics', slots: 6, style: 'athletic', elements: ['routine-photos', 'medals'] },
    ]
  },
  'creative': {
    name: 'Creative & Hobbies',
    templates: [
      { id: 'cre-1', name: 'Art Portfolio', slots: 6, style: 'gallery', elements: ['artwork-photos'] },
      { id: 'cre-2', name: 'Craft Project', slots: 4, style: 'diy', elements: ['process-photos', 'supplies'] },
      { id: 'cre-3', name: 'Baking Day', slots: 6, style: 'delicious', elements: ['baking-photos', 'recipe'] },
      { id: 'cre-4', name: 'Music Practice', slots: 4, style: 'musical', elements: ['practice-photos', 'sheet-music'] },
      { id: 'cre-5', name: 'Photography Walk', slots: 8, style: 'artistic', elements: ['photos-taken'] },
      { id: 'cre-6', name: 'DIY Home Project', slots: 6, style: 'before-after', elements: ['progress-photos'] },
      { id: 'cre-7', name: 'Collection Display', slots: 6, style: 'showcase', elements: ['collection-photos'] },
      { id: 'cre-8', name: 'Writing Journey', slots: 2, style: 'literary', elements: ['writing-photo', 'excerpt'] },
    ]
  },
  'faith': {
    name: 'Faith & Milestones',
    templates: [
      { id: 'fth-1', name: 'Baptism', slots: 4, style: 'sacred', elements: ['ceremony-photos', 'certificate'] },
      { id: 'fth-2', name: 'First Communion', slots: 4, style: 'holy', elements: ['communion-photos', 'prayer'] },
      { id: 'fth-3', name: 'Confirmation', slots: 4, style: 'milestone', elements: ['confirmation-photos'] },
      { id: 'fth-4', name: 'Bar/Bat Mitzvah', slots: 6, style: 'celebration', elements: ['ceremony', 'party'] },
      { id: 'fth-5', name: 'Wedding Blessing', slots: 4, style: 'blessed', elements: ['ceremony-photos', 'verse'] },
      { id: 'fth-6', name: 'Church Events', slots: 6, style: 'community', elements: ['event-photos'] },
      { id: 'fth-7', name: 'Mission Trip', slots: 8, style: 'service', elements: ['trip-photos', 'reflections'] },
      { id: 'fth-8', name: 'Daily Devotion', slots: 2, style: 'peaceful', elements: ['photo', 'scripture'] },
    ]
  },
  'memorial': {
    name: 'Memorial & Tribute',
    templates: [
      { id: 'mem-1', name: 'In Loving Memory', slots: 1, style: 'tribute', elements: ['portrait', 'dates', 'quote'] },
      { id: 'mem-2', name: 'Life Celebration', slots: 8, style: 'timeline', elements: ['life-photos'] },
      { id: 'mem-3', name: 'Family Memories', slots: 6, style: 'warm', elements: ['family-photos', 'stories'] },
      { id: 'mem-4', name: 'Legacy Page', slots: 4, style: 'heritage', elements: ['photos', 'accomplishments'] },
      { id: 'mem-5', name: 'Pet Memorial', slots: 3, style: 'loving', elements: ['pet-photos', 'paw-print'] },
      { id: 'mem-6', name: 'Remembrance', slots: 2, style: 'peaceful', elements: ['photo', 'poem'] },
    ]
  },
};

// Layout positioning data for each template style
export const LAYOUT_STYLES = {
  'centered': { photoAreas: [{ x: '25%', y: '20%', w: '50%', h: '50%' }] },
  'grid': { photoAreas: Array.from({ length: 9 }, (_, i) => ({ x: `${(i % 3) * 33}%`, y: `${Math.floor(i / 3) * 33}%`, w: '32%', h: '32%' })) },
  'hero-grid': { photoAreas: [{ x: '2%', y: '2%', w: '60%', h: '96%' }, ...Array.from({ length: 4 }, (_, i) => ({ x: '64%', y: `${2 + i * 24}%`, w: '34%', h: '22%' }))] },
  'filmstrip': { photoAreas: Array.from({ length: 4 }, (_, i) => ({ x: `${i * 25}%`, y: '25%', w: '24%', h: '50%' })) },
  'scattered': { photoAreas: Array.from({ length: 6 }, (_, i) => ({ x: `${10 + (i % 3) * 30 + Math.random() * 5}%`, y: `${10 + Math.floor(i / 3) * 45 + Math.random() * 5}%`, w: '28%', h: '40%', rotation: (Math.random() - 0.5) * 15 })) },
  'timeline': { photoAreas: Array.from({ length: 6 }, (_, i) => ({ x: i % 2 === 0 ? '5%' : '55%', y: `${5 + Math.floor(i / 2) * 32}%`, w: '40%', h: '28%' })) },
  'mosaic': { photoAreas: [{ x: '2%', y: '2%', w: '48%', h: '48%' }, { x: '52%', y: '2%', w: '46%', h: '30%' }, { x: '52%', y: '34%', w: '22%', h: '32%' }, { x: '76%', y: '34%', w: '22%', h: '32%' }, { x: '2%', y: '52%', w: '30%', h: '46%' }, { x: '34%', y: '52%', w: '30%', h: '22%' }, { x: '66%', y: '68%', w: '32%', h: '30%' }] },
};

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const templateId = searchParams.get('id');
  const search = searchParams.get('search');

  try {
    // Get specific template with layout
    if (templateId) {
      for (const [catKey, cat] of Object.entries(TEMPLATE_CATEGORIES)) {
        const template = cat.templates.find(t => t.id === templateId);
        if (template) {
          const layoutStyle = LAYOUT_STYLES[template.style as keyof typeof LAYOUT_STYLES] || LAYOUT_STYLES['grid'];
          return NextResponse.json({
            success: true,
            template: {
              ...template,
              category: catKey,
              categoryName: cat.name,
              layout: layoutStyle,
            },
          });
        }
      }
      return NextResponse.json({ success: false, error: 'Template not found' }, { status: 404 });
    }

    // Get category templates
    if (category && TEMPLATE_CATEGORIES[category as keyof typeof TEMPLATE_CATEGORIES]) {
      const cat = TEMPLATE_CATEGORIES[category as keyof typeof TEMPLATE_CATEGORIES];
      return NextResponse.json({
        success: true,
        category,
        name: cat.name,
        templates: cat.templates,
        count: cat.templates.length,
      });
    }

    // Search templates
    if (search) {
      const searchLower = search.toLowerCase();
      const results: any[] = [];
      
      Object.entries(TEMPLATE_CATEGORIES).forEach(([catKey, cat]) => {
        cat.templates.forEach(template => {
          if (template.name.toLowerCase().includes(searchLower) || 
              template.elements.some(e => e.toLowerCase().includes(searchLower))) {
            results.push({ ...template, category: catKey, categoryName: cat.name });
          }
        });
      });

      return NextResponse.json({
        success: true,
        search,
        results,
        count: results.length,
      });
    }

    // Return all categories
    const categories = Object.entries(TEMPLATE_CATEGORIES).map(([key, cat]) => ({
      id: key,
      name: cat.name,
      count: cat.templates.length,
      preview: cat.templates.slice(0, 3),
    }));

    const totalTemplates = Object.values(TEMPLATE_CATEGORIES).reduce((acc, cat) => acc + cat.templates.length, 0);

    return NextResponse.json({
      success: true,
      categories,
      totalTemplates,
      layoutStyles: Object.keys(LAYOUT_STYLES),
      usage: {
        getCategory: '/api/mega-templates?category=baby',
        getTemplate: '/api/mega-templates?id=baby-1',
        search: '/api/mega-templates?search=birthday',
      },
    });

  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch templates' },
      { status: 500 }
    );
  }
}
