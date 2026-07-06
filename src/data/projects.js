// Professional projects data
export const projectsData = [
  {
    color: "#060010",
    title: "SAP Business One to Shopify Integration",
    description: "CTO-appointed Person-In-Charge of a bidirectional SAP Business One to Shopify integration spanning 12 data domains. Built the orchestration layer on a customized ActivePieces fork with custom Pieces, Actions, and Triggers against the SAP B1 Service Layer and Shopify Admin GraphQL API, and designed a delta-sync architecture using high-water-mark polling and reconciliation. Shipped a React/Hono ops dashboard, 4 Shopify admin UI extensions, a B2B pricing engine as a Shopify Function, and an MCP server exposing SAP B1 docs.",
    label: "Flagship · Integration",
    tech: ['SAP B1 Service Layer', 'Shopify Admin GraphQL', 'ActivePieces', 'Gadget', 'Hono', 'React', 'shadcn/ui', 'Preact', 'Shopify Functions', 'DBML', 'MCP', 'PostHog'],
    period: '2025 - Present',
    highlights: ['Person-In-Charge / Lead', '12 Data Domains', 'Delta-Sync Architecture', 'Ops Dashboard', 'B2B Pricing Engine', 'MCP Server']
  },
  {
    color: "#060010",
    title: "PosLoy - Shopify Loyalty Platform",
    description: "Architected an end-to-end Shopify loyalty platform with points, tiers, referrals, daily check-in streaks, and birthday/campaign bonuses. Built on Gadget with Stripe subscription billing and app-proxy APIs, delivered across checkout, POS, admin, customer-account, and theme app extensions.",
    label: "Shopify App",
    tech: ['Gadget', 'Stripe', 'Shopify Extensions', 'App Proxy', 'React', 'GraphQL'],
    period: '2025',
    highlights: ['Points & Tiers', 'Referrals & Streaks', 'Stripe Billing', 'Multi-surface Extensions']
  },
  {
    color: "#060010",
    title: "JD Sports Self-Checkout Kiosk",
    description: "Built a cashier-less self-checkout kiosk for JD Sports Malaysia: a Shopify Checkout UI Extension plus Remix/TypeScript backend rendering inline DuitNow QR via Fiuu, auto-detecting payment and marking orders paid with no cashier involvement. Ran a rigorous payment-gateway evaluation to select the only viable inline DuitNow QR provider.",
    label: "Kiosk · Payments",
    tech: ['Shopify Checkout UI Extension', 'Remix', 'TypeScript', 'Fiuu', 'DuitNow QR', 'PWA'],
    period: '2025',
    highlights: ['Cashier-less Checkout', 'Inline DuitNow QR', 'Auto Payment Detection', 'Gateway Evaluation']
  },
  {
    color: "#060010",
    title: "Materia - AI Image Studio SaaS",
    description: "Designed and shipped a production multi-tenant B2B AI Image Studio (editorial garment-swap / jewelry try-on). Built a Redis/BullMQ worker queue, Stripe credit billing, and dual Gemini providers (AI Studio and Vertex) toggleable at runtime, plus a full admin/monitoring/audit panel. Deployed to production on the company Webdock VPS.",
    label: "SaaS Product",
    tech: ['Next.js 16', 'React 19', 'PostgreSQL', 'Prisma', 'Redis', 'BullMQ', 'NextAuth', 'Stripe', 'Gemini/Vertex'],
    period: '2025',
    highlights: ['Multi-tenant B2B', 'Credit Billing', 'Worker Queue', 'Admin & Audit Panel']
  },
  {
    color: "#060010",
    title: "Smart ETL - Workflow Automation Platform",
    description: "Full-stack workflow automation platform combining n8n/Zapier-like capabilities with geospatial data processing. Developed AI/LLM workflow nodes (LLMBasicChain, Information Extractor), computer-vision nodes for face and license-plate blurring using Detectron2/OpenCV, communication output nodes, and geospatial processing nodes following FME methodology.",
    label: "Product Development",
    tech: ['Django', 'React', 'TypeScript', 'XYFlow', 'Material-UI', 'PostgreSQL', 'Redis', 'Celery', 'Docker', 'NodeODM'],
    period: '2024 - 2025',
    highlights: ['Visual Workflow Builder', 'AI/LLM Nodes', 'Computer Vision', 'Geospatial Processing']
  },
  {
    color: "#060010",
    title: "WISS - Enterprise Solution",
    description: "Led a cross-functional team of 5 developers (3 web, 2 mobile) in delivering an enterprise-level solution. Architected a full-stack web application using Laravel with Inertia.js and Vue.js, implemented a Filament admin panel, supervised React Native mobile development, and established CI/CD pipelines and Ansible-based production deployments.",
    label: "Team Leadership",
    tech: ['Laravel', 'Inertia.js', 'Vue.js', 'Filament', 'React Native', 'MySQL', 'GitLab CI/CD', 'Ansible'],
    period: '2024 - 2025',
    highlights: ['Team of 5', 'CI/CD Implementation', 'Full-stack Architecture', 'Code Review Processes']
  },
  {
    color: "#060010",
    title: "KPM - Ministry of Education",
    description: "Provided technical consultancy for Malaysia's Ministry of Education digital transformation initiative. Designed comprehensive infrastructure architecture across public and private cloud, conducted in-depth AWS analysis, and recommended a modular-monolith migration path as a strategic step toward microservices.",
    label: "Cloud Architecture",
    tech: ['AWS', 'Kubernetes', 'Draw.io', 'Modular Monolith Architecture'],
    period: '2024 - 2025',
    highlights: ['Infrastructure Design', 'Cloud Architecture', 'Technical Consultancy', 'Strategic Guidance']
  }
];

