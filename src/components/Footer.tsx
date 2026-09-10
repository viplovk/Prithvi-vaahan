import React from 'react';
import { Download, ArrowUp, Sparkles, Heart, Shield, Droplets, Compass } from 'lucide-react';
import { PROJECT_INFO } from '../data/projectData';

interface FooterProps {
  onOpenPitch: () => void;
}

export default function Footer({ onOpenPitch }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="execution" className="bg-[#0D1410] text-stone-300 border-t border-stone-800 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Footer Banner: Manifesto */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[#16211C] via-[#141C18] to-[#121915] border border-stone-800 relative overflow-hidden mb-16 shadow-2xl">
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#C85A32]/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative max-w-3xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-semibold bg-[#C85A32]/20 text-[#E07A5F] border border-[#C85A32]/30 mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>The PrithviVahini Civic Manifesto</span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-white leading-snug">
              "Living in deep harmony with the thermal mass of our earth and the monsoon sky."
            </h3>

            <p className="mt-4 text-sm sm:text-base text-stone-300 leading-relaxed font-light">
              Indian cities do not suffer from a lack of water; they suffer from a design failure that treats rainwater as waste to be expelled and summer heat as an enemy to be fought with power-hungry compressors. By re-rooting community spaces underground, we restore both thermal comfort and hydrological sovereignty.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                onClick={onOpenPitch}
                className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-[#C85A32] hover:bg-[#B34728] text-white font-semibold text-xs shadow-lg shadow-[#C85A32]/20 transition-all cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Download Pitch Dossier (PDF / Print)</span>
              </button>

              <a
                href="#hero-section"
                className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 text-xs font-semibold transition-all"
              >
                <span>Back to Overview</span>
              </a>
            </div>
          </div>
        </div>

        {/* 3-Column Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-stone-800 text-xs">
          
          {/* Col 1: Identity & Theme */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-[#C85A32] flex items-center justify-center text-white font-serif font-bold text-sm">
                PV
              </div>
              <span className="text-base font-bold text-white tracking-tight">
                {PROJECT_INFO.name}
              </span>
            </div>
            <p className="text-stone-400 max-w-md leading-relaxed">
              {PROJECT_INFO.tagline}
            </p>
            <div className="pt-2 text-stone-400 space-y-1 font-mono text-[11px]">
              <div>Competition: <strong className="text-white">{PROJECT_INFO.competition}</strong></div>
              <div>Category Theme: <strong className="text-[#E07A5F]">{PROJECT_INFO.theme}</strong></div>
              <div>Methodology: Passive Geothermal + Convective Stack + Sponge Urbanism</div>
            </div>
          </div>

          {/* Col 2: Core Engineering Pillars */}
          <div>
            <span className="text-xs uppercase font-mono tracking-wider text-white font-bold block mb-3">
              Engineering Architecture
            </span>
            <ul className="space-y-2 text-stone-400">
              <li><a href="#architecture" className="hover:text-white transition-colors">Tier 1: Surface Bioswales & Trees</a></li>
              <li><a href="#architecture" className="hover:text-white transition-colors">Tier 2: Terracotta Convection Flues</a></li>
              <li><a href="#architecture" className="hover:text-white transition-colors">Tier 3: Sunken Biophilic Pavilion</a></li>
              <li><a href="#architecture" className="hover:text-white transition-colors">Tier 4: Deep Aquifer Recharge Cells</a></li>
              <li><a href="#calculator" className="hover:text-white transition-colors">Hydrological Impact Simulator</a></li>
            </ul>
          </div>

          {/* Col 3: Student & Author Meta */}
          <div>
            <span className="text-xs uppercase font-mono tracking-wider text-white font-bold block mb-3">
              Student & Entry Meta
            </span>
            <ul className="space-y-2 text-stone-400">
              <li>Team: <strong className="text-stone-200">PrithviVahini Collective</strong></li>
              <li>Discipline: <strong className="text-stone-200">Bioclimatic & Civil Architecture</strong></li>
              <li>Focus Belts: <strong className="text-stone-200">NCR, Greater Noida, Pune</strong></li>
              <li>AI Integration: <strong className="text-[#38BDF8]">Google Gemini 2.5 Flash</strong></li>
              <li className="pt-2">
                <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-950/60 text-emerald-400 border border-emerald-800/60">
                  Ready for Evaluation
                </span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400">
          <div className="flex items-center space-x-2">
            <span>© 2026 PrithviVahini. Built for "Fund My Crazy 2026".</span>
            <span>•</span>
            <span className="flex items-center">
              Powered by Google Gemini
            </span>
          </div>

          <button
            onClick={scrollToTop}
            className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-stone-900 hover:bg-stone-800 text-stone-300 border border-stone-800 transition-colors"
          >
            <span>Return to Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </footer>
  );
}
