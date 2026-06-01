'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass as CanvasIcon, MessageSquare as ChatIcon, Calendar as TimelineIcon, BarChart2 as ChartIcon, Plus, Send, Play, Check } from 'lucide-react';

type Tab = 'canvas' | 'ai' | 'timeline' | 'analytics';

export default function Showcase() {
  const [activeTab, setActiveTab] = useState<Tab>('canvas');

  const tabs = [
    { id: 'canvas', label: 'Spatial Canvas', icon: <CanvasIcon size={16} /> },
    { id: 'ai', label: 'AI Command Center', icon: <ChatIcon size={16} /> },
    { id: 'timeline', label: 'Interactive Timeline', icon: <TimelineIcon size={16} /> },
    { id: 'analytics', label: 'Live Analytics', icon: <ChartIcon size={16} /> },
  ];

  return (
    <section id="showcase" className="py-24 bg-white dark:bg-neutral-900 border-y border-neutral-200/50 dark:border-neutral-800/60 relative">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-400 mb-3">
            Interactive Showcase
          </h2>
          <p className="text-3xl sm:text-5xl font-black tracking-tight text-neutral-900 dark:text-white">
            Operate at lightspeed.
          </p>
          <p className="mt-4 text-base sm:text-lg text-neutral-500 dark:text-neutral-400">
            Aether replaces complex SaaS setups with a single, highly flexible spatial workspace. Click the tabs below to explore.
          </p>
        </div>

        {/* Dynamic Tabs Menu */}
        <div className="flex flex-wrap justify-center gap-2 mb-12 max-w-3xl mx-auto p-1.5 rounded-2xl bg-neutral-100/80 dark:bg-neutral-950/40 border border-neutral-200/50 dark:border-neutral-800/50">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as Tab)}
                className={`relative px-5 py-3 rounded-xl text-xs sm:text-[13px] font-semibold flex items-center gap-2 cursor-pointer transition-colors duration-200 ${
                  isActive
                    ? 'text-indigo-600 dark:text-white'
                    : 'text-neutral-500 hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-200'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeShowcaseTab"
                    className="absolute inset-0 bg-white dark:bg-neutral-900 rounded-xl shadow-sm border border-neutral-200/50 dark:border-neutral-800/80"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{tab.icon}</span>
                <span className="relative z-10">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Dashboard Display Screen Frame */}
        <div className="w-full max-w-5xl mx-auto rounded-3xl border border-neutral-200/60 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950/60 p-3 sm:p-4 shadow-xl">
          <div className="relative aspect-[16/9] min-h-[300px] sm:min-h-[450px] w-full rounded-2xl border border-neutral-200/50 dark:border-neutral-800/80 bg-white dark:bg-neutral-900 overflow-hidden flex flex-col">
            
            {/* Header window control */}
            <div className="h-10 border-b border-neutral-200/60 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 px-4 flex items-center justify-between select-none">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-neutral-200 dark:bg-neutral-800" />
                <span className="w-2.5 h-2.5 rounded-full bg-neutral-200 dark:bg-neutral-800" />
                <span className="w-2.5 h-2.5 rounded-full bg-neutral-200 dark:bg-neutral-800" />
              </div>
              <div className="text-[10px] text-neutral-400 dark:text-neutral-500 font-mono font-medium">
                aether://workspace/hub?tab={activeTab}
              </div>
              <div className="w-12" />
            </div>

            {/* Simulated Live Frame Body */}
            <div className="flex-1 overflow-hidden relative bg-white dark:bg-neutral-900">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  className="w-full h-full p-4 sm:p-6 flex flex-col justify-between"
                >
                  {activeTab === 'canvas' && <CanvasTab />}
                  {activeTab === 'ai' && <AiTab />}
                  {activeTab === 'timeline' && <TimelineTab />}
                  {activeTab === 'analytics' && <AnalyticsTab />}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

// ----------------------------------------------------
// 1. Spatial Canvas Tab Component
// ----------------------------------------------------
function CanvasTab() {
  const [nodes, setNodes] = useState([
    { id: 1, label: 'GitHub Repository', status: 'connected', x: '15%', y: '20%' },
    { id: 2, label: 'Linear Issues', status: 'connected', x: '15%', y: '65%' },
    { id: 3, label: 'Aether Engine', status: 'active', x: '50%', y: '40%' },
    { id: 4, label: 'Vercel Deployment', status: 'pending', x: '80%', y: '20%' },
    { id: 5, label: 'Stripe API', status: 'pending', x: '80%', y: '65%' },
  ]);

  const handleToggleNode = (id: number) => {
    setNodes((prev) =>
      prev.map((n) =>
        n.id === id
          ? { ...n, status: n.status === 'pending' ? 'connected' : 'pending' }
          : n
      )
    );
  };

  return (
    <div className="w-full h-full relative bg-neutral-50/50 dark:bg-neutral-950/20 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#1f2937_1px,transparent_1px)] [background-size:20px_20px] rounded-xl border border-neutral-100 dark:border-neutral-800/80 p-4 sm:p-6 flex flex-col justify-between overflow-hidden">
      
      {/* Description */}
      <div className="relative z-10 flex items-center justify-between">
        <div>
          <h4 className="text-[14px] sm:text-base font-bold text-neutral-800 dark:text-neutral-200">
            Interactive Canvas Editor
          </h4>
          <p className="text-[11px] sm:text-xs text-neutral-500">
            Click pending nodes to sync integration relays in real-time.
          </p>
        </div>
        <button
          onClick={() => setNodes((prev) => prev.map((n) => ({ ...n, status: 'connected' })))}
          className="text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/30 px-3 py-1.5 rounded-lg border border-indigo-200/20 hover:bg-indigo-100/50 transition-colors cursor-pointer"
        >
          Auto Connect All
        </button>
      </div>

      {/* SVG Vector Paths Connector */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none select-none">
        {/* Base Static paths */}
        <path d="M 120 100 Q 250 140, 360 145" fill="none" stroke="#818cf8" strokeWidth="1.5" className="opacity-30" />
        <path d="M 120 100 Q 250 140, 360 145" fill="none" stroke="#818cf8" strokeWidth="1.8" className="animate-dash" />

        <path d="M 120 220 Q 250 180, 360 145" fill="none" stroke="#818cf8" strokeWidth="1.5" className="opacity-30" />
        <path d="M 120 220 Q 250 180, 360 145" fill="none" stroke="#818cf8" strokeWidth="1.8" className="animate-dash" />
        
        {/* Dynamic colored lines to destinations */}
        <path
          d="M 360 145 Q 480 100, 600 100"
          fill="none"
          stroke={nodes[3].status === 'connected' ? '#10b981' : '#a3a3a3'}
          strokeWidth="1.5"
          className="opacity-30 transition-all duration-300"
        />
        {nodes[3].status === 'connected' && (
          <path
            d="M 360 145 Q 480 100, 600 100"
            fill="none"
            stroke="#10b981"
            strokeWidth="1.8"
            className="animate-dash"
          />
        )}

        <path
          d="M 360 145 Q 480 200, 600 220"
          fill="none"
          stroke={nodes[4].status === 'connected' ? '#10b981' : '#a3a3a3'}
          strokeWidth="1.5"
          className="opacity-30 transition-all duration-300"
        />
        {nodes[4].status === 'connected' && (
          <path
            d="M 360 145 Q 480 200, 600 220"
            fill="none"
            stroke="#10b981"
            strokeWidth="1.8"
            className="animate-dash"
          />
        )}
      </svg>

      {/* Interactive Nodes list */}
      <div className="absolute inset-0 w-full h-full pointer-events-auto">
        {nodes.map((node) => (
          <button
            key={node.id}
            onClick={() => handleToggleNode(node.id)}
            style={{ left: node.x, top: node.y }}
            className={`absolute -translate-x-1/2 -translate-y-1/2 p-3 sm:p-4 rounded-2xl border bg-white dark:bg-neutral-900 shadow-md flex flex-col items-start gap-1 cursor-pointer transition-all duration-300 select-none ${
              node.status === 'active'
                ? 'border-indigo-500 ring-2 ring-indigo-500/10'
                : node.status === 'connected'
                ? 'border-emerald-500'
                : 'border-neutral-200 dark:border-neutral-800 opacity-60 hover:opacity-90 hover:scale-103'
            }`}
          >
            <span className="text-[12px] font-bold text-neutral-800 dark:text-neutral-200">
              {node.label}
            </span>
            <span className="flex items-center gap-1">
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  node.status === 'active'
                    ? 'bg-indigo-500 animate-pulse'
                    : node.status === 'connected'
                    ? 'bg-emerald-500'
                    : 'bg-neutral-400'
                }`}
              />
              <span className="text-[9px] uppercase tracking-wider text-neutral-500 font-semibold">
                {node.status}
              </span>
            </span>
          </button>
        ))}
      </div>

      <div className="relative z-10 w-full flex items-center justify-between text-[10px] text-neutral-400 mt-auto">
        <span>Press spacebar to pan grid</span>
        <span>Relays: 5 active path</span>
      </div>
    </div>
  );
}

