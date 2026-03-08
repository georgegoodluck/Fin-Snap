import { StatCard } from "./StatCard";
import { formatCurrency, formatPercent } from "@/lib/utils";

interface StatsRowProps {
  income: number;
  expenses: number;
  savings: number;
  savingsRate: number;
  incomeCount: number;
  expenseCount: number;
}

export function StatsRow({
  income,
  expenses,
  savings,
  savingsRate,
  incomeCount,
  expenseCount,
}: StatsRowProps) {
  const savingsAccent = savings >= 0 ? "neutral" : "expense";

  return (
    <div className="grid grid-cols-3 gap-4 mb-4">
      <StatCard
        label="Income"
        value={formatCurrency(income)}
        subtext={`${incomeCount} source${incomeCount !== 1 ? "s" : ""}`}
        accent="income"
      />
      <StatCard
        label="Expenses"
        value={formatCurrency(expenses)}
        subtext={`${expenseCount} transaction${expenseCount !== 1 ? "s" : ""}`}
        accent="expense"
      />
      <StatCard
        label="Net Savings"
        value={`${savings < 0 ? "-" : ""}${formatCurrency(Math.abs(savings))}`}
        subtext={`${formatPercent(savingsRate)} savings rate`}
        accent={savingsAccent}
      />
    </div>
  );
}