interface BudgetBarProps {
  spent: number;
  budget: number;
  color: string;
}

export function BudgetBar({ spent, budget, color }: BudgetBarProps) {
  const isOver = spent > budget;
  const percentage = budget > 0 ? Math.min(spent / budget, 1) : 0;

  return (
    <div className="h-1.5 w-full bg-border rounded-full overflow-hidden">
      <div
        className="h-full rounded-full transition-all duration-700 ease-out"
        style={{
          width: `${percentage * 100}%`,
          backgroundColor: isOver ? "#dc2626" : color,
        }}
      />
    </div>
  );
}