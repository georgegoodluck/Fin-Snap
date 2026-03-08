interface Segment {
  color: string;
  value: number;
  label: string;
}

interface DonutChartProps {
  segments: Segment[];
  total: number;
}

const SIZE = 160;
const CX = 80;
const CY = 80;
const RADIUS = 58;
const STROKE_WIDTH = 20;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export function DonutChart({ segments, total }: DonutChartProps) {
  // Empty state
  if (total === 0) {
    return (
      <div className="flex items-center justify-center" style={{ width: SIZE, height: SIZE }}>
        <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`}>
          <circle
            cx={CX} cy={CY} r={RADIUS}
            fill="none"
            stroke="var(--color-border)"
            strokeWidth={STROKE_WIDTH}
          />
          <text
            x={CX} y={CY + 5}
            textAnchor="middle"
            fill="var(--color-muted)"
            fontSize="11"
            fontFamily="var(--font-sans)"
          >
            No data
          </text>
        </svg>
      </div>
    );
  }

  // Build segments with cumulative offset
  let accumulated = 0;

  const renderedSegments = segments
    .filter((s) => s.value > 0)
    .map((seg) => {
      const pct = seg.value / total;
      const dash = pct * CIRCUMFERENCE;
      const gap = CIRCUMFERENCE - dash;
      const offset = -accumulated * CIRCUMFERENCE;
      accumulated += pct;

      return { ...seg, dash, gap, offset };
    });

  return (
    <div className="relative flex-shrink-0" style={{ width: SIZE, height: SIZE }}>
      {/* Chart */}
      <svg
        width={SIZE}
        height={SIZE}
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        style={{ transform: "rotate(-90deg)" }}
      >
        {renderedSegments.map((seg, i) => (
          <circle
            key={i}
            cx={CX}
            cy={CY}
            r={RADIUS}
            fill="none"
            stroke={seg.color}
            strokeWidth={STROKE_WIDTH}
            strokeDasharray={`${seg.dash} ${seg.gap}`}
            strokeDashoffset={seg.offset}
            style={{ transition: "stroke-dasharray 0.6s cubic-bezier(0.4,0,0.2,1)" }}
          />
        ))}

        {/* Inner hole — sits on top, hides the overlapping strokes */}
        <circle
          cx={CX} cy={CY}
          r={RADIUS - STROKE_WIDTH / 2 - 1}
          fill="var(--color-card)"
        />
      </svg>

      {/* Center label — absolutely positioned over the SVG */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-[10px] font-semibold uppercase tracking-widest text-muted">
          Total
        </span>
        <span className="font-display text-lg font-bold text-ink leading-tight">
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            maximumFractionDigits: 0,
          }).format(total)}
        </span>
      </div>
    </div>
  );
}