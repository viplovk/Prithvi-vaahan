import React, { useState } from 'react';
import { 
  Droplets, 
  Waves, 
  Wind, 
  Maximize2, 
  Minimize2, 
  RotateCcw, 
  Sliders, 
  ShieldCheck, 
  AlertTriangle, 
  Compass, 
  Sparkles,
  ArrowRight,
  Info
} from 'lucide-react';
import OceanSwell from './originkit/ui/ocean-swell';

export type SwellPresetType = 'torrent' | 'aquifer' | 'coastal';

interface SwellPresetConfig {
  id: SwellPresetType;
  title: string;
  badge: string;
  badgeColor: string;
  shortDesc: string;
  deep: string;
  shallow: string;
  scatter: string;
  foam: string;
  zenith: string;
  horizon: string;
  swell: number;
  choppy: number;
  detail: number;
  glitter: number;
  subsurface: number;
  foamAmount: number;
  cloud: number;
  speed: number;
  drag: number;
  sizePercent: number;
  metrics: {
    label: string;
    value: string;
    sub: string;
  }[];
  engineeringNote: string;
}

const PRESETS: Record<SwellPresetType, SwellPresetConfig> = {
  torrent: {
    id: 'torrent',
    title: 'Monsoon Cloudburst Street Torrent',
    badge: 'Uncontrolled Urban Runoff',
    badgeColor: 'bg-red-950/80 text-red-300 border-red-800/50',
    shortDesc: 'Stormwater cascading over 75% impervious asphalt. Without soil infiltration, rapid overland sheet flow generates high-velocity surface swells, drowning basements and sewer manholes.',
    deep: '#0e2329',
    shallow: '#225d66',
    scatter: '#7b989c',
    foam: '#e2f0f5',
    zenith: '#284154',
    horizon: '#b8c9cc',
    swell: 8,
    choppy: 16,
    detail: 15,
    glitter: 12,
    subsurface: 14,
    foamAmount: 15,
    cloud: 18,
    speed: 11,
    drag: 12,
    sizePercent: 120,
    metrics: [
      { label: 'Surface Runoff Velocity', value: '4.8 m/s', sub: 'Destructive Flash Flow' },
      { label: 'Natural Infiltration', value: '8.4%', sub: 'Blocked by Concrete' },
      { label: 'Hydraulic Wave Force', value: '28.5 kN/m²', sub: 'Overwhelms Gutters' },
      { label: 'Sediment Silt Load', value: '1,420 mg/L', sub: 'Chokes Drain Lines' }
    ],
    engineeringNote: 'Impervious urban concrete forces 80% of rainfall into lateral surges, causing flash-floods within 20 minutes of a 100mm cloudburst.'
  },
  aquifer: {
    id: 'aquifer',
    title: 'PrithviVahini Subterranean Aquifer Basin',
    badge: '100% Gravity-Buffered Commons',
    badgeColor: 'bg-emerald-950/80 text-emerald-300 border-emerald-800/50',
    shortDesc: 'The captured floodwater resting in the deep Tier-4 stepwell reservoir (-14m). 7 concentric sandstone step tiers dissipate kinetic wave energy, leaving a calm, crystal-clear storage pool.',
    deep: '#031c22',
    shallow: '#0f6169',
    scatter: '#2dd4bf',
    foam: '#99f6e4',
    zenith: '#114a45',
    horizon: '#5eead4',
    swell: 1.8,
    choppy: 3,
    detail: 10,
    glitter: 18,
    subsurface: 19,
    foamAmount: 2,
    cloud: 3,
    speed: 3,
    drag: 10,
    sizePercent: 110,
    metrics: [
      { label: 'Surface Runoff Velocity', value: '0.18 m/s', sub: 'Laminar Infiltration' },
      { label: 'Natural Infiltration', value: '98.2%', sub: 'Deep Bedrock Injection' },
      { label: 'Hydraulic Wave Force', value: '0.6 kN/m²', sub: '98% Energy Dissipated' },
      { label: 'Purified Water Clarity', value: '< 2.5 NTU', sub: 'Drinking Grade Strata' }
    ],
    engineeringNote: 'Stepped sandstone geometry breaks hydraulic turbulence through cascading aeration, feeding clean recharge into unconfined aquifer fractures.'
  },
  coastal: {
    id: 'coastal',
    title: 'Extreme Coastal Surge & High-Tide Inundation',
    badge: 'Compound Climate Hazard',
    badgeColor: 'bg-sky-950/80 text-sky-300 border-sky-800/50',
    shortDesc: 'Simulating cyclonic ocean swells and coastal high-tide backflow pushing inland against urban river estuaries, compounding seasonal monsoon rainfall.',
    deep: '#021321',
    shallow: '#0e4163',
    scatter: '#93c5fd',
    foam: '#ffffff',
    zenith: '#1e293b',
    horizon: '#94a3b8',
    swell: 15,
    choppy: 19,
    detail: 18,
    glitter: 7,
    subsurface: 12,
    foamAmount: 20,
    cloud: 20,
    speed: 15,
    drag: 14,
    sizePercent: 130,
    metrics: [
      { label: 'Tidal Crest Surge', value: '+3.2 m', sub: 'Overtopping Sea Walls' },
      { label: 'Compound Inflow Rate', value: '3,800 m³/s', sub: 'Estuary Reversal' },
      { label: 'Kinetic Wave Energy', value: '42.0 kJ/m²', sub: 'Extreme Structural Shear' },
      { label: 'Drainage Stall Duration', value: '6.5 Hours', sub: 'Gravity Gates Locked' }
    ],
    engineeringNote: 'Compound storm surge locks conventional outfalls; subterranean sponge lungs provide vital buffer capacity when gravity drainage into the sea stalls.'
  }
};

