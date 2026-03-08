import { formatCurrency } from "@/lib/utils";

interface LegendItem {
  label: string;
  color: string;
  spent: number;
  percentage: number;
}

interface SpendingLegendProps {
  items: LegendItem[];
}

export function SpendingLegend({ items }: SpendingLegendProps) {
  return (
    <div className="flex flex-col justify-center gap-2.5 flex-1 min-w-0">
      {items.map((item) => (
        <div key={item.label} className="flex items-center gap-2.5">
          {/* Color dot */}
          <div
            className="w-2.5 h-2.5 rounded-full flex-shrink-0"
            style={{ backgroundColor: item.color }}
          />

          {/* Label */}
          <span className="text-sm text-ink flex-1 truncate">
            {item.label}
          </span>

          {/* Amount */}
          <span className="text-sm font-semibold text-ink">
            {formatCurrency(item.spent)}
          </span>

          {/* Percentage */}
          <span className="text-xs text-muted w-8 text-right">
            {item.percentage}%
          </span>
        </div>
      ))}
    </div>
  );
}