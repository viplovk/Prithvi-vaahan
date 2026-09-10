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
  Sun, 
  Moon, 
  CloudRain, 
  Play, 
  Pause, 
  Building2, 
  Car, 
  Users, 
  Activity,
  Zap,
  Info,
  X
} from 'lucide-react';
import { ARCHITECTURE_TIERS } from '../data/projectData';

export default function ThreeDModelMap() {
  const mountRef = useRef<HTMLDivElement>(null);
  
  // UI & Simulation State
  const [selectedDistrict, setSelectedDistrict] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'realistic' | 'thermal' | 'xray'>('realistic');
  const [isAutoRotate, setIsAutoRotate] = useState(false);
  const [showFlows, setShowFlows] = useState(true);
  const [isNight, setIsNight] = useState(false);
  const [showNightLightingInfo, setShowNightLightingInfo] = useState(true);
  const [isRaining, setIsRaining] = useState(false);
  const [trafficRunning, setTrafficRunning] = useState(true);
  const [cameraPreset, setCameraPreset] = useState<'town' | 'stepwell' | 'residential' | 'market' | 'underground'>('town');
  const [isFullscreen, setIsFullscreen] = useState(false);

  // References to communicate with Three.js animation loop without re-instantiating scene
  const controlsRef = useRef<OrbitControls | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const animFlagsRef = useRef({
    isNight: false,
    isRaining: false,
    trafficRunning: true,
    viewMode: 'realistic',
    showFlows: true
  });

  // Lights & Dynamic Material refs
  const lightsRef = useRef<{
    sun: THREE.DirectionalLight;
    ambient: THREE.AmbientLight;
    subterranean: THREE.PointLight;
    sanctuaryMoonBeam: THREE.DirectionalLight;
    sanctuaryBioLight: THREE.PointLight;
    terracottaCoreLight: THREE.PointLight;
    nightCityLights: THREE.Group;
  } | null>(null);

  const materialsRef = useRef<{ [key: string]: THREE.Material }>({});

  useEffect(() => {
    animFlagsRef.current.isNight = isNight;
  }, [isNight]);

  useEffect(() => {
    animFlagsRef.current.isRaining = isRaining;
  }, [isRaining]);

  useEffect(() => {
    animFlagsRef.current.trafficRunning = trafficRunning;
  }, [trafficRunning]);

  useEffect(() => {
    animFlagsRef.current.showFlows = showFlows;
  }, [showFlows]);

  useEffect(() => {
    animFlagsRef.current.viewMode = viewMode;
  }, [viewMode]);

  // Main Three.js Scene Setup & Render Loop
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight || 620;

    // 1. Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    const dayBgColor = new THREE.Color(0x0a1410);
    scene.background = dayBgColor.clone();
    scene.fog = new THREE.FogExp2(0x0a1410, 0.012);

    // 2. Camera setup - Positioned to frame the full town with the central stepwell
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1200);
    camera.position.set(48, 38, 54);
    cameraRef.current = camera;

    // 3. Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // 4. Orbit Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxPolarAngle = Math.PI / 2 + 0.02; // restrict below horizontal
    controls.minDistance = 12;
    controls.maxDistance = 140;
    controls.autoRotate = isAutoRotate;
    controls.autoRotateSpeed = 0.8;
    controls.target.set(0, -1, 0);
    controlsRef.current = controls;

    // 5. Lighting Setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xfffaed, 1.5);
    sunLight.position.set(45, 65, 35);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 2048;
    sunLight.shadow.mapSize.height = 2048;
    sunLight.shadow.camera.near = 0.5;
    sunLight.shadow.camera.far = 180;
    sunLight.shadow.camera.left = -50;
    sunLight.shadow.camera.right = 50;
    sunLight.shadow.camera.top = 50;
    sunLight.shadow.camera.bottom = -50;
    sunLight.shadow.bias = -0.0003;
    scene.add(sunLight);

    // Blue glow from deep subterranean aquifer pool
    const subterraneanLight = new THREE.PointLight(0x0ea5e9, 3.2, 40);
    subterraneanLight.position.set(0, -6, 0);
    scene.add(subterraneanLight);

    // Warm terracotta core fill light
    const terracottaCoreLight = new THREE.PointLight(0xe07a5f, 2.0, 30);
    terracottaCoreLight.position.set(0, 2, 0);
    scene.add(terracottaCoreLight);

    // Focused optical lunar light beam funneling into the stepwell core
    const sanctuaryMoonBeam = new THREE.DirectionalLight(0x93c5fd, 0);
    sanctuaryMoonBeam.position.set(0, 45, 0);
    sanctuaryMoonBeam.target.position.set(0, -7, 0);
    scene.add(sanctuaryMoonBeam);
    scene.add(sanctuaryMoonBeam.target);

    // Sanctuary ambient bio-light (ethereal emerald phosphorescence across stepwell terraces)
    const sanctuaryBioLight = new THREE.PointLight(0x10b981, 0, 35);
    sanctuaryBioLight.position.set(0, -3.5, 0);
    scene.add(sanctuaryBioLight);

    // Group for nighttime street lights & building glows
    const nightCityLights = new THREE.Group();
    nightCityLights.visible = false;
    scene.add(nightCityLights);

    lightsRef.current = {
      sun: sunLight,
      ambient: ambientLight,
      subterranean: subterraneanLight,
      sanctuaryMoonBeam,
      sanctuaryBioLight,
      terracottaCoreLight,
      nightCityLights
    };

    // 6. Master Shared Materials
    const materials = {
      // Ground & Roads
      terrainGreen: new THREE.MeshStandardMaterial({ color: 0x192e22, roughness: 0.9 }),
      asphalt: new THREE.MeshStandardMaterial({ color: 0x24282a, roughness: 0.85 }),
      roadLine: new THREE.MeshBasicMaterial({ color: 0xfacc15 }),
      sidewalk: new THREE.MeshStandardMaterial({ color: 0x3d4b43, roughness: 0.7 }),
      plazaPaving: new THREE.MeshStandardMaterial({ color: 0x5a655d, roughness: 0.8 }),
      bioswaleSoil: new THREE.MeshStandardMaterial({ color: 0x1f382a, roughness: 0.95 }),
      
      // Stepwell Elements & Energy-Free Luminescence
      terracotta: new THREE.MeshStandardMaterial({ color: 0xc85a32, roughness: 0.65, metalness: 0.1 }),
      sandstone: new THREE.MeshStandardMaterial({ color: 0xd4a373, roughness: 0.78 }),
      water: new THREE.MeshStandardMaterial({ 
        color: 0x0ea5e9, 
        roughness: 0.1, 
        metalness: 0.25, 
        transparent: true, 
        opacity: 0.85,
        emissive: 0x000000,
        emissiveIntensity: 0
      }),
      deepAquifer: new THREE.MeshStandardMaterial({ color: 0x0284c7, roughness: 0.4, transparent: true, opacity: 0.75 }),
      strataGravel: new THREE.MeshStandardMaterial({ color: 0x44403c, roughness: 0.95 }),
      
      // Sanctuary Energy-Free Lighting Materials
      photoluminescentStep: new THREE.MeshStandardMaterial({
        color: 0x34d399,
        roughness: 0.4,
        emissive: 0x10b981,
        emissiveIntensity: 0
      }),
      photoluminescentTeal: new THREE.MeshStandardMaterial({
        color: 0x38bdf8,
        roughness: 0.4,
        emissive: 0x06b6d4,
        emissiveIntensity: 0
      }),
      chimneyAmberGlow: new THREE.MeshStandardMaterial({
        color: 0xf59e0b,
        roughness: 0.5,
        emissive: 0xd97706,
        emissiveIntensity: 0
      }),
      lunarBeam: new THREE.MeshBasicMaterial({
        color: 0x93c5fd,
        transparent: true,
        opacity: 0,
        side: THREE.DoubleSide,
        blending: THREE.AdditiveBlending
      }),
      
      // Buildings & Architecture
      bldgConcrete: new THREE.MeshStandardMaterial({ color: 0x334139, roughness: 0.7 }),
      bldgTerracottaTrim: new THREE.MeshStandardMaterial({ color: 0xa84a28, roughness: 0.6 }),
      bldgWhitePlaster: new THREE.MeshStandardMaterial({ color: 0x829188, roughness: 0.6 }),
      windowGlass: new THREE.MeshStandardMaterial({ 
        color: 0x38bdf8, 
        roughness: 0.2, 
        metalness: 0.7, 
        emissive: 0x000000 
      }),
      solarPanel: new THREE.MeshStandardMaterial({ color: 0x1e3a8a, roughness: 0.3, metalness: 0.8 }),
      greenRoof: new THREE.MeshStandardMaterial({ color: 0x166534, roughness: 0.9 }),
      
      // Vehicles & Details
      carWhite: new THREE.MeshStandardMaterial({ color: 0xe2e8f0, roughness: 0.3, metalness: 0.5 }),
      carCyan: new THREE.MeshStandardMaterial({ color: 0x06b6d4, roughness: 0.3, metalness: 0.5 }),
      carOrange: new THREE.MeshStandardMaterial({ color: 0xf97316, roughness: 0.3, metalness: 0.5 }),
      carGreen: new THREE.MeshStandardMaterial({ color: 0x10b981, roughness: 0.3, metalness: 0.5 }),
      headlight: new THREE.MeshBasicMaterial({ color: 0xfef08a }),
      taillight: new THREE.MeshBasicMaterial({ color: 0xef4444 }),
      
      // Vegetation
      treeTrunk: new THREE.MeshStandardMaterial({ color: 0x452317, roughness: 0.9 }),
      treeCanopy1: new THREE.MeshStandardMaterial({ color: 0x15803d, roughness: 0.8 }),
      treeCanopy2: new THREE.MeshStandardMaterial({ color: 0x166534, roughness: 0.8 }),
      
      // Citizens
      citizenShirt1: new THREE.MeshStandardMaterial({ color: 0x38bdf8 }),
      citizenShirt2: new THREE.MeshStandardMaterial({ color: 0xf97316 }),
      citizenShirt3: new THREE.MeshStandardMaterial({ color: 0xa855f7 }),
      citizenSkin: new THREE.MeshStandardMaterial({ color: 0xd97706, roughness: 0.7 }),
      
      // Clean Energy Hub
      metalSteel: new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.8, roughness: 0.3 }),
      turbineBlade: new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.4 })
    };
    materialsRef.current = materials;

    // Master Group for Town and Subterranean Components
    const townGroup = new THREE.Group();
    scene.add(townGroup);

    // ==========================================
    // 1. TERRAIN BASE & STEPWELL OPENING
    // ==========================================
    const townRadius = 45; // 90m x 90m city platform
    const wellRadius = 10;  // 20m diameter stepwell opening

    // Ground shape with a circular cutout at center for the stepwell
    const groundShape = new THREE.Shape();
    groundShape.moveTo(-townRadius, -townRadius);
    groundShape.lineTo(townRadius, -townRadius);
    groundShape.lineTo(townRadius, townRadius);
    groundShape.lineTo(-townRadius, townRadius);
    groundShape.closePath();

    const holePath = new THREE.Path();
    holePath.absarc(0, 0, wellRadius, 0, Math.PI * 2, true);
    groundShape.holes.push(holePath);

    const groundGeo = new THREE.ExtrudeGeometry(groundShape, { depth: 1.5, bevelEnabled: false });
    groundGeo.rotateX(Math.PI / 2);
    const groundMesh = new THREE.Mesh(groundGeo, materials.terrainGreen);
    groundMesh.receiveShadow = true;
    townGroup.add(groundMesh);

    // Urban Pedestrian Promenade Ring surrounding stepwell opening
    const promenadeGeo = new THREE.RingGeometry(wellRadius, wellRadius + 2.5, 48);
    promenadeGeo.rotateX(-Math.PI / 2);
    const promenadeMesh = new THREE.Mesh(promenadeGeo, materials.plazaPaving);
    promenadeMesh.position.y = 0.02;
    promenadeMesh.receiveShadow = true;
    townGroup.add(promenadeMesh);

    // Bioswale Buffer & Sponge Green Ring
    const bioswaleGeo = new THREE.RingGeometry(wellRadius + 2.5, wellRadius + 5.5, 48);
    bioswaleGeo.rotateX(-Math.PI / 2);
    const bioswaleMesh = new THREE.Mesh(bioswaleGeo, materials.bioswaleSoil);
    bioswaleMesh.position.y = 0.03;
    bioswaleMesh.receiveShadow = true;
    townGroup.add(bioswaleMesh);

    // ==========================================
    // 2. URBAN ROAD NETWORK & AVENUE GRID
    // ==========================================
    // A. Main Circular Boulevard / Ring Road (Radius 22m, width 4m)
    const ringRoadRadius = 22;
    const ringRoadWidth = 4.2;
    const ringRoadGeo = new THREE.RingGeometry(ringRoadRadius - ringRoadWidth / 2, ringRoadRadius + ringRoadWidth / 2, 64);
    ringRoadGeo.rotateX(-Math.PI / 2);
    const ringRoadMesh = new THREE.Mesh(ringRoadGeo, materials.asphalt);
    ringRoadMesh.position.y = 0.04;
    ringRoadMesh.receiveShadow = true;
    townGroup.add(ringRoadMesh);

    // Center dash line on ring road
    const dashRingGeo = new THREE.RingGeometry(ringRoadRadius - 0.08, ringRoadRadius + 0.08, 64);
    dashRingGeo.rotateX(-Math.PI / 2);
    const dashRingMesh = new THREE.Mesh(dashRingGeo, materials.roadLine);
    dashRingMesh.position.y = 0.045;
    townGroup.add(dashRingMesh);

    // B. Four Cardinal Avenues (North, South, East, West) radiating from Ring Road to City Boundary
    const avenueWidth = 3.8;
    const avenueLength = townRadius - ringRoadRadius;
    const avenueCenterDist = ringRoadRadius + avenueLength / 2;

    const cardinalAngles = [0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2];
    cardinalAngles.forEach((angle) => {
      const aveGeo = new THREE.PlaneGeometry(avenueWidth, avenueLength);
      aveGeo.rotateX(-Math.PI / 2);
      const aveMesh = new THREE.Mesh(aveGeo, materials.asphalt);
      aveMesh.position.set(
        Math.cos(angle) * avenueCenterDist,
        0.04,
        Math.sin(angle) * avenueCenterDist
      );
      aveMesh.rotation.y = -angle + Math.PI / 2;
      aveMesh.receiveShadow = true;
      townGroup.add(aveMesh);

      // Avenue center yellow line
      const lineGeo = new THREE.PlaneGeometry(0.12, avenueLength);
      lineGeo.rotateX(-Math.PI / 2);
      const lineMesh = new THREE.Mesh(lineGeo, materials.roadLine);
      lineMesh.position.copy(aveMesh.position);
      lineMesh.position.y = 0.045;
      lineMesh.rotation.copy(aveMesh.rotation);
      townGroup.add(lineMesh);
    });

    // Street Lamps along roads with warm glowing night bulbs
    const lampCount = 20;
    for (let i = 0; i < lampCount; i++) {
      const angle = (i / lampCount) * Math.PI * 2;
      const lampDist = ringRoadRadius + 2.8;
      const lx = Math.cos(angle) * lampDist;
      const lz = Math.sin(angle) * lampDist;

      // Pole
      const poleGeo = new THREE.CylinderGeometry(0.08, 0.1, 3.2, 8);
      const pole = new THREE.Mesh(poleGeo, materials.metalSteel);
      pole.position.set(lx, 1.6, lz);
      pole.castShadow = true;
      townGroup.add(pole);

      // Arm & Lamp Head
      const headGeo = new THREE.BoxGeometry(0.4, 0.12, 0.4);
      const head = new THREE.Mesh(headGeo, materials.metalSteel);
      head.position.set(lx - Math.cos(angle) * 0.4, 3.2, lz - Math.sin(angle) * 0.4);
      townGroup.add(head);

      // Glowing night bulb
      const bulbGeo = new THREE.SphereGeometry(0.12, 8, 8);
      const bulbMat = new THREE.MeshBasicMaterial({ color: 0xffedd5 });
      const bulb = new THREE.Mesh(bulbGeo, bulbMat);
      bulb.position.set(head.position.x, 3.1, head.position.z);
      nightCityLights.add(bulb);

      // Pointlight for night illumination on street
      if (i % 3 === 0) {
        const pLight = new THREE.PointLight(0xffecd2, 1.2, 14);
        pLight.position.copy(bulb.position);
        nightCityLights.add(pLight);
      }
    }

    // ==========================================
    // 3. STEPWELL CORE (PRITHVIVAHINI COMMONS)
    // ==========================================
    // Terracotta Stack-Effect Convection Chimneys
    const chimneyPositions = [
      { x: 7.2, z: 0 },
      { x: -7.2, z: 0 },
      { x: 0, z: 7.2 },
      { x: 0, z: -7.2 },
      { x: 5.1, z: 5.1 },
      { x: -5.1, z: -5.1 },
      { x: 5.1, z: -5.1 },
      { x: -5.1, z: 5.1 }
    ];

    chimneyPositions.forEach((pos) => {
      const towerGeo = new THREE.CylinderGeometry(0.65, 0.9, 7.5, 16);
      const tower = new THREE.Mesh(towerGeo, materials.terracotta);
      tower.position.set(pos.x, 0.6, pos.z);
      tower.castShadow = true;
      tower.receiveShadow = true;
      townGroup.add(tower);

      // Top Wind Scoop Cap
      const capGeo = new THREE.ConeGeometry(1.15, 0.8, 16);
      const cap = new THREE.Mesh(capGeo, materials.terracotta);
      cap.position.set(pos.x, 4.4, pos.z);
      townGroup.add(cap);

      // Passive Photoluminescent Amber Beacon Ring (Nightway finding lantern at 0 kWh)
      const capRingGeo = new THREE.TorusGeometry(0.72, 0.09, 8, 20);
      capRingGeo.rotateX(Math.PI / 2);
      const capRing = new THREE.Mesh(capRingGeo, materials.chimneyAmberGlow);
      capRing.position.set(pos.x, 4.25, pos.z);
      townGroup.add(capRing);
    });

    // Top Rim Photoluminescent Balustrade Edge (Promenade Boundary)
    const rimGlowGeo = new THREE.RingGeometry(wellRadius - 0.22, wellRadius + 0.1, 48);
    rimGlowGeo.rotateX(-Math.PI / 2);
    const rimGlowMesh = new THREE.Mesh(rimGlowGeo, materials.photoluminescentTeal);
    rimGlowMesh.position.y = 0.026;
    townGroup.add(rimGlowMesh);

    // 7 Concentric Stepped Baoli Terraces with Photoluminescent Step Treads
    const tiersSteps = 7;
    for (let s = 0; s < tiersSteps; s++) {
      const topR = wellRadius - (s * 0.9);
      const btmR = topR - 0.75;
      const stepDepth = 0.9;
      const stepY = -(s * stepDepth) - 0.45;

      const stepGeo = new THREE.CylinderGeometry(topR, btmR, stepDepth, 36, 1, true);
      const stepMesh = new THREE.Mesh(stepGeo, materials.sandstone);
      stepMesh.position.y = stepY;
      stepMesh.receiveShadow = true;
      townGroup.add(stepMesh);

      const terraceRing = new THREE.RingGeometry(btmR, topR, 36);
      terraceRing.rotateX(-Math.PI / 2);
      const terraceMesh = new THREE.Mesh(terraceRing, materials.sandstone);
      terraceMesh.position.y = stepY - (stepDepth / 2);
      terraceMesh.receiveShadow = true;
      townGroup.add(terraceMesh);

      // Zero-Energy Photoluminescent Step-Nosing Strip (Strontium-Aluminate bio-glow)
      const edgeRingGeo = new THREE.RingGeometry(topR - 0.16, topR, 36);
      edgeRingGeo.rotateX(-Math.PI / 2);
      const edgeRingMesh = new THREE.Mesh(edgeRingGeo, materials.photoluminescentStep);
      edgeRingMesh.position.y = stepY - (stepDepth / 2) + 0.012;
      townGroup.add(edgeRingMesh);
    }

    // Traditional Deepak-Gokh Recessed Phosphorescent Niches along Baoli Walls
    for (let n = 0; n < 12; n++) {
      const nAngle = (n / 12) * Math.PI * 2;
      const nDist = wellRadius - 2.0;
      const nx = Math.cos(nAngle) * nDist;
      const nz = Math.sin(nAngle) * nDist;
      const nicheBoxGeo = new THREE.BoxGeometry(0.35, 0.35, 0.25);
      const nicheMesh = new THREE.Mesh(nicheBoxGeo, materials.chimneyAmberGlow);
      nicheMesh.position.set(nx, -2.6, nz);
      townGroup.add(nicheMesh);
    }

    // Optical Lunar Light-Well Shaft (Passive collimated moonbeam funnel)
    const lunarBeamGeo = new THREE.CylinderGeometry(wellRadius * 0.85, 2.8, 30, 32, 1, true);
    const lunarBeamMesh = new THREE.Mesh(lunarBeamGeo, materials.lunarBeam);
    lunarBeamMesh.position.set(0, 7, 0);
    townGroup.add(lunarBeamMesh);

    // Baoli Plaza & Central Water Reservoir
    const floorRadius = wellRadius - (tiersSteps * 0.9); // ~3.7m
    const poolRadius = 2.4;

    const floorRingGeo = new THREE.RingGeometry(poolRadius, floorRadius, 32);
    floorRingGeo.rotateX(-Math.PI / 2);
    const floorMesh = new THREE.Mesh(floorRingGeo, materials.sandstone);
    floorMesh.position.y = -6.4;
    floorMesh.receiveShadow = true;
    townGroup.add(floorMesh);

    // Photoluminescent Pool Border Ring
    const poolRimGlowGeo = new THREE.RingGeometry(poolRadius, poolRadius + 0.22, 36);
    poolRimGlowGeo.rotateX(-Math.PI / 2);
    const poolRimGlowMesh = new THREE.Mesh(poolRimGlowGeo, materials.photoluminescentTeal);
    poolRimGlowMesh.position.y = -6.34;
    townGroup.add(poolRimGlowMesh);

    // Reflecting Pool
    const waterGeo = new THREE.CircleGeometry(poolRadius, 32);
    waterGeo.rotateX(-Math.PI / 2);
    const waterMesh = new THREE.Mesh(waterGeo, materials.water);
    waterMesh.position.y = -6.35;
    townGroup.add(waterMesh);

    // Subterranean Columns
    const columnCount = 8;
    for (let c = 0; c < columnCount; c++) {
      const angle = (c / columnCount) * Math.PI * 2;
      const cx = Math.cos(angle) * (poolRadius + 0.85);
      const cz = Math.sin(angle) * (poolRadius + 0.85);
      const colGeo = new THREE.BoxGeometry(0.35, 3.2, 0.35);
      const col = new THREE.Mesh(colGeo, materials.sandstone);
      col.position.set(cx, -4.8, cz);
      col.castShadow = true;
      townGroup.add(col);
    }

    // Tier 4 Deep Aquifer Basin
    const deepStrataGeo = new THREE.CylinderGeometry(poolRadius + 0.3, poolRadius + 1.2, 6.5, 24);
    const deepStrataMesh = new THREE.Mesh(deepStrataGeo, materials.strataGravel);
    deepStrataMesh.position.y = -10.0;
    townGroup.add(deepStrataMesh);

    const aquiferChamberGeo = new THREE.CylinderGeometry(poolRadius + 3.0, poolRadius + 3.6, 3.2, 24);
    const aquiferMesh = new THREE.Mesh(aquiferChamberGeo, materials.deepAquifer);
    aquiferMesh.position.y = -14.2;
    townGroup.add(aquiferMesh);

    // Geological Cutaway Profile Walls
    const wallGeo = new THREE.BoxGeometry(townRadius * 2, 16, 1);
    const cutawayMat = new THREE.MeshStandardMaterial({ color: 0x141f19, roughness: 0.95 });
    const backWall = new THREE.Mesh(wallGeo, cutawayMat);
    backWall.position.set(0, -8, -townRadius);
    townGroup.add(backWall);

    const leftWall = new THREE.Mesh(wallGeo, cutawayMat);
    leftWall.rotateY(Math.PI / 2);
    leftWall.position.set(-townRadius, -8, 0);
    townGroup.add(leftWall);

    // ==========================================
    // 4. TOWN DISTRICTS & ARCHITECTURE
    // ==========================================

    // Helper: Create a multi-story building with windows and rooftop features
    const createBuilding = (
      x: number, 
      z: number, 
      width: number, 
      depth: number, 
      height: number, 
      options: { 
        isResidential?: boolean; 
        hasSolar?: boolean; 
        hasGreenRoof?: boolean;
        facadeColor?: number;
      } = {}
    ) => {
      const bldgGroup = new THREE.Group();
      bldgGroup.position.set(x, 0, z);

      // Main Block
      const bGeo = new THREE.BoxGeometry(width, height, depth);
      const bMat = options.facadeColor 
        ? new THREE.MeshStandardMaterial({ color: options.facadeColor, roughness: 0.65 })
        : materials.bldgConcrete;
      const bMesh = new THREE.Mesh(bGeo, bMat);
      bMesh.position.y = height / 2;
      bMesh.castShadow = true;
      bMesh.receiveShadow = true;
      bldgGroup.add(bMesh);

      // Window Rows (Grid)
      const floors = Math.floor(height / 2.2);
      const windowsPerFloor = Math.floor(width / 2.0);
      
      for (let f = 1; f <= floors; f++) {
        const wy = (f * 2.2) - 0.8;
        for (let w = 0; w < windowsPerFloor; w++) {
          const wx = -width / 2 + 1.2 + (w * 1.8);
          if (wx < width / 2 - 0.8) {
            // Front window
            const winGeo = new THREE.PlaneGeometry(0.85, 1.1);
            const winMesh = new THREE.Mesh(winGeo, materials.windowGlass);
            winMesh.position.set(wx, wy, depth / 2 + 0.02);
            bldgGroup.add(winMesh);

            // Back window
            const winBack = winMesh.clone();
            winBack.position.z = -depth / 2 - 0.02;
            winBack.rotation.y = Math.PI;
            bldgGroup.add(winBack);
          }
        }
      }

      // Rooftop Features
      if (options.hasGreenRoof) {
        const roofGeo = new THREE.BoxGeometry(width - 0.4, 0.2, depth - 0.4);
        const roof = new THREE.Mesh(roofGeo, materials.greenRoof);
        roof.position.set(0, height + 0.1, 0);
        bldgGroup.add(roof);
      }

      if (options.hasSolar) {
        const solarGeo = new THREE.BoxGeometry(width * 0.7, 0.15, depth * 0.7);
        const solar = new THREE.Mesh(solarGeo, materials.solarPanel);
        solar.position.set(0, height + 0.2, 0);
        solar.rotation.x = 0.1;
        bldgGroup.add(solar);
      }

      // Roof parapet edge
      const parapetGeo = new THREE.BoxGeometry(width, 0.4, depth);
      const parapet = new THREE.Mesh(parapetGeo, materials.terracotta);
      parapet.position.set(0, height + 0.2, 0);
      bldgGroup.add(parapet);

      townGroup.add(bldgGroup);
      return bldgGroup;
    };

    // DISTRICT 1: Residential High-Rise Quarter (North-East Quadrant)
    createBuilding(28, 26, 7, 7, 18, { isResidential: true, hasSolar: true, facadeColor: 0x3d4b43 });
    createBuilding(36, 18, 6, 6, 14, { isResidential: true, hasGreenRoof: true, facadeColor: 0x48584f });
    createBuilding(22, 34, 6, 8, 12, { isResidential: true, hasSolar: true, facadeColor: 0x3d4b43 });
    createBuilding(34, 32, 8, 7, 16, { isResidential: true, hasSolar: true, facadeColor: 0x51645a });

    // DISTRICT 2: Healthcare & Civic Campus (North-West Quadrant)
    createBuilding(-26, 26, 11, 8, 9, { hasGreenRoof: true, facadeColor: 0x829188 }); // Civic Hospital
    createBuilding(-35, 18, 7, 7, 7, { hasSolar: true, facadeColor: 0x6e7d75 });     // Community School
    createBuilding(-24, 35, 8, 6, 6, { hasGreenRoof: true, facadeColor: 0x5a6861 }); // Public Library

    // DISTRICT 3: Urban Marketplace & Transit Terminal (South-West Quadrant)
    createBuilding(-28, -26, 10, 8, 5, { hasSolar: true, facadeColor: 0xa85a3a }); // Covered Bazaar
    createBuilding(-36, -18, 6, 6, 4, { hasSolar: true, facadeColor: 0x8c462b });  // Transit Hub
    createBuilding(-22, -34, 7, 7, 6, { hasSolar: true, facadeColor: 0x9e5234 });  // Farmers Market

    // Canopies for open-air market stalls
    for (let m = 0; m < 4; m++) {
      const canopyGeo = new THREE.ConeGeometry(1.6, 1.0, 4);
      const canopyMat = new THREE.MeshStandardMaterial({ 
        color: m % 2 === 0 ? 0xf97316 : 0x0ea5e9, 
        roughness: 0.6 
      });
      const canopy = new THREE.Mesh(canopyGeo, canopyMat);
      canopy.position.set(-18 - (m * 2.8), 2.2, -22 - (m * 1.5));
      townGroup.add(canopy);

      const standPoleGeo = new THREE.CylinderGeometry(0.06, 0.06, 2.2, 6);
      const standPole = new THREE.Mesh(standPoleGeo, materials.metalSteel);
      standPole.position.set(canopy.position.x, 1.1, canopy.position.z);
      townGroup.add(standPole);
    }

    // DISTRICT 4: Clean Energy & Eco-Industry Park (South-East Quadrant)
    createBuilding(26, -26, 9, 8, 6, { hasSolar: true, facadeColor: 0x374151 }); // Greywater Recovery
    createBuilding(34, -18, 7, 7, 5, { hasSolar: true, facadeColor: 0x2e3642 }); // Battery Grid

    // Miniature Rotating Wind Turbines in the Eco Park
    const turbines: { shaft: THREE.Mesh; rotor: THREE.Group }[] = [];
    const turbinePositions = [
      { x: 26, z: -35 },
      { x: 34, z: -32 },
      { x: 38, z: -25 }
    ];

    turbinePositions.forEach((pos) => {
      // Tower shaft
      const tShaftGeo = new THREE.CylinderGeometry(0.2, 0.35, 10, 12);
      const tShaft = new THREE.Mesh(tShaftGeo, materials.metalSteel);
      tShaft.position.set(pos.x, 5, pos.z);
      tShaft.castShadow = true;
      townGroup.add(tShaft);

      // Nacelle & Rotor Group
      const rotorGroup = new THREE.Group();
      rotorGroup.position.set(pos.x, 10, pos.z);

      const nacelleGeo = new THREE.CylinderGeometry(0.3, 0.3, 1.2, 8);
      nacelleGeo.rotateZ(Math.PI / 2);
      const nacelle = new THREE.Mesh(nacelleGeo, materials.metalSteel);
      rotorGroup.add(nacelle);

      // 3 Blades
      const bladeGroup = new THREE.Group();
      bladeGroup.position.set(0.65, 0, 0);
      for (let b = 0; b < 3; b++) {
        const bladeAngle = (b / 3) * Math.PI * 2;
        const bladeGeo = new THREE.ConeGeometry(0.25, 4.0, 4);
        const blade = new THREE.Mesh(bladeGeo, materials.turbineBlade);
        blade.position.set(0, Math.cos(bladeAngle) * 2.0, Math.sin(bladeAngle) * 2.0);
        blade.rotation.x = bladeAngle + Math.PI / 2;
        bladeGroup.add(blade);
      }
      rotorGroup.add(bladeGroup);
      townGroup.add(rotorGroup);

      turbines.push({ shaft: tShaft, rotor: bladeGroup });
    });

    // Trees throughout the Town Parks and Avenues
    const treePositions: { x: number; z: number }[] = [];
    for (let i = 0; i < 28; i++) {
      const angle = Math.random() * Math.PI * 2;
      const dist = 14 + Math.random() * 26;
      treePositions.push({
        x: Math.cos(angle) * dist,
        z: Math.sin(angle) * dist
      });
    }

    treePositions.forEach((t) => {
      const trunkGeo = new THREE.CylinderGeometry(0.2, 0.28, 2.0, 6);
      const trunk = new THREE.Mesh(trunkGeo, materials.treeTrunk);
      trunk.position.set(t.x, 1.0, t.z);
      trunk.castShadow = true;
      townGroup.add(trunk);

      const foliageGeo = new THREE.DodecahedronGeometry(1.4, 1);
      const foliage = new THREE.Mesh(foliageGeo, Math.random() > 0.5 ? materials.treeCanopy1 : materials.treeCanopy2);
      foliage.position.set(t.x, 2.6, t.z);
      foliage.castShadow = true;
      townGroup.add(foliage);
    });

    // ==========================================
    // 5. ANIMATED TOWN VEHICLES & TRAFFIC
    // ==========================================
    interface VehicleData {
      mesh: THREE.Group;
      type: 'ring' | 'radial';
      angle?: number;
      speed: number;
      radius?: number;
      axis?: 'x' | 'z';
      dir?: number;
      dist?: number;
    }

    const vehicleColors = [materials.carWhite, materials.carCyan, materials.carOrange, materials.carGreen];
    const vehicles: VehicleData[] = [];

    // Helper: Build a low-poly modern vehicle
    const buildVehicle = (colorMat: THREE.Material, isShuttle = false) => {
      const vGroup = new THREE.Group();

      // Chassis
      const bodyGeo = isShuttle 
        ? new THREE.BoxGeometry(2.4, 1.1, 1.2)
        : new THREE.BoxGeometry(2.0, 0.8, 1.0);
      const body = new THREE.Mesh(bodyGeo, colorMat);
      body.position.y = 0.55;
      body.castShadow = true;
      vGroup.add(body);

      // Cabin / Windshield
      const cabinGeo = new THREE.BoxGeometry(1.2, 0.5, 0.9);
      const cabin = new THREE.Mesh(cabinGeo, materials.windowGlass);
      cabin.position.set(-0.1, 1.0, 0);
      vGroup.add(cabin);

      // Headlights (front +X)
      const hl1 = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.15, 0.2), materials.headlight);
      hl1.position.set(bodyGeo.parameters.width / 2 + 0.02, 0.5, 0.35);
      const hl2 = hl1.clone();
      hl2.position.z = -0.35;
      vGroup.add(hl1);
      vGroup.add(hl2);

      // Taillights (rear -X)
      const tl1 = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.15, 0.2), materials.taillight);
      tl1.position.set(-bodyGeo.parameters.width / 2 - 0.02, 0.5, 0.35);
      const tl2 = tl1.clone();
      tl2.position.z = -0.35;
      vGroup.add(tl1);
      vGroup.add(tl2);

      townGroup.add(vGroup);
      return vGroup;
    };

    // A. 8 Vehicles driving on the Ring Boulevard (in clockwise and counter-clockwise lanes)
    for (let i = 0; i < 8; i++) {
      const isInner = i % 2 === 0;
      const r = isInner ? ringRoadRadius - 1.1 : ringRoadRadius + 1.1;
      const speed = (isInner ? 0.008 : -0.007) + (Math.random() * 0.002);
      const initialAngle = (i / 8) * Math.PI * 2;
      const mesh = buildVehicle(vehicleColors[i % vehicleColors.length], i % 3 === 0);

      vehicles.push({
        mesh,
        type: 'ring',
        radius: r,
        angle: initialAngle,
        speed
      });
    }

    // B. 4 Vehicles moving along the 4 Cardinal Avenues
    const avenuesInfo: { axis: 'x' | 'z'; dir: number }[] = [
      { axis: 'x', dir: 1 },
      { axis: 'x', dir: -1 },
      { axis: 'z', dir: 1 },
      { axis: 'z', dir: -1 },
    ];

    avenuesInfo.forEach((ave, idx) => {
      const mesh = buildVehicle(vehicleColors[(idx + 2) % vehicleColors.length]);
      vehicles.push({
        mesh,
        type: 'radial',
        axis: ave.axis,
        dir: ave.dir,
        dist: ringRoadRadius + 2 + Math.random() * 12,
        speed: 0.12 * ave.dir
      });
    });

    // ==========================================
    // 6. ANIMATED CITIZENS / PEDESTRIANS
    // ==========================================
    interface CitizenData {
      mesh: THREE.Group;
      baseX: number;
      baseZ: number;
      radius: number;
      angle: number;
      speed: number;
      strideOffset: number;
      legs: THREE.Mesh[];
    }

    const citizens: CitizenData[] = [];
    const citizenCount = 22;

    const shirtMats = [materials.citizenShirt1, materials.citizenShirt2, materials.citizenShirt3];

    for (let i = 0; i < citizenCount; i++) {
      const cGroup = new THREE.Group();
      
      // Torso
      const torsoGeo = new THREE.CylinderGeometry(0.16, 0.18, 0.6, 6);
      const torso = new THREE.Mesh(torsoGeo, shirtMats[i % shirtMats.length]);
      torso.position.y = 0.7;
      torso.castShadow = true;
      cGroup.add(torso);

      // Head
      const headGeo = new THREE.SphereGeometry(0.14, 8, 8);
      const head = new THREE.Mesh(headGeo, materials.citizenSkin);
      head.position.y = 1.15;
      cGroup.add(head);

      // Two Legs
      const legGeo = new THREE.BoxGeometry(0.08, 0.45, 0.08);
      const legL = new THREE.Mesh(legGeo, materials.asphalt);
      legL.position.set(-0.07, 0.22, 0);
      const legR = legL.clone();
      legR.position.x = 0.07;
      cGroup.add(legL);
      cGroup.add(legR);

      // Place citizens in Promenade (radius 10.5 - 13m) and Baoli Steps (radius 5 - 9m)
      const isInBaoli = i < 7;
      const walkRadius = isInBaoli ? 4.5 + Math.random() * 4 : 10.8 + Math.random() * 2.8;
      const startAngle = (i / citizenCount) * Math.PI * 2;
      const yPos = isInBaoli ? -3.0 - (Math.random() * 3) : 0.04;

      cGroup.position.set(Math.cos(startAngle) * walkRadius, yPos, Math.sin(startAngle) * walkRadius);
      townGroup.add(cGroup);

      citizens.push({
        mesh: cGroup,
        baseX: 0,
        baseZ: 0,
        radius: walkRadius,
        angle: startAngle,
        speed: (isInBaoli ? 0.004 : 0.007) * (i % 2 === 0 ? 1 : -1),
        strideOffset: Math.random() * Math.PI * 2,
        legs: [legL, legR]
      });
    }

    // ==========================================
    // 7. PARTICLE SYSTEMS (INFILTRATION, CONVECTION & MONSOON RAIN)
    // ==========================================

    // A. Subterranean Water Infiltration Particles
    const waterParticleCount = 450;
    const waterGeoP = new THREE.BufferGeometry();
    const waterPos = new Float32Array(waterParticleCount * 3);
    const waterSpeed = new Float32Array(waterParticleCount);

    for (let i = 0; i < waterParticleCount; i++) {
      const rad = Math.random() * 7.5;
      const ang = Math.random() * Math.PI * 2;
      waterPos[i * 3] = Math.cos(ang) * rad;
      waterPos[i * 3 + 1] = -(Math.random() * 14);
      waterPos[i * 3 + 2] = Math.sin(ang) * rad;
      waterSpeed[i] = 0.06 + Math.random() * 0.06;
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
    townGroup.add(waterParticles);

    // B. Warm Convection Updraft Particles from Chimneys
    const airParticleCount = 300;
    const airGeoP = new THREE.BufferGeometry();
    const airPos = new Float32Array(airParticleCount * 3);
    const airSpeed = new Float32Array(airParticleCount);
    const chimneyIndices = new Uint8Array(airParticleCount);

    for (let i = 0; i < airParticleCount; i++) {
      const cIdx = Math.floor(Math.random() * chimneyPositions.length);
      chimneyIndices[i] = cIdx;
      const target = chimneyPositions[cIdx];
      const jitter = (Math.random() - 0.5) * 0.5;
      airPos[i * 3] = target.x + jitter;
      airPos[i * 3 + 1] = -3 + Math.random() * 8.5;
      airPos[i * 3 + 2] = target.z + jitter;
      airSpeed[i] = 0.04 + Math.random() * 0.05;
    }

    airGeoP.setAttribute('position', new THREE.BufferAttribute(airPos, 3));
    const airMatP = new THREE.PointsMaterial({
      color: 0xf59e0b,
      size: 0.32,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending
    });
    const airParticles = new THREE.Points(airGeoP, airMatP);
    townGroup.add(airParticles);

    // C. Monsoon Rain Simulation (Precipitating across the entire city)
    const rainCount = 1200;
    const rainGeoP = new THREE.BufferGeometry();
    const rainPos = new Float32Array(rainCount * 3);
    const rainSpeed = new Float32Array(rainCount);

    for (let i = 0; i < rainCount; i++) {
      rainPos[i * 3] = (Math.random() - 0.5) * (townRadius * 1.8);
      rainPos[i * 3 + 1] = Math.random() * 35;
      rainPos[i * 3 + 2] = (Math.random() - 0.5) * (townRadius * 1.8);
      rainSpeed[i] = 0.55 + Math.random() * 0.4;
    }

    rainGeoP.setAttribute('position', new THREE.BufferAttribute(rainPos, 3));
    const rainMatP = new THREE.PointsMaterial({
      color: 0x93c5fd,
      size: 0.22,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending
    });
    const rainParticles = new THREE.Points(rainGeoP, rainMatP);
    rainParticles.visible = false;
    townGroup.add(rainParticles);

    // ==========================================
    // 8. ANIMATION RENDER LOOP
    // ==========================================
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      // Controls update
      controls.update();

      // 1. Rotate Wind Turbines
      turbines.forEach((t, idx) => {
        const tSpeed = (animFlagsRef.current.isRaining ? 4.5 : 2.2) + (idx * 0.3);
        t.rotor.rotation.x += delta * tSpeed;
      });

      // 2. Animate Traffic / Vehicles
      if (animFlagsRef.current.trafficRunning) {
        vehicles.forEach((v) => {
          if (v.type === 'ring' && v.angle !== undefined && v.radius !== undefined) {
            v.angle += v.speed;
            const vx = Math.cos(v.angle) * v.radius;
            const vz = Math.sin(v.angle) * v.radius;
            v.mesh.position.set(vx, 0.04, vz);
            // Face tangent of ring road
            v.mesh.rotation.y = -v.angle + (v.speed > 0 ? Math.PI / 2 : -Math.PI / 2);
          } else if (v.type === 'radial' && v.dist !== undefined && v.axis && v.dir) {
            v.dist += v.speed;
            // Loop between inner ring road and city perimeter
            if (v.dist > townRadius - 2) {
              v.dist = ringRoadRadius + 1;
            } else if (v.dist < ringRoadRadius + 1) {
              v.dist = townRadius - 2;
            }

            if (v.axis === 'x') {
              v.mesh.position.set(v.dist * v.dir, 0.04, 0);
              v.mesh.rotation.y = v.dir > 0 ? 0 : Math.PI;
            } else {
              v.mesh.position.set(0, 0.04, v.dist * v.dir);
              v.mesh.rotation.y = v.dir > 0 ? -Math.PI / 2 : Math.PI / 2;
            }
          }
        });
      }

      // 3. Animate Pedestrians walking & natural leg stride
      citizens.forEach((c) => {
        c.angle += c.speed;
        const cx = Math.cos(c.angle) * c.radius;
        const cz = Math.sin(c.angle) * c.radius;
        c.mesh.position.x = cx;
        c.mesh.position.z = cz;
        c.mesh.rotation.y = -c.angle + (c.speed > 0 ? Math.PI / 2 : -Math.PI / 2);

        // Leg stride swing
        const legSwing = Math.sin(time * 8 + c.strideOffset) * 0.35;
        c.legs[0].rotation.x = legSwing;
        c.legs[1].rotation.x = -legSwing;
        // Subtle vertical bounce
        c.mesh.position.y = (c.radius < 10 ? -3.0 : 0.04) + Math.abs(Math.sin(time * 8)) * 0.04;
      });

      // 4. Animate Water Ripple in Baoli
      waterMesh.position.y = -6.35 + Math.sin(time * 1.6) * 0.04;

      // 5. Particle Updates (Infiltration & Chimney Convection)
      if (animFlagsRef.current.showFlows) {
        // Water drops down into aquifer
        const wPositions = waterGeoP.attributes.position.array as Float32Array;
        for (let i = 0; i < waterParticleCount; i++) {
          wPositions[i * 3 + 1] -= waterSpeed[i];
          if (wPositions[i * 3 + 1] < -14.5) {
            wPositions[i * 3 + 1] = 0.2;
            const rad = Math.random() * 7.5;
            const ang = Math.random() * Math.PI * 2;
            wPositions[i * 3] = Math.cos(ang) * rad;
            wPositions[i * 3 + 2] = Math.sin(ang) * rad;
          }
        }
        waterGeoP.attributes.position.needsUpdate = true;

        // Warm air updraft out of chimneys
        const aPositions = airGeoP.attributes.position.array as Float32Array;
        for (let i = 0; i < airParticleCount; i++) {
          aPositions[i * 3 + 1] += airSpeed[i];
          if (aPositions[i * 3 + 1] > 6.5) {
            aPositions[i * 3 + 1] = -4.0;
            const cIdx = chimneyIndices[i];
            const target = chimneyPositions[cIdx];
            const jitter = (Math.random() - 0.5) * 0.5;
            aPositions[i * 3] = target.x + jitter;
            aPositions[i * 3 + 2] = target.z + jitter;
          }
        }
        airGeoP.attributes.position.needsUpdate = true;
      }

      // 6. Monsoon Rain Animation
      if (animFlagsRef.current.isRaining) {
        rainParticles.visible = true;
        const rPositions = rainGeoP.attributes.position.array as Float32Array;
        for (let i = 0; i < rainCount; i++) {
          rPositions[i * 3 + 1] -= rainSpeed[i];
          if (rPositions[i * 3 + 1] < 0) {
            rPositions[i * 3 + 1] = 30 + Math.random() * 5;
          }
        }
        rainGeoP.attributes.position.needsUpdate = true;
      } else {
        rainParticles.visible = false;
      }

      // 7. Time-of-Day Dynamic Lighting Transition (Day vs Night Energy-Free Sanctuary)
      if (lightsRef.current) {
        const isNight = animFlagsRef.current.isNight;
        const targetExposure = isNight ? 0.72 : 1.15;
        renderer.toneMappingExposure = THREE.MathUtils.lerp(renderer.toneMappingExposure, targetExposure, 0.08);

        const targetSunIntensity = isNight ? 0.22 : 1.5;
        lightsRef.current.sun.intensity = THREE.MathUtils.lerp(lightsRef.current.sun.intensity, targetSunIntensity, 0.08);

        if (isNight) {
          lightsRef.current.sun.color.lerp(new THREE.Color(0x93c5fd), 0.08);
          lightsRef.current.ambient.color.lerp(new THREE.Color(0x1e293b), 0.08);
        } else {
          lightsRef.current.sun.color.lerp(new THREE.Color(0xfffaed), 0.08);
          lightsRef.current.ambient.color.lerp(new THREE.Color(0xffffff), 0.08);
        }

        const targetAmbIntensity = isNight ? 0.22 : 0.7;
        lightsRef.current.ambient.intensity = THREE.MathUtils.lerp(lightsRef.current.ambient.intensity, targetAmbIntensity, 0.08);

        // Sanctuary moon-shaft collimator beam down central well
        lightsRef.current.sanctuaryMoonBeam.intensity = THREE.MathUtils.lerp(
          lightsRef.current.sanctuaryMoonBeam.intensity,
          isNight ? 1.8 : 0,
          0.08
        );

        // Sanctuary ambient bioluminescence (emerald/cyan glow inside stepwell terraces)
        lightsRef.current.sanctuaryBioLight.intensity = THREE.MathUtils.lerp(
          lightsRef.current.sanctuaryBioLight.intensity,
          isNight ? 3.2 : 0,
          0.08
        );

        // Terracotta stack-convection core fill light
        const targetTerraIntensity = isNight ? 2.8 : 1.8;
        lightsRef.current.terracottaCoreLight.intensity = THREE.MathUtils.lerp(
          lightsRef.current.terracottaCoreLight.intensity,
          targetTerraIntensity,
          0.08
        );

        // Subterranean deep aquifer pool light
        const targetSubIntensity = isNight ? 4.6 : 2.5;
        lightsRef.current.subterranean.intensity = THREE.MathUtils.lerp(
          lightsRef.current.subterranean.intensity,
          targetSubIntensity,
          0.08
        );

        // Night city lights (street lamps & building windows)
        lightsRef.current.nightCityLights.visible = isNight;

        // Window Emissive & Energy-Free Sanctuary Photoluminescent Materials
        const winMat = materials.windowGlass as THREE.MeshStandardMaterial;
        const photoStepMat = materials.photoluminescentStep as THREE.MeshStandardMaterial;
        const photoTealMat = materials.photoluminescentTeal as THREE.MeshStandardMaterial;
        const chimneyAmberMat = materials.chimneyAmberGlow as THREE.MeshStandardMaterial;
        const waterMat = materials.water as THREE.MeshStandardMaterial;
        const lunarBeamMat = materials.lunarBeam as THREE.MeshBasicMaterial;

        if (isNight) {
          winMat.emissive.setHex(0xfef08a);
          winMat.emissiveIntensity = THREE.MathUtils.lerp(winMat.emissiveIntensity, 0.8, 0.08);

          photoStepMat.emissiveIntensity = THREE.MathUtils.lerp(photoStepMat.emissiveIntensity, 2.2, 0.08);
          photoTealMat.emissiveIntensity = THREE.MathUtils.lerp(photoTealMat.emissiveIntensity, 2.4, 0.08);
          chimneyAmberMat.emissiveIntensity = THREE.MathUtils.lerp(chimneyAmberMat.emissiveIntensity, 1.8, 0.08);
          waterMat.emissive.setHex(0x0284c7);
          waterMat.emissiveIntensity = THREE.MathUtils.lerp(waterMat.emissiveIntensity, 0.7, 0.08);
          lunarBeamMat.opacity = THREE.MathUtils.lerp(lunarBeamMat.opacity, 0.14, 0.08);

          scene.background = new THREE.Color(0x040807);
          (scene.fog as THREE.FogExp2).color.setHex(0x040807);
        } else {
          winMat.emissive.setHex(0x000000);
          winMat.emissiveIntensity = 0;

          photoStepMat.emissiveIntensity = THREE.MathUtils.lerp(photoStepMat.emissiveIntensity, 0, 0.08);
          photoTealMat.emissiveIntensity = THREE.MathUtils.lerp(photoTealMat.emissiveIntensity, 0, 0.08);
          chimneyAmberMat.emissiveIntensity = THREE.MathUtils.lerp(chimneyAmberMat.emissiveIntensity, 0, 0.08);
          waterMat.emissive.setHex(0x000000);
          waterMat.emissiveIntensity = 0;
          lunarBeamMat.opacity = THREE.MathUtils.lerp(lunarBeamMat.opacity, 0, 0.08);

          scene.background = dayBgColor;
          (scene.fog as THREE.FogExp2).color.setHex(0x0a1410);
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    // 9. Resize Handling
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight || 620;
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

  // Handle camera presets / District Focus
  const handleSetPreset = (preset: 'town' | 'stepwell' | 'residential' | 'market' | 'underground') => {
    setCameraPreset(preset);
    const camera = cameraRef.current;
    const controls = controlsRef.current;
    if (!camera || !controls) return;

    if (preset === 'town') {
      camera.position.set(48, 38, 54);
      controls.target.set(0, -1, 0);
      setSelectedDistrict('all');
    } else if (preset === 'stepwell') {
      camera.position.set(18, 16, 22);
      controls.target.set(0, -4, 0);
      setSelectedDistrict('stepwell');
    } else if (preset === 'residential') {
      camera.position.set(38, 22, 38);
      controls.target.set(30, 8, 26);
      setSelectedDistrict('residential');
    } else if (preset === 'market') {
      camera.position.set(-36, 18, -34);
      controls.target.set(-28, 4, -26);
      setSelectedDistrict('market');
    } else if (preset === 'underground') {
      camera.position.set(6, -8, 15);
      controls.target.set(0, -8, 0);
      setSelectedDistrict('aquifer');
    }
    controls.update();
  };

  // Switch shading / color modes
  const handleSetViewMode = (mode: 'realistic' | 'thermal' | 'xray') => {
    setViewMode(mode);
    const mats = materialsRef.current;
    if (!mats) return;

    if (mode === 'realistic') {
      (mats.terrainGreen as THREE.MeshStandardMaterial).color.setHex(0x192e22);
      (mats.sandstone as THREE.MeshStandardMaterial).color.setHex(0xd4a373);
      (mats.terracotta as THREE.MeshStandardMaterial).color.setHex(0xc85a32);
      (mats.water as THREE.MeshStandardMaterial).color.setHex(0x0ea5e9);
      (mats.bldgConcrete as THREE.MeshStandardMaterial).color.setHex(0x334139);
      (mats.sandstone as THREE.MeshStandardMaterial).wireframe = false;
      (mats.terrainGreen as THREE.MeshStandardMaterial).wireframe = false;
      (mats.bldgConcrete as THREE.MeshStandardMaterial).wireframe = false;
    } else if (mode === 'thermal') {
      // Heat Island Thermal: 45°C scorching red asphalt/concrete -> 24°C cooling blue commons
      (mats.terrainGreen as THREE.MeshStandardMaterial).color.setHex(0xb91c1c); // Surface heat
      (mats.bldgConcrete as THREE.MeshStandardMaterial).color.setHex(0xef4444);  // Dense concrete thermal mass
      (mats.terracotta as THREE.MeshStandardMaterial).color.setHex(0xf97316);   // Warm updraft towers
      (mats.sandstone as THREE.MeshStandardMaterial).color.setHex(0x0284c7);    // Cool sunken stepwell
      (mats.water as THREE.MeshStandardMaterial).color.setHex(0x06b6d4);        // Chilled pool
      (mats.sandstone as THREE.MeshStandardMaterial).wireframe = false;
      (mats.terrainGreen as THREE.MeshStandardMaterial).wireframe = false;
      (mats.bldgConcrete as THREE.MeshStandardMaterial).wireframe = false;
    } else if (mode === 'xray') {
      // Structural X-Ray Wireframe
      (mats.terrainGreen as THREE.MeshStandardMaterial).color.setHex(0x10b981);
      (mats.sandstone as THREE.MeshStandardMaterial).color.setHex(0x38bdf8);
      (mats.bldgConcrete as THREE.MeshStandardMaterial).color.setHex(0x94a3b8);
      (mats.sandstone as THREE.MeshStandardMaterial).wireframe = true;
      (mats.terrainGreen as THREE.MeshStandardMaterial).wireframe = true;
      (mats.bldgConcrete as THREE.MeshStandardMaterial).wireframe = true;
    }
  };

  return (
    <section id="3d-map" className="py-20 bg-[#0A110E] text-stone-100 border-t border-stone-800 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-semibold bg-[#C85A32]/20 text-[#E07A5F] border border-[#C85A32]/30 mb-3">
              <Building2 className="w-3.5 h-3.5" />
              <span>Live Township Spatial Simulation</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              3D Eco-Town Map & Live Urban Activity
            </h2>
            <p className="mt-2 text-stone-400 text-sm sm:text-base max-w-3xl font-light">
              A fully animated 3D smart township centered around the <span className="text-[#E07A5F] font-semibold">PrithviVahini Subterranean Commons</span>. Watch autonomous EV traffic, pedestrians descending into the sunken pavilion, active rainwater infiltration, and rotating eco-turbines.
            </p>
          </div>

          {/* Quick Stats Pill */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <div className="flex items-center space-x-1.5 bg-stone-900/80 px-3 py-2 rounded-xl border border-stone-800 text-stone-300">
              <Users className="w-3.5 h-3.5 text-emerald-400" />
              <span><strong>4,800</strong> Citizens</span>
            </div>
            <div className="flex items-center space-x-1.5 bg-stone-900/80 px-3 py-2 rounded-xl border border-stone-800 text-stone-300">
              <Car className="w-3.5 h-3.5 text-sky-400" />
              <span><strong>12</strong> EV Shuttles</span>
            </div>
            <div className="flex items-center space-x-1.5 bg-stone-900/80 px-3 py-2 rounded-xl border border-stone-800 text-stone-300">
              <Thermometer className="w-3.5 h-3.5 text-[#E07A5F]" />
              <span><strong>-7.2°C</strong> Commons Offset</span>
            </div>
          </div>
        </div>

        {/* 3D Viewport Card */}
        <div className={`relative rounded-3xl bg-[#0F1713] border border-stone-800 shadow-2xl overflow-hidden transition-all ${
          isFullscreen ? 'fixed inset-4 z-50 rounded-2xl h-[calc(100vh-2rem)]' : 'h-[650px] w-full'
        }`}>
          
          {/* TOP CONTROL BAR */}
          <div className="absolute top-4 left-4 right-4 z-20 flex flex-wrap items-center justify-between gap-3 pointer-events-none">
            
            {/* District & Camera Focus Presets */}
            <div className="flex flex-wrap items-center space-x-1 bg-black/65 backdrop-blur-md p-1.5 rounded-xl border border-white/10 pointer-events-auto">
              <span className="text-[10px] uppercase font-mono text-stone-400 px-2">Focus:</span>
              <button
                onClick={() => handleSetPreset('town')}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                  cameraPreset === 'town' ? 'bg-[#C85A32] text-white shadow-sm' : 'text-stone-300 hover:text-white'
                }`}
              >
                Full Township
              </button>
              <button
                onClick={() => handleSetPreset('stepwell')}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                  cameraPreset === 'stepwell' ? 'bg-[#C85A32] text-white shadow-sm' : 'text-stone-300 hover:text-white'
                }`}
              >
                Stepwell Baoli
              </button>
              <button
                onClick={() => handleSetPreset('residential')}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                  cameraPreset === 'residential' ? 'bg-[#C85A32] text-white shadow-sm' : 'text-stone-300 hover:text-white'
                }`}
              >
                Society Towers
              </button>
              <button
                onClick={() => handleSetPreset('market')}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                  cameraPreset === 'market' ? 'bg-[#C85A32] text-white shadow-sm' : 'text-stone-300 hover:text-white'
                }`}
              >
                Bazaar & Transit
              </button>
              <button
                onClick={() => handleSetPreset('underground')}
                className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                  cameraPreset === 'underground' ? 'bg-[#C85A32] text-white shadow-sm' : 'text-stone-300 hover:text-white'
                }`}
              >
                Aquifer Basin
              </button>
            </div>

            {/* Time-of-Day Lighting Presets: Day vs Night Energy-Free Sanctuary */}
            <div className="flex items-center space-x-1 bg-black/80 backdrop-blur-md p-1 rounded-xl border border-white/15 pointer-events-auto text-xs shadow-lg">
              <span className="text-[10px] uppercase font-mono text-stone-400 px-1.5 flex items-center space-x-1">
                <span>Lighting:</span>
              </span>
              <button
                onClick={() => setIsNight(false)}
                className={`px-2.5 py-1.5 rounded-lg font-medium transition-all flex items-center space-x-1.5 ${
                  !isNight
                    ? 'bg-amber-600 text-white shadow-sm font-semibold'
                    : 'text-stone-300 hover:text-white hover:bg-white/5'
                }`}
                title="Switch to Daytime Preset (Solar Peak & Natural Daylight)"
              >
                <Sun className="w-3.5 h-3.5 text-amber-300" />
                <span>Day (Solar)</span>
              </button>
              <button
                onClick={() => {
                  setIsNight(true);
                  setShowNightLightingInfo(true);
                }}
                className={`px-2.5 py-1.5 rounded-lg font-medium transition-all flex items-center space-x-1.5 ${
                  isNight
                    ? 'bg-gradient-to-r from-indigo-900 to-teal-800 text-teal-100 border border-teal-400/40 font-semibold shadow-sm'
                    : 'text-stone-300 hover:text-white hover:bg-white/5'
                }`}
                title="Switch to Night Preset: Showcase Sanctuary's 100% Energy-Free Luminescence"
              >
                <Moon className="w-3.5 h-3.5 text-teal-300" />
                <span>Night (Energy-Free Sanctuary)</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse ml-0.5" />
              </button>
            </div>

            {/* Quick Action to Focus on Sanctuary Glow */}
            {isNight && (
              <button
                onClick={() => handleSetPreset('stepwell')}
                className="flex items-center space-x-1.5 px-2.5 py-1.5 rounded-xl text-xs font-semibold bg-emerald-950/85 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-900 transition-all pointer-events-auto shadow-lg"
                title="Zoom camera directly into the glowing Stepwell Baoli"
              >
                <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                <span>Showcase Stepwell Glow</span>
              </button>
            )}

            {/* Live Atmosphere & Environment Controls */}
            <div className="flex items-center space-x-2 bg-black/65 backdrop-blur-md p-1.5 rounded-xl border border-white/10 pointer-events-auto text-xs">

              {/* Monsoon Cloudburst Rain Toggle */}
              <button
                onClick={() => setIsRaining(!isRaining)}
                className={`px-2.5 py-1 rounded-lg transition-all flex items-center space-x-1.5 ${
                  isRaining ? 'bg-sky-900/80 text-sky-200 border border-sky-700/60 font-semibold' : 'text-stone-400 hover:text-stone-200'
                }`}
                title="Simulate Monsoon Cloudburst Rainfall"
              >
                <CloudRain className={`w-3 h-3 ${isRaining ? 'text-sky-300 animate-bounce' : 'text-stone-400'}`} />
                <span>Rain: {isRaining ? 'ON' : 'OFF'}</span>
              </button>

              {/* Traffic Play / Pause */}
              <button
                onClick={() => setTrafficRunning(!trafficRunning)}
                className={`p-1.5 rounded-lg transition-colors ${
                  trafficRunning ? 'text-emerald-400 bg-emerald-950/50' : 'text-stone-400 hover:text-white'
                }`}
                title={trafficRunning ? "Pause Traffic" : "Resume Traffic"}
              >
                {trafficRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              </button>

              {/* Shading Mode Picker */}
              <div className="flex items-center space-x-1 pl-1 border-l border-white/10">
                <button
                  onClick={() => handleSetViewMode('realistic')}
                  className={`px-2 py-1 rounded-lg transition-all ${
                    viewMode === 'realistic' ? 'bg-stone-700 text-white font-semibold' : 'text-stone-400 hover:text-white'
                  }`}
                  title="Photorealistic Eco-Town Materials"
                >
                  City
                </button>
                <button
                  onClick={() => handleSetViewMode('thermal')}
                  className={`px-2 py-1 rounded-lg transition-all flex items-center space-x-1 ${
                    viewMode === 'thermal' ? 'bg-red-900/70 text-red-200 font-semibold border border-red-700/60' : 'text-stone-400 hover:text-white'
                  }`}
                  title="Urban Heat Island Thermal Signature"
                >
                  <Thermometer className="w-3 h-3 text-red-400" />
                  <span>Thermal</span>
                </button>
                <button
                  onClick={() => handleSetViewMode('xray')}
                  className={`px-2 py-1 rounded-lg transition-all ${
                    viewMode === 'xray' ? 'bg-sky-900/70 text-sky-200 font-semibold' : 'text-stone-400 hover:text-white'
                  }`}
                  title="Engineering X-Ray Wireframe"
                >
                  X-Ray
                </button>
              </div>

              {/* Auto-Turntable Rotation */}
              <button
                onClick={() => setIsAutoRotate(!isAutoRotate)}
                className={`p-1.5 rounded-lg transition-colors ${
                  isAutoRotate ? 'text-[#E07A5F] bg-[#C85A32]/20' : 'text-stone-400 hover:text-white'
                }`}
                title={isAutoRotate ? "Pause Turntable" : "Start 360° Turntable"}
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

          {/* FLOATING SHOWCASE: Sanctuary Energy-Free Lighting System (Active when Night preset is selected) */}
          {isNight && (
            <div className="absolute top-20 right-4 z-20 pointer-events-auto max-w-sm w-full sm:w-80 bg-black/85 backdrop-blur-md border border-teal-500/30 p-4 rounded-2xl shadow-2xl text-xs text-stone-200 animate-fadeIn">
              <div className="flex items-center justify-between pb-2 border-b border-teal-500/20 mb-2.5">
                <div className="flex items-center space-x-2">
                  <div className="w-6 h-6 rounded-lg bg-teal-500/20 border border-teal-400/40 flex items-center justify-center text-teal-300">
                    <Moon className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h5 className="font-bold text-white text-xs leading-none">
                      Sanctuary Night Luminescence
                    </h5>
                    <span className="text-[10px] text-teal-400 font-mono">
                      100% Zero-Grid Energy
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-1.5">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-950 text-emerald-300 border border-emerald-700/50">
                    0.00 kWh
                  </span>
                  <button
                    onClick={() => setShowNightLightingInfo(!showNightLightingInfo)}
                    className="p-1 text-stone-400 hover:text-white rounded transition-colors"
                    title={showNightLightingInfo ? "Minimize details" : "Expand details"}
                  >
                    <Info className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {showNightLightingInfo && (
                <div className="space-y-2 text-[11px]">
                  <div className="flex items-start space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1 flex-shrink-0 animate-pulse" />
                    <div>
                      <strong className="text-emerald-300">Photoluminescent Step Treads:</strong>
                      <span className="text-stone-300 ml-1">
                        7 concentric sandstone terraces inlaid with strontium aluminate mineral aggregate. Absorbs UV by day; radiates 12+ hours of emerald-cyan pathway glow.
                      </span>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-400 mt-1 flex-shrink-0 animate-pulse" />
                    <div>
                      <strong className="text-sky-300">Optical Moon-Shaft Collimator:</strong>
                      <span className="text-stone-300 ml-1">
                        Mirror-lined parabolic conduits atop the 8 cooling chimneys channel lunar starlight directly onto the central water reservoir.
                      </span>
                    </div>
                  </div>
                  <div className="flex items-start space-x-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1 flex-shrink-0" />
                    <div>
                      <strong className="text-amber-300">Deepak-Gokh Amber Niches:</strong>
                      <span className="text-stone-300 ml-1">
                        Recessed wall alcoves with natural phosphorescent crystals cast warm amber wayfinding beacons across the colonnade.
                      </span>
                    </div>
                  </div>

                  <div className="mt-2.5 pt-2 border-t border-white/10 flex items-center justify-between text-[10px] font-mono text-stone-400">
                    <span className="text-emerald-400 font-semibold">✓ Dark-Sky Certified</span>
                    <button
                      onClick={() => handleSetPreset('stepwell')}
                      className="text-[#E07A5F] hover:text-white font-sans font-medium transition-colors underline"
                    >
                      Focus Baoli Core →
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* BOTTOM-LEFT: Live Town Activity Feed */}
          <div className="absolute bottom-4 left-4 z-20 pointer-events-auto bg-black/75 backdrop-blur-md border border-white/10 rounded-2xl p-3.5 text-xs text-stone-300 max-w-xs shadow-xl hidden sm:block">
            <div className="flex items-center justify-between pb-1.5 border-b border-white/10 mb-2">
              <span className="text-[10px] uppercase font-mono tracking-widest text-[#E07A5F] font-bold">
                Live Town Elements
              </span>
              <span className="flex items-center space-x-1 text-[10px] text-emerald-400 font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span>ONLINE</span>
              </span>
            </div>

            <div className="space-y-1.5 text-[11px]">
              <div className="flex items-center justify-between">
                <span className="flex items-center space-x-1.5">
                  <Car className="w-3 h-3 text-sky-400" />
                  <span>Autonomous EV Shuttles</span>
                </span>
                <span className="font-mono text-stone-300">{trafficRunning ? 'Active' : 'Paused'}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center space-x-1.5">
                  <Users className="w-3 h-3 text-emerald-400" />
                  <span>Pedestrians on Promenade</span>
                </span>
                <span className="font-mono text-stone-300">22 Tracked</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center space-x-1.5">
                  <Wind className="w-3 h-3 text-amber-400" />
                  <span>Eco-Park Turbines</span>
                </span>
                <span className="font-mono text-stone-300">3 Spinning</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center space-x-1.5">
                  <Droplets className="w-3 h-3 text-cyan-400" />
                  <span>Aquifer Recharge Bed</span>
                </span>
                <span className="font-mono text-stone-300">{isRaining ? 'Max Flow' : 'Nominal'}</span>
              </div>
            </div>
          </div>

          {/* BOTTOM-RIGHT: District Inspector Card */}
          <div className="absolute bottom-4 right-4 z-20 pointer-events-auto max-w-sm bg-black/75 backdrop-blur-md border border-white/10 p-3.5 rounded-2xl shadow-xl text-xs">
            <span className="text-[10px] uppercase font-mono text-stone-400 block mb-1">
              Active District:
            </span>
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-white text-sm">
                {selectedDistrict === 'all' && 'Entire Sponge-Town Masterplan'}
                {selectedDistrict === 'stepwell' && 'Tier 3: PrithviVahini Baoli Core'}
                {selectedDistrict === 'residential' && 'North-East: Residential Towers'}
                {selectedDistrict === 'market' && 'South-West: Bazaar & Transit Hub'}
                {selectedDistrict === 'aquifer' && 'Tier 4: Subterranean Aquifer Basin'}
              </h4>
              <span className="text-[10px] text-[#E07A5F] font-mono font-semibold">
                {selectedDistrict === 'all' ? '90m × 90m' : '-7.2°C Delta'}
              </span>
            </div>
            <p className="mt-1 text-[11px] text-stone-300 leading-snug">
              {selectedDistrict === 'all' && 'Integrated sponge-city design capturing 80% stormwater runoff and cooling ambient temperatures by 8°C.'}
              {selectedDistrict === 'stepwell' && '7 concentric sandstone tiers with central reflecting pool and 8 stack-convection terracotta chimneys.'}
              {selectedDistrict === 'residential' && 'High-density multi-story societies with solar arrays, green balconies, and rooftop rainwater downspouts.'}
              {selectedDistrict === 'market' && 'Pedestrian-friendly market pavilions and electric vehicle charging bays connected to clean microgrid.'}
              {selectedDistrict === 'aquifer' && 'Deep gravel filtration strata delivering silt-free stormwater directly into confined aquifers.'}
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
