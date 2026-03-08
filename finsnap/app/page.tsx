"use client";

import { useState } from 'react'
import Header from '../components/finance/Header'
import { PageWrapper } from '../components/finance/PageWrapper'

type View = 'dashboard' | 'add' | 'budgets';

const Page = () => {
  const [view, setView] = useState<View>("dashboard")
  return (
    <main>
      <Header view={view} onNavigate={setView} />

      {view == "dashboard" && (
        <PageWrapper>
          <p>Dashboard is coming soon</p>
        </PageWrapper>
      )}
      {view == "add" && (
        <PageWrapper>
          <p>Add transaction coming soon</p>
        </PageWrapper>
      )}
      {view == "budgets" && (
        <PageWrapper>
          <p>Budget is coming soon</p>
        </PageWrapper>
      )}

    </main>
  )
}

export default Page