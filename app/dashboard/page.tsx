'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useAuth } from '@/components/AuthProvider'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { 
  Plus, Book, Search, Grid, List, Clock, Star, Trash2,
  MoreHorizontal, Settings, LogOut, User, Crown, Sparkles,
  Image, FolderOpen, Share2, Download, Filter
} from 'lucide-react'

interface Scrapbook {
  id: string
  title: string
  description: string
  cover_image: string | null
  page_count: number
  is_public: boolean
  created_at: string
  updated_at: string
}

export default function DashboardPage() {
  const { user, signOut } = useAuth()
  const [scrapbooks, setScrapbooks] = useState<Scrapbook[]>([])
  const [loading, setLoading] = useState(true)
  const [view, setView] = useState<'grid' | 'list'>('grid')
  const [searchQuery, setSearchQuery] = useState('')
  const supabase = createClientComponentClient()

  useEffect(() => {
    const fetchScrapbooks = async () => {
      if (!user) return
      
      const { data, error } = await supabase
        .from('scrapbooks')
        .select('*')
        .eq('user_id', user.id)
        .order('updated_at', { ascending: false })
      
      if (!error && data) {
        setScrapbooks(data)
      }
      setLoading(false)
    }
    fetchScrapbooks()
  }, [user, supabase])

  const filteredScrapbooks = scrapbooks.filter(sb => 
    sb.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const createNewScrapbook = async () => {
    if (!user) return
    
    const { data, error } = await supabase
      .from('scrapbooks')
      .insert({
        user_id: user.id,
        title: 'Untitled Scrapbook',
        description: '',
        page_count: 1,
        is_public: false,
      })
      .select()
      .single()
    
    if (!error && data) {
      window.location.href = `/editor/${data.id}`
    }
  }

  return (
    <div className="min-h-screen bg-scrapbook-cream">
      {/* Header */}
      <header className="bg-white border-b border-scrapbook-washi/30 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-scrapbook-rose to-scrapbook-lavender flex items-center justify-center">
                <Book className="w-5 h-5 text-white" />
              </div>
              <span className="font-display text-2xl font-bold text-gray-800">CRAVScrapbook</span>
            </Link>

            <div className="flex items-center gap-4">
              <button className="p-2 rounded-lg hover:bg-gray-100 transition">
                <Settings className="w-5 h-5 text-gray-600" />
              </button>
              <div className="relative group">
                <button className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition">
                  <div className="w-8 h-8 rounded-full bg-scrapbook-lavender flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  <div className="p-3 border-b border-gray-100">
                    <p className="font-medium text-gray-900 text-sm">{user?.email}</p>
                    <p className="text-xs text-gray-500">Free Plan</p>
                  </div>
                  <div className="p-2">
                    <Link href="/settings" className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-50 text-sm text-gray-700">
                      <Settings className="w-4 h-4" /> Settings
                    </Link>
                    <button 
                      onClick={signOut}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-gray-50 text-sm text-gray-700 w-full text-left"
                    >
                      <LogOut className="w-4 h-4" /> Sign Out
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats & Actions */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="font-display text-3xl font-bold text-gray-900">My Scrapbooks</h1>
            <p className="text-gray-500 mt-1">{scrapbooks.length} scrapbooks • 5 free remaining</p>
          </div>
          <button 
            onClick={createNewScrapbook}
            className="btn-scrapbook flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            New Scrapbook
          </button>
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search scrapbooks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-scrapbook-rose/30"
            />
          </div>
          <div className="flex items-center gap-2">
            <button className="p-3 rounded-xl border border-gray-200 hover:bg-gray-50 transition">
              <Filter className="w-5 h-5 text-gray-500" />
            </button>
            <button 
              onClick={() => setView('grid')}
              className={`p-3 rounded-xl border transition ${view === 'grid' ? 'bg-scrapbook-rose/10 border-scrapbook-rose text-scrapbook-rose' : 'border-gray-200 hover:bg-gray-50'}`}
            >
              <Grid className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setView('list')}
              className={`p-3 rounded-xl border transition ${view === 'list' ? 'bg-scrapbook-rose/10 border-scrapbook-rose text-scrapbook-rose' : 'border-gray-200 hover:bg-gray-50'}`}
            >
              <List className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrapbooks Grid/List */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-2 border-scrapbook-rose border-t-transparent rounded-full animate-spin" />
          </div>
        ) : filteredScrapbooks.length > 0 ? (
          <div className={view === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' : 'space-y-4'}>
            {filteredScrapbooks.map((scrapbook, index) => (
              <motion.div
                key={scrapbook.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
              >
                <Link
                  href={`/editor/${scrapbook.id}`}
                  className={`block ${view === 'grid' ? 'card-scrapbook group' : 'card-scrapbook flex items-center gap-4'}`}
                >
                  <div className={`${view === 'grid' ? 'aspect-[3/4] mb-4' : 'w-20 h-24 flex-shrink-0'} bg-gradient-to-br from-scrapbook-rose/20 to-scrapbook-lavender/20 rounded-lg flex items-center justify-center overflow-hidden`}>
                    {scrapbook.cover_image ? (
                      <img src={scrapbook.cover_image} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <Book className="w-12 h-12 text-scrapbook-rose/50" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display font-semibold text-gray-900 group-hover:text-scrapbook-rose transition">
                      {scrapbook.title}
                    </h3>
                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <Image className="w-4 h-4" />
                        {scrapbook.page_count} pages
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {new Date(scrapbook.updated_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  {view === 'list' && (
                    <button className="p-2 rounded-lg hover:bg-gray-100 transition">
                      <MoreHorizontal className="w-5 h-5 text-gray-400" />
                    </button>
                  )}
                </Link>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-scrapbook-washi/50 flex items-center justify-center">
              <Book className="w-12 h-12 text-scrapbook-kraft" />
            </div>
            <h3 className="font-display text-xl font-semibold text-gray-900 mb-2">
              No scrapbooks yet
            </h3>
            <p className="text-gray-500 mb-6">
              Start preserving your memories by creating your first scrapbook
            </p>
            <button 
              onClick={createNewScrapbook}
              className="btn-scrapbook inline-flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Create Your First Scrapbook
            </button>
          </div>
        )}

        {/* Upgrade CTA */}
        <div className="mt-12 bg-gradient-to-r from-scrapbook-rose/10 via-scrapbook-lavender/10 to-scrapbook-sky/10 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-accent-gold flex items-center justify-center">
              <Crown className="w-7 h-7 text-white" />
            </div>
            <div>
              <h3 className="font-display text-xl font-semibold text-gray-900">Upgrade to Story Teller</h3>
              <p className="text-gray-600">Unlimited scrapbooks, AI assistance, and premium templates</p>
            </div>
          </div>
          <Link href="/pricing" className="btn-gold flex items-center gap-2">
            <Sparkles className="w-5 h-5" />
            Upgrade Now
          </Link>
        </div>
      </main>
    </div>
  )
}
