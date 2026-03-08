"use client";

import { useState } from 'react';
import Header from '../components/finance/Header';
import { PageWrapper } from '../components/finance/PageWrapper';
import { StatsRow } from "@/components/finance/StatsRow";
import { SpendingCard } from "@/components/finance/SpendingCard";

type View = 'dashboard' | 'add' | 'budgets';

const Page = () => {
  const [view, setView] = useState<View>("dashboard")
  return (
    <main>
      <Header view={view} onNavigate={setView} />

      {view == "dashboard" && (
        <PageWrapper>
          <StatsRow
            income={5000}
            expenses={1735}
            savings={3265}
            savingsRate={65}
            incomeCount={2}
            expenseCount={7}
          />
        </PageWrapper>
      )}
      {view == "add" && (
        <PageWrapper>
          <SpendingCard
            categorySpend={{
              housing: 1400,
              food: 205,
              transport: 55,
              health: 30,
              entertainment: 45,
            }}
            total={1735}
          />
        </PageWrapper>
      )}
      {view == "budgets" && (
        <PageWrapper>
          <p>Budget is coming</p>
        </PageWrapper>
      )}

    </main>
  )
}

export default Page