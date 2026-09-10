import React from 'react';
import { X, Printer, Download, CheckCircle2, Award, Sparkles, Building, Droplets, Thermometer, ZapOff } from 'lucide-react';
import { PROJECT_INFO, CORE_PROBLEM, ARCHITECTURE_TIERS, COMPETITION_RUBRIC } from '../data/projectData';

interface PitchDeckModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PitchDeckModal({ isOpen, onClose }: PitchDeckModalProps) {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadMarkdown = () => {
    const content = `# ${PROJECT_INFO.name}: ${PROJECT_INFO.subtitle}
Competition: ${PROJECT_INFO.competition}
Theme: ${PROJECT_INFO.theme}
Tagline: ${PROJECT_INFO.tagline}

## 1. Executive Summary & Problem (Real-Life Relevance — 20%)
${CORE_PROBLEM.urbanHeatIsland.title}: ${CORE_PROBLEM.urbanHeatIsland.description}
${CORE_PROBLEM.floodToDrought.title}: ${CORE_PROBLEM.floodToDrought.description}

## 2. Visionary Solution (Vision — 30% & Future-Focused — 15%)
- Passive Geothermal Cooling: -10°C ambient drop below street level.
- Stack Effect Terracotta Convection: 0 kW electrical power cooling.
- Decentralized Sponge Catchment: Over 5 Million Liters/Year aquifer infiltration.

## 3. Engineering Layers (4-Tier Cutaway)
${ARCHITECTURE_TIERS.map(t => `- Tier ${t.number} (${t.depth}): ${t.name} - ${t.shortDesc}`).join('\n')}

## 4. Built with Gemini (20%)
Architectural morphology, passive stack thermodynamics, and cross-sectional prompt engineered with Google Gemini.

## 5. Execution & Feasibility (15%)
Zero motorized chillers, low O&M, and turnkey scalability for modern Indian high-density apartment belts (Noida, Gurgaon, Pune).
`;

    const blob = new Blob([content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `PrithviVahini-Pitch-Brief-2026.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-4xl bg-[#141C18] border border-stone-700 rounded-3xl shadow-2xl overflow-hidden my-8 max-h-[90vh] flex flex-col text-stone-100">
        
        {/* Modal Header */}
        <div className="p-6 border-b border-stone-800 flex items-center justify-between bg-[#19241F]">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-[#C85A32] flex items-center justify-center text-white font-bold font-serif text-lg">
              PV
            </div>
            <div>
              <span className="text-[10px] uppercase font-mono tracking-widest text-[#E07A5F] font-semibold">
                Official Pitch Brief • {PROJECT_INFO.competition}
              </span>
              <h3 className="text-lg sm:text-xl font-bold text-white">
                {PROJECT_INFO.name}: Executive Competition Dossier
              </h3>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrint}
              className="p-2 rounded-lg bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 transition-colors"
              title="Print Dossier (PDF)"
            >
              <Printer className="w-4 h-4" />
            </button>
            <button
              onClick={handleDownloadMarkdown}
              className="p-2 rounded-lg bg-[#C85A32] hover:bg-[#B34728] text-white transition-colors"
              title="Download Markdown Summary"
            >
              <Download className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-lg text-stone-400 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-sm text-stone-300 print:text-black">
          
          {/* Pitch Banner */}
          <div className="p-5 rounded-2xl bg-[#1D2923] border border-stone-700">
            <div className="flex items-center space-x-2 text-xs font-semibold text-[#E07A5F] mb-1">
              <Sparkles className="w-4 h-4" />
              <span>Theme: {PROJECT_INFO.theme}</span>
            </div>
            <h4 className="text-xl font-bold text-white">
              {PROJECT_INFO.headline}
            </h4>
            <p className="mt-2 text-xs sm:text-sm text-stone-300 leading-relaxed">
              {PROJECT_INFO.tagline}
            </p>
          </div>

          {/* Quick Metrics Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            <div className="p-3 rounded-xl bg-black/40 border border-stone-800">
              <span className="text-[10px] text-stone-400 uppercase font-mono block">Ambient Drop</span>
              <strong className="text-lg font-bold text-white font-mono">-10°C</strong>
            </div>
            <div className="p-3 rounded-xl bg-black/40 border border-stone-800">
              <span className="text-[10px] text-stone-400 uppercase font-mono block">Recharge / Year</span>
              <strong className="text-lg font-bold text-sky-400 font-mono">5,000,000 L</strong>
            </div>
            <div className="p-3 rounded-xl bg-black/40 border border-stone-800">
              <span className="text-[10px] text-stone-400 uppercase font-mono block">Grid HVAC Energy</span>
              <strong className="text-lg font-bold text-emerald-400 font-mono">0 kW</strong>
            </div>
            <div className="p-3 rounded-xl bg-black/40 border border-stone-800">
              <span className="text-[10px] text-stone-400 uppercase font-mono block">Tanker Savings</span>
              <strong className="text-lg font-bold text-amber-400 font-mono">₹4.8L+</strong>
            </div>
          </div>

          {/* Section 1: Problem Statement */}
          <div>
            <h5 className="text-xs uppercase font-mono tracking-wider text-[#E07A5F] font-bold mb-2">
              1. The Twin Crisis in Indian Concrete Belts (20%)
            </h5>
            <div className="p-4 rounded-xl bg-stone-900/80 border border-stone-800 space-y-2 text-xs leading-relaxed">
              <p>
                <strong>Urban Heat Island (42°C–46°C):</strong> Dense concrete surfaces and split-AC condensers make public community spaces uninhabitable for 5–6 months annually.
              </p>
              <p>
                <strong>The Flood-to-Drought Paradox:</strong> Monsoonal cloudbursts flood basements and roads, yet 80% of stormwater is lost as urban runoff while colonies rely on expensive private tankers weeks later.
              </p>
            </div>
          </div>

          {/* Section 2: The 4 Engineering Tiers */}
          <div>
            <h5 className="text-xs uppercase font-mono tracking-wider text-[#38BDF8] font-bold mb-2">
              2. The 4-Tier Subterranean Architecture (Vision 30% & Execution 15%)
            </h5>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {ARCHITECTURE_TIERS.map((tier) => (
                <div key={tier.id} className="p-3.5 rounded-xl bg-stone-900/80 border border-stone-800 text-xs">
                  <div className="flex items-center justify-between font-bold text-white mb-1">
                    <span>Tier {tier.number}: {tier.name}</span>
                    <span className="text-[10px] font-mono text-[#E07A5F]">{tier.depth}</span>
                  </div>
                  <p className="text-stone-400 text-[11px] leading-snug">{tier.shortDesc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: Built with Gemini & Rubric */}
          <div>
            <h5 className="text-xs uppercase font-mono tracking-wider text-amber-400 font-bold mb-2">
              3. Competition Evaluation Summary (100% Total)
            </h5>
            <div className="space-y-1.5 text-xs">
              {COMPETITION_RUBRIC.map((r, i) => (
                <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-black/30 border border-stone-800">
                  <span className="font-semibold text-stone-200">{r.title}</span>
                  <div className="flex items-center space-x-3">
                    <span className="text-stone-400 font-mono text-[11px]">{r.scoreGrade}</span>
                    <span className="font-bold text-[#E07A5F] font-mono">{r.percentage}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-6 border-t border-stone-800 flex flex-wrap items-center justify-between gap-3 bg-[#19241F] text-xs">
          <span className="text-stone-400 font-mono">
            Competition Submission ready • Theme: Our Community & Living
          </span>
          <div className="flex items-center space-x-2">
            <button
              onClick={handleDownloadMarkdown}
              className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export Dossier .MD</span>
            </button>
            <button
              onClick={handlePrint}
              className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-[#C85A32] hover:bg-[#B34728] text-white font-semibold shadow-md"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Presentation (PDF)</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
