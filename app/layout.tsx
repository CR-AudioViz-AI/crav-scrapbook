import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '@/components/AuthProvider'
import { Toaster } from '@/components/ui/Toaster'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'CRAVScrapbook - Ultimate Digital Scrapbooking Platform',
  description: 'Create beautiful digital scrapbooks with AI-powered tools. Preserve memories, tell stories, and share with loved ones.',
  keywords: 'scrapbooking, digital scrapbook, memory keeping, photo album, family memories, journaling',
  openGraph: {
    title: 'CRAVScrapbook - Your Story. Our Design.',
    description: 'The most powerful digital scrapbooking platform with AI assistance.',
    images: ['/og-image.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Dancing+Script:wght@400;500;600;700&family=Caveat:wght@400;500;600;700&family=Abril+Fatface&family=Quicksand:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className={`${inter.className} bg-scrapbook-cream min-h-screen`}>
        <AuthProvider>
          {children}
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  )
}
