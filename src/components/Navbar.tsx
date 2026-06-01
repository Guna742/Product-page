'use client';

import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon, ArrowRight } from 'lucide-react';
import { useTheme } from './ThemeContext';

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Hook into scroll height to add custom blur and shadow effects on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Butter-smooth progress bar at the top of the viewport
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 25,
    restDelta: 0.001,
  });

  const menuItems = [
    { label: 'Features', href: '#features' },
    { label: 'Showcase', href: '#showcase' },
    { label: 'Timeline', href: '#timeline' },
    { label: 'Impact', href: '#impact' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'FAQ', href: '#faq' },
  ];

  return (
    <>
      {/* Dynamic Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-indigo-600 dark:bg-indigo-500 z-[100] origin-left"
        style={{ scaleX }}
      />

      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'backdrop-blur-md bg-white/70 dark:bg-neutral-950/70 border-b border-neutral-200/40 dark:border-neutral-800/40 shadow-sm'
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center shadow-md shadow-indigo-600/20 group-hover:scale-105 transition-transform duration-200">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 2L2 22h20L12 2zm0 4.5l6.5 12h-13L12 6.5z"
                  fill="white"
                />
              </svg>
            </div>
            <span className="font-semibold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-neutral-900 via-neutral-800 to-neutral-700 dark:from-neutral-100 dark:via-neutral-200 dark:to-neutral-300">
              Aether
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {menuItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-[14px] font-medium text-neutral-600 hover:text-indigo-600 dark:text-neutral-300 dark:hover:text-indigo-400 transition-colors duration-200"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Action Area */}
          <div className="hidden md:flex items-center gap-4">
            {/* Theme Selector Toggle */}
            <button
              onClick={toggleTheme}
              className="w-10 h-10 rounded-xl flex items-center justify-center hover:bg-neutral-100 dark:hover:bg-neutral-900 border border-neutral-200/50 dark:border-neutral-800/50 transition-colors cursor-pointer text-neutral-700 dark:text-neutral-300"
              aria-label="Toggle Theme"
            >
              <AnimatePresence mode="wait" initial={false}>
                {theme === 'dark' ? (
                  <motion.div
                    key="sun"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Sun size={18} className="text-yellow-500" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="moon"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Moon size={18} className="text-indigo-600" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>

            <a
              href="#pricing"
              className="text-[14px] font-semibold text-neutral-800 dark:text-neutral-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors px-3 py-2"
            >
              Log In
            </a>

            <a
              href="#pricing"
              className="relative inline-flex items-center gap-1.5 px-5 py-2.5 text-[14px] font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-sm hover:shadow-md hover:shadow-indigo-600/10 transition-all duration-200 group overflow-hidden"
            >
              <span>Get Started</span>
              <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform duration-200" />
            </a>
          </div>

          {/* Mobile Buttons */}
          <div className="flex md:hidden items-center gap-3">
            <button
              onClick={toggleTheme}
              className="w-10 h-10 rounded-xl flex items-center justify-center hover:bg-neutral-100 dark:hover:bg-neutral-900 border border-neutral-200/50 dark:border-neutral-800/50 transition-colors text-neutral-700 dark:text-neutral-300"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? <Sun size={18} className="text-yellow-500" /> : <Moon size={18} className="text-indigo-600" />}
            </button>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="w-10 h-10 rounded-xl flex items-center justify-center hover:bg-neutral-100 dark:hover:bg-neutral-900 border border-neutral-200/50 dark:border-neutral-800/50 transition-colors text-neutral-700 dark:text-neutral-300"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="md:hidden border-b border-neutral-200/50 dark:border-neutral-800/50 bg-white/95 dark:bg-neutral-950/95 backdrop-blur-md overflow-hidden"
            >
              <div className="px-6 py-6 flex flex-col gap-5">
                {menuItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="text-base font-medium text-neutral-700 hover:text-indigo-600 dark:text-neutral-300 dark:hover:text-indigo-400 transition-colors duration-150 py-1"
                  >
                    {item.label}
                  </a>
                ))}
                <div className="h-[1px] bg-neutral-200/50 dark:border-neutral-800/50 my-2" />
                <div className="flex flex-col gap-3">
                  <a
                    href="#pricing"
                    onClick={() => setIsOpen(false)}
                    className="flex h-11 items-center justify-center font-semibold text-neutral-800 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-900 rounded-xl transition-colors"
                  >
                    Log In
                  </a>
                  <a
                    href="#pricing"
                    onClick={() => setIsOpen(false)}
                    className="flex h-11 items-center justify-center gap-1.5 font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-sm transition-all duration-150"
                  >
                    <span>Get Started</span>
                    <ArrowRight size={15} />
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
