import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Eden AI — Interactive One-Pager Poster',
  description: 'An interactive React component showcasing Eden AI\'s unified API platform',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

