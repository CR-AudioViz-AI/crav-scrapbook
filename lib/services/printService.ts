// lib/services/printService.ts
// Integration with print-on-demand services

export interface PrintProduct {
  id: string;
  name: string;
  description: string;
  sizes: PrintSize[];
  basePrice: number;
  currency: string;
  provider: string;
}

export interface PrintSize {
  id: string;
  name: string;
  width: number;
  height: number;
  unit: 'in' | 'cm';
  priceModifier: number;
}

export interface PrintOrder {
  productId: string;
  sizeId: string;
  quantity: number;
  scrapbookId: string;
  pages: number[];
  shippingAddress: ShippingAddress;
  totalPrice: number;
}

export interface ShippingAddress {
  name: string;
  street1: string;
  street2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone?: string;
}

// Print product catalog
export const PRINT_PRODUCTS: PrintProduct[] = [
  {
    id: 'photobook-softcover',
    name: 'Softcover Photo Book',
    description: 'Beautiful softcover book with glossy pages',
    provider: 'generic',
    basePrice: 19.99,
    currency: 'USD',
    sizes: [
      { id: '8x8', name: '8x8 inch', width: 8, height: 8, unit: 'in', priceModifier: 1 },
      { id: '8x10', name: '8x10 inch', width: 8, height: 10, unit: 'in', priceModifier: 1.2 },
      { id: '11x14', name: '11x14 inch', width: 11, height: 14, unit: 'in', priceModifier: 1.5 },
      { id: '12x12', name: '12x12 inch', width: 12, height: 12, unit: 'in', priceModifier: 1.4 },
    ]
  },
  {
    id: 'photobook-hardcover',
    name: 'Hardcover Photo Book',
    description: 'Premium hardcover with lay-flat binding',
    provider: 'generic',
    basePrice: 39.99,
    currency: 'USD',
    sizes: [
      { id: '8x8', name: '8x8 inch', width: 8, height: 8, unit: 'in', priceModifier: 1 },
      { id: '8x10', name: '8x10 inch', width: 8, height: 10, unit: 'in', priceModifier: 1.2 },
      { id: '11x14', name: '11x14 inch', width: 11, height: 14, unit: 'in', priceModifier: 1.5 },
      { id: '12x12', name: '12x12 inch', width: 12, height: 12, unit: 'in', priceModifier: 1.4 },
    ]
  },
  {
    id: 'canvas-print',
    name: 'Canvas Wall Art',
    description: 'Gallery-wrapped canvas print',
    provider: 'generic',
    basePrice: 49.99,
    currency: 'USD',
    sizes: [
      { id: '12x16', name: '12x16 inch', width: 12, height: 16, unit: 'in', priceModifier: 1 },
      { id: '16x20', name: '16x20 inch', width: 16, height: 20, unit: 'in', priceModifier: 1.3 },
      { id: '24x36', name: '24x36 inch', width: 24, height: 36, unit: 'in', priceModifier: 2 },
    ]
  },
  {
    id: 'photo-prints',
    name: 'Photo Prints',
    description: 'Professional quality photo prints',
    provider: 'generic',
    basePrice: 0.29,
    currency: 'USD',
    sizes: [
      { id: '4x6', name: '4x6 inch', width: 4, height: 6, unit: 'in', priceModifier: 1 },
      { id: '5x7', name: '5x7 inch', width: 5, height: 7, unit: 'in', priceModifier: 1.5 },
      { id: '8x10', name: '8x10 inch', width: 8, height: 10, unit: 'in', priceModifier: 3 },
    ]
  },
  {
    id: 'calendar',
    name: 'Photo Calendar',
    description: '12-month wall calendar with your photos',
    provider: 'generic',
    basePrice: 24.99,
    currency: 'USD',
    sizes: [
      { id: '8x11', name: '8.5x11 inch', width: 8.5, height: 11, unit: 'in', priceModifier: 1 },
      { id: '12x12', name: '12x12 inch', width: 12, height: 12, unit: 'in', priceModifier: 1.3 },
    ]
  },
  {
    id: 'cards',
    name: 'Greeting Cards',
    description: 'Folded greeting cards with envelopes',
    provider: 'generic',
    basePrice: 1.99,
    currency: 'USD',
    sizes: [
      { id: '5x7', name: '5x7 inch', width: 5, height: 7, unit: 'in', priceModifier: 1 },
      { id: '4x6', name: '4x6 inch', width: 4, height: 6, unit: 'in', priceModifier: 0.8 },
    ]
  }
];

// Print service providers
export const PRINT_PROVIDERS = [
  {
    id: 'shutterfly',
    name: 'Shutterfly',
    logo: '📷',
    url: 'https://shutterfly.com',
    description: 'Popular photo printing service'
  },
  {
    id: 'snapfish',
    name: 'Snapfish',
    logo: '🐟',
    url: 'https://snapfish.com',
    description: 'Affordable photo prints and books'
  },
  {
    id: 'mixbook',
    name: 'Mixbook',
    logo: '📚',
    url: 'https://mixbook.com',
    description: 'Premium custom photo books'
  },
  {
    id: 'artifact-uprising',
    name: 'Artifact Uprising',
    logo: '✨',
    url: 'https://artifactuprising.com',
    description: 'High-end photo products'
  },
  {
    id: 'nations-photo-lab',
    name: 'Nations Photo Lab',
    logo: '🏛️',
    url: 'https://nationsphotolab.com',
    description: 'Professional quality prints'
  },
  {
    id: 'mpix',
    name: 'Mpix',
    logo: '🖼️',
    url: 'https://mpix.com',
    description: 'Professional photo printing'
  }
];

// Calculate price for order
export function calculateOrderPrice(
  product: PrintProduct,
  sizeId: string,
  quantity: number,
  pageCount: number
): number {
  const size = product.sizes.find(s => s.id === sizeId);
  if (!size) return 0;
  
  let price = product.basePrice * size.priceModifier;
  
  // Add per-page cost for books
  if (product.id.includes('photobook')) {
    const extraPages = Math.max(0, pageCount - 20); // First 20 pages included
    price += extraPages * 0.50;
  }
  
  return price * quantity;
}

// Generate print-ready PDF specs
export function getPrintSpecs(sizeId: string) {
  const specs: Record<string, any> = {
    '4x6': { width: 4, height: 6, dpi: 300, bleed: 0.125 },
    '5x7': { width: 5, height: 7, dpi: 300, bleed: 0.125 },
    '8x8': { width: 8, height: 8, dpi: 300, bleed: 0.125 },
    '8x10': { width: 8, height: 10, dpi: 300, bleed: 0.125 },
    '8x11': { width: 8.5, height: 11, dpi: 300, bleed: 0.125 },
    '11x14': { width: 11, height: 14, dpi: 300, bleed: 0.125 },
    '12x12': { width: 12, height: 12, dpi: 300, bleed: 0.125 },
    '12x16': { width: 12, height: 16, dpi: 300, bleed: 0 },
    '16x20': { width: 16, height: 20, dpi: 300, bleed: 0 },
    '24x36': { width: 24, height: 36, dpi: 300, bleed: 0 },
  };
  
  return specs[sizeId] || { width: 8, height: 10, dpi: 300, bleed: 0.125 };
}

// Format price for display
export function formatPrice(amount: number, currency: string = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency
  }).format(amount);
}
