// lib/keyboardShortcuts.ts
// Global keyboard shortcuts for the editor

export interface ShortcutConfig {
  key: string;
  ctrl?: boolean;
  shift?: boolean;
  alt?: boolean;
  meta?: boolean;
  action: string;
  description: string;
  category: string;
}

export const EDITOR_SHORTCUTS: ShortcutConfig[] = [
  // File Operations
  { key: 's', ctrl: true, action: 'save', description: 'Save scrapbook', category: 'File' },
  { key: 'e', ctrl: true, action: 'export', description: 'Export scrapbook', category: 'File' },
  { key: 'n', ctrl: true, action: 'new-page', description: 'Add new page', category: 'File' },
  
  // Edit Operations
  { key: 'z', ctrl: true, action: 'undo', description: 'Undo', category: 'Edit' },
  { key: 'z', ctrl: true, shift: true, action: 'redo', description: 'Redo', category: 'Edit' },
  { key: 'y', ctrl: true, action: 'redo', description: 'Redo (alternate)', category: 'Edit' },
  { key: 'c', ctrl: true, action: 'copy', description: 'Copy selected', category: 'Edit' },
  { key: 'x', ctrl: true, action: 'cut', description: 'Cut selected', category: 'Edit' },
  { key: 'v', ctrl: true, action: 'paste', description: 'Paste', category: 'Edit' },
  { key: 'd', ctrl: true, action: 'duplicate', description: 'Duplicate selected', category: 'Edit' },
  { key: 'a', ctrl: true, action: 'select-all', description: 'Select all elements', category: 'Edit' },
  { key: 'Delete', action: 'delete', description: 'Delete selected', category: 'Edit' },
  { key: 'Backspace', action: 'delete', description: 'Delete selected', category: 'Edit' },
  { key: 'Escape', action: 'deselect', description: 'Deselect all', category: 'Edit' },
  
  // View Operations
  { key: '=', ctrl: true, action: 'zoom-in', description: 'Zoom in', category: 'View' },
  { key: '-', ctrl: true, action: 'zoom-out', description: 'Zoom out', category: 'View' },
  { key: '0', ctrl: true, action: 'zoom-fit', description: 'Fit to screen', category: 'View' },
  { key: '1', ctrl: true, action: 'zoom-100', description: 'Zoom to 100%', category: 'View' },
  { key: 'g', ctrl: true, action: 'toggle-grid', description: 'Toggle grid', category: 'View' },
  { key: ';', ctrl: true, action: 'toggle-guides', description: 'Toggle guides', category: 'View' },
  
  // Element Movement
  { key: 'ArrowUp', action: 'move-up', description: 'Move up 1px', category: 'Move' },
  { key: 'ArrowDown', action: 'move-down', description: 'Move down 1px', category: 'Move' },
  { key: 'ArrowLeft', action: 'move-left', description: 'Move left 1px', category: 'Move' },
  { key: 'ArrowRight', action: 'move-right', description: 'Move right 1px', category: 'Move' },
  { key: 'ArrowUp', shift: true, action: 'move-up-10', description: 'Move up 10px', category: 'Move' },
  { key: 'ArrowDown', shift: true, action: 'move-down-10', description: 'Move down 10px', category: 'Move' },
  { key: 'ArrowLeft', shift: true, action: 'move-left-10', description: 'Move left 10px', category: 'Move' },
  { key: 'ArrowRight', shift: true, action: 'move-right-10', description: 'Move right 10px', category: 'Move' },
  
  // Layer Operations
  { key: ']', ctrl: true, action: 'bring-forward', description: 'Bring forward', category: 'Layer' },
  { key: '[', ctrl: true, action: 'send-backward', description: 'Send backward', category: 'Layer' },
  { key: ']', ctrl: true, shift: true, action: 'bring-to-front', description: 'Bring to front', category: 'Layer' },
  { key: '[', ctrl: true, shift: true, action: 'send-to-back', description: 'Send to back', category: 'Layer' },
  
  // Tools
  { key: 'v', action: 'tool-select', description: 'Select tool', category: 'Tools' },
  { key: 't', action: 'tool-text', description: 'Text tool', category: 'Tools' },
  { key: 'r', action: 'tool-rectangle', description: 'Rectangle tool', category: 'Tools' },
  { key: 'o', action: 'tool-circle', description: 'Circle tool', category: 'Tools' },
  { key: 'l', action: 'tool-line', description: 'Line tool', category: 'Tools' },
  
  // Element Properties
  { key: 'b', ctrl: true, action: 'toggle-bold', description: 'Toggle bold', category: 'Format' },
  { key: 'i', ctrl: true, action: 'toggle-italic', description: 'Toggle italic', category: 'Format' },
  { key: 'u', ctrl: true, action: 'toggle-underline', description: 'Toggle underline', category: 'Format' },
  { key: 'l', ctrl: true, action: 'lock-element', description: 'Lock/unlock element', category: 'Format' },
  
  // Navigation
  { key: 'PageDown', action: 'next-page', description: 'Next page', category: 'Navigate' },
  { key: 'PageUp', action: 'prev-page', description: 'Previous page', category: 'Navigate' },
  { key: 'Home', ctrl: true, action: 'first-page', description: 'First page', category: 'Navigate' },
  { key: 'End', ctrl: true, action: 'last-page', description: 'Last page', category: 'Navigate' },
  
  // Help
  { key: '?', action: 'show-shortcuts', description: 'Show keyboard shortcuts', category: 'Help' },
  { key: 'F1', action: 'show-help', description: 'Show help', category: 'Help' },
];

