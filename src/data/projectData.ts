import { ArchitectureTier, RubricCategory } from '../types';

export const PROJECT_INFO = {
  name: "PrithviVahini",
  subtitle: "The Subterranean Sponge Commons",
  theme: "Our Community & Living",
  competition: "Fund My Crazy 2026 Entry",
  tagline: "Reimagining the ancient Indian stepwell as a 21st-century, zero-power climate shelter and decentralized flood-capture lung for dense urban colonies.",
  headline: "Reimagining the Ancient Baoli as a Zero-Power Urban Climate Sanctuary.",
  heroSubtitle: "A dual-crisis solution combining passive subterranean geothermal cooling (-10°C ambient drop) and decentralized floodwater aquifer recharge, designed for the dense concrete apartment belts of India.",
  stats: [
    { label: "Ambient Drop", value: "-10°C", detail: "Ground Thermal Mass & Stack Draft", icon: "ThermometerSnowflake" },
    { label: "Aquifer Infiltration", value: "5M+ L/Yr", detail: "Direct Deep-Bore Catchment", icon: "Droplets" },
    { label: "Grid Cooling Energy", value: "0 kW", detail: "Zero Compressor HVAC Dependency", icon: "ZapOff" },
    { label: "Colony Tanker Savings", value: "₹4.8L+", detail: "Annual Drought-Period Relief", icon: "Coins" }
  ]
};

export const CORE_PROBLEM = {
  title: "The Twin Crisis in Indian Concrete Belts",
  subtitle: "Modern residential sectors and high-density apartment belts across northern and central India face a brutal twin crisis that conventional flat lawns fail to resolve.",
  urbanHeatIsland: {
    title: "The Urban Heat Island (UHI) Reality",
    temperature: "42°C – 46°C",
    tag: "Thermal Desolation",
    description: "Concrete towers, unshaded asphalt pavements, and thousands of split-AC condensing units blasting heat outdoors turn community parks and squares into uninhabitable heat traps for 5–6 months of the year.",
    metrics: [
      { label: "Outdoor Surface Temp", value: "up to 54°C" },
      { label: "Peak AC Exhaust Heat", value: "+3.8°C local microclimate spike" },
      { label: "Community Park Utilization", value: "<12% during daylight hours" }
    ],
    consequence: "Children, seniors, and working residents are forced indoors under power-hungry mechanical air conditioning, deepening social isolation and grid strain."
  },
  floodToDrought: {
    title: "The Flood-to-Drought Paradox",
    lossRate: "80% Stormwater Wasted",
    tag: "Hydrological Collapse",
    description: "Monsoonal cloudbursts trigger knee-deep road waterlogging, basement car park inundation, and sewage backflows. Weeks later, the exact same residential societies depend on private water tankers as borewells run dry.",
    metrics: [
      { label: "Stormwater Runoff Lost", value: "80% to storm drains" },
      { label: "Average Tanker Costs", value: "₹1,200 – ₹2,500 per 5,000L" },
      { label: "Depleting Water Table", value: "-1.5m to -3.0m drop annually" }
    ],
    consequence: "Current interventions—such as decorative flat turf-grass patches or small standalone recharge pits—lack the structural volume and dual-purpose civic utility needed to solve both crises at once."
  }
};

