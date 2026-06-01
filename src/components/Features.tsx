'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Shield, Keyboard, Zap, GitBranch, Layers, Search, Check, Lock, Unlock, Sliders } from 'lucide-react';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  className?: string;
  children?: React.ReactNode;
}

export default function Features() {
  return (
    <section id="features" className="py-24 bg-neutral-50 dark:bg-neutral-950 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-400 mb-3">
            Core Architecture
          </h2>
          <p className="text-3xl sm:text-5xl font-black tracking-tight text-neutral-900 dark:text-white">
            Engineered for elite spatial operations.
          </p>
          <p className="mt-4 text-base sm:text-lg text-neutral-500 dark:text-neutral-400">
            Aether delivers frictionless workflow management through modern spatial layers.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
          
          {/* Card 1: Command-K search (Col-span 3) */}
          <BentoCard
            icon={<Terminal className="text-indigo-600 dark:text-indigo-400" size={20} />}
            title="Command-K Core"
            description="Control your entire spatial database and nodes instantly via a keyboard-driven search menu. Type commands below to try."
            className="md:col-span-3 min-h-[350px] flex flex-col justify-between"
          >
            <CommandSimulator />
          </BentoCard>

          {/* Card 2: 0ms Sync (Col-span 3) */}
          <BentoCard
            icon={<Zap className="text-amber-500" size={20} />}
            title="Local-First Sync Engine"
            description="Read and write locally instantly. Data syncs silently in the background using differential vector state merges with 0ms UI latency."
            className="md:col-span-3 min-h-[350px] flex flex-col justify-between"
          >
            <LatencySimulator />
          </BentoCard>

          {/* Card 3: Keyboard Navigation (Col-span 2) */}
          <BentoCard
            icon={<Keyboard className="text-emerald-500" size={20} />}
            title="Elite Shortcuts"
            description="Fly through nodes and tabs without ever lifting your hands. Fully customizable hotkeys."
            className="md:col-span-2 min-h-[300px] flex flex-col justify-between"
          >
            <ShortcutSimulator />
          </BentoCard>

          {/* Card 4: Agent Config (Col-span 2) */}
          <BentoCard
            icon={<Sliders className="text-violet-500" size={20} />}
            title="Adaptive Controls"
            description="Control AI spatial weights and node sync priorities on the fly with responsive custom parameters."
            className="md:col-span-2 min-h-[300px] flex flex-col justify-between"
          >
            <AgentWeightSimulator />
          </BentoCard>

          {/* Card 5: Cryptography (Col-span 2) */}
          <BentoCard
            icon={<Shield className="text-rose-500" size={20} />}
            title="Zero-Knowledge Security"
            description="All nodes, drafts, and spatial files are encrypted client-side. We cannot read your records, ever."
            className="md:col-span-2 min-h-[300px] flex flex-col justify-between"
          >
            <CryptoSimulator />
          </BentoCard>
        </div>
      </div>
    </section>
  );
}

// Custom Bento Card Container
function BentoCard({ icon, title, description, className = '', children }: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={`group relative overflow-hidden rounded-3xl border border-neutral-200/60 dark:border-neutral-800 bg-white dark:bg-neutral-900/60 p-6 sm:p-8 flex flex-col justify-between hover:border-indigo-500/30 dark:hover:border-indigo-500/20 hover:shadow-lg transition-all duration-300 ${className}`}
    >
      {/* Dynamic border gradient light */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      <div>
        <div className="w-10 h-10 rounded-xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center mb-5 group-hover:scale-105 transition-transform duration-200">
          {icon}
        </div>
        <h3 className="text-lg sm:text-xl font-bold text-neutral-900 dark:text-white tracking-tight">
          {title}
        </h3>
        <p className="mt-2 text-[14px] text-neutral-500 dark:text-neutral-400 leading-relaxed max-w-sm">
          {description}
        </p>
      </div>

      <div className="mt-6 w-full relative z-10 flex-1 flex flex-col justify-end">
        {children}
      </div>
    </motion.div>
  );
}

