"use client";

import { useRef, useMemo, useCallback } from "react";
import { useFrame } from "@react-three/fiber";
import { RoundedBox, Cylinder, Cone, Torus, Sphere } from "@react-three/drei";
import * as THREE from "three";

/**
 * A stylised Formula-4 single-seater, built entirely from Three.js
 * primitives (no external model file). Length runs along -Z (nose toward
 * the camera). Kept to a few dozen meshes so it stays fast on mobile.
 */

type Props = {
  accent?: string; // livery accent colour
  spin?: boolean; // roll the wheels + gentle bob
};

function Wheel({
  position,
  radius = 0.42,
  width = 0.34,
  accent,
  spinRef,
}: {
  position: [number, number, number];
  radius?: number;
  width?: number;
  accent: string;
  spinRef: React.MutableRefObject<THREE.Group[]>;
}) {
  // Register this wheel with the parent so they all roll together.
  const register = useCallback(
    (node: THREE.Group | null) => {
      if (node && !spinRef.current.includes(node)) spinRef.current.push(node);
    },
    [spinRef],
  );

  return (
    <group position={position} ref={register}>
      {/* Tyre — cylinder axis aligned to X (the axle) */}
      <Cylinder args={[radius, radius, width, 32]} rotation={[0, 0, Math.PI / 2]}>
        <meshStandardMaterial color="#0d0d0d" roughness={0.85} metalness={0.1} />
      </Cylinder>
      {/* Rim */}
      <Cylinder
        args={[radius * 0.55, radius * 0.55, width + 0.02, 24]}
        rotation={[0, 0, Math.PI / 2]}
      >
        <meshStandardMaterial color="#1a1a1a" roughness={0.3} metalness={0.9} />
      </Cylinder>
      {/* Accent hub cap */}
      <Cylinder
        args={[radius * 0.22, radius * 0.22, width + 0.06, 16]}
        rotation={[0, 0, Math.PI / 2]}
      >
        <meshStandardMaterial
          color={accent}
          roughness={0.3}
          metalness={0.5}
          emissive={accent}
          emissiveIntensity={0.25}
        />
      </Cylinder>
    </group>
  );
}

