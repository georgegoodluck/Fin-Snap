"use client";

import { useState } from 'react';
import Header from '../components/finance/Header';
import { PageWrapper } from '../components/finance/PageWrapper';
import { StatsRow } from "@/components/finance/StatsRow";

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
          <p>Dashboard is coming</p>
          </PageWrapper>
      )}
      {view == "add" && (
        <PageWrapper>
          <p>Add transaction coming soon</p>
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