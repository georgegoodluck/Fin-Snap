import { BudgetBar } from "./BudgetBar";
import { formatCurrency } from "@/lib/utils";
import type { CategorySummary } from "@/types/finance";

interface BudgetRowProps {
  summary: CategorySummary;
}

export function BudgetRow({ summary }: BudgetRowProps) {
  const { label, icon, color, spent, budget, isOver, percentUsed } = summary;

  return (
    <div className="flex flex-col gap-1.5">
      {/* Top row — label, amounts, status pill */}
      <div className="flex items-center gap-2">
        {/* Icon + label */}
        <div className="flex items-center gap-1.5 flex-1 min-w-0">
          <span className="text-sm">{icon}</span>
          <span className="text-sm font-medium text-ink truncate">{label}</span>
        </div>

        {/* Status pill — only shown when relevant */}
        {isOver && (
          <span className="text-[10px] font-bold uppercase tracking-wide
                           text-expense bg-expense/10 px-2 py-0.5 rounded-full">
            Over
          </span>
        )}
        {!isOver && percentUsed >= 80 && (
          <span className="text-[10px] font-bold uppercase tracking-wide
                           text-warning bg-warning/10 px-2 py-0.5 rounded-full">
            {percentUsed}%
          </span>
        )}

        {/* Amounts */}
        <div className="flex items-baseline gap-1 flex-shrink-0">
          <span className={`text-sm font-semibold
                            ${isOver ? "text-expense" : "text-ink"}`}>
            {formatCurrency(spent)}
          </span>
          <span className="text-xs text-muted">/ {formatCurrency(budget)}</span>
        </div>
      </div>

      {/* Bar */}
      <BudgetBar spent={spent} budget={budget} color={color} />

      {/* Bottom — remaining label */}
      <div className="flex justify-between">
        <span className="text-[10px] text-muted">₦0</span>
        <span className={`text-[10px] font-medium
                          ${isOver ? "text-expense" : "text-muted"}`}>
          {isOver
            ? `${formatCurrency(Math.abs(budget - spent))} over`
            : `${formatCurrency(budget - spent)} left`}
        </span>
        <span className="text-[10px] text-muted">{formatCurrency(budget)}</span>
      </div>
    </div>
  );
}