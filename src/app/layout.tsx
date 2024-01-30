import { type Metadata } from 'next'
import { GoogleAnalytics } from '@next/third-parties/google'

import { Providers } from '@/app/providers'
import { Layout } from '@/components/Layout'

import '@/styles/tailwind.css'

export const metadata: Metadata = {
  title: {
    template: '%s - James Swent',
    default: 'James Swent - Founder & CEO at Swent Consulting',
  },
  description:
    'I’m a tech entrepreneur and investor based in Cambridge, MA. I’m the founder and CEO of Swent Consulting, a product development and advisory firm building innovative software solutions. I also help out running systems at MIT’s Sandbox Innovation Fund Program.',
  alternates: {
    types: {
      'application/rss+xml': `${process.env.NEXT_PUBLIC_SITE_URL}/feed.xml`,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <body className="flex h-full bg-zinc-50 dark:bg-black">
        <Providers>
          <div className="flex w-full">
            <Layout>{children}</Layout>
          </div>
        </Providers>
      </body>
      <GoogleAnalytics gaId="G-N52DQJ522C" />
    </html>
  )
}
