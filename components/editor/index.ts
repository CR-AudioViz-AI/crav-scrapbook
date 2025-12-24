// components/editor/index.ts
// Export all editor components for easy importing
// Timestamp: Tuesday, December 24, 2025 – 2:45 PM Eastern Time
// CR AudioViz AI - "Your Story. Our Design"
// COMPREHENSIVE COMPONENT LIBRARY - 50+ Components

// ============================================
// CORE EDITOR COMPONENTS
// ============================================
export { default as EditorCanvas } from './EditorCanvas';
export { default as EditorToolbar } from './EditorToolbar';
export { default as PropertiesPanel } from './PropertiesPanel';
export { default as PagesPanel } from './PagesPanel';
export { default as AssetsPanel } from './AssetsPanel';

// Components with named exports
export * from './EnhancedPagesPanel';
export * from './StockPhotoBrowser';
export * from './GiphyBrowser';
export * from './TemplateGallery';
export * from './AIEnhancePanel';
export * from './CollaborationPanel';
export * from './ExportModal';

// ============================================
// CREATIVE ASSET BROWSERS (Original)
// ============================================
export { default as ShapesBrowser } from './ShapesBrowser';
export { default as StickersBrowser } from './StickersBrowser';
export { default as FiltersBrowser } from './FiltersBrowser';
export { default as FramesBrowser } from './FramesBrowser';
export { default as IconsBrowser } from './IconsBrowser';
export { default as GradientsBrowser } from './GradientsBrowser';

// ============================================
// GENERATORS & PICKERS (Original)
// ============================================
export { default as QRCodeGenerator } from './QRCodeGenerator';
export { default as AvatarCreator } from './AvatarCreator';
export { default as CollageBuilder } from './CollageBuilder';
export { default as BackgroundPicker } from './BackgroundPicker';
export { default as PatternPicker } from './PatternPicker';
export { default as ColorPalettePicker } from './ColorPalettePicker';
export { default as TextEffectsPanel } from './TextEffectsPanel';
export { default as PremiumStore } from './PremiumStore';

// ============================================
// SCRAPBOOK-SPECIFIC BROWSERS (Original)
// ============================================
export { default as WashiTapeBrowser } from './WashiTapeBrowser';
export { default as OverlaysBrowser } from './OverlaysBrowser';
export { default as PaperTexturesBrowser } from './PaperTexturesBrowser';
export { default as EmbellishmentsBrowser } from './EmbellishmentsBrowser';

// ============================================
// AI-POWERED FEATURES (Original)
// ============================================
export { default as AILayoutGenerator } from './AILayoutGenerator';
export { default as SmartJournaling } from './SmartJournaling';
export { default as MegaAssetBrowser } from './MegaAssetBrowser';

// ============================================
// NEW COMPONENTS - December 24, 2025
// ============================================

// Background Removal (Remove.bg API)
export { default as BackgroundRemover } from './BackgroundRemover';

// Scrapbook Assets
export { default as DieCutsBrowser } from './DieCutsBrowser';
export { default as AlphabetsBrowser } from './AlphabetsBrowser';
export { default as JournalingCardsBrowser } from './JournalingCardsBrowser';

// Stock Media APIs
export { default as UnsplashBrowser } from './UnsplashBrowser';
export { default as PexelsBrowser } from './PexelsBrowser';
export { default as PixabayBrowser } from './PixabayBrowser';

// Animated Content (GIPHY)
export { default as GiphyStickerBrowser } from './GiphyStickerBrowser';

// Theme & Seasonal
export { default as SeasonalThemesBrowser } from './SeasonalThemesBrowser';

// Print & Export
export { default as PrintExportModal } from './PrintExportModal';

// ============================================
// COMPONENT COUNT SUMMARY
// ============================================
// Core Editor: 5
// Asset Browsers: 6
// Generators/Pickers: 8
// Scrapbook-Specific: 4
// AI Features: 3
// NEW (Dec 24): 10
// -------------------
// TOTAL: 50+ Components
// ============================================
