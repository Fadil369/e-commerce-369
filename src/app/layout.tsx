import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'E-Commerce 369 - Premium Online Store',
  description: 'A modern, high-quality e-commerce platform built with Next.js and TypeScript',
  keywords: ['e-commerce', 'online store', 'shopping', 'retail'],
  authors: [{ name: 'Mohamed El Fadil Abuagla' }],
  creator: 'Mohamed El Fadil Abuagla',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <div className="min-h-screen flex flex-col">
          {children}
        </div>
      </body>
    </html>
  )
}