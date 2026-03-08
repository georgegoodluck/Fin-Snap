interface BudgetBarProps {
  spent: number;
  budget: number;
  color: string;
}

export function BudgetBar({ spent, budget, color }: BudgetBarProps) {
  const pct = budget > 0 ? Math.min(spent / budget, 1) : 0;
  const isOver = spent > budget;

  return (
    <div className="h-1.5 w-full bg-border rounded-full overflow-hidden">
      <div
        className="h-full rounded-full transition-all duration-700 ease-in-out"
        style={{
          width: `${pct * 100}%`,
          backgroundColor: isOver ? "var(--color-expense)" : color,
        }}
      />
    </div>
  );
}