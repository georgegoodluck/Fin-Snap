"use client";

import { useState } from 'react'
import Header from '../components/finance/Header'
import PageWrapper from '../components/PageWrapper'

type View = 'dashboard' | 'add' | 'budgets';

const Page = () => {
  const [view, setView] = useState<View>("dashboard")
  return (
    <main>
      <Header view={view} onNavigate={setView} />
    </main>
  )
}

export default Page