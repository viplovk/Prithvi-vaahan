import React, { useState } from 'react';
import { Flame, Droplets, AlertTriangle, ArrowRight, Truck, Sun, Building2, CloudRain } from 'lucide-react';
import { CORE_PROBLEM } from '../data/projectData';

export default function TwinCrisis() {
  const [activeTab, setActiveTab] = useState<'both' | 'heat' | 'flood'>('both');
  const [asphaltCoverage, setAsphaltCoverage] = useState(75); // percent

  // Calculated effects based on simulated urbanization
  const simulatedSurfaceTemp = (36 + (asphaltCoverage / 100) * 16).toFixed(1);
  const simulatedRunoffPercent = Math.min(92, Math.round(15 + (asphaltCoverage / 100) * 75));
  const estimatedTankerDays = Math.round(45 + (asphaltCoverage / 100) * 110);

  return (
    <section id="twin-crisis" className="py-20 bg-[#16201B] text-stone-100 border-b border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header with Rubric Alignment */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-semibold bg-red-950/60 text-red-400 border border-red-800/60 mb-3">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>1. The Core Problem — Real-Life Relevance (20%)</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            {CORE_PROBLEM.title}
          </h2>
          <p className="mt-4 text-base text-stone-300 leading-relaxed">
            {CORE_PROBLEM.subtitle}
          </p>

          {/* Interactive Mode Filter Tabs */}
          <div className="mt-6 inline-flex p-1 rounded-xl bg-stone-900 border border-stone-800 text-xs">
            <button
              onClick={() => setActiveTab('both')}
              className={`px-4 py-1.5 rounded-lg font-medium transition-all ${
                activeTab === 'both'
                  ? 'bg-[#C85A32] text-white shadow-sm'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              Side-by-Side Comparison
            </button>
            <button
              onClick={() => setActiveTab('heat')}
              className={`px-4 py-1.5 rounded-lg font-medium transition-all ${
                activeTab === 'heat'
                  ? 'bg-amber-700 text-white shadow-sm'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              Crisis A: Heat Island (UHI)
            </button>
            <button
              onClick={() => setActiveTab('flood')}
              className={`px-4 py-1.5 rounded-lg font-medium transition-all ${
                activeTab === 'flood'
                  ? 'bg-sky-700 text-white shadow-sm'
                  : 'text-stone-400 hover:text-white'
              }`}
            >
              Crisis B: Flood-to-Drought
            </button>
          </div>
        </div>

        {/* Side-by-Side Comparative Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          
          {/* Card A: The Urban Heat Island (UHI) Reality */}
          {(activeTab === 'both' || activeTab === 'heat') && (
            <div className="relative rounded-2xl bg-gradient-to-br from-[#241A18] via-[#1E1715] to-[#171413] border border-red-900/40 p-6 sm:p-8 flex flex-col justify-between shadow-xl">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-red-900/30">
                  <div className="flex items-center space-x-3">
                    <div className="p-2.5 rounded-xl bg-red-950/80 text-red-400 border border-red-800/40">
                      <Flame className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-xs uppercase font-mono tracking-widest text-red-400 font-bold">
                        Card A • Thermal Crisis
                      </span>
                      <h3 className="text-xl sm:text-2xl font-bold text-white mt-0.5">
                        {CORE_PROBLEM.urbanHeatIsland.title}
                      </h3>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl sm:text-3xl font-black text-red-400 font-mono">
                      42°–46°C
                    </span>
                    <span className="block text-[10px] text-stone-400 uppercase tracking-wide">
                      Ambient Outdoor Air
                    </span>
                  </div>
                </div>

                <p className="mt-5 text-sm text-stone-300 leading-relaxed">
                  {CORE_PROBLEM.urbanHeatIsland.description}
                </p>

                {/* Micro Metrics */}
                <div className="mt-6 grid grid-cols-3 gap-2.5">
                  {CORE_PROBLEM.urbanHeatIsland.metrics.map((m, idx) => (
                    <div key={idx} className="bg-black/30 rounded-xl p-3 border border-red-900/20">
                      <span className="block text-[10px] text-stone-400 uppercase tracking-tight">
                        {m.label}
                      </span>
                      <span className="block text-sm font-bold text-red-300 mt-1">
                        {m.value}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Heat Trapping Anatomy */}
                <div className="mt-6 rounded-xl bg-red-950/30 border border-red-900/30 p-4">
                  <span className="text-xs font-semibold text-red-300 flex items-center mb-1">
                    <Sun className="w-3.5 h-3.5 mr-1.5 text-amber-400" />
                    The Feedback Loop in Apartment Belts
                  </span>
                  <p className="text-xs text-stone-400 leading-normal">
                    Solar radiation is absorbed by dark asphalt roads & dense concrete towers during midday. At night, thousands of split-AC condensing units exhaust additional heat outdoors, preventing night-time radiation cooling.
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-red-900/30 text-xs text-red-200/90 font-medium">
                ⚠️ Consequence: Public community spaces become ghost towns; senior citizens and children remain quarantined in artificially cooled rooms.
              </div>
            </div>
          )}

          {/* Card B: The Flood-to-Drought Paradox */}
          {(activeTab === 'both' || activeTab === 'flood') && (
            <div className="relative rounded-2xl bg-gradient-to-br from-[#172224] via-[#141E20] to-[#12191B] border border-sky-900/40 p-6 sm:p-8 flex flex-col justify-between shadow-xl">
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-sky-900/30">
                  <div className="flex items-center space-x-3">
                    <div className="p-2.5 rounded-xl bg-sky-950/80 text-sky-400 border border-sky-800/40">
                      <Droplets className="w-6 h-6" />
                    </div>
                    <div>
                      <span className="text-xs uppercase font-mono tracking-widest text-sky-400 font-bold">
                        Card B • Hydrological Crisis
                      </span>
                      <h3 className="text-xl sm:text-2xl font-bold text-white mt-0.5">
                        {CORE_PROBLEM.floodToDrought.title}
                      </h3>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl sm:text-3xl font-black text-sky-400 font-mono">
                      80% Lost
                    </span>
                    <span className="block text-[10px] text-stone-400 uppercase tracking-wide">
                      Urban Stormwater Runoff
                    </span>
                  </div>
                </div>

                <p className="mt-5 text-sm text-stone-300 leading-relaxed">
                  {CORE_PROBLEM.floodToDrought.description}
                </p>

                {/* Micro Metrics */}
                <div className="mt-6 grid grid-cols-3 gap-2.5">
                  {CORE_PROBLEM.floodToDrought.metrics.map((m, idx) => (
                    <div key={idx} className="bg-black/30 rounded-xl p-3 border border-sky-900/20">
                      <span className="block text-[10px] text-stone-400 uppercase tracking-tight">
                        {m.label}
                      </span>
                      <span className="block text-sm font-bold text-sky-300 mt-1">
                        {m.value}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Water Irony Breakdown */}
                <div className="mt-6 rounded-xl bg-sky-950/30 border border-sky-900/30 p-4">
                  <span className="text-xs font-semibold text-sky-300 flex items-center mb-1">
                    <CloudRain className="w-3.5 h-3.5 mr-1.5 text-sky-400" />
                    The Monsoon-to-Tanker Paradox
                  </span>
                  <p className="text-xs text-stone-400 leading-normal">
                    During July–August, roads submerge and basements flood because impervious pavement blocks natural infiltration. By October, the same society pays ₹2,000 per tanker to extract groundwater from dying rural fringes.
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-sky-900/30 text-xs text-sky-200/90 font-medium">
                ⚠️ Structural Failure: Standalone small recharge pits silt up within 2 seasons, lacking the deep sedimentation volume to capture intense cloudbursts.
              </div>
            </div>
          )}

        </div>

        {/* Interactive Urban Belt Imperviousness Simulator Widget */}
        <div className="mt-12 rounded-2xl bg-stone-900/90 border border-stone-800 p-6 sm:p-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-stone-800">
            <div>
              <span className="text-xs uppercase font-mono tracking-wider text-[#E07A5F] font-semibold">
                Interactive Telemetry Model
              </span>
              <h4 className="text-lg font-bold text-white mt-1">
                Simulate Hard Concrete Coverage vs. Crisis Severity
              </h4>
              <p className="text-xs text-stone-400 mt-0.5">
                Drag the slider to observe how unmitigated concrete pavement accelerates both surface heat and stormwater runoff.
              </p>
            </div>

            <div className="bg-stone-800/80 px-4 py-2 rounded-xl border border-stone-700 flex items-center space-x-3">
              <span className="text-xs text-stone-300 font-medium">Impervious Concrete Ratio:</span>
              <span className="text-lg font-mono font-bold text-[#E07A5F]">{asphaltCoverage}%</span>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            <input
              type="range"
              min="20"
              max="95"
              step="5"
              value={asphaltCoverage}
              onChange={(e) => setAsphaltCoverage(Number(e.target.value))}
              className="w-full h-2 bg-stone-700 rounded-lg appearance-none cursor-pointer accent-[#C85A32]"
            />
            <div className="flex justify-between text-[11px] text-stone-400 font-mono">
              <span>20% (Traditional Stepwell Village)</span>
              <span>60% (Planned Suburban Layout)</span>
              <span className="text-red-400 font-bold">95% (Dense Concrete Apartment Belt)</span>
            </div>
          </div>

          {/* Dynamic Results Ticker */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-black/40 border border-stone-800 flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-red-950/60 text-red-400">
                <Sun className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] text-stone-400 uppercase tracking-wider block">Peak Asphalt Heat</span>
                <span className="text-xl font-bold font-mono text-red-400">{simulatedSurfaceTemp}°C</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-black/40 border border-stone-800 flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-sky-950/60 text-sky-400">
                <CloudRain className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] text-stone-400 uppercase tracking-wider block">Stormwater Lost to Runoff</span>
                <span className="text-xl font-bold font-mono text-sky-400">{simulatedRunoffPercent}%</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-black/40 border border-stone-800 flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-amber-950/60 text-amber-400">
                <Truck className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] text-stone-400 uppercase tracking-wider block">Private Tanker Dependency</span>
                <span className="text-xl font-bold font-mono text-amber-400">~{estimatedTankerDays} Days/Yr</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