// ----------------------------------------------------
// 2. AI Command Tab Component
// ----------------------------------------------------
function AiTab() {
  const [messages, setMessages] = useState([
    { role: 'assistant', text: 'Welcome to Aether AI terminal. Select a directive below to execute.' },
  ]);
  const [typing, setTyping] = useState(false);

  const triggers = [
    { label: 'Compile sync reports', response: 'Reading indexed changes. Merged 4 file conflicts in index-db, updated spatial canvas, deployment successful in 1.4s.' },
    { label: 'Optimize node weights', response: 'Analyzing node execution priorities. Shifting 3 agents to low-latency sync loops. Average pipeline speed decreased to 11.2ms.' },
    { label: 'Audit database keys', response: 'Verifying keys against local-first zero-knowledge lockers. All keys verified. 0 leaks found.' },
  ];

  const handleSendPrompt = (prompt: string, response: string) => {
    if (typing) return;
    setMessages((prev) => [...prev, { role: 'user', text: prompt }]);
    setTyping(true);

    setTimeout(() => {
      setMessages((prev) => [...prev, { role: 'assistant', text: response }]);
      setTyping(false);
    }, 1200);
  };

  return (
    <div className="w-full h-full bg-neutral-950 border border-neutral-800 rounded-xl flex flex-col justify-between overflow-hidden">
      
      {/* Console Head */}
      <div className="h-10 border-b border-neutral-900 bg-neutral-950 px-4 flex items-center justify-between text-neutral-400 select-none">
        <span className="text-[10px] sm:text-xs font-mono font-bold">AETHER-COGNITIVE-SHELL v1.2</span>
        <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-ping" /> Listening</span>
      </div>

      {/* Console Logs */}
      <div className="flex-1 p-4 font-mono text-[11px] sm:text-xs text-neutral-300 space-y-3 overflow-y-auto max-h-[220px]">
        {messages.map((msg, i) => (
          <div key={i} className={msg.role === 'user' ? 'text-right' : 'text-left'}>
            <span className={msg.role === 'user' ? 'text-indigo-400' : 'text-emerald-400'}>
              {msg.role === 'user' ? 'user:~$ ' : 'aether_agent:~$ '}
            </span>
            <span className="text-neutral-200 leading-normal">{msg.text}</span>
          </div>
        ))}
        {typing && (
          <div className="text-left text-neutral-500 animate-pulse">
            aether_agent:~$ thinking...
          </div>
        )}
      </div>

      {/* Preset Directives Buttons */}
      <div className="p-3 bg-neutral-900/50 border-t border-neutral-900 flex flex-wrap gap-2">
        {triggers.map((t) => (
          <button
            key={t.label}
            onClick={() => handleSendPrompt(t.label, t.response)}
            disabled={typing}
            className="px-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 hover:border-indigo-500 text-[10px] text-neutral-300 hover:text-white cursor-pointer transition-colors duration-150"
          >
            {t.label}
          </button>
        ))}
      </div>
    </div>
  );
}

