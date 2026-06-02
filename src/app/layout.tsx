import type { Metadata, Viewport } from "next";
import { Open_Sans, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeContext";

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  viewportFit: 'cover',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#030303' },
  ],
};

export const metadata: Metadata = {
  title: "Aether | The Spatial AI Workspace for High-Performance Teams",
  description: "Aether integrates spatial intelligence, adaptive canvases, and custom AI orchestration into a single enterprise-ready workflow engine. Inspired by Google, Apple, Stripe, Linear, and Notion.",
  keywords: ["SaaS", "Productivity", "AI Workspace", "Spatial AI", "Spatial Intelligence", "Next.js", "TailwindCSS"],
  authors: [{ name: "Aether Team" }],
  openGraph: {
    title: "Aether | Spatial AI Workspace",
    description: "The spatial intelligence layer for high-performance teams.",
    type: "website",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${openSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{
          __html: `
            (function() {
              try {
                var savedTheme = localStorage.getItem('aether-theme');
                if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark');
                  document.documentElement.style.colorScheme = 'dark';
                } else {
                  document.documentElement.classList.remove('dark');
                  document.documentElement.style.colorScheme = 'light';
                }
              } catch (e) {}
            })()
          `
        }} />
      </head>
      <body className="min-h-full flex flex-col bg-neutral-50 text-neutral-900 dark:bg-neutral-950 dark:text-neutral-50 transition-colors duration-300">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
