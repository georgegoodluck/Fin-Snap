import { BudgetRow } from "./BudgetRow";
import type { CategorySummary } from "@/types/finance";

interface BudgetHealthCardProps {
  summaries: CategorySummary[];
  onEditBudgets: () => void;
}

export function BudgetHealthCard({ summaries, onEditBudgets }: BudgetHealthCardProps) {
  return (
    <div className="bg-card border border-border rounded-2xl p-5">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <span className="text-[10px] font-semibold uppercase tracking-widest text-muted">
          Budget Health
        </span>
        <button
          onClick={onEditBudgets}
          className="text-xs font-semibold text-muted hover:text-ink
                     transition-colors duration-150 cursor-pointer"
        >
          Edit →
        </button>
      </div>

      {/* Rows */}
      <div className="flex flex-col gap-4">
        {summaries.map((summary) => (
          <BudgetRow key={summary.id} summary={summary} />
        ))}
      </div>
    </div>
  );
}