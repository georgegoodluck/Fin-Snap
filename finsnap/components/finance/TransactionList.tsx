import type { Transaction } from "@/types/finance";
import { TransactionItem } from "./TransactionItem";

interface TransactionListProps {
  transactions: Transaction[];
  onDelete: (id: string) => void;
  onAdd: () => void;
}

export function TransactionList({
  transactions,
  onDelete,
  onAdd,
}: TransactionListProps) {
  return (
    <div className="bg-card border border-border rounded-2xl p-5 mt-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <span className="font-display text-lg font-bold text-ink">
          Transactions
        </span>
        <button
          onClick={onAdd}
          className="text-xs font-semibold px-3 py-1.5 rounded-lg
                     bg-warning text-ink hover:opacity-80
                     transition-opacity duration-150"
        >
          + Add
        </button>
      </div>

      {/* Empty state */}
      {transactions.length === 0 && (
        <div className="py-10 flex flex-col items-center gap-2">
          <span className="text-3xl">🧾</span>
          <p className="text-sm text-muted">No transactions this month</p>
          <button
            onClick={onAdd}
            className="text-xs font-semibold text-warning hover:opacity-70
                       transition-opacity duration-150 mt-1"
          >
            Add your first one →
          </button>
        </div>
      )}

      {/* List */}
      {transactions.length > 0 && (
        <div>
          {transactions.map((t, i) => (
            <TransactionItem
              key={t.id}
              transaction={t}
              onDelete={onDelete}
              isLast={i === transactions.length - 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}