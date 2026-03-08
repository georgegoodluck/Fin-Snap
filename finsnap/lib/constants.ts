import type { Category, BudgetMap } from "@/types/finance";

export const CATEGORIES: Category[] = [
  { id: "housing",       label: "Housing",       icon: "🏠", color: "#c2410c" },
  { id: "food",          label: "Food & Dining",  icon: "🍽️", color: "#b45309" },
  { id: "transport",     label: "Transport",      icon: "🚗", color: "#047857" },
  { id: "health",        label: "Health",         icon: "💊", color: "#1d4ed8" },
  { id: "entertainment", label: "Entertainment",  icon: "✨", color: "#7c3aed" },
];

export const DEFAULT_BUDGETS: BudgetMap = {
  housing:       1500,
  food:           600,
  transport:      300,
  health:         200,
  entertainment:  250,
};

export const STORAGE_KEY = "finsnap_v1";