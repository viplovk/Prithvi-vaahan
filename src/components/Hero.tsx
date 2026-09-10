import React from 'react';
import { ArrowRight, Droplets, Thermometer, Wind, ZapOff, ShieldCheck, Compass, Sparkles, Box } from 'lucide-react';
import { PROJECT_INFO } from '../data/projectData';

interface HeroProps {
  onExplore: () => void;
  onSimulation: () => void;
}

export default function Hero({ onExplore, onSimulation }: HeroProps) {
  return (
    <section id="hero-section" className="relative overflow-hidden bg-gradient-to-b from-[#121915] via-[#16211C] to-[#141C18] text-stone-100 py-16 sm:py-24 border-b border-stone-800">
      
      {/* Subtle Biophilic Geometry Background Grid */}
      <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(#E07A5F_1px,transparent_1px)] [background-size:24px_24px]" />
      
      {/* Atmospheric glow blobs */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-[#C85A32]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-[#0284C7]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Tagline & Category Strip */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-6">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-[#C85A32]/20 text-[#E07A5F] border border-[#C85A32]/40 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 mr-1.5" />
            Theme: {PROJECT_INFO.theme}
          </span>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-emerald-950/70 text-emerald-400 border border-emerald-800/60 backdrop-blur-md">
            Biomimetic Subterranean Urbanism
          </span>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-sky-950/70 text-sky-400 border border-sky-800/60 backdrop-blur-md">
            Decentralized Aquifer Recharge
          </span>
        </div>

        {/* Main Headline */}
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight sm:leading-none">
            Reimagining the Ancient Baoli as a{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E07A5F] via-[#F4A261] to-[#38BDF8]">
              Zero-Power Urban Climate Sanctuary
            </span>
          </h1>

          <p className="mt-6 text-base sm:text-xl text-stone-300 max-w-3xl mx-auto font-normal leading-relaxed">
            {PROJECT_INFO.heroSubtitle}
          </p>

          <p className="mt-3 text-xs sm:text-sm text-stone-400 italic max-w-2xl mx-auto font-light">
            "{PROJECT_INFO.tagline}"
          </p>

          {/* Dual Call-to-Actions */}
          <div className="mt-9 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <button
              onClick={onExplore}
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-3.5 rounded-xl bg-[#C85A32] hover:bg-[#B34728] text-white font-semibold text-sm shadow-xl shadow-[#C85A32]/30 transition-all hover:translate-y-[-1px] cursor-pointer"
            >
              <span>Explore the Commons</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href="#3d-map"
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-3.5 rounded-xl bg-[#1B2721] hover:bg-[#23322b] text-stone-100 border border-[#C85A32]/40 font-semibold text-sm transition-all hover:border-[#E07A5F] hover:translate-y-[-1px] cursor-pointer shadow-md"
            >
              <Box className="w-4 h-4 text-[#E07A5F]" />
              <span>3D Model Map</span>
            </a>

            <button
              onClick={onSimulation}
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-3.5 rounded-xl bg-stone-800/80 hover:bg-stone-800 text-stone-200 border border-stone-700 font-semibold text-sm transition-all hover:border-[#38BDF8]/50 hover:translate-y-[-1px] cursor-pointer shadow-md"
            >
              <Droplets className="w-4 h-4 text-[#38BDF8]" />
              <span>View Simulation</span>
            </button>
          </div>
        </div>

        {/* Key Stat Badges Grid */}
        <div className="mt-14 max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Stat 1: 10°C Ambient Drop */}
          <div className="relative group rounded-2xl bg-[#1C2621]/90 border border-stone-800 p-5 shadow-lg hover:border-[#E07A5F]/50 transition-all">
            <div className="flex items-center justify-between mb-2">
              <div className="p-2 rounded-xl bg-[#C85A32]/20 text-[#E07A5F]">
                <Thermometer className="w-5 h-5" />
              </div>
              <span className="text-[10px] uppercase font-mono tracking-wider text-emerald-400 bg-emerald-950/50 px-2 py-0.5 rounded-md border border-emerald-800/50">
                Passive Geo-Cooling
              </span>
            </div>
            <div className="text-3xl font-extrabold text-white tracking-tight">
              -10°C Drop
            </div>
            <p className="text-xs text-stone-300 font-medium mt-1">Ambient Temperature</p>
            <p className="text-[11px] text-stone-400 mt-1 leading-snug">
              Ground thermal inertia cools the sunken court from 45°C down to 28°C–34°C.
            </p>
          </div>

          {/* Stat 2: 5M Liters/Year Infiltration */}
          <div className="relative group rounded-2xl bg-[#1C2621]/90 border border-stone-800 p-5 shadow-lg hover:border-[#38BDF8]/50 transition-all">
            <div className="flex items-center justify-between mb-2">
              <div className="p-2 rounded-xl bg-sky-900/30 text-[#38BDF8]">
                <Droplets className="w-5 h-5" />
              </div>
              <span className="text-[10px] uppercase font-mono tracking-wider text-sky-400 bg-sky-950/50 px-2 py-0.5 rounded-md border border-sky-800/50">
                Sub-Basin Well
              </span>
            </div>
            <div className="text-3xl font-extrabold text-white tracking-tight">
              5M+ L/Year
            </div>
            <p className="text-xs text-stone-300 font-medium mt-1">Aquifer Infiltration</p>
            <p className="text-[11px] text-stone-400 mt-1 leading-snug">
              Gravity-fed deep-bore injection recharges dry water tables during cloudbursts.
            </p>
          </div>

          {/* Stat 3: 0 kW Grid Cooling */}
          <div className="relative group rounded-2xl bg-[#1C2621]/90 border border-stone-800 p-5 shadow-lg hover:border-emerald-500/50 transition-all">
            <div className="flex items-center justify-between mb-2">
              <div className="p-2 rounded-xl bg-emerald-950/60 text-emerald-400">
                <ZapOff className="w-5 h-5" />
              </div>
              <span className="text-[10px] uppercase font-mono tracking-wider text-emerald-400 bg-emerald-950/50 px-2 py-0.5 rounded-md border border-emerald-800/50">
                Stack Fluid Draft
              </span>
            </div>
            <div className="text-3xl font-extrabold text-white tracking-tight">
              0 kW Grid
            </div>
            <p className="text-xs text-stone-300 font-medium mt-1">HVAC Compressor Power</p>
            <p className="text-[11px] text-stone-400 mt-1 leading-snug">
              Terracotta convection flues create natural negative pressure airflow loops.
            </p>
          </div>

          {/* Stat 4: Community Living Shield */}
          <div className="relative group rounded-2xl bg-[#1C2621]/90 border border-stone-800 p-5 shadow-lg hover:border-amber-500/50 transition-all">
            <div className="flex items-center justify-between mb-2">
              <div className="p-2 rounded-xl bg-amber-950/60 text-[#F4A261]">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <span className="text-[10px] uppercase font-mono tracking-wider text-amber-300 bg-amber-950/50 px-2 py-0.5 rounded-md border border-amber-800/50">
                Civic Resilience
              </span>
            </div>
            <div className="text-3xl font-extrabold text-white tracking-tight">
              100% Passive
            </div>
            <p className="text-xs text-stone-300 font-medium mt-1">Climate Survival Refuge</p>
            <p className="text-[11px] text-stone-400 mt-1 leading-snug">
              Functional shelter during city-wide power outages & peak summer heat emergencies.
            </p>
          </div>

        </div>

        {/* Live Microclimate Cross-Section Ticker Bar */}
        <div className="mt-8 max-w-3xl mx-auto rounded-xl bg-stone-900/90 border border-stone-800 p-3.5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
            <span className="text-stone-300 font-mono">Surface Street (Grade 0m):</span>
            <span className="font-bold text-red-400">44.8°C Radiant Concrete</span>
          </div>
          <div className="text-stone-500 font-mono hidden sm:inline">➔ Convective Drop ➔</div>
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-stone-300 font-mono">PrithviVahini Core (-5m):</span>
            <span className="font-bold text-emerald-400">28.2°C Earth Thermal Mass</span>
          </div>
        </div>

      </div>
    </section>
  );
}
