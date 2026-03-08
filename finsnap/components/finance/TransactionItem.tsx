import type { Transaction } from "@/types/finance";
import { CATEGORIES } from "@/lib/constants";
import { formatCurrency } from "@/lib/utils";

interface TransactionItemProps {
  transaction: Transaction;
  onDelete: (id: string) => void;
  isLast: boolean;
}

export function TransactionItem({ transaction, onDelete, isLast }: TransactionItemProps) {
  const cat = CATEGORIES.find((c) => c.id === transaction.category);

  const formattedDate = new Date(transaction.date + "T00:00:00").toLocaleDateString(
    "en-US",
    { month: "short", day: "numeric" }
  );

  return (
    <div
      className={`flex items-center gap-3 py-3
        ${!isLast ? "border-b border-border" : ""}`}
    >
      {/* Category icon bubble */}
      <div
        className="w-9 h-9 rounded-xl flex items-center justify-center
                   flex-shrink-0 text-lg"
        style={{
          backgroundColor: cat
            ? `${cat.color}18`
            : transaction.type === "income"
            ? "var(--color-income)18"  
            : "var(--color-border)",
        }}
      >
        {transaction.type === "income" ? "💰" : cat?.icon ?? "💸"}
      </div>

      {/* Description + metadata */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-ink truncate">
          {transaction.description}
        </p>
        <p className="text-xs text-muted">
          {cat?.label ?? "Income"} · {formattedDate}
        </p>
      </div>

      {/* Amount */}
      <span
        className={`font-display text-base font-bold flex-shrink-0
          ${transaction.type === "income" ? "text-income" : "text-ink"}`}
      >
        {transaction.type === "income" ? "+" : "−"}
        {formatCurrency(transaction.amount)}
      </span>

      {/* Delete button */}
      <button
        onClick={() => onDelete(transaction.id)}
        className="text-border hover:text-expense transition-colors
                   duration-150 flex-shrink-0 text-sm px-1"
        aria-label="Delete transaction"
      >
        ✕
      </button>
    </div>
  );
}