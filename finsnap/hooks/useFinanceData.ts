import { useState, useEffect, useMemo } from "react";
import type { Transaction, BudgetMap, FinanceStore } from "@/types/finance";
import { CATEGORIES, DEFAULT_BUDGETS, STORAGE_KEY } from "@/lib/constants";

// ── Persistence ──────────────────────────────────────────────────────────────

function loadStore(): FinanceStore {
  if (typeof window === "undefined") {
    return { transactions: [], budgets: DEFAULT_BUDGETS };
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : { transactions: [], budgets: DEFAULT_BUDGETS };
  } catch {
    return { transactions: [], budgets: DEFAULT_BUDGETS };
  }
}

function saveStore(store: FinanceStore): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  } catch {
    // localStorage unavailable — fail silently
  }
}

// ── Derived Data ─────────────────────────────────────────────────────────────

function filterByMonth(transactions: Transaction[], month: string): Transaction[] {
  return transactions.filter((t) => t.date.startsWith(month));
}

function calcIncome(transactions: Transaction[]): number {
  return transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);
}

function calcExpenses(transactions: Transaction[]): number {
  return transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);
}

// ── Hook ─────────────────────────────────────────────────────────────────────

export function useFinanceData(activeMonth: string) {
  const [store, setStore] = useState<FinanceStore>(loadStore);

  // Persist on every change
  useEffect(() => {
    saveStore(store);
  }, [store]);

  // All derived values — only recalculates when store or month changes
  const derived = useMemo(() => {
    const monthTxns = filterByMonth(store.transactions, activeMonth);
    const income = calcIncome(monthTxns);
    const expenses = calcExpenses(monthTxns);
    const savings = income - expenses;
    const savingsRate = income > 0 ? Math.round((savings / income) * 100) : 0;

    const categorySpend: Record<string, number> = {};
    CATEGORIES.forEach((c) => {
      categorySpend[c.id] = monthTxns
        .filter((t) => t.type === "expense" && t.category === c.id)
        .reduce((sum, t) => sum + t.amount, 0);
    });

    const categorySummaries = CATEGORIES.map((c) => {
      const spent = categorySpend[c.id];
      const budget = store.budgets[c.id] ?? 0;
      const remaining = budget - spent;
      return {
        ...c,
        spent,
        budget,
        remaining,
        isOver: spent > budget,
        percentUsed: budget > 0 ? Math.round((spent / budget) * 100) : 0,
      };
    });

    return {
      monthTxns,
      income,
      expenses,
      savings,
      savingsRate,
      categorySpend,
      categorySummaries,
      incomeCount: monthTxns.filter((t) => t.type === "income").length,
      expenseCount: monthTxns.filter((t) => t.type === "expense").length,
    };
  }, [store, activeMonth]);

  // ── Actions ────────────────────────────────────────────────────────────────

  const addTransaction = (txn: Omit<Transaction, "id">) => {
    setStore((s) => ({
      ...s,
      transactions: [
        { ...txn, id: crypto.randomUUID() },
        ...s.transactions,
      ],
    }));
  };

  const deleteTransaction = (id: string) => {
    setStore((s) => ({
      ...s,
      transactions: s.transactions.filter((t) => t.id !== id),
    }));
  };

  const updateBudgets = (budgets: BudgetMap) => {
    setStore((s) => ({ ...s, budgets }));
  };

  return {
    store,
    derived,
    addTransaction,
    deleteTransaction,
    updateBudgets,
  };
}