import React, { useState, useEffect, useRef } from 'react';
import ScanEffect from './originkit/ui/scan-effect';
import { ArrowDown, Sparkles, Compass, Eye, ShieldCheck, Layers, Droplets } from 'lucide-react';

interface ScrollZoomPrologueProps {
  onEnter: () => void;
}

// Bird image with official depth map for Originkit ScanEffect
const BIRD_IMAGE = "https://images.unsplash.com/photo-1755467155696-ac0e80b28b75?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
const BIRD_DEPTH = "https://raw.githubusercontent.com/d3adrabbit/ScanningEffectWithDepthMap/main/assets/depth-1.png";

export default function ScrollZoomPrologue({ onEnter }: ScrollZoomPrologueProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [pattern, setPattern] = useState<'crosses' | 'dots'>('crosses');
  const [scanColor, setScanColor] = useState('#E07A5F'); // Terracotta scan default
  const [intensity, setIntensity] = useState(24);
  const [glow, setGlow] = useState(15);

  // Track scroll progress purely for atmospheric fade transition, WITHOUT any zoom/scale on the image
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const height = containerRef.current.offsetHeight - window.innerHeight;
      if (height > 0) {
        const progress = Math.min(1, Math.max(0, -rect.top / height));
        setScrollProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollDown = () => {
    const heroElem = document.getElementById('hero-section');
    if (heroElem) {
      heroElem.scrollIntoView({ behavior: 'smooth' });
    } else {
      onEnter();
    }
  };

  return (
    <section
      ref={containerRef}
      id="prologue-section"
      className="relative w-full h-[140vh] bg-[#0A110E] text-white selection:bg-[#C85A32] selection:text-white"
    >
      {/* Sticky presentation viewport: fixed in place, NO zoom in effect */}
      <div className="sticky top-0 w-full h-screen overflow-hidden flex flex-col items-center justify-between p-4 sm:p-8">
        
        {/* Background Visual: Originkit Depth-Map Scan Effect without image scale/zoom */}
        <div className="absolute inset-0 w-full h-full pointer-events-auto">
          <ScanEffect
            image={BIRD_IMAGE}
            depthMap={BIRD_DEPTH}
            pattern={pattern}
            scanColor={scanColor}
            intensity={intensity}
            tiling={100}
            band={25}
            parallax={28}
            glow={glow}
            invertDepth={false}
            transition={{
              duration: 3.2,
              ease: "easeInOut",
            }}
            style={{ width: "100%", height: "100%" }}
          />

          {/* Atmospheric Biophilic & Shadow Overlay */}
          <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-300"
            style={{
              background: `radial-gradient(circle at center, rgba(14, 21, 18, 0.2) 0%, rgba(10, 17, 14, 0.7) 60%, rgba(8, 14, 11, 0.94) 100%)`,
              opacity: Math.min(0.9, 0.35 + scrollProgress * 0.5)
            }}
          />
        </div>

        {/* Top Header Badge in Prologue */}
        <div className="relative z-20 w-full max-w-6xl mx-auto flex items-center justify-between pt-2 sm:pt-4 pointer-events-auto">
          <div className="flex items-center space-x-3">
            <span className="flex h-3 w-3 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E07A5F] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#C85A32]"></span>
            </span>
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#E07A5F] bg-[#C85A32]/10 border border-[#C85A32]/30 px-3 py-1 rounded-full backdrop-blur-md">
              Fund My Crazy 2026 Entry
            </span>
          </div>

          {/* Interactive Scan Controls & Skip */}
          <div className="flex items-center space-x-2 sm:space-x-3 text-xs">
            {/* Pattern Switch */}
            <button
              onClick={() => setPattern(pattern === 'crosses' ? 'dots' : 'crosses')}
              className="hidden sm:inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-black/40 hover:bg-black/60 border border-white/15 backdrop-blur-md transition-all text-stone-200 cursor-pointer"
              title="Toggle Scan Geometry"
            >
              <Layers className="w-3.5 h-3.5 text-[#E07A5F]" />
              <span className="capitalize">{pattern} Grid</span>
            </button>

            {/* Scan Laser Color Toggles */}
            <div className="hidden md:flex items-center space-x-1.5 bg-black/40 px-2.5 py-1 rounded-full border border-white/15 backdrop-blur-md">
              <span className="text-[10px] text-stone-400 mr-1 font-mono">LASER:</span>
              <button
                onClick={() => setScanColor('#E07A5F')}
                className={`w-3.5 h-3.5 rounded-full bg-[#E07A5F] border transition-transform ${scanColor === '#E07A5F' ? 'scale-125 border-white' : 'border-transparent opacity-60'}`}
                title="Terracotta Clay Scan"
              />
              <button
                onClick={() => setScanColor('#38BDF8')}
                className={`w-3.5 h-3.5 rounded-full bg-[#38BDF8] border transition-transform ${scanColor === '#38BDF8' ? 'scale-125 border-white' : 'border-transparent opacity-60'}`}
                title="Aquifer Water Blue Scan"
              />
              <button
                onClick={() => setScanColor('#10B981')}
                className={`w-3.5 h-3.5 rounded-full bg-[#10B981] border transition-transform ${scanColor === '#10B981' ? 'scale-125 border-white' : 'border-transparent opacity-60'}`}
                title="Biophilic Emerald Scan"
              />
            </div>

            <button
              onClick={handleScrollDown}
              className="inline-flex items-center space-x-1.5 px-4 py-1.5 rounded-full bg-[#C85A32] hover:bg-[#B34728] text-white font-medium shadow-lg transition-all cursor-pointer"
            >
              <span>Enter Presentation</span>
              <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
            </button>
          </div>
        </div>

        {/* Center Typography Narrative: Ecological Scanning & Project Introduction */}
        <div className="relative z-20 max-w-3xl text-center px-4 transition-all duration-300 pointer-events-auto">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/15 text-xs text-stone-300 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#E07A5F]" />
            <span className="tracking-wide">Volumetric Ecological Depth Scan • Biophilic Sensing</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white mb-4 drop-shadow-lg">
            PrithviVahini
          </h1>

          <p className="text-base sm:text-xl md:text-2xl text-stone-200 font-light max-w-2xl mx-auto leading-relaxed drop-shadow">
            The Subterranean Sponge Commons
          </p>

          <p className="mt-3 text-xs sm:text-sm text-[#E07A5F] max-w-xl mx-auto font-mono tracking-wider">
            Move your cursor across the depth field for 3D parallax • Light sweep illuminates biological layers
          </p>

          {/* Interactive Depth & Environmental Sensing Bar */}
          <div className="mt-6 inline-flex flex-col items-center bg-black/50 backdrop-blur-md border border-white/10 px-5 py-2.5 rounded-2xl">
            <div className="flex items-center space-x-3 text-xs text-stone-300">
              <span className="font-mono text-[#E07A5F]">SCAN DEPTH FIELD:</span>
              <span className="font-semibold text-white font-mono">ACTIVE (3D PARALLAX)</span>
              <span className="text-stone-400">• Zero-Zoom Fixed Viewport</span>
            </div>

            <div className="flex items-center space-x-2 mt-2 text-[11px] text-stone-400">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>Hover cursor to tilt 3D perspective layers</span>
            </div>
          </div>
        </div>

        {/* Bottom Prompts & Scroll Cue */}
        <div className="relative z-20 w-full max-w-xl mx-auto flex flex-col items-center pb-4 text-center pointer-events-auto">
          <button
            onClick={handleScrollDown}
            className="group flex flex-col items-center text-xs text-stone-300 hover:text-white transition-colors cursor-pointer"
          >
            <span className="uppercase tracking-[0.2em] font-medium text-[11px] mb-2 text-stone-400 group-hover:text-stone-200">
              Scroll to Explore Commons
            </span>
            <div className="w-9 h-12 rounded-full border-2 border-white/30 flex items-start justify-center p-2 group-hover:border-[#E07A5F] transition-colors">
              <div className="w-1.5 h-2.5 bg-[#E07A5F] rounded-full animate-pulse" />
            </div>
          </button>
        </div>

      </div>
    </section>
  );
}

