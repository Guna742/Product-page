'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Quote } from 'lucide-react';

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
}

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1: left, 1: right
  const [isPlaying, setIsPlaying] = useState(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const testimonials: Testimonial[] = [
    {
      quote: "Aether transformed how our system integrations compile. We consolidated four disconnected dashboard databases into a single, high-fidelity spatial canvas with 0ms sync latency.",
      name: "Marcus Aurelius",
      role: "VP of Engineering",
      company: "Vercel",
      avatar: "M",
    },
    {
      quote: "The response speed of Aether's local-first sync schema is unparalleled. Operating canvas blocks feels fluid and alive, completely removing traditional loading friction.",
      name: "Helena Vance",
      role: "Chief Design Officer",
      company: "Stripe",
      avatar: "H",
    },
    {
      quote: "Shortcuts and Command-K navigation are key to our design philosophy. Aether extends this visual keyboard control to the entire database layer with pure sophistication.",
      name: "Cyrus Spartan",
      role: "Head of Product",
      company: "Linear",
      avatar: "C",
    },
  ];

  // Auto-play control logic
  useEffect(() => {
    if (!isPlaying) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      handleNext();
    }, 6000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [index, isPlaying]);

  const handleNext = () => {
    setDirection(1);
    setIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setDirection(-1);
    setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Slide variants for directional sliding feel
  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 80 : -80,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 80 : -80,
      opacity: 0,
    }),
  };

  return (
    <section id="testimonials" className="py-24 bg-neutral-50 dark:bg-neutral-950 relative overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-400 mb-3">
            Customer Testimonials
          </h2>
          <p className="text-3xl sm:text-5xl font-black tracking-tight text-neutral-900 dark:text-white">
            Endorsed by engineering leaders.
          </p>
        </div>

        {/* Testimonials Slider Frame */}
        <div
          onMouseEnter={() => setIsPlaying(false)}
          onMouseLeave={() => setIsPlaying(true)}
          className="w-full max-w-4xl mx-auto rounded-3xl border border-neutral-200/50 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-8 sm:p-12 shadow-xl relative min-h-[350px] sm:min-h-[300px] flex flex-col justify-between"
        >
          {/* Quote mark decorator */}
          <div className="absolute top-8 right-8 text-neutral-100 dark:text-neutral-800/80 pointer-events-none">
            <Quote size={80} className="fill-current" />
          </div>

          <div className="relative overflow-hidden flex-1 flex items-center min-h-[160px] sm:min-h-[120px]">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={index}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="w-full"
              >
                <blockquote className="text-lg sm:text-xl md:text-2xl text-neutral-800 dark:text-neutral-200 font-medium leading-relaxed max-w-3xl">
                  "{testimonials[index].quote}"
                </blockquote>

                <div className="mt-8 flex items-center gap-4">
                  {/* Monogram/Avatar mockup */}
                  <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-indigo-500 to-indigo-600 flex items-center justify-center font-bold text-white shadow-md">
                    {testimonials[index].avatar}
                  </div>
                  <div>
                    <cite className="not-italic font-bold text-neutral-950 dark:text-white text-[15px] block">
                      {testimonials[index].name}
                    </cite>
                    <span className="text-xs text-neutral-500 dark:text-neutral-400 font-medium block mt-0.5">
                      {testimonials[index].role} at{' '}
                      <span className="text-indigo-600 dark:text-indigo-400 font-bold">
                        {testimonials[index].company}
                      </span>
                    </span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Controls Row */}
          <div className="mt-10 pt-6 border-t border-neutral-100 dark:border-neutral-800/60 flex items-center justify-between z-10">
            {/* Carousel dots indicators */}
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setDirection(i > index ? 1 : -1);
                    setIndex(i);
                  }}
                  className={`h-2 rounded-full cursor-pointer transition-all duration-200 ${
                    i === index ? 'w-6 bg-indigo-600 dark:bg-indigo-500' : 'w-2 bg-neutral-300 dark:bg-neutral-800'
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>

            {/* Prev / Next buttons */}
            <div className="flex gap-3">
              <button
                onClick={handlePrev}
                className="w-10 h-10 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Previous Review"
              >
                <ArrowLeft size={16} />
              </button>
              <button
                onClick={handleNext}
                className="w-10 h-10 rounded-xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 text-neutral-600 dark:text-neutral-400 hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Next Review"
              >
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
