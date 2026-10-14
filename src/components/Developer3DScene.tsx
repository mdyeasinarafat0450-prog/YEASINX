"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import {
  Layers,
  Sparkles,
  RefreshCcw,
  Play,
  Pause,
  AlertCircle,
  Palette,
  Box,
} from "lucide-react";

export interface ModelColorTheme {
  id: string;
  name: string;
  label: string;
  badgeHex: string;
  primary: number; // Neon green / pink / cyan / gold
  secondary: number; // Screen / secondary glow
  tertiary: number; // Accent code & charts
  rimColor: number;
  floorGlow: number;
}

export const COLOR_THEMES: ModelColorTheme[] = [
  {
    id: "neon-green",
    name: "NEXORA NEON",
    label: "NEON",
    badgeHex: "#B6FF3B",
    primary: 0xb6ff3b, // Signature Electric Lime
    secondary: 0x38bdf8, // Electric Cyan
    tertiary: 0xc084fc, // Vivid Violet
    rimColor: 0xb6ff3b,
    floorGlow: 0xb6ff3b,
  },
  {
    id: "cyberpunk",
    name: "CYBERPUNK PINK",
    label: "PINK",
    badgeHex: "#EC4899",
    primary: 0xec4899, // Hot Neon Pink
    secondary: 0x06b6d4, // Cyan
    tertiary: 0xfacc15, // Cyber Yellow
    rimColor: 0xec4899,
    floorGlow: 0xec4899,
  },
  {
    id: "electric-cyan",
    name: "ELECTRIC CYAN",
    label: "CYAN",
    badgeHex: "#00F0FF",
    primary: 0x00f0ff, // Cyber Cyan
    secondary: 0x3b82f6, // Royal Blue
    tertiary: 0xa855f7, // Deep Purple
    rimColor: 0x00f0ff,
    floorGlow: 0x00f0ff,
  },
  {
    id: "amber-gold",
    name: "AMBER GOLD",
    label: "GOLD",
    badgeHex: "#F59E0B",
    primary: 0xf59e0b, // Warm Gold
    secondary: 0x10b981, // Emerald Green
    tertiary: 0xef4444, // Crimson Red
    rimColor: 0xf59e0b,
    floorGlow: 0xf59e0b,
  },
];

/**
 * Creates custom tailored, cyber-aesthetic materials for every single mesh in the 3D scene.
 */
