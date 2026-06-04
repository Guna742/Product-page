'use client';

import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { 
  Search, LayoutGrid, List, Compass, HelpCircle, X, ArrowRight, Check, ExternalLink, 
  Terminal, Shield, Keyboard, Zap, GitBranch, Layers, Lock, Sliders, Cpu, Sparkles, 
  Activity, DollarSign, Calendar, MessageSquare, Briefcase, FileText, ShoppingCart, 
  Database, UserCheck, HardDrive, Mail, Eye, Info, Volume2, ArrowUpRight,
  Plus, Trash2, Settings, Play, Pause, RefreshCw, SlidersHorizontal, Download, Code, Copy,
  ChevronRight
} from 'lucide-react';
import { useTheme } from '@/components/ThemeContext';
import confetti from 'canvas-confetti';



import { PiCompassDuotone, PiDownloadSimpleDuotone } from 'react-icons/pi';


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

/* ── Viewport Fade-Up Observer Hook ──────────────────────── */
function useFadeUpObserver(trigger: any) {
  useEffect(() => {
    const els = document.querySelectorAll('.fade-up');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -30px 0px' }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [trigger]);
}

interface FloatingBubble {
  id: number;
  top: string;
  left?: string;
  right?: string;
  size: number;
  color: string;
  duration: number;
  delay?: number;
}

const backgroundBubbles: FloatingBubble[] = [
  { id: 1, top: '2%', left: '-15%', size: 600, color: 'indigo', duration: 24 },
  { id: 2, top: '12%', right: '-18%', size: 650, color: 'emerald', duration: 32, delay: 1 },
  { id: 3, top: '24%', left: '-20%', size: 550, color: 'rose', duration: 28, delay: 2 },
  { id: 4, top: '36%', right: '-16%', size: 620, color: 'amber', duration: 30, delay: 0.5 },
  { id: 5, top: '48%', left: '-18%', size: 580, color: 'cyan', duration: 27, delay: 1.5 },
  { id: 6, top: '60%', right: '-20%', size: 680, color: 'fuchsia', duration: 34, delay: 2.5 },
  { id: 7, top: '72%', left: '-15%', size: 600, color: 'teal', duration: 29, delay: 0.8 },
  { id: 8, top: '82%', right: '-18%', size: 700, color: 'violet', duration: 33, delay: 1.2 },
  { id: 9, top: '92%', left: '-18%', size: 560, color: 'rose', duration: 31, delay: 2.2 },
  { id: 10, top: '97%', right: '-15%', size: 640, color: 'indigo', duration: 36, delay: 1.8 },
];

export default function AllProducts() {
  const { theme, toggleTheme } = useTheme();
  
  // Standard States
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isWizardOpen, setIsWizardOpen] = useState(false);
  const [wizardStep, setWizardStep] = useState(1);
  const [wizardAnswers, setWizardAnswers] = useState<Record<string, string>>({});
  const [wizardRecommended, setWizardRecommended] = useState<string[]>([]);
  const [highlightedApps, setHighlightedApps] = useState<string[]>([]);

  // Workspace Suite states & Console states
  const [activeStack, setActiveStack] = useState<string[]>(['crm', 'books', 'mail']);
  const [selectedAppForConsole, setSelectedAppForConsole] = useState<AppItem | null>(null);
  const [isConsoleOpen, setIsConsoleOpen] = useState(false);
  const [consoleLogs, setConsoleLogs] = useState<{ text: string; type: 'info' | 'success' | 'warn' | 'error' | 'input'; time: string }[]>([]);
  const [consoleToggles, setConsoleToggles] = useState({ autoScale: false, highFreqSync: false, devBypass: false });
  const [isFlowOpen, setIsFlowOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isFooterVisible, setIsFooterVisible] = useState(false);

  // Detect when footer is in view to hide bottom floating elements
  useEffect(() => {
    const footer = document.querySelector('footer');
    if (!footer) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsFooterVisible(entry.isIntersecting);
      },
      {
        root: null,
        threshold: 0.05,
      }
    );

    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const toggleActiveStack = (appId: string) => {
    setActiveStack((prev) => {
      const exists = prev.includes(appId);
      if (exists) {
        showToast("Removed from Active Stack");
        return prev.filter((id) => id !== appId);
      } else {
        showToast("Added to Active Stack!");
        confetti({
          particleCount: 40,
          spread: 40,
          colors: ['#6366f1', '#10b981'],
          origin: { y: 0.8 }
        });
        return [...prev, appId];
      }
    });
  };

  // Simulated Console booting effect
  useEffect(() => {
    if (!selectedAppForConsole) return;

    const bootSequence = [
      { text: `[SYSTEM] Booting integration node for ${selectedAppForConsole.name}...`, type: 'info' as const },
      { text: `[LOADER] Parsing localized telemetry policies...`, type: 'info' as const },
      { text: `[DATABASE] Syncing peer differential CRDT stores...`, type: 'info' as const },
      { text: `[NETWORK] Handshake successful. Routing queries through Aether Relay.`, type: 'success' as const },
      { text: `[STATUS] ${selectedAppForConsole.name.toUpperCase()} daemon listening on port 8080.`, type: 'success' as const }
    ];

    setConsoleLogs([]);
    setConsoleToggles({ autoScale: false, highFreqSync: false, devBypass: false });

    let timer: NodeJS.Timeout;
    let index = 0;

    const addNextLog = () => {
      if (index < bootSequence.length) {
        const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
        setConsoleLogs((prev) => [...prev, { ...bootSequence[index], time: timeStr }]);
        index++;
        timer = setTimeout(addNextLog, 300);
      }
    };

    timer = setTimeout(addNextLog, 100);

    return () => {
      clearTimeout(timer);
    };
  }, [selectedAppForConsole]);

  const handleToggleConsoleOption = (key: 'autoScale' | 'highFreqSync' | 'devBypass', label: string) => {
    const nextVal = !consoleToggles[key];
    setConsoleToggles((prev) => ({ ...prev, [key]: nextVal }));

    const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const logText = nextVal 
      ? `[USER-ACTION] Enabled ${label}. Spawning worker thread...`
      : `[USER-ACTION] Disabled ${label}. Terminating background processes...`;

    setConsoleLogs((prev) => [...prev, { text: logText, type: 'info', time: timeStr }]);

    setTimeout(() => {
      const successText = nextVal
        ? `[SYSTEM] ${label} telemetry synced successfully.`
        : `[SYSTEM] ${label} thread destroyed. Memory buffer reclaimed.`;
      setConsoleLogs((prev) => [...prev, { text: successText, type: 'success', time: timeStr }]);
    }, 550);
  };

  // Pricing math calculations memoized
  const pricingSummary = useMemo(() => {
    const count = activeStack.length;
    const pricePerApp = 9;
    const baseCost = count * pricePerApp;

    let discountPct = 0;
    if (count >= 5) discountPct = 30;
    else if (count >= 3) discountPct = 20;

    const discountAmount = (baseCost * discountPct) / 100;
    const totalCost = baseCost - discountAmount;

    return {
      count,
      baseCost,
      discountPct,
      discountAmount,
      totalCost: totalCost.toFixed(2),
    };
  }, [activeStack]);

  const handleExportConfig = () => {
    const config = {
      aether_suite: activeStack,
      timestamp: new Date().toISOString(),
      region: "us-east-1",
      sync_mode: "differential-crdt",
      licensing: activeStack.length >= 4 ? "Aether One Pack" : "Standard Node Pack",
      meta: {
        total_nodes: activeStack.length,
        estimated_billing: `$${pricingSummary.totalCost}/mo`
      }
    };
    navigator.clipboard.writeText(JSON.stringify(config, null, 2));
    showToast("Suite configuration copied to clipboard!");
    confetti({
      particleCount: 50,
      spread: 30,
      origin: { y: 0.85 },
      colors: ['#6366f1', '#10b981']
    });
  };

  // Category Refs
  const categoryRefs = useRef<Record<string, HTMLDivElement | null>>({});
  // Right scroll panel ref (for split-scroll)
  const scrollPanelRef = useRef<HTMLDivElement | null>(null);



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
      icon: <span className="material-symbols-rounded" style={{ fontSize: "inherit", fontVariationSettings: "'FILL' 1" }}>stacked_line_chart</span>
    },
    {
      id: 'bigin',
      name: 'Bigin CRM',
      tagline: 'Pipeline management for small fleets.',
      desc: 'The visual, single-pipeline CRM designed to help startups, micro-teams, and creators organize deal workflows with absolute ease.',
      category: 'Sales & Marketing',
      accent: 'indigo',
      popular: false,
      icon: <span className="material-symbols-rounded" style={{ fontSize: "inherit", fontVariationSettings: "'FILL' 1" }}>trending_up</span>
    },
    {
      id: 'campaigns',
      name: 'Aether Campaigns',
      tagline: 'High-performance email marketing.',
      desc: 'Orchestrate newsletter broadcasts, schedule automated email sequences, and compile visual A/B tests with real-time vector reporting.',
      category: 'Sales & Marketing',
      accent: 'indigo',
      popular: false,
      icon: <span className="material-symbols-rounded" style={{ fontSize: "inherit", fontVariationSettings: "'FILL' 1" }}>campaign</span>
    },
    {
      id: 'social',
      name: 'Aether Social',
      tagline: 'Centralized social media scheduler.',
      desc: 'Publish content, schedule threads, monitor brand mentions, and scale community visibility across multiple networks in a single click.',
      category: 'Sales & Marketing',
      accent: 'indigo',
      popular: true,
      icon: <span className="material-symbols-rounded" style={{ fontSize: "inherit", fontVariationSettings: "'FILL' 1" }}>chat</span>
    },
    {
      id: 'salesiq',
      name: 'SalesIQ',
      tagline: 'Visitor tracking and live support.',
      desc: 'Identify high-value leads on your website in real-time, compile user click paths, and deliver context-aware support chat routes.',
      category: 'Sales & Marketing',
      accent: 'indigo',
      popular: false,
      icon: <span className="material-symbols-rounded" style={{ fontSize: "inherit", fontVariationSettings: "'FILL' 1" }}>visibility</span>
    },
    {
      id: 'pagesense',
      name: 'PageSense',
      tagline: 'Optimized conversion & heatmaps.',
      desc: 'Measure website layout performance using dynamic heatmaps, visitor logs, click tracking, and custom conversion funnel builders.',
      category: 'Sales & Marketing',
      accent: 'indigo',
      popular: false,
      icon: <span className="material-symbols-rounded" style={{ fontSize: "inherit", fontVariationSettings: "'FILL' 1" }}>data_thresholding</span>
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
      icon: <span className="material-symbols-rounded" style={{ fontSize: "inherit", fontVariationSettings: "'FILL' 1" }}>account_balance_wallet</span>
    },
    {
      id: 'invoice',
      name: 'Aether Invoice',
      tagline: 'Beautiful automated billing nodes.',
      desc: 'Build beautiful, custom client invoices. Receive global payments online, configure automated collection warnings, and track client terms.',
      category: 'Finance & Accounting',
      accent: 'emerald',
      popular: false,
      icon: <span className="material-symbols-rounded" style={{ fontSize: "inherit", fontVariationSettings: "'FILL' 1" }}>receipt_long</span>
    },
    {
      id: 'expense',
      name: 'Aether Expense',
      tagline: 'Receipt scans and approvals.',
      desc: 'Empower teams to capture purchase receipts on the fly, calculate travel mileage, and orchestrate strict custom manager approval loops.',
      category: 'Finance & Accounting',
      accent: 'emerald',
      popular: false,
      icon: <span className="material-symbols-rounded" style={{ fontSize: "inherit", fontVariationSettings: "'FILL' 1" }}>fact_check</span>
    },
    {
      id: 'subscriptions',
      name: 'Aether Subscriptions',
      tagline: 'SaaS recurring billing engine.',
      desc: 'Control customer billing lifecycles. Automate recurring subscription card runs, handle localized tax logic, and reduce churn with dunning syncs.',
      category: 'Finance & Accounting',
      accent: 'emerald',
      popular: true,
      icon: <span className="material-symbols-rounded" style={{ fontSize: "inherit", fontVariationSettings: "'FILL' 1" }}>data_thresholding</span>
    },
    {
      id: 'inventory',
      name: 'Aether Inventory',
      tagline: 'Smart stock & inventory logistics.',
      desc: 'Organize purchase orders, track warehouse inventory thresholds, manage items dynamically, and synchronize multichannel retail grids.',
      category: 'Finance & Accounting',
      accent: 'emerald',
      popular: false,
      icon: <span className="material-symbols-rounded" style={{ fontSize: "inherit", fontVariationSettings: "'FILL' 1" }}>stacked_line_chart</span>
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
      icon: <span className="material-symbols-rounded" style={{ fontSize: "inherit", fontVariationSettings: "'FILL' 1" }}>campaign</span>
    },
    {
      id: 'cliq',
      name: 'Cliq Chat',
      tagline: 'Context-rich team messaging.',
      desc: 'Collaborative team chat boards, channels, secure video triggers, and interactive commands to bind your workspace tightly.',
      category: 'Email & Collaboration',
      accent: 'amber',
      popular: false,
      icon: <span className="material-symbols-rounded" style={{ fontSize: "inherit", fontVariationSettings: "'FILL' 1" }}>chat</span>
    },
    {
      id: 'workdrive',
      name: 'WorkDrive',
      tagline: 'Secure document cloud storage.',
      desc: 'Organize, sync, and secure collaborative documents and assets across shared folders with advanced file revision history.',
      category: 'Email & Collaboration',
      accent: 'amber',
      popular: false,
      icon: <span className="material-symbols-rounded" style={{ fontSize: "inherit", fontVariationSettings: "'FILL' 1" }}>folder</span>
    },
    {
      id: 'meeting',
      name: 'Aether Meeting',
      tagline: 'Webinars and browser video calls.',
      desc: 'Host secure video conferencing, schedule interactive client webinars, and share screens without downloading software.',
      category: 'Email & Collaboration',
      accent: 'amber',
      popular: false,
      icon: <span className="material-symbols-rounded" style={{ fontSize: "inherit", fontVariationSettings: "'FILL' 1" }}>video_call</span>
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
      icon: <span className="material-symbols-rounded" style={{ fontSize: "inherit", fontVariationSettings: "'FILL' 1" }}>task</span>
    },
    {
      id: 'sprints',
      name: 'Aether Sprints',
      tagline: 'Agile sprints for dev squads.',
      desc: 'Visual Kanban boards, custom backlog tracking, user stories, and velocity reports to accelerate collaborative engineering squads.',
      category: 'Project & Task Management',
      accent: 'violet',
      popular: false,
      icon: <span className="material-symbols-rounded" style={{ fontSize: "inherit", fontVariationSettings: "'FILL' 1" }}>account_tree</span>
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
      icon: <span className="material-symbols-rounded" style={{ fontSize: "inherit", fontVariationSettings: "'FILL' 1" }}>groups</span>
    },
    {
      id: 'recruit',
      name: 'Aether Recruit',
      tagline: 'Applicant tracking pipeline.',
      desc: 'Streamline resume parse systems, customize interview pipelines, publish to career portals, and automate onboarding offers.',
      category: 'Human Resources',
      accent: 'rose',
      popular: true,
      icon: <span className="material-symbols-rounded" style={{ fontSize: "inherit", fontVariationSettings: "'FILL' 1" }}>work</span>
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
      icon: <span className="material-symbols-rounded" style={{ fontSize: "inherit", fontVariationSettings: "'FILL' 1" }}>lock</span>
    },
    {
      id: 'site24x7',
      name: 'Site24x7 Monitor',
      tagline: 'Endpoint server diagnostics.',
      desc: 'Real-time infrastructure metrics. Monitor cloud database health, website uptime, network routes, and local daemon status.',
      category: 'IT & Security Management',
      accent: 'cyan',
      popular: false,
      icon: <span className="material-symbols-rounded" style={{ fontSize: "inherit", fontVariationSettings: "'FILL' 1" }}>trending_up</span>
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
      icon: <span className="material-symbols-rounded" style={{ fontSize: "inherit", fontVariationSettings: "'FILL' 1" }}>database</span>
    },
    {
      id: 'flow',
      name: 'Aether Flow',
      tagline: 'Connect multi-app API endpoints.',
      desc: 'Build conditional automation pipelines. Connect external API webhooks, sync cross-app actions, and log event runs instantly.',
      category: 'Developer & Automations',
      accent: 'fuchsia',
      popular: false,
      icon: <span className="material-symbols-rounded" style={{ fontSize: "inherit", fontVariationSettings: "'FILL' 1" }}>bolt</span>
    },
    {
      id: 'analytics',
      name: 'Aether Analytics',
      tagline: 'Business data intelligence.',
      desc: 'Compile deep analytics graphs. Synthesize databases into visual charts and dashboard logs with high-performance reporting metrics.',
      category: 'Developer & Automations',
      accent: 'fuchsia',
      popular: true,
      icon: <span className="material-symbols-rounded" style={{ fontSize: "inherit", fontVariationSettings: "'FILL' 1" }}>data_thresholding</span>
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
      icon: <span className="material-symbols-rounded" style={{ fontSize: "inherit", fontVariationSettings: "'FILL' 1" }}>storefront</span>
    },
    {
      id: 'sign',
      name: 'Aether Sign',
      tagline: 'AES-secured digital signatures.',
      desc: 'Legally binding digital signature framework. Lock corporate documents client-side using zero-knowledge private contract validations.',
      category: 'Commerce & Legal',
      accent: 'teal',
      popular: false,
      icon: <span className="material-symbols-rounded" style={{ fontSize: "inherit", fontVariationSettings: "'FILL' 1" }}>draw</span>
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
      
      const matchesHighlight =
        highlightedApps.length === 0 || highlightedApps.includes(app.id);

      return matchesSearch && matchesHighlight;
    });
  }, [search, highlightedApps, applications]);

  // Bind fade-up observer to the filtered list changes
  useFadeUpObserver(filteredApps);

  // Smooth scroll
  // Smooth scroll
  const handleScrollToCategory = (catName: string) => {
    setActiveCategory(catName);
    setHighlightedApps([]);
    if (catName === 'All') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const ref = categoryRefs.current[catName];
      if (ref) {
        // Calculate offset (header height 80px + sticky search bar height 58px + margin 16px)
        const headerOffset = 154;
        const elementPosition = ref.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - headerOffset;
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }
  };

  // IntersectionObserver — updates active category as window scrolls (exactly like Zoho)
  useEffect(() => {
    const intersectingMap: Record<string, boolean> = {};

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const cat = (entry.target as HTMLDivElement).dataset.category;
          if (cat) {
            intersectingMap[cat] = entry.isIntersecting;
          }
        });

        // Check if we are scrolled to the very bottom of the page
        const isAtBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 150;
        
        if (isAtBottom) {
          const visibleCats = categories.filter((c) => c !== 'All' && categoryRefs.current[c]);
          if (visibleCats.length > 0) {
            setActiveCategory(visibleCats[visibleCats.length - 1]);
            return;
          }
        }

        // Find all categories that are currently intersecting
        const activeCategories = Object.keys(intersectingMap).filter(
          (cat) => intersectingMap[cat]
        );

        if (activeCategories.length > 0) {
          // Select the category closest to the top area (about 154px offset)
          let bestCat = activeCategories[0];
          let minTop = Infinity;

          activeCategories.forEach((cat) => {
            const ref = categoryRefs.current[cat];
            if (ref) {
              const top = ref.getBoundingClientRect().top;
              // We want the section that is closest to our sticky header offset (154px)
              const dist = Math.abs(top - 154);
              if (dist < minTop) {
                minTop = dist;
                bestCat = cat;
              }
            }
          });

          setActiveCategory(bestCat);
        }
      },
      {
        root: null, // viewport
        threshold: [0, 0.05, 0.1, 0.2],
        rootMargin: '-154px 0px -10% 0px', // check elements below the header/search offset
      }
    );

    // Observe all category section elements
    Object.values(categoryRefs.current).forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filteredApps]);

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
    <div className="relative min-h-screen bg-[var(--background)] transition-colors duration-300">
      
      {/* Mesh backdrops */}
      <div className="fixed inset-0 bg-radial-gradient pointer-events-none" />

      {/* Background floating bubbles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {backgroundBubbles.map((bubble) => (
          <motion.div
            key={bubble.id}
            animate={{
              x: [0, bubble.id % 2 === 0 ? 25 : -25, bubble.id % 2 === 0 ? -12 : 12, 0],
              y: [0, bubble.id % 3 === 0 ? -25 : 25, bubble.id % 3 === 0 ? 12 : -12, 0],
              scale: [1, 1.05, 0.97, 1],
              opacity: [0.75, 0.9, 0.8, 0.75],
            }}
            transition={{
              duration: bubble.duration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: bubble.delay || 0,
            }}
            className="absolute rounded-full"
            style={{
              top: bubble.top,
              left: bubble.left,
              right: bubble.right,
              width: bubble.size,
              height: bubble.size,
              background: `var(--bubble-${bubble.color})`,
              filter: 'blur(65px)',
              willChange: 'transform, opacity',
            }}
          />
        ))}
      </div>

      {/* ── HEADER ─────────────────────────────────────────────── */}
      <header className="site-header sticky top-0 z-40 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-3">
          <a href="/" className="flex items-center gap-2 sm:gap-2.5 group shrink-0">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-200" style={{ background: 'linear-gradient(135deg,#6366f1,#7c3aed)', boxShadow: '0 4px 12px rgba(99,102,241,0.35)' }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L2 22h20L12 2zm0 4.5l6.5 12h-13L12 6.5z" fill="white" />
              </svg>
            </div>
            <span className="font-extrabold text-[17px] sm:text-[19px] tracking-tight text-neutral-900 dark:text-white">Aether Hub</span>
          </a>

          <div className="flex items-center gap-2 sm:gap-2.5">
            {activeStack.length > 0 && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                onClick={() => setIsFlowOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 sm:hidden rounded-xl text-white text-[11px] font-bold cursor-pointer"
                style={{ background: 'linear-gradient(135deg,#6366f1,#7c3aed)', boxShadow: '0 3px 10px rgba(99,102,241,0.35)' }}
              >
                <Layers size={12} />
                <span>{activeStack.length} Active</span>
              </motion.button>
            )}

            <button
              onClick={handleOpenWizard}
              className="flex items-center gap-1.5 px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-[13px] font-bold text-indigo-600 dark:text-indigo-400 rounded-xl cursor-pointer transition-colors duration-200 hover:text-indigo-700 dark:hover:text-indigo-300"
              style={{ background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.18)' }}
            >
              <HelpCircle size={14} className="animate-micro-bounce" />
              <span className="hidden sm:inline">Product Finder</span>
            </button>

            <button
              onClick={toggleTheme}
              className="w-9 h-9 rounded-xl flex items-center justify-center cursor-pointer transition-all duration-200 text-neutral-600 dark:text-neutral-300 hover:scale-110"
              style={{ background: theme === 'dark' ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.05)', border: theme === 'dark' ? '1px solid rgba(255,255,255,0.09)' : '1px solid rgba(0,0,0,0.08)' }}
              aria-label="Toggle theme"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={theme}
                  initial={{ opacity: 0, rotate: -90, scale: 0.7 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: 90, scale: 0.7 }}
                  transition={{ duration: 0.15 }}
                >
                  {theme === 'dark'
                    ? <Sparkles size={16} className="text-amber-400" />
                    : <PiCompassDuotone size={18} className="text-indigo-600" />}
                </motion.div>
              </AnimatePresence>
            </button>
          </div>
        </div>
      </header>

      {/* ── MAIN ─────────────────────────────────────────────── */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-7 sm:py-10">
        
        {/* HERO BANNER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="hero-banner p-6 sm:p-9 lg:p-10 mb-9 sm:mb-12">
          {/* Ambient orbs */}
          <div className="absolute top-[20%] right-[6%] w-80 h-80 rounded-full pointer-events-none animate-orb" style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.1) 0%, transparent 70%)' }} />
          <div className="absolute bottom-0 left-[15%] w-64 h-64 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.07) 0%, transparent 70%)' }} />
          <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, rgba(99,102,241,0.25), transparent)' }} />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <motion.span
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.4 }}
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200/30 dark:border-indigo-800/40 text-indigo-600 dark:text-indigo-400 text-[9px] sm:text-[10px] font-bold tracking-widest uppercase"
              >
                <Cpu size={10} className="animate-pulse" />
                <span>UNIFIED ENTERPRISE OPERATING SUITE</span>
              </motion.span>
              
              <motion.h1
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.18, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="text-2xl sm:text-4xl lg:text-5xl xl:text-6xl font-black text-neutral-900 dark:text-white leading-[1.1] sm:leading-[1.05] tracking-tight"
              >
                Aether One:{' '}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-violet-500 to-fuchsia-600 dark:from-indigo-400 dark:via-purple-400 dark:to-pink-500 text-glow animate-text-shimmer">
                  The ultimate operating shell.
                </span>
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.28, duration: 0.45 }}
                className="text-sm sm:text-[15px] lg:text-base text-neutral-500 dark:text-neutral-400 leading-relaxed max-w-xl"
              >
                Consolidate your entire business software stack. Access all 40+ spatial databases, cognitive reasoners, billing portals, HR portals, and IT endpoints with one single billing license.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.38, duration: 0.4 }}
                className="flex flex-col xs:flex-row gap-3 pt-2"
              >
                <button
                  onClick={() => {
                    confetti({ particleCount: 120, spread: 60, origin: { y: 0.6 } });
                  }}
                  className="btn-primary flex-1 xs:flex-initial"
                >
                  <span>Evaluate Aether One</span>
                  <ArrowRight size={14} />
                </button>
                <button
                  onClick={handleOpenWizard}
                  className="btn-secondary flex-1 xs:flex-initial"
                >
                  Configure Custom Suite
                </button>
              </motion.div>
            </div>

            {/* Graphic sidebar — only on large screens */}
            <div className="lg:col-span-5 hidden lg:flex items-center justify-center">
              <div className="w-full max-w-sm aspect-[4/3] rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-950 p-6 flex flex-col justify-between shadow-md relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-indigo-500 to-transparent animate-scanline" />
                <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800/80 pb-3">
                  <span className="text-[11px] font-bold text-neutral-400 font-mono">CORE_STACKS_RECORDS</span>
                  <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-pulse" />
                </div>
                <div className="space-y-2.5 py-4">
                  {[['Aether CRM + Aether Flow','text-indigo-600'],['Aether Books + Subscriptions','text-emerald-600'],['Aether Mail + Cliq Chat','text-amber-500']].map(([label, cls]) => (
                    <div key={label} className="h-7 rounded-lg bg-white dark:bg-neutral-900 border border-neutral-200/50 dark:border-neutral-800/80 px-3 flex items-center justify-between text-[11px] text-neutral-500 select-none">
                      <span>{label}</span>
                      <span className={`${cls} font-bold`}>✓ Bound</span>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between text-[9px] text-neutral-400 font-mono">
                  <span>Licensing: Unified Enterprise</span>
                  <span>v1.0.9</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>


        {/* MAIN LAYOUT SPLIT — sticky dual-panel (exactly like Zoho) */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">

          {/* ─── LEFT: Sticky category sidebar ─────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.25, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="sidebar-panel hidden lg:flex flex-col w-56 xl:w-64 shrink-0 sticky top-[72px] max-h-[calc(100vh-90px)] overflow-y-auto p-4 scrollbar-none"
          >
            {/* Sidebar header */}
            <div className="px-1 pb-3 mb-1" style={{ borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
              <p className="text-[9.5px] font-black uppercase tracking-[0.2em] text-neutral-400 dark:text-neutral-500">All Apps</p>
            </div>

            <div className="py-2 space-y-0.5">
              <div className="flex items-center gap-2 px-2 py-1.5 mb-1">
                <span className="w-1.5 h-4 rounded-full shrink-0" style={{ background: 'linear-gradient(180deg,#6366f1,#8b5cf6)' }} />
                <span className="text-[11.5px] font-extrabold text-neutral-900 dark:text-white tracking-tight">Apps</span>
              </div>

              {categories.filter(c => c !== 'All').map((cat) => {
                const isActive = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => handleScrollToCategory(cat)}
                    className={`w-full text-left px-3 py-2.5 rounded-xl text-[12.5px] font-semibold transition-all duration-200 cursor-pointer relative overflow-hidden flex items-center justify-between ${
                      isActive
                        ? 'sidebar-item-active'
                        : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200 hover:bg-neutral-100/60 dark:hover:bg-white/5'
                    }`}
                  >
                    <span>{cat}</span>
                    {isActive && <ChevronRight size={12} className="text-indigo-500 shrink-0" />}
                  </button>
                );
              })}
            </div>
          </motion.div>

          {/* ─── Mobile: category tabs (sticky) ─── */}
          <div className="mobile-cat-sticky lg:hidden w-full sticky top-14 sm:top-16 z-30 py-2.5 px-4">
            <div className="flex overflow-x-auto gap-1.5 scrollbar-none">
              {categories.filter(c => c !== 'All').map((cat) => {
                const isActive = activeCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => handleScrollToCategory(cat)}
                    className={`shrink-0 px-3.5 py-1.5 rounded-full text-[11px] font-bold whitespace-nowrap cursor-pointer transition-all duration-200 ${
                      isActive
                        ? 'text-white'
                        : 'bg-neutral-100 dark:bg-white/8 text-neutral-500 dark:text-neutral-400 hover:bg-neutral-200 dark:hover:bg-white/12'
                    }`}
                    style={isActive ? { background: 'linear-gradient(135deg,#6366f1,#7c3aed)', boxShadow: '0 2px 8px rgba(99,102,241,0.3)' } : {}}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>

          {/* ─── RIGHT: Content panel (scrolls with window) ──────── */}
          <div
            ref={scrollPanelRef}
            className="flex-1 w-full space-y-10"
          >
            {/* Search + controls (sticky) */}
            <div className="search-sticky sticky top-14 sm:top-16 z-20 py-3 px-0 flex items-center gap-2.5 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-neutral-400 dark:text-neutral-500" size={14} />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search apps or features..."
                  className="search-input w-full pl-10 pr-9 py-2.5 text-[13px] text-neutral-800 dark:text-neutral-100 placeholder-neutral-400 dark:placeholder-neutral-500"
                />
                {search && (
                  <button onClick={() => setSearch('')} className="absolute right-2.5 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full flex items-center justify-center text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 dark:hover:bg-white/10 transition-colors">
                    <X size={11} />
                  </button>
                )}
              </div>
              <div className="flex items-center gap-0.5 p-1 rounded-xl shrink-0" style={{ background: 'rgba(0,0,0,0.05)', border: '1px solid rgba(0,0,0,0.07)' }}>
                <button onClick={() => setViewMode('grid')} className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-200 cursor-pointer ${ viewMode === 'grid' ? 'bg-white dark:bg-white/10 text-indigo-600 shadow-sm' : 'text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300' }`} aria-label="Grid"><LayoutGrid size={13} /></button>
                <button onClick={() => setViewMode('list')} className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-200 cursor-pointer ${ viewMode === 'list' ? 'bg-white dark:bg-white/10 text-indigo-600 shadow-sm' : 'text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-300' }`} aria-label="List"><List size={13} /></button>
              </div>
              {highlightedApps.length > 0 && (
                <button onClick={() => setHighlightedApps([])} className="text-[11px] font-bold text-rose-500 px-2.5 py-1.5 rounded-lg cursor-pointer flex items-center gap-1 shrink-0 transition-colors hover:bg-rose-50 dark:hover:bg-rose-500/10" style={{ border: '1px solid rgba(239,68,68,0.2)' }}>
                  <X size={10} /><span className="hidden sm:inline">Clear</span>
                </button>
              )}
            </div>

              {/* Category sections */}
              {categories.filter(c => c !== 'All').map((catName) => {
                  const catApps = filteredApps.filter(app => app.category === catName);
                  if (catApps.length === 0) return null;

                  return (
                    <div
                      key={catName}
                      ref={(el) => { categoryRefs.current[catName] = el; }}
                      data-category={catName}
                      className="space-y-4 fade-up"
                    >
                      {/* Category heading */}
                      <div className="section-header flex items-center justify-between">
                        <h2 className="text-xl sm:text-[22px] font-black text-neutral-900 dark:text-white tracking-tight">
                          {catName}
                        </h2>
                        <span className="text-[10px] font-bold font-mono px-2.5 py-1 rounded-lg text-neutral-500 dark:text-neutral-400" style={{ background: 'rgba(0,0,0,0.04)', border: '1px solid rgba(0,0,0,0.07)' }}>
                          {catApps.length} app{catApps.length !== 1 && 's'}
                        </span>
                      </div>

                      {/* Layout switcher rendering */}
                      <AnimatePresence mode="popLayout">
                      {viewMode === 'grid' ? (
                        // Bento Grid Mode — Premium Card Layout
                        <motion.div
                          layout
                          className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5"
                        >
                          {catApps.map((app, idx) => (
                            <motion.div
                              key={app.id}
                              layout
                              initial={{ opacity: 0, y: 18 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -8 }}
                              transition={{ duration: 0.3, delay: idx * 0.05, ease: [0.22, 1, 0.36, 1] }}
                              className={`product-card p-5 sm:p-6 flex flex-col select-none ${
                                activeStack.includes(app.id) ? 'is-active' :
                                highlightedApps.includes(app.id) ? 'is-highlighted' : ''
                              }`}
                              onMouseMove={handleCardMouseMove}
                            >
                              {/* Top sheen line */}
                              <div className="absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-10" style={{ background: 'linear-gradient(90deg, transparent, rgba(99,102,241,0.15), transparent)' }} />

                              {/* Card header row */}
                              <div className="flex items-start justify-between mb-4">
                                <div className={`card-icon w-12 h-12 rounded-2xl flex items-center justify-center text-white shrink-0 icon-bg-${app.accent || 'indigo'}`}>
                                  {React.cloneElement(app.icon as React.ReactElement<any>, { 
                                    className: 'material-symbols-rounded text-white flex items-center justify-center select-none',
                                    style: { fontSize: '22px', fontVariationSettings: "'FILL' 1, 'wght' 400" }
                                  })}
                                </div>
                                
                                <div className="flex items-center gap-2">
                                  {app.popular && <span className="rgb-badge">Popular</span>}
                                  <button
                                    onClick={(e) => { e.stopPropagation(); toggleActiveStack(app.id); }}
                                    className={`w-7 h-7 rounded-lg flex items-center justify-center border transition-all duration-200 cursor-pointer ${
                                      activeStack.includes(app.id)
                                        ? 'text-white'
                                        : 'text-neutral-400 hover:text-indigo-600 dark:hover:text-indigo-400'
                                    }`}
                                    style={activeStack.includes(app.id) ? { background: 'linear-gradient(135deg,#6366f1,#7c3aed)', border: 'none', boxShadow: '0 2px 8px rgba(99,102,241,0.35)' } : { background: 'rgba(0,0,0,0.04)', border: '1px solid rgba(0,0,0,0.09)' }}
                                    title={activeStack.includes(app.id) ? 'Remove' : 'Add to stack'}
                                  >
                                    {activeStack.includes(app.id) ? <Check size={12} /> : <Plus size={12} />}
                                  </button>
                                </div>
                              </div>

                              {/* Name + tagline + desc */}
                              <div className="flex-1 flex flex-col">
                                <h4 className="text-[16px] sm:text-[17px] font-extrabold tracking-tight text-neutral-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 flex items-center gap-1 transition-colors duration-200 leading-tight">
                                  <span>{app.name}</span>
                                  <ArrowUpRight size={13} className="opacity-0 group-hover:opacity-100 translate-x-0 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200 shrink-0 text-indigo-500" />
                                </h4>
                                
                                <p className="text-[12.5px] sm:text-[13px] font-semibold text-neutral-500 dark:text-neutral-400 mt-1.5 leading-snug">
                                  {app.tagline}
                                </p>

                                <p className="mt-3 text-[12px] sm:text-[12.5px] text-neutral-500 dark:text-neutral-500 leading-relaxed font-normal flex-1">
                                  {app.desc}
                                </p>
                              </div>

                              {/* Footer action */}
                              <div 
                                onClick={(e) => { e.stopPropagation(); setSelectedAppForConsole(app); setIsConsoleOpen(true); }}
                                className="mt-4 pt-3.5 flex items-center justify-between text-[11.5px] text-neutral-400 dark:text-neutral-500 hover:text-indigo-600 dark:hover:text-indigo-400 font-semibold transition-colors duration-200 cursor-pointer group/footer"
                                style={{ borderTop: '1px solid rgba(0,0,0,0.06)' }}
                              >
                                <span className="flex items-center gap-1.5">
                                  <Terminal size={11} />
                                  <span>Telemetry Console</span>
                                </span>
                                <ArrowRight size={11} className="opacity-0 group-hover/footer:opacity-100 group-hover/footer:translate-x-0.5 transition-all duration-200" />
                              </div>
                            </motion.div>
                          ))}
                        </motion.div>
                      ) : (
                        // Compact List Mode — Premium
                        <motion.div
                          layout
                          className="space-y-2"
                        >
                          {catApps.map((app, idx) => (
                            <motion.div
                              key={app.id}
                              layout
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 0.25, delay: idx * 0.04, ease: [0.22, 1, 0.36, 1] }}
                              className={`list-card w-full px-4 sm:px-5 py-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 select-none ${
                                activeStack.includes(app.id) ? 'is-active' :
                                highlightedApps.includes(app.id) ? 'is-highlighted' : ''
                              }`}
                              onMouseMove={handleCardMouseMove}
                            >
                              <div className="flex items-center gap-3 sm:gap-3.5 flex-1 min-w-0">
                                <div className={`card-icon w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center text-white shrink-0 icon-bg-${app.accent || 'indigo'}`}>
                                  {React.cloneElement(app.icon as React.ReactElement<any>, { 
                                    className: 'material-symbols-rounded text-white flex items-center justify-center select-none',
                                    style: { fontSize: '20px', fontVariationSettings: "'FILL' 1, 'wght' 400" }
                                  })}
                                </div>
                                <div className="min-w-0">
                                  <h4 className="text-[13.5px] sm:text-[14.5px] font-bold tracking-tight text-neutral-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 flex items-center gap-1.5 transition-colors duration-200 flex-wrap">
                                    <span>{app.name}</span>
                                    {app.popular && <span className="rgb-badge shrink-0">Popular</span>}
                                  </h4>
                                  <span className="text-[11.5px] text-neutral-500 dark:text-neutral-400 font-medium mt-0.5 block leading-tight truncate">
                                    {app.tagline}
                                  </span>
                                </div>
                              </div>

                              <div className="text-[12px] text-neutral-400 dark:text-neutral-500 hidden md:block max-w-xs lg:max-w-sm flex-1 line-clamp-1 font-normal">
                                {app.desc}
                              </div>

                              <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-auto">
                                <button
                                  onClick={(e) => { e.stopPropagation(); setSelectedAppForConsole(app); setIsConsoleOpen(true); }}
                                  className="text-[10.5px] font-bold uppercase tracking-wider px-2.5 py-1.5 rounded-lg text-neutral-500 dark:text-neutral-400 transition-colors duration-200 cursor-pointer flex items-center gap-1 hover:text-neutral-700 dark:hover:text-neutral-200"
                                  style={{ background: 'rgba(0,0,0,0.04)', border: '1px solid rgba(0,0,0,0.07)' }}
                                >
                                  <Terminal size={10} />
                                  <span>Console</span>
                                </button>
                                
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleActiveStack(app.id);
                                  }}
                                  className={`text-[10px] font-bold uppercase tracking-wider px-2.5 sm:px-3.5 py-1.5 rounded-lg border transition-all duration-200 cursor-pointer flex items-center gap-1 ${
                                    activeStack.includes(app.id)
                                      ? 'bg-indigo-600 border-indigo-600 text-white shadow-sm shadow-indigo-500/20'
                                      : `${accentClasses[app.accent]?.bg} ${accentClasses[app.accent]?.text} hover:opacity-90`
                                  }`}
                                >
                                  {activeStack.includes(app.id) ? (
                                    <>
                                      <Check size={10} />
                                      <span>Active</span>
                                    </>
                                  ) : (
                                    <>
                                      <Plus size={10} />
                                      <span>Add Node</span>
                                    </>
                                  )}
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
          </div>{/* end right content panel */}
        </div>{/* end sticky split container */}
      </main>

      {/* FLOAT INTERACTIVE FINDER BUTTON — hidden on mobile when dock is visible, and hidden when footer is in view */}
      <AnimatePresence>
        {!isFooterVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className={`fixed bottom-6 right-4 sm:right-6 z-40 ${activeStack.length > 0 ? 'hidden sm:block' : ''}`}
          >
            <button
              onClick={handleOpenWizard}
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white flex items-center justify-center shadow-xl shadow-indigo-600/30 hover:scale-105 transition-all cursor-pointer animate-float"
              aria-label="Open Interactive Product Finder Wizard"
            >
              <HelpCircle size={20} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* DYNAMIC FINDER MODAL DIALOG — bottom sheet on mobile, centered on desktop */}
      <AnimatePresence>
        {isWizardOpen && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center sm:px-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsWizardOpen(false)}
              className="absolute inset-0 bg-neutral-950/60 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, y: '100%' }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 220 }}
              className="relative w-full sm:max-w-lg bg-white dark:bg-neutral-900 border-t sm:border border-neutral-200 dark:border-neutral-800 rounded-t-3xl sm:rounded-3xl px-5 py-6 sm:p-8 shadow-2xl z-10 flex flex-col justify-between min-h-[50vh] sm:min-h-[360px] max-h-[90vh] overflow-y-auto"
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

      {/* WORKSPACE SUITE BUILDER DOCK — full-width on mobile, floating pill on desktop — hides when footer is in view */}
      <AnimatePresence>
        {activeStack.length > 0 && !isFooterVisible && (
          <motion.div
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 80 }}
            transition={{ type: 'spring', damping: 22, stiffness: 120 }}
            className="fixed bottom-0 left-0 right-0 sm:bottom-5 sm:left-1/2 sm:-translate-x-1/2 sm:w-[640px] z-40
              glassmorphism sm:rounded-2xl
              border-t sm:border border-neutral-200/60 dark:border-neutral-800/80
              shadow-2xl"
          >
            {/* Mobile: compact single row */}
            <div className="flex items-center gap-3 px-4 py-3 sm:hidden">
              {/* Icon strip */}
              <div className="flex items-center gap-1.5 flex-1 overflow-x-auto scrollbar-none">
                {activeStack.slice(0,6).map((id) => {
                  const matched = applications.find(a => a.id === id);
                  if (!matched) return null;
                  return (
                    <button
                      key={id}
                      onClick={() => toggleActiveStack(id)}
                      className={`w-8 h-8 rounded-lg shrink-0 flex items-center justify-center text-white cursor-pointer active:scale-95 transition-transform ${iconGradientClasses[matched.accent] || 'bg-indigo-600'}`}
                    >
                      {React.cloneElement(matched.icon as React.ReactElement<any>, { className: ((matched.icon as any).props?.className || '') + ' text-white', style: { ...((matched.icon as any).props?.style || {}), fontSize: 14 } })}
                    </button>
                  );
                })}
                {activeStack.length > 6 && (
                  <span className="text-[10px] font-bold text-neutral-500 shrink-0">+{activeStack.length - 6}</span>
                )}
              </div>

              {/* Price */}
              <div className="shrink-0 text-right">
                <div className="text-[13px] font-extrabold text-neutral-900 dark:text-white">${pricingSummary.totalCost}<span className="text-[9px] text-neutral-400">/mo</span></div>
                {pricingSummary.discountPct > 0 && <div className="text-[9px] text-indigo-600 font-bold">{pricingSummary.discountPct}% off</div>}
              </div>

              {/* Actions */}
              <div className="flex gap-1.5 shrink-0">
                <button onClick={() => setIsFlowOpen(true)} className="w-9 h-9 rounded-xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center cursor-pointer active:scale-95 transition-transform">
                  <PiCompassDuotone size={18} className="text-indigo-500" />
                </button>
                <button onClick={handleExportConfig} className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center cursor-pointer active:scale-95 transition-transform shadow-md">
                  <PiDownloadSimpleDuotone size={18} />
                </button>
              </div>
            </div>

            {/* Desktop: full layout */}
            <div className="hidden sm:flex items-center gap-4 px-5 py-3.5">
              <div className="flex items-center gap-2 flex-1 overflow-x-auto scrollbar-none">
                <span className="text-[9px] font-extrabold uppercase tracking-widest text-neutral-400 shrink-0">Suite</span>
                {activeStack.map((id) => {
                  const matched = applications.find(a => a.id === id);
                  if (!matched) return null;
                  return (
                    <button
                      key={id}
                      onClick={() => toggleActiveStack(id)}
                      className={`w-7 h-7 rounded-lg shrink-0 flex items-center justify-center text-white cursor-pointer hover:scale-110 transition-transform ${iconGradientClasses[matched.accent] || 'bg-indigo-600'}`}
                      title={`Remove ${matched.name}`}
                    >
                      {React.cloneElement(matched.icon as React.ReactElement<any>, { className: ((matched.icon as any).props?.className || '') + ' text-white', style: { ...((matched.icon as any).props?.style || {}), fontSize: 13 } })}
                    </button>
                  );
                })}
              </div>
              <div className="shrink-0">
                <div className="text-[12px] font-extrabold text-neutral-900 dark:text-white">${pricingSummary.totalCost} <span className="text-[10px] text-neutral-400 font-medium">/mo</span></div>
                {pricingSummary.discountPct > 0 && <div className="text-[9px] text-indigo-600 font-bold">{pricingSummary.discountPct}% Discount</div>}
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button onClick={() => setIsFlowOpen(true)} className="px-3 py-2 text-[11px] font-bold bg-neutral-100 dark:bg-neutral-800 rounded-xl flex items-center gap-1 cursor-pointer hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors">
                  <PiCompassDuotone size={16} className="text-indigo-500" /><span>Integrate</span>
                </button>
                <button onClick={handleExportConfig} className="px-3 py-2 text-[11px] font-bold bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl flex items-center gap-1 cursor-pointer shadow-sm transition-colors">
                  <PiDownloadSimpleDuotone size={16} /><span>Export</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* PLAYGROUND CONSOLE DRAWER — full-screen on mobile, right panel on desktop */}
      <AnimatePresence>
        {isConsoleOpen && selectedAppForConsole && (
          <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsConsoleOpen(false)}
              className="absolute inset-0 bg-neutral-950/60 backdrop-blur-sm"
            />

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="relative w-full sm:max-w-lg h-full bg-white dark:bg-neutral-950 sm:border-l border-neutral-200 dark:border-neutral-900 shadow-2xl z-10 flex flex-col"
            >
              {/* Header */}
              <div className="p-4 sm:p-6 pt-5 sm:pt-6 border-b border-neutral-200/50 dark:border-neutral-900 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-white shrink-0 ${iconGradientClasses[selectedAppForConsole.accent] || 'bg-neutral-100'}`}>
                    {React.cloneElement(selectedAppForConsole.icon as React.ReactElement<any>, { className: ((selectedAppForConsole.icon as any).props?.className || '') + ' text-white', style: { ...((selectedAppForConsole.icon as any).props?.style || {}), fontSize: 18 } })}
                  </div>
                  <div>
                    <h3 className="text-[15px] sm:text-[16px] font-black text-neutral-900 dark:text-white tracking-tight flex items-center gap-1.5 flex-wrap">
                      <span>{selectedAppForConsole.name}</span>
                      <span className="text-[9px] uppercase font-mono px-1.5 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 border border-indigo-200/10">
                        Node Console
                      </span>
                    </h3>
                    <p className="text-[11px] text-neutral-500 font-medium leading-none mt-1">
                      Telemetry &amp; deployment console
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setIsConsoleOpen(false)}
                  className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors text-neutral-400 cursor-pointer shrink-0"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Content area */}
              <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
                {/* Description Card */}
                <div className="bg-neutral-55 dark:bg-neutral-900/40 border border-neutral-200/50 dark:border-neutral-900 p-4 rounded-2xl">
                  <h4 className="text-[11px] font-extrabold text-neutral-400 dark:text-neutral-500 uppercase tracking-widest mb-1.5">
                    Operational Purpose
                  </h4>
                  <p className="text-[12.5px] text-neutral-500 dark:text-neutral-400 leading-relaxed font-normal">
                    {selectedAppForConsole.desc}
                  </p>
                </div>

                {/* Mock Controls Section */}
                <div className="space-y-3">
                  <h4 className="text-[11px] font-extrabold text-neutral-400 dark:text-neutral-500 uppercase tracking-widest">
                    Simulated Control Dashboard
                  </h4>
                  <div className="grid grid-cols-1 gap-2.5">
                    <ConsoleToggleRow 
                      label="Auto-Scale Resource Daemon" 
                      desc="Dynamically partition cloud cores on peak read loads" 
                      active={consoleToggles.autoScale}
                      onToggle={() => handleToggleConsoleOption('autoScale', 'Auto-Scale Mode')}
                    />
                    <ConsoleToggleRow 
                      label="High-Frequency Diff Sync" 
                      desc="Reduce differential database synchronization bounds to 5s" 
                      active={consoleToggles.highFreqSync}
                      onToggle={() => handleToggleConsoleOption('highFreqSync', 'High-Frequency Sync')}
                    />
                    <ConsoleToggleRow 
                      label="Developer Sandbox Bypass" 
                      desc="Allow zero-auth SQL querying direct inside telemetry consoles" 
                      active={consoleToggles.devBypass}
                      onToggle={() => handleToggleConsoleOption('devBypass', 'Dev Sandbox Bypass')}
                    />
                  </div>
                </div>

                {/* Live Terminal Log screen */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="text-[11px] font-extrabold text-neutral-400 dark:text-neutral-500 uppercase tracking-widest">
                      Telemetry Logs Console
                    </h4>
                    <button 
                      onClick={() => setConsoleLogs([])}
                      className="text-[9px] font-bold text-indigo-500 hover:text-indigo-650 font-mono tracking-wider uppercase bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200/10 px-2 py-1 rounded cursor-pointer"
                    >
                      Clear Buffer
                    </button>
                  </div>

                  <div className="bg-neutral-950 text-neutral-100 rounded-2xl border border-neutral-900/80 p-3 sm:p-4 font-mono text-[10px] sm:text-xs h-56 sm:h-72 overflow-y-auto space-y-1.5 scrollbar-thin select-text">
                    {consoleLogs.map((log, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 leading-snug">
                        <span className="text-neutral-500 select-none">{log.time}</span>
                        <span className={
                          log.type === 'success' ? 'text-emerald-450' :
                          log.type === 'warn' ? 'text-amber-450' :
                          log.type === 'error' ? 'text-rose-450' : 'text-neutral-300'
                        }>
                          {log.text}
                        </span>
                      </div>
                    ))}
                    {consoleLogs.length === 0 && (
                      <div className="text-neutral-600 italic select-none h-full flex items-center justify-center">
                        Buffer empty. Awaiting daemon sync events...
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Drawer Actions Footer — safe area padding on mobile */}
              <div className="p-4 sm:p-6 pb-safe sm:pb-6 border-t border-neutral-200/50 dark:border-neutral-900 flex items-center gap-3">
                <button
                  onClick={() => setIsConsoleOpen(false)}
                  className="w-10 h-10 rounded-xl border border-neutral-200 dark:border-neutral-800 flex items-center justify-center text-neutral-500 cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors shrink-0 sm:hidden"
                >
                  <X size={16} />
                </button>
                <button
                  onClick={() => toggleActiveStack(selectedAppForConsole.id)}
                  className={`flex-1 py-3 sm:py-3.5 rounded-xl font-extrabold text-[12px] uppercase tracking-wide transition-all duration-200 cursor-pointer flex items-center justify-center gap-1.5 active:scale-[0.98] ${
                    activeStack.includes(selectedAppForConsole.id)
                      ? 'bg-rose-50 hover:bg-rose-100 text-rose-500 dark:bg-rose-950/20 dark:hover:bg-rose-950/30 border border-rose-200/20'
                      : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-md'
                  }`}
                >
                  {activeStack.includes(selectedAppForConsole.id) ? (
                    <><Trash2 size={13} /><span>Decommission Node</span></>
                  ) : (
                    <><Plus size={13} /><span>Bind Node to Stack</span></>
                  )}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* INTEGRATION FLOW MAPPING OVERLAY MODAL */}
      <AnimatePresence>
        {isFlowOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsFlowOpen(false)}
              className="absolute inset-0 bg-neutral-950/70 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-3xl p-6 sm:p-8 shadow-2xl z-10 flex flex-col max-h-[90vh]"
            >
              <button
                onClick={() => setIsFlowOpen(false)}
                className="absolute top-5 right-5 w-8 h-8 rounded-full flex items-center justify-center hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors text-neutral-400 hover:text-neutral-705 cursor-pointer"
              >
                <X size={15} />
              </button>

              <div className="mb-6 select-none">
                <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200/20 text-indigo-600 dark:text-indigo-400 text-[10px] font-bold tracking-wider uppercase">
                  <PiCompassDuotone size={16} className="animate-spin" style={{ animationDuration: '6s' }} />
                  <span>Spatial Integration Map</span>
                </span>
                <h3 className="text-[17px] sm:text-[19px] font-black text-neutral-900 dark:text-white tracking-tight mt-1.5">
                  Active Suite Core Router Routing Map
                </h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                  Visualizes how data telemetry routes between active integration hosts and the core relay.
                </p>
              </div>

              {/* Central SVG Mesh Visualizer */}
              <div className="flex-1 border border-neutral-200/30 dark:border-neutral-800 rounded-3xl p-6 bg-neutral-50 dark:bg-neutral-950 min-h-[300px] flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-grid-pattern opacity-30" />

                {/* Central router node */}
                <div className="relative z-10 w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 to-purple-650 shadow-lg shadow-indigo-500/25 flex items-center justify-center text-white border-2 border-white dark:border-neutral-900 animate-pulse">
                  <Cpu size={24} />
                </div>

                {/* Satellite Nodes mapping */}
                {activeStack.map((id, index) => {
                  const matched = applications.find(a => a.id === id);
                  if (!matched) return null;
                  
                  const total = activeStack.length;
                  const angle = (index * 2 * Math.PI) / total;
                  const radius = 100; // pixels out
                  const x = radius * Math.cos(angle);
                  const y = radius * Math.sin(angle);

                  return (
                    <React.Fragment key={id}>
                      {/* Connection SVG Line */}
                      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 5 }}>
                        <line
                          x1="50%"
                          y1="50%"
                          x2={`calc(50% + ${x}px)`}
                          y2={`calc(50% + ${y}px)`}
                          className="stroke-indigo-500/40 dark:stroke-indigo-500/20 animate-dash"
                          strokeWidth="2"
                        />
                      </svg>

                      {/* Satellite Badge */}
                      <div
                        className="absolute z-10 flex flex-col items-center gap-1"
                        style={{
                          transform: `translate(${x}px, ${y}px)`,
                          transition: 'all 0.3s ease'
                        }}
                      >
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-md ${iconGradientClasses[matched.accent] || 'bg-indigo-650'}`}>
                          {React.cloneElement(matched.icon as React.ReactElement<any>, { className: ((matched.icon as any).props?.className || '') + ' text-white', style: { ...((matched.icon as any).props?.style || {}), fontSize: 18 } })}
                        </div>
                        <span className="text-[10px] font-extrabold text-neutral-800 dark:text-neutral-300 bg-white dark:bg-neutral-900 px-2 py-0.5 rounded-md shadow-sm border border-neutral-200/50 dark:border-neutral-800 leading-none">
                          {matched.name.split(' ').pop()}
                        </span>
                      </div>
                    </React.Fragment>
                  );
                })}
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setIsFlowOpen(false)}
                  className="px-5 py-2.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl cursor-pointer shadow-sm transition-all"
                >
                  Close Map
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* TOAST ALERTS */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed top-20 sm:top-auto sm:bottom-24 left-1/2 -translate-x-1/2 z-[60] px-4 py-2.5 rounded-xl bg-neutral-900 dark:bg-neutral-800 text-white text-xs font-semibold shadow-xl shadow-black/30 flex items-center gap-2 border border-neutral-700 whitespace-nowrap"
          >
            <Check size={14} className="text-emerald-400 shrink-0" />
            <span>{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

function ConsoleToggleRow({ 
  label, 
  desc, 
  active, 
  onToggle 
}: { 
  label: string; 
  desc: string; 
  active: boolean; 
  onToggle: () => void;
}) {
  return (
    <div className="flex items-center justify-between p-3.5 bg-neutral-50 dark:bg-neutral-900/60 border border-neutral-200/40 dark:border-neutral-800/80 rounded-2xl transition-all">
      <div className="pr-4">
        <h5 className="text-[12.5px] font-extrabold text-neutral-800 dark:text-neutral-200 leading-none">
          {label}
        </h5>
        <p className="text-[10px] text-neutral-400 dark:text-neutral-500 mt-1 leading-snug font-medium">
          {desc}
        </p>
      </div>

      <button
        onClick={onToggle}
        className={`w-9 h-5 rounded-full relative transition-colors cursor-pointer shrink-0 ${
          active ? 'bg-indigo-600' : 'bg-neutral-200 dark:bg-neutral-800'
        }`}
      >
        <span 
          className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-transform ${
            active ? 'translate-x-4' : 'translate-x-0'
          }`}
        />
      </button>
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
