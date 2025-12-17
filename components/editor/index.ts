// components/editor/index.ts
// Export all editor components - handles both default and named exports

// Core Editor Components (Default exports)
export { default as EditorCanvas } from './EditorCanvas';
export { default as EditorToolbar } from './EditorToolbar';
export { default as PropertiesPanel } from './PropertiesPanel';
export { default as PagesPanel } from './PagesPanel';
export { default as AssetsPanel } from './AssetsPanel';

// Core Editor Components (Named exports)
export { EnhancedPagesPanel } from './EnhancedPagesPanel';
export { AIEnhancePanel } from './AIEnhancePanel';
export { CollaborationPanel } from './CollaborationPanel';
export { ExportModal } from './ExportModal';

// Asset Browsers (Named exports)
export { StockPhotoBrowser } from './StockPhotoBrowser';
export { GiphyBrowser } from './GiphyBrowser';
export { TemplateGallery } from './TemplateGallery';

// NEW: Creative Asset Browsers (Default exports)
export { default as ShapesBrowser } from './ShapesBrowser';
export { default as StickersBrowser } from './StickersBrowser';
export { default as FiltersBrowser } from './FiltersBrowser';
export { default as FramesBrowser } from './FramesBrowser';

// NEW: Generators & Pickers (Default exports)
export { default as QRCodeGenerator } from './QRCodeGenerator';
export { default as AvatarCreator } from './AvatarCreator';
export { default as CollageBuilder } from './CollageBuilder';
export { default as BackgroundPicker } from './BackgroundPicker';
export { default as PatternPicker } from './PatternPicker';
export { default as ColorPalettePicker } from './ColorPalettePicker';
export { default as TextEffectsPanel } from './TextEffectsPanel';
