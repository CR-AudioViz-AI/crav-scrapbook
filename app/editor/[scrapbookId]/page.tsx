'use client'

import { useState, useCallback, useRef, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Save, Undo, Redo, ZoomIn, ZoomOut, Grid, Eye, Download,
  Image as ImageIcon, Type, Square, Sticker, Palette, Layers,
  ChevronLeft, ChevronRight, Plus, Trash2, Copy, Lock, Unlock,
  RotateCw, FlipHorizontal, FlipVertical, AlignLeft, AlignCenter,
  AlignRight, Bold, Italic, Underline, ArrowLeft, Settings, Share,
  Sparkles, Book, Layout, Frame, Scissors, Heart
} from 'lucide-react'
import { cn } from '@/lib/utils'

// Types
interface Element {
  id: string
  type: 'photo' | 'text' | 'shape' | 'sticker' | 'frame'
  x: number
  y: number
  width: number
  height: number
  rotation: number
  scale: number
  zIndex: number
  locked: boolean
  data: {
    src?: string
    text?: string
    fontFamily?: string
    fontSize?: number
    fontWeight?: string
    fontStyle?: string
    textAlign?: string
    color?: string
    backgroundColor?: string
    borderRadius?: number
    borderWidth?: number
    borderColor?: string
    opacity?: number
  }
}

interface Page {
  id: string
  pageNumber: number
  background: {
    type: 'color' | 'gradient' | 'pattern' | 'image'
    value: string
  }
  elements: Element[]
}

// Embellishment categories
const embellishmentCategories = [
  { id: 'stickers', name: 'Stickers', icon: Sticker, items: ['🌸', '💕', '✨', '🌺', '🦋', '🎀', '⭐', '🌈', '🍃', '🌻', '❤️', '💫', '🌷', '🎭', '🎨'] },
  { id: 'frames', name: 'Frames', icon: Frame, items: ['frame-polaroid', 'frame-vintage', 'frame-modern', 'frame-ornate', 'frame-simple'] },
  { id: 'washi', name: 'Washi Tape', icon: Scissors, items: ['washi-pink', 'washi-blue', 'washi-gold', 'washi-floral', 'washi-stripe'] },
  { id: 'shapes', name: 'Shapes', icon: Square, items: ['circle', 'square', 'heart', 'star', 'triangle', 'hexagon'] },
]

// Background options
const backgroundOptions = [
  { type: 'color', value: '#ffffff', name: 'White' },
  { type: 'color', value: '#FDF8F3', name: 'Cream' },
  { type: 'color', value: '#F5EDE4', name: 'Paper' },
  { type: 'color', value: '#E8D5C4', name: 'Kraft' },
  { type: 'color', value: '#E8B4B8', name: 'Rose' },
  { type: 'color', value: '#A7C7E7', name: 'Sky' },
  { type: 'color', value: '#C5B4E3', name: 'Lavender' },
  { type: 'color', value: '#B2D8CE', name: 'Mint' },
  { type: 'pattern', value: 'dots', name: 'Dots' },
  { type: 'pattern', value: 'lines', name: 'Lines' },
  { type: 'pattern', value: 'grid', name: 'Grid' },
]

// Font options
const fontOptions = [
  { value: 'Playfair Display', label: 'Playfair Display' },
  { value: 'Dancing Script', label: 'Dancing Script' },
  { value: 'Caveat', label: 'Caveat' },
  { value: 'Abril Fatface', label: 'Abril Fatface' },
  { value: 'Quicksand', label: 'Quicksand' },
]

