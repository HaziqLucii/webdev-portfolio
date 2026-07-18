// Professional projects data
export const projectsData = [
  {
    color: "#060010",
    title: "SAP Business One to Shopify Integration",
    description: "CTO-appointed Person-In-Charge of a bidirectional SAP Business One to Shopify integration spanning 12 data domains. Built the orchestration layer on a customized ActivePieces fork with custom Pieces, Actions, and Triggers against the SAP B1 Service Layer and Shopify Admin GraphQL API, and designed a delta-sync architecture using high-water-mark polling and reconciliation. Shipped a React/Hono ops dashboard, 4 Shopify admin UI extensions, a B2B pricing engine as a Shopify Function, and an MCP server exposing SAP B1 docs.",
    label: "Flagship · Integration",
    tech: ['SAP B1 Service Layer', 'Shopify Admin GraphQL', 'ActivePieces', 'Gadget', 'Hono', 'React', 'shadcn/ui', 'Preact', 'Shopify Functions', 'DBML', 'MCP', 'PostHog'],
    period: '2025 - Present',
    highlights: ['Person-In-Charge / Lead', '12 Data Domains', 'Delta-Sync Architecture', 'Ops Dashboard', 'B2B Pricing Engine', 'MCP Server'],
    caseStudy: {
      role: "Person-In-Charge / Lead",
      problem: "The company ran operations in SAP Business One but sold on Shopify. Products, pricing, inventory, orders, and customers lived in two systems that constantly drifted apart, with no reliable bridge between them.",
      approach: [
        "Appointed by the CTO as Person-In-Charge; mapped 12 data domains and the sync direction each one needed.",
        "Built the orchestration layer on a customized ActivePieces fork with custom Pieces, Actions, and Triggers against the SAP B1 Service Layer and the Shopify Admin GraphQL API.",
        "Designed a delta-sync architecture using high-water-mark polling and reconciliation so syncs stay incremental and self-healing.",
        "Shipped a React/Hono ops dashboard, 4 Shopify admin UI extensions, a B2B pricing engine as a Shopify Function, and an MCP server exposing SAP B1 docs.",
      ],
      impact: [
        "Bidirectional sync across all 12 data domains.",
        "Incremental delta-sync avoids full re-syncs and recovers from gaps on its own.",
        "The whole pipeline is operable and observable from a purpose-built dashboard.",
      ],
    },
  },
  {
    color: "#060010",
    title: "PosLoy - Shopify Loyalty Platform",
    description: "Architected an end-to-end Shopify loyalty platform with points, tiers, referrals, daily check-in streaks, and birthday/campaign bonuses. Built on Gadget with Stripe subscription billing and app-proxy APIs, delivered across checkout, POS, admin, customer-account, and theme app extensions.",
    label: "Shopify App",
    tech: ['Gadget', 'Stripe', 'Shopify Extensions', 'App Proxy', 'React', 'GraphQL'],
    period: '2025',
    highlights: ['Points & Tiers', 'Referrals & Streaks', 'Stripe Billing', 'Multi-surface Extensions'],
    caseStudy: {
      role: "Architect / Full-stack",
      problem: "Merchants wanted real retention mechanics (points, tiers, referrals, streaks, campaigns) that work everywhere a customer meets the brand, not only on the web storefront.",
      approach: [
        "Architected an end-to-end loyalty platform on Gadget with points, tiers, referrals, daily check-in streaks, and birthday/campaign bonuses.",
        "Added Stripe subscription billing and app-proxy APIs for the storefront.",
        "Delivered the experience across checkout, POS, admin, customer-account, and theme app extensions.",
      ],
      impact: [
        "One loyalty engine spanning five Shopify surfaces.",
        "Recurring revenue handled through Stripe subscriptions.",
      ],
    },
  },
  {
    color: "#060010",
    title: "JD Sports Self-Checkout Kiosk",
    description: "Built a cashier-less self-checkout kiosk for JD Sports Malaysia end to end, from the device to the checkout. Engineered the hardware platform on a Raspberry Pi Compute Module 5: custom carrier PCB, 13.3\" DSI capacitive touchscreen, enclosure assembly, and Linux touchscreen calibration and provisioning.\n\nThe checkout is a Shopify Checkout UI Extension with a Remix/TypeScript backend that auto-detects payment and marks orders paid with no cashier involvement. It supports inline DuitNow QR and tap-to-pay, tested across Fiuu (with a Kozen terminal) and Stripe. A rigorous payment-gateway evaluation selected the only viable inline DuitNow QR provider, and the storefront ships as a PWA, solving Shopify CDN service-worker scoping for reliable operation.",
    label: "Kiosk · Payments",
    tech: ['Shopify Checkout UI Extension', 'Raspberry Pi CM5', 'DuitNow QR', 'Tap to Pay', 'Stripe', 'Fiuu', 'Kozen Terminal', 'Remix', 'TypeScript', 'PWA', 'Linux'],
    period: '2025',
    highlights: ['Cashier-less Checkout', 'DuitNow QR + Tap to Pay', 'Custom Carrier PCB', 'Hardware to Checkout'],
    caseStudy: {
      role: "Hardware + Full-stack",
      problem: "The retailer wanted a cashier-less self-checkout that accepts local payments (DuitNow QR and tap-to-pay) on a purpose-built in-store device.",
      approach: [
        "Engineered the hardware platform on a Raspberry Pi Compute Module 5: custom carrier PCB, 13.3\" DSI touchscreen, enclosure, and Linux touchscreen provisioning.",
        "Built the checkout as a Shopify Checkout UI Extension with a Remix/TypeScript backend that auto-detects payment and marks orders paid.",
        "Integrated inline DuitNow QR and tap-to-pay, tested across Fiuu (with a Kozen terminal) and Stripe.",
        "Ran a payment-gateway evaluation to select the only viable inline DuitNow QR provider.",
      ],
      impact: [
        "Fully cashier-less checkout, hardware to software.",
        "Multiple local payment paths (DuitNow QR + tap-to-pay) validated on two gateways.",
        "Shipped as a PWA, with Shopify CDN service-worker scoping solved for reliability.",
      ],
    },
  },
  {
    color: "#060010",
    title: "Materia - AI Image Studio SaaS",
    description: "Designed and shipped a production multi-tenant B2B AI Image Studio (editorial garment-swap / jewelry try-on). Built a Redis/BullMQ worker queue, Stripe credit billing, and dual Gemini providers (AI Studio and Vertex) toggleable at runtime, plus a full admin/monitoring/audit panel. Deployed to production on the company Webdock VPS.",
    label: "SaaS Product",
    tech: ['Next.js 16', 'React 19', 'PostgreSQL', 'Prisma', 'Redis', 'BullMQ', 'NextAuth', 'Stripe', 'Gemini/Vertex'],
    period: '2025',
    highlights: ['Multi-tenant B2B', 'Credit Billing', 'Worker Queue', 'Admin & Audit Panel'],
    caseStudy: {
      role: "Designer + Full-stack",
      problem: "The business needed a production, multi-tenant AI image studio (editorial garment-swap and jewelry try-on) with metered billing and real operational oversight.",
      approach: [
        "Designed and shipped a multi-tenant B2B SaaS with a Redis/BullMQ worker queue for image jobs.",
        "Added Stripe credit billing and dual Gemini providers (AI Studio and Vertex) toggleable at runtime.",
        "Built a full admin, monitoring, and audit panel; deployed to production on the company Webdock VPS.",
      ],
      impact: [
        "Runs multi-tenant in production.",
        "Credit-based billing with runtime-switchable AI providers.",
        "Operable via a dedicated admin and audit surface.",
      ],
    },
  },
  {
    color: "#060010",
    title: "Smart ETL - Workflow Automation Platform",
    description: "Full-stack workflow automation platform combining n8n/Zapier-like capabilities with geospatial data processing. Developed AI/LLM workflow nodes (LLMBasicChain, Information Extractor), computer-vision nodes for face and license-plate blurring using Detectron2/OpenCV, communication output nodes, and geospatial processing nodes following FME methodology.",
    label: "Product Development",
    tech: ['Django', 'React', 'TypeScript', 'XYFlow', 'Material-UI', 'PostgreSQL', 'Redis', 'Celery', 'Docker', 'NodeODM'],
    period: '2024 - 2025',
    highlights: ['Visual Workflow Builder', 'AI/LLM Nodes', 'Computer Vision', 'Geospatial Processing'],
    caseStudy: {
      role: "Product Developer",
      problem: "Plisca wanted to build its own automation SaaS: a way to help people turn repetitive, manual work into automated workflows and integrations. After researching n8n and Zapier, they set out to go a step further with geospatial processing that those tools do not offer.",
      approach: [
        "Studied n8n and Zapier, then built a visual node-based builder that extends the same idea.",
        "Developed AI/LLM workflow nodes (LLMBasicChain, Information Extractor).",
        "Built computer-vision nodes for face and license-plate blurring using Detectron2/OpenCV.",
        "Added communication output nodes and geospatial processing nodes following FME methodology.",
      ],
      impact: [
        "A single visual builder spanning AI, computer vision, and geospatial workflows.",
        "Geospatial nodes set it apart from off-the-shelf tools like n8n and Zapier.",
      ],
    },
  },
  {
    color: "#060010",
    title: "WISS - Enterprise Solution",
    description: "Led a cross-functional team of 5 developers (3 web, 2 mobile) in delivering an enterprise-level solution. Architected a full-stack web application using Laravel with Inertia.js and Vue.js, implemented a Filament admin panel, supervised React Native mobile development, and established CI/CD pipelines and Ansible-based production deployments.",
    label: "Team Leadership",
    tech: ['Laravel', 'Inertia.js', 'Vue.js', 'Filament', 'React Native', 'MySQL', 'GitLab CI/CD', 'Ansible'],
    period: '2024 - 2025',
    highlights: ['Team of 5', 'CI/CD Implementation', 'Full-stack Architecture', 'Code Review Processes'],
    caseStudy: {
      role: "Technical Lead",
      problem: "JPS, a government agency, was still running its processes manually and wanted to digitalize them. They needed a full-stack solution delivered across both web and mobile.",
      approach: [
        "Led a cross-functional team of 5 (3 web, 2 mobile).",
        "Architected a Laravel + Inertia.js + Vue.js web application with a Filament admin panel.",
        "Supervised the React Native mobile app so the solution covered both web and mobile.",
        "Established CI/CD pipelines and Ansible-based production deployments.",
      ],
      impact: [
        "Manual government processes moved onto a web and mobile solution.",
        "Delivered end-to-end by a lean team, with repeatable CI/CD and code review in place.",
      ],
    },
  },
  {
    color: "#060010",
    title: "KPM - Ministry of Education",
    description: "Provided technical consultancy for Malaysia's Ministry of Education digital transformation initiative. Designed comprehensive infrastructure architecture across public and private cloud, conducted in-depth AWS analysis, and recommended a modular-monolith migration path as a strategic step toward microservices.",
    label: "Cloud Architecture",
    tech: ['AWS', 'Kubernetes', 'Draw.io', 'Modular Monolith Architecture'],
    period: '2024 - 2025',
    highlights: ['Infrastructure Design', 'Cloud Architecture', 'Technical Consultancy', 'Strategic Guidance'],
    caseStudy: {
      role: "Technical Consultant",
      problem: "The ministry needed infrastructure direction for a digital transformation initiative.",
      approach: [
        "Designed infrastructure architecture across public and private cloud.",
        "Conducted an in-depth AWS analysis.",
        "Recommended a modular-monolith migration path as a strategic step toward microservices.",
      ],
      impact: [
        "A clear, staged cloud architecture and migration strategy.",
      ],
    },
  },
  {
    color: "#060010",
    title: "Production Infrastructure & DevOps",
    description: "Deployed and operate self-hosted open-source tools for internal company use, cutting software subscription costs: Mautic (email marketing), Lago (usage-based billing), and Peppermint (ticketing). Runs on a Webdock VPS via Docker Compose, Traefik/Let's Encrypt, and custom multi-arch images, with infrastructure-as-code and observability through OpenTofu, Ansible, and Prometheus/Grafana.",
    label: "DevOps / Infrastructure",
    tech: ['Docker Compose', 'Traefik', 'OpenTofu', 'Ansible', 'Prometheus', 'Grafana'],
    period: '2025',
    highlights: ['Cost Reduction', 'Self-Hosted OSS', 'TLS Automation', 'IaC & Observability'],
    caseStudy: {
      role: "DevOps Engineer",
      problem: "Meekco.Asia wanted to cut recurring software subscription costs by self-hosting open-source alternatives for internal tools instead of paying for SaaS. The CTO appointed me as DevOps to deploy and run them.",
      approach: [
        "Deployed Mautic (email marketing), Lago (usage-based billing), and Peppermint (ticketing) as self-hosted open-source services for internal use.",
        "Ran everything on a Webdock VPS via Docker Compose, Traefik/Let's Encrypt, and custom multi-arch images.",
        "Set up infrastructure-as-code and observability with OpenTofu, Ansible, and Prometheus/Grafana.",
      ],
      impact: [
        "Paid SaaS replaced with self-hosted open-source, cutting subscription cost.",
        "Internal marketing, billing, and ticketing tools running with automated TLS.",
        "IaC plus observability for repeatable, monitorable operations.",
      ],
    },
  }
];

