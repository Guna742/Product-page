import React from 'react';

export interface AppItem {
  id: string;
  name: string;
  tagline: string;
  desc: string;
  category: string;
  accent: string; // HSL brand mapping
  popular: boolean;
  icon: React.ReactNode;
}

// Applications Database (43 items across Zoho's core domains)
export const applications: AppItem[] = [
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

export const categories = ['All', ...Array.from(new Set(applications.map((app) => app.category)))];