export default function EditorPage() {
  const params = useParams()
  const router = useRouter()
  const canvasRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // State
  const [pages, setPages] = useState<Page[]>([
    {
      id: '1',
      pageNumber: 1,
      background: { type: 'color', value: '#FDF8F3' },
      elements: [],
    },
  ])
  const [currentPageIndex, setCurrentPageIndex] = useState(0)
  const [selectedElement, setSelectedElement] = useState<string | null>(null)
  const [zoom, setZoom] = useState(100)
  const [showGrid, setShowGrid] = useState(false)
  const [activeTab, setActiveTab] = useState<'photos' | 'text' | 'embellishments' | 'backgrounds' | 'templates'>('photos')
  const [history, setHistory] = useState<Page[][]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 })
  const [isSaving, setIsSaving] = useState(false)

  const currentPage = pages[currentPageIndex]

  // Save to history
  const saveToHistory = useCallback(() => {
    const newHistory = history.slice(0, historyIndex + 1)
    newHistory.push(JSON.parse(JSON.stringify(pages)))
    setHistory(newHistory)
    setHistoryIndex(newHistory.length - 1)
  }, [history, historyIndex, pages])

  // Undo/Redo
  const undo = useCallback(() => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1)
      setPages(JSON.parse(JSON.stringify(history[historyIndex - 1])))
    }
  }, [history, historyIndex])

  const redo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1)
      setPages(JSON.parse(JSON.stringify(history[historyIndex + 1])))
    }
  }, [history, historyIndex])

  // Add element
  const addElement = useCallback((type: Element['type'], data: Partial<Element['data']> = {}) => {
    saveToHistory()
    const newElement: Element = {
      id: Math.random().toString(36).substring(2, 9),
      type,
      x: 200 + Math.random() * 100,
      y: 200 + Math.random() * 100,
      width: type === 'text' ? 200 : 150,
      height: type === 'text' ? 50 : 150,
      rotation: (Math.random() - 0.5) * 10,
      scale: 1,
      zIndex: currentPage.elements.length + 1,
      locked: false,
      data: {
        fontFamily: 'Quicksand',
        fontSize: 18,
        color: '#333333',
        backgroundColor: 'transparent',
        ...data,
      },
    }
    setPages((prev) => {
      const updated = [...prev]
      updated[currentPageIndex] = {
        ...updated[currentPageIndex],
        elements: [...updated[currentPageIndex].elements, newElement],
      }
      return updated
    })
    setSelectedElement(newElement.id)
  }, [currentPage, currentPageIndex, saveToHistory])

  // Update element
  const updateElement = useCallback((id: string, updates: Partial<Element>) => {
    setPages((prev) => {
      const updated = [...prev]
      const elementIndex = updated[currentPageIndex].elements.findIndex((el) => el.id === id)
      if (elementIndex !== -1) {
        updated[currentPageIndex].elements[elementIndex] = {
          ...updated[currentPageIndex].elements[elementIndex],
          ...updates,
        }
      }
      return updated
    })
  }, [currentPageIndex])

  // Delete element
  const deleteElement = useCallback((id: string) => {
    saveToHistory()
    setPages((prev) => {
      const updated = [...prev]
      updated[currentPageIndex] = {
        ...updated[currentPageIndex],
        elements: updated[currentPageIndex].elements.filter((el) => el.id !== id),
      }
      return updated
    })
    setSelectedElement(null)
  }, [currentPageIndex, saveToHistory])

  // Handle image upload
  const handleImageUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return

    Array.from(files).forEach((file) => {
      const reader = new FileReader()
      reader.onload = (event) => {
        const src = event.target?.result as string
        addElement('photo', { src })
      }
      reader.readAsDataURL(file)
    })
  }, [addElement])

  // Add page
  const addPage = useCallback(() => {
    saveToHistory()
    const newPage: Page = {
      id: Math.random().toString(36).substring(2, 9),
      pageNumber: pages.length + 1,
      background: { type: 'color', value: '#FDF8F3' },
      elements: [],
    }
    setPages((prev) => [...prev, newPage])
    setCurrentPageIndex(pages.length)
  }, [pages.length, saveToHistory])

  // Update background
  const updateBackground = useCallback((background: Page['background']) => {
    saveToHistory()
    setPages((prev) => {
      const updated = [...prev]
      updated[currentPageIndex] = { ...updated[currentPageIndex], background }
      return updated
    })
  }, [currentPageIndex, saveToHistory])

  // Mouse handlers for drag
  const handleMouseDown = useCallback((e: React.MouseEvent, elementId: string) => {
    const element = currentPage.elements.find((el) => el.id === elementId)
    if (!element || element.locked) return

    setSelectedElement(elementId)
    setIsDragging(true)
    const rect = (e.target as HTMLElement).getBoundingClientRect()
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }, [currentPage.elements])

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging || !selectedElement || !canvasRef.current) return

    const canvasRect = canvasRef.current.getBoundingClientRect()
    const x = ((e.clientX - canvasRect.left - dragOffset.x) / zoom) * 100
    const y = ((e.clientY - canvasRect.top - dragOffset.y) / zoom) * 100

    updateElement(selectedElement, { x, y })
  }, [isDragging, selectedElement, dragOffset, zoom, updateElement])

  const handleMouseUp = useCallback(() => {
    if (isDragging) {
      saveToHistory()
    }
    setIsDragging(false)
  }, [isDragging, saveToHistory])

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Delete' && selectedElement) {
        deleteElement(selectedElement)
      }
      if (e.ctrlKey || e.metaKey) {
        if (e.key === 'z') {
          e.preventDefault()
          if (e.shiftKey) redo()
          else undo()
        }
        if (e.key === 's') {
          e.preventDefault()
          // Save function
        }
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedElement, deleteElement, undo, redo])

  const selectedElementData = selectedElement
    ? currentPage.elements.find((el) => el.id === selectedElement)
    : null

  return (
    <div className="h-screen flex flex-col bg-gray-100 overflow-hidden">
      {/* Top Toolbar */}
      <header className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-4 shadow-sm">
        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition">
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back</span>
          </Link>
          <div className="h-6 w-px bg-gray-300" />
          <input
            type="text"
            defaultValue="Untitled Scrapbook"
            className="font-display text-lg font-semibold bg-transparent border-none focus:outline-none focus:ring-2 focus:ring-scrapbook-rose/30 rounded px-2 py-1"
          />
        </div>

        <div className="flex items-center gap-2">
          <button onClick={undo} disabled={historyIndex <= 0} className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 transition">
            <Undo className="w-5 h-5" />
          </button>
          <button onClick={redo} disabled={historyIndex >= history.length - 1} className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 transition">
            <Redo className="w-5 h-5" />
          </button>
          <div className="h-6 w-px bg-gray-300 mx-2" />
          <button onClick={() => setZoom(Math.max(50, zoom - 10))} className="p-2 rounded-lg hover:bg-gray-100 transition">
            <ZoomOut className="w-5 h-5" />
          </button>
          <span className="text-sm font-medium w-12 text-center">{zoom}%</span>
          <button onClick={() => setZoom(Math.min(200, zoom + 10))} className="p-2 rounded-lg hover:bg-gray-100 transition">
            <ZoomIn className="w-5 h-5" />
          </button>
          <button 
            onClick={() => setShowGrid(!showGrid)} 
            className={cn("p-2 rounded-lg transition", showGrid ? "bg-scrapbook-rose/20 text-scrapbook-rose" : "hover:bg-gray-100")}
          >
            <Grid className="w-5 h-5" />
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button className="p-2 rounded-lg hover:bg-gray-100 transition">
            <Eye className="w-5 h-5" />
          </button>
          <button className="p-2 rounded-lg hover:bg-gray-100 transition">
            <Share className="w-5 h-5" />
          </button>
          <button className="p-2 rounded-lg hover:bg-gray-100 transition">
            <Download className="w-5 h-5" />
          </button>
          <button 
            onClick={() => setIsSaving(true)}
            className="btn-scrapbook text-sm flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            Save
          </button>
        </div>
      </header>

      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar - Tools */}
        <aside className="w-80 bg-white border-r border-gray-200 flex flex-col">
          {/* Tool Tabs */}
          <div className="flex border-b border-gray-200">
            {[
              { id: 'photos', icon: ImageIcon, label: 'Photos' },
              { id: 'text', icon: Type, label: 'Text' },
              { id: 'embellishments', icon: Sticker, label: 'Decor' },
              { id: 'backgrounds', icon: Palette, label: 'BGs' },
              { id: 'templates', icon: Layout, label: 'Templates' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={cn(
                  "flex-1 p-3 flex flex-col items-center gap-1 transition text-xs",
                  activeTab === tab.id 
                    ? "bg-scrapbook-rose/10 text-scrapbook-rose border-b-2 border-scrapbook-rose" 
                    : "text-gray-500 hover:bg-gray-50"
                )}
              >
                <tab.icon className="w-5 h-5" />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tool Content */}
          <div className="flex-1 overflow-y-auto p-4">
            {activeTab === 'photos' && (
              <div className="space-y-4">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full py-8 border-2 border-dashed border-scrapbook-rose/40 rounded-xl flex flex-col items-center gap-2 text-scrapbook-rose hover:border-scrapbook-rose hover:bg-scrapbook-rose/5 transition"
                >
                  <ImageIcon className="w-8 h-8" />
                  <span className="font-medium">Upload Photos</span>
                  <span className="text-xs text-gray-500">Click or drag & drop</span>
                </button>
                <p className="text-xs text-gray-500 text-center">
                  Supported: JPG, PNG, GIF, WebP
                </p>
              </div>
            )}

            {activeTab === 'text' && (
              <div className="space-y-4">
                <button
                  onClick={() => addElement('text', { text: 'Click to edit', fontSize: 24 })}
                  className="w-full py-4 border border-gray-200 rounded-xl flex items-center justify-center gap-2 hover:border-scrapbook-rose hover:bg-scrapbook-rose/5 transition"
                >
                  <Type className="w-5 h-5" />
                  <span>Add Text</span>
                </button>
                <div className="grid grid-cols-2 gap-2">
                  {['Title', 'Subtitle', 'Body', 'Caption', 'Quote', 'Date'].map((preset) => (
                    <button
                      key={preset}
                      onClick={() => addElement('text', { 
                        text: preset, 
                        fontSize: preset === 'Title' ? 32 : preset === 'Subtitle' ? 24 : 16,
                        fontFamily: preset === 'Quote' ? 'Dancing Script' : 'Quicksand'
                      })}
                      className="py-3 border border-gray-200 rounded-lg text-sm hover:border-scrapbook-rose hover:bg-scrapbook-rose/5 transition"
                    >
                      {preset}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'embellishments' && (
              <div className="space-y-6">
                {embellishmentCategories.map((category) => (
                  <div key={category.id}>
                    <h3 className="font-medium text-sm text-gray-700 mb-2 flex items-center gap-2">
                      <category.icon className="w-4 h-4" />
                      {category.name}
                    </h3>
                    <div className="grid grid-cols-5 gap-2">
                      {category.items.map((item, i) => (
                        <button
                          key={i}
                          onClick={() => addElement('sticker', { text: item })}
                          className="aspect-square border border-gray-200 rounded-lg flex items-center justify-center text-2xl hover:border-scrapbook-rose hover:bg-scrapbook-rose/5 transition hover:scale-110"
                        >
                          {item.startsWith('washi') || item.startsWith('frame') ? '🎨' : item}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'backgrounds' && (
              <div className="space-y-4">
                <h3 className="font-medium text-sm text-gray-700">Solid Colors</h3>
                <div className="grid grid-cols-4 gap-2">
                  {backgroundOptions.filter(bg => bg.type === 'color').map((bg) => (
                    <button
                      key={bg.value}
                      onClick={() => updateBackground({ type: 'color', value: bg.value })}
                      className={cn(
                        "aspect-square rounded-lg border-2 transition hover:scale-105",
                        currentPage.background.value === bg.value ? "border-scrapbook-rose" : "border-gray-200"
                      )}
                      style={{ backgroundColor: bg.value }}
                      title={bg.name}
                    />
                  ))}
                </div>
                <h3 className="font-medium text-sm text-gray-700 mt-4">Patterns</h3>
                <div className="grid grid-cols-3 gap-2">
                  {backgroundOptions.filter(bg => bg.type === 'pattern').map((bg) => (
                    <button
                      key={bg.value}
                      onClick={() => updateBackground({ type: 'pattern', value: bg.value })}
                      className={cn(
                        "aspect-square rounded-lg border-2 transition hover:scale-105 bg-scrapbook-paper",
                        currentPage.background.value === bg.value ? "border-scrapbook-rose" : "border-gray-200"
                      )}
                    >
                      <span className="text-xs text-gray-500">{bg.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'templates' && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  {['Classic Grid', 'Polaroid Stack', 'Timeline', 'Collage', 'Minimalist', 'Vintage'].map((template) => (
                    <button
                      key={template}
                      className="aspect-[3/4] border border-gray-200 rounded-xl bg-scrapbook-paper flex items-center justify-center text-sm text-gray-500 hover:border-scrapbook-rose hover:bg-scrapbook-rose/5 transition"
                    >
                      {template}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </aside>

        {/* Main Canvas Area */}
        <main className="flex-1 bg-gray-200 overflow-auto p-8 flex items-center justify-center">
          <div
            ref={canvasRef}
            className={cn(
              "scrapbook-page relative transition-all duration-300",
              showGrid && "bg-[url('data:image/svg+xml,...')]"
            )}
            style={{
              width: `${600 * (zoom / 100)}px`,
              height: `${800 * (zoom / 100)}px`,
              backgroundColor: currentPage.background.type === 'color' ? currentPage.background.value : undefined,
              transform: `scale(${zoom / 100})`,
              transformOrigin: 'center',
            }}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onClick={(e) => {
              if (e.target === e.currentTarget) setSelectedElement(null)
            }}
          >
            {/* Render Elements */}
            {currentPage.elements.map((element) => (
              <motion.div
                key={element.id}
                className={cn(
                  "absolute cursor-move",
                  selectedElement === element.id && "ring-2 ring-scrapbook-rose ring-offset-2",
                  element.locked && "cursor-not-allowed"
                )}
                style={{
                  left: element.x,
                  top: element.y,
                  width: element.width,
                  height: element.height,
                  transform: `rotate(${element.rotation}deg) scale(${element.scale})`,
                  zIndex: element.zIndex,
                }}
                onMouseDown={(e) => handleMouseDown(e, element.id)}
                whileHover={{ scale: element.locked ? 1 : 1.02 }}
              >
                {element.type === 'photo' && element.data.src && (
                  <div className="photo-frame w-full h-full">
                    <img 
                      src={element.data.src} 
                      alt="" 
                      className="w-full h-full object-cover rounded"
                      draggable={false}
                    />
                  </div>
                )}
                {element.type === 'text' && (
                  <div
                    contentEditable={selectedElement === element.id}
                    suppressContentEditableWarning
                    className="w-full h-full outline-none"
                    style={{
                      fontFamily: element.data.fontFamily,
                      fontSize: element.data.fontSize,
                      fontWeight: element.data.fontWeight,
                      fontStyle: element.data.fontStyle,
                      textAlign: element.data.textAlign as any,
                      color: element.data.color,
                    }}
                    onBlur={(e) => {
                      updateElement(element.id, { 
                        data: { ...element.data, text: e.currentTarget.innerText }
                      })
                    }}
                  >
                    {element.data.text}
                  </div>
                )}
                {element.type === 'sticker' && (
                  <div className="sticker text-5xl flex items-center justify-center w-full h-full">
                    {element.data.text}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </main>

        {/* Right Sidebar - Properties */}
        <aside className="w-64 bg-white border-l border-gray-200 p-4 overflow-y-auto">
          {selectedElementData ? (
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900">Element Properties</h3>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Locked</span>
                  <button
                    onClick={() => updateElement(selectedElementData.id, { locked: !selectedElementData.locked })}
                    className={cn(
                      "p-2 rounded-lg transition",
                      selectedElementData.locked ? "bg-red-100 text-red-600" : "bg-gray-100 text-gray-600"
                    )}
                  >
                    {selectedElementData.locked ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
                  </button>
                </div>

                <div>
                  <label className="text-sm text-gray-600 block mb-1">Rotation</label>
                  <input
                    type="range"
                    min="-180"
                    max="180"
                    value={selectedElementData.rotation}
                    onChange={(e) => updateElement(selectedElementData.id, { rotation: parseFloat(e.target.value) })}
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="text-sm text-gray-600 block mb-1">Scale</label>
                  <input
                    type="range"
                    min="0.5"
                    max="2"
                    step="0.1"
                    value={selectedElementData.scale}
                    onChange={(e) => updateElement(selectedElementData.id, { scale: parseFloat(e.target.value) })}
                    className="w-full"
                  />
                </div>

                {selectedElementData.type === 'text' && (
                  <>
                    <div>
                      <label className="text-sm text-gray-600 block mb-1">Font</label>
                      <select
                        value={selectedElementData.data.fontFamily}
                        onChange={(e) => updateElement(selectedElementData.id, {
                          data: { ...selectedElementData.data, fontFamily: e.target.value }
                        })}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                      >
                        {fontOptions.map((font) => (
                          <option key={font.value} value={font.value} style={{ fontFamily: font.value }}>
                            {font.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="text-sm text-gray-600 block mb-1">Size</label>
                      <input
                        type="number"
                        min="8"
                        max="120"
                        value={selectedElementData.data.fontSize}
                        onChange={(e) => updateElement(selectedElementData.id, {
                          data: { ...selectedElementData.data, fontSize: parseInt(e.target.value) }
                        })}
                        className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                      />
                    </div>

                    <div>
                      <label className="text-sm text-gray-600 block mb-1">Color</label>
                      <input
                        type="color"
                        value={selectedElementData.data.color}
                        onChange={(e) => updateElement(selectedElementData.id, {
                          data: { ...selectedElementData.data, color: e.target.value }
                        })}
                        className="w-full h-10 rounded-lg cursor-pointer"
                      />
                    </div>
                  </>
                )}

                <button
                  onClick={() => deleteElement(selectedElementData.id)}
                  className="w-full py-2 flex items-center justify-center gap-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-500 py-8">
              <Layers className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p className="text-sm">Select an element to edit its properties</p>
            </div>
          )}
        </aside>
      </div>

      {/* Bottom Page Navigator */}
      <footer className="h-24 bg-white border-t border-gray-200 flex items-center px-4">
        <button
          onClick={() => currentPageIndex > 0 && setCurrentPageIndex(currentPageIndex - 1)}
          disabled={currentPageIndex === 0}
          className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 transition"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <div className="flex-1 flex gap-2 overflow-x-auto px-4">
          {pages.map((page, index) => (
            <button
              key={page.id}
              onClick={() => setCurrentPageIndex(index)}
              className={cn(
                "flex-shrink-0 w-12 h-16 rounded-lg border-2 transition overflow-hidden",
                index === currentPageIndex ? "border-scrapbook-rose" : "border-gray-200 hover:border-gray-400"
              )}
              style={{ backgroundColor: page.background.value }}
            >
              <span className="text-xs text-gray-500">{index + 1}</span>
            </button>
          ))}
          <button
            onClick={addPage}
            className="flex-shrink-0 w-12 h-16 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center hover:border-scrapbook-rose hover:text-scrapbook-rose transition"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>

        <button
          onClick={() => currentPageIndex < pages.length - 1 && setCurrentPageIndex(currentPageIndex + 1)}
          disabled={currentPageIndex === pages.length - 1}
          className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-50 transition"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </footer>
    </div>
  )
}
