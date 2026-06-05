'use client';

import Link from 'next/link';
import React, { useState } from 'react';

/* ─── Social icon SVGs ─────────────────────────────────────────── */
const TwitterX = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.258 5.631 5.906-5.631zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);
const Facebook = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);
const YouTube = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M23.495 6.205a3.007 3.007 0 0 0-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 0 0 .527 6.205a31.247 31.247 0 0 0-.522 5.805 31.247 31.247 0 0 0 .522 5.783 3.007 3.007 0 0 0 2.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 0 0 2.088-2.088 31.247 31.247 0 0 0 .5-5.783 31.247 31.247 0 0 0-.5-5.805zM9.609 15.601V8.408l6.264 3.602z" />
  </svg>
);
const LinkedIn = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);
const Instagram = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
  </svg>
);
const GitHub = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  </svg>
);

/* ─── Footer link columns ─────────────────────────────────────── */
const footerColumns = [
  {
    heading: 'Products',
    links: [
      'Aether CRM', 'Aether Flow', 'Aether Books', 'Aether Mail',
      'Aether HRM', 'Aether Projects', 'Aether Analytics', 'Aether Sign',
    ],
  },
  {
    heading: 'Platform',
    links: [
      'Aether One Suite', 'API Gateway', 'Developer Hub', 'Integration Mesh',
      'Marketplace', 'Aether Creator', 'Sandbox Environment', 'Mobile Apps',
    ],
  },
  {
    heading: 'Solutions',
    links: [
      'For Startups', 'For Enterprise', 'For Finance Teams', 'For Sales Teams',
      'For IT & DevOps', 'For HR Leaders', 'Case Studies', 'ROI Calculator',
    ],
  },
  {
    heading: 'Company',
    links: [
      'About Aether', 'Careers', 'Blog', 'Press & Media',
      'Partners', 'Investors', 'Sustainability', 'Contact Us',
    ],
  },
];

const socialLinks = [
  { label: 'X / Twitter', icon: <TwitterX />, href: '#', colorClass: 'bg-neutral-900 text-white border-neutral-900 dark:bg-white dark:text-neutral-950 dark:border-white hover:opacity-90' },
  { label: 'Facebook',    icon: <Facebook />, href: '#', colorClass: 'bg-[#1877F2] text-white border-[#1877F2] hover:bg-[#1877F2]/90' },
  { label: 'YouTube',     icon: <YouTube />,  href: '#', colorClass: 'bg-[#FF0000] text-white border-[#FF0000] hover:bg-[#FF0000]/90' },
  { label: 'LinkedIn',    icon: <LinkedIn />, href: '#', colorClass: 'bg-[#0A66C2] text-white border-[#0A66C2] hover:bg-[#0A66C2]/90' },
  { label: 'Instagram',   icon: <Instagram />,href: '#', colorClass: 'bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] text-white border-transparent hover:opacity-90' },
  { label: 'GitHub',      icon: <GitHub />,   href: '#', colorClass: 'bg-[#24292F] text-white border-[#24292F] dark:bg-neutral-800 dark:border-neutral-800 hover:opacity-90' },
];

const legalLinks = [
  'Contact Us', 'Security', 'Compliance', 'IPR Complaints',
  'Anti-spam Policy', 'Terms of Service', 'Privacy Policy',
  'Refund Policy', 'Trademark Policy', 'Cookie Policy',
  'GDPR Compliance', 'Abuse Policy',
];

