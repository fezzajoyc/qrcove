/**
 * Decorative QR-pattern watermark for the hero: a deterministic module grid
 * (LCG-seeded, so SSR and client renders match) with real finder patterns.
 * Pure presentation — aria-hidden, pointer-events-none, inherits color.
 */
export function QrWatermark({
  className = "",
  modules = 21,
}: {
  className?: string;
  modules?: number;
}) {
  let seed = 0x5eedc0de;
  const rand = () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 0xffffffff;
  };

  const finderBoxes = [
    [0, 0],
    [0, modules - 7],
    [modules - 7, 0],
  ] as const;
  const inFinder = (r: number, c: number) =>
    finderBoxes.some(([r0, c0]) => r >= r0 && r < r0 + 7 && c >= c0 && c < c0 + 7);

  const cells: { r: number; c: number }[] = [];
  for (let r = 0; r < modules; r++) {
    for (let c = 0; c < modules; c++) {
      const box = finderBoxes.find(([r0, c0]) => r >= r0 && r < r0 + 7 && c >= c0 && c < c0 + 7);
      if (box) {
        const [r0, c0] = box;
        const dr = r - r0;
        const dc = c - c0;
        const ring = dr === 0 || dr === 6 || dc === 0 || dc === 6;
        const core = dr >= 2 && dr <= 4 && dc >= 2 && dc <= 4;
        if (ring || core) cells.push({ r, c });
      } else if (rand() > 0.55) {
        cells.push({ r, c });
      }
    }
  }

  return (
    <svg
      viewBox={`0 0 ${modules} ${modules}`}
      className={className}
      aria-hidden="true"
      shapeRendering="crispEdges"
    >
      {cells.map(({ r, c }) => (
        <rect key={`${r}-${c}`} x={c} y={r} width={1} height={1} fill="currentColor" />
      ))}
    </svg>
  );
}
