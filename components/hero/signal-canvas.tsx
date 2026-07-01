"use client";

import { motion } from "framer-motion";

import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { signalEdges, signalNodes, findNode } from "@/components/hero/signal-graph-data";

function edgeLength(x1: number, y1: number, x2: number, y2: number) {
  return Math.hypot(x2 - x1, y2 - y1);
}

/**
 * Ambient network/signal background for the hero — "The Signal" concept's
 * core visual motif (docs/creative-direction.md). Fully decorative, so it's
 * aria-hidden, and every animation is disabled under prefers-reduced-motion
 * in favor of a static frame (docs/design-system.md).
 */
export function SignalCanvas() {
  const reducedMotion = useReducedMotion();

  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      className="absolute inset-0 h-full w-full"
    >
      <defs>
        <filter id="signal-glow" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="1.1" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {signalEdges.map((edge, index) => {
        const from = findNode(edge.from);
        const to = findNode(edge.to);
        const length = edgeLength(from.x, from.y, to.x, to.y);

        return (
          <g key={`${edge.from}-${edge.to}-${index}`}>
            <line
              x1={from.x}
              y1={from.y}
              x2={to.x}
              y2={to.y}
              stroke="var(--signal)"
              strokeOpacity={0.22}
              strokeWidth={0.18}
            />
            {edge.animated && !reducedMotion && (
              <motion.line
                x1={from.x}
                y1={from.y}
                x2={to.x}
                y2={to.y}
                stroke="var(--signal)"
                strokeOpacity={1}
                strokeWidth={0.45}
                strokeLinecap="round"
                filter="url(#signal-glow)"
                strokeDasharray={`${length * 0.07} ${length}`}
                animate={{ strokeDashoffset: [0, -length] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              />
            )}
          </g>
        );
      })}

      {signalNodes.map((node, index) => (
        <motion.circle
          key={node.id}
          cx={node.x}
          cy={node.y}
          r={node.emphasis ? 1.1 : 0.5}
          fill="var(--signal)"
          filter={node.emphasis ? "url(#signal-glow)" : undefined}
          initial={{ opacity: node.emphasis ? 0.95 : 0.55 }}
          animate={
            reducedMotion
              ? undefined
              : {
                  opacity: node.emphasis
                    ? [0.95, 0.6, 0.95]
                    : [0.55, 0.25, 0.55],
                }
          }
          transition={{
            duration: 4 + (index % 3),
            repeat: Infinity,
            ease: "easeInOut",
            delay: (index % 5) * 0.4,
          }}
        />
      ))}
    </svg>
  );
}