export default function Footer() {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});

  const toggleSection = (heading: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [heading]: !prev[heading]
    }));
  };

  return (
    <footer className="relative mt-0 border-t border-neutral-200/50 dark:border-neutral-800/60 bg-white dark:bg-neutral-950 transition-colors duration-300">
      
      {/* Top gradient band */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent" />

      {/* ── Main columns ────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-12 sm:pt-16 pb-10">

        {/* Brand + columns grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-10">

          {/* Brand column */}
          <div className="col-span-1 md:col-span-3 lg:col-span-1 space-y-5 mb-4 md:mb-0">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center shadow-md shadow-indigo-600/20 group-hover:scale-105 transition-transform">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2L2 22h20L12 2zm0 4.5l6.5 12h-13L12 6.5z" fill="white" />
                </svg>
              </div>
              <span className="font-black text-lg tracking-tight text-neutral-900 dark:text-white">Aether Hub</span>
            </Link>

            <p className="text-[12.5px] text-neutral-500 dark:text-neutral-400 leading-relaxed max-w-[220px]">
              The unified enterprise operating suite for high-performance teams worldwide.
            </p>

            {/* Newsletter micro-form */}
            <div className="space-y-2">
              <p className="text-[11px] font-bold uppercase tracking-widest text-neutral-400 dark:text-neutral-500">Stay updated</p>
              <div className="flex gap-1.5">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1 min-w-0 px-3 py-2 rounded-xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-[12px] text-neutral-800 dark:text-neutral-200 placeholder-neutral-400 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20 transition-all"
                />
                <button className="px-3 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-[11px] font-bold cursor-pointer transition-colors shrink-0 active:scale-95">
                  →
                </button>
              </div>
            </div>
          </div>

          {/* Link columns — Desktop layout (hidden on mobile, visible on md/lg) */}
          {footerColumns.map((col) => (
            <div key={col.heading} className="hidden md:block space-y-4">
              <h4 className="text-[11px] font-extrabold uppercase tracking-widest text-neutral-900 dark:text-white">
                {col.heading}
              </h4>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-[12.5px] text-neutral-500 dark:text-neutral-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors leading-none"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Accordions layout — Mobile layout (visible below md) */}
        <div className="md:hidden mt-8 border-t border-neutral-200/50 dark:border-neutral-800/60 divide-y divide-neutral-200/50 dark:divide-neutral-800/60">
          {footerColumns.map((col) => {
            const isOpen = !!openSections[col.heading];
            return (
              <div key={col.heading} className="py-1">
                <button
                  onClick={() => toggleSection(col.heading)}
                  className="w-full py-4 flex items-center justify-between text-left cursor-pointer group"
                >
                  <span className="text-[12px] font-bold text-neutral-800 dark:text-neutral-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors uppercase tracking-wider">
                    {col.heading}
                  </span>
                  <svg
                    className={`w-4 h-4 text-neutral-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </button>
                
                {/* Expandable Links list */}
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    isOpen ? 'max-h-80 opacity-100 pb-4' : 'max-h-0 opacity-0'
                  }`}
                >
                  <ul className="space-y-3 pl-2">
                    {col.links.map((link) => (
                      <li key={link}>
                        <a
                          href="#"
                          className="text-[13px] text-neutral-550 dark:text-neutral-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                        >
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Divider ─────────────────────────────────────── */}
        <div className="mt-10 sm:mt-12 border-t border-neutral-200/50 dark:border-neutral-800/60" />

        {/* ── Social row ──────────────────────────────────── */}
        <div className="flex flex-col items-center justify-center gap-3 pt-8">
          <p className="text-[12px] text-neutral-500 dark:text-neutral-500 font-medium text-center">
            Follow us on social media
          </p>
          <div className="flex items-center justify-center gap-2.5">
            {socialLinks.map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                className={`w-9 h-9 rounded-xl flex items-center justify-center border transition-all duration-200 cursor-pointer shadow-sm active:scale-95 ${s.colorClass}`}
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* ── Legal links row ─────────────────────────────── */}
        <div className="mt-5 pt-5 border-t border-neutral-200/50 dark:border-neutral-800/40">
          <div className="flex flex-wrap justify-center gap-x-3 gap-y-2">
            {legalLinks.map((link, i) => (
              <React.Fragment key={link}>
                <a
                  href="#"
                  className="text-[11.5px] text-neutral-500 dark:text-neutral-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  {link}
                </a>
                {i < legalLinks.length - 1 && (
                  <span className="text-neutral-300 dark:text-neutral-700 text-[11px] select-none">|</span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>

      {/* ── Copyright bar (dark branded) ──────────────────── */}
      <div className="bg-neutral-900 dark:bg-neutral-950 border-t border-neutral-800/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 grid grid-cols-1 md:grid-cols-3 items-center gap-3">

          {/* Logo mark */}
          <div className="flex items-center justify-center md:justify-start gap-2.5">
            <span className="text-[11px] font-bold tracking-[0.2em] text-neutral-400 uppercase">AETHER</span>
          </div>

          {/* Copyright text */}
          <p className="text-[11.5px] text-neutral-500 text-center">
            © {new Date().getFullYear()}, Aether Corporation Pvt. Ltd. All Rights Reserved.
          </p>

          {/* Spacer to center-align the copyright text */}
          <div className="hidden md:block" />
        </div>
      </div>

    </footer>
  );
}