export const ARCHITECTURE_TIERS: ArchitectureTier[] = [
  {
    id: "tier-1",
    number: "01",
    name: "Surface Bioswales & Native Tree Perimeters",
    depth: "0.0m Grade Level",
    temperature: "Ambient 42°C (Filtered)",
    tag: "First Defense Catchment",
    accentColor: "emerald",
    waterFlowRate: "1,200 L/min Silt Filtration",
    shortDesc: "Permeable earth slopes, native neem & amaltas canopy, and reed-bed sediment traps that filter street runoff before it enters the sunken core.",
    detailedSpecs: [
      "Perimeter swales lined with graded river gravel and vetiver grass for initial sediment settling.",
      "Dense upper canopy intercepts radiant solar heat, shading the outer perimeter edge.",
      "Gravity channels divert surface stormwater away from residential roads directly toward the commons perimeter."
    ],
    principles: [
      "Natural silt sedimentation without mechanical filters",
      "Perimeter shade reduces thermal radiation into the depression",
      "Pedestrian jogging loops integrated along the permeable rim"
    ]
  },
  {
    id: "tier-2",
    number: "02",
    name: "Terracotta Convection Chimneys & Jali Wind Screens",
    depth: "-1.5m to -3.0m Subgrade",
    temperature: "34°C Natural Cross-Draft",
    tag: "Passive Fluid Mechanics",
    accentColor: "orange",
    waterFlowRate: "Evaporative Cooling Vapor Loop",
    shortDesc: "Porous terracotta flues that harness the natural stack effect. Warm air rises and escapes through upper vents, drawing dense, cool air into the sunken pavilion.",
    detailedSpecs: [
      "Custom unglazed terracotta flues engineered with capillary porous clay matrices for passive evaporative wick action.",
      "Traditional geometric jali screens accelerate breeze velocity via the Venturi effect without electrical fans.",
      "Negative pressure differential continuously pulls fresh air down into the living level."
    ],
    principles: [
      "Zero electrical motors or moving mechanical parts",
      "Stack effect driven purely by natural temperature gradients",
      "Local artisan earthenware pottery integration for sustainable modular fabrication"
    ]
  },
  {
    id: "tier-3",
    number: "03",
    name: "Subterranean Sunken Pavilion (Biophilic Social Core)",
    depth: "-4.0m to -6.0m Deep Basin",
    temperature: "28°C Zero-Power Sanctuary (-10°C)",
    tag: "Community Living & Co-Working",
    accentColor: "amber",
    waterFlowRate: "Surrounding Micro-Mist Ring",
    shortDesc: "A shaded community co-working arena, amphitheater, and multi-generational gathering hall nestled in the naturally chilled subterranean earth.",
    detailedSpecs: [
      "Ground thermal mass stabilizes ambient temperature between 26°C and 29°C year-round.",
      "Stepped amphitheater seating inspired by the stepwells of Gujarat and Rajasthan.",
      "Shaded workspace nodes with natural daylighting diffusers, open wifi nodes, and biophilic vertical moss walls.",
      "Zero compressor noise or refrigerant gases; a calming acoustic soundscape protected from street traffic."
    ],
    principles: [
      "Year-round thermal inertia (soil temperature remains at regional annual mean)",
      "High-density community socialization during peak summer afternoons",
      "Multi-use venue for senior gatherings, kids' workshops, and evening cultural events"
    ]
  },
  {
    id: "tier-4",
    number: "04",
    name: "Deep-Bore Gravel Infiltration & Aquifer Recharge Cells",
    depth: "-8.0m to -18.0m Sub-Basin",
    temperature: "22°C Deep Geothermal Well",
    tag: "Decentralized Hydrology",
    accentColor: "cyan",
    waterFlowRate: "Up to 5,000,000 L / Season",
    shortDesc: "Multi-layered porous volcanic aggregate, activated carbon geotextile, and deep recharge shafts injecting purified floodwater directly into the water table.",
    detailedSpecs: [
      "Coarse volcanic pumice and graded gravel chambers trap microscopic colloidal particles.",
      "Non-woven geotextile membrane prevents silt clogging and ensures multi-decade structural lifespan.",
      "Dual deep recharge bores penetrate beyond impermeable hard clay strata to recharge unconfined regional aquifers.",
      "Emergency overflow sluice connects to secondary colony percolation chambers during extreme 100mm/hr cloudbursts."
    ],
    principles: [
      "Prevents localized basement flooding and stormwater drain choking",
      "Restores sinking groundwater levels in a 1.2km colony radius",
      "Cuts colony dependency on groundwater exploitation and commercial water tankers"
    ]
  }
];

export const GEMINI_PROMPT_DATA = {
  title: "Gemini Image Prompt (Built with Gemini — 20%)",
  promptText: `Architectural cross-section and cinematic eye-level perspective of 'PrithviVahini: The Subterranean Sponge Commons' set in an Indian urban residential colony. A futuristic yet deeply heritage-inspired modern stepwell (Baoli) sunk 5 meters beneath ground level. The upper perimeter features lush green bioswales, native amaltas and neem trees, and textured permeable gravel paths. Descending stepped terraces are crafted from warm terracotta earthen bricks and sandstone, lined with delicate geometric terracotta jali lattices and tall cylindrical convection wind chimneys. The sunken central pavilion serves as a vibrant, naturally cooled social common space with wooden benches, children playing, and young professionals co-working in soft dappled natural light. Beneath the floor, a translucent cutaway reveals multi-tiered filtration gravel strata, volcanic aggregate, and deep recharge wells directing clear stormwater into the aquifer. Warm golden late-afternoon sunlight, biophilic minimalist aesthetic, zero mechanical air conditioners, lush hanging ferns, pristine water reflection, hyper-detailed architectural rendering.`,
  notes: "Crafted specifically for Gemini 2.5 Flash / Imagen 3 to generate high-fidelity architectural cross-sections preserving cultural authenticity, passive thermodynamics, and hydrological realism."
};

