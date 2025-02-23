'use client'

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

export default function InsightsPage({ expenses }) {
  // Calculate category totals
  const categoryTotals = expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {});

  const pieData = Object.entries(categoryTotals).map(([name, value]) => ({
    name,
    value
  }));

  // Calculate monthly totals
  const monthlyTotals = expenses.reduce((acc, expense) => {
    const month = new Date(expense.date).toLocaleString('default', { month: 'short' });
    acc[month] = (acc[month] || 0) + expense.amount;
    return acc;
  }, {});

  const barData = Object.entries(monthlyTotals).map(([month, amount]) => ({
    month,
    amount
  }));

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Insights</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Expenses by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Monthly Spending</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip 
                    formatter={(value) => [`$${value.toFixed(2)}`, 'Amount']}
                  />
                  <Bar dataKey="amount" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-gray-500">Total Expenses</p>
                <p className="text-2xl font-bold">
                  ${expenses.reduce((sum, exp) => sum + exp.amount, 0).toFixed(2)}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Average per Transaction</p>
                <p className="text-2xl font-bold">
                  ${(expenses.reduce((sum, exp) => sum + exp.amount, 0) / (expenses.length || 1)).toFixed(2)}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Number of Transactions</p>
                <p className="text-2xl font-bold">{expenses.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}