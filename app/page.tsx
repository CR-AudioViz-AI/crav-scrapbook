'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  Book, Camera, Heart, Sparkles, Star, Users, Palette, 
  Image, Layers, Download, Share2, Wand2, Layout, Scissors,
  Gift, Crown, ChevronRight, Play, Check
} from 'lucide-react'

const features = [
  { 
    icon: Layers, 
    title: 'Drag & Drop Editor', 
    description: 'Intuitive canvas with unlimited layers. Move, resize, and rotate any element with ease.',
    color: 'from-scrapbook-rose to-scrapbook-lavender'
  },
  { 
    icon: Camera, 
    title: 'Photo Magic', 
    description: 'Auto-enhance photos, remove backgrounds, and apply vintage filters with one click.',
    color: 'from-scrapbook-sky to-scrapbook-lavender'
  },
  { 
    icon: Palette, 
    title: '1000+ Templates', 
    description: 'Professional layouts for every occasion - birthdays, weddings, travel, baby books, and more.',
    color: 'from-scrapbook-sage to-scrapbook-mint'
  },
  { 
    icon: Scissors, 
    title: 'Embellishments Galore', 
    description: 'Stickers, washi tapes, frames, ribbons, and decorative elements to bring your pages to life.',
    color: 'from-scrapbook-peach to-scrapbook-rose'
  },
  { 
    icon: Wand2, 
    title: 'AI Assistant - Javari', 
    description: 'Let AI help you design stunning layouts, suggest color palettes, and write captions.',
    color: 'from-accent-gold to-accent-copper'
  },
  { 
    icon: Share2, 
    title: 'Share & Print', 
    description: 'Export high-resolution PDFs, share online galleries, or order professional prints.',
    color: 'from-scrapbook-lavender to-scrapbook-rose'
  },
]

const templates = [
  { name: 'Baby First Year', image: '👶', category: 'Baby' },
  { name: 'Wedding Memories', image: '💒', category: 'Wedding' },
  { name: 'Travel Adventures', image: '✈️', category: 'Travel' },
  { name: 'Family Heritage', image: '👨‍👩‍👧‍👦', category: 'Family' },
  { name: 'Holiday Magic', image: '🎄', category: 'Holiday' },
  { name: 'Pet Album', image: '🐾', category: 'Pets' },
]

const pricingPlans = [
  {
    name: 'Memory Keeper',
    price: 0,
    period: 'forever',
    description: 'Perfect for casual scrapbookers',
    features: [
      '5 scrapbooks',
      '50 pages per book',
      '500MB storage',
      'Basic templates',
      'Export as PDF',
    ],
    cta: 'Start Free',
    popular: false,
  },
  {
    name: 'Story Teller',
    price: 9.99,
    period: 'month',
    description: 'For passionate memory keepers',
    features: [
      'Unlimited scrapbooks',
      'Unlimited pages',
      '10GB storage',
      'Premium templates',
      'AI assistant - Javari',
      'Remove backgrounds',
      'HD exports',
      'Priority support',
    ],
    cta: 'Start 7-Day Trial',
    popular: true,
  },
  {
    name: 'Legacy Creator',
    price: 24.99,
    period: 'month',
    description: 'For professional memory artists',
    features: [
      'Everything in Story Teller',
      '100GB storage',
      'Custom fonts',
      'Brand kit',
      'Team collaboration',
      'Print discounts',
      'API access',
      'White-label exports',
    ],
    cta: 'Contact Sales',
    popular: false,
  },
]