export default function HydrologicalSwellSimulator() {
  const [selectedPreset, setSelectedPreset] = useState<SwellPresetType>('torrent');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);

  // Active custom overrides
  const activePresetConfig = PRESETS[selectedPreset];
  const [customSwell, setCustomSwell] = useState<number>(activePresetConfig.swell);
  const [customChoppy, setCustomChoppy] = useState<number>(activePresetConfig.choppy);
  const [customSpeed, setCustomSpeed] = useState<number>(activePresetConfig.speed);
  const [customSubsurface, setCustomSubsurface] = useState<number>(activePresetConfig.subsurface);
  const [customFoam, setCustomFoam] = useState<number>(activePresetConfig.foamAmount);

  // When switching preset, update overrides
  const handleSelectPreset = (presetKey: SwellPresetType) => {
    setSelectedPreset(presetKey);
    const p = PRESETS[presetKey];
    setCustomSwell(p.swell);
    setCustomChoppy(p.choppy);
    setCustomSpeed(p.speed);
    setCustomSubsurface(p.subsurface);
    setCustomFoam(p.foamAmount);
  };

  const handleReset = () => {
    const p = PRESETS[selectedPreset];
    setCustomSwell(p.swell);
    setCustomChoppy(p.choppy);
    setCustomSpeed(p.speed);
    setCustomSubsurface(p.subsurface);
    setCustomFoam(p.foamAmount);
  };

  return (
    <div className="rounded-3xl bg-[#0F1714] border border-stone-800 shadow-2xl overflow-hidden transition-all text-stone-100">
      
      {/* Header Bar */}
      <div className="p-6 sm:p-8 pb-4 border-b border-stone-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-sky-950/80 text-sky-400 border border-sky-800/60 font-mono">
              <Waves className="w-3.5 h-3.5 animate-pulse" />
              <span>Originkit Ocean Swell • Raymarched WebGL Engine</span>
            </span>
            <span className="text-xs text-stone-400 font-mono">
              Real-Time Fluid & Wave Simulation
            </span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Storm Surge & Subterranean Fluid Swell Dynamics
          </h3>
          <p className="mt-1.5 text-xs sm:text-sm text-stone-300 max-w-3xl leading-relaxed">
            Interact with real-time wave physics to visualize how unmitigated monsoon cloudbursts turn paved streets into turbulent open swells—and how PrithviVahini’s 7-tier Baoli dampens hydraulic turbulence into a calm, filtered freshwater reservoir.
          </p>
        </div>

        {/* Preset Selector Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 bg-black/60 p-1.5 rounded-2xl border border-stone-800 shrink-0 self-start md:self-auto">
          <button
            onClick={() => handleSelectPreset('torrent')}
            className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all flex items-center space-x-1.5 ${
              selectedPreset === 'torrent'
                ? 'bg-red-900/90 text-red-100 border border-red-700/60 shadow-sm'
                : 'text-stone-400 hover:text-white'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
            <span>Street Torrent</span>
          </button>

          <button
            onClick={() => handleSelectPreset('aquifer')}
            className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all flex items-center space-x-1.5 ${
              selectedPreset === 'aquifer'
                ? 'bg-emerald-800 text-emerald-100 border border-emerald-600 shadow-sm font-bold'
                : 'text-stone-400 hover:text-white'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-300" />
            <span>Baoli Aquifer Reservoir</span>
          </button>

          <button
            onClick={() => handleSelectPreset('coastal')}
            className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all flex items-center space-x-1.5 ${
              selectedPreset === 'coastal'
                ? 'bg-sky-800 text-sky-100 border border-sky-600 shadow-sm'
                : 'text-stone-400 hover:text-white'
            }`}
          >
            <Waves className="w-3.5 h-3.5 text-sky-300" />
            <span>Coastal Surge</span>
          </button>
        </div>
      </div>

      {/* Main Simulation Viewport Container */}
      <div className="p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* LEFT / CENTER: WebGL Canvas Viewport */}
        <div className={`lg:col-span-8 relative rounded-2xl overflow-hidden border border-stone-800 shadow-2xl bg-black ${
          isFullscreen ? 'fixed inset-4 z-50 rounded-2xl h-[calc(100vh-2rem)]' : 'h-[440px] sm:h-[480px]'
        }`}>
          
          {/* Originkit Ocean Swell Three.js Component */}
          <OceanSwell
            deep={activePresetConfig.deep}
            shallow={activePresetConfig.shallow}
            scatter={activePresetConfig.scatter}
            foam={activePresetConfig.foam}
            zenith={activePresetConfig.zenith}
            horizon={activePresetConfig.horizon}
            swell={customSwell}
            choppy={customChoppy}
            detail={activePresetConfig.detail}
            glitter={activePresetConfig.glitter}
            subsurface={customSubsurface}
            foamAmount={customFoam}
            cloud={activePresetConfig.cloud}
            speed={customSpeed}
            drag={activePresetConfig.drag}
            sizePercent={activePresetConfig.sizePercent}
          />

          {/* Top-Left Preset Tag on Canvas */}
          <div className="absolute top-4 left-4 z-10 pointer-events-auto bg-black/75 backdrop-blur-md px-3.5 py-2 rounded-xl border border-white/15 text-xs">
            <div className="flex items-center space-x-2">
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold border ${activePresetConfig.badgeColor}`}>
                {activePresetConfig.badge}
              </span>
              <span className="font-bold text-white text-xs">
                {activePresetConfig.title}
              </span>
            </div>
            <span className="text-[11px] text-stone-300 block mt-1">
              Click & drag anywhere on water to rotate camera yaw/pitch
            </span>
          </div>

          {/* Top-Right Action Controls on Canvas */}
          <div className="absolute top-4 right-4 z-10 pointer-events-auto flex items-center space-x-1.5 bg-black/70 backdrop-blur-md p-1.5 rounded-xl border border-white/15 text-xs">
            <button
              onClick={() => setShowControls(!showControls)}
              className={`p-1.5 rounded-lg transition-colors flex items-center space-x-1 ${
                showControls ? 'bg-stone-700 text-white' : 'text-stone-400 hover:text-white'
              }`}
              title="Toggle Telemetry & Sliders"
            >
              <Sliders className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={handleReset}
              className="p-1.5 rounded-lg text-stone-400 hover:text-white transition-colors"
              title="Reset Preset Defaults"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-1.5 rounded-lg text-stone-400 hover:text-white transition-colors"
              title={isFullscreen ? "Exit Fullscreen" : "Expand Fullscreen"}
            >
              {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            </button>
          </div>

          {/* Bottom Live Wave Frequency Pill */}
          <div className="absolute bottom-4 left-4 right-4 z-10 pointer-events-none flex flex-wrap items-center justify-between gap-2">
            <div className="bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 text-[11px] font-mono text-stone-300 pointer-events-auto flex items-center space-x-3">
              <span className="flex items-center space-x-1.5">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                <span className="text-cyan-300 font-bold">Wave Engine:</span>
                <span>Active 3D Raymarch</span>
              </span>
              <span className="text-stone-500">|</span>
              <span>Swell: <strong>{customSwell.toFixed(1)}m</strong></span>
              <span className="text-stone-500">|</span>
              <span>Velocity: <strong>{customSpeed}x</strong></span>
            </div>

            <div className="bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 text-[11px] font-mono text-stone-300 pointer-events-auto hidden sm:flex items-center space-x-1.5">
              <Compass className="w-3.5 h-3.5 text-[#E07A5F]" />
              <span>Interactive 360° Drag Control</span>
            </div>
          </div>

        </div>

        {/* RIGHT: Telemetry & Interactive Physics Tuners */}
        <div className="lg:col-span-4 flex flex-col justify-between space-y-4">
          
          {/* Preset Context Card */}
          <div className="p-4 sm:p-5 rounded-2xl bg-stone-900/90 border border-stone-800">
            <h4 className="text-sm font-bold text-white mb-1.5 flex items-center">
              <Info className="w-4 h-4 text-[#E07A5F] mr-1.5 shrink-0" />
              Hydrological Dynamics
            </h4>
            <p className="text-xs text-stone-300 leading-relaxed">
              {activePresetConfig.shortDesc}
            </p>

            <div className="mt-3 pt-3 border-t border-stone-800 text-[11px] font-mono text-[#E07A5F]">
              💡 {activePresetConfig.engineeringNote}
            </div>
          </div>

          {/* Real-Time Micro Metrics */}
          <div className="grid grid-cols-2 gap-2.5">
            {activePresetConfig.metrics.map((m, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-stone-900/70 border border-stone-800 flex flex-col justify-between">
                <span className="text-[10px] uppercase font-mono text-stone-400 line-clamp-1">
                  {m.label}
                </span>
                <span className="text-base font-extrabold text-white mt-1 font-mono">
                  {m.value}
                </span>
                <span className="text-[10px] text-stone-400 mt-0.5">
                  {m.sub}
                </span>
              </div>
            ))}
          </div>

          {/* Interactive Wave Parameter Sliders */}
          {showControls && (
            <div className="p-4 sm:p-5 rounded-2xl bg-stone-900/80 border border-stone-800 space-y-3.5">
              <div className="flex items-center justify-between pb-2 border-b border-stone-800">
                <span className="text-xs font-bold text-white uppercase font-mono tracking-wider">
                  Wave Physics Parameters
                </span>
                <button
                  onClick={handleReset}
                  className="text-[10px] text-stone-400 hover:text-white underline font-mono"
                >
                  Reset
                </button>
              </div>

              {/* Swell Height */}
              <div>
                <div className="flex justify-between text-xs font-mono mb-1">
                  <span className="text-stone-300">Swell Amplitude:</span>
                  <span className="text-cyan-400 font-bold">{customSwell.toFixed(1)}</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="20"
                  step="0.5"
                  value={customSwell}
                  onChange={(e) => setCustomSwell(parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-stone-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                />
              </div>

              {/* Choppiness */}
              <div>
                <div className="flex justify-between text-xs font-mono mb-1">
                  <span className="text-stone-300">Surface Choppiness:</span>
                  <span className="text-sky-400 font-bold">{customChoppy}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="20"
                  step="1"
                  value={customChoppy}
                  onChange={(e) => setCustomChoppy(parseInt(e.target.value))}
                  className="w-full h-1.5 bg-stone-800 rounded-lg appearance-none cursor-pointer accent-sky-500"
                />
              </div>

              {/* Flow Speed */}
              <div>
                <div className="flex justify-between text-xs font-mono mb-1">
                  <span className="text-stone-300">Fluid Velocity / Speed:</span>
                  <span className="text-emerald-400 font-bold">{customSpeed}x</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="20"
                  step="1"
                  value={customSpeed}
                  onChange={(e) => setCustomSpeed(parseInt(e.target.value))}
                  className="w-full h-1.5 bg-stone-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
              </div>

              {/* Subsurface Light Scattering */}
              <div>
                <div className="flex justify-between text-xs font-mono mb-1">
                  <span className="text-stone-300">Subsurface Light Scatter:</span>
                  <span className="text-amber-400 font-bold">{customSubsurface}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="20"
                  step="1"
                  value={customSubsurface}
                  onChange={(e) => setCustomSubsurface(parseInt(e.target.value))}
                  className="w-full h-1.5 bg-stone-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
                />
              </div>

              {/* Foam Amount */}
              <div>
                <div className="flex justify-between text-xs font-mono mb-1">
                  <span className="text-stone-300">Aeration & Foam Crests:</span>
                  <span className="text-stone-200 font-bold">{customFoam}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="20"
                  step="1"
                  value={customFoam}
                  onChange={(e) => setCustomFoam(parseInt(e.target.value))}
                  className="w-full h-1.5 bg-stone-800 rounded-lg appearance-none cursor-pointer accent-stone-300"
                />
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
