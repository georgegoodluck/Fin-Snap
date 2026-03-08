"use client";

import { useState } from "react";
import type { CategorySummary, BudgetMap } from "@/types/finance";
import { BudgetBar } from "./BudgetBar";
import { formatCurrency } from "@/lib/utils";

interface BudgetManagerProps {
  summaries: CategorySummary[];
  budgets: BudgetMap;
  onSave: (budgets: BudgetMap) => void;
  onBack: () => void;
}

export function BudgetManager({
  summaries,
  budgets,
  onSave,
  onBack,
}: BudgetManagerProps) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState<BudgetMap>({ ...budgets });

  const handleSave = () => {
    onSave(draft);
    setEditing(false);
  };

  const handleCancel = () => {
    setDraft({ ...budgets });
    setEditing(false);
  };

  const totalBudget = Object.values(draft).reduce((s, v) => s + v, 0);
  const totalSpent = summaries.reduce((s, c) => s + c.spent, 0);
  const totalIsOver = totalSpent > totalBudget;

  return (
    <div>
      {/* Back */}
      <button
        onClick={onBack}
        className="flex items-center gap-1.5 text-sm text-muted
                   hover:text-ink transition-colors duration-150 mb-6"
      >
        ← Back
      </button>

      {/* Page header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-2xl font-bold text-ink">
          Monthly Budgets
        </h2>
        {!editing ? (
          <button
            onClick={() => setEditing(true)}
            className="text-sm font-semibold px-4 py-2 rounded-xl
                       bg-warning text-ink hover:opacity-80
                       transition-opacity duration-150"
          >
            Edit Budgets
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={handleCancel}
              className="text-sm font-semibold px-4 py-2 rounded-xl
                         border-2 border-border text-muted hover:text-ink
                         transition-colors duration-150"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="text-sm font-semibold px-4 py-2 rounded-xl
                         bg-ink text-paper hover:opacity-80
                         transition-opacity duration-150"
            >
              Save
            </button>
          </div>
        )}
      </div>

      {/* Category cards */}
      <div className="flex flex-col gap-3">
        {summaries.map((cat) => {
          const budgetValue = editing ? (draft[cat.id] ?? 0) : cat.budget;
          const remaining = budgetValue - cat.spent;
          const isOver = cat.spent > budgetValue;

          return (
            <div
              key={cat.id}
              className="bg-card border border-border rounded-2xl p-5"
            >
              {/* Top row */}
              <div className="flex items-center gap-3 mb-3">
                {/* Icon */}
                <div
                  className="w-10 h-10 rounded-xl flex items-center
                             justify-center text-xl flex-shrink-0"
                  style={{ backgroundColor: `${cat.color}18` }}
                >
                  {cat.icon}
                </div>

                {/* Label + status */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-ink">
                    {cat.label}
                  </p>
                  <p className={`text-xs font-medium
                    ${isOver ? "text-expense" : remaining < budgetValue * 0.2
                      ? "text-warning" : "text-income"}`}
                  >
                    {isOver
                      ? `${formatCurrency(Math.abs(remaining))} over budget`
                      : `${formatCurrency(remaining)} remaining`
                    }
                  </p>
                </div>

                {/* Amount display or input */}
                {editing ? (
                  <div className="relative flex-shrink-0">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2
                                     text-sm font-bold text-muted">
                      ₦
                    </span>
                    <input
                      type="number"
                      value={draft[cat.id] ?? ""}
                      onChange={(e) =>
                        setDraft((d) => ({
                          ...d,
                          [cat.id]: parseFloat(e.target.value) || 0,
                        }))
                      }
                      className="w-28 pl-7 pr-3 py-2 rounded-xl border-2
                                 border-border focus:border-ink bg-paper
                                 text-sm font-bold text-ink text-right
                                 outline-none transition-colors duration-150"
                      min="0"
                      step="50"
                    />
                  </div>
                ) : (
                  <div className="text-right flex-shrink-0">
                    <p className="font-display text-lg font-bold text-ink">
                      {formatCurrency(cat.spent)}
                    </p>
                    <p className="text-xs text-muted">
                      of {formatCurrency(cat.budget)}
                    </p>
                  </div>
                )}
              </div>

              {/* Progress bar */}
              <BudgetBar
                spent={cat.spent}
                budget={budgetValue}
                color={cat.color}
              />

              {/* Bar scale labels */}
              <div className="flex justify-between mt-1.5">
                <span className="text-[10px] text-muted">₦0</span>
                <span className="text-[10px] text-muted font-semibold">
                  {Math.min(
                    budgetValue > 0
                      ? Math.round((cat.spent / budgetValue) * 100)
                      : 0,
                    100
                  )}% used
                </span>
                <span className="text-[10px] text-muted">
                  {formatCurrency(budgetValue)}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Total summary card */}
      <div className="mt-4 bg-ink rounded-2xl p-5 flex items-center
                      justify-between">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-widest
                        text-muted mb-1">
            Total Budget
          </p>
          <p className="font-display text-2xl font-bold text-paper">
            {formatCurrency(totalBudget)}
          </p>
        </div>
        <div className="text-right">
          <p className="text-[10px] font-semibold uppercase tracking-widest
                        text-muted mb-1">
            Total Spent
          </p>
          <p className={`font-display text-2xl font-bold
            ${totalIsOver ? "text-expense" : "text-warning"}`}
          >
            {formatCurrency(totalSpent)}
          </p>
        </div>
      </div>
    </div>
  );
}