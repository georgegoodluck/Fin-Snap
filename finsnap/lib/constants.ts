import type { Category, BudgetMap } from "@/types/finance";

// Defining constants for the finance module. THey will be used across the applicationf for consistency.
export const CATEGORIES: Category[] = [
  { id: "housing",       label: "Housing",       icon: "🏠", color: "#c2410c" },
  { id: "food",          label: "Food & Dining",  icon: "🍽️", color: "#b45309" },
  { id: "transport",     label: "Transport",      icon: "🚗", color: "#047857" },
  { id: "health",        label: "Health",         icon: "💊", color: "#1d4ed8" },
  { id: "entertainment", label: "Entertainment",  icon: "✨", color: "#7c3aed" },
];

// Declaring my default budget value for the app. This will be used to initialize the budget map in the finance store and can be updated by the user as needed. It provides a starting point for users to manage their finances effectively.
export const DEFAULT_BUDGETS: BudgetMap = {
  housing:       1500,
  food:           600,
  transport:      300,
  health:         200,
  entertainment:  250,
};

// Defining a storage key constant for the finance module. This key will be used when saving and retrieving data from local storage, ensuring that all finance-related data is stored under a consistent key and can be easily accessed and managed.
export const STORAGE_KEY = "finsnap_v1";