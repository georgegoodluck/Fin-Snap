import { useState, useEffect, useMemo } from "react";
import type { Transaction, BudgetMap, FinanceStore } from "@/types/finance";
import { CATEGORIES, DEFAULT_BUDGETS, STORAGE_KEY } from "@/lib/constants";

const EMPTY_STORE: FinanceStore = {
  transactions: [],
  budgets: DEFAULT_BUDGETS,
};

function loadStore(): FinanceStore {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : EMPTY_STORE;
  } catch {
    return EMPTY_STORE;
  }
}

function saveStore(store: FinanceStore): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
  } catch {}
}

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

interface StoreState {
  data: FinanceStore;
  hydrated: boolean;
}

export function useFinanceData(activeMonth: string) {
  const [state, setState] = useState<StoreState>({
    data: EMPTY_STORE,
    hydrated: false,
  });

  // Single setState call — loads localStorage and marks hydrated together
  useEffect(() => {
    setState({ data: loadStore(), hydrated: true });
  }, []);

  // Persist on every change after hydration
  useEffect(() => {
    if (!state.hydrated) return;
    saveStore(state.data);
  }, [state]);

  const derived = useMemo(() => {
    const monthTxns = filterByMonth(state.data.transactions, activeMonth);
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
      const budget = state.data.budgets[c.id] ?? 0;
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
  }, [state.data, activeMonth]);

  const addTransaction = (txn: Omit<Transaction, "id">) => {
    setState((s) => ({
      ...s,
      data: {
        ...s.data,
        transactions: [{ ...txn, id: crypto.randomUUID() }, ...s.data.transactions],
      },
    }));
  };

  const deleteTransaction = (id: string) => {
    setState((s) => ({
      ...s,
      data: {
        ...s.data,
        transactions: s.data.transactions.filter((t) => t.id !== id),
      },
    }));
  };

  const updateBudgets = (budgets: BudgetMap) => {
    setState((s) => ({ ...s, data: { ...s.data, budgets } }));
  };

  return {
    store: state.data,
    derived,
    hydrated: state.hydrated,
    addTransaction,
    deleteTransaction,
    updateBudgets,
  };
}