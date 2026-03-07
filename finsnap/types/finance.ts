export type TransactionType = "income" | "expense";

export type CategoryId = 
| "housing"
| "food"
| "transportation"
| "utilities"
| "entertainment"
| "healthcare"
| "education"
| "personal_care"
| "miscellaneous"
| "salary"
| "investment"
| "gift"
| "other";

export interface Transaction {
  id: string;
  type: TransactionType;
  category: CategoryId | null; // null for uncategorized transactions
  amount: number;
  description?: string;
  date: string; // ISO format
}

export interface Category {
    id: CategoryId;
    label: string;
    icon: string;
    color: string;
}

// Using this for budgets
export type BudgetMap = Record<CategoryId, number>; // Maps category IDs to budgeted amounts

export interface FinanceStore {
    transactions: Transaction[];
    budgets: BudgetMap;
}

// Map Category to CategorySummary for budget summary view
export interface CategorySummary extends Category {
    spent: number;
    budget: number;
    remaining: number;
    isOverBudget: boolean;
    percentageUsed: number;
}