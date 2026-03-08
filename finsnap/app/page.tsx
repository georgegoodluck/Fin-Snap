"use client";

import { useState } from "react";
import Header from "@/components/finance/Header";
import { PageWrapper } from "@/components/finance/PageWrapper";
import { StatsRow } from "@/components/finance/StatsRow";
import { SpendingCard } from "@/components/finance/SpendingCard";
import { CATEGORIES, DEFAULT_BUDGETS } from "@/lib/constants";
import type { CategorySummary } from "@/types/finance";

const mockSpend: Record<string, number> = {
  housing: 1400,
  food: 205,
  transport: 55,
  health: 30,
  entertainment: 45,
};

const mockSummaries: CategorySummary[] = CATEGORIES.map((c) => {
  const spent = mockSpend[c.id] ?? 0;
  const budget = DEFAULT_BUDGETS[c.id];
  return {
    ...c,
    spent,
    budget,
    remaining: budget - spent,
    isOver: spent > budget,
    percentUsed: budget > 0 ? Math.round((spent / budget) * 100) : 0,
  };
});

type View = "dashboard" | "add" | "budgets";

export default function Home() {
  const [view, setView] = useState<View>("dashboard");

  return (
    <main className="min-h-screen bg-paper">
      <Header view={view} onNavigate={setView} />

      {view === "dashboard" && (
        <PageWrapper>
          <StatsRow
            income={5000}
            expenses={1735}
            savings={3265}
            savingsRate={65}
            incomeCount={2}
            expenseCount={7}
          />
          <SpendingCard
            categorySpend={mockSpend}
            total={1735}
          />
        </PageWrapper>
      )}

      {view === "add" && (
        <PageWrapper narrow>
          <p className="text-muted text-sm">Add transaction coming soon</p>
        </PageWrapper>
      )}

      {view === "budgets" && (
        <PageWrapper narrow>
          <p className="text-muted text-sm">Budgets coming soon</p>
        </PageWrapper>
      )}
    </main>
  );
}