// Personal projects data
export const personalProjectsData = [
  {
    color: "#060010",
    title: "Supplement Tracker AI",
    description: "Flutter Android app for supplement tracking with Claude Haiku 4.5-powered AI coaching via an Edge Function proxy. Built on Riverpod and a Drift local DB with Supabase Postgres/Edge Functions, RevenueCat subscriptions, and Sentry/PostHog observability.",
    label: "Mobile App",
    tech: ['Flutter', 'Riverpod', 'Drift', 'Supabase', 'RevenueCat', 'Claude API'],
    period: '2025',
    highlights: ['AI Coaching', 'Offline-first DB', 'Subscriptions', 'Observability']
  },
  {
    color: "#060010",
    title: "Raspberry Pi CM5 Kiosk Platform",
    description: "Engineered a Raspberry Pi Compute Module 5 kiosk platform: custom carrier PCB, 13.3\" DSI capacitive touchscreen, enclosure assembly, and Linux touchscreen calibration/provisioning. Packaged and deployed the kiosk as a PWA/APK on Honeywell retail tablets, solving Shopify CDN service-worker scoping for reliable operation.",
    label: "Hardware / Kiosk",
    tech: ['Raspberry Pi CM5', 'DSI/MIPI', 'libinput', 'PWA', 'Linux'],
    period: '2025',
    highlights: ['Custom Carrier PCB', 'Touchscreen Provisioning', 'PWA Deployment']
  },
  {
    color: "#060010",
    title: "Self-Hosted Infrastructure",
    description: "Deployed and operate production infrastructure on the company Webdock VPS: the BigBang automation platform, Materia SaaS, Lago (usage-based billing), Mautic (email marketing), and Peppermint (ticketing) via Docker Compose, Traefik/Let's Encrypt, and custom multi-arch images. Built a homelab IaC and observability setup with OpenTofu, Ansible, and Prometheus/Grafana.",
    label: "DevOps / Self-Hosting",
    tech: ['Docker Compose', 'Traefik', 'OpenTofu', 'Ansible', 'Prometheus', 'Grafana'],
    period: '2025',
    highlights: ['Production VPS Ops', 'TLS Automation', 'IaC & Observability']
  },
  {
    color: "#060010",
    title: "KDE Plasma Prayer-Times Widget",
    description: "Built a KDE Plasma 6 prayer-times widget backed by the JAKIM e-solat API, with offline caching and azan playback, demonstrating cross-platform desktop breadth beyond web and mobile.",
    label: "Desktop Widget",
    tech: ['KDE Plasma 6', 'QML', 'JAKIM e-solat API'],
    period: '2025',
    highlights: ['Offline Caching', 'Azan Playback', 'Cross-platform']
  }
];
