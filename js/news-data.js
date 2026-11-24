/**
 * The Vanguard Chronicle - News & Magazine Data Store
 * Comprehensive editorial mock dataset with realistic journalism,
 * author profiles, categories, full article content, and market metrics.
 */

const NEWS_DATA = {
  metadata: {
    siteName: "The Vanguard Chronicle",
    tagline: "Independent Journalism, Thoughtful Analysis, Global Perspectives",
    issue: "Vol. CXXVIII · No. 42",
    edition: "Global Edition",
    motto: "Veritas, Claritas, Universitas",
    weather: {
      location: "New York / London",
      temp: "19°C / 66°F",
      condition: "Partly Cloudy",
      icon: "⛅"
    }
  },

  markets: [
    { symbol: "S&P 500", value: "5,864.67", change: "+0.48%", positive: true },
    { symbol: "NASDAQ", value: "18,518.61", change: "+0.73%", positive: true },
    { symbol: "FTSE 100", value: "8,245.22", change: "-0.15%", positive: false },
    { symbol: "NIKKEI", value: "38,981.75", change: "+0.32%", positive: true },
    { symbol: "BTC/USD", value: "$91,420.00", change: "+3.45%", positive: true },
    { symbol: "BRENT CRUDE", value: "$74.28", change: "-0.82%", positive: false }
  ],

  breakingNews: [
    {
      id: "break-1",
      title: "Global Climate Summit reaches historic pact on clean grid transition with $120B fund",
      category: "World",
      time: "8m ago"
    },
    {
      id: "break-2",
      title: "Breakthrough in room-temperature quantum coherence announced by European research consortium",
      category: "Science",
      time: "24m ago"
    },
    {
      id: "break-3",
      title: "Central Banks coordinate liquidity framework as digital currency pilot enters phase two",
      category: "Business",
      time: "41m ago"
    }
  ],

  authors: {
    "elena-rostova": {
      id: "elena-rostova",
      name: "Dr. Elena Rostova",
      role: "Senior Geopolitical Analyst",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80",
      bio: "Dr. Rostova has covered international diplomacy and global energy policy for over fifteen years. Former foreign bureau chief in Geneva and Carnegie Endowment fellow.",
      articlesCount: 42,
      twitter: "@elena_rostova",
      credentials: "PhD in International Relations, LSE"
    },
    "marcus-vance": {
      id: "marcus-vance",
      name: "Marcus Vance",
      role: "Chief Technology Correspondent",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
      bio: "Investigating the intersection of artificial intelligence, silicon architecture, and digital ethics. Previously reported from Silicon Valley, Tokyo, and Taipei.",
      articlesCount: 68,
      twitter: "@vance_tech",
      credentials: "Author of 'The Silicon Horizon'"
    },
    "sophia-chen": {
      id: "sophia-chen",
      name: "Sophia Chen",
      role: "Global Economics & Markets Editor",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80",
      bio: "Specializing in macroeconomics, sovereign debt, and central banking. Regular contributor to international economic symposiums.",
      articlesCount: 54,
      twitter: "@chen_markets",
      credentials: "Former IMF Economic Advisory Panel"
    },
    "julian-mercer": {
      id: "julian-mercer",
      name: "Julian Mercer",
      role: "Culture & Architecture Critic",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
      bio: "Writing on contemporary architecture, urban sociology, and modern aesthetic movements. Winner of the 2023 National Arts Journalism Fellowship.",
      articlesCount: 31,
      twitter: "@mercer_designs",
      credentials: "Master of Architecture, Harvard GSD"
    },
    "amara-kalu": {
      id: "amara-kalu",
      name: "Amara Kalu",
      role: "Science & Biosphere Lead",
      avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=400&q=80",
      bio: "Tracking deep ocean exploration, ecological restoration, and astronomy. Field reporter across five continents.",
      articlesCount: 39,
      twitter: "@amara_science",
      credentials: "National Science Foundation Fellow"
    }
  },

  articles: [
    {
      id: "art-1",
      isHeadline: true,
      featuredHero: true,
      category: "World",
      kicker: "The Great Energy Realignment",
      title: "The Architecture of Tomorrow: How Cross-Border Clean Supergrids Are Redrawing the Global Map",
      deck: "From the North Sea wind corridors to North African solar basins, high-voltage direct current links are creating an interconnected planetary power web, rewriting twentieth-century diplomacy.",
      authorId: "elena-rostova",
      date: "Nov 24, 2026",
      timeAgo: "22m ago",
      readTime: "7 min read",
      audioTime: "11 min audio",
      coverImage: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&w=1600&q=80",
      imageCaption: "Subsea HVDC converter station under construction off the coast of the Dogger Bank.",
      tags: ["Energy", "Diplomacy", "Infrastructure", "Geopolitics"],
      viewsCount: "148.2k",
      content: [
        "In a cavernous control center twenty miles outside Frankfurt, digital displays trace shimmering pulses of high-voltage direct current flowing beneath three territorial seas. On a blustery Tuesday morning, surplus offshore wind generated off the Danish coast is channeled in milliseconds to stabilize the industrial heartlands of northern Italy.",
        "What was once dismissed as an engineering pipe dream—a pan-continental, resilient supergrid capable of buffering renewable intermittency across time zones—is rapidly solidifying into the spine of 21st-century statecraft.",
        "Unlike crude pipelines or liquefied natural gas maritime routes, electrical supergrids operate on fundamental symmetry: nations are simultaneously exporters and importers depending on atmospheric pressure systems and solar azimuths. This architectural shift is transforming traditional diplomatic leverage.",
        "\"The sovereign power of the twentieth century was determined by extraction—who controlled the wells and refineries,\" notes Dr. Elena Rostova. \"The sovereign power of the twenty-first century belongs to interconnection: who controls the software, switching matrices, and long-range corridors.\"",
        "Yet challenges mount rapidly. Massive undersea cable laying requires rare metallurgical alloys, maritime protection against sabotage, and complex harmonic balancing to prevent catastrophic cascade failures. As the international consortium finalizes Phase III, the world is witnessing the most ambitious cooperative engineering project since the construction of the telecommunications undersea backbone."
      ]
    },
    {
      id: "art-2",
      isSecondaryHero: true,
      category: "Technology",
      kicker: "Computing Frontiers",
      title: "Silicon at the Threshold: The Arrival of Neuromorphic Edge Accelerators",
      deck: "Why the next generational leap in synthetic intelligence won't happen inside massive data centers, but in milliwatt-scale synaptic silicon embedded directly into everyday machines.",
      authorId: "marcus-vance",
      date: "Nov 24, 2026",
      timeAgo: "1h ago",
      readTime: "5 min read",
      audioTime: "8 min audio",
      coverImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1000&q=80",
      imageCaption: "Micro-photograph of a 3nm neuromorphic crossbar array exhibiting memristive switching.",
      tags: ["Artificial Intelligence", "Semiconductors", "Hardware"],
      viewsCount: "92.4k",
      content: [
        "For the past four years, artificial intelligence progress was measured in gigawatts, multi-billion-dollar clusters, and thousands of liquid-cooled accelerator racks. However, a quiet rebellion has taken hold across microelectronic research institutes from Zurich to Hsinchu.",
        "Neuromorphic microchips, which mimic the event-driven firing mechanisms of biological neurons rather than processing clock cycles, are operating at less than one-fiftieth the electrical demand of traditional GPUs.",
        "\"We are moving past the brute-force scaling era,\" says Marcus Vance. \"The frontier is moving to tactile edge nodes—sensors capable of reasoning autonomously without tethering back to centralized cloud infrastructure.\""
      ]
    },
    {
      id: "art-3",
      isSecondaryHero: true,
      category: "Business",
      kicker: "Sovereign Capital",
      title: "The Quiet Remaking of Sovereign Wealth Funds in the Age of Strategic Assets",
      deck: "Trillion-dollar state investment funds are abandoning passive index tracking to acquire direct ownership in semiconductor foundries, critical mineral mines, and satellite constellations.",
      authorId: "sophia-chen",
      date: "Nov 24, 2026",
      timeAgo: "2h ago",
      readTime: "6 min read",
      audioTime: "9 min audio",
      coverImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1000&q=80",
      imageCaption: "Financial towers in Singapore's Marina Bay during morning twilight.",
      tags: ["Finance", "Sovereign Funds", "Global Trade"],
      viewsCount: "76.1k",
      content: [
        "For decades, the mandate of sovereign wealth managers was predictable: maintain conservative risk parameters, park capital in long-duration government paper, and collect blue-chip dividends.",
        "Over the last twenty-four months, that conservative orthodoxy was systematically discarded. Sovereign entities controlling upwards of $11 trillion are functioning as geopolitical venture arms.",
        "Sophia Chen analyzes the strategic reallocation: \"Capital allocation is no longer insulated from state security. Every major deployment now considers supply chain resilience, technology ownership, and domestic resource guarantees.\""
      ]
    },
    {
      id: "art-4",
      isFeatured: true,
      category: "Science",
      kicker: "Planetary Biology",
      title: "Unlocking the Abyssal Microbiome: Enzymes That Digest Industrial Polymers",
      deck: "Deep-sea trenches yield unprecedented catalytic organisms capable of breaking down complex polyurethanes in hours without residual toxic microplastics.",
      authorId: "amara-kalu",
      date: "Nov 24, 2026",
      timeAgo: "3h ago",
      readTime: "6 min read",
      audioTime: "10 min audio",
      coverImage: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1000&q=80",
      imageCaption: "Deep submergence expedition off the Kermadec Trench collecting benthic bacterial colonies.",
      tags: ["Biology", "Environment", "Oceanography"],
      viewsCount: "64.8k",
      content: [
        "Six miles beneath the surface of the South Pacific, where pressures exceed a thousand atmospheres and sunlight has never penetrated, life evolves along vastly divergent enzymatic pathways.",
        "A team led by marine biochemists has isolated three bacterial strains that metabolize synthetic polymers as primary carbon substrates. In laboratory tests, the bacterial secretion broke down resilient elastomers in under 36 hours.",
        "\"The ocean has been quietly adapting to human waste streams,\" notes lead researcher Dr. Amara Kalu. \"Now, biotechnology can synthesize these enzymes for closed-loop industrial reclamation at scale.\""
      ]
    },
    {
      id: "art-5",
      isFeatured: true,
      category: "Culture",
      kicker: "Urban Aesthetics",
      title: "The Rebirth of Heavy Timber: How Wood Towers Are Transforming City Skylines",
      deck: "Engineered mass timber is replacing concrete and steel in high-rise construction, cutting carbon footprints while restoring warmth to metropolitan architecture.",
      authorId: "julian-mercer",
      date: "Nov 24, 2026",
      timeAgo: "4h ago",
      readTime: "4 min read",
      audioTime: "6 min audio",
      coverImage: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1000&q=80",
      imageCaption: "Cross-laminated timber atrium of the newly inaugurated Nordic Cultural Forum.",
      tags: ["Architecture", "Design", "Sustainability"],
      viewsCount: "51.3k",
      content: [
        "Walk into the newly completed 28-story Ascentia Tower in Vancouver and the first sensation is olfactory: the subtle, clean scent of Douglas fir and spruce instead of damp curing concrete.",
        "Cross-laminated timber (CLT) is no longer an eccentric novelty for boutique alpine cabins. With precision robotic milling and fire-resistant composite layering, mass timber has matured into the premier sustainable construction medium.",
        "Julian Mercer reflects: \"These structures sequester carbon directly into the city's bones. They remind us that the built environment can exist in harmonic resonance with natural cycles.\""
      ]
    },
    {
      id: "art-6",
      isFeatured: true,
      category: "Opinion",
      kicker: "Editorial Column",
      title: "The Attention Commons: Why We Must Treat Quiet as a Human Right",
      deck: "In an economy predicated on continuous behavioral stimulation, unmonetized solitude is becoming the most endangered luxury of the modern century.",
      authorId: "julian-mercer",
      date: "Nov 23, 2026",
      timeAgo: "6h ago",
      readTime: "5 min read",
      audioTime: "7 min audio",
      coverImage: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?auto=format&fit=crop&w=1000&q=80",
      imageCaption: "A reader enjoying early morning natural light in a minimalist public reading hall.",
      tags: ["Philosophy", "Digital Wellbeing", "Society"],
      viewsCount: "88.9k",
      content: [
        "Every square centimeter of the contemporary visual field has been subjected to auction dynamics. From digital billboards equipped with glance-tracking sensors to algorithmically calculated notification pings, the assault on human cognitive bandwidth is total.",
        "We have long recognized clean air, potable water, and sanitation as non-negotiable civic rights. It is time we recognize cognitive silence as an equivalent public necessity.",
        "Without zones of mental quietude, democratic discourse degenerates into reactive panic, and deep creative contemplation is replaced by twitchy compliance."
      ]
    },
    {
      id: "art-7",
      category: "Technology",
      kicker: "Space Industry",
      title: "Orbital Manufacturing Debuts Its First Commercial Fiber-Optic Line",
      deck: "Zero-gravity manufacturing allows the production of ZBLAN optical cables with signal attenuation rates ten times superior to Earth-spun silica.",
      authorId: "marcus-vance",
      date: "Nov 23, 2026",
      timeAgo: "7h ago",
      readTime: "4 min read",
      audioTime: "6 min audio",
      coverImage: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1000&q=80",
      imageCaption: "Automated microgravity extrusion capsule docked at commercial orbital lab.",
      tags: ["Space", "Telecom", "Innovation"],
      viewsCount: "43.2k",
      content: [
        "In terrestrial gravity, molten glass crystallizes with micro-imperfections that scatter photonic signals over distance. In the microgravity vacuum of low Earth orbit, those imperfections vanish entirely.",
        "The first commercial capsule returning from a private space station carried 200 kilometers of pristine fluoride glass fiber. Early lab tests confirm transatlantic speeds with virtually zero need for signal repeaters."
      ]
    },
    {
      id: "art-8",
      category: "World",
      kicker: "Diplomatic Affairs",
      title: "The New Maritime Corridors: Arctic Transit and Emerging Trade Hubs",
      deck: "Shorter northern polar routes are shifting shipping routes away from historical bottlenecks, propelling Nordic and Alaskan ports into unexpected geopolitical focus.",
      authorId: "elena-rostova",
      date: "Nov 23, 2026",
      timeAgo: "9h ago",
      readTime: "5 min read",
      audioTime: "8 min audio",
      coverImage: "https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=1000&q=80",
      imageCaption: "Icebreaker vessel navigating the newly chartered summer passage route.",
      tags: ["Shipping", "Arctic", "Trade"],
      viewsCount: "37.8k",
      content: [
        "Maritime transit times between Rotterdam and Yokohama have been reduced by twelve full days via the summer polar passage. While shipping conglomerates celebrate reduced fuel consumption, environmental watchdogs caution against the fragile ecological impact of heavy marine engines in pristine polar biomes."
      ]
    },
    {
      id: "art-9",
      category: "Lifestyle",
      kicker: "Gastronomic Heritage",
      title: "The Ancient Grains Revival: How Heritage Emmer and Einkorn Are Saving Agronomy",
      deck: "Drought-resilient ancient wheat varieties offer rich flavors, superior gut tolerance, and deep root networks that prevent topsoil degradation.",
      authorId: "sophia-chen",
      date: "Nov 23, 2026",
      timeAgo: "11h ago",
      readTime: "4 min read",
      audioTime: "5 min audio",
      coverImage: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1000&q=80",
      imageCaption: "Heritage grain harvest at an organic regenerative farm in Tuscany.",
      tags: ["Agriculture", "Food", "Health"],
      viewsCount: "29.4k",
      content: [
        "In the rolling hills of Umbria, agronomists and artisanal bakers are celebrating the resurgence of grains cultivated ten thousand years ago. Unlike monoculture hybrid wheat, heritage varieties possess complex root systems that thrive without synthetic nitrogen fertilizers."
      ]
    },
    {
      id: "art-10",
      category: "Science",
      kicker: "Neuroscience",
      title: "Mapping the Human Brain's Sleep Cleansing Cycle at Synaptic Resolution",
      deck: "High-speed functional MRI reveals how cerebral spinal fluid pulses rhythmically flush metabolic proteins during deep delta-wave sleep states.",
      authorId: "amara-kalu",
      date: "Nov 23, 2026",
      timeAgo: "14h ago",
      readTime: "5 min read",
      audioTime: "7 min audio",
      coverImage: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?auto=format&fit=crop&w=1000&q=80",
      imageCaption: "Neuroimaging scan detailing micro-vascular glymphatic filtration pathways.",
      tags: ["Neuroscience", "Medicine", "Health"],
      viewsCount: "61.0k",
      content: [
        "Every night while consciousness drifts away, an automated biological purification cycle ignites. Known as the glymphatic system, this fluid wave clears tau proteins and amyloid deposits linked to neurodegenerative disorders.",
        "New real-time imaging reveals that consistent sleep architecture plays a far greater preventative health role than previously understood, paving the way for targeted sleep therapies."
      ]
    }
  ],

  trendingRankings: [
    {
      rank: "01",
      id: "art-1",
      title: "The Architecture of Tomorrow: How Cross-Border Clean Supergrids Are Redrawing the Global Map",
      category: "World",
      views: "148.2k reads",
      readTime: "7m read"
    },
    {
      rank: "02",
      id: "art-2",
      title: "Silicon at the Threshold: The Arrival of Neuromorphic Edge Accelerators",
      category: "Technology",
      views: "92.4k reads",
      readTime: "5m read"
    },
    {
      rank: "03",
      id: "art-6",
      title: "The Attention Commons: Why We Must Treat Quiet as a Human Right",
      category: "Opinion",
      views: "88.9k reads",
      readTime: "5m read"
    },
    {
      rank: "04",
      id: "art-3",
      title: "The Quiet Remaking of Sovereign Wealth Funds in the Age of Strategic Assets",
      category: "Business",
      views: "76.1k reads",
      readTime: "6m read"
    },
    {
      rank: "05",
      id: "art-4",
      title: "Unlocking the Abyssal Microbiome: Enzymes That Digest Industrial Polymers",
      category: "Science",
      views: "64.8k reads",
      readTime: "6m read"
    }
  ],

  categories: [
    { id: "all", name: "All Stories", icon: "newspaper" },
    { id: "World", name: "World", icon: "globe" },
    { id: "Technology", name: "Technology", icon: "cpu" },
    { id: "Business", name: "Business", icon: "trending-up" },
    { id: "Culture", name: "Culture", icon: "palette" },
    { id: "Science", name: "Science", icon: "atom" },
    { id: "Opinion", name: "Opinion", icon: "message-square" },
    { id: "Lifestyle", name: "Lifestyle", icon: "compass" }
  ],

  popularTags: [
    "Artificial Intelligence",
    "Clean Energy",
    "Global Trade",
    "Semiconductors",
    "Architecture",
    "Oceanography",
    "Neuroscience",
    "Geopolitics",
    "Heritage Grains",
    "Sovereign Wealth"
  ]
};

// Export to window for browser access
if (typeof window !== "undefined") {
  window.NEWS_DATA = NEWS_DATA;
}