// ----------------------------------------------------
// 3. Collaborative Timeline Tab Component
// ----------------------------------------------------
function TimelineTab() {
  const [tasks, setTasks] = useState([
    { id: 1, label: 'Design system specs', assignee: 'Alex M.', status: 'completed', progress: 100 },
    { id: 2, label: 'Configure local-first sync schema', assignee: 'Sarah K.', status: 'in-progress', progress: 65 },
    { id: 3, label: 'Client-side AES key locks', assignee: 'Dev Team', status: 'pending', progress: 0 },
  ]);

  const handleRunProgress = (id: number) => {
    setTasks((prev) =>
      prev.map((t) =>
        t.id === id && t.progress < 100
          ? { ...t, progress: Math.min(t.progress + 15, 100), status: t.progress + 15 >= 100 ? 'completed' : 'in-progress' }
          : t
      )
    );
  };

  return (
    <div className="w-full h-full bg-white dark:bg-neutral-900 rounded-xl border border-neutral-100 dark:border-neutral-800/80 p-4 sm:p-5 flex flex-col justify-between">
      <div>
        <h4 className="text-[14px] sm:text-base font-bold text-neutral-800 dark:text-neutral-200">
          Collaborative Sprint Hub
        </h4>
        <p className="text-[11px] sm:text-xs text-neutral-500">
          Click any active card to boost task progress.
        </p>
      </div>

      <div className="my-4 space-y-3">
        {tasks.map((task) => (
          <div
            key={task.id}
            onClick={() => handleRunProgress(task.id)}
            className="p-3.5 rounded-xl border border-neutral-100 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-950/20 hover:border-indigo-500/30 transition-all duration-200 cursor-pointer flex items-center justify-between select-none"
          >
            <div className="space-y-1.5 flex-1 pr-6">
              <div className="flex items-center gap-2">
                <span className="text-[12px] sm:text-[13px] font-bold text-neutral-800 dark:text-neutral-100">
                  {task.label}
                </span>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-neutral-200 dark:bg-neutral-800 text-neutral-500 font-mono">
                  {task.assignee}
                </span>
              </div>
              
              {/* Progress Bar */}
              <div className="w-full h-2 rounded-full bg-neutral-200 dark:bg-neutral-800 overflow-hidden">
                <div
                  className="h-full bg-indigo-600 dark:bg-indigo-500 transition-all duration-300"
                  style={{ width: `${task.progress}%` }}
                />
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono text-neutral-500">{task.progress}%</span>
              <span className={`w-6 h-6 rounded-lg flex items-center justify-center border text-xs ${
                task.status === 'completed'
                  ? 'border-emerald-200 bg-emerald-50 text-emerald-500 dark:bg-emerald-950/20 dark:border-emerald-900/30'
                  : task.status === 'in-progress'
                  ? 'border-indigo-200 bg-indigo-50 text-indigo-500 dark:bg-indigo-950/20 dark:border-indigo-900/30'
                  : 'border-neutral-200 bg-neutral-50 text-neutral-400 dark:bg-neutral-800 dark:border-neutral-700'
              }`}>
                {task.status === 'completed' ? <Check size={12} /> : <Play size={10} />}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="text-[10px] text-neutral-400 text-right font-medium">
        Active sprint velocity: 84% completed
      </div>
    </div>
  );
}

// ----------------------------------------------------
// 4. Analytics Tab Component
// ----------------------------------------------------
function AnalyticsTab() {
  const [data, setData] = useState([
    { label: 'Jan', val: 40 },
    { label: 'Feb', val: 65 },
    { label: 'Mar', val: 50 },
    { label: 'Apr', val: 85 },
    { label: 'May', val: 70 },
    { label: 'Jun', val: 95 },
  ]);

  const handleAnimateBars = () => {
    setData((prev) => prev.map((d) => ({ ...d, val: Math.floor(30 + Math.random() * 65) })));
  };

  return (
    <div className="w-full h-full bg-white dark:bg-neutral-900 rounded-xl border border-neutral-100 dark:border-neutral-800/80 p-4 sm:p-5 flex flex-col justify-between">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-[14px] sm:text-base font-bold text-neutral-800 dark:text-neutral-200">
            Aether Cluster Logs
          </h4>
          <p className="text-[11px] sm:text-xs text-neutral-500">
            Real-time server data synthesis.
          </p>
        </div>
        <button
          onClick={handleAnimateBars}
          className="text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/30 px-3 py-1.5 rounded-lg border border-indigo-200/20 hover:bg-indigo-100/50 transition-colors cursor-pointer"
        >
          Refresh Data
        </button>
      </div>

      {/* Grid chart mockup */}
      <div className="my-5 flex-1 flex items-end gap-3 sm:gap-4 justify-between h-[110px] border-b border-neutral-100 dark:border-neutral-800/50 pb-2">
        {data.map((item) => (
          <div key={item.label} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
            
            {/* Animate-ready graphical bar */}
            <div
              style={{ height: `${item.val}%` }}
              className="w-full rounded-t-lg bg-gradient-to-t from-indigo-500 to-indigo-600 dark:from-indigo-600 dark:to-indigo-500 hover:from-fuchsia-500 hover:to-indigo-600 transition-all duration-500 shadow-sm"
            />
            
            <span className="text-[10px] font-mono text-neutral-400 dark:text-neutral-500">
              {item.label}
            </span>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between text-[10px] text-neutral-400 font-medium">
        <span>Average node score: 98.42</span>
        <span>Uptime: 99.999%</span>
      </div>
    </div>
  );
}
