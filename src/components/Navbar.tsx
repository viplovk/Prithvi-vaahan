import React, { useState, useEffect, useRef } from 'react';
import { Download, Sparkles, Menu, X, Droplets, Play, Pause, Compass, ArrowDown } from 'lucide-react';
import { PROJECT_INFO } from '../data/projectData';

interface NavbarProps {
  onOpenPitch: () => void;
  onScrollToSimulation: () => void;
}

export default function Navbar({ onOpenPitch, onScrollToSimulation }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAutoScrolling, setIsAutoScrolling] = useState(false);
  const autoScrollRafRef = useRef<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 250);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Automatic slow-scroll engine for Pitch Deck presentation mode
  useEffect(() => {
    if (!isAutoScrolling) {
      if (autoScrollRafRef.current) {
        cancelAnimationFrame(autoScrollRafRef.current);
        autoScrollRafRef.current = null;
      }
      return;
    }

    // Scroll speed in pixels per frame (~0.95px per frame = smooth ~57px/sec reading pace)
    const scrollSpeed = 0.95;

    const performScroll = () => {
      // Check if page reached the bottom
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (window.scrollY >= maxScroll - 5) {
        setIsAutoScrolling(false);
        return;
      }

      window.scrollBy({ top: scrollSpeed, left: 0, behavior: 'auto' });
      autoScrollRafRef.current = requestAnimationFrame(performScroll);
    };

    autoScrollRafRef.current = requestAnimationFrame(performScroll);

    // Pause on Escape key
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsAutoScrolling(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      if (autoScrollRafRef.current) {
        cancelAnimationFrame(autoScrollRafRef.current);
        autoScrollRafRef.current = null;
      }
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isAutoScrolling]);

  const toggleAutoScroll = () => {
    setIsAutoScrolling((prev) => !prev);
  };

  const navLinks = [
    { label: "Twin Crisis", href: "#twin-crisis" },
    { label: "4-Tier Architecture", href: "#architecture" },
    { label: "3D Model Map", href: "#3d-map" },
    { label: "Impact Calculator", href: "#calculator" },
    { label: "Gemini & Rubric", href: "#gemini-rubric" },
    { label: "Execution", href: "#execution" },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    if (isAutoScrolling) {
      setIsAutoScrolling(false);
    }
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      id="main-nav"
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-[#121915]/90 backdrop-blur-md border-b border-stone-800/80 shadow-lg shadow-black/20'
          : 'bg-[#121915]/75 backdrop-blur-sm border-b border-white/5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo & Category Badge */}
          <div className="flex items-center space-x-3">
            <a
              href="#hero-section"
              className="flex items-center space-x-2 group focus:outline-none"
            >
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#C85A32] to-[#B34728] flex items-center justify-center text-white shadow-md shadow-[#C85A32]/20">
                <span className="font-serif font-black text-lg">PV</span>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-base sm:text-lg tracking-tight text-white group-hover:text-[#E07A5F] transition-colors">
                  {PROJECT_INFO.name}
                </span>
                <span className="text-[10px] text-stone-400 font-medium tracking-wide hidden sm:inline">
                  Subterranean Sponge Commons
                </span>
              </div>
            </a>

            {/* Competition Badge */}
            <div className="hidden lg:flex items-center space-x-1.5 pl-3 border-l border-stone-700">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#C85A32]/15 text-[#E07A5F] border border-[#C85A32]/30">
                <Sparkles className="w-3 h-3 mr-1 text-[#E07A5F]" />
                {PROJECT_INFO.competition}
              </span>
              <span className="text-[11px] text-stone-400">
                Theme: <strong className="text-stone-300 font-medium">{PROJECT_INFO.theme}</strong>
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2 text-sm font-medium text-stone-300">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="px-3 py-1.5 rounded-lg hover:text-white hover:bg-white/5 transition-all"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Action CTA Buttons */}
          <div className="hidden sm:flex items-center space-x-2">
            {/* Auto-Scroll Presentation Toggle Button */}
            <button
              onClick={toggleAutoScroll}
              className={`inline-flex items-center space-x-1.5 px-3 py-2 text-xs font-semibold rounded-lg border transition-all cursor-pointer ${
                isAutoScrolling
                  ? 'bg-emerald-600/20 text-emerald-300 border-emerald-500/60 shadow-sm shadow-emerald-500/20'
                  : 'bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white border-stone-700'
              }`}
              title={isAutoScrolling ? "Pause Presentation Auto-Scroll (Press Esc)" : "Start Automatic Pitch Deck Slow-Scroll"}
            >
              {isAutoScrolling ? (
                <>
                  <Pause className="w-3.5 h-3.5 text-emerald-400 fill-emerald-400 animate-pulse" />
                  <span>Auto-Scroll: ON</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 text-[#E07A5F]" />
                  <span>Auto-Scroll Deck</span>
                </>
              )}
            </button>

            <button
              onClick={onScrollToSimulation}
              className="inline-flex items-center space-x-1.5 px-3.5 py-2 text-xs font-semibold rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 transition-all cursor-pointer"
            >
              <Droplets className="w-3.5 h-3.5 text-[#38BDF8]" />
              <span>Live Simulation</span>
            </button>
            <button
              onClick={onOpenPitch}
              className="inline-flex items-center space-x-1.5 px-4 py-2 text-xs font-semibold rounded-lg bg-[#C85A32] hover:bg-[#B34728] text-white shadow-md shadow-[#C85A32]/25 transition-all cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Pitch Brief</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center space-x-1.5">
            <button
              onClick={toggleAutoScroll}
              className={`p-2 rounded-lg border transition-colors ${
                isAutoScrolling
                  ? 'bg-emerald-600/30 text-emerald-300 border-emerald-500/60'
                  : 'bg-stone-800 text-stone-300 border-stone-700'
              }`}
              title={isAutoScrolling ? "Pause Auto-Scroll" : "Auto-Scroll Deck"}
            >
              {isAutoScrolling ? (
                <Pause className="w-4 h-4 fill-emerald-400 text-emerald-400" />
              ) : (
                <Play className="w-4 h-4 text-[#E07A5F]" />
              )}
            </button>
            <button
              onClick={onOpenPitch}
              className="p-2 rounded-lg bg-[#C85A32] text-white"
              title="Pitch Brief"
            >
              <Download className="w-4 h-4" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-stone-300 hover:text-white hover:bg-white/10"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#16201B] border-b border-stone-800 px-4 pt-3 pb-5 space-y-2">
          <div className="flex items-center justify-between pb-2 border-b border-stone-800 text-xs text-[#E07A5F]">
            <span>{PROJECT_INFO.competition}</span>
            <span className="text-stone-400">{PROJECT_INFO.theme}</span>
          </div>
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="block px-3 py-2 rounded-lg text-sm text-stone-200 hover:bg-white/10"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-2 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                toggleAutoScroll();
              }}
              className={`w-full flex items-center justify-center space-x-2 py-2.5 rounded-lg border text-sm font-medium ${
                isAutoScrolling
                  ? 'bg-emerald-950/60 text-emerald-300 border-emerald-600/50'
                  : 'bg-stone-800 text-stone-200 border-stone-700'
              }`}
            >
              {isAutoScrolling ? (
                <>
                  <Pause className="w-4 h-4 text-emerald-400 fill-emerald-400" />
                  <span>Pause Pitch Deck Auto-Scroll</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 text-[#E07A5F]" />
                  <span>Enable Auto-Scroll Presentation Mode</span>
                </>
              )}
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onScrollToSimulation();
              }}
              className="w-full flex items-center justify-center space-x-2 py-2.5 rounded-lg bg-stone-800 text-stone-200 text-sm font-medium"
            >
              <Droplets className="w-4 h-4 text-[#38BDF8]" />
              <span>Open Live Simulation Calculator</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenPitch();
              }}
              className="w-full flex items-center justify-center space-x-2 py-2.5 rounded-lg bg-[#C85A32] text-white text-sm font-medium"
            >
              <Download className="w-4 h-4" />
              <span>Download Competition Pitch Sheet</span>
            </button>
          </div>
        </div>
      )}

      {/* Floating Auto-Scroll Control Pill when active */}
      {isAutoScrolling && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center space-x-3 px-4 py-2.5 rounded-full bg-[#141C18]/95 border border-emerald-500/60 shadow-2xl backdrop-blur-md text-xs text-white">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="font-mono text-emerald-300 font-medium">Pitch Auto-Scroll Active</span>
          <button
            onClick={toggleAutoScroll}
            className="px-2.5 py-1 rounded-full bg-emerald-600/30 hover:bg-emerald-600/50 text-emerald-200 border border-emerald-500/40 text-[11px] font-semibold transition-colors flex items-center space-x-1 cursor-pointer"
          >
            <Pause className="w-3 h-3 fill-emerald-300" />
            <span>Pause</span>
          </button>
        </div>
      )}
    </header>
  );
}