// Group shortcuts by category
export function getShortcutsByCategory(): Record<string, ShortcutConfig[]> {
  return EDITOR_SHORTCUTS.reduce((acc, shortcut) => {
    if (!acc[shortcut.category]) {
      acc[shortcut.category] = [];
    }
    acc[shortcut.category].push(shortcut);
    return acc;
  }, {} as Record<string, ShortcutConfig[]>);
}

// Format shortcut for display
export function formatShortcut(shortcut: ShortcutConfig): string {
  const parts: string[] = [];
  if (shortcut.ctrl) parts.push('Ctrl');
  if (shortcut.shift) parts.push('Shift');
  if (shortcut.alt) parts.push('Alt');
  if (shortcut.meta) parts.push('⌘');
  
  let key = shortcut.key;
  if (key === ' ') key = 'Space';
  if (key.startsWith('Arrow')) key = key.replace('Arrow', '');
  
  parts.push(key.length === 1 ? key.toUpperCase() : key);
  return parts.join(' + ');
}

// Match keyboard event to shortcut
export function matchShortcut(event: KeyboardEvent): ShortcutConfig | null {
  for (const shortcut of EDITOR_SHORTCUTS) {
    const keyMatch = event.key.toLowerCase() === shortcut.key.toLowerCase() ||
                     event.key === shortcut.key;
    const ctrlMatch = !!shortcut.ctrl === (event.ctrlKey || event.metaKey);
    const shiftMatch = !!shortcut.shift === event.shiftKey;
    const altMatch = !!shortcut.alt === event.altKey;
    
    if (keyMatch && ctrlMatch && shiftMatch && altMatch) {
      return shortcut;
    }
  }
  return null;
}

// Create keyboard shortcut handler hook
export function createShortcutHandler(
  handlers: Record<string, () => void>
): (event: KeyboardEvent) => void {
  return (event: KeyboardEvent) => {
    // Don't handle shortcuts when typing in input fields
    const target = event.target as HTMLElement;
    if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable) {
      // Allow some shortcuts even in input fields
      const allowedInInput = ['save', 'undo', 'redo'];
      const shortcut = matchShortcut(event);
      if (!shortcut || !allowedInInput.includes(shortcut.action)) {
        return;
      }
    }
    
    const shortcut = matchShortcut(event);
    if (shortcut && handlers[shortcut.action]) {
      event.preventDefault();
      handlers[shortcut.action]();
    }
  };
}
