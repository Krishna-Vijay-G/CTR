"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import {
  Environment,
  Lightformer,
  ContactShadows,
  OrbitControls,
  PerspectiveCamera,
  AdaptiveDpr,
  Preload,
} from "@react-three/drei";
import RaceCarModel from "./RaceCarModel";

export type CarSceneProps = {
  interactive?: boolean;
  autoRotate?: boolean;
  accent?: string;
};

export default function CarScene({
  interactive = false,
  autoRotate = true,
  accent = "#f7d619",
}: CarSceneProps) {
  return (
    <Canvas
      shadows
      dpr={[1, 1.6]}
      gl={{ antialias: true, powerPreference: "high-performance", alpha: true }}
      className="!touch-pan-y"
    >
      <PerspectiveCamera makeDefault position={[4.2, 1.7, 4.8]} fov={38} />

      {/* Key + fill lights */}
      <ambientLight intensity={0.35} />
      <directionalLight
        position={[5, 8, 4]}
        intensity={2.2}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0001}
      />
      <pointLight position={[-6, 3, -4]} intensity={40} color="#f7d619" />
      <pointLight position={[0, 2, 6]} intensity={20} color="#ffffff" />

      <Suspense fallback={null}>
        <group position={[0, 0.05, 0]}>
          <RaceCarModel accent={accent} spin />
        </group>

        {/* Soft grounded shadow */}
        <ContactShadows
          position={[0, -0.62, 0]}
          opacity={0.55}
          scale={12}
          blur={2.6}
          far={4}
          resolution={512}
          color="#000000"
        />

        {/* In-memory studio reflections — no external HDR download */}
        <Environment resolution={256}>
          <Lightformer
            intensity={2}
            position={[0, 4, -3]}
            scale={[10, 4, 1]}
            color="#ffffff"
          />
          <Lightformer
            intensity={3}
            position={[-4, 2, 2]}
            scale={[4, 6, 1]}
            color="#f7d619"
          />
          <Lightformer
            intensity={1.5}
            position={[4, 2, 2]}
            scale={[4, 6, 1]}
            color="#88aaff"
          />
        </Environment>
        <Preload all />
      </Suspense>

      <OrbitControls
        makeDefault
        enabled={interactive}
        enablePan={false}
        enableZoom={interactive}
        autoRotate={autoRotate}
        autoRotateSpeed={interactive ? 0.6 : 1.1}
        minPolarAngle={Math.PI / 4}
        maxPolarAngle={Math.PI / 1.9}
        minDistance={4}
        maxDistance={9}
        target={[0, 0.1, 0]}
      />
      <AdaptiveDpr pixelated />
    </Canvas>
  );
}
