import type { CategorySummary } from "@/types/finance";
import { BudgetBar } from "./BudgetBar";
import { formatCurrency } from "@/lib/utils";

interface BudgetHealthCardProps {
  summaries: CategorySummary[];
  onEditBudgets: () => void;
}

export function BudgetHealthCard({ summaries, onEditBudgets }: BudgetHealthCardProps) {
  return (
    <div className="bg-card border border-border rounded-2xl p-5">
      {/* Header row */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-[10px] font-semibold uppercase tracking-widest text-muted">
          Budget Health
        </span>
        <button
          onClick={onEditBudgets}
          className="text-xs font-semibold text-muted hover:text-ink
                     transition-colors duration-150"
        >
          Edit
        </button>
      </div>

      {/* Category rows */}
      <div className="flex flex-col gap-3.5">
        {summaries.map((cat) => (
          <div key={cat.id}>
            {/* Top row: icon + label + amounts */}
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-base leading-none">{cat.icon}</span>
              <span className="text-sm font-medium text-ink flex-1">
                {cat.label}
              </span>

              {/* Spent amount */}
              <span
                className={`text-sm font-semibold
                  ${cat.isOver ? "text-expense" : "text-ink"}`}
              >
                {formatCurrency(cat.spent)}
              </span>

              {/* Budget limit */}
              <span className="text-xs text-muted">
                / {formatCurrency(cat.budget)}
              </span>

              {/* Status pill */}
              {cat.isOver && (
                <span className="text-[10px] font-bold px-1.5 py-0.5
                                 rounded-full bg-expense/10 text-expense">
                  Over
                </span>
              )}
              {!cat.isOver && cat.percentUsed >= 80 && (
                <span className="text-[10px] font-bold px-1.5 py-0.5
                                 rounded-full bg-warning/10 text-warning">
                  {cat.percentUsed}%
                </span>
              )}
            </div>

            {/* Progress bar */}
            <BudgetBar
              spent={cat.spent}
              budget={cat.budget}
              color={cat.color}
            />
          </div>
        ))}
      </div>
    </div>
  );
}