export default function HomePage() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  const testimonials = [
    { 
      name: 'Sarah M.', 
      role: 'Mom of 3', 
      text: 'Finally, a scrapbooking app that gets it! I preserved 10 years of family memories in just a few weekends.',
      avatar: '👩'
    },
    { 
      name: 'Emily R.', 
      role: 'Wedding Planner', 
      text: 'I create custom memory books for all my clients. CRAVScrapbook makes it so easy and professional.',
      avatar: '👰'
    },
    { 
      name: 'David L.', 
      role: 'Grandpa', 
      text: 'My grandkids love looking through the digital albums I make. The AI suggestions are incredibly helpful!',
      avatar: '👴'
    },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="min-h-screen bg-scrapbook-cream">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-scrapbook-washi/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-scrapbook-rose to-scrapbook-lavender flex items-center justify-center">
                <Book className="w-5 h-5 text-white" />
              </div>
              <span className="font-display text-2xl font-bold text-gray-800">CRAVScrapbook</span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <Link href="/templates" className="text-gray-600 hover:text-scrapbook-rose transition">Templates</Link>
              <Link href="/features" className="text-gray-600 hover:text-scrapbook-rose transition">Features</Link>
              <Link href="/pricing" className="text-gray-600 hover:text-scrapbook-rose transition">Pricing</Link>
              <Link href="/academy" className="text-gray-600 hover:text-scrapbook-rose transition">Academy</Link>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/login" className="text-gray-600 hover:text-scrapbook-rose transition font-medium">
                Sign In
              </Link>
              <Link href="/signup" className="btn-scrapbook text-sm">
                Start Creating
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-scrapbook-rose/20 rounded-full blur-2xl" />
        <div className="absolute top-40 right-20 w-32 h-32 bg-scrapbook-lavender/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-scrapbook-sky/20 rounded-full blur-2xl" />

        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-scrapbook-washi/50 text-sm font-medium text-gray-700 mb-6">
                <Sparkles className="w-4 h-4 text-accent-gold" />
                AI-Powered Memory Keeping
              </span>
              <h1 className="font-display text-5xl md:text-6xl font-bold text-gray-900 leading-tight mb-6">
                Your Memories,<br />
                <span className="text-gradient">Beautifully Preserved</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 font-clean">
                Create stunning digital scrapbooks with AI assistance. Preserve your precious moments 
                with professional templates, beautiful embellishments, and smart design suggestions.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/signup" className="btn-scrapbook flex items-center gap-2">
                  <Heart className="w-5 h-5" />
                  Start Creating Free
                </Link>
                <Link href="/demo" className="btn-gold flex items-center gap-2">
                  <Play className="w-5 h-5" />
                  Watch Demo
                </Link>
              </div>
              <div className="flex items-center gap-8 mt-8 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-scrapbook-sage" />
                  No credit card required
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-scrapbook-sage" />
                  5 free scrapbooks
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative">
                {/* Main Scrapbook Preview */}
                <div className="scrapbook-page aspect-[3/4] max-w-md mx-auto transform rotate-2 hover:rotate-0 transition-transform duration-500">
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 washi-tape bg-scrapbook-rose/70" />
                  <div className="grid grid-cols-2 gap-4 p-4">
                    <div className="polaroid col-span-2 transform -rotate-2">
                      <div className="aspect-video bg-gradient-to-br from-scrapbook-sky to-scrapbook-lavender rounded flex items-center justify-center">
                        <Camera className="w-12 h-12 text-white/50" />
                      </div>
                      <p className="font-handwritten text-center mt-4 text-lg">Summer 2024 ✨</p>
                    </div>
                    <div className="photo-frame transform rotate-3">
                      <div className="aspect-square bg-scrapbook-peach/50 rounded" />
                    </div>
                    <div className="photo-frame transform -rotate-2">
                      <div className="aspect-square bg-scrapbook-sage/50 rounded" />
                    </div>
                  </div>
                  <div className="absolute bottom-4 right-4 text-6xl animate-float">🌸</div>
                  <div className="absolute top-1/2 left-2 text-4xl">💕</div>
                </div>

                {/* Floating Elements */}
                <div className="absolute -top-8 -right-8 text-5xl animate-float" style={{ animationDelay: '1s' }}>📷</div>
                <div className="absolute -bottom-4 -left-4 text-4xl animate-float" style={{ animationDelay: '2s' }}>✂️</div>
                <div className="absolute top-1/4 -left-8 text-3xl animate-float" style={{ animationDelay: '0.5s' }}>🎀</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Create Magic
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Powerful tools designed for memory keepers of all skill levels
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card-scrapbook group hover:border-scrapbook-rose/30"
              >
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-display text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 font-clean">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Templates Preview */}
      <section className="py-20 bg-scrapbook-paper">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl font-bold text-gray-900 mb-4">
              Templates for Every Moment
            </h2>
            <p className="text-xl text-gray-600">
              Start with professionally designed layouts or create from scratch
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {templates.map((template, index) => (
              <motion.div
                key={template.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="group cursor-pointer"
              >
                <div className="aspect-square bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center justify-center group-hover:shadow-xl group-hover:scale-105 transition-all">
                  <span className="text-5xl mb-3">{template.image}</span>
                  <span className="text-xs uppercase tracking-wider text-gray-500">{template.category}</span>
                </div>
                <p className="text-center mt-3 font-clean font-medium text-gray-700">{template.name}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/templates" className="btn-gold inline-flex items-center gap-2">
              Browse All Templates
              <ChevronRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display text-4xl font-bold text-gray-900 mb-4">
              Loved by Memory Keepers
            </h2>
          </div>

          <motion.div
            key={currentTestimonial}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="card-scrapbook text-center py-12 px-8"
          >
            <div className="text-6xl mb-6">{testimonials[currentTestimonial].avatar}</div>
            <p className="font-handwritten text-2xl text-gray-700 mb-6">
              "{testimonials[currentTestimonial].text}"
            </p>
            <p className="font-display font-semibold text-gray-900">
              {testimonials[currentTestimonial].name}
            </p>
            <p className="text-gray-500 text-sm">
              {testimonials[currentTestimonial].role}
            </p>
          </motion.div>

          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentTestimonial ? 'bg-scrapbook-rose w-6' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 bg-scrapbook-paper">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl font-bold text-gray-900 mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-gray-600">
              Start free, upgrade when you are ready
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`card-scrapbook relative ${plan.popular ? 'ring-2 ring-accent-gold' : ''}`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-accent-gold text-white text-sm font-medium rounded-full flex items-center gap-1">
                    <Crown className="w-4 h-4" />
                    Most Popular
                  </div>
                )}
                <h3 className="font-display text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-gray-500 text-sm mb-4">{plan.description}</p>
                <div className="mb-6">
                  <span className="font-display text-4xl font-bold text-gray-900">
                    ${plan.price}
                  </span>
                  {plan.period !== 'forever' && (
                    <span className="text-gray-500">/{plan.period}</span>
                  )}
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-gray-600">
                      <Check className="w-5 h-5 text-scrapbook-sage flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <button className={plan.popular ? 'btn-gold w-full' : 'btn-scrapbook w-full'}>
                  {plan.cta}
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-scrapbook-rose via-scrapbook-lavender to-scrapbook-sky">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6">
              Start Preserving Your Memories Today
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Join thousands of memory keepers creating beautiful scrapbooks with CRAVScrapbook
            </p>
            <Link href="/signup" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-gray-900 rounded-full font-semibold text-lg hover:shadow-2xl hover:scale-105 transition-all">
              <Gift className="w-6 h-6" />
              Create Your First Scrapbook - Free
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-scrapbook-rose to-scrapbook-lavender flex items-center justify-center">
                  <Book className="w-5 h-5 text-white" />
                </div>
                <span className="font-display text-xl font-bold">CRAVScrapbook</span>
              </div>
              <p className="text-gray-400 text-sm">
                Part of the CR AudioViz AI creative ecosystem.<br />
                Your Story. Our Design.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><Link href="/features" className="hover:text-white transition">Features</Link></li>
                <li><Link href="/templates" className="hover:text-white transition">Templates</Link></li>
                <li><Link href="/pricing" className="hover:text-white transition">Pricing</Link></li>
                <li><Link href="/academy" className="hover:text-white transition">Academy</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><Link href="/about" className="hover:text-white transition">About</Link></li>
                <li><Link href="/blog" className="hover:text-white transition">Blog</Link></li>
                <li><Link href="/careers" className="hover:text-white transition">Careers</Link></li>
                <li><Link href="/contact" className="hover:text-white transition">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><Link href="/privacy" className="hover:text-white transition">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-white transition">Terms of Service</Link></li>
                <li><Link href="/cookies" className="hover:text-white transition">Cookie Policy</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400 text-sm">
            © 2025 CR AudioViz AI, LLC. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