// 1. Command-K Simulator Component
function CommandSimulator() {
  const [search, setSearch] = useState('');
  const commands = [
    { label: 'Create new spatial node', shortcut: 'N' },
    { label: 'Invite team to Aether', shortcut: '⌘ I' },
    { label: 'Switch theme to dark', shortcut: '⌘ T' },
    { label: 'Trigger spatial indexing', shortcut: '⌥ G' },
  ];

  const filteredCommands = commands.filter((c) =>
    c.label.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-full bg-neutral-50 dark:bg-neutral-950 border border-neutral-200/50 dark:border-neutral-800/80 rounded-2xl p-4 shadow-sm font-sans mt-4">
      <div className="relative flex items-center mb-3">
        <Search className="absolute left-3 text-neutral-400" size={14} />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Type to filter commands..."
          className="w-full bg-white dark:bg-neutral-900 text-xs text-neutral-800 dark:text-neutral-200 pl-9 pr-4 py-2.5 rounded-xl border border-neutral-200 dark:border-neutral-800 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20 transition-colors"
        />
      </div>
      <div className="space-y-1 max-h-[110px] overflow-y-auto">
        {filteredCommands.length > 0 ? (
          filteredCommands.map((cmd) => (
            <div
              key={cmd.label}
              className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-900 text-[11px] text-neutral-700 dark:text-neutral-300 cursor-pointer transition-colors"
            >
              <span>{cmd.label}</span>
              <kbd className="px-1.5 py-0.5 rounded bg-neutral-200 dark:bg-neutral-800 text-[9px] text-neutral-500 font-mono">
                {cmd.shortcut}
              </kbd>
            </div>
          ))
        ) : (
          <div className="text-center text-[10px] text-neutral-500 py-3">
            No commands match your query.
          </div>
        )}
      </div>
    </div>
  );
}

