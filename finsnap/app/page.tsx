"use client";

import { useState } from "react";
import { useFinanceData } from "@/hooks/useFinanceData";
import { Header } from "@/components/finance/Header";
import { PageWrapper } from "@/components/finance/PageWrapper";
import { StatsRow } from "@/components/finance/StatsRow";
import { SpendingCard } from "@/components/finance/SpendingCard";
import { BudgetHealthCard } from "@/components/finance/BudgetHealthCard";
import { TransactionList } from "@/components/finance/TransactionList";
import { AddTransactionForm } from "@/components/finance/AddTransactionForm";
import { BudgetManager } from "@/components/finance/BudgetManager";

type View = "dashboard" | "add" | "budgets";

export default function Home() {
  const [view, setView] = useState<View>("dashboard");
  const [activeMonth] = useState("2026-03");

  const { store, derived, addTransaction, deleteTransaction, updateBudgets } =
    useFinanceData(activeMonth);

  const handleAdd = (txn: Parameters<typeof addTransaction>[0]) => {
    addTransaction(txn);
    setView("dashboard");
  };

  const handleSaveBudgets = (budgets: Parameters<typeof updateBudgets>[0]) => {
    updateBudgets(budgets);
    setView("dashboard");
  };

  return (
    <main className="min-h-screen bg-paper">
      <Header view={view} onNavigate={setView} />

      {/*  Dashboard  */}
      {view === "dashboard" && (
        <PageWrapper>
          <StatsRow
            income={derived.income}
            expenses={derived.expenses}
            savings={derived.savings}
            savingsRate={derived.savingsRate}
            incomeCount={derived.incomeCount}
            expenseCount={derived.expenseCount}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <SpendingCard
              categorySpend={derived.categorySpend}
              total={derived.expenses}
            />
            <BudgetHealthCard
              summaries={derived.categorySummaries}
              onEditBudgets={() => setView("budgets")}
            />
          </div>

          <TransactionList
            transactions={derived.monthTxns}
            onDelete={deleteTransaction}
            onAdd={() => setView("add")}
          />
        </PageWrapper>
      )}

      {/*  Add Transaction  */}
      {view === "add" && (
        <PageWrapper narrow>
          <AddTransactionForm
            onAdd={handleAdd}
            onBack={() => setView("dashboard")}
          />
        </PageWrapper>
      )}

      {/*  Budget Manager  */}
      {view === "budgets" && (
        <PageWrapper narrow>
          <BudgetManager
            summaries={derived.categorySummaries}
            budgets={store.budgets}
            onSave={handleSaveBudgets}
            onBack={() => setView("dashboard")}
          />
        </PageWrapper>
      )}
    </main>
  );
}