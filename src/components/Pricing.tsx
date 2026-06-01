'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Info, Sparkles, HelpCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

type BillingPeriod = 'monthly' | 'yearly';

export default function Pricing() {
  const [billing, setBilling] = useState<BillingPeriod>('yearly');

  const handlePlanSelect = (planName: string) => {
    confetti({
      particleCount: 100,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#6366f1', '#a855f7', '#3b82f6'],
    });
  };

  const plans = [
    {
      name: 'Starter',
      price: billing === 'yearly' ? 0 : 0,
      desc: 'Essential spatial tools for individual builders.',
      features: [
        'Up to 3 collaborative canvases',
        '2 active agent weights',
        'Local-first localDB sync',
        'Standard zero-knowledge keys',
        'Basic community support',
      ],
      cta: 'Start Free Trial',
      popular: false,
    },
    {
      name: 'Pro',
      price: billing === 'yearly' ? 24 : 30,
      desc: 'Unlimited power for high-performance squads.',
      features: [
        'Unlimited spatial canvases',
        '10 active cognitive agents',
        'Multi-device Differential Sync',
        'Zero-knowledge AES cloud storage',
        'Priority SLA 2hr support response',
        'Team permission logs',
      ],
      cta: 'Upgrade to Pro',
      popular: true,
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      desc: 'Bespoke security and dedicated nodes.',
      features: [
        'Dedicated isolated agent cluster',
        'Infinite active cognitive agents',
        'Custom local-first network relays',
        'Dedicated Account Manager',
        'Soc-2 compliance logs',
        'Custom contract invoicing',
      ],
      cta: 'Contact Sales',
      popular: false,
    },
  ];

  return (
    <section id="pricing" className="py-24 bg-white dark:bg-neutral-900 relative overflow-hidden select-none">
      {/* Background decoration blur */}
      <div className="absolute top-[20%] left-[5%] w-80 h-80 rounded-full bg-indigo-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-600 dark:text-indigo-400 mb-3">
            Pricing Plans
          </h2>
          <p className="text-3xl sm:text-5xl font-black tracking-tight text-neutral-900 dark:text-white">
            Honest models. Elite options.
          </p>
          <p className="mt-4 text-base sm:text-lg text-neutral-500 dark:text-neutral-400">
            Choose the operational standard that matches your organization's delivery scale.
          </p>
        </div>

        {/* Toggle Switch */}
        <div className="flex items-center justify-center gap-4 mb-16">
          <span className={`text-[13px] font-semibold transition-colors duration-200 ${
            billing === 'monthly' ? 'text-neutral-900 dark:text-white' : 'text-neutral-400'
          }`}>
            Bill Monthly
          </span>
          
          <button
            onClick={() => setBilling(billing === 'monthly' ? 'yearly' : 'monthly')}
            className="w-12 h-6.5 rounded-full bg-neutral-200 dark:bg-neutral-800 p-1 flex items-center justify-start cursor-pointer relative"
          >
            <motion.div
              layout
              className="w-4.5 h-4.5 rounded-full bg-indigo-600 dark:bg-indigo-500"
              style={{ x: billing === 'yearly' ? '20px' : '0px' }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            />
          </button>

          <div className="flex items-center gap-1.5">
            <span className={`text-[13px] font-semibold transition-colors duration-200 ${
              billing === 'yearly' ? 'text-neutral-900 dark:text-white' : 'text-neutral-400'
            }`}>
              Bill Annually
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 font-bold">
              Save 20%
            </span>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
          {plans.map((plan) => {
            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className={`relative rounded-3xl p-8 flex flex-col justify-between hover:scale-102 transition-all duration-300 ${
                  plan.popular
                    ? 'border-2 border-indigo-600 dark:border-indigo-500 bg-indigo-50/10 dark:bg-indigo-950/10 shadow-xl shadow-indigo-600/5 z-10'
                    : 'border border-neutral-200/60 dark:border-neutral-800 bg-neutral-50/30 dark:bg-neutral-950/20'
                }`}
              >
                {/* Popular ribbon floating badge */}
                {plan.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full bg-indigo-600 text-white text-[10px] font-extrabold uppercase tracking-widest flex items-center gap-1 shadow-md shadow-indigo-600/10">
                    <Sparkles size={10} className="animate-pulse" />
                    <span>RECOMMENDED SQUAD CHOICE</span>
                  </div>
                )}

                <div>
                  <h3 className="text-xl font-extrabold text-neutral-950 dark:text-white tracking-tight">
                    {plan.name}
                  </h3>
                  <p className="mt-2 text-xs text-neutral-500 leading-normal">
                    {plan.desc}
                  </p>

                  {/* Pricing Rate layout */}
                  <div className="mt-6 flex items-baseline">
                    <span className="text-4xl sm:text-5xl font-black text-neutral-950 dark:text-white tracking-tight font-mono">
                      {typeof plan.price === 'number' ? `$${plan.price}` : plan.price}
                    </span>
                    {typeof plan.price === 'number' && (
                      <span className="text-[13px] font-semibold text-neutral-400 ml-1">
                        / user / mo
                      </span>
                    )}
                  </div>

                  {/* Pricing bill helper text */}
                  {billing === 'yearly' && typeof plan.price === 'number' && (
                    <span className="text-[10px] text-emerald-500 font-bold block mt-1">
                      Billed annually (Save ${(plan.price / 0.8) * 12 - plan.price * 12}/yr)
                    </span>
                  )}

                  {/* Checkmarks Features lists */}
                  <div className="h-[1px] bg-neutral-200/50 dark:bg-neutral-800/80 my-6" />

                  <ul className="space-y-3.5 text-xs text-neutral-600 dark:text-neutral-400">
                    {plan.features.map((feat) => (
                      <li key={feat} className="flex items-start gap-2.5">
                        <span className="w-4 h-4 rounded-full bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0 mt-0.5 font-bold text-[9px]">
                          <Check size={10} />
                        </span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8">
                  <button
                    onClick={() => handlePlanSelect(plan.name)}
                    className={`w-full py-3.5 rounded-2xl font-bold text-xs sm:text-[13px] tracking-wide uppercase transition-all duration-200 cursor-pointer ${
                      plan.popular
                        ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-600/10'
                        : 'bg-white hover:bg-neutral-100 border border-neutral-300 dark:border-neutral-800 dark:bg-neutral-900 dark:hover:bg-neutral-800 text-neutral-800 dark:text-neutral-200'
                    }`}
                  >
                    {plan.cta}
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
