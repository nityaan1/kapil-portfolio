/**
 * Fixed (non-random) node/edge layout for the hero's network visualization.
 * Coordinates are deliberately hand-placed, not Math.random(), so server
 * and client render identically — no hydration mismatch, and a curated
 * constellation reads more intentional than scattered noise.
 * Coordinate space: a 100x100 viewBox (percentages).
 */

export interface SignalNode {
  id: string;
  x: number;
  y: number;
  /** Larger, brighter nodes read as "active" — the companies/roles that matter most. */
  emphasis?: boolean;
}

export interface SignalEdge {
  from: string;
  to: string;
  /** A small subset of edges get an animated traveling pulse. */
  animated?: boolean;
}

export const signalNodes: SignalNode[] = [
  { id: "n1", x: 8, y: 20 },
  { id: "n2", x: 22, y: 55, emphasis: true },
  { id: "n3", x: 15, y: 82 },
  { id: "n4", x: 38, y: 12 },
  { id: "n5", x: 46, y: 46, emphasis: true },
  { id: "n6", x: 40, y: 72 },
  { id: "n7", x: 60, y: 25, emphasis: true },
  { id: "n8", x: 68, y: 62 },
  { id: "n9", x: 80, y: 14 },
  { id: "n10", x: 86, y: 46, emphasis: true },
  { id: "n11", x: 92, y: 78 },
  { id: "n12", x: 55, y: 87 },
  { id: "n13", x: 30, y: 30 },
  { id: "n14", x: 72, y: 40 },
];

export const signalEdges: SignalEdge[] = [
  { from: "n1", to: "n2" },
  { from: "n2", to: "n3" },
  { from: "n1", to: "n13" },
  { from: "n13", to: "n4" },
  { from: "n13", to: "n5", animated: true },
  { from: "n5", to: "n2" },
  { from: "n5", to: "n6" },
  { from: "n2", to: "n6" },
  { from: "n4", to: "n7" },
  { from: "n7", to: "n5" },
  { from: "n7", to: "n9" },
  { from: "n7", to: "n14", animated: true },
  { from: "n5", to: "n14" },
  { from: "n14", to: "n8" },
  { from: "n8", to: "n10", animated: true },
  { from: "n8", to: "n6" },
  { from: "n6", to: "n12" },
  { from: "n10", to: "n9" },
  { from: "n10", to: "n11" },
  { from: "n10", to: "n14" },
  { from: "n12", to: "n8" },
];

export function findNode(id: string): SignalNode {
  const node = signalNodes.find((n) => n.id === id);
  if (!node) throw new Error(`Unknown signal node id: ${id}`);
  return node;
}
