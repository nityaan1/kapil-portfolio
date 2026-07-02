import type { HighlightRange } from "@/lib/search-index";

export function HighlightedText({
  text,
  ranges,
}: {
  text: string;
  ranges: HighlightRange[];
}) {
  if (ranges.length === 0) return <>{text}</>;

  const { start, end } = ranges[0];
  return (
    <>
      {text.slice(0, start)}
      <mark className="rounded-[2px] bg-accent/25 text-accent">{text.slice(start, end)}</mark>
      {text.slice(end)}
    </>
  );
}
