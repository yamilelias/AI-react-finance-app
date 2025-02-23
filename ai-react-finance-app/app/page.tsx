'use client'

import React, { useState } from 'react';
import { Sun, Moon, Home, Plus, PieChart, Wallet } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/Select";
import { Alert, AlertDescription } from "@/components/ui/Alert";
import { Progress } from "@/components/ui/Progress";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useTheme } from '@/components/providers/Theme';

// Layout Components
const Navbar = ({ currentPage, onNavigate, isDarkMode, onThemeToggle }) => (
  <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 fixed w-full top-0 z-50">
    <div className="max-w-7xl mx-auto px-4">
      <div className="flex justify-between h-16">
        <div className="flex">
          <div className="flex-shrink-0 flex items-center">
            <span className="text-xl font-bold">Finance Tracker</span>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
            <NavLink 
              icon={<Home className="w-4 h-4" />} 
              text="Dashboard" 
              isActive={currentPage === 'dashboard'} 
              onClick={() => onNavigate('dashboard')}
            />
            <NavLink 
              icon={<Plus className="w-4 h-4" />} 
              text="Expenses" 
              isActive={currentPage === 'expenses'} 
              onClick={() => onNavigate('expenses')}
            />
            <NavLink 
              icon={<PieChart className="w-4 h-4" />} 
              text="Insights" 
              isActive={currentPage === 'insights'} 
              onClick={() => onNavigate('insights')}
            />
            <NavLink 
              icon={<Wallet className="w-4 h-4" />} 
              text="Budget" 
              isActive={currentPage === 'budget'} 
              onClick={() => onNavigate('budget')}
            />
          </div>
        </div>
        <div className="flex items-center">
          <Button
            variant="outline"
            size="icon"
            onClick={onThemeToggle}
            className="ml-4"
          >
            {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
        </div>
      </div>
    </div>
  </nav>
);

const NavLink = ({ icon, text, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${
      isActive 
        ? 'border-b-2 border-indigo-500 text-gray-900 dark:text-white' 
        : 'text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white'
    }`}
  >
    {icon}
    <span className="ml-2">{text}</span>
  </button>
);

const Layout = ({ children, currentPage, onNavigate, isDarkMode, onThemeToggle }) => (
  <div className={`min-h-screen bg-gray-50 dark:bg-gray-900 ${isDarkMode ? 'dark' : ''}`}>
    <Navbar 
      currentPage={currentPage} 
      onNavigate={onNavigate}
      isDarkMode={isDarkMode}
      onThemeToggle={onThemeToggle}
    />
    <main className="pt-16">
      <div className="max-w-7xl mx-auto p-4">
        {children}
      </div>
    </main>
  </div>
);

// Feature Components
const ExpenseForm = ({ onAddExpense }) => {
  const [expense, setExpense] = useState({
    name: '',
    amount: '',
    category: '',
    date: new Date().toISOString().split('T')[0],
    paymentMethod: ''
  });

  const categories = ['Food', 'Rent', 'Entertainment', 'Transportation', 'Utilities', 'Shopping'];
  const paymentMethods = ['Cash', 'Credit Card', 'Debit Card', 'Bank Transfer'];

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddExpense(expense);
    setExpense({
      name: '',
      amount: '',
      category: '',
      date: new Date().toISOString().split('T')[0],
      paymentMethod: ''
    });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Add New Expense
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="text"
            placeholder="Expense Name"
            value={expense.name}
            onChange={(e) => setExpense({ ...expense, name: e.target.value })}
            required
          />
          <Input
            type="number"
            placeholder="Amount"
            value={expense.amount}
            onChange={(e) => setExpense({ ...expense, amount: e.target.value })}
            required
          />
          <Select
            value={expense.category}
            onValueChange={(value) => setExpense({ ...expense, category: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>{category}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Input
            type="date"
            value={expense.date}
            onChange={(e) => setExpense({ ...expense, date: e.target.value })}
            required
          />
          <Select
            value={expense.paymentMethod}
            onValueChange={(value) => setExpense({ ...expense, paymentMethod: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Payment Method" />
            </SelectTrigger>
            <SelectContent>
              {paymentMethods.map((method) => (
                <SelectItem key={method} value={method}>{method}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button type="submit" className="w-full">Add Expense</Button>
        </form>
      </CardContent>
    </Card>
  );
};

const Insights = ({ expenses }) => {
  const categoryTotals = expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + Number(expense.amount);
    return acc;
  }, {});

  const categoryData = Object.entries(categoryTotals).map(([category, total]) => ({
    category,
    total
  }));

  const monthlyData = expenses.reduce((acc, expense) => {
    const month = new Date(expense.date).toLocaleString('default', { month: 'short' });
    acc[month] = (acc[month] || 0) + Number(expense.amount);
    return acc;
  }, {});

  const monthlyChartData = Object.entries(monthlyData).map(([month, total]) => ({
    month,
    total
  }));

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Spending Insights</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="h-64">
          <h3 className="text-lg font-semibold mb-4">Category-wise Spending</h3>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={categoryData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="total" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="h-64">
          <h3 className="text-lg font-semibold mb-4">Monthly Spending Trend</h3>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={monthlyChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="total" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

const Budget = ({ expenses }) => {
  const [budgets] = useState({
    Food: 500,
    Rent: 1500,
    Entertainment: 200,
    Transportation: 300,
    Utilities: 400,
    Shopping: 300
  });

  const categorySpending = expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + Number(expense.amount);
    return acc;
  }, {});

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Budget Tracker</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {Object.entries(budgets).map(([category, budget]) => {
          const spent = categorySpending[category] || 0;
          const percentage = Math.min((spent / budget) * 100, 100);
          const isOverBudget = spent > budget;

          return (
            <div key={category} className="space-y-2">
              <div className="flex justify-between">
                <span className="font-medium">{category}</span>
                <span className="text-sm">
                  ${spent.toFixed(2)} / ${budget}
                </span>
              </div>
              <Progress value={percentage} />
              {isOverBudget && (
                <Alert variant="destructive" className="mt-2">
                  <AlertDescription>
                    You've exceeded your budget for {category}
                  </AlertDescription>
                </Alert>
              )}
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
};

// Page Components
const DashboardPage = ({ expenses }) => (
  <div className="space-y-6">
    <h1 className="text-2xl font-bold">Dashboard</h1>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Quick Stats</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-500">Total Expenses</p>
              <p className="text-2xl font-bold">
                ${expenses.reduce((sum, exp) => sum + Number(exp.amount), 0).toFixed(2)}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">This Month</p>
              <p className="text-2xl font-bold">
                ${expenses
                  .filter(exp => new Date(exp.date).getMonth() === new Date().getMonth())
                  .reduce((sum, exp) => sum + Number(exp.amount), 0)
                  .toFixed(2)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
      <Budget expenses={expenses} />
    </div>
    <Insights expenses={expenses} />
  </div>
);

const ExpensesPage = ({ expenses, onAddExpense }) => (
  <div className="space-y-6">
    <h1 className="text-2xl font-bold">Expenses</h1>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <ExpenseForm onAddExpense={onAddExpense} />
      <Card>
        <CardHeader>
          <CardTitle>Recent Expenses</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {expenses.slice(-5).reverse().map((expense, index) => (
              <div key={index} className="flex justify-between items-center">
                <div>
                  <p className="font-medium">{expense.name}</p>
                  <p className="text-sm text-gray-500">{expense.category}</p>
                </div>
                <p className="font-bold">${Number(expense.amount).toFixed(2)}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
);

const InsightsPage = ({ expenses }) => (
  <div className="space-y-6">
    <h1 className="text-2xl font-bold">Insights</h1>
    <Insights expenses={expenses} />
  </div>
);

const BudgetPage = ({ expenses }) => (
  <div className="space-y-6">
    <h1 className="text-2xl font-bold">Budget</h1>
    <Budget expenses={expenses} />
  </div>
);

// Main App Component
const App = () => {
  const [expenses, setExpenses] = useState([]);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const { isDarkMode, setIsDarkMode } = useTheme()

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
};

export default App;