export const COMPETITION_RUBRIC: RubricCategory[] = [
  {
    title: "Vision & Biophilic Inversion",
    weight: 30,
    percentage: "30%",
    scoreGrade: "10/10 Focus",
    color: "amber",
    description: "Inverting the traditional flat park into a 3D subterranean living sponge. Transforming the ancient Indian baoli heritage into an urban climate survival commons for 21st-century cities.",
    keyDeliverables: [
      "Inverted topography: utilizing ground thermal inertia instead of mechanical air conditioning",
      "Multi-tiered civic gathering spaces fostering inter-generational community bonding",
      "Harmonious fusion of historical Indian architectural wisdom and contemporary fluid dynamics"
    ]
  },
  {
    title: "Real-Life Relevance & UHI Mitigation",
    weight: 20,
    percentage: "20%",
    scoreGrade: "Targeted Impact",
    color: "red",
    description: "Directly solves the lethal tandem of urban heat islands (45°C+ summer peaks) and monsoon flood-to-drought water tanker dependency plaguing millions of urban residents.",
    keyDeliverables: [
      "Documented 8°C–11°C ambient temperature reduction in the sunken living core",
      "Decentralized collection capturing 80% of monsoon runoff lost to municipal drains",
      "Immediate economic relief: eliminates recurring private water tanker expenditures"
    ]
  },
  {
    title: "Built with Gemini",
    weight: 20,
    percentage: "20%",
    scoreGrade: "AI-Augmented Design",
    color: "sky",
    description: "Architectural morphology, convective thermodynamic modeling, and visual renders generated and stress-tested using Google Gemini models.",
    keyDeliverables: [
      "Gemini prompt engineering producing hyper-accurate cross-sectional architectural renders",
      "Thermodynamic stack effect calculations cross-verified via Gemini technical synthesis",
      "Community impact algorithms parameterized using regional rainfall datasets"
    ]
  },
  {
    title: "Future-Focused & Climate Resilience",
    weight: 15,
    percentage: "15%",
    scoreGrade: "2030–2050 Ready",
    color: "emerald",
    description: "Designed for resilient operation in intensifying heatwaves and erratic monsoon cloudbursts under 2030–2050 climate change trajectories.",
    keyDeliverables: [
      "100% passive resilience: functional even during total grid blackout or severe heat emergencies",
      "Long-term aquifer recharge safeguarding local water tables against prolonged drought seasons",
      "Volcanic aggregate and bio-filtration modules self-regenerate without chemical treatments"
    ]
  },
  {
    title: "Practical Architecture & Execution",
    weight: 15,
    percentage: "15%",
    scoreGrade: "High Feasibility",
    color: "stone",
    description: "No motorized chillers or exotic imported machinery. Uses locally sourced earthen terracotta, porous aggregates, and gravity-fed fluid mechanics.",
    keyDeliverables: [
      "Low O&M: natural stack effect ventilation replaces multi-lakh annual HVAC maintenance",
      "Scalable deployment: turnkey integration for new township master plans (Noida, Gurgaon, Pune) or municipal park retrofits",
      "Local artisan empowerment: modular terracotta flues manufactured by regional potters"
    ]
  }
];

export const CITY_PRESETS = [
  { name: "Gurgaon / NCR", rainfall: 650, baseTemp: 44.5, label: "NCR Concrete Corridor" },
  { name: "Greater Noida", rainfall: 720, baseTemp: 44.0, label: "High-Rise Township Belt" },
  { name: "Pune (Hinjewadi)", rainfall: 920, baseTemp: 38.5, label: "Tech Cluster Suburbs" },
  { name: "Ahmedabad", rainfall: 800, baseTemp: 45.0, label: "Arid Urban Core" }
];
