"use client";

import { useState } from "react";
import type { Transaction, CategoryId, TransactionType } from "@/types/finance";
import { CATEGORIES } from "@/lib/constants";
import { formatCurrency } from "@/lib/utils";

interface AddTransactionFormProps {
  onAdd: (transaction: Omit<Transaction, "id">) => void;
  onBack: () => void;
}

interface FormState {
  type: TransactionType;
  category: CategoryId;
  amount: string;
  description: string;
  date: string;
}

const today = new Date().toISOString().slice(0, 10);

export function AddTransactionForm({ onAdd, onBack }: AddTransactionFormProps) {
  const [form, setForm] = useState<FormState>({
    type: "expense",
    category: "food",
    amount: "",
    description: "",
    date: today,
  });

  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const validate = (): boolean => {
    const next: typeof errors = {};
    if (!form.amount || isNaN(parseFloat(form.amount)) || parseFloat(form.amount) <= 0)
      next.amount = "Enter a valid amount";
    if (!form.description.trim())
      next.description = "Description is required";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    onAdd({
      type: form.type,
      category: form.type === "expense" ? form.category : null,
      amount: parseFloat(form.amount),
      description: form.description.trim(),
      date: form.date,
    });
    setForm({ type: "expense", category: "food", amount: "", description: "", date: today });
    setErrors({});
  };

  const isValid = form.amount && parseFloat(form.amount) > 0 && form.description.trim();

  return (
    <div>
      {/* Back button */}
      <button
        onClick={onBack}
        className="flex items-center gap-1.5 text-sm text-muted
                   hover:text-ink transition-colors duration-150 mb-6"
      >
        ← Back
      </button>

      <h2 className="font-display text-2xl font-bold text-ink mb-6">
        New Transaction
      </h2>

      <div className="bg-card border border-border rounded-2xl p-5 flex flex-col gap-5">

        {/* Type toggle */}
        <div>
          <label className="text-[10px] font-semibold uppercase tracking-widest
                            text-muted block mb-2">
            Type
          </label>
          <div className="grid grid-cols-2 gap-2">
            {(["expense", "income"] as TransactionType[]).map((t) => (
              <button
                key={t}
                onClick={() => set("type", t)}
                className={`
                  py-2.5 rounded-xl text-sm font-semibold border-2 transition-all duration-200
                  ${form.type === t
                    ? t === "income"
                      ? "border-income bg-income/10 text-income"
                      : "border-expense bg-expense/10 text-expense"
                    : "border-border bg-paper text-muted hover:text-ink"
                  }
                `}
              >
                {t === "income" ? "💰 Income" : "💸 Expense"}
              </button>
            ))}
          </div>
        </div>

        {/* Amount */}
        <div>
          <label className="text-[10px] font-semibold uppercase tracking-widest
                            text-muted block mb-2">
            Amount
          </label>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 font-display
                             text-xl font-bold text-muted">
              ₦
            </span>
            <input
              type="number"
              placeholder="0"
              value={form.amount}
              onChange={(e) => set("amount", e.target.value)}
              className={`
                w-full pl-9 pr-4 py-3 rounded-xl border-2 bg-paper
                font-display text-2xl font-bold text-ink
                outline-none transition-colors duration-150
                ${errors.amount
                  ? "border-expense"
                  : "border-border focus:border-ink"
                }
              `}
              min="0"
              step="0.01"
            />
          </div>
          {errors.amount && (
            <p className="text-xs text-expense mt-1">{errors.amount}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="text-[10px] font-semibold uppercase tracking-widest
                            text-muted block mb-2">
            Description
          </label>
          <input
            type="text"
            placeholder="What was this for?"
            value={form.description}
            onChange={(e) => set("description", e.target.value)}
            className={`
              w-full px-4 py-3 rounded-xl border-2 bg-paper
              text-sm font-medium text-ink placeholder:text-muted
              outline-none transition-colors duration-150
              ${errors.description
                ? "border-expense"
                : "border-border focus:border-ink"
              }
            `}
          />
          {errors.description && (
            <p className="text-xs text-expense mt-1">{errors.description}</p>
          )}
        </div>

        {/* Category — expenses only */}
        {form.type === "expense" && (
          <div>
            <label className="text-[10px] font-semibold uppercase tracking-widest
                              text-muted block mb-2">
              Category
            </label>
            <div className="grid grid-cols-3 gap-2">
              {CATEGORIES.map((c) => (
                <button
                  key={c.id}
                  onClick={() => set("category", c.id)}
                  className={`
                    py-2.5 px-2 rounded-xl border-2 text-center
                    transition-all duration-200
                    ${form.category === c.id
                      ? "border-current"
                      : "border-border bg-paper hover:border-muted"
                    }
                  `}
                  style={form.category === c.id ? {
                    borderColor: c.color,
                    backgroundColor: `${c.color}12`,
                    color: c.color,
                  } : undefined}
                >
                  <div className="text-lg mb-0.5">{c.icon}</div>
                  <div className="text-[11px] font-semibold leading-tight">
                    {c.label.split(" ")[0]}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Date */}
        <div>
          <label className="text-[10px] font-semibold uppercase tracking-widest
                            text-muted block mb-2">
            Date
          </label>
          <input
            type="date"
            value={form.date}
            onChange={(e) => set("date", e.target.value)}
            className="w-full px-4 py-3 rounded-xl border-2 border-border
                       bg-paper text-sm font-medium text-ink
                       outline-none focus:border-ink transition-colors duration-150"
          />
        </div>

        {/* Preview */}
        {isValid && (
          <div className="bg-paper rounded-xl px-4 py-3 flex items-center
                          justify-between border border-border">
            <span className="text-xs text-muted font-medium">Preview</span>
            <span className={`font-display text-lg font-bold
              ${form.type === "income" ? "text-income" : "text-ink"}`}
            >
              {form.type === "income" ? "+" : "−"}
              {formatCurrency(parseFloat(form.amount) || 0)}
            </span>
          </div>
        )}

        {/* Submit */}
        <button
          onClick={handleSubmit}
          disabled={!isValid}
          className={`
            w-full py-3.5 rounded-xl text-sm font-bold
            transition-all duration-200
            ${isValid
              ? "bg-ink text-paper hover:opacity-80 cursor-pointer"
              : "bg-border text-muted cursor-not-allowed"
            }
          `}
        >
          Add {form.type === "income" ? "Income" : "Expense"}
        </button>
      </div>
    </div>
  );
}