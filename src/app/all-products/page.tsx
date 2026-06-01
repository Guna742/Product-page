'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { 
  Search, LayoutGrid, List, Compass, HelpCircle, X, ArrowRight, Check, ExternalLink, 
  Terminal, Shield, Keyboard, Zap, GitBranch, Layers, Lock, Sliders, Cpu, Sparkles, 
  Activity, DollarSign, Calendar, MessageSquare, Briefcase, FileText, ShoppingCart, 
  Database, UserCheck, HardDrive, Mail, Eye, Info, Volume2, ArrowUpRight
} from 'lucide-react';
import { useTheme } from '@/components/ThemeContext';
import confetti from 'canvas-confetti';

interface AppItem {
  id: string;
  name: string;
  tagline: string;
  desc: string;
  category: string;
  accent: string; // HSL brand mapping
  popular: boolean;
  icon: React.ReactNode;
}

export default function AllProducts() {
  const { theme, toggleTheme } = useTheme();
  
  // States
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [wizardStep, setWizardStep] = useState(1);
  const [wizardAnswers, setWizardAnswers] = useState<Record<string, string>>({});
  const [wizardRecommended, setWizardRecommended] = useState<string[]>([]);
  const [highlightedApps, setHighlightedApps] = useState<string[]>([]);

  // Category Refs
  const categoryRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // Category specific premium glow and grading classes
  const accentClasses: Record<string, { border: string; text: string; bg: string; shadow: string }> = {
    indigo: {
      border: 'hover:border-indigo-500/50 dark:hover:border-indigo-500/30',
      text: 'text-indigo-600 dark:text-indigo-400',
      bg: 'bg-indigo-50/50 dark:bg-indigo-950/20 border-indigo-200/10 hover:bg-indigo-100/30',
      shadow: 'hover:shadow-lg hover:shadow-indigo-500/5'
    },
    emerald: {
      border: 'hover:border-emerald-500/50 dark:hover:border-emerald-500/30',
      text: 'text-emerald-600 dark:text-emerald-400',
      bg: 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-200/10 hover:bg-emerald-100/30',
      shadow: 'hover:shadow-lg hover:shadow-emerald-500/5'
    },
    amber: {
      border: 'hover:border-amber-500/50 dark:hover:border-amber-500/30',
      text: 'text-amber-600 dark:text-amber-500',
      bg: 'bg-amber-50/50 dark:bg-amber-950/20 border-amber-200/10 hover:bg-amber-100/30',
      shadow: 'hover:shadow-lg hover:shadow-amber-500/5'
    },
    violet: {
      border: 'hover:border-violet-500/50 dark:hover:border-violet-500/30',
      text: 'text-violet-600 dark:text-violet-400',
      bg: 'bg-violet-50/50 dark:bg-violet-950/20 border-violet-200/10 hover:bg-violet-100/30',
      shadow: 'hover:shadow-lg hover:shadow-violet-500/5'
    },
    rose: {
      border: 'hover:border-rose-500/50 dark:hover:border-rose-500/30',
      text: 'text-rose-600 dark:text-rose-455',
      bg: 'bg-rose-50/50 dark:bg-rose-950/20 border-rose-200/10 hover:bg-rose-100/30',
      shadow: 'hover:shadow-lg hover:shadow-rose-500/5'
    },
    cyan: {
      border: 'hover:border-cyan-500/50 dark:hover:border-cyan-500/30',
      text: 'text-cyan-600 dark:text-cyan-400',
      bg: 'bg-cyan-50/50 dark:bg-cyan-950/20 border-cyan-200/10 hover:bg-cyan-100/30',
      shadow: 'hover:shadow-lg hover:shadow-cyan-500/5'
    },
    fuchsia: {
      border: 'hover:border-fuchsia-500/50 dark:hover:border-fuchsia-500/30',
      text: 'text-fuchsia-600 dark:text-fuchsia-400',
      bg: 'bg-fuchsia-50/50 dark:bg-fuchsia-950/20 border-fuchsia-200/10 hover:bg-fuchsia-100/30',
      shadow: 'hover:shadow-lg hover:shadow-fuchsia-500/5'
    },
    teal: {
      border: 'hover:border-teal-500/50 dark:hover:border-teal-500/30',
      text: 'text-teal-600 dark:text-teal-400',
      bg: 'bg-teal-50/50 dark:bg-teal-950/20 border-teal-200/10 hover:bg-teal-100/30',
      shadow: 'hover:shadow-lg hover:shadow-teal-500/5'
    }
  };

  // Category specific premium gradient background for each icon
  const iconGradientClasses: Record<string, string> = {
    indigo: 'bg-gradient-to-br from-indigo-500 via-indigo-600 to-violet-700 shadow-md shadow-indigo-500/20 dark:shadow-indigo-500/10',
    emerald: 'bg-gradient-to-br from-emerald-400 via-emerald-500 to-teal-600 shadow-md shadow-emerald-500/20 dark:shadow-emerald-500/10',
    amber: 'bg-gradient-to-br from-amber-400 via-amber-500 to-orange-500 shadow-md shadow-amber-500/20 dark:shadow-amber-500/10',
    violet: 'bg-gradient-to-br from-violet-400 via-violet-500 to-fuchsia-600 shadow-md shadow-violet-500/20 dark:shadow-violet-500/10',
    rose: 'bg-gradient-to-br from-rose-400 via-rose-500 to-pink-600 shadow-md shadow-rose-500/20 dark:shadow-rose-500/10',
    cyan: 'bg-gradient-to-br from-cyan-400 via-cyan-500 to-blue-600 shadow-md shadow-cyan-500/20 dark:shadow-cyan-500/10',
    fuchsia: 'bg-gradient-to-br from-fuchsia-400 via-fuchsia-500 to-purple-600 shadow-md shadow-fuchsia-500/20 dark:shadow-fuchsia-500/10',
    teal: 'bg-gradient-to-br from-teal-400 via-teal-500 to-emerald-600 shadow-md shadow-teal-500/20 dark:shadow-teal-500/10'
  };

  // Applications Database (43 items across Zoho's core domains)
  const applications: AppItem[] = [
    // Sales & Marketing
    {
      id: 'crm',
      name: 'Aether CRM',
      tagline: 'Manage client relationships and workflows.',
      desc: 'Orchestrate Sales cycles, track active contacts, automate lead qualification, and close deals using localized AI reasoning engines.',
      category: 'Sales & Marketing',
      accent: 'indigo',
      popular: true,
      icon: <Layers className="text-indigo-600 dark:text-indigo-400" size={18} />
    },
    {
      id: 'bigin',
      name: 'Bigin CRM',
      tagline: 'Pipeline management for small fleets.',
      desc: 'The visual, single-pipeline CRM designed to help startups, micro-teams, and creators organize deal workflows with absolute ease.',
      category: 'Sales & Marketing',
      accent: 'indigo',
      popular: false,
      icon: <Activity className="text-indigo-600 dark:text-indigo-400" size={18} />
    },
    {
      id: 'campaigns',
      name: 'Aether Campaigns',
      tagline: 'High-performance email marketing.',
      desc: 'Orchestrate newsletter broadcasts, schedule automated email sequences, and compile visual A/B tests with real-time vector reporting.',
      category: 'Sales & Marketing',
      accent: 'indigo',
      popular: false,
      icon: <Mail className="text-indigo-600 dark:text-indigo-400" size={18} />
    },
    {
      id: 'social',
      name: 'Aether Social',
      tagline: 'Centralized social media scheduler.',
      desc: 'Publish content, schedule threads, monitor brand mentions, and scale community visibility across multiple networks in a single click.',
      category: 'Sales & Marketing',
      accent: 'indigo',
      popular: true,
      icon: <MessageSquare className="text-indigo-600 dark:text-indigo-400" size={18} />
    },
    {
      id: 'salesiq',
      name: 'SalesIQ',
      tagline: 'Visitor tracking and live support.',
      desc: 'Identify high-value leads on your website in real-time, compile user click paths, and deliver context-aware support chat routes.',
      category: 'Sales & Marketing',
      accent: 'indigo',
      popular: false,
      icon: <Eye className="text-indigo-600 dark:text-indigo-400" size={18} />
    },
    {
      id: 'pagesense',
      name: 'PageSense',
      tagline: 'Optimized conversion & heatmaps.',
      desc: 'Measure website layout performance using dynamic heatmaps, visitor logs, click tracking, and custom conversion funnel builders.',
      category: 'Sales & Marketing',
      accent: 'indigo',
      popular: false,
      icon: <Sliders className="text-indigo-600 dark:text-indigo-400" size={18} />
    },
    
    // Finance & Accounting
    {
      id: 'books',
      name: 'Aether Books',
      tagline: 'Comprehensive business accounting.',
      desc: 'A complete tax-ready double-entry ledger tool. Track purchase orders, sync cloud banks, capture expenses, and automate financial reporting.',
      category: 'Finance & Accounting',
      accent: 'emerald',
      popular: true,
      icon: <DollarSign className="text-emerald-600 dark:text-emerald-400" size={18} />
    },
    {
      id: 'invoice',
      name: 'Aether Invoice',
      tagline: 'Beautiful automated billing nodes.',
      desc: 'Build beautiful, custom client invoices. Receive global payments online, configure automated collection warnings, and track client terms.',
      category: 'Finance & Accounting',
      accent: 'emerald',
      popular: false,
      icon: <FileText className="text-emerald-600 dark:text-emerald-400" size={18} />
    },
    {
      id: 'expense',
      name: 'Aether Expense',
      tagline: 'Receipt scans and approvals.',
      desc: 'Empower teams to capture purchase receipts on the fly, calculate travel mileage, and orchestrate strict custom manager approval loops.',
      category: 'Finance & Accounting',
      accent: 'emerald',
      popular: false,
      icon: <Check className="text-emerald-600 dark:text-emerald-400" size={18} />
    },
    {
      id: 'subscriptions',
      name: 'Aether Subscriptions',
      tagline: 'SaaS recurring billing engine.',
      desc: 'Control customer billing lifecycles. Automate recurring subscription card runs, handle localized tax logic, and reduce churn with dunning syncs.',
      category: 'Finance & Accounting',
      accent: 'emerald',
      popular: true,
      icon: <Sliders className="text-emerald-600 dark:text-emerald-400" size={18} />
    },
    {
      id: 'inventory',
      name: 'Aether Inventory',
      tagline: 'Smart stock & inventory logistics.',
      desc: 'Organize purchase orders, track warehouse inventory thresholds, manage items dynamically, and synchronize multichannel retail grids.',
      category: 'Finance & Accounting',
      accent: 'emerald',
      popular: false,
      icon: <Layers className="text-emerald-600 dark:text-emerald-400" size={18} />
    },

    // Email, Storage & Collaboration
    {
      id: 'mail',
      name: 'Aether Mail',
      tagline: 'Ad-free corporate email hosting.',
      desc: 'Elite, secure email server space built on private network relays. Featuring comprehensive custom domains and strict anti-spam logic.',
      category: 'Email & Collaboration',
      accent: 'amber',
      popular: true,
      icon: <Mail className="text-amber-500" size={18} />
    },
    {
      id: 'cliq',
      name: 'Cliq Chat',
      tagline: 'Context-rich team messaging.',
      desc: 'Collaborative team chat boards, channels, secure video triggers, and interactive commands to bind your workspace tightly.',
      category: 'Email & Collaboration',
      accent: 'amber',
      popular: false,
      icon: <MessageSquare className="text-amber-500" size={18} />
    },
    {
      id: 'workdrive',
      name: 'WorkDrive',
      tagline: 'Secure document cloud storage.',
      desc: 'Organize, sync, and secure collaborative documents and assets across shared folders with advanced file revision history.',
      category: 'Email & Collaboration',
      accent: 'amber',
      popular: false,
      icon: <HardDrive className="text-amber-500" size={18} />
    },
    {
      id: 'meeting',
      name: 'Aether Meeting',
      tagline: 'Webinars and browser video calls.',
      desc: 'Host secure video conferencing, schedule interactive client webinars, and share screens without downloading software.',
      category: 'Email & Collaboration',
      accent: 'amber',
      popular: false,
      icon: <Volume2 className="text-amber-500" size={18} />
    },

    // Project & Task Management
    {
      id: 'projects',
      name: 'Aether Projects',
      tagline: 'Track deliverables and sprints.',
      desc: 'Coordinate team progress, outline milestones, build interactive Gantt timelines, and manage project deliverables under one spatial view.',
      category: 'Project & Task Management',
      accent: 'violet',
      popular: true,
      icon: <Calendar className="text-violet-500" size={18} />
    },
    {
      id: 'sprints',
      name: 'Aether Sprints',
      tagline: 'Agile sprints for dev squads.',
      desc: 'Visual Kanban boards, custom backlog tracking, user stories, and velocity reports to accelerate collaborative engineering squads.',
      category: 'Project & Task Management',
      accent: 'violet',
      popular: false,
      icon: <GitBranch className="text-violet-500" size={18} />
    },

    // Human Resources
    {
      id: 'people',
      name: 'Aether People',
      tagline: 'HR portal and attendance logs.',
      desc: 'Centralize employee directory rosters, manage time-off requests, capture log-in attendance, and scale performance evaluations.',
      category: 'Human Resources',
      accent: 'rose',
      popular: false,
      icon: <UserCheck className="text-rose-500" size={18} />
    },
    {
      id: 'recruit',
      name: 'Aether Recruit',
      tagline: 'Applicant tracking pipeline.',
      desc: 'Streamline resume parse systems, customize interview pipelines, publish to career portals, and automate onboarding offers.',
      category: 'Human Resources',
      accent: 'rose',
      popular: true,
      icon: <Briefcase className="text-rose-500" size={18} />
    },

    // Security & IT Management
    {
      id: 'vault',
      name: 'Aether Vault',
      tagline: 'Zero-knowledge password locker.',
      desc: 'Generate, encrypt, and share system passwords client-side. Built on private AES-GCM local-first keys to prevent network leaks.',
      category: 'IT & Security Management',
      accent: 'cyan',
      popular: true,
      icon: <Lock className="text-cyan-500" size={18} />
    },
    {
      id: 'site24x7',
      name: 'Site24x7 Monitor',
      tagline: 'Endpoint server diagnostics.',
      desc: 'Real-time infrastructure metrics. Monitor cloud database health, website uptime, network routes, and local daemon status.',
      category: 'IT & Security Management',
      accent: 'cyan',
      popular: false,
      icon: <Activity className="text-cyan-500" size={18} />
    },

    // Developer Platforms & Automations
    {
      id: 'creator',
      name: 'Aether Creator',
      tagline: 'Low-code custom database builder.',
      desc: 'Visually assemble enterprise apps. Drag tables, design interface screens, and automate spatial database logic without code.',
      category: 'Developer & Automations',
      accent: 'fuchsia',
      popular: true,
      icon: <Database className="text-fuchsia-500" size={18} />
    },
    {
      id: 'flow',
      name: 'Aether Flow',
      tagline: 'Connect multi-app API endpoints.',
      desc: 'Build conditional automation pipelines. Connect external API webhooks, sync cross-app actions, and log event runs instantly.',
      category: 'Developer & Automations',
      accent: 'fuchsia',
      popular: false,
      icon: <Zap className="text-fuchsia-500" size={18} />
    },
    {
      id: 'analytics',
      name: 'Aether Analytics',
      tagline: 'Business data intelligence.',
      desc: 'Compile deep analytics graphs. Synthesize databases into visual charts and dashboard logs with high-performance reporting metrics.',
      category: 'Developer & Automations',
      accent: 'fuchsia',
      popular: true,
      icon: <Sliders className="text-fuchsia-500" size={18} />
    },

    // Commerce & Legal
    {
      id: 'commerce',
      name: 'Aether Commerce',
      tagline: 'Build online stores and checkout.',
      desc: 'Setup professional digital storefronts, customize secure checkouts, sync inventory nodes, and manage global orders seamlessly.',
      category: 'Commerce & Legal',
      accent: 'teal',
      popular: false,
      icon: <ShoppingCart className="text-teal-500" size={18} />
    },
    {
      id: 'sign',
      name: 'Aether Sign',
      tagline: 'AES-secured digital signatures.',
      desc: 'Legally binding digital signature framework. Lock corporate documents client-side using zero-knowledge private contract validations.',
      category: 'Commerce & Legal',
      accent: 'teal',
      popular: false,
      icon: <Shield className="text-teal-500" size={18} />
    },
  ];

  // Distinct category names
  const categories = useMemo(() => {
    const list = Array.from(new Set(applications.map((app) => app.category)));
    return ['All', ...list];
  }, [applications]);

  // Filter apps
  const filteredApps = useMemo(() => {
    return applications.filter((app) => {
      const matchesSearch =
        app.name.toLowerCase().includes(search.toLowerCase()) ||
        app.tagline.toLowerCase().includes(search.toLowerCase()) ||
        app.desc.toLowerCase().includes(search.toLowerCase());
      
      const matchesCategory =
        activeCategory === 'All' || app.category === activeCategory;

      const matchesHighlight =
        highlightedApps.length === 0 || highlightedApps.includes(app.id);

      return matchesSearch && matchesCategory && matchesHighlight;
    });
  }, [search, activeCategory, highlightedApps, applications]);

  // Smooth scroll
  const handleScrollToCategory = (catName: string) => {
    setActiveCategory(catName);
    setHighlightedApps([]);
    if (catName === 'All') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const ref = categoryRefs.current[catName];
      if (ref) {
        const offset = 100;
        const bodyRect = document.body.getBoundingClientRect().top;
        const elementRect = ref.getBoundingClientRect().top;
        const elementPosition = elementRect - bodyRect;
        const offsetPosition = elementPosition - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
  };

  const handleOpenWizard = () => {
    setWizardStep(1);
    setWizardAnswers({});
    setHighlightedApps([]);
    setIsWizardOpen(true);
  };

  const handleSelectOption = (questionKey: string, val: string) => {
    const nextAnswers = { ...wizardAnswers, [questionKey]: val };
    setWizardAnswers(nextAnswers);

    if (wizardStep < 3) {
      setWizardStep((prev) => prev + 1);
    } else {
      let recs: string[] = [];
      if (nextAnswers.objective === 'sales') {
        recs = ['crm', 'social', 'campaigns'];
      } else if (nextAnswers.objective === 'finance') {
        recs = ['books', 'invoice', 'subscriptions'];
      } else if (nextAnswers.objective === 'dev') {
        recs = ['creator', 'flow', 'analytics'];
      } else {
        recs = ['people', 'recruit', 'projects'];
      }

      setWizardRecommended(recs);
      setWizardStep(4);
    }
  };

  const handleApplyRecommendations = () => {
    setHighlightedApps(wizardRecommended);
    setIsWizardOpen(false);

    confetti({
      particleCount: 125,
      spread: 70,
      origin: { y: 0.65 },
      colors: ['#6366f1', '#10b981', '#a855f7'],
    });
  };

  const handlePlanSelect = (name: string) => {
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#6366f1', '#10b981'],
    });
  };

  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <div className="relative min-h-screen bg-neutral-50 dark:bg-neutral-950 transition-colors duration-300">
      
      {/* Mesh backdrops */}
      <div className="absolute inset-0 bg-radial-gradient pointer-events-none" />
      <div className="absolute inset-0 bg-grid-pattern opacity-60 pointer-events-none" />

      {/* HEADER SECTION */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-white/70 dark:bg-neutral-950/70 border-b border-neutral-200/40 dark:border-neutral-800/40 shadow-sm transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center shadow-md">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 22h20L12 2zm0 4.5l6.5 12h-13L12 6.5z" fill="white" />
              </svg>
            </div>
            <span className="font-bold text-xl tracking-tight text-neutral-900 dark:text-white">Aether Hub</span>
          </a>

          <div className="flex items-center gap-4">
            <button
              onClick={handleOpenWizard}
              className="px-5 py-2.5 text-xs sm:text-[14px] font-bold text-indigo-600 bg-indigo-50 border border-indigo-200/20 hover:bg-indigo-100/50 dark:bg-indigo-950/30 dark:border-indigo-900/30 dark:text-indigo-400 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer shadow-sm"
            >
              <HelpCircle size={15} className="animate-pulse" />
              <span className="hidden sm:inline">Product Finder</span>
            </button>

            <button
              onClick={toggleTheme}
              className="w-10 h-10 rounded-xl flex items-center justify-center border border-neutral-200/50 dark:border-neutral-800/50 hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors cursor-pointer text-neutral-700 dark:text-neutral-300"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? (
                <Sparkles size={16} className="text-yellow-500" />
              ) : (
                <Compass size={16} className="text-indigo-600" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* BODY CONTENT GRID */}
      <main className="max-w-7xl mx-auto px-6 py-12 relative z-10">
        
        {/* SPOTLIGHT HERO ECOSYSTEM BANNER */}
        <div className="w-full rounded-3xl border border-neutral-200/60 dark:border-neutral-800 bg-white dark:bg-neutral-900/60 p-6 sm:p-10 mb-16 relative overflow-hidden shadow-sm">
          <div className="absolute top-[40%] right-[10%] w-80 h-80 rounded-full bg-indigo-500/5 blur-[120px] pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-5">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200/20 text-indigo-600 dark:text-indigo-400 text-[10px] font-bold tracking-wider uppercase">
                <Cpu size={12} className="animate-pulse" />
                <span>UNIFIED ENTERPRISE OPERATING SUITE</span>
              </span>
              
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-neutral-900 dark:text-white leading-[1.05] tracking-tight">
                Aether One:{' '}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-violet-500 to-fuchsia-600 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-500 text-glow">
                  The ultimate operating shell.
                </span>
              </h1>
              
              <p className="text-base sm:text-lg text-neutral-500 dark:text-neutral-400 leading-relaxed max-w-2xl">
                Consolidate your entire business software stack. Access all 40+ spatial databases, cognitive reasoners, billing portals, HR portals, and IT endpoints with one single billing license.
              </p>

              <div className="flex flex-wrap gap-4 pt-3">
                <button
                  onClick={() => {
                    confetti({
                      particleCount: 120,
                      spread: 60,
                      origin: { y: 0.6 },
                    });
                  }}
                  className="px-6 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-[13px] shadow-lg shadow-indigo-600/10 transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <span>Evaluate Aether One</span>
                  <ArrowRight size={14} />
                </button>
                <button
                  onClick={handleOpenWizard}
                  className="px-6 py-3.5 rounded-xl border border-neutral-300 dark:border-neutral-800 bg-white/40 dark:bg-neutral-900/40 backdrop-blur-sm text-neutral-700 dark:text-neutral-300 font-bold text-xs sm:text-[13px] hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-all"
                >
                  Configure Custom Suite
                </button>
              </div>
            </div>

            {/* Graphic sidebar mock inside hero showcase */}
            <div className="lg:col-span-5 hidden lg:flex items-center justify-center">
              <div className="w-full max-w-sm aspect-[4/3] rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 p-6 flex flex-col justify-between shadow-md relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-indigo-500 to-transparent animate-scanline" />
                
                <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800/80 pb-3">
                  <span className="text-[11px] font-bold text-neutral-400 font-mono">CORE_STACKS_RECORDS</span>
                  <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-pulse" />
                </div>
                
                <div className="space-y-2.5 py-4">
                  <div className="h-6.5 rounded-lg bg-white dark:bg-neutral-900 border border-neutral-200/50 dark:border-neutral-800/80 px-3 flex items-center justify-between text-[11px] text-neutral-500 select-none">
                    <span>Aether CRM + Aether Flow</span>
                    <span className="text-indigo-600 font-bold">✓ Bound</span>
                  </div>
                  <div className="h-6.5 rounded-lg bg-white dark:bg-neutral-900 border border-neutral-200/50 dark:border-neutral-800/80 px-3 flex items-center justify-between text-[11px] text-neutral-500 select-none">
                    <span>Aether Books + Subscriptions</span>
                    <span className="text-emerald-600 font-bold">✓ Bound</span>
                  </div>
                  <div className="h-6.5 rounded-lg bg-white dark:bg-neutral-900 border border-neutral-200/50 dark:border-neutral-800/80 px-3 flex items-center justify-between text-[11px] text-neutral-500 select-none">
                    <span>Aether Mail + Cliq Chat</span>
                    <span className="text-amber-500 font-bold">✓ Bound</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[9px] text-neutral-400 font-mono">
                  <span>Licensing: Unified Enterprise</span>
                  <span>v1.0.9</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CONTROLS HEADER BAR */}
        <div className="flex flex-col md:flex-row gap-5 items-stretch md:items-center justify-between mb-10 pb-6 border-b border-neutral-200/50 dark:border-neutral-800">
          
          {/* Interactive Search input */}
          <div className="relative flex items-center flex-1 max-w-md">
            <Search className="absolute left-4 text-neutral-400 dark:text-neutral-500" size={16} />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search business application, feature tag..."
              className="w-full bg-white dark:bg-neutral-900/60 pl-11 pr-5 py-3.5 rounded-2xl border border-neutral-200 dark:border-neutral-800 text-xs sm:text-[13px] text-neutral-800 dark:text-neutral-200 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/20 transition-all shadow-sm"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-3.5 w-6 h-6 rounded-full flex items-center justify-center hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors text-neutral-400 hover:text-neutral-600"
              >
                <X size={13} />
              </button>
            )}
          </div>

          <div className="flex items-center justify-between sm:justify-start gap-4">
            
            {/* Recommendation badge clear anchor */}
            {highlightedApps.length > 0 && (
              <button
                onClick={() => setHighlightedApps([])}
                className="text-xs font-bold text-rose-500 hover:text-rose-600 bg-rose-50 hover:bg-rose-100/50 dark:bg-rose-950/20 dark:border-rose-900/30 px-3 py-2 rounded-xl border border-rose-200/10 transition-colors cursor-pointer flex items-center gap-1"
              >
                <X size={12} />
                <span>Reset Wizard</span>
              </button>
            )}

            {/* Layout view switcher toggle button */}
            <div className="p-1 rounded-xl bg-neutral-100 dark:bg-neutral-900 flex items-center gap-1 border border-neutral-200/30 dark:border-neutral-800/80">
              <button
                onClick={() => setViewMode('grid')}
                className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all cursor-pointer ${
                  viewMode === 'grid'
                    ? 'bg-white dark:bg-neutral-800 text-indigo-600 dark:text-white shadow-sm'
                    : 'text-neutral-400 hover:text-neutral-600'
                }`}
                aria-label="Grid View"
              >
                <LayoutGrid size={15} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all cursor-pointer ${
                  viewMode === 'list'
                    ? 'bg-white dark:bg-neutral-850 text-indigo-600 dark:text-white shadow-sm'
                    : 'text-neutral-400 hover:text-neutral-600'
                }`}
                aria-label="List View"
              >
                <List size={15} />
              </button>
            </div>
          </div>
        </div>

        {/* MAIN LAYOUT SPLIT (Sidebar Left, Apps Right) - wrapped in LayoutGroup */}
        <LayoutGroup>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Floating Category Navigation Sidebar */}
            <aside className="lg:col-span-3 lg:sticky lg:top-32 space-y-2 select-none">
              <h4 className="text-[11px] font-extrabold uppercase tracking-widest text-neutral-400 dark:text-neutral-500 px-3 mb-4">
                FILTER CATEGORY
              </h4>
              
              <div className="flex flex-row lg:flex-col overflow-x-auto lg:overflow-x-visible pb-3 lg:pb-0 gap-1.5 scrollbar-none">
                {categories.map((cat) => {
                  const isSelected = activeCategory === cat;
                  return (
                    <button
                      key={cat}
                      onClick={() => handleScrollToCategory(cat)}
                      className={`relative w-full text-left px-4 py-3 rounded-xl text-[13px] sm:text-[14px] font-bold transition-all duration-200 shrink-0 cursor-pointer ${
                        isSelected
                          ? 'text-indigo-600 dark:text-white bg-white dark:bg-neutral-900 shadow-sm border border-neutral-200/50 dark:border-neutral-800'
                          : 'text-neutral-500 hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-200 hover:bg-neutral-100/40 dark:hover:bg-neutral-900/10'
                      }`}
                    >
                      <span>{cat}</span>
                    </button>
                  );
                })}
              </div>
            </aside>

            {/* Catalog Lists */}
            <div className="lg:col-span-9 space-y-16">
              
              {categories.filter(c => activeCategory === 'All' || c === activeCategory).map((catName) => {
                if (catName === 'All') return null;
 
                const catApps = filteredApps.filter(app => app.category === catName);
                if (catApps.length === 0) return null;
 
                return (
                  <div
                    key={catName}
                    ref={(el) => { categoryRefs.current[catName] = el; }}
                    className="space-y-6 scroll-mt-28"
                  >
                    {/* Category Section Header */}
                    <div className="flex items-center justify-between border-b border-neutral-200/40 dark:border-neutral-800/80 pb-3">
                      <h3 className="text-base sm:text-lg font-extrabold text-neutral-900 dark:text-white tracking-tight">
                        {catName}
                      </h3>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-100 dark:bg-neutral-900 text-neutral-500">
                        {catApps.length} Application{catApps.length !== 1 && 's'}
                      </span>
                    </div>

                    {/* Layout switcher rendering */}
                    <AnimatePresence mode="popLayout">
                      {viewMode === 'grid' ? (
                        // Bento Grid Mode
                        <motion.div
                          layout
                          className="grid grid-cols-1 sm:grid-cols-2 gap-5"
                        >
                          {catApps.map((app) => (
                            <motion.div
                              key={app.id}
                              layout
                              initial={{ opacity: 0, scale: 0.96 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.96 }}
                              transition={{ duration: 0.25 }}
                              className={`group relative overflow-hidden rounded-3xl border bg-white dark:bg-neutral-900 p-6 flex flex-col justify-between hover:scale-102 hover:border-neutral-300 dark:hover:border-neutral-700 transition-all duration-300 select-none spotlight-card ${
                                highlightedApps.includes(app.id)
                                  ? 'border-indigo-500 ring-2 ring-indigo-500/20 shadow-lg shadow-indigo-500/10'
                                  : 'border-neutral-200/60 dark:border-neutral-800'
                              }`}
                              onMouseMove={handleCardMouseMove}
                            >
                              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                              <div>
                                <div className="flex items-center justify-between mb-4">
                                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white ${iconGradientClasses[app.accent] || 'bg-neutral-100'} group-hover:scale-108 transition-all duration-300`}>
                                    {React.cloneElement(app.icon as React.ReactElement<{ className?: string; size?: number }>, { className: 'text-white', size: 20 })}
                                  </div>
                                  
                                  {app.popular && (
                                    <span className="rgb-badge shrink-0">
                                      Popular
                                    </span>
                                  )}
                                </div>

                                <h4 className="text-[17px] sm:text-[19px] font-extrabold tracking-tight text-neutral-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 flex items-center gap-1 transition-colors duration-200">
                                  <span>{app.name}</span>
                                  <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
                                </h4>
                                
                                <p className="text-[13px] sm:text-[14px] font-semibold text-neutral-700 dark:text-neutral-300 block mt-1.5 tracking-tight leading-snug">
                                  {app.tagline}
                                </p>

                                <p className="mt-2.5 text-xs sm:text-[13px] text-neutral-500 dark:text-neutral-400 leading-relaxed font-normal">
                                  {app.desc}
                                </p>
                              </div>

                              <div className="mt-5 pt-3 border-t border-neutral-100 dark:border-neutral-800/80 w-full flex items-center justify-between text-[11px] text-neutral-400 font-semibold group-hover:text-neutral-800 dark:group-hover:text-white transition-colors">
                                <span>Configure Node</span>
                                <span className="text-neutral-300 dark:text-neutral-700">→</span>
                              </div>
                            </motion.div>
                          ))}
                        </motion.div>
                      ) : (
                        // Compact List Mode
                        <motion.div
                          layout
                          className="space-y-2.5"
                        >
                          {catApps.map((app) => (
                            <motion.div
                              key={app.id}
                              layout
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 10 }}
                              className={`group w-full px-5 py-4 rounded-2.5xl border bg-white dark:bg-neutral-900 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-neutral-300 dark:hover:border-neutral-700 transition-all select-none hover:shadow-sm spotlight-card ${
                                highlightedApps.includes(app.id)
                                  ? 'border-indigo-500 ring-1 ring-indigo-500/20'
                                  : 'border-neutral-200/50 dark:border-neutral-800'
                              }`}
                              onMouseMove={handleCardMouseMove}
                            >
                              <div className="flex items-center gap-4 flex-1 pr-4">
                                <div className={`w-9 h-9 rounded-lg flex items-center justify-center text-white shrink-0 ${iconGradientClasses[app.accent] || 'bg-neutral-100'} group-hover:scale-105 transition-all duration-300`}>
                                  {React.cloneElement(app.icon as React.ReactElement<{ className?: string; size?: number }>, { className: 'text-white', size: 18 })}
                                </div>
                                <div>
                                  <h4 className="text-[14px] sm:text-[15.5px] font-bold tracking-tight text-neutral-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 flex items-center gap-2 transition-colors duration-200">
                                    <span>{app.name}</span>
                                    {app.popular && (
                                      <span className="rgb-badge shrink-0 text-[8px] px-1.5 py-0.5">
                                        Popular
                                      </span>
                                    )}
                                  </h4>
                                  <span className="text-xs sm:text-[13px] text-neutral-500 dark:text-neutral-400 font-medium mt-0.5 block leading-tight">
                                    {app.tagline}
                                  </span>
                                </div>
                              </div>

                              <div className="text-xs sm:text-[13px] text-neutral-400 dark:text-neutral-500 hidden md:block max-w-sm flex-1 truncate font-normal leading-normal">
                                {app.desc}
                              </div>

                              <div className="flex items-center gap-3 shrink-0 self-end sm:self-auto">
                                <button
                                  onClick={() => handlePlanSelect(app.name)}
                                  className={`text-[10px] font-bold uppercase tracking-wider px-3.5 py-1.5 rounded-lg border transition-colors cursor-pointer ${accentClasses[app.accent]?.bg} ${accentClasses[app.accent]?.text}`}
                                >
                                  Deploy Node
                                </button>
                              </div>
                            </motion.div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}

              {filteredApps.length === 0 && (
                <div className="text-center py-20 bg-white dark:bg-neutral-900 border border-neutral-200/50 dark:border-neutral-800 rounded-3xl p-8 flex flex-col items-center justify-center gap-4 shadow-sm select-none">
                  <span className="text-xs text-neutral-400 dark:text-neutral-500">No applications match your filtering criteria.</span>
                  <button
                    onClick={() => { setSearch(''); setActiveCategory('All'); setHighlightedApps([]); }}
                    className="px-4 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition-colors cursor-pointer"
                  >
                    Clear All Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </LayoutGroup>
      </main>

      {/* FLOAT INTERACTIVE FINDER BUTTON */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={handleOpenWizard}
          className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white flex items-center justify-center shadow-xl shadow-indigo-600/30 hover:scale-105 transition-all cursor-pointer animate-float"
          aria-label="Open Interactive Product Finder Wizard"
        >
          <HelpCircle size={22} />
        </button>
      </div>

      {/* DYNAMIC FINDER MODAL DIALOG */}
      <AnimatePresence>
        {isWizardOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsWizardOpen(false)}
              className="absolute inset-0 bg-neutral-950/60 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="relative w-full max-w-lg bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 sm:p-8 shadow-2xl z-10 flex flex-col justify-between min-h-[360px]"
            >
              <button
                onClick={() => setIsWizardOpen(false)}
                className="absolute top-5 right-5 w-8 h-8 rounded-full flex items-center justify-center hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors text-neutral-400 hover:text-neutral-700 cursor-pointer"
              >
                <X size={15} />
              </button>

              <div className="flex gap-1.5 mb-6 pr-8 select-none">
                {[1, 2, 3, 4].map((stepNum) => (
                  <div
                    key={stepNum}
                    className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                      stepNum <= wizardStep
                        ? 'bg-indigo-600 dark:bg-indigo-500'
                        : 'bg-neutral-100 dark:bg-neutral-800'
                    }`}
                  />
                ))}
              </div>

              <div className="flex-1 flex flex-col justify-center">
                {wizardStep === 1 && (
                  <div className="space-y-4">
                    <h3 className="text-[15px] sm:text-base font-bold text-neutral-900 dark:text-white tracking-tight">
                      What operational bottleneck is Aether solving for your team?
                    </h3>
                    <div className="grid grid-cols-1 gap-2">
                      <WizardOptionButton label="Sales pipelines & customer tracking" onClick={() => handleSelectOption('objective', 'sales')} />
                      <WizardOptionButton label="Business finances, accounting, & invoice billing" onClick={() => handleSelectOption('objective', 'finance')} />
                      <WizardOptionButton label="Dynamic developer databases & server flows" onClick={() => handleSelectOption('objective', 'dev')} />
                      <WizardOptionButton label="Staff onboarding, timesheets, & project deliverables" onClick={() => handleSelectOption('objective', 'people')} />
                    </div>
                  </div>
                )}

                {wizardStep === 2 && (
                  <div className="space-y-4">
                    <h3 className="text-[15px] sm:text-base font-bold text-neutral-900 dark:text-white tracking-tight">
                      What size is your current operational fleet?
                    </h3>
                    <div className="grid grid-cols-1 gap-2">
                      <WizardOptionButton label="Individual builder / Solo founder" onClick={() => handleSelectOption('size', 'solo')} />
                      <WizardOptionButton label="Growing squad (2 to 15 members)" onClick={() => handleSelectOption('size', 'team')} />
                      <WizardOptionButton label="Enterprise caliber (20+ members)" onClick={() => handleSelectOption('size', 'enterprise')} />
                    </div>
                  </div>
                )}

                {wizardStep === 3 && (
                  <div className="space-y-4">
                    <h3 className="text-[15px] sm:text-base font-bold text-neutral-900 dark:text-white tracking-tight">
                      Deployment and storage sync preference?
                    </h3>
                    <div className="grid grid-cols-1 gap-2">
                      <WizardOptionButton label="Local-first offline indexedDB writes (Zero latency)" onClick={() => handleSelectOption('sync', 'local')} />
                      <WizardOptionButton label="Distributed cloud backup sync (Differential CRDT nodes)" onClick={() => handleSelectOption('sync', 'cloud')} />
                    </div>
                  </div>
                )}

                {wizardStep === 4 && (
                  <div className="space-y-5 text-center flex flex-col items-center select-none">
                    <div className="w-12 h-12 rounded-full bg-emerald-500/10 dark:bg-emerald-500/5 text-emerald-500 flex items-center justify-center mb-2">
                      <Check size={24} />
                    </div>
                    <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
                      Ecosystem recommendation ready!
                    </h3>
                    <p className="text-xs text-neutral-500 dark:text-neutral-400 max-w-sm">
                      Based on your operational parameters, Aether recommends deploying the following three bound integration nodes:
                    </p>

                    <div className="flex flex-wrap gap-2.5 justify-center py-2">
                      {wizardRecommended.map((id) => {
                        const matched = applications.find(a => a.id === id);
                        return (
                          <span
                            key={id}
                            className={`px-3.5 py-1.5 rounded-xl border font-bold text-xs ${accentClasses[matched?.accent || 'indigo']?.bg} ${accentClasses[matched?.accent || 'indigo']?.text}`}
                          >
                            {matched?.name || id}
                          </span>
                        );
                      })}
                    </div>

                    <button
                      onClick={handleApplyRecommendations}
                      className="w-full mt-4 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-[13px] tracking-wide uppercase transition-all duration-150 cursor-pointer shadow-md shadow-indigo-600/10"
                    >
                      Highlight Custom Suite
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}

function WizardOptionButton({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="w-full text-left px-5 py-3.5 text-xs sm:text-[13px] font-bold text-neutral-700 hover:text-indigo-600 dark:text-neutral-300 dark:hover:text-white bg-neutral-50 hover:bg-indigo-50/50 dark:bg-neutral-950/60 dark:hover:bg-indigo-950/20 border border-neutral-200 dark:border-neutral-800 hover:border-indigo-500/20 rounded-2xl transition-all cursor-pointer select-none"
    >
      {label}
    </button>
  );
}