// Personal projects data
export const personalProjectsData = [
  {
    color: "#060010",
    title: "KDE Plasma Prayer-Times Widget",
    description: "A KDE Plasma 6 desktop widget (plasmoid) showing daily prayer times from the JAKIM e-solat API, with offline caching and azan playback.",
    label: "Desktop Widget",
    tech: ['KDE Plasma 6', 'QML', 'JAKIM e-solat API'],
    period: '2025',
    highlights: ['Offline Caching', 'Azan Playback']
  },
  {
    color: "#060010",
    title: "haro",
    description: "A local-first, Linux-first orchestrator for AI coding agents. Runs multiple agents in parallel, each isolated in its own git worktree, behind an automatic test gate: no work is mergeable until the tests are green. Designed and built from zero. See the full spotlight below.",
    label: "Own Product",
    tech: ['Python', 'FastAPI', 'React', 'TypeScript', 'SQLite', 'Electron'],
    period: '2025 - Present',
    highlights: ['Parallel Agents', 'Test Gate', 'One-Window Cockpit'],
    internal: 'haro'
  },
  {
    color: "#060010",
    title: "Acoustic Treats",
    description: "Designed and built the marketing site for Precision HiFi Acoustics, an acoustic-treatment business selling acoustic panels, diffusers, and soundproofing for home theaters, studios, and audiophile rooms. A responsive Next.js site deployed on Vercel.",
    label: "Family Business",
    tech: ['Next.js', 'React', 'Tailwind CSS', 'Vercel'],
    period: '2025',
    highlights: ['Marketing Site', 'Responsive', 'Vercel Deploy'],
    href: 'https://acoustic-treats.vercel.app/'
  }
];