function createMeshMaterial(name: string, theme: ModelColorTheme): THREE.Material {
  // 1. Human Skin: Realistic warm skin tone with soft micro-specularity
  if (
    name === "head" ||
    name === "neck" ||
    name.startsWith("ear") ||
    name === "nose" ||
    name.startsWith("hand")
  ) {
    return new THREE.MeshStandardMaterial({
      color: 0xdf9d80,
      roughness: 0.55,
      metalness: 0.04,
    });
  }

  // 2. Hair, Beard & Curls: Deep espresso black hair
  if (name === "hair_cap" || name.startsWith("curl") || name === "moustache") {
    return new THREE.MeshStandardMaterial({
      color: 0x140f0c,
      roughness: 0.8,
      metalness: 0.04,
    });
  }

  // 3. Eyes: Glossy dark cyber eyes with subtle reflection
  if (name.startsWith("eye")) {
    return new THREE.MeshStandardMaterial({
      color: 0x060608,
      roughness: 0.08,
      metalness: 0.9,
    });
  }

  // 4. Streetwear Developer Hoodie: High-tech dark matte streetwear
  if (
    name === "torso" ||
    name.startsWith("upper_arm") ||
    name.startsWith("elbow") ||
    name.startsWith("forearm")
  ) {
    return new THREE.MeshStandardMaterial({
      color: 0x15171a,
      roughness: 0.85,
      metalness: 0.08,
    });
  }

  // 5. Tactical Pants
  if (name.startsWith("thigh") || name.startsWith("knee") || name.startsWith("shin")) {
    return new THREE.MeshStandardMaterial({
      color: 0x1c2128,
      roughness: 0.78,
      metalness: 0.1,
    });
  }

  // 6. Sneaker Uppers
  if (name.startsWith("shoe-") || name === "shoe1") {
    return new THREE.MeshStandardMaterial({
      color: 0x181a1d,
      roughness: 0.45,
      metalness: 0.15,
    });
  }

  // 7. Glowing Sneaker Soles
  if (name.includes("shoe_sole")) {
    return new THREE.MeshStandardMaterial({
      color: theme.primary,
      emissive: new THREE.Color(theme.primary),
      emissiveIntensity: 0.8,
      roughness: 0.28,
    });
  }

  // 8. Smartwatch Band & Glowing Face
  if (name === "watch_band") {
    return new THREE.MeshStandardMaterial({
      color: 0x22262e,
      roughness: 0.5,
      metalness: 0.3,
    });
  }
  if (name === "watch_face") {
    return new THREE.MeshStandardMaterial({
      color: 0x000000,
      emissive: new THREE.Color(theme.secondary),
      emissiveIntensity: 1.6,
      roughness: 0.1,
    });
  }

  // 9. Gaming Chair Glowing Racing Accent Trim
  if (name.includes("chair_back_green_trim")) {
    return new THREE.MeshStandardMaterial({
      color: theme.primary,
      emissive: new THREE.Color(theme.primary),
      emissiveIntensity: 1.4,
      roughness: 0.2,
    });
  }

  // 10. Gaming Chair Inner Back Mesh
  if (name === "chair_back_inner") {
    return new THREE.MeshStandardMaterial({
      color: 0x242830,
      roughness: 0.6,
      metalness: 0.15,
    });
  }

  // 11. Gaming Chair Seat & Back Leather
  if (name === "chair_seat" || name === "chair_back") {
    return new THREE.MeshStandardMaterial({
      color: 0x181a1e,
      roughness: 0.42,
      metalness: 0.22,
    });
  }

  // 12. Chair Stem & Chrome Legs
  if (name === "chair_stem" || name.startsWith("chair_leg")) {
    return new THREE.MeshStandardMaterial({
      color: 0x484f5a,
      roughness: 0.2,
      metalness: 0.9,
    });
  }

  // 13. Chair Wheels
  if (name.startsWith("chair_wheel")) {
    return new THREE.MeshStandardMaterial({
      color: 0x101214,
      roughness: 0.65,
      metalness: 0.1,
    });
  }

  // 14. Workstation Desk Surface (Obsidian / Matte Carbon)
  if (name === "desk_top") {
    return new THREE.MeshStandardMaterial({
      color: 0x16181c,
      roughness: 0.32,
      metalness: 0.35,
    });
  }

  // 15. Glowing Desk Front Edge LED Strip
  if (name === "desk_front_trim") {
    return new THREE.MeshStandardMaterial({
      color: theme.primary,
      emissive: new THREE.Color(theme.primary),
      emissiveIntensity: 1.5,
      roughness: 0.2,
    });
  }

  // 16. Desk Steel Frame Legs
  if (name.startsWith("desk_leg")) {
    return new THREE.MeshStandardMaterial({
      color: 0x22252a,
      roughness: 0.35,
      metalness: 0.8,
    });
  }

  // 17. Drawer Unit
  if (name === "drawer_unit") {
    return new THREE.MeshStandardMaterial({
      color: 0x1a1d22,
      roughness: 0.42,
      metalness: 0.5,
    });
  }

  // 18. Drawer Handles & Trim
  if (name.startsWith("drawer_line")) {
    return new THREE.MeshStandardMaterial({
      color: 0x94a3b8,
      roughness: 0.2,
      metalness: 0.9,
    });
  }

  // 19. Monitor Bezels & Stands
  if (name.startsWith("monitor_frame")) {
    return new THREE.MeshStandardMaterial({
      color: 0x0f1114,
      roughness: 0.35,
      metalness: 0.3,
    });
  }
  if (name.startsWith("monitor_stand") || name.startsWith("monitor_foot")) {
    return new THREE.MeshStandardMaterial({
      color: 0x272b32,
      roughness: 0.28,
      metalness: 0.85,
    });
  }

  // 20. Monitor Screens: Deep IDE background with glowing screens
  if (name === "monitor_screen0") {
    return new THREE.MeshStandardMaterial({
      color: 0x050a12,
      emissive: new THREE.Color(0x0284c7),
      emissiveIntensity: 0.25,
      roughness: 0.18,
    });
  }
  if (name === "monitor_screen1") {
    return new THREE.MeshStandardMaterial({
      color: 0x050f09,
      emissive: new THREE.Color(theme.primary),
      emissiveIntensity: 0.22,
      roughness: 0.18,
    });
  }
  if (name === "monitor_screen2") {
    return new THREE.MeshStandardMaterial({
      color: 0x0b0713,
      emissive: new THREE.Color(theme.tertiary),
      emissiveIntensity: 0.25,
      roughness: 0.18,
    });
  }

  // 21. Glowing Syntax Code Lines
  if (name.startsWith("code_0_")) {
    return new THREE.MeshStandardMaterial({
      color: theme.secondary,
      emissive: new THREE.Color(theme.secondary),
      emissiveIntensity: 1.6,
      roughness: 0.2,
    });
  }
  if (name.startsWith("code_1_")) {
    return new THREE.MeshStandardMaterial({
      color: theme.primary,
      emissive: new THREE.Color(theme.primary),
      emissiveIntensity: 1.8,
      roughness: 0.2,
    });
  }
  if (name.startsWith("code_2_")) {
    return new THREE.MeshStandardMaterial({
      color: theme.tertiary,
      emissive: new THREE.Color(theme.tertiary),
      emissiveIntensity: 1.6,
      roughness: 0.2,
    });
  }

  // 22. Mechanical Keyboard & Glowing Keycaps
  if (name === "keyboard") {
    return new THREE.MeshStandardMaterial({
      color: 0x14161a,
      roughness: 0.35,
      metalness: 0.55,
    });
  }
  if (name.startsWith("key_")) {
    const isAccentKey =
      name === "key_0_0" ||
      name === "key_1_1" ||
      name === "key_1_2" ||
      name === "key_1_3" ||
      name === "key_2_10" ||
      name === "key_0_11";
    if (isAccentKey) {
      return new THREE.MeshStandardMaterial({
        color: theme.primary,
        emissive: new THREE.Color(theme.primary),
        emissiveIntensity: 1.4,
        roughness: 0.25,
      });
    }
    return new THREE.MeshStandardMaterial({
      color: 0x22262e,
      roughness: 0.5,
      metalness: 0.2,
    });
  }

  // 23. Gaming Mouse with glowing accent
  if (name === "mouse") {
    return new THREE.MeshStandardMaterial({
      color: 0x16181d,
      roughness: 0.32,
      metalness: 0.35,
      emissive: new THREE.Color(theme.primary),
      emissiveIntensity: 0.35,
    });
  }

  // 24. PC Chassis & Tempered Glass
  if (name === "pc_case") {
    return new THREE.MeshStandardMaterial({
      color: 0x121417,
      roughness: 0.38,
      metalness: 0.65,
    });
  }
  if (name === "pc_glass") {
    return new THREE.MeshStandardMaterial({
      color: 0x0a1016,
      transparent: true,
      opacity: 0.42,
      roughness: 0.05,
      metalness: 0.95,
    });
  }

  // 25. Glowing PC Ring Fans
  if (name === "pc_fan_0" || name === "pc_fan_2") {
    return new THREE.MeshStandardMaterial({
      color: theme.primary,
      emissive: new THREE.Color(theme.primary),
      emissiveIntensity: 2.0,
      roughness: 0.2,
    });
  }
  if (name === "pc_fan_1") {
    return new THREE.MeshStandardMaterial({
      color: theme.secondary,
      emissive: new THREE.Color(theme.secondary),
      emissiveIntensity: 2.0,
      roughness: 0.2,
    });
  }

  // 26. Ceramic Mug & Glowing Neon Rim
  if (name === "mug") {
    return new THREE.MeshStandardMaterial({
      color: 0x22252a,
      roughness: 0.28,
      metalness: 0.1,
    });
  }
  if (name === "mug_green_rim") {
    return new THREE.MeshStandardMaterial({
      color: theme.primary,
      emissive: new THREE.Color(theme.primary),
      emissiveIntensity: 1.3,
      roughness: 0.2,
    });
  }

  // 27. Tech Books with vibrant spines
  if (name === "book0") {
    return new THREE.MeshStandardMaterial({
      color: 0x6366f1, // Electric Indigo
      roughness: 0.55,
      metalness: 0.1,
    });
  }
  if (name === "book1") {
    return new THREE.MeshStandardMaterial({
      color: 0x10b981, // Emerald Green
      roughness: 0.55,
      metalness: 0.1,
    });
  }
  if (name === "book2") {
    return new THREE.MeshStandardMaterial({
      color: 0xf43f5e, // Vibrant Coral/Crimson
      roughness: 0.55,
      metalness: 0.1,
    });
  }

  // 28. Sci-Fi Pedestal & Floor Laser Ring
  if (name === "display_base") {
    return new THREE.MeshStandardMaterial({
      color: 0x0d100e,
      roughness: 0.45,
      metalness: 0.4,
    });
  }
  if (name === "green_base_trim") {
    return new THREE.MeshStandardMaterial({
      color: theme.primary,
      emissive: new THREE.Color(theme.primary),
      emissiveIntensity: 1.6,
      roughness: 0.2,
    });
  }

  // Default fallback
  return new THREE.MeshStandardMaterial({
    color: 0x22262d,
    roughness: 0.45,
    metalness: 0.3,
  });
}

