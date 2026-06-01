'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, MessageCircle, Heart, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;

    // Trigger high-performance canvas confetti celebration
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.85 },
      colors: ['#6366f1', '#a855f7', '#10b981'],
    });

    setSubscribed(true);
    setEmail('');
  };

  const footerLinks = [
    {
      title: 'Product',
      links: [
        { label: 'Core Features', href: '#features' },
        { label: 'Interactive Showcase', href: '#showcase' },
        { label: 'System Process', href: '#timeline' },
        { label: 'Pricing Tiers', href: '#pricing' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { label: 'API Reference', href: '#' },
        { label: 'Documentation', href: '#' },
        { label: 'Operational Status', href: '#' },
        { label: 'Release Notes', href: '#' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'About Aether', href: '#' },
        { label: 'Privacy Policy', href: '#' },
        { label: 'Terms of Service', href: '#' },
        { label: 'Security Protocols', href: '#' },
      ],
    },
  ];

  return (
    <footer className="relative bg-white dark:bg-neutral-900 border-t border-neutral-200/50 dark:border-neutral-800/80 overflow-hidden select-none">
      
      {/* FINAL CTA PANEL CONTAINER */}
      <div className="max-w-7xl mx-auto px-6 py-20 sm:py-28 relative z-10 border-b border-neutral-100 dark:border-neutral-850/20">
        
        {/* Glow meshes background */}
        <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-indigo-500/5 blur-[120px] pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center flex flex-col items-center gap-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200/50 dark:bg-indigo-950/30 dark:border-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-xs font-semibold tracking-wide uppercase shadow-sm shadow-indigo-100/10"
          >
            <Sparkles size={12} className="animate-pulse" />
            <span>Ready for spatial intelligence?</span>
          </motion.div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-neutral-900 dark:text-white tracking-tight leading-[1.1]">
            Elevate your team's velocity today.
          </h2>
          
          <p className="max-w-xl text-neutral-500 dark:text-neutral-400 text-sm sm:text-base leading-relaxed">
            Consolidate your stack. Connect zero-latency data structures. Experience the next era of collaborative database control.
          </p>

          {/* Email Subscription Capture Form */}
          <div className="w-full max-w-md mt-6">
            {subscribed ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-emerald-50 border border-emerald-200/80 dark:bg-emerald-950/20 dark:border-emerald-900/30 rounded-2xl text-emerald-600 dark:text-emerald-400 font-bold text-xs sm:text-[13px] flex items-center justify-center gap-2"
              >
                <span>✓ Welcome to the loop! We will be in touch shortly.</span>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 w-full">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your work email..."
                  required
                  className="flex-1 bg-neutral-50 dark:bg-neutral-950 px-5 py-3.5 rounded-2xl border border-neutral-200 dark:border-neutral-800 text-xs sm:text-[13px] text-neutral-800 dark:text-neutral-200 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20 transition-all shadow-sm"
                />
                <button
                  type="submit"
                  className="px-6 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-[13px] rounded-2xl shadow-lg hover:shadow-xl hover:shadow-indigo-600/10 hover:scale-102 transition-all duration-150 flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
                >
                  <span>Request Early Access</span>
                  <ArrowRight size={14} />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* SITEMAP LINKS AREA */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-2 md:grid-cols-6 gap-10">
        
        {/* Brand Description Column */}
        <div className="col-span-2 space-y-4">
          <a href="#" className="flex items-center gap-2 group w-fit">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center shadow-md shadow-indigo-600/20">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 22h20L12 2zm0 4.5l6.5 12h-13L12 6.5z" fill="white" />
              </svg>
            </div>
            <span className="font-semibold text-lg tracking-tight text-neutral-900 dark:text-white">Aether</span>
          </a>
          <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed max-w-xs">
            The spatial intelligence layer for high-performance squads. Built for frictionless database engineering.
          </p>
        </div>

        {/* Sitemap lists */}
        {footerLinks.map((col) => (
          <div key={col.title} className="space-y-4">
            <h4 className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
              {col.title}
            </h4>
            <ul className="space-y-2.5">
              {col.links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-xs font-semibold text-neutral-500 hover:text-indigo-600 dark:text-neutral-400 dark:hover:text-indigo-400 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Small contact item columns */}
        <div className="space-y-4">
          <h4 className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
            Contact
          </h4>
          <ul className="space-y-2.5">
            <li>
              <a
                href="mailto:operations@aether-spatial.com"
                className="text-xs font-semibold text-neutral-500 hover:text-indigo-600 dark:text-neutral-400 dark:hover:text-indigo-400 transition-colors break-words block"
              >
                ops@aether.ai
              </a>
            </li>
            <li className="text-xs text-neutral-400">
              San Francisco, CA
            </li>
          </ul>
        </div>
      </div>

      {/* FOOTER METADATA & COPYRIGHT */}
      <div className="bg-neutral-50 dark:bg-neutral-950/60 py-6 border-t border-neutral-100 dark:border-neutral-850/10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-400">
          
          <div className="flex items-center gap-1">
            <span>© 2026 Aether, Inc. Designed for elite operations with</span>
            <Heart size={10} className="fill-current text-rose-500" />
          </div>

          {/* Social Badges */}
          <div className="flex gap-4">
            <a
              href="#"
              className="text-neutral-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
              aria-label="Aether Twitter Account"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a
              href="#"
              className="text-neutral-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
              aria-label="Aether GitHub Repository"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.577.688.479C19.138 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
              </svg>
            </a>
            <a
              href="#"
              className="text-neutral-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
              aria-label="Aether Discord Server"
            >
              <MessageCircle size={14} />
            </a>
          </div>

        </div>
      </div>

    </footer>
  );
}