export default function RaceCarModel({
  accent = "#f7d619",
  spin = true,
}: Props) {
  const root = useRef<THREE.Group>(null!);
  const wheels = useRef<THREE.Group[]>([]);
  wheels.current = [];

  const carbon = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#0c0c0e",
        roughness: 0.38,
        metalness: 0.55,
      }),
    [],
  );
  const yellow = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: accent,
        roughness: 0.28,
        metalness: 0.45,
        emissive: new THREE.Color(accent),
        emissiveIntensity: 0.15,
      }),
    [accent],
  );
  const chrome = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#d8d8dc",
        roughness: 0.15,
        metalness: 1,
      }),
    [],
  );

  useFrame((state, delta) => {
    if (!spin) return;
    for (const w of wheels.current) w.rotation.x += delta * 6;
    if (root.current) {
      root.current.position.y =
        Math.sin(state.clock.elapsedTime * 1.4) * 0.04 - 0.15;
    }
  });

  return (
    <group ref={root} rotation={[0, Math.PI * 0.08, 0]} scale={1}>
      {/* ── Monocoque / main body ── */}
      <RoundedBox
        args={[0.78, 0.42, 2.6]}
        radius={0.12}
        smoothness={4}
        position={[0, 0.15, 0]}
        material={carbon}
      />
      {/* Yellow spine stripe */}
      <RoundedBox
        args={[0.26, 0.06, 2.4]}
        radius={0.03}
        smoothness={3}
        position={[0, 0.37, 0]}
        material={yellow}
      />

      {/* ── Nose cone (toward -Z) ── */}
      <Cone
        args={[0.3, 1.5, 20]}
        position={[0, 0.12, -1.9]}
        rotation={[-Math.PI / 2, 0, 0]}
        material={carbon}
      />
      <Cone
        args={[0.14, 0.5, 16]}
        position={[0, 0.12, -2.65]}
        rotation={[-Math.PI / 2, 0, 0]}
        material={yellow}
      />

      {/* ── Front wing ── */}
      <RoundedBox
        args={[2.0, 0.05, 0.5]}
        radius={0.02}
        smoothness={2}
        position={[0, -0.05, -2.7]}
        material={carbon}
      />
      <RoundedBox
        args={[2.0, 0.02, 0.14]}
        radius={0.01}
        smoothness={2}
        position={[0, 0.02, -2.55]}
        material={yellow}
      />
      {[-0.98, 0.98].map((x) => (
        <RoundedBox
          key={x}
          args={[0.04, 0.34, 0.5]}
          radius={0.02}
          smoothness={2}
          position={[x, 0.05, -2.7]}
          material={carbon}
        />
      ))}

      {/* ── Sidepods ── */}
      {[-0.62, 0.62].map((x) => (
        <RoundedBox
          key={x}
          args={[0.42, 0.34, 1.5]}
          radius={0.1}
          smoothness={3}
          position={[x, 0.08, 0.35]}
          material={carbon}
        />
      ))}
      {/* Sidepod accent intakes */}
      {[-0.82, 0.82].map((x) => (
        <Cylinder
          key={x}
          args={[0.1, 0.13, 0.1, 20]}
          rotation={[Math.PI / 2, 0, 0]}
          position={[x, 0.14, -0.42]}
          material={yellow}
        />
      ))}

      {/* ── Cockpit surround + halo ── */}
      <Torus
        args={[0.32, 0.05, 12, 24, Math.PI]}
        position={[0, 0.4, -0.35]}
        rotation={[Math.PI / 2, 0, 0]}
        material={chrome}
      />
      {/* Halo centre strut */}
      <Cylinder
        args={[0.045, 0.045, 0.5, 10]}
        position={[0, 0.42, -0.68]}
        rotation={[Math.PI / 2.3, 0, 0]}
        material={chrome}
      />
      {/* Driver helmet */}
      <Sphere args={[0.17, 20, 20]} position={[0, 0.42, -0.15]} material={yellow} />

      {/* ── Airbox / roll hoop ── */}
      <Cone
        args={[0.2, 0.5, 4]}
        position={[0, 0.55, 0.15]}
        rotation={[0, Math.PI / 4, 0]}
        material={carbon}
      />
      {/* Engine cover tapering to the back */}
      <RoundedBox
        args={[0.5, 0.4, 1.3]}
        radius={0.12}
        smoothness={3}
        position={[0, 0.3, 0.75]}
        material={carbon}
      />

      {/* ── Rear wing ── */}
      <RoundedBox
        args={[1.4, 0.05, 0.42]}
        radius={0.02}
        smoothness={2}
        position={[0, 0.72, 1.5]}
        material={carbon}
      />
      <RoundedBox
        args={[1.4, 0.03, 0.12]}
        radius={0.01}
        smoothness={2}
        position={[0, 0.8, 1.5]}
        material={yellow}
      />
      {[-0.68, 0.68].map((x) => (
        <RoundedBox
          key={x}
          args={[0.04, 0.5, 0.45]}
          radius={0.02}
          smoothness={2}
          position={[x, 0.6, 1.5]}
          material={carbon}
        />
      ))}
      {/* Wing support pylon */}
      <RoundedBox
        args={[0.08, 0.5, 0.2]}
        radius={0.02}
        smoothness={2}
        position={[0, 0.55, 1.55]}
        material={carbon}
      />
      {/* Rear diffuser accent */}
      <RoundedBox
        args={[0.8, 0.16, 0.1]}
        radius={0.03}
        smoothness={2}
        position={[0, -0.02, 1.55]}
        material={yellow}
      />

      {/* ── Wheels (open-wheel, exposed) ── */}
      <Wheel position={[0.72, 0, -1.55]} accent={accent} spinRef={wheels} />
      <Wheel position={[-0.72, 0, -1.55]} accent={accent} spinRef={wheels} />
      <Wheel
        position={[0.8, 0, 1.4]}
        radius={0.46}
        width={0.44}
        accent={accent}
        spinRef={wheels}
      />
      <Wheel
        position={[-0.8, 0, 1.4]}
        radius={0.46}
        width={0.44}
        accent={accent}
        spinRef={wheels}
      />
    </group>
  );
}
