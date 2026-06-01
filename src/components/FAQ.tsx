'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ChevronDown } from 'lucide-react';

interface FaqItem {
  q: string;
  a: string;
}

export default function FAQ() {
  const [search, setSearch] = useState('');
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs: FaqItem[] = [
    {
      q: 'What is spatial intelligence in Aether?',
      a: 'Aether represents all documents, databases, notes, and dashboards as modular spatial nodes on an infinite canvas. Instead of clicking between tabs, you orchestrate everything collaboratively on a high-performance visual layer.',
    },
    {
      q: 'How does the local-first sync engine work?',
      a: 'All data writes directly to your device local memory (indexedDB cache) with absolute zero latency. Changes sync silently in the background to our edge relays using custom CRDT vectors, maintaining seamless offline capability.',
    },
    {
      q: 'What is a zero-knowledge private key guarantee?',
      a: 'Aether initializes a client-side AES-256 cryptographic locker directly in your browser. All canvas nodes are encrypted locally before syncing to the cloud. We cannot access your assets, ever.',
    },
    {
      q: 'Can I import databases from Notion, Stripe, or Linear?',
      a: 'Yes. Our live integrations map structures, tasks, API metrics, and team databases directly onto Aether canvas nodes in real-time, letting you control multiple software stacks in one coordinate framework.',
    },
    {
      q: 'Does Aether support dark mode natively?',
      a: 'Yes, full dark mode is supported across all interactive canvas grids, graphs, logs, and sidebars. You can trigger it instantly using the sun/moon icon toggle in the main sticky navigation header.',
    },
  ];

  const filteredFaqs = faqs.filter(
    (faq) =>
      faq.q.toLowerCase().includes(search.toLowerCase()) ||
      faq.a.toLowerCase().includes(search.toLowerCase())
  );

  const handleToggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-24 bg-neutral-50 dark:bg-neutral-950 relative overflow-hidden select-none">
      <div className="max-w-4xl mx-auto px-6">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-400 mb-3">
            Frequently Asked Questions
          </h2>
          <p className="text-3xl sm:text-5xl font-black tracking-tight text-neutral-900 dark:text-white">
            Answers, clarified.
          </p>
        </div>

        {/* Real-time search bar */}
        <div className="relative flex items-center mb-10 max-w-xl mx-auto">
          <Search className="absolute left-4 text-neutral-400 dark:text-neutral-500" size={16} />
          <input
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setOpenIndex(null); // Close open panels on search to prevent indexing layout issues
            }}
            placeholder="Search FAQs..."
            className="w-full bg-white dark:bg-neutral-900 pl-11 pr-5 py-3.5 rounded-2xl border border-neutral-200 dark:border-neutral-800 text-xs sm:text-[13px] text-neutral-800 dark:text-neutral-200 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20 transition-all shadow-sm"
          />
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-4 max-w-3xl mx-auto">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-neutral-200/50 dark:border-neutral-800/80 bg-white dark:bg-neutral-900/60 overflow-hidden transition-all duration-300"
                >
                  <button
                    onClick={() => handleToggle(idx)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left cursor-pointer hover:bg-neutral-50/50 dark:hover:bg-neutral-800/20 transition-colors"
                  >
                    <span className="text-[13px] sm:text-[14px] font-bold text-neutral-900 dark:text-neutral-100 pr-4">
                      {faq.q}
                    </span>
                    <motion.span
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="text-neutral-400 shrink-0 inline-block"
                    >
                      <ChevronDown size={16} />
                    </motion.span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 pt-1 text-[13px] text-neutral-500 dark:text-neutral-400 leading-relaxed border-t border-neutral-100 dark:border-neutral-850/20">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })
          ) : (
            <div className="text-center py-10 text-neutral-400 dark:text-neutral-500 text-xs">
              No matching questions found for "{search}".
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
