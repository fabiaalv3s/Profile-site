import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Portfolio',
  description: 'Portfolio profissional',
}

// Root layout - next-intl handles the HTML structure in [locale]/layout.tsx
// This layout is required by Next.js but should be minimal
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
