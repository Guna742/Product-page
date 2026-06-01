'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PlusCircle, Sliders, CheckCircle2, GitCommit, Settings, Rocket } from 'lucide-react';

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      num: '01',
      title: 'Architect Spatial Canvas',
      desc: 'Build your layout canvas visually. Link tables, lists, calendars, and text documents in an infinite local-first viewport.',
      icon: <PlusCircle size={22} />,
      badge: 'Interactive Layout',
      visual: <StepOneVisual />,
    },
    {
      num: '02',
      title: 'Configure Cognitive Agents',
      desc: 'Deploy deep local reasoning agents. Set priority weights, context bounds, and execution conditions without writing code.',
      icon: <Sliders size={22} />,
      badge: 'No-Code AI Config',
      visual: <StepTwoVisual />,
    },
    {
      num: '03',
      title: 'Synchronize Pipelines',
      desc: 'Ship your workspace live. Aether syncs vector snapshots to production cloud databases with a client-side military key guarantee.',
      icon: <CheckCircle2 size={22} />,
      badge: 'Zero-Latency Ship',
      visual: <StepThreeVisual />,
    },
  ];

  return (
    <section id="timeline" className="py-24 bg-neutral-50 dark:bg-neutral-950 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-400 mb-3">
            Workflow Process
          </h2>
          <p className="text-3xl sm:text-5xl font-black tracking-tight text-neutral-900 dark:text-white">
            From empty intent to fully deployed.
          </p>
          <p className="mt-4 text-base sm:text-lg text-neutral-500 dark:text-neutral-400">
            Aether simplifies backend setup. Assemble workflows visually in three intuitive stages.
          </p>
        </div>

        {/* Horizontal Timeline Process Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left panel: Timeline lists */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            {steps.map((step, idx) => {
              const isActive = activeStep === idx;
              return (
                <div
                  key={step.num}
                  onMouseEnter={() => setActiveStep(idx)}
                  className={`p-6 sm:p-8 rounded-2xl border transition-all duration-300 cursor-pointer flex gap-5 select-none relative overflow-hidden ${
                    isActive
                      ? 'bg-white dark:bg-neutral-900 border-indigo-500/30 dark:border-indigo-500/20 shadow-md'
                      : 'bg-transparent border-transparent hover:bg-white/40 dark:hover:bg-neutral-900/10'
                  }`}
                >
                  {/* Left step active glow edge */}
                  {isActive && (
                    <motion.div
                      layoutId="timelineGlow"
                      className="absolute left-0 top-0 bottom-0 w-[4px] bg-indigo-600 dark:bg-indigo-500"
                    />
                  )}

                  {/* Step Num Circle */}
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border font-mono font-bold text-sm transition-colors duration-200 ${
                    isActive
                      ? 'bg-indigo-600 border-indigo-600 text-white'
                      : 'bg-white dark:bg-neutral-900 border-neutral-200 dark:border-neutral-800 text-neutral-500'
                  }`}>
                    {step.num}
                  </div>

                  <div className="space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] px-2 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 font-semibold uppercase tracking-wider">
                        {step.badge}
                      </span>
                    </div>
                    <h3 className={`text-lg sm:text-xl font-bold tracking-tight transition-colors duration-200 ${
                      isActive ? 'text-neutral-900 dark:text-white' : 'text-neutral-600 dark:text-neutral-400'
                    }`}>
                      {step.title}
                    </h3>
                    <p className="text-[14px] text-neutral-500 dark:text-neutral-400 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right panel: Graphic representation panel */}
          <div className="lg:col-span-6 flex items-center justify-center">
            <div className="w-full max-w-md aspect-[4/3] rounded-3xl border border-neutral-200/50 dark:border-neutral-800 bg-white dark:bg-neutral-900/60 p-6 flex flex-col justify-between shadow-xl relative overflow-hidden">
              {/* background grids inside preview */}
              <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#1f2937_1px,transparent_1px)] [background-size:16px_16px] opacity-40" />

              <div className="relative z-10 flex items-center justify-between border-b border-neutral-100 dark:border-neutral-800/80 pb-3">
                <span className="text-[11px] font-bold text-neutral-400 dark:text-neutral-500 uppercase tracking-wider font-mono">
                  Stage Live Visual
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400 font-mono">
                  step_{steps[activeStep].num}
                </span>
              </div>

              {/* Dynamic visual frame content */}
              <div className="relative flex-1 flex items-center justify-center py-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeStep}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.25 }}
                    className="w-full h-full flex items-center justify-center"
                  >
                    {steps[activeStep].visual}
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="relative z-10 flex items-center justify-between text-[10px] text-neutral-400">
                <span>Active simulation</span>
                <span>Ready to deploy</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

// ----------------------------------------------------
// Step 1: Canvas Builder Visual
// ----------------------------------------------------
function StepOneVisual() {
  return (
    <div className="w-[80%] aspect-[16/10] bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-4 flex flex-col justify-between shadow-md relative">
      <div className="flex items-center gap-1.5">
        <span className="w-2.5 h-2.5 rounded bg-indigo-500" />
        <span className="text-[11px] font-bold text-neutral-800 dark:text-neutral-200">Workspace_Canvas_01</span>
      </div>

      <div className="grid grid-cols-3 gap-2">
        <div className="h-8 rounded-lg bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex items-center justify-center text-[10px] text-neutral-500">
          Node_A
        </div>
        <div className="h-8 rounded-lg bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex items-center justify-center text-[10px] text-neutral-500">
          Node_B
        </div>
        <div className="h-8 rounded-lg bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 flex items-center justify-center text-[10px] text-neutral-500">
          Node_C
        </div>
      </div>

      <div className="flex items-center gap-2 justify-center">
        <GitCommit size={14} className="text-indigo-500" />
        <span className="text-[10px] font-mono text-neutral-400">Initial Grid Layout Ready</span>
      </div>
    </div>
  );
}

// ----------------------------------------------------
// Step 2: Agent Configuration Visual
// ----------------------------------------------------
function StepTwoVisual() {
  return (
    <div className="w-[80%] aspect-[16/10] bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-4 flex flex-col justify-between shadow-md relative">
      <div className="flex items-center gap-1.5">
        <Settings size={12} className="text-violet-500 animate-spin" style={{ animationDuration: '4s' }} />
        <span className="text-[11px] font-bold text-neutral-800 dark:text-neutral-200">Cognitive_Agent_Config</span>
      </div>

      <div className="space-y-1.5">
        <div className="h-2 rounded bg-neutral-200 dark:bg-neutral-800 overflow-hidden">
          <div className="w-[75%] h-full bg-violet-500" />
        </div>
        <div className="flex items-center justify-between text-[9px] text-neutral-400 font-mono">
          <span>Model weight</span>
          <span>75% (Claude-3.5)</span>
        </div>
      </div>

      <div className="space-y-1.5">
        <div className="h-2 rounded bg-neutral-200 dark:bg-neutral-800 overflow-hidden">
          <div className="w-[45%] h-full bg-violet-400" />
        </div>
        <div className="flex items-center justify-between text-[9px] text-neutral-400 font-mono">
          <span>Priority logic index</span>
          <span>45% (Differential)</span>
        </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------
// Step 3: Deployment Pipelines Visual
// ----------------------------------------------------
function StepThreeVisual() {
  return (
    <div className="w-[80%] aspect-[16/10] bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-4 flex flex-col justify-between shadow-md relative">
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-bold text-neutral-800 dark:text-neutral-200 flex items-center gap-1">
          <Rocket size={12} className="text-emerald-500" />
          Production_Deployment
        </span>
        <span className="text-[10px] text-emerald-500 bg-emerald-50 dark:bg-emerald-950/20 px-2 py-0.5 rounded font-mono font-bold">
          LIVE
        </span>
      </div>

      <div className="flex flex-col items-center gap-1.5 py-2">
        <div className="w-10 h-10 rounded-xl bg-emerald-500/10 dark:bg-emerald-500/5 flex items-center justify-center text-emerald-500">
          <Rocket size={20} className="animate-bounce" />
        </div>
        <span className="text-[10px] font-mono text-emerald-500 font-bold">Relay Sync Complete</span>
      </div>

      <div className="flex items-center justify-between text-[9px] text-neutral-400 font-mono">
        <span>SSL Secured</span>
        <span>Lat: 11ms</span>
      </div>
    </div>
  );
}
