'use client';

import React from 'react';

export default function TrustedBy() {
  const brands = [
    { name: 'Stripe', logo: <StripeLogo /> },
    { name: 'Vercel', logo: <VercelLogo /> },
    { name: 'Linear', logo: <LinearLogo /> },
    { name: 'Notion', logo: <NotionLogo /> },
    { name: 'Supabase', logo: <SupabaseLogo /> },
    { name: 'Retool', logo: <RetoolLogo /> },
    { name: 'Figma', logo: <FigmaLogo /> },
    { name: 'Raycast', logo: <RaycastLogo /> },
  ];

  // Double the list to make the marquee seamless
  const duplicatedBrands = [...brands, ...brands, ...brands];

  return (
    <section className="py-14 border-y border-neutral-200/40 dark:border-neutral-800/40 bg-white/30 dark:bg-neutral-950/20 backdrop-blur-[2px] overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-center text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-neutral-400 dark:text-neutral-500 mb-8">
          TRUSTED BY MODERN ENGINEERING & PRODUCT ORGANIZATIONS
        </p>

        {/* Infinite scrolling marquee wrapper */}
        <div className="relative flex items-center w-full overflow-hidden before:absolute before:left-0 before:top-0 before:bottom-0 before:w-20 sm:before:w-40 before:bg-gradient-to-r before:from-neutral-50 dark:before:from-neutral-950 before:to-transparent before:z-10 after:absolute after:right-0 after:top-0 after:bottom-0 after:w-20 sm:after:w-40 after:bg-gradient-to-l after:from-neutral-50 dark:after:from-neutral-950 after:to-transparent after:z-10">
          <div className="flex gap-16 sm:gap-24 items-center shrink-0 min-w-full animate-marquee">
            {duplicatedBrands.map((brand, i) => (
              <div
                key={`${brand.name}-${i}`}
                className="flex items-center justify-center text-neutral-400 dark:text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200 hover:scale-105 transition-all duration-200 shrink-0 cursor-pointer"
                title={brand.name}
              >
                {brand.logo}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// Brand SVG Helpers - clean mockups of modern tech logos
function StripeLogo() {
  return (
    <svg className="h-6 w-auto" viewBox="0 0 80 34" fill="currentColor">
      <path d="M4.2 13.9c0-3.6 2.7-5.1 6.5-5.1 2.3 0 4.6.6 6.1 1.4v-4c0-2.3-1.6-3.4-4.5-3.4-2.8 0-5.1.8-6.8 1.6V.3C7.4.1 9.3 0 11.7 0c6 0 9.8 2.8 9.8 9.2v16.1c-1.5.7-3.8 1.2-5.7 1.2-5.9.1-11.6-2.5-11.6-12.6zm11.7.9V13c-1.1-.6-2.5-1-3.9-1-2.2 0-3.6.9-3.6 2.7 0 1.9 1.4 2.8 3.8 2.8 1.4 0 2.8-.3 3.7-.7zm10.7-3.6c0-3 2.1-4.7 5.7-4.7 1.9 0 3.3.4 4.1.8v8c-.9-.4-2.2-.7-3.8-.7-3.6 0-6 1.7-6 4.6v6.1h-4.8V6.5h4.8v4.7zm15.7-5.4h4.9v21h-4.9V5.8zm2.4-5.6c1.6 0 2.9 1.3 2.9 2.8s-1.3 2.9-2.9 2.9c-1.6 0-2.8-1.3-2.8-2.9S43.1.2 44.7.2zm11.7 5.6h4.8v4.5c1.4-3.3 4.2-4.9 7.8-4.9 5.3 0 8.7 3.5 8.7 9v12.4H73V14.7c0-3.1-1.7-4.7-4.6-4.7-2.1 0-3.8.9-4.8 2.1v13.9H58.8V5.8z" />
    </svg>
  );
}

function VercelLogo() {
  return (
    <svg className="h-5 w-auto" viewBox="0 0 116 100" fill="currentColor">
      <path fillRule="evenodd" clipRule="evenodd" d="M57.5 0L115 100H0L57.5 0Z" />
    </svg>
  );
}

function LinearLogo() {
  return (
    <svg className="h-5 w-auto" viewBox="0 0 20 20" fill="currentColor">
      <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm2.8 10.3l-3.3 2.1a1 1 0 01-1 0l-3.3-2.1a1 1 0 01-.5-.8V7.5a1 1 0 01.5-.8l3.3-2.1a1 1 0 011 0l3.3 2.1a1 1 0 01.5.8v4.1a1 1 0 01-.5.8z" />
    </svg>
  );
}

function NotionLogo() {
  return (
    <svg className="h-6 w-auto" viewBox="0 0 30 30" fill="currentColor">
      <path d="M22.5 4.5H7.5A3 3 0 004.5 7.5v15a3 3 0 003 3h15a3 3 0 003-3v-15a3 3 0 00-3-3zm-10.5 15V9.8c0-.4.3-.8.8-.8.3 0 .5.1.7.3l4.5 4.9V9.8c0-.4.3-.8.8-.8.4 0 .7.3.7.8v9.7c0 .4-.3.8-.8.8-.3 0-.5-.1-.7-.3L13.5 15v4.5c0 .4-.3.8-.8.8-.4 0-.7-.3-.7-.8z" />
    </svg>
  );
}

function SupabaseLogo() {
  return (
    <svg className="h-5 w-auto" viewBox="0 0 92 100" fill="currentColor">
      <path d="M47.7 0c-1.5 0-2.8 1.1-3 2.6L41.3 28h27.9c1.9 0 3.3 1.8 2.8 3.6L55.8 88.3C54.6 92.5 48.4 92.3 47.5 88L41.3 58H16.6C12.3 58 10 52.8 13 49.7L45 2.6c.7-1.1 1.9-1.8 3.2-1.8h-.5z" />
    </svg>
  );
}

function RetoolLogo() {
  return (
    <svg className="h-5 w-auto" viewBox="0 0 20 20" fill="currentColor">
      <path d="M3 3h14v3H3zm0 5h14v3H3zm0 5h14v4H3z" />
    </svg>
  );
}

function FigmaLogo() {
  return (
    <svg className="h-6 w-auto" viewBox="0 0 32 32" fill="currentColor">
      <path d="M12 2a4 4 0 00-4 4 4 4 0 004 4h4V6a4 4 0 00-4-4zm4 8H12a4 4 0 00-4 4 4 4 0 004 4h4v-8zm0 8h-4a4 4 0 000 8h4v-8zm4-12a4 4 0 00-4 4v4h4a4 4 0 004-4 4 4 0 00-4-4zm0 8a4 4 0 00-4 4v4a4 4 0 004-4v-4z" />
    </svg>
  );
}

function RaycastLogo() {
  return (
    <svg className="h-5 w-auto" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" clipRule="evenodd" d="M10 2a8 8 0 100 16 8 8 0 000-16zM6 8a2 2 0 114 0v4a2 2 0 11-4 0V8zm8 0a2 2 0 10-4 0v4a2 2 0 104 0V8z" />
    </svg>
  );
}
