'use client'

import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Progress } from "@/components/ui/Progress";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

const DEFAULT_BUDGETS = {
  food: 500,
  transport: 200,
  utilities: 300,
  entertainment: 200,
  other: 300
};

export default function BudgetPage({ expenses }) {
  const [budgets, setBudgets] = useState(DEFAULT_BUDGETS);
  const [editMode, setEditMode] = useState(false);
  const [tempBudgets, setTempBudgets] = useState(DEFAULT_BUDGETS);

  // Calculate spending by category
  const categorySpending = expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {});

  const handleSaveBudgets = () => {
    setBudgets(tempBudgets);
    setEditMode(false);
  };

  const calculateProgress = (category) => {
    const spent = categorySpending[category] || 0;
    const budget = budgets[category] || 0;
    return Math.min((spent / budget) * 100, 100);
  };

  const getProgressColor = (progress) => {
    if (progress >= 100) return "bg-red-500";
    if (progress >= 80) return "bg-yellow-500";
    return "bg-green-500";
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Budget Management</h1>
        <Button onClick={() => setEditMode(!editMode)}>
          {editMode ? 'Cancel' : 'Edit Budgets'}
        </Button>
      </div>

      <div className="grid gap-6">
        {Object.entries(budgets).map(([category, limit]) => (
          <Card key={category}>
            <CardHeader className="pb-2">
              <CardTitle className="flex justify-between items-center">
                <span className="capitalize">{category}</span>
                <span className="text-sm font-normal">
                  ${categorySpending[category]?.toFixed(2) || '0.00'} / ${limit}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {editMode ? (
                <Input
                  type="number"
                  value={tempBudgets[category]}
                  onChange={(e) => setTempBudgets({
                    ...tempBudgets,
                    [category]: parseFloat(e.target.value)
                  })}
                  min="0"
                  step="10"
                  className="mt-2"
                />
              ) : (
                <div className="space-y-2">
                  <Progress 
                    value={calculateProgress(category)}
                    className={getProgressColor(calculateProgress(category))}
                  />
                  <p className="text-sm text-gray-500">
                    {calculateProgress(category) >= 100 
                      ? 'Budget exceeded!' 
                      : `${(100 - calculateProgress(category)).toFixed(1)}% remaining`}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {editMode && (
        <div className="flex justify-end">
          <Button onClick={handleSaveBudgets}>Save Budgets</Button>
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Total Budget Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Total Budget</p>
              <p className="text-2xl font-bold">
                ${Object.values(budgets).reduce((a, b) => a + b, 0).toFixed(2)}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Total Spent</p>
              <p className="text-2xl font-bold">
                ${Object.values(categorySpending).reduce((a, b) => a + b, 0).toFixed(2)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}