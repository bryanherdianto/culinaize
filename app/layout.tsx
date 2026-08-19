import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';

import { Providers } from '@/components/providers';

import './globals.css';

const SITE_URL = 'https://culinaize.vercel.app';
const DESCRIPTION =
  'CulinAIze is a free AI cooking assistant. Tell it what is in your kitchen, what you cannot eat and how long you have got — or send a photo — and get a recipe grounded in real recipe data.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'CulinAIze — Cook with what you already have',
    template: '%s · CulinAIze',
  },
  description: DESCRIPTION,
  keywords: [
    'AI cooking assistant',
    'recipe generator',
    'cook with what you have',
    'dietary restrictions',
    'ingredient substitutions',
  ],
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    type: 'website',
    url: SITE_URL,
    siteName: 'CulinAIze',
    title: 'CulinAIze — Cook with what you already have',
    description: DESCRIPTION,
    images: [{ url: '/image/food.jpg', width: 1200, height: 630, alt: 'CulinAIze' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CulinAIze — Cook with what you already have',
    description: DESCRIPTION,
    images: ['/image/food.jpg'],
  },
};

export const viewport = {
  maximumScale: 1, // Disable auto-zoom on mobile Safari
};

const geist = Geist({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-geist',
});

const geistMono = Geist_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-geist-mono',
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html
        lang="en"
        suppressHydrationWarning
        className={`${geist.variable} ${geistMono.variable}`}
      >
        <body className="antialiased">
          <Providers>{children}</Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
