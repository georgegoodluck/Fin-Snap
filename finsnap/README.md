# Fin·Snap

A personal Finance snapshot — track monthly income, expenses, and budgets at a glance.

**Stack:** Next.js 16 · TypeScript · Tailwind CSS v4 · shadcn/ui

---

## What I Built

Fin·Snap helps users understand their monthly money in one page. Three numbers up top (income, expenses, savings), a donut chart showing where it went, budget progress bars showing how close you are to your limits, and a transaction list for the detail.

**Features:**
- Monthly income and expenses across 5 categories: Housing, Food & Dining, Transport, Health, Entertainment
- Add transactions with type toggle, large amount input, category picker, description, and date
- Spending visualized as a donut chart with legend and percentage breakdown
- Budget limits per category with animated progress bars and over-budget warnings
- Month navigation — step through any month, data is per-month
- Full localStorage persistence with hydration-safe loading
- Toast notifications on all actions
- Animated number counters on stat cards
- Responsive layout with hamburger menu on mobile

---

## Design Choices

**Aesthetic direction.** Warm editorial rather than blue SaaS dashboard. Off-white paper background, near-black ink, single amber accent. Playfair Display for numbers (Financial data feels substantial in a serif), DM Sans for UI chrome.

**UI before data.** Built the interface first with mock data, wired real state at the end. Every visual decision was made while looking at real output.

**One hook, all state.** `useFinanceData` owns everything — transactions, budgets, derived values, actions. Components are purely presentational. If a number is wrong, there is one file to look at.

**Donut chart in pure SVG.** No chart library. Uses `stroke-dasharray` math on SVG circles. Keeps the bundle lean and the technique transparent.

**Semantic color tokens.** DeFined via Tailwind v4's `@theme` directive — `income`, `expense`, `warning`, and per-category colors referenced by name. One change propagates everywhere.

---

## What I'd Improve With More Time

- **Recurring transactions** — rent shouldn't need re-entering every month
- **Trend charts** — 6-month income vs expense sparkline for real insight
- **CSV export** — essential for any Finance tool
- **Category customization** — add, rename, recolor
- **Backend** — Supabase for multi-device sync
- **Unit tests** — the pure functions in `lib/` are already structured for it

---

## Challenges

**Tailwind v4 breaking changes.** Complete rewrite from v3 — `@tailwind` directives gone, config moves to CSS via `@theme {}`, several plugins redundant. Navigating this early kept the rest of the build smooth.

**Hydration mismatch.** Next.js renders on the server before localStorage exists. Fix: always initialize with empty state (matching the server), load localStorage in `useEffect` after mount, show a loading state during transition.

**SVG mutation in Strict Mode.** The donut chart originally mutated a `let` variable inside render. React 18 Strict Mode renders twice — the mutation produced broken output on the second pass. Fixed with a `reduce` that derives each offset purely from the accumulator.

---

## Time Spent

Approximately 6–7 hours.

| Phase | Time |
|---|---|
| Setup, types, constants, data layer | 45 min |
| Layout shell, header, responsive nav | 30 min |
| Stat cards, donut chart, budget bars | 90 min |
| Transaction list and add form | 75 min |
| Budget manager | 45 min |
| Data hook, localStorage, hydration fix | 60 min |
| Polish — toasts, animated counters, month nav | 45 min |
| Debugging, Tailwind v4 issues | 60 min |

---

## Running Locally

```bash
git clone <repo-url>
cd FinSnap
npm install
npm run dev
```

Open http://localhost:3000
