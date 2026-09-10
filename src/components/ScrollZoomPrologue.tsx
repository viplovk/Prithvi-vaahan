import React, { useState, useEffect, useRef } from 'react';
import DitherReveal from './originkit/ui/dither-reveal';
import { ArrowDown, Sparkles, HandHeart, Eye, Compass } from 'lucide-react';

interface ScrollZoomPrologueProps {
  onEnter: () => void;
}

// Curated high-resolution image of two hands cupping clear water & fertile earth with warm terracotta & biophilic light
const HANDS_IMAGE = "https://images.unsplash.com/photo-1535083783855-76ae62b2914e?q=85&w=1600&auto=format&fit=crop";
const BACKUP_HANDS_IMAGE = "https://images.unsplash.com/photo-1518495973542-4542c06a5843?q=85&w=1600&auto=format&fit=crop";

export default function ScrollZoomPrologue({ onEnter }: ScrollZoomPrologueProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [manualZoom, setManualZoom] = useState(0);
  const [isDitherActive, setIsDitherActive] = useState(true);

  // Track window scroll inside the prologue
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

  // Effective zoom combines scroll position and optional manual control
  const effectiveZoom = Math.min(1, Math.max(0, scrollProgress > 0 ? scrollProgress : manualZoom));
  const currentScale = 1 + effectiveZoom * 1.5; // zooms from 1.0 to 2.5x
  const currentBlur = effectiveZoom * 3;
  const overlayOpacity = Math.min(0.85, 0.2 + effectiveZoom * 0.7);

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
      className="relative w-full h-[180vh] bg-[#0E1512] text-white selection:bg-[#C85A32] selection:text-white"
    >
      {/* Sticky presentation viewport */}
      <div className="sticky top-0 w-full h-screen overflow-hidden flex flex-col items-center justify-between p-4 sm:p-8">
        
        {/* Background Visual: The Two Hands with Zoom effect and Dither Reveal */}
        <div
          className="absolute inset-0 w-full h-full pointer-events-none transition-transform duration-150 ease-out origin-center"
          style={{
            transform: `scale(${currentScale})`,
            filter: `blur(${currentBlur}px)`,
          }}
        >
          {isDitherActive ? (
            <div className="w-full h-full pointer-events-auto">
              <DitherReveal
                image={HANDS_IMAGE}
                ditherStyle="bayer8"
                dotSize={4}
                revealRadius={180}
                revealSoftness={40}
                wave={true}
                waveSpeed={50}
                waveDensity={20}
              />
            </div>
          ) : (
            <img
              src={HANDS_IMAGE}
              alt="Two caring hands cupping water and soil"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center"
              onError={(e) => {
                (e.target as HTMLImageElement).src = BACKUP_HANDS_IMAGE;
              }}
            />
          )}

          {/* Vignette and Atmospheric Biophilic Tint */}
          <div
            className="absolute inset-0 transition-opacity duration-300 pointer-events-none"
            style={{
              backgroundColor: '#0A130E',
              opacity: overlayOpacity,
              background: `radial-gradient(circle at center, rgba(200, 90, 50, 0.15) 0%, rgba(14, 21, 18, 0.75) 55%, rgba(10, 15, 12, 0.95) 100%)`
            }}
          />
        </div>

        {/* Top Header Badge in Prologue */}
        <div className="relative z-20 w-full max-w-6xl mx-auto flex items-center justify-between pt-2 sm:pt-4">
          <div className="flex items-center space-x-3">
            <span className="flex h-3 w-3 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E07A5F] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#C85A32]"></span>
            </span>
            <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#E07A5F] bg-[#C85A32]/10 border border-[#C85A32]/30 px-3 py-1 rounded-full backdrop-blur-md">
              Fund My Crazy 2026 Entry
            </span>
          </div>

          {/* Dither Shader Toggle & Direct Skip */}
          <div className="flex items-center space-x-2 sm:space-x-3 text-xs">
            <button
              onClick={() => setIsDitherActive(!isDitherActive)}
              className="hidden sm:inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/15 backdrop-blur-md transition-all text-stone-200"
              title="Toggle Originkit Dither Reveal Canvas Shader"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#E07A5F]" />
              <span>Dither Canvas: {isDitherActive ? 'Active' : 'Photo'}</span>
            </button>
            <button
              onClick={handleScrollDown}
              className="inline-flex items-center space-x-1.5 px-4 py-1.5 rounded-full bg-[#C85A32] hover:bg-[#B34728] text-white font-medium shadow-lg transition-all"
            >
              <span>Enter Presentation</span>
              <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
            </button>
          </div>
        </div>

        {/* Center Typography Narrative: The Two Hands Motif */}
        <div className="relative z-20 max-w-3xl text-center px-4 transition-all duration-300">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs text-stone-300 mb-4">
            <HandHeart className="w-3.5 h-3.5 text-[#E07A5F]" />
            <span className="tracking-wide">Prithvi (Earth) & Vahini (Conduit of Living Water)</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white mb-4 drop-shadow-md">
            PrithviVahini
          </h1>

          <p className="text-base sm:text-xl md:text-2xl text-stone-200 font-light max-w-2xl mx-auto leading-relaxed drop-shadow">
            The Subterranean Sponge Commons
          </p>

          <p className="mt-3 text-xs sm:text-sm text-[#E07A5F] max-w-xl mx-auto font-mono tracking-wider">
            Scroll down to zoom into the hands of the earth & descend into the zero-power climate sanctuary
          </p>

          {/* Interactive Zoom Feedback Indicator */}
          <div className="mt-6 inline-flex flex-col items-center bg-black/40 backdrop-blur-md border border-white/10 px-5 py-2.5 rounded-2xl">
            <div className="flex items-center space-x-3 text-xs text-stone-300">
              <span className="font-mono text-[#E07A5F]">DESCENT DEPTH:</span>
              <span className="font-semibold text-white font-mono">{Math.round(effectiveZoom * 100)}%</span>
              <span className="text-stone-400">({(effectiveZoom * 6.0).toFixed(1)}m below grade)</span>
            </div>

            {/* Depth Progress Bar */}
            <div className="w-48 sm:w-64 h-1.5 bg-white/20 rounded-full mt-2 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#C85A32] via-[#E07A5F] to-[#38BDF8] rounded-full transition-all duration-100"
                style={{ width: `${Math.max(5, effectiveZoom * 100)}%` }}
              />
            </div>
          </div>
        </div>

        {/* Bottom Prompts & Scroll Cue */}
        <div className="relative z-20 w-full max-w-xl mx-auto flex flex-col items-center pb-4 text-center">
          <button
            onClick={handleScrollDown}
            className="group flex flex-col items-center text-xs text-stone-300 hover:text-white transition-colors cursor-pointer"
          >
            <span className="uppercase tracking-[0.2em] font-medium text-[11px] mb-2 text-stone-400 group-hover:text-stone-200">
              Scroll to Descend
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
