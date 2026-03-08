import { DonutChart } from "./DonutChart";
import { SpendingLegend } from "./SpendingLegend";
import { CATEGORIES } from "@/lib/constants";

interface SpendingCardProps {
  categorySpend: Record<string, number>;
  total: number;
}

export function SpendingCard({ categorySpend, total }: SpendingCardProps) {
  const segments = CATEGORIES
    .filter((c) => (categorySpend[c.id] ?? 0) > 0)
    .map((c) => ({
      color: c.color,
      value: categorySpend[c.id] ?? 0,
      label: c.label,
    }));

  const legendItems = segments.map((s) => ({
    label: s.label,
    color: s.color,
    spent: s.value,
    percentage: total > 0 ? Math.round((s.value / total) * 100) : 0,
  }));

  return (
    <div className="bg-card border border-border rounded-2xl p-5">
      <span className="text-[10px] font-semibold uppercase tracking-widest text-muted block mb-4">
        Spending by Category
      </span>
      <div className="flex items-center gap-6">
        <DonutChart segments={segments} total={total} />
        <SpendingLegend items={legendItems} />
      </div>
    </div>
  );
}