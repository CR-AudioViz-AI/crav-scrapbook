# 🎨 CRAV Scrapbook

> **Your Story. Our Design.** - World-class digital scrapbooking platform with AI-powered tools.

![CRAV Scrapbook](https://img.shields.io/badge/Status-Production%20Ready-brightgreen)
![Next.js](https://img.shields.io/badge/Next.js-14.1.0-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)
![License](https://img.shields.io/badge/License-Proprietary-red)

## ✨ Features

### 🖼️ Powerful Editor
- **Drag & Drop Canvas** - Intuitive element positioning with multi-select support
- **Rich Element Types** - Photos, text, shapes, stickers, borders, backgrounds
- **Advanced Transforms** - Resize, rotate, flip, and precise positioning
- **Keyboard Shortcuts** - Professional workflow with Ctrl+Z, Ctrl+C, Delete, arrow keys
- **Zoom & Grid** - 10%-500% zoom with snap-to-grid alignment
- **50-Step Undo/Redo** - Never lose your work

### 🤖 AI-Powered Tools
- **Background Removal** - One-click background removal (Remove.bg API)
- **Photo Enhancement** - AI-powered brightness, contrast, and sharpness
- **Image Upscaling** - 2x-4x resolution enhancement
- **Old Photo Restoration** - Fix scratches, tears, and fading
- **Face Enhancement** - Improve facial details automatically
- **Smart Crop** - AI-detected subject-aware cropping

### 📷 Free Stock Assets
- **Millions of Photos** - Unsplash, Pexels, Pixabay integration
- **Animated Stickers** - GIPHY sticker library
- **1000+ Fonts** - Google Fonts integration
- **40+ Color Palettes** - Curated schemes for any occasion
- **200+ Icons** - Emoji and decorative elements

### 📑 50+ Professional Templates
| Category | Templates | Description |
|----------|-----------|-------------|
| 👶 Baby | 8+ | First year, baby shower, milestones |
| 💒 Wedding | 8+ | Albums, engagement, love stories |
| ✈️ Travel | 8+ | Adventures, road trips, vacations |
| 👨‍👩‍👧‍👦 Family | 6+ | Reunions, heritage, generations |
| 🎂 Birthday | 4+ | Kids, milestones, celebrations |
| 🎓 Graduation | 4+ | School, achievements |
| 🎄 Holiday | 6+ | Christmas, Halloween, seasonal |
| 🐾 Pets | 4+ | Fur babies, animal memories |
| 🌿 Nature | 4+ | Outdoor, botanical |
| ◻️ Minimal | 4+ | Clean, modern designs |

### 👥 Collaboration
- **Real-time Sharing** - Invite by email with viewer/editor roles
- **Public Links** - Share scrapbooks with anyone
- **Comments** - Leave feedback on specific pages
- **Activity Log** - Track all changes

### 📤 Export Options
- **PDF** - High-quality multi-page documents (72-300 DPI)
- **PNG** - Individual page exports (1x-3x scale)
- **Print-Ready** - Bleed margins, crop marks, CMYK ready
- **Social Sharing** - Facebook, Twitter, Pinterest, email

### 🖨️ Print Integration
Connect with popular print services:
- Shutterfly
- Snapfish
- Mixbook
- Artifact Uprising
- Nations Photo Lab
- Mpix

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Supabase account
- Free API keys (optional but recommended)

### Installation

```bash
# Clone repository
git clone https://github.com/CR-AudioViz-AI/crav-scrapbook.git
cd crav-scrapbook

# Install dependencies
npm install

# Copy environment template
cp .env.example .env.local

# Start development server
npm run dev
```

### Environment Variables

```env
# Required - Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_key

# Optional - Stock Photos (Free APIs)
UNSPLASH_ACCESS_KEY=your_key
PEXELS_API_KEY=your_key
PIXABAY_API_KEY=your_key

# Optional - Stickers
GIPHY_API_KEY=your_key

# Optional - AI Features
REMOVE_BG_API_KEY=your_key
```

### Database Setup

Run the SQL schema in your Supabase SQL Editor:

```bash
# Schema file located at:
# supabase-schema.sql (287 lines)
```

## 📁 Project Structure

```
crav-scrapbook/
├── app/
│   ├── api/
│   │   ├── scrapbooks/       # CRUD operations
│   │   ├── upload/           # File uploads
│   │   ├── export/           # PDF/PNG export
│   │   ├── ai/               # AI enhancements
│   │   ├── stock/            # Photos, stickers
│   │   ├── fonts/            # Google Fonts
│   │   ├── palettes/         # Color schemes
│   │   └── icons/            # Clipart
│   ├── dashboard/            # User dashboard
│   ├── editor/               # Scrapbook editor
│   └── view/                 # Public viewer
├── components/
│   └── editor/
│       ├── EditorCanvas.tsx
│       ├── EditorToolbar.tsx
│       ├── AssetsPanel.tsx
│       ├── PropertiesPanel.tsx
│       ├── PagesPanel.tsx
│       ├── StockPhotoBrowser.tsx
│       ├── GiphyBrowser.tsx
│       ├── AIEnhancePanel.tsx
│       ├── ExportModal.tsx
│       ├── TemplateGallery.tsx
│       └── CollaborationPanel.tsx
├── lib/
│   ├── store.ts              # Zustand state
│   ├── types.ts              # TypeScript types
│   ├── utils.ts              # Utilities
│   ├── data/
│   │   └── templates.ts      # 50+ templates
│   ├── hooks/
│   │   └── useScrapbook.ts   # Custom hooks
│   └── services/
│       └── printService.ts   # Print integration
└── public/
```

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript (Strict Mode) |
| Styling | Tailwind CSS |
| Animation | Framer Motion |
| State | Zustand |
| Database | Supabase (PostgreSQL) |
| Auth | Supabase Auth |
| Storage | Supabase Storage |
| Data Fetching | SWR |
| Export | jsPDF, html2canvas |
| Hosting | Vercel |

## 📊 Free API Integrations

| Service | Free Tier | Use Case |
|---------|-----------|----------|
| Unsplash | 50 req/hr | Stock photos |
| Pexels | 200 req/hr | Stock photos |
| Pixabay | 5000 req/hr | Stock photos |
| GIPHY | 1000 req/day | Stickers & GIFs |
| Remove.bg | 50/month | Background removal |
| Google Fonts | Unlimited | Typography |

## 🔐 Security

- Row Level Security (RLS) on all tables
- Server-side API routes
- Environment variable protection
- Supabase Auth with session management
- Input sanitization
- CORS configuration

## 📈 Performance

- Static page generation where possible
- Image optimization with Next.js
- Lazy loading for assets
- Code splitting
- Edge functions for APIs

## 🤝 Contributing

This is a proprietary project for CR AudioViz AI, LLC.

## 📄 License

Copyright © 2025 CR AudioViz AI, LLC. All rights reserved.

---

Built with ❤️ by the CR AudioViz AI Team

**Your Story. Our Design.**
