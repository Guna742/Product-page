'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { CloudLightning, TrendingUp, Cpu, Server } from 'lucide-react';

interface MetricProps {
  icon: React.ReactNode;
  end: number;
  suffix?: string;
  decimals?: number;
  duration?: number;
  label: string;
  desc: string;
}

export default function Benefits() {
  return (
    <section id="impact" className="py-24 bg-white dark:bg-neutral-900 border-y border-neutral-200/50 dark:border-neutral-800/60 relative overflow-hidden">
      {/* Background visual graphics */}
      <div className="absolute top-[40%] right-[5%] w-96 h-96 rounded-full bg-indigo-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[5%] w-96 h-96 rounded-full bg-purple-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        
        {/* Layout Grid (Header Left, Stats Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Description Column */}
          <div className="lg:col-span-5 space-y-6">
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-400">
              Operational Statistics
            </h2>
            <p className="text-3xl sm:text-5xl font-black tracking-tight text-neutral-900 dark:text-white leading-[1.15]">
              Real velocity. Verified metrics.
            </p>
            <p className="text-base sm:text-lg text-neutral-500 dark:text-neutral-400 leading-relaxed">
              We focus on quantifiable enterprise engineering progress. Aether optimizes operational workflows down to the microsecond level.
            </p>

            <div className="h-[1px] bg-neutral-200/60 dark:bg-neutral-800 my-8" />

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-indigo-50 dark:bg-indigo-950/40 flex items-center justify-center text-indigo-600">
                  ✓
                </div>
                <span className="text-[14px] font-semibold text-neutral-800 dark:text-neutral-200">
                  Soc-2 Type II Certified Pipeline
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-indigo-50 dark:bg-indigo-950/40 flex items-center justify-center text-indigo-600">
                  ✓
                </div>
                <span className="text-[14px] font-semibold text-neutral-800 dark:text-neutral-200">
                  Differential Vector Storage (CRDTs)
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-indigo-50 dark:bg-indigo-950/40 flex items-center justify-center text-indigo-600">
                  ✓
                </div>
                <span className="text-[14px] font-semibold text-neutral-800 dark:text-neutral-200">
                  Global Distributed edge sync
                </span>
              </div>
            </div>
          </div>

          {/* Right Statistics Column */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            <MetricCard
              icon={<Server className="text-indigo-600 dark:text-indigo-400" size={18} />}
              end={99.999}
              decimals={3}
              suffix="%"
              label="Core System Uptime"
              desc="Backed by our formal SLA contracts to guarantee always-on spatial computing."
            />

            <MetricCard
              icon={<TrendingUp className="text-emerald-500" size={18} />}
              end={4.8}
              decimals={1}
              suffix="x"
              label="Team Sprint Velocity"
              desc="Average acceleration in delivery timing reported by collaborative design squads."
            />

            <MetricCard
              icon={<Cpu className="text-violet-500" size={18} />}
              end={140}
              suffix="M+"
              label="Node Operations"
              desc="SaaS logic connections executed through our distributed local-first ledger."
            />

            <MetricCard
              icon={<CloudLightning className="text-amber-500" size={18} />}
              end={0}
              suffix="ms"
              label="Local Database Latency"
              desc="Instant client feedback with synchronous indexedDB cached writes."
            />

          </div>

        </div>

      </div>
    </section>
  );
}

// ----------------------------------------------------
// Custom Metric Card with Intersection Observer CountUp
// ----------------------------------------------------
function MetricCard({ icon, end, suffix = '', decimals = 0, duration = 1800, label, desc }: MetricProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number | null = null;
    const startValue = 0;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const currentValue = progress * (end - startValue) + startValue;
      setCount(currentValue);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, end, duration]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="p-8 rounded-3xl border border-neutral-200/60 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-950/20 flex flex-col justify-between min-h-[220px] hover:border-indigo-500/30 transition-colors"
    >
      <div className="w-9 h-9 rounded-lg bg-white dark:bg-neutral-900 border border-neutral-200/50 dark:border-neutral-800/80 flex items-center justify-center shadow-sm mb-4">
        {icon}
      </div>

      <div className="my-3">
        <h3 className="text-4xl sm:text-5xl font-black tracking-tight text-neutral-900 dark:text-white font-mono select-none">
          {count.toFixed(decimals)}
          <span className="text-indigo-600 dark:text-indigo-400">{suffix}</span>
        </h3>
        <p className="text-[13px] font-bold text-neutral-800 dark:text-neutral-200 mt-2 tracking-tight">
          {label}
        </p>
      </div>

      <p className="text-[11px] sm:text-xs text-neutral-500 dark:text-neutral-400 leading-normal">
        {desc}
      </p>
    </motion.div>
  );
}
