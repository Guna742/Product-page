'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, LayoutGrid, List, Compass, HelpCircle, X, ArrowRight, Check, 
  Terminal, Layers, Cpu, Sparkles, ArrowUpRight, Plus, Trash2, Play,
  Shield, Zap, Globe, Star, DollarSign, Users, Lock, BarChart3, Quote
} from 'lucide-react';
import Link from 'next/link';
import { useTheme } from '@/components/ThemeContext';
import confetti from 'canvas-confetti';



import { PiCompassDuotone, PiDownloadSimpleDuotone } from 'react-icons/pi';
import { applications, categories, type AppItem } from '@/data/applications';

interface IconProps {
  className?: string;
  style?: React.CSSProperties;
}

function renderAppIcon(icon: React.ReactNode, extraClass = '', fontSize = 14) {
  if (!React.isValidElement<IconProps>(icon)) return icon;
  return React.cloneElement(icon, {
    className: `${icon.props.className || ''} ${extraClass}`.trim(),
    style: { ...icon.props.style, fontSize }
  });
}

/* ── Viewport Fade-Up Observer Hook ──────────────────────── */
function useFadeUpObserver(trigger: unknown) {
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

    // Set states asynchronously to avoid react-hooks/set-state-in-effect
    const initTimeout = setTimeout(() => {
      setConsoleLogs([]);
      setConsoleToggles({ autoScale: false, highFreqSync: false, devBypass: false });
    }, 0);

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

    const runTimeout = setTimeout(addNextLog, 100);

    return () => {
      clearTimeout(initTimeout);
      clearTimeout(runTimeout);
      if (timer) clearTimeout(timer);
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



  // Google Redesign Sections Refs
  const aiSectionRef = useRef<HTMLDivElement | null>(null);
  const labsSectionRef = useRef<HTMLDivElement | null>(null);
  const playgroundSectionRef = useRef<HTMLDivElement | null>(null);
  const securitySectionRef = useRef<HTMLDivElement | null>(null);
  const integrationsSectionRef = useRef<HTMLDivElement | null>(null);
  const testimonialsSectionRef = useRef<HTMLDivElement | null>(null);
  const pricingSectionRef = useRef<HTMLDivElement | null>(null);
  const directorySectionRef = useRef<HTMLDivElement | null>(null);
  const labsCarouselRef = useRef<HTMLDivElement | null>(null);

  // Stats counter animation
  const [statsVisible, setStatsVisible] = useState(false);
  const [counters, setCounters] = useState({ uptime: 0, users: 0, integrations: 0, countries: 0 });
  const statsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!statsVisible) return;
    const targets = { uptime: 99.98, users: 40000, integrations: 200, countries: 85 };
    const duration = 1800;
    const steps = 60;
    const interval = duration / steps;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      const eased = 1 - Math.pow(1 - progress, 3);
      setCounters({
        uptime: parseFloat((targets.uptime * eased).toFixed(2)),
        users: Math.round(targets.users * eased),
        integrations: Math.round(targets.integrations * eased),
        countries: Math.round(targets.countries * eased),
      });
      if (step >= steps) clearInterval(timer);
    }, interval);
    return () => clearInterval(timer);
  }, [statsVisible]);

  useEffect(() => {
    if (!statsRef.current) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStatsVisible(true); }, { threshold: 0.3 });
    obs.observe(statsRef.current);
    return () => obs.disconnect();
  }, []);

  // Pricing state
  const [pricingPlan, setPricingPlan] = useState<'monthly' | 'annual'>('annual');
  const [activePricingTier, setActivePricingTier] = useState<number>(1);

  // Testimonial rotation
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setActiveTestimonial(p => (p + 1) % 4), 4500);
    return () => clearInterval(t);
  }, []);

  // Active section state for Google Jump Links
  const [activeSection, setActiveSection] = useState<string>('ai');

  // Handle Carousel Scrolling
  const scrollCarousel = (direction: 'left' | 'right') => {
    if (labsCarouselRef.current) {
      const container = labsCarouselRef.current;
      const width = container.offsetWidth;
      const currentScroll = container.scrollLeft;
      const scrollAmount = direction === 'left' ? -width * 0.75 : width * 0.75;
      container.scrollTo({
        left: currentScroll + scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  // Handle Jump Link Scroll
  const handleJumpToSection = (sectionId: string) => {
    const refMap: Record<string, React.RefObject<HTMLDivElement | null>> = {
      ai: aiSectionRef,
      labs: labsSectionRef,
      playground: playgroundSectionRef,
      security: securitySectionRef,
      integrations: integrationsSectionRef,
      testimonials: testimonialsSectionRef,
      pricing: pricingSectionRef,
      directory: directorySectionRef,
    };
    const targetRef = refMap[sectionId];
    if (targetRef && targetRef.current) {
      const offset = 148;
      const elementPosition = targetRef.current.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };

  // IntersectionObserver for Google Jump Links
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-148px 0px -45% 0px',
      threshold: [0, 0.05, 0.1, 0.2]
    };

    const sectionRefs = {
      ai: aiSectionRef,
      labs: labsSectionRef,
      playground: playgroundSectionRef,
      security: securitySectionRef,
      integrations: integrationsSectionRef,
      testimonials: testimonialsSectionRef,
      pricing: pricingSectionRef,
      directory: directorySectionRef,
    };

    const intersectingMap: Record<string, boolean> = {};

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const id = (entry.target as HTMLElement).dataset.section;
        if (id) {
          intersectingMap[id] = entry.isIntersecting;
        }
      });

      const activeIds = Object.keys(intersectingMap).filter(id => intersectingMap[id]);
      if (activeIds.length > 0) {
        let bestId = activeIds[0];
        let minDistance = Infinity;

        activeIds.forEach((id) => {
          const currentRef = sectionRefs[id as keyof typeof sectionRefs];
          if (currentRef && currentRef.current) {
            const top = currentRef.current.getBoundingClientRect().top;
            const dist = Math.abs(top - 148);
            if (dist < minDistance) {
              minDistance = dist;
              bestId = id;
            }
          }
        });
        setActiveSection(bestId);
      }
    }, observerOptions);

    Object.values(sectionRefs).forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => observer.disconnect();
  }, []);



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
  }, [search, highlightedApps]);

  // Filter apps in place for category + search
  const displayApps = useMemo(() => {
    if (activeCategory === 'All') return filteredApps;
    return filteredApps.filter((app) => app.category === activeCategory);
  }, [filteredApps, activeCategory]);

  // Bind fade-up observer to the display list changes
  useFadeUpObserver(displayApps);

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
      <header className="site-header transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-3">
          <Link href="/" className="flex items-center gap-2 sm:gap-2.5 group shrink-0">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-200" style={{ background: 'linear-gradient(135deg,#6366f1,#7c3aed)', boxShadow: '0 4px 12px rgba(99,102,241,0.35)' }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                <path d="M12 2L2 22h20L12 2zm0 4.5l6.5 12h-13L12 6.5z" fill="white" />
              </svg>
            </div>
            <span className="font-extrabold text-[17px] sm:text-[19px] tracking-tight text-neutral-900 dark:text-white">Aether Hub</span>
          </Link>

          <div className="flex items-center gap-2 sm:gap-2.5">
            {activeStack.length > 0 && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                onClick={() => setIsFlowOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 sm:hidden rounded-full text-white text-[11px] font-bold cursor-pointer"
                style={{ background: 'linear-gradient(135deg,#6366f1,#7c3aed)', boxShadow: '0 3px 10px rgba(99,102,241,0.35)' }}
              >
                <Layers size={12} />
                <span>{activeStack.length} Active</span>
              </motion.button>
            )}

            <button
              onClick={handleOpenWizard}
              className="flex items-center gap-1.5 px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-[13px] font-bold text-indigo-600 dark:text-indigo-400 rounded-full cursor-pointer transition-colors duration-200 hover:text-indigo-700 dark:hover:text-indigo-300"
              style={{ background: 'rgba(99,102,241,0.08)', border: '1px solid rgba(99,102,241,0.18)' }}
            >
              <HelpCircle size={14} className="animate-micro-bounce" />
              <span className="hidden sm:inline">Product Finder</span>
            </button>

            <button
              onClick={toggleTheme}
              className="w-9 h-9 rounded-full flex items-center justify-center cursor-pointer transition-all duration-200 text-neutral-600 dark:text-neutral-300 hover:scale-110"
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

        {/* SUB-NAVIGATION JUMP-LINKS BAR */}
        <div className="sub-nav-sticky w-full rounded-2xl py-3 px-4 mb-10 flex items-center justify-between gap-3 overflow-x-auto scrollbar-none border border-neutral-200/50 dark:border-neutral-800/80">
          <div className="flex items-center gap-1 sm:gap-1.5">
            {[
              { id: 'ai', label: 'Run on AI', icon: <Sparkles size={10} /> },
              { id: 'labs', label: 'Labs', icon: <Layers size={10} /> },
              { id: 'playground', label: 'Playground', icon: <Terminal size={10} /> },
              { id: 'security', label: 'Security', icon: <Shield size={10} /> },
              { id: 'integrations', label: 'Integrations', icon: <Zap size={10} /> },
              { id: 'testimonials', label: 'Stories', icon: <Star size={10} /> },
              { id: 'pricing', label: 'Pricing', icon: <DollarSign size={10} /> },
              { id: 'directory', label: 'All Products', icon: <Compass size={10} /> },
            ].map((section) => {
              const isActive = activeSection === section.id;
              return (
                <button
                  key={section.id}
                  onClick={() => handleJumpToSection(section.id)}
                  className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-[11px] font-bold whitespace-nowrap cursor-pointer transition-all duration-200 border border-transparent ${
                    isActive
                      ? 'jump-link-active shadow-sm'
                      : 'text-neutral-500 dark:text-neutral-400 hover:bg-neutral-100/60 dark:hover:bg-white/5 hover:text-neutral-800 dark:hover:text-neutral-200'
                  }`}
                >
                  {section.icon}
                  <span>{section.label}</span>
                </button>
              );
            })}
          </div>
          
          <div className="hidden md:flex items-center gap-1.5 text-[10px] font-bold text-neutral-400 select-none shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
            <span>AI CORE LIVE</span>
          </div>
        </div>

        {/* SECTION 1: RUN BUSINESS ON AI */}
        <div
          ref={aiSectionRef}
          data-section="ai"
          className="google-feature-card p-6 sm:p-10 mb-10 overflow-hidden relative"
        >
          <div className="absolute top-[30%] left-[60%] w-96 h-96 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 60%)' }} />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200/30 dark:border-indigo-800/40 text-indigo-600 dark:text-indigo-400 text-[9.5px] font-bold tracking-wider uppercase">
                <Sparkles size={11} className="animate-pulse" />
                <span>Next-Gen Business Intelligence</span>
              </span>
              
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-neutral-900 dark:text-white leading-tight tracking-tight">
                Run operations powered by Aether AI.
              </h2>
              
              <p className="text-neutral-500 dark:text-neutral-400 text-sm sm:text-[14.5px] leading-relaxed">
                Connect your sales boards, database events, and API channels. Aether AI works in the background, auditing client terms, predicting transaction values, and generating reports dynamically.
              </p>
              
              <div className="space-y-3 pt-2">
                {[
                  'Cognitive CRM reasoners that qualify leads automatically.',
                  'Zero-knowledge AES-256 local-first security encryption.',
                  'Dynamic peer-to-peer data sync using CRDT structures.'
                ].map((feature, index) => (
                  <div key={index} className="flex items-start gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-indigo-500/10 text-indigo-500 flex items-center justify-center shrink-0 mt-0.5">
                      <Check size={11} />
                    </div>
                    <span className="text-xs sm:text-[13px] font-semibold text-neutral-700 dark:text-neutral-300">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="w-full aspect-[4/3] rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-neutral-950 p-5 flex flex-col justify-between shadow-lg relative overflow-hidden font-mono text-[10.5px]">
                <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-gradient-to-r from-transparent via-indigo-500 to-transparent animate-scanline" />
                <div className="flex items-center justify-between border-b border-neutral-800 pb-3 mb-3">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  </div>
                  <span className="text-[10px] text-neutral-500">AETHER_REASONER_AGENT v2.0</span>
                </div>
                
                <div className="flex-1 space-y-2 text-neutral-400 overflow-y-auto scrollbar-none pr-1">
                  <p className="text-neutral-500">&gt; npm run start:agent</p>
                  <p className="text-indigo-400">[info] Syncing local IndexedDB indexes with Relay nodes...</p>
                  <p className="text-emerald-400">[ready] Vector DB loaded. CRM deal patterns match (100% security).</p>
                  <p className="text-amber-400">[warning] API sync throughput at 98% efficiency.</p>
                  <div className="p-2.5 rounded-lg bg-neutral-900 border border-neutral-800 text-[10px] text-neutral-300 space-y-1">
                    <p className="font-bold text-indigo-400">🤖 AI Recommendation:</p>
                    <p>Detected high email campaign bounce rates. Recommending Aether Mail DNS updates.</p>
                  </div>
                  <p className="text-neutral-500 animate-pulse">&gt; Auditing network logs... _</p>
                </div>
                
                <div className="border-t border-neutral-800 pt-3 mt-3 flex items-center justify-between text-[9px] text-neutral-500">
                  <span>Licensing: Bound Integration</span>
                  <span>CPU Load: 4%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 2: AETHER LABS CAROUSEL */}
        <div
          ref={labsSectionRef}
          data-section="labs"
          className="google-feature-card p-6 sm:p-10 mb-10 overflow-hidden relative"
        >
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div className="space-y-2.5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/30 dark:border-emerald-800/40 text-emerald-600 dark:text-emerald-400 text-[9.5px] font-bold tracking-wider uppercase">
                <Layers size={11} className="animate-pulse" />
                <span>Aether Labs Experiments</span>
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-neutral-900 dark:text-white tracking-tight">
                Try new operational experiments.
              </h2>
              <p className="text-neutral-500 dark:text-neutral-400 text-sm max-w-xl">
                Explore tools designed to automate business metrics. Build low-code databases, sync micro-services, and compile dashboards in seconds.
              </p>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={() => scrollCarousel('left')}
                className="w-10 h-10 rounded-full border border-neutral-200 dark:border-neutral-800 flex items-center justify-center text-neutral-500 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-neutral-100 dark:hover:bg-white/5 transition-all cursor-pointer"
                aria-label="Scroll Carousel Left"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
              </button>
              <button
                onClick={() => scrollCarousel('right')}
                className="w-10 h-10 rounded-full border border-neutral-200 dark:border-neutral-800 flex items-center justify-center text-neutral-500 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-neutral-100 dark:hover:bg-white/5 transition-all cursor-pointer"
                aria-label="Scroll Carousel Right"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
              </button>
            </div>
          </div>

          <div
            ref={labsCarouselRef}
            className="carousel-container scrollbar-none"
          >
            {[
              {
                id: 'creator',
                title: 'Aether Creator',
                subtitle: 'Low-Code Custom DB Builder',
                desc: 'Visually assemble database structures. Drag tables, create relationships, and compile beautiful UI portals without writing a line of code.',
                accent: 'fuchsia',
                icon: <span className="material-symbols-rounded">database</span>
              },
              {
                id: 'flow',
                title: 'Aether Flow',
                subtitle: 'Connect Multi-App API Endpoints',
                desc: 'Build conditional automation paths. Route webhooks, trigger events, clean data payloads, and sync files across Aether nodes in real-time.',
                accent: 'fuchsia',
                icon: <span className="material-symbols-rounded">bolt</span>
              },
              {
                id: 'analytics',
                title: 'Aether Analytics',
                subtitle: 'Business Data Intelligence',
                desc: 'Synthesize raw database records into beautiful visual dashboards. Monitor transaction values, user analytics, and lead trajectories.',
                accent: 'fuchsia',
                icon: <span className="material-symbols-rounded">data_thresholding</span>
              }
            ].map((lab) => (
              <div
                key={lab.id}
                className="carousel-card p-6 rounded-2xl border border-neutral-200/50 dark:border-neutral-800/80 bg-neutral-50/50 dark:bg-neutral-900/40 hover:border-indigo-500/30 transition-colors flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className={`w-11 h-11 rounded-2xl flex items-center justify-center text-white icon-bg-${lab.accent}`}>
                    {React.cloneElement(lab.icon as React.ReactElement<{ style?: React.CSSProperties }>, { style: { fontSize: '20px' } })}
                  </div>
                  <div>
                    <h3 className="font-extrabold text-[15px] sm:text-[16px] text-neutral-900 dark:text-white leading-tight">{lab.title}</h3>
                    <p className="text-[11.5px] font-bold text-indigo-600 dark:text-indigo-400 mt-1">{lab.subtitle}</p>
                  </div>
                  <p className="text-xs sm:text-[12.5px] text-neutral-500 dark:text-neutral-400 leading-relaxed font-normal">{lab.desc}</p>
                </div>
                
                <button
                  onClick={() => {
                    setActiveCategory('Developer & Automations');
                    handleJumpToSection('directory');
                  }}
                  className="mt-6 flex items-center gap-1.5 text-[11px] font-bold text-neutral-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors uppercase cursor-pointer"
                >
                  <span>Explore Developers Stacks</span>
                  <ArrowRight size={12} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 3: INTERACTIVE TELEMETRY PLAYGROUND */}
        <div
          ref={playgroundSectionRef}
          data-section="playground"
          className="google-feature-card p-6 sm:p-10 mb-10 overflow-hidden relative"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 space-y-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-50 dark:bg-violet-950/40 border border-violet-200/30 dark:border-violet-800/40 text-violet-600 dark:text-violet-400 text-[9.5px] font-bold tracking-wider uppercase">
                <Terminal size={11} className="animate-pulse" />
                <span>Developer Console</span>
              </span>
              
              <h2 className="text-2xl sm:text-3xl font-black text-neutral-900 dark:text-white leading-tight tracking-tight">
                Live interactive database playground.
              </h2>
              
              <p className="text-neutral-500 dark:text-neutral-400 text-sm sm:text-[14.5px] leading-relaxed">
                Aether includes a built-in telemetry monitor. Select any integration card from the directory below, launch its console sandbox, toggle Scaling policies, and monitor system loops in real time.
              </p>
              
              <div className="pt-2">
                <button
                  onClick={() => {
                    const matched = applications[0]; // CRM
                    setSelectedAppForConsole(matched);
                    setIsConsoleOpen(true);
                  }}
                  className="btn-primary"
                >
                  <Play size={13} />
                  <span>Launch CRM Console Demo</span>
                </button>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="console-mockup w-full aspect-[16/10] overflow-hidden flex flex-col">
                <div className="bg-neutral-900 border-b border-neutral-800/80 px-4 py-2.5 flex items-center justify-between text-[11px] font-bold text-neutral-400 select-none">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                    <span>SYSTEM_TELEMETRY_LOGS</span>
                  </div>
                  <span className="text-[10px] text-neutral-500 font-mono">STATUS: OK</span>
                </div>
                
                <div className="flex-1 p-4 font-mono text-[10.5px] text-neutral-400 space-y-2 overflow-y-auto scrollbar-none bg-neutral-950/90">
                  <p className="text-neutral-500">{"// Select a product card to stream telemetry records."}</p>
                  <p className="text-indigo-400">&gt; stream: aether-books-daemon</p>
                  <p className="text-indigo-500">[LOADER] Checking double-entry balances...</p>
                  <p className="text-emerald-400">[DATABASE] Ledger check verified. 0.00 discrepancy.</p>
                  <p className="text-neutral-400">[SYSTEM] Automatic invoice trigger set for tomorrow 00:00 UTC.</p>
                  <p className="text-neutral-500 animate-pulse">&gt; Listening... _</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 4: SECURITY & COMPLIANCE */}
        <div
          ref={securitySectionRef}
          data-section="security"
          className="google-feature-card p-6 sm:p-10 mb-10 overflow-hidden relative"
        >
          {/* Ambient glow */}
          <div className="absolute top-0 right-0 w-80 h-80 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(16,185,129,0.07) 0%, transparent 60%)' }} />

          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/30 dark:border-emerald-800/40 text-emerald-600 dark:text-emerald-400 text-[9.5px] font-bold tracking-wider uppercase mb-4">
              <Shield size={11} className="animate-pulse" />
              <span>Enterprise-Grade Trust</span>
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-neutral-900 dark:text-white leading-tight tracking-tight">
              Security & Compliance built-in.
            </h2>
            <p className="text-neutral-500 dark:text-neutral-400 text-sm mt-3 leading-relaxed max-w-xl mx-auto">
              Aether is architected with zero-trust security from the ground up. Every integration node runs with end-to-end encryption and enterprise audit trails.
            </p>
          </div>

          {/* Animated Stats */}
          <div ref={statsRef} className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {[
              { label: 'Uptime SLA', value: counters.uptime.toFixed(2), suffix: '%', icon: <BarChart3 size={18} />, accent: 'emerald' },
              { label: 'Active Users', value: counters.users.toLocaleString(), suffix: '+', icon: <Users size={18} />, accent: 'indigo' },
              { label: 'Integrations', value: counters.integrations, suffix: '+', icon: <Zap size={18} />, accent: 'violet' },
              { label: 'Countries', value: counters.countries, suffix: '+', icon: <Globe size={18} />, accent: 'cyan' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="p-5 rounded-2xl bg-white dark:bg-neutral-900/60 border border-neutral-200/50 dark:border-neutral-800/60 text-center"
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white mx-auto mb-3 icon-bg-${stat.accent}`}>
                  {stat.icon}
                </div>
                <div className="text-2xl sm:text-3xl font-black text-neutral-900 dark:text-white">
                  {stat.value}{stat.suffix}
                </div>
                <div className="text-[11px] font-semibold text-neutral-400 mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Compliance Badge Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { title: 'SOC 2 Type II', desc: 'Annual third-party audits of all infrastructure & access controls.', icon: <Lock size={20} />, color: 'indigo' },
              { title: 'AES-256 Encryption', desc: 'All data at rest and in transit protected by military-grade encryption.', icon: <Shield size={20} />, color: 'emerald' },
              { title: 'GDPR & CCPA Ready', desc: 'Full data residency controls, right-to-erasure, and consent management.', icon: <Globe size={20} />, color: 'violet' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 + i * 0.1, duration: 0.4 }}
                className="p-5 rounded-2xl border border-neutral-200/60 dark:border-neutral-800/60 bg-neutral-50/50 dark:bg-neutral-900/40 flex items-start gap-4 group hover:border-indigo-500/30 transition-colors"
              >
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-white shrink-0 icon-bg-${item.color}`}>
                  {item.icon}
                </div>
                <div>
                  <h4 className="font-extrabold text-[14px] text-neutral-900 dark:text-white">{item.title}</h4>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* SECTION 5: INTEGRATIONS ECOSYSTEM */}
        <div
          ref={integrationsSectionRef}
          data-section="integrations"
          className="google-feature-card p-6 sm:p-10 mb-10 overflow-hidden relative"
        >
          <div className="absolute bottom-0 left-[20%] w-96 h-96 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(99,102,241,0.06) 0%, transparent 60%)' }} />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 space-y-5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/40 border border-amber-200/30 dark:border-amber-800/40 text-amber-600 dark:text-amber-400 text-[9.5px] font-bold tracking-wider uppercase">
                <Zap size={11} className="animate-pulse" />
                <span>300+ Native Connections</span>
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-neutral-900 dark:text-white leading-tight tracking-tight">
                Connect with your existing tools.
              </h2>
              <p className="text-neutral-500 dark:text-neutral-400 text-sm sm:text-[14.5px] leading-relaxed">
                Aether integrates natively with the entire SaaS ecosystem you already use. Zero rip-and-replace. Just plug in and go live in minutes.
              </p>
              <div className="space-y-2.5 pt-1">
                {[
                  'Bidirectional real-time sync via webhooks.',
                  'OAuth 2.0 authentication flows built in.',
                  'API rate-limit management handled automatically.',
                ].map((f, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <div className="w-5 h-5 rounded-full bg-amber-500/10 text-amber-500 flex items-center justify-center shrink-0 mt-0.5"><Check size={11} /></div>
                    <span className="text-xs sm:text-[13px] font-semibold text-neutral-700 dark:text-neutral-300">{f}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-7">
              {/* Integration Logo Grid */}
              <div className="grid grid-cols-4 gap-3 sm:gap-4">
                {[
                  { name: 'Slack', color: '#E01E5A', icon: '💬' },
                  { name: 'Stripe', color: '#6772e5', icon: '💳' },
                  { name: 'GitHub', color: '#181717', icon: '🐙' },
                  { name: 'Figma', color: '#F24E1E', icon: '🎨' },
                  { name: 'Notion', color: '#000000', icon: '📝' },
                  { name: 'Jira', color: '#0052CC', icon: '📋' },
                  { name: 'HubSpot', color: '#FF7A59', icon: '🔥' },
                  { name: 'Zoom', color: '#2D8CFF', icon: '📹' },
                  { name: 'Salesforce', color: '#00A1E0', icon: '☁️' },
                  { name: 'AWS', color: '#FF9900', icon: '⚙️' },
                  { name: 'Zapier', color: '#FF4A00', icon: '⚡' },
                  { name: '+288', color: '#6366f1', icon: '∞' },
                ].map((integration, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    whileHover={{ scale: 1.08, y: -3 }}
                    className="aspect-square rounded-2xl flex flex-col items-center justify-center gap-1.5 cursor-pointer border border-neutral-200/60 dark:border-neutral-800/60 bg-white dark:bg-neutral-900/60 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <span className="text-xl sm:text-2xl">{integration.icon}</span>
                    <span className="text-[9px] font-bold text-neutral-500 dark:text-neutral-400 text-center leading-none px-1">{integration.name}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* SECTION 6: CUSTOMER STORIES / TESTIMONIALS */}
        <div
          ref={testimonialsSectionRef}
          data-section="testimonials"
          className="google-feature-card p-6 sm:p-10 mb-10 overflow-hidden relative"
        >
          <div className="absolute top-[10%] left-[5%] w-72 h-72 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(244,63,94,0.05) 0%, transparent 60%)' }} />

          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 dark:bg-rose-950/40 border border-rose-200/30 dark:border-rose-800/40 text-rose-600 dark:text-rose-400 text-[9.5px] font-bold tracking-wider uppercase mb-4">
              <Star size={11} className="animate-pulse" />
              <span>Customer Stories</span>
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-neutral-900 dark:text-white leading-tight tracking-tight">
              Teams love Aether Hub.
            </h2>
            <p className="text-neutral-500 dark:text-neutral-400 text-sm mt-3">Real stories from real operators running their business on Aether.</p>
          </div>

          {/* Testimonial Carousel */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
            {[
              { quote: "Aether replaced 9 different SaaS tools for us. The cognitive CRM alone saved us $14k/year in sales ops overhead. It's the only platform we run our entire revenue engine on.", name: "Sarah Chen", role: "VP of Revenue, Nexus Corp", accent: 'indigo', stars: 5 },
              { quote: "The CRDT sync engine is insane. Our 50-person remote team works in real time with zero conflicts. We haven't had a data merge issue in 8 months since switching.", name: "Marcus Rodriguez", role: "CTO, Vault Labs", accent: 'emerald', stars: 5 },
              { quote: "We onboarded our 200-person operations team in 2 days. The wizard suite builder made it stupid easy. No IT required. Our team adopted it immediately.", name: "Priya Patel", role: "Head of Ops, Lumino", accent: 'violet', stars: 5 },
              { quote: "Aether Books + Invoice together is the most complete financial ops product I've ever used. Our accountants actually love the audit trail. That never happened with any other tool.", name: "James O'Brien", role: "CFO, Meridian Group", accent: 'amber', stars: 5 },
            ].map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className={`p-6 rounded-2xl border bg-white dark:bg-neutral-900/60 transition-all duration-300 cursor-default ${
                  activeTestimonial === i
                    ? 'border-indigo-500/40 shadow-lg shadow-indigo-500/5'
                    : 'border-neutral-200/50 dark:border-neutral-800/60'
                }`}
                onClick={() => setActiveTestimonial(i)}
              >
                <div className="flex mb-3">
                  {Array.from({ length: t.stars }).map((_, si) => (
                    <Star key={si} size={12} className="text-amber-400 fill-amber-400" />
                  ))}
                </div>
                <Quote size={20} className="text-neutral-200 dark:text-neutral-800 mb-2" />
                <p className="text-sm text-neutral-600 dark:text-neutral-300 leading-relaxed font-medium mb-4">&ldquo;{t.quote}&rdquo;</p>
                <div className="flex items-center gap-3 pt-3 border-t border-neutral-200/40 dark:border-neutral-800/40">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-[11px] font-black icon-bg-${t.accent}`}>
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-[12.5px] font-extrabold text-neutral-900 dark:text-white">{t.name}</div>
                    <div className="text-[10.5px] text-neutral-400 font-medium">{t.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Testimonial dots */}
          <div className="flex items-center justify-center gap-2">
            {[0,1,2,3].map(i => (
              <button
                key={i}
                onClick={() => setActiveTestimonial(i)}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${ activeTestimonial === i ? 'w-6 bg-indigo-600' : 'w-1.5 bg-neutral-200 dark:bg-neutral-700' }`}
              />
            ))}
          </div>
        </div>

        {/* SECTION 7: PRICING PLANS */}
        <div
          ref={pricingSectionRef}
          data-section="pricing"
          className="google-feature-card p-6 sm:p-10 mb-10 overflow-hidden relative"
        >
          <div className="absolute top-[20%] right-[5%] w-80 h-80 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.07) 0%, transparent 60%)' }} />

          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-50 dark:bg-violet-950/40 border border-violet-200/30 dark:border-violet-800/40 text-violet-600 dark:text-violet-400 text-[9.5px] font-bold tracking-wider uppercase mb-4">
              <DollarSign size={11} />
              <span>Simple, Transparent Pricing</span>
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-neutral-900 dark:text-white leading-tight tracking-tight">
              One price. Every product.
            </h2>
            <p className="text-neutral-500 dark:text-neutral-400 text-sm mt-3">Bundle any combination of Aether products at massive discounts.</p>

            {/* Toggle */}
            <div className="inline-flex items-center gap-1 mt-6 p-1 rounded-full bg-neutral-100 dark:bg-neutral-900 border border-neutral-200/50 dark:border-neutral-800">
              <button
                onClick={() => setPricingPlan('monthly')}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${ pricingPlan === 'monthly' ? 'bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white shadow-sm' : 'text-neutral-500' }`}
              >Monthly</button>
              <button
                onClick={() => setPricingPlan('annual')}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${ pricingPlan === 'annual' ? 'bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white shadow-sm' : 'text-neutral-500' }`}
              >
                Annual <span className="text-emerald-500 ml-1">-30%</span>
              </button>
            </div>
          </div>

          {/* Pricing Tiers */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {[
              {
                name: 'Starter',
                desc: 'Perfect for solo builders and small teams.',
                monthly: 29,
                annual: 19,
                color: 'emerald',
                features: ['Up to 5 Aether apps', '10,000 API calls/mo', 'Community support', 'Local-first storage', '2 team seats'],
              },
              {
                name: 'Pro',
                desc: 'For growing teams running full operations.',
                monthly: 79,
                annual: 55,
                color: 'indigo',
                popular: true,
                features: ['Up to 20 Aether apps', '500,000 API calls/mo', 'Priority support 24/7', 'CRDT cloud sync', '20 team seats', 'Advanced analytics', 'Custom integrations'],
              },
              {
                name: 'Enterprise',
                desc: 'Unlimited everything for large organizations.',
                monthly: 249,
                annual: 175,
                color: 'violet',
                features: ['All 40+ Aether apps', 'Unlimited API calls', 'Dedicated account manager', 'SLA 99.99% uptime', 'Unlimited seats', 'SSO & SAML', 'On-premise deployment'],
              },
            ].map((tier, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                onClick={() => setActivePricingTier(i)}
                className={`relative p-6 rounded-2xl border cursor-pointer transition-all duration-300 ${
                  activePricingTier === i
                    ? 'border-indigo-500/50 shadow-xl shadow-indigo-500/10 bg-white dark:bg-neutral-900'
                    : 'border-neutral-200/50 dark:border-neutral-800/60 bg-neutral-50/50 dark:bg-neutral-900/40 hover:border-indigo-500/20'
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-[10px] font-extrabold text-white" style={{ background: 'linear-gradient(135deg,#6366f1,#7c3aed)' }}>Most Popular</div>
                )}
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-white mb-4 icon-bg-${tier.color}`}>
                  <DollarSign size={18} />
                </div>
                <h3 className="text-[17px] font-black text-neutral-900 dark:text-white">{tier.name}</h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 mb-4">{tier.desc}</p>
                <div className="flex items-baseline gap-1 mb-6">
                  <span className="text-3xl font-black text-neutral-900 dark:text-white">${pricingPlan === 'annual' ? tier.annual : tier.monthly}</span>
                  <span className="text-xs text-neutral-400">/mo</span>
                  {pricingPlan === 'annual' && <span className="text-[10px] font-bold text-emerald-500 bg-emerald-50 dark:bg-emerald-950/30 px-2 py-0.5 rounded-full">Save 30%</span>}
                </div>
                <ul className="space-y-2.5 mb-6">
                  {tier.features.map((f, fi) => (
                    <li key={fi} className="flex items-center gap-2 text-xs font-medium text-neutral-600 dark:text-neutral-300">
                      <div className={`w-4 h-4 rounded-full flex items-center justify-center icon-bg-${tier.color} shrink-0`}>
                        <Check size={9} className="text-white" />
                      </div>
                      {f}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={(e) => { e.stopPropagation(); }}
                  className={`w-full py-2.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer ${
                    activePricingTier === i
                      ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-md shadow-indigo-500/20'
                      : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700'
                  }`}
                >
                  Get started with {tier.name}
                </button>
              </motion.div>
            ))}
          </div>
        </div>

        {/* SECTION 8: ALL PRODUCTS DIRECTORY */}
        <div
          ref={directorySectionRef}
          data-section="directory"
          className="w-full pt-10 border-t border-neutral-200/40 dark:border-neutral-800/40"
        >
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-10 select-none">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200/30 dark:border-indigo-800/40 text-indigo-600 dark:text-indigo-400 text-[9.5px] font-bold tracking-wider uppercase">
              <Compass size={11} />
              <span>Full Product Suite Directory</span>
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-neutral-900 dark:text-white tracking-tight">Explore all 40+ products.</h2>
            <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 leading-relaxed">Filter the full operational catalog by business domains to configure your stack.</p>
          </div>

          {/* MAIN LAYOUT SINGLE GRID — Google-inspired unified grid */}
          <div className="w-full space-y-6">
            
            {/* Filters Bar: Horizontal on Desktop, Dropdown on Mobile */}
            <div className="py-4 px-0 border-b border-neutral-200/40 dark:border-neutral-800/40 flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
              {/* Search Input */}
              <div className="relative flex-1 max-w-md">
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

              {/* Category Selectors / Pills */}
              <div className="flex items-center gap-3 w-full md:w-auto overflow-x-auto scrollbar-none py-1">
                {/* Mobile Dropdown */}
                <div className="block md:hidden w-full relative">
                  <select
                    value={activeCategory}
                    onChange={(e) => setActiveCategory(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-[13px] font-semibold text-neutral-800 dark:text-neutral-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Desktop Pills */}
                <div className="hidden md:flex items-center gap-1.5 overflow-x-auto scrollbar-none">
                  {categories.map((cat) => {
                    const isActive = activeCategory === cat;
                    return (
                      <button
                        key={cat}
                        onClick={() => setActiveCategory(cat)}
                        className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap cursor-pointer transition-all duration-200 ${
                          isActive
                            ? 'text-white bg-indigo-650 shadow-sm shadow-indigo-500/20 border-indigo-600'
                            : 'bg-neutral-100/80 dark:bg-white/5 border border-transparent text-neutral-500 dark:text-neutral-400 hover:bg-neutral-200/50 dark:hover:bg-white/10 hover:text-neutral-800 dark:hover:text-neutral-200'
                        }`}
                      >
                        {cat}
                      </button>
                    );
                  })}
                </div>

                {/* Grid/List Controls */}
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
            </div>

            {/* Layout switcher rendering */}
            <AnimatePresence mode="popLayout">
              {viewMode === 'grid' ? (
                // Bento Grid Mode — Premium Card Layout
                <motion.div
                  layout
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
                >
                  {displayApps.map((app, idx) => (
                    <motion.div
                      key={app.id}
                      layout
                      initial={{ opacity: 0, y: 18 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.3, delay: Math.min(idx * 0.03, 0.3), ease: [0.22, 1, 0.36, 1] }}
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
                          {React.cloneElement(app.icon as React.ReactElement<{ className?: string; style?: React.CSSProperties }>, { 
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
                  {displayApps.map((app, idx) => (
                    <motion.div
                      key={app.id}
                      layout
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.25, delay: Math.min(idx * 0.02, 0.2), ease: [0.22, 1, 0.36, 1] }}
                      className={`list-card w-full px-4 sm:px-5 py-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 select-none ${
                        activeStack.includes(app.id) ? 'is-active' :
                        highlightedApps.includes(app.id) ? 'is-highlighted' : ''
                      }`}
                      onMouseMove={handleCardMouseMove}
                    >
                      <div className="flex items-center gap-3 sm:gap-3.5 flex-1 min-w-0">
                        <div className={`card-icon w-10 h-10 sm:w-11 sm:h-11 rounded-xl flex items-center justify-center text-white shrink-0 icon-bg-${app.accent || 'indigo'}`}>
                          {React.cloneElement(app.icon as React.ReactElement<{ className?: string; style?: React.CSSProperties }>, { 
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

            {displayApps.length === 0 && (
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
          </div>{/* end w-full space-y-6 */}
        </div>{/* end Section 4 wrapper */}
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
              shadow-2xl pb-safe"
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
                      {renderAppIcon(matched.icon, 'text-white', 14)}
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
                      {renderAppIcon(matched.icon, 'text-white', 13)}
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
                    {renderAppIcon(selectedAppForConsole.icon, 'text-white', 18)}
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
                          {renderAppIcon(matched.icon, 'text-white', 18)}
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
