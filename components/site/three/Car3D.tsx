"use client";

import dynamic from "next/dynamic";
import { useRef } from "react";
import { useInView } from "framer-motion";
import type { CarSceneProps } from "./CarScene";

// The whole Three.js scene is client-only and lazily loaded so it never
// blocks first paint or SSR.
const CarScene = dynamic(() => import("./CarScene"), {
  ssr: false,
  loading: () => <SceneSkeleton />,
});

function SceneSkeleton() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-racing-yellow border-t-transparent" />
        <span className="text-xs uppercase tracking-[0.3em] text-carbon-300">
          Loading car
        </span>
      </div>
    </div>
  );
}

export default function Car3D({
  className,
  ...sceneProps
}: CarSceneProps & { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  // Only mount the canvas once it scrolls near the viewport.
  const inView = useInView(ref, { once: true, margin: "200px" });

  return (
    <div ref={ref} className={className}>
      {inView ? <CarScene {...sceneProps} /> : <SceneSkeleton />}
    </div>
  );
}