interface Developer3DSceneProps {
  isWireframe?: boolean;
  onToggleWireframe?: (wireframe: boolean) => void;
  className?: string;
  showOverlayControls?: boolean;
}

export default function Developer3DScene({
  isWireframe: controlledWireframe,
  onToggleWireframe,
  className = "",
  showOverlayControls = true,
}: Developer3DSceneProps) {
  const mountRef = useRef<HTMLDivElement | null>(null);

  // States
  const [loadingProgress, setLoadingProgress] = useState<number>(0);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [internalWireframe, setInternalWireframe] = useState<boolean>(false);
  const [isAutoRotating, setIsAutoRotating] = useState<boolean>(true);
  const [isUserInteracting, setIsUserInteracting] = useState<boolean>(false);
  const [activeThemeId, setActiveThemeId] = useState<string>("neon-green");

  const activeTheme =
    COLOR_THEMES.find((t) => t.id === activeThemeId) || COLOR_THEMES[0];

  // Keep track of controlled vs internal wireframe
  const effectiveWireframe =
    controlledWireframe !== undefined ? controlledWireframe : internalWireframe;

  // Refs for Three.js objects
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const modelGroupRef = useRef<THREE.Group | null>(null);

  // Dynamic light & material refs
  const rimLightRef = useRef<THREE.DirectionalLight | null>(null);
  const monitorGlowRef = useRef<THREE.PointLight | null>(null);
  const underdeskGlowRef = useRef<THREE.PointLight | null>(null);
  const floorRingRef = useRef<THREE.Mesh | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);

  const initialCamPos = useRef<THREE.Vector3>(new THREE.Vector3(2.8, 1.8, 2.4));
  const initialTarget = useRef<THREE.Vector3>(new THREE.Vector3(0, 0.45, 0.6));
  const scrollTargetRotationY = useRef<number>(0);

  // Sync scroll inertia with 3D character workstation rotation
  useEffect(() => {
    const handleWindowScroll = () => {
      const sy = window.scrollY;
      scrollTargetRotationY.current = Math.min(Math.max((sy / 750) * 0.45, -0.45), 0.45);
    };
    window.addEventListener("scroll", handleWindowScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleWindowScroll);
  }, []);

  // Store original materials mapped by mesh UUID for seamless wireframe switching
  const originalMaterialsMap = useRef<Map<string, THREE.Material>>(new Map());
  const wireframeMaterial = useRef<THREE.MeshBasicMaterial>(
    new THREE.MeshBasicMaterial({
      color: activeTheme.primary,
      wireframe: true,
      transparent: true,
      opacity: 0.85,
    })
  );

  // Toggle wireframe mode
  const toggleWireframe = useCallback(() => {
    const nextState = !effectiveWireframe;
    setInternalWireframe(nextState);
    if (onToggleWireframe) {
      onToggleWireframe(nextState);
    }
  }, [effectiveWireframe, onToggleWireframe]);

  // Apply or remove wireframe mode
  useEffect(() => {
    const modelGroup = modelGroupRef.current;
    if (!modelGroup) return;

    modelGroup.traverse((child) => {
      if ((child as THREE.Mesh).isMesh) {
        const mesh = child as THREE.Mesh;
        if (effectiveWireframe) {
          mesh.material = wireframeMaterial.current;
        } else {
          const orig = originalMaterialsMap.current.get(mesh.uuid);
          if (orig) {
            mesh.material = orig;
          }
        }
      }
    });
  }, [effectiveWireframe]);

  // Dynamic Theme Switcher: updates materials and lighting in real time
  const handleSelectTheme = useCallback((theme: ModelColorTheme) => {
    setActiveThemeId(theme.id);

    // Update wireframe material color
    wireframeMaterial.current.color.setHex(theme.primary);

    // Update scene lights & floor ring
    if (rimLightRef.current) rimLightRef.current.color.setHex(theme.rimColor);
    if (monitorGlowRef.current) monitorGlowRef.current.color.setHex(theme.secondary);
    if (underdeskGlowRef.current) underdeskGlowRef.current.color.setHex(theme.primary);
    if (floorRingRef.current && (floorRingRef.current.material as THREE.MeshBasicMaterial)) {
      (floorRingRef.current.material as THREE.MeshBasicMaterial).color.setHex(theme.floorGlow);
    }
    if (particlesRef.current && (particlesRef.current.material as THREE.PointsMaterial)) {
      (particlesRef.current.material as THREE.PointsMaterial).color.setHex(theme.primary);
    }

    // Update model meshes
    const modelGroup = modelGroupRef.current;
    if (modelGroup) {
      modelGroup.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const mesh = child as THREE.Mesh;
          const newMat = createMeshMaterial(mesh.name, theme);
          originalMaterialsMap.current.set(mesh.uuid, newMat);

          if (!effectiveWireframe) {
            mesh.material = newMat;
          }
        }
      });
    }
  }, [effectiveWireframe]);

  // Reset Camera View
  const handleResetCamera = useCallback(() => {
    if (!controlsRef.current || !cameraRef.current) return;
    const controls = controlsRef.current;
    const camera = cameraRef.current;

    controls.reset();
    camera.position.copy(initialCamPos.current);
    controls.target.copy(initialTarget.current);
    controls.update();
  }, []);

  // Main Three.js Lifecycle
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Check WebGL availability
    const checkWebGL = () => {
      try {
        const canvas = document.createElement("canvas");
        return !!(
          window.WebGLRenderingContext &&
          (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
        );
      } catch {
        return false;
      }
    };

    if (!checkWebGL()) {
      setErrorMessage("WebGL is not supported on this device/browser.");
      return;
    }

    let animationFrameId: number;
    const width = container.clientWidth || 600;
    const height = container.clientHeight || 450;

    // 1. SCENE & ATMOSPHERE
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(0x080a09);
    scene.fog = new THREE.FogExp2(0x080a09, 0.08);

    // 2. CAMERA
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.copy(initialCamPos.current);
    cameraRef.current = camera;

    // 3. RENDERER
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.4;
      rendererRef.current = renderer;
      container.appendChild(renderer.domElement);
    } catch (err) {
      console.error("Renderer initialization failed:", err);
      setErrorMessage("Failed to initialize 3D WebGL renderer.");
      return;
    }

    // 4. ORBIT CONTROLS
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.06;
    controls.target.copy(initialTarget.current);
    controls.minDistance = 2.5;
    controls.maxDistance = 7.5;
    controls.maxPolarAngle = Math.PI / 2 + 0.04; // Don't clip below floor plinth
    controls.minPolarAngle = Math.PI / 8;
    controls.autoRotate = isAutoRotating;
    controls.autoRotateSpeed = 1.2;
    controlsRef.current = controls;

    let resumeAutoRotateTimeout: NodeJS.Timeout;
    controls.addEventListener("start", () => {
      setIsUserInteracting(true);
      clearTimeout(resumeAutoRotateTimeout);
    });
    controls.addEventListener("end", () => {
      resumeAutoRotateTimeout = setTimeout(() => {
        setIsUserInteracting(false);
      }, 2500);
    });

    // 5. ENHANCED MULTI-LIGHT RIG
    // Ambient soft fill
    const ambientLight = new THREE.AmbientLight(0x161d19, 2.2);
    scene.add(ambientLight);

    // Front-Top Key Light for sharp 3D specular depth & cast shadow
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.6);
    keyLight.position.set(3.8, 5.2, 4.2);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    keyLight.shadow.bias = -0.0005;
    keyLight.shadow.camera.near = 1;
    keyLight.shadow.camera.far = 15;
    scene.add(keyLight);

    // Soft Cool Fill Light from opposite side
    const fillLight = new THREE.DirectionalLight(0xb0d5f8, 1.3);
    fillLight.position.set(-3.5, 3.2, 3.5);
    scene.add(fillLight);

    // Cyber Rim Light (Behind Coder) highlighting edges
    const rimLight = new THREE.DirectionalLight(activeTheme.rimColor, 3.8);
    rimLight.position.set(-3.5, 4.0, -3.2);
    rimLight.target.position.set(0, 0.5, 0);
    scene.add(rimLight);
    scene.add(rimLight.target);
    rimLightRef.current = rimLight;

    // Monitor Front Glow Point Light (Illuminates coder's face, hands & keyboard)
    const monitorGlow = new THREE.PointLight(activeTheme.secondary, 2.8, 3.4, 1.8);
    monitorGlow.position.set(0, 0.95, 1.15);
    scene.add(monitorGlow);
    monitorGlowRef.current = monitorGlow;

    // Under-desk Cyber Glow Point Light
    const underdeskGlow = new THREE.PointLight(activeTheme.primary, 2.2, 2.5, 2.0);
    underdeskGlow.position.set(0, -0.2, 0.9);
    scene.add(underdeskGlow);
    underdeskGlowRef.current = underdeskGlow;

    // 6. FLOOR PLINTH & CYBER GRID
    // Plinth circular platform
    const plinthGeometry = new THREE.CylinderGeometry(2.35, 2.45, 0.08, 64);
    const plinthMaterial = new THREE.MeshStandardMaterial({
      color: 0x090e0c,
      roughness: 0.6,
      metalness: 0.3,
    });
    const plinth = new THREE.Mesh(plinthGeometry, plinthMaterial);
    plinth.position.y = -0.76;
    plinth.receiveShadow = true;
    scene.add(plinth);

    // Glowing Neon Ring around Plinth
    const ringGeometry = new THREE.RingGeometry(2.36, 2.44, 64);
    const ringMaterial = new THREE.MeshBasicMaterial({
      color: activeTheme.floorGlow,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.85,
    });
    const ring = new THREE.Mesh(ringGeometry, ringMaterial);
    ring.rotation.x = -Math.PI / 2;
    ring.position.y = -0.718;
    scene.add(ring);
    floorRingRef.current = ring;

    // Shadow receiver plane on ground
    const shadowPlaneGeo = new THREE.PlaneGeometry(8, 8);
    const shadowPlaneMat = new THREE.ShadowMaterial({ opacity: 0.45 });
    const shadowPlane = new THREE.Mesh(shadowPlaneGeo, shadowPlaneMat);
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.position.y = -0.715;
    shadowPlane.receiveShadow = true;
    scene.add(shadowPlane);

    // Floating cyber dust particles
    const particleCount = 75;
    const particleGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 5;
      particlePositions[i + 1] = Math.random() * 3.5 - 0.6;
      particlePositions[i + 2] = (Math.random() - 0.5) * 5;
    }
    particleGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(particlePositions, 3)
    );
    const particleMaterial = new THREE.PointsMaterial({
      color: activeTheme.primary,
      size: 0.035,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);
    particlesRef.current = particles;

    // 7. LOAD & ENHANCE 3D GLB MODEL
    const loader = new GLTFLoader();
    const modelUrl = "/models/nexora_seated_coder_workstation.glb";

    loader.load(
      modelUrl,
      (gltf) => {
        const root = gltf.scene;

        // 1. Group and flip the desk workstation 180° around its center so the table, keyboard, and monitors face the coder correctly
        const deskGroup = new THREE.Group();
        deskGroup.name = "desk_workstation_group";
        deskGroup.position.set(0, -1.22, 0); // Raw center of the desk along Y
        root.add(deskGroup);

        const isDeskMesh = (name: string) => {
          if (
            name.startsWith("display_base") ||
            name.startsWith("green_base_trim") ||
            name.startsWith("chair_") ||
            name.startsWith("torso") ||
            name.startsWith("neck") ||
            name.startsWith("head") ||
            name.startsWith("ear") ||
            name.startsWith("hair_cap") ||
            name.startsWith("curl") ||
            name.startsWith("nose") ||
            name.startsWith("eye") ||
            name.startsWith("moustache") ||
            name.startsWith("upper_arm") ||
            name.startsWith("elbow") ||
            name.startsWith("forearm") ||
            name.startsWith("hand") ||
            name.startsWith("thigh") ||
            name.startsWith("knee") ||
            name.startsWith("shin") ||
            name.startsWith("shoe") ||
            name.startsWith("watch_")
          ) {
            return false;
          }
          return true;
        };

        const deskMeshesToMove: THREE.Mesh[] = [];
        root.traverse((child) => {
          if ((child as THREE.Mesh).isMesh && isDeskMesh(child.name)) {
            deskMeshesToMove.push(child as THREE.Mesh);
          }
        });

        deskMeshesToMove.forEach((mesh) => {
          mesh.position.y -= -1.22;
          deskGroup.add(mesh);
        });

        // Rotate the desk 180° around raw vertical Z so keyboard & monitors face the coder!
        deskGroup.rotation.z = Math.PI;

        // Model was exported in Z-up coordinate space; rotate X -90deg so it stands upright on Y-up
        root.rotation.x = -Math.PI / 2;
        root.updateMatrixWorld(true);

        // Compute Bounding Box to center the model perfectly
        const box = new THREE.Box3().setFromObject(root);
        const center = new THREE.Vector3();
        box.getCenter(center);

        // Center the root
        root.position.x -= center.x;
        root.position.y -= center.y;
        root.position.z -= center.z;

        // Shift slightly so the display base sits directly on top of the plinth
        root.position.y += 0.58;

        // Traverse all meshes and assign rich, vibrant cyber materials
        root.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            mesh.castShadow = true;
            mesh.receiveShadow = true;

            // Generate custom color-popping material based on the mesh's exact role
            const customMaterial = createMeshMaterial(mesh.name, activeTheme);

            // Store in materials map
            originalMaterialsMap.current.set(mesh.uuid, customMaterial);

            // Assign material (or wireframe if initially active)
            if (effectiveWireframe) {
              mesh.material = wireframeMaterial.current;
            } else {
              mesh.material = customMaterial;
            }
          }
        });

        // Add to main model group
        const group = new THREE.Group();
        group.add(root);
        scene.add(group);
        modelGroupRef.current = group;

        setIsLoaded(true);
      },
      (xhr) => {
        if (xhr.total > 0) {
          const percent = Math.min(Math.round((xhr.loaded / xhr.total) * 100), 100);
          setLoadingProgress(percent);
        } else {
          setLoadingProgress((prev) => Math.min(prev + 12, 95));
        }
      },
      (error) => {
        console.error("Failed to load GLB model:", error);
        setErrorMessage("Failed to load 3D Workstation model.");
      }
    );

    // 8. ANIMATION RENDER LOOP
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Subtle float oscillation on particles
      const positions = particleGeometry.attributes.position.array as Float32Array;
      for (let i = 1; i < particleCount * 3; i += 3) {
        positions[i] += Math.sin(elapsedTime * 1.5 + i) * 0.001;
      }
      particleGeometry.attributes.position.needsUpdate = true;

      // Pulse monitor glow light softly like real IDE terminals
      if (monitorGlowRef.current) {
        monitorGlowRef.current.intensity = 2.6 + Math.sin(elapsedTime * 3.5) * 0.35;
      }

      // Auto-rotate controls if active and user is not dragging
      if (controlsRef.current) {
        controlsRef.current.autoRotate = isAutoRotating && !isUserInteracting;
        controlsRef.current.update();
      }

      // Smooth scroll-driven character workstation rotation response
      if (modelGroupRef.current && !isUserInteracting && !isAutoRotating) {
        modelGroupRef.current.rotation.y = THREE.MathUtils.lerp(
          modelGroupRef.current.rotation.y,
          scrollTargetRotationY.current,
          0.06
        );
      }

      renderer.render(scene, camera);
    };

    animate();

    // 9. RESIZE OBSERVER
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      if (newWidth === 0 || newHeight === 0) return;

      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    const resizeObserver = new ResizeObserver(() => handleResize());
    resizeObserver.observe(container);

    // 10. CLEANUP
    return () => {
      cancelAnimationFrame(animationFrameId);
      clearTimeout(resumeAutoRotateTimeout);
      resizeObserver.disconnect();

      if (rendererRef.current && rendererRef.current.domElement) {
        container.removeChild(rendererRef.current.domElement);
        rendererRef.current.dispose();
      }

      plinthGeometry.dispose();
      plinthMaterial.dispose();
      ringGeometry.dispose();
      ringMaterial.dispose();
      shadowPlaneGeo.dispose();
      shadowPlaneMat.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
      wireframeMaterial.current.dispose();

      sceneRef.current = null;
      cameraRef.current = null;
      rendererRef.current = null;
      controlsRef.current = null;
      modelGroupRef.current = null;
    };
  }, []);

  return (
    <div
      className={`relative w-full h-full min-h-[380px] sm:min-h-[460px] md:min-h-[500px] lg:min-h-[560px] xl:min-h-[620px] rounded-2xl overflow-hidden bg-[#080A09] ${className}`}
    >
      {/* 3D WebGL Canvas Mount Container */}
      <div
        ref={mountRef}
        className="w-full h-full absolute inset-0 cursor-grab active:cursor-grabbing"
      />

      {/* Cyber Corner HUD Tech Accents */}
      <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-[#B6FF3B]/50 pointer-events-none" />
      <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-[#B6FF3B]/50 pointer-events-none" />
      <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-[#B6FF3B]/50 pointer-events-none" />
      <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-[#B6FF3B]/50 pointer-events-none" />

      {/* Loading Progress State */}
      {!isLoaded && !errorMessage && (
        <div className="absolute inset-0 bg-[#080A09]/95 flex flex-col items-center justify-center z-30 p-6">
          <div className="relative w-16 h-16 mb-4 flex items-center justify-center">
            <div className="absolute inset-0 rounded-full border-2 border-[#B6FF3B]/20 animate-ping" />
            <div className="w-12 h-12 rounded-full border-2 border-t-[#B6FF3B] border-r-[#B6FF3B] border-b-transparent border-l-transparent animate-spin" />
            <Box className="w-5 h-5 text-[#B6FF3B]" />
          </div>

          <div className="text-center space-y-2">
            <p className="text-xs font-mono font-bold tracking-widest text-[#B6FF3B] uppercase">
              RENDERING 3D WORKSTATION
            </p>
            <div className="w-48 h-1.5 bg-white/10 rounded-full overflow-hidden mx-auto">
              <div
                className="h-full bg-gradient-to-r from-[#98E61C] to-[#B6FF3B] transition-all duration-300 rounded-full"
                style={{ width: `${Math.max(loadingProgress, 10)}%` }}
              />
            </div>
            <p className="text-[11px] font-mono text-zinc-400">
              BUILDING SHADERS: {loadingProgress}%
            </p>
          </div>
        </div>
      )}

      {/* Error State Fallback */}
      {errorMessage && (
        <div className="absolute inset-0 bg-[#080A09]/90 flex flex-col items-center justify-center z-30 p-6 text-center">
          <AlertCircle className="w-8 h-8 text-amber-400 mb-2" />
          <p className="text-sm font-mono text-zinc-300 font-bold mb-1">
            3D ENGINE UNAVAILABLE
          </p>
          <p className="text-xs font-mono text-zinc-500 max-w-xs">{errorMessage}</p>
        </div>
      )}

      {/* Overlay Tech Badges and Controls */}
      {showOverlayControls && isLoaded && (
        <>
          {/* Top-Left: Model Title & Status */}
          <div className="absolute top-3 left-3 z-20 flex items-center space-x-2 px-3 py-1.5 rounded-full bg-black/75 backdrop-blur-md border border-[#B6FF3B]/30 text-xs font-mono shadow-lg">
            <span
              className="w-2 h-2 rounded-full animate-ping"
              style={{ backgroundColor: activeTheme.badgeHex }}
            />
            <span className="font-bold tracking-wider text-[11px] text-white">
              {effectiveWireframe
                ? "WIREFRAME // 144 MESHES"
                : `NEXORA // ${activeTheme.name}`}
            </span>
          </div>

          {/* Top-Right: Quick Action Controls */}
          <div className="absolute top-3 right-3 z-20 flex items-center space-x-1.5">
            {/* Auto-Rotate Toggle */}
            <button
              onClick={() => setIsAutoRotating((prev) => !prev)}
              className={`p-2 rounded-full backdrop-blur-md border text-xs font-mono transition-all cursor-pointer ${
                isAutoRotating
                  ? "bg-[#B6FF3B]/20 text-[#B6FF3B] border-[#B6FF3B]/50"
                  : "bg-black/60 text-zinc-400 border-white/10 hover:text-white"
              }`}
              title={isAutoRotating ? "Pause Auto-Rotate" : "Start Auto-Rotate"}
            >
              {isAutoRotating ? (
                <Pause className="w-3.5 h-3.5" />
              ) : (
                <Play className="w-3.5 h-3.5" />
              )}
            </button>

            {/* Wireframe Switch */}
            <button
              onClick={toggleWireframe}
              className={`px-3 py-1.5 rounded-full backdrop-blur-md border text-[11px] font-mono transition-all flex items-center space-x-1.5 cursor-pointer ${
                effectiveWireframe
                  ? "bg-[#B6FF3B] text-black font-extrabold border-[#B6FF3B] shadow-[0_0_15px_rgba(182,255,59,0.4)]"
                  : "bg-black/70 text-zinc-300 border-white/15 hover:border-[#B6FF3B] hover:text-[#B6FF3B]"
              }`}
              title="Toggle Real-Time Wireframe Mesh"
            >
              <Layers className="w-3 h-3" />
              <span>{effectiveWireframe ? "WIREFRAME ON" : "WIREFRAME"}</span>
            </button>

            {/* Reset Camera */}
            <button
              onClick={handleResetCamera}
              className="p-2 rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-zinc-400 hover:text-[#B6FF3B] hover:border-[#B6FF3B]/50 transition-colors cursor-pointer"
              title="Reset 3D Camera Position"
            >
              <RefreshCcw className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Bottom-Left: Interactive Color Theme Selector */}
          <div className="absolute bottom-3.5 left-3.5 z-20 flex items-center space-x-1.5 p-1.5 rounded-full bg-black/85 backdrop-blur-md border border-white/20 shadow-xl">
            <div className="flex items-center space-x-1.5 pl-2.5 pr-1 text-[11px] font-mono text-zinc-300">
              <Palette className="w-3.5 h-3.5 text-[#B6FF3B]" />
              <span className="font-semibold text-white">THEME:</span>
            </div>
            {COLOR_THEMES.map((theme) => {
              const isActive = theme.id === activeThemeId;
              return (
                <button
                  key={theme.id}
                  onClick={() => handleSelectTheme(theme)}
                  className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-[11px] font-mono transition-all cursor-pointer ${
                    isActive
                      ? "bg-white/20 text-white font-bold border border-white/40 shadow-sm"
                      : "text-zinc-400 hover:text-white hover:bg-white/10 border border-transparent"
                  }`}
                  title={`Apply ${theme.name} Palette`}
                >
                  <span
                    className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                    style={{
                      backgroundColor: theme.badgeHex,
                      boxShadow: isActive ? `0 0 8px ${theme.badgeHex}` : "none",
                    }}
                  />
                  <span>{theme.label}</span>
                </button>
              );
            })}
          </div>

          {/* Bottom-Right Interactive Hint Pill */}
          <div className="absolute bottom-3 right-3 z-20 pointer-events-none hidden md:flex items-center space-x-1.5 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-[10px] font-mono text-zinc-400 tracking-wider">
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: activeTheme.badgeHex }}
            />
            <span>DRAG TO ROTATE &bull; SCROLL TO ZOOM</span>
          </div>
        </>
      )}
    </div>
  );
}
