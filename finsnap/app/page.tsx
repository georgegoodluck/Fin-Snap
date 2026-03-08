"use client";

import { useState } from "react";
import { Header } from "@/components/finance/Header";
import { PageWrapper } from "@/components/finance/PageWrapper";
import { StatsRow } from "@/components/finance/StatsRow";
import { SpendingCard } from "@/components/finance/SpendingCard";
import { BudgetHealthCard } from "@/components/finance/BudgetHealthCard";
import { TransactionList } from "@/components/finance/TransactionList";
import { CATEGORIES, DEFAULT_BUDGETS } from "@/lib/constants";
import type { CategorySummary, Transaction } from "@/types/finance";

const mockTransactions: Transaction[] = [
  { id: "1", type: "income",  category: null,            amount: 4200, description: "Salary",          date: "2026-03-01" },
  { id: "2", type: "income",  category: null,            amount: 800,  description: "Freelance Project", date: "2026-03-05" },
  { id: "3", type: "expense", category: "housing",       amount: 1400, description: "Monthly Rent",      date: "2026-03-01" },
  { id: "4", type: "expense", category: "food",          amount: 85,   description: "Grocery Run",        date: "2026-03-02" },
  { id: "5", type: "expense", category: "food",          amount: 120,  description: "Restaurant Dinner",  date: "2026-03-05" },
  { id: "6", type: "expense", category: "transport",     amount: 55,   description: "Fuel",               date: "2026-03-03" },
  { id: "7", type: "expense", category: "health",        amount: 30,   description: "Pharmacy",           date: "2026-03-05" },
  { id: "8", type: "expense", category: "entertainment", amount: 45,   description: "Netflix & Spotify",  date: "2026-03-04" },
];

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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <SpendingCard
              categorySpend={mockSpend}
              total={1735}
            />
            <BudgetHealthCard
              summaries={mockSummaries}
              onEditBudgets={() => setView("budgets")}
            />
          </div>
          <TransactionList
            transactions={mockTransactions}
            onDelete={(id) => console.log("delete", id)}
            onAdd={() => setView("add")}
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