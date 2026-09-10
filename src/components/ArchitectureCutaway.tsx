import React, { useState } from 'react';
import { Layers, Wind, Droplets, ArrowDown, ShieldCheck, CheckCircle2, ChevronRight, Trees, Compass, Thermometer } from 'lucide-react';
import { ARCHITECTURE_TIERS } from '../data/projectData';

export default function ArchitectureCutaway() {
  const [selectedTierId, setSelectedTierId] = useState<string>('tier-3');
  const [viewTab, setViewTab] = useState<'cutaway' | 'thermodynamics' | 'scalability'>('cutaway');

  const activeTier = ARCHITECTURE_TIERS.find((t) => t.id === selectedTierId) || ARCHITECTURE_TIERS[2];

  return (
    <section id="architecture" className="py-20 bg-[#121915] text-stone-100 border-b border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading & Competition Context */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-semibold bg-[#C85A32]/20 text-[#E07A5F] border border-[#C85A32]/40 mb-3">
            <Layers className="w-3.5 h-3.5" />
            <span>2. The Visionary Concept (Vision 30% & Future-Focused 15%)</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            The PrithviVahini 4-Tier Subterranean Cutaway
          </h2>
          <p className="mt-4 text-base text-stone-300 leading-relaxed">
            Inverting urban park design into a biomimetic multi-tiered step-ecosystem. Harnessing ancient Baoli spatial geometry, ground thermal mass, and passive stack convective mechanics.
          </p>

          {/* Sub-Navigation Tabs */}
          <div className="mt-6 inline-flex p-1 rounded-xl bg-stone-900 border border-stone-800 text-xs">
            <button
              onClick={() => setViewTab('cutaway')}
              className={`px-4 py-1.5 rounded-lg font-medium transition-all ${
                viewTab === 'cutaway' ? 'bg-[#C85A32] text-white shadow-sm' : 'text-stone-400 hover:text-white'
              }`}
            >
              Interactive 4-Tier Cutaway
            </button>
            <button
              onClick={() => setViewTab('thermodynamics')}
              className={`px-4 py-1.5 rounded-lg font-medium transition-all ${
                viewTab === 'thermodynamics' ? 'bg-[#C85A32] text-white shadow-sm' : 'text-stone-400 hover:text-white'
              }`}
            >
              Passive Convection & Fluid Stack
            </button>
            <button
              onClick={() => setViewTab('scalability')}
              className={`px-4 py-1.5 rounded-lg font-medium transition-all ${
                viewTab === 'scalability' ? 'bg-[#C85A32] text-white shadow-sm' : 'text-stone-400 hover:text-white'
              }`}
            >
              Execution & Scalability (15%)
            </button>
          </div>
        </div>

        {/* View Tab 1: Interactive 4-Tier Cutaway */}
        {viewTab === 'cutaway' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Interactive Visual Cross-Section Map */}
            <div className="lg:col-span-5 space-y-3">
              <span className="text-xs uppercase font-mono tracking-wider text-stone-400 block mb-2 font-semibold">
                Click a Depth Stratum to Inspect
              </span>

              {ARCHITECTURE_TIERS.map((tier) => {
                const isSelected = tier.id === selectedTierId;
                return (
                  <button
                    key={tier.id}
                    onClick={() => setSelectedTierId(tier.id)}
                    className={`w-full text-left p-4 rounded-2xl border transition-all cursor-pointer relative overflow-hidden group ${
                      isSelected
                        ? 'bg-gradient-to-r from-[#1E2923] to-[#17201C] border-[#C85A32] shadow-lg shadow-[#C85A32]/10 ring-1 ring-[#C85A32]/30'
                        : 'bg-stone-900/60 border-stone-800 hover:bg-stone-800/60 hover:border-stone-700'
                    }`}
                  >
                    {/* Active Accent Bar */}
                    {isSelected && (
                      <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-[#C85A32]" />
                    )}

                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <span className={`font-mono text-sm font-bold ${isSelected ? 'text-[#E07A5F]' : 'text-stone-500'}`}>
                          {tier.number}
                        </span>
                        <div>
                          <h4 className="text-sm font-bold text-white group-hover:text-[#E07A5F] transition-colors">
                            {tier.name}
                          </h4>
                          <span className="text-[11px] font-mono text-stone-400 block mt-0.5">
                            Depth: {tier.depth} • {tier.tag}
                          </span>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
                          tier.id === 'tier-3' ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-800/50' : 'text-stone-300 bg-black/40'
                        }`}>
                          {tier.temperature}
                        </span>
                      </div>
                    </div>

                    <p className="mt-2 text-xs text-stone-400 line-clamp-2 pl-7">
                      {tier.shortDesc}
                    </p>
                  </button>
                );
              })}

              {/* Subterranean Thermal Gradient Bar */}
              <div className="p-4 rounded-2xl bg-stone-900/90 border border-stone-800 mt-4">
                <div className="flex justify-between items-center text-xs text-stone-300 font-mono mb-2">
                  <span>Surface Street (0m): 44°C</span>
                  <span className="text-emerald-400 font-bold">Deep Core (-6m): 28°C (-16°C)</span>
                </div>
                <div className="h-3 w-full rounded-full bg-gradient-to-r from-red-600 via-amber-500 via-emerald-500 to-sky-500 overflow-hidden relative">
                  <div
                    className="absolute top-0 bottom-0 w-1 bg-white shadow-md transition-all duration-300"
                    style={{
                      left:
                        selectedTierId === 'tier-1'
                          ? '12%'
                          : selectedTierId === 'tier-2'
                          ? '38%'
                          : selectedTierId === 'tier-3'
                          ? '65%'
                          : '90%'
                    }}
                  />
                </div>
                <div className="text-center text-[10px] text-stone-400 mt-2 font-mono">
                  Current Selected Depth: <strong className="text-white">{activeTier.depth}</strong> ({activeTier.temperature})
                </div>
              </div>
            </div>

            {/* Right Column: Detailed Architectural Stratum Inspector */}
            <div className="lg:col-span-7 bg-[#1A241F] rounded-3xl border border-stone-800 p-6 sm:p-8 shadow-xl">
              <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b border-stone-800">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-mono font-bold text-[#E07A5F] px-2.5 py-0.5 rounded bg-[#C85A32]/20">
                      Tier {activeTier.number}
                    </span>
                    <span className="text-xs text-stone-400 font-mono">
                      Depth: {activeTier.depth}
                    </span>
                  </div>
                  <h3 className="text-2xl font-extrabold text-white mt-2">
                    {activeTier.name}
                  </h3>
                </div>

                <div className="bg-stone-900/90 px-4 py-2 rounded-xl border border-stone-800 text-right">
                  <span className="text-[10px] text-stone-400 uppercase font-mono block">Hydro-Thermodynamics</span>
                  <span className="text-sm font-bold text-[#38BDF8] font-mono">{activeTier.waterFlowRate}</span>
                </div>
              </div>

              {/* Short Description */}
              <p className="mt-6 text-sm text-stone-200 leading-relaxed font-light">
                {activeTier.shortDesc}
              </p>

              {/* Engineering Specifications */}
              <div className="mt-6">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#E07A5F] font-mono mb-3">
                  Engineering Specifications & Layer Materiality
                </h4>
                <div className="space-y-2.5">
                  {activeTier.detailedSpecs.map((spec, idx) => (
                    <div key={idx} className="flex items-start space-x-3 bg-stone-900/60 p-3 rounded-xl border border-stone-800/80">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span className="text-xs text-stone-300 leading-normal">{spec}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Biomimetic Principles */}
              <div className="mt-6">
                <h4 className="text-xs font-bold uppercase tracking-wider text-sky-400 font-mono mb-3">
                  Passive Physical Mechanics & Baoli Wisdom
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {activeTier.principles.map((pr, idx) => (
                    <div key={idx} className="bg-black/30 p-3 rounded-xl border border-stone-800 text-xs text-stone-300">
                      <span className="text-[#E07A5F] mr-1.5 font-bold font-mono">▸</span>
                      {pr}
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        )}

        {/* View Tab 2: Passive Convection & Stack Effect Engine */}
        {viewTab === 'thermodynamics' && (
          <div className="bg-[#18221D] rounded-3xl border border-stone-800 p-6 sm:p-10">
            <div className="max-w-3xl">
              <span className="text-xs uppercase font-mono tracking-wider text-[#E07A5F] font-bold">
                Passive Thermodynamic Architecture
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-white mt-1">
                Zero-Power Terracotta Convection & Stack Effect
              </h3>
              <p className="mt-3 text-sm text-stone-300 leading-relaxed">
                Air movement is propelled purely by natural physics rather than electricity. How hot surface air is evacuated while dense chilled air pools in the living pavilion:
              </p>
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
              
              <div className="p-5 rounded-2xl bg-stone-900/80 border border-stone-800">
                <div className="w-10 h-10 rounded-xl bg-red-950/60 text-red-400 flex items-center justify-center mb-4">
                  <Wind className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-white">1. Upper Flue Solar Warming</h4>
                <p className="mt-2 text-xs text-stone-400 leading-relaxed">
                  Terracotta chimney tops are exposed to the sun at surface grade. As air inside the vertical shafts warms, its density decreases and it naturally rises (buoyancy effect).
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-stone-900/80 border border-stone-800">
                <div className="w-10 h-10 rounded-xl bg-amber-950/60 text-amber-400 flex items-center justify-center mb-4">
                  <Thermometer className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-white">2. Low-Pressure Core Suction</h4>
                <p className="mt-2 text-xs text-stone-400 leading-relaxed">
                  The rising thermal plume creates a gentle negative pressure differential at the base (-5m). Warm exhaust is drawn outward, pulling fresh ambient breezes through moistened jali screens.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-stone-900/80 border border-stone-800">
                <div className="w-10 h-10 rounded-xl bg-emerald-950/60 text-emerald-400 flex items-center justify-center mb-4">
                  <Droplets className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-white">3. Earth-Contact Thermal Mass</h4>
                <p className="mt-2 text-xs text-stone-400 leading-relaxed">
                  The walls of the sunken commons are surrounded by tens of thousands of tons of earth, which maintains a steady 26°C–29°C temperature year-round regardless of surface scorch.
                </p>
              </div>

            </div>

            <div className="mt-8 p-4 rounded-xl bg-black/40 border border-stone-800 text-xs text-stone-300 flex items-center space-x-3">
              <span className="px-2.5 py-1 rounded bg-emerald-900/40 text-emerald-300 font-mono font-bold">
                0 kW Compressor Power
              </span>
              <span>
                Even during catastrophic city electrical grid failures during 46°C summer heatwaves, PrithviVahini’s airflow continues passively 24 hours a day.
              </span>
            </div>
          </div>
        )}

        {/* View Tab 3: Execution & Scalability (15%) */}
        {viewTab === 'scalability' && (
          <div className="bg-[#18221D] rounded-3xl border border-stone-800 p-6 sm:p-10">
            <div className="max-w-3xl">
              <span className="text-xs uppercase font-mono tracking-wider text-emerald-400 font-bold">
                3. Practical Architecture & Execution (Execution — 15%)
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-white mt-1">
                Feasibility, Low O&M, and Municipal Scalability
              </h3>
              <p className="mt-3 text-sm text-stone-300 leading-relaxed">
                PrithviVahini avoids high-tech mechanical components that fail in high-dust Indian urban environments. Designed for zero-downtime longevity and simple municipal adoption:
              </p>
            </div>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
              
              <div className="p-6 rounded-2xl bg-stone-900/80 border border-stone-800">
                <h4 className="text-lg font-bold text-white flex items-center">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 mr-2" />
                  Ultra-Low Operations & Maintenance (O&M)
                </h4>
                <ul className="mt-4 space-y-2.5 text-xs text-stone-300">
                  <li className="flex items-start">
                    <span className="text-[#E07A5F] mr-2">•</span>
                    <strong>No moving motor parts:</strong> Zero compressor chillers, belts, or refrigerant gas recharge costs.
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#E07A5F] mr-2">•</span>
                    <strong>Self-cleaning bioswales:</strong> Graded silt traps can be shoveled clean once every pre-monsoon season (June) by standard colony garden staff.
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#E07A5F] mr-2">•</span>
                    <strong>Modular terracotta tiles:</strong> Standardized earthenware flues can be easily replaced or expanded by local potter guilds.
                  </li>
                </ul>
              </div>

              <div className="p-6 rounded-2xl bg-stone-900/80 border border-stone-800">
                <h4 className="text-lg font-bold text-white flex items-center">
                  <CheckCircle2 className="w-5 h-5 text-sky-400 mr-2" />
                  Scalability Across Indian Concrete Belts
                </h4>
                <ul className="mt-4 space-y-2.5 text-xs text-stone-300">
                  <li className="flex items-start">
                    <span className="text-[#38BDF8] mr-2">•</span>
                    <strong>New Township Master Plans:</strong> Turnkey master-plan inclusion for mega-housing societies in Greater Noida, Gurgaon Dwarka Expressway, Pune Hinjewadi, and Bengaluru whitefield.
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#38BDF8] mr-2">•</span>
                    <strong>Municipal Park Retrofits:</strong> Converting flat, dried-up municipal lawn plots or seasonal stormwater retention basins into active community sponges.
                  </li>
                  <li className="flex items-start">
                    <span className="text-[#38BDF8] mr-2">•</span>
                    <strong>Real Estate Value Multiplier:</strong> Transforms unusable hot open grounds into premier co-working, cafe, and cultural amenity centers that increase apartment property values by 12–18%.
                  </li>
                </ul>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
}
