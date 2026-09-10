import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { 
  Box, 
  RotateCw, 
  Eye, 
  Layers, 
  Thermometer, 
  Droplets, 
  Maximize2, 
  Minimize2, 
  Compass, 
  Sparkles, 
  Wind, 
  Info,
  ChevronRight
} from 'lucide-react';
import { ARCHITECTURE_TIERS } from '../data/projectData';

export default function ThreeDModelMap() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [selectedTier, setSelectedTier] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<'realistic' | 'thermal' | 'xray'>('realistic');
  const [isAutoRotate, setIsAutoRotate] = useState(true);
  const [showFlows, setShowFlows] = useState(true);
  const [cameraPreset, setCameraPreset] = useState<'iso' | 'cutaway' | 'underground' | 'top'>('iso');
  const [isFullscreen, setIsFullscreen] = useState(false);

  // References for three.js manipulation outside the render loop
  const controlsRef = useRef<OrbitControls | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const materialsRef = useRef<{ [key: string]: THREE.Material }>({});
  const flowParticlesRef = useRef<{ water: THREE.Points; air: THREE.Points } | null>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight || 550;

    // 1. Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(0x0a120e);
    scene.fog = new THREE.FogExp2(0x0a120e, 0.022);

    // 2. Camera setup
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(28, 22, 32);
    cameraRef.current = camera;

    // 3. Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // 4. Orbit Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxPolarAngle = Math.PI / 2 + 0.05; // don't go too far below ground
    controls.minDistance = 10;
    controls.maxDistance = 80;
    controls.autoRotate = isAutoRotate;
    controls.autoRotateSpeed = 1.2;
    controls.target.set(0, -2, 0);
    controlsRef.current = controls;

    // 5. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xfffaed, 1.4);
    sunLight.position.set(25, 40, 20);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 2048;
    sunLight.shadow.mapSize.height = 2048;
    sunLight.shadow.bias = -0.0005;
    scene.add(sunLight);

    // Soft subterranean fill lights (cool cyan for groundwater, warm terracotta for towers)
    const subterraneanLight = new THREE.PointLight(0x38bdf8, 2.5, 30);
    subterraneanLight.position.set(0, -6, 0);
    scene.add(subterraneanLight);

    const thermalFillLight = new THREE.PointLight(0xe07a5f, 1.8, 25);
    thermalFillLight.position.set(6, 4, 6);
    scene.add(thermalFillLight);

    // 6. Materials definition
    const materials = {
      ground: new THREE.MeshStandardMaterial({ color: 0x1f2b23, roughness: 0.9, metalness: 0.1 }),
      concreteEdge: new THREE.MeshStandardMaterial({ color: 0x3d4b43, roughness: 0.7 }),
      terracotta: new THREE.MeshStandardMaterial({ color: 0xc85a32, roughness: 0.65, metalness: 0.1 }),
      sandstone: new THREE.MeshStandardMaterial({ color: 0xd4a373, roughness: 0.8 }),
      water: new THREE.MeshStandardMaterial({ color: 0x0ea5e9, roughness: 0.1, metalness: 0.2, transparent: true, opacity: 0.85 }),
      deepAquifer: new THREE.MeshStandardMaterial({ color: 0x0369a1, roughness: 0.4, transparent: true, opacity: 0.7 }),
      strataGravel: new THREE.MeshStandardMaterial({ color: 0x57534e, roughness: 0.95 }),
      treeTrunk: new THREE.MeshStandardMaterial({ color: 0x44403c, roughness: 0.9 }),
      foliage: new THREE.MeshStandardMaterial({ color: 0x166534, roughness: 0.8 }),
      glassDome: new THREE.MeshPhysicalMaterial({ color: 0xffffff, transparent: true, opacity: 0.25, roughness: 0.1, transmission: 0.9, thickness: 0.5 }),
    };
    materialsRef.current = materials;

    // Group for the entire complex
    const complexGroup = new THREE.Group();
    scene.add(complexGroup);

    // --- GEOMETRY CREATION ---

    // A. Ground Crust & Surrounding Urban Context
    const groundSize = 42;
    const groundShape = new THREE.Shape();
    groundShape.moveTo(-groundSize / 2, -groundSize / 2);
    groundShape.lineTo(groundSize / 2, -groundSize / 2);
    groundShape.lineTo(groundSize / 2, groundSize / 2);
    groundShape.lineTo(-groundSize / 2, groundSize / 2);
    groundShape.closePath();

    // Cut a circular hole for the inverted stepwell
    const holePath = new THREE.Path();
    const wellRadius = 10;
    holePath.absarc(0, 0, wellRadius, 0, Math.PI * 2, true);
    groundShape.holes.push(holePath);

    const extrudeSettings = { depth: 1.2, bevelEnabled: false };
    const groundGeo = new THREE.ExtrudeGeometry(groundShape, extrudeSettings);
    groundGeo.rotateX(Math.PI / 2);
    const groundMesh = new THREE.Mesh(groundGeo, materials.ground);
    groundMesh.position.y = 0;
    groundMesh.receiveShadow = true;
    complexGroup.add(groundMesh);

    // Outer Urban Border (Concrete sidewalk ring)
    const ringGeo = new THREE.RingGeometry(wellRadius, wellRadius + 1.8, 36);
    ringGeo.rotateX(-Math.PI / 2);
    const ringMesh = new THREE.Mesh(ringGeo, materials.concreteEdge);
    ringMesh.position.y = 0.02;
    ringMesh.receiveShadow = true;
    complexGroup.add(ringMesh);

    // B. Tier 1: Surface Bioswales & Trees
    const bioswaleRing = new THREE.RingGeometry(wellRadius + 1.8, wellRadius + 4.5, 36);
    bioswaleRing.rotateX(-Math.PI / 2);
    const bioswaleMesh = new THREE.Mesh(bioswaleRing, new THREE.MeshStandardMaterial({ color: 0x22543d, roughness: 0.9 }));
    bioswaleMesh.position.y = 0.04;
    bioswaleMesh.name = "Tier 1: Surface Bioswale";
    complexGroup.add(bioswaleMesh);

    // Procedural Low-Poly Trees around perimeter
    const treeCount = 14;
    for (let i = 0; i < treeCount; i++) {
      const angle = (i / treeCount) * Math.PI * 2 + (Math.random() * 0.2);
      const dist = wellRadius + 3.2;
      const x = Math.cos(angle) * dist;
      const z = Math.sin(angle) * dist;

      // Tree trunk
      const trunkGeo = new THREE.CylinderGeometry(0.18, 0.25, 1.6, 6);
      const trunk = new THREE.Mesh(trunkGeo, materials.treeTrunk);
      trunk.position.set(x, 0.8, z);
      trunk.castShadow = true;
      complexGroup.add(trunk);

      // Foliage layers
      const foliageGeo = new THREE.ConeGeometry(1.1, 2.2, 7);
      const foliage = new THREE.Mesh(foliageGeo, materials.foliage);
      foliage.position.set(x, 2.2, z);
      foliage.castShadow = true;
      complexGroup.add(foliage);
    }

    // C. Tier 2: Terracotta Convection Chimneys & Wind Funnels
    const chimneyPositions = [
      { x: 7.2, z: 0 },
      { x: -7.2, z: 0 },
      { x: 0, z: 7.2 },
      { x: 0, z: -7.2 },
      { x: 5.1, z: 5.1 },
      { x: -5.1, z: -5.1 }
    ];

    chimneyPositions.forEach((pos, idx) => {
      // Tall hollow chimney
      const towerHeight = 7.5;
      const towerGeo = new THREE.CylinderGeometry(0.7, 0.95, towerHeight, 16);
      const tower = new THREE.Mesh(towerGeo, materials.terracotta);
      // Origin spans from -3.5m below to +4m above surface
      tower.position.set(pos.x, 0.5, pos.z);
      tower.castShadow = true;
      tower.receiveShadow = true;
      tower.name = `Tier 2: Chimney ${idx + 1}`;
      complexGroup.add(tower);

      // Top Wind Scoop Cap
      const capGeo = new THREE.ConeGeometry(1.2, 0.8, 16);
      const cap = new THREE.Mesh(capGeo, new THREE.MeshStandardMaterial({ color: 0x9c3d1d, roughness: 0.6 }));
      cap.position.set(pos.x, 4.4, pos.z);
      cap.castShadow = true;
      complexGroup.add(cap);

      // Flue Base Vent Grille (lattice)
      const grilleGeo = new THREE.TorusGeometry(0.9, 0.1, 8, 16);
      grilleGeo.rotateX(Math.PI / 2);
      const grille = new THREE.Mesh(grilleGeo, materials.concreteEdge);
      grille.position.set(pos.x, 0.05, pos.z);
      complexGroup.add(grille);
    });

    // D. Tier 3: Inverted Stepped Well (Baoli Commons)
    const tiersSteps = 7;
    for (let s = 0; s < tiersSteps; s++) {
      const topR = wellRadius - (s * 0.9);
      const btmR = topR - 0.75;
      const stepDepth = 0.9;
      const stepY = -(s * stepDepth) - 0.45;

      const stepGeo = new THREE.CylinderGeometry(topR, btmR, stepDepth, 32, 1, true);
      const stepMesh = new THREE.Mesh(stepGeo, materials.sandstone);
      stepMesh.position.y = stepY;
      stepMesh.receiveShadow = true;
      complexGroup.add(stepMesh);

      // Flat terrace ring for each step
      const terraceRing = new THREE.RingGeometry(btmR, topR, 32);
      terraceRing.rotateX(-Math.PI / 2);
      const terraceMesh = new THREE.Mesh(terraceRing, materials.sandstone);
      terraceMesh.position.y = stepY - (stepDepth / 2);
      terraceMesh.receiveShadow = true;
      complexGroup.add(terraceMesh);
    }

    // Tier 3 Commons Floor & Central Water Reservoir
    const floorRadius = wellRadius - (tiersSteps * 0.9); // ~3.7m
    const poolRadius = 2.4;

    // Stone Pavilion Plaza Ring
    const floorRingGeo = new THREE.RingGeometry(poolRadius, floorRadius, 32);
    floorRingGeo.rotateX(-Math.PI / 2);
    const floorMesh = new THREE.Mesh(floorRingGeo, new THREE.MeshStandardMaterial({ color: 0xb08968, roughness: 0.7 }));
    floorMesh.position.y = -6.4;
    floorMesh.receiveShadow = true;
    complexGroup.add(floorMesh);

    // Reflecting Pool Surface
    const waterGeo = new THREE.CircleGeometry(poolRadius, 32);
    waterGeo.rotateX(-Math.PI / 2);
    const waterMesh = new THREE.Mesh(waterGeo, materials.water);
    waterMesh.position.y = -6.35;
    waterMesh.name = "Tier 3: Water Reservoir";
    complexGroup.add(waterMesh);

    // Stepwell Columns & Archways (ancient structural aesthetics)
    const columnCount = 8;
    for (let c = 0; c < columnCount; c++) {
      const angle = (c / columnCount) * Math.PI * 2;
      const cx = Math.cos(angle) * (poolRadius + 0.8);
      const cz = Math.sin(angle) * (poolRadius + 0.8);

      const colGeo = new THREE.BoxGeometry(0.35, 3.2, 0.35);
      const col = new THREE.Mesh(colGeo, materials.sandstone);
      col.position.set(cx, -4.8, cz);
      col.castShadow = true;
      col.receiveShadow = true;
      complexGroup.add(col);
    }

    // E. Tier 4: Deep Gravel Infiltration Strata & Aquifer Basin (-6.5m to -14m)
    const deepStrataGeo = new THREE.CylinderGeometry(poolRadius + 0.3, poolRadius + 1.2, 6.5, 24);
    const deepStrataMesh = new THREE.Mesh(deepStrataGeo, materials.strataGravel);
    deepStrataMesh.position.y = -10.0;
    deepStrataMesh.receiveShadow = true;
    complexGroup.add(deepStrataMesh);

    // Aquifer Infiltration Chamber (Glowing blue subterranean reservoir)
    const aquiferChamberGeo = new THREE.CylinderGeometry(poolRadius + 2.8, poolRadius + 3.4, 3.0, 24);
    const aquiferMesh = new THREE.Mesh(aquiferChamberGeo, materials.deepAquifer);
    aquiferMesh.position.y = -14.2;
    complexGroup.add(aquiferMesh);

    // Geological Cutaway Walls (To showcase soil stratum in 3D)
    const wallGeo = new THREE.BoxGeometry(groundSize, 15, 0.8);
    const cutawayMat = new THREE.MeshStandardMaterial({ 
      color: 0x18241d, 
      roughness: 0.95,
      wireframe: false 
    });
    
    // Front slice cutaway showing subterranean profile
    const backWall = new THREE.Mesh(wallGeo, cutawayMat);
    backWall.position.set(0, -7.5, -groundSize / 2);
    complexGroup.add(backWall);

    const leftWall = new THREE.Mesh(wallGeo, cutawayMat);
    leftWall.rotateY(Math.PI / 2);
    leftWall.position.set(-groundSize / 2, -7.5, 0);
    complexGroup.add(leftWall);

    // F. PARTICLE FLOW SYSTEMS (Animated Water Infiltration & Convection Air)
    
    // 1. Water Infiltration Particles (Blue droplets flowing down from surface into aquifer)
    const waterParticleCount = 450;
    const waterGeoP = new THREE.BufferGeometry();
    const waterPos = new Float32Array(waterParticleCount * 3);
    const waterSpeed = new Float32Array(waterParticleCount);

    for (let i = 0; i < waterParticleCount; i++) {
      // Infiltration starts near bioswales or steps
      const rad = Math.random() * 7.5;
      const ang = Math.random() * Math.PI * 2;
      waterPos[i * 3] = Math.cos(ang) * rad;
      waterPos[i * 3 + 1] = -(Math.random() * 14); // Y from 0 to -14
      waterPos[i * 3 + 2] = Math.sin(ang) * rad;
      waterSpeed[i] = 0.05 + Math.random() * 0.06;
    }

    waterGeoP.setAttribute('position', new THREE.BufferAttribute(waterPos, 3));
    const waterMatP = new THREE.PointsMaterial({
      color: 0x38bdf8,
      size: 0.28,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending
    });
    const waterParticles = new THREE.Points(waterGeoP, waterMatP);
    complexGroup.add(waterParticles);

    // 2. Warm Air Thermal Updraft Particles (Rising out of chimneys)
    const airParticleCount = 300;
    const airGeoP = new THREE.BufferGeometry();
    const airPos = new Float32Array(airParticleCount * 3);
    const airSpeed = new Float32Array(airParticleCount);
    const chimneyIndices = new Uint8Array(airParticleCount);

    for (let i = 0; i < airParticleCount; i++) {
      const cIdx = Math.floor(Math.random() * chimneyPositions.length);
      chimneyIndices[i] = cIdx;
      const targetChimney = chimneyPositions[cIdx];
      const jitter = (Math.random() - 0.5) * 0.6;
      airPos[i * 3] = targetChimney.x + jitter;
      airPos[i * 3 + 1] = -3 + Math.random() * 9; // Y rising from lower pavilion through chimney
      airPos[i * 3 + 2] = targetChimney.z + jitter;
      airSpeed[i] = 0.04 + Math.random() * 0.05;
    }

    airGeoP.setAttribute('position', new THREE.BufferAttribute(airPos, 3));
    const airMatP = new THREE.PointsMaterial({
      color: 0xf59e0b, // warm amber rising air
      size: 0.32,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending
    });
    const airParticles = new THREE.Points(airGeoP, airMatP);
    complexGroup.add(airParticles);

    flowParticlesRef.current = { water: waterParticles, air: airParticles };

    // 7. Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      // Controls update
      controls.update();

      // Flow particle animation
      if (showFlows) {
        // Update Water Drop Infiltration
        const wPositions = waterGeoP.attributes.position.array as Float32Array;
        for (let i = 0; i < waterParticleCount; i++) {
          wPositions[i * 3 + 1] -= waterSpeed[i];
          if (wPositions[i * 3 + 1] < -14.5) {
            wPositions[i * 3 + 1] = 0.2; // reset to surface
            const rad = Math.random() * 7.5;
            const ang = Math.random() * Math.PI * 2;
            wPositions[i * 3] = Math.cos(ang) * rad;
            wPositions[i * 3 + 2] = Math.sin(ang) * rad;
          }
        }
        waterGeoP.attributes.position.needsUpdate = true;

        // Update Rising Warm Air Updraft
        const aPositions = airGeoP.attributes.position.array as Float32Array;
        for (let i = 0; i < airParticleCount; i++) {
          aPositions[i * 3 + 1] += airSpeed[i];
          if (aPositions[i * 3 + 1] > 6.5) {
            aPositions[i * 3 + 1] = -4.0; // reset to subterranean tier
            const cIdx = chimneyIndices[i];
            const target = chimneyPositions[cIdx];
            const jitter = (Math.random() - 0.5) * 0.6;
            aPositions[i * 3] = target.x + jitter;
            aPositions[i * 3 + 2] = target.z + jitter;
          }
        }
        airGeoP.attributes.position.needsUpdate = true;
      }

      // Water ripple slight bobbing
      waterMesh.position.y = -6.35 + Math.sin(elapsedTime * 1.5) * 0.04;

      renderer.render(scene, camera);
    };

    animate();

    // 8. Resize Handler
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight || 550;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      renderer.dispose();
      if (container && renderer.domElement) {
        container.innerHTML = '';
      }
    };
  }, []);

  // Update Auto-Rotate state
  useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.autoRotate = isAutoRotate;
    }
  }, [isAutoRotate]);

  // Update Particle visibility
  useEffect(() => {
    if (flowParticlesRef.current) {
      flowParticlesRef.current.water.visible = showFlows;
      flowParticlesRef.current.air.visible = showFlows;
    }
  }, [showFlows]);

  // Handle camera presets
  const handleSetPreset = (preset: 'iso' | 'cutaway' | 'underground' | 'top') => {
    setCameraPreset(preset);
    const camera = cameraRef.current;
    const controls = controlsRef.current;
    if (!camera || !controls) return;

    if (preset === 'iso') {
      camera.position.set(26, 22, 30);
      controls.target.set(0, -2, 0);
    } else if (preset === 'cutaway') {
      camera.position.set(0, 4, 36);
      controls.target.set(0, -5, 0);
    } else if (preset === 'underground') {
      camera.position.set(6, -7, 14);
      controls.target.set(0, -6, 0);
    } else if (preset === 'top') {
      camera.position.set(0, 42, 0.1);
      controls.target.set(0, 0, 0);
    }
    controls.update();
  };

  // Switch shading / color modes
  const handleSetViewMode = (mode: 'realistic' | 'thermal' | 'xray') => {
    setViewMode(mode);
    const mats = materialsRef.current;
    if (!mats) return;

    if (mode === 'realistic') {
      (mats.ground as THREE.MeshStandardMaterial).color.setHex(0x1f2b23);
      (mats.sandstone as THREE.MeshStandardMaterial).color.setHex(0xd4a373);
      (mats.terracotta as THREE.MeshStandardMaterial).color.setHex(0xc85a32);
      (mats.water as THREE.MeshStandardMaterial).color.setHex(0x0ea5e9);
      (mats.water as THREE.MeshStandardMaterial).opacity = 0.85;
      (mats.sandstone as THREE.MeshStandardMaterial).wireframe = false;
      (mats.ground as THREE.MeshStandardMaterial).wireframe = false;
    } else if (mode === 'thermal') {
      // Thermal Heatmap: Hot surface red (45°C) -> Cool subterranean blue (24°C)
      (mats.ground as THREE.MeshStandardMaterial).color.setHex(0xb91c1c); // Hot red
      (mats.terracotta as THREE.MeshStandardMaterial).color.setHex(0xf97316); // Warm orange
      (mats.sandstone as THREE.MeshStandardMaterial).color.setHex(0x0284c7); // Cool blue steps
      (mats.water as THREE.MeshStandardMaterial).color.setHex(0x06b6d4); // Cyan chilled pool
      (mats.water as THREE.MeshStandardMaterial).opacity = 0.95;
      (mats.sandstone as THREE.MeshStandardMaterial).wireframe = false;
      (mats.ground as THREE.MeshStandardMaterial).wireframe = false;
    } else if (mode === 'xray') {
      // Wireframe / Structural X-Ray Mode
      (mats.ground as THREE.MeshStandardMaterial).color.setHex(0x10b981);
      (mats.sandstone as THREE.MeshStandardMaterial).color.setHex(0x38bdf8);
      (mats.terracotta as THREE.MeshStandardMaterial).color.setHex(0xe07a5f);
      (mats.sandstone as THREE.MeshStandardMaterial).wireframe = true;
      (mats.ground as THREE.MeshStandardMaterial).wireframe = true;
    }
  };

  const currentTierData = selectedTier !== null ? ARCHITECTURE_TIERS[selectedTier] : null;

  return (
    <section id="3d-map" className="py-20 bg-[#0A110E] text-stone-100 border-t border-stone-800 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-semibold bg-[#C85A32]/20 text-[#E07A5F] border border-[#C85A32]/30 mb-3">
              <Box className="w-3.5 h-3.5" />
              <span>Interactive Spatial Simulation</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              3D Structural Map & Geothermal Flow
            </h2>
            <p className="mt-2 text-stone-400 text-sm sm:text-base max-w-2xl font-light">
              Explore the inverted stepwell in full 360° 3D. Inspect the 4 ecological strata, animated convection flues, and subterranean aquifer recharge pathways.
            </p>
          </div>

          {/* Quick Help Badge */}
          <div className="flex items-center space-x-2 text-xs text-stone-400 bg-stone-900/80 px-3.5 py-2 rounded-xl border border-stone-800">
            <Compass className="w-4 h-4 text-[#E07A5F]" />
            <span>Click & drag to orbit • Right-click to pan • Scroll to zoom</span>
          </div>
        </div>

        {/* 3D Viewport Card */}
        <div className={`relative rounded-3xl bg-[#111A15] border border-stone-800 shadow-2xl overflow-hidden transition-all ${
          isFullscreen ? 'fixed inset-4 z-50 rounded-2xl h-[calc(100vh-2rem)]' : 'h-[620px] w-full'
        }`}>
          
          {/* Top Floating Control Bar */}
          <div className="absolute top-4 left-4 right-4 z-20 flex flex-wrap items-center justify-between gap-3 pointer-events-none">
            
            {/* Camera Presets */}
            <div className="flex items-center space-x-1 bg-black/60 backdrop-blur-md p-1.5 rounded-xl border border-white/10 pointer-events-auto">
              <span className="text-[10px] uppercase font-mono text-stone-400 px-2">Angle:</span>
              <button
                onClick={() => handleSetPreset('iso')}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                  cameraPreset === 'iso' ? 'bg-[#C85A32] text-white shadow-sm' : 'text-stone-300 hover:text-white'
                }`}
              >
                Isometric
              </button>
              <button
                onClick={() => handleSetPreset('cutaway')}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                  cameraPreset === 'cutaway' ? 'bg-[#C85A32] text-white shadow-sm' : 'text-stone-300 hover:text-white'
                }`}
              >
                Cutaway
              </button>
              <button
                onClick={() => handleSetPreset('underground')}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                  cameraPreset === 'underground' ? 'bg-[#C85A32] text-white shadow-sm' : 'text-stone-300 hover:text-white'
                }`}
              >
                Subterranean
              </button>
              <button
                onClick={() => handleSetPreset('top')}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                  cameraPreset === 'top' ? 'bg-[#C85A32] text-white shadow-sm' : 'text-stone-300 hover:text-white'
                }`}
              >
                Top-Down
              </button>
            </div>

            {/* Visual Shader Mode & Controls */}
            <div className="flex items-center space-x-2 bg-black/60 backdrop-blur-md p-1.5 rounded-xl border border-white/10 pointer-events-auto text-xs">
              {/* Shading Mode */}
              <div className="flex items-center space-x-1 pr-2 border-r border-white/10">
                <button
                  onClick={() => handleSetViewMode('realistic')}
                  className={`px-2 py-1 rounded-lg transition-all ${
                    viewMode === 'realistic' ? 'bg-stone-700 text-white font-semibold' : 'text-stone-400 hover:text-white'
                  }`}
                  title="Biophilic Materials (Terracotta, Stone, Greenery)"
                >
                  Biophilic
                </button>
                <button
                  onClick={() => handleSetViewMode('thermal')}
                  className={`px-2 py-1 rounded-lg transition-all flex items-center space-x-1 ${
                    viewMode === 'thermal' ? 'bg-red-900/70 text-red-200 font-semibold border border-red-700/60' : 'text-stone-400 hover:text-white'
                  }`}
                  title="Thermal Heat Gradient (Surface 45°C down to Subterranean 24°C)"
                >
                  <Thermometer className="w-3 h-3 text-red-400" />
                  <span>Thermal</span>
                </button>
                <button
                  onClick={() => handleSetViewMode('xray')}
                  className={`px-2 py-1 rounded-lg transition-all ${
                    viewMode === 'xray' ? 'bg-sky-900/70 text-sky-200 font-semibold' : 'text-stone-400 hover:text-white'
                  }`}
                  title="Structural Wireframe Mode"
                >
                  X-Ray
                </button>
              </div>

              {/* Particle Flow Toggle */}
              <button
                onClick={() => setShowFlows(!showFlows)}
                className={`px-2.5 py-1 rounded-lg transition-all flex items-center space-x-1.5 ${
                  showFlows ? 'text-sky-300 bg-sky-950/60 border border-sky-800/60' : 'text-stone-400'
                }`}
                title="Toggle Active Water & Air Convection Streams"
              >
                <Droplets className="w-3 h-3" />
                <span>Flows: {showFlows ? 'ON' : 'OFF'}</span>
              </button>

              {/* Auto-Rotate Toggle */}
              <button
                onClick={() => setIsAutoRotate(!isAutoRotate)}
                className={`p-1.5 rounded-lg transition-colors ${
                  isAutoRotate ? 'text-[#E07A5F] bg-[#C85A32]/20' : 'text-stone-400 hover:text-white'
                }`}
                title={isAutoRotate ? "Pause 3D Turntable" : "Start 3D Turntable Rotation"}
              >
                <RotateCw className={`w-3.5 h-3.5 ${isAutoRotate ? 'animate-spin' : ''}`} />
              </button>

              {/* Fullscreen Expand */}
              <button
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="p-1.5 rounded-lg text-stone-400 hover:text-white transition-colors"
                title={isFullscreen ? "Exit Fullscreen" : "Expand Fullscreen"}
              >
                {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {/* WebGL 3D Canvas Mount Point */}
          <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

          {/* Bottom Left Legend: Flow Dynamics */}
          <div className="absolute bottom-4 left-4 z-20 pointer-events-auto bg-black/70 backdrop-blur-md border border-white/10 rounded-2xl p-3.5 text-xs text-stone-300 max-w-xs shadow-xl">
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#E07A5F] font-bold block mb-2">
              Thermodynamic & Infiltration Keys
            </span>
            <div className="space-y-1.5 text-[11px]">
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400 shadow-sm shadow-amber-400/50 inline-block" />
                <span>Convective Updraft (Warm Air expelled via flues)</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-sky-400 shadow-sm shadow-sky-400/50 inline-block" />
                <span>Gravity Infiltration (Rainwater percolates down)</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#C85A32] inline-block" />
                <span>Passive Terracotta Jali Cooling Flues</span>
              </div>
            </div>
          </div>

          {/* Bottom Right Tier Quick Selector */}
          <div className="absolute bottom-4 right-4 z-20 pointer-events-auto flex flex-col sm:flex-row items-end sm:items-center space-y-2 sm:space-y-0 sm:space-x-1.5 bg-black/70 backdrop-blur-md border border-white/10 p-1.5 rounded-2xl">
            <span className="text-[10px] uppercase font-mono text-stone-400 px-2 hidden sm:inline">Inspect:</span>
            {ARCHITECTURE_TIERS.map((tier, idx) => (
              <button
                key={tier.id}
                onClick={() => {
                  setSelectedTier(selectedTier === idx ? null : idx);
                  if (idx === 0) handleSetPreset('top');
                  if (idx === 1) handleSetPreset('iso');
                  if (idx === 2) handleSetPreset('cutaway');
                  if (idx === 3) handleSetPreset('underground');
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center space-x-1.5 ${
                  selectedTier === idx
                    ? 'bg-[#C85A32] text-white shadow-md'
                    : 'bg-stone-900/80 text-stone-300 hover:text-white border border-stone-800'
                }`}
              >
                <span>T{tier.number}</span>
                <span className="text-[10px] opacity-75 font-mono">{tier.depth}</span>
              </button>
            ))}
          </div>

          {/* Selected Tier Detail Overlay Card */}
          {currentTierData && (
            <div className="absolute top-20 left-4 z-20 pointer-events-auto max-w-sm w-full bg-[#141C18]/95 backdrop-blur-md border border-[#C85A32]/50 p-4 rounded-2xl shadow-2xl text-xs text-stone-200 animate-fade-in">
              <div className="flex items-center justify-between pb-2 border-b border-stone-700">
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-[#E07A5F] animate-ping" />
                  <span className="font-mono text-[#E07A5F] font-bold">
                    TIER {currentTierData.number} INSPECTION
                  </span>
                </div>
                <span className="font-mono text-stone-400">{currentTierData.depth}</span>
              </div>

              <h4 className="text-sm font-bold text-white mt-2">
                {currentTierData.name}
              </h4>
              <p className="mt-1 text-stone-300 text-[11px] leading-relaxed">
                {currentTierData.shortDesc}
              </p>

              <div className="mt-3 grid grid-cols-2 gap-2 text-[10px] font-mono">
                <div className="bg-black/40 p-2 rounded-lg border border-stone-800">
                  <span className="text-stone-400 block">TEMPERATURE:</span>
                  <span className="text-emerald-400 font-bold text-xs">{currentTierData.temperature}</span>
                </div>
                <div className="bg-black/40 p-2 rounded-lg border border-stone-800">
                  <span className="text-stone-400 block">WATER FLOW:</span>
                  <span className="text-sky-400 font-bold text-xs">{currentTierData.waterFlowRate}</span>
                </div>
              </div>

              <button
                onClick={() => setSelectedTier(null)}
                className="mt-3 w-full py-1 text-center text-[10px] text-stone-400 hover:text-white uppercase tracking-wider"
              >
                Close Inspector
              </button>
            </div>
          )}

        </div>

      </div>
    </section>
  );
}
