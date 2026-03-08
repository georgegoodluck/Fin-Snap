export type TransactionType = "income" | "expense";

export type CategoryId =
  | "housing"
  | "food"
  | "transport"
  | "health"
  | "entertainment";

export interface Transaction {
  id: string;
  type: TransactionType;
  category: CategoryId | null;
  amount: number;
  description: string;
  date: string;
}

export interface Category {
  id: CategoryId;
  label: string;
  icon: string;
  color: string;
}

export type BudgetMap = Record<CategoryId, number>;

export interface FinanceStore {
  transactions: Transaction[];
  budgets: BudgetMap;
}

export interface CategorySummary extends Category {
  spent: number;
  budget: number;
  remaining: number;
  isOver: boolean;
  percentUsed: number;
}