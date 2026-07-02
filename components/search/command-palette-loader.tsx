"use client";

import dynamic from "next/dynamic";

// Code-split: the palette (dialog primitive, full search index, several
// icons) is only needed once a visitor presses ⌘K or taps Search — it
// shouldn't be in the critical initial bundle. `ssr: false` requires a
// Client Component boundary, which is this file's only job.
const CommandPalette = dynamic(
  () => import("@/components/search/command-palette").then((m) => m.CommandPalette),
  { ssr: false }
);

export { CommandPalette };
