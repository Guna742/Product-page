'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { ArrowRight, Play, Terminal, Cpu, Sparkles, Activity } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll inside container to run smooth 3D tilting/scaling on the workspace mockup
  const { scrollY } = useScroll();
  
  // Scale down and rotate mockup slightly as user scrolls, creating a beautiful depth effect
  const scale = useTransform(scrollY, [0, 600], [1, 0.92]);
  const rotateX = useTransform(scrollY, [0, 600], [15, 0]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);
  const yTranslate = useTransform(scrollY, [0, 600], [0, 50]);

  // Spring-smoothed mouse coordinate trackers for 3D Perspective Hover Parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 120, damping: 22 });
  const springY = useSpring(mouseY, { stiffness: 120, damping: 22 });

  // Map coordinate range to tilt range (-10 to 10 degrees)
  const hoverRotateX = useTransform(springY, [-0.5, 0.5], [10, -10]);
  const hoverRotateY = useTransform(springX, [-0.5, 0.5], [-10, 10]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const xVal = e.clientX - rect.left;
    const yVal = e.clientY - rect.top;

    mouseX.set(xVal / width - 0.5);
    mouseY.set(yVal / height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const handleStartConfetti = () => {
    confetti({
      particleCount: 120,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#6366f1', '#a855f7', '#3b82f6', '#10b981'],
    });
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen pt-32 pb-20 flex flex-col items-center justify-start overflow-hidden bg-grid-pattern bg-neutral-50 dark:bg-neutral-950 px-6"
    >
      {/* Immersive radial gradient mesh */}
      <div className="absolute inset-0 bg-radial-gradient pointer-events-none" />

      {/* Decorative floating blurred spots */}
      <div className="absolute top-[20%] left-[10%] w-72 h-72 rounded-full bg-indigo-500/10 blur-[120px] dark:bg-indigo-500/5 pointer-events-none" />
      <div className="absolute top-[30%] right-[10%] w-80 h-80 rounded-full bg-purple-500/10 blur-[130px] dark:bg-purple-500/5 pointer-events-none" />

      <div className="max-w-5xl mx-auto text-center z-10 flex flex-col items-center">
        {/* Micro-pill Badge */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200/50 dark:bg-indigo-950/30 dark:border-indigo-900/30 text-indigo-600 dark:text-indigo-400 text-xs font-semibold tracking-wide uppercase mb-6 shadow-sm shadow-indigo-100/10"
        >
          <Sparkles size={12} className="animate-pulse" />
          <span>Aether spatial intelligence is live</span>
        </motion.div>

        {/* Large Premium Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-neutral-900 dark:text-white leading-[1.1] max-w-4xl"
        >
          The spatial intelligence layer for{' '}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-violet-500 to-indigo-700 dark:from-indigo-400 dark:via-purple-400 dark:to-indigo-500 text-glow">
            high-performance
          </span>{' '}
          teams.
        </motion.h1>

        {/* Supporting Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 text-base sm:text-lg lg:text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl leading-relaxed font-normal"
        >
          Aether integrates real-time spatial canvas layouts, local-first database sync, and deep custom AI agents into a single, beautifully responsive workflow canvas.
        </motion.p>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
        >
          <button
            onClick={handleStartConfetti}
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-[15px] shadow-lg shadow-indigo-600/20 hover:shadow-xl hover:shadow-indigo-600/35 transition-all duration-200 inline-flex items-center justify-center gap-2 group cursor-pointer"
          >
            <span>Start Deploying Free</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
          </button>
          
          <a
            href="#showcase"
            className="w-full sm:w-auto px-8 py-4 rounded-2xl border border-neutral-300 dark:border-neutral-800 text-neutral-700 dark:text-neutral-300 font-semibold text-[15px] bg-white/40 dark:bg-neutral-900/40 backdrop-blur-sm hover:bg-neutral-100 dark:hover:bg-neutral-900 hover:border-neutral-400 dark:hover:border-neutral-700 transition-all duration-200 inline-flex items-center justify-center gap-2"
          >
            <Play size={14} className="fill-current text-indigo-600 dark:text-indigo-400" />
            <span>Interactive Demo</span>
          </a>
        </motion.div>
      </div>

      {/* Floating Spatial Micro-Widgets */}
      <div className="hidden lg:block absolute inset-0 w-full h-full pointer-events-none overflow-hidden max-w-7xl mx-auto">
        {/* Floating Card A */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="absolute top-[28%] left-[2%] w-[210px] p-4 rounded-2xl border border-neutral-200/60 bg-white/70 dark:border-neutral-800/60 dark:bg-neutral-900/70 backdrop-blur-md shadow-lg animate-float"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-semibold tracking-wider text-neutral-400 uppercase">Active Agent</span>
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
          </div>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-950/40 flex items-center justify-center text-indigo-600">
              <Cpu size={16} />
            </div>
            <div>
              <p className="text-[13px] font-bold text-neutral-900 dark:text-white">Orchestrator v2</p>
              <p className="text-[10px] text-neutral-500">Syncing database...</p>
            </div>
          </div>
        </motion.div>

        {/* Floating Card B */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          style={{ y: yTranslate }}
          className="absolute top-[32%] right-[2%] w-[240px] p-4 rounded-2xl border border-neutral-200/60 bg-white/70 dark:border-neutral-800/60 dark:bg-neutral-900/70 backdrop-blur-md shadow-lg"
        >
          <div className="flex items-center gap-2 mb-2 border-b border-neutral-100 dark:border-neutral-800/50 pb-2">
            <Terminal size={14} className="text-violet-500" />
            <span className="text-[12px] font-bold text-neutral-800 dark:text-neutral-200">Terminal Log</span>
          </div>
          <div className="font-mono text-[10px] text-neutral-500 dark:text-neutral-400 space-y-1">
            <p className="text-emerald-500 dark:text-emerald-400">✓ Compiled successfully</p>
            <p>→ Syncing local indexedDB...</p>
            <p className="text-indigo-500">λ 99.98% pipeline score</p>
          </div>
        </motion.div>

        {/* Floating Card C */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="absolute bottom-[24%] left-[4%] w-[190px] p-4 rounded-2xl border border-neutral-200/60 bg-white/70 dark:border-neutral-800/60 dark:bg-neutral-900/70 backdrop-blur-md shadow-lg animate-float"
          style={{ animationDelay: '1.5s' }}
        >
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-pink-50 dark:bg-pink-950/40 flex items-center justify-center text-pink-600">
              <Activity size={16} />
            </div>
            <div>
              <p className="text-[10px] font-medium text-neutral-400 uppercase">Network</p>
              <p className="text-15px font-extrabold text-neutral-900 dark:text-white">12.4 ms avg</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Main 3D Perspective Workspace Mockup */}
      <div className="mt-16 sm:mt-24 w-full max-w-5xl [perspective:1000px] select-none">
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          style={{ scale, rotateX }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="w-full rounded-3xl border border-neutral-200/60 dark:border-neutral-800/80 bg-white dark:bg-neutral-900 shadow-2xl p-3 sm:p-4 md:p-6 cursor-crosshair transition-shadow duration-300 hover:shadow-indigo-500/10"
        >
          <motion.div
            style={{ rotateX: hoverRotateX, rotateY: hoverRotateY, transformStyle: 'preserve-3d' }}
            className="w-full h-full"
          >
            <div className="relative aspect-[16/10] rounded-2xl overflow-hidden border border-neutral-100 dark:border-neutral-800/80 bg-neutral-950 flex flex-col text-neutral-300">
              {/* Mock Window Bar */}
              <div className="h-10 border-b border-neutral-800 bg-neutral-900 px-4 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                </div>
                <div className="text-[11px] text-neutral-500 font-medium font-mono select-none">
                  aether-cloud://canvas/global-workspace
                </div>
                <div className="w-14" />
              </div>

              {/* Canvas Interface Content */}
              <div className="flex-1 bg-neutral-950 relative overflow-hidden flex">
                {/* Sidebar */}
                <div className="w-48 border-r border-neutral-900 bg-neutral-950/70 p-4 flex flex-col gap-5 select-none text-[12px] font-semibold text-neutral-400">
                  <div className="space-y-2">
                    <p className="text-[10px] uppercase text-neutral-600 font-extrabold tracking-wider">Workspaces</p>
                    <div className="flex items-center gap-2 p-1.5 rounded-lg bg-neutral-900 text-white">
                      <span className="w-2 h-2 rounded bg-indigo-500" />
                      <span>Spacial Engine</span>
                    </div>
                    <div className="flex items-center gap-2 p-1.5 hover:text-neutral-200">
                      <span className="w-2 h-2 rounded bg-neutral-700" />
                      <span>Agent Config</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-[10px] uppercase text-neutral-600 font-extrabold tracking-wider">Models</p>
                    <div className="flex items-center gap-2 p-1.5 text-neutral-400">
                      <span>↳ Aether-15B</span>
                    </div>
                    <div className="flex items-center gap-2 p-1.5 text-indigo-400">
                      <span>↳ Claude-3.5-Sonnet</span>
                    </div>
                  </div>
                </div>

                {/* Simulated Node Canvas Grid */}
                <div className="flex-1 bg-neutral-950/90 bg-[radial-gradient(#1f1f1f_1.2px,transparent_1.2px)] [background-size:24px_24px] relative p-6 flex flex-col justify-between">
                  
                  {/* Canvas node 1 */}
                  <div className="absolute top-[18%] left-[8%] w-[210px] bg-neutral-900 border border-neutral-800 rounded-xl p-4 shadow-xl">
                    <div className="flex items-center gap-2 text-indigo-400 mb-1.5">
                      <Cpu size={14} />
                      <span className="text-[11px] font-bold uppercase tracking-wider">LLM Prompt Engine</span>
                    </div>
                    <h4 className="text-[13px] font-bold text-white mb-1">Synthesizer Node</h4>
                    <p className="text-[10px] text-neutral-400 leading-normal">Processes workspace items, mapping logic vectors automatically.</p>
                  </div>

                  {/* Connector line graphic */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none">
                    <defs>
                      <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#6366f1" stopOpacity="0.9" />
                        <stop offset="100%" stopColor="#d946ef" stopOpacity="0.9" />
                      </linearGradient>
                    </defs>
                    {/* Visual curves connection nodes - animated flowing streams */}
                    <path d="M 280 150 Q 380 180, 480 230" fill="none" stroke="url(#grad1)" strokeWidth="1.8" className="opacity-40" />
                    <path d="M 280 150 Q 380 180, 480 230" fill="none" stroke="url(#grad1)" strokeWidth="1.8" className="animate-dash" />

                    <path d="M 480 230 Q 560 300, 680 260" fill="none" stroke="#6366f1" strokeWidth="1.8" className="opacity-40" />
                    <path d="M 480 230 Q 560 300, 680 260" fill="none" stroke="#6366f1" strokeWidth="1.8" className="animate-dash" />
                  </svg>

                  {/* Canvas node 2 */}
                  <div className="absolute top-[48%] left-[45%] w-[190px] bg-neutral-900 border border-neutral-800 rounded-xl p-4 shadow-xl">
                    <div className="flex items-center gap-2 text-fuchsia-400 mb-1.5">
                      <Sparkles size={14} />
                      <span className="text-[11px] font-bold uppercase tracking-wider">Transformation</span>
                    </div>
                    <h4 className="text-[13px] font-bold text-white mb-1">Vector DB Router</h4>
                    <p className="text-[10px] text-neutral-400 leading-normal">Matches canvas entities dynamically into structured logs.</p>
                  </div>

                  {/* Canvas node 3 */}
                  <div className="absolute top-[28%] right-[10%] w-[200px] bg-neutral-900 border border-neutral-800 rounded-xl p-4 shadow-xl">
                    <div className="flex items-center gap-2 text-emerald-400 mb-1.5">
                      <Activity size={14} />
                      <span className="text-[11px] font-bold uppercase tracking-wider">Live Deploy</span>
                    </div>
                    <h4 className="text-[13px] font-bold text-white mb-1">Stripe Billing Pipeline</h4>
                    <p className="text-[10px] text-neutral-400 leading-normal">Trigger charges on event hooks with 99.999% guarantee.</p>
                  </div>

                  {/* Micro bar bottom */}
                  <div className="mt-auto w-full flex items-center justify-between border-t border-neutral-900 pt-3 text-[11px] text-neutral-500 select-none">
                    <div>FPS: 120 / Spatial scale: 100%</div>
                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-indigo-500" /> Connected</span>
                      <span>v1.0.4-prod</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Bounce-Down Scroll Indicator */}
      <motion.div
        style={{ opacity }}
        className="mt-14 flex flex-col items-center gap-1.5 text-neutral-400 cursor-pointer"
        onClick={() => {
          document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
        }}
      >
        <span className="text-xs font-semibold tracking-widest uppercase">Explore Aether</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
          className="w-5 h-8 rounded-full border-2 border-neutral-300 dark:border-neutral-800 flex items-start justify-center p-1"
        >
          <span className="w-1.5 h-2 rounded-full bg-indigo-500" />
        </motion.div>
      </motion.div>
    </section>
  );
}
