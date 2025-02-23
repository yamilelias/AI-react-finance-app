'use client'

import { useState, useEffect } from 'react';
import { useTheme } from '@/components/providers/Theme';
import { Layout } from '@/components/Layout';
import DashboardPage from './dashboard/page';
import ExpensesPage from './expenses/page';
import InsightsPage from './insights/page';
import BudgetPage from './budget/page';
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"

export default function App() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login")
    }
  }, [status, router])

  const [expenses, setExpenses] = useState([]);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const { isDarkMode, setIsDarkMode } = useTheme();

  const handleAddExpense = (newExpense) => {
    setExpenses([...expenses, newExpense]);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <DashboardPage expenses={expenses} />;
      case 'expenses':
        return <ExpensesPage expenses={expenses} onAddExpense={handleAddExpense} />;
      case 'insights':
        return <InsightsPage expenses={expenses} />;
      case 'budget':
        return <BudgetPage expenses={expenses} />;
      default:
        return <DashboardPage expenses={expenses} />;
    }
  };

  if(status === "loading") {
    return <div>Loading...</div>
  }

  return (
    <Layout 
      currentPage={currentPage}
      onNavigate={setCurrentPage}
      isDarkMode={isDarkMode}
      onThemeToggle={() => setIsDarkMode(!isDarkMode)}
    >
      {renderPage()}
    </Layout>
  );
}