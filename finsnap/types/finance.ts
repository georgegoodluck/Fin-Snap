// Transaction types and interfaces for the finance module
export type TransactionType = "income" | "expense";

// Categories for transactions
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

// Defines my Category interface for the finance module & ties it to transaction categories. This will be used to display category information in the UI and manage budgets.
export interface Category {
  id: CategoryId;
  label: string;
  icon: string;
  color: string;
}

// Creating a map where key is my CategoryId and mapping the key to a number representing the budget amount for that category. This will allow me to easily access and update budget information for each category in my finance store.
export type BudgetMap = Record<CategoryId, number>;

// What is being saved to my local storage for the finance module. It includes an array of transactions and a budget map that links each category to its respective budget amount. This structure allows me to manage and persist financial data effectively.
export interface FinanceStore {
  transactions: Transaction[];
  budgets: BudgetMap;
}

// CategorySummary extends the basic Category interface by adding financial metrics such as spent amount, budget, remaining amount, whether the budget is exceeded, and the percentage of the budget used. This will be useful for generating reports and visualizations in the UI to help users understand their spending habits and manage their finances better.
export interface CategorySummary extends Category {
  spent: number;
  budget: number;
  remaining: number;
  isOver: boolean;
  percentUsed: number;
}
