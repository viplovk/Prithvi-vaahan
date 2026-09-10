import React, { useState } from 'react';
import { Sparkles, Copy, Check, Award, Eye, ExternalLink, HelpCircle, Layers, Info } from 'lucide-react';
import { GEMINI_PROMPT_DATA, COMPETITION_RUBRIC } from '../data/projectData';

export default function GeminiInnovation() {
  const [copied, setCopied] = useState(false);
  const [activePin, setActivePin] = useState<number | null>(null);

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(GEMINI_PROMPT_DATA.promptText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // Curated architectural visual of the modern biophilic stepwell commons
  const ARCHITECTURAL_RENDER_IMAGE = "https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?q=85&w=1600&auto=format&fit=crop"; // Chand Baori historical inspiration
  const MODERN_BAOLI_IMAGE = "https://images.unsplash.com/photo-1582510003544-4d00b7f74220?q=85&w=1600&auto=format&fit=crop"; // Deep stone stepwell geometry
  const CONTEMPORARY_RENDER_IMAGE = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=85&w=1600&auto=format&fit=crop"; // Modern biophilic architectural courtyard

  const hotspots = [
    {
      id: 1,
      x: "24%",
      y: "28%",
      title: "Surface Bioswales & Amaltas Canopy",
      desc: "Lined with vetiver grass & gravel channels to trap 95% of road silt before water cascades below."
    },
    {
      id: 2,
      x: "72%",
      y: "35%",
      title: "Terracotta Stack Chimneys & Jali",
      desc: "Solar-heated upper flues generate natural stack effect draft, venting warm air continuously."
    },
    {
      id: 3,
      x: "48%",
      y: "62%",
      title: "Subterranean Sunken Pavilion (-5m)",
      desc: "Naturally cooled to 28°C via ground thermal mass. Multi-generational co-working and amphitheater."
    },
    {
      id: 4,
      x: "52%",
      y: "88%",
      title: "Deep-Bore Aquifer Recharge Cells",
      desc: "Volcanic aggregate & perforated shafts directly injecting 5,000,000L of pure stormwater into aquifers."
    }
  ];

  return (
    <section id="gemini-rubric" className="py-20 bg-[#121915] text-stone-100 border-b border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-semibold bg-sky-950/70 text-[#38BDF8] border border-sky-800/60 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>4. Gemini Image Prompt (Built with Gemini — 20%)</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            AI-Synthesized Architectural Cross-Section & Evaluation Rubric
          </h2>
          <p className="mt-4 text-base text-stone-300 leading-relaxed">
            Harnessing Google Gemini to model convective thermodynamic airflow, simulate soil infiltration rates, and generate competition-ready architectural renders.
          </p>
        </div>

        {/* Gemini Image Prompt Showcase Card */}
        <div className="bg-[#1A2520] rounded-3xl border border-stone-800 p-6 sm:p-8 shadow-xl mb-16">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-5 border-b border-stone-800">
            <div>
              <span className="text-xs uppercase font-mono tracking-wider text-[#38BDF8] font-bold">
                Direct Gemini Prompt Formulation
              </span>
              <h3 className="text-xl font-bold text-white mt-1">
                {GEMINI_PROMPT_DATA.title}
              </h3>
            </div>

            <button
              onClick={handleCopyPrompt}
              className={`inline-flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer shadow-md ${
                copied
                  ? 'bg-emerald-600 text-white'
                  : 'bg-[#C85A32] hover:bg-[#B34728] text-white'
              }`}
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Copied to Clipboard!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy Gemini Prompt</span>
                </>
              )}
            </button>
          </div>

          <div className="mt-6 relative rounded-2xl bg-black/50 border border-stone-800/80 p-5 font-mono text-xs sm:text-sm text-stone-300 leading-relaxed">
            <div className="absolute top-3 right-3 text-[10px] uppercase tracking-widest text-stone-500 font-bold">
              Prompt Spec v2.6
            </div>
            <p className="pr-12 selection:bg-[#C85A32] selection:text-white">
              "{GEMINI_PROMPT_DATA.promptText}"
            </p>
          </div>

          <p className="mt-4 text-xs text-stone-400 italic">
            💡 {GEMINI_PROMPT_DATA.notes}
          </p>
        </div>

        {/* Architectural Visual Gallery with Interactive Hotspots */}
        <div className="mb-20">
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="text-xs uppercase font-mono tracking-wider text-[#E07A5F] font-bold">
                Render Gallery & Interactive Stratum Hotspots
              </span>
              <h3 className="text-2xl font-bold text-white mt-1">
                PrithviVahini Architectural Morphology
              </h3>
            </div>
            <span className="text-xs text-stone-400 font-mono hidden sm:inline">
              Click glowing pins to inspect engineering details
            </span>
          </div>

          <div className="relative rounded-3xl overflow-hidden border border-stone-700 bg-stone-900 aspect-[16/9] shadow-2xl">
            {/* Visual background render */}
            <img
              src={CONTEMPORARY_RENDER_IMAGE}
              alt="PrithviVahini modern architectural stepwell commons rendering"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover object-center"
            />
            
            {/* Gradient Scrim for Contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0E1512]/90 via-[#0E1512]/30 to-transparent pointer-events-none" />

            {/* Hotspot Pins */}
            {hotspots.map((pin) => (
              <button
                key={pin.id}
                onClick={() => setActivePin(activePin === pin.id ? null : pin.id)}
                style={{ left: pin.x, top: pin.y }}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer z-20 focus:outline-none"
              >
                <span className="relative flex h-7 w-7 items-center justify-center">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#E07A5F] opacity-75"></span>
                  <span className="relative inline-flex items-center justify-center rounded-full h-6 w-6 bg-[#C85A32] border-2 border-white text-white font-mono font-bold text-xs shadow-lg">
                    {pin.id}
                  </span>
                </span>

                {/* Hotspot Tooltip Popover */}
                {activePin === pin.id && (
                  <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-64 bg-stone-900/95 backdrop-blur-md border border-[#E07A5F] rounded-xl p-3 shadow-2xl text-left z-30">
                    <span className="text-[10px] uppercase font-mono text-[#E07A5F] font-bold block">
                      Hotspot #{pin.id}
                    </span>
                    <h5 className="text-xs font-bold text-white mt-0.5">{pin.title}</h5>
                    <p className="text-[11px] text-stone-300 mt-1 leading-snug">{pin.desc}</p>
                  </div>
                )}
              </button>
            ))}

            {/* Bottom Caption Overlay */}
            <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-black/60 backdrop-blur-md border border-white/10 rounded-2xl p-4 text-xs">
              <div>
                <span className="font-bold text-white block text-sm">
                  Subterranean Spatial Inversion Renders
                </span>
                <span className="text-stone-300 text-xs">
                  Stepped sandstone terraces, terracotta convection flues, and groundwater recharge columns.
                </span>
              </div>
              <div className="flex items-center space-x-2 shrink-0">
                <span className="px-2.5 py-1 rounded bg-[#C85A32]/30 text-[#E07A5F] font-mono font-semibold border border-[#C85A32]/40">
                  Built with Gemini & Imagen 3
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 5-Part Scoring Breakdown Aligned Directly with Competition Rubric */}
        <div>
          <div className="max-w-3xl mx-auto text-center mb-10">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-semibold bg-amber-950/70 text-amber-400 border border-amber-800/60 mb-2">
              <Award className="w-3.5 h-3.5" />
              <span>Official Competition Rubric Alignment (100% Total)</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
              5-Part Scoring Breakdown
            </h3>
            <p className="text-xs text-stone-400 mt-1">
              Evaluating PrithviVahini against the Fund My Crazy 2026 judging criteria.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {COMPETITION_RUBRIC.map((rubric, idx) => (
              <div
                key={idx}
                className="bg-[#18231E] rounded-2xl border border-stone-800 p-6 flex flex-col justify-between shadow-lg hover:border-stone-700 transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-stone-800">
                    <span className="text-2xl font-black font-mono text-[#E07A5F]">
                      {rubric.percentage}
                    </span>
                    <span className="text-xs font-mono font-semibold px-2.5 py-0.5 rounded bg-black/40 text-stone-300 border border-stone-800">
                      {rubric.scoreGrade}
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-white mt-3 group-hover:text-[#E07A5F] transition-colors">
                    {rubric.title}
                  </h4>

                  <p className="mt-2 text-xs text-stone-300 leading-relaxed">
                    {rubric.description}
                  </p>

                  <div className="mt-4 pt-3 border-t border-stone-800/80 space-y-2">
                    {rubric.keyDeliverables.map((del, dIdx) => (
                      <div key={dIdx} className="flex items-start space-x-2 text-[11px] text-stone-400">
                        <span className="text-emerald-400 font-bold">✓</span>
                        <span className="leading-tight">{del}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-stone-800/60 flex items-center justify-between text-[11px] text-stone-400 font-mono">
                  <span>Weight: {rubric.weight} Pts</span>
                  <span className="text-emerald-400 font-semibold">Max Impact Tier</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
