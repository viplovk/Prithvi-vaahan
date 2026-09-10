import React, { useState } from 'react';
import ScrollZoomPrologue from './components/ScrollZoomPrologue';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TwinCrisis from './components/TwinCrisis';
import ArchitectureCutaway from './components/ArchitectureCutaway';
import CommunityImpactCalculator from './components/CommunityImpactCalculator';
import GeminiInnovation from './components/GeminiInnovation';
import Footer from './components/Footer';
import PitchDeckModal from './components/PitchDeckModal';

export default function App() {
  const [pitchModalOpen, setPitchModalOpen] = useState(false);

  const handleScrollToSection = (sectionId: string) => {
    const elem = document.getElementById(sectionId);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0E1512] text-stone-100 font-sans antialiased selection:bg-[#C85A32] selection:text-white">
      {/* Starting Experience: The Two Hands Prologue with Scroll Zoom & Originkit Dither Reveal */}
      <ScrollZoomPrologue
        onEnter={() => handleScrollToSection('hero-section')}
      />

      {/* Sticky Glassmorphism Header */}
      <Navbar
        onOpenPitch={() => setPitchModalOpen(true)}
        onScrollToSimulation={() => handleScrollToSection('calculator')}
      />

      {/* Main Content Sections */}
      <main>
        {/* 1. Hero Section */}
        <Hero
          onExplore={() => handleScrollToSection('architecture')}
          onSimulation={() => handleScrollToSection('calculator')}
        />

        {/* 2. The Twin Crisis: Interactive Problem Comparison */}
        <TwinCrisis />

        {/* 3. The PrithviVahini Architecture: Interactive 4-Tier Cutaway */}
        <ArchitectureCutaway />

        {/* 4. Interactive Community Impact Calculator */}
        <CommunityImpactCalculator />

        {/* 5. Google Gemini Integration & 5-Part Rubric Scoring Breakdown */}
        <GeminiInnovation />
      </main>

      {/* 6. Project Footer & Student Meta */}
      <Footer onOpenPitch={() => setPitchModalOpen(true)} />

      {/* Pitch Deck Presentation Modal */}
      <PitchDeckModal
        isOpen={pitchModalOpen}
        onClose={() => setPitchModalOpen(false)}
      />
    </div>
  );
}