// 2. Latency / Sync Simulator Component
function LatencySimulator() {
  const [latency, setLatency] = useState(0);
  const [dataPoints, setDataPoints] = useState<number[]>([12, 14, 11, 15, 12, 10, 14]);

  useEffect(() => {
    const interval = setInterval(() => {
      const isSyncing = Math.random() > 0.4;
      const nextLatency = isSyncing ? Math.floor(Math.random() * 3) : 0;
      setLatency(nextLatency);
      setDataPoints((prev) => [...prev.slice(1), nextLatency === 0 ? 12 + Math.random() * 2 : 1 + Math.random() * 2]);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full bg-neutral-50 dark:bg-neutral-950 border border-neutral-200/50 dark:border-neutral-800/80 rounded-2xl p-4 mt-4 flex items-center justify-between shadow-sm">
      <div className="space-y-1">
        <p className="text-[10px] uppercase text-neutral-500 font-semibold tracking-wider">Sync State</p>
        <div className="flex items-center gap-1.5">
          <span className={`w-2.5 h-2.5 rounded-full ${latency === 0 ? 'bg-indigo-500 animate-pulse' : 'bg-amber-400'}`} />
          <span className="text-[13px] font-bold text-neutral-800 dark:text-neutral-200">
            {latency === 0 ? 'Fully Synced' : 'Syncing changes...'}
          </span>
        </div>
        <p className="text-[11px] text-neutral-500 font-mono">Latency: {latency === 0 ? '0.0ms' : `${latency}ms`}</p>
      </div>

      {/* Mini Line Chart SVG */}
      <div className="w-28 h-10 flex items-end">
        <svg viewBox="0 0 100 40" className="w-full h-full text-indigo-500">
          <path
            d={`M 0 ${40 - dataPoints[0] * 2} L 16 ${40 - dataPoints[1] * 2} L 32 ${40 - dataPoints[2] * 2} L 48 ${40 - dataPoints[3] * 2} L 64 ${40 - dataPoints[4] * 2} L 80 ${40 - dataPoints[5] * 2} L 100 ${40 - dataPoints[6] * 2}`}
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
  );
}

// 3. Shortcut Simulator Component
function ShortcutSimulator() {
  const [activeShortcut, setActiveShortcut] = useState<string | null>(null);

  const shortcuts = [
    { key: 'C', action: 'Toggle spatial canvas layout' },
    { key: 'K', action: 'Open Command Palette finder' },
    { key: 'S', action: 'Manually commit vector snapshot' },
    { key: '?', action: 'Access user keyboard guide' },
  ];

  const handleTrigger = (key: string) => {
    setActiveShortcut(key);
    setTimeout(() => setActiveShortcut(null), 1200);
  };

  return (
    <div className="w-full bg-neutral-50 dark:bg-neutral-950 border border-neutral-200/50 dark:border-neutral-800/80 rounded-2xl p-4 mt-4 shadow-sm select-none">
      <div className="grid grid-cols-4 gap-2.5">
        {shortcuts.map((sh) => (
          <button
            key={sh.key}
            onClick={() => handleTrigger(sh.key)}
            className={`h-11 rounded-xl flex items-center justify-center font-mono font-bold text-xs border transition-all duration-150 cursor-pointer ${
              activeShortcut === sh.key
                ? 'bg-indigo-600 text-white border-indigo-600 scale-95 shadow-md shadow-indigo-600/20'
                : 'bg-white dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300 border-neutral-200 dark:border-neutral-800 hover:border-neutral-300 dark:hover:border-neutral-700'
            }`}
          >
            {sh.key}
          </button>
        ))}
      </div>
      <p className="text-[10px] text-center text-neutral-500 font-medium mt-3.5 h-4">
        {activeShortcut
          ? `✓ Executed: ${shortcuts.find((s) => s.key === activeShortcut)?.action}`
          : 'Click shortcuts above to simulate keys'}
      </p>
    </div>
  );
}

// 4. Agent weight Simulator Component
function AgentWeightSimulator() {
  const [priority, setPriority] = useState(70);

  return (
    <div className="w-full bg-neutral-50 dark:bg-neutral-950 border border-neutral-200/50 dark:border-neutral-800/80 rounded-2xl p-4 mt-4 shadow-sm">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[11px] text-neutral-500 font-semibold uppercase">AI Sync Priority</span>
        <span className="text-[12px] font-mono font-extrabold text-indigo-600 dark:text-indigo-400">
          {priority}%
        </span>
      </div>
      <input
        type="range"
        min="10"
        max="100"
        value={priority}
        onChange={(e) => setPriority(Number(e.target.value))}
        className="w-full accent-indigo-600 dark:accent-indigo-500 cursor-pointer"
      />
      <div className="flex justify-between text-[9px] text-neutral-400 font-mono mt-1">
        <span>Low Latency</span>
        <span>Deep Reasoning</span>
      </div>
    </div>
  );
}

// 5. Crypto Lock Simulator Component
function CryptoSimulator() {
  const [locked, setLocked] = useState(true);

  return (
    <div className="w-full bg-neutral-50 dark:bg-neutral-950 border border-neutral-200/50 dark:border-neutral-800/80 rounded-2xl p-4 mt-4 flex items-center justify-between shadow-sm">
      <div className="space-y-1">
        <p className="text-[10px] uppercase text-neutral-500 font-semibold tracking-wider">Device Encryption</p>
        <span className="text-[12px] font-bold text-neutral-800 dark:text-neutral-200 block">
          {locked ? 'AES-GCM 256 Active' : 'Decrypted (Local Session)'}
        </span>
        <p className="text-[9px] text-neutral-500 font-mono">Status: Secure</p>
      </div>

      <button
        onClick={() => setLocked(!locked)}
        className={`w-11 h-11 rounded-xl flex items-center justify-center border transition-all duration-200 cursor-pointer ${
          locked
            ? 'bg-rose-50 border-rose-200/80 text-rose-500 dark:bg-rose-950/20 dark:border-rose-900/30'
            : 'bg-indigo-50 border-indigo-200/80 text-indigo-500 dark:bg-indigo-950/20 dark:border-indigo-900/30'
        }`}
      >
        {locked ? <Lock size={16} /> : <Unlock size={16} />}
      </button>
    </div>
  );
}
