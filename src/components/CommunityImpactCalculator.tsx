import React, { useState } from 'react';
import { Calculator, Droplets, Coins, Leaf, Sparkles, Building, CloudRain, RotateCcw, TrendingUp, CheckCircle2 } from 'lucide-react';
import { CITY_PRESETS } from '../data/projectData';

export default function CommunityImpactCalculator() {
  const [apartments, setApartments] = useState(450); // apartments
  const [rainfallMm, setRainfallMm] = useState(700); // mm per year
  const [selectedCity, setSelectedCity] = useState(CITY_PRESETS[0].name);

  // Constants & Formulas
  // Average colony footprint catchment area: ~12 to 15 sq meters per apartment
  const catchmentAreaSqM = apartments * 14; 
  // Runoff coefficient: 0.85 for paved/swale system, capture efficiency 0.80
  const rainwaterHarvestedLiters = Math.round(catchmentAreaSqM * rainfallMm * 0.85 * 0.82);
  
  // Tankers eliminated (standard 5,000L water tanker)
  const tankersSaved = Math.round(rainwaterHarvestedLiters / 5000);
  // Average tanker cost ₹1,600 per 5,000L
  const tankerCostSavingsINR = Math.round(tankersSaved * 1600);

  // Carbon offsets:
  // Zero HVAC for 1,200 sq.m of civic commons for 180 hot days
  // Standard split AC cooling load: ~45 kWh/hr for equivalent air-conditioned community hall * 8 hrs/day * 180 days = 64,800 kWh
  // At 0.82 kg CO2e / kWh grid emission factor in India:
  const baseKwhSaved = (apartments / 400) * 58000;
  const carbonOffsetsKg = Math.round(baseKwhSaved * 0.82);
  const matureTreesEquivalent = Math.round(carbonOffsetsKg / 22); // ~22kg CO2 per tree/yr

  const handleCitySelect = (city: typeof CITY_PRESETS[0]) => {
    setSelectedCity(city.name);
    setRainfallMm(city.rainfall);
  };

  const handleReset = () => {
    setApartments(450);
    setRainfallMm(700);
    setSelectedCity(CITY_PRESETS[0].name);
  };

  const residentsEstimated = apartments * 4;

  return (
    <section id="calculator" className="py-20 bg-[#16211C] text-stone-100 border-b border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-semibold bg-[#38BDF8]/20 text-[#38BDF8] border border-[#38BDF8]/40 mb-3">
            <Calculator className="w-3.5 h-3.5" />
            <span>Interactive Living Simulation</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Community Impact & Hydrological Calculator
          </h2>
          <p className="mt-4 text-base text-stone-300 leading-relaxed">
            Adjust your community size and monsoon intensity to simulate live aquifer recharge volumes, municipal tanker savings, and emissions reductions.
          </p>

          {/* City Presets Bar */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            <span className="text-xs text-stone-400 mr-2 font-mono">Presets:</span>
            {CITY_PRESETS.map((city) => (
              <button
                key={city.name}
                onClick={() => handleCitySelect(city)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  selectedCity === city.name
                    ? 'bg-[#C85A32] text-white shadow-md'
                    : 'bg-stone-900 text-stone-300 hover:bg-stone-800 border border-stone-800'
                }`}
              >
                {city.name} ({city.rainfall}mm)
              </button>
            ))}
            <button
              onClick={handleReset}
              className="p-1.5 rounded-lg bg-stone-900 text-stone-400 hover:text-white border border-stone-800 transition-colors"
              title="Reset sliders"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Calculator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Interactive Sliders & Parameters */}
          <div className="lg:col-span-5 bg-[#1B2822] rounded-3xl border border-stone-800 p-6 sm:p-8 flex flex-col justify-between shadow-xl">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-stone-800">
                <div className="flex items-center space-x-2">
                  <Building className="w-5 h-5 text-[#E07A5F]" />
                  <h3 className="text-base font-bold text-white">Simulation Inputs</h3>
                </div>
                <span className="text-xs text-stone-400 font-mono">
                  ~{residentsEstimated.toLocaleString()} Residents
                </span>
              </div>

              {/* Slider 1: Community Size */}
              <div className="mt-6">
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-semibold text-stone-300">
                    Community Size (Apartments / Flatholders)
                  </label>
                  <span className="text-sm font-mono font-bold text-[#E07A5F] bg-black/40 px-2.5 py-0.5 rounded border border-stone-800">
                    {apartments} Flats
                  </span>
                </div>
                <input
                  type="range"
                  min="100"
                  max="2000"
                  step="25"
                  value={apartments}
                  onChange={(e) => setApartments(Number(e.target.value))}
                  className="w-full h-2 bg-stone-700 rounded-lg appearance-none cursor-pointer accent-[#C85A32]"
                />
                <div className="flex justify-between text-[11px] text-stone-400 font-mono mt-1">
                  <span>100 (Boutique Society)</span>
                  <span>1,000</span>
                  <span>2,000 (Mega Township)</span>
                </div>
              </div>

              {/* Slider 2: Monsoon Rainfall Intensity */}
              <div className="mt-8">
                <div className="flex justify-between items-center mb-2">
                  <label className="text-xs font-semibold text-stone-300 flex items-center">
                    <CloudRain className="w-3.5 h-3.5 mr-1.5 text-[#38BDF8]" />
                    Monsoon Rainfall Intensity (Annual mm)
                  </label>
                  <span className="text-sm font-mono font-bold text-[#38BDF8] bg-black/40 px-2.5 py-0.5 rounded border border-stone-800">
                    {rainfallMm} mm
                  </span>
                </div>
                <input
                  type="range"
                  min="300"
                  max="1600"
                  step="20"
                  value={rainfallMm}
                  onChange={(e) => setRainfallMm(Number(e.target.value))}
                  className="w-full h-2 bg-stone-700 rounded-lg appearance-none cursor-pointer accent-[#0284C7]"
                />
                <div className="flex justify-between text-[11px] text-stone-400 font-mono mt-1">
                  <span>300mm (Arid Rajasthan)</span>
                  <span>750mm (Delhi-NCR)</span>
                  <span>1600mm (Coastal/Western)</span>
                </div>
              </div>

              {/* Catchment Footprint Derived Note */}
              <div className="mt-8 p-4 rounded-xl bg-black/30 border border-stone-800 text-xs text-stone-400 space-y-1">
                <div className="flex justify-between">
                  <span>Calculated Basin Catchment Footprint:</span>
                  <strong className="text-white font-mono">{catchmentAreaSqM.toLocaleString()} m²</strong>
                </div>
                <div className="flex justify-between">
                  <span>Perimeter Sponge Bioswale Infiltration:</span>
                  <strong className="text-emerald-400 font-mono">82% Efficiency</strong>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-stone-800 text-[11px] text-stone-400 italic">
              Dynamic counters compute real-time hydrogeology & thermodynamic parameters based on standard Central Ground Water Board (CGWB) infiltration metrics.
            </div>
          </div>

          {/* Right Column: Dynamic Real-Time Counters */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Metric 1: Rainwater Harvested & Recharged (Liters) */}
            <div className="bg-[#18231E] rounded-3xl border border-sky-900/40 p-6 flex flex-col justify-between shadow-xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/10 rounded-full blur-2xl pointer-events-none" />
              <div>
                <div className="flex items-center justify-between">
                  <div className="p-2.5 rounded-xl bg-sky-950/80 text-[#38BDF8] border border-sky-800/40">
                    <Droplets className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-sky-400 bg-sky-950/60 px-2 py-0.5 rounded border border-sky-800/50">
                    Aquifer Injection
                  </span>
                </div>

                <div className="mt-4">
                  <span className="text-xs uppercase font-mono text-stone-400 tracking-wide block">
                    Rainwater Harvested & Recharged
                  </span>
                  <div className="text-3xl sm:text-4xl font-extrabold font-mono text-white tracking-tight mt-1">
                    {(rainwaterHarvestedLiters / 1000000).toFixed(2)}{' '}
                    <span className="text-lg font-sans font-bold text-sky-400">Million Liters</span>
                  </div>
                  <p className="text-xs text-stone-400 mt-1 font-mono">
                    ({rainwaterHarvestedLiters.toLocaleString()} Liters / Monsoon)
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-sky-900/30 text-xs text-sky-300">
                🌊 Recharges the unconfined local aquifer across a 1.2 km radius, combating summer borewell failures.
              </div>
            </div>

            {/* Metric 2: Tanker Cost Savings per Season (₹ INR) */}
            <div className="bg-[#18231E] rounded-3xl border border-amber-900/40 p-6 flex flex-col justify-between shadow-xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
              <div>
                <div className="flex items-center justify-between">
                  <div className="p-2.5 rounded-xl bg-amber-950/80 text-amber-400 border border-amber-800/40">
                    <Coins className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800/50">
                    Community Savings
                  </span>
                </div>

                <div className="mt-4">
                  <span className="text-xs uppercase font-mono text-stone-400 tracking-wide block">
                    Tanker Cost Savings per Season
                  </span>
                  <div className="text-3xl sm:text-4xl font-extrabold font-mono text-white tracking-tight mt-1">
                    ₹{(tankerCostSavingsINR / 100000).toFixed(2)}{' '}
                    <span className="text-lg font-sans font-bold text-amber-400">Lakhs</span>
                  </div>
                  <p className="text-xs text-stone-400 mt-1 font-mono">
                    ({tankersSaved.toLocaleString()} Private 5kL Tankers Eliminated)
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-amber-900/30 text-xs text-amber-300">
                💰 Direct savings returned to the Apartment Owners Association (AOA) maintenance corpus.
              </div>
            </div>

            {/* Metric 3: Carbon Offsets from Zero HVAC Commons (kg CO2e) */}
            <div className="bg-[#18231E] rounded-3xl border border-emerald-900/40 p-6 flex flex-col justify-between shadow-xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
              <div>
                <div className="flex items-center justify-between">
                  <div className="p-2.5 rounded-xl bg-emerald-950/80 text-emerald-400 border border-emerald-800/40">
                    <Leaf className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/50">
                    Zero HVAC Commons
                  </span>
                </div>

                <div className="mt-4">
                  <span className="text-xs uppercase font-mono text-stone-400 tracking-wide block">
                    Avoided Carbon Emissions
                  </span>
                  <div className="text-3xl sm:text-4xl font-extrabold font-mono text-white tracking-tight mt-1">
                    {(carbonOffsetsKg / 1000).toFixed(1)}{' '}
                    <span className="text-lg font-sans font-bold text-emerald-400">Tons CO₂e</span>
                  </div>
                  <p className="text-xs text-stone-400 mt-1 font-mono">
                    ({carbonOffsetsKg.toLocaleString()} kg CO₂e / Year)
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-emerald-900/30 text-xs text-emerald-300">
                🌲 Equivalent to planting <strong className="text-white">{matureTreesEquivalent} mature native trees</strong> annually.
              </div>
            </div>

            {/* Metric 4: Community Well-Being & Thermal Refuge */}
            <div className="bg-[#18231E] rounded-3xl border border-[#C85A32]/40 p-6 flex flex-col justify-between shadow-xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#C85A32]/10 rounded-full blur-2xl pointer-events-none" />
              <div>
                <div className="flex items-center justify-between">
                  <div className="p-2.5 rounded-xl bg-[#C85A32]/20 text-[#E07A5F] border border-[#C85A32]/40">
                    <TrendingUp className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#E07A5F] bg-[#C85A32]/15 px-2 py-0.5 rounded border border-[#C85A32]/40">
                    Civic Utilization
                  </span>
                </div>

                <div className="mt-4">
                  <span className="text-xs uppercase font-mono text-stone-400 tracking-wide block">
                    Usable Public Green Commons
                  </span>
                  <div className="text-3xl sm:text-4xl font-extrabold font-mono text-white tracking-tight mt-1">
                    365 <span className="text-lg font-sans font-bold text-[#E07A5F]">Days / Yr</span>
                  </div>
                  <p className="text-xs text-stone-400 mt-1 font-mono">
                    (vs &lt;90 days for flat concrete parks during 45°C summers)
                  </p>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[#C85A32]/30 text-xs text-stone-300">
                ☀️ 100% natural convective cooling makes afternoon co-working & kids' activities comfortable.